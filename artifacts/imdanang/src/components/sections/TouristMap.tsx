import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Hotel, UtensilsCrossed, Camera, Compass, Navigation, Star, Clock } from "lucide-react";

const locations = [
  { id: 1, x: "22%", y: "38%", name: "Bãi biển Mỹ Khê", type: "Bãi biển", icon: Navigation, color: "bg-blue-500", accent: "#3b82f6", desc: "Bãi biển đẹp nhất hành tinh", rating: 4.9, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop" },
  { id: 2, x: "52%", y: "22%", name: "Bà Nà Hills", type: "Địa điểm", icon: Camera, color: "bg-violet-500", accent: "#8b5cf6", desc: "Thiên đường trên mây", rating: 4.9, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&auto=format&fit=crop" },
  { id: 3, x: "40%", y: "55%", name: "Cầu Rồng", type: "Biểu tượng", icon: MapPin, color: "bg-amber-500", accent: "#f59e0b", desc: "Biểu tượng Đà Nẵng", rating: 4.8, img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&auto=format&fit=crop" },
  { id: 4, x: "16%", y: "68%", name: "Crowne Plaza Resort", type: "Khách sạn", icon: Hotel, color: "bg-teal-500", accent: "#14b8a6", desc: "Resort 5 sao tuyệt vời", rating: 4.9, img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=200&auto=format&fit=crop" },
  { id: 5, x: "72%", y: "42%", name: "Nhà hàng Hải sản", type: "Ẩm thực", icon: UtensilsCrossed, color: "bg-orange-500", accent: "#f97316", desc: "Hải sản tươi sống ngon nhất", rating: 4.7, img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&auto=format&fit=crop" },
  { id: 6, x: "58%", y: "70%", name: "Phố cổ Hội An", type: "Di sản", icon: Compass, color: "bg-rose-500", accent: "#f43f5e", desc: "Di sản văn hóa thế giới", rating: 4.9, img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=200&auto=format&fit=crop" },
];

function ClassicMap({ isInView }: { isInView: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ minHeight: 520 }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d2048 30%, #0a2a3a 60%, #08182e 100%)" }} />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full border border-blue-400/10"
            style={{ width: `${(i + 1) * 120}px`, height: `${(i + 1) * 120}px`, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
            animate={{ opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>
      {locations.map((loc, i) => (
        <motion.div key={loc.id} initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: i * 0.12 + 0.3, type: "spring", stiffness: 300 }}
          className="absolute" style={{ left: loc.x, top: loc.y, transform: "translate(-50%, -50%)" }}
          onMouseEnter={() => setHovered(loc.id)} onMouseLeave={() => setHovered(null)}
          data-testid={`pin-location-${loc.id}`}
        >
          <div className="relative cursor-pointer">
            <motion.div className="absolute inset-0 rounded-full opacity-60" animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} style={{ background: loc.accent }} />
            <motion.div whileHover={{ scale: 1.15 }} className={`relative z-10 w-10 h-10 ${loc.color} rounded-full flex items-center justify-center shadow-lg border-2 border-white/30`}>
              <loc.icon size={18} className="text-white" />
            </motion.div>
          </div>
          <AnimatePresence>
            {hovered === loc.id && (
              <motion.div initial={{ opacity: 0, y: 8, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.92 }} transition={{ duration: 0.2 }} className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-44 z-20">
                <div className="glass-dark rounded-xl p-3 shadow-xl">
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full mb-1.5 ${loc.color} text-white font-medium`}>{loc.type}</span>
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-full px-4 py-1.5 text-sm mb-6"><MapPin size={14} />Đà Nẵng, Việt Nam</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Tourist Map</h2>
          <p className="text-white/60 text-lg mb-8 max-w-sm">Khám phá Đà Nẵng qua bản đồ tương tác</p>
          <motion.button whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(59,130,246,0.5)" }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 bg-blue-500 hover:bg-blue-400 text-white px-8 py-3.5 rounded-2xl font-semibold text-base transition-colors shadow-lg" data-testid="button-explore-map">
            <Compass size={18} />Khám phá bản đồ
          </motion.button>
          <div className="flex items-center justify-center gap-6 mt-10">
            {[{ icon: Hotel, label: "Khách sạn", count: "128+" }, { icon: UtensilsCrossed, label: "Nhà hàng", count: "340+" }, { icon: Camera, label: "Địa điểm", count: "85+" }].map((stat) => (
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
  );
}

function TourismMap({ isInView }: { isInView: boolean }) {
  const [active, setActive] = useState<number | null>(null);

  const activeLocation = active !== null ? locations.find((l) => l.id === active) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden shadow-2xl"
      style={{ minHeight: 520 }}
      data-testid="section-tourist-map-tech"
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(160deg, #0f4c8a 0%, #1565c0 20%, #0277bd 40%, #00838f 65%, #006064 100%)",
        }}
      />

      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "30px 30px",
        }}
      />

      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: "radial-gradient(ellipse at 25% 60%, rgba(255,200,50,0.35) 0%, transparent 45%), radial-gradient(ellipse at 75% 30%, rgba(0,200,180,0.25) 0%, transparent 45%), radial-gradient(ellipse at 50% 90%, rgba(30,80,200,0.3) 0%, transparent 50%)",
        }}
      />

      {locations.map((loc, i) => (
        <motion.div
          key={loc.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: i * 0.12 + 0.3, type: "spring", stiffness: 280 }}
          className="absolute cursor-pointer"
          style={{ left: loc.x, top: loc.y, transform: "translate(-50%, -50%)" }}
          onClick={() => setActive(active === loc.id ? null : loc.id)}
          data-testid={`tour-pin-${loc.id}`}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-3 rounded-full"
              style={{ background: `radial-gradient(circle, ${loc.accent}40, transparent)` }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0.3, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
            />
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`relative z-10 w-11 h-11 ${loc.color} rounded-2xl flex items-center justify-center shadow-xl border-2 ${active === loc.id ? "border-white scale-110" : "border-white/50"} transition-all`}
            >
              <loc.icon size={18} className="text-white" />
            </motion.div>

            {active !== loc.id && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap"
              >
                <span className="text-white text-[10px] font-medium drop-shadow-lg bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  {loc.name}
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-[520px] px-8 gap-8">
        <motion.div
          className="text-center md:text-left max-w-xs"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full px-4 py-1.5 text-sm mb-5">
            <MapPin size={14} />Đà Nẵng, Việt Nam
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">Tourist Map</h2>
          <p className="text-white/80 mb-6">Khám phá các địa điểm du lịch nổi tiếng tại Đà Nẵng và khu vực lân cận</p>
          <div className="flex items-center gap-4 mb-6">
            {[{ count: "128+", label: "Khách sạn" }, { count: "85+", label: "Địa điểm" }, { count: "340+", label: "Nhà hàng" }].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-white font-bold text-xl">{s.count}</p>
                <p className="text-white/60 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-white text-blue-800 px-6 py-3 rounded-2xl font-semibold text-sm shadow-xl hover:bg-blue-50 transition-colors"
            data-testid="button-explore-map"
          >
            <Compass size={16} />Khám phá bản đồ
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {activeLocation && (
            <motion.div
              key={activeLocation.id}
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 30 }}
              transition={{ duration: 0.3 }}
              className="w-72 bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="relative h-40">
                <img src={activeLocation.img} alt={activeLocation.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-3 right-3 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:bg-white text-sm font-bold transition-colors"
                >
                  ✕
                </button>
                <span className={`absolute bottom-3 left-3 inline-block ${activeLocation.color} text-white text-xs px-2.5 py-0.5 rounded-full font-medium`}>
                  {activeLocation.type}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-base leading-tight">{activeLocation.name}</h3>
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-amber-600 text-xs font-bold">{activeLocation.rating}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-3">{activeLocation.desc}</p>
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                  <Clock size={11} />
                  <span>Mở cửa 6:00 – 22:00</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                  <Navigation size={14} />
                  Chỉ đường
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
        <span className="text-white text-xs font-medium">Nhấn vào địa điểm để xem chi tiết</span>
      </div>
    </motion.div>
  );
}

export default function TouristMap() {
  const [option, setOption] = useState<"A" | "B">("A");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 px-4" id="map" ref={ref} data-testid="section-tourist-map">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Tourist Map</h2>
            <p className="text-muted-foreground text-sm mt-1">Khám phá bản đồ du lịch Đà Nẵng</p>
          </div>
          <div className="flex items-center gap-2 bg-muted rounded-full p-1">
            <button onClick={() => setOption("A")} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "A" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`} data-testid="button-map-option-a">Classic</button>
            <button onClick={() => setOption("B")} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "B" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`} data-testid="button-map-option-b">Modern</button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {option === "A" ? (
            <motion.div key="A" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ClassicMap isInView={isInView} /></motion.div>
          ) : (
            <motion.div key="B" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><TourismMap isInView={isInView} /></motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
