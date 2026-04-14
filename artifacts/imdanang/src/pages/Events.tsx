import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, Clock, Heart, Search, Filter, SlidersHorizontal, X,
  ChevronRight, Loader2, CalendarDays, Music, Utensils, Landmark,
  Waves, Users, Flame, Radio, Tag,
} from "lucide-react";

type Category = "festival" | "music" | "food" | "culture" | "sport";
type Status   = "live" | "upcoming";

interface EventItem {
  id: number; name: string; category: Category; status: Status;
  date: string; time: string; location: string; area: string;
  image: string; desc: string; price: string; attendees: number;
  tag: string; tagColor: string;
}

const ALL_EVENTS: EventItem[] = [
  { id: 1, name: "Lễ hội Pháo hoa Quốc tế Đà Nẵng 2026", category: "festival", status: "live", date: "4–28/04/2026", time: "21:00 – 22:00", location: "Cầu Rồng & Cầu Sông Hàn", area: "Đà Nẵng", image: "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?w=700&auto=format&fit=crop", desc: "Sự kiện pháo hoa quốc tế lớn nhất Đông Nam Á với hơn 10 quốc gia trình diễn.", price: "Miễn phí", attendees: 120000, tag: "Đang diễn ra", tagColor: "from-violet-600 to-blue-600" },
  { id: 2, name: "Đêm Nhạc Acoustic Sông Hàn", category: "music", status: "live", date: "Cuối tuần/04/2026", time: "19:30 – 22:00", location: "Bờ Tây Sông Hàn", area: "Đà Nẵng", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=700&auto=format&fit=crop", desc: "Âm nhạc acoustic mỗi tối cuối tuần bên bờ sông Hàn thơ mộng.", price: "Miễn phí", attendees: 3000, tag: "Đang diễn ra", tagColor: "from-teal-600 to-emerald-600" },
  { id: 3, name: "Triển lãm Ảnh Đà Nẵng Xưa & Nay", category: "culture", status: "live", date: "10–30/04/2026", time: "08:00 – 17:00", location: "Bảo tàng Điêu khắc Chăm", area: "Đà Nẵng", image: "https://images.unsplash.com/photo-1536924430914-91f9e2041b83?w=700&auto=format&fit=crop", desc: "Hơn 200 bức ảnh lịch sử ghi lại cuộc sống Đà Nẵng qua các thập kỷ.", price: "30.000đ", attendees: 5000, tag: "Triển lãm", tagColor: "from-amber-600 to-orange-600" },
  { id: 4, name: "Festival Biển Đà Nẵng 2026", category: "festival", status: "upcoming", date: "15–20/05/2026", time: "18:00 – 23:00", location: "Bãi biển Mỹ Khê", area: "Đà Nẵng", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&auto=format&fit=crop", desc: "Lễ hội biển lớn nhất với thể thao, âm nhạc, ẩm thực và trình diễn ánh sáng.", price: "Miễn phí", attendees: 50000, tag: "Sắp diễn ra", tagColor: "from-sky-600 to-blue-600" },
  { id: 5, name: "Lễ hội Ẩm thực Phố Cổ Hội An", category: "food", status: "upcoming", date: "20–22/05/2026", time: "09:00 – 22:00", location: "Phố Cổ Hội An", area: "Hội An", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&auto=format&fit=crop", desc: "Hội tụ ẩm thực 3 miền với hơn 500 gian hàng và workshop nấu ăn.", price: "Miễn phí vào cửa", attendees: 30000, tag: "Ẩm thực", tagColor: "from-orange-600 to-red-600" },
  { id: 6, name: "Danang Music Festival 2026", category: "music", status: "upcoming", date: "6–7/06/2026", time: "20:00 – 24:00", location: "Công viên APEC", area: "Đà Nẵng", image: "https://images.unsplash.com/photo-1501386761578-eaa54b7f791e?w=700&auto=format&fit=crop", desc: "Liên hoan âm nhạc quy tụ các nghệ sĩ hàng đầu Việt Nam và quốc tế.", price: "350.000đ", attendees: 20000, tag: "Âm nhạc", tagColor: "from-pink-600 to-fuchsia-600" },
  { id: 7, name: "Marathon Đà Nẵng 2026", category: "sport", status: "upcoming", date: "21/06/2026", time: "04:30 – 12:00", location: "Quảng trường 29/3", area: "Đà Nẵng", image: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=700&auto=format&fit=crop", desc: "Giải chạy marathon quốc tế lớn nhất miền Trung với 10.000+ vận động viên.", price: "Đăng ký từ 500K", attendees: 10000, tag: "Thể thao", tagColor: "from-green-600 to-emerald-600" },
  { id: 8, name: "Lễ hội Đèn lồng Hội An", category: "culture", status: "upcoming", date: "Rằm hàng tháng", time: "18:00 – 22:00", location: "Phố Cổ Hội An", area: "Hội An", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=700&auto=format&fit=crop", desc: "Đêm rằm thả đèn lồng trên sông Hoài — trải nghiệm không thể quên tại Hội An.", price: "Miễn phí", attendees: 15000, tag: "Di sản", tagColor: "from-amber-500 to-yellow-500" },
  { id: 9, name: "Triển lãm Nghệ thuật Đương đại", category: "culture", status: "upcoming", date: "01–30/07/2026", time: "09:00 – 18:00", location: "Trung tâm Nghệ thuật Đà Nẵng", area: "Đà Nẵng", image: "https://images.unsplash.com/photo-1536924430914-91f9e2041b83?w=700&auto=format&fit=crop", desc: "Triển lãm tác phẩm nghệ thuật từ 50 nghệ sĩ trẻ Việt Nam và quốc tế.", price: "50.000đ", attendees: 8000, tag: "Nghệ thuật", tagColor: "from-violet-500 to-purple-600" },
  { id: 10, name: "Hội chợ Du lịch Đà Nẵng 2026", category: "festival", status: "upcoming", date: "15–17/08/2026", time: "09:00 – 21:00", location: "Trung tâm Hội nghị", area: "Đà Nẵng", image: "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?w=700&auto=format&fit=crop", desc: "Hội chợ du lịch lớn nhất miền Trung với 200+ gian hàng từ khắp cả nước.", price: "Miễn phí", attendees: 25000, tag: "Hội chợ", tagColor: "from-indigo-600 to-blue-700" },
];

const heroImages = [
  "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501386761578-eaa54b7f791e?w=800&auto=format&fit=crop",
];
const statsData = [
  { icon: CalendarDays, label: "Sự kiện", value: "40+" },
  { icon: Users,        label: "Lượt tham dự", value: "500K+" },
  { icon: Flame,        label: "Đang diễn ra", value: "3" },
];
const categoryOptions: { value: Category; label: string; icon: typeof Music }[] = [
  { value: "festival", label: "Lễ hội",    icon: Flame },
  { value: "music",    label: "Âm nhạc",   icon: Music },
  { value: "food",     label: "Ẩm thực",   icon: Utensils },
  { value: "culture",  label: "Văn hóa",   icon: Landmark },
  { value: "sport",    label: "Thể thao",  icon: Waves },
];
const statusOptions = [
  { value: "live",     label: "Đang diễn ra" },
  { value: "upcoming", label: "Sắp diễn ra" },
];
const areaOptions = ["Đà Nẵng", "Hội An"];
const sortOptions = [
  { label: "Phổ biến nhất",  value: "popular" },
  { label: "Gần nhất",       value: "name" },
];

export default function Events() {
  const [search, setSearch]         = useState("");
  const [selCats, setSelCats]       = useState<string[]>([]);
  const [selStatus, setSelStatus]   = useState<string[]>([]);
  const [selAreas, setSelAreas]     = useState<string[]>([]);
  const [sort, setSort]             = useState("popular");
  const [liked, setLiked]           = useState<number[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore]   = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const toggleCat    = (v: string) => setSelCats(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleStatus = (v: string) => setSelStatus(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleArea   = (v: string) => setSelAreas(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleLike   = (id: number) => setLiked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => { setVisibleCount(v => v + 3); setLoadingMore(false); }, 800);
  };

  let filtered = ALL_EVENTS.filter(ev => {
    if (search && !ev.name.toLowerCase().includes(search.toLowerCase()) && !ev.location.toLowerCase().includes(search.toLowerCase())) return false;
    if (selCats.length && !selCats.includes(ev.category)) return false;
    if (selStatus.length && !selStatus.includes(ev.status)) return false;
    if (selAreas.length && !selAreas.includes(ev.area)) return false;
    return true;
  });
  if (sort === "popular") filtered = [...filtered].sort((a, b) => b.attendees - a.attendees);

  const visible   = filtered.slice(0, visibleCount);
  const hasMore   = visibleCount < filtered.length;
  const remaining = filtered.length - visibleCount;
  const activeFilterCount = selCats.length + selStatus.length + selAreas.length;

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
              <Radio size={13} className="text-violet-400 animate-pulse" />
              <span>3 sự kiện đang diễn ra tại Đà Nẵng</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-xl">
              Sự Kiện <span className="text-violet-400">&amp; Lễ Hội</span><br />Đà Nẵng 2026
            </h1>
            <p className="text-white/75 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Từ pháo hoa quốc tế đến lễ hội đèn lồng — đừng bỏ lỡ những sự kiện đặc sắc nhất
            </p>
            <div className="flex items-center justify-center gap-6 md:gap-12">
              {statsData.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-1">
                    <Icon size={18} className="text-violet-400" />
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm sự kiện..." className="bg-transparent text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none flex-1" />
            {search && <button onClick={() => setSearch("")}><X size={13} className="text-gray-400" /></button>}
          </div>
          <button onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all border ${showFilter ? "bg-violet-500 border-violet-400 text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            <SlidersHorizontal size={15} />Bộ lọc
            {activeFilterCount > 0 && <span className="w-5 h-5 bg-violet-500 text-white rounded-full text-xs font-bold flex items-center justify-center">{activeFilterCount}</span>}
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
                  <span className="text-gray-400 text-xs font-medium shrink-0">Danh mục</span>
                  {categoryOptions.map(c => (
                    <button key={c.value} onClick={() => toggleCat(c.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selCats.includes(c.value) ? "bg-violet-500 border-violet-500 text-white" : "border-gray-200 text-gray-500 hover:border-violet-300 hover:text-violet-600"}`}>
                      <c.icon size={11} />{c.label}
                    </button>
                  ))}
                </div>
                <div className="w-px h-5 bg-gray-200 hidden md:block" />
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-gray-400 text-xs font-medium shrink-0">Trạng thái</span>
                  {statusOptions.map(s => (
                    <button key={s.value} onClick={() => toggleStatus(s.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selStatus.includes(s.value) ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600"}`}>
                      {s.label}
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
                    <button onClick={() => { setSelCats([]); setSelStatus([]); setSelAreas([]); }} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors">
                      <X size={12} />Xóa
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mb-5">
          <p className="text-gray-500 text-sm"><span className="text-gray-900 font-semibold">{filtered.length}</span> sự kiện phù hợp</p>
          {activeFilterCount > 0 && (
            <button onClick={() => { setSelCats([]); setSelStatus([]); setSelAreas([]); }} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors">
              <X size={12} />Xóa bộ lọc
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-6">
          <AnimatePresence>
            {visible.map((ev, i) => (
              <motion.div key={ev.id} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.07, duration: 0.45 }} whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="relative h-52 overflow-hidden">
                  <img src={ev.image} alt={ev.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${ev.tagColor}`}>{ev.tag}</div>
                  {ev.status === "live" && (
                    <div className="absolute top-3 right-12 flex items-center gap-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      <Radio size={9} className="animate-pulse" />LIVE
                    </div>
                  )}
                  <button onClick={e => { e.stopPropagation(); toggleLike(ev.id); }} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm">
                    <Heart size={15} className={liked.includes(ev.id) ? "text-rose-500 fill-rose-500" : "text-gray-500"} />
                  </button>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
                    <CalendarDays size={11} className="text-white/80" />
                    <span className="text-white/90 text-xs font-medium">{ev.date}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-gray-900 font-bold text-base leading-tight mb-2">{ev.name}</h3>
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">{ev.desc}</p>
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <MapPin size={11} className="text-gray-400 shrink-0" />{ev.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Clock size={11} className="text-gray-400 shrink-0" />{ev.time}
                      <span className="mx-1">·</span>
                      <Tag size={10} className="text-gray-400 shrink-0" />{ev.price}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Users size={11} className="text-gray-400 shrink-0" />{ev.attendees.toLocaleString()} người tham dự
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{ev.area}</span>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-1 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-violet-100">
                      Chi tiết <ChevronRight size={14} />
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
              Đang hiển thị <span className="text-gray-700 font-semibold">{visible.length}</span> / <span className="text-gray-700 font-semibold">{filtered.length}</span> sự kiện
              {" — "}còn <span className="text-violet-600 font-semibold">{remaining}</span> chưa hiển thị
            </p>
            <motion.button whileHover={{ scale: loadingMore ? 1 : 1.04 }} whileTap={{ scale: loadingMore ? 1 : 0.97 }}
              onClick={handleLoadMore} disabled={loadingMore}
              className="flex items-center gap-2.5 px-8 py-3 bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-semibold rounded-2xl shadow-lg shadow-violet-200 hover:from-violet-400 hover:to-indigo-400 transition-all text-sm disabled:opacity-80 disabled:cursor-not-allowed min-w-52 justify-center">
              <AnimatePresence mode="wait">
                {loadingMore
                  ? <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" />Đang tải...</motion.span>
                  : <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">Xem thêm {remaining} sự kiện</motion.span>}
              </AnimatePresence>
            </motion.button>
          </div>
        )}
        {!hasMore && filtered.length > 0 && (
          <div className="pb-12 text-center text-gray-400 text-sm">Đã hiển thị tất cả <span className="text-gray-600 font-semibold">{filtered.length}</span> sự kiện</div>
        )}
        {filtered.length === 0 && (
          <div className="pb-12 flex flex-col items-center justify-center py-16 text-center">
            <CalendarDays size={40} className="text-gray-300 mb-3" />
            <p className="text-gray-600 font-medium">Không tìm thấy sự kiện phù hợp</p>
            <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>
    </div>
  );
}
