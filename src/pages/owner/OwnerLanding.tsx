import "./OwnerLanding.css";

interface OwnerLandingProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export default function OwnerLanding({
  onGetStarted,
  onLogin,
}: OwnerLandingProps) {
  return (
    <div className="owner-landing">
      <header className="owner-navbar">
        <div className="owner-brand">
          <div className="owner-brand-mark">K</div>

          <span>KhanaFlow</span>
        </div>

        <div className="owner-nav-actions">
          <button
            type="button"
            className="owner-login-button"
            onClick={onLogin}
          >
            Login
          </button>

          <button
            type="button"
            className="owner-primary-button"
            onClick={onGetStarted}
          >
            Get Started
          </button>
        </div>
      </header>

      <main>
        <section className="owner-hero">
          <div className="owner-hero-content">
            <span className="owner-eyebrow">
              Restaurant & Hotel Ordering System
            </span>

            <h1>
              Run your restaurant or hotel
              <span> smarter.</span>
            </h1>

            <p>
              Manage your menu, tables, rooms, QR ordering,
              orders and payments from one simple system.
            </p>

            <div className="owner-hero-actions">
              <button
                type="button"
                className="owner-primary-button owner-large-button"
                onClick={onGetStarted}
              >
                Get Started
              </button>

              <button
                type="button"
                className="owner-secondary-button owner-large-button"
                onClick={onLogin}
              >
                Login
              </button>
            </div>
          </div>

          <div className="owner-hero-preview">
            <div className="owner-preview-window">
              <div className="owner-preview-header">
                <div className="owner-preview-brand">
                  <div className="owner-preview-logo">K</div>

                  <span>KhanaFlow</span>
                </div>

                <span className="owner-preview-status">
                  Dashboard
                </span>
              </div>

              <div className="owner-preview-body">
                <div className="owner-preview-sidebar">
                  <div className="owner-sidebar-active">
                    Overview
                  </div>

                  <div>Orders</div>
                  <div>Tables</div>
                  <div>Menu</div>
                  <div>Payments</div>
                </div>

                <div className="owner-preview-main">
                  <div className="owner-preview-title">
                    Good morning
                  </div>

                  <div className="owner-preview-subtitle">
                    Here's what's happening today.
                  </div>

                  <div className="owner-stat-grid">
                    <div className="owner-stat-card">
                      <span>Orders</span>
                      <strong>24</strong>
                    </div>

                    <div className="owner-stat-card">
                      <span>Revenue</span>
                      <strong>Rs. 18,450</strong>
                    </div>

                    <div className="owner-stat-card">
                      <span>Tables</span>
                      <strong>12</strong>
                    </div>
                  </div>

                  <div className="owner-preview-order">
                    <div>
                      <strong>Order #1024</strong>
                      <span>Table 12 · Preparing</span>
                    </div>

                    <strong>Rs. 620</strong>
                  </div>

                  <div className="owner-preview-order">
                    <div>
                      <strong>Order #1023</strong>
                      <span>Table 4 · Ready</span>
                    </div>

                    <strong>Rs. 480</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="owner-features">
          <div className="owner-section-heading">
            <span className="owner-eyebrow">
              Everything in one place
            </span>

            <h2>
              Built for the way
              <br />
              your business works.
            </h2>
          </div>

          <div className="owner-feature-grid">
            <article className="owner-feature-card">
              <div className="owner-feature-icon">QR</div>

              <h3>QR Ordering</h3>

              <p>
                Give every restaurant table or hotel room
                its own permanent QR entry point.
              </p>
            </article>

            <article className="owner-feature-card">
              <div className="owner-feature-icon">M</div>

              <h3>Menu Management</h3>

              <p>
                Add food, update prices, manage categories
                and control availability from one place.
              </p>
            </article>

            <article className="owner-feature-card">
              <div className="owner-feature-icon">O</div>

              <h3>Order Management</h3>

              <p>
                Receive orders and move them from confirmed
                to preparing, ready and completed.
              </p>
            </article>

            <article className="owner-feature-card">
              <div className="owner-feature-icon">P</div>

              <h3>Payments</h3>

              <p>
                Keep track of eSewa, Khalti, card and
                counter payments.
              </p>
            </article>
          </div>
        </section>

        <section className="owner-business-section">
          <div>
            <span className="owner-eyebrow">
              One platform
            </span>

            <h2>
              Restaurant or hotel.
              <br />
              You choose.
            </h2>

            <p>
              Your business type determines the system
              you use. Restaurants manage tables and
              customers. Hotels manage rooms, guests and
              room service.
            </p>
          </div>

          <div className="owner-business-cards">
            <div className="owner-business-card">
              <span className="owner-business-number">
                01
              </span>

              <h3>Restaurant</h3>

              <p>
                Tables, menus, QR ordering, customers,
                orders and payments.
              </p>
            </div>

            <div className="owner-business-card">
              <span className="owner-business-number">
                02
              </span>

              <h3>Hotel</h3>

              <p>
                Rooms, guests, room service, menus,
                orders and payments.
              </p>
            </div>
          </div>
        </section>

        <section className="owner-final-cta">
          <span className="owner-eyebrow">
            Get started
          </span>

          <h2>
            Ready to set up
            <br />
            your business?
          </h2>

          <p>
            Create your account and set up your restaurant
            or hotel.
          </p>

          <button
            type="button"
            className="owner-primary-button owner-large-button"
            onClick={onGetStarted}
          >
            Create Your Business
          </button>
        </section>
      </main>

      <footer className="owner-footer">
        <div className="owner-brand">
          <div className="owner-brand-mark">K</div>

          <span>KhanaFlow</span>
        </div>

        <span>
          Restaurant & Hotel Management Platform
        </span>
      </footer>
    </div>
  );
}