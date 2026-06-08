import { Link } from "@tanstack/react-router";
import { Sparkles, Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/50 bg-mesh">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-full gradient-rose-bg flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-semibold">Glow<span className="gradient-text">AI</span></span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Chennai's first AI-powered beauty companion. Discover, compare, and book salons in seconds.
          </p>
          <div className="flex gap-3 mt-4">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/salons" className="hover:text-foreground">Find Salons</Link></li>
            <li><Link to="/inspiration" className="hover:text-foreground">Style Inspiration</Link></li>
            <li><Link to="/trends" className="hover:text-foreground">Beauty Trends</Link></li>
            <li><Link to="/quiz" className="hover:text-foreground">Beauty Quiz</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">For Salons</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/admin" className="hover:text-foreground">Salon Dashboard</Link></li>
            <li><a href="#" className="hover:text-foreground">List Your Salon</a></li>
            <li><a href="#" className="hover:text-foreground">Partner Benefits</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">About</a></li>
            <li><a href="#" className="hover:text-foreground">Careers</a></li>
            <li><a href="#" className="hover:text-foreground">Press</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        © 2025 GlowAI Chennai. Crafted with rose-gold love in Chennai.
      </div>
    </footer>
  );
}
