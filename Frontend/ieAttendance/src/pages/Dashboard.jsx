import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
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
  const [selectedStatus, setSelectedStatus] = useState(null)
  if (dashboard.isLoading) return <p className="p-5 text-slate-500">Loading the HR dashboard…</p>
  if (dashboard.error) return <p className="p-5 text-rose-600">{dashboard.error.message}</p>
  const data = dashboard.data; const list = departments.data || []
  const chartData = [{ status: 'Present', value: data.today.present, fill: '#16a34a' }, { status: 'Absent', value: data.today.absent, fill: '#e11d48' }, { status: 'Late', value: data.today.late, fill: '#f59e0b' }]
  const selectedEmployees = selectedStatus ? (data.attendanceBreakdown?.[selectedStatus.toLowerCase()] || []) : []
  return <><div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4"><Metric icon={Users} label="Active employees" value={data.totalEmployees} note="Company-wide"/><Metric icon={UserRoundCheck} label="Present today" value={data.today.present} note="Click the chart for names"/><Metric icon={UserRoundX} label="Absent today" value={data.today.absent} note="Click the chart for names"/><Metric icon={Plane} label="Pending leaves" value={data.pendingLeaveRequests} note="Needs review"/></div><div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_.9fr]"><Card className="p-4"><Heading>Today&apos;s attendance</Heading><p className="mt-1 text-sm text-slate-500">Select a bar to view employees in that group.</p><div className="mt-3 h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData} margin={{ top: 12, right: 12, left: -20 }}><XAxis dataKey="status" tickLine={false}/><YAxis allowDecimals={false} tickLine={false}/><Tooltip cursor={{ fill: '#f1f5f9' }}/><Bar dataKey="value" radius={[6, 6, 0, 0]} onClick={(entry) => setSelectedStatus(entry.status)}>{chartData.map((entry) => <Cell key={entry.status} fill={entry.fill} className="cursor-pointer" opacity={!selectedStatus || selectedStatus === entry.status ? 1 : .45}/>)}</Bar></BarChart></ResponsiveContainer></div>{selectedStatus && <div className="mt-3 rounded-md border border-slate-200"><div className="flex items-center justify-between border-b border-slate-100 px-3 py-2"><strong className="text-sm">{selectedStatus} employees ({selectedEmployees.length})</strong><button onClick={() => setSelectedStatus(null)} className="text-xs text-blue-600">Clear</button></div><div className="max-h-44 overflow-y-auto">{selectedEmployees.length ? selectedEmployees.map((employee) => <div key={employee.id} className="flex justify-between border-b border-slate-100 px-3 py-2 text-sm last:border-0"><span>{employee.fullName}</span><span className="text-slate-500">{employee.department || '—'}</span></div>) : <p className="p-3 text-sm text-slate-500">No employees in this group.</p>}</div></div>}</Card><Card className="p-4"><Heading>Employees by Department</Heading><div className="mt-2 flex h-52 items-center"><ResponsiveContainer width="55%" height="100%"><PieChart><Pie data={list} dataKey="employeeCount" nameKey="name" innerRadius={45} outerRadius={75}>{list.map((item, index) => <Cell key={item.id} fill={colors[index % colors.length]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div className="flex-1 space-y-2 text-xs">{list.map((item, index) => <div key={item.id} className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ background: colors[index % colors.length] }}/><span>{item.name}</span><b className="ml-auto">{item.employeeCount}</b></div>)}</div></div></Card></div></>
}

export default function Dashboard() { return <DashboardLayout>{currentUser()?.role === 'Hr' ? <HrDashboard/> : <EmployeeDashboard/>}</DashboardLayout> }
