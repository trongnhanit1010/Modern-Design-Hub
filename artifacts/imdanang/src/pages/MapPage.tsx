import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Search, Filter, Navigation, Star, X, Layers, ZoomIn, ZoomOut, ChevronUp, ChevronDown } from "lucide-react";

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
  beach: "#0ea5e9", mountain: "#22c55e", landmark: "#f59e0b",
  nature: "#10b981", heritage: "#a855f7", shopping: "#ec4899",
};
const typeLabels: Record<string, string> = {
  beach: "Bãi biển", mountain: "Núi", landmark: "Di tích",
  nature: "Thiên nhiên", heritage: "Di sản", shopping: "Mua sắm",
};
const typeTagColors: Record<string, string> = {
  beach: "bg-sky-100 text-sky-700", mountain: "bg-green-100 text-green-700",
  landmark: "bg-amber-100 text-amber-700", nature: "bg-emerald-100 text-emerald-700",
  heritage: "bg-purple-100 text-purple-700", shopping: "bg-pink-100 text-pink-700",
};

const categories = ["Tất cả", "Bãi biển", "Di tích", "Thiên nhiên", "Di sản", "Mua sắm"];

export default function MapPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [sheetOpen, setSheetOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const selectedPin = mapPins.find((p) => p.id === selected);

  const filteredPins = activeCategory === "Tất cả"
    ? mapPins
    : mapPins.filter((p) => typeLabels[p.type] === activeCategory);

  return (
    <div className="bg-white flex flex-col" ref={ref}>

      {/* ── Top bar ── */}
      <div className="relative z-20 h-14 bg-white border-b border-gray-200 flex items-center gap-2 px-3 shadow-sm shrink-0">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex-1">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input
            placeholder="Tìm địa điểm trên bản đồ..."
            className="bg-transparent text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none flex-1 min-w-0"
          />
        </div>
        <button className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-500 text-sm hover:bg-gray-100 transition-colors shrink-0">
          <Filter size={14} />
          <span className="hidden sm:inline">Lọc</span>
        </button>
        <button className="flex items-center gap-1.5 bg-blue-500 rounded-xl px-3 py-2 text-white text-sm hover:bg-blue-400 transition-colors shadow-sm shrink-0">
          <Navigation size={14} />
          <span className="hidden sm:inline">Định vị</span>
        </button>
        <button className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0">
          <Layers size={16} />
        </button>
      </div>

      {/* ── Category pills (mobile: horizontal scroll) ── */}
      <div className="bg-white border-b border-gray-100 px-3 py-2 overflow-x-auto shrink-0 z-10">
        <div className="flex gap-1.5 w-max">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                activeCategory === c
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main area: desktop = sidebar + map, mobile = map + bottom sheet ── */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Desktop sidebar */}
        <motion.div
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className="hidden lg:flex w-72 shrink-0 bg-white border-r border-gray-200 flex-col overflow-hidden shadow-sm"
        >
          <div className="flex-1 overflow-y-auto py-2">
            {filteredPins.map((pin, i) => (
              <motion.div
                key={pin.id}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(selected === pin.id ? null : pin.id)}
                className={`px-4 py-3 cursor-pointer transition-colors flex items-center gap-3 border-b border-gray-50 ${
                  selected === pin.id ? "bg-blue-50 border-l-2 border-l-blue-500" : "hover:bg-gray-50"
                }`}
              >
                <div
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: typeColors[pin.type] + "20", border: `1.5px solid ${typeColors[pin.type]}` }}
                >
                  <MapPin size={14} style={{ color: typeColors[pin.type] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-800 text-sm font-medium truncate">{pin.name}</div>
                  <div className="flex items-center gap-1 text-xs mt-0.5">
                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${typeTagColors[pin.type]}`}>
                      {typeLabels[pin.type]}
                    </span>
                    <Star size={9} className="text-amber-400 fill-amber-400 ml-1" />
                    <span className="text-amber-600 font-medium">{pin.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Map area — full width on mobile */}
        <div className="flex-1 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&auto=format&fit=crop"
            alt="Map"
            className="w-full h-full object-cover"
            style={{ filter: "saturate(1.1) brightness(1.05)" }}
          />
          <div className="absolute inset-0 bg-blue-500/5" />

          {filteredPins.map((pin, i) => (
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
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  animate={{ scale: selected === pin.id ? 1.3 : 1 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                  style={{ backgroundColor: typeColors[pin.type] }}
                >
                  <MapPin size={16} className="text-white" />
                </motion.div>
                {selected !== pin.id && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-white text-gray-800 text-xs px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-gray-200 pointer-events-none font-medium">
                    {pin.name}
                  </div>
                )}
              </div>
            </motion.button>
          ))}

          {/* Selected popup */}
          <AnimatePresence>
            {selectedPin && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="absolute bottom-24 lg:bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl border border-gray-200 shadow-2xl p-4 w-72 z-30"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-gray-900 font-bold text-base">{selectedPin.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeTagColors[selectedPin.type]}`}>
                      {typeLabels[selectedPin.type]}
                    </span>
                  </div>
                  <button onClick={() => setSelected(null)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <X size={14} className="text-gray-400" />
                  </button>
                </div>
                <p className="text-gray-500 text-sm mb-3">{selectedPin.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={13} className="text-amber-400 fill-amber-400" />
                    <span className="text-amber-600 font-bold text-sm">{selectedPin.rating}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shadow-md"
                  >
                    <Navigation size={12} />Chỉ đường
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Zoom controls */}
          <div className="absolute right-4 top-4 flex flex-col gap-2 z-20">
            <button className="w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
              <ZoomIn size={16} />
            </button>
            <button className="w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
              <ZoomOut size={16} />
            </button>
            <button className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center text-white hover:bg-blue-400 transition-colors shadow-md">
              <Navigation size={16} />
            </button>
          </div>

          {/* Mobile bottom sheet toggle */}
          <button
            onClick={() => setSheetOpen((v) => !v)}
            className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-5 py-2.5 shadow-lg text-sm font-semibold text-gray-700 z-20"
          >
            {sheetOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            {filteredPins.length} địa điểm
          </button>
        </div>

        {/* Mobile bottom sheet */}
        <AnimatePresence>
          {sheetOpen && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 36 }}
              className="lg:hidden absolute bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl shadow-2xl border-t border-gray-200"
              style={{ maxHeight: "55vh" }}
            >
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 bg-gray-200 rounded-full" />
              </div>
              <div className="px-4 pb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">{filteredPins.length} địa điểm</span>
                <button onClick={() => setSheetOpen(false)} className="p-1 rounded-lg hover:bg-gray-100">
                  <X size={16} className="text-gray-400" />
                </button>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: "calc(55vh - 70px)" }}>
                {filteredPins.map((pin, i) => (
                  <motion.div
                    key={pin.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => { setSelected(selected === pin.id ? null : pin.id); setSheetOpen(false); }}
                    className={`px-4 py-3 cursor-pointer flex items-center gap-3 border-b border-gray-50 ${
                      selected === pin.id ? "bg-blue-50" : "active:bg-gray-50"
                    }`}
                  >
                    <div
                      className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: typeColors[pin.type] + "20", border: `1.5px solid ${typeColors[pin.type]}` }}
                    >
                      <MapPin size={15} style={{ color: typeColors[pin.type] }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-800 text-sm font-semibold truncate">{pin.name}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${typeTagColors[pin.type]}`}>
                          {typeLabels[pin.type]}
                        </span>
                        <Star size={9} className="text-amber-400 fill-amber-400" />
                        <span className="text-amber-600 text-xs font-medium">{pin.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
