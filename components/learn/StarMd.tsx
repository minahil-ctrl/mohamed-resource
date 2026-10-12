"use client";
import { isValidElement, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Marker from "@/components/ui/Marker";
import { hash } from "@/lib/marks";

/* eslint-disable @typescript-eslint/no-explicit-any */
const textOf = (n: any): string => {
  if (n == null || typeof n === "boolean") return "";
  if (typeof n === "string" || typeof n === "number") return String(n);
  if (Array.isArray(n)) return n.map(textOf).join("");
  if (isValidElement(n)) return textOf((n.props as any).children);
  return "";
};

/** Renders markdown where every paragraph, bullet, heading and table row can be starred or flagged for the tutor. */
export default function StarMd({ md, scope }: { md: string; scope: string }) {
  const components = useMemo(() => {
    const block = (Tag: any, extra = "") =>
      function Block({ children, node }: any) {
        const text = textOf(children).replace(/\s+/g, " ").trim();
        const id = `${scope}-${hash(text)}`;
        const wrapsParagraph = Tag === "li" && node?.children?.some((c: any) => c.tagName === "p");
        return (
          <Tag id={id} className={`mark-target ${extra}`}>
            {children}
            {text.length > 3 && !wrapsParagraph && <Marker id={id} label={text} className="ml-1.5 opacity-50 hover:opacity-100" />}
          </Tag>
        );
      };
    return {
      p: block("p"),
      li: block("li"),
      h2: block("h2"),
      h3: block("h3"),
      h4: block("h4"),
      blockquote: ({ children }: any) => <blockquote>{children}</blockquote>,
      table: ({ children }: any) => (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table>{children}</table>
        </div>
      ),
      tr: ({ children, node }: any) => {
        const isHead = node?.children?.[0]?.tagName === "th";
        const text = textOf(children).replace(/\s+/g, " ").trim();
        const id = `${scope}-${hash(text)}`;
        return (
          <tr id={id} className="mark-target">
            {children}
            {isHead ? <th className="w-[72px]" /> : <td className="w-[72px] whitespace-nowrap text-right">{text.length > 3 && <Marker id={id} label={text} />}</td>}
          </tr>
        );
      },
    } as any;
  }, [scope]);

  return (
    <div className="notes">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {md}
      </ReactMarkdown>
    </div>
  );
}
