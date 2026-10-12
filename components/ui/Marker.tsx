"use client";
import { MessageCircleQuestion, Star } from "lucide-react";
import { useMarks } from "@/lib/marks";

/**
 * Two small buttons: star (review later) and question-mark (a question for my tutor).
 * `id` must be stable; `href` is where the Review page should send the student back to.
 */
export default function Marker({
  id,
  label,
  href,
  className = "",
}: {
  id: string;
  label: string;
  href?: string;
  className?: string;
}) {
  const m = useMarks();
  const starred = m.has("star", id);
  const asked = m.has("ask", id);
  const target = () => href ?? `${window.location.pathname}${window.location.search}#${id}`;

  return (
    <span className={`no-print inline-flex shrink-0 items-center gap-0.5 align-middle ${className}`}>
      <button
        type="button"
        aria-pressed={starred}
        title={starred ? "Starred: click to remove" : "Star this to review later"}
        aria-label={starred ? "Remove star" : "Star this to review later"}
        onClick={(e) => {
          e.stopPropagation();
          m.toggle("star", id, label, target());
        }}
        className={`rounded-md p-1 transition hover:bg-white/10 ${starred ? "text-amber-500" : "text-white/35 hover:text-amber-500"}`}
      >
        <Star className="h-4 w-4" fill={starred ? "currentColor" : "none"} />
      </button>
      <button
        type="button"
        aria-pressed={asked}
        title={asked ? "Question saved for your tutor: click to remove" : "I have a question about this (save for my tutor)"}
        aria-label={asked ? "Remove question for tutor" : "Save a question for my tutor"}
        onClick={(e) => {
          e.stopPropagation();
          m.toggle("ask", id, label, target());
        }}
        className={`rounded-md p-1 transition hover:bg-white/10 ${asked ? "text-[#1E488F] dark:text-[#8FB2EE]" : "text-white/35 hover:text-[#1E488F] dark:hover:text-[#8FB2EE]"}`}
      >
        <MessageCircleQuestion className="h-4 w-4" fill={asked ? "currentColor" : "none"} fillOpacity={asked ? 0.2 : 0} />
      </button>
    </span>
  );
}
