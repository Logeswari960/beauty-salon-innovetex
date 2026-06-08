import { useState } from "react";
import { Sparkles, Send, Bot, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { aiBeautyAdvisor } from "@/lib/ai-mock";
import type { ChatMessage } from "@/types";

const suggestions = [
  "Which facial suits oily skin?",
  "Hair fall solutions?",
  "Wedding skincare in 6 weeks?",
];

export function AIAdvisor() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "0", role: "assistant", content: "Hi! I'm your AI Beauty Advisor ✨ Ask me anything — skincare, hair, bridal prep, routines." },
  ]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: text };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setLoading(true);
    const reply = await aiBeautyAdvisor(text);
    setMessages(m => [...m, { id: Date.now().toString() + "a", role: "assistant", content: reply }]);
    setLoading(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full gradient-rose-bg shadow-glow flex items-center justify-center text-white animate-pulse-glow"
        aria-label="Open AI Beauty Advisor"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6 animate-fade-up">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative glass-strong w-full sm:w-[420px] h-[80vh] sm:h-[600px] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-glow">
            <div className="flex items-center justify-between p-4 border-b border-border/40">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full gradient-rose-bg flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">AI Beauty Advisor</div>
                  <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}><X className="h-4 w-4" /></Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-wrap ${
                    m.role === "user" ? "gradient-rose-bg text-white" : "bg-muted/70"
                  }`}>{m.content}</div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-1.5 px-3">
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce delay-100" />
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce delay-200" />
                </div>
              )}
            </div>

            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {suggestions.map(s => (
                  <button key={s} onClick={() => send(s)} className="text-xs px-3 py-1.5 rounded-full glass hover:bg-primary/10 transition">
                    <Sparkles className="inline h-3 w-3 mr-1" />{s}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={e => { e.preventDefault(); send(input); }} className="p-3 border-t border-border/40 flex gap-2">
              <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything beauty…" className="rounded-full" />
              <Button type="submit" size="icon" className="rounded-full gradient-rose-bg border-0 text-white shrink-0"><Send className="h-4 w-4" /></Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
