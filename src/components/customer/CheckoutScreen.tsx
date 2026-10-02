import {
  ArrowLeft,
  Check,
  CreditCard,
  User,
  Wallet,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import type {
  CartItem,
  PaymentMethod,
} from "../../types/customer";

interface CheckoutScreenProps {
  cart: CartItem[];
  onBack: () => void;
  onPlaceOrder: (
    paymentMethod: PaymentMethod,
    customerName: string,
    customerEmail?: string,
  ) => void;
}

export function CheckoutScreen({
  cart,
  onBack,
  onPlaceOrder,
}: CheckoutScreenProps) {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("esewa");

  const [customerName, setCustomerName] =
    useState("");

  const [customerEmail, setCustomerEmail] =
    useState("");

  const [nameError, setNameError] =
    useState("");

  const [emailError, setEmailError] =
    useState("");

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.food.price * item.quantity,
    0,
  );

  const serviceCharge = 0;
  const total = subtotal + serviceCharge;

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const isOnlinePayment =
    paymentMethod === "esewa" ||
    paymentMethod === "khalti" ||
    paymentMethod === "card";

  function validateCustomerDetails() {
    let valid = true;

    const trimmedName = customerName.trim();
    const trimmedEmail = customerEmail.trim();

    setNameError("");
    setEmailError("");

    /* Name validation */

    if (!trimmedName) {
      setNameError(
        "Please enter your name so the restaurant can identify your order.",
      );

      valid = false;
    } else if (trimmedName.length < 2) {
      setNameError(
        "Name must be at least 2 characters.",
      );

      valid = false;
    }

    /* Email validation */

    if (trimmedEmail) {
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(trimmedEmail)) {
        setEmailError(
          "Please enter a valid email address.",
        );

        valid = false;
      }
    }

    return {
      valid,
      name: trimmedName,
      email: trimmedEmail,
    };
  }

  function handlePlaceOrder() {
    const result =
      validateCustomerDetails();

    if (!result.valid) {
      return;
    }

    onPlaceOrder(
      paymentMethod,
      result.name,
      result.email || undefined,
    );
  }

  function handleNameChange(
    value: string,
  ) {
    setCustomerName(value);

    if (nameError) {
      setNameError("");
    }
  }

  function handleEmailChange(
    value: string,
  ) {
    setCustomerEmail(value);

    if (emailError) {
      setEmailError("");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto min-h-screen max-w-md">
        {/* Header */}

        <header className="flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-4">
          <button
            type="button"
            onClick={onBack}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-gray-100
              text-gray-700
              transition
              hover:bg-gray-200
              active:scale-90
            "
            aria-label="Back to cart"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <h1 className="text-lg font-semibold text-gray-950">
              Checkout
            </h1>

            <p className="text-xs text-gray-500">
              Enter your details and choose how to pay
            </p>
          </div>
        </header>

        <div className="px-4 pb-32 pt-5">
          {/* =================================================
              CUSTOMER DETAILS
          ================================================= */}

          <section>
            <div className="mb-3">
              <h2 className="text-base font-semibold text-gray-950">
                Your details
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Your name helps the restaurant identify your
                order at the table.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              {/* Name */}

              <div>
                <label
                  htmlFor="customer-name"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Name
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <div
                  className={`flex items-center rounded-xl border bg-white transition ${
                    nameError
                      ? "border-red-400 ring-4 ring-red-50"
                      : "border-gray-200 focus-within:border-gray-950 focus-within:ring-4 focus-within:ring-gray-100"
                  }`}
                >
                  <div className="flex h-12 w-11 shrink-0 items-center justify-center text-gray-400">
                    <User size={18} />
                  </div>

                  <input
                    id="customer-name"
                    type="text"
                    value={customerName}
                    onChange={(event) =>
                      handleNameChange(
                        event.target.value,
                      )
                    }
                    placeholder="e.g. Samir"
                    maxLength={50}
                    autoComplete="name"
                    className="
                      h-12
                      min-w-0
                      flex-1
                      bg-transparent
                      pr-3
                      text-sm
                      text-gray-950
                      outline-none
                      placeholder:text-gray-400
                    "
                  />
                </div>

                {nameError && (
                  <p
                    className="mt-2 text-xs font-medium text-red-600"
                    role="alert"
                  >
                    {nameError}
                  </p>
                )}

                {!nameError && (
                  <p className="mt-2 text-xs text-gray-400">
                    Required so staff can identify your
                    order.
                  </p>
                )}
              </div>

              {/* Email */}

              <div className="mt-5">
                <label
                  htmlFor="customer-email"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Email
                  <span className="ml-1 font-normal text-gray-400">
                    (optional)
                  </span>
                </label>

                <input
                  id="customer-email"
                  type="email"
                  value={customerEmail}
                  onChange={(event) =>
                    handleEmailChange(
                      event.target.value,
                    )
                  }
                  placeholder="you@example.com"
                  maxLength={120}
                  autoComplete="email"
                  className={`
                    h-12
                    w-full
                    rounded-xl
                    border
                    bg-white
                    px-4
                    text-sm
                    text-gray-950
                    outline-none
                    transition
                    placeholder:text-gray-400
                    ${
                      emailError
                        ? "border-red-400 ring-4 ring-red-50"
                        : "border-gray-200 focus:border-gray-950 focus:ring-4 focus:ring-gray-100"
                    }
                  `}
                />

                {emailError && (
                  <p
                    className="mt-2 text-xs font-medium text-red-600"
                    role="alert"
                  >
                    {emailError}
                  </p>
                )}

                {!emailError && (
                  <p className="mt-2 text-xs leading-5 text-gray-400">
                    Optional. We can use this for your
                    order receipt or updates later.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* =================================================
              ORDER
          ================================================= */}

          <section className="mt-7">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-950">
                Your order
              </h2>

              <span className="text-sm text-gray-500">
                {itemCount}{" "}
                {itemCount === 1
                  ? "item"
                  : "items"}
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
              {cart.map((item, index) => (
                <div
                  key={item.food.id}
                  className={`flex gap-3 p-4 ${
                    index !== cart.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-sm font-semibold text-gray-700">
                    {item.quantity}×
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-950">
                      {item.food.name}
                    </p>

                    {item.note && (
                      <p className="mt-1 text-xs text-gray-500">
                        Note: {item.note}
                      </p>
                    )}
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-gray-950">
                    Rs.{" "}
                    {item.food.price *
                      item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================
              PAYMENT
          ================================================= */}

          <section className="mt-7">
            <h2 className="mb-3 text-base font-semibold text-gray-950">
              Payment method
            </h2>

            {/* Pay Online */}

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-950 text-white">
                  <CreditCard size={19} />
                </div>

                <div>
                  <p className="font-semibold text-gray-950">
                    Pay online
                  </p>

                  <p className="text-xs text-gray-500">
                    Choose your payment provider
                  </p>
                </div>
              </div>

              {/* Online payment providers */}

              <div className="mt-4 space-y-2">
                <PaymentOption
                  title="eSewa"
                  description="Pay securely with eSewa"
                  selected={
                    paymentMethod ===
                    "esewa"
                  }
                  onClick={() =>
                    setPaymentMethod(
                      "esewa",
                    )
                  }
                  icon={
                    <span className="text-sm font-bold">
                      eS
                    </span>
                  }
                />

                <PaymentOption
                  title="Khalti"
                  description="Pay securely with Khalti"
                  selected={
                    paymentMethod ===
                    "khalti"
                  }
                  onClick={() =>
                    setPaymentMethod(
                      "khalti",
                    )
                  }
                  icon={
                    <span className="text-sm font-bold">
                      K
                    </span>
                  }
                />

                <PaymentOption
                  title="Card"
                  description="Visa, Mastercard or debit card"
                  selected={
                    paymentMethod ===
                    "card"
                  }
                  onClick={() =>
                    setPaymentMethod(
                      "card",
                    )
                  }
                  icon={
                    <CreditCard size={19} />
                  }
                />
              </div>
            </div>

            {/* Pay at counter */}

            <button
              type="button"
              onClick={() =>
                setPaymentMethod(
                  "counter",
                )
              }
              className={`mt-3 flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition active:scale-[0.99] ${
                paymentMethod === "counter"
                  ? "border-gray-950 bg-white"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  paymentMethod === "counter"
                    ? "bg-gray-950 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <Wallet size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-950">
                  Pay at counter
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Order now and pay at the counter
                </p>
              </div>

              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  paymentMethod === "counter"
                    ? "border-gray-950 bg-gray-950 text-white"
                    : "border-gray-300"
                }`}
              >
                {paymentMethod ===
                  "counter" && (
                  <Check
                    size={12}
                    strokeWidth={3}
                  />
                )}
              </div>
            </button>
          </section>

          {/* =================================================
              PAYMENT INFORMATION
          ================================================= */}

          <div
            className={`mt-4 rounded-2xl p-4 ${
              isOnlinePayment
                ? "bg-blue-50"
                : "bg-gray-100"
            }`}
          >
            {isOnlinePayment ? (
              <>
                <p className="text-sm font-medium text-blue-900">
                  {paymentMethod ===
                    "esewa" &&
                    "eSewa payment"}

                  {paymentMethod ===
                    "khalti" &&
                    "Khalti payment"}

                  {paymentMethod ===
                    "card" &&
                    "Card payment"}
                </p>

                <p className="mt-1 text-xs leading-5 text-blue-700">
                  You will continue to the
                  selected payment provider
                  after placing your order.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-900">
                  Pay at counter
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-600">
                  Your order will be sent to the
                  restaurant. Please pay at the
                  counter.
                </p>
              </>
            )}
          </div>

          {/* =================================================
              TOTAL
          ================================================= */}

          <section className="mt-7 rounded-2xl border border-gray-100 bg-white p-4">
            <h2 className="text-sm font-semibold text-gray-950">
              Order total
            </h2>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>

                <span className="font-medium text-gray-900">
                  Rs. {subtotal}
                </span>
              </div>

              <div className="flex justify-between text-gray-500">
                <span>Service charge</span>

                <span className="font-medium text-gray-900">
                  Rs. {serviceCharge}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-950">
                    Total
                  </span>

                  <span className="text-lg font-semibold text-gray-950">
                    Rs. {total}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* =================================================
            BOTTOM ACTION
        ================================================= */}

        <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4">
          <div className="mx-auto max-w-md">
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="
                flex
                h-14
                w-full
                items-center
                justify-between
                rounded-2xl
                bg-gray-950
                px-5
                text-white
                shadow-xl
                transition
                hover:bg-orange-500
                active:scale-[0.98]
              "
            >
              <span className="font-semibold">
                {isOnlinePayment
                  ? "Continue to payment"
                  : "Place order"}
              </span>

              <span className="font-semibold">
                Rs. {total}
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

interface PaymentOptionProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  icon: ReactNode;
}

function PaymentOption({
  title,
  description,
  selected,
  onClick,
  icon,
}: PaymentOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition active:scale-[0.99] ${
        selected
          ? "border-gray-950 bg-gray-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
          selected
            ? "bg-gray-950 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-950">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-gray-500">
          {description}
        </p>
      </div>

      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected
            ? "border-gray-950 bg-gray-950 text-white"
            : "border-gray-300"
        }`}
      >
        {selected && (
          <Check
            size={12}
            strokeWidth={3}
          />
        )}
      </div>
    </button>
  );
}