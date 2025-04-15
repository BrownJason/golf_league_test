'use client';

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#9A9540] mb-4">
          Something went wrong!
        </h2>
        <p className="text-[#9A9540]/80 mb-4">
          Unable to load weekly performance data
        </p>
        <button
          onClick={reset}
          className="bg-[#9A9540] text-[#1A3E2A] px-4 py-2 rounded-md hover:bg-[#9A9540]/90"
        >
          Try again
        </button>
      </div>
    </div>
  );
} 