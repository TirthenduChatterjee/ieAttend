import { Link } from "react-router";
import { Outlet } from "react-router";
import AuthIllustration from "../assets/auth-illustration.svg";

export default function AuthLayout() {
  return (
    <>
      <div className="auth-layout flex w-full h-screen border-2 justify-center items-center bg-linear-to-br from-indigo-50 to-violet-100">
          <Outlet />
      </div>
    </>
  );
}
