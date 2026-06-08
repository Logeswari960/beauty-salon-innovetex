import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { styleInspiration } from "@/lib/ai-mock";

const categories = Object.keys(styleInspiration) as Array<keyof typeof styleInspiration>;

export const Route = createFileRoute("/inspiration")({
  head: () => ({ meta: [{ title: "Style Inspiration — GlowAI" }] }),
  component: Inspiration,
});

function Inspiration() {
  const [cat, setCat] = useState<keyof typeof styleInspiration>("Hairstyles");

  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-16">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full glass text-primary font-medium">
            <Sparkles className="h-3 w-3" /> AI Style Inspiration
          </span>
          <h1 className="font-display text-4xl sm:text-5xl mt-3">Find your next look</h1>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Curated by our AI from trending Chennai beauty looks.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                cat === c ? "gradient-rose-bg text-white shadow-glow" : "glass hover:bg-primary/10"
              }`}>{c}</button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {styleInspiration[cat].map((item, i) => (
            <div key={i} className="glass rounded-3xl overflow-hidden group hover:shadow-glow hover:-translate-y-1 transition animate-fade-up" style={{ animationDelay: `${i*80}ms` }}>
              <div className="relative h-72 overflow-hidden">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                  <Button size="sm" className="rounded-full gradient-rose-bg text-white border-0">Save look</Button>
                </div>
              </div>
              <div className="p-4">
                <div className="font-display text-lg">{item.name}</div>
                <div className="text-xs text-muted-foreground mt-1">Trending in Chennai</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}
