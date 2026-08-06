using HRMS.Data;
using HRMS.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<HrmsDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<PasswordService>();
builder.Services.AddScoped<TokenService>();
var jwt = builder.Configuration.GetSection("Jwt");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwt["Issuer"],
        ValidAudience = jwt["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["Key"]!)),
        ClockSkew = TimeSpan.Zero
    });
builder.Services.AddAuthorization();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<HrmsDbContext>();
    db.Database.EnsureCreated();
    if (!db.Employees.Any(x => x.Role == HRMS.Models.UserRole.Hr))
    {
        var config = builder.Configuration.GetSection("SeedHr");
        var passwords = scope.ServiceProvider.GetRequiredService<PasswordService>();
        db.Employees.Add(new HRMS.Models.Employee
        {
            FullName = config["Name"] ?? "HR Administrator",
            Email = (config["Email"] ?? "hr@hrms.local").ToLowerInvariant(),
            PasswordHash = passwords.Hash(config["Password"] ?? "Hr@12345"),
            Role = HRMS.Models.UserRole.Hr,
            Department = "Human Resources"
        });
        db.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
