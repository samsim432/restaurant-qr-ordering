import "./RestaurantOrders.css";

interface RestaurantOrdersProps {
  onNavigate: (screen: string) => void;
}

const orders = [
  {
    id: "#HK-1024",
    location: "Table 12",
    customer: "Aarav Sharma",
    items: "Chicken Momo, Chowmein",
    amount: "₨620",
    payment: "eSewa",
    status: "Preparing",
  },
  {
    id: "#HK-1023",
    location: "Table 4",
    customer: "Priya Thapa",
    items: "Dal Bhat, Coke, Momo",
    amount: "₨480",
    payment: "Khalti",
    status: "Ready",
  },
  {
    id: "#HK-1022",
    location: "Table 8",
    customer: "Daniel Smith",
    items: "Buff Momo",
    amount: "₨350",
    payment: "Card",
    status: "Confirmed",
  },
  {
    id: "#HK-1021",
    location: "Table 2",
    customer: "Sita Gurung",
    items: "Thukpa, Tea",
    amount: "₨1,240",
    payment: "Counter",
    status: "Completed",
  },
  {
    id: "#HK-1020",
    location: "Table 7",
    customer: "Rohan KC",
    items: "Pizza, Fries",
    amount: "₨890",
    payment: "eSewa",
    status: "Completed",
  },
];

export default function RestaurantOrders({
  onNavigate,
}: RestaurantOrdersProps) {
  return (
    <div className="restaurant-orders-page">
      <header className="restaurant-page-header">
        <div>
          <button
            className="restaurant-back-button"
            onClick={() => onNavigate("dashboard")}
          >
            ← Dashboard
          </button>

          <h1>Orders</h1>
          <p>View and manage all customer orders.</p>
        </div>

        <div className="restaurant-page-header-actions">
          <button className="restaurant-outline-button">Export</button>
        </div>
      </header>

      <div className="restaurant-order-filters">
        <button className="active">All Orders</button>
        <button>Pending</button>
        <button>Confirmed</button>
        <button>Preparing</button>
        <button>Ready</button>
        <button>Completed</button>
      </div>

      <section className="restaurant-orders-card">
        <div className="restaurant-orders-card-header">
          <div>
            <strong>Today&apos;s Orders</strong>
            <span>24 orders</span>
          </div>

          <input type="search" placeholder="Search orders..." />
        </div>

        <div className="restaurant-orders-table-wrapper">
          <table className="restaurant-orders-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Location</th>
                <th>Items</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.id}</strong>
                  </td>

                  <td>{order.customer}</td>

                  <td>{order.location}</td>

                  <td>{order.items}</td>

                  <td>{order.payment}</td>

                  <td>
                    <strong>{order.amount}</strong>
                  </td>

                  <td>
                    <span
                      className={`restaurant-order-status ${order.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}