import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, MapPin, Shield, Clock, Sparkles, Calendar, ChevronRight, Heart, Share2 } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { salons } from "@/data/salons";
import type { Salon } from "@/types";

export const Route = createFileRoute("/salons/$id")({
  head: ({ params }) => {
    const s = salons.find(x => x.id === params.id);
    return { meta: [{ title: s ? `${s.name} — GlowAI Chennai` : "Salon" }, { name: "description", content: s?.tagline ?? "" }, { property: "og:image", content: s?.image ?? "" }] };
  },
  loader: ({ params }): Salon => {
    const salon = salons.find(s => s.id === params.id);
    if (!salon) throw notFound();
    return salon;
  },
  component: SalonDetail,
  notFoundComponent: () => <Shell><div className="text-center py-32"><h1>Salon not found</h1><Link to="/salons" className="gradient-text">Browse all</Link></div></Shell>,
});

function SalonDetail() {
  const salon = Route.useLoaderData() as Salon;
  const [activeImg, setActiveImg] = useState(0);

  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-16">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
          <Link to="/salons" className="hover:text-foreground">Salons</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{salon.name}</span>
        </div>

        {/* Gallery */}
        <div className="grid md:grid-cols-[2fr_1fr] gap-3 mb-8">
          <div className="relative h-[400px] rounded-3xl overflow-hidden glass">
            <img src={salon.gallery[activeImg]} alt={salon.name} className="h-full w-full object-cover" />
            <div className="absolute top-3 right-3 flex gap-2">
              <button className="h-10 w-10 rounded-full glass-strong flex items-center justify-center"><Heart className="h-4 w-4" /></button>
              <button className="h-10 w-10 rounded-full glass-strong flex items-center justify-center"><Share2 className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-2 gap-3">
            {salon.gallery.slice(0,4).map((g,i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`relative h-24 md:h-[193px] rounded-2xl overflow-hidden ring-2 transition ${activeImg===i ? "ring-primary" : "ring-transparent"}`}>
                <img src={g} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div>
            <div className="glass rounded-3xl p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {salon.tags.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
              </div>
              <h1 className="font-display text-4xl">{salon.name}</h1>
              <p className="text-muted-foreground mt-1">{salon.tagline}</p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-gold text-gold" /><strong>{salon.rating}</strong> ({salon.reviewCount} reviews)</span>
                <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" />{salon.address}</span>
                <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-4 w-4" />{salon.openHours}</span>
              </div>
            </div>

            {/* Trust Score */}
            <div className="glass rounded-3xl p-6 mt-4">
              <div className="flex items-center gap-2 text-sm font-medium text-primary mb-3">
                <Shield className="h-4 w-4" /> AI Salon Trust Score
              </div>
              <div className="flex items-end gap-4">
                <div className="text-6xl font-display gradient-text">{salon.trustScore}</div>
                <div className="text-xs text-muted-foreground pb-2">
                  Calculated from ratings, review sentiment, consistency, and service quality across {salon.reviewCount} reviews.
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full mt-3 overflow-hidden">
                <div className="h-full gradient-rose-bg rounded-full transition-all" style={{ width: `${salon.trustScore}%` }} />
              </div>
            </div>

            {/* AI review summary */}
            <div className="glass rounded-3xl p-6 mt-4">
              <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                <Sparkles className="h-4 w-4" /> AI Review Summary
              </div>
              <p className="text-foreground/90 leading-relaxed">{salon.aiSummary}</p>
            </div>

            {/* Services */}
            <div className="glass rounded-3xl p-6 mt-4">
              <h2 className="font-display text-2xl mb-4">Services & Pricing</h2>
              <div className="divide-y divide-border/40">
                {salon.services.map(s => (
                  <div key={s.id} className="py-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold">{s.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{s.category} • {s.duration} min</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-semibold">₹{s.price.toLocaleString("en-IN")}</div>
                      </div>
                      <Link to="/book/$salonId" params={{ salonId: salon.id }} search={{ service: s.id } as any}>
                        <Button size="sm" variant="outline" className="rounded-full">Book</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="glass rounded-3xl p-6 mt-4">
              <h2 className="font-display text-2xl mb-4">Reviews</h2>
              <div className="space-y-4">
                {salon.reviews.map(r => (
                  <div key={r.id} className="border-b border-border/40 pb-4 last:border-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-full gradient-rose-bg text-white flex items-center justify-center text-sm font-semibold">
                          {r.author.split(" ").map(n=>n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{r.author}</div>
                          <div className="text-xs text-muted-foreground">{r.date}</div>
                        </div>
                      </div>
                      <div className="flex">{Array.from({length:r.rating}).map((_,i)=><Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />)}</div>
                    </div>
                    <p className="mt-2 text-sm">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking widget */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="glass-strong rounded-3xl p-6 shadow-glow">
              <div className="text-sm text-muted-foreground">Starting from</div>
              <div className="text-3xl font-display gradient-text">₹{Math.min(...salon.services.map(s=>s.price)).toLocaleString("en-IN")}</div>
              <Link to="/book/$salonId" params={{ salonId: salon.id }}>
                <Button className="w-full mt-4 rounded-full gradient-rose-bg text-white border-0 shadow-glow">
                  <Calendar className="h-4 w-4 mr-2" /> Book Appointment
                </Button>
              </Link>

              <div className="mt-5 text-sm font-semibold">Next available slots</div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {["10:30", "11:45", "1:15", "2:30", "4:00", "5:30"].map(t => (
                  <Link key={t} to="/book/$salonId" params={{ salonId: salon.id }} search={{ time: t } as any}
                    className="text-xs py-2 rounded-xl glass hover:bg-primary/10 text-center transition">
                    {t} PM
                  </Link>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="glass rounded-xl p-2"><div className="font-semibold text-primary">{salon.trustScore}</div><div className="text-muted-foreground">Trust</div></div>
                <div className="glass rounded-xl p-2"><div className="font-semibold text-primary">{salon.rating}</div><div className="text-muted-foreground">Rating</div></div>
                <div className="glass rounded-xl p-2"><div className="font-semibold text-primary">{"₹".repeat(salon.priceLevel)}</div><div className="text-muted-foreground">Price</div></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Shell>
  );
}
