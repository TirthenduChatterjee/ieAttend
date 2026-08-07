import { useNavigate } from "react-router";
import { useState } from "react";
import api from "../../api/client";
import { saveSession } from "../../auth";
import FloatingInput from "../../components/auth/FloatingInput";
const LoginHeader = () => (
  <div className="mb-8">
    <div className="text-2xl font-bold text-indigo-700 mb-2">
      <span>ieATTEND</span>
    </div>

    <h1 className="text-3xl font-bold text-gray-900">
      Login to your Account
    </h1>

    <p className="text-gray-500 mt-2">
      Welcome back! Please enter your details.
    </p>
  </div>
);
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try { const { data } = await api.post("/auth/login", formData); saveSession(data); navigate("/dashboard"); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }
  return (
    <div className="login w-full max-w-md bg-white rounded-2xl shadow-md p-8">
      {/* Header */}
      <LoginHeader />
      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Email */}
        <FloatingInput
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        {/* Password */}
        <FloatingInput
          label="Password"
          placeholder="Enter your password"
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-indigo-600"
            />
            <span>Remember me</span>
          </label>

          <a
            href="/forgot-password"
            className="text-indigo-600 hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit" 
          className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="rounded-md bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}
      </form>
    </div>
  );
}
