import "./HotelSetupComplete.css";

interface HotelSetupCompleteProps {
  onContinue: () => void;
}

export default function HotelSetupComplete({
  onContinue,
}: HotelSetupCompleteProps) {
  return (
    <main className="hotel-complete">
      <section className="hotel-complete__card">
        <div className="hotel-complete__brand">
          <span>K</span>
          <strong>KhanaFlow</strong>
        </div>

        <div className="hotel-complete__icon">
          ✓
        </div>

        <p className="hotel-complete__eyebrow">
          HOTEL READY
        </p>

        <h1>
          Your hotel
          <br />
          is ready to go.
        </h1>

        <p className="hotel-complete__description">
          Your hotel, services, rooms and QR
          foundation are ready for guest ordering
          and room service.
        </p>

        <div className="hotel-complete__list">
          <div>
            <span>✓</span>
            <strong>Hotel information</strong>
          </div>

          <div>
            <span>✓</span>
            <strong>Services and menu</strong>
          </div>

          <div>
            <span>✓</span>
            <strong>Rooms and QR codes</strong>
          </div>
        </div>

        <button
          type="button"
          className="hotel-complete__button"
          onClick={onContinue}
        >
          Open hotel dashboard
          <span>→</span>
        </button>
      </section>
    </main>
  );
}