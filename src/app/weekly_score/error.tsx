'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#9A9540] mb-4">
          Unable to Load Weekly Scores
        </h2>
        <p className="text-[#9A9540]/80 mb-4">
          {error.message || 'An error occurred while loading weekly scores.'}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-[#9A9540] text-[#1A3E2A] rounded-md hover:bg-[#9A9540]/90"
        >
          Try Again
        </button>
      </div>
    </div>
  );
} 