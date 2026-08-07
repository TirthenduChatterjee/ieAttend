import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogIn, LogOut } from "lucide-react";
import api from "../api/client";
import DashboardLayout from "../layouts/DashboardLayout";
import { Card, Heading } from "../components/employee/Card";

const get = (url) => api.get(url).then((r) => r.data);
const time = (value) =>
  value
    ? new Date(value).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";
export default function AttendancePage() {
  const qc = useQueryClient();
  const { data: today, error } = useQuery({
    queryKey: ["today-attendance"],
    queryFn: () => get("/attendance/today"),
  });
  const { data: records = [] } = useQuery({
    queryKey: ["attendance"],
    queryFn: () => get("/attendance/me"),
  });
  const mutation = useMutation({
    mutationFn: (endpoint) => api.post(`/attendance/${endpoint}`, {}),
    onSuccess: () =>
      qc
        .invalidateQueries({ queryKey: ["today-attendance"] })
        .then(() => qc.invalidateQueries({ queryKey: ["attendance"] })),
  });
  return (
    <DashboardLayout active="Attendance">
      <div className="grid gap-4 lg:grid-cols-[.85fr_1.5fr]">
        <Card className="p-5">
          <Heading>Today&apos;s attendance</Heading>
          <p className="mt-6 text-2xl font-bold">
            {today?.status || "Not checked in"}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Check in: {time(today?.checkInUtc)} · Check out:{" "}
            {time(today?.checkOutUtc)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Working hours: {today?.workingHours ?? "—"}
          </p>
          {!today ? (
            <button
              disabled={mutation.isPending}
              onClick={() => mutation.mutate("check-in")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-3 text-sm font-semibold text-white"
            >
              <LogIn size={18} />
              Check in
            </button>
          ) : !today.checkOutUtc ? (
            <button
              disabled={mutation.isPending}
              onClick={() => mutation.mutate("check-out")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-3 text-sm font-semibold text-white"
            >
              <LogOut size={18} />
              Check out
            </button>
          ) : (
            <p className="mt-6 rounded bg-emerald-50 p-3 text-sm text-emerald-700">
              Your workday is complete.
            </p>
          )}
          {(error || mutation.error) && (
            <p className="mt-3 text-sm text-rose-600">
              {(error || mutation.error).message}
            </p>
          )}
        </Card>
        <Card className="p-5">
          <Heading>Attendance history</Heading>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[550px] text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500">
                <tr>
                  <th className="p-3">Date</th>
                  <th>Check in</th>
                  <th>Check out</th>
                  <th>Hours</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="border-t border-slate-100">
                    <td className="p-3">{record.workDate}</td>
                    <td>{time(record.checkInUtc)}</td>
                    <td>{time(record.checkOutUtc)}</td>
                    <td>{record.workingHours ?? "—"}</td>
                    <td>{record.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
