import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, Clock, Heart, Search, Filter, SlidersHorizontal, X,
  ChevronRight, Loader2, ShoppingBag, Tag, Gem, Store, Building2,
} from "lucide-react";

const markets = [
  { id: 1, name: "Chợ Hàn", type: "market", area: "Đà Nẵng", rating: 4.6, reviews: 5240, location: "Trần Phú, Hải Châu", time: "06:00–21:00", image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=700&auto=format&fit=crop", specialties: ["Mực khô", "Nem nướng", "Vải áo dài"], tag: "Iconic", tagColor: "from-pink-500 to-rose-600" },
  { id: 2, name: "Chợ Cồn", type: "market", area: "Đà Nẵng", rating: 4.5, reviews: 3120, location: "Ông Ích Khiêm, Hải Châu", time: "05:00–20:00", image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=700&auto=format&fit=crop", specialties: ["Bánh mì", "Hải sản khô", "Nước mắm Nam Ô"], tag: "Ẩm thực", tagColor: "from-orange-500 to-amber-600" },
  { id: 3, name: "Vincom Đà Nẵng", type: "mall", area: "Đà Nẵng", rating: 4.7, reviews: 8910, location: "Ngô Quyền, Sơn Trà", time: "09:30–22:00", image: "https://images.unsplash.com/photo-1519567770579-c2fc5836898d?w=700&auto=format&fit=crop", specialties: ["Zara", "H&M", "CGV Cinemas"], tag: "Hiện đại", tagColor: "from-blue-500 to-indigo-600" },
  { id: 4, name: "Làng nghề Đá Non Nước", type: "craft", area: "Đà Nẵng", rating: 4.8, reviews: 2340, location: "Ngũ Hành Sơn", time: "07:00–18:00", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=700&auto=format&fit=crop", specialties: ["Tượng đá", "Đá cẩm thạch", "Đồ trang trí"], tag: "Đặc sắc", tagColor: "from-violet-500 to-purple-600" },
  { id: 5, name: "Lotte Mart Đà Nẵng", type: "mall", area: "Đà Nẵng", rating: 4.6, reviews: 6700, location: "Nguyễn Văn Linh, Thanh Khê", time: "08:00–22:00", image: "https://images.unsplash.com/photo-1606044466411-5e9e75b31f73?w=700&auto=format&fit=crop", specialties: ["Thực phẩm Hàn", "Đồ gia đình", "Mỹ phẩm"], tag: "Mall", tagColor: "from-red-500 to-rose-600" },
  { id: 6, name: "Phố Ông Ích Khiêm", type: "street", area: "Đà Nẵng", rating: 4.4, reviews: 1890, location: "Ông Ích Khiêm, Hải Châu", time: "08:00–21:00", image: "https://images.unsplash.com/photo-1555529669-2269763671c0?w=700&auto=format&fit=crop", specialties: ["Quần áo sỉ", "Vải vóc", "Phụ kiện"], tag: "Giá tốt", tagColor: "from-green-500 to-teal-600" },
  { id: 7, name: "Chợ đêm An Thượng", type: "street", area: "Đà Nẵng", rating: 4.5, reviews: 4200, location: "An Thượng, Ngũ Hành Sơn", time: "17:00–23:00", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&auto=format&fit=crop", specialties: ["Đồ lưu niệm", "Quần áo", "Đặc sản"], tag: "Chợ đêm", tagColor: "from-indigo-500 to-blue-600" },
  { id: 8, name: "Chợ Hội An", type: "market", area: "Hội An", rating: 4.7, reviews: 6300, location: "Trần Phú, Hội An", time: "06:00–21:00", image: "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?w=700&auto=format&fit=crop", specialties: ["Đèn lồng", "Lụa Hội An", "Đồ thêu"], tag: "Di sản", tagColor: "from-amber-500 to-yellow-500" },
  { id: 9, name: "Làng lụa Hội An", type: "craft", area: "Hội An", rating: 4.8, reviews: 3100, location: "Nguyễn Duy Hiệu, Hội An", time: "08:00–18:00", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop", specialties: ["Lụa tự nhiên", "Áo dài", "Khăn lụa"], tag: "Truyền thống", tagColor: "from-fuchsia-500 to-pink-600" },
];

const heroImages = [
  "https://images.unsplash.com/photo-1555529669-2269763671c0?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519567770579-c2fc5836898d?w=800&auto=format&fit=crop",
];
const stats = [
  { icon: ShoppingBag, label: "Địa điểm", value: "335+" },
  { icon: Star, label: "Đánh giá TB", value: "4.6" },
  { icon: Gem, label: "Làng nghề", value: "12+" },
];
const typeOptions = [
  { value: "market", label: "Chợ truyền thống", icon: Store },
  { value: "mall",   label: "TTTM & Mall",      icon: Building2 },
  { value: "craft",  label: "Làng nghề",         icon: Gem },
  { value: "street", label: "Phố mua sắm",       icon: ShoppingBag },
];
const areaOptions = ["Đà Nẵng", "Hội An"];
const sortOptions = [
  { label: "Phổ biến nhất", value: "popular" },
  { label: "Đánh giá cao",  value: "rating" },
  { label: "Tên A-Z",       value: "name" },
];

export default function Shopping() {
  const [search, setSearch]         = useState("");
  const [selTypes, setSelTypes]     = useState<string[]>([]);
  const [selAreas, setSelAreas]     = useState<string[]>([]);
  const [sort, setSort]             = useState("popular");
  const [liked, setLiked]           = useState<number[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore]   = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const toggleType = (v: string) => setSelTypes(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleArea = (v: string) => setSelAreas(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleLike = (id: number) => setLiked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => { setVisibleCount(v => v + 3); setLoadingMore(false); }, 800);
  };

  let filtered = markets.filter(m => {
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.location.toLowerCase().includes(search.toLowerCase())) return false;
    if (selTypes.length && !selTypes.includes(m.type)) return false;
    if (selAreas.length && !selAreas.includes(m.area)) return false;
    return true;
  });
  if (sort === "popular") filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
  else if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sort === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const visible   = filtered.slice(0, visibleCount);
  const hasMore   = visibleCount < filtered.length;
  const remaining = filtered.length - visibleCount;
  const activeFilterCount = selTypes.length + selAreas.length;

  return (
    <div className="min-h-screen bg-gray-50" ref={ref}>

      {/* ── Hero ── */}
      <div className="relative h-[72vh] min-h-[480px] overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-3 gap-0">
          {heroImages.map((src, i) => (
            <div key={i} className="relative overflow-hidden">
              <img src={src} alt="" className="w-full h-full object-cover scale-105" style={{ filter: "brightness(0.72)" }} />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl w-full">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 rounded-full px-4 py-1.5 text-sm mb-6 shadow-lg">
              <ShoppingBag size={13} className="text-pink-400" />
              <span>335+ Địa điểm mua sắm tại Đà Nẵng &amp; Hội An</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-xl">
              Mua Sắm <span className="text-pink-400">Đà Nẵng</span><br />Chợ & TTTM
            </h1>
            <p className="text-white/75 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Từ chợ truyền thống đến trung tâm thương mại hiện đại — tìm mọi thứ bạn cần
            </p>
            <div className="flex items-center justify-center gap-6 md:gap-12">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-1">
                    <Icon size={18} className="text-pink-400" />
                  </div>
                  <span className="text-white font-bold text-xl">{value}</span>
                  <span className="text-white/60 text-xs">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      {/* ── Filter bar ── */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-3 shadow-xl border border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 flex-1 min-w-48">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm chợ, trung tâm mua sắm..." className="bg-transparent text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none flex-1" />
            {search && <button onClick={() => setSearch("")}><X size={13} className="text-gray-400" /></button>}
          </div>
          <button onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all border ${showFilter ? "bg-pink-500 border-pink-400 text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            <SlidersHorizontal size={15} />Bộ lọc
            {activeFilterCount > 0 && <span className="w-5 h-5 bg-pink-500 text-white rounded-full text-xs font-bold flex items-center justify-center">{activeFilterCount}</span>}
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
                  <span className="text-gray-400 text-xs font-medium shrink-0">Loại</span>
                  {typeOptions.map(t => (
                    <button key={t.value} onClick={() => toggleType(t.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selTypes.includes(t.value) ? "bg-pink-500 border-pink-500 text-white" : "border-gray-200 text-gray-500 hover:border-pink-300 hover:text-pink-600"}`}>
                      <t.icon size={11} />{t.label}
                    </button>
                  ))}
                </div>
                <div className="w-px h-5 bg-gray-200 hidden md:block" />
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-gray-400 text-xs font-medium shrink-0">Khu vực</span>
                  {areaOptions.map(a => (
                    <button key={a} onClick={() => toggleArea(a)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selAreas.includes(a) ? "bg-violet-500 border-violet-500 text-white" : "border-gray-200 text-gray-500 hover:border-violet-300 hover:text-violet-600"}`}>
                      {a}
                    </button>
                  ))}
                </div>
                {activeFilterCount > 0 && (
                  <>
                    <div className="w-px h-5 bg-gray-200 hidden md:block" />
                    <button onClick={() => { setSelTypes([]); setSelAreas([]); }} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors">
                      <X size={12} />Xóa
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mb-5">
          <p className="text-gray-500 text-sm"><span className="text-gray-900 font-semibold">{filtered.length}</span> địa điểm phù hợp</p>
          {activeFilterCount > 0 && (
            <button onClick={() => { setSelTypes([]); setSelAreas([]); }} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors">
              <X size={12} />Xóa bộ lọc
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-6">
          <AnimatePresence>
            {visible.map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.07, duration: 0.45 }} whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-shadow group cursor-pointer" data-testid={`card-shopping-${m.id}`}>
                <div className="relative h-52 overflow-hidden">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${m.tagColor}`}>{m.tag}</div>
                  <button onClick={e => { e.stopPropagation(); toggleLike(m.id); }} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm">
                    <Heart size={15} className={liked.includes(m.id) ? "text-rose-500 fill-rose-500" : "text-gray-500"} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-gray-900 font-bold text-base leading-tight">{m.name}</h3>
                    <div className="shrink-0 flex items-center gap-1 bg-amber-50 text-amber-600 rounded-lg px-2 py-0.5 border border-amber-100">
                      <Star size={11} className="fill-amber-500 text-amber-500" />
                      <span className="text-xs font-bold">{m.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                    <MapPin size={11} className="shrink-0 text-gray-400" /><span>{m.location}</span>
                    <span className="mx-1">·</span><span>{m.reviews.toLocaleString()} đánh giá</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                    <Clock size={11} className="text-gray-400" />{m.time}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {m.specialties.map(s => (
                      <span key={s} className="flex items-center gap-1 bg-gray-50 text-gray-500 text-xs px-2 py-0.5 rounded-full border border-gray-200">
                        <Tag size={9} />{s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{m.area}</span>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-pink-100">
                      Xem thêm <ChevronRight size={14} />
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
              Đang hiển thị <span className="text-gray-700 font-semibold">{visible.length}</span> / <span className="text-gray-700 font-semibold">{filtered.length}</span> địa điểm
              {" — "}còn <span className="text-pink-600 font-semibold">{remaining}</span> chưa hiển thị
            </p>
            <motion.button whileHover={{ scale: loadingMore ? 1 : 1.04 }} whileTap={{ scale: loadingMore ? 1 : 0.97 }}
              onClick={handleLoadMore} disabled={loadingMore}
              className="flex items-center gap-2.5 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-2xl shadow-lg shadow-pink-200 hover:from-pink-400 hover:to-rose-400 transition-all text-sm disabled:opacity-80 disabled:cursor-not-allowed min-w-52 justify-center">
              <AnimatePresence mode="wait">
                {loadingMore
                  ? <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" />Đang tải...</motion.span>
                  : <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">Xem thêm {remaining} địa điểm</motion.span>}
              </AnimatePresence>
            </motion.button>
          </div>
        )}
        {!hasMore && filtered.length > 0 && (
          <div className="pb-12 text-center text-gray-400 text-sm">Đã hiển thị tất cả <span className="text-gray-600 font-semibold">{filtered.length}</span> địa điểm</div>
        )}
        {filtered.length === 0 && (
          <div className="pb-12 flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag size={40} className="text-gray-300 mb-3" />
            <p className="text-gray-600 font-medium">Không tìm thấy địa điểm phù hợp</p>
            <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>
    </div>
  );
}
