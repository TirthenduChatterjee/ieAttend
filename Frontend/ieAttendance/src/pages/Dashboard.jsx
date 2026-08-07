import { useQuery } from '@tanstack/react-query'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { AlertCircle, Clock3, Plane, Users, UserRoundCheck, UserRoundX } from 'lucide-react'
import api from '../api/client'
import DashboardLayout from '../layouts/DashboardLayout'
import TodayStatus from '../components/employee/TodayStatus'
import { Card, Heading } from '../components/employee/Card'
import { currentUser } from '../auth'

const get = (url) => api.get(url).then((r) => r.data)
const time = (value) => value ? new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'
const colors = ['#2256e8', '#16a34a', '#f59e0b', '#7c3aed', '#0891b2', '#e11d48']
function Metric({ icon: Icon, label, value, note }) { return <Card className="flex min-h-28 items-center justify-between p-4"><div><p className="text-xs text-slate-500">{label}</p><strong className="mt-1 block text-2xl">{value ?? '—'}</strong><small className="text-slate-500">{note}</small></div><span className="grid size-12 place-items-center rounded-full bg-blue-50 text-blue-600"><Icon size={24}/></span></Card> }

function EmployeeDashboard() {
  const dashboard = useQuery({ queryKey: ['employee-dashboard'], queryFn: () => get('/dashboard/employee') })
  if (dashboard.isLoading) return <p className="p-5 text-slate-500">Loading your dashboard…</p>
  if (dashboard.error) return <p className="p-5 text-rose-600">{dashboard.error.message}</p>
  const data = dashboard.data; const attendance = data.todayAttendance
  return <><div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4"><Metric icon={UserRoundCheck} label="Present days" value={data.month.present + data.month.late} note="This month"/><Metric icon={Clock3} label="Working hours" value={`${data.month.workingHours}h`} note="This month"/><Metric icon={Plane} label="Leave balance" value={data.leave.remaining} note="Days remaining"/><Metric icon={AlertCircle} label="Pending requests" value={data.leave.pending} note="Awaiting approval"/></div><div className="mt-4 grid gap-4 xl:grid-cols-2"><TodayStatus status={attendance?.status || 'Not checked in'} checkInLabel={attendance ? `Checked in at ${time(attendance.checkInUtc)}` : 'No attendance recorded'} checkIn={time(attendance?.checkInUtc)} checkOut={time(attendance?.checkOutUtc)} workingTime={attendance?.workingHours ? `${attendance.workingHours}h` : '—'}/><Card className="p-5"><Heading>Monthly attendance</Heading><div className="mt-5 grid grid-cols-3 gap-3 text-center"><div><b className="text-2xl text-emerald-600">{data.month.present}</b><p className="text-xs text-slate-500">Present</p></div><div><b className="text-2xl text-amber-500">{data.month.late}</b><p className="text-xs text-slate-500">Late</p></div><div><b className="text-2xl text-rose-500">{data.month.halfDay}</b><p className="text-xs text-slate-500">Half days</p></div></div></Card></div></>
}

function HrDashboard() {
  const dashboard = useQuery({ queryKey: ['hr-dashboard'], queryFn: () => get('/dashboard/hr') })
  const departments = useQuery({ queryKey: ['departments'], queryFn: () => get('/departments') })
  if (dashboard.isLoading) return <p className="p-5 text-slate-500">Loading the HR dashboard…</p>
  if (dashboard.error) return <p className="p-5 text-rose-600">{dashboard.error.message}</p>
  const data = dashboard.data; const list = departments.data || []
  return <><div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4"><Metric icon={Users} label="Active employees" value={data.totalEmployees} note="Company-wide"/><Metric icon={UserRoundCheck} label="Present today" value={data.today.present} note={`${data.today.checkedIn} checked in`}/><Metric icon={UserRoundX} label="Absent today" value={data.today.absent} note="No attendance record"/><Metric icon={Plane} label="Pending leaves" value={data.pendingLeaveRequests} note="Needs review"/></div><div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_.9fr]"><Card className="p-4"><Heading>Today&apos;s attendance</Heading><div className="mt-3 overflow-x-auto"><table className="w-full min-w-[580px] text-left text-sm"><thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="p-3">Employee</th><th>Department</th><th>Check in</th><th>Status</th><th>Hours</th></tr></thead><tbody>{data.attendance.length ? data.attendance.map(({ employee, record }) => <tr className="border-t border-slate-100" key={record.id}><td className="p-3 font-medium">{employee.fullName}</td><td>{employee.department || '—'}</td><td>{time(record.checkInUtc)}</td><td>{record.status}</td><td>{record.workingHours ?? 'In progress'}</td></tr>) : <tr><td className="p-4 text-slate-500" colSpan="5">No employee has checked in today.</td></tr>}</tbody></table></div></Card><Card className="p-4"><Heading>Employees by Department</Heading><div className="mt-2 flex h-52 items-center"><ResponsiveContainer width="55%" height="100%"><PieChart><Pie data={list} dataKey="employeeCount" nameKey="name" innerRadius={45} outerRadius={75}>{list.map((item, index) => <Cell key={item.id} fill={colors[index % colors.length]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div className="flex-1 space-y-2 text-xs">{list.map((item, index) => <div key={item.id} className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ background: colors[index % colors.length] }}/><span>{item.name}</span><b className="ml-auto">{item.employeeCount}</b></div>)}</div></div></Card></div></>
}
export default function Dashboard() { return <DashboardLayout>{currentUser()?.role === 'Hr' ? <HrDashboard/> : <EmployeeDashboard/>}</DashboardLayout> }
