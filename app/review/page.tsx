import type { Metadata } from "next";
import ReviewClient from "@/components/review/ReviewClient";

export const metadata: Metadata = { title: "Review: starred & questions" };

export default function ReviewPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 sm:px-6">
      <header>
        <p className="eyebrow">Review</p>
        <h1 className="h-display mt-1 text-4xl text-white sm:text-5xl">Starred &amp; questions</h1>
        <p className="mt-3 text-white/70">Everything you starred for revision, and everything you want to ask your tutor. Saved on this device.</p>
      </header>
      <ReviewClient />
    </div>
  );
}
