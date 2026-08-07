import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import api from "../api/client";
import DashboardLayout from "../layouts/DashboardLayout";
import { Card, Heading } from "../components/employee/Card";
const get = (url) => api.get(url).then((r) => r.data);
const blank = { fullName: "", email: "", password: "", department: "" };
export default function EmployeesPage() {
  const qc = useQueryClient(),
    [search, setSearch] = useState(""),
    [form, setForm] = useState(blank),
    [open, setOpen] = useState(false);
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["employees"], queryFn: () => get("/employees") });
  const departments = useQuery({ queryKey: ["departments"], queryFn: () => get("/departments") });
  const visible = useMemo(
    () =>
      data.filter((x) =>
        `${x.fullName} ${x.email} ${x.department || ""}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [data, search],
  );
  const create = useMutation({
    mutationFn: () => api.post("/auth/register", form),
    onSuccess: () => {
      setForm(blank);
      setOpen(false);
      qc.invalidateQueries({ queryKey: ["employees"] });
    },
  });
  return (
    <DashboardLayout active="Employees">
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Heading>Employee Directory</Heading>
          <label className="ml-auto flex items-center gap-2 rounded border border-slate-200 px-3 py-2 text-slate-500">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employees"
              className="outline-none"
            />
          </label>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
          >
            <Plus size={17} />
            Add employee
          </button>
        </div>
        {error && <p className="mt-4 text-rose-600">{error.message}</p>}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="p-3">Employee</th>
                <th>Email</th>
                <th>Department</th>
                <th>Leave allowance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="p-4" colSpan="5">
                    Loading employees…
                  </td>
                </tr>
              ) : (
                visible.map((employee) => (
                  <tr className="border-t border-slate-100" key={employee.id}>
                    <td className="p-3 font-medium">{employee.fullName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department || "—"}</td>
                    <td>{employee.annualLeaveAllowance} days</td>
                    <td>
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${employee.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                      >
                        {employee.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              create.mutate();
            }}
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Add employee</h2>
              <button type="button" onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              The employee can use these credentials to sign in.
            </p>
            <div className="mt-4 space-y-3">
              {[
                ["fullName", "Full name", "text"],
                ["email", "Email", "email"],
                ["password", "Temporary password", "password"],
              ].map(([key, label, type]) => (
                <input
                  key={key}
                  required={key !== "department"}
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={label}
                  className="w-full rounded border border-slate-200 p-2.5"
                />
              ))}
              <select
                required
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full rounded border border-slate-200 p-2.5"
              >
                <option value="">Select department</option>
                {departments.data?.filter((department) => department.isActive).map((department) => <option key={department.id} value={department.name}>{department.name}</option>)}
              </select>
            </div>
            {create.error && (
              <p className="mt-3 text-sm text-rose-600">
                {create.error.message}
              </p>
            )}
            <button
              disabled={create.isPending}
              className="mt-5 w-full rounded bg-blue-600 py-2.5 font-semibold text-white"
            >
              {create.isPending ? "Creating…" : "Create employee"}
            </button>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
}
