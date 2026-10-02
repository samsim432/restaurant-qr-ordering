import "./HotelQRManagement.css";

interface HotelQRManagementProps {
  onBack: () => void;
  onContinue: () => void;
}

const rooms = ["101", "102", "201", "202", "301", "302"];

export default function HotelQRManagement({
  onBack,
  onContinue,
}: HotelQRManagementProps) {
  return (
    <main className="hotel-qr">
      <div className="hotel-qr__shell">
        <button
          type="button"
          className="hotel-qr__back"
          onClick={onBack}
        >
          ← Back
        </button>

        <section className="hotel-qr__card">
          <div className="hotel-qr__brand">
            <span>K</span>
            <strong>KhanaFlow</strong>
          </div>

          <div className="hotel-qr__heading">
            <p>ROOM QR CODES</p>

            <h1>
              Your rooms are
              <br />
              ready for QR codes.
            </h1>

            <p>
              Each room gets a permanent QR entry
              point for your hotel guest experience.
            </p>
          </div>

          <div className="hotel-qr__notice">
            <strong>Permanent room QR</strong>
            <span>
              The QR identifies the hotel and room.
              Your services, menu and prices can be
              updated later without replacing it.
            </span>
          </div>

          <div className="hotel-qr__grid">
            {rooms.map((room) => (
              <article
                className="hotel-qr__item"
                key={room}
              >
                <div className="hotel-qr__visual">
                  <div className="hotel-qr__fake">
                    ▦
                  </div>
                </div>

                <strong>Room {room}</strong>
                <span>Permanent QR</span>

                <button type="button">
                  Download
                </button>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="hotel-qr__submit"
            onClick={onContinue}
          >
            Finish hotel setup
            <span>→</span>
          </button>

          <p className="hotel-qr__note">
            You can manage and download room QR codes
            later from the Rooms section.
          </p>
        </section>
      </div>
    </main>
  );
}