import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, MapPin, Wifi, Waves, Utensils, Car, Heart, Filter, Search, Sparkles, SlidersHorizontal, Hotel, X, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const hotels = [
  {
    id: 1,
    slug: "crowne-plaza-danang",
    name: "Crowne Plaza Danang",
    stars: 5,
    rating: 4.9,
    reviews: 1240,
    price: 3200000,
    location: "Mỹ Khê Beach",
    district: "Sơn Trà",
    city: "Đà Nẵng",
    type: "resort",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
    amenities: ["wifi", "pool", "restaurant", "parking"],
    tag: "Best Seller",
    tagColor: "from-amber-500 to-orange-500",
  },
  {
    id: 2,
    slug: "grand-tourane-hotel",
    name: "Grand Tourane Hotel",
    stars: 5,
    rating: 4.7,
    reviews: 876,
    price: 2400000,
    location: "City Center",
    district: "Hải Châu",
    city: "Đà Nẵng",
    type: "hotel",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop",
    amenities: ["wifi", "restaurant", "parking"],
    tag: "Great Value",
    tagColor: "from-teal-500 to-emerald-500",
  },
  {
    id: 3,
    slug: "furama-resort-danang",
    name: "Furama Resort Danang",
    stars: 5,
    rating: 4.8,
    reviews: 2341,
    price: 5800000,
    location: "Non Nước Beach",
    district: "Ngũ Hành Sơn",
    city: "Đà Nẵng",
    type: "resort",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop",
    amenities: ["wifi", "pool", "restaurant"],
    tag: "Luxury Pick",
    tagColor: "from-violet-500 to-purple-600",
  },
  {
    id: 4,
    slug: "vinpearl-resort-spa",
    name: "Vinpearl Resort & Spa",
    stars: 5,
    rating: 4.8,
    reviews: 1923,
    price: 4500000,
    location: "Bãi Bắc",
    district: "Sơn Trà",
    city: "Đà Nẵng",
    type: "resort",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop",
    amenities: ["wifi", "pool", "restaurant", "parking"],
    tag: "Top Rated",
    tagColor: "from-rose-500 to-pink-600",
  },
  {
    id: 5,
    slug: "brilliant-hotel-danang",
    name: "Brilliant Hotel Danang",
    stars: 4,
    rating: 4.5,
    reviews: 654,
    price: 1200000,
    location: "Bạch Đằng Street",
    district: "Hải Châu",
    city: "Đà Nẵng",
    type: "hotel",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop",
    amenities: ["wifi", "restaurant"],
    tag: "Budget Friendly",
    tagColor: "from-green-500 to-teal-500",
  },
  {
    id: 6,
    slug: "pullman-danang-beach",
    name: "Pullman Danang Beach Resort",
    stars: 5,
    rating: 4.7,
    reviews: 1087,
    price: 3900000,
    location: "Mỹ Khê Beach",
    district: "Sơn Trà",
    city: "Đà Nẵng",
    type: "resort",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&auto=format&fit=crop",
    amenities: ["wifi", "pool", "restaurant", "parking"],
    tag: "Sea View",
    tagColor: "from-sky-500 to-blue-600",
  },
  {
    id: 7,
    slug: "blooming-hotel-hoi-an",
    name: "Blooming Hội An Hotel",
    stars: 4,
    rating: 4.6,
    reviews: 520,
    price: 1800000,
    location: "Phố Cổ Hội An",
    district: "Minh An",
    city: "Hội An",
    type: "boutique",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&auto=format&fit=crop",
    amenities: ["wifi", "pool", "restaurant"],
    tag: "Boutique",
    tagColor: "from-amber-400 to-yellow-500",
  },
  {
    id: 8,
    slug: "la-siesta-resort-hoi-an",
    name: "La Siesta Hội An Resort & Spa",
    stars: 5,
    rating: 4.9,
    reviews: 3100,
    price: 6200000,
    location: "Hội An",
    district: "Cẩm Kim",
    city: "Hội An",
    type: "resort",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&auto=format&fit=crop",
    amenities: ["wifi", "pool", "restaurant", "parking"],
    tag: "Premium",
    tagColor: "from-rose-400 to-rose-600",
  },
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
const typeOptions = [
  { value: "resort", label: "Resort" },
  { value: "hotel", label: "Khách sạn" },
  { value: "boutique", label: "Boutique" },
];
const cityOptions = ["Đà Nẵng", "Hội An"];

export default function Hotels() {
  const [search, setSearch] = useState("");
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [sort, setSort] = useState("newest");
  const [liked, setLiked] = useState<number[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const toggleLike = (id: number) => setLiked((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const toggleStar = (s: number) => setSelectedStars((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  const toggleType = (t: string) => setSelectedTypes((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);
  const toggleCity = (c: string) => setSelectedCities((p) => p.includes(c) ? p.filter((x) => x !== c) : [...p, c]);

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
  const activeFilterCount = selectedStars.length + selectedTypes.length + selectedCities.length;

  return (
    <div className="min-h-screen bg-gray-950" ref={ref}>
      <div className="relative h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&auto=format&fit=crop"
          alt="Hotels"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-gray-950/50 to-gray-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/60 via-transparent to-gray-950/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 rounded-full px-4 py-1.5 text-sm mb-5 backdrop-blur-sm">
              <Sparkles size={13} />128 Khách sạn tại Đà Nẵng
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Chỗ Nghỉ <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Cao Cấp</span>
            </h1>
            <p className="text-white/65 text-lg max-w-xl">Trải nghiệm những khách sạn đẳng cấp nhất tại thành phố biển Đà Nẵng</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/95 backdrop-blur-md rounded-2xl p-4 mb-8 flex flex-wrap items-center gap-3 border border-white/10 shadow-2xl"
        >
          <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-4 py-2.5 flex-1 min-w-48">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm khách sạn..."
              className="bg-transparent text-white text-sm placeholder:text-gray-500 focus:outline-none flex-1"
            />
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition-all ${showFilter ? "bg-amber-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"}`}
          >
            <SlidersHorizontal size={15} />
            Bộ lọc
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-white text-amber-600 rounded-full text-xs font-bold flex items-center justify-center">{activeFilterCount}</span>
            )}
          </button>
          <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-4 py-2.5 text-gray-400 text-sm">
            <Filter size={14} />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent text-gray-300 focus:outline-none cursor-pointer"
            >
              {sortOptions.map((o) => <option key={o.value} value={o.value} className="bg-gray-800">{o.label}</option>)}
            </select>
          </div>
        </motion.div>

        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-gray-900 border border-white/10 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">Hạng sao</h3>
                  <div className="flex flex-wrap gap-2">
                    {starOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleStar(s)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${selectedStars.includes(s) ? "bg-amber-500 border-amber-400 text-white" : "border-white/15 text-gray-400 hover:border-amber-400/40 hover:text-amber-300"}`}
                      >
                        {[...Array(s)].map((_, i) => <Star key={i} size={10} className="fill-current" />)}
                        {s} Sao
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">Loại hình</h3>
                  <div className="flex flex-wrap gap-2">
                    {typeOptions.map((t) => (
                      <button
                        key={t.value}
                        onClick={() => toggleType(t.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${selectedTypes.includes(t.value) ? "bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-400 text-white" : "border-white/15 text-gray-400 hover:border-blue-400/40 hover:text-blue-300"}`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">Thành phố</h3>
                  <div className="flex flex-wrap gap-2">
                    {cityOptions.map((c) => (
                      <button
                        key={c}
                        onClick={() => toggleCity(c)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${selectedCities.includes(c) ? "bg-gradient-to-r from-teal-500 to-emerald-500 border-teal-400 text-white" : "border-white/15 text-gray-400 hover:border-teal-400/40 hover:text-teal-300"}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mb-5">
          <p className="text-gray-400 text-sm"><span className="text-white font-semibold">{filtered.length}</span> khách sạn phù hợp</p>
          {activeFilterCount > 0 && (
            <button
              onClick={() => { setSelectedStars([]); setSelectedTypes([]); setSelectedCities([]); }}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <X size={12} />Xóa bộ lọc
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-6">
          <AnimatePresence>
            {visible.map((hotel, i) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                whileHover={{ y: -6 }}
                className="bg-gray-900 rounded-2xl overflow-hidden border border-white/8 shadow-xl group cursor-pointer"
                data-testid={`card-hotel-${hotel.id}`}
              >
                <Link href={`/luu-tru-khach-san/${hotel.slug}`}>
                  <div className="relative h-56 overflow-hidden">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                    <div className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${hotel.tagColor}`}>{hotel.tag}</div>
                    <button
                      onClick={(e) => { e.preventDefault(); toggleLike(hotel.id); }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors"
                    >
                      <Heart size={15} className={liked.includes(hotel.id) ? "text-rose-500 fill-rose-500" : "text-white"} />
                    </button>
                    <div className="absolute bottom-3 left-3 flex gap-0.5">
                      {[...Array(hotel.stars)].map((_, s) => <Star key={s} size={11} className="text-amber-400 fill-amber-400" />)}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-white font-bold text-base leading-tight">{hotel.name}</h3>
                      <div className="shrink-0 flex items-center gap-1 bg-amber-500/15 text-amber-400 rounded-lg px-2 py-0.5">
                        <Star size={11} className="fill-amber-400" />
                        <span className="text-xs font-bold">{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                      <MapPin size={11} className="shrink-0" />
                      <span>{hotel.location}</span>
                      <span className="mx-1">·</span>
                      <span className="text-gray-500">{hotel.reviews.toLocaleString()} đánh giá</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                      {hotel.amenities.map((a) => {
                        const Icon = amenityIcons[a];
                        return Icon ? (
                          <div key={a} className="flex items-center gap-1 px-2 py-1 bg-gray-800 rounded-lg">
                            <Icon size={12} className="text-gray-400" />
                            <span className="text-gray-500 text-[10px]">{amenityLabels[a]}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-white font-bold text-lg">{hotel.price.toLocaleString("vi-VN")}₫</span>
                        <span className="text-gray-500 text-xs">/đêm</span>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                      >
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
          <div className="flex justify-center pb-12">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setVisibleCount((v) => v + 3)}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400 transition-all text-sm"
            >
              Xem thêm {filtered.length - visibleCount} khách sạn
            </motion.button>
          </div>
        )}
        {!hasMore && filtered.length > 0 && (
          <div className="pb-12 text-center text-gray-500 text-sm">Đã hiển thị tất cả {filtered.length} khách sạn</div>
        )}
        {filtered.length === 0 && (
          <div className="pb-12 flex flex-col items-center justify-center py-16 text-center">
            <Hotel size={40} className="text-gray-700 mb-3" />
            <p className="text-gray-400 font-medium">Không tìm thấy khách sạn phù hợp</p>
            <p className="text-gray-600 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>
    </div>
  );
}
