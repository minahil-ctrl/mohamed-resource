import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="h-display mt-2 text-5xl font-semibold text-white">Page not found</h1>
      <p className="mt-3 text-slate-400">That unit or page does not exist. Head back to the dashboard.</p>
      <Link href="/" className="btn-accent mt-8">Back to dashboard</Link>
    </div>
  );
}
