import { Search, X } from "lucide-react";

interface MenuSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function MenuSearch({
  value,
  onChange,
}: MenuSearchProps) {
  function clearSearch() {
    onChange("");
  }

  return (
    <div className="relative">
      <Search
        size={19}
        strokeWidth={2}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search dishes..."
        className="h-12 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-11 text-sm font-medium text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
        aria-label="Search menu"
      />

      {value && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition active:scale-90"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}