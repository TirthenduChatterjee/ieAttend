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
[Route("api/attendance")]
public class AttendanceController(HrmsDbContext db) : ControllerBase
{
    [HttpPost("check-in")]
    public async Task<IActionResult> CheckIn(CheckInRequest request)
    {
        var employeeId = UserId();
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        if (await db.Attendances.AnyAsync(x => x.EmployeeId == employeeId && x.WorkDate == today))
            return Conflict(new { message = "You have already checked in today." });
        var now = DateTime.UtcNow;
        var attendance = new Attendance { EmployeeId = employeeId, WorkDate = today, CheckInUtc = now, Notes = request.Notes?.Trim(), Status = now.TimeOfDay > TimeSpan.FromHours(9.5) ? AttendanceStatus.Late : AttendanceStatus.Present };
        db.Attendances.Add(attendance);
        await db.SaveChangesAsync();
        return Created($"api/attendance/{attendance.Id}", ToResponse(attendance));
    }

    [HttpPost("check-out")]
    public async Task<IActionResult> CheckOut(CheckOutRequest request)
    {
        var employeeId = UserId();
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var attendance = await db.Attendances.SingleOrDefaultAsync(x => x.EmployeeId == employeeId && x.WorkDate == today);
        if (attendance is null) return BadRequest(new { message = "Check in before checking out." });
        if (attendance.CheckOutUtc is not null) return Conflict(new { message = "You have already checked out today." });
        attendance.CheckOutUtc = DateTime.UtcNow;
        attendance.WorkingHours = Math.Round((decimal)(attendance.CheckOutUtc.Value - attendance.CheckInUtc).TotalHours, 2);
        if (attendance.WorkingHours < 4) attendance.Status = AttendanceStatus.HalfDay;
        if (!string.IsNullOrWhiteSpace(request.Notes)) attendance.Notes = request.Notes.Trim();
        await db.SaveChangesAsync();
        return Ok(ToResponse(attendance));
    }

    [HttpGet("me")]
    public async Task<IActionResult> MyAttendance([FromQuery] DateOnly? from, [FromQuery] DateOnly? to)
    {
        var start = from ?? DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-30));
        var end = to ?? DateOnly.FromDateTime(DateTime.UtcNow);
        if (start > end) return BadRequest(new { message = "'from' must be before 'to'." });
        var records = await db.Attendances.Where(x => x.EmployeeId == UserId() && x.WorkDate >= start && x.WorkDate <= end).OrderByDescending(x => x.WorkDate).ToListAsync();
        return Ok(records.Select(ToResponse));
    }

    [HttpGet("today")]
    public async Task<IActionResult> Today()
    {
        var record = await db.Attendances.SingleOrDefaultAsync(x => x.EmployeeId == UserId() && x.WorkDate == DateOnly.FromDateTime(DateTime.UtcNow));
        return Ok(record is null ? null : ToResponse(record));
    }

    private int UserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    internal static object ToResponse(Attendance x) => new { x.Id, x.WorkDate, x.CheckInUtc, x.CheckOutUtc, x.WorkingHours, status = x.Status.ToString(), x.Notes };
}
