"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/** SSR-safe localStorage state. Renders `initial` first, then hydrates from storage. */
export function useLocalStorage<T>(key: string, initial: T): [T, (v: T | ((prev: T) => T)) => void, boolean] {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  const valueRef = useRef<T>(initial);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        const parsed = JSON.parse(raw) as T;
        valueRef.current = parsed;
        setValue(parsed);
      }
    } catch {
      /* storage unavailable: fall back to in-memory state */
    }
    setReady(true);
  }, [key]);

  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      const next = typeof v === "function" ? (v as (p: T) => T)(valueRef.current) : v;
      valueRef.current = next;
      setValue(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* ignore quota / privacy-mode errors */
      }
    },
    [key],
  );

  return [value, set, ready];
}

export const LS = {
  quizBest: "qb.quizBest",
  bankMarks: "qb.bankMarks",
  drafts: "qb.drafts",
  sprint: "qb.sprint",
  roadmapOpen: "qb.roadmapOpen",
};

export type QuizBest = Record<string, { score: number; total: number }>;
export type BankMarks = Record<string, { got: number; max: number; ao?: { ao1: number; ao2: number; ao3: number; ao4: number } }>;
