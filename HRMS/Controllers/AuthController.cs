using HRMS.Contracts;
using HRMS.Data;
using HRMS.Models;
using HRMS.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace HRMS.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(HrmsDbContext db, PasswordService passwords, TokenService tokens) : ControllerBase
{
    [Authorize(Roles = "Hr")]
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.FullName) || string.IsNullOrWhiteSpace(request.Email) || request.Password.Length < 8)
            return BadRequest(new { message = "Full name, email, and a password of at least 8 characters are required." });
        var email = request.Email.Trim().ToLowerInvariant();
        if (await db.Employees.AnyAsync(x => x.Email == email)) return Conflict(new { message = "An account with this email already exists." });
        var employee = new Employee { FullName = request.FullName.Trim(), Email = email, Department = request.Department?.Trim(), PasswordHash = passwords.Hash(request.Password) };
        db.Employees.Add(employee);
        await db.SaveChangesAsync();
        return Created("api/auth/me", new { employee.Id, employee.FullName, employee.Email, employee.Department, role = employee.Role.ToString(), token = tokens.Create(employee) });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var employee = await db.Employees.SingleOrDefaultAsync(x => x.Email == email);
        if (employee is null || !employee.IsActive || !passwords.Verify(request.Password, employee.PasswordHash))
            return Unauthorized(new { message = "Invalid email or password." });
        return Ok(new { employee.Id, employee.FullName, employee.Email, employee.Department, role = employee.Role.ToString(), token = tokens.Create(employee) });
    }
}
