import "./RestaurantPayments.css";

interface RestaurantPaymentsProps {
  onNavigate: (screen: string) => void;
}

const payments = [
  {
    id: "PAY-5001",
    order: "#HK-1024",
    method: "eSewa",
    amount: "₨620",
    status: "Paid",
    date: "Today, 12:42 PM",
  },
  {
    id: "PAY-5000",
    order: "#HK-1023",
    method: "Khalti",
    amount: "₨480",
    status: "Paid",
    date: "Today, 12:30 PM",
  },
  {
    id: "PAY-4999",
    order: "#HK-1022",
    method: "Card",
    amount: "₨350",
    status: "Paid",
    date: "Today, 12:12 PM",
  },
  {
    id: "PAY-4998",
    order: "#HK-1021",
    method: "Counter",
    amount: "₨1,240",
    status: "Unpaid",
    date: "Today, 11:55 AM",
  },
];

export default function RestaurantPayments({
  onNavigate,
}: RestaurantPaymentsProps) {
  return (
    <div className="restaurant-payments-page">
      <header className="restaurant-page-header">
        <div>
          <button
            className="restaurant-back-button"
            onClick={() => onNavigate("dashboard")}
          >
            ← Dashboard
          </button>

          <h1>Payments</h1>
          <p>Track payments from restaurant orders.</p>
        </div>
      </header>

      <div className="restaurant-payment-stats">
        <div>
          <span>Today&apos;s Revenue</span>
          <strong>₨18,450</strong>
        </div>

        <div>
          <span>Online Payments</span>
          <strong>₨15,280</strong>
        </div>

        <div>
          <span>Counter Payments</span>
          <strong>₨3,170</strong>
        </div>

        <div>
          <span>Unpaid</span>
          <strong>₨1,240</strong>
        </div>
      </div>

      <section className="restaurant-payments-card">
        <div className="restaurant-payments-card-header">
          <strong>Recent Payments</strong>

          <select defaultValue="all">
            <option value="all">All methods</option>
            <option value="esewa">eSewa</option>
            <option value="khalti">Khalti</option>
            <option value="card">Card</option>
            <option value="counter">Counter</option>
          </select>
        </div>

        <div className="restaurant-payments-table-wrapper">
          <table className="restaurant-payments-table">
            <thead>
              <tr>
                <th>Payment</th>
                <th>Order</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>
                    <strong>{payment.id}</strong>
                  </td>

                  <td>{payment.order}</td>

                  <td>{payment.method}</td>

                  <td>
                    <strong>{payment.amount}</strong>
                  </td>

                  <td>
                    <span
                      className={`restaurant-payment-status ${
                        payment.status.toLowerCase()
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td>{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}