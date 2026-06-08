import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Grid3x3, List, Sparkles, SlidersHorizontal, Loader2 } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { SalonCard } from "@/components/salon/SalonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { salons, allAreas, allConcerns } from "@/data/salons";
import { aiMatchmaker } from "@/lib/ai-mock";
import type { Salon } from "@/types";

export const Route = createFileRoute("/salons")({
  head: () => ({ meta: [{ title: "Salons — GlowAI Chennai" }, { name: "description", content: "Browse 500+ Chennai salons with AI-powered filters." }] }),
  component: Marketplace,
});

function Marketplace() {
  const [view, setView] = useState<"grid"|"list">("grid");
  const [search, setSearch] = useState("");
  const [areas, setAreas] = useState<string[]>([]);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState<number>(4);
  const [sort, setSort] = useState<"rating"|"trust"|"price">("rating");
  const [aiQuery, setAiQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{ reasoning: string; matches: Salon[] } | null>(null);

  const filtered = useMemo(() => {
    let r = salons.filter(s => {
      if (search && !`${s.name} ${s.tagline} ${s.area} ${s.tags.join(" ")} ${s.services.map(x=>x.name).join(" ")}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (areas.length && !areas.includes(s.area)) return false;
      if (concerns.length && !concerns.some(c => s.concerns.includes(c))) return false;
      if (s.rating < minRating) return false;
      if (s.priceLevel > maxPrice) return false;
      return true;
    });
    r = [...r].sort((a,b) => sort === "rating" ? b.rating - a.rating : sort === "trust" ? b.trustScore - a.trustScore : a.priceLevel - b.priceLevel);
    return r;
  }, [search, areas, concerns, minRating, maxPrice, sort]);

  const toggle = (arr: string[], v: string, set: (x:string[])=>void) =>
    set(arr.includes(v) ? arr.filter(x=>x!==v) : [...arr, v]);

  async function runAI() {
    if (!aiQuery.trim()) return;
    setAiLoading(true);
    const res = await aiMatchmaker(aiQuery);
    setAiResult(res);
    setAiLoading(false);
  }

  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-16">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl sm:text-5xl">Chennai's beauty network</h1>
          <p className="text-muted-foreground mt-2">{salons.length}+ verified salons across {allAreas.length} areas</p>
        </div>

        {/* AI Matchmaker */}
        <div className="glass-strong rounded-3xl p-5 mb-8 shadow-soft bg-mesh">
          <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
            <Sparkles className="h-4 w-4" /> AI Salon Matchmaker
          </div>
          <form onSubmit={e => { e.preventDefault(); runAI(); }} className="flex gap-2">
            <Input value={aiQuery} onChange={e => setAiQuery(e.target.value)} placeholder="Describe what you want — e.g., bridal makeup under ₹5000 near T Nagar" className="rounded-full bg-background/60" />
            <Button type="submit" className="rounded-full gradient-rose-bg text-white border-0" disabled={aiLoading}>
              {aiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Match"}
            </Button>
          </form>
          {aiResult && (
            <div className="mt-4 animate-fade-up">
              <p className="text-sm text-muted-foreground italic">{aiResult.reasoning}</p>
              <div className="grid sm:grid-cols-3 gap-3 mt-3">
                {aiResult.matches.map(s => <SalonCard key={s.id} salon={s} />)}
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Filters */}
          <aside className="glass rounded-3xl p-5 h-fit lg:sticky lg:top-24">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="h-4 w-4" />
              <h3 className="font-semibold">Filters</h3>
            </div>

            <div className="mb-5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Search</label>
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Service, salon, area…" className="mt-2 rounded-xl" />
            </div>

            <div className="mb-5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Area</label>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {allAreas.map(a => (
                  <button key={a} onClick={() => toggle(areas, a, setAreas)}
                    className={`text-xs px-2.5 py-1 rounded-full transition ${areas.includes(a) ? "gradient-rose-bg text-white" : "glass hover:bg-primary/10"}`}>
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Beauty concern</label>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {allConcerns.slice(0,8).map(c => (
                  <button key={c} onClick={() => toggle(concerns, c, setConcerns)}
                    className={`text-xs px-2.5 py-1 rounded-full capitalize transition ${concerns.includes(c) ? "bg-lavender text-lavender-foreground" : "glass hover:bg-lavender/30"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Min rating: {minRating.toFixed(1)}★</label>
              <Slider value={[minRating]} onValueChange={v => setMinRating(v[0])} min={0} max={5} step={0.1} className="mt-3" />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Max price: {"₹".repeat(maxPrice)}</label>
              <Slider value={[maxPrice]} onValueChange={v => setMaxPrice(v[0] as 1|2|3|4)} min={1} max={4} step={1} className="mt-3" />
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted-foreground">{filtered.length} salons</div>
              <div className="flex items-center gap-2">
                <select value={sort} onChange={e => setSort(e.target.value as any)} className="text-sm rounded-full glass px-3 py-1.5 border-0 outline-none">
                  <option value="rating">Top rated</option>
                  <option value="trust">Trust score</option>
                  <option value="price">Price: low to high</option>
                </select>
                <div className="glass rounded-full p-1 flex">
                  <button onClick={() => setView("grid")} className={`p-1.5 rounded-full ${view==="grid" ? "bg-primary/15" : ""}`}><Grid3x3 className="h-4 w-4" /></button>
                  <button onClick={() => setView("list")} className={`p-1.5 rounded-full ${view==="list" ? "bg-primary/15" : ""}`}><List className="h-4 w-4" /></button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="glass rounded-3xl p-12 text-center">
                <p className="text-muted-foreground">No salons match these filters.</p>
                <Button variant="outline" onClick={() => { setAreas([]); setConcerns([]); setMinRating(0); setMaxPrice(4); setSearch(""); }} className="mt-3 rounded-full">Clear filters</Button>
              </div>
            ) : (
              <div className={view === "grid" ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-5" : "flex flex-col gap-3"}>
                {filtered.map(s => <SalonCard key={s.id} salon={s} view={view} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}
