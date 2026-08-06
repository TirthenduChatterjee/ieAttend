import { useState } from "react";

export default function AuthField({ label, type = "text", ...props }) {
  const [visible, setVisible] = useState(false);
  const password = type === "password";
  return (
    <label className="auth-field">
      <span className="auth-field__label">{label}</span>
      <span className="auth-field__control">
        <input type={password && visible ? "text" : type} {...props} />
        {password && (
          <button
            type="button"
            className="auth-field__eye"
            onClick={() => setVisible(!visible)}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d={
                  visible
                    ? "M2.5 12c1.3-2.9 5.3-6.3 9.5-6.3s8.2 3.4 9.5 6.3c.3.6.3 1.2 0 1.8-1.3 2.9-5.3 6.3-9.5 6.3s-8.2-3.4-9.5-6.3a2 2 0 0 1 0-1.8Z M12 9.9a3 3 0 1 1 0 6"
                    : "m3 3 18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 5.1A10.8 10.8 0 0 1 12 4.9c5.2 0 8.7 4.3 9.5 6.1a1.9 1.9 0 0 1 0 1.8 12.9 12.9 0 0 1-3.1 3.9M6.3 6.3A13 13 0 0 0 2.5 11a1.9 1.9 0 0 0 0 1.8c1.3 2.9 5.3 6.3 9.5 6.3 1.1 0 2.2-.2 3.2-.6"
                }
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </span>
    </label>
  );
}
