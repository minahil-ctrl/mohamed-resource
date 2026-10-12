import { Factory, Landmark, Lightbulb, Megaphone, Users } from "lucide-react";
import type { Unit } from "@/lib/types";

export default function UnitIcon({ icon, className }: { icon: Unit["icon"]; className?: string }) {
  const C = { lightbulb: Lightbulb, users: Users, megaphone: Megaphone, factory: Factory, landmark: Landmark }[icon];
  return <C className={className} />;
}
