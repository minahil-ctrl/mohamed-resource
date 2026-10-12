# Edexcel IGCSE Business (4BS1): 10-Day Sprint Portal

Next.js 14 (App Router) · React 18 · Tailwind CSS 3 · Lucide icons · TypeScript.
No backend, no database. Progress is stored in the browser (`localStorage`).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Deploy anywhere that runs Next.js (Vercel, Netlify, any Node host), or `next export`-style static hosting works as well since every page is static.

## Personalise in one file

`lib/config.ts`

| Setting | What it controls |
| --- | --- |
| `STUDENT_NAME` | Greeting on the dashboard and footer |
| `EXAM_DATE` | Countdown target (currently 29 Oct 2026, 09:00) |
| `PLAN_START` / `SPRINT_START` | Progress bar and "Sprint Day N" label |

If the exam start time differs, change the hour in `EXAM_DATE`.

## Structure

```
app/
  page.tsx                 Dashboard: countdown, 10-day roadmap, unit grid, progress
  module-1/[unit]          Cheat sheets (topics, formulas, red flags, graphs, application bank)
  module-2/[unit]          Part A quiz (20 MCQs) + Part B exam marker bank (2/3/6/9/12 marks)
  module-2/mixed           Random 20-question diagnostic
  applications/            Real-world application bank (filterable)
  traps/                   Examiner's red flag trap log
  booklet/                 Print-ready booklet (use browser Print > Save as PDF)
components/
  graphs/                  BreakEven, ProductLifeCycle, Boston, OrgChart, SupplyDemand,
                           Maslow, FinanceLabs (ratios, investment appraisal, cash flow)
  practice/                Quiz, ExamBank (self-marking AO grid), MarkerToolkit
  dashboard/               Countdown, SprintRoadmap, UnitGrid, ProgressStats
  shell/                   AppShell (animated unit colour system), Navbar, global SearchBox
lib/data/                  All content: topics-u1..u5, mcq-u1..u5, exam-a/b, marking, sprint
```

## Editing content

* **Topics / terms / formulas / red flags / applications:** `lib/data/topics-u*.ts`
* **MCQs:** `lib/data/mcq-u*.ts`. Each row is `[topic, question, [4 options], correctIndex, [4 explanations]]`. Option order is rotated automatically so the answer key is not predictable.
* **Exam questions and model answers:** `lib/data/exam-a.ts`, `exam-b.ts`. Tag model answers with `[AO1]`..`[AO4]`; they render as coloured chips.
* **Sprint plan:** `lib/data/sprint.ts`

## Notes

* The AO split (e.g. 9 marks = AO1×2, AO2×2, AO3×2, AO4×3) is an indicative self-marking checklist, not an official Edexcel allocation.
* Content is an independent revision resource written for the 4BS1 specification. Verify definitions, formulae and the unit structure against the current Pearson specification and past papers.
* Unit colours: Indigo `#4F46E5`, Rose `#E11D48`, Emerald `#059669`, Cyan `#0891B2`, Amber `#D97706`, on a `#0F172A` shell.
