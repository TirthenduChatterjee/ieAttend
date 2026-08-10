using HRMS.Models;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Data;

public class HrmsDbContext(DbContextOptions<HrmsDbContext> options) : DbContext(options)
{
    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<Attendance> Attendances => Set<Attendance>();
    public DbSet<LeaveRequest> LeaveRequests => Set<LeaveRequest>();
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<Holiday> Holidays => Set<Holiday>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasIndex(x => x.Email).IsUnique();
            entity.Property(x => x.Role).HasConversion<string>();
            entity.Property(x => x.AnnualLeaveAllowance).HasPrecision(5, 1);
        });
        modelBuilder.Entity<Attendance>(entity =>
        {
            entity.HasIndex(x => new { x.EmployeeId, x.WorkDate }).IsUnique();
            entity.Property(x => x.Status).HasConversion<string>();
            entity.Property(x => x.WorkingHours).HasPrecision(5, 2);
        });
        modelBuilder.Entity<LeaveRequest>(entity =>
        {
            entity.Property(x => x.Type).HasConversion<string>();
            entity.Property(x => x.Status).HasConversion<string>();
            entity.Property(x => x.Days).HasPrecision(5, 1);
        });
        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasIndex(x => x.Name).IsUnique();
        });
        modelBuilder.Entity<Holiday>(entity =>
        {
            entity.HasIndex(x => x.HolidayDate).IsUnique();
            entity.Property(x => x.Name).HasMaxLength(120);
        });
    }
}
