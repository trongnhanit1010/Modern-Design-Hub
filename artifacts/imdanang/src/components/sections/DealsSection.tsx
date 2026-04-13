import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Clock, Star, ArrowRight } from "lucide-react";

const deals = [
  {
    id: 1,
    destination: "Bà Nà Hills",
    tagline: "Thiên đường trên mây",
    totalPrice: "$299.00",
    originalPrice: "$399.00",
    days: "03 Days",
    nights: "02 Nights",
    gradientA: "from-blue-600 via-blue-500 to-cyan-500",
    patternColor: "rgba(255,255,255,0.08)",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop",
    badge: "Best Seller",
    badgeColor: "bg-amber-400",
  },
  {
    id: 2,
    destination: "Hội An",
    tagline: "Vatican City Visa + Exclusive Package",
    totalPrice: "$599.00",
    originalPrice: "$799.00",
    days: "07 Days",
    nights: "05 Nights",
    gradientA: "from-amber-500 via-yellow-400 to-green-500",
    patternColor: "rgba(0,0,0,0.06)",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop",
    badge: "07 Days Delivery",
    badgeColor: "bg-blue-500",
  },
  {
    id: 3,
    destination: "Đảo Lý Sơn",
    tagline: "Maldives của Việt Nam",
    totalPrice: "$398.00",
    originalPrice: "$520.00",
    days: "04 Days",
    nights: "03 Nights",
    gradientA: "from-teal-600 via-emerald-500 to-cyan-400",
    patternColor: "rgba(255,255,255,0.08)",
    image: "https://images.unsplash.com/photo-1591017403997-bdf27de5700a?w=600&auto=format&fit=crop",
    badge: "Condition Applicable",
    badgeColor: "bg-pink-500",
  },
];

export default function DealsSection() {
  const [option, setOption] = useState<"A" | "B">("A");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 px-4 bg-background" ref={ref} data-testid="section-deals">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Deals for You</h2>
            <p className="text-muted-foreground text-sm mt-1">Ưu đãi đặc biệt dành cho bạn</p>
          </div>
          <div className="flex items-center gap-2 bg-muted rounded-full p-1">
            <button
              onClick={() => setOption("A")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "A" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
              data-testid="button-deals-option-a"
            >
              Colors
            </button>
            <button
              onClick={() => setOption("B")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "B" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
              data-testid="button-deals-option-b"
            >
              Images
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {option === "A" ? (
            <motion.div
              key="A"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {deals.map((deal, i) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className={`relative rounded-3xl p-6 bg-gradient-to-br ${deal.gradientA} overflow-hidden cursor-pointer shadow-lg`}
                  data-testid={`card-deal-color-${deal.id}`}
                >
                  <div className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(circle at 20% 80%, ${deal.patternColor} 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
                    }}
                  />
                  <div className="relative z-10">
                    <span className={`inline-block ${deal.badgeColor} text-white text-xs px-3 py-1 rounded-full font-medium mb-4`}>
                      {deal.badge}
                    </span>
                    <h3 className="text-white font-bold text-2xl mb-1">{deal.destination}</h3>
                    <p className="text-white/80 text-sm mb-5">{deal.tagline}</p>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-white/60 text-xs">Total Price</p>
                        <p className="text-white text-3xl font-bold">{deal.totalPrice}</p>
                        <p className="text-white/50 text-xs line-through">{deal.originalPrice}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
                          <Clock size={12} className="text-white/80" />
                          <span className="text-white/90 text-xs">{deal.days}, {deal.nights}</span>
                        </div>
                      </div>
                    </div>
                    <button className="mt-5 w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                      Đặt ngay <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="B"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {deals.map((deal, i) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="relative rounded-3xl overflow-hidden cursor-pointer shadow-lg group h-72"
                  data-testid={`card-deal-img-${deal.id}`}
                >
                  <img
                    src={deal.image}
                    alt={deal.destination}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-block ${deal.badgeColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                      {deal.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-xl mb-0.5">{deal.destination}</h3>
                    <p className="text-white/70 text-sm mb-3">{deal.tagline}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/60 text-xs">Total Price</p>
                        <p className="text-white text-2xl font-bold">{deal.totalPrice}<span className="text-base font-normal">/pp</span></p>
                      </div>
                      <button className="bg-white text-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors flex items-center gap-1.5">
                        <Star size={13} className="text-amber-500 fill-amber-500" />
                        Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
