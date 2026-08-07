import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./pages/auth/Login";
import AuthLayout from "./layouts/AuthLayout";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="sign-in" element={<Register/>} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
