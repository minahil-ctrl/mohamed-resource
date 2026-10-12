// Parses the chapter markdown in /content into lib/data/generated/chapters.json
// Run: node scripts/build-content.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("content");
const OUT = path.resolve("lib/data/generated/chapters.json");

const UNIT_BY_FOLDER = {
  "01-business-activity-and-influences-on-business": "u1",
  "02-people-in-business": "u2",
  "04-marketing": "u3",
  "05-business-operations": "u4",
  "03-business-finance": "u5",
};
const UNIT_ORDER = ["u1", "u2", "u3", "u4", "u5"];

const clean = (s) => s.replace(/\r/g, "").trim();
const unmd = (s) => s.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1").replace(/`/g, "").trim();

function sections(md) {
  const parts = md.split(/\n(?=## )/);
  const head = parts.shift();
  const map = {};
  for (const p of parts) {
    const nl = p.indexOf("\n");
    const title = p.slice(3, nl).trim();
    map[title] = clean(p.slice(nl + 1));
  }
  return { head, map };
}
const pick = (map, startsWith) => {
  const k = Object.keys(map).find((x) => x.startsWith(startsWith));
  return k ? map[k] : "";
};

const chapters = [];
for (const folder of fs.readdirSync(ROOT).sort()) {
  const unit = UNIT_BY_FOLDER[folder];
  if (!unit) continue;
  for (const file of fs.readdirSync(path.join(ROOT, folder)).sort()) {
    if (!file.endsWith(".md")) continue;
    const md = fs.readFileSync(path.join(ROOT, folder, file), "utf8").replace(/\r/g, "");
    const num = parseInt(file.slice(0, 2), 10);
    const slug = file.replace(/^\d+-/, "").replace(/\.md$/, "");
    const { head, map } = sections(md);
    const title = (head.match(/^# Chapter \d+:\s*(.+)$/m) || [])[1]?.trim() ?? slug;
    const field = (name) => (head.match(new RegExp(`\\*\\*${name}:\\*\\*\\s*(.+)`)) || [])[1]?.trim() ?? "";

    const objectives = pick(map, "Learning Objectives")
      .split("\n")
      .filter((l) => l.startsWith("- "))
      .map((l) => unmd(l.slice(2)));

    const terms = pick(map, "Key Terms")
      .split("\n")
      .filter((l) => l.startsWith("|"))
      .map((l) => l.split("|").slice(1, -1).map((c) => unmd(c)))
      .filter((c) => c.length >= 2 && c[0] && !/^-+$/.test(c[0].replace(/\s/g, "")) && c[0].toLowerCase() !== "term")
      .map((c) => ({ term: c[0], def: c[1], example: c[2] ?? "" }));

    const core = pick(map, "Core Content");
    const lines = core.split("\n");
    const formulas = [];
    const flags = [];
    const tips = [];
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      if (l.startsWith("**Formula:**")) {
        let t = unmd(l.replace("**Formula:**", ""));
        let j = i + 1;
        while (!t && j < lines.length && j < i + 4) {
          if (lines[j].trim()) t = unmd(lines[j].replace(/^[-*]\s*/, ""));
          j++;
        }
        if (t) formulas.push(t);
      } else if (l.startsWith("**Common misconception:**")) flags.push(unmd(l.replace("**Common misconception:**", "")));
      else if (l.startsWith("**Exam tip:**")) tips.push(unmd(l.replace("**Exam tip:**", "")));
    }

    const caseMd = pick(map, "Case Studies");
    const cases = [...caseMd.matchAll(/\*\*Company\/context:\*\*\s*(.+)/g)].map((m) => unmd(m[1]));

    const questions = pick(map, "Command-Word Practice Questions")
      .split("\n")
      .map((l) => l.match(/^\d+\.\s+(.*?)\s*\((\d+)\)\s*$/))
      .filter(Boolean)
      .map((m) => ({ text: unmd(m[1]), marks: parseInt(m[2], 10), command: unmd(m[1]).split(/\s+/)[0].replace(/[^A-Za-z]/g, "") }));

    chapters.push({
      id: `c${num}`,
      num,
      unit,
      slug,
      title,
      spec: field("Specification reference"),
      appliesTo: field("Applies to"),
      objectives,
      terms,
      why: pick(map, "Why This Matters"),
      core,
      largeSmall: pick(map, "Large vs Small"),
      caseStudiesMd: caseMd,
      cases,
      diagramsMd: pick(map, "Diagrams Required"),
      formulas,
      flags,
      tips,
      questions,
    });
  }
}

// unit-based codes 1.1, 1.2 ...
const counters = {};
chapters.sort((a, b) => UNIT_ORDER.indexOf(a.unit) - UNIT_ORDER.indexOf(b.unit) || a.num - b.num);
for (const c of chapters) {
  counters[c.unit] = (counters[c.unit] ?? 0) + 1;
  c.code = `${c.unit.slice(1)}.${counters[c.unit]}`;
}

fs.writeFileSync(OUT, JSON.stringify(chapters));
const q = chapters.reduce((s, c) => s + c.questions.length, 0);
const t = chapters.reduce((s, c) => s + c.terms.length, 0);
console.log(`chapters ${chapters.length}, terms ${t}, practice questions ${q}, formulas ${chapters.reduce((s, c) => s + c.formulas.length, 0)}`);
console.log(chapters.filter((c) => c.terms.length < 4).map((c) => `${c.num}:${c.terms.length}`).join(" ") || "all have >=4 terms");
