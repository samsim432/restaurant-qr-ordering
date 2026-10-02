import { useState } from "react";
import type { FormEvent } from "react";

import "./HotelRoomsSetup.css";

export interface HotelRoom {
  id: string;
  number: string;
  type: string;
  floor: string;
  status: "available" | "inactive";
}

interface HotelRoomsSetupProps {
  onBack: () => void;
  onContinue: (rooms: HotelRoom[]) => void;
}

export default function HotelRoomsSetup({
  onBack,
  onContinue,
}: HotelRoomsSetupProps) {
  const [rooms, setRooms] = useState<HotelRoom[]>([
    {
      id: "room-1",
      number: "101",
      type: "Standard",
      floor: "1",
      status: "available",
    },
    {
      id: "room-2",
      number: "102",
      type: "Deluxe",
      floor: "1",
      status: "available",
    },
    {
      id: "room-3",
      number: "201",
      type: "Suite",
      floor: "2",
      status: "available",
    },
  ]);

  const [error, setError] = useState("");

  function addRoom() {
    const nextNumber =
      rooms.length + 101;

    setRooms((current) => [
      ...current,
      {
        id: `room-${Date.now()}`,
        number: String(nextNumber),
        type: "Standard",
        floor: "1",
        status: "available",
      },
    ]);
  }

  function updateRoom(
    id: string,
    field: keyof HotelRoom,
    value: string,
  ) {
    setRooms((current) =>
      current.map((room) =>
        room.id === id
          ? { ...room, [field]: value }
          : room,
      ),
    );
  }

  function removeRoom(id: string) {
    setRooms((current) =>
      current.filter((room) => room.id !== id),
    );
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    if (rooms.length === 0) {
      setError("Please add at least one room.");
      return;
    }

    if (
      rooms.some(
        (room) =>
          !room.number.trim() ||
          !room.type.trim() ||
          !room.floor.trim(),
      )
    ) {
      setError(
        "Please complete every room before continuing.",
      );
      return;
    }

    const numbers = rooms.map(
      (room) => room.number.trim(),
    );

    if (new Set(numbers).size !== numbers.length) {
      setError(
        "Each room must have a unique room number.",
      );
      return;
    }

    onContinue(rooms);
  }

  return (
    <main className="hotel-rooms">
      <div className="hotel-rooms__shell">
        <button
          type="button"
          className="hotel-rooms__back"
          onClick={onBack}
        >
          ← Back
        </button>

        <section className="hotel-rooms__card">
          <div className="hotel-rooms__brand">
            <span>K</span>
            <strong>KhanaFlow</strong>
          </div>

          <div className="hotel-rooms__progress">
            <span>STEP 3 OF 3</span>
            <span>Rooms setup</span>
          </div>

          <div className="hotel-rooms__heading">
            <p>HOTEL ROOMS</p>

            <h1>
              Add your
              <br />
              hotel rooms.
            </h1>

            <p>
              Every room will later receive a permanent
              QR entry point for room service.
            </p>
          </div>

          <form
            className="hotel-rooms__form"
            onSubmit={handleSubmit}
          >
            <div className="hotel-rooms__summary">
              <strong>{rooms.length}</strong>
              <span>Rooms configured</span>
            </div>

            <div className="hotel-rooms__list">
              {rooms.map((room, index) => (
                <article
                  className="hotel-room"
                  key={room.id}
                >
                  <div className="hotel-room__number">
                    {index + 1}
                  </div>

                  <div className="hotel-room__fields">
                    <label>
                      Room number
                      <input
                        value={room.number}
                        onChange={(event) =>
                          updateRoom(
                            room.id,
                            "number",
                            event.target.value,
                          )
                        }
                      />
                    </label>

                    <label>
                      Room type
                      <input
                        value={room.type}
                        onChange={(event) =>
                          updateRoom(
                            room.id,
                            "type",
                            event.target.value,
                          )
                        }
                      />
                    </label>

                    <label>
                      Floor
                      <input
                        value={room.floor}
                        onChange={(event) =>
                          updateRoom(
                            room.id,
                            "floor",
                            event.target.value,
                          )
                        }
                      />
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeRoom(room.id)
                    }
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="hotel-rooms__add"
              onClick={addRoom}
            >
              + Add another room
            </button>

            {error && (
              <p className="hotel-rooms__error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="hotel-rooms__submit"
            >
              Continue to QR setup
              <span>→</span>
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}