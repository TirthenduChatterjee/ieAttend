using HRMS.Contracts;
using HRMS.Data;
using HRMS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Controllers;

[ApiController]
[Authorize(Roles = "Hr")]
[Route("api/departments")]
public class DepartmentsController(HrmsDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> List()
    {
        var departments = await db.Departments.OrderBy(x => x.Name).ToListAsync();
        var employeeCounts = await db.Employees.Where(x => x.Role == UserRole.Employee && x.IsActive)
            .GroupBy(x => x.Department).Select(x => new { Name = x.Key, Count = x.Count() }).ToListAsync();
        return Ok(departments.Select(x => new { x.Id, x.Name, x.IsActive, x.CreatedAtUtc, employeeCount = employeeCounts.FirstOrDefault(c => c.Name == x.Name)?.Count ?? 0 }));
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateDepartmentRequest request)
    {
        var name = request.Name?.Trim();
        if (string.IsNullOrWhiteSpace(name)) return BadRequest(new { message = "Department name is required." });
        if (await db.Departments.AnyAsync(x => x.Name.ToLower() == name.ToLower())) return Conflict(new { message = "This department already exists." });
        var department = new Department { Name = name };
        db.Departments.Add(department);
        await db.SaveChangesAsync();
        return Created($"api/departments/{department.Id}", new { department.Id, department.Name, department.IsActive, department.CreatedAtUtc, employeeCount = 0 });
    }
}
