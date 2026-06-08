import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Heart, Sparkles, TrendingUp, Award, Clock } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleBookings } from "@/data/bookings";
import { salons } from "@/data/salons";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "My Dashboard — GlowAI" }] }),
  component: Dashboard,
});

function Dashboard() {
  const upcoming = sampleBookings.filter(b => b.status === "upcoming");
  const past = sampleBookings.filter(b => b.status === "completed");
  const saved = salons.slice(1, 4);
  const beautyScore = 86;

  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl">Welcome back, Anjali ✨</h1>
            <p className="text-muted-foreground mt-1">Your personalized beauty hub</p>
          </div>
          <Link to="/salons"><Button className="rounded-full gradient-rose-bg text-white border-0">Book new</Button></Link>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard icon={Award} label="Beauty Score" value={beautyScore.toString()} highlight />
          <StatCard icon={Calendar} label="Upcoming" value={upcoming.length.toString()} />
          <StatCard icon={Heart} label="Saved Salons" value={saved.length.toString()} />
          <StatCard icon={TrendingUp} label="Loyalty Tier" value="Gold" />
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            {/* Upcoming bookings */}
            <section className="glass rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-2xl">Upcoming bookings</h2>
                <Badge variant="secondary">{upcoming.length}</Badge>
              </div>
              {upcoming.length === 0 ? <p className="text-muted-foreground text-sm">No upcoming bookings.</p> : (
                <div className="space-y-3">
                  {upcoming.map(b => (
                    <div key={b.id} className="glass rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{b.serviceName}</div>
                        <div className="text-xs text-muted-foreground">{b.salonName}</div>
                        <div className="text-xs text-primary mt-1 flex items-center gap-1"><Clock className="h-3 w-3" />{b.date} • {b.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₹{b.price.toLocaleString("en-IN")}</div>
                        <Button variant="outline" size="sm" className="mt-2 rounded-full text-xs">Reschedule</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* History */}
            <section className="glass rounded-3xl p-6">
              <h2 className="font-display text-2xl mb-4">Previous bookings</h2>
              <div className="space-y-3">
                {past.map(b => (
                  <div key={b.id} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                    <div>
                      <div className="font-medium">{b.serviceName}</div>
                      <div className="text-xs text-muted-foreground">{b.salonName} • {b.date}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">₹{b.price.toLocaleString("en-IN")}</span>
                      <Button variant="ghost" size="sm" className="rounded-full text-xs">Book again</Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Saved */}
            <section className="glass rounded-3xl p-6">
              <h2 className="font-display text-2xl mb-4">Saved salons</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {saved.map(s => (
                  <Link key={s.id} to="/salons/$id" params={{ id: s.id }} className="glass rounded-2xl overflow-hidden hover:shadow-glow transition">
                    <img src={s.image} className="h-28 w-full object-cover" />
                    <div className="p-3">
                      <div className="font-semibold text-sm">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.area} • ★{s.rating}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* AI sidebar */}
          <aside className="space-y-4">
            <div className="glass-strong rounded-3xl p-6 bg-mesh">
              <div className="flex items-center gap-2 text-sm font-medium text-primary mb-3">
                <Sparkles className="h-4 w-4" /> Your Beauty Score
              </div>
              <div className="relative h-32 w-32 mx-auto">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="url(#g)" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${(beautyScore/100) * 264} 264`} />
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="oklch(0.78 0.11 15)" />
                      <stop offset="100%" stopColor="oklch(0.82 0.13 75)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-display gradient-text">{beautyScore}</div>
                  <div className="text-[10px] text-muted-foreground">EXCELLENT</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">Built from your quiz answers, booking history, and preferences.</p>
            </div>

            <div className="glass rounded-3xl p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-primary mb-3">
                <Sparkles className="h-4 w-4" /> AI Recommendations
              </div>
              <div className="space-y-2">
                {["Try a Korean Glass Skin facial — matches your dry-skin profile","Book a hair spa within 10 days for optimal results","Bridal trial slots open next week at Blush by Shreya"].map((r,i) => (
                  <div key={i} className="text-sm p-3 rounded-xl bg-muted/50">{r}</div>
                ))}
              </div>
              <Link to="/routine"><Button variant="outline" className="w-full mt-3 rounded-full">Generate routine</Button></Link>
            </div>
          </aside>
        </div>
      </div>
    </Shell>
  );
}

function StatCard({ icon: Icon, label, value, highlight }: { icon: any; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`glass rounded-2xl p-4 ${highlight ? "bg-mesh shadow-glow" : ""}`}>
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-primary" />
        {highlight && <Badge className="gradient-rose-bg border-0 text-white text-[10px]">Live</Badge>}
      </div>
      <div className={`mt-2 font-display ${highlight ? "text-3xl gradient-text" : "text-2xl"}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
