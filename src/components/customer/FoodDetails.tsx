import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Star,
  X,
} from "lucide-react";
import {
  useEffect,
  useState,
  type TouchEvent,
} from "react";

import type { FoodItem } from "../../types/customer";

interface FoodDetailsProps {
  food: FoodItem;
  onBack: () => void;
  onAdd: (
    food: FoodItem,
    quantity: number,
  ) => void;
}

const AUTO_SLIDE_INTERVAL = 3500;
const MINIMUM_SWIPE_DISTANCE = 50;

export function FoodDetails({
  food,
  onBack,
  onAdd,
}: FoodDetailsProps) {
  const images =
    food.images && food.images.length > 0
      ? food.images
      : food.image
        ? [food.image]
        : [];

  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(
    null,
  );

  const total = food.price * quantity;
  const hasMultipleImages = images.length > 1;

  /* =====================================================
     BODY SCROLL LOCK
  ===================================================== */

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  /* =====================================================
     RESET IMAGE WHEN FOOD CHANGES
  ===================================================== */

  useEffect(() => {
    setCurrentImage(0);
    setQuantity(1);
    setTouchStart(null);
  }, [food.id]);

  /* =====================================================
     AUTO SLIDE
  ===================================================== */

  useEffect(() => {
    if (!hasMultipleImages) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentImage((current) =>
        current === images.length - 1
          ? 0
          : current + 1,
      );
    }, AUTO_SLIDE_INTERVAL);

    return () => {
      window.clearInterval(interval);
    };
  }, [hasMultipleImages, images.length]);

  /* =====================================================
     IMAGE NAVIGATION
  ===================================================== */

  const nextImage = () => {
    setCurrentImage((current) =>
      current === images.length - 1
        ? 0
        : current + 1,
    );
  };

  const previousImage = () => {
    setCurrentImage((current) =>
      current === 0
        ? images.length - 1
        : current - 1,
    );
  };

  /* =====================================================
     KEYBOARD CONTROLS
  ===================================================== */

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onBack();
        return;
      }

      if (!hasMultipleImages) {
        return;
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [onBack, hasMultipleImages]);

  /* =====================================================
     TOUCH / SWIPE CONTROLS
  ===================================================== */

  function handleTouchStart(event: TouchEvent) {
    setTouchStart(event.touches[0]?.clientX ?? null);
  }

  function handleTouchEnd(event: TouchEvent) {
    if (touchStart === null) {
      return;
    }

    const touchEnd =
      event.changedTouches[0]?.clientX;

    if (touchEnd === undefined) {
      setTouchStart(null);
      return;
    }

    const difference = touchStart - touchEnd;

    if (difference > MINIMUM_SWIPE_DISTANCE) {
      nextImage();
    } else if (
      difference < -MINIMUM_SWIPE_DISTANCE
    ) {
      previousImage();
    }

    setTouchStart(null);
  }

  /* =====================================================
     QUANTITY CONTROLS
  ===================================================== */

  function decreaseQuantity() {
    setQuantity((current) =>
      Math.max(1, current - 1),
    );
  }

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  /* =====================================================
     ADD TO ORDER
  ===================================================== */

  function handleAddToOrder() {
    onAdd(food, quantity);
  }

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-end justify-center
        bg-black/60
        p-0
        backdrop-blur-[3px]
        sm:items-center
        sm:p-4
      "
      onClick={onBack}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="food-detail-title"
        className="
          max-h-[95vh]
          w-full
          overflow-y-auto
          rounded-t-[2rem]
          bg-white
          shadow-2xl
          sm:max-w-md
          sm:rounded-[2rem]
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* =================================================
            IMAGE SLIDER
        ================================================= */}

        <div
          className="
            relative
            aspect-[4/3]
            w-full
            overflow-hidden
            bg-gray-100
          "
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main image */}

          {images.length > 0 ? (
            <img
              src={images[currentImage]}
              alt={`${food.name} - image ${
                currentImage + 1
              } of ${images.length}`}
              className="
                h-full
                w-full
                object-cover
                transition-all
                duration-500
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                items-center
                justify-center
                bg-orange-50
              "
              aria-label="No food image available"
            >
              <span
                className="text-7xl"
                aria-hidden="true"
              >
                🍽️
              </span>
            </div>
          )}

          {/* Image gradient */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-32
              bg-gradient-to-t
              from-black/45
              to-transparent
            "
            aria-hidden="true"
          />

          {/* Close button */}

          <button
            type="button"
            onClick={onBack}
            className="
              absolute
              right-4
              top-4
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-white/95
              text-gray-900
              shadow-lg
              backdrop-blur
              transition
              hover:bg-white
              active:scale-90
            "
            aria-label="Close food details"
          >
            <X size={20} />
          </button>

          {/* Image counter */}

          {hasMultipleImages && (
            <div
              className="
                absolute
                left-4
                top-4
                rounded-full
                bg-black/45
                px-3
                py-1.5
                text-xs
                font-semibold
                text-white
                backdrop-blur
              "
              aria-label={`Image ${
                currentImage + 1
              } of ${images.length}`}
            >
              {currentImage + 1} / {images.length}
            </div>
          )}

          {/* Previous button */}

          {hasMultipleImages && (
            <button
              type="button"
              onClick={previousImage}
              className="
                absolute
                left-3
                top-1/2
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white/90
                text-gray-900
                shadow-lg
                transition
                hover:bg-white
                active:scale-90
              "
              aria-label="Previous image"
            >
              <ChevronLeft size={21} />
            </button>
          )}

          {/* Next button */}

          {hasMultipleImages && (
            <button
              type="button"
              onClick={nextImage}
              className="
                absolute
                right-3
                top-1/2
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white/90
                text-gray-900
                shadow-lg
                transition
                hover:bg-white
                active:scale-90
              "
              aria-label="Next image"
            >
              <ChevronRight size={21} />
            </button>
          )}

          {/* Image indicators */}

          {hasMultipleImages && (
            <div
              className="
                absolute
                bottom-4
                left-1/2
                flex
                -translate-x-1/2
                gap-1.5
              "
              role="tablist"
              aria-label="Food images"
            >
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    setCurrentImage(index)
                  }
                  className={`
                    h-2
                    rounded-full
                    transition-all
                    ${
                      index === currentImage
                        ? "w-6 bg-white"
                        : "w-2 bg-white/60"
                    }
                  `}
                  aria-label={`Go to image ${
                    index + 1
                  }`}
                  aria-selected={
                    index === currentImage
                  }
                  role="tab"
                />
              ))}
            </div>
          )}
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="p-5">
          {/* Title + price */}

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2
                id="food-detail-title"
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-gray-950
                "
              >
                {food.name}
              </h2>

              {/* Rating + category */}

              <div className="mt-2 flex items-center gap-1.5 text-sm">
                <Star
                  size={15}
                  fill="currentColor"
                  className="text-yellow-500"
                  aria-hidden="true"
                />

                <span className="font-semibold text-gray-800">
                  4.8
                </span>

                <span
                  className="text-gray-300"
                  aria-hidden="true"
                >
                  •
                </span>

                <span className="text-gray-500">
                  {food.category}
                </span>
              </div>
            </div>

            <p className="shrink-0 text-lg font-bold text-orange-600">
              Rs. {food.price}
            </p>
          </div>

          {/* Description */}

          {food.description && (
            <p className="mt-4 text-sm leading-6 text-gray-500">
              {food.description}
            </p>
          )}

          {/* Image hint */}

          {hasMultipleImages && (
            <p className="mt-3 text-center text-xs font-medium text-gray-400">
              Swipe or use the arrows to view more photos
            </p>
          )}

          {/* =================================================
              QUANTITY
          ================================================= */}

          <div
            className="
              mt-6
              flex
              items-center
              justify-between
              rounded-2xl
              bg-gray-50
              p-3
            "
          >
            <div>
              <p className="text-sm font-bold text-gray-950">
                Quantity
              </p>

              <p className="mt-0.5 text-xs text-gray-400">
                Choose how many you want
              </p>
            </div>

            <div
              className="
                flex
                items-center
                rounded-xl
                bg-white
                shadow-sm
                ring-1
                ring-gray-100
              "
              aria-label="Quantity selector"
            >
              {/* Decrease */}

              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  text-gray-600
                  transition
                  hover:text-gray-950
                  active:scale-90
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
                aria-label="Decrease quantity"
              >
                <Minus size={17} />
              </button>

              {/* Current quantity */}

              <span
                className="
                  w-8
                  text-center
                  text-sm
                  font-bold
                  text-gray-950
                "
                aria-live="polite"
                aria-label={`Quantity ${quantity}`}
              >
                {quantity}
              </span>

              {/* Increase */}

              <button
                type="button"
                onClick={increaseQuantity}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  text-gray-600
                  transition
                  hover:text-gray-950
                  active:scale-90
                "
                aria-label="Increase quantity"
              >
                <Plus size={17} />
              </button>
            </div>
          </div>

          {/* =================================================
              ADD TO ORDER
          ================================================= */}

          <button
            type="button"
            onClick={handleAddToOrder}
            className="
              mt-5
              flex
              h-14
              w-full
              items-center
              justify-between
              rounded-2xl
              bg-gray-950
              px-5
              text-white
              shadow-lg
              transition
              hover:bg-orange-500
              active:scale-[0.98]
              focus:outline-none
              focus:ring-4
              focus:ring-orange-100
            "
          >
            <span className="font-bold">
              Add to order
            </span>

            <span className="font-bold">
              Rs. {total}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}