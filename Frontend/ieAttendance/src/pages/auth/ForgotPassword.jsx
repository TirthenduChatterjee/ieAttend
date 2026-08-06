import { Link } from "react-router";
import AuthLayout from "../../layouts/AuthLayout";
import AuthField from "../../components/auth/AuthField";
import { MailArtwork } from "../../components/auth/AuthArtwork";

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <div className="auth-form auth-form--centered">
        <MailArtwork />
        <div className="auth-heading">
          <h1>Forgot your password?</h1>
          <p>
            Enter your email and we'll send you
            <br />a link to reset your password
          </p>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <AuthField
            label="Email address"
            type="email"
            placeholder="john.doe@company.com"
            autoComplete="email"
          />
          <button className="auth-button" type="submit">
            Send Reset Link
          </button>
        </form>
        <p className="auth-footnote">
          Back to <Link to="/login">login</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
