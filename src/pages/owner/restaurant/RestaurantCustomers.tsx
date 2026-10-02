import "./RestaurantCustomers.css";

interface RestaurantCustomersProps {
  onNavigate: (screen: string) => void;
}

const customers = [
  {
    name: "Aarav Sharma",
    email: "aarav@example.com",
    orders: 12,
    spent: "₨8,420",
    lastOrder: "Today",
  },
  {
    name: "Priya Thapa",
    email: "priya@example.com",
    orders: 8,
    spent: "₨5,840",
    lastOrder: "Today",
  },
  {
    name: "Daniel Smith",
    email: "daniel@example.com",
    orders: 5,
    spent: "₨3,250",
    lastOrder: "Yesterday",
  },
  {
    name: "Sita Gurung",
    email: "sita@example.com",
    orders: 17,
    spent: "₨12,450",
    lastOrder: "Yesterday",
  },
];

export default function RestaurantCustomers({
  onNavigate,
}: RestaurantCustomersProps) {
  return (
    <div className="restaurant-customers-page">
      <header className="restaurant-page-header">
        <div>
          <button
            className="restaurant-back-button"
            onClick={() => onNavigate("dashboard")}
          >
            ← Dashboard
          </button>

          <h1>Customers</h1>
          <p>View customers who have ordered from your restaurant.</p>
        </div>
      </header>

      <div className="restaurant-customer-stats">
        <div>
          <span>Total Customers</span>
          <strong>486</strong>
        </div>

        <div>
          <span>New This Month</span>
          <strong>72</strong>
        </div>

        <div>
          <span>Returning Customers</span>
          <strong>218</strong>
        </div>
      </div>

      <section className="restaurant-customers-card">
        <div className="restaurant-customers-card-header">
          <strong>Customer List</strong>
          <input type="search" placeholder="Search customers..." />
        </div>

        <div className="restaurant-customers-table-wrapper">
          <table className="restaurant-customers-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Last Order</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr key={customer.email}>
                  <td>
                    <div className="restaurant-customer-info">
                      <div>
                        {customer.name.charAt(0)}
                      </div>

                      <span>
                        <strong>{customer.name}</strong>
                        <small>{customer.email}</small>
                      </span>
                    </div>
                  </td>

                  <td>{customer.orders}</td>

                  <td>
                    <strong>{customer.spent}</strong>
                  </td>

                  <td>{customer.lastOrder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}