import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Camera, Star, Heart, ChevronRight, Compass, Mountain, Waves, Landmark, TreePine } from "lucide-react";

const categories = [
  { id: "all", label: "Tất cả", icon: Compass },
  { id: "beach", label: "Bãi biển", icon: Waves },
  { id: "mountain", label: "Núi rừng", icon: Mountain },
  { id: "heritage", label: "Di sản", icon: Landmark },
  { id: "nature", label: "Thiên nhiên", icon: TreePine },
];

const places = [
  { id: 1, name: "Bãi biển Mỹ Khê", category: "beach", rating: 4.9, reviews: 8412, distance: "5km", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&auto=format&fit=crop", desc: "Một trong những bãi biển đẹp nhất thế giới với cát trắng mịn dài 9km", tag: "Hot", tagColor: "from-orange-500 to-red-500" },
  { id: 2, name: "Bà Nà Hills & Cầu Vàng", category: "mountain", rating: 4.9, reviews: 15230, distance: "35km", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&auto=format&fit=crop", desc: "Khu nghỉ dưỡng trên mây với cây cầu Vàng nổi tiếng thế giới", tag: "Nổi tiếng", tagColor: "from-violet-500 to-purple-600" },
  { id: 3, name: "Phố Cổ Hội An", category: "heritage", rating: 4.9, reviews: 22100, distance: "28km", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=700&auto=format&fit=crop", desc: "Di sản văn hóa UNESCO với những con phố đèn lồng rực rỡ huyền ảo", tag: "UNESCO", tagColor: "from-amber-500 to-yellow-500" },
  { id: 4, name: "Ngũ Hành Sơn", category: "nature", rating: 4.7, reviews: 5642, distance: "9km", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=700&auto=format&fit=crop", desc: "Quần thể danh thắng gồm 5 ngọn núi đá cẩm thạch huyền bí", tag: "Thiên nhiên", tagColor: "from-teal-500 to-cyan-500" },
  { id: 5, name: "Đèo Hải Vân", category: "mountain", rating: 4.8, reviews: 7819, distance: "25km", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&auto=format&fit=crop", desc: "Con đèo hùng vĩ với cảnh biển và rừng núi hòa quyện tuyệt đẹp", tag: "Phong cảnh", tagColor: "from-emerald-500 to-green-600" },
  { id: 6, name: "Cầu Rồng", category: "heritage", rating: 4.8, reviews: 12340, distance: "3km", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=700&auto=format&fit=crop", desc: "Biểu tượng của Đà Nẵng, phun lửa và nước mỗi cuối tuần", tag: "Biểu tượng", tagColor: "from-rose-500 to-pink-600" },
  { id: 7, name: "Bán đảo Sơn Trà", category: "nature", rating: 4.8, reviews: 4230, distance: "12km", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&auto=format&fit=crop", desc: "Khu bảo tồn thiên nhiên hoang sơ với voọc chà vá chân đỏ quý hiếm", tag: "Hoang dã", tagColor: "from-green-500 to-lime-600" },
  { id: 8, name: "Cù Lao Chàm", category: "beach", rating: 4.8, reviews: 6750, distance: "65km", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=700&auto=format&fit=crop", desc: "Đảo thiên đường với làn nước trong vắt, san hô rực rỡ", tag: "Đảo ngọc", tagColor: "from-cyan-500 to-sky-600" },
];

export default function Destinations() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [liked, setLiked] = useState<number[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const filtered = activeCategory === "all" ? places : places.filter((p) => p.category === activeCategory);
  const toggleLike = (id: number) => setLiked((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-950 via-gray-950 to-gray-950" ref={ref}>
      <div className="relative h-64 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&auto=format&fit=crop" alt="Destinations" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/60 via-teal-950/50 to-gray-950" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-teal-400/20 border border-teal-400/30 text-teal-300 rounded-full px-4 py-1.5 text-sm mb-4">
              <Camera size={14} />85 Địa điểm tham quan
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">Khám Phá Đà Nẵng</h1>
            <p className="text-white/60 text-base max-w-lg">Những điểm đến tuyệt vời nhất của thành phố biển miền Trung</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id ? "bg-teal-500 text-white shadow-lg shadow-teal-500/25" : "bg-white/8 text-white/60 hover:bg-white/14 hover:text-white border border-white/10"}`}
            >
              <cat.icon size={14} />{cat.label}
            </button>
          ))}
          <span className="ml-auto text-white/40 text-sm">{filtered.length} địa điểm</span>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-12">
          {filtered.map((place, i) => (
            <motion.div
              key={place.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ y: -8 }}
              className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-xl"
              style={{ height: i % 5 === 0 ? "340px" : "280px" }}
              data-testid={`card-destination-${place.id}`}
            >
              <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-108" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${place.tagColor}`}>{place.tag}</div>
              <button onClick={() => toggleLike(place.id)} className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors">
                <Heart size={15} className={liked.includes(place.id) ? "text-rose-500 fill-rose-500" : "text-white"} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-1 mb-1.5">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  <span className="text-amber-300 text-xs font-bold">{place.rating}</span>
                  <span className="text-white/40 text-xs">({place.reviews.toLocaleString()})</span>
                </div>
                <h3 className="text-white font-bold text-sm leading-tight mb-1">{place.name}</h3>
                <p className="text-white/55 text-xs line-clamp-2 leading-relaxed">{place.desc}</p>
                <div className="flex items-center justify-between mt-2.5">
                  <div className="flex items-center gap-1 text-white/40 text-xs"><MapPin size={10} />{place.distance} từ trung tâm</div>
                  <div className="flex items-center gap-1 text-teal-400 text-xs font-medium group-hover:gap-1.5 transition-all">Khám phá<ChevronRight size={12} /></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
