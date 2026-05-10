import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, Star, X, SlidersHorizontal,
  Hotel, Utensils, CalendarDays, Compass, ChevronRight,
  Clock, TrendingUp, Waves, Mountain, Landmark,
} from "lucide-react";
import { Link, useLocation } from "wouter";

const allResults = [
  /* ── Địa điểm ── */
  { id: 1, type: "destination", category: "Bãi biển", title: "Bãi biển Mỹ Khê", location: "Sơn Trà, Đà Nẵng", rating: 4.9, reviews: 8240, price: null, image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop", desc: "Một trong những bãi biển đẹp nhất thế giới với cát trắng mịn, nước trong xanh.", href: "/destinations/bai-bien-my-khe", tag: "Nổi bật" },
  { id: 2, type: "destination", category: "Di sản", title: "Phố cổ Hội An", location: "Hội An, Quảng Nam", rating: 4.9, reviews: 15200, price: null, image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop", desc: "Di sản văn hoá thế giới UNESCO với những con phố cổ kính và đèn lồng rực rỡ.", href: "/destinations/pho-co-hoi-an", tag: "UNESCO" },
  { id: 3, type: "destination", category: "Núi rừng", title: "Bà Nà Hills", location: "Hoà Vang, Đà Nẵng", rating: 4.8, reviews: 12400, price: null, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop", desc: "Thiên đường trên mây với Cầu Vàng nổi tiếng và khí hậu mát mẻ quanh năm.", href: "/destinations/ba-na-hills", tag: "Top 1" },
  { id: 4, type: "destination", category: "Di sản", title: "Ngũ Hành Sơn", location: "Ngũ Hành Sơn, Đà Nẵng", rating: 4.7, reviews: 6800, price: null, image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop", desc: "Quần thể núi đá vôi huyền bí với chùa cổ và hang động kỳ ảo.", href: "/destinations/ngu-hanh-son", tag: null },
  { id: 5, type: "destination", category: "Bãi biển", title: "Cù Lao Chàm", location: "Quảng Nam", rating: 4.8, reviews: 4200, price: null, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop", desc: "Khu dự trữ sinh quyển thế giới với làn nước trong vắt, san hô đa dạng.", href: "/destinations/cu-lao-cham", tag: "Mới" },

  /* ── Khách sạn ── */
  { id: 6, type: "hotel", category: "Resort", title: "Crowne Plaza Danang", location: "Mỹ Khê, Sơn Trà", rating: 4.9, reviews: 1240, price: "3.200.000đ", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop", desc: "Resort 5 sao sang trọng ngay bãi biển Mỹ Khê với hồ bơi vô cực tuyệt đẹp.", href: "/luu-tru-khach-san/crowne-plaza-danang", tag: "Best Seller" },
  { id: 7, type: "hotel", category: "Resort", title: "Furama Resort Danang", location: "Non Nước, Ngũ Hành Sơn", rating: 4.8, reviews: 2341, price: "5.800.000đ", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop", desc: "Resort đẳng cấp quốc tế với khuôn viên xanh mát và dịch vụ 5 sao hoàn hảo.", href: "/luu-tru-khach-san/furama-resort-danang", tag: "Luxury" },
  { id: 8, type: "hotel", category: "Khách sạn", title: "Grand Tourane Hotel", location: "Hải Châu, Đà Nẵng", rating: 4.7, reviews: 876, price: "2.400.000đ", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop", desc: "Khách sạn thành phố view sông Hàn, tiện nghi đầy đủ, vị trí trung tâm lý tưởng.", href: "/luu-tru-khach-san/grand-tourane-hotel", tag: null },
  { id: 9, type: "hotel", category: "Resort", title: "Vinpearl Resort & Spa", location: "Bãi Bắc, Sơn Trà", rating: 4.8, reviews: 1923, price: "4.500.000đ", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop", desc: "Không gian nghỉ dưỡng đẳng cấp với spa cao cấp và tầm nhìn hướng biển.", href: "/luu-tru-khach-san/vinpearl-resort-spa", tag: "Top Rated" },

  /* ── Nhà hàng ── */
  { id: 10, type: "restaurant", category: "Hải sản", title: "Nhà hàng Bé Mặn", location: "Mỹ Khê, Đà Nẵng", rating: 4.8, reviews: 3420, price: "200.000đ", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop", desc: "Hải sản tươi sống nổi tiếng nhất Đà Nẵng, phong cách nhà hàng bình dân.", href: "/restaurants", tag: "Yêu thích" },
  { id: 11, type: "restaurant", category: "Đặc sản", title: "Mỳ Quảng Bà Vị", location: "Hải Châu, Đà Nẵng", rating: 4.7, reviews: 2100, price: "50.000đ", image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&auto=format&fit=crop", desc: "Mỳ Quảng nguyên bản hơn 30 năm tuổi, thương hiệu ẩm thực đặc sản Đà Nẵng.", href: "/restaurants", tag: "Lâu năm" },
  { id: 12, type: "restaurant", category: "Buffet", title: "Sky36 Rooftop Bar & Restaurant", location: "Novotel, Hải Châu", rating: 4.6, reviews: 1890, price: "350.000đ", image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&auto=format&fit=crop", desc: "Nhà hàng sân thượng cao nhất Đà Nẵng với view toàn cảnh thành phố và sông Hàn.", href: "/restaurants", tag: "View đẹp" },

  /* ── Sự kiện ── */
  { id: 13, type: "event", category: "Lễ hội", title: "Lễ hội pháo hoa quốc tế DIFF 2026", location: "Cầu Rồng, Đà Nẵng", rating: 4.9, reviews: 5600, price: "200.000đ", image: "https://images.unsplash.com/photo-1467810563316-b5af2cc7a31c?w=600&auto=format&fit=crop", desc: "Lễ hội pháo hoa quốc tế lớn nhất Việt Nam, thu hút hàng triệu du khách mỗi năm.", href: "/events", tag: "Đang diễn ra" },
  { id: 14, type: "event", category: "Ẩm thực", title: "Lễ hội ẩm thực Đà Nẵng 2026", location: "Bạch Đằng, Hải Châu", rating: 4.7, reviews: 1200, price: "Miễn phí", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop", desc: "Hội tụ tinh hoa ẩm thực Việt Nam với hơn 200 gian hàng và chương trình biểu diễn.", href: "/events", tag: "Sắp diễn ra" },
];

const TABS = [
  { key: "all",         label: "Tất cả",    icon: Compass },
  { key: "destination", label: "Địa điểm",  icon: MapPin },
  { key: "hotel",       label: "Khách sạn", icon: Hotel },
  { key: "restaurant",  label: "Nhà hàng",  icon: Utensils },
  { key: "event",       label: "Sự kiện",   icon: CalendarDays },
];

const typeIcon: Record<string, typeof Hotel> = {
  destination: MapPin,
  hotel:       Hotel,
  restaurant:  Utensils,
  event:       CalendarDays,
};

const typeColor: Record<string, string> = {
  destination: "bg-sky-100 text-sky-700",
  hotel:       "bg-violet-100 text-violet-700",
  restaurant:  "bg-orange-100 text-orange-700",
  event:       "bg-rose-100 text-rose-700",
};

const typeLabel: Record<string, string> = {
  destination: "Địa điểm",
  hotel:       "Khách sạn",
  restaurant:  "Nhà hàng",
  event:       "Sự kiện",
};

const tagColor: Record<string, string> = {
  "Nổi bật":        "bg-amber-500",
  "UNESCO":         "bg-emerald-600",
  "Top 1":          "bg-blue-600",
  "Mới":            "bg-teal-500",
  "Best Seller":    "bg-amber-500",
  "Luxury":         "bg-violet-600",
  "Top Rated":      "bg-rose-500",
  "Yêu thích":      "bg-rose-500",
  "Lâu năm":        "bg-amber-600",
  "View đẹp":       "bg-sky-500",
  "Đang diễn ra":   "bg-emerald-500",
  "Sắp diễn ra":    "bg-blue-500",
};

const trendingKeywords = ["Bà Nà Hills", "Pháo hoa", "Hải sản", "Resort 5 sao", "Phố cổ Hội An", "Cầu Vàng"];

function getQuery(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("q") ?? "";
}

export default function SearchPage() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState(getQuery);
  const [inputVal, setInputVal] = useState(getQuery);
  const [activeTab, setActiveTab] = useState("all");
  const [sort, setSort] = useState("popular");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = getQuery();
    setQuery(q);
    setInputVal(q);
  }, []);

  const handleSearch = () => {
    const trimmed = inputVal.trim();
    setQuery(trimmed);
    const params = trimmed ? `?q=${encodeURIComponent(trimmed)}` : "";
    navigate(`/tim-kiem${params}`);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const filtered = allResults.filter((r) => {
    const matchTab = activeTab === "all" || r.type === activeTab;
    const q = query.toLowerCase();
    const matchQ = !q ||
      r.title.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.desc.toLowerCase().includes(q);
    return matchTab && matchQ;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "reviews") return b.reviews - a.reviews;
    return 0;
  });

  return (
    <div className="bg-slate-50">
      {/* ── Search header ── */}
      <div className="bg-white border-b border-slate-200 sticky top-14 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex gap-3 items-center">
            <div className="flex-1 flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-2xl px-4 py-2.5 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <Search size={16} className="text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tìm địa điểm, khách sạn, nhà hàng..."
                className="flex-1 bg-transparent text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none"
              />
              {inputVal && (
                <button onClick={() => { setInputVal(""); setQuery(""); }} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={handleSearch}
              className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-2xl text-sm transition-colors shrink-0 shadow-md shadow-blue-500/25"
            >
              Tìm kiếm
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-3 overflow-x-auto pb-0.5 no-scrollbar">
            {TABS.map((tab) => {
              const count = tab.key === "all"
                ? allResults.filter(r => !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.location.toLowerCase().includes(query.toLowerCase()) || r.category.toLowerCase().includes(query.toLowerCase())).length
                : allResults.filter(r => r.type === tab.key && (!query || r.title.toLowerCase().includes(query.toLowerCase()) || r.location.toLowerCase().includes(query.toLowerCase()) || r.category.toLowerCase().includes(query.toLowerCase()))).length;
              const active = activeTab === tab.key;
              return (
                <button key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0
                    ${active ? "bg-blue-500 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"}`}>
                  <tab.icon size={13} />
                  {tab.label}
                  <span className={`text-[11px] font-bold ml-0.5 ${active ? "text-blue-100" : "text-slate-400"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* No query → show trending */}
        {!query ? (
          <div>
            <div className="mb-8">
              <h2 className="text-slate-700 font-bold text-base flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-blue-500" />Tìm kiếm xu hướng
              </h2>
              <div className="flex flex-wrap gap-2">
                {trendingKeywords.map((kw) => (
                  <button key={kw}
                    onClick={() => { setInputVal(kw); setQuery(kw); navigate(`/tim-kiem?q=${encodeURIComponent(kw)}`); }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 text-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm">
                    <Search size={12} className="text-slate-400" />{kw}
                  </button>
                ))}
              </div>
            </div>

            {/* Explore categories */}
            <h2 className="text-slate-700 font-bold text-base flex items-center gap-2 mb-4">
              <Compass size={16} className="text-blue-500" />Khám phá theo danh mục
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { key: "destination", label: "Địa điểm", sub: "85+ điểm đến", icon: MapPin, color: "from-sky-500 to-blue-600", img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&auto=format&fit=crop" },
                { key: "hotel",       label: "Khách sạn", sub: "128+ chỗ nghỉ", icon: Hotel, color: "from-violet-500 to-purple-600", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop" },
                { key: "restaurant",  label: "Nhà hàng",  sub: "240+ quán ăn",  icon: Utensils, color: "from-orange-500 to-red-500", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&auto=format&fit=crop" },
                { key: "event",       label: "Sự kiện",   sub: "Cập nhật liên tục", icon: CalendarDays, color: "from-rose-500 to-pink-600", img: "https://images.unsplash.com/photo-1467810563316-b5af2cc7a31c?w=400&auto=format&fit=crop" },
              ].map((cat) => (
                <motion.button key={cat.key}
                  whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(cat.key)}
                  className="relative rounded-2xl overflow-hidden h-36 group text-left">
                  <img src={cat.img} alt={cat.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-70`} />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <cat.icon size={18} className="text-white/80 mb-1" />
                    <p className="text-white font-bold text-sm leading-tight">{cat.label}</p>
                    <p className="text-white/70 text-[11px]">{cat.sub}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* All results preview */}
            <h2 className="text-slate-700 font-bold text-base flex items-center gap-2 mb-4">
              <Star size={16} className="text-amber-400 fill-amber-400" />Đề xuất nổi bật
            </h2>
            <ResultGrid results={allResults.slice(0, 6)} />
          </div>
        ) : (
          /* ── Search results ── */
          <div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-slate-500 text-sm">
                <span className="text-slate-900 font-semibold">{sorted.length}</span> kết quả
                {query && <> cho <span className="text-blue-500 font-semibold">"{query}"</span></>}
              </p>
              <select
                value={sort} onChange={(e) => setSort(e.target.value)}
                className="text-sm border border-slate-200 rounded-xl px-3 py-1.5 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
                <option value="popular">Phổ biến</option>
                <option value="rating">Đánh giá cao</option>
                <option value="reviews">Nhiều đánh giá</option>
              </select>
            </div>

            {sorted.length === 0 ? (
              <div className="flex flex-col items-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <Search size={28} className="text-slate-300" />
                </div>
                <p className="text-slate-700 font-semibold text-lg mb-1">Không tìm thấy kết quả</p>
                <p className="text-slate-400 text-sm mb-6">Thử từ khoá khác hoặc xem gợi ý bên dưới</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {trendingKeywords.map((kw) => (
                    <button key={kw}
                      onClick={() => { setInputVal(kw); setQuery(kw); }}
                      className="px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-full text-sm hover:bg-blue-100 transition-colors">
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <ResultGrid results={sorted} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ResultGrid({ results }: { results: typeof allResults }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((item, idx) => {
        const Icon = typeIcon[item.type];
        return (
          <motion.div key={item.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}>
            <Link href={item.href}>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:shadow-slate-200/60 transition-all group cursor-pointer">
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img src={item.image} alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Tag */}
                  {item.tag && (
                    <span className={`absolute top-3 left-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-full ${tagColor[item.tag] ?? "bg-slate-700"}`}>
                      {item.tag}
                    </span>
                  )}
                  {/* Price */}
                  {item.price && (
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-1 rounded-lg">
                      từ {item.price}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-4">
                  {/* Type + category */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${typeColor[item.type]}`}>
                      <Icon size={10} />{typeLabel[item.type]}
                    </span>
                    <span className="text-slate-400 text-[11px]">{item.category}</span>
                  </div>

                  <h3 className="text-slate-900 font-bold text-sm leading-snug mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-1 text-slate-400 text-[12px] mb-2">
                    <MapPin size={10} className="shrink-0" />
                    <span className="line-clamp-1">{item.location}</span>
                  </div>

                  <p className="text-slate-500 text-[12px] leading-relaxed line-clamp-2 mb-3">
                    {item.desc}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <span className="text-slate-800 font-bold text-sm">{item.rating}</span>
                      <span className="text-slate-400 text-[11px]">({item.reviews.toLocaleString()})</span>
                    </div>
                    <span className="text-blue-500 text-xs font-semibold flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                      Xem thêm <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
