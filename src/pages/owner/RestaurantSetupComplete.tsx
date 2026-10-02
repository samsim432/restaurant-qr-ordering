import "./RestaurantSetupComplete.css";

interface RestaurantSetupCompleteProps {
  onContinue: () => void;
}

export default function RestaurantSetupComplete({
  onContinue,
}: RestaurantSetupCompleteProps) {
  return (
    <main className="restaurant-complete">
      <section className="restaurant-complete__card">
        <div className="restaurant-complete__brand">
          <span>K</span>
          <strong>KhanaFlow</strong>
        </div>

        <div className="restaurant-complete__icon">
          ✓
        </div>

        <p className="restaurant-complete__eyebrow">
          RESTAURANT READY
        </p>

        <h1>
          Your restaurant
          <br />
          is ready to go.
        </h1>

        <p className="restaurant-complete__description">
          Your business, menu, tables and QR
          ordering foundation are ready. You can
          now manage everything from your restaurant
          dashboard.
        </p>

        <div className="restaurant-complete__list">
          <div>
            <span>✓</span>
            <strong>Business information</strong>
          </div>

          <div>
            <span>✓</span>
            <strong>Menu setup</strong>
          </div>

          <div>
            <span>✓</span>
            <strong>Tables and QR codes</strong>
          </div>
        </div>

        <button
          type="button"
          className="restaurant-complete__button"
          onClick={onContinue}
        >
          Open restaurant dashboard
          <span>→</span>
        </button>
      </section>
    </main>
  );
}