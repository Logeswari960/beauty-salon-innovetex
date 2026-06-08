import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Calendar, Clock, CreditCard, ChevronRight, Sparkles } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { salons } from "@/data/salons";
import type { Salon } from "@/types";
import { toast } from "sonner";

export const Route = createFileRoute("/book/$salonId")({
  head: () => ({ meta: [{ title: "Book Appointment — GlowAI" }] }),
  loader: ({ params }): Salon => {
    const salon = salons.find(s => s.id === params.salonId);
    if (!salon) throw notFound();
    return salon;
  },
  component: Booking,
});

function Booking() {
  const salon = Route.useLoaderData() as Salon;
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState<string>(salon.services[0]?.id ?? "");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const service = salon.services.find(s => s.id === serviceId);

  const dates = Array.from({length:7}).map((_,i) => {
    const d = new Date(); d.setDate(d.getDate()+i);
    return { iso: d.toISOString().split("T")[0], label: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }) };
  });

  const times = ["10:00 AM","11:30 AM","12:45 PM","2:00 PM","3:30 PM","5:00 PM","6:15 PM","7:30 PM"];

  function confirm() {
    toast.success("Booking confirmed! 🎉", { description: `${service?.name} at ${salon.name} on ${date} at ${time}` });
    setStep(4);
  }

  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-8 pb-16">
        <div className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
          <Link to="/salons/$id" params={{ id: salon.id }} className="hover:text-foreground">{salon.name}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Book</span>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-8">
          {["Service","Date","Time","Confirm"].map((label, i) => {
            const idx = i + 1;
            return (
              <div key={label} className="flex items-center gap-2 flex-1">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold transition ${
                  step >= idx ? "gradient-rose-bg text-white shadow-glow" : "glass text-muted-foreground"
                }`}>{step > idx ? <Check className="h-4 w-4" /> : idx}</div>
                <div className={`text-sm hidden sm:inline ${step >= idx ? "font-semibold" : "text-muted-foreground"}`}>{label}</div>
                {idx < 4 && <div className="flex-1 h-0.5 bg-border" />}
              </div>
            );
          })}
        </div>

        <div className="glass-strong rounded-3xl p-6 sm:p-8">
          {step === 1 && (
            <div className="animate-fade-up">
              <h2 className="font-display text-2xl mb-1">Choose a service</h2>
              <p className="text-sm text-muted-foreground mb-4">at {salon.name}</p>
              <div className="space-y-2">
                {salon.services.map(s => (
                  <button key={s.id} onClick={() => setServiceId(s.id)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition ${
                      serviceId === s.id ? "border-primary bg-primary/5" : "border-transparent glass hover:border-primary/30"
                    }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.category} • {s.duration} min</div>
                      </div>
                      <div className="font-semibold">₹{s.price.toLocaleString("en-IN")}</div>
                    </div>
                  </button>
                ))}
              </div>
              <Button onClick={() => setStep(2)} disabled={!serviceId} className="mt-6 w-full rounded-full gradient-rose-bg text-white border-0">Continue</Button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-up">
              <h2 className="font-display text-2xl mb-4 flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" />Pick a date</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {dates.map(d => (
                  <button key={d.iso} onClick={() => setDate(d.label)}
                    className={`p-3 rounded-2xl text-center transition ${date === d.label ? "gradient-rose-bg text-white shadow-glow" : "glass hover:bg-primary/10"}`}>
                    <div className="text-xs uppercase opacity-70">{d.label.split(",")[0]}</div>
                    <div className="font-semibold mt-1">{d.label.split(",")[1]}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-6">
                <Button variant="outline" onClick={() => setStep(1)} className="rounded-full">Back</Button>
                <Button onClick={() => setStep(3)} disabled={!date} className="flex-1 rounded-full gradient-rose-bg text-white border-0">Continue</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-up">
              <h2 className="font-display text-2xl mb-4 flex items-center gap-2"><Clock className="h-5 w-5 text-primary" />Pick a time</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {times.map(t => (
                  <button key={t} onClick={() => setTime(t)}
                    className={`p-3 rounded-2xl text-center transition ${time === t ? "gradient-rose-bg text-white shadow-glow" : "glass hover:bg-primary/10"}`}>
                    <div className="font-semibold text-sm">{t}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-6">
                <Button variant="outline" onClick={() => setStep(2)} className="rounded-full">Back</Button>
                <Button onClick={confirm} disabled={!time} className="flex-1 rounded-full gradient-rose-bg text-white border-0 shadow-glow">
                  <CreditCard className="h-4 w-4 mr-2" /> Confirm Booking
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-8 animate-fade-up">
              <div className="h-20 w-20 mx-auto rounded-full gradient-rose-bg flex items-center justify-center animate-pulse-glow">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h2 className="font-display text-3xl mt-4">You're booked! ✨</h2>
              <p className="text-muted-foreground mt-2">A confirmation has been sent.</p>

              <div className="glass rounded-2xl p-5 mt-6 text-left max-w-md mx-auto">
                <Row label="Salon" value={salon.name} />
                <Row label="Service" value={service?.name ?? ""} />
                <Row label="Date" value={date} />
                <Row label="Time" value={time} />
                <Row label="Amount" value={`₹${service?.price.toLocaleString("en-IN")}`} bold />
              </div>

              <div className="flex gap-2 justify-center mt-6">
                <Link to="/dashboard"><Button variant="outline" className="rounded-full">View bookings</Button></Link>
                <Link to="/salons"><Button className="rounded-full gradient-rose-bg text-white border-0">Browse more</Button></Link>
              </div>
            </div>
          )}
        </div>

        {step < 4 && service && (
          <div className="glass rounded-2xl p-4 mt-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Summary</div>
              <div className="font-semibold">{service.name} • {service.duration} min</div>
              <div className="text-xs text-muted-foreground">{[date, time].filter(Boolean).join(" • ") || "Pick a date and time"}</div>
            </div>
            <div className="text-2xl font-display gradient-text">₹{service.price.toLocaleString("en-IN")}</div>
          </div>
        )}
      </div>
    </Shell>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between py-2 border-b border-border/40 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={bold ? "font-semibold" : "text-sm"}>{value}</span>
    </div>
  );
}
