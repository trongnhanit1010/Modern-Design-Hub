import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingBag, Star, MapPin, Clock, Tag, TrendingUp, Gem, Package, Shirt, Coffee, Search, Sparkles, Heart, Percent, ChevronRight } from "lucide-react";

const categories = [
  { icon: Gem, label: "Thủ công mỹ nghệ", count: 48, color: "from-violet-400 to-purple-500", bg: "bg-violet-50 border-violet-100" },
  { icon: Shirt, label: "Thời trang", count: 95, color: "from-pink-400 to-rose-500", bg: "bg-pink-50 border-pink-100" },
  { icon: Coffee, label: "Đặc sản & Thực phẩm", count: 62, color: "from-amber-400 to-orange-500", bg: "bg-amber-50 border-amber-100" },
  { icon: Package, label: "Quà lưu niệm", count: 130, color: "from-teal-400 to-cyan-500", bg: "bg-teal-50 border-teal-100" },
];

const markets = [
  { id: 1, name: "Chợ Hàn", type: "Chợ truyền thống", rating: 4.6, reviews: 5240, location: "Trần Phú, Hải Châu", time: "06:00 – 21:00", image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=600&auto=format&fit=crop", specialties: ["Mực khô", "Nem nướng", "Vải áo dài"], tag: "Iconic", tagColor: "bg-pink-500" },
  { id: 2, name: "Chợ Cồn", type: "Chợ ẩm thực & đặc sản", rating: 4.5, reviews: 3120, location: "Ông Ích Khiêm, Hải Châu", time: "05:00 – 20:00", image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&auto=format&fit=crop", specialties: ["Bánh mì Đà Nẵng", "Hải sản khô", "Nước mắm Nam Ô"], tag: "Ẩm thực", tagColor: "bg-orange-500" },
  { id: 3, name: "Vincom Đà Nẵng", type: "Trung tâm thương mại", rating: 4.7, reviews: 8910, location: "Ngô Quyền, Sơn Trà", time: "09:30 – 22:00", image: "https://images.unsplash.com/photo-1519567770579-c2fc5836898d?w=600&auto=format&fit=crop", specialties: ["Zara", "H&M", "CGV Cinemas"], tag: "Hiện đại", tagColor: "bg-blue-500" },
  { id: 4, name: "Làng nghề Đá mỹ nghệ Non Nước", type: "Làng nghề truyền thống", rating: 4.8, reviews: 2340, location: "Ngũ Hành Sơn", time: "07:00 – 18:00", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop", specialties: ["Tượng đá", "Đá cẩm thạch", "Đồ trang trí"], tag: "Đặc sắc", tagColor: "bg-violet-500" },
  { id: 5, name: "Lotte Mart Đà Nẵng", type: "Siêu thị & Mall", rating: 4.6, reviews: 6700, location: "Nguyễn Văn Linh, Thanh Khê", time: "08:00 – 22:00", image: "https://images.unsplash.com/photo-1606044466411-5e9e75b31f73?w=600&auto=format&fit=crop", specialties: ["Thực phẩm Hàn", "Đồ dùng gia đình", "Mỹ phẩm"], tag: "Mall", tagColor: "bg-red-500" },
  { id: 6, name: "Phố Ông Ích Khiêm", type: "Phố mua sắm", rating: 4.4, reviews: 1890, location: "Ông Ích Khiêm, Hải Châu", time: "08:00 – 21:00", image: "https://images.unsplash.com/photo-1555529669-2269763671c0?w=600&auto=format&fit=crop", specialties: ["Quần áo sỉ", "Vải vóc", "Phụ kiện"], tag: "Giá tốt", tagColor: "bg-green-500" },
];

export default function Shopping() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-50" ref={ref}>
      {/* ── Hero ── Magazine SALE Cover ── */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#fdf2f8 0%,#fce7f3 50%,#fbcfe8 100%)" }}>
        {/* Floating price tags */}
        {[
          { x: "8%", y: "15%", rot: -12, size: 60, label: "-50%" },
          { x: "82%", y: "12%", rot: 14, size: 70, label: "SALE" },
          { x: "85%", y: "62%", rot: -8, size: 55, label: "HOT" },
          { x: "10%", y: "70%", rot: 10, size: 50, label: "NEW" },
        ].map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: t.rot, y: [0, -8, 0] }}
            transition={{ scale: { duration: 0.6, delay: i * 0.15 }, y: { duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute hidden md:flex items-center justify-center font-black text-white shadow-xl"
            style={{
              left: t.x, top: t.y, width: t.size, height: t.size, fontSize: t.size / 4.5,
              background: "linear-gradient(135deg,#ec4899,#db2777)",
              clipPath: "polygon(20% 0,100% 0,100% 100%,20% 100%,0 50%)",
            }}
          >
            {t.label}
          </motion.div>
        ))}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-pink-600 text-white text-xs font-black tracking-wider shadow-lg">
              <Sparkles size={13} />
              MÙA MUA SẮM 2026 · 335 ĐỊA ĐIỂM
            </div>

            {/* Magazine title with stripes underline */}
            <div className="relative inline-block">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.9] mb-3 text-pink-950">
                MUA SẮM
              </h1>
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.span key={i} className="block h-1 w-8 rounded-full bg-pink-500"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 + i * 0.05 }} style={{ transformOrigin: "left" }} />
                ))}
              </div>
              <h2 className="text-pink-700 italic text-2xl sm:text-3xl font-bold mb-2" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                Đà Nẵng Edition
              </h2>
            </div>

            <p className="text-pink-900/70 text-base max-w-xl mx-auto leading-relaxed mb-6">
              Chợ Hàn cổ kính, Vincom hiện đại, làng nghề độc bản — bộ sưu tập mua sắm hot nhất xứ Quảng.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 mb-7">
              {[
                { Icon: ShoppingBag, value: "335", label: "Địa điểm", color: "bg-pink-500" },
                { Icon: Percent, value: "12%", label: "Giảm TB", color: "bg-rose-500" },
                { Icon: Heart, value: "4.7", label: "Yêu thích", color: "bg-fuchsia-500" },
              ].map(({ Icon, value, label, color }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-2xl ${color} flex items-center justify-center text-white shadow-md`}>
                    <Icon size={16} />
                  </div>
                  <div className="text-left">
                    <div className="font-black text-pink-950 text-base leading-none">{value}</div>
                    <div className="text-pink-700/60 text-[11px]">{label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Barcode-styled search */}
            <div className="max-w-xl mx-auto relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-pink-950 text-pink-100 text-[10px] font-black tracking-[0.4em] rounded-md z-10">
                BARCODE · SCAN
              </div>
              <div className="rounded-2xl bg-white p-2 flex items-center gap-2 shadow-2xl border-4 border-pink-900">
                {/* Mock barcode */}
                <div className="hidden sm:flex items-center gap-[1.5px] px-3 py-3 bg-pink-50 rounded-xl">
                  {[2, 4, 1, 3, 5, 1, 2, 4, 1, 3].map((w, i) => (
                    <span key={i} className="block bg-pink-950" style={{ width: w, height: 28 }} />
                  ))}
                </div>
                <div className="flex items-center gap-2 flex-1 px-2">
                  <Search size={16} className="text-pink-600" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm chợ, mall, đặc sản..." className="flex-1 bg-transparent text-pink-950 placeholder:text-pink-500/50 text-sm focus:outline-none" />
                </div>
                <button className="bg-gradient-to-br from-pink-500 to-rose-600 text-white font-black px-5 py-2.5 rounded-xl text-sm flex items-center gap-1">
                  Săn sale <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 pb-14 space-y-10">
        <div>
          <motion.h2 initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-gray-900 font-bold text-xl mb-5">Danh mục mua sắm</motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.label} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }} whileHover={{ scale: 1.05, y: -4 }} className={`bg-white border rounded-2xl p-5 cursor-pointer group hover:shadow-lg transition-shadow ${cat.bg}`}>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3 shadow-md`}>
                  <cat.icon size={22} className="text-white" />
                </div>
                <p className="text-gray-900 text-sm font-semibold mb-1">{cat.label}</p>
                <p className="text-gray-400 text-xs">{cat.count} địa điểm</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-5">
            <motion.h2 initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-gray-900 font-bold text-xl">Chợ & Trung tâm mua sắm</motion.h2>
            <div className="flex items-center gap-2 text-pink-500 text-sm font-medium"><TrendingUp size={14} />Phổ biến nhất</div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {markets.map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.07 }} whileHover={{ y: -6 }} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-shadow group cursor-pointer" data-testid={`card-shopping-${m.id}`}>
                <div className="relative h-44 overflow-hidden">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className={`absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md ${m.tagColor}`}>{m.tag}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-gray-900 font-bold text-sm leading-tight">{m.name}</h3>
                    <div className="shrink-0 flex items-center gap-1 text-amber-500"><Star size={11} className="fill-amber-400 text-amber-400" /><span className="text-xs font-bold text-amber-600">{m.rating}</span></div>
                  </div>
                  <p className="text-gray-400 text-xs mb-3">{m.type} · {m.reviews.toLocaleString()} đánh giá</p>
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-2 text-gray-500 text-xs"><MapPin size={11} className="text-pink-400 shrink-0" />{m.location}</div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs"><Clock size={11} className="text-pink-400 shrink-0" />{m.time}</div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {m.specialties.map((s) => (
                      <span key={s} className="flex items-center gap-1 bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full border border-gray-200"><Tag size={9} />{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
