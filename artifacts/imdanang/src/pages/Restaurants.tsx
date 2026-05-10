import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, Clock, Heart, ChevronRight, Loader2,
  UtensilsCrossed, TrendingUp, Award, Users,
} from "lucide-react";
import { CategoryShell, useThemeAccents } from "@/components/category/CategoryShell";

const restaurants = [
  { id: 1,  name: "Madame Lân Restaurant",     cuisine: "vietnamese",    area: "Đà Nẵng", rating: 4.8, reviews: 3240, price: "150K–400K",  time: "10:00–22:00", location: "Bạch Đằng, Hải Châu",        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop", tag: "Đặc sản" },
  { id: 2,  name: "Bé Mặn Seafood",            cuisine: "seafood",       area: "Đà Nẵng", rating: 4.9, reviews: 5410, price: "200K–800K",  time: "09:00–23:00", location: "Mỹ Khê, Sơn Trà",            image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop", tag: "Tươi sống" },
  { id: 3,  name: "Waterfront Restaurant",     cuisine: "international", area: "Đà Nẵng", rating: 4.7, reviews: 2890, price: "300K–1.2M",  time: "11:00–22:30", location: "Trần Hưng Đạo, Sơn Trà",     image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop", tag: "Fine Dining" },
  { id: 4,  name: "Trúc Lâm Viên",             cuisine: "vegan",         area: "Đà Nẵng", rating: 4.7, reviews: 1820, price: "80K–200K",   time: "07:00–21:00", location: "Ngô Quyền, Sơn Trà",         image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop", tag: "Thuần Chay" },
  { id: 5,  name: "Grill & Chill BBQ",         cuisine: "bbq",           area: "Đà Nẵng", rating: 4.6, reviews: 2100, price: "150K–500K",  time: "16:00–24:00", location: "Nguyễn Văn Linh",            image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop", tag: "Nướng" },
  { id: 6,  name: "Cong Caphe",                cuisine: "cafe",          area: "Đà Nẵng", rating: 4.8, reviews: 6730, price: "35K–90K",    time: "07:00–23:00", location: "Bạch Đằng, Hải Châu",        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop", tag: "View Sông Hàn" },
  { id: 7,  name: "Nhà Hàng Trần",             cuisine: "seafood",       area: "Đà Nẵng", rating: 4.7, reviews: 4100, price: "200K–700K",  time: "10:00–23:00", location: "Hoàng Sa, Sơn Trà",          image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop", tag: "Hải Sản" },
  { id: 8,  name: "The Deck House Hội An",     cuisine: "international", area: "Hội An",  rating: 4.8, reviews: 3250, price: "200K–600K",  time: "10:00–22:00", location: "Nguyễn Phúc Tần, Hội An",    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop", tag: "Riverside" },
  { id: 9,  name: "Mì Quảng 1A",               cuisine: "vietnamese",    area: "Đà Nẵng", rating: 4.8, reviews: 7200, price: "35K–60K",    time: "06:00–14:00", location: "Hải Phòng, Hải Châu",        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop", tag: "Đặc sản số 1" },
  { id: 10, name: "Morning Glory Hội An",      cuisine: "vietnamese",    area: "Hội An",  rating: 4.9, reviews: 9800, price: "120K–350K",  time: "09:00–22:00", location: "Nguyễn Huệ, Hội An",         image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop", tag: "Top Rated" },
  { id: 11, name: "Nhà Hàng Làng Chài",        cuisine: "seafood",       area: "Hội An",  rating: 4.6, reviews: 2100, price: "150K–500K",  time: "10:00–22:00", location: "Cẩm Nam, Hội An",            image: "https://images.unsplash.com/photo-1559595500-e15296152eb3?w=800&auto=format&fit=crop", tag: "Truyền Thống" },
  { id: 12, name: "Souls Kitchen",             cuisine: "international", area: "Đà Nẵng", rating: 4.7, reviews: 1580, price: "180K–500K",  time: "12:00–23:00", location: "Mỹ Khê, Sơn Trà",            image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop", tag: "Trendy" },
];

const cuisineFilters = [
  { key: "all",           label: "Tất cả"   },
  { key: "seafood",       label: "Hải sản"  },
  { key: "vietnamese",    label: "Việt Nam" },
  { key: "international", label: "Quốc tế"  },
  { key: "vegan",         label: "Chay"     },
  { key: "bbq",           label: "Nướng"    },
  { key: "cafe",          label: "Cà phê"   },
];
const sortOptions = [
  { label: "Phổ biến",     value: "popular" },
  { label: "Đánh giá cao", value: "rating"  },
  { label: "Tên A → Z",    value: "name"    },
];

const collage = [
  { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&auto=format&fit=crop", className: "top-0 right-0 w-[58%] h-[58%]" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&auto=format&fit=crop", className: "top-[18%] left-0 w-[48%] h-[52%]" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop", className: "bottom-0 right-[10%] w-[52%] h-[42%]" },
];

export default function Restaurants() {
  const [search, setSearch]       = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [sort, setSort]           = useState("popular");
  const [liked, setLiked]         = useState<number[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore]   = useState(false);
  const acc = useThemeAccents("restaurants");

  const toggleLike = (id: number) => setLiked((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => { setVisibleCount((v) => v + 3); setLoadingMore(false); }, 800);
  };

  let filtered = restaurants.filter((r) => {
    if (activeCat !== "all" && r.cuisine !== activeCat) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!r.name.toLowerCase().includes(q) && !r.location.toLowerCase().includes(q)) return false;
    }
    return true;
  });
  if (sort === "popular")     filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
  else if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sort === "name")   filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const visible   = filtered.slice(0, visibleCount);
  const hasMore   = visibleCount < filtered.length;
  const remaining = filtered.length - visibleCount;

  return (
    <CategoryShell
      themeKey="restaurants"
      heroVariant="split"
      badge={{ icon: UtensilsCrossed, text: "Đặc sản xứ Quảng · 240+ quán" }}
      titleLines={["Ngon khó", "cưỡng lại."]}
      gradientLineIndex={1}
      subtitle="Hải sản Mỹ Khê, fine-dining sông Hàn, quán cũ phố cổ Hội An."
      stats={[
        { icon: UtensilsCrossed, label: "Nhà hàng",    value: "240+" },
        { icon: Award,           label: "Điểm TB",     value: "4.7"  },
        { icon: Users,           label: "Đánh giá",    value: "48K+" },
      ]}
      collage={collage}
      floatingBadge={{ icon: Award, title: "Madame Lân", subtitle: "★ ICONIC" }}
      search={search}
      setSearch={setSearch}
      searchPlaceholder="Tìm món, quán ăn..."
      categories={cuisineFilters}
      activeCat={activeCat}
      setActiveCat={setActiveCat}
      sortOptions={sortOptions}
      sort={sort}
      setSort={setSort}
      resultCount={<><span className="text-gray-800 font-semibold">{filtered.length}</span> nhà hàng phù hợp</>}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
        <AnimatePresence>
          {visible.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-200 transition-all"
              data-testid={`card-restaurant-${r.id}`}
            >
              <div className="relative h-52 overflow-hidden">
                <img src={r.image} alt={r.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div
                  className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ background: `linear-gradient(135deg, ${acc.orbA}, ${acc.orbB})` }}
                >
                  {r.tag}
                </div>
                <button
                  onClick={() => toggleLike(r.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition-colors"
                >
                  <Heart size={15} className={liked.includes(r.id) ? "text-rose-400 fill-rose-400" : "text-white/80"} />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-gray-900 font-bold text-base leading-tight">{r.name}</h3>
                  <div className="shrink-0 flex items-center gap-1 rounded-lg px-2 py-0.5 border border-amber-200 bg-amber-50">
                    <Star size={11} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-amber-700">{r.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                  <MapPin size={11} className="shrink-0 text-gray-300" /><span>{r.location}</span>
                  <span className="mx-1">·</span><span>{r.reviews.toLocaleString()} đ.giá</span>
                </div>
                <div className="flex items-center gap-3 mb-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1"><Clock size={11} className="text-gray-300" />{r.time}</div>
                  <div className="flex items-center gap-1"><TrendingUp size={11} style={{ color: acc.orbA }} />{r.price}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">{r.area}</span>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-1 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${acc.orbA}, ${acc.orbB})`,
                      boxShadow: `0 6px 18px ${acc.orbA}44`,
                    }}
                  >
                    Xem menu <ChevronRight size={14} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="flex flex-col items-center gap-3 pt-10">
          <p className="text-gray-500 text-sm">
            Hiển thị <span className="text-gray-800 font-semibold">{visible.length}</span> /{" "}
            <span className="text-gray-800 font-semibold">{filtered.length}</span> · còn{" "}
            <span style={{ color: acc.orbA }} className="font-semibold">{remaining}</span> quán
          </p>
          <motion.button
            whileHover={{ scale: loadingMore ? 1 : 1.04 }}
            whileTap={{ scale: loadingMore ? 1 : 0.97 }}
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="flex items-center gap-2.5 px-8 py-3 text-white font-semibold rounded-2xl text-sm disabled:opacity-80 min-w-52 justify-center"
            style={{
              background: `linear-gradient(135deg, ${acc.orbA}, ${acc.orbB})`,
              boxShadow: `0 10px 24px ${acc.orbA}44`,
            }}
          >
            {loadingMore ? (
              <><Loader2 size={16} className="animate-spin" />Đang tải...</>
            ) : (
              <>Xem thêm {remaining} nhà hàng</>
            )}
          </motion.button>
        </div>
      )}

      {!hasMore && filtered.length > 0 && (
        <div className="pt-10 text-center text-gray-400 text-sm">
          Đã hiển thị tất cả <span className="text-gray-700 font-semibold">{filtered.length}</span> nhà hàng
        </div>
      )}

      {filtered.length === 0 && (
        <div className="pt-16 flex flex-col items-center justify-center text-center">
          <UtensilsCrossed size={40} className="text-gray-300 mb-3" />
          <p className="text-gray-700 font-medium">Không tìm thấy nhà hàng phù hợp</p>
          <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      )}
    </CategoryShell>
  );
}
