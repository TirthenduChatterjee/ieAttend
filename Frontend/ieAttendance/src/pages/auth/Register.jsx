import { Link } from "react-router";
import FloatingInput from "../../components/auth/FloatingInput";
import { useState } from "react";
export default function Register() {
  const [fullName, setFullName] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 text-2xl font-bold text-indigo-700">ieATTEND</div>

        <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>

        <p className="mt-2 text-gray-500">
          Fill in the details below to create your account.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5">
        {/* Full Name */}
        <FloatingInput label="Full Name" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} id="fullname" />

        {/* Email */}
       <FloatingInput label="Email Address" placeholder="Enter your email" type="email" id="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /> 

        {/* Password */}
        <FloatingInput label="Password" placeholder="Enter your password" type="password" id="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />

        {/* Confirm Password */}
        <FloatingInput label="Confirm Password" placeholder="Confirm your password" type="password" id="confirmPassword" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />

        {/* Register Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 cursor-pointer"
        >
          Create Account
        </button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/" className="font-semibold text-indigo-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
