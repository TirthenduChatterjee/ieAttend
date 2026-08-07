using HRMS.Models;

namespace HRMS.Contracts;

public record RegisterRequest(string FullName, string Email, string Password, string? Department);
public record LoginRequest(string Email, string Password);
public record CheckInRequest(string? Notes);
public record CheckOutRequest(string? Notes);
public record CreateLeaveRequest(LeaveType Type, DateOnly StartDate, DateOnly EndDate, string Reason);
public record ReviewLeaveRequest(LeaveStatus Status, string? Comment);
public record UpdateEmployeeRequest(string FullName, string? Department, decimal AnnualLeaveAllowance, bool IsActive);
public record CreateDepartmentRequest(string Name);
