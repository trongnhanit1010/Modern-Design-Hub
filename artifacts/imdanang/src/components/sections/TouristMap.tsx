import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Hotel, UtensilsCrossed, Camera, Compass, Navigation, Star, Clock, X } from "lucide-react";

const locations = [
  { id: 1, x: 28, y: 42, name: "Bãi biển Mỹ Khê", type: "Bãi biển", icon: Navigation, color: "bg-sky-500", border: "border-sky-300", accent: "#0ea5e9", desc: "Bãi biển đẹp nhất hành tinh, cát trắng mịn dài 9km", rating: 4.9, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop" },
  { id: 2, x: 55, y: 20, name: "Bà Nà Hills", type: "Địa điểm", icon: Camera, color: "bg-violet-500", border: "border-violet-300", accent: "#8b5cf6", desc: "Thiên đường trên mây, cầu Vàng nổi tiếng thế giới", rating: 4.9, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&auto=format&fit=crop" },
  { id: 3, x: 42, y: 58, name: "Cầu Rồng", type: "Biểu tượng", icon: MapPin, color: "bg-amber-500", border: "border-amber-300", accent: "#f59e0b", desc: "Biểu tượng của Đà Nẵng, phun lửa mỗi cuối tuần", rating: 4.8, img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=300&auto=format&fit=crop" },
  { id: 4, x: 18, y: 70, name: "Crowne Plaza Resort", type: "Khách sạn", icon: Hotel, color: "bg-teal-500", border: "border-teal-300", accent: "#14b8a6", desc: "Resort 5 sao sang trọng bậc nhất Đà Nẵng", rating: 4.9, img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=300&auto=format&fit=crop" },
  { id: 5, x: 74, y: 45, name: "Nhà hàng Hải sản", type: "Ẩm thực", icon: UtensilsCrossed, color: "bg-orange-500", border: "border-orange-300", accent: "#f97316", desc: "Hải sản tươi sống ngon nhất Đà Nẵng, view biển", rating: 4.7, img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&auto=format&fit=crop" },
  { id: 6, x: 60, y: 75, name: "Phố cổ Hội An", type: "Di sản", icon: Compass, color: "bg-rose-500", border: "border-rose-300", accent: "#f43f5e", desc: "Di sản văn hóa UNESCO, phố cổ đèn lồng rực rỡ", rating: 4.9, img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=300&auto=format&fit=crop" },
];

function WorldMapSvg() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none">
      <path d="M50 200 Q80 180 120 195 Q150 185 170 200 Q200 190 230 200 Q250 195 260 210 Q280 215 300 205 Q320 195 340 205 Q360 200 370 215 L380 230 Q370 245 360 240 Q340 250 320 245 Q300 255 280 248 Q260 258 240 250 Q220 255 200 245 Q180 250 160 240 Q140 248 120 238 Q100 244 80 235 Q60 240 50 225 Z" fill="currentColor" className="text-blue-300" />
      <path d="M400 100 Q430 90 460 100 Q490 95 510 108 Q530 102 550 112 Q570 108 590 120 Q610 115 630 128 L640 145 Q630 158 610 152 Q590 162 570 155 Q550 165 530 158 Q510 168 490 160 Q470 165 450 155 Q430 162 410 152 Q395 158 390 145 Q385 130 395 115 Z" fill="currentColor" className="text-blue-300" />
      <path d="M500 200 Q520 188 545 195 Q565 185 585 198 Q600 192 615 205 Q628 200 635 215 L638 230 Q628 242 615 238 Q600 248 585 240 Q565 250 545 242 Q525 248 510 238 Q495 245 490 230 Q488 215 500 200 Z" fill="currentColor" className="text-blue-300" />
      <path d="M50 300 Q75 285 100 295 Q125 285 150 295 Q170 288 190 300 Q205 295 215 310 L218 325 Q205 338 190 332 Q170 342 150 333 Q125 340 100 332 Q75 340 55 330 Q42 320 50 305 Z" fill="currentColor" className="text-blue-300" />
      <path d="M680 180 Q700 170 720 180 Q738 172 750 185 Q762 178 770 192 L772 208 Q762 220 750 215 Q738 224 720 215 Q700 222 682 212 Q670 205 680 190 Z" fill="currentColor" className="text-blue-300" />
      <path d="M660 280 Q680 270 700 278 Q718 268 730 278 Q742 272 750 284 L752 298 Q742 310 728 304 Q712 312 695 305 Q675 312 660 302 Q650 294 660 282 Z" fill="currentColor" className="text-blue-300" />
      <ellipse cx="350" cy="375" rx="60" ry="35" fill="currentColor" className="text-blue-300" />
      <ellipse cx="400" cy="420" rx="40" ry="22" fill="currentColor" className="text-blue-300" />
    </svg>
  );
}

function ClassicMap({ isInView }: { isInView: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ minHeight: 520 }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d2048 30%, #0a2a3a 60%, #08182e 100%)" }} />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full border border-blue-400/10" style={{ width: `${(i + 1) * 120}px`, height: `${(i + 1) * 120}px`, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} animate={{ opacity: [0.3, 0.1, 0.3] }} transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }} />
        ))}
      </div>
      {locations.map((loc, i) => (
        <motion.div key={loc.id} initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: i * 0.12 + 0.3, type: "spring", stiffness: 300 }} className="absolute" style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: "translate(-50%, -50%)" }} onMouseEnter={() => setHovered(loc.id)} onMouseLeave={() => setHovered(null)} data-testid={`pin-location-${loc.id}`}>
          <div className="relative cursor-pointer">
            <motion.div className="absolute inset-0 rounded-full opacity-60" animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} style={{ background: loc.accent }} />
            <motion.div whileHover={{ scale: 1.15 }} className={`relative z-10 w-10 h-10 ${loc.color} rounded-full flex items-center justify-center shadow-lg border-2 border-white/30`}>
              <loc.icon size={18} className="text-white" />
            </motion.div>
          </div>
          <AnimatePresence>
            {hovered === loc.id && (
              <motion.div initial={{ opacity: 0, y: 8, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.92 }} transition={{ duration: 0.2 }} className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-44 z-20">
                <div className="bg-black/80 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/10">
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full mb-1.5 ${loc.color} text-white font-medium`}>{loc.type}</span>
                  <h4 className="text-white text-sm font-semibold leading-tight">{loc.name}</h4>
                  <p className="text-white/60 text-xs mt-0.5">{loc.desc}</p>
                </div>
                <div className="w-2.5 h-2.5 bg-black/80 rotate-45 mx-auto -mt-1.5" />
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
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2.5 bg-blue-500 hover:bg-blue-400 text-white px-8 py-3.5 rounded-2xl font-semibold text-base transition-colors shadow-lg" data-testid="button-explore-map">
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
      <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        <span className="text-white/70 text-xs">6 địa điểm trên bản đồ</span>
      </div>
    </motion.div>
  );
}

function ModernMap({ isInView }: { isInView: boolean }) {
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
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #0c4a6e 0%, #075985 20%, #0369a1 45%, #0891b2 70%, #06b6d4 90%, #22d3ee 100%)" }} />
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,0.8) 1.5px, transparent 0)", backgroundSize: "28px 28px" }} />
      <div className="absolute inset-0 opacity-30">
        <WorldMapSvg />
      </div>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 70%, rgba(251,191,36,0.15) 0%, transparent 40%), radial-gradient(ellipse at 80% 20%, rgba(34,211,238,0.2) 0%, transparent 45%)" }} />

      <div className="relative z-10 grid md:grid-cols-5 min-h-[520px]">
        <div className="md:col-span-2 flex flex-col justify-center p-8 md:pr-4">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white rounded-full px-4 py-1.5 text-sm mb-5">
              <MapPin size={13} />Đà Nẵng, Việt Nam
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">Tourist<br />Map</h2>
            <p className="text-white/75 text-sm leading-relaxed mb-6 max-w-xs">Khám phá các địa điểm du lịch nổi bật tại Đà Nẵng và khu vực miền Trung</p>
            <div className="flex items-center gap-5 mb-7">
              {[{ count: "128+", label: "Khách sạn" }, { count: "85+", label: "Địa điểm" }, { count: "340+", label: "Nhà hàng" }].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-white font-bold text-xl">{s.count}</p>
                  <p className="text-white/55 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-flex items-center gap-2 bg-white text-cyan-900 px-6 py-3 rounded-2xl font-semibold text-sm shadow-xl hover:bg-cyan-50 transition-colors w-fit" data-testid="button-explore-map">
              <Compass size={16} />Khám phá bản đồ
            </motion.button>
          </motion.div>
        </div>

        <div className="md:col-span-3 relative flex items-center justify-center p-6">
          <div className="relative w-full h-full" style={{ minHeight: 380 }}>
            {locations.map((loc, i) => (
              <motion.div
                key={loc.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: i * 0.12 + 0.4, type: "spring", stiffness: 280 }}
                className="absolute cursor-pointer"
                style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: "translate(-50%, -50%)" }}
                onClick={() => setActive(active === loc.id ? null : loc.id)}
                data-testid={`tour-pin-${loc.id}`}
              >
                <div className="relative group">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: `radial-gradient(circle, ${loc.accent}50, transparent)`, margin: -8 }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0.2, 0.7] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative z-10 w-11 h-11 ${loc.color} rounded-2xl flex items-center justify-center shadow-xl border-2 ${active === loc.id ? "border-white scale-110" : "border-white/40"} transition-all`}
                  >
                    <loc.icon size={18} className="text-white" />
                  </motion.div>
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap transition-all duration-200 ${active === loc.id ? "opacity-0" : "opacity-100"}`}>
                    <span className="text-white text-[10px] font-semibold bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full drop-shadow">
                      {loc.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            <AnimatePresence>
              {activeLocation && (
                <motion.div
                  key={activeLocation.id}
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute z-30 w-64"
                  style={{
                    left: activeLocation.x > 60 ? "auto" : `${Math.min(activeLocation.x + 10, 45)}%`,
                    right: activeLocation.x > 60 ? "5%" : "auto",
                    top: activeLocation.y > 55 ? "auto" : `${Math.min(activeLocation.y + 8, 40)}%`,
                    bottom: activeLocation.y > 55 ? "5%" : "auto",
                  }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                    <div className="relative h-32">
                      <img src={activeLocation.img} alt={activeLocation.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <button onClick={() => setActive(null)} className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:bg-white text-xs transition-colors">
                        <X size={12} />
                      </button>
                      <span className={`absolute bottom-2 left-2 inline-block ${activeLocation.color} text-white text-[10px] px-2 py-0.5 rounded-full font-medium`}>{activeLocation.type}</span>
                    </div>
                    <div className="p-3">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-gray-900 text-sm leading-tight">{activeLocation.name}</h3>
                        <div className="flex items-center gap-0.5 shrink-0 ml-1"><Star size={11} className="text-amber-400 fill-amber-400" /><span className="text-amber-600 text-xs font-bold">{activeLocation.rating}</span></div>
                      </div>
                      <p className="text-gray-500 text-xs mb-2 line-clamp-2">{activeLocation.desc}</p>
                      <div className="flex items-center gap-1 text-gray-400 text-xs mb-2"><Clock size={10} /><span>6:00 – 22:00</span></div>
                      <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5">
                        <Navigation size={12} />Chỉ đường
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-black/20 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2 z-10">
        <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
        <span className="text-white text-xs">Nhấn vào địa điểm để xem chi tiết</span>
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
            <motion.div key="B" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ModernMap isInView={isInView} /></motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
