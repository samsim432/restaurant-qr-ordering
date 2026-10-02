import "./RestaurantSettings.css";

interface RestaurantSettingsProps {
  onNavigate: (screen: string) => void;
}

export default function RestaurantSettings({
  onNavigate,
}: RestaurantSettingsProps) {
  return (
    <div className="restaurant-settings-page">
      <header className="restaurant-page-header">
        <div>
          <button
            className="restaurant-back-button"
            onClick={() => onNavigate("dashboard")}
          >
            ← Dashboard
          </button>

          <h1>Settings</h1>
          <p>Manage your restaurant business settings.</p>
        </div>
      </header>

      <div className="restaurant-settings-layout">
        <nav className="restaurant-settings-nav">
          <button className="active">Business</button>
          <button>Ordering</button>
          <button>Payments</button>
          <button>Notifications</button>
        </nav>

        <section className="restaurant-settings-card">
          <div className="restaurant-settings-section-header">
            <h2>Business Information</h2>
            <p>Basic information about your restaurant.</p>
          </div>

          <div className="restaurant-settings-form">
            <label>
              Restaurant Name
              <input defaultValue="Himalayan Kitchen" />
            </label>

            <label>
              Phone Number
              <input defaultValue="+977 9800000000" />
            </label>

            <label>
              Address
              <input defaultValue="Thamel, Kathmandu, Nepal" />
            </label>

            <label>
              Description
              <textarea defaultValue="Authentic Nepali food and local favourites." />
            </label>

            <button className="restaurant-save-button">
              Save Changes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}