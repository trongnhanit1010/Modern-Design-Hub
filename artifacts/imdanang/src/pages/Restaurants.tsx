import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, Clock, Heart, Search, Filter,
  SlidersHorizontal, X, ChevronRight, Loader2,
  UtensilsCrossed, Fish, Flame, Leaf, Beef, Coffee, TrendingUp, Award, Users,
} from "lucide-react";

const restaurants = [
  { id: 1, name: "Madame Lân Restaurant", cuisine: "vietnamese", area: "Đà Nẵng", rating: 4.8, reviews: 3240, price: "150K–400K", time: "10:00–22:00", location: "Bạch Đằng, Hải Châu", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&auto=format&fit=crop", tag: "Đặc sản", tagColor: "from-orange-500 to-red-500" },
  { id: 2, name: "Bé Mặn Seafood", cuisine: "seafood", area: "Đà Nẵng", rating: 4.9, reviews: 5410, price: "200K–800K", time: "09:00–23:00", location: "Mỹ Khê, Sơn Trà", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&auto=format&fit=crop", tag: "Tươi sống", tagColor: "from-blue-500 to-cyan-600" },
  { id: 3, name: "Waterfront Restaurant", cuisine: "international", area: "Đà Nẵng", rating: 4.7, reviews: 2890, price: "300K–1.2M", time: "11:00–22:30", location: "Trần Hưng Đạo, Sơn Trà", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&auto=format&fit=crop", tag: "Fine Dining", tagColor: "from-violet-500 to-purple-600" },
  { id: 4, name: "Trúc Lâm Viên", cuisine: "vegan", area: "Đà Nẵng", rating: 4.7, reviews: 1820, price: "80K–200K", time: "07:00–21:00", location: "Ngô Quyền, Sơn Trà", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&auto=format&fit=crop", tag: "Thuần Chay", tagColor: "from-green-500 to-emerald-600" },
  { id: 5, name: "Grill & Chill BBQ", cuisine: "bbq", area: "Đà Nẵng", rating: 4.6, reviews: 2100, price: "150K–500K", time: "16:00–24:00", location: "Nguyễn Văn Linh", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=700&auto=format&fit=crop", tag: "Nướng", tagColor: "from-amber-500 to-orange-600" },
  { id: 6, name: "Cong Caphe", cuisine: "cafe", area: "Đà Nẵng", rating: 4.8, reviews: 6730, price: "35K–90K", time: "07:00–23:00", location: "Bạch Đằng, Hải Châu", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700&auto=format&fit=crop", tag: "View Sông Hàn", tagColor: "from-teal-500 to-cyan-500" },
  { id: 7, name: "Nhà Hàng Trần", cuisine: "seafood", area: "Đà Nẵng", rating: 4.7, reviews: 4100, price: "200K–700K", time: "10:00–23:00", location: "Hoàng Sa, Sơn Trà", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&auto=format&fit=crop", tag: "Hải Sản", tagColor: "from-sky-500 to-blue-600" },
  { id: 8, name: "The Deck House Hội An", cuisine: "international", area: "Hội An", rating: 4.8, reviews: 3250, price: "200K–600K", time: "10:00–22:00", location: "Nguyễn Phúc Tần, Hội An", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&auto=format&fit=crop", tag: "Riverside", tagColor: "from-emerald-500 to-teal-600" },
  { id: 9, name: "Mì Quảng 1A", cuisine: "vietnamese", area: "Đà Nẵng", rating: 4.8, reviews: 7200, price: "35K–60K", time: "06:00–14:00", location: "Hải Phòng, Hải Châu", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=700&auto=format&fit=crop", tag: "Đặc sản số 1", tagColor: "from-rose-500 to-pink-600" },
  { id: 10, name: "Morning Glory Hội An", cuisine: "vietnamese", area: "Hội An", rating: 4.9, reviews: 9800, price: "120K–350K", time: "09:00–22:00", location: "Nguyễn Huệ, Hội An", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop", tag: "Top Rated", tagColor: "from-amber-500 to-yellow-500" },
  { id: 11, name: "Nhà Hàng Làng Chài", cuisine: "seafood", area: "Hội An", rating: 4.6, reviews: 2100, price: "150K–500K", time: "10:00–22:00", location: "Cẩm Nam, Hội An", image: "https://images.unsplash.com/photo-1559595500-e15296152eb3?w=700&auto=format&fit=crop", tag: "Truyền Thống", tagColor: "from-indigo-500 to-blue-600" },
  { id: 12, name: "Souls Kitchen", cuisine: "international", area: "Đà Nẵng", rating: 4.7, reviews: 1580, price: "180K–500K", time: "12:00–23:00", location: "Mỹ Khê, Sơn Trà", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop", tag: "Trendy", tagColor: "from-fuchsia-500 to-purple-600" },
];

const heroImages = [
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop",
];
const stats = [
  { icon: UtensilsCrossed, label: "Nhà hàng", value: "240+" },
  { icon: Award, label: "Đánh giá TB", value: "4.7" },
  { icon: Users, label: "Lượt đánh giá", value: "48K+" },
];
const cuisineOptions = [
  { value: "seafood",       label: "Hải sản",     icon: Fish },
  { value: "vietnamese",    label: "Việt Nam",    icon: Flame },
  { value: "international", label: "Quốc tế",     icon: UtensilsCrossed },
  { value: "vegan",         label: "Chay",        icon: Leaf },
  { value: "bbq",           label: "Nướng",       icon: Beef },
  { value: "cafe",          label: "Cà phê",      icon: Coffee },
];
const areaOptions = ["Đà Nẵng", "Hội An"];
const sortOptions = [
  { label: "Phổ biến nhất", value: "popular" },
  { label: "Đánh giá cao", value: "rating" },
  { label: "Tên A-Z", value: "name" },
];

export default function Restaurants() {
  const [search, setSearch]           = useState("");
  const [selCuisines, setSelCuisines] = useState<string[]>([]);
  const [selAreas, setSelAreas]       = useState<string[]>([]);
  const [sort, setSort]               = useState("popular");
  const [liked, setLiked]             = useState<number[]>([]);
  const [showFilter, setShowFilter]   = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore]   = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const toggleCuisine = (v: string) => setSelCuisines(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleArea    = (v: string) => setSelAreas(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleLike    = (id: number) => setLiked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => { setVisibleCount(v => v + 3); setLoadingMore(false); }, 800);
  };

  let filtered = restaurants.filter(r => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.location.toLowerCase().includes(search.toLowerCase())) return false;
    if (selCuisines.length && !selCuisines.includes(r.cuisine)) return false;
    if (selAreas.length && !selAreas.includes(r.area)) return false;
    return true;
  });
  if (sort === "popular") filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
  else if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sort === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const visible   = filtered.slice(0, visibleCount);
  const hasMore   = visibleCount < filtered.length;
  const remaining = filtered.length - visibleCount;
  const activeFilterCount = selCuisines.length + selAreas.length;

  return (
    <div className="min-h-screen bg-gray-50" ref={ref}>

      {/* ── Hero ── Plate & Steam Culinary ── */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#fff7ed 0%,#ffedd5 60%,#fed7aa 100%)" }}>
        {/* Diagonal stripes */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "repeating-linear-gradient(45deg, #ea580c 0 2px, transparent 2px 14px)"
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
          <div className="grid lg:grid-cols-[1fr,1.1fr] gap-8 items-center">
            {/* LEFT: Title + chalkboard search */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-orange-600 text-white text-xs font-bold shadow-md">
                <Flame size={13} />
                ĐẶC SẢN XỨ QUẢNG · 240+ QUÁN
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-3 text-orange-950">
                <span className="block">Ngon Khó</span>
                <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-rose-600">
                  Cưỡng Lại
                </span>
              </h1>
              <p className="text-orange-900/70 text-base max-w-md leading-relaxed mb-6">
                Hải sản nóng hổi vừa lên đĩa, fine-dining bên sông Hàn, quán cũ trăm năm trong phố cổ.
              </p>

              {/* Chip stats */}
              <div className="flex flex-wrap gap-2 mb-6">
                {stats.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border-2 border-orange-200 shadow-sm">
                    <Icon size={13} className="text-orange-600" />
                    <span className="text-orange-950 font-black text-sm">{value}</span>
                    <span className="text-orange-700/60 text-[11px]">{label}</span>
                  </div>
                ))}
              </div>

              {/* Chalkboard menu search */}
              <div className="rounded-2xl p-3 shadow-2xl border-4 border-orange-900" style={{ background: "linear-gradient(135deg,#1c1917,#292524)" }}>
                <div className="text-orange-300 text-[10px] font-black tracking-widest mb-2 flex items-center gap-1.5">
                  <UtensilsCrossed size={11} /> THỰC ĐƠN HÔM NAY
                </div>
                <div className="flex items-center gap-2 bg-orange-50 rounded-xl p-1.5">
                  <div className="flex items-center gap-2 flex-1 px-3 py-1.5">
                    <Search size={16} className="text-orange-700" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm món, quán, khu vực..." className="bg-transparent text-orange-950 placeholder:text-orange-600/40 text-sm flex-1 focus:outline-none" />
                  </div>
                  <button className="bg-gradient-to-br from-orange-500 to-red-600 text-white font-bold px-4 py-2.5 rounded-lg text-sm flex items-center gap-1">
                    Đặt bàn <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Plate with orbit icons */}
            <div className="relative h-[320px] lg:h-[400px] hidden md:flex items-center justify-center">
              {/* Steam */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 rounded-full bg-orange-300/40 blur-sm"
                  style={{ left: `${44 + i * 6}%`, height: 60 }}
                  animate={{ y: [-20, -120], opacity: [0.6, 0] }}
                  transition={{ duration: 2.4, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
                />
              ))}
              {/* Plate */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute w-72 h-72 lg:w-80 lg:h-80 rounded-full border-[10px] border-white shadow-2xl overflow-hidden"
                style={{ boxShadow: "0 30px 60px rgba(234,88,12,0.3), inset 0 0 0 4px #f97316" }}
              >
                <img src={heroImages[0]} className="w-full h-full object-cover" alt="" />
              </motion.div>
              {/* Orbiting icons */}
              {[
                { Icon: Fish, angle: 0, color: "bg-sky-500" },
                { Icon: Beef, angle: 72, color: "bg-red-500" },
                { Icon: Coffee, angle: 144, color: "bg-amber-700" },
                { Icon: Leaf, angle: 216, color: "bg-emerald-500" },
                { Icon: Flame, angle: 288, color: "bg-orange-500" },
              ].map(({ Icon, angle, color }, i) => {
                const r = 180;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, y: [y, y - 8, y] }}
                    transition={{ scale: { delay: 0.4 + i * 0.1 }, y: { duration: 2.2 + i * 0.3, repeat: Infinity, ease: "easeInOut" } }}
                    className={`absolute w-12 h-12 rounded-2xl ${color} shadow-xl flex items-center justify-center text-white border-4 border-white`}
                    style={{ left: `calc(50% + ${x}px - 24px)`, top: `calc(50% + ${y}px - 24px)` }}
                  >
                    <Icon size={18} />
                  </motion.div>
                );
              })}
              {/* Center chef hat */}
              <div className="absolute top-3 right-3 w-16 h-16 rounded-full bg-white shadow-xl flex flex-col items-center justify-center border-2 border-orange-300">
                <Award size={20} className="text-orange-600" />
                <span className="text-[8px] text-orange-700 font-black">CHEF'S</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-3 shadow-xl border border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 flex-1 min-w-48">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm nhà hàng..." className="bg-transparent text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none flex-1" />
            {search && <button onClick={() => setSearch("")}><X size={13} className="text-gray-400" /></button>}
          </div>
          <button onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all border ${showFilter ? "bg-orange-500 border-orange-400 text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            <SlidersHorizontal size={15} />Bộ lọc
            {activeFilterCount > 0 && <span className="w-5 h-5 bg-orange-500 text-white rounded-full text-xs font-bold flex items-center justify-center">{activeFilterCount}</span>}
          </button>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-500 text-sm">
            <Filter size={14} />
            <select value={sort} onChange={e => setSort(e.target.value)} className="bg-transparent text-gray-700 focus:outline-none cursor-pointer">
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </motion.div>

        <AnimatePresence>
          {showFilter && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden mb-5">
              <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex flex-wrap items-center gap-x-6 gap-y-4 shadow-sm">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-gray-400 text-xs font-medium shrink-0">Ẩm thực</span>
                  {cuisineOptions.map(c => (
                    <button key={c.value} onClick={() => toggleCuisine(c.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selCuisines.includes(c.value) ? "bg-orange-500 border-orange-500 text-white" : "border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-600"}`}>
                      <c.icon size={11} />{c.label}
                    </button>
                  ))}
                </div>
                <div className="w-px h-5 bg-gray-200 hidden md:block" />
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-gray-400 text-xs font-medium shrink-0">Khu vực</span>
                  {areaOptions.map(a => (
                    <button key={a} onClick={() => toggleArea(a)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selAreas.includes(a) ? "bg-teal-500 border-teal-500 text-white" : "border-gray-200 text-gray-500 hover:border-teal-300 hover:text-teal-600"}`}>
                      {a}
                    </button>
                  ))}
                </div>
                {activeFilterCount > 0 && (
                  <>
                    <div className="w-px h-5 bg-gray-200 hidden md:block" />
                    <button onClick={() => { setSelCuisines([]); setSelAreas([]); }} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors">
                      <X size={12} />Xóa
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mb-5">
          <p className="text-gray-500 text-sm"><span className="text-gray-900 font-semibold">{filtered.length}</span> nhà hàng phù hợp</p>
          {activeFilterCount > 0 && (
            <button onClick={() => { setSelCuisines([]); setSelAreas([]); }} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors">
              <X size={12} />Xóa bộ lọc
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-6">
          <AnimatePresence>
            {visible.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.07, duration: 0.45 }} whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="relative h-52 overflow-hidden">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${r.tagColor}`}>{r.tag}</div>
                  <button onClick={e => { e.stopPropagation(); toggleLike(r.id); }} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm">
                    <Heart size={15} className={liked.includes(r.id) ? "text-rose-500 fill-rose-500" : "text-gray-500"} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-gray-900 font-bold text-base leading-tight">{r.name}</h3>
                    <div className="shrink-0 flex items-center gap-1 bg-amber-50 text-amber-600 rounded-lg px-2 py-0.5 border border-amber-100">
                      <Star size={11} className="fill-amber-500 text-amber-500" />
                      <span className="text-xs font-bold">{r.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                    <MapPin size={11} className="shrink-0 text-gray-400" /><span>{r.location}</span>
                    <span className="mx-1">·</span><span>{r.reviews.toLocaleString()} đánh giá</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1"><Clock size={11} className="text-gray-400" />{r.time}</div>
                    <div className="flex items-center gap-1"><TrendingUp size={11} className="text-orange-400" />{r.price}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{r.area}</span>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-orange-100">
                      Xem menu <ChevronRight size={14} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <div className="flex flex-col items-center gap-3 pb-12">
            <p className="text-gray-400 text-sm">
              Đang hiển thị <span className="text-gray-700 font-semibold">{visible.length}</span> / <span className="text-gray-700 font-semibold">{filtered.length}</span> nhà hàng
              {" — "}còn <span className="text-orange-600 font-semibold">{remaining}</span> chưa hiển thị
            </p>
            <motion.button whileHover={{ scale: loadingMore ? 1 : 1.04 }} whileTap={{ scale: loadingMore ? 1 : 0.97 }}
              onClick={handleLoadMore} disabled={loadingMore}
              className="flex items-center gap-2.5 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-2xl shadow-lg shadow-orange-200 hover:from-orange-400 hover:to-red-400 transition-all text-sm disabled:opacity-80 disabled:cursor-not-allowed min-w-52 justify-center">
              <AnimatePresence mode="wait">
                {loadingMore
                  ? <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" />Đang tải...</motion.span>
                  : <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">Xem thêm {remaining} nhà hàng</motion.span>}
              </AnimatePresence>
            </motion.button>
          </div>
        )}
        {!hasMore && filtered.length > 0 && (
          <div className="pb-12 text-center text-gray-400 text-sm">Đã hiển thị tất cả <span className="text-gray-600 font-semibold">{filtered.length}</span> nhà hàng</div>
        )}
        {filtered.length === 0 && (
          <div className="pb-12 flex flex-col items-center justify-center py-16 text-center">
            <UtensilsCrossed size={40} className="text-gray-300 mb-3" />
            <p className="text-gray-600 font-medium">Không tìm thấy nhà hàng phù hợp</p>
            <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>
    </div>
  );
}
