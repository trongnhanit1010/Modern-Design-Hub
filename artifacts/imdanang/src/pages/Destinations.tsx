import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, Heart, Search, Filter, SlidersHorizontal, X,
  ChevronRight, Loader2, Camera, Compass, Waves, Mountain, Landmark, TreePine, Clock,
} from "lucide-react";

const places = [
  { id: 1, name: "Bãi biển Mỹ Khê", category: "beach", area: "Đà Nẵng", rating: 4.9, reviews: 8412, distance: "5km", hours: "Mở cửa 24/7", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&auto=format&fit=crop", desc: "Một trong những bãi biển đẹp nhất thế giới với cát trắng mịn dài 9km", tag: "Hot", tagColor: "from-orange-500 to-red-500" },
  { id: 2, name: "Bà Nà Hills & Cầu Vàng", category: "mountain", area: "Đà Nẵng", rating: 4.9, reviews: 15230, distance: "35km", hours: "07:30–21:00", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&auto=format&fit=crop", desc: "Khu nghỉ dưỡng trên mây với cây cầu Vàng nổi tiếng thế giới", tag: "Nổi tiếng", tagColor: "from-violet-500 to-purple-600" },
  { id: 3, name: "Phố Cổ Hội An", category: "heritage", area: "Hội An", rating: 4.9, reviews: 22100, distance: "28km", hours: "Mở cửa 24/7", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=700&auto=format&fit=crop", desc: "Di sản văn hóa UNESCO với những con phố đèn lồng rực rỡ huyền ảo", tag: "UNESCO", tagColor: "from-amber-500 to-yellow-500" },
  { id: 4, name: "Ngũ Hành Sơn", category: "nature", area: "Đà Nẵng", rating: 4.7, reviews: 5642, distance: "9km", hours: "07:00–17:30", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=700&auto=format&fit=crop", desc: "Quần thể danh thắng gồm 5 ngọn núi đá cẩm thạch huyền bí", tag: "Thiên nhiên", tagColor: "from-teal-500 to-cyan-500" },
  { id: 5, name: "Đèo Hải Vân", category: "mountain", area: "Đà Nẵng", rating: 4.8, reviews: 7819, distance: "25km", hours: "Mở cửa 24/7", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&auto=format&fit=crop", desc: "Con đèo hùng vĩ với cảnh biển và rừng núi hòa quyện tuyệt đẹp", tag: "Phong cảnh", tagColor: "from-emerald-500 to-green-600" },
  { id: 6, name: "Cầu Rồng", category: "heritage", area: "Đà Nẵng", rating: 4.8, reviews: 12340, distance: "3km", hours: "Phun lửa T7–CN 21:00", image: "https://images.unsplash.com/photo-1558618047-f4e60cef3895?w=700&auto=format&fit=crop", desc: "Biểu tượng của Đà Nẵng, phun lửa và nước mỗi cuối tuần", tag: "Biểu tượng", tagColor: "from-rose-500 to-pink-600" },
  { id: 7, name: "Bán đảo Sơn Trà", category: "nature", area: "Đà Nẵng", rating: 4.8, reviews: 4230, distance: "12km", hours: "Mở cửa 24/7", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&auto=format&fit=crop", desc: "Khu bảo tồn thiên nhiên hoang sơ với voọc chà vá chân đỏ quý hiếm", tag: "Hoang dã", tagColor: "from-green-500 to-lime-600" },
  { id: 8, name: "Cù Lao Chàm", category: "beach", area: "Hội An", rating: 4.8, reviews: 6750, distance: "65km", hours: "06:00–18:00 (phà)", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=700&auto=format&fit=crop", desc: "Đảo thiên đường với làn nước trong vắt, san hô rực rỡ", tag: "Đảo ngọc", tagColor: "from-cyan-500 to-sky-600" },
  { id: 9, name: "Bảo tàng Điêu khắc Chăm", category: "heritage", area: "Đà Nẵng", rating: 4.6, reviews: 3100, distance: "4km", hours: "07:00–17:00", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=700&auto=format&fit=crop", desc: "Bảo tàng duy nhất trên thế giới trưng bày nghệ thuật điêu khắc Chăm Pa", tag: "Di sản", tagColor: "from-amber-600 to-orange-600" },
  { id: 10, name: "Biển Non Nước", category: "beach", area: "Đà Nẵng", rating: 4.7, reviews: 4500, distance: "8km", hours: "Mở cửa 24/7", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&auto=format&fit=crop", desc: "Bãi biển yên tĩnh đẹp như tranh bên chân Ngũ Hành Sơn", tag: "Yên bình", tagColor: "from-sky-500 to-blue-600" },
  { id: 11, name: "Rừng Dừa Bảy Mẫu", category: "nature", area: "Hội An", rating: 4.7, reviews: 3900, distance: "10km từ HAN", hours: "07:00–18:00", image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=700&auto=format&fit=crop", desc: "Chèo thuyền thúng qua rừng dừa nước xanh mát, trải nghiệm độc đáo", tag: "Trải nghiệm", tagColor: "from-lime-500 to-green-600" },
  { id: 12, name: "Làng Rau Trà Quế", category: "nature", area: "Hội An", rating: 4.6, reviews: 2700, distance: "4km từ HAN", hours: "06:00–18:00", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&auto=format&fit=crop", desc: "Làng rau truyền thống 400 năm nổi tiếng với các loại rau thơm Hội An", tag: "Làng nghề", tagColor: "from-emerald-500 to-teal-600" },
];

const heroImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
];
const stats = [
  { icon: Camera, label: "Địa điểm", value: "85+" },
  { icon: Star, label: "Điểm TB", value: "4.8" },
  { icon: Compass, label: "UNESCO", value: "2" },
];
const categoryOptions = [
  { value: "beach",   label: "Bãi biển",  icon: Waves },
  { value: "mountain",label: "Núi rừng",  icon: Mountain },
  { value: "heritage",label: "Di sản",    icon: Landmark },
  { value: "nature",  label: "Thiên nhiên",icon: TreePine },
];
const areaOptions = ["Đà Nẵng", "Hội An"];
const sortOptions = [
  { label: "Phổ biến nhất", value: "popular" },
  { label: "Đánh giá cao",  value: "rating" },
  { label: "Tên A-Z",       value: "name" },
];

export default function Destinations() {
  const [search, setSearch]       = useState("");
  const [selCats, setSelCats]     = useState<string[]>([]);
  const [selAreas, setSelAreas]   = useState<string[]>([]);
  const [sort, setSort]           = useState("popular");
  const [liked, setLiked]         = useState<number[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore]   = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const toggleCat  = (v: string) => setSelCats(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleArea = (v: string) => setSelAreas(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleLike = (id: number) => setLiked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => { setVisibleCount(v => v + 3); setLoadingMore(false); }, 800);
  };

  let filtered = places.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.desc.toLowerCase().includes(search.toLowerCase())) return false;
    if (selCats.length && !selCats.includes(p.category)) return false;
    if (selAreas.length && !selAreas.includes(p.area)) return false;
    return true;
  });
  if (sort === "popular") filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
  else if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sort === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const visible   = filtered.slice(0, visibleCount);
  const hasMore   = visibleCount < filtered.length;
  const remaining = filtered.length - visibleCount;
  const activeFilterCount = selCats.length + selAreas.length;

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
              <Camera size={13} className="text-teal-400" />
              <span>85+ Địa điểm tham quan tại Đà Nẵng &amp; Hội An</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-xl">
              Khám Phá <span className="text-teal-400">Đà Nẵng</span><br />& Hội An
            </h1>
            <p className="text-white/75 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Từ bãi biển cát trắng đến di sản UNESCO — khám phá những điểm đến không thể bỏ qua
            </p>
            <div className="flex items-center justify-center gap-6 md:gap-12">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-1">
                    <Icon size={18} className="text-teal-400" />
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm địa điểm..." className="bg-transparent text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none flex-1" />
            {search && <button onClick={() => setSearch("")}><X size={13} className="text-gray-400" /></button>}
          </div>
          <button onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all border ${showFilter ? "bg-teal-500 border-teal-400 text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            <SlidersHorizontal size={15} />Bộ lọc
            {activeFilterCount > 0 && <span className="w-5 h-5 bg-teal-500 text-white rounded-full text-xs font-bold flex items-center justify-center">{activeFilterCount}</span>}
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
                  {categoryOptions.map(c => (
                    <button key={c.value} onClick={() => toggleCat(c.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selCats.includes(c.value) ? "bg-teal-500 border-teal-500 text-white" : "border-gray-200 text-gray-500 hover:border-teal-300 hover:text-teal-600"}`}>
                      <c.icon size={11} />{c.label}
                    </button>
                  ))}
                </div>
                <div className="w-px h-5 bg-gray-200 hidden md:block" />
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-gray-400 text-xs font-medium shrink-0">Khu vực</span>
                  {areaOptions.map(a => (
                    <button key={a} onClick={() => toggleArea(a)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selAreas.includes(a) ? "bg-blue-500 border-blue-500 text-white" : "border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600"}`}>
                      {a}
                    </button>
                  ))}
                </div>
                {activeFilterCount > 0 && (
                  <>
                    <div className="w-px h-5 bg-gray-200 hidden md:block" />
                    <button onClick={() => { setSelCats([]); setSelAreas([]); }} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors">
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
            <button onClick={() => { setSelCats([]); setSelAreas([]); }} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors">
              <X size={12} />Xóa bộ lọc
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-6">
          <AnimatePresence>
            {visible.map((place, i) => (
              <motion.div key={place.id} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.07, duration: 0.45 }} whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="relative h-52 overflow-hidden">
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${place.tagColor}`}>{place.tag}</div>
                  <button onClick={e => { e.stopPropagation(); toggleLike(place.id); }} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm">
                    <Heart size={15} className={liked.includes(place.id) ? "text-rose-500 fill-rose-500" : "text-gray-500"} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-gray-900 font-bold text-base leading-tight">{place.name}</h3>
                    <div className="shrink-0 flex items-center gap-1 bg-amber-50 text-amber-600 rounded-lg px-2 py-0.5 border border-amber-100">
                      <Star size={11} className="fill-amber-500 text-amber-500" />
                      <span className="text-xs font-bold">{place.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">{place.desc}</p>
                  <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1"><MapPin size={11} className="text-gray-400" />{place.distance} từ TT</div>
                    <div className="flex items-center gap-1"><Clock size={11} className="text-gray-400" />{place.hours}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{place.reviews.toLocaleString()} đánh giá</span>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-teal-100">
                      Khám phá <ChevronRight size={14} />
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
              {" — "}còn <span className="text-teal-600 font-semibold">{remaining}</span> chưa hiển thị
            </p>
            <motion.button whileHover={{ scale: loadingMore ? 1 : 1.04 }} whileTap={{ scale: loadingMore ? 1 : 0.97 }}
              onClick={handleLoadMore} disabled={loadingMore}
              className="flex items-center gap-2.5 px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-2xl shadow-lg shadow-teal-200 hover:from-teal-400 hover:to-cyan-400 transition-all text-sm disabled:opacity-80 disabled:cursor-not-allowed min-w-52 justify-center">
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
            <Compass size={40} className="text-gray-300 mb-3" />
            <p className="text-gray-600 font-medium">Không tìm thấy địa điểm phù hợp</p>
            <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>
    </div>
  );
}
