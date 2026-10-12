"use client";
import { useEffect, useState } from "react";
import { Shuffle } from "lucide-react";
import { MCQS } from "@/lib/data";
import type { MCQ, UnitId } from "@/lib/types";
import Quiz from "./Quiz";

function pick(): MCQ[] {
  const units: UnitId[] = ["u1", "u2", "u3", "u4", "u5"];
  const out: MCQ[] = [];
  for (const u of units) {
    const pool = [...MCQS[u]];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    out.push(...pool.slice(0, 4));
  }
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function MixedQuiz() {
  const [qs, setQs] = useState<MCQ[] | null>(null);
  const [round, setRound] = useState(0);
  useEffect(() => setQs(pick()), [round]);

  if (!qs) return <div className="card h-40 animate-pulse" />;
  return (
    <div className="space-y-4">
      <button onClick={() => setRound((r) => r + 1)} className="btn">
        <Shuffle className="h-4 w-4" /> Draw a fresh set of 20
      </button>
      <Quiz questions={qs} storeKey="mixed" />
    </div>
  );
}
