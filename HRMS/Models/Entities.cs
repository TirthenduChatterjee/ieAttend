namespace HRMS.Models;

public enum UserRole { Employee, Hr }
public enum AttendanceStatus { Present, Late, HalfDay, Absent }
public enum LeaveStatus { Pending, Approved, Rejected, Cancelled }
public enum LeaveType { Casual, Sick, Earned, Unpaid }

public class Employee
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string? Department { get; set; }
    public UserRole Role { get; set; } = UserRole.Employee;
    public decimal AnnualLeaveAllowance { get; set; } = 18;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
    public ICollection<LeaveRequest> LeaveRequests { get; set; } = new List<LeaveRequest>();
}

public class Attendance
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }
    public DateOnly WorkDate { get; set; }
    public DateTime CheckInUtc { get; set; }
    public DateTime? CheckOutUtc { get; set; }
    public decimal? WorkingHours { get; set; }
    public AttendanceStatus Status { get; set; } = AttendanceStatus.Present;
    public string? Notes { get; set; }
    public Employee Employee { get; set; } = null!;
}

public class LeaveRequest
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }
    public LeaveType Type { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public decimal Days { get; set; }
    public string Reason { get; set; } = string.Empty;
    public LeaveStatus Status { get; set; } = LeaveStatus.Pending;
    public string? HrComment { get; set; }
    public int? ReviewedById { get; set; }
    public DateTime? ReviewedAtUtc { get; set; }
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public Employee Employee { get; set; } = null!;
}
