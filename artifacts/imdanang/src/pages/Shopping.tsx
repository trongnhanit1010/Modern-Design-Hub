import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Star, MapPin, Clock, Tag, Gem, Package, Shirt, Coffee, Heart, Percent, ChevronRight, Loader2,
} from "lucide-react";
import { CategoryShell, useThemeAccents } from "@/components/category/CategoryShell";

interface Market {
  id: number; name: string; type: string; rating: number; reviews: number; location: string;
  time: string; image: string; specialties: string[]; tag: string; category: string;
}

const markets: Market[] = [
  { id: 1, name: "Chợ Hàn",                            type: "Chợ truyền thống",       rating: 4.6, reviews: 5240, location: "Trần Phú, Hải Châu",        time: "06:00 – 21:00", image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&auto=format&fit=crop", specialties: ["Mực khô", "Nem nướng", "Vải áo dài"],          tag: "Iconic",   category: "market" },
  { id: 2, name: "Chợ Cồn",                            type: "Chợ ẩm thực & đặc sản",  rating: 4.5, reviews: 3120, location: "Ông Ích Khiêm, Hải Châu",   time: "05:00 – 20:00", image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&auto=format&fit=crop", specialties: ["Bánh mì Đà Nẵng", "Hải sản khô", "Nước mắm"],  tag: "Ẩm thực",  category: "market" },
  { id: 3, name: "Vincom Đà Nẵng",                     type: "Trung tâm thương mại",   rating: 4.7, reviews: 8910, location: "Ngô Quyền, Sơn Trà",        time: "09:30 – 22:00", image: "https://images.unsplash.com/photo-1519567770579-c2fc5836898d?w=800&auto=format&fit=crop", specialties: ["Zara", "H&M", "CGV Cinemas"],                  tag: "Hiện đại", category: "mall" },
  { id: 4, name: "Làng nghề Đá mỹ nghệ Non Nước",       type: "Làng nghề truyền thống", rating: 4.8, reviews: 2340, location: "Ngũ Hành Sơn",              time: "07:00 – 18:00", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop", specialties: ["Tượng đá", "Đá cẩm thạch", "Đồ trang trí"],   tag: "Đặc sắc",  category: "craft" },
  { id: 5, name: "Lotte Mart Đà Nẵng",                 type: "Siêu thị & Mall",        rating: 4.6, reviews: 6700, location: "Nguyễn Văn Linh, Thanh Khê",time: "08:00 – 22:00", image: "https://images.unsplash.com/photo-1606044466411-5e9e75b31f73?w=800&auto=format&fit=crop", specialties: ["Thực phẩm Hàn", "Đồ dùng gia đình", "Mỹ phẩm"],tag: "Mall",     category: "mall" },
  { id: 6, name: "Phố Ông Ích Khiêm",                  type: "Phố mua sắm",            rating: 4.4, reviews: 1890, location: "Ông Ích Khiêm, Hải Châu",   time: "08:00 – 21:00", image: "https://images.unsplash.com/photo-1555529669-2269763671c0?w=800&auto=format&fit=crop", specialties: ["Quần áo sỉ", "Vải vóc", "Phụ kiện"],          tag: "Giá tốt",  category: "fashion" },
];

const categoryFilters = [
  { key: "all",     label: "Tất cả"    },
  { key: "market",  label: "Chợ"       },
  { key: "mall",    label: "TTTM"      },
  { key: "craft",   label: "Làng nghề" },
  { key: "fashion", label: "Thời trang"},
];
const sortOptions = [
  { label: "Phổ biến",     value: "popular" },
  { label: "Đánh giá cao", value: "rating"  },
  { label: "Tên A → Z",    value: "name"    },
];

const collage = [
  { src: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=900&auto=format&fit=crop", className: "top-0 right-0 w-[58%] h-[58%]" },
  { src: "https://images.unsplash.com/photo-1519567770579-c2fc5836898d?w=900&auto=format&fit=crop", className: "top-[18%] left-0 w-[48%] h-[52%]" },
  { src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&auto=format&fit=crop", className: "bottom-0 right-[10%] w-[52%] h-[42%]" },
];

export default function Shopping() {
  const [search, setSearch]       = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [sort, setSort]           = useState("popular");
  const [liked, setLiked]         = useState<number[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore]   = useState(false);
  const acc = useThemeAccents("shopping");

  const toggleLike = (id: number) => setLiked((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => { setVisibleCount((v) => v + 3); setLoadingMore(false); }, 700);
  };

  let filtered = markets.filter((m) => {
    if (activeCat !== "all" && m.category !== activeCat) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !m.name.toLowerCase().includes(q) &&
        !m.location.toLowerCase().includes(q) &&
        !m.specialties.some((s) => s.toLowerCase().includes(q))
      ) return false;
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
      themeKey="shopping"
      badge={{ icon: ShoppingBag, text: "Mùa mua sắm 2026 · 335 địa điểm" }}
      titleLines={["Mua sắm", "Đà Nẵng.", "Edition vạn món."]}
      gradientLineIndex={1}
      subtitle="Chợ Hàn cổ kính, Vincom hiện đại, làng nghề độc bản, Lotte Mart đa sắc — bộ sưu tập mua sắm tinh hoa xứ Quảng."
      stats={[
        { icon: ShoppingBag, label: "Địa điểm",  value: "335"  },
        { icon: Percent,     label: "Giảm TB",   value: "12%"  },
        { icon: Heart,       label: "Yêu thích", value: "4.7"  },
      ]}
      collage={collage}
      floatingBadge={{ icon: ShoppingBag, title: "Chợ Hàn", subtitle: "★ ICONIC" }}
      search={search}
      setSearch={setSearch}
      searchPlaceholder="Tìm chợ, mall, đặc sản..."
      categories={categoryFilters}
      activeCat={activeCat}
      setActiveCat={setActiveCat}
      sortOptions={sortOptions}
      sort={sort}
      setSort={setSort}
      resultCount={<><span className="text-gray-800 font-semibold">{filtered.length}</span> địa điểm phù hợp</>}
    >
      {/* Quick category cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        {[
          { icon: Gem,     label: "Thủ công mỹ nghệ",    count: 48  },
          { icon: Shirt,   label: "Thời trang",           count: 95  },
          { icon: Coffee,  label: "Đặc sản & Thực phẩm", count: 62  },
          { icon: Package, label: "Quà lưu niệm",         count: 130 },
        ].map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -3, scale: 1.02 }}
            className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4 cursor-pointer hover:shadow-md hover:border-gray-200 transition-all"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
              style={{
                background: `linear-gradient(135deg, ${acc.orbA}, ${acc.orbB})`,
                boxShadow: `0 4px 14px ${acc.orbA}44`,
              }}
            >
              <c.icon size={18} className="text-white" />
            </div>
            <p className="text-gray-900 text-sm font-semibold mb-0.5">{c.label}</p>
            <p className="text-gray-400 text-xs">{c.count} địa điểm</p>
          </motion.div>
        ))}
      </div>

      <h2 className="text-gray-900 font-bold text-lg mt-10 mb-4 flex items-center gap-2">
        <ShoppingBag size={18} style={{ color: acc.orbA }} /> Chợ & Trung tâm mua sắm
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {visible.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-200 transition-all"
              data-testid={`card-shopping-${m.id}`}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span
                  className="absolute top-3 left-3 text-white text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${acc.orbA}, ${acc.orbB})` }}
                >
                  {m.tag}
                </span>
                <button
                  onClick={() => toggleLike(m.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition-colors"
                >
                  <Heart size={15} className={liked.includes(m.id) ? "text-rose-400 fill-rose-400" : "text-white/80"} />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-gray-900 font-bold text-sm leading-tight">{m.name}</h3>
                  <div
                    className="shrink-0 flex items-center gap-1 rounded-lg px-2 py-0.5 border"
                    style={{ background: `${acc.orbA}12`, borderColor: `${acc.orbA}40`, color: acc.orbA }}
                  >
                    <Star size={10} className="fill-current" />
                    <span className="text-xs font-bold">{m.rating}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mb-3">{m.type} · {m.reviews.toLocaleString()} đánh giá</p>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <MapPin size={11} className="text-gray-300 shrink-0" />{m.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Clock size={11} className="text-gray-300 shrink-0" />{m.time}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {m.specialties.map((s) => (
                    <span key={s} className="flex items-center gap-1 bg-gray-50 text-gray-500 text-[10px] px-2 py-0.5 rounded-full border border-gray-200">
                      <Tag size={9} />{s}
                    </span>
                  ))}
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
            <span style={{ color: acc.orbA }} className="font-semibold">{remaining}</span> địa điểm
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
              <>Xem thêm {remaining} địa điểm</>
            )}
          </motion.button>
        </div>
      )}

      {!hasMore && filtered.length > 0 && (
        <div className="pt-10 text-center text-gray-400 text-sm">
          Đã hiển thị tất cả <span className="text-gray-700 font-semibold">{filtered.length}</span> địa điểm
        </div>
      )}

      {filtered.length === 0 && (
        <div className="pt-16 flex flex-col items-center justify-center text-center">
          <ShoppingBag size={40} className="text-gray-300 mb-3" />
          <p className="text-gray-700 font-medium">Không tìm thấy địa điểm phù hợp</p>
          <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      )}
    </CategoryShell>
  );
}
