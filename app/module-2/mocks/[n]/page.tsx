import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MOCKS } from "@/lib/data/mocks";
import MockExam from "@/components/practice/MockExam";

export function generateStaticParams() {
  return MOCKS.map((m) => ({ n: String(m.n) }));
}

export function generateMetadata({ params }: { params: { n: string } }): Metadata {
  return { title: `Mock Exam ${params.n}` };
}

export default function MockPage({ params }: { params: { n: string } }) {
  const mock = MOCKS.find((m) => String(m.n) === params.n);
  if (!mock) notFound();
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6">
      <nav className="flex items-center gap-1.5 text-sm text-white/60">
        <Link href="/module-2" className="hover:text-white">Module 2</Link>/
        <Link href="/module-2/mocks" className="hover:text-white">Mock exams</Link>/
        <span className="font-semibold text-white">{mock.title}</span>
      </nav>
      <header>
        <p className="eyebrow">Timed mock · {mock.marks} marks · {mock.minutes} minutes</p>
        <h1 className="h-display mt-1 text-4xl text-white sm:text-5xl">{mock.title}</h1>
      </header>
      <MockExam mock={mock} />
    </div>
  );
}
