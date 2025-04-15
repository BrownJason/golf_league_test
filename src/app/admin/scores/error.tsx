'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A3E2A]">
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#9A9540] mb-4">
          Something went wrong!
        </h2>
        <button
          onClick={reset}
          className="px-4 py-2 bg-[#9A9540] text-[#1A3E2A] rounded-md hover:bg-[#7A7530]"
        >
          Try again
        </button>
      </div>
    </div>
  );
} 