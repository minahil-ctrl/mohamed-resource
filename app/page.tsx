import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import Countdown from "@/components/dashboard/Countdown";
import StudyHub from "@/components/dashboard/StudyHub";
import SprintPlan from "@/components/dashboard/SprintPlan";

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6">
      <Countdown />
      <StudyHub />
      <SprintPlan />
      <section className="card flex flex-wrap items-center justify-between gap-4 p-6">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-lime text-shell">
            <Target className="h-6 w-6" />
          </span>
          <div>
            <p className="font-bold text-white">Not sure where you stand?</p>
            <p className="text-sm text-white/60">Take the mixed 20-question diagnostic: four questions from each unit.</p>
          </div>
        </div>
        <Link href="/module-2/mixed" className="btn-accent">
          Start diagnostic <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
