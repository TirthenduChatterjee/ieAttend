import { Search,Eye,Pencil,MoreVertical,ChevronLeft, ChevronRight,Plus,ChevronDown } from "lucide-react";
import { Card } from "./Card";
import Avatar from "./Avatar";
const employees = [
  ["JD", "John Doe", "EMP001", "Engineering", "Software Engineer", "john.doe@company.com", "+1 555 123 4567"],
  ["SJ", "Sarah Johnson", "EMP002", "Marketing", "Marketing Manager", "sarah.johnson@company.com", "+1 555 234 5678"],
  ["MB", "Michael Brown", "EMP003", "Finance", "Accountant", "michael.brown@company.com", "+1 555 345 6789"],
];
const selectStyle =
  "inline-flex items-center justify-between gap-4 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] text-slate-600";

export default function EmployeeDirectory({ data = employees, total = 256 }) {
  const columns = [
    "Employee",
    "Department",
    "Designation",
    "Email",
    "Phone",
    "Status",
    "Action",
  ];
  return (
    <Card className="min-h-[262px] p-4">
      <div className="flex flex-wrap items-center gap-2.5">
        <h2 className="mr-auto text-sm font-bold">Employee Directory</h2>
        <label className="flex w-full items-center gap-2 rounded-md border border-slate-200 px-2.5 py-2 text-slate-400 sm:w-72">
          <Search size={16} />
          <input
            className="min-w-0 flex-1 text-[11px] outline-none"
            placeholder="Search by name, email or department..."
          />
        </label>
        <button className={selectStyle}>
          All Departments <ChevronDown size={14} />
        </button>
        <button className={selectStyle}>
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
              {columns.map((title) => (
                <th className="px-4 py-2 font-semibold" key={title}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(([initials, name, id, dept, job, email, phone]) => (
              <tr className="border-t border-slate-100 text-slate-600" key={id}>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Avatar initials={initials} className="size-7" />
                    <div>
                      <strong className="block text-slate-700">{name}</strong>
                      <small className="text-[9px] text-slate-400">{id}</small>
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
                    <Eye size={15} />
                    <Pencil size={14} />
                    <MoreVertical size={16} />
                  </div>
                </td>
              </tr>
            ))}
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
        <span>
          1–{data.length} of {total}
        </span>
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
  );
}
