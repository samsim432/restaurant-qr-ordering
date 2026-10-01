import { MapPin, Sparkles } from "lucide-react";

interface RestaurantHeaderProps {
  name: string;
  tableNumber?: string;
  description?: string;
}

export function RestaurantHeader({
  name,
  tableNumber,
  description,
}: RestaurantHeaderProps) {
  return (
    <header className="sticky top-0 z-40 -mx-4 border-b border-orange-100/80 bg-white/90 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Restaurant brand mark */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-sm">
            <Sparkles size={19} strokeWidth={2.2} />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-base font-bold tracking-tight text-gray-950">
              {name}
            </h1>

            {description && (
              <p className="mt-0.5 truncate text-xs font-medium text-gray-500">
                {description}
              </p>
            )}
          </div>
        </div>

        {tableNumber && (
          <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-bold text-orange-700 shadow-sm">
            <MapPin
              size={14}
              strokeWidth={2.5}
              className="text-orange-500"
            />

            <span>Table {tableNumber}</span>
          </div>
        )}
      </div>
    </header>
  );
}