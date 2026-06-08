import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Sun, Calendar, CalendarDays, Loader2 } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { aiRoutineGenerator } from "@/lib/ai-mock";

export const Route = createFileRoute("/routine")({
  head: () => ({ meta: [{ title: "AI Routine Generator — GlowAI" }] }),
  component: Routine,
});

function Routine() {
  const [skin, setSkin] = useState("Combination");
  const [goal, setGoal] = useState("Glow & hydration");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ daily: string[]; weekly: string[]; monthly: string[] } | null>(null);

  async function gen() {
    setLoading(true);
    const r = await aiRoutineGenerator({ skinType: skin, goals: goal });
    setResult(r);
    setLoading(false);
  }

  return (
    <Shell>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-12 pb-16">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full glass text-primary font-medium">
            <Sparkles className="h-3 w-3" /> AI Beauty Routine Generator
          </span>
          <h1 className="font-display text-4xl sm:text-5xl mt-3">Your custom routine</h1>
          <p className="text-muted-foreground mt-2">Daily, weekly, monthly — built around your skin and goals.</p>
        </div>

        <div className="glass-strong rounded-3xl p-6 mb-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Skin type</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Oily","Dry","Combination","Sensitive"].map(o => (
                  <button key={o} onClick={() => setSkin(o)} className={`px-3 py-1.5 rounded-full text-sm transition ${skin===o ? "gradient-rose-bg text-white" : "glass hover:bg-primary/10"}`}>{o}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Primary goal</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Glow & hydration","Anti-aging","Acne control","Bridal prep"].map(o => (
                  <button key={o} onClick={() => setGoal(o)} className={`px-3 py-1.5 rounded-full text-sm transition ${goal===o ? "bg-lavender text-lavender-foreground" : "glass hover:bg-lavender/30"}`}>{o}</button>
                ))}
              </div>
            </div>
          </div>
          <Button onClick={gen} disabled={loading} className="mt-5 rounded-full gradient-rose-bg text-white border-0 shadow-glow">
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Generating…</> : <><Sparkles className="h-4 w-4 mr-2" />Generate my routine</>}
          </Button>
        </div>

        {result && (
          <div className="grid md:grid-cols-3 gap-4 animate-fade-up">
            <RoutineCard icon={Sun} title="Daily" items={result.daily} />
            <RoutineCard icon={Calendar} title="Weekly" items={result.weekly} />
            <RoutineCard icon={CalendarDays} title="Monthly" items={result.monthly} />
          </div>
        )}
      </div>
    </Shell>
  );
}

function RoutineCard({ icon: Icon, title, items }: { icon: any; title: string; items: string[] }) {
  return (
    <div className="glass rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-9 w-9 rounded-xl gradient-rose-bg flex items-center justify-center"><Icon className="h-4 w-4 text-white" /></div>
        <h3 className="font-display text-xl">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((s, i) => (
          <li key={i} className="text-sm flex gap-2 items-start">
            <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
