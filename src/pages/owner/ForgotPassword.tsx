
import { useState } from "react";
import type { FormEvent } from "react";

import "./ForgotPassword.css";

interface ForgotPasswordProps {
  onBack: () => void;
  onLogin: () => void;
  onResetPassword: () => void;
}

export default function ForgotPassword({
  onBack,
  onLogin,
  onResetPassword,
}: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="forgot-password">
        <div className="forgot-password__shell">
          <button
            type="button"
            className="forgot-password__back"
            onClick={onBack}
          >
            ← Back to login
          </button>

          <section className="forgot-password__card">
            <div className="forgot-password__brand">
              <span className="forgot-password__logo">
                K
              </span>

              <span>KhanaFlow</span>
            </div>

            <div className="forgot-password__success-icon">
              ✓
            </div>

            <div className="forgot-password__heading">
              <p className="forgot-password__eyebrow">
                CHECK YOUR EMAIL
              </p>

              <h1>
                Reset link
                <br />
                is on its way.
              </h1>

              <p>
                If an account exists for{" "}
                <strong>{email}</strong>, we would
                send instructions to reset your
                password.
              </p>
            </div>

            <button
              type="button"
              className="forgot-password__submit"
              onClick={onResetPassword}
            >
              Continue to reset password
              <span>→</span>
            </button>

            <p className="forgot-password__note">
              This is currently a frontend demo.
              Email delivery will be connected to
              the backend later.
            </p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="forgot-password">
      <div className="forgot-password__shell">
        <button
          type="button"
          className="forgot-password__back"
          onClick={onBack}
        >
          ← Back to login
        </button>

        <section className="forgot-password__card">
          <div className="forgot-password__brand">
            <span className="forgot-password__logo">
              K
            </span>

            <span>KhanaFlow</span>
          </div>

          <div className="forgot-password__heading">
            <p className="forgot-password__eyebrow">
              PASSWORD RESET
            </p>

            <h1>
              Forgot your
              <br />
              password?
            </h1>

            <p>
              Enter the email address associated
              with your business account and we'll
              help you reset your password.
            </p>
          </div>

          <form
            className="forgot-password__form"
            onSubmit={handleSubmit}
          >
            <label className="forgot-password__field">
              <span>Email address</span>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
              />
            </label>

            {error && (
              <p className="forgot-password__error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="forgot-password__submit"
            >
              Send reset link
              <span>→</span>
            </button>
          </form>

          <p className="forgot-password__login">
            Remember your password?{" "}
            <button
              type="button"
              onClick={onLogin}
            >
              Back to login
            </button>
          </p>

          <p className="forgot-password__note">
            This is currently a frontend demo.
            Password reset will be connected to
            the backend later.
          </p>
        </section>
      </div>
    </main>
  );
}