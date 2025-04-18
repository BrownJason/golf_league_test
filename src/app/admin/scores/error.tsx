'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF ]">
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#B5AA4C] mb-4">
          Something went wrong!
        </h2>
        <button
          onClick={reset}
          className="px-4 py-2 bg-[#B5AA4C] text-[#FFFFFF ] rounded-md hover:bg-[#D4CB6A] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
} 