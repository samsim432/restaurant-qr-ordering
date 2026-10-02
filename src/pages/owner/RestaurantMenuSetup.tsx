import { useState } from "react";
import type { FormEvent } from "react";

import "./RestaurantMenuSetup.css";

export interface RestaurantMenuItem {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  available: boolean;
}

interface RestaurantMenuSetupProps {
  onBack: () => void;
  onContinue: (items: RestaurantMenuItem[]) => void;
}

const initialItems: RestaurantMenuItem[] = [
  {
    id: "item-1",
    name: "",
    category: "",
    price: "",
    description: "",
    available: true,
  },
];

export default function RestaurantMenuSetup({
  onBack,
  onContinue,
}: RestaurantMenuSetupProps) {
  const [items, setItems] =
    useState<RestaurantMenuItem[]>(initialItems);

  const [error, setError] = useState("");

  function updateItem(
    id: string,
    field: keyof RestaurantMenuItem,
    value: string | boolean,
  ) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  }

  function addItem() {
    setItems((currentItems) => [
      ...currentItems,
      {
        id: `item-${Date.now()}`,
        name: "",
        category: "",
        price: "",
        description: "",
        available: true,
      },
    ]);
  }

  function removeItem(id: string) {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== id,
      ),
    );
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError(
        "Please add at least one menu item.",
      );
      return;
    }

    const incompleteItem = items.find(
      (item) =>
        !item.name.trim() ||
        !item.category.trim() ||
        !item.price.trim(),
    );

    if (incompleteItem) {
      setError(
        "Please complete the item name, category and price.",
      );
      return;
    }

    onContinue(items);
  }

  return (
    <main className="restaurant-menu-setup">
      <div className="restaurant-menu-setup__shell">
        <button
          type="button"
          className="restaurant-menu-setup__back"
          onClick={onBack}
        >
          ← Back
        </button>

        <section className="restaurant-menu-setup__card">
          <div className="restaurant-menu-setup__brand">
            <span className="restaurant-menu-setup__logo">
              K
            </span>

            <span>KhanaFlow</span>
          </div>

          <div className="restaurant-menu-setup__progress">
            <div className="restaurant-menu-setup__progress-top">
              <span>STEP 2 OF 3</span>
              <span>Menu setup</span>
            </div>

            <div className="restaurant-menu-setup__progress-track">
              <div className="restaurant-menu-setup__progress-fill" />
            </div>
          </div>

          <div className="restaurant-menu-setup__heading">
            <p className="restaurant-menu-setup__eyebrow">
              RESTAURANT MENU
            </p>

            <h1>
              Add your first
              <br />
              menu items.
            </h1>

            <p>
              Add the food and drinks customers
              will see when they scan a table QR
              code.
            </p>
          </div>

          <form
            className="restaurant-menu-setup__form"
            onSubmit={handleSubmit}
          >
            <div className="restaurant-menu-setup__items">
              {items.map((item, index) => (
                <article
                  className="restaurant-menu-item"
                  key={item.id}
                >
                  <div className="restaurant-menu-item__header">
                    <div>
                      <span>
                        ITEM {index + 1}
                      </span>

                      <h2>
                        Menu item
                      </h2>
                    </div>

                    {items.length > 1 && (
                      <button
                        type="button"
                        className="restaurant-menu-item__remove"
                        onClick={() =>
                          removeItem(item.id)
                        }
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <label>
                    Item name
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

                  <div className="restaurant-menu-item__grid">
                    <label>
                      Category
                      <input
                        type="text"
                        placeholder="e.g. Momo"
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
                        step="0.01"
                        placeholder="250"
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
                      placeholder="Describe this menu item..."
                      value={item.description}
                      onChange={(event) =>
                        updateItem(
                          item.id,
                          "description",
                          event.target.value,
                        )
                      }
                      rows={3}
                    />
                  </label>

                  <label className="restaurant-menu-item__availability">
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

                    <span>
                      Available for ordering
                    </span>
                  </label>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="restaurant-menu-setup__add"
              onClick={addItem}
            >
              <span>+</span>
              Add another menu item
            </button>

            {error && (
              <p className="restaurant-menu-setup__error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="restaurant-menu-setup__submit"
            >
              Continue to tables
              <span>→</span>
            </button>
          </form>

          <p className="restaurant-menu-setup__note">
            You can add, edit and remove menu items
            later from your restaurant dashboard.
          </p>
        </section>
      </div>
    </main>
  );
}