import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, Heart, Search, Filter, SlidersHorizontal, X,
  ChevronRight, Loader2, Camera, Compass, Waves, Mountain, Landmark, TreePine, Clock,
} from "lucide-react";
import { places } from "@/data/destinations";

const heroImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
];
const stats = [
  { icon: Camera,  label: "Địa điểm", value: "85+" },
  { icon: Star,    label: "Điểm TB",  value: "4.8" },
  { icon: Compass, label: "UNESCO",   value: "2" },
];
const categoryOptions = [
  { value: "beach",    label: "Bãi biển",   icon: Waves },
  { value: "mountain", label: "Núi rừng",   icon: Mountain },
  { value: "heritage", label: "Di sản",     icon: Landmark },
  { value: "nature",   label: "Thiên nhiên",icon: TreePine },
];
const areaOptions = ["Đà Nẵng", "Hội An"];
const sortOptions = [
  { label: "Phổ biến nhất", value: "popular" },
  { label: "Đánh giá cao",  value: "rating" },
  { label: "Tên A-Z",       value: "name" },
];

export default function Destinations() {
  const [search, setSearch]         = useState("");
  const [selCats, setSelCats]       = useState<string[]>([]);
  const [selAreas, setSelAreas]     = useState<string[]>([]);
  const [sort, setSort]             = useState("popular");
  const [liked, setLiked]           = useState<number[]>([]);
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

      {/* ── Hero ── Polaroid Scrapbook Explorer ── */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(180deg,#ecfdf5 0%,#d1fae5 50%,#a7f3d0 100%)" }}>
        {/* Topography pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topo" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M0 40 Q 20 20, 40 40 T 80 40" fill="none" stroke="#065f46" strokeWidth="1" />
              <path d="M0 60 Q 20 40, 40 60 T 80 60" fill="none" stroke="#065f46" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo)" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
          <div className="grid lg:grid-cols-[1.1fr,1fr] gap-8 items-center">
            {/* LEFT: Hand-drawn explorer feel */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-emerald-900 text-emerald-100 text-xs font-bold tracking-wide shadow-lg">
                <Compass size={14} className="text-emerald-300" />
                NHẬT KÝ KHÁM PHÁ · 2026
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-4 text-emerald-950">
                Khám Phá
                <span className="relative inline-block ml-2">
                  <span className="relative z-10 italic text-emerald-700">đó đây</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8 Q 50 2, 100 6 T 198 4" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-emerald-900/70 text-base max-w-lg leading-relaxed mb-6">
                85+ điểm đến đáng nhớ — từ bãi cát trắng Mỹ Khê đến phố cổ Hội An. Bộ sưu tập polaroid của những kẻ lữ hành.
              </p>

              {/* Stats with hand-drawn ticket vibe */}
              <div className="flex gap-3 mb-6 flex-wrap">
                {stats.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-white border-2 border-dashed border-emerald-400 rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm">
                    <Icon size={16} className="text-emerald-600" />
                    <div>
                      <div className="text-emerald-900 font-black text-sm leading-none">{value}</div>
                      <div className="text-emerald-700/60 text-[10px]">{label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Passport-style search */}
              <div className="relative bg-white rounded-2xl shadow-xl p-2 flex items-center gap-2 border border-emerald-200">
                <div className="absolute -right-3 -top-3 w-14 h-14 rounded-full border-2 border-dashed border-emerald-500 flex items-center justify-center -rotate-12 bg-emerald-50">
                  <span className="text-[8px] text-emerald-700 font-black text-center leading-none">VISA<br />2026</span>
                </div>
                <div className="flex items-center gap-2 px-3 flex-1 py-1.5">
                  <Search size={16} className="text-emerald-600" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Bãi biển, di sản, núi rừng..." className="flex-1 bg-transparent text-emerald-950 placeholder:text-emerald-600/40 text-sm focus:outline-none" />
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-1">
                  Khám phá <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>

            {/* RIGHT: 3 polaroids overlapping */}
            <div className="relative h-[280px] lg:h-[360px] hidden md:block">
              {[
                { src: heroImages[0], label: "Mỹ Khê", rot: -8, x: "0%", y: "10%", z: 1 },
                { src: heroImages[1], label: "Hội An", rot: 5, x: "30%", y: "0%", z: 2 },
                { src: heroImages[2], label: "Bà Nà", rot: -3, x: "55%", y: "20%", z: 3 },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, rotate: 0 }}
                  animate={{ opacity: 1, y: 0, rotate: p.rot }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                  className="absolute bg-white p-2.5 pb-8 shadow-2xl rounded-sm cursor-pointer w-44"
                  style={{ left: p.x, top: p.y, zIndex: p.z }}
                >
                  <img src={p.src} className="w-full h-44 object-cover" alt="" />
                  <div className="absolute bottom-2 left-0 right-0 text-center text-emerald-900 font-bold text-xs" style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }}>
                    📍 {p.label}
                  </div>
                </motion.div>
              ))}
              {/* Hand-drawn dotted route */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 360">
                <motion.path
                  d="M70 80 Q 150 30, 200 70 T 320 110"
                  stroke="#059669" strokeWidth="2.5" strokeDasharray="4 6" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.7 }}
                />
              </svg>
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
                <Link href={`/destinations/${place.slug}`}>
                  <div className="relative h-52 overflow-hidden">
                    <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${place.tagColor}`}>{place.tag}</div>
                    <button onClick={e => { e.preventDefault(); e.stopPropagation(); toggleLike(place.id); }} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm">
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
                </Link>
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
