import {
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Gift,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MoreVertical,
  Pencil,
  Plane,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Users,
  UserRoundCheck,
  UserRoundX,
  View,
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

const stats = [
  [
    "Total Employees",
    "256",
    "+12 this month",
    Users,
    "text-blue-600 bg-blue-50",
  ],
  [
    "Present Today",
    "190",
    "74.2% of total",
    UserRoundCheck,
    "text-emerald-600 bg-emerald-50",
  ],
  [
    "Absent Today",
    "42",
    "16.4% of total",
    UserRoundX,
    "text-rose-500 bg-rose-50",
  ],
  ["On Leave", "24", "9.4% of total", Plane, "text-amber-500 bg-amber-50"],
  [
    "Departments",
    "12",
    "Active departments",
    Building2,
    "text-violet-600 bg-violet-50",
  ],
  [
    "Upcoming Birthdays",
    "5",
    "In next 7 days",
    Gift,
    "text-blue-600 bg-blue-50",
  ],
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
  [
    "SJ",
    "Sarah Johnson",
    "May 20 – May 22, 2024",
    "Sick Leave",
    "2 days",
    "bg-amber-50 text-amber-600",
  ],
  [
    "MB",
    "Michael Brown",
    "May 21 – May 23, 2024",
    "Casual Leave",
    "3 days",
    "bg-blue-50 text-blue-600",
  ],
  [
    "ED",
    "Emily Davis",
    "May 24 – May 25, 2024",
    "Earned Leave",
    "2 days",
    "bg-emerald-50 text-emerald-600",
  ],
  [
    "DW",
    "David Wilson",
    "May 27 – May 31, 2024",
    "Maternity Leave",
    "5 days",
    "bg-violet-50 text-violet-600",
  ],
];
const employees = [
  [
    "JD",
    "John Doe",
    "EMP001",
    "Engineering",
    "Software Engineer",
    "john.doe@company.com",
    "+1 555 123 4567",
  ],
  [
    "SJ",
    "Sarah Johnson",
    "EMP002",
    "Marketing",
    "Marketing Manager",
    "sarah.johnson@company.com",
    "+1 555 234 5678",
  ],
  [
    "MB",
    "Michael Brown",
    "EMP003",
    "Finance",
    "Accountant",
    "michael.brown@company.com",
    "+1 555 345 6789",
  ],
];

const card = "rounded-xl border border-slate-200 bg-white shadow-sm";
const select =
  "inline-flex items-center justify-between gap-4 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] text-slate-600";
const Avatar = ({ initials, className = "" }) => (
  <span
    className={`grid size-8 shrink-0 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-blue-700 to-amber-300 text-[10px] font-bold text-white ${className}`}
  >
    {initials}
  </span>
);
const Card = ({ children, className = "" }) => (
  <section className={`${card} ${className}`}>{children}</section>
);
const Heading = ({ children, action }) => (
  <div className="flex items-center justify-between gap-3">
    <h2 className="text-sm font-bold text-slate-800">{children}</h2>
    {action}
  </div>
);

export default function Dashboard() {
  const nav = [
    [LayoutDashboard, "Dashboard"],
    [Users, "Employees"],
    [Clock3, "Attendance"],
    [Plane, "Leave"],
    [FileText, "My Activity"],
    [ShieldCheck, "Performance"],
    [FileText, "Reports"],
    [Building2, "Departments"],
    [Settings, "Settings"],
    [LogOut, "Logout"],
  ];
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white p-3 lg:block">
        <div className="flex items-center gap-3 px-3 pb-6 pt-2 text-2xl font-extrabold text-blue-600">
          <Users size={30} fill="currentColor" />
          HRMS
        </div>
        <nav className="space-y-1">
          {nav.map(([Icon, label], index) => (
            <a
              href="#dashboard"
              key={label}
              className={`flex items-center gap-4 rounded-md px-3 py-3 font-medium ${index === 0 ? "bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-md shadow-blue-600/20" : "text-slate-600 hover:bg-slate-50"}`}
            >
              <Icon size={19} />
              {label}
            </a>
          ))}
        </nav>
        <div className="mx-3 mt-5 border-t border-slate-200 pt-5">
          <p className="mb-3 text-[10px] font-bold text-slate-500">SHORTCUTS</p>
          {[
            [Plus, "Add Employee"],
            [CalendarDays, "Apply Leave"],
            [FileText, "Generate Report"],
          ].map(([Icon, label]) => (
            <a
              href="#employees"
              key={label}
              className="flex items-center gap-3 py-2.5 text-sm font-medium text-slate-600"
            >
              <Icon size={17} />
              {label}
            </a>
          ))}
        </div>
      </aside>
      <main className="min-w-0 flex-1" id="dashboard">
        <header className="flex h-16 items-center gap-5 border-b border-slate-200 bg-white px-4 md:px-7">
          <button className="text-slate-800">
            <Menu />
          </button>
          <label className="flex w-full max-w-[352px] items-center gap-2.5 rounded-md border border-slate-200 px-3 py-2 text-slate-400">
            <Search size={18} />
            <input
              className="min-w-0 flex-1 outline-none"
              placeholder="Search employees, departments..."
            />
            <kbd className="hidden rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-400 sm:block">
              Ctrl + K
            </kbd>
          </label>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-1">
              <Bell size={20} />
              <b className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-rose-500 text-[9px] text-white">
                3
              </b>
            </button>
            <button className="relative hidden p-1 sm:block">
              <Mail size={20} />
              <b className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-rose-500 text-[9px] text-white">
                5
              </b>
            </button>
            <span className="hidden h-8 w-px bg-slate-200 sm:block" />
            <Avatar initials="JD" />
            <div className="hidden text-left sm:block">
              <strong className="block text-xs">John Doe</strong>
              <small className="text-[11px] text-slate-500">HR Manager</small>
            </div>
            <ChevronDown className="hidden sm:block" size={16} />
          </div>
        </header>
        <div className="mx-auto max-w-[1500px] p-3.5">
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
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
          <div className="mt-3.5 grid gap-3.5 xl:grid-cols-2 2xl:grid-cols-[1.65fr_1.25fr_1.1fr_.9fr]">
            <Card className="h-[222px] p-4">
              <Heading
                action={
                  <button className={select}>
                    This Week <ChevronDown size={15} />
                  </button>
                }
              >
                Attendance Overview
              </Heading>
              <div className="mt-1 h-[171px]">
                <ResponsiveContainer>
                  <LineChart
                    data={attendanceData}
                    margin={{ top: 12, right: 8, left: -19 }}
                  >
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
            <Card className="h-[222px] p-4">
              <Heading>Employees by Department</Heading>
              <div className="flex h-[172px] items-center">
                <div className="h-40 w-[52%]">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={departments}
                        dataKey="value"
                        innerRadius={43}
                        outerRadius={73}
                        paddingAngle={1}
                        stroke="none"
                      >
                        {departments.map((item) => (
                          <Cell key={item.name} fill={item.color} />
                        ))}
                      </Pie>
                      <text
                        x="50%"
                        y="48%"
                        textAnchor="middle"
                        className="fill-slate-900 text-lg font-bold"
                      >
                        256
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
                  {departments.map((item) => (
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
            <Card className="h-[222px] p-4">
              <Heading
                action={
                  <small className="text-[10px] text-slate-500">
                    Checked in at 09:15 AM
                  </small>
                }
              >
                Today&apos;s Status
              </Heading>
              <div className="mt-4 flex items-center gap-3 rounded-lg bg-emerald-50 px-4 py-3.5 font-semibold text-emerald-600">
                <i className="size-2 rounded-full bg-emerald-500" />
                Present
              </div>
              <div className="my-4 grid grid-cols-[1.2fr_1fr_1fr] gap-1 px-1">
                <div>
                  <small className="block text-[9px] text-slate-500">
                    Working Time
                  </small>
                  <strong className="text-xs">09h 15m</strong>
                </div>
                <div>
                  <small className="block text-[9px] text-slate-500">
                    Check-In
                  </small>
                  <strong className="text-xs">09:15 AM</strong>
                </div>
                <div>
                  <small className="block text-[9px] text-slate-500">
                    Check-Out
                  </small>
                  <strong className="text-xs">-:-:-</strong>
                </div>
              </div>
              <button className="flex w-full items-center justify-center gap-3 rounded-md bg-blue-600 py-2.5 text-xs font-semibold text-white">
                Check Out <LogOut size={18} />
              </button>
            </Card>
            <Card className="h-[222px] p-4">
              <Heading>Leave Balance</Heading>
              {[
                ["Casual Leave", "6 Days", "text-blue-500"],
                ["Sick Leave", "4 Days", "text-amber-500"],
                ["Earned Leave", "12 Days", "text-emerald-500"],
                ["Maternity Leave", "60 Days", "text-violet-500"],
              ].map(([name, days, color]) => (
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
          </div>
          <div className="mt-3.5 grid gap-3.5 xl:grid-cols-2 2xl:grid-cols-[1.06fr_.94fr_1.26fr]">
            <Card className="h-[228px] p-4" id="leave">
              <Heading
                action={
                  <a
                    className="text-[11px] font-semibold text-blue-600"
                    href="#leave"
                  >
                    View all
                  </a>
                }
              >
                Pending Leave Requests
              </Heading>
              {leaveRequests.map(
                ([initials, name, date, type, days, color]) => (
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
                ),
              )}
            </Card>
            <Card className="h-[228px] p-4">
              <Heading
                action={
                  <a
                    className="text-[11px] font-semibold text-blue-600"
                    href="#activities"
                  >
                    View all
                  </a>
                }
              >
                Recent Activities
              </Heading>
              {[
                [
                  Gift,
                  "John Doe checked in",
                  "Today at 09:15 AM",
                  "text-blue-600 bg-blue-50",
                ],
                [
                  CalendarDays,
                  "Sarah Johnson applied for Sick Leave",
                  "Today at 08:45 AM",
                  "text-violet-600 bg-violet-50",
                ],
                [
                  CheckCircle2,
                  "Michael Brown's leave request approved",
                  "Yesterday at 04:30 PM",
                  "text-emerald-600 bg-emerald-50",
                ],
                [
                  ShieldCheck,
                  "New employee David Wilson onboarded",
                  "May 18, 2024 at 10:00 AM",
                  "text-amber-600 bg-amber-50",
                ],
              ].map(([Icon, message, when, color]) => (
                <div className="flex items-center gap-3 py-2" key={message}>
                  <span
                    className={`grid size-7 place-items-center rounded-full ${color}`}
                  >
                    <Icon size={16} />
                  </span>
                  <div>
                    <strong className="block text-[11px] font-medium">
                      {message}
                    </strong>
                    <small className="text-[10px] text-slate-500">{when}</small>
                  </div>
                </div>
              ))}
            </Card>
            <Card className="h-[228px] p-4 xl:col-span-2 2xl:col-span-1">
              <Heading
                action={
                  <button className={select}>
                    This Week <ChevronDown size={14} />
                  </button>
                }
              >
                This Week Overview
              </Heading>
              <div className="mt-1 h-[174px]">
                <ResponsiveContainer>
                  <BarChart
                    data={weeklyData}
                    margin={{ top: 8, right: 2, left: -20 }}
                    barGap={2}
                  >
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
          </div>
          <div
            className="mt-3.5 grid gap-3.5 2xl:grid-cols-[3.25fr_1.4fr]"
            id="employees"
          >
            <Card className="min-h-[262px] p-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="mr-auto text-sm font-bold">
                  Employee Directory
                </h2>
                <label className="flex w-full items-center gap-2 rounded-md border border-slate-200 px-2.5 py-2 text-slate-400 sm:w-72">
                  <Search size={16} />
                  <input
                    className="min-w-0 flex-1 text-[11px] outline-none"
                    placeholder="Search by name, email or department..."
                  />
                </label>
                <button className={select}>
                  All Departments <ChevronDown size={14} />
                </button>
                <button className={select}>
                  All Status <ChevronDown size={14} />
                </button>
                <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3.5 py-2 text-[11px] font-semibold text-white">
                  <Plus size={17} />
                  Add Employee
                </button>
              </div>
              <div className="-mx-4 mt-3 overflow-x-auto">
                <table className="w-full min-w-[820px] border-collapse text-[10px]">
                  <thead className="bg-slate-50 text-left text-slate-700">
                    <tr>
                      {[
                        "Employee",
                        "Department",
                        "Designation",
                        "Email",
                        "Phone",
                        "Status",
                        "Action",
                      ].map((title) => (
                        <th className="px-4 py-2 font-semibold" key={title}>
                          {title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map(
                      ([initials, name, id, dept, job, email, phone]) => (
                        <tr
                          className="border-t border-slate-100 text-slate-600"
                          key={id}
                        >
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              <Avatar initials={initials} className="size-7" />
                              <div>
                                <strong className="block text-slate-700">
                                  {name}
                                </strong>
                                <small className="text-[9px] text-slate-400">
                                  {id}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-2">{dept}</td>
                          <td className="px-4 py-2">{job}</td>
                          <td className="px-4 py-2">{email}</td>
                          <td className="px-4 py-2">{phone}</td>
                          <td className="px-4 py-2">
                            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] text-emerald-600">
                              Active
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex gap-3 text-slate-500">
                              <View size={15} />
                              <Pencil size={14} />
                              <MoreVertical size={16} />
                            </div>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between gap-3 pt-3 text-[10px] text-slate-500">
                <span className="hidden sm:block">
                  Rows per page:{" "}
                  <button className="ml-1 inline-flex items-center gap-1 rounded border border-slate-200 px-2 py-1">
                    10 <ChevronDown size={13} />
                  </button>
                </span>
                <span>1–3 of 256</span>
                <div className="flex items-center gap-3">
                  <ChevronLeft size={17} />
                  <b className="grid size-5 place-items-center rounded bg-blue-600 text-white">
                    1
                  </b>
                  <span>2</span>
                  <span>3</span>
                  <span>…</span>
                  <span>26</span>
                  <ChevronRight size={17} />
                </div>
              </div>
            </Card>
            <Card className="min-h-[262px] p-4">
              <Heading
                action={
                  <a
                    className="text-[11px] font-semibold text-blue-600"
                    href="#calendar"
                  >
                    View calendar
                  </a>
                }
              >
                Upcoming Holidays
              </Heading>
              {[
                ["Memorial Day", "May 27, 2024"],
                ["Independence Day", "Jul 4, 2024"],
                ["Labor Day", "Sep 2, 2024"],
                ["Thanksgiving Day", "Nov 28, 2024"],
              ].map(([holiday, date]) => (
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
          </div>
        </div>
      </main>
    </div>
  );
}
