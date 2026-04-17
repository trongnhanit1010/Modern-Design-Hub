import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Hotel, UtensilsCrossed, Camera, Compass, Navigation, Star, Clock, X, Wifi, Layers, DownloadCloud, Cpu } from "lucide-react";

const locations = [
  { id: 1, x: 10, y: 35, name: "Bãi biển Mỹ Khê", type: "Bãi biển", icon: Navigation, color: "bg-sky-500", border: "border-sky-300", accent: "#0ea5e9", desc: "Bãi biển đẹp nhất hành tinh, cát trắng mịn dài 9km", rating: 4.9, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop" },
  { id: 2, x: 50, y: 7, name: "Bà Nà Hills", type: "Địa điểm", icon: Camera, color: "bg-violet-500", border: "border-violet-300", accent: "#8b5cf6", desc: "Thiên đường trên mây, cầu Vàng nổi tiếng thế giới", rating: 4.9, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&auto=format&fit=crop" },
  { id: 3, x: 90, y: 60, name: "Cầu Rồng", type: "Biểu tượng", icon: MapPin, color: "bg-amber-500", border: "border-amber-300", accent: "#f59e0b", desc: "Biểu tượng của Đà Nẵng, phun lửa mỗi cuối tuần", rating: 4.8, img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=300&auto=format&fit=crop" },
  { id: 4, x: 10, y: 80, name: "Crowne Plaza Resort", type: "Khách sạn", icon: Hotel, color: "bg-teal-500", border: "border-teal-300", accent: "#14b8a6", desc: "Resort 5 sao sang trọng bậc nhất Đà Nẵng", rating: 4.9, img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=300&auto=format&fit=crop" },
  { id: 5, x: 90, y: 25, name: "Nhà hàng Hải sản", type: "Ẩm thực", icon: UtensilsCrossed, color: "bg-orange-500", border: "border-orange-300", accent: "#f97316", desc: "Hải sản tươi sống ngon nhất Đà Nẵng, view biển", rating: 4.7, img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&auto=format&fit=crop" },
  { id: 6, x: 50, y: 92, name: "Phố cổ Hội An", type: "Di sản", icon: Compass, color: "bg-rose-500", border: "border-rose-300", accent: "#f43f5e", desc: "Di sản văn hóa UNESCO, phố cổ đèn lồng rực rỡ", rating: 4.9, img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=300&auto=format&fit=crop" },
];

const smartDots = [
  { id: 1, x: 32, y: 22, name: "Bà Nà Hills", color: "#f59e0b", size: 10 },
  { id: 2, x: 62, y: 38, name: "Mỹ Khê", color: "#22c55e", size: 9 },
  { id: 3, x: 55, y: 52, name: "Cầu Rồng", color: "#3b82f6", size: 14 },
  { id: 4, x: 68, y: 68, name: "Ngũ Hành Sơn", color: "#06b6d4", size: 8 },
  { id: 5, x: 75, y: 82, name: "Hội An", color: "#f97316", size: 10 },
  { id: 6, x: 80, y: 18, name: "Sơn Trà", color: "#a78bfa", size: 8 },
];

const stats = [
  { value: "134+", label: "Địa điểm tham quan" },
  { value: "248+", label: "Khách sạn & Resort" },
  { value: "512+", label: "Nhà hàng ẩm thực" },
  { value: "86+", label: "Tour trải nghiệm" },
];

const features = [
  { icon: Navigation, label: "Chỉ đường thời gian thực" },
  { icon: Layers, label: "Đa lớp bản đồ" },
  { icon: Wifi, label: "Offline mode" },
  { icon: DownloadCloud, label: "GPS chính xác" },
];

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const size = 24;
  const strokeW = 2;
  const color = "#22d3ee";
  const isTL = position === "tl", isTR = position === "tr";
  const isBL = position === "bl";
  return (
    <div
      className="absolute"
      style={{
        top: position.startsWith("t") ? 12 : "auto",
        bottom: position.startsWith("b") ? 12 : "auto",
        left: position.endsWith("l") ? 12 : "auto",
        right: position.endsWith("r") ? 12 : "auto",
        width: size + 4,
        height: size + 4,
        borderTop: (isTL || isTR) ? `${strokeW}px solid ${color}` : "none",
        borderBottom: (isBL || position === "br") ? `${strokeW}px solid ${color}` : "none",
        borderLeft: (isTL || isBL) ? `${strokeW}px solid ${color}` : "none",
        borderRight: (isTR || position === "br") ? `${strokeW}px solid ${color}` : "none",
      }}
    />
  );
}

function SmartMap({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden shadow-2xl"
      style={{ minHeight: 480, background: "linear-gradient(135deg, #0a1628 0%, #0f2040 40%, #0d1f3c 70%, #111827 100%)" }}
      data-testid="section-tourist-map-smart"
    >
      {/* World map image overlay */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1280px-World_map_-_low_resolution.svg.png"
        alt="World map"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "grayscale(1) brightness(0.15) sepia(0.6) hue-rotate(190deg)", opacity: 0.7, mixBlendMode: "screen" }}
        draggable={false}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Corner brackets */}
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 z-10 pointer-events-none"
        style={{ height: 2, background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.6), rgba(34,211,238,0.9), rgba(34,211,238,0.6), transparent)" }}
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Scan glow */}
      <motion.div
        className="absolute left-0 right-0 z-10 pointer-events-none"
        style={{ height: 40, background: "linear-gradient(180deg, transparent, rgba(34,211,238,0.04), transparent)" }}
        animate={{ top: ["8%", "88%", "8%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-20 grid md:grid-cols-5 min-h-[480px]">
        {/* Left panel */}
        <div className="md:col-span-2 flex flex-col justify-center p-8 md:pr-4">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.6 }}>
            {/* Online badge */}
            <div className="inline-flex items-center gap-2 border border-green-500/40 bg-green-500/10 text-green-400 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              HỆ THỐNG TRỰC TUYẾN
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-1">Bản Đồ</h2>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ background: "linear-gradient(90deg, #22d3ee, #06b6d4, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Thông Minh
            </h2>

            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Khám phá điểm đến, tìm đường đi và theo dõi hành trình của bạn trên bản đồ tương tác thời gian thực.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mb-7">
              {features.map((f) => (
                <div key={f.label} className="flex items-center gap-1.5 bg-white/8 border border-white/10 text-white/70 text-xs px-3 py-1.5 rounded-full">
                  <f.icon size={11} className="text-cyan-400" />
                  {f.label}
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(34,211,238,0.4)" }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-semibold text-sm w-fit transition-all"
              style={{ background: "linear-gradient(135deg, #0891b2, #0284c7)" }}
              data-testid="button-smart-map-open"
            >
              <MapPin size={16} />Mở bản đồ
              <span className="ml-1 text-white/60">→</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Right: map dots + stats */}
        <div className="md:col-span-3 relative flex items-center p-6">
          {/* Dots */}
          <div className="absolute inset-0">
            {smartDots.map((dot, i) => (
              <motion.div
                key={dot.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: i * 0.15 + 0.5, type: "spring", stiffness: 260 }}
                className="absolute"
                style={{ left: `${dot.x}%`, top: `${dot.y}%`, transform: "translate(-50%, -50%)" }}
              >
                {/* Ripple rings */}
                <motion.div
                  className="absolute rounded-full"
                  style={{ border: `1.5px solid ${dot.color}`, width: dot.size * 3.5, height: dot.size * 3.5, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                  animate={{ scale: [0.6, 1.4, 0.6], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35 }}
                />
                <motion.div
                  className="absolute rounded-full"
                  style={{ border: `1px solid ${dot.color}`, width: dot.size * 2.2, height: dot.size * 2.2, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                  animate={{ scale: [0.8, 1.6, 0.8], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35 + 0.4 }}
                />
                {/* Core dot */}
                <div
                  className="relative rounded-full shadow-lg"
                  style={{ width: dot.size, height: dot.size, background: dot.color, boxShadow: `0 0 ${dot.size * 1.5}px ${dot.color}80` }}
                />
                {/* Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap">
                  <span className="text-white/75 text-[9px] font-medium bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {dot.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats grid — positioned bottom-right */}
          <div className="absolute bottom-5 right-5 grid grid-cols-2 gap-2 z-10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.7, duration: 0.4 }}
                className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-center min-w-[110px]"
              >
                <p className="text-white font-bold text-xl leading-tight">{s.value}</p>
                <p className="text-white/50 text-[10px] mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-1.5 z-20">
        <Cpu size={11} className="text-cyan-400" />
        <span className="text-white/60 text-xs">AI-powered • Cập nhật thời gian thực</span>
      </div>
    </motion.div>
  );
}

function WorldMapBg() {
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1280px-World_map_-_low_resolution.svg.png"
      alt="World map"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ filter: "grayscale(1) invert(1) brightness(0.18) sepia(0.4) hue-rotate(180deg)", opacity: 0.55, mixBlendMode: "screen" }}
      draggable={false}
    />
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
      <WorldMapBg />
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [mapMode, setMapMode] = useState<"modern" | "smart">("modern");

  return (
    <section className="py-16 px-4" id="map" ref={ref} data-testid="section-tourist-map">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Tourist Map</h2>
            <p className="text-muted-foreground text-sm mt-1">Khám phá bản đồ du lịch Đà Nẵng</p>
          </div>
          <div className="flex items-center gap-1.5 bg-muted rounded-full p-1">
            <button
              onClick={() => setMapMode("modern")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${mapMode === "modern" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
              data-testid="button-map-mode-modern"
            >
              Bản đồ
            </button>
            <button
              onClick={() => setMapMode("smart")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${mapMode === "smart" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
              data-testid="button-map-mode-smart"
            >
              Thông minh
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {mapMode === "modern" ? (
            <motion.div key="modern" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
              <ModernMap isInView={isInView} />
            </motion.div>
          ) : (
            <motion.div key="smart" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
              <SmartMap isInView={isInView} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
