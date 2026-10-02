import "./BusinessType.css";

export type OwnerBusinessType =
  | "restaurant"
  | "hotel";

interface BusinessTypeProps {
  onBack: () => void;
  onContinue: (
    businessType: OwnerBusinessType,
  ) => void;
}

export default function BusinessType({
  onBack,
  onContinue,
}: BusinessTypeProps) {
  return (
    <main className="business-type">
      <div className="business-type__shell">

        {/* =================================================
            BACK
        ================================================= */}

        <button
          type="button"
          className="business-type__back"
          onClick={onBack}
        >
          ← Back
        </button>

        {/* =================================================
            CARD
        ================================================= */}

        <section className="business-type__card">

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="business-type__brand">
            <span className="business-type__logo">
              K
            </span>

            <span>
              KhanaFlow
            </span>
          </div>

          {/* =================================================
              HEADING
          ================================================= */}

          <div className="business-type__heading">

            <p className="business-type__eyebrow">
              BUSINESS SETUP
            </p>

            <h1>
              What type of
              <br />
              business do you run?
            </h1>

            <p>
              Choose your business type so we can
              set up the right tools, terminology and
              ordering experience for you.
            </p>

          </div>

          {/* =================================================
              BUSINESS OPTIONS
          ================================================= */}

          <div className="business-type__options">

            {/* =================================================
                RESTAURANT
            ================================================= */}

            <button
              type="button"
              className="business-type__option"
              onClick={() =>
                onContinue(
                  "restaurant",
                )
              }
            >

              <div className="business-type__option-icon">
                🍽️
              </div>

              <div className="business-type__option-content">

                <div className="business-type__option-title-row">

                  <h2>
                    Restaurant
                  </h2>

                  <span>
                    →
                  </span>

                </div>

                <p>
                  Manage tables, menus, QR ordering,
                  customers, orders and payments.
                </p>

                <div className="business-type__tags">

                  <span>
                    Tables
                  </span>

                  <span>
                    QR Ordering
                  </span>

                  <span>
                    Menu
                  </span>

                </div>

              </div>

            </button>

            {/* =================================================
                HOTEL
            ================================================= */}

            <button
              type="button"
              className="business-type__option"
              onClick={() =>
                onContinue(
                  "hotel",
                )
              }
            >

              <div className="business-type__option-icon">
                🏨
              </div>

              <div className="business-type__option-content">

                <div className="business-type__option-title-row">

                  <h2>
                    Hotel
                  </h2>

                  <span>
                    →
                  </span>

                </div>

                <p>
                  Manage rooms, guests, room service,
                  menus, orders and payments.
                </p>

                <div className="business-type__tags">

                  <span>
                    Rooms
                  </span>

                  <span>
                    Room Service
                  </span>

                  <span>
                    Guests
                  </span>

                </div>

              </div>

            </button>

          </div>

          {/* =================================================
              FOOTNOTE
          ================================================= */}

          <p className="business-type__note">
            You can configure your business details
            after choosing your business type.
          </p>

        </section>
      </div>
    </main>
  );
}