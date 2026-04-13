import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";

const locations = ["Hội An", "Đà Nẵng", "Non Nước", "Mỹ Khê", "Bà Nà Hills", "Sơn Trà"];

export default function LocationSelector() {
  const [active, setActive] = useState("Đà Nẵng");

  return (
    <section className="bg-white border-b border-border" data-testid="section-location-selector">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-primary shrink-0">
          <MapPin size={15} />
          <span className="text-sm font-medium text-muted-foreground">Địa điểm:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setActive(loc)}
              className="relative shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
              data-testid={`button-location-${loc.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {active === loc && (
                <motion.div
                  layoutId="location-pill"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className={`relative z-10 ${active === loc ? "text-white" : "text-muted-foreground hover:text-foreground"}`}>
                {loc}
              </span>
            </button>
          ))}
        </div>
        <button className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 text-sm font-medium hover:bg-amber-100 transition-colors">
          <Sparkles size={13} />
          AI Picked
        </button>
      </div>
    </section>
  );
}
