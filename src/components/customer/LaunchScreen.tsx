import { useEffect, useRef } from "react";

const DEFAULT_DURATION = 1200;

type LaunchScreenProps = {
  restaurantName: string;
  onComplete: () => void;
  duration?: number;
};

export default function LaunchScreen({
  restaurantName,
  onComplete,
  duration = DEFAULT_DURATION,
}: LaunchScreenProps) {
  const completionRef = useRef(onComplete);

  // Keep the latest callback without restarting the launch timer.
  useEffect(() => {
    completionRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      completionRef.current();
    }, duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [duration]);

  const normalizedName = restaurantName.trim();
  const restaurantInitial = normalizedName.charAt(0).toUpperCase();

  return (
    <main
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-white"
      role="status"
      aria-live="polite"
      aria-label={`Loading ${normalizedName}`}
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-50 blur-3xl" />
      </div>

      {/* Launch content */}
      <section className="relative flex flex-col items-center px-6 text-center">
        {/* Restaurant logo / initial */}
        <div
          aria-hidden="true"
          className="
            flex h-20 w-20 items-center justify-center
            rounded-[1.5rem]
            bg-black
            text-white
            shadow-lg shadow-black/10
            animate-[launchScale_700ms_cubic-bezier(0.16,1,0.3,1)]
          "
        >
          <span className="select-none text-3xl font-bold tracking-tight">
            {restaurantInitial || "R"}
          </span>
        </div>

        {/* Restaurant identity */}
        <div className="mt-6">
          <h1
            className="
              max-w-[280px]
              truncate
              text-2xl
              font-bold
              tracking-tight
              text-gray-950
              animate-[launchFade_700ms_ease-out]
            "
          >
            {normalizedName || "Restaurant"}
          </h1>

          <p
            className="
              mt-2
              text-sm
              font-medium
              text-gray-500
              animate-[launchFade_900ms_ease-out]
            "
          >
            Preparing your menu...
          </p>
        </div>

        {/* Progress indicator */}
        <div
          className="mt-7 h-1 w-16 overflow-hidden rounded-full bg-gray-100"
          aria-hidden="true"
        >
          <div
            className="
              h-full
              w-full
              origin-left
              rounded-full
              bg-black
              animate-[launchProgress_1100ms_cubic-bezier(0.16,1,0.3,1)]
            "
          />
        </div>
      </section>

      {/* Animations */}
      <style>{`
        @keyframes launchScale {
          0% {
            opacity: 0;
            transform: scale(0.75);
          }

          65% {
            opacity: 1;
            transform: scale(1.05);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes launchFade {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes launchProgress {
          0% {
            transform: scaleX(0);
          }

          100% {
            transform: scaleX(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}