import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  Star, MapPin, Clock, ArrowUpRight, Heart,
  PartyPopper, Zap, Ticket, Flame, TrendingUp,
} from "lucide-react";
import {
  entertainmentItems,
  categoryLabels,
  type EntertainmentCategory,
} from "@/data/entertainment";
import { CategoryShell, useThemeAccents } from "@/components/category/CategoryShell";

const categoryOrder: { key: "all" | EntertainmentCategory; label: string }[] = [
  { key: "all",         label: "Tất cả"         },
  { key: "theme-park",  label: "Công viên"       },
  { key: "water-park",  label: "Công viên nước"  },
  { key: "show",        label: "Show diễn"       },
  { key: "nightlife",   label: "Nightlife"        },
  { key: "kids",        label: "Trẻ em"           },
  { key: "cinema",      label: "Rạp phim"         },
  { key: "adventure",   label: "Mạo hiểm"         },
];

const collage = [
  { src: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=900&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=900&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=900&auto=format&fit=crop" },
];

export default function Entertainment() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<"all" | EntertainmentCategory>("all");
  const [liked, setLiked] = useState<number[]>([]);
  const acc = useThemeAccents("entertainment");

  const toggleLike = (id: number) =>
    setLiked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const filtered = useMemo(() => {
    return entertainmentItems.filter((it) => {
      if (activeCat !== "all" && it.category !== activeCat) return false;
      if (search) {
        const s = search.toLowerCase();
        if (
          !it.name.toLowerCase().includes(s) &&
          !it.shortDescription.toLowerCase().includes(s) &&
          !it.address.toLowerCase().includes(s)
        )
          return false;
      }
      return true;
    });
  }, [search, activeCat]);

  const spotlight = useMemo(
    () => [...filtered].sort((a, b) => b.reviews - a.reviews).slice(0, 3),
    [filtered],
  );
  const restItems = filtered.filter((it) => !spotlight.some((s) => s.id === it.id));

  return (
    <CategoryShell
      themeKey="entertainment"
      badge={{ icon: Zap, text: "Vui chơi & Giải trí · Đà Nẵng – Hội An" }}
      titleLines={["Khoảnh khắc", "bùng nổ."]}
      gradientLineIndex={1}
      subtitle="Cầu Vàng, Sun Wheel, rooftop bar — những trải nghiệm không thể bỏ lỡ."
      stats={[
        { icon: Ticket,     label: "Điểm vui chơi",  value: "32+"  },
        { icon: Flame,      label: "Hot tháng này",   value: "8"    },
        { icon: TrendingUp, label: "Lượt review",     value: "70K+" },
      ]}
      collage={collage}
      floatingBadge={{ icon: Zap, title: "Tiết kiệm 30%", subtitle: "★ ĐẶT VÉ NGAY" }}
      search={search}
      setSearch={setSearch}
      searchPlaceholder="Tìm điểm vui chơi, show diễn, bar..."
      categories={categoryOrder}
      activeCat={activeCat}
      setActiveCat={(k) => setActiveCat(k as "all" | EntertainmentCategory)}
      resultCount={<><span className="text-gray-800 font-semibold">{filtered.length}</span> hoạt động phù hợp</>}
    >
      {/* ── Bento Spotlight ── */}
      {spotlight.length > 0 && (
        <section className="pt-2 pb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-gray-900 text-xl font-bold flex items-center gap-2">
              <PartyPopper size={20} style={{ color: acc.orbA }} />
              Đang HOT trên thành phố
            </h2>
            <span className="text-gray-400 text-xs">{filtered.length} hoạt động</span>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:auto-rows-[230px]">
            {spotlight[0] && (
              <SpotlightCard
                item={spotlight[0]}
                className="md:col-span-2 md:row-span-2"
                large
                liked={liked.includes(spotlight[0].id)}
                onLike={() => toggleLike(spotlight[0].id)}
              />
            )}
            {spotlight[1] && (
              <SpotlightCard
                item={spotlight[1]}
                className="md:col-span-1 md:row-span-1"
                liked={liked.includes(spotlight[1].id)}
                onLike={() => toggleLike(spotlight[1].id)}
              />
            )}
            {spotlight[2] && (
              <SpotlightCard
                item={spotlight[2]}
                className="md:col-span-1 md:row-span-1"
                liked={liked.includes(spotlight[2].id)}
                onLike={() => toggleLike(spotlight[2].id)}
              />
            )}
          </div>
        </section>
      )}

      {/* ── All cards ── */}
      <section className="pt-2 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900 text-xl font-bold">Tất cả điểm vui chơi</h2>
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: acc.orbA }} />
            Cập nhật mỗi ngày
          </div>
        </div>

        {restItems.length === 0 && filtered.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            <PartyPopper size={42} className="mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-500">Không tìm thấy hoạt động phù hợp</p>
            <p className="text-sm text-gray-400 mt-1">Thử đổi danh mục hoặc xóa từ khóa tìm kiếm</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {restItems.map((it, i) => (
                <motion.div
                  key={it.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group relative rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all"
                  data-testid={`card-entertainment-${it.id}`}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${acc.orbA}50`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#f1f5f9";
                  }}
                >
                  <Link href={`/vui-choi-giai-tri/${it.slug}`}>
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={it.cover}
                        alt={it.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                      {/* Tag */}
                      <div
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow"
                        style={{ background: `linear-gradient(135deg, ${acc.orbA}, ${acc.orbB})` }}
                      >
                        {it.tag}
                      </div>

                      {/* Like */}
                      <button
                        onClick={(e) => { e.preventDefault(); toggleLike(it.id); }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-gray-100 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                      >
                        <Heart
                          size={14}
                          className={liked.includes(it.id) ? "text-rose-500 fill-rose-500" : "text-gray-400"}
                        />
                      </button>

                      {/* Name overlay */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: `${acc.orbA}cc` }}>
                          {categoryLabels[it.category]}
                        </div>
                        <h3 className="text-white font-bold text-base leading-tight drop-shadow-lg">
                          {it.name}
                        </h3>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-4">
                      <p className="text-gray-500 text-sm leading-snug line-clamp-2 mb-3">
                        {it.shortDescription}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin size={10} /> {it.district}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} /> {it.openTime} – {it.closeTime}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-gray-400 uppercase tracking-wider">Giá vé từ</div>
                          <div className="text-gray-900 font-bold text-base">
                            {it.priceFrom.toLocaleString("vi-VN")}₫
                          </div>
                        </div>
                        <div
                          className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                          style={{ color: acc.orbA }}
                        >
                          Xem chi tiết
                          <ArrowUpRight size={15} className="group-hover:rotate-12 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </CategoryShell>
  );
}

/* ── SpotlightCard ── */
function SpotlightCard({
  item,
  className = "",
  large = false,
  liked,
  onLike,
}: {
  item: (typeof entertainmentItems)[number];
  className?: string;
  large?: boolean;
  liked: boolean;
  onLike: () => void;
}) {
  const acc = useThemeAccents("entertainment");
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`relative rounded-3xl overflow-hidden border border-gray-100 shadow-sm group cursor-pointer ${className}`}
      data-testid={`spotlight-${item.id}`}
    >
      <Link href={`/vui-choi-giai-tri/${item.slug}`}>
        <img
          src={item.cover}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

        {/* Tag */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow"
          style={{ background: `linear-gradient(135deg, ${acc.orbA}, ${acc.orbB})` }}
        >
          {item.tag}
        </div>

        {/* Like */}
        <button
          onClick={(e) => { e.preventDefault(); onLike(); }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 border border-gray-100 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        >
          <Heart
            size={15}
            className={liked ? "text-rose-500 fill-rose-500" : "text-gray-400"}
          />
        </button>

        {/* Info overlay */}
        <div className={`absolute bottom-0 left-0 right-0 ${large ? "p-6" : "p-4"}`}>
          <div className="text-[10px] uppercase tracking-widest text-fuchsia-300 font-bold mb-1.5">
            {categoryLabels[item.category]}
          </div>
          <h3 className={`text-white font-bold leading-tight drop-shadow-2xl ${large ? "text-2xl md:text-3xl" : "text-lg"}`}>
            {item.name}
          </h3>
          {large && (
            <p className="text-white/75 text-sm mt-2 max-w-xl line-clamp-2">
              {item.shortDescription}
            </p>
          )}
          <div className="flex items-center gap-3 mt-3 text-xs text-white/70">
            <span className="flex items-center gap-1">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              <strong className="text-white">{item.rating}</strong>
              <span className="text-white/50">({item.reviews.toLocaleString()})</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="flex items-center gap-1"><MapPin size={11} />{item.district}</span>
            {large && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>Từ <strong className="text-white">{item.priceFrom.toLocaleString("vi-VN")}₫</strong></span>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
