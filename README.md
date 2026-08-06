# HRMS API

ASP.NET Core 10 backend for employee attendance and leave management. It uses SQLite (`HRMS/hrms.db`), which is created automatically at first startup.

## Run

```powershell
dotnet run --project HRMS
```

Swagger is available in the Development environment at `/swagger`. Send the JWT returned from login/register as `Authorization: Bearer <token>` for protected endpoints.

The initial HR account is configured in `HRMS/appsettings.json`:

```text
email: hr@hrms.local
password: Hr@12345
```

Change the JWT key and seeded HR password before deployment.

## Routes

| Area | Endpoint | Access |
| --- | --- | --- |
| Auth | `POST /api/auth/register`, `POST /api/auth/login` | Public |
| Attendance | `POST /api/attendance/check-in`, `POST /api/attendance/check-out` | Employee/HR |
| Attendance | `GET /api/attendance/today`, `GET /api/attendance/me?from=YYYY-MM-DD&to=YYYY-MM-DD` | Employee/HR |
| Leave | `POST /api/leaves`, `GET /api/leaves/me`, `GET /api/leaves/balance`, `DELETE /api/leaves/{id}` | Employee/HR |
| Leave review | `GET /api/leaves?status=Pending`, `PUT /api/leaves/{id}/review` | HR |
| Dashboard | `GET /api/dashboard/employee`, `GET /api/dashboard/hr` | Employee/HR (HR route is HR-only) |
| Employees | `GET /api/employees`, `GET /api/employees/{id}`, `PUT /api/employees/{id}` | HR |

`PUT /api/leaves/{id}/review` body:

```json
{ "status": "Approved", "comment": "Approved by HR" }
```

`PUT /api/employees/{id}` body:

```json
{
  "fullName": "Jane Doe",
  "department": "Engineering",
  "annualLeaveAllowance": 18,
  "isActive": true
}
```
