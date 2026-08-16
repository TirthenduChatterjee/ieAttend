import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus } from "lucide-react";
import api from "../api/client";
import DashboardLayout from "../layouts/DashboardLayout";
import { Card, Heading } from "../components/employee/Card";

const get = (url) => api.get(url).then((r) => r.data);
export default function DepartmentsPage() {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  const departments = useQuery({
    queryKey: ["departments"],
    queryFn: () => get("/departments"),
  });
  const create = useMutation({
    mutationFn: () => api.post("/departments", { name }),
    onSuccess: () => {
      setName("");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
  return (
    <DashboardLayout active="Departments">
      <Card className="p-5">
        <div className="flex flex-wrap items-center gap-3">
          <Heading>Departments</Heading>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              create.mutate();
            }}
            className="ml-auto flex gap-2"
          >
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Department name"
              className="rounded border border-slate-200 px-3 py-2 text-sm"
            />
            <button className="flex items-center gap-2 rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white">
              <Plus size={16} />
              Add department
            </button>
          </form>
        </div>
        {create.error && (
          <p className="mt-3 text-sm text-rose-600">{create.error.message}</p>
        )}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="p-3">Department</th>
                <th>Active employees</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {departments.isLoading ? (
                <tr>
                  <td className="p-4" colSpan="4">
                    Loading departments…
                  </td>
                </tr>
              ) : (
                departments.data?.map((department) => (
                  <tr key={department.id} className="border-t border-slate-100">
                    <td className="p-3 font-medium">{department.name}</td>
                    <td>{department.employeeCount}</td>
                    <td>
                      <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700">
                        Active
                      </span>
                    </td>
                    <td>
                      {new Date(department.createdAtUtc).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
