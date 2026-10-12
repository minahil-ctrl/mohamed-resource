"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, Copy, MessageCircleQuestion, Star, Trash2 } from "lucide-react";
import { useMarks, type MarkItem } from "@/lib/marks";

function Item({ it, withNote }: { it: MarkItem; withNote: boolean }) {
  const m = useMarks();
  return (
    <li className="card p-4">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <Link href={it.href} className="text-[15px] font-semibold leading-snug text-white hover:text-accent-ink">{it.label}</Link>
          <p className="mt-1 text-xs text-white/40">{new Date(it.ts).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</p>
        </div>
        <button onClick={() => m.remove(it.key)} aria-label="Remove" className="rounded-lg p-2 text-white/40 hover:bg-white/10 hover:text-[#E11D48]">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      {withNote && (
        <textarea
          value={it.note ?? ""}
          onChange={(e) => m.setNote(it.key, e.target.value)}
          rows={2}
          placeholder="What exactly is your question? (saved on this device)"
          className="mt-3 w-full resize-y rounded-xl border border-white/15 bg-white/[0.04] p-3 text-sm text-white placeholder:text-white/35 focus:border-accent focus:outline-none"
        />
      )}
    </li>
  );
}

export default function ReviewClient() {
  const m = useMarks();
  const [tab, setTab] = useState<"star" | "ask">("star");
  const [copied, setCopied] = useState(false);
  const stars = m.items.filter((i) => i.kind === "star");
  const asks = m.items.filter((i) => i.kind === "ask");
  const list = tab === "star" ? stars : asks;

  const copy = async () => {
    const origin = window.location.origin;
    const text =
      `Questions for my tutor (${asks.length})\n\n` +
      asks.map((a, i) => `${i + 1}. ${a.label}\n   ${a.note ? "My question: " + a.note + "\n   " : ""}${origin}${a.href}`).join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copy this:", text);
    }
  };

  return (
    <div className="space-y-6">
      <div role="tablist" className="inline-flex rounded-2xl border border-white/15 bg-white/[0.04] p-1">
        {(
          [
            { id: "star", label: "Starred", icon: Star, n: stars.length },
            { id: "ask", label: "Questions for my tutor", icon: MessageCircleQuestion, n: asks.length },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${tab === t.id ? "bg-accent text-shell" : "text-white/70 hover:text-white"}`}
          >
            <t.icon className="h-4 w-4" /> {t.label} <span className="num rounded-full bg-black/10 px-2 text-xs">{t.n}</span>
          </button>
        ))}
      </div>

      {tab === "ask" && asks.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={copy} className="btn-accent">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy my questions to send to my tutor"}
          </button>
          <p className="text-sm text-white/55">Paste into WhatsApp or email. Links open the exact paragraph or question.</p>
        </div>
      )}

      {list.length === 0 ? (
        <div className="card p-8 text-center text-white/65">
          {tab === "star" ? (
            <>
              <Star className="mx-auto mb-2 h-8 w-8 text-amber-500" />
              <p className="font-semibold text-white">Nothing starred yet.</p>
              <p className="mt-1 text-sm">Tap the star next to any definition, paragraph, bullet or question and it appears here to review.</p>
            </>
          ) : (
            <>
              <MessageCircleQuestion className="mx-auto mb-2 h-8 w-8 text-[#1E488F] dark:text-[#8FB2EE]" />
              <p className="font-semibold text-white">No questions saved.</p>
              <p className="mt-1 text-sm">Tap the question-mark icon next to anything you do not understand. Add your wording here, then send the list to your tutor.</p>
            </>
          )}
        </div>
      ) : (
        <>
          <ul className="space-y-3">{list.map((it) => <Item key={it.key} it={it} withNote={tab === "ask"} />)}</ul>
          <button onClick={() => confirm(`Remove all ${tab === "star" ? "starred items" : "questions"}?`) && m.clear(tab)} className="text-xs text-white/40 hover:text-white/80">
            Clear all
          </button>
        </>
      )}
    </div>
  );
}
