import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles, MapPin, ArrowRight, Star, Zap, Heart, Shield, TrendingUp } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SalonCard } from "@/components/salon/SalonCard";
import { salons } from "@/data/salons";
import { trendingServices, testimonials, stats } from "@/data/bookings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GlowAI Chennai — AI Beauty Salon Marketplace" },
      { name: "description", content: "Chennai's first AI Beauty Companion. Discover, compare and book salons in seconds." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [query, setQuery] = useState("");
  const nav = useNavigate();
  const featured = salons.slice(0, 4);

  return (
    <Shell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-80" />
        <div className="absolute top-20 -left-20 h-72 w-72 rounded-full gradient-rose-bg opacity-20 blur-3xl animate-float-orb" />
        <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-lavender opacity-30 blur-3xl animate-float-orb" style={{ animationDelay: "3s" }} />

        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium mb-6 animate-fade-up">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Chennai's First AI Beauty Companion
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight max-w-4xl mx-auto animate-fade-up delay-100">
            Your <span className="gradient-text">AI-powered</span><br />beauty concierge
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up delay-200">
            Tell us what you need. We'll match you with the perfect Chennai salon — bridal, hair, skin, or self-care — in seconds.
          </p>

          {/* Smart search */}
          <form
            onSubmit={(e) => { e.preventDefault(); nav({ to: "/salons", search: { q: query } as any }); }}
            className="mt-8 max-w-2xl mx-auto animate-fade-up delay-300"
          >
            <div className="glass-strong rounded-full p-2 flex items-center gap-2 shadow-glow">
              <div className="hidden sm:flex items-center gap-2 pl-4 text-muted-foreground border-r pr-3">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Chennai</span>
              </div>
              <Search className="h-4 w-4 ml-3 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: bridal makeup under ₹5000 near T Nagar"
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-sm"
              />
              <Button type="submit" className="rounded-full gradient-rose-bg text-white border-0 px-5">
                <Sparkles className="h-4 w-4 mr-1" /> Match me
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              {["Bridal under ₹5000", "Hair spa for damage", "Student-friendly", "Glass skin facial"].map(s => (
                <button key={s} onClick={() => { setQuery(s); }} className="text-xs px-3 py-1 rounded-full glass hover:bg-primary/10">
                  {s}
                </button>
              ))}
            </div>
          </form>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <div key={s.label} className={`glass rounded-2xl p-4 animate-fade-up delay-${(i+4)*100}`}>
                <div className="text-2xl sm:text-3xl font-display gradient-text">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI FEATURES STRIP */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Sparkles, title: "AI Salon Matchmaker", desc: "Describe your need in plain English — get curated picks.", to: "/salons" },
            { icon: Zap, title: "AI Beauty Advisor", desc: "Chatbot for skincare, hair, bridal prep & routines.", to: "#" },
            { icon: Heart, title: "Smart Beauty Quiz", desc: "2-min quiz → personalized beauty score & routine.", to: "/quiz" },
          ].map((f) => (
            <Link key={f.title} to={f.to as any} className="glass rounded-3xl p-6 hover:shadow-glow hover:-translate-y-1 transition-all group">
              <div className="h-12 w-12 rounded-2xl gradient-rose-bg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
              <div className="mt-4 inline-flex items-center text-sm gradient-text font-medium">Try now <ArrowRight className="h-3.5 w-3.5 ml-1" /></div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-primary text-sm font-medium"><TrendingUp className="h-4 w-4" />This week in Chennai</div>
            <h2 className="font-display text-3xl sm:text-4xl mt-1">Trending services</h2>
          </div>
          <Link to="/trends" className="text-sm gradient-text font-medium hidden sm:inline-flex items-center">View all trends <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {trendingServices.map(t => (
            <div key={t.name} className="glass rounded-2xl p-4 hover:shadow-glow transition group cursor-pointer">
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition`}>{t.icon}</div>
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{t.growth} this month</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED SALONS */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-primary text-sm font-medium flex items-center gap-2"><Shield className="h-4 w-4" />Verified & trusted</div>
            <h2 className="font-display text-3xl sm:text-4xl mt-1">Featured salons</h2>
          </div>
          <Link to="/salons" className="text-sm gradient-text font-medium hidden sm:inline-flex items-center">Browse all <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map(s => <SalonCard key={s.id} salon={s} />)}
        </div>
      </section>

      {/* OCCASION-BASED */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="font-display text-3xl sm:text-4xl mb-6">Beauty for every occasion</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { name: "Wedding", emoji: "💍", color: "from-rose-400/30 to-amber-300/30" },
            { name: "Party", emoji: "🎉", color: "from-purple-400/30 to-pink-300/30" },
            { name: "Interview", emoji: "💼", color: "from-slate-400/30 to-blue-300/30" },
            { name: "Festival", emoji: "🪔", color: "from-amber-400/30 to-rose-300/30" },
            { name: "Self-care", emoji: "🧖‍♀️", color: "from-teal-300/30 to-emerald-300/30" },
          ].map(o => (
            <Link key={o.name} to="/salons" className={`glass rounded-3xl p-6 bg-gradient-to-br ${o.color} text-center hover:scale-105 transition`}>
              <div className="text-4xl mb-2">{o.emoji}</div>
              <div className="font-semibold">{o.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-display text-3xl sm:text-4xl text-center mb-2">Loved by Chennai</h2>
        <p className="text-center text-muted-foreground mb-10">Real stories from real clients.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="glass rounded-3xl p-5 hover:shadow-glow transition">
              <div className="flex gap-1 mb-3">{Array.from({length:5}).map((_,j) => <Star key={j} className="h-3.5 w-3.5 fill-gold text-gold" />)}</div>
              <p className="text-sm leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/40">
                <div className="h-10 w-10 rounded-full gradient-rose-bg flex items-center justify-center text-white text-sm font-semibold">{t.avatar}</div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-16 text-center bg-mesh">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full gradient-rose-bg opacity-30 blur-3xl" />
          <Sparkles className="h-10 w-10 mx-auto text-primary mb-4" />
          <h2 className="font-display text-3xl sm:text-5xl max-w-2xl mx-auto">Ready to glow?</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Take the 2-minute beauty quiz and get your personalized routine + salon matches.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/quiz"><Button className="gradient-rose-bg text-white border-0 rounded-full px-6 shadow-glow">Take the quiz</Button></Link>
            <Link to="/salons"><Button variant="outline" className="rounded-full px-6">Browse salons</Button></Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
