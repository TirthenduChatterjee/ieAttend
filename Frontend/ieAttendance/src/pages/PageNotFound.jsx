import { Link } from "react-router";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-7xl font-bold text-indigo-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p className="mt-2 text-gray-500">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
      >
        Go to Login
      </Link>
    </div>
  );
}