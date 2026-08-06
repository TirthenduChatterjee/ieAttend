import { Link } from "react-router";
import AuthLayout from "../../layouts/AuthLayout";
import AuthField from "../../components/auth/AuthField";
import { LockArtwork } from "../../components/auth/AuthArtwork";

export default function ResetPassword() {
  return (
    <AuthLayout>
      <div className="auth-form auth-form--centered">
        <LockArtwork />
        <div className="auth-heading">
          <h1>Reset your password</h1>
          <p>Enter your new password below</p>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <AuthField
            label="New Password"
            type="password"
            placeholder="Enter a new password"
            autoComplete="new-password"
          />
          <AuthField
            label="Confirm Password"
            type="password"
            placeholder="Confirm your new password"
            autoComplete="new-password"
          />
          <button className="auth-button" type="submit">
            Reset Password
          </button>
        </form>
        <p className="auth-footnote">
          Back to <Link to="/login">login</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
