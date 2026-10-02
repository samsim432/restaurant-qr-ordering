import { useMemo, useState } from "react";

import LaunchScreen from "./components/customer/LaunchScreen";
import { CartBar } from "./components/customer/CartBar";
import { CartScreen } from "./components/customer/CartScreen";
import { CategoryScroller } from "./components/customer/CategoryScroller";
import { CheckoutScreen } from "./components/customer/CheckoutScreen";
import { FoodCard } from "./components/customer/FoodCard";
import { FoodDetails } from "./components/customer/FoodDetails";
import { MenuSearch } from "./components/customer/MenuSearch";
import { OrderConfirmation } from "./components/customer/OrderConfirmation";
import { PaymentScreen } from "./components/customer/PaymentScreen";
import { RestaurantHeader } from "./components/customer/RestaurantHeader";

import { menuFoods, restaurantSession } from "./data/mockCustomer";

import type {
  CartItem,
  CustomerOrder,
  FoodItem,
  PaymentMethod,
} from "./types/customer";

import OwnerLanding from "./pages/owner/OwnerLanding";
import OwnerLogin from "./pages/owner/OwnerLogin";
import OwnerRegister from "./pages/owner/OwnerRegister";
import ForgotPassword from "./pages/owner/ForgotPassword";
import ResetPassword from "./pages/owner/ResetPassword";

import BusinessType, {
  type OwnerBusinessType,
} from "./pages/owner/BusinessType";

import RestaurantSetup, {
  type RestaurantDetails,
} from "./pages/owner/RestaurantSetup";

import HotelSetup, {
  type HotelDetails,
} from "./pages/owner/HotelSetup";

import RestaurantMenuSetup from "./pages/owner/RestaurantMenuSetup";
import RestaurantTablesSetup from "./pages/owner/RestaurantTablesSetup";
import RestaurantQRManagement from "./pages/owner/RestaurantQRManagement";
import RestaurantSetupComplete from "./pages/owner/RestaurantSetupComplete";

import HotelMenuSetup from "./pages/owner/HotelMenuSetup";
import HotelRoomsSetup from "./pages/owner/HotelRoomsSetup";
import HotelQRManagement from "./pages/owner/HotelQRManagement";
import HotelSetupComplete from "./pages/owner/HotelSetupComplete";

import RestaurantDashboard from "./pages/owner/restaurant/RestaurantDashboard";
import RestaurantOrders from "./pages/owner/restaurant/RestaurantOrders";
import RestaurantTables from "./pages/owner/restaurant/RestaurantTables";
import RestaurantMenu from "./pages/owner/restaurant/RestaurantMenu";
import RestaurantCustomers from "./pages/owner/restaurant/RestaurantCustomers";
import RestaurantPayments from "./pages/owner/restaurant/RestaurantPayments";
import RestaurantSettings from "./pages/owner/restaurant/RestaurantSettings";

type OwnerScreen =
  | "landing"
  | "login"
  | "register"
  | "forgot-password"
  | "reset-password"
  | "business-type"
  | "restaurant-setup"
  | "restaurant-menu-setup"
  | "restaurant-tables-setup"
  | "restaurant-qr-management"
  | "restaurant-setup-complete"
  | "restaurant-dashboard"
  | "restaurant-orders"
  | "restaurant-tables"
  | "restaurant-menu"
  | "restaurant-customers"
  | "restaurant-payments"
  | "restaurant-settings"
  | "hotel-setup"
  | "hotel-menu-setup"
  | "hotel-rooms-setup"
  | "hotel-qr-management"
  | "hotel-setup-complete";

type CustomerScreen =
  | "launch"
  | "menu"
  | "details"
  | "cart"
  | "checkout"
  | "payment"
  | "confirmation";

function App() {
  const isCustomerMode =
    new URLSearchParams(window.location.search).get(
      "customer",
    ) === "true";

  if (isCustomerMode) {
    return <CustomerApp />;
  }

  return <OwnerApp />;
}

/* =========================================================
   OWNER APP
========================================================= */

function OwnerApp() {
  const [ownerScreen, setOwnerScreen] =
    useState<OwnerScreen>("landing");

  const [, setSelectedBusinessType] =
    useState<OwnerBusinessType | null>(null);

  const [, setRestaurantDetails] =
    useState<RestaurantDetails | null>(null);

  const [, setHotelDetails] =
    useState<HotelDetails | null>(null);

  function navigateRestaurant(screen: string) {
    switch (screen) {
      case "overview":
      case "dashboard":
        setOwnerScreen("restaurant-dashboard");
        break;

      case "orders":
        setOwnerScreen("restaurant-orders");
        break;

      case "tables":
        setOwnerScreen("restaurant-tables");
        break;

      case "menu":
        setOwnerScreen("restaurant-menu");
        break;

      case "customers":
        setOwnerScreen("restaurant-customers");
        break;

      case "payments":
        setOwnerScreen("restaurant-payments");
        break;

      case "settings":
        setOwnerScreen("restaurant-settings");
        break;

      default:
        setOwnerScreen("restaurant-dashboard");
        break;
    }
  }

  switch (ownerScreen) {
    /* =====================================================
       OWNER LANDING
    ===================================================== */

    case "landing":
      return (
        <OwnerLanding
          onGetStarted={() =>
            setOwnerScreen("register")
          }
          onLogin={() =>
            setOwnerScreen("login")
          }
        />
      );

    /* =====================================================
       OWNER LOGIN
    ===================================================== */

    case "login":
      return (
        <OwnerLogin
          onBack={() =>
            setOwnerScreen("landing")
          }
          onRegister={() =>
            setOwnerScreen("register")
          }
          onForgotPassword={() =>
            setOwnerScreen("forgot-password")
          }
          onLogin={() =>
            setOwnerScreen("business-type")
          }
        />
      );

    /* =====================================================
       OWNER REGISTER
    ===================================================== */

    case "register":
      return (
        <OwnerRegister
          onBack={() =>
            setOwnerScreen("landing")
          }
          onRegistered={() =>
            setOwnerScreen("business-type")
          }
        />
      );

    /* =====================================================
       FORGOT PASSWORD
    ===================================================== */

    case "forgot-password":
      return (
        <ForgotPassword
          onBack={() =>
            setOwnerScreen("login")
          }
          onLogin={() =>
            setOwnerScreen("login")
          }
          onResetPassword={() =>
            setOwnerScreen("reset-password")
          }
        />
      );

    /* =====================================================
       RESET PASSWORD
    ===================================================== */

    case "reset-password":
      return (
        <ResetPassword
          onBack={() =>
            setOwnerScreen("forgot-password")
          }
          onLogin={() =>
            setOwnerScreen("login")
          }
        />
      );

    /* =====================================================
       BUSINESS TYPE
    ===================================================== */

    case "business-type":
      return (
        <BusinessType
          onBack={() =>
            setOwnerScreen("register")
          }
          onContinue={(businessType) => {
            setSelectedBusinessType(
              businessType,
            );

            if (businessType === "restaurant") {
              setOwnerScreen(
                "restaurant-setup",
              );
            } else {
              setOwnerScreen("hotel-setup");
            }
          }}
        />
      );

    /* =====================================================
       RESTAURANT SETUP
    ===================================================== */

    case "restaurant-setup":
      return (
        <RestaurantSetup
          onBack={() =>
            setOwnerScreen("business-type")
          }
          onComplete={(restaurant) => {
            setRestaurantDetails(
              restaurant,
            );

            setOwnerScreen(
              "restaurant-menu-setup",
            );
          }}
        />
      );

    /* =====================================================
       RESTAURANT MENU SETUP
    ===================================================== */

    case "restaurant-menu-setup":
      return (
        <RestaurantMenuSetup
          onBack={() =>
            setOwnerScreen(
              "restaurant-setup",
            )
          }
          onContinue={() =>
            setOwnerScreen(
              "restaurant-tables-setup",
            )
          }
        />
      );

    /* =====================================================
       RESTAURANT TABLE SETUP
    ===================================================== */

    case "restaurant-tables-setup":
      return (
        <RestaurantTablesSetup
          onBack={() =>
            setOwnerScreen(
              "restaurant-menu-setup",
            )
          }
          onContinue={() =>
            setOwnerScreen(
              "restaurant-qr-management",
            )
          }
        />
      );

    /* =====================================================
       RESTAURANT QR MANAGEMENT
    ===================================================== */

    case "restaurant-qr-management":
      return (
        <RestaurantQRManagement
          onBack={() =>
            setOwnerScreen(
              "restaurant-tables-setup",
            )
          }
          onContinue={() =>
            setOwnerScreen(
              "restaurant-setup-complete",
            )
          }
        />
      );

    /* =====================================================
       RESTAURANT SETUP COMPLETE
    ===================================================== */

    case "restaurant-setup-complete":
      return (
        <RestaurantSetupComplete
          onContinue={() =>
            setOwnerScreen(
              "restaurant-dashboard",
            )
          }
        />
      );

    /* =====================================================
       RESTAURANT DASHBOARD
    ===================================================== */

    case "restaurant-dashboard":
      return (
        <RestaurantDashboard
          onNavigate={navigateRestaurant}
        />
      );

    /* =====================================================
       RESTAURANT ORDERS
    ===================================================== */

    case "restaurant-orders":
      return (
        <RestaurantOrders
          onNavigate={navigateRestaurant}
        />
      );

    /* =====================================================
       RESTAURANT TABLES
    ===================================================== */

    case "restaurant-tables":
      return (
        <RestaurantTables
          onNavigate={navigateRestaurant}
        />
      );

    /* =====================================================
       RESTAURANT MENU
    ===================================================== */

    case "restaurant-menu":
      return (
        <RestaurantMenu
          onNavigate={navigateRestaurant}
        />
      );

    /* =====================================================
       RESTAURANT CUSTOMERS
    ===================================================== */

    case "restaurant-customers":
      return (
        <RestaurantCustomers
          onNavigate={navigateRestaurant}
        />
      );

    /* =====================================================
       RESTAURANT PAYMENTS
    ===================================================== */

    case "restaurant-payments":
      return (
        <RestaurantPayments
          onNavigate={navigateRestaurant}
        />
      );

    /* =====================================================
       RESTAURANT SETTINGS
    ===================================================== */

    case "restaurant-settings":
      return (
        <RestaurantSettings
          onNavigate={navigateRestaurant}
        />
      );

    /* =====================================================
       HOTEL SETUP
    ===================================================== */

    case "hotel-setup":
      return (
        <HotelSetup
          onBack={() =>
            setOwnerScreen("business-type")
          }
          onComplete={(hotel) => {
            setHotelDetails(hotel);

            setOwnerScreen(
              "hotel-menu-setup",
            );
          }}
        />
      );

    /* =====================================================
       HOTEL MENU SETUP
    ===================================================== */

    case "hotel-menu-setup":
      return (
        <HotelMenuSetup
          onBack={() =>
            setOwnerScreen("hotel-setup")
          }
          onContinue={() =>
            setOwnerScreen(
              "hotel-rooms-setup",
            )
          }
        />
      );

    /* =====================================================
       HOTEL ROOMS SETUP
    ===================================================== */

    case "hotel-rooms-setup":
      return (
        <HotelRoomsSetup
          onBack={() =>
            setOwnerScreen(
              "hotel-menu-setup",
            )
          }
          onContinue={() =>
            setOwnerScreen(
              "hotel-qr-management",
            )
          }
        />
      );

    /* =====================================================
       HOTEL QR MANAGEMENT
    ===================================================== */

    case "hotel-qr-management":
      return (
        <HotelQRManagement
          onBack={() =>
            setOwnerScreen(
              "hotel-rooms-setup",
            )
          }
          onContinue={() =>
            setOwnerScreen(
              "hotel-setup-complete",
            )
          }
        />
      );

    /* =====================================================
       HOTEL SETUP COMPLETE
       
       Hotel dashboard will be added in the Hotel Owner
       Frontend phase. For now this returns to landing.
    ===================================================== */

    case "hotel-setup-complete":
      return (
        <HotelSetupComplete
          onContinue={() =>
            setOwnerScreen("landing")
          }
        />
      );

    default:
      return (
        <OwnerLanding
          onGetStarted={() =>
            setOwnerScreen("register")
          }
          onLogin={() =>
            setOwnerScreen("login")
          }
        />
      );
  }
}

/* =========================================================
   CUSTOMER APP
========================================================= */

function CustomerApp() {
  const [screen, setScreen] =
    useState<CustomerScreen>("launch");

  const [cart, setCart] = useState<CartItem[]>([]);

  const [selectedFood, setSelectedFood] =
    useState<FoodItem | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState("Popular");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [currentOrder, setCurrentOrder] =
    useState<CustomerOrder | null>(null);

  const [, setPaymentMethod] =
    useState<PaymentMethod>("esewa");

  const filteredMenu = useMemo(() => {
    const query =
      searchQuery.trim().toLowerCase();

    return menuFoods.filter(
      (food: FoodItem) => {
        const matchesCategory =
          selectedCategory === "Popular"
            ? food.popular === true
            : food.category ===
              selectedCategory;

        const matchesSearch =
          !query ||
          food.name
            .toLowerCase()
            .includes(query) ||
          food.description
            .toLowerCase()
            .includes(query);

        return (
          matchesCategory &&
          matchesSearch
        );
      },
    );
  }, [
    searchQuery,
    selectedCategory,
  ]);

  const itemCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0,
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      item.food.price * item.quantity,
    0,
  );

  /* =====================================================
     ADD FOOD FROM FOOD DETAILS
  ===================================================== */

  function addToCart(
    food: FoodItem,
    quantity: number,
    note: string,
  ) {
    setCart((currentCart) => {
      const existing =
        currentCart.find(
          (item) =>
            item.food.id === food.id,
        );

      if (existing) {
        return currentCart.map(
          (item) =>
            item.food.id === food.id
              ? {
                  ...item,
                  quantity:
                    item.quantity +
                    quantity,
                  note:
                    note ||
                    item.note,
                }
              : item,
        );
      }

      return [
        ...currentCart,
        {
          food,
          quantity,
          note,
        },
      ];
    });

    setSelectedFood(null);
    setScreen("menu");
  }

  /* =====================================================
     ADD FOOD DIRECTLY FROM CARD
  ===================================================== */

  function addFoodDirectly(
    food: FoodItem,
  ) {
    setCart((currentCart) => {
      const existing =
        currentCart.find(
          (item) =>
            item.food.id === food.id,
        );

      if (existing) {
        return currentCart.map(
          (item) =>
            item.food.id === food.id
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item,
        );
      }

      return [
        ...currentCart,
        {
          food,
          quantity: 1,
          note: "",
        },
      ];
    });
  }

  /* =====================================================
     UPDATE CART QUANTITY
  ===================================================== */

  function updateQuantity(
    foodId: string,
    quantity: number,
  ) {
    if (quantity <= 0) {
      removeFromCart(foodId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.food.id === foodId
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  }

  /* =====================================================
     REMOVE FROM CART
  ===================================================== */

  function removeFromCart(
    foodId: string,
  ) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          item.food.id !== foodId,
      ),
    );
  }

  /* =====================================================
     UPDATE ITEM NOTE
  ===================================================== */

  function updateNote(
    foodId: string,
    note: string,
  ) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.food.id === foodId
          ? {
              ...item,
              note,
            }
          : item,
      ),
    );
  }

  /* =====================================================
     PLACE ORDER
  ===================================================== */

  function handlePlaceOrder(
    method: PaymentMethod,
    customerName: string,
    customerEmail?: string,
  ) {
    setPaymentMethod(method);

    const order: CustomerOrder = {
      id: `order-${Date.now()}`,
      orderNumber: `HK-${Math.floor(
        1000 +
          Math.random() * 9000,
      )}`,
      business:
        restaurantSession.business,
      location:
        restaurantSession.location,
      customerName,
      customerEmail,
      items: cart,
      paymentMethod: method,
      paymentStatus:
        method === "counter"
          ? "unpaid"
          : "pending",
      status: "pending",
      subtotal,
      serviceCharge: 0,
      total: subtotal,
      createdAt:
        new Date().toISOString(),
    };

    setCurrentOrder(order);

    if (method === "counter") {
      setCart([]);
      setScreen("confirmation");
      return;
    }

    setScreen("payment");
  }

  /* =====================================================
     PAYMENT SUCCESS
  ===================================================== */

  function handlePaymentSuccess() {
    if (!currentOrder) {
      return;
    }

    setCurrentOrder({
      ...currentOrder,
      paymentStatus: "paid",
      status: "confirmed",
    });

    setCart([]);
    setScreen("confirmation");
  }

  /* =====================================================
     LAUNCH SCREEN
  ===================================================== */

  if (screen === "launch") {
    return (
      <LaunchScreen
        restaurantName={
          restaurantSession.business.name
        }
        onComplete={() =>
          setScreen("menu")
        }
      />
    );
  }

  /* =====================================================
     MENU SCREEN
  ===================================================== */

  if (screen === "menu") {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto min-h-screen max-w-md px-4 pb-28">
          <RestaurantHeader
            name={
              restaurantSession.business
                .name
            }
            tableNumber={
              restaurantSession.location
                .tableNumber
            }
            description={
              restaurantSession.business
                .description
            }
          />

          <div className="pt-4">
            <MenuSearch
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>

          <div className="mt-5">
            <CategoryScroller
              selectedCategory={
                selectedCategory
              }
              onSelect={
                setSelectedCategory
              }
            />
          </div>

          <section className="mt-6">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                  Menu
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-950">
                  {selectedCategory}
                </h2>
              </div>

              <span className="text-xs font-medium text-gray-500">
                {filteredMenu.length} items
              </span>
            </div>

            <div className="space-y-4">
              {filteredMenu.map(
                (food: FoodItem) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    onAdd={
                      addFoodDirectly
                    }
                    onSelect={(item) => {
                      setSelectedFood(
                        item,
                      );

                      setScreen(
                        "details",
                      );
                    }}
                  />
                ),
              )}
            </div>

            {filteredMenu.length ===
              0 && (
              <div className="rounded-3xl border border-gray-200 bg-white px-5 py-12 text-center">
                <p className="text-sm font-semibold text-gray-800">
                  No items found
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Try another search or
                  category.
                </p>
              </div>
            )}
          </section>
        </div>

        <CartBar
          itemCount={itemCount}
          total={subtotal}
          onClick={() =>
            setScreen("cart")
          }
        />
      </main>
    );
  }

  /* =====================================================
     FOOD DETAILS
  ===================================================== */

  if (
    screen === "details" &&
    selectedFood
  ) {
    return (
      <FoodDetails
        food={selectedFood}
        onBack={() =>
          setScreen("menu")
        }
        onAdd={addToCart}
      />
    );
  }

  /* =====================================================
     CART
  ===================================================== */

  if (screen === "cart") {
    return (
      <CartScreen
        cart={cart}
        onBack={() =>
          setScreen("menu")
        }
        onUpdateQuantity={
          updateQuantity
        }
        onRemove={removeFromCart}
        onUpdateNote={updateNote}
        onCheckout={() =>
          setScreen("checkout")
        }
      />
    );
  }

  /* =====================================================
     CHECKOUT
  ===================================================== */

  if (screen === "checkout") {
    return (
      <CheckoutScreen
        cart={cart}
        onBack={() =>
          setScreen("cart")
        }
        onPlaceOrder={
          handlePlaceOrder
        }
      />
    );
  }

  /* =====================================================
     PAYMENT
  ===================================================== */

  if (
    screen === "payment" &&
    currentOrder
  ) {
    return (
      <PaymentScreen
        cart={currentOrder.items}
        paymentMethod={
          currentOrder.paymentMethod
        }
        onBack={() =>
          setScreen("checkout")
        }
        onPaymentSuccess={
          handlePaymentSuccess
        }
      />
    );
  }

  /* =====================================================
     ORDER CONFIRMATION
  ===================================================== */

  if (
    screen === "confirmation" &&
    currentOrder
  ) {
    return (
      <OrderConfirmation
        order={currentOrder}
        onBackToMenu={() =>
          setScreen("menu")
        }
      />
    );
  }

  return null;
}

export default App;