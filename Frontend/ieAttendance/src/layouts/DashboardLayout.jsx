import { useState } from "react";
import {
  Building2,
  CalendarDays,
  ChevronDown,
  Clock3,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Plane,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";

/* ================================================================== *
 *  ROLE-BASED NAV DATA
 * ================================================================== */
const navByRole = {
  hr: [
    [LayoutDashboard, "Dashboard", "#dashboard"],
    [Users, "Employees", "#employees"],
    [Clock3, "Attendance", "#attendance"],
    [Plane, "Leave", "#leave"],
    [FileText, "Reports", "#reports"],
    [Building2, "Departments", "#departments"],
    [LogOut, "Logout", "#logout"],
  ],
  employee: [
    [LayoutDashboard, "Dashboard", "#dashboard"],
    [Clock3, "Attendance", "#attendance"],
    [Plane, "Leave", "#leave"],
    [FileText, "My Activity", "#activities"],
    [LogOut, "Logout", "#logout"],
  ],
};

const shortcutsByRole = {
  hr: [
    [Plus, "Add Employee", "#employees"],
    [CalendarDays, "Apply Leave", "#leave"],
    [FileText, "Generate Report", "#reports"],
  ],
  employee: [
    [CalendarDays, "Apply Leave", "#leave"],
    [FileText, "View Payslip", "#activities"],
  ],
};

/* ================================================================== *
 *  AVATAR
 * ================================================================== */
function Avatar({ initials, className = "" }) {
  return (
    <span
      className={`grid size-8 shrink-0 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-blue-700 to-amber-300 text-[10px] font-bold text-white ${className}`}
    >
      {initials}
    </span>
  );
}

/* ================================================================== *
 *  SIDEBAR
 *  Props:
 *   - collapsed : desktop icon-only rail (w-60 -> w-16)
 *   - mobileOpen: mobile slide-in drawer
 *   - onClose   : close the mobile drawer
 * ================================================================== */
function Sidebar({ role = "hr", active = "Dashboard", collapsed, mobileOpen, onClose }) {
  const nav = navByRole[role] ?? navByRole.hr;
  const shortcuts = shortcutsByRole[role] ?? shortcutsByRole.hr;

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 shrink-0 overflow-hidden border-r border-slate-200 bg-white p-3 transition-all duration-300 lg:static lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          ${collapsed ? "w-[74px]" : "w-60"}`}
      >
        {/* Brand + mobile close */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3 px-2 pt-2 text-2xl font-extrabold text-blue-600">
            <Users size={30} fill="currentColor" className="shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">ieATTEND</span>}
          </div>
          <button className="p-1 text-slate-500 lg:hidden" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Main nav */}
        <nav className="space-y-1">
          {nav.map(([Icon, label, href]) => (
            <a
              href={href}
              key={label}
              onClick={onClose}
              title={collapsed ? label : undefined}
              className={`flex items-center rounded-md py-3 font-medium ${
                collapsed ? "justify-center px-0" : "gap-4 px-3"
              } ${
                label === active
                  ? "bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon size={19} className="shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{label}</span>}
            </a>
          ))}
        </nav>

        {/* Shortcuts */}
        <div className="mx-1 mt-5 border-t border-slate-200 pt-5">
          {!collapsed && (
            <p className="mb-3 text-[10px] font-bold text-slate-500">SHORTCUTS</p>
          )}
          {shortcuts.map(([Icon, label, href]) => (
            <a
              href={href}
              key={label}
              onClick={onClose}
              title={collapsed ? label : undefined}
              className={`flex items-center py-2.5 text-sm font-medium text-slate-600 ${
                collapsed ? "justify-center px-0" : "gap-3"
              }`}
            >
              <Icon size={17} className="shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{label}</span>}
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}

/* ================================================================== *
 *  HEADER
 * ================================================================== */
function Header({ user, onToggleSidebar }) {
  const { initials = "JD", name = "John Doe", role = "HR Manager" } = user ?? {};

  return (
    <header className="flex h-16 items-center gap-5 border-b border-slate-200 bg-white px-4 md:px-7">
      {/* Toggle now visible on ALL screen sizes */}
      <button
        className="text-slate-800 cursor-pointer"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu />
      </button>

      {/* <label className="flex w-full max-w-[352px] items-center gap-2.5 rounded-md border border-slate-200 px-3 py-2 text-slate-400">
        <Search size={18} />
        <input
          className="min-w-0 flex-1 outline-none"
          placeholder="Search employees, departments..."
        />
        <kbd className="hidden rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-400 sm:block">
          Ctrl + K
        </kbd>
      </label> */}

      <div className="ml-auto flex items-center gap-3">
        <span className="hidden h-8 w-px bg-slate-200 sm:block" />
        <Avatar initials={initials} />
        <div className="hidden text-left sm:block">
          <strong className="block text-xs">{name}</strong>
          <small className="text-[11px] text-slate-500">{role}</small>
        </div>
        <ChevronDown className="hidden sm:block" size={16} />
      </div>
    </header>
  );
}

/* ================================================================== *
 *  LAYOUT — owns both states
 *   - desktopCollapsed : icon-only rail on lg+
 *   - mobileOpen       : slide-in drawer on small screens
 *  One Menu button drives the right behaviour based on screen size.
 * ================================================================== */
export default function DashboardLayout({ role = "hr", user, active, children }) {
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => {
    // lg breakpoint = 1024px. Collapse on desktop, drawer on mobile.
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setDesktopCollapsed((prev) => !prev);
    } else {
      setMobileOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      <Sidebar
        role={role}
        active={active}
        collapsed={desktopCollapsed}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <main className="min-w-0 flex-1" id="dashboard">
        <Header user={user} onToggleSidebar={handleToggle} />
        <div className="mx-auto max-w-[1500px] p-3.5">{children}</div>
      </main>
    </div>
  );
}
