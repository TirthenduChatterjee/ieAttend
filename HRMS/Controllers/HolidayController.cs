using HRMS.Contracts;
using HRMS.Data;
using HRMS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Controllers;

[ApiController]
[Authorize]
[Route("api/holidays")]
public class HolidayController(HrmsDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> List() => Ok((await db.Holidays
        .OrderBy(x => x.HolidayDate).ToListAsync()).Select(ToResponse));

    [Authorize(Roles = "Hr")]
    [HttpPost]
    public async Task<IActionResult> Create(CreateHolidayRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name)) return BadRequest(new { message = "A holiday name is required." });
        if (await db.Holidays.AnyAsync(x => x.HolidayDate == request.HolidayDate)) return Conflict(new { message = "A holiday already exists on this date." });
        var holiday = new Holiday { Name = request.Name.Trim(), HolidayDate = request.HolidayDate, Description = request.Description?.Trim() };
        db.Holidays.Add(holiday);
        await db.SaveChangesAsync();
        return Created($"api/holidays/{holiday.Id}", ToResponse(holiday));
    }

    [Authorize(Roles = "Hr")]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateHolidayRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name)) return BadRequest(new { message = "A holiday name is required." });
        var holiday = await db.Holidays.FindAsync(id);
        if (holiday is null) return NotFound();
        if (await db.Holidays.AnyAsync(x => x.Id != id && x.HolidayDate == request.HolidayDate)) return Conflict(new { message = "A holiday already exists on this date." });
        holiday.Name = request.Name.Trim(); holiday.HolidayDate = request.HolidayDate; holiday.Description = request.Description?.Trim();
        await db.SaveChangesAsync();
        return Ok(ToResponse(holiday));
    }

    [Authorize(Roles = "Hr")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var holiday = await db.Holidays.FindAsync(id);
        if (holiday is null) return NotFound();
        db.Holidays.Remove(holiday);
        await db.SaveChangesAsync();
        return NoContent();
    }

    private static object ToResponse(Holiday x) => new { x.Id, x.Name, x.HolidayDate, x.Description };
}
