import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, Wifi, Waves, Utensils, Car, Heart,
  ChevronRight, Loader2, Hotel, BedDouble, Trophy, TrendingUp,
} from "lucide-react";
import { Link } from "wouter";
import { CategoryShell, useThemeAccents } from "@/components/category/CategoryShell";

const hotels = [
  { id: 1, slug: "crowne-plaza-danang",     name: "Crowne Plaza Danang",          stars: 5, rating: 4.9, reviews: 1240, price: 3200000, location: "Mỹ Khê Beach",     district: "Sơn Trà",       city: "Đà Nẵng", type: "resort",   image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop", amenities: ["wifi", "pool", "restaurant", "parking"], tag: "Best Seller" },
  { id: 2, slug: "grand-tourane-hotel",     name: "Grand Tourane Hotel",          stars: 5, rating: 4.7, reviews:  876, price: 2400000, location: "City Center",      district: "Hải Châu",      city: "Đà Nẵng", type: "hotel",    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop", amenities: ["wifi", "restaurant", "parking"],         tag: "Great Value" },
  { id: 3, slug: "furama-resort-danang",    name: "Furama Resort Danang",         stars: 5, rating: 4.8, reviews: 2341, price: 5800000, location: "Non Nước Beach",   district: "Ngũ Hành Sơn",  city: "Đà Nẵng", type: "resort",   image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop", amenities: ["wifi", "pool", "restaurant"],            tag: "Luxury Pick" },
  { id: 4, slug: "vinpearl-resort-spa",     name: "Vinpearl Resort & Spa",        stars: 5, rating: 4.8, reviews: 1923, price: 4500000, location: "Bãi Bắc",          district: "Sơn Trà",       city: "Đà Nẵng", type: "resort",   image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop", amenities: ["wifi", "pool", "restaurant", "parking"], tag: "Top Rated" },
  { id: 5, slug: "brilliant-hotel-danang",  name: "Brilliant Hotel Danang",       stars: 4, rating: 4.5, reviews:  654, price: 1200000, location: "Bạch Đằng Street", district: "Hải Châu",      city: "Đà Nẵng", type: "hotel",    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop", amenities: ["wifi", "restaurant"],                    tag: "Budget" },
  { id: 6, slug: "pullman-danang-beach",    name: "Pullman Danang Beach Resort",  stars: 5, rating: 4.7, reviews: 1087, price: 3900000, location: "Mỹ Khê Beach",     district: "Sơn Trà",       city: "Đà Nẵng", type: "resort",   image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&auto=format&fit=crop", amenities: ["wifi", "pool", "restaurant", "parking"], tag: "Sea View" },
  { id: 7, slug: "blooming-hotel-hoi-an",   name: "Blooming Hội An Hotel",        stars: 4, rating: 4.6, reviews:  520, price: 1800000, location: "Phố Cổ Hội An",    district: "Minh An",       city: "Hội An",  type: "boutique", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&auto=format&fit=crop", amenities: ["wifi", "pool", "restaurant"],            tag: "Boutique" },
  { id: 8, slug: "la-siesta-resort-hoi-an", name: "La Siesta Hội An Resort & Spa", stars: 5, rating: 4.9, reviews: 3100, price: 6200000, location: "Hội An",          district: "Cẩm Kim",       city: "Hội An",  type: "resort",   image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&auto=format&fit=crop", amenities: ["wifi", "pool", "restaurant", "parking"], tag: "Premium" },
];

const amenityIcons: Record<string, typeof Wifi> = { wifi: Wifi, pool: Waves, restaurant: Utensils, parking: Car };
const amenityLabels: Record<string, string> = { wifi: "WiFi", pool: "Hồ bơi", restaurant: "Nhà hàng", parking: "Đỗ xe" };

const typeFilters = [
  { key: "all",      label: "Tất cả"    },
  { key: "resort",   label: "Resort"    },
  { key: "hotel",    label: "Khách sạn" },
  { key: "boutique", label: "Boutique"  },
];
const sortOptions = [
  { label: "Phổ biến",      value: "popular"    },
  { label: "Giá tăng dần",  value: "price_asc"  },
  { label: "Giá giảm dần",  value: "price_desc" },
  { label: "Tên A → Z",     value: "name"       },
];

const collage = [
  { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&auto=format&fit=crop", className: "top-0 right-0 w-[58%] h-[58%]" },
  { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&auto=format&fit=crop", className: "top-[18%] left-0 w-[48%] h-[52%]" },
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&auto=format&fit=crop", className: "bottom-0 right-[10%] w-[52%] h-[42%]" },
];

export default function Hotels() {
  const [search, setSearch]         = useState("");
  const [activeCat, setActiveCat]   = useState("all");
  const [sort, setSort]             = useState("popular");
  const [liked, setLiked]           = useState<number[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore]   = useState(false);
  const acc = useThemeAccents("hotels");

  const toggleLike = (id: number) => setLiked((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => { setVisibleCount((v) => v + 3); setLoadingMore(false); }, 800);
  };

  let filtered = hotels.filter((h) => {
    if (activeCat !== "all" && h.type !== activeCat) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!h.name.toLowerCase().includes(q) && !h.location.toLowerCase().includes(q)) return false;
    }
    return true;
  });
  if (sort === "popular")    filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
  else if (sort === "price_asc")  filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "name")       filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const visible   = filtered.slice(0, visibleCount);
  const hasMore   = visibleCount < filtered.length;
  const remaining = filtered.length - visibleCount;

  return (
    <CategoryShell
      themeKey="hotels"
      heroVariant="split"
      badge={{ text: "Hotels & Resorts · Đà Nẵng – Hội An" }}
      titleLines={["Nơi nghỉ", "đẳng cấp."]}
      gradientLineIndex={1}
      subtitle="Resort 5 sao bên Mỹ Khê, boutique cổ kính trong phố cổ Hội An."
      stats={[
        { icon: BedDouble,   label: "Chỗ nghỉ",       value: "128+" },
        { icon: Trophy,      label: "Đánh giá TB",    value: "4.8" },
        { icon: TrendingUp,  label: "Đặt / tháng",    value: "3.2K" },
      ]}
      collage={collage}
      floatingBadge={{ icon: Trophy, title: "Crowne Plaza", subtitle: "★★★★★ FEATURED" }}
      search={search}
      setSearch={setSearch}
      searchPlaceholder="Tìm khách sạn, khu vực..."
      categories={typeFilters}
      activeCat={activeCat}
      setActiveCat={setActiveCat}
      sortOptions={sortOptions}
      sort={sort}
      setSort={setSort}
      resultCount={<><span className="text-gray-800 font-semibold">{filtered.length}</span> chỗ nghỉ phù hợp</>}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
        <AnimatePresence>
          {visible.map((hotel, i) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-200 transition-all"
              data-testid={`card-hotel-${hotel.id}`}
            >
              <Link href={`/luu-tru-khach-san/${hotel.slug}`}>
                <div className="relative h-52 overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div
                    className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                    style={{ background: `linear-gradient(135deg, ${acc.orbA}, ${acc.orbB})` }}
                  >
                    {hotel.tag}
                  </div>
                  <button
                    onClick={(e) => { e.preventDefault(); toggleLike(hotel.id); }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition-colors"
                  >
                    <Heart size={15} className={liked.includes(hotel.id) ? "text-rose-400 fill-rose-400" : "text-white/80"} />
                  </button>
                  <div className="absolute bottom-3 left-3 flex gap-0.5">
                    {[...Array(hotel.stars)].map((_, s) => (
                      <Star key={s} size={11} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-gray-900 font-bold text-base leading-tight">{hotel.name}</h3>
                    <div className="shrink-0 flex items-center gap-1 rounded-lg px-2 py-0.5 border border-amber-200 bg-amber-50">
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-amber-700">{hotel.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                    <MapPin size={11} className="shrink-0 text-gray-300" />
                    <span>{hotel.location}</span>
                    <span className="mx-1">·</span>
                    <span>{hotel.reviews.toLocaleString()} đánh giá</span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                    {hotel.amenities.map((a) => {
                      const Icon = amenityIcons[a];
                      return Icon ? (
                        <div key={a} className="flex items-center gap-1 px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg">
                          <Icon size={11} className="text-gray-400" />
                          <span className="text-gray-400 text-[10px]">{amenityLabels[a]}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-900 font-bold text-lg">{hotel.price.toLocaleString("vi-VN")}₫</span>
                      <span className="text-gray-400 text-xs">/đêm</span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-1 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md"
                      style={{
                        background: `linear-gradient(135deg, ${acc.orbA}, ${acc.orbB})`,
                        boxShadow: `0 6px 18px ${acc.orbA}44`,
                      }}
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
        <div className="flex flex-col items-center gap-3 pt-10">
          <p className="text-gray-500 text-sm">
            Hiển thị <span className="text-gray-800 font-semibold">{visible.length}</span> /{" "}
            <span className="text-gray-800 font-semibold">{filtered.length}</span> · còn{" "}
            <span style={{ color: acc.orbA }} className="font-semibold">{remaining}</span> chỗ nghỉ
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
              <>Xem thêm {remaining} khách sạn</>
            )}
          </motion.button>
        </div>
      )}

      {!hasMore && filtered.length > 0 && (
        <div className="pt-10 text-center text-gray-400 text-sm">
          Đã hiển thị tất cả <span className="text-gray-700 font-semibold">{filtered.length}</span> khách sạn
        </div>
      )}

      {filtered.length === 0 && (
        <div className="pt-16 flex flex-col items-center justify-center text-center">
          <Hotel size={40} className="text-gray-300 mb-3" />
          <p className="text-gray-700 font-medium">Không tìm thấy chỗ nghỉ phù hợp</p>
          <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      )}
    </CategoryShell>
  );
}
