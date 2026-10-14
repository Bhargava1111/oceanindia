"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aqua">Something went wrong</p>
        <h1 className="mt-3 font-heading text-3xl font-bold">This page didn’t load.</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">{error.message || "An unexpected error occurred."}</p>
        <button onClick={reset} className="mt-6 rounded-full bg-aqua px-5 py-2.5 text-sm font-semibold text-abyss">Try again</button>
      </div>
    </main>
  );
}
