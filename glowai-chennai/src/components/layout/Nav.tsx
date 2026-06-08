import { Link, useRouterState } from "@tanstack/react-router";
import { Sparkles, Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/salons", label: "Salons" },
  { to: "/inspiration", label: "Inspiration" },
  { to: "/trends", label: "Trends" },
  { to: "/quiz", label: "Beauty Quiz" },
  { to: "/dashboard", label: "Dashboard" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const path = useRouterState({ select: r => r.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-border/40">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full gradient-rose-bg blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-9 w-9 rounded-full gradient-rose-bg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">
              Glow<span className="gradient-text">AI</span>
            </span>
            <span className="hidden sm:inline text-xs text-muted-foreground border-l pl-2 ml-1">Chennai</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map(l => {
              const active = path === l.to || (l.to !== "/" && path.startsWith(l.to));
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                    active ? "bg-primary/10 text-primary font-medium" : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Link to="/salons" className="hidden md:inline-flex">
              <Button className="gradient-rose-bg text-white shadow-glow border-0 hover:opacity-90 rounded-full px-5">
                Book Now
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden border-t border-border/40 px-4 py-3 flex flex-col gap-1 bg-background/95 backdrop-blur">
            {links.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 px-3 text-sm rounded-lg hover:bg-muted">
                {l.label}
              </Link>
            ))}
            <Link to="/salons" onClick={() => setOpen(false)}>
              <Button className="w-full gradient-rose-bg text-white border-0 mt-2">Book Now</Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
