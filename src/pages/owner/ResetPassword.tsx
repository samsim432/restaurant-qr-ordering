import { useState } from "react";
import type { FormEvent } from "react";

import "./ResetPassword.css";

interface ResetPasswordProps {
  onBack: () => void;
  onLogin: () => void;
}

export default function ResetPassword({
  onBack,
  onLogin,
}: ResetPasswordProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(false);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    if (!password) {
      setError("Please enter a new password.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters.",
      );
      return;
    }

    if (!confirmPassword) {
      setError(
        "Please confirm your new password.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setUpdated(true);
  }

  if (updated) {
    return (
      <main className="reset-password">
        <div className="reset-password__shell">
          <button
            type="button"
            className="reset-password__back"
            onClick={onBack}
          >
            ← Back to login
          </button>

          <section className="reset-password__card">
            <div className="reset-password__brand">
              <span className="reset-password__logo">
                K
              </span>

              <span>KhanaFlow</span>
            </div>

            <div className="reset-password__success-icon">
              ✓
            </div>

            <div className="reset-password__heading">
              <p className="reset-password__eyebrow">
                PASSWORD UPDATED
              </p>

              <h1>
                Your password
                <br />
                has been changed.
              </h1>

              <p>
                Your new password has been set
                successfully. You can now sign in
                to your business account.
              </p>
            </div>

            <button
              type="button"
              className="reset-password__submit"
              onClick={onLogin}
            >
              Continue to login
              <span>→</span>
            </button>

            <p className="reset-password__note">
              This is currently a frontend demo.
              Password updates will be connected
              to the backend later.
            </p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="reset-password">
      <div className="reset-password__shell">
        <button
          type="button"
          className="reset-password__back"
          onClick={onBack}
        >
          ← Back
        </button>

        <section className="reset-password__card">
          <div className="reset-password__brand">
            <span className="reset-password__logo">
              K
            </span>

            <span>KhanaFlow</span>
          </div>

          <div className="reset-password__heading">
            <p className="reset-password__eyebrow">
              NEW PASSWORD
            </p>

            <h1>
              Create a new
              <br />
              password.
            </h1>

            <p>
              Choose a strong password for your
              KhanaFlow business account.
            </p>
          </div>

          <form
            className="reset-password__form"
            onSubmit={handleSubmit}
          >
            <label className="reset-password__field">
              <span>New password</span>

              <div className="reset-password__password">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="reset-password__password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current,
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </label>

            <label className="reset-password__field">
              <span>Confirm new password</span>

              <div className="reset-password__password">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value,
                    )
                  }
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="reset-password__password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      (current) => !current,
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </label>

            {error && (
              <p className="reset-password__error">
                {error}
              </p>
            )}

            <div className="reset-password__requirements">
              <span>Password requirements</span>

              <p
                className={
                  password.length >= 8
                    ? "is-valid"
                    : ""
                }
              >
                <span>
                  {password.length >= 8
                    ? "✓"
                    : "○"}
                </span>
                At least 8 characters
              </p>

              <p
                className={
                  password &&
                  password === confirmPassword
                    ? "is-valid"
                    : ""
                }
              >
                <span>
                  {password &&
                  password === confirmPassword
                    ? "✓"
                    : "○"}
                </span>
                Passwords match
              </p>
            </div>

            <button
              type="submit"
              className="reset-password__submit"
            >
              Update password
              <span>→</span>
            </button>
          </form>

          <p className="reset-password__login">
            Remember your password?{" "}
            <button
              type="button"
              onClick={onLogin}
            >
              Back to login
            </button>
          </p>
        </section>
      </div>
    </main>
  );
}