import "./RestaurantTables.css";

interface RestaurantTablesProps {
  onNavigate: (screen: string) => void;
}

const tables = Array.from({ length: 12 }, (_, index) => ({
  number: index + 1,
  seats: index % 3 === 0 ? 6 : 4,
  status: index < 8 ? "Occupied" : "Available",
  order: index < 8 ? `#HK-${1024 - index}` : null,
}));

export default function RestaurantTables({
  onNavigate,
}: RestaurantTablesProps) {
  return (
    <div className="restaurant-tables-page">
      <header className="restaurant-page-header">
        <div>
          <button
            className="restaurant-back-button"
            onClick={() => onNavigate("dashboard")}
          >
            ← Dashboard
          </button>

          <h1>Tables</h1>
          <p>Manage restaurant tables and their QR entry points.</p>
        </div>

        <button className="restaurant-primary-action">+ Add Table</button>
      </header>

      <div className="restaurant-table-stats">
        <div>
          <span>All Tables</span>
          <strong>12</strong>
        </div>

        <div>
          <span>Occupied</span>
          <strong>8</strong>
        </div>

        <div>
          <span>Available</span>
          <strong>4</strong>
        </div>
      </div>

      <section className="restaurant-tables-grid">
        {tables.map((table) => (
          <article className="restaurant-table-card" key={table.number}>
            <div className="restaurant-table-card-top">
              <div className="restaurant-table-number">
                {table.number}
              </div>

              <span
                className={`restaurant-table-status ${
                  table.status === "Occupied" ? "occupied" : "available"
                }`}
              >
                {table.status}
              </span>
            </div>

            <h2>Table {table.number}</h2>

            <p>{table.seats} seats</p>

            {table.order ? (
              <div className="restaurant-table-order">
                Current order <strong>{table.order}</strong>
              </div>
            ) : (
              <div className="restaurant-table-order available-order">
                No active order
              </div>
            )}

            <div className="restaurant-table-actions">
              <button>View QR</button>
              <button>Manage</button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}