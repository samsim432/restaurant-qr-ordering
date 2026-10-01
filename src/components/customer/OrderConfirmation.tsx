import {
  Check,
  Clock3,
  MapPin,
  Receipt,
} from "lucide-react";

import type { CustomerOrder } from "../../types/customer";

interface OrderConfirmationProps {
  order: CustomerOrder;
  onBackToMenu: () => void;
}

export function OrderConfirmation({
  order,
  onBackToMenu,
}: OrderConfirmationProps) {
  const isCounterPayment =
    order.paymentMethod === "counter";

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto min-h-screen max-w-md px-4 py-8">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            {/* Success */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Check
                size={38}
                strokeWidth={2.5}
                className="text-green-600"
              />
            </div>

            <h1 className="mt-6 text-2xl font-semibold tracking-tight text-gray-950">
              Order confirmed
            </h1>

            <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
              Your order has been received by{" "}
              {order.business.name}.
            </p>

            {/* Order number */}
            <div className="mt-7 w-full rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Order number
              </p>

              <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-950">
                {order.orderNumber}
              </p>
            </div>

            {/* Status */}
            <div className="mt-3 w-full rounded-2xl border border-gray-100 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <Clock3
                    size={19}
                    className="text-gray-700"
                  />
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-950">
                    Order received
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    The restaurant will start preparing it shortly.
                  </p>
                </div>
              </div>
            </div>

            {/* Restaurant / table */}
            <div className="mt-3 w-full rounded-2xl border border-gray-100 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <MapPin
                    size={19}
                    className="text-gray-700"
                  />
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-950">
                    {order.business.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {order.location.tableNumber
                      ? `Table ${order.location.tableNumber}`
                      : "Restaurant"}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="mt-3 w-full rounded-2xl border border-gray-100 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <Receipt
                    size={19}
                    className="text-gray-700"
                  />
                </div>

                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-gray-950">
                    {isCounterPayment
                      ? "Pay at counter"
                      : "Paid online"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Total: Rs. {order.total}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    order.paymentStatus === "paid"
                      ? "bg-green-50 text-green-700"
                      : "bg-orange-50 text-orange-700"
                  }`}
                >
                  {order.paymentStatus === "paid"
                    ? "Paid"
                    : "Unpaid"}
                </span>
              </div>
            </div>
          </div>

          {/* Back to menu */}
          <div className="pt-6">
            <button
              type="button"
              onClick={onBackToMenu}
              className="h-14 w-full rounded-2xl bg-gray-950 font-semibold text-white shadow-lg transition active:scale-[0.98]"
            >
              Back to menu
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}