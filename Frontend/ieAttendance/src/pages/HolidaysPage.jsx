import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import api from '../api/client'
import DashboardLayout from '../layouts/DashboardLayout'
import { Card, Heading } from '../components/employee/Card'

const get = (url) => api.get(url).then((response) => response.data)
const blank = { name: '', holidayDate: '', description: '' }

export default function HolidaysPage() {
  const queryClient = useQueryClient()
  const [form, setForm] = useState(blank)
  const [editingId, setEditingId] = useState(null)
  const holidays = useQuery({ queryKey: ['holidays'], queryFn: () => get('/holidays') })
  const save = useMutation({
    mutationFn: () => editingId ? api.put(`/holidays/${editingId}`, form) : api.post('/holidays', form),
    onSuccess: () => { setForm(blank); setEditingId(null); queryClient.invalidateQueries({ queryKey: ['holidays'] }) },
  })
  const remove = useMutation({ mutationFn: (id) => api.delete(`/holidays/${id}`), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['holidays'] }) })
  const edit = (holiday) => { setEditingId(holiday.id); setForm({ name: holiday.name, holidayDate: holiday.holidayDate, description: holiday.description || '' }) }

  return <DashboardLayout active="Holidays"><div className="grid gap-4 xl:grid-cols-[.75fr_1.25fr]">
    <Card className="p-5"><Heading>{editingId ? 'Edit holiday' : 'Add holiday'}</Heading>
      <form onSubmit={(event) => { event.preventDefault(); save.mutate() }} className="mt-4 space-y-3">
        <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Holiday name" className="w-full rounded border border-slate-200 p-2" />
        <input required type="date" value={form.holidayDate} onChange={(event) => setForm({ ...form, holidayDate: event.target.value })} className="w-full rounded border border-slate-200 p-2" />
        <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Description (optional)" className="min-h-24 w-full rounded border border-slate-200 p-2" />
        <div className="flex gap-2"><button disabled={save.isPending} className="flex-1 rounded bg-blue-600 py-2.5 text-sm font-semibold text-white">{editingId ? 'Save changes' : 'Add holiday'}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(blank) }} className="rounded border border-slate-200 px-4 text-sm">Cancel</button>}</div>
        {save.error && <p className="text-sm text-rose-600">{save.error.message}</p>}
      </form>
    </Card>
    <Card className="p-5"><Heading>Company holidays</Heading><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm"><thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="p-3">Date</th><th>Name</th><th>Description</th><th>Actions</th></tr></thead><tbody>{(holidays.data || []).map((holiday) => <tr key={holiday.id} className="border-t border-slate-100"><td className="p-3 font-medium">{holiday.holidayDate}</td><td>{holiday.name}</td><td className="text-slate-500">{holiday.description || '—'}</td><td><span className="flex gap-3"><button onClick={() => edit(holiday)} className="text-blue-600" aria-label={`Edit ${holiday.name}`}><Pencil size={16} /></button><button onClick={() => remove.mutate(holiday.id)} className="text-rose-600" aria-label={`Delete ${holiday.name}`}><Trash2 size={16} /></button></span></td></tr>)}{!holidays.isLoading && !holidays.data?.length && <tr><td colSpan="4" className="p-4 text-slate-500">No holidays have been added yet.</td></tr>}</tbody></table></div></Card>
  </div></DashboardLayout>
}
