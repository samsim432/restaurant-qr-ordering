import { useState } from "react";
import type { FormEvent } from "react";

import "./RestaurantSetup.css";

interface RestaurantSetupProps {
  onBack: () => void;
  onComplete: (restaurant: RestaurantDetails) => void;
}

export interface RestaurantDetails {
  name: string;
  phone: string;
  address: string;
  description: string;
}

export default function RestaurantSetup({
  onBack,
  onComplete,
}: RestaurantSetupProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your restaurant name.");
      return;
    }

    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!address.trim()) {
      setError("Please enter your restaurant address.");
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
    <main className="restaurant-setup">
      <div className="restaurant-setup__shell">

        <button
          type="button"
          className="restaurant-setup__back"
          onClick={onBack}
        >
          ← Back
        </button>

        <section className="restaurant-setup__card">

          <div className="restaurant-setup__brand">
            <span className="restaurant-setup__logo">
              K
            </span>

            <span>KhanaFlow</span>
          </div>

          <div className="restaurant-setup__progress">
            <span className="restaurant-setup__progress-active" />
            <span />
            <span />
          </div>

          <div className="restaurant-setup__heading">
            <p className="restaurant-setup__eyebrow">
              RESTAURANT SETUP
            </p>

            <h1>
              Tell us about
              <br />
              your restaurant.
            </h1>

            <p>
              Add some basic information about your
              restaurant. You can change these details
              later from your settings.
            </p>
          </div>

          <form
            className="restaurant-setup__form"
            onSubmit={handleSubmit}
          >

            <label className="restaurant-setup__field">
              <span>Restaurant name</span>

              <input
                type="text"
                placeholder="Himalayan Kitchen"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                autoComplete="organization"
              />
            </label>

            <label className="restaurant-setup__field">
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

            <label className="restaurant-setup__field">
              <span>Restaurant address</span>

              <input
                type="text"
                placeholder="Thamel, Kathmandu"
                value={address}
                onChange={(event) =>
                  setAddress(event.target.value)
                }
                autoComplete="street-address"
              />
            </label>

            <label className="restaurant-setup__field">
              <span>
                Description
                <small>Optional</small>
              </span>

              <textarea
                placeholder="Authentic Nepali food and Himalayan cuisine."
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                rows={4}
              />
            </label>

            {error && (
              <p className="restaurant-setup__error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="restaurant-setup__submit"
            >
              Continue setup
              <span>→</span>
            </button>

          </form>

          <p className="restaurant-setup__note">
            Step 1 of 3 · Basic restaurant information
          </p>

        </section>
      </div>
    </main>
  );
}