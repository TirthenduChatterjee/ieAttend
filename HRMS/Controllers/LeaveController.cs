using HRMS.Contracts;
using HRMS.Data;
using HRMS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HRMS.Controllers;

[ApiController]
[Authorize]
[Route("api/leaves")]
public class LeaveController(HrmsDbContext db) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Apply(CreateLeaveRequest request)
    {
        if (request.StartDate > request.EndDate || string.IsNullOrWhiteSpace(request.Reason)) return BadRequest(new { message = "A valid date range and reason are required." });
        var id = UserId();
        var overlaps = await db.LeaveRequests.AnyAsync(x => x.EmployeeId == id && x.Status != LeaveStatus.Rejected && x.Status != LeaveStatus.Cancelled && request.StartDate <= x.EndDate && request.EndDate >= x.StartDate);
        if (overlaps) return Conflict(new { message = "This leave overlaps an existing pending or approved leave." });
        var days = request.EndDate.DayNumber - request.StartDate.DayNumber + 1;
        var leave = new LeaveRequest { EmployeeId = id, Type = request.Type, StartDate = request.StartDate, EndDate = request.EndDate, Days = days, Reason = request.Reason.Trim() };
        db.LeaveRequests.Add(leave);
        await db.SaveChangesAsync();
        return Created($"api/leaves/{leave.Id}", ToResponse(leave));
    }

    [HttpGet("me")]
    public async Task<IActionResult> Mine()
    {
        var leaves = await db.LeaveRequests.Where(x => x.EmployeeId == UserId()).OrderByDescending(x => x.CreatedAtUtc).ToListAsync();
        return Ok(leaves.Select(ToResponse));
    }

    [HttpGet("balance")]
    public async Task<IActionResult> Balance()
    {
        var employee = await db.Employees.FindAsync(UserId());
        var used = await db.LeaveRequests.Where(x => x.EmployeeId == UserId() && x.Status == LeaveStatus.Approved && x.Type != LeaveType.Unpaid).SumAsync(x => (decimal?)x.Days) ?? 0;
        var unpaidDays = await db.LeaveRequests.Where(x => x.EmployeeId == UserId() && x.Status == LeaveStatus.Approved && x.Type == LeaveType.Unpaid).SumAsync(x => (decimal?)x.Days) ?? 0;
        return Ok(new { annualAllowance = employee!.AnnualLeaveAllowance, used, remaining = Math.Max(0, employee.AnnualLeaveAllowance - used), unpaidDays });
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Cancel(int id)
    {
        var leave = await db.LeaveRequests.SingleOrDefaultAsync(x => x.Id == id && x.EmployeeId == UserId());
        if (leave is null) return NotFound();
        if (leave.Status != LeaveStatus.Pending) return BadRequest(new { message = "Only pending leave requests can be cancelled." });
        leave.Status = LeaveStatus.Cancelled;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [Authorize(Roles = "Hr")]
    [HttpGet]
    public async Task<IActionResult> All([FromQuery] LeaveStatus? status)
    {
        var query = db.LeaveRequests.Include(x => x.Employee).AsQueryable();
        if (status is not null) query = query.Where(x => x.Status == status);
        var leaves = await query.OrderByDescending(x => x.CreatedAtUtc).ToListAsync();
        return Ok(leaves.Select(x => new { leave = ToResponse(x), employee = new { x.Employee.Id, x.Employee.FullName, x.Employee.Email, x.Employee.Department } }));
    }

    [Authorize(Roles = "Hr")]
    [HttpPut("{id:int}/review")]
    public async Task<IActionResult> Review(int id, ReviewLeaveRequest request)
    {
        if (request.Status is not (LeaveStatus.Approved or LeaveStatus.Rejected)) return BadRequest(new { message = "A leave request can only be approved or rejected." });
        var leave = await db.LeaveRequests.FindAsync(id);
        if (leave is null) return NotFound();
        if (leave.Status != LeaveStatus.Pending) return BadRequest(new { message = "Only pending leave requests can be reviewed." });
        leave.Status = request.Status;
        leave.HrComment = request.Comment?.Trim();
        leave.ReviewedById = UserId();
        leave.ReviewedAtUtc = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return Ok(ToResponse(leave));
    }

    private int UserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    internal static object ToResponse(LeaveRequest x) => new { x.Id, type = x.Type.ToString(), x.StartDate, x.EndDate, x.Days, x.Reason, status = x.Status.ToString(), x.HrComment, x.ReviewedAtUtc, x.CreatedAtUtc };
}
