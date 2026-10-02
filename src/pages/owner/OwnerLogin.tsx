import { useState } from "react";
import type { FormEvent } from "react";

import "./OwnerLogin.css";

interface OwnerLoginProps {
  onBack: () => void;
  onLogin: () => void;
  onForgotPassword: () => void;
  onRegister: () => void;
}

export default function OwnerLogin({
  onBack,
  onLogin,
  onForgotPassword,
  onRegister,
}: OwnerLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    onLogin();
  }

  return (
    <main className="owner-login">
      <div className="owner-login__shell">
        <button
          type="button"
          className="owner-login__back"
          onClick={onBack}
        >
          ← Back
        </button>

        <section className="owner-login__card">
          <div className="owner-login__brand">
            <span className="owner-login__logo">K</span>
            <span>KhanaFlow</span>
          </div>

          <div className="owner-login__heading">
            <p className="owner-login__eyebrow">
              WELCOME BACK
            </p>

            <h1>
              Sign in to your
              <br />
              business account.
            </h1>

            <p>
              Manage your restaurant or hotel,
              orders, menus and customers from
              one place.
            </p>
          </div>

          <form
            className="owner-login__form"
            onSubmit={handleSubmit}
          >
            <label className="owner-login__field">
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

            <label className="owner-login__field">
              <span>Password</span>

              <div className="owner-login__password">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="owner-login__password-toggle"
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

            <div className="owner-login__options">
              <label className="owner-login__remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(
                      event.target.checked,
                    )
                  }
                />

                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="owner-login__forgot"
                onClick={onForgotPassword}
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <p className="owner-login__error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="owner-login__submit"
            >
              Sign in
              <span>→</span>
            </button>
          </form>

          <p className="owner-login__register">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onRegister}
            >
              Create an account
            </button>
          </p>

          <p className="owner-login__note">
            This is currently a frontend demo.
            Authentication will be connected to
            the backend later.
          </p>
        </section>
      </div>
    </main>
  );
}