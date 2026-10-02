import { useState } from "react";
import type { FormEvent } from "react";

import "./RestaurantTablesSetup.css";

export interface RestaurantTable {
  id: string;
  number: string;
  seats: string;
  status: "active" | "inactive";
}

interface RestaurantTablesSetupProps {
  onBack: () => void;
  onContinue: (tables: RestaurantTable[]) => void;
}

export default function RestaurantTablesSetup({
  onBack,
  onContinue,
}: RestaurantTablesSetupProps) {
  const [tables, setTables] = useState<RestaurantTable[]>([
    {
      id: "table-1",
      number: "1",
      seats: "2",
      status: "active",
    },
    {
      id: "table-2",
      number: "2",
      seats: "4",
      status: "active",
    },
    {
      id: "table-3",
      number: "3",
      seats: "4",
      status: "active",
    },
  ]);

  const [error, setError] = useState("");

  function addTable() {
    const nextNumber =
      tables.length > 0
        ? Math.max(
            ...tables.map((table) =>
              Number(table.number) || 0,
            ),
          ) + 1
        : 1;

    setTables((current) => [
      ...current,
      {
        id: `table-${Date.now()}`,
        number: String(nextNumber),
        seats: "4",
        status: "active",
      },
    ]);
  }

  function updateTable(
    id: string,
    field: keyof RestaurantTable,
    value: string,
  ) {
    setTables((current) =>
      current.map((table) =>
        table.id === id
          ? {
              ...table,
              [field]: value,
            }
          : table,
      ),
    );
  }

  function removeTable(id: string) {
    setTables((current) =>
      current.filter((table) => table.id !== id),
    );
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    if (tables.length === 0) {
      setError("Please add at least one table.");
      return;
    }

    const invalidTable = tables.find(
      (table) =>
        !table.number.trim() ||
        !table.seats.trim(),
    );

    if (invalidTable) {
      setError(
        "Please complete every table before continuing.",
      );
      return;
    }

    const numbers = tables.map(
      (table) => table.number.trim(),
    );

    if (new Set(numbers).size !== numbers.length) {
      setError(
        "Each table must have a unique number.",
      );
      return;
    }

    onContinue(tables);
  }

  return (
    <main className="restaurant-tables-setup">
      <div className="restaurant-tables-setup__shell">
        <button
          type="button"
          className="restaurant-tables-setup__back"
          onClick={onBack}
        >
          ← Back
        </button>

        <section className="restaurant-tables-setup__card">
          <div className="restaurant-tables-setup__brand">
            <span className="restaurant-tables-setup__logo">
              K
            </span>
            <span>KhanaFlow</span>
          </div>

          <div className="restaurant-tables-setup__progress">
            <div className="restaurant-tables-setup__progress-top">
              <span>STEP 3 OF 3</span>
              <span>Tables setup</span>
            </div>

            <div className="restaurant-tables-setup__progress-track">
              <div className="restaurant-tables-setup__progress-fill" />
            </div>
          </div>

          <div className="restaurant-tables-setup__heading">
            <p className="restaurant-tables-setup__eyebrow">
              RESTAURANT TABLES
            </p>

            <h1>
              Add your
              <br />
              tables.
            </h1>

            <p>
              Each table will later receive its own
              permanent QR code for customer ordering.
            </p>
          </div>

          <form
            className="restaurant-tables-setup__form"
            onSubmit={handleSubmit}
          >
            <div className="restaurant-tables-setup__summary">
              <div>
                <strong>{tables.length}</strong>
                <span>Tables</span>
              </div>

              <div>
                <strong>
                  {tables.filter(
                    (table) =>
                      table.status === "active",
                  ).length}
                </strong>
                <span>Active</span>
              </div>
            </div>

            <div className="restaurant-tables-list">
              {tables.map((table, index) => (
                <article
                  className="restaurant-table-card"
                  key={table.id}
                >
                  <div className="restaurant-table-card__number">
                    <span>{index + 1}</span>
                  </div>

                  <div className="restaurant-table-card__fields">
                    <label>
                      Table number
                      <input
                        type="text"
                        value={table.number}
                        onChange={(event) =>
                          updateTable(
                            table.id,
                            "number",
                            event.target.value,
                          )
                        }
                      />
                    </label>

                    <label>
                      Seats
                      <input
                        type="number"
                        min="1"
                        value={table.seats}
                        onChange={(event) =>
                          updateTable(
                            table.id,
                            "seats",
                            event.target.value,
                          )
                        }
                      />
                    </label>
                  </div>

                  <button
                    type="button"
                    className="restaurant-table-card__remove"
                    onClick={() =>
                      removeTable(table.id)
                    }
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="restaurant-tables-setup__add"
              onClick={addTable}
            >
              <span>+</span>
              Add another table
            </button>

            {error && (
              <p className="restaurant-tables-setup__error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="restaurant-tables-setup__submit"
            >
              Continue to QR setup
              <span>→</span>
            </button>
          </form>

          <p className="restaurant-tables-setup__note">
            You can manage tables and add new ones
            later from your dashboard.
          </p>
        </section>
      </div>
    </main>
  );
}