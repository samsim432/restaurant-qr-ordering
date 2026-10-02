import { useState } from "react";
import type { FormEvent } from "react";

import "./HotelSetup.css";

export interface HotelDetails {
  name: string;
  phone: string;
  address: string;
  description: string;
}

interface HotelSetupProps {
  onBack: () => void;
  onComplete: (hotel: HotelDetails) => void;
}

export default function HotelSetup({
  onBack,
  onComplete,
}: HotelSetupProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your hotel name.");
      return;
    }

    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!address.trim()) {
      setError("Please enter your hotel address.");
      return;
    }

    onComplete({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      description: description.trim(),
    });
  }

  return (
    <main className="hotel-setup">
      <div className="hotel-setup__shell">

        <button
          type="button"
          className="hotel-setup__back"
          onClick={onBack}
        >
          ← Back
        </button>

        <section className="hotel-setup__card">

          <div className="hotel-setup__brand">
            <span className="hotel-setup__logo">
              K
            </span>

            <span>KhanaFlow</span>
          </div>

          <div className="hotel-setup__progress">
            <span className="hotel-setup__progress-active" />
            <span />
            <span />
          </div>

          <div className="hotel-setup__heading">
            <p className="hotel-setup__eyebrow">
              HOTEL SETUP
            </p>

            <h1>
              Tell us about
              <br />
              your hotel.
            </h1>

            <p>
              Add some basic information about your
              hotel. You can change these details later
              from your settings.
            </p>
          </div>

          <form
            className="hotel-setup__form"
            onSubmit={handleSubmit}
          >

            <label className="hotel-setup__field">
              <span>Hotel name</span>

              <input
                type="text"
                placeholder="Himalayan Hotel"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                autoComplete="organization"
              />
            </label>

            <label className="hotel-setup__field">
              <span>Phone number</span>

              <input
                type="tel"
                placeholder="+977 98XXXXXXXX"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                autoComplete="tel"
              />
            </label>

            <label className="hotel-setup__field">
              <span>Hotel address</span>

              <input
                type="text"
                placeholder="Lakeside, Pokhara"
                value={address}
                onChange={(event) =>
                  setAddress(event.target.value)
                }
                autoComplete="street-address"
              />
            </label>

            <label className="hotel-setup__field">
              <span>
                Description
                <small>Optional</small>
              </span>

              <textarea
                placeholder="A comfortable hotel with room service and modern amenities."
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                rows={4}
              />
            </label>

            {error && (
              <p className="hotel-setup__error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="hotel-setup__submit"
            >
              Continue setup
              <span>→</span>
            </button>

          </form>

          <p className="hotel-setup__note">
            Step 1 of 3 · Basic hotel information
          </p>

        </section>
      </div>
    </main>
  );
}