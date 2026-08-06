using HRMS.Contracts;
using HRMS.Data;
using HRMS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Controllers;

[ApiController]
[Authorize(Roles = "Hr")]
[Route("api/employees")]
public class EmployeesController(HrmsDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> List([FromQuery] string? search)
    {
        var query = db.Employees.Where(x => x.Role == UserRole.Employee).AsQueryable();
        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLower();
            query = query.Where(x => x.FullName.ToLower().Contains(term) || x.Email.Contains(term) || (x.Department != null && x.Department.ToLower().Contains(term)));
        }
        var employees = await query.OrderBy(x => x.FullName).ToListAsync();
        return Ok(employees.Select(ToResponse));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        var employee = await db.Employees.FindAsync(id);
        return employee is null || employee.Role != UserRole.Employee ? NotFound() : Ok(ToResponse(employee));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateEmployeeRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.FullName) || request.AnnualLeaveAllowance < 0) return BadRequest(new { message = "Full name and a non-negative leave allowance are required." });
        var employee = await db.Employees.FindAsync(id);
        if (employee is null || employee.Role != UserRole.Employee) return NotFound();
        employee.FullName = request.FullName.Trim();
        employee.Department = request.Department?.Trim();
        employee.AnnualLeaveAllowance = request.AnnualLeaveAllowance;
        employee.IsActive = request.IsActive;
        await db.SaveChangesAsync();
        return Ok(ToResponse(employee));
    }

    private static object ToResponse(Employee x) => new { x.Id, x.FullName, x.Email, x.Department, x.AnnualLeaveAllowance, x.IsActive, x.CreatedAtUtc };
}
