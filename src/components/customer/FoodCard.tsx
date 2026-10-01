import {
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { FoodItem } from "../../types/customer";

interface FoodCardProps {
  food: FoodItem;
  onAdd: (food: FoodItem) => void;
  onSelect: (food: FoodItem) => void;
}

export function FoodCard({
  food,
  onAdd,
  onSelect,
}: FoodCardProps) {
  const images =
    food.images && food.images.length > 0
      ? food.images
      : food.image
        ? [food.image]
        : [];

  const [currentImage, setCurrentImage] =
    useState(0);

  /* ---------------------------------------------
     AUTO SLIDE
  --------------------------------------------- */

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentImage((current) =>
        current === images.length - 1
          ? 0
          : current + 1,
      );
    }, 3000);

    return () => {
      window.clearInterval(interval);
    };
  }, [images.length]);

  /* ---------------------------------------------
     NEXT
  --------------------------------------------- */

  function nextImage(
    event?: React.MouseEvent,
  ) {
    event?.stopPropagation();

    setCurrentImage((current) =>
      current === images.length - 1
        ? 0
        : current + 1,
    );
  }

  /* ---------------------------------------------
     PREVIOUS
  --------------------------------------------- */

  function previousImage(
    event?: React.MouseEvent,
  ) {
    event?.stopPropagation();

    setCurrentImage((current) =>
      current === 0
        ? images.length - 1
        : current - 1,
    );
  }

  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

      {/* =================================================
          IMAGE
      ================================================= */}

      <button
        type="button"
        onClick={() => onSelect(food)}
        className="relative block w-full text-left"
        aria-label={`View ${food.name}`}
      >
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100">

          {images.length > 0 ? (
            <img
              src={images[currentImage]}
              alt={`${food.name} ${currentImage + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-all duration-700"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-orange-50">
              <span className="text-4xl">
                🍽️
              </span>
            </div>
          )}

          {/* Dark image gradient */}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Popular */}

          {food.popular && (
            <div className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-600 shadow-sm backdrop-blur">
              Popular
            </div>
          )}

          {/* Image count */}

          {images.length > 1 && (
            <div className="absolute right-3 top-3 rounded-full bg-black/45 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
              {currentImage + 1}/{images.length}
            </div>
          )}

          {/* Previous */}

          {images.length > 1 && (
            <button
              type="button"
              onClick={previousImage}
              className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 opacity-0 shadow-md transition group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={17} />
            </button>
          )}

          {/* Next */}

          {images.length > 1 && (
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 opacity-0 shadow-md transition group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight size={17} />
            </button>
          )}

          {/* Dots */}

          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentImage
                      ? "w-4 bg-white"
                      : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </button>

      {/* =================================================
          FOOD INFO
      ================================================= */}

      <div className="p-3.5">

        <button
          type="button"
          onClick={() => onSelect(food)}
          className="block w-full text-left"
        >
          <h3 className="line-clamp-1 text-[15px] font-bold text-gray-950">
            {food.name}
          </h3>

          <p className="mt-1 text-xs font-medium text-gray-400">
            {food.category}
          </p>
        </button>

        <div className="mt-3 flex items-center justify-between gap-2">

          <p className="text-base font-bold text-gray-950">
            Rs. {food.price}
          </p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onAdd(food);
            }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-950 text-white shadow-sm transition hover:bg-orange-500 active:scale-90"
            aria-label={`Add ${food.name} to cart`}
          >
            <Plus
              size={18}
              strokeWidth={2.5}
            />
          </button>

        </div>
      </div>
    </article>
  );
}