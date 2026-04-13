import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  MapPin, Hotel, UtensilsCrossed, Camera, Navigation, Star, Clock, X,
  Search, SlidersHorizontal, Compass, Layers, ZoomIn, ZoomOut, Map
} from "lucide-react";

const allListings = [
  {
    id: 1,
    x: 18, y: 38,
    name: "Bãi biển Mỹ Khê",
    type: "beach",
    typeLabel: "Bãi biển",
    icon: Navigation,
    color: "bg-sky-500",
    gradientFrom: "from-sky-500",
    gradientTo: "to-cyan-500",
    accent: "#0ea5e9",
    desc: "Bãi biển đẹp nhất hành tinh, cát trắng mịn dài 9km",
    address: "Phước Mỹ, Sơn Trà, Đà Nẵng",
    rating: 4.9,
    reviews: 8412,
    hours: "Mở cửa 24/7",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop",
  },
  {
    id: 2,
    x: 45, y: 12,
    name: "Bà Nà Hills & Cầu Vàng",
    type: "attraction",
    typeLabel: "Địa điểm",
    icon: Camera,
    color: "bg-violet-500",
    gradientFrom: "from-violet-500",
    gradientTo: "to-purple-600",
    accent: "#8b5cf6",
    desc: "Thiên đường trên mây, cầu Vàng nổi tiếng thế giới",
    address: "Hòa Ninh, Hòa Vang, Đà Nẵng",
    rating: 4.9,
    reviews: 15230,
    hours: "7:00 – 22:00",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&auto=format&fit=crop",
  },
  {
    id: 3,
    x: 88, y: 55,
    name: "Cầu Rồng",
    type: "attraction",
    typeLabel: "Biểu tượng",
    icon: MapPin,
    color: "bg-amber-500",
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-500",
    accent: "#f59e0b",
    desc: "Biểu tượng của Đà Nẵng, phun lửa mỗi cuối tuần",
    address: "Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
    rating: 4.8,
    reviews: 12340,
    hours: "Phun lửa: 21:00 T7, CN",
    img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=300&auto=format&fit=crop",
  },
  {
    id: 4,
    x: 14, y: 75,
    name: "Crowne Plaza Resort",
    type: "hotel",
    typeLabel: "Khách sạn",
    icon: Hotel,
    color: "bg-teal-500",
    gradientFrom: "from-teal-500",
    gradientTo: "to-emerald-500",
    accent: "#14b8a6",
    desc: "Resort 5 sao sang trọng bậc nhất Đà Nẵng",
    address: "200 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng",
    rating: 4.9,
    reviews: 1240,
    hours: "Check-in: 14:00",
    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=300&auto=format&fit=crop",
  },
  {
    id: 5,
    x: 82, y: 28,
    name: "Nhà hàng Trần",
    type: "restaurant",
    typeLabel: "Ẩm thực",
    icon: UtensilsCrossed,
    color: "bg-orange-500",
    gradientFrom: "from-orange-500",
    gradientTo: "to-red-500",
    accent: "#f97316",
    desc: "Hải sản tươi sống ngon nhất Đà Nẵng, view biển tuyệt đẹp",
    address: "Hoàng Sa, Sơn Trà, Đà Nẵng",
    rating: 4.7,
    reviews: 2890,
    hours: "10:00 – 23:00",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&auto=format&fit=crop",
  },
  {
    id: 6,
    x: 52, y: 88,
    name: "Phố cổ Hội An",
    type: "attraction",
    typeLabel: "Di sản",
    icon: Compass,
    color: "bg-rose-500",
    gradientFrom: "from-rose-500",
    gradientTo: "to-pink-600",
    accent: "#f43f5e",
    desc: "Di sản văn hóa UNESCO, phố cổ đèn lồng rực rỡ",
    address: "Hội An, Quảng Nam",
    rating: 4.9,
    reviews: 22100,
    hours: "Mở cửa 24/7",
    img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=300&auto=format&fit=crop",
  },
  {
    id: 7,
    x: 35, y: 60,
    name: "Vinpearl Resort & Spa",
    type: "hotel",
    typeLabel: "Khách sạn",
    icon: Hotel,
    color: "bg-indigo-500",
    gradientFrom: "from-indigo-500",
    gradientTo: "to-blue-600",
    accent: "#6366f1",
    desc: "Resort cao cấp với hồ bơi vô cực nhìn ra biển",
    address: "Bãi Bắc, Sơn Trà, Đà Nẵng",
    rating: 4.8,
    reviews: 1923,
    hours: "Check-in: 14:00",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&auto=format&fit=crop",
  },
  {
    id: 8,
    x: 68, y: 72,
    name: "Nhà hàng Mỹ Sơn",
    type: "restaurant",
    typeLabel: "Ẩm thực",
    icon: UtensilsCrossed,
    color: "bg-yellow-600",
    gradientFrom: "from-yellow-500",
    gradientTo: "to-amber-600",
    accent: "#ca8a04",
    desc: "Ẩm thực Việt Nam truyền thống giữa lòng thành phố",
    address: "Lê Duẩn, Hải Châu, Đà Nẵng",
    rating: 4.6,
    reviews: 1580,
    hours: "7:00 – 22:00",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&auto=format&fit=crop",
  },
];

const filterTabs = [
  { value: "all", label: "Tất cả", icon: Map },
  { value: "hotel", label: "Khách sạn", icon: Hotel },
  { value: "attraction", label: "Địa điểm", icon: Camera },
  { value: "restaurant", label: "Ẩm thực", icon: UtensilsCrossed },
  { value: "beach", label: "Bãi biển", icon: Navigation },
];

export default function TouristMapPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedPin, setSelectedPin] = useState<number | null>(null);
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = allListings.filter((l) => {
    if (activeFilter !== "all" && l.type !== activeFilter) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.address.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selectedLocation = selectedPin !== null ? allListings.find((l) => l.id === selectedPin) : null;

  return (
    <div className="flex h-[calc(100vh-56px)] bg-gray-950 overflow-hidden" ref={ref} data-testid="page-tourist-map">
      <motion.aside
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-80 shrink-0 flex flex-col bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 border-r border-white/10 overflow-hidden"
      >
        <div className="p-4 border-b border-white/10 bg-gradient-to-br from-blue-600/20 via-cyan-600/10 to-transparent">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Map size={14} className="text-white" />
            </div>
            <h1 className="text-white font-bold text-base">Tourist Map</h1>
          </div>
          <p className="text-gray-400 text-xs">Khám phá {filtered.length} địa điểm nổi bật</p>
        </div>

        <div className="p-3 border-b border-white/8">
          <div className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm rounded-xl px-3 py-2.5 border border-white/8">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm địa điểm..."
              className="bg-transparent text-white text-sm placeholder:text-gray-500 focus:outline-none flex-1"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-gray-500 hover:text-white transition-colors">
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        <div className="p-3 border-b border-white/8">
          <div className="flex gap-1 overflow-x-auto scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeFilter === tab.value
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <tab.icon size={12} />{tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-none">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500 text-sm">
              <MapPin size={24} className="mb-2 opacity-30" />
              Không có kết quả
            </div>
          ) : (
            <div className="p-2 space-y-1.5">
              {filtered.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedPin(selectedPin === item.id ? null : item.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all group ${
                    selectedPin === item.id
                      ? "bg-gradient-to-r from-blue-600/30 to-cyan-600/20 border border-blue-500/30"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                  data-testid={`sidebar-listing-${item.id}`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${item.color} rounded-full flex items-center justify-center border-2 border-gray-900`}>
                      <item.icon size={9} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm leading-tight mb-0.5 truncate">{item.name}</p>
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-gradient-to-r ${item.gradientFrom} ${item.gradientTo} text-white`}>
                        {item.typeLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-[10px]">
                      <MapPin size={9} className="shrink-0" />
                      <span className="truncate">{item.address}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-0.5">
                        <Star size={9} className="text-amber-400 fill-amber-400" />
                        <span className="text-amber-400 text-[10px] font-bold">{item.rating}</span>
                      </div>
                      <span className="text-gray-600 text-[10px]">({item.reviews.toLocaleString()})</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </motion.aside>

      <div className="flex-1 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, #0c1a2e 0%, #0d2a4a 25%, #0a2535 55%, #081828 100%)" }}
        />

        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 20% 70%, rgba(6,182,212,0.12) 0%, transparent 45%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.1) 0%, transparent 40%), radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.06) 0%, transparent 60%)",
          }}
        />

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1280px-World_map_-_low_resolution.svg.png"
          alt="map"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(1) invert(1) brightness(0.09) sepia(0.5) hue-rotate(185deg)", opacity: 0.5, mixBlendMode: "screen" }}
          draggable={false}
        />

        <div className="absolute inset-0">
          {filtered.map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: i * 0.1 + 0.3, type: "spring", stiffness: 300 }}
              className="absolute cursor-pointer"
              style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: "translate(-50%, -50%)" }}
              onClick={() => setSelectedPin(selectedPin === loc.id ? null : loc.id)}
              onMouseEnter={() => setHoveredPin(loc.id)}
              onMouseLeave={() => setHoveredPin(null)}
              data-testid={`map-pin-${loc.id}`}
            >
              <div className="relative">
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${loc.accent}60, transparent)`, inset: -12 }}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0.1, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.35 }}
                />
                <motion.div
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.92 }}
                  className={`relative z-10 w-12 h-12 bg-gradient-to-br ${loc.gradientFrom} ${loc.gradientTo} rounded-2xl flex items-center justify-center shadow-2xl border-2 ${selectedPin === loc.id ? "border-white scale-110" : "border-white/40"} transition-all`}
                  style={{ boxShadow: selectedPin === loc.id ? `0 0 24px ${loc.accent}80` : undefined }}
                >
                  <loc.icon size={18} className="text-white" />
                </motion.div>
                <AnimatePresence>
                  {(hoveredPin === loc.id || selectedPin === loc.id) && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-30 pointer-events-none"
                    >
                      <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl p-3.5 shadow-2xl border border-white/15 w-52">
                        <img src={loc.img} alt={loc.name} className="w-full h-24 object-cover rounded-xl mb-2.5" />
                        <div className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${loc.gradientFrom} ${loc.gradientTo} text-white mb-1.5`}>{loc.typeLabel}</div>
                        <h4 className="text-white text-sm font-bold leading-snug mb-1">{loc.name}</h4>
                        <p className="text-white/55 text-[10px] leading-relaxed mb-2">{loc.desc}</p>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, s) => (
                            <Star key={s} size={9} className={s < Math.round(loc.rating) ? "text-amber-400 fill-amber-400" : "text-white/20"} />
                          ))}
                          <span className="text-white/50 text-[10px] ml-1">{loc.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/40 text-[10px]">
                          <Clock size={9} />{loc.hours}
                        </div>
                      </div>
                      <div className="w-3 h-3 bg-gray-900/95 rotate-45 mx-auto -mt-1.5 border-r border-b border-white/10" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button className="w-9 h-9 bg-gray-900/80 backdrop-blur-sm border border-white/15 rounded-xl flex items-center justify-center text-gray-300 hover:bg-gray-800 hover:text-white transition-colors shadow-lg">
            <ZoomIn size={16} />
          </button>
          <button className="w-9 h-9 bg-gray-900/80 backdrop-blur-sm border border-white/15 rounded-xl flex items-center justify-center text-gray-300 hover:bg-gray-800 hover:text-white transition-colors shadow-lg">
            <ZoomOut size={16} />
          </button>
          <button className="w-9 h-9 bg-gray-900/80 backdrop-blur-sm border border-white/15 rounded-xl flex items-center justify-center text-gray-300 hover:bg-gray-800 hover:text-white transition-colors shadow-lg">
            <Layers size={16} />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 z-20 bg-gray-900/70 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2 border border-white/10">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white/70 text-xs">{filtered.length} địa điểm · Đà Nẵng, Việt Nam</span>
        </div>

        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              key={selectedLocation.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-4 right-4 z-30 w-72"
            >
              <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/15">
                <div className="relative h-36">
                  <img src={selectedLocation.img} alt={selectedLocation.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <button
                    onClick={() => setSelectedPin(null)}
                    className="absolute top-2 right-2 w-6 h-6 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                  >
                    <X size={12} />
                  </button>
                  <div className={`absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${selectedLocation.gradientFrom} ${selectedLocation.gradientTo} text-white`}>
                    {selectedLocation.typeLabel}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1.5">
                    <h3 className="text-white font-bold text-sm leading-tight">{selectedLocation.name}</h3>
                    <div className="flex items-center gap-0.5 shrink-0 ml-2">
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <span className="text-amber-400 text-xs font-bold">{selectedLocation.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-1.5">
                    <MapPin size={10} className="shrink-0" />
                    <span className="line-clamp-1">{selectedLocation.address}</span>
                  </div>
                  <p className="text-gray-400 text-xs mb-2 line-clamp-2 leading-relaxed">{selectedLocation.desc}</p>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                    <Clock size={10} />{selectedLocation.hours}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-2 rounded-xl text-white text-xs font-semibold bg-gradient-to-r ${selectedLocation.gradientFrom} ${selectedLocation.gradientTo} flex items-center justify-center gap-1.5`}
                  >
                    <Navigation size={12} />Chỉ đường
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-4 left-4 z-20">
          <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <MapPin size={10} className="text-white" />
              </div>
              <span className="text-white text-xs font-semibold">Đà Nẵng, Việt Nam</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              {[
                { count: "128+", label: "Khách sạn", color: "text-teal-400" },
                { count: "85+", label: "Địa điểm", color: "text-violet-400" },
                { count: "340+", label: "Nhà hàng", color: "text-orange-400" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className={`font-bold ${s.color}`}>{s.count}</p>
                  <p className="text-gray-500 text-[10px]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
