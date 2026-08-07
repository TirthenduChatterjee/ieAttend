import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./pages/auth/Login";
import AuthLayout from "./layouts/AuthLayout";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";
import LeavePage from "./pages/LeavePage";
import DepartmentsPage from "./pages/DepartmentsPage";
import { currentUser } from "./auth";

function Protected({ children, hrOnly = false }) {
  const user = currentUser();
  if (!user) return <Navigate to="/" replace />;
  if (hrOnly && user.role !== "Hr") return <Navigate to="/dashboard" replace />;
  return children;
}
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/employees" element={<Protected hrOnly><EmployeesPage /></Protected>} />
        <Route path="/attendance" element={<Protected><AttendancePage /></Protected>} />
        <Route path="/leave" element={<Protected><LeavePage /></Protected>} />
        <Route path="/departments" element={<Protected hrOnly><DepartmentsPage /></Protected>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
