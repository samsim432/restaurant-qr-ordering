import { ShoppingBag, ChevronRight } from "lucide-react";

interface CartBarProps {
  itemCount: number;
  total: number;
  onClick: () => void;
}

export function CartBar({
  itemCount,
  total,
  onClick,
}: CartBarProps) {
  if (itemCount === 0) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="mx-auto max-w-md">
        <button
          onClick={onClick}
          className="flex w-full items-center justify-between rounded-2xl bg-gray-950 px-4 py-3.5 text-white shadow-xl transition active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <ShoppingBag size={19} />
            </div>

            <div className="text-left">
              <p className="text-sm font-semibold">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>

              <p className="text-xs text-white/60">
                View your order
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold">
              Rs. {total}
            </span>

            <ChevronRight size={18} />
          </div>
        </button>
      </div>
    </div>
  );
}