import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Search, Filter, Navigation, Star, ChevronRight, X, Layers, ZoomIn, ZoomOut } from "lucide-react";

const mapPins = [
  { id: 1, name: "Bãi biển Mỹ Khê", type: "beach", x: 68, y: 38, rating: 4.9, desc: "Bãi biển dài 9km" },
  { id: 2, name: "Bà Nà Hills", type: "mountain", x: 20, y: 30, rating: 4.9, desc: "Cầu Vàng nổi tiếng" },
  { id: 3, name: "Cầu Rồng", type: "landmark", x: 52, y: 48, rating: 4.8, desc: "Phun lửa cuối tuần" },
  { id: 4, name: "Ngũ Hành Sơn", type: "nature", x: 65, y: 62, rating: 4.7, desc: "Núi đá cẩm thạch" },
  { id: 5, name: "Phố Cổ Hội An", type: "heritage", x: 58, y: 88, rating: 4.9, desc: "Di sản UNESCO" },
  { id: 6, name: "Đèo Hải Vân", type: "mountain", x: 22, y: 12, rating: 4.8, desc: "Cảnh quan hùng vĩ" },
  { id: 7, name: "Sơn Trà", type: "nature", x: 82, y: 22, rating: 4.8, desc: "Rừng nguyên sinh" },
  { id: 8, name: "Chợ Hàn", type: "shopping", x: 50, y: 44, rating: 4.5, desc: "Chợ truyền thống" },
];

const typeColors: Record<string, string> = {
  beach: "#0ea5e9", mountain: "#22c55e", landmark: "#f59e0b", nature: "#10b981", heritage: "#a855f7", shopping: "#ec4899",
};
const typeLabels: Record<string, string> = {
  beach: "Bãi biển", mountain: "Núi", landmark: "Di tích", nature: "Thiên nhiên", heritage: "Di sản", shopping: "Mua sắm",
};

const categories = ["Tất cả", "Bãi biển", "Di tích", "Thiên nhiên", "Di sản", "Mua sắm"];

export default function MapPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const selectedPin = mapPins.find((p) => p.id === selected);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col" ref={ref}>
      <div className="relative h-14 bg-gray-900 border-b border-white/10 flex items-center gap-3 px-4">
        <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-3 py-2 flex-1 max-w-sm">
          <Search size={14} className="text-gray-400" />
          <input placeholder="Tìm địa điểm trên bản đồ..." className="bg-transparent text-white text-sm placeholder:text-gray-500 focus:outline-none flex-1" />
        </div>
        <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-3 py-2 text-gray-400 text-sm cursor-pointer hover:bg-gray-700 transition-colors">
          <Filter size={14} />Lọc
        </div>
        <div className="flex items-center gap-2 bg-blue-500 rounded-xl px-3 py-2 text-white text-sm cursor-pointer hover:bg-blue-400 transition-colors">
          <Navigation size={14} />Định vị
        </div>
        <div className="ml-auto flex items-center gap-1.5 p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white cursor-pointer"><Layers size={16} /></div>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 56px - 56px)" }}>
        <motion.div initial={{ x: -280 }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 200, damping: 30 }} className="w-72 shrink-0 bg-gray-900 border-r border-white/10 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-white/8">
            <div className="flex gap-1.5 flex-wrap">
              {categories.map((c) => (
                <button key={c} onClick={() => setActiveCategory(c)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${activeCategory === c ? "bg-blue-500 text-white" : "bg-white/8 text-white/50 hover:bg-white/14 hover:text-white"}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {mapPins.map((pin, i) => (
              <motion.div
                key={pin.id}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(selected === pin.id ? null : pin.id)}
                className={`px-4 py-3 cursor-pointer transition-colors flex items-center gap-3 ${selected === pin.id ? "bg-blue-500/15 border-r-2 border-blue-500" : "hover:bg-white/5"}`}
                data-testid={`map-pin-${pin.id}`}
              >
                <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: typeColors[pin.type] + "30", border: `1.5px solid ${typeColors[pin.type]}` }}>
                  <MapPin size={14} style={{ color: typeColors[pin.type] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{pin.name}</div>
                  <div className="flex items-center gap-1 text-white/40 text-xs"><span style={{ color: typeColors[pin.type] }}>{typeLabels[pin.type]}</span><span>·</span><Star size={9} className="text-amber-400 fill-amber-400" /><span className="text-amber-400">{pin.rating}</span></div>
                </div>
                <ChevronRight size={14} className="text-white/20 shrink-0" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex-1 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&auto=format&fit=crop"
            alt="Map"
            className="w-full h-full object-cover opacity-60"
            style={{ filter: "grayscale(20%) saturate(1.2)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/20 via-transparent to-gray-950/40" />

          {mapPins.map((pin, i) => (
            <motion.button
              key={pin.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 300 }}
              onClick={() => setSelected(selected === pin.id ? null : pin.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              <div className="relative">
                <motion.div whileHover={{ scale: 1.2 }} animate={{ scale: selected === pin.id ? 1.25 : 1 }} className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 border-white" style={{ backgroundColor: typeColors[pin.type] }}>
                  <MapPin size={16} className="text-white" />
                </motion.div>
                {selected !== pin.id && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-gray-900/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none">
                    {pin.name}
                  </div>
                )}
              </div>
            </motion.button>
          ))}

          <AnimatePresence>
            {selectedPin && (
              <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900/95 backdrop-blur-md rounded-2xl border border-white/15 shadow-2xl p-4 w-72">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-white font-bold text-base">{selectedPin.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: typeColors[selectedPin.type] + "25", color: typeColors[selectedPin.type] }}>{typeLabels[selectedPin.type]}</span>
                  </div>
                  <button onClick={() => setSelected(null)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"><X size={14} className="text-white/50" /></button>
                </div>
                <p className="text-white/60 text-sm mb-3">{selectedPin.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1"><Star size={13} className="text-amber-400 fill-amber-400" /><span className="text-amber-400 font-bold text-sm">{selectedPin.rating}</span></div>
                  <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                    <Navigation size={12} />Chỉ đường
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute right-4 top-4 flex flex-col gap-2">
            <button className="w-9 h-9 bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-gray-800 transition-colors"><ZoomIn size={16} /></button>
            <button className="w-9 h-9 bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-gray-800 transition-colors"><ZoomOut size={16} /></button>
            <button className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center text-white hover:bg-blue-400 transition-colors"><Navigation size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
