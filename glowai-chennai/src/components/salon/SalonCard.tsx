import { Link } from "@tanstack/react-router";
import { Star, MapPin, Shield, Heart } from "lucide-react";
import type { Salon } from "@/types";
import { Badge } from "@/components/ui/badge";

export function SalonCard({ salon, view = "grid" }: { salon: Salon; view?: "grid" | "list" }) {
  if (view === "list") {
    return (
      <Link to="/salons/$id" params={{ id: salon.id }} className="group block">
        <div className="glass rounded-3xl p-3 flex gap-4 hover:shadow-glow transition-all duration-300">
          <div className="relative h-32 w-44 shrink-0 overflow-hidden rounded-2xl">
            <img src={salon.image} alt={salon.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="flex-1 min-w-0 py-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-display text-lg font-semibold truncate">{salon.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{salon.tagline}</p>
              </div>
              <button className="h-8 w-8 rounded-full glass flex items-center justify-center shrink-0">
                <Heart className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{salon.area}</span>
              <span className="flex items-center gap-1 text-foreground"><Star className="h-3 w-3 fill-gold text-gold" />{salon.rating} ({salon.reviewCount})</span>
              <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-primary" />Trust {salon.trustScore}</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {salon.tags.slice(0,3).map(t => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/salons/$id" params={{ id: salon.id }} className="group block">
      <div className="glass rounded-3xl overflow-hidden hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          <img src={salon.image} alt={salon.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <button className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:scale-110 transition">
            <Heart className="h-4 w-4 text-rose" />
          </button>
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {salon.womenOwned && <Badge className="bg-lavender text-lavender-foreground border-0 text-[10px]">Women-owned</Badge>}
            {salon.tags.includes("Student-friendly") && <Badge className="bg-gold text-foreground border-0 text-[10px]">Student deal</Badge>}
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold text-white drop-shadow">{salon.name}</h3>
              <p className="text-xs text-white/80 flex items-center gap-1"><MapPin className="h-3 w-3" />{salon.area}</p>
            </div>
            <div className="glass-strong rounded-full px-2.5 py-1 flex items-center gap-1 text-xs">
              <Star className="h-3 w-3 fill-gold text-gold" />
              <span className="font-semibold">{salon.rating}</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">{salon.tagline}</p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1 text-xs">
              <Shield className="h-3 w-3 text-primary" />
              <span className="font-medium">Trust {salon.trustScore}</span>
            </div>
            <div className="text-xs text-muted-foreground">{"₹".repeat(salon.priceLevel)}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
