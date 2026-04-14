import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Search, Filter, SlidersHorizontal, X, ChevronRight, Loader2,
  Navigation, Bus, Car, Bike, Plane, Ship, Zap, DollarSign, Clock, PhoneCall, MapPin,
} from "lucide-react";

interface TransportItem {
  id: number; name: string; type: string; icon: typeof Bus;
  rating: number; reviews: number; priceRange: string; hours: string;
  location: string; area: string; desc: string; detail: string;
  image: string; tag: string; tagColor: string;
}

const transports: TransportItem[] = [
  { id: 1, name: "Sân bay Quốc tế Đà Nẵng", type: "airport", icon: Plane, rating: 4.5, reviews: 24000, priceRange: "Grab 80–120K", hours: "24/7", location: "Đường 2/9, Hải Châu", area: "Đà Nẵng", desc: "Sân bay quốc tế lớn nhất miền Trung — cách trung tâm chỉ 15 phút.", detail: "Grab xe từ sân bay ~80–120K · Taxi ~100–150K · Xe buýt số 6 chỉ 5K", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&auto=format&fit=crop", tag: "Sân bay", tagColor: "from-sky-500 to-blue-600" },
  { id: 2, name: "Xe buýt Đà Nẵng", type: "bus", icon: Bus, rating: 4.1, reviews: 5600, priceRange: "5.000₫/lượt", hours: "05:30–21:00", location: "Nhiều tuyến nội thành", area: "Đà Nẵng", desc: "Mạng lưới 10 tuyến bao phủ toàn thành phố, tiện lợi và rẻ nhất.", detail: "Vé 5.000₫/lượt · Thẻ tháng 120K · Tuyến số 6 nối sân bay–trung tâm", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700&auto=format&fit=crop", tag: "Công cộng", tagColor: "from-green-500 to-emerald-600" },
  { id: 3, name: "Grab & Be", type: "taxi", icon: Car, rating: 4.7, reviews: 38000, priceRange: "~15K/km", hours: "24/7", location: "Khắp thành phố", area: "Đà Nẵng", desc: "Ứng dụng gọi xe phổ biến nhất — Grab Car, Grab Bike, Be Car, Be Bike.", detail: "Đặt qua app · Giá cố định · Thanh toán tiền mặt hoặc thẻ · Không chặt chém", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=700&auto=format&fit=crop", tag: "Phổ biến", tagColor: "from-lime-500 to-green-600" },
  { id: 4, name: "Taxi Mai Linh & Tiên Sa", type: "taxi", icon: Car, rating: 4.5, reviews: 12000, priceRange: "15–18K/km", hours: "24/7", location: "Khắp thành phố", area: "Đà Nẵng", desc: "Hãng taxi truyền thống uy tín tại Đà Nẵng, phục vụ 24/7.", detail: "Mai Linh: 0236 3525 252 · Tiên Sa: 0236 3797 979 · Đồng hồ tính tiền", image: "https://images.unsplash.com/photo-1611095562057-4ec1f323bb80?w=700&auto=format&fit=crop", tag: "Uy tín", tagColor: "from-yellow-500 to-amber-600" },
  { id: 5, name: "Thuê xe máy tự lái", type: "bike", icon: Bike, rating: 4.6, reviews: 8900, priceRange: "100–200K/ngày", hours: "07:00–20:00", location: "Nhiều điểm cho thuê", area: "Đà Nẵng", desc: "Cách tốt nhất để khám phá Đà Nẵng — tự do, linh hoạt, chi phí thấp.", detail: "Cần CCCD cọc · Xe số & xe tay ga · Mũ bảo hiểm kèm theo · Đổ xăng ~25K/lần", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop", tag: "Tự do", tagColor: "from-rose-500 to-pink-600" },
  { id: 6, name: "Xe đạp cho thuê", type: "bike", icon: Bike, rating: 4.4, reviews: 3200, priceRange: "50–80K/ngày", hours: "07:00–19:00", location: "Khu du lịch & khách sạn", area: "Đà Nẵng", desc: "Khám phá bờ biển và phố cổ Hội An theo phong cách thân thiện môi trường.", detail: "Xe đạp thường & xe đạp điện · Phổ biến tại Hội An phố cổ · Không cần bằng lái", image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=700&auto=format&fit=crop", tag: "Eco", tagColor: "from-teal-500 to-cyan-600" },
  { id: 7, name: "Phà Cù Lao Chàm", type: "boat", icon: Ship, rating: 4.7, reviews: 6100, priceRange: "230K/người", hours: "07:30–09:30 (xuất bến)", location: "Cảng Mân Quang, Hội An", area: "Hội An", desc: "Phà cao tốc ra đảo Cù Lao Chàm — hành trình 2 tiếng trên biển Đông.", detail: "Đặt vé trước tại cảng · Khoảng 2 tiếng/chuyến · Yêu cầu căn cước công dân", image: "https://images.unsplash.com/photo-1559559228-68d3c4e01af2?w=700&auto=format&fit=crop", tag: "Ra đảo", tagColor: "from-cyan-500 to-sky-600" },
  { id: 8, name: "Xe điện tham quan", type: "electric", icon: Zap, rating: 4.6, reviews: 4300, priceRange: "80K/người", hours: "08:00–21:00", location: "Bờ biển Mỹ Khê & Phố cổ", area: "Đà Nẵng", desc: "Tour xe điện 90 phút qua các điểm đẹp ven biển — thú vị và tiện lợi.", detail: "Tour cố định 1h30 · Không cần đặt trước · Xuất phát nhiều lần/ngày", image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=700&auto=format&fit=crop", tag: "Tham quan", tagColor: "from-purple-500 to-violet-600" },
  { id: 9, name: "Shuttle Đà Nẵng – Hội An", type: "shuttle", icon: Bus, rating: 4.5, reviews: 7800, priceRange: "150–250K/người", hours: "07:00–18:00", location: "Khách sạn & Điểm đón", area: "Đà Nẵng", desc: "Shuttle bus tiện lợi kết nối Đà Nẵng – Hội An, đặt trước qua khách sạn.", detail: "35 phút · Đón tại khách sạn · Cần đặt trước 1 ngày · Tuyến ngược lại có sẵn", image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=700&auto=format&fit=crop", tag: "Liên thành", tagColor: "from-indigo-500 to-blue-600" },
];

const heroImages = [
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&auto=format&fit=crop",
];
const statsData = [
  { icon: Navigation, label: "Phương tiện", value: "6+" },
  { icon: MapPin,     label: "Tuyến phổ biến", value: "12+" },
  { icon: PhoneCall,  label: "Hỗ trợ 24/7", value: "✓" },
];
const typeOptions = [
  { value: "airport",  label: "Sân bay",  icon: Plane },
  { value: "bus",      label: "Xe buýt",  icon: Bus },
  { value: "taxi",     label: "Taxi/Grab",icon: Car },
  { value: "bike",     label: "Xe máy/Đạp",icon: Bike },
  { value: "boat",     label: "Tàu thuyền",icon: Ship },
  { value: "electric", label: "Xe điện", icon: Zap },
  { value: "shuttle",  label: "Shuttle",  icon: Bus },
];
const areaOptions = ["Đà Nẵng", "Hội An"];
const sortOptions = [
  { label: "Phổ biến nhất", value: "popular" },
  { label: "Đánh giá cao",  value: "rating" },
  { label: "Tên A-Z",       value: "name" },
];

export default function Transport() {
  const [search, setSearch]         = useState("");
  const [selTypes, setSelTypes]     = useState<string[]>([]);
  const [selAreas, setSelAreas]     = useState<string[]>([]);
  const [sort, setSort]             = useState("popular");
  const [showFilter, setShowFilter] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore]   = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const toggleType = (v: string) => setSelTypes(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleArea = (v: string) => setSelAreas(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => { setVisibleCount(v => v + 3); setLoadingMore(false); }, 800);
  };

  let filtered = transports.filter(t => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.desc.toLowerCase().includes(search.toLowerCase())) return false;
    if (selTypes.length && !selTypes.includes(t.type)) return false;
    if (selAreas.length && !selAreas.includes(t.area)) return false;
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
              <Navigation size={13} className="text-sky-400" />
              <span>Hướng dẫn di chuyển tại Đà Nẵng &amp; Hội An</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-xl">
              Giao Thông <span className="text-sky-400">&amp; Di Chuyển</span><br />Đà Nẵng
            </h1>
            <p className="text-white/75 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Từ sân bay, xe buýt đến thuê xe máy — tất cả thông tin di chuyển bạn cần
            </p>
            <div className="flex items-center justify-center gap-6 md:gap-12">
              {statsData.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-1">
                    <Icon size={18} className="text-sky-400" />
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm phương tiện..." className="bg-transparent text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none flex-1" />
            {search && <button onClick={() => setSearch("")}><X size={13} className="text-gray-400" /></button>}
          </div>
          <button onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all border ${showFilter ? "bg-sky-500 border-sky-400 text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            <SlidersHorizontal size={15} />Bộ lọc
            {activeFilterCount > 0 && <span className="w-5 h-5 bg-sky-500 text-white rounded-full text-xs font-bold flex items-center justify-center">{activeFilterCount}</span>}
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
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selTypes.includes(t.value) ? "bg-sky-500 border-sky-500 text-white" : "border-gray-200 text-gray-500 hover:border-sky-300 hover:text-sky-600"}`}>
                      <t.icon size={11} />{t.label}
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
          <p className="text-gray-500 text-sm"><span className="text-gray-900 font-semibold">{filtered.length}</span> phương tiện phù hợp</p>
          {activeFilterCount > 0 && (
            <button onClick={() => { setSelTypes([]); setSelAreas([]); }} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors">
              <X size={12} />Xóa bộ lọc
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-6">
          <AnimatePresence>
            {visible.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div key={t.id} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.07, duration: 0.45 }} whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-shadow group cursor-pointer" data-testid={`card-transport-${t.id}`}>
                  <div className="relative h-52 overflow-hidden">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${t.tagColor}`}>{t.tag}</div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
                      <Icon size={11} className="text-white/80" />
                      <span className="text-white/90 text-xs font-medium">{t.priceRange}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-gray-900 font-bold text-base leading-tight">{t.name}</h3>
                      <div className="shrink-0 flex items-center gap-1 bg-amber-50 text-amber-600 rounded-lg px-2 py-0.5 border border-amber-100">
                        <span className="text-xs font-bold">★ {t.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">{t.desc}</p>
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-2 text-gray-500 text-xs"><MapPin size={11} className="text-gray-400 shrink-0" />{t.location}</div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs"><Clock size={11} className="text-gray-400 shrink-0" />{t.hours}</div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs"><DollarSign size={11} className="text-gray-400 shrink-0" />{t.detail}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{t.area}</span>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                        className="flex items-center gap-1 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-400 hover:to-blue-400 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-sky-100">
                        Chi tiết <ChevronRight size={14} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {hasMore && (
          <div className="flex flex-col items-center gap-3 pb-12">
            <p className="text-gray-400 text-sm">
              Đang hiển thị <span className="text-gray-700 font-semibold">{visible.length}</span> / <span className="text-gray-700 font-semibold">{filtered.length}</span> phương tiện
              {" — "}còn <span className="text-sky-600 font-semibold">{remaining}</span> chưa hiển thị
            </p>
            <motion.button whileHover={{ scale: loadingMore ? 1 : 1.04 }} whileTap={{ scale: loadingMore ? 1 : 0.97 }}
              onClick={handleLoadMore} disabled={loadingMore}
              className="flex items-center gap-2.5 px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-semibold rounded-2xl shadow-lg shadow-sky-200 hover:from-sky-400 hover:to-blue-400 transition-all text-sm disabled:opacity-80 disabled:cursor-not-allowed min-w-52 justify-center">
              <AnimatePresence mode="wait">
                {loadingMore
                  ? <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" />Đang tải...</motion.span>
                  : <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">Xem thêm {remaining} phương tiện</motion.span>}
              </AnimatePresence>
            </motion.button>
          </div>
        )}
        {!hasMore && filtered.length > 0 && (
          <div className="pb-12 text-center text-gray-400 text-sm">Đã hiển thị tất cả <span className="text-gray-600 font-semibold">{filtered.length}</span> phương tiện</div>
        )}
        {filtered.length === 0 && (
          <div className="pb-12 flex flex-col items-center justify-center py-16 text-center">
            <Navigation size={40} className="text-gray-300 mb-3" />
            <p className="text-gray-600 font-medium">Không tìm thấy phương tiện phù hợp</p>
            <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>
    </div>
  );
}
