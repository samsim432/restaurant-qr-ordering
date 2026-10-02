import "./RestaurantDashboard.css";

interface RestaurantDashboardProps {
  onNavigate: (screen: string) => void;
}

export default function RestaurantDashboard({
  onNavigate,
}: RestaurantDashboardProps) {
  return (
    <div className="restaurant-dashboard">
      <aside className="restaurant-sidebar">
        <div className="restaurant-sidebar-brand">
          <div className="restaurant-brand-mark">K</div>

          <div>
            <strong>KhanaFlow</strong>
            <span>Restaurant</span>
          </div>
        </div>

        <nav className="restaurant-sidebar-nav">
          <button
            className="restaurant-nav-item restaurant-nav-active"
            onClick={() => onNavigate("dashboard")}
          >
            <span>⌂</span>
            Overview
          </button>

          <button
            className="restaurant-nav-item"
            onClick={() => onNavigate("orders")}
          >
            <span>◷</span>
            Orders
          </button>

          <button
            className="restaurant-nav-item"
            onClick={() => onNavigate("tables")}
          >
            <span>▦</span>
            Tables
          </button>

          <button
            className="restaurant-nav-item"
            onClick={() => onNavigate("menu")}
          >
            <span>☰</span>
            Menu
          </button>

          <button
            className="restaurant-nav-item"
            onClick={() => onNavigate("customers")}
          >
            <span>♙</span>
            Customers
          </button>

          <button
            className="restaurant-nav-item"
            onClick={() => onNavigate("payments")}
          >
            <span>₨</span>
            Payments
          </button>

          <button
            className="restaurant-nav-item"
            onClick={() => onNavigate("settings")}
          >
            <span>⚙</span>
            Settings
          </button>
        </nav>

        <div className="restaurant-sidebar-bottom">
          <div className="restaurant-business-mini">
            <div className="restaurant-business-avatar">H</div>

            <div>
              <strong>Himalayan Kitchen</strong>
              <span>Restaurant</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="restaurant-main">
        <header className="restaurant-topbar">
          <div>
            <span className="restaurant-mobile-label">Restaurant Dashboard</span>
            <h1>Good morning</h1>
            <p>Here&apos;s what&apos;s happening at your restaurant today.</p>
          </div>

          <div className="restaurant-topbar-actions">
            <button className="restaurant-icon-button">⌕</button>
            <button className="restaurant-icon-button">♢</button>

            <div className="restaurant-owner-avatar">S</div>
          </div>
        </header>

        <section className="restaurant-dashboard-content">
          <div className="restaurant-stat-grid">
            <div className="restaurant-stat-card">
              <div className="restaurant-stat-top">
                <span>Today&apos;s Orders</span>
                <div className="restaurant-stat-icon">◷</div>
              </div>

              <strong>24</strong>

              <span className="restaurant-stat-change">
                +12.5% from yesterday
              </span>
            </div>

            <div className="restaurant-stat-card">
              <div className="restaurant-stat-top">
                <span>Today&apos;s Revenue</span>
                <div className="restaurant-stat-icon">₨</div>
              </div>

              <strong>₨18,450</strong>

              <span className="restaurant-stat-change">
                +8.2% from yesterday
              </span>
            </div>

            <div className="restaurant-stat-card">
              <div className="restaurant-stat-top">
                <span>Active Tables</span>
                <div className="restaurant-stat-icon">▦</div>
              </div>

              <strong>8 / 12</strong>

              <span className="restaurant-stat-neutral">
                4 tables available
              </span>
            </div>

            <div className="restaurant-stat-card">
              <div className="restaurant-stat-top">
                <span>Pending Orders</span>
                <div className="restaurant-stat-icon">!</div>
              </div>

              <strong>5</strong>

              <span className="restaurant-stat-warning">
                Needs attention
              </span>
            </div>
          </div>

          <div className="restaurant-dashboard-grid">
            <section className="restaurant-panel restaurant-orders-panel">
              <div className="restaurant-panel-header">
                <div>
                  <h2>Recent Orders</h2>
                  <p>Your latest customer orders.</p>
                </div>

                <button onClick={() => onNavigate("orders")}>
                  View all
                </button>
              </div>

              <div className="restaurant-order-list">
                <div className="restaurant-order-row">
                  <div>
                    <strong>#HK-1024</strong>
                    <span>Table 12 · 2 items</span>
                  </div>

                  <div>
                    <strong>₨620</strong>
                    <span className="restaurant-status preparing">
                      Preparing
                    </span>
                  </div>
                </div>

                <div className="restaurant-order-row">
                  <div>
                    <strong>#HK-1023</strong>
                    <span>Table 4 · 3 items</span>
                  </div>

                  <div>
                    <strong>₨480</strong>
                    <span className="restaurant-status ready">
                      Ready
                    </span>
                  </div>
                </div>

                <div className="restaurant-order-row">
                  <div>
                    <strong>#HK-1022</strong>
                    <span>Table 8 · 1 item</span>
                  </div>

                  <div>
                    <strong>₨350</strong>
                    <span className="restaurant-status confirmed">
                      Confirmed
                    </span>
                  </div>
                </div>

                <div className="restaurant-order-row">
                  <div>
                    <strong>#HK-1021</strong>
                    <span>Table 2 · 4 items</span>
                  </div>

                  <div>
                    <strong>₨1,240</strong>
                    <span className="restaurant-status completed">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="restaurant-panel">
              <div className="restaurant-panel-header">
                <div>
                  <h2>Table Status</h2>
                  <p>Live table overview.</p>
                </div>

                <button onClick={() => onNavigate("tables")}>
                  Manage
                </button>
              </div>

              <div className="restaurant-table-overview">
                <div className="restaurant-table-summary">
                  <div>
                    <span className="table-dot occupied" />
                    <strong>8</strong>
                    <span>Occupied</span>
                  </div>

                  <div>
                    <span className="table-dot available" />
                    <strong>4</strong>
                    <span>Available</span>
                  </div>
                </div>

                <div className="restaurant-table-mini-grid">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <div
                      key={index}
                      className={`restaurant-table-mini ${
                        index < 8 ? "occupied" : "available"
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <section className="restaurant-panel">
            <div className="restaurant-panel-header">
              <div>
                <h2>Quick Actions</h2>
                <p>Common restaurant management tasks.</p>
              </div>
            </div>

            <div className="restaurant-quick-actions">
              <button onClick={() => onNavigate("orders")}>
                <span>◷</span>
                <div>
                  <strong>Manage Orders</strong>
                  <small>View and update orders</small>
                </div>
              </button>

              <button onClick={() => onNavigate("menu")}>
                <span>☰</span>
                <div>
                  <strong>Manage Menu</strong>
                  <small>Update food and prices</small>
                </div>
              </button>

              <button onClick={() => onNavigate("tables")}>
                <span>▦</span>
                <div>
                  <strong>Manage Tables</strong>
                  <small>Tables and QR codes</small>
                </div>
              </button>

              <button onClick={() => onNavigate("payments")}>
                <span>₨</span>
                <div>
                  <strong>Payments</strong>
                  <small>View payment activity</small>
                </div>
              </button>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}