import {
  Beef,
  CakeSlice,
  Coffee,
  CookingPot,
  Drumstick,
  Flame,
  Soup,
  Utensils,
  Wheat,
} from "lucide-react";

interface CategoryScrollerProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const categories = [
  {
    name: "Popular",
    icon: Flame,
  },
  {
    name: "Momo",
    icon: Soup,
  },
  {
    name: "Noodles",
    icon: Wheat,
  },
  {
    name: "Nepali",
    icon: CookingPot,
  },
  {
    name: "Curries",
    icon: Drumstick,
  },
  {
    name: "Rice",
    icon: Utensils,
  },
  {
    name: "Starters",
    icon: Beef,
  },
  {
    name: "Drinks",
    icon: Coffee,
  },
  {
    name: "Desserts",
    icon: CakeSlice,
  },
];

export function CategoryScroller({
  selectedCategory,
  onSelect,
}: CategoryScrollerProps) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
            Explore
          </p>

          <h2 className="mt-1 text-base font-bold text-gray-950">
            Categories
          </h2>
        </div>
      </div>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 scrollbar-none">
        {categories.map((category) => {
          const Icon = category.icon;

          const isSelected =
            selectedCategory === category.name;

          return (
            <button
              key={category.name}
              type="button"
              onClick={() => onSelect(category.name)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition active:scale-95 ${
                isSelected
                  ? "border-orange-500 bg-orange-500 text-white shadow-sm shadow-orange-200"
                  : "border-gray-200 bg-white text-gray-700 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              <Icon size={16} strokeWidth={2.2} />

              {category.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}