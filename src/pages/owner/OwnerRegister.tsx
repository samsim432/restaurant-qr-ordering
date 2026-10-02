import { useState } from "react";
import type { FormEvent } from "react";

import "./OwnerRegister.css";

interface OwnerRegisterProps {
  onBack: () => void;
  onRegistered: () => void;
}

export default function OwnerRegister({
  onBack,
  onRegistered,
}: OwnerRegisterProps) {
  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [agree, setAgree] =
    useState(false);

  const [error, setError] =
    useState("");

  function handleSubmit(
    event: FormEvent,
  ) {
    event.preventDefault();

    setError("");

    if (!fullName.trim()) {
      setError(
        "Please enter your full name.",
      );

      return;
    }

    if (!email.trim()) {
      setError(
        "Please enter your email address.",
      );

      return;
    }

    if (!password) {
      setError(
        "Please create a password.",
      );

      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters.",
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match.",
      );

      return;
    }

    if (!agree) {
      setError(
        "Please agree to the Terms and Privacy Policy.",
      );

      return;
    }

    /*
     * Frontend-only for now.
     *
     * Real account creation will be
     * connected after the complete
     * frontend workflow is finished.
     */

    onRegistered();
  }

  return (
    <main className="owner-register">
      <div className="owner-register__shell">

        <button
          type="button"
          className="owner-register__back"
          onClick={onBack}
        >
          ← Back
        </button>

        <section className="owner-register__card">

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="owner-register__brand">

            <span className="owner-register__logo">
              K
            </span>

            <span>
              KhanaFlow
            </span>

          </div>

          {/* =================================================
              HEADING
          ================================================= */}

          <div className="owner-register__heading">

            <p className="owner-register__eyebrow">
              GET STARTED
            </p>

            <h1>
              Create your
              <br />
              business account.
            </h1>

            <p>
              Manage your restaurant or hotel,
              accept orders, and give your customers
              a simple QR ordering experience.
            </p>

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            className="owner-register__form"
            onSubmit={
              handleSubmit
            }
          >

            {/* Full name */}

            <label>
              Full name

              <input
                type="text"
                placeholder="Samir Simkhada"
                value={
                  fullName
                }
                onChange={(
                  event,
                ) =>
                  setFullName(
                    event.target
                      .value,
                  )
                }
                autoComplete="name"
              />
            </label>

            {/* Email */}

            <label>
              Email address

              <input
                type="email"
                placeholder="you@example.com"
                value={
                  email
                }
                onChange={(
                  event,
                ) =>
                  setEmail(
                    event.target
                      .value,
                  )
                }
                autoComplete="email"
              />
            </label>

            {/* Password */}

            <label>
              Password

              <input
                type="password"
                placeholder="At least 8 characters"
                value={
                  password
                }
                onChange={(
                  event,
                ) =>
                  setPassword(
                    event.target
                      .value,
                  )
                }
                autoComplete="new-password"
              />
            </label>

            {/* Confirm password */}

            <label>
              Confirm password

              <input
                type="password"
                placeholder="Repeat your password"
                value={
                  confirmPassword
                }
                onChange={(
                  event,
                ) =>
                  setConfirmPassword(
                    event.target
                      .value,
                  )
                }
                autoComplete="new-password"
              />
            </label>

            {/* Error */}

            {error && (
              <p className="owner-register__error">
                {error}
              </p>
            )}

            {/* Terms */}

            <label className="owner-register__terms">

              <input
                type="checkbox"
                checked={
                  agree
                }
                onChange={(
                  event,
                ) =>
                  setAgree(
                    event.target
                      .checked,
                  )
                }
              />

              <span>
                I agree to the Terms of Service
                and Privacy Policy.
              </span>

            </label>

            {/* Submit */}

            <button
              type="submit"
              className="owner-register__submit"
            >
              Create account

              <span>
                →
              </span>
            </button>

          </form>

          {/* =================================================
              LOGIN
          ================================================= */}

          <p className="owner-register__login">

            Already have an account?{" "}

            <button
              type="button"
            >
              Log in
            </button>

          </p>

          {/* =================================================
              DEMO NOTE
          ================================================= */}

          <p className="owner-register__note">
            This is currently a frontend demo.
            Account creation will be connected to
            the backend later.
          </p>

        </section>
      </div>
    </main>
  );
}