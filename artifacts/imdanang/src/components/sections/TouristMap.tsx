import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Hotel, UtensilsCrossed, Camera, Compass, Navigation, Scan, Wifi, Signal } from "lucide-react";

const locations = [
  { id: 1, x: "28%", y: "35%", name: "Bãi biển Mỹ Khê", type: "Beach", icon: Navigation, color: "bg-blue-500", desc: "Bãi biển đẹp nhất hành tinh" },
  { id: 2, x: "55%", y: "25%", name: "Bà Nà Hills", type: "Attraction", icon: Camera, color: "bg-purple-500", desc: "Thiên đường trên mây" },
  { id: 3, x: "42%", y: "58%", name: "Cầu Rồng", type: "Landmark", icon: MapPin, color: "bg-amber-500", desc: "Biểu tượng Đà Nẵng" },
  { id: 4, x: "18%", y: "70%", name: "Crowne Plaza Resort", type: "Hotel", icon: Hotel, color: "bg-teal-500", desc: "Resort 5 sao tuyệt vời" },
  { id: 5, x: "75%", y: "45%", name: "Nhà hàng Hải sản", type: "Restaurant", icon: UtensilsCrossed, color: "bg-orange-500", desc: "Hải sản tươi sống nhất thành phố" },
  { id: 6, x: "60%", y: "72%", name: "Phố cổ Hội An", type: "Heritage", icon: Compass, color: "bg-rose-500", desc: "Di sản văn hóa thế giới" },
];

function ClassicMap({ isInView }: { isInView: boolean }) {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden shadow-2xl"
      style={{ minHeight: 520 }}
    >
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d2048 30%, #0a2a3a 60%, #08182e 100%)" }} />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-blue-400/10"
            style={{ width: `${(i + 1) * 120}px`, height: `${(i + 1) * 120}px`, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
            animate={{ opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}
      </div>
      <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(0, 100, 200, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 40%, rgba(0, 150, 200, 0.2) 0%, transparent 50%)" }} />

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
            <motion.div className="absolute inset-0 rounded-full opacity-60" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.5), transparent)" }} animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
            <motion.div whileHover={{ scale: 1.15 }} className={`relative z-10 w-10 h-10 ${loc.color} rounded-full flex items-center justify-center shadow-lg border-2 border-white/30`}>
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
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-full px-4 py-1.5 text-sm mb-6">
            <MapPin size={14} />Đà Nẵng, Việt Nam
          </div>
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

function TechMap({ isInView }: { isInView: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  const [scanning, setScanning] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/20"
      style={{ minHeight: 520, background: "linear-gradient(135deg, #020c1b 0%, #041429 40%, #051a2b 100%)" }}
      data-testid="section-tourist-map-tech"
    >
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "linear-gradient(rgba(0,255,200,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,200,0.4) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {scanning && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          initial={{ top: "-10%" }}
          animate={{ top: "110%" }}
          transition={{ duration: 2.5, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
        >
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" style={{ boxShadow: "0 0 12px 2px rgba(34,211,238,0.5)" }} />
        </motion.div>
      )}

      <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(34,211,238,0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(99,102,241,0.2) 0%, transparent 50%)" }} />

      <div className="absolute inset-0 p-6 md:p-8 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">LIVE MAP — ĐÀ NẴNG</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-cyan-400/60 text-xs font-mono">
              <Wifi size={12} />
              <span>CONNECTED</span>
            </div>
            <div className="flex items-center gap-1 text-cyan-400/60 text-xs font-mono">
              <Signal size={12} />
              <span>4G</span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 gap-5">
          <div className="flex-1 relative">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: i * 0.15 + 0.5, type: "spring", stiffness: 250 }}
                className="absolute cursor-pointer"
                style={{ left: loc.x, top: loc.y, transform: "translate(-50%,-50%)" }}
                onClick={() => setActive(active === loc.id ? null : loc.id)}
                data-testid={`tech-pin-${loc.id}`}
              >
                <div className="relative">
                  <motion.div
                    className="absolute -inset-2 rounded-full border border-cyan-400/40"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  />
                  <motion.div
                    className="absolute -inset-4 rounded-full border border-cyan-400/20"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 + 0.3 }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative z-10 w-8 h-8 ${active === loc.id ? "bg-cyan-400" : "bg-cyan-500/30 border border-cyan-400/60"} rounded-lg flex items-center justify-center transition-colors`}
                    style={{ boxShadow: active === loc.id ? "0 0 20px rgba(34,211,238,0.8)" : "0 0 8px rgba(34,211,238,0.3)" }}
                  >
                    <loc.icon size={14} className={active === loc.id ? "text-black" : "text-cyan-300"} />
                  </motion.div>
                  <AnimatePresence>
                    {active === loc.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 z-20"
                      >
                        <div className="bg-[#041429] border border-cyan-400/40 rounded-xl p-3 shadow-2xl" style={{ boxShadow: "0 0 20px rgba(34,211,238,0.2)" }}>
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                            <span className="text-cyan-400 text-xs font-mono">{loc.type.toUpperCase()}</span>
                          </div>
                          <h4 className="text-white text-sm font-semibold">{loc.name}</h4>
                          <p className="text-cyan-400/60 text-xs mt-1 font-mono">{loc.desc}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-cyan-400/40 text-xs font-mono">LAT: 16.047</span>
                            <span className="text-cyan-400/40 text-xs font-mono">LNG: 108.206</span>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-[#041429] border-r border-b border-cyan-400/40 rotate-45 mx-auto -mt-1" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border border-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-3"
                >
                  <Scan size={20} className="text-cyan-400/50" />
                </motion.div>
                <p className="text-cyan-400/40 text-xs font-mono">TAP PINS TO EXPLORE</p>
              </motion.div>
            </div>
          </div>

          <div className="w-52 hidden md:flex flex-col gap-3">
            <div className="border border-cyan-400/20 rounded-xl p-3" style={{ background: "rgba(4,20,41,0.8)" }}>
              <p className="text-cyan-400/60 text-xs font-mono mb-3 uppercase tracking-wide">Địa điểm nổi bật</p>
              <div className="space-y-2">
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setActive(active === loc.id ? null : loc.id)}
                    className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left transition-colors ${active === loc.id ? "bg-cyan-400/20 border border-cyan-400/30" : "hover:bg-white/5"}`}
                  >
                    <div className={`w-6 h-6 ${loc.color} rounded-md flex items-center justify-center shrink-0`}>
                      <loc.icon size={12} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-xs font-medium truncate">{loc.name}</p>
                      <p className="text-cyan-400/50 text-[10px] font-mono">{loc.type}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-cyan-400/20 rounded-xl p-3" style={{ background: "rgba(4,20,41,0.8)" }}>
              <p className="text-cyan-400/60 text-xs font-mono mb-2 uppercase tracking-wide">Thống kê</p>
              {[{ label: "HOTELS", count: "128", color: "bg-teal-500" }, { label: "RESTAURANTS", count: "340", color: "bg-orange-500" }, { label: "ATTRACTIONS", count: "85", color: "bg-purple-500" }].map((s) => (
                <div key={s.label} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 ${s.color} rounded-full`} />
                    <span className="text-cyan-400/60 text-xs font-mono">{s.label}</span>
                  </div>
                  <span className="text-white text-xs font-bold">{s.count}+</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 text-cyan-400/40 text-xs font-mono">
        <span>© imdanang MAP v2.0</span>
      </div>
      <motion.button
        onClick={() => setScanning((s) => !s)}
        className="absolute bottom-4 right-4 flex items-center gap-1.5 border border-cyan-400/30 text-cyan-400/70 hover:text-cyan-400 text-xs font-mono px-3 py-1.5 rounded-lg transition-colors"
        style={{ background: "rgba(4,20,41,0.8)" }}
        whileHover={{ boxShadow: "0 0 10px rgba(34,211,238,0.2)" }}
      >
        <Scan size={11} />
        {scanning ? "STOP SCAN" : "START SCAN"}
      </motion.button>
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
            <button
              onClick={() => setOption("A")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "A" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
              data-testid="button-map-option-a"
            >
              Classic
            </button>
            <button
              onClick={() => setOption("B")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "B" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
              data-testid="button-map-option-b"
            >
              Tech
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {option === "A" ? (
            <motion.div key="A" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ClassicMap isInView={isInView} />
            </motion.div>
          ) : (
            <motion.div key="B" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TechMap isInView={isInView} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
