import "./RestaurantMenu.css";

interface RestaurantMenuProps {
  onNavigate: (screen: string) => void;
}

const menuItems = [
  {
    name: "Chicken Momo",
    category: "Momo",
    price: "₨280",
    status: "Available",
  },
  {
    name: "Buff Momo",
    category: "Momo",
    price: "₨250",
    status: "Available",
  },
  {
    name: "Chicken Chowmein",
    category: "Noodles",
    price: "₨320",
    status: "Available",
  },
  {
    name: "Dal Bhat",
    category: "Main Course",
    price: "₨450",
    status: "Available",
  },
  {
    name: "Thukpa",
    category: "Soup",
    price: "₨300",
    status: "Unavailable",
  },
  {
    name: "Masala Tea",
    category: "Drinks",
    price: "₨100",
    status: "Available",
  },
];

export default function RestaurantMenu({
  onNavigate,
}: RestaurantMenuProps) {
  return (
    <div className="restaurant-menu-page">
      <header className="restaurant-page-header">
        <div>
          <button
            className="restaurant-back-button"
            onClick={() => onNavigate("dashboard")}
          >
            ← Dashboard
          </button>

          <h1>Menu</h1>
          <p>Manage your food, categories, prices and availability.</p>
        </div>

        <button className="restaurant-primary-action">+ Add Item</button>
      </header>

      <div className="restaurant-menu-toolbar">
        <div className="restaurant-menu-categories">
          <button className="active">All</button>
          <button>Momo</button>
          <button>Main Course</button>
          <button>Noodles</button>
          <button>Soup</button>
          <button>Drinks</button>
        </div>

        <input type="search" placeholder="Search menu..." />
      </div>

      <section className="restaurant-menu-grid">
        {menuItems.map((item) => (
          <article className="restaurant-menu-card" key={item.name}>
            <div className="restaurant-menu-image">
              <span>{item.name.charAt(0)}</span>
            </div>

            <div className="restaurant-menu-card-body">
              <div className="restaurant-menu-card-top">
                <span>{item.category}</span>

                <span
                  className={`restaurant-menu-availability ${
                    item.status === "Available"
                      ? "available"
                      : "unavailable"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h2>{item.name}</h2>

              <strong>{item.price}</strong>

              <div className="restaurant-menu-card-actions">
                <button>Edit</button>
                <button>More</button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}