import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, MapPin, Wifi, Waves, Utensils, Car, Heart, Filter, Search, Sparkles, SlidersHorizontal, Hotel, X, ChevronRight, Loader2, BedDouble, Trophy, TrendingUp } from "lucide-react";
import { Link } from "wouter";

const hotels = [
  { id: 1, slug: "crowne-plaza-danang", name: "Crowne Plaza Danang", stars: 5, rating: 4.9, reviews: 1240, price: 3200000, location: "Mỹ Khê Beach", district: "Sơn Trà", city: "Đà Nẵng", type: "resort", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop", amenities: ["wifi", "pool", "restaurant", "parking"], tag: "Best Seller", tagColor: "from-amber-500 to-orange-500" },
  { id: 2, slug: "grand-tourane-hotel", name: "Grand Tourane Hotel", stars: 5, rating: 4.7, reviews: 876, price: 2400000, location: "City Center", district: "Hải Châu", city: "Đà Nẵng", type: "hotel", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop", amenities: ["wifi", "restaurant", "parking"], tag: "Great Value", tagColor: "from-teal-500 to-emerald-500" },
  { id: 3, slug: "furama-resort-danang", name: "Furama Resort Danang", stars: 5, rating: 4.8, reviews: 2341, price: 5800000, location: "Non Nước Beach", district: "Ngũ Hành Sơn", city: "Đà Nẵng", type: "resort", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop", amenities: ["wifi", "pool", "restaurant"], tag: "Luxury Pick", tagColor: "from-violet-500 to-purple-600" },
  { id: 4, slug: "vinpearl-resort-spa", name: "Vinpearl Resort & Spa", stars: 5, rating: 4.8, reviews: 1923, price: 4500000, location: "Bãi Bắc", district: "Sơn Trà", city: "Đà Nẵng", type: "resort", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop", amenities: ["wifi", "pool", "restaurant", "parking"], tag: "Top Rated", tagColor: "from-rose-500 to-pink-600" },
  { id: 5, slug: "brilliant-hotel-danang", name: "Brilliant Hotel Danang", stars: 4, rating: 4.5, reviews: 654, price: 1200000, location: "Bạch Đằng Street", district: "Hải Châu", city: "Đà Nẵng", type: "hotel", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop", amenities: ["wifi", "restaurant"], tag: "Budget Friendly", tagColor: "from-green-500 to-teal-500" },
  { id: 6, slug: "pullman-danang-beach", name: "Pullman Danang Beach Resort", stars: 5, rating: 4.7, reviews: 1087, price: 3900000, location: "Mỹ Khê Beach", district: "Sơn Trà", city: "Đà Nẵng", type: "resort", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&auto=format&fit=crop", amenities: ["wifi", "pool", "restaurant", "parking"], tag: "Sea View", tagColor: "from-sky-500 to-blue-600" },
  { id: 7, slug: "blooming-hotel-hoi-an", name: "Blooming Hội An Hotel", stars: 4, rating: 4.6, reviews: 520, price: 1800000, location: "Phố Cổ Hội An", district: "Minh An", city: "Hội An", type: "boutique", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&auto=format&fit=crop", amenities: ["wifi", "pool", "restaurant"], tag: "Boutique", tagColor: "from-amber-400 to-yellow-500" },
  { id: 8, slug: "la-siesta-resort-hoi-an", name: "La Siesta Hội An Resort & Spa", stars: 5, rating: 4.9, reviews: 3100, price: 6200000, location: "Hội An", district: "Cẩm Kim", city: "Hội An", type: "resort", image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&auto=format&fit=crop", amenities: ["wifi", "pool", "restaurant", "parking"], tag: "Premium", tagColor: "from-rose-400 to-rose-600" },
];

const amenityIcons: Record<string, typeof Wifi> = { wifi: Wifi, pool: Waves, restaurant: Utensils, parking: Car };
const amenityLabels: Record<string, string> = { wifi: "WiFi", pool: "Hồ bơi", restaurant: "Nhà hàng", parking: "Đỗ xe" };
const sortOptions = [
  { label: "Mới nhất", value: "newest" },
  { label: "Phổ biến nhất", value: "popular" },
  { label: "Giá tăng dần", value: "price_asc" },
  { label: "Giá giảm dần", value: "price_desc" },
  { label: "Tên A-Z", value: "name" },
];
const starOptions = [5, 4, 3];
const typeOptions = [{ value: "resort", label: "Resort" }, { value: "hotel", label: "Khách sạn" }, { value: "boutique", label: "Boutique" }];
const cityOptions = ["Đà Nẵng", "Hội An"];

const heroImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&auto=format&fit=crop",
];

const stats = [
  { icon: BedDouble, label: "Chỗ nghỉ", value: "128+" },
  { icon: Trophy, label: "Đánh giá 5 sao", value: "4.8" },
  { icon: TrendingUp, label: "Đặt phòng / tháng", value: "3.2K" },
];

export default function Hotels() {
  const [search, setSearch] = useState("");
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [sort, setSort] = useState("newest");
  const [liked, setLiked] = useState<number[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const toggleLike = (id: number) => setLiked((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const toggleStar = (s: number) => setSelectedStars((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  const toggleType = (t: string) => setSelectedTypes((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);
  const toggleCity = (c: string) => setSelectedCities((p) => p.includes(c) ? p.filter((x) => x !== c) : [...p, c]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((v) => v + 3);
      setLoadingMore(false);
    }, 900);
  };

  let filtered = hotels.filter((h) => {
    if (search && !h.name.toLowerCase().includes(search.toLowerCase()) && !h.location.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedStars.length && !selectedStars.includes(h.stars)) return false;
    if (selectedTypes.length && !selectedTypes.includes(h.type)) return false;
    if (selectedCities.length && !selectedCities.includes(h.city)) return false;
    return true;
  });
  if (sort === "popular") filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
  else if (sort === "price_asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const remaining = filtered.length - visibleCount;
  const activeFilterCount = selectedStars.length + selectedTypes.length + selectedCities.length;

  return (
    <div className="min-h-screen bg-gray-50" ref={ref}>

      {/* ── Hero ── Amber Luxury Editorial ── */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1a1206 0%,#2a1d0a 50%,#1a1206 100%)" }}>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 25% 30%, #f59e0b 0%, transparent 35%), radial-gradient(circle at 75% 70%, #b45309 0%, transparent 40%)"
        }} />
        {/* Decorative serif "H" watermark */}
        <div className="absolute -top-20 -left-10 font-serif text-[400px] text-amber-500/[0.04] leading-none select-none pointer-events-none">H</div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
          <div className="grid lg:grid-cols-[1.3fr,1fr] gap-8 items-center">
            {/* LEFT: Title + concierge search */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-12 bg-amber-400/50" />
                <span className="text-amber-300 text-[10px] tracking-[0.35em] font-bold flex items-center gap-1.5">
                  <Sparkles size={11} /> LUXURY EDITION · 2026
                </span>
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-amber-50 leading-[0.95] mb-4">
                Nơi Nghỉ
                <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                  Đẳng Cấp
                </span>
              </h1>
              <p className="text-amber-100/60 text-base max-w-md leading-relaxed mb-6">
                Từ resort biển 5 sao đến boutique cổ điển — chọn nơi chốn xứng tầm cho hành trình của bạn.
              </p>

              {/* Gold pill stats */}
              <div className="flex flex-wrap gap-2 mb-6">
                {stats.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 backdrop-blur-sm">
                    <Icon size={13} className="text-amber-400" />
                    <span className="text-amber-100 font-bold text-sm">{value}</span>
                    <span className="text-amber-200/50 text-[11px]">{label}</span>
                  </div>
                ))}
              </div>

              {/* Concierge search desk */}
              <div className="relative">
                <div className="absolute -top-3 left-5 px-2.5 py-0.5 bg-amber-500 text-amber-950 text-[10px] font-black tracking-[0.2em] rounded-md shadow-lg z-10 border border-amber-300">
                  CONCIERGE
                </div>
                <div className="rounded-2xl bg-amber-50/95 backdrop-blur p-1.5 grid grid-cols-[1fr,auto,auto] gap-1.5 shadow-2xl border-2 border-amber-400/40">
                  <div className="flex items-center gap-2 px-3 py-2.5">
                    <Search size={16} className="text-amber-700 shrink-0" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm khách sạn, khu vực..." className="flex-1 bg-transparent text-amber-950 placeholder:text-amber-700/40 text-sm focus:outline-none min-w-0" />
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 border-l border-amber-200/80">
                    <BedDouble size={14} className="text-amber-700" />
                    <span className="text-amber-900 text-sm font-medium whitespace-nowrap">2 khách</span>
                  </div>
                  <button className="bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold px-4 sm:px-5 rounded-xl text-sm flex items-center gap-1.5 hover:shadow-amber-500/40 hover:shadow-lg transition-shadow">
                    Tìm <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Photo collage */}
            <div className="relative h-[260px] lg:h-[360px] hidden lg:block">
              <motion.div initial={{ opacity: 0, x: 30, rotate: 5 }} animate={{ opacity: 1, x: 0, rotate: 3 }} transition={{ duration: 0.8 }}
                className="absolute inset-y-0 right-0 w-[78%] rounded-3xl overflow-hidden border-4 border-amber-400/30 shadow-2xl">
                <img src={heroImages[0]} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 via-transparent" />
                <div className="absolute top-3 right-3 px-2 py-1 bg-amber-400 text-amber-950 text-[9px] font-black rounded-full">★ FEATURED</div>
                <div className="absolute bottom-4 left-4 right-4 text-amber-50">
                  <div className="text-[10px] tracking-widest font-bold opacity-70">★★★★★</div>
                  <div className="font-serif font-bold text-lg">Crowne Plaza Đà Nẵng</div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: -20, rotate: -8 }} animate={{ opacity: 1, y: 0, rotate: -5 }} transition={{ duration: 0.9, delay: 0.15 }}
                className="absolute top-0 left-0 w-[55%] h-[48%] rounded-2xl overflow-hidden border-4 border-amber-400/25 shadow-xl">
                <img src={heroImages[1]} className="w-full h-full object-cover" alt="" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20, rotate: 8 }} animate={{ opacity: 1, y: 0, rotate: 6 }} transition={{ duration: 0.9, delay: 0.25 }}
                className="absolute bottom-0 left-2 w-[48%] h-[42%] rounded-2xl overflow-hidden border-4 border-amber-400/25 shadow-xl">
                <img src={heroImages[2]} className="w-full h-full object-cover" alt="" />
              </motion.div>
              {/* Floating gold key */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 right-4 w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl border-2 border-amber-200">
                <Trophy size={22} className="text-white" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filters & Content ── */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-3 shadow-xl border border-gray-100"
        >
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 flex-1 min-w-48">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm khách sạn..." className="bg-transparent text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none flex-1" />
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all border ${showFilter ? "bg-amber-500 border-amber-400 text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            <SlidersHorizontal size={15} />Bộ lọc
            {activeFilterCount > 0 && <span className="w-5 h-5 bg-amber-500 text-white rounded-full text-xs font-bold flex items-center justify-center">{activeFilterCount}</span>}
          </button>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-500 text-sm">
            <Filter size={14} />
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent text-gray-700 focus:outline-none cursor-pointer">
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </motion.div>

        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-5"
            >
              <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex flex-wrap items-center gap-x-6 gap-y-4 shadow-sm">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-gray-400 text-xs font-medium shrink-0">Sao</span>
                  {starOptions.map((s) => (
                    <button key={s} onClick={() => toggleStar(s)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selectedStars.includes(s) ? "bg-amber-500 border-amber-500 text-white" : "border-gray-200 text-gray-500 hover:border-amber-300 hover:text-amber-600"}`}>
                      {[...Array(s)].map((_, i) => <Star key={i} size={9} className="fill-current" />)}
                      <span className="ml-0.5">{s}</span>
                    </button>
                  ))}
                </div>

                <div className="w-px h-5 bg-gray-200 hidden md:block" />

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-gray-400 text-xs font-medium shrink-0">Loại</span>
                  {typeOptions.map((t) => (
                    <button key={t.value} onClick={() => toggleType(t.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selectedTypes.includes(t.value) ? "bg-blue-500 border-blue-500 text-white" : "border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600"}`}>
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="w-px h-5 bg-gray-200 hidden md:block" />

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-gray-400 text-xs font-medium shrink-0">Thành phố</span>
                  {cityOptions.map((c) => (
                    <button key={c} onClick={() => toggleCity(c)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selectedCities.includes(c) ? "bg-teal-500 border-teal-500 text-white" : "border-gray-200 text-gray-500 hover:border-teal-300 hover:text-teal-600"}`}>
                      {c}
                    </button>
                  ))}
                </div>

                {activeFilterCount > 0 && (
                  <>
                    <div className="w-px h-5 bg-gray-200 hidden md:block" />
                    <button onClick={() => { setSelectedStars([]); setSelectedTypes([]); setSelectedCities([]); }}
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors">
                      <X size={12} /> Xóa
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mb-5">
          <p className="text-gray-500 text-sm"><span className="text-gray-900 font-semibold">{filtered.length}</span> khách sạn phù hợp</p>
          {activeFilterCount > 0 && (
            <button onClick={() => { setSelectedStars([]); setSelectedTypes([]); setSelectedCities([]); }} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors">
              <X size={12} />Xóa bộ lọc
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-6">
          <AnimatePresence>
            {visible.map((hotel, i) => (
              <motion.div key={hotel.id} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.07, duration: 0.45 }} whileHover={{ y: -6 }} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-shadow group cursor-pointer" data-testid={`card-hotel-${hotel.id}`}>
                <Link href={`/luu-tru-khach-san/${hotel.slug}`}>
                  <div className="relative h-52 overflow-hidden">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${hotel.tagColor}`}>{hotel.tag}</div>
                    <button onClick={(e) => { e.preventDefault(); toggleLike(hotel.id); }} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm">
                      <Heart size={15} className={liked.includes(hotel.id) ? "text-rose-500 fill-rose-500" : "text-gray-500"} />
                    </button>
                    <div className="absolute bottom-3 left-3 flex gap-0.5">
                      {[...Array(hotel.stars)].map((_, s) => <Star key={s} size={11} className="text-amber-400 fill-amber-400" />)}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-gray-900 font-bold text-base leading-tight">{hotel.name}</h3>
                      <div className="shrink-0 flex items-center gap-1 bg-amber-50 text-amber-600 rounded-lg px-2 py-0.5 border border-amber-100">
                        <Star size={11} className="fill-amber-500 text-amber-500" />
                        <span className="text-xs font-bold">{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                      <MapPin size={11} className="shrink-0 text-gray-400" />
                      <span>{hotel.location}</span>
                      <span className="mx-1">·</span>
                      <span>{hotel.reviews.toLocaleString()} đánh giá</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                      {hotel.amenities.map((a) => {
                        const Icon = amenityIcons[a];
                        return Icon ? (
                          <div key={a} className="flex items-center gap-1 px-2 py-1 bg-gray-50 border border-gray-100 rounded-lg">
                            <Icon size={12} className="text-gray-400" />
                            <span className="text-gray-500 text-[10px]">{amenityLabels[a]}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-900 font-bold text-lg">{hotel.price.toLocaleString("vi-VN")}₫</span>
                        <span className="text-gray-400 text-xs">/đêm</span>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-amber-200">
                        Đặt ngay <ChevronRight size={14} />
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
              Đang hiển thị <span className="text-gray-700 font-semibold">{visible.length}</span> / <span className="text-gray-700 font-semibold">{filtered.length}</span> khách sạn
              {" — "}còn <span className="text-amber-600 font-semibold">{remaining}</span> chỗ nghỉ chưa hiển thị
            </p>
            <motion.button
              whileHover={{ scale: loadingMore ? 1 : 1.04 }}
              whileTap={{ scale: loadingMore ? 1 : 0.97 }}
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="flex items-center gap-2.5 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl shadow-lg shadow-amber-200 hover:from-amber-400 hover:to-orange-400 transition-all text-sm disabled:opacity-80 disabled:cursor-not-allowed min-w-52 justify-center"
            >
              <AnimatePresence mode="wait">
                {loadingMore ? (
                  <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Đang tải...
                  </motion.span>
                ) : (
                  <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    Xem thêm {remaining} khách sạn
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        )}

        {!hasMore && filtered.length > 0 && (
          <div className="pb-12 text-center text-gray-400 text-sm">
            Đã hiển thị tất cả <span className="text-gray-600 font-semibold">{filtered.length}</span> khách sạn
          </div>
        )}

        {filtered.length === 0 && (
          <div className="pb-12 flex flex-col items-center justify-center py-16 text-center">
            <Hotel size={40} className="text-gray-300 mb-3" />
            <p className="text-gray-600 font-medium">Không tìm thấy khách sạn phù hợp</p>
            <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>
    </div>
  );
}
