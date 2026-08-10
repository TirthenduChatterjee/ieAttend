import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '../api/client'
import DashboardLayout from '../layouts/DashboardLayout'
import { Card, Heading } from '../components/employee/Card'
import { currentUser } from '../auth'

const get = (url) => api.get(url).then((r) => r.data)

export default function LeavePage() {
  const user = currentUser()
  const isHr = user?.role === 'Hr'
  const queryClient = useQueryClient()
  const [form, setForm] = useState({ type: 'Casual', startDate: '', endDate: '', reason: '' })
  const mine = useQuery({ queryKey: ['my-leaves'], queryFn: () => get('/leaves/me'), enabled: !isHr })
  const balance = useQuery({ queryKey: ['leave-balance'], queryFn: () => get('/leaves/balance'), enabled: !isHr })
  const all = useQuery({ queryKey: ['all-leaves'], queryFn: () => get('/leaves'), enabled: isHr })
  const apply = useMutation({
    mutationFn: () => api.post('/leaves', form),
    onSuccess: () => {
      setForm({ type: 'Casual', startDate: '', endDate: '', reason: '' })
      queryClient.invalidateQueries({ queryKey: ['my-leaves'] })
      queryClient.invalidateQueries({ queryKey: ['leave-balance'] })
    },
  })
  const review = useMutation({
    mutationFn: ({ id, status }) => api.put(`/leaves/${id}/review`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-leaves'] }),
  })
  const rows = user?.role === 'Hr' ? (all.data || []).map((item) => ({ ...item.leave, employee: item.employee })) : (mine.data || [])

  return <DashboardLayout active="Leave"><div className={isHr ? '' : 'grid gap-4 xl:grid-cols-[.8fr_1.2fr]'}>
    {!isHr && <Card className="p-5"><Heading>Apply for leave</Heading>
      <form onSubmit={(e) => { e.preventDefault(); apply.mutate() }} className="mt-4 space-y-3">
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full rounded border border-slate-200 p-2"><option>Casual</option><option>Sick</option><option>Earned</option><option>Unpaid</option></select>
        <div className="grid grid-cols-2 gap-3"><input required type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="rounded border border-slate-200 p-2"/><input required type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="rounded border border-slate-200 p-2"/></div>
        <textarea required value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} placeholder="Reason for leave" className="min-h-24 w-full rounded border border-slate-200 p-2"/>
        <button className="w-full rounded bg-blue-600 py-2.5 text-sm font-semibold text-white">Submit request</button>
        {apply.error && <p className="text-sm text-rose-600">{apply.error.message}</p>}
      </form>
      {balance.data && <p className="mt-5 rounded bg-blue-50 p-3 text-sm text-blue-800">{balance.data.remaining} paid days remaining · {balance.data.unpaidDays} unpaid days used</p>}
    </Card>}
    <Card className="p-5"><Heading>{isHr ? 'Review leave requests' : 'My leave requests'}</Heading>{isHr && <p className="mt-1 text-sm text-slate-500">Approve or reject pending employee leave requests.</p>}<div className="mt-4 overflow-x-auto"><table className="w-full min-w-[560px] text-left text-sm"><thead className="bg-slate-50 text-xs text-slate-500"><tr>{isHr && <th className="p-3">Employee</th>}<th className="p-3">Dates</th><th>Type</th><th>Days</th><th>Status</th>{isHr && <th>Action</th>}</tr></thead><tbody>
      {rows.map((leave) => <tr className="border-t border-slate-100" key={leave.id}>{user?.role === 'Hr' && <td className="p-3">{leave.employee.fullName}</td>}<td className="p-3">{leave.startDate} – {leave.endDate}</td><td>{leave.type}</td><td>{leave.days}</td><td>{leave.status}</td>{user?.role === 'Hr' && <td>{leave.status === 'Pending' && <span className="flex gap-2"><button onClick={() => review.mutate({ id: leave.id, status: 'Approved' })} className="text-emerald-600">Approve</button><button onClick={() => review.mutate({ id: leave.id, status: 'Rejected' })} className="text-rose-600">Reject</button></span>}</td>}</tr>)}
    </tbody></table></div></Card>
  </div></DashboardLayout>
}
