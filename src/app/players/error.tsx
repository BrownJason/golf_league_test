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
        <h2 className="text-2xl font-bold text-text mb-4">
          Unable to Load Players
        </h2>
        <p className="text-text/80 mb-4">
          {error.message || 'An error occurred while loading players.'}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-card text-error rounded-md hover:bg-card/90"
        >
          Try Again
        </button>
      </div>
    </div>
  );
} 