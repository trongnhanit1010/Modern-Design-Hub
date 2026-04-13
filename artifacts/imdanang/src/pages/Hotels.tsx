import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, MapPin, Wifi, Waves, Utensils, Car, Heart, Filter, Search, Sparkles } from "lucide-react";

const hotels = [
  { id: 1, name: "Crowne Plaza Danang", stars: 5, rating: 4.9, reviews: 1240, price: 3200000, location: "Mỹ Khê Beach", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop", amenities: ["wifi", "pool", "restaurant", "parking"], tag: "Best Seller", tagColor: "bg-amber-500" },
  { id: 2, name: "Grand Tourane Hotel", stars: 5, rating: 4.7, reviews: 876, price: 2400000, location: "City Center", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop", amenities: ["wifi", "restaurant", "parking"], tag: "Great Value", tagColor: "bg-teal-500" },
  { id: 3, name: "Furama Resort Danang", stars: 5, rating: 4.8, reviews: 2341, price: 5800000, location: "Non Nước Beach", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop", amenities: ["wifi", "pool", "restaurant"], tag: "Luxury Pick", tagColor: "bg-violet-500" },
  { id: 4, name: "Vinpearl Resort & Spa", stars: 5, rating: 4.8, reviews: 1923, price: 4500000, location: "Bãi Bắc", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop", amenities: ["wifi", "pool", "restaurant", "parking"], tag: "Top Rated", tagColor: "bg-rose-500" },
  { id: 5, name: "Brilliant Hotel Danang", stars: 4, rating: 4.5, reviews: 654, price: 1200000, location: "Bạch Đằng Street", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&auto=format&fit=crop", amenities: ["wifi", "restaurant"], tag: "Budget Friendly", tagColor: "bg-green-500" },
  { id: 6, name: "Pullman Danang Beach", stars: 5, rating: 4.7, reviews: 1087, price: 3900000, location: "Mỹ Khê Beach", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&auto=format&fit=crop", amenities: ["wifi", "pool", "restaurant", "parking"], tag: "Sea View", tagColor: "bg-sky-500" },
];

const amenityIcons = { wifi: Wifi, pool: Waves, restaurant: Utensils, parking: Car };

const filters = ["Tất cả", "5 Sao", "4 Sao", "Bãi biển", "Trung tâm", "Giá tốt"];

export default function Hotels() {
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [liked, setLiked] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const toggleLike = (id: number) => setLiked((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  return (
    <div className="min-h-screen bg-gray-950" ref={ref}>
      <div className="relative h-72 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&auto=format&fit=crop" alt="Hotels" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-gray-950/40 to-gray-950" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 rounded-full px-4 py-1.5 text-sm mb-4">
              <Sparkles size={14} />128 Khách sạn tại Đà Nẵng
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Chỗ Nghỉ Cao Cấp</h1>
            <p className="text-white/60 text-lg max-w-xl">Trải nghiệm những khách sạn đẳng cấp nhất tại thành phố biển</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gray-900 rounded-2xl p-4 mb-8 flex flex-wrap items-center gap-3 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-4 py-2.5 flex-1 min-w-48">
            <Search size={16} className="text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm khách sạn..." className="bg-transparent text-white text-sm placeholder:text-gray-500 focus:outline-none flex-1" />
          </div>
          <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-4 py-2.5 text-gray-400 text-sm cursor-pointer hover:bg-gray-700 transition-colors">
            <Filter size={15} />Lọc
          </div>
          <div className="flex items-center gap-2 bg-amber-500 rounded-xl px-5 py-2.5 text-white text-sm font-semibold cursor-pointer hover:bg-amber-400 transition-colors">
            Tìm kiếm
          </div>
        </motion.div>

        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {filters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === f ? "bg-amber-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-12">
          {hotels.map((hotel, i) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-gray-900 rounded-2xl overflow-hidden border border-white/8 shadow-xl group cursor-pointer"
              data-testid={`card-hotel-${hotel.id}`}
            >
              <div className="relative h-52 overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white ${hotel.tagColor}`}>{hotel.tag}</span>
                <button onClick={() => toggleLike(hotel.id)} className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors">
                  <Heart size={16} className={liked.includes(hotel.id) ? "text-rose-500 fill-rose-500" : "text-white"} />
                </button>
                <div className="absolute bottom-3 left-3 flex">
                  {[...Array(hotel.stars)].map((_, s) => <Star key={s} size={12} className="text-amber-400 fill-amber-400" />)}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-white font-bold text-base leading-tight">{hotel.name}</h3>
                  <div className="shrink-0 flex items-center gap-1 bg-amber-500/20 text-amber-400 rounded-lg px-2 py-0.5">
                    <Star size={11} className="fill-amber-400" />
                    <span className="text-xs font-bold">{hotel.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                  <MapPin size={11} /><span>{hotel.location}</span>
                  <span className="mx-1">·</span><span className="text-gray-500">{hotel.reviews.toLocaleString()} đánh giá</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  {hotel.amenities.map((a) => {
                    const Icon = amenityIcons[a as keyof typeof amenityIcons];
                    return Icon ? <div key={a} className="p-1.5 bg-gray-800 rounded-lg"><Icon size={13} className="text-gray-400" /></div> : null;
                  })}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold text-lg">{hotel.price.toLocaleString("vi-VN")}₫</span>
                    <span className="text-gray-500 text-xs">/đêm</span>
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
                    Đặt ngay
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
