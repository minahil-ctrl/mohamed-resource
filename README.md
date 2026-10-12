# Edexcel IGCSE Business (4BS1): Sprint Portal

Next.js 14 (App Router) · React 18 · Tailwind CSS 3 · TypeScript. No backend: everything the student does (stars, answers, scores, study log) is stored in the browser.

## Run it

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## What is in it

* **45 topics**, each with a one-screen **cheat sheet** and **full notes** (`/module-1/<unit>/<topic>`).
* **Per-topic practice** (`/module-2/<unit>/<topic>`): MCQ quiz plus command-word questions.
* **3 mock exams** (`/module-2/mocks`), **mixed diagnostic**, **past-paper links** (`/module-2/past-papers`).
* **Star** (review later) and **question mark** (ask my tutor) on every part of the notes and every question. Collected at `/review`, with a "copy for my tutor" button.
* Light mode by default; dark mode or "match system" from the toggle in the top bar.
* Dashboard: countdown, study timer (Pomodoro/stopwatch) with log, 10-day plan covering all 45 topics.

## Content

The notes come from the chapter files in `content/` (the `igcse-business-studies` repo). Rebuild the generated data after editing them:

```bash
node scripts/build-content.mjs     # writes lib/data/generated/chapters.json
```

Hand-written extras (diagrams, advantage/disadvantage tables, red flags, AO2 examples, MCQs, model answers) live in `lib/data/` and are attached to chapters in `lib/data/extras.ts`.
MCQs with "Which term is defined as…" wording are generated automatically from each chapter's key-terms table (`lib/autoMcq.ts`).

Personal settings (student name, exam date) are in `lib/config.ts`.

## Notes

* The AO split for self-marking is an indicative checklist, not an official Edexcel allocation.
* Practice questions that come from the chapter files have no stored model answer; they show how to approach the command word instead.
* Independent revision resource, not affiliated with Pearson Edexcel. Check the current specification and past papers.
