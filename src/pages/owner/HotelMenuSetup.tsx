import { useState } from "react";
import type { FormEvent } from "react";

import "./HotelMenuSetup.css";

export interface HotelServiceItem {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  available: boolean;
}

interface HotelMenuSetupProps {
  onBack: () => void;
  onContinue: (items: HotelServiceItem[]) => void;
}

export default function HotelMenuSetup({
  onBack,
  onContinue,
}: HotelMenuSetupProps) {
  const [items, setItems] = useState<HotelServiceItem[]>([
    {
      id: "service-1",
      name: "",
      category: "Room Service",
      price: "",
      description: "",
      available: true,
    },
  ]);

  const [error, setError] = useState("");

  function updateItem(
    id: string,
    field: keyof HotelServiceItem,
    value: string | boolean,
  ) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, [field]: value }
          : item,
      ),
    );
  }

  function addItem() {
    setItems((current) => [
      ...current,
      {
        id: `service-${Date.now()}`,
        name: "",
        category: "Room Service",
        price: "",
        description: "",
        available: true,
      },
    ]);
  }

  function removeItem(id: string) {
    setItems((current) =>
      current.filter((item) => item.id !== id),
    );
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError(
        "Please add at least one service or menu item.",
      );
      return;
    }

    if (
      items.some(
        (item) =>
          !item.name.trim() ||
          !item.category.trim() ||
          !item.price.trim(),
      )
    ) {
      setError(
        "Please complete the name, category and price for every item.",
      );
      return;
    }

    onContinue(items);
  }

  return (
    <main className="hotel-menu-setup">
      <div className="hotel-menu-setup__shell">
        <button
          type="button"
          className="hotel-menu-setup__back"
          onClick={onBack}
        >
          ← Back
        </button>

        <section className="hotel-menu-setup__card">
          <div className="hotel-menu-setup__brand">
            <span>K</span>
            <strong>KhanaFlow</strong>
          </div>

          <div className="hotel-menu-setup__progress">
            <span>STEP 2 OF 3</span>
            <span>Services & menu</span>
          </div>

          <div className="hotel-menu-setup__heading">
            <p>HOTEL SERVICES</p>

            <h1>
              Add your
              <br />
              hotel services.
            </h1>

            <p>
              Add room-service food, drinks or other
              services your guests can request.
            </p>
          </div>

          <form
            className="hotel-menu-setup__form"
            onSubmit={handleSubmit}
          >
            {items.map((item, index) => (
              <article
                className="hotel-service"
                key={item.id}
              >
                <div className="hotel-service__header">
                  <div>
                    <span>
                      SERVICE {index + 1}
                    </span>
                    <h2>Service item</h2>
                  </div>

                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>

                <label>
                  Name
                  <input
                    type="text"
                    placeholder="e.g. Chicken Momo"
                    value={item.name}
                    onChange={(event) =>
                      updateItem(
                        item.id,
                        "name",
                        event.target.value,
                      )
                    }
                  />
                </label>

                <div className="hotel-service__grid">
                  <label>
                    Category
                    <input
                      type="text"
                      placeholder="Room Service"
                      value={item.category}
                      onChange={(event) =>
                        updateItem(
                          item.id,
                          "category",
                          event.target.value,
                        )
                      }
                    />
                  </label>

                  <label>
                    Price
                    <input
                      type="number"
                      min="0"
                      placeholder="500"
                      value={item.price}
                      onChange={(event) =>
                        updateItem(
                          item.id,
                          "price",
                          event.target.value,
                        )
                      }
                    />
                  </label>
                </div>

                <label>
                  Description
                  <textarea
                    rows={3}
                    placeholder="Describe this service..."
                    value={item.description}
                    onChange={(event) =>
                      updateItem(
                        item.id,
                        "description",
                        event.target.value,
                      )
                    }
                  />
                </label>

                <label className="hotel-service__available">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={(event) =>
                      updateItem(
                        item.id,
                        "available",
                        event.target.checked,
                      )
                    }
                  />
                  Available to guests
                </label>
              </article>
            ))}

            <button
              type="button"
              className="hotel-menu-setup__add"
              onClick={addItem}
            >
              + Add another service
            </button>

            {error && (
              <p className="hotel-menu-setup__error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="hotel-menu-setup__submit"
            >
              Continue to rooms
              <span>→</span>
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}