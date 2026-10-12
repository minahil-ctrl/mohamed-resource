"use client";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type MarkKind = "star" | "ask";
export interface MarkItem {
  key: string;
  kind: MarkKind;
  id: string;
  label: string;
  href: string;
  ts: number;
  note?: string;
}

interface Ctx {
  items: MarkItem[];
  has: (kind: MarkKind, id: string) => boolean;
  toggle: (kind: MarkKind, id: string, label: string, href: string) => void;
  setNote: (key: string, note: string) => void;
  remove: (key: string) => void;
  clear: (kind: MarkKind) => void;
}

const MarksContext = createContext<Ctx | null>(null);

export function MarksProvider({ children }: { children: React.ReactNode }) {
  const [map, setMap] = useLocalStorage<Record<string, MarkItem>>("qb.marks", {});

  const toggle = useCallback<Ctx["toggle"]>(
    (kind, id, label, href) => {
      const key = `${kind}:${id}`;
      setMap((m) => {
        if (m[key]) {
          const { [key]: _gone, ...rest } = m;
          return rest;
        }
        return { ...m, [key]: { key, kind, id, label: label.slice(0, 240), href, ts: Date.now() } };
      });
    },
    [setMap],
  );
  const setNote = useCallback((key: string, note: string) => setMap((m) => (m[key] ? { ...m, [key]: { ...m[key], note } } : m)), [setMap]);
  const remove = useCallback(
    (key: string) =>
      setMap((m) => {
        const { [key]: _gone, ...rest } = m;
        return rest;
      }),
    [setMap],
  );
  const clear = useCallback((kind: MarkKind) => setMap((m) => Object.fromEntries(Object.entries(m).filter(([, v]) => v.kind !== kind))), [setMap]);

  const value = useMemo<Ctx>(
    () => ({
      items: Object.values(map).sort((a, b) => b.ts - a.ts),
      has: (kind, id) => !!map[`${kind}:${id}`],
      toggle,
      setNote,
      remove,
      clear,
    }),
    [map, toggle, setNote, remove, clear],
  );
  return <MarksContext.Provider value={value}>{children}</MarksContext.Provider>;
}

export function useMarks(): Ctx {
  const c = useContext(MarksContext);
  if (!c) throw new Error("useMarks must be used inside MarksProvider");
  return c;
}

/** Stable short hash used to build ids for paragraphs of long-form notes. */
export function hash(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}
