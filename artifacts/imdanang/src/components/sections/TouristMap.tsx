import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Hotel, UtensilsCrossed, Camera, Compass, Navigation } from "lucide-react";

const locations = [
  { id: 1, x: "28%", y: "35%", name: "Bãi biển Mỹ Khê", type: "Beach", icon: Navigation, color: "bg-blue-500", desc: "Bãi biển đẹp nhất hành tinh" },
  { id: 2, x: "55%", y: "25%", name: "Bà Nà Hills", type: "Attraction", icon: Camera, color: "bg-purple-500", desc: "Thiên đường trên mây" },
  { id: 3, x: "42%", y: "58%", name: "Cầu Rồng", type: "Landmark", icon: MapPin, color: "bg-amber-500", desc: "Biểu tượng Đà Nẵng" },
  { id: 4, x: "18%", y: "70%", name: "Crowne Plaza Resort", type: "Hotel", icon: Hotel, color: "bg-teal-500", desc: "Resort 5 sao tuyệt vời" },
  { id: 5, x: "75%", y: "45%", name: "Nhà hàng Hải sản", type: "Restaurant", icon: UtensilsCrossed, color: "bg-orange-500", desc: "Hải sản tươi sống nhất thành phố" },
  { id: 6, x: "60%", y: "72%", name: "Phố cổ Hội An", type: "Heritage", icon: Compass, color: "bg-rose-500", desc: "Di sản văn hóa thế giới" },
];

export default function TouristMap() {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 px-4" id="map" ref={ref} data-testid="section-tourist-map">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{ minHeight: 520 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #0a1628 0%, #0d2048 30%, #0a2a3a 60%, #08182e 100%)",
            }}
          />

          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-blue-400/10"
                style={{
                  width: `${(i + 1) * 120}px`,
                  height: `${(i + 1) * 120}px`,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              />
            ))}
          </div>

          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(ellipse at 30% 60%, rgba(0, 100, 200, 0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 40%, rgba(0, 150, 200, 0.2) 0%, transparent 50%)
              `,
            }}
          />

          {locations.map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: i * 0.12 + 0.3, type: "spring", stiffness: 300 }}
              className="absolute"
              style={{ left: loc.x, top: loc.y, transform: "translate(-50%, -50%)" }}
              onMouseEnter={() => setHoveredPin(loc.id)}
              onMouseLeave={() => setHoveredPin(null)}
              data-testid={`pin-location-${loc.id}`}
            >
              <div className="relative cursor-pointer">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: `${loc.color.replace("bg-", "").replace("-500", "")}` }}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: i * 0.3 }}
                />
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className={`relative z-10 w-10 h-10 ${loc.color} rounded-full flex items-center justify-center shadow-lg border-2 border-white/30`}
                >
                  <loc.icon size={18} className="text-white" />
                </motion.div>
              </div>

              <AnimatePresence>
                {hoveredPin === loc.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.92 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-44 z-20"
                  >
                    <div className="glass-dark rounded-xl p-3 shadow-xl">
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full mb-1.5 ${loc.color} text-white font-medium`}>
                        {loc.type}
                      </span>
                      <h4 className="text-white text-sm font-semibold leading-tight">{loc.name}</h4>
                      <p className="text-white/60 text-xs mt-0.5">{loc.desc}</p>
                    </div>
                    <div className="w-2.5 h-2.5 bg-black/60 rotate-45 mx-auto -mt-1.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          <div className="relative z-10 flex flex-col items-center justify-center min-h-[520px] text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-full px-4 py-1.5 text-sm mb-6">
                <MapPin size={14} />
                Đà Nẵng, Việt Nam
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                Tourist Map
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-sm">
                Explore locations on the map — khám phá Đà Nẵng qua bản đồ tương tác
              </p>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(59,130,246,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 bg-blue-500 hover:bg-blue-400 text-white px-8 py-3.5 rounded-2xl font-semibold text-base transition-colors shadow-lg"
                data-testid="button-explore-map"
              >
                <Compass size={18} />
                Khám phá bản đồ
              </motion.button>

              <div className="flex items-center justify-center gap-6 mt-10">
                {[
                  { icon: Hotel, label: "Khách sạn", count: "128+" },
                  { icon: UtensilsCrossed, label: "Nhà hàng", count: "340+" },
                  { icon: Camera, label: "Địa điểm", count: "85+" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon size={20} className="text-blue-400 mx-auto mb-1" />
                    <p className="text-white font-bold text-lg">{stat.count}</p>
                    <p className="text-white/50 text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-4 left-4 glass-dark rounded-xl px-3 py-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/70 text-xs">6 địa điểm trên bản đồ</span>
          </div>

          <div className="absolute top-4 right-4 flex flex-col gap-1">
            <button className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white text-lg font-bold hover:bg-white/20 transition-colors">+</button>
            <button className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white text-lg font-bold hover:bg-white/20 transition-colors">−</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
