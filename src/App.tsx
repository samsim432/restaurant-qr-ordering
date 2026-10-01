import { useState } from "react";

import { CategoryScroller } from "./components/customer/CategoryScroller";
import { CartBar } from "./components/customer/CartBar";
import { CartScreen } from "./components/customer/CartScreen";
import { CheckoutScreen } from "./components/customer/CheckoutScreen";
import { FoodCard } from "./components/customer/FoodCard";
import { FoodDetails } from "./components/customer/FoodDetails";
import { MenuSearch } from "./components/customer/MenuSearch";
import { OrderConfirmation } from "./components/customer/OrderConfirmation";
import { PaymentScreen } from "./components/customer/PaymentScreen";
import { RestaurantHeader } from "./components/customer/RestaurantHeader";

import {
  menuFoods,
  restaurantSession,
} from "./data/mockCustomer";

import type {
  CartItem,
  CustomerOrder,
  FoodItem,
  PaymentMethod,
} from "./types/customer";

type AppScreen =
  | "menu"
  | "cart"
  | "checkout"
  | "payment"
  | "confirmation";

function App() {
  const { business, location } = restaurantSession;

  /* =====================================================
     CART
  ===================================================== */

  const [cart, setCart] = useState<CartItem[]>([]);

  /* =====================================================
     SELECTED FOOD
  ===================================================== */

  const [selectedFood, setSelectedFood] =
    useState<FoodItem | null>(null);

  /* =====================================================
     SCREEN
  ===================================================== */

  const [screen, setScreen] =
    useState<AppScreen>("menu");

  /* =====================================================
     CURRENT ORDER
  ===================================================== */

  const [currentOrder, setCurrentOrder] =
    useState<CustomerOrder | null>(null);

  /* =====================================================
     SEARCH
  ===================================================== */

  const [searchQuery, setSearchQuery] = useState("");

  /* =====================================================
     CATEGORY
  ===================================================== */

  const [selectedCategory, setSelectedCategory] =
    useState("Popular");

  /* =====================================================
     SELECTED PAYMENT METHOD
  ===================================================== */

  const [
    selectedPaymentMethod,
    setSelectedPaymentMethod,
  ] = useState<PaymentMethod | null>(null);

  /* =====================================================
     ADD FOOD DIRECTLY
  ===================================================== */

  function addToCart(food: FoodItem) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.food.id === food.id,
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.food.id === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          food,
          quantity: 1,
        },
      ];
    });
  }

  /* =====================================================
     ADD FOOD FROM DETAILS
  ===================================================== */

  function addDetailedFood(
    food: FoodItem,
    quantity: number,
    note: string,
  ) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.food.id === food.id,
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.food.id === food.id
            ? {
                ...item,
                quantity:
                  item.quantity + quantity,
                note: note || item.note,
              }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          food,
          quantity,
          note: note || undefined,
        },
      ];
    });

    setSelectedFood(null);
  }

  /* =====================================================
     UPDATE QUANTITY
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

  function removeFromCart(foodId: string) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.food.id !== foodId,
      ),
    );
  }

  /* =====================================================
     UPDATE NOTE
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
     NAVIGATION
  ===================================================== */

  function openCart() {
    setScreen("cart");
  }

  function closeCart() {
    setScreen("menu");
  }

  function openCheckout() {
    setScreen("checkout");
  }

  function backToCart() {
    setScreen("cart");
  }

  /* =====================================================
     CREATE ORDER
  ===================================================== */

  function createOrder(
    paymentMethod: PaymentMethod,
  ) {
    const subtotal = cart.reduce(
      (total, item) =>
        total +
        item.food.price * item.quantity,
      0,
    );

    const serviceCharge = 0;

    const total =
      subtotal + serviceCharge;

    const orderNumber = `HK-${Math.floor(
      1000 + Math.random() * 9000,
    )}`;

    const newOrder: CustomerOrder = {
      id: crypto.randomUUID(),

      orderNumber,

      business,

      location,

      items: cart,

      paymentMethod,

      paymentStatus:
        paymentMethod === "counter"
          ? "unpaid"
          : "paid",

      status: "confirmed",

      subtotal,

      serviceCharge,

      total,

      createdAt:
        new Date().toISOString(),
    };

    console.log("New order:", newOrder);

    setCurrentOrder(newOrder);

    setCart([]);

    setSelectedPaymentMethod(null);

    setScreen("confirmation");
  }

  /* =====================================================
     PLACE ORDER / START PAYMENT
  ===================================================== */

  function placeOrder(
    paymentMethod: PaymentMethod,
  ) {
    /*
     * Online payments go through
     * the mock payment screen first.
     */

    if (
      paymentMethod === "esewa" ||
      paymentMethod === "khalti" ||
      paymentMethod === "card"
    ) {
      setSelectedPaymentMethod(
        paymentMethod,
      );

      setScreen("payment");

      return;
    }

    /*
     * Counter payment does not
     * need a payment screen.
     */

    createOrder(paymentMethod);
  }

  /* =====================================================
     PAYMENT SUCCESS
  ===================================================== */

  function handlePaymentSuccess() {
    if (!selectedPaymentMethod) {
      return;
    }

    createOrder(selectedPaymentMethod);
  }

  /* =====================================================
     BACK TO MENU
  ===================================================== */

  function backToMenu() {
    setCurrentOrder(null);

    setSearchQuery("");

    setSelectedCategory("Popular");

    setSelectedPaymentMethod(null);

    setSelectedFood(null);

    setScreen("menu");
  }

  /* =====================================================
     CART TOTALS
  ===================================================== */

  const itemCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0,
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      item.food.price * item.quantity,
    0,
  );

  /* =====================================================
     SEARCH + CATEGORY FILTER
  ===================================================== */

  const normalizedSearch =
    searchQuery.trim().toLowerCase();

  const filteredFoods = menuFoods.filter(
    (food) => {
      const matchesSearch =
        normalizedSearch === "" ||
        food.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        food.description
          .toLowerCase()
          .includes(normalizedSearch) ||
        food.category
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "Popular"
          ? food.popular === true
          : food.category ===
            selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    },
  );

  /* =====================================================
     FOOD DETAILS
  ===================================================== */

  if (selectedFood) {
    return (
      <FoodDetails
        food={selectedFood}
        onBack={() =>
          setSelectedFood(null)
        }
        onAdd={addDetailedFood}
      />
    );
  }

  /* =====================================================
     CART SCREEN
  ===================================================== */

  if (screen === "cart") {
    return (
      <CartScreen
        cart={cart}
        onBack={closeCart}
        onUpdateQuantity={
          updateQuantity
        }
        onRemove={removeFromCart}
        onUpdateNote={updateNote}
        onCheckout={openCheckout}
      />
    );
  }

  /* =====================================================
     CHECKOUT SCREEN
  ===================================================== */

  if (screen === "checkout") {
    return (
      <CheckoutScreen
        cart={cart}
        onBack={backToCart}
        onPlaceOrder={placeOrder}
      />
    );
  }

  /* =====================================================
     PAYMENT SCREEN
  ===================================================== */

  if (
    screen === "payment" &&
    selectedPaymentMethod
  ) {
    return (
      <PaymentScreen
        cart={cart}
        paymentMethod={
          selectedPaymentMethod
        }
        onBack={() => {
          setSelectedPaymentMethod(null);
          setScreen("checkout");
        }}
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
        onBackToMenu={backToMenu}
      />
    );
  }

  /* =====================================================
     MENU
  ===================================================== */

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50/70 via-white to-white">
      <div className="mx-auto min-h-screen max-w-md px-4 pb-32">

        {/* =================================================
            RESTAURANT HEADER
        ================================================= */}

        <RestaurantHeader
          name={business.name}
          description={
            business.description
          }
          tableNumber={
            location.tableNumber
          }
        />

        {/* =================================================
            HERO
        ================================================= */}

        <section className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-500 to-rose-500 p-6 text-white shadow-lg shadow-orange-100">

          <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10" />

          <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-white/10" />

          <div className="relative">

            <div className="mb-3 inline-flex items-center rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
              ✨ Freshly prepared
            </div>

            <h2 className="max-w-xs text-2xl font-bold leading-tight tracking-tight">
              What are you craving?
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-5 text-orange-50">
              Explore our menu and order directly from your table.
            </p>

          </div>
        </section>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="mt-5">
          <MenuSearch
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* =================================================
            CATEGORIES
        ================================================= */}

        <div className="mt-7">
          <CategoryScroller
            selectedCategory={
              selectedCategory
            }
            onSelect={
              setSelectedCategory
            }
          />
        </div>

        {/* =================================================
            MENU RESULTS
        ================================================= */}

        <section className="mt-8">

          <div className="mb-4">

            <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
              {searchQuery ||
              selectedCategory !==
                "Popular"
                ? "Menu results"
                : "Customer favourites"}
            </p>

            <div className="mt-1 flex items-center justify-between gap-3">

              <h2 className="min-w-0 text-lg font-bold tracking-tight text-gray-950">
                {searchQuery
                  ? `Results for "${searchQuery}"`
                  : selectedCategory}
              </h2>

              <span className="shrink-0 text-xs font-medium text-gray-400">
                {filteredFoods.length}{" "}
                {filteredFoods.length ===
                1
                  ? "dish"
                  : "dishes"}
              </span>

            </div>
          </div>

          {/* =================================================
              FOOD GRID
          ================================================= */}

          {filteredFoods.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">

              {filteredFoods.map(
                (food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    onAdd={addToCart}
                    onSelect={
                      setSelectedFood
                    }
                  />
                ),
              )}

            </div>
          ) : (

            /* =================================================
               EMPTY RESULT
            ================================================= */

            <div className="rounded-3xl border border-gray-100 bg-white px-6 py-12 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
                🍽️
              </div>

              <h3 className="mt-4 font-semibold text-gray-950">
                No dishes found
              </h3>

              <p className="mx-auto mt-2 max-w-xs text-sm leading-5 text-gray-500">
                Try another search or choose a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(
                    "Popular",
                  );
                }}
                className="mt-5 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-200 transition active:scale-95"
              >
                Clear filters
              </button>

            </div>
          )}

        </section>

        {/* =================================================
            TRUST MESSAGE
        ================================================= */}

        <div className="mt-8 rounded-2xl border border-orange-100 bg-orange-50/70 p-4 text-center">

          <p className="text-sm font-semibold text-gray-900">
            Order from your table
          </p>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            No app or account required. Just choose your food and place your order.
          </p>

        </div>

      </div>

      {/* ===================================================
          CART BAR
      =================================================== */}

      <CartBar
        itemCount={itemCount}
        total={cartTotal}
        onClick={openCart}
      />

    </main>
  );
}

export default App;