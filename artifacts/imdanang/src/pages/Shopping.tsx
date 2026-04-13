import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingBag, Star, MapPin, Clock, Tag, TrendingUp, Gem, ShoppingCart, Package, Shirt, Coffee } from "lucide-react";

const categories = [
  { icon: Gem, label: "Thủ công mỹ nghệ", count: 48, color: "from-violet-500 to-purple-600" },
  { icon: Shirt, label: "Thời trang", count: 95, color: "from-pink-500 to-rose-600" },
  { icon: Coffee, label: "Đặc sản & Thực phẩm", count: 62, color: "from-amber-500 to-orange-600" },
  { icon: Package, label: "Quà lưu niệm", count: 130, color: "from-teal-500 to-cyan-600" },
];

const markets = [
  { id: 1, name: "Chợ Hàn", type: "Chợ truyền thống", rating: 4.6, reviews: 5240, location: "Trần Phú, Hải Châu", time: "06:00 – 21:00", image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=600&auto=format&fit=crop", specialties: ["Mực khô", "Nem nướng", "Vải áo dài"], tag: "Iconic" },
  { id: 2, name: "Chợ Cồn", type: "Chợ ẩm thực & đặc sản", rating: 4.5, reviews: 3120, location: "Ông Ích Khiêm, Hải Châu", time: "05:00 – 20:00", image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&auto=format&fit=crop", specialties: ["Bánh mì Đà Nẵng", "Hải sản khô", "Nước mắm Nam Ô"], tag: "Ẩm thực" },
  { id: 3, name: "Vincom Đà Nẵng", type: "Trung tâm thương mại", rating: 4.7, reviews: 8910, location: "Ngô Quyền, Sơn Trà", time: "09:30 – 22:00", image: "https://images.unsplash.com/photo-1519567770579-c2fc5836898d?w=600&auto=format&fit=crop", specialties: ["Zara", "H&M", "CGV Cinemas"], tag: "Hiện đại" },
  { id: 4, name: "Làng nghề Đá mỹ nghệ Non Nước", type: "Làng nghề truyền thống", rating: 4.8, reviews: 2340, location: "Ngũ Hành Sơn", time: "07:00 – 18:00", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop", specialties: ["Tượng đá", "Đá cẩm thạch", "Đồ trang trí"], tag: "Đặc sắc" },
  { id: 5, name: "Lotte Mart Đà Nẵng", type: "Siêu thị & Mall", rating: 4.6, reviews: 6700, location: "Nguyễn Văn Linh, Thanh Khê", time: "08:00 – 22:00", image: "https://images.unsplash.com/photo-1606044466411-5e9e75b31f73?w=600&auto=format&fit=crop", specialties: ["Thực phẩm Hàn", "Đồ dùng gia đình", "Mỹ phẩm"], tag: "Mall" },
  { id: 6, name: "Phố Ông Ích Khiêm", type: "Phố mua sắm", rating: 4.4, reviews: 1890, location: "Ông Ích Khiêm, Hải Châu", time: "08:00 – 21:00", image: "https://images.unsplash.com/photo-1555529669-2269763671c0?w=600&auto=format&fit=crop", specialties: ["Quần áo sỉ", "Vải vóc", "Phụ kiện"], tag: "Giá tốt" },
];

export default function Shopping() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-950/70 via-gray-950 to-gray-950" ref={ref}>
      <div className="relative h-64 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1555529669-2269763671c0?w=1400&auto=format&fit=crop" alt="Shopping" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-pink-950/60 via-pink-950/50 to-gray-950" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-pink-400/20 border border-pink-400/30 text-pink-300 rounded-full px-4 py-1.5 text-sm mb-4">
              <ShoppingBag size={14} />335 Địa điểm mua sắm
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">Mua Sắm Tại Đà Nẵng</h1>
            <p className="text-white/60 text-base max-w-lg">Từ chợ truyền thống đến trung tâm thương mại hiện đại</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 pb-14 space-y-10">
        <div>
          <motion.h2 initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-white font-bold text-xl mb-5">Danh mục mua sắm</motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.label} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }} whileHover={{ scale: 1.05, y: -4 }} className="cursor-pointer group">
                <div className={`bg-gradient-to-br ${cat.color} p-5 rounded-2xl mb-2 flex flex-col items-center justify-center h-28 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <cat.icon size={28} className="text-white mb-2" />
                  <span className="text-white/90 text-xs">{cat.count} địa điểm</span>
                </div>
                <p className="text-white/70 text-sm text-center font-medium">{cat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-5">
            <motion.h2 initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-white font-bold text-xl">Chợ & Trung tâm mua sắm</motion.h2>
            <div className="flex items-center gap-2 text-pink-400 text-sm font-medium"><TrendingUp size={14} />Phổ biến nhất</div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {markets.map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.07 }} whileHover={{ y: -6 }} className="bg-gray-900 rounded-2xl overflow-hidden border border-white/8 shadow-xl group cursor-pointer" data-testid={`card-shopping-${m.id}`}>
                <div className="relative h-44 overflow-hidden">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{m.tag}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-white font-bold text-sm leading-tight">{m.name}</h3>
                    <div className="shrink-0 flex items-center gap-1 text-amber-400"><Star size={11} className="fill-amber-400" /><span className="text-xs font-bold text-amber-400">{m.rating}</span></div>
                  </div>
                  <p className="text-white/40 text-xs mb-3">{m.type} · {m.reviews.toLocaleString()} đánh giá</p>
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-2 text-white/50 text-xs"><MapPin size={11} className="text-pink-400" />{m.location}</div>
                    <div className="flex items-center gap-2 text-white/50 text-xs"><Clock size={11} className="text-pink-400" />{m.time}</div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {m.specialties.map((s) => (
                      <span key={s} className="flex items-center gap-1 bg-white/6 text-white/50 text-xs px-2 py-0.5 rounded-full border border-white/8"><Tag size={9} />{s}</span>
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
