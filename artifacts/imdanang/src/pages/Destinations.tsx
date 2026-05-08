import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, Heart, ChevronRight, Loader2, Camera, Compass, Clock,
} from "lucide-react";
import { places } from "@/data/destinations";
import { CategoryShell, useThemeAccents } from "@/components/category/CategoryShell";

const categoryFilters = [
  { key: "all",      label: "Tất cả"      },
  { key: "beach",    label: "Bãi biển"    },
  { key: "mountain", label: "Núi rừng"    },
  { key: "heritage", label: "Di sản"      },
  { key: "nature",   label: "Thiên nhiên" },
];
const sortOptions = [
  { label: "Phổ biến",     value: "popular" },
  { label: "Đánh giá cao", value: "rating"  },
  { label: "Tên A → Z",    value: "name"    },
];

const collage = [
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&auto=format&fit=crop", className: "top-0 right-0 w-[58%] h-[58%]" },
  { src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=900&auto=format&fit=crop", className: "top-[18%] left-0 w-[48%] h-[52%]" },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop", className: "bottom-0 right-[10%] w-[52%] h-[42%]" },
];

export default function Destinations() {
  const [search, setSearch]       = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [sort, setSort]           = useState("popular");
  const [liked, setLiked]         = useState<number[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore]   = useState(false);
  const acc = useThemeAccents("destinations");

  const toggleLike = (id: number) => setLiked((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => { setVisibleCount((v) => v + 3); setLoadingMore(false); }, 800);
  };

  let filtered = places.filter((p) => {
    if (activeCat !== "all" && p.category !== activeCat) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.desc.toLowerCase().includes(q)) return false;
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
      themeKey="destinations"
      heroVariant="banner"
      badge={{ icon: Compass, text: "Nhật ký khám phá · 2026" }}
      titleLines={["Khám phá", "Đà Nẵng."]}
      gradientLineIndex={1}
      subtitle="Biển, núi, di sản — 85+ điểm đến trải dài Đà Nẵng đến Hội An."
      stats={[
        { icon: Camera,  label: "Địa điểm", value: "85+" },
        { icon: Star,    label: "Điểm TB",  value: "4.8" },
        { icon: Compass, label: "UNESCO",   value: "2"   },
      ]}
      collage={collage}
      floatingBadge={{ icon: Compass, title: "Bà Nà Hills", subtitle: "★ ICONIC" }}
      search={search}
      setSearch={setSearch}
      searchPlaceholder="Tìm bãi biển, di sản, núi..."
      categories={categoryFilters}
      activeCat={activeCat}
      setActiveCat={setActiveCat}
      sortOptions={sortOptions}
      sort={sort}
      setSort={setSort}
      resultCount={<><span className="text-gray-800 font-semibold">{filtered.length}</span> địa điểm phù hợp</>}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
        <AnimatePresence>
          {visible.map((place, i) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-200 transition-all"
              data-testid={`card-destination-${place.id}`}
            >
              <Link href={`/destinations/${place.slug}`}>
                <div className="relative h-52 overflow-hidden">
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div
                    className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                    style={{ background: `linear-gradient(135deg, ${acc.orbA}, ${acc.orbB})` }}
                  >
                    {place.tag}
                  </div>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleLike(place.id); }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition-colors"
                  >
                    <Heart size={15} className={liked.includes(place.id) ? "text-rose-400 fill-rose-400" : "text-white/80"} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-gray-900 font-bold text-base leading-tight">{place.name}</h3>
                    <div
                      className="shrink-0 flex items-center gap-1 rounded-lg px-2 py-0.5 border"
                      style={{ background: `${acc.orbA}12`, borderColor: `${acc.orbA}40`, color: acc.orbA }}
                    >
                      <Star size={11} className="fill-current" />
                      <span className="text-xs font-bold">{place.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">{place.desc}</p>
                  <div className="flex items-center gap-3 mb-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1"><MapPin size={11} className="text-gray-300" />{place.distance} từ TT</div>
                    <div className="flex items-center gap-1"><Clock size={11} className="text-gray-300" />{place.hours}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{place.reviews.toLocaleString()} đánh giá</span>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-1 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md"
                      style={{
                        background: `linear-gradient(135deg, ${acc.orbA}, ${acc.orbB})`,
                        boxShadow: `0 6px 18px ${acc.orbA}44`,
                      }}
                    >
                      Khám phá <ChevronRight size={14} />
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
            <span style={{ color: acc.orbA }} className="font-semibold">{remaining}</span> điểm
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
          <Compass size={40} className="text-gray-300 mb-3" />
          <p className="text-gray-700 font-medium">Không tìm thấy địa điểm phù hợp</p>
          <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      )}
    </CategoryShell>
  );
}
