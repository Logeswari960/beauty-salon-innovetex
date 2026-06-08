import { createFileRoute } from "@tanstack/react-router";
import { Users, Calendar, IndianRupee, TrendingUp, Building2, Star } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { salons } from "@/data/salons";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — GlowAI" }] }),
  component: Admin,
});

const revenueData = [
  { month: "Jan", revenue: 240000 }, { month: "Feb", revenue: 320000 },
  { month: "Mar", revenue: 380000 }, { month: "Apr", revenue: 460000 },
  { month: "May", revenue: 520000 }, { month: "Jun", revenue: 610000 },
];
const serviceData = [
  { name: "Facials", bookings: 420 }, { name: "Hair", bookings: 380 },
  { name: "Bridal", bookings: 220 }, { name: "Spa", bookings: 180 },
  { name: "Nails", bookings: 160 }, { name: "Grooming", bookings: 140 },
];

function Admin() {
  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Badge className="gradient-rose-bg border-0 text-white mb-2">Admin Console</Badge>
            <h1 className="font-display text-4xl">Platform analytics</h1>
            <p className="text-muted-foreground mt-1">Manage salons, bookings, and growth.</p>
          </div>
          <Button className="rounded-full gradient-rose-bg text-white border-0">+ Add salon</Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <Kpi icon={IndianRupee} label="Total Revenue" value="₹6.1L" delta="+24%" />
          <Kpi icon={Calendar} label="Bookings" value="2,348" delta="+18%" />
          <Kpi icon={Users} label="Active Users" value="14,829" delta="+11%" />
          <Kpi icon={Building2} label="Partner Salons" value={salons.length.toString()} delta="+3" />
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mb-6">
          <div className="glass rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Revenue trend</h3>
              <Badge variant="secondary"><TrendingUp className="h-3 w-3 mr-1" />+24% MoM</Badge>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.78 0.11 15)" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="oklch(0.78 0.11 15)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.85 0.02 320)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${v/1000}k`} />
                <Tooltip contentStyle={{ borderRadius: 12, background: "var(--card)", border: "1px solid var(--border)" }} />
                <Area type="monotone" dataKey="revenue" stroke="oklch(0.68 0.13 20)" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-3xl p-6">
            <h3 className="font-semibold mb-4">Popular services</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={serviceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.85 0.02 320)" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, background: "var(--card)", border: "1px solid var(--border)" }} />
                <Bar dataKey="bookings" fill="oklch(0.78 0.09 295)" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top salons */}
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Top-rated salons</h3>
            <Button variant="outline" size="sm" className="rounded-full">Manage all</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground border-b border-border">
                <tr><th className="py-3 px-2">Salon</th><th>Area</th><th>Rating</th><th>Trust</th><th>Bookings</th><th>Status</th></tr>
              </thead>
              <tbody>
                {salons.slice(0,6).map(s => (
                  <tr key={s.id} className="border-b border-border/40">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <img src={s.image} className="h-10 w-10 rounded-xl object-cover" />
                        <div>
                          <div className="font-semibold">{s.name}</div>
                          <div className="text-xs text-muted-foreground">{s.tags[0]}</div>
                        </div>
                      </div>
                    </td>
                    <td>{s.area}</td>
                    <td><span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-gold text-gold" />{s.rating}</span></td>
                    <td><span className="text-primary font-semibold">{s.trustScore}</span></td>
                    <td>{Math.floor(s.reviewCount * 1.4)}</td>
                    <td><Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">Active</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function Kpi({ icon: Icon, label, value, delta }: { icon: any; label: string; value: string; delta: string }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div className="h-9 w-9 rounded-xl gradient-rose-bg flex items-center justify-center"><Icon className="h-4 w-4 text-white" /></div>
        <Badge variant="secondary" className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">{delta}</Badge>
      </div>
      <div className="font-display text-2xl mt-3">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
