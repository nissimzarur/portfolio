import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-dvh flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="font-display text-6xl font-bold text-amber">404</h1>
        <p className="text-xl text-secondary">Page not found</p>
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-3 bg-amber text-deep font-semibold rounded-lg hover:bg-amber-hover transition-colors"
        >
          Back to Portfolio
        </Link>
      </div>
    </main>
  );
}
