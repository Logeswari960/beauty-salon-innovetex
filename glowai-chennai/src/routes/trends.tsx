import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Sparkles } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { beautyTrends } from "@/lib/ai-mock";

export const Route = createFileRoute("/trends")({
  head: () => ({ meta: [{ title: "Beauty Trends — GlowAI" }] }),
  component: Trends,
});

function Trends() {
  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-16">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full glass text-primary font-medium">
            <TrendingUp className="h-3 w-3" /> Beauty Trend Explorer
          </span>
          <h1 className="font-display text-4xl sm:text-5xl mt-3">What's trending now</h1>
          <p className="text-muted-foreground mt-2">AI-analyzed from millions of booking patterns and social signals.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {beautyTrends.map((t, i) => (
            <div key={t.title} className="glass-strong rounded-3xl p-6 hover:shadow-glow hover:-translate-y-1 transition animate-fade-up" style={{ animationDelay: `${i*60}ms` }}>
              <div className="flex items-start justify-between">
                <div className="text-5xl">{t.emoji}</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />{t.change}
                </div>
              </div>
              <h3 className="font-display text-2xl mt-4">{t.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{t.desc}</p>
              <button className="mt-4 text-sm gradient-text font-medium flex items-center gap-1">
                Explore salons offering this <Sparkles className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}
