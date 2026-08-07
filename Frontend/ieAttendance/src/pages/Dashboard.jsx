import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Gift,
  LogOut,
  MoreVertical,
  Pencil,
  Plane,
  Plus,
  Search,
  ShieldCheck,
  Users,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardLayout from "../layouts/DashboardLayout"
import {Card,Heading} from "../components/employee/Card";
import TodayStatus from "../components/employee/TodayStatus";
import EmployeeDirectory from "../components/employee/EmployeeDirectory";
import Avatar from "../components/employee/Avatar";
/* ================================================================== *
 *  DATA
 * ================================================================== */
const hrStats = [
  ["Total Employees", "256", "+12 this month", Users, "text-blue-600 bg-blue-50"],
  ["Present Today", "190", "74.2% of total", UserRoundCheck, "text-emerald-600 bg-emerald-50"],
  ["Absent Today", "42", "16.4% of total", UserRoundX, "text-rose-500 bg-rose-50"],
  ["On Leave", "24", "9.4% of total", Plane, "text-amber-500 bg-amber-50"],
  ["Departments", "12", "Active departments", Building2, "text-violet-600 bg-violet-50"],
  ["Upcoming Birthdays", "5", "In next 7 days", Gift, "text-blue-600 bg-blue-50"],
];

const employeeStats = [
  ["Attendance", "96%", "This month", UserRoundCheck, "text-emerald-600 bg-emerald-50"],
  ["Leave Balance", "22", "Days remaining", Plane, "text-amber-500 bg-amber-50"],
  ["Pending Requests", "1", "Awaiting approval", FileText, "text-blue-600 bg-blue-50"],
  ["Working Days", "18", "Out of 21", CalendarDays, "text-violet-600 bg-violet-50"],
];

const attendanceData = [
  { day: "Mon", total: 62 },
  { day: "Tue", total: 84 },
  { day: "Wed", total: 58 },
  { day: "Thu", total: 76 },
  { day: "Fri", total: 51 },
  { day: "Sat", total: 62 },
  { day: "Sun", total: 33 },
];

const departments = [
  { name: "Engineering", value: 35, count: 89, color: "#2256e8" },
  { name: "Marketing", value: 20, count: 51, color: "#17a34a" },
  { name: "Sales", value: 15, count: 38, color: "#f59e0b" },
  { name: "HR", value: 10, count: 26, color: "#7438e8" },
  { name: "Finance", value: 10, count: 26, color: "#1f9dc2" },
  { name: "Others", value: 10, count: 26, color: "#d9dce4" },
];

const weeklyData = [
  { day: "Mon", present: 160, absent: 14, leave: 31 },
  { day: "Tue", present: 201, absent: 20, leave: 17 },
  { day: "Wed", present: 174, absent: 9, leave: 26 },
  { day: "Thu", present: 210, absent: 19, leave: 34 },
  { day: "Fri", present: 193, absent: 14, leave: 28 },
  { day: "Sat", present: 73, absent: 5, leave: 7 },
  { day: "Sun", present: 52, absent: 0, leave: 5 },
];

const leaveRequests = [
  ["SJ", "Sarah Johnson", "May 20 – May 22, 2024", "Sick Leave", "2 days", "bg-amber-50 text-amber-600"],
  ["MB", "Michael Brown", "May 21 – May 23, 2024", "Casual Leave", "3 days", "bg-blue-50 text-blue-600"],
  ["ED", "Emily Davis", "May 24 – May 25, 2024", "Earned Leave", "2 days", "bg-emerald-50 text-emerald-600"],
  ["DW", "David Wilson", "May 27 – May 31, 2024", "Maternity Leave", "5 days", "bg-violet-50 text-violet-600"],
];

const employees = [
  ["JD", "John Doe", "EMP001", "Engineering", "Software Engineer", "john.doe@company.com", "+1 555 123 4567"],
  ["SJ", "Sarah Johnson", "EMP002", "Marketing", "Marketing Manager", "sarah.johnson@company.com", "+1 555 234 5678"],
  ["MB", "Michael Brown", "EMP003", "Finance", "Accountant", "michael.brown@company.com", "+1 555 345 6789"],
];

const leaveBalance = [
  ["Casual Leave", "6 Days", "text-blue-500"],
  ["Sick Leave", "4 Days", "text-amber-500"],
  ["Earned Leave", "12 Days", "text-emerald-500"],
  ["Maternity Leave", "60 Days", "text-violet-500"],
];

const holidays = [
  ["Memorial Day", "May 27, 2024"],
  ["Independence Day", "Jul 4, 2024"],
  ["Labor Day", "Sep 2, 2024"],
  ["Thanksgiving Day", "Nov 28, 2024"],
];

/* ================================================================== *
 *  SHARED PRIMITIVES
 * ================================================================== */
const cardBase = "rounded-xl border border-slate-200 bg-white shadow-sm";
const selectStyle =
  "inline-flex items-center justify-between gap-4 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] text-slate-600";


/* ================================================================== *
 *  CARD COMPONENTS
 * ================================================================== */
function StatsGrid({
  stats,
  className = "grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6",
}) {
  return (
    <div className={className}>
      {stats.map(([title, value, note, Icon, color]) => (
        <Card
          key={title}
          className="flex min-h-[102px] items-center justify-between p-4"
        >
          <div>
            <p className="mb-1.5 text-xs text-slate-500">{title}</p>
            <strong className="block text-[22px] leading-none text-slate-900">
              {value}
            </strong>
            <small className="mt-2 block text-[11px] text-slate-500">
              {note}
            </small>
          </div>
          <span
            className={`grid size-[52px] place-items-center rounded-full ${color}`}
          >
            <Icon size={27} />
          </span>
        </Card>
      ))}
    </div>
  );
}

function AttendanceOverview({ data = attendanceData }) {
  return (
    <Card className="h-[222px] p-4">
      <Heading
        action={
          <button className={selectStyle}>
            This Week <ChevronDown size={15} />
          </button>
        }
      >
        Attendance Overview
      </Heading>
      <div className="mt-1 h-[171px]">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 12, right: 8, left: -19 }}>
            <CartesianGrid vertical={false} stroke="#e9edf5" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#647087", fontSize: 11 }}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#647087", fontSize: 11 }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#2256e8"
              strokeWidth={2.4}
              dot={{ r: 4, fill: "#2256e8", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function DepartmentPie({ data = departments, total = 256 }) {
  return (
    <Card className="h-[222px] p-4">
      <Heading>Employees by Department</Heading>
      <div className="flex h-[172px] items-center">
        <div className="h-40 w-[52%]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={43}
                outerRadius={73}
                paddingAngle={1}
                stroke="none"
              >
                {data.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
              <text
                x="50%"
                y="48%"
                textAnchor="middle"
                className="fill-slate-900 text-lg font-bold"
              >
                {total}
              </text>
              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                className="fill-slate-500 text-[10px]"
              >
                Total
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2 text-[11px]">
          {data.map((item) => (
            <div
              className="flex items-center gap-2 whitespace-nowrap"
              key={item.name}
            >
              <span
                className="size-2.5 rounded-full"
                style={{ background: item.color }}
              />
              <label className="text-slate-600">{item.name}</label>
              <em className="ml-auto not-italic text-slate-500">
                {item.value}% ({item.count})
              </em>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}


function LeaveBalance({ data = leaveBalance }) {
  return (
    <Card className="h-[222px] p-4">
      <Heading>Leave Balance</Heading>
      {data.map(([name, days, color]) => (
        <div
          className="flex items-center gap-2 border-b border-slate-100 py-2.5 text-[11px]"
          key={name}
        >
          <span className={`text-base ${color}`}>●</span>
          <label className="text-slate-600">{name}</label>
          <strong className="ml-auto text-blue-600">{days}</strong>
        </div>
      ))}
      <a
        className="mt-2 block text-[11px] font-semibold text-blue-600"
        href="#leave"
      >
        View all balances
      </a>
    </Card>
  );
}

function PendingLeaveRequests({ data = leaveRequests }) {
  return (
    <Card className="h-[228px] p-4" id="leave">
      <Heading
        action={
          <a className="text-[11px] font-semibold text-blue-600" href="#leave">
            View all
          </a>
        }
      >
        Pending Leave Requests
      </Heading>
      {data.map(([initials, name, date, type, days, color]) => (
        <div
          className="grid grid-cols-[29px_1fr_auto] items-center gap-2 border-b border-slate-100 py-2 last:border-0 sm:grid-cols-[29px_1.12fr_1.22fr_auto_39px]"
          key={name}
        >
          <Avatar initials={initials} className="size-[29px]" />
          <strong className="text-[11px]">{name}</strong>
          <small className="hidden text-[10px] text-slate-500 sm:block">
            {date}
          </small>
          <span
            className={`rounded-full px-2 py-1 text-[9px] font-semibold ${color}`}
          >
            {type}
          </span>
          <em className="hidden text-right text-[10px] not-italic text-slate-500 sm:block">
            {days}
          </em>
        </div>
      ))}
    </Card>
  );
}

function WeeklyOverview({ data = weeklyData }) {
  return (
    <Card className="h-[228px] p-4 xl:col-span-2 2xl:col-span-1">
      <Heading
        action={
          <button className={selectStyle}>
            This Week <ChevronDown size={14} />
          </button>
        }
      >
        This Week Overview
      </Heading>
      <div className="mt-1 h-[174px]">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 8, right: 2, left: -20 }} barGap={2}>
            <CartesianGrid vertical={false} stroke="#e9edf5" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#647087", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#647087", fontSize: 11 }}
            />
            <Tooltip />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 11, paddingTop: 4 }}
            />
            <Bar dataKey="present" fill="#16a34a" />
            <Bar dataKey="absent" fill="#ff3c49" />
            <Bar dataKey="leave" fill="#2256e8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}


function UpcomingHolidays({ data = holidays }) {
  return (
    <Card className="min-h-[262px] p-4">
      <Heading
        action={
          <a className="text-[11px] font-semibold text-blue-600" href="#calendar">
            View calendar
          </a>
        }
      >
        Upcoming Holidays
      </Heading>
      {data.map(([holiday, date]) => (
        <div
          className="grid grid-cols-[27px_1fr_auto] items-center gap-2 border-b border-slate-100 py-3.5 text-[11px] last:border-0"
          key={holiday}
        >
          <span className="grid size-7 place-items-center rounded border border-slate-200 text-slate-600">
            <CalendarDays size={18} />
          </span>
          <label className="text-slate-600">{holiday}</label>
          <small className="text-[10px] text-slate-500">{date}</small>
        </div>
      ))}
    </Card>
  );
}

/* ================================================================== *
 *  ROLE VIEWS
 * ================================================================== */
function HrDashboard() {
  return (
    <>
      <StatsGrid stats={hrStats} />

      <div className="mt-3.5 grid gap-3.5 xl:grid-cols-2 2xl:grid-cols-[1.65fr_1.25fr_1.1fr_.9fr]">
        <AttendanceOverview />
        <DepartmentPie />
        <TodayStatus />
        <LeaveBalance />
      </div>

      <div className="mt-3.5 grid gap-3.5 xl:grid-cols-2 2xl:grid-cols-[1.06fr_.94fr_1.26fr]">
        <PendingLeaveRequests />
                <UpcomingHolidays />

        <WeeklyOverview />
      </div>

      <div
        className="mt-3.5 grid gap-3.5 2xl:grid-cols-[3.25fr_1.4fr]"
        id="employees"
      >
        <EmployeeDirectory />
      </div>
    </>
  );
}

function EmployeeDashboard() {
  return (
    <>
      <StatsGrid
        stats={employeeStats}
        className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4"
      />

      <div className="mt-3.5 grid gap-3.5 xl:grid-cols-2 2xl:grid-cols-[1.4fr_1fr_1fr]">
        <AttendanceOverview />
        <TodayStatus />
        <LeaveBalance />
      {/* </div>

      <div className="mt-3.5 grid gap-3.5 xl:grid-cols-2"> */}
        <UpcomingHolidays />
      </div>
    </>
  );
}

/* ================================================================== *
 *  MAIN EXPORT
 *  Renders inside YOUR existing DashboardLayout.
 *  Pass role="hr" or role="employee".
 * ================================================================== */
export default function Dashboard({ role = "hr" }) {
  return (
  <DashboardLayout role={role}>
{role === "hr" ? <HrDashboard /> : <EmployeeDashboard />}
</DashboardLayout>)
}
