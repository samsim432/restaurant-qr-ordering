import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Lock,
  Wallet,
} from "lucide-react";
import { useState } from "react";

import type {
  CartItem,
  PaymentMethod,
} from "../../types/customer";

interface PaymentScreenProps {
  cart: CartItem[];
  paymentMethod: PaymentMethod;
  onBack: () => void;
  onPaymentSuccess: () => void;
}

export function PaymentScreen({
  cart,
  paymentMethod,
  onBack,
  onPaymentSuccess,
}: PaymentScreenProps) {
  const [isProcessing, setIsProcessing] =
    useState(false);

  const [isSuccessful, setIsSuccessful] =
    useState(false);

  const total = cart.reduce(
    (sum, item) =>
      sum + item.food.price * item.quantity,
    0,
  );

  const providerName =
    paymentMethod === "esewa"
      ? "eSewa"
      : paymentMethod === "khalti"
        ? "Khalti"
        : "Card";

  const providerDescription =
    paymentMethod === "esewa"
      ? "Secure eSewa payment"
      : paymentMethod === "khalti"
        ? "Secure Khalti payment"
        : "Secure card payment";

  const handlePayment = () => {
    setIsProcessing(true);

    // Mock payment delay.
    // Real payment gateway integration will replace this later.
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccessful(true);

      setTimeout(() => {
        onPaymentSuccess();
      }, 900);
    }, 1400);
  };

  if (isSuccessful) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
        <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4">
          <div className="w-full rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2
                size={42}
                strokeWidth={2}
                className="text-green-500"
              />
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-950">
              Payment successful
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Your payment of{" "}
              <span className="font-semibold text-gray-900">
                Rs. {total}
              </span>{" "}
              was completed successfully.
            </p>

            <div className="mt-6 rounded-2xl bg-green-50 p-4">
              <p className="text-sm font-semibold text-green-800">
                {providerName} payment confirmed
              </p>

              <p className="mt-1 text-xs text-green-700">
                Preparing your order confirmation...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto min-h-screen max-w-md">
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-4">
          <button
            type="button"
            onClick={onBack}
            disabled={isProcessing}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition active:scale-90 disabled:opacity-50"
            aria-label="Back to checkout"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <h1 className="text-lg font-bold text-gray-950">
              Payment
            </h1>

            <p className="text-xs text-gray-500">
              Complete your payment securely
            </p>
          </div>
        </header>

        <div className="px-4 pb-32 pt-6">
          {/* Provider */}
          <section className="rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white shadow-lg shadow-orange-100">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                {paymentMethod === "card" ? (
                  <CreditCard size={23} />
                ) : (
                  <Wallet size={23} />
                )}
              </div>

              <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
                <Lock size={12} />
                Secure
              </div>
            </div>

            <p className="mt-6 text-sm font-medium text-orange-100">
              Paying with
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              {providerName}
            </h2>

            <p className="mt-1 text-sm text-orange-100">
              {providerDescription}
            </p>
          </section>

          {/* Amount */}
          <section className="mt-5 rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-sm font-medium text-gray-500">
              Amount to pay
            </p>

            <div className="mt-2 flex items-end justify-between">
              <span className="text-3xl font-bold tracking-tight text-gray-950">
                Rs. {total}
              </span>

              <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600">
                {cart.reduce(
                  (count, item) =>
                    count + item.quantity,
                  0,
                )}{" "}
                items
              </span>
            </div>
          </section>

          {/* Order items */}
          <section className="mt-5">
            <h2 className="mb-3 text-base font-bold text-gray-950">
              Order summary
            </h2>

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
              {cart.map((item, index) => (
                <div
                  key={item.food.id}
                  className={`flex items-center gap-3 p-4 ${
                    index !== cart.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-sm font-bold text-orange-600">
                    {item.quantity}×
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-950">
                      {item.food.name}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Rs. {item.food.price} each
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-bold text-gray-950">
                    Rs.{" "}
                    {item.food.price *
                      item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Mock payment notice */}
          <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-4">
            <p className="text-sm font-semibold text-orange-900">
              Demo payment
            </p>

            <p className="mt-1 text-xs leading-5 text-orange-700">
              This is a simulated payment for the
              frontend prototype. No real money will
              be charged.
            </p>
          </div>
        </div>

        {/* Bottom payment button */}
        <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4">
          <div className="mx-auto max-w-md">
            <button
              type="button"
              onClick={handlePayment}
              disabled={isProcessing}
              className="flex h-14 w-full items-center justify-between rounded-2xl bg-gray-950 px-5 text-white shadow-xl transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="font-semibold">
                {isProcessing
                  ? "Processing payment..."
                  : `Pay with ${providerName}`}
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