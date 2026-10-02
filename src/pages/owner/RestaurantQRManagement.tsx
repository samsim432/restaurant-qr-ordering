import "./RestaurantQRManagement.css";

interface RestaurantQRManagementProps {
  onBack: () => void;
  onContinue: () => void;
}

const tables = ["1", "2", "3", "4", "5", "6"];

export default function RestaurantQRManagement({
  onBack,
  onContinue,
}: RestaurantQRManagementProps) {
  return (
    <main className="restaurant-qr">
      <div className="restaurant-qr__shell">
        <button
          type="button"
          className="restaurant-qr__back"
          onClick={onBack}
        >
          ← Back
        </button>

        <section className="restaurant-qr__card">
          <div className="restaurant-qr__brand">
            <span className="restaurant-qr__logo">K</span>
            <span>KhanaFlow</span>
          </div>

          <div className="restaurant-qr__heading">
            <p className="restaurant-qr__eyebrow">
              TABLE QR CODES
            </p>

            <h1>
              Your tables are
              <br />
              ready for QR codes.
            </h1>

            <p>
              Each table gets a permanent QR entry
              point. The QR connects the customer to
              the correct restaurant and table.
            </p>
          </div>

          <div className="restaurant-qr__notice">
            <strong>Important</strong>
            <span>
              These QR codes do not contain your menu
              or prices. You can update your menu later
              without replacing the QR code.
            </span>
          </div>

          <div className="restaurant-qr__grid">
            {tables.map((table) => (
              <article
                className="restaurant-qr__item"
                key={table}
              >
                <div className="restaurant-qr__visual">
                  <div className="restaurant-qr__fake-code">
                    <span>▦</span>
                  </div>
                </div>

                <div className="restaurant-qr__item-info">
                  <strong>Table {table}</strong>
                  <span>Permanent QR</span>
                </div>

                <button
                  type="button"
                  className="restaurant-qr__download"
                >
                  Download
                </button>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="restaurant-qr__submit"
            onClick={onContinue}
          >
            Finish restaurant setup
            <span>→</span>
          </button>

          <p className="restaurant-qr__note">
            You can download and print these QR codes
            later from the Tables section of your
            dashboard.
          </p>
        </section>
      </div>
    </main>
  );
}