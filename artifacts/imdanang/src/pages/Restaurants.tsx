import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, MapPin, Clock, Phone, Heart, ChefHat, Flame, Leaf, Fish, Beef, Coffee } from "lucide-react";

const cuisines = [
  { id: "all", label: "Tất cả", icon: ChefHat },
  { id: "seafood", label: "Hải sản", icon: Fish },
  { id: "vietnamese", label: "Việt Nam", icon: Flame },
  { id: "vegan", label: "Chay", icon: Leaf },
  { id: "bbq", label: "Nướng", icon: Beef },
  { id: "cafe", label: "Cà phê", icon: Coffee },
];

const restaurants = [
  { id: 1, name: "Madame Lân Restaurant", cuisine: "vietnamese", rating: 4.8, reviews: 3240, price: "150K–400K", time: "10:00–22:00", location: "Bạch Đằng, Hải Châu", phone: "0236 3561 234", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop", tags: ["Đặc sản", "View đẹp"], featured: true },
  { id: 2, name: "Nhà Hàng Trúc Lâm Viên", cuisine: "vegan", rating: 4.7, reviews: 1820, price: "80K–200K", time: "07:00–21:00", location: "Ngô Quyền, Sơn Trà", phone: "0236 3926 630", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop", tags: ["Chay", "Không gian xanh"], featured: false },
  { id: 3, name: "Bé Mặn Seafood", cuisine: "seafood", rating: 4.9, reviews: 5410, price: "200K–800K", time: "09:00–23:00", location: "Mỹ Khê Beach", phone: "0236 3963 963", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&auto=format&fit=crop", tags: ["Tươi sống", "Bờ biển"], featured: true },
  { id: 4, name: "Grill & Chill BBQ", cuisine: "bbq", rating: 4.6, reviews: 2100, price: "150K–500K", time: "16:00–24:00", location: "Nguyễn Văn Linh", phone: "0236 3888 999", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&auto=format&fit=crop", tags: ["Nướng than hoa", "Beer garden"], featured: false },
  { id: 5, name: "Cong Caphe", cuisine: "cafe", rating: 4.8, reviews: 6730, price: "35K–90K", time: "07:00–23:00", location: "Bạch Đằng, ven sông Hàn", phone: "0236 3567 890", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop", tags: ["View sông Hàn", "Cà phê trứng"], featured: true },
  { id: 6, name: "Waterfront Restaurant", cuisine: "seafood", rating: 4.7, reviews: 2890, price: "300K–1.2M", time: "11:00–22:30", location: "Trần Hưng Đạo, Sơn Trà", phone: "0236 3847 373", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop", tags: ["Fine dining", "Hải sản"], featured: false },
];

export default function Restaurants() {
  const [activeCuisine, setActiveCuisine] = useState("all");
  const [liked, setLiked] = useState<number[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const filtered = activeCuisine === "all" ? restaurants : restaurants.filter((r) => r.cuisine === activeCuisine);
  const toggleLike = (id: number) => setLiked((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-950/80 via-gray-950 to-gray-950" ref={ref}>
      <div className="relative h-64 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&auto=format&fit=crop" alt="Restaurants" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/60 via-orange-950/50 to-gray-950" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-orange-400/20 border border-orange-400/30 text-orange-300 rounded-full px-4 py-1.5 text-sm mb-4">
              <ChefHat size={14} />240+ Nhà hàng & Quán ăn
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">Ẩm Thực Đà Nẵng</h1>
            <p className="text-white/60 text-base max-w-lg">Từ hải sản tươi sống đến ẩm thực đường phố đậm đà bản sắc</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          {cuisines.map((c) => (
            <button key={c.id} onClick={() => setActiveCuisine(c.id)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCuisine === c.id ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25" : "bg-white/8 text-white/60 hover:bg-white/14 hover:text-white border border-white/10"}`}>
              <c.icon size={14} />{c.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {filtered.map((r, i) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="bg-gray-900 rounded-2xl overflow-hidden border border-white/8 shadow-xl group cursor-pointer"
              data-testid={`card-restaurant-${r.id}`}
            >
              <div className="relative h-52 overflow-hidden">
                <img src={r.image} alt={r.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                {r.featured && <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">Nổi bật</span>}
                <button onClick={() => toggleLike(r.id)} className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors">
                  <Heart size={15} className={liked.includes(r.id) ? "text-rose-500 fill-rose-500" : "text-white"} />
                </button>
                <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
                  {r.tags.map((t) => <span key={t} className="bg-black/50 backdrop-blur-sm text-white/80 text-xs px-2 py-0.5 rounded-full">{t}</span>)}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-white font-bold text-base leading-tight">{r.name}</h3>
                  <div className="shrink-0 flex items-center gap-1 bg-orange-500/20 text-orange-400 rounded-lg px-2 py-0.5">
                    <Star size={11} className="fill-orange-400" />
                    <span className="text-xs font-bold">{r.rating}</span>
                  </div>
                </div>
                <p className="text-white/40 text-xs mb-3">{r.reviews.toLocaleString()} đánh giá · {r.price}</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs"><MapPin size={12} className="text-orange-400 shrink-0" />{r.location}</div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs"><Clock size={12} className="text-orange-400 shrink-0" />{r.time}</div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs"><Phone size={12} className="text-orange-400 shrink-0" />{r.phone}</div>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-4 w-full bg-orange-500/15 hover:bg-orange-500 border border-orange-500/30 hover:border-transparent text-orange-400 hover:text-white text-sm font-semibold py-2.5 rounded-xl transition-all">
                  Xem menu & Đặt bàn
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
