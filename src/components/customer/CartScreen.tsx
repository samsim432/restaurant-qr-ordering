import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
} from "lucide-react";
import type { CartItem } from "../../types/customer";

interface CartScreenProps {
  cart: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (foodId: string, quantity: number) => void;
  onRemove: (foodId: string) => void;
  onUpdateNote: (foodId: string, note: string) => void;
  onCheckout: () => void;
}

export function CartScreen({
  cart,
  onBack,
  onUpdateQuantity,
  onRemove,
  onUpdateNote,
  onCheckout,
}: CartScreenProps) {
  const subtotal = cart.reduce(
    (total, item) => total + item.food.price * item.quantity,
    0,
  );

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto min-h-screen max-w-md px-4">
          <header className="flex items-center py-4">
            <button
              onClick={onBack}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition active:scale-90"
              aria-label="Go back"
            >
              <ArrowLeft size={19} />
            </button>
          </header>

          <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <ShoppingBag
                size={28}
                className="text-gray-400"
              />
            </div>

            <h1 className="mt-5 text-xl font-semibold text-gray-950">
              Your order is empty
            </h1>

            <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
              Add something delicious from the menu to get started.
            </p>

            <button
              onClick={onBack}
              className="mt-6 rounded-2xl bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition active:scale-95"
            >
              Browse menu
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto min-h-screen max-w-md">
        <header className="flex items-center gap-3 bg-white px-4 py-4">
          <button
            onClick={onBack}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 transition active:scale-90"
            aria-label="Back to menu"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <h1 className="text-lg font-semibold text-gray-950">
              Your order
            </h1>

            <p className="text-xs text-gray-500">
              {itemCount}{" "}
              {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
        </header>

        <div className="px-4 pb-32 pt-5">
          <section className="space-y-3">
            {cart.map((item) => (
              <CartItemCard
                key={item.food.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
                onUpdateNote={onUpdateNote}
              />
            ))}
          </section>

          <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-4">
            <h2 className="text-sm font-semibold text-gray-950">
              Order summary
            </h2>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between text-gray-500">
                <span>Subtotal</span>

                <span className="font-medium text-gray-900">
                  Rs. {subtotal}
                </span>
              </div>

              <div className="flex items-center justify-between text-gray-500">
                <span>Service charge</span>

                <span className="font-medium text-gray-900">
                  Rs. 0
                </span>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-950">
                    Total
                  </span>

                  <span className="text-lg font-semibold text-gray-950">
                    Rs. {subtotal}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4">
          <div className="mx-auto max-w-md">
            <button
              onClick={onCheckout}
              className="flex h-14 w-full items-center justify-between rounded-2xl bg-gray-950 px-5 text-white shadow-xl transition active:scale-[0.98]"
            >
              <span className="font-semibold">
                Continue to checkout
              </span>

              <span className="font-semibold">
                Rs. {subtotal}
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (foodId: string, quantity: number) => void;
  onRemove: (foodId: string) => void;
  onUpdateNote: (foodId: string, note: string) => void;
}

function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
  onUpdateNote,
}: CartItemCardProps) {
  const { food, quantity, note } = item;

  const itemTotal = food.price * quantity;

  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-3">
      <div className="flex gap-3">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
          {food.image ? (
            <img
              src={food.image}
              alt={food.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-gray-400">
              Food
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold text-gray-950">
                {food.name}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Rs. {food.price}
              </p>
            </div>

            <button
              onClick={() => onRemove(food.id)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 active:scale-90"
              aria-label={`Remove ${food.name}`}
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="inline-flex items-center rounded-xl border border-gray-200">
              <button
                onClick={() =>
                  onUpdateQuantity(
                    food.id,
                    Math.max(0, quantity - 1),
                  )
                }
                className="flex h-9 w-9 items-center justify-center text-gray-600 transition active:scale-90"
                aria-label={`Decrease ${food.name}`}
              >
                <Minus size={15} />
              </button>

              <span className="w-8 text-center text-sm font-semibold">
                {quantity}
              </span>

              <button
                onClick={() =>
                  onUpdateQuantity(food.id, quantity + 1)
                }
                className="flex h-9 w-9 items-center justify-center text-gray-600 transition active:scale-90"
                aria-label={`Increase ${food.name}`}
              >
                <Plus size={15} />
              </button>
            </div>

            <span className="font-semibold text-gray-950">
              Rs. {itemTotal}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor={`note-${food.id}`}
          className="text-xs font-medium text-gray-600"
        >
          Special instructions
        </label>

        <textarea
          id={`note-${food.id}`}
          value={note ?? ""}
          onChange={(event) =>
            onUpdateNote(food.id, event.target.value)
          }
          placeholder="e.g. Less spicy, no onions..."
          rows={2}
          className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-300 focus:bg-white"
        />
      </div>
    </article>
  );
}