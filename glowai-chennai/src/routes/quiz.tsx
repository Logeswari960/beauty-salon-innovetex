import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/quiz")({
  head: () => ({ meta: [{ title: "Beauty Quiz — GlowAI" }] }),
  component: Quiz,
});

const questions = [
  { q: "What's your skin type?", opts: ["Oily","Dry","Combination","Sensitive","Not sure"] },
  { q: "Top beauty goal right now?", opts: ["Glow & hydration","Anti-aging","Acne control","Bridal prep","Hair health"] },
  { q: "How often do you visit a salon?", opts: ["Weekly","Monthly","Every few months","Special occasions"] },
  { q: "What's your monthly beauty budget?", opts: ["Under ₹1000","₹1000-3000","₹3000-7000","₹7000+"] },
  { q: "Which best describes your lifestyle?", opts: ["Student","Working professional","New mom","Bride-to-be","Entrepreneur"] },
];

function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const pick = (opt: string) => {
    const next = [...answers]; next[step] = opt;
    setAnswers(next);
    if (step < questions.length - 1) setTimeout(() => setStep(step + 1), 200);
    else setTimeout(() => setDone(true), 200);
  };

  const score = 78 + Math.min(20, answers.length * 4);

  if (done) {
    return (
      <Shell>
        <div className="mx-auto max-w-2xl px-6 pt-16 pb-24 text-center">
          <div className="glass-strong rounded-3xl p-10 bg-mesh shadow-glow animate-fade-up">
            <Sparkles className="h-10 w-10 mx-auto text-primary mb-2" />
            <h1 className="font-display text-4xl">Your Beauty Profile</h1>
            <div className="relative h-44 w-44 mx-auto mt-6">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="url(#gq)" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${(score/100) * 264} 264`} />
                <defs>
                  <linearGradient id="gq" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.11 15)" />
                    <stop offset="100%" stopColor="oklch(0.82 0.13 75)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-display gradient-text">{score}</div>
                <div className="text-xs text-muted-foreground">BEAUTY SCORE</div>
              </div>
            </div>
            <p className="mt-4 text-muted-foreground">You're in the <strong className="text-foreground">Top 22%</strong> of GlowAI users. Your routine is well-balanced.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-6 text-sm text-left">
              {answers.map((a,i) => (
                <div key={i} className="glass rounded-xl p-3">
                  <div className="text-[10px] text-muted-foreground uppercase">{questions[i].q.split(" ").slice(0,3).join(" ")}</div>
                  <div className="font-semibold mt-1">{a}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-6 justify-center">
              <Link to="/salons"><Button className="rounded-full gradient-rose-bg text-white border-0 shadow-glow">See matched salons</Button></Link>
              <Link to="/routine"><Button variant="outline" className="rounded-full">Get my routine</Button></Link>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mx-auto max-w-2xl px-6 pt-12 pb-24">
        <div className="text-center mb-6">
          <Badge>Smart Beauty Quiz</Badge>
          <h1 className="font-display text-3xl mt-3">Question {step + 1} of {questions.length}</h1>
          <div className="h-2 bg-muted rounded-full mt-4 overflow-hidden max-w-sm mx-auto">
            <div className="h-full gradient-rose-bg transition-all" style={{ width: `${((step+1)/questions.length)*100}%` }} />
          </div>
        </div>

        <div className="glass-strong rounded-3xl p-8 animate-fade-up" key={step}>
          <h2 className="font-display text-2xl mb-6">{questions[step].q}</h2>
          <div className="space-y-2">
            {questions[step].opts.map(o => (
              <button key={o} onClick={() => pick(o)}
                className={`w-full text-left p-4 rounded-2xl glass hover:shadow-glow transition flex justify-between items-center ${
                  answers[step] === o ? "ring-2 ring-primary" : ""
                }`}>
                <span className="font-medium">{o}</span>
                {answers[step] === o && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
          </div>

          {step > 0 && (
            <Button variant="ghost" onClick={() => setStep(step-1)} className="mt-4 rounded-full">← Back</Button>
          )}
        </div>
      </div>
    </Shell>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full glass text-primary font-medium"><Sparkles className="h-3 w-3" />{children}</span>;
}
