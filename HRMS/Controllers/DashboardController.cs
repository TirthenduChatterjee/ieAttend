using HRMS.Data;
using HRMS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HRMS.Controllers;

[ApiController]
[Authorize]
[Route("api/dashboard")]
public class DashboardController(HrmsDbContext db) : ControllerBase
{
    [HttpGet("employee")]
    public async Task<IActionResult> EmployeeDashboard()
    {
        var id = UserId();
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var monthStart = new DateOnly(today.Year, today.Month, 1);
        var attendance = await db.Attendances.Where(x => x.EmployeeId == id && x.WorkDate >= monthStart && x.WorkDate <= today).ToListAsync();
        var leaveUsed = await db.LeaveRequests.Where(x => x.EmployeeId == id && x.Status == LeaveStatus.Approved && x.Type != LeaveType.Unpaid).SumAsync(x => (decimal?)x.Days) ?? 0;
        var employee = await db.Employees.FindAsync(id);
        var pendingLeaves = await db.LeaveRequests.CountAsync(x => x.EmployeeId == id && x.Status == LeaveStatus.Pending);
        return Ok(new
        {
            todayAttendance = attendance.Where(x => x.WorkDate == today).Select(AttendanceController.ToResponse).SingleOrDefault(),
            month = new { present = attendance.Count(x => x.Status == AttendanceStatus.Present), late = attendance.Count(x => x.Status == AttendanceStatus.Late), halfDay = attendance.Count(x => x.Status == AttendanceStatus.HalfDay), workingHours = attendance.Sum(x => x.WorkingHours ?? 0) },
            leave = new { allowance = employee!.AnnualLeaveAllowance, used = leaveUsed, remaining = Math.Max(0, employee.AnnualLeaveAllowance - leaveUsed), pending = pendingLeaves }
        });
    }

    [Authorize(Roles = "Hr")]
    [HttpGet("hr")]
    public async Task<IActionResult> HrDashboard()
    {
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var employees = await db.Employees.CountAsync(x => x.Role == UserRole.Employee && x.IsActive);
        var records = await db.Attendances.Include(x => x.Employee).Where(x => x.WorkDate == today).ToListAsync();
        var pending = await db.LeaveRequests.CountAsync(x => x.Status == LeaveStatus.Pending);
        return Ok(new
        {
            totalEmployees = employees,
            today = new { checkedIn = records.Count, present = records.Count(x => x.Status == AttendanceStatus.Present), late = records.Count(x => x.Status == AttendanceStatus.Late), halfDay = records.Count(x => x.Status == AttendanceStatus.HalfDay), absent = Math.Max(0, employees - records.Count) },
            pendingLeaveRequests = pending,
            attendance = records.Select(x => new { employee = new { x.Employee.Id, x.Employee.FullName, x.Employee.Department }, record = AttendanceController.ToResponse(x) })
        });
    }

    private int UserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
}
