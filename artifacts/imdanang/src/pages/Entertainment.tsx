import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  Sparkles,
  Search,
  Star,
  MapPin,
  Clock,
  ArrowUpRight,
  Heart,
  PartyPopper,
  Zap,
  Ticket,
  Flame,
  TrendingUp,
} from "lucide-react";
import {
  entertainmentItems,
  categoryLabels,
  type EntertainmentCategory,
} from "@/data/entertainment";

const categoryOrder: { key: "all" | EntertainmentCategory; label: string; emoji: string }[] = [
  { key: "all",         label: "Tất cả",       emoji: "✨" },
  { key: "theme-park",  label: "Công viên",    emoji: "🎢" },
  { key: "water-park",  label: "Công viên nước", emoji: "🌊" },
  { key: "show",        label: "Show diễn",    emoji: "🎭" },
  { key: "nightlife",   label: "Nightlife",    emoji: "🍸" },
  { key: "kids",        label: "Trẻ em",       emoji: "🧸" },
  { key: "cinema",      label: "Rạp phim",     emoji: "🎬" },
  { key: "adventure",   label: "Mạo hiểm",     emoji: "🪂" },
];

const heroStats = [
  { icon: Ticket,      label: "Điểm vui chơi",  value: "32+" },
  { icon: Flame,       label: "Hot trend tháng", value: "08" },
  { icon: TrendingUp,  label: "Lượt review",    value: "70K+" },
];

export default function Entertainment() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<"all" | EntertainmentCategory>("all");
  const [liked, setLiked] = useState<number[]>([]);

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

  // Featured (top by reviews) for spotlight bento
  const spotlight = useMemo(
    () => [...filtered].sort((a, b) => b.reviews - a.reviews).slice(0, 3),
    [filtered],
  );
  const restItems = filtered.filter((it) => !spotlight.some((s) => s.id === it.id));

  return (
    <div className="min-h-screen bg-[#0b0420] text-white relative overflow-hidden">
      {/* Animated neon backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-fuchsia-600/30 blur-[120px]" />
        <div className="absolute top-40 -right-40 w-[520px] h-[520px] rounded-full bg-indigo-600/30 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-amber-500/15 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ── HERO ── */}
      <section className="relative pt-12 pb-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center"
          >
            {/* Left: title block */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-200 text-xs font-medium backdrop-blur-md mb-6">
                <Sparkles size={13} className="text-fuchsia-300" />
                Vui chơi & Giải trí Đà Nẵng – Hội An
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.02] tracking-tight">
                <span className="block text-white">Khoảnh khắc</span>
                <span className="block bg-gradient-to-r from-fuchsia-400 via-pink-300 to-amber-300 bg-clip-text text-transparent">
                  bùng nổ
                </span>
                <span className="block text-white/90">không thể bỏ lỡ.</span>
              </h1>

              <p className="text-white/65 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
                Từ Cầu Vàng huyền thoại, Sun Wheel rực sáng đến những đêm rooftop sang trọng – tuyển chọn các điểm vui chơi đáng trải nghiệm nhất.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 md:gap-10 mt-8">
                {heroStats.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center">
                      <Icon size={18} className="text-fuchsia-300" />
                    </div>
                    <div>
                      <div className="font-bold text-xl leading-none">{value}</div>
                      <div className="text-white/50 text-xs mt-1">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: collage */}
            <div className="relative h-[420px] hidden lg:block">
              {[
                {
                  src: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&auto=format&fit=crop",
                  className: "top-0 left-8 w-56 h-72 rotate-[-6deg]",
                },
                {
                  src: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&auto=format&fit=crop",
                  className: "top-12 right-0 w-60 h-80 rotate-[5deg]",
                },
                {
                  src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop",
                  className: "bottom-0 left-24 w-52 h-44 rotate-[3deg]",
                },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
                  className={`absolute ${p.className} rounded-3xl overflow-hidden border border-white/15 shadow-[0_30px_80px_-15px_rgba(168,85,247,0.45)]`}
                >
                  <img src={p.src} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              ))}

              {/* Floating ticket badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute -bottom-2 right-2 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-2xl px-4 py-3 shadow-2xl shadow-fuchsia-500/40 flex items-center gap-2"
              >
                <Zap size={16} className="text-white" />
                <div className="text-white">
                  <div className="text-xs opacity-80 leading-none">Đặt vé tức thì</div>
                  <div className="text-sm font-bold leading-none mt-1">Save up to 30%</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Search + categories bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 shadow-2xl shadow-black/40"
          >
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/30 border border-white/10">
              <Search size={16} className="text-white/40 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm điểm vui chơi, show diễn, bar..."
                className="bg-transparent flex-1 text-sm placeholder:text-white/35 focus:outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-white/40 text-xs hover:text-white/80"
                >
                  Xóa
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-thin">
              {categoryOrder.map((c) => {
                const active = activeCat === c.key;
                return (
                  <button
                    key={c.key}
                    onClick={() => setActiveCat(c.key)}
                    className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                      active
                        ? "bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white border-transparent shadow-lg shadow-fuchsia-500/40"
                        : "border-white/10 text-white/60 hover:text-white hover:border-white/30"
                    }`}
                  >
                    <span>{c.emoji}</span>
                    {c.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BENTO SPOTLIGHT ── */}
      {spotlight.length > 0 && (
        <section className="relative px-4 sm:px-6 mt-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <PartyPopper size={20} className="text-fuchsia-400" />
                Đang HOT trên thành phố
              </h2>
              <span className="text-white/40 text-xs">
                {filtered.length} hoạt động phù hợp
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:auto-rows-[230px]">
              {/* Big spotlight (item 0) */}
              {spotlight[0] && (
                <SpotlightCard
                  item={spotlight[0]}
                  className="md:col-span-2 md:row-span-2"
                  large
                  liked={liked.includes(spotlight[0].id)}
                  onLike={() => toggleLike(spotlight[0].id)}
                />
              )}
              {/* Smaller cards */}
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
          </div>
        </section>
      )}

      {/* ── ALL LIST ── */}
      <section className="relative px-4 sm:px-6 mt-14 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Tất cả điểm vui chơi</h2>
            <div className="hidden md:flex items-center gap-2 text-xs text-white/40">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
              Cập nhật mỗi ngày
            </div>
          </div>

          {restItems.length === 0 && filtered.length === 0 ? (
            <div className="py-20 text-center text-white/50">
              <PartyPopper size={42} className="mx-auto mb-3 text-white/30" />
              <p className="font-medium">Không tìm thấy hoạt động phù hợp</p>
              <p className="text-sm text-white/40 mt-1">
                Thử đổi danh mục hoặc xóa từ khóa tìm kiếm
              </p>
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
                    whileHover={{ y: -5 }}
                    className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md hover:border-fuchsia-400/40 hover:shadow-2xl hover:shadow-fuchsia-500/20 transition-all"
                    data-testid={`card-entertainment-${it.id}`}
                  >
                    <Link href={`/vui-choi-giai-tri/${it.slug}`}>
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={it.cover}
                          alt={it.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <div
                          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r ${it.tagColor} shadow-lg`}
                        >
                          {it.tag}
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleLike(it.id);
                          }}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center hover:bg-black/60 transition-colors"
                        >
                          <Heart
                            size={14}
                            className={
                              liked.includes(it.id)
                                ? "text-rose-400 fill-rose-400"
                                : "text-white"
                            }
                          />
                        </button>

                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-fuchsia-300 font-bold mb-1">
                              {categoryLabels[it.category]}
                            </div>
                            <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">
                              {it.name}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1 bg-white/15 backdrop-blur-md px-2 py-1 rounded-lg border border-white/15 shrink-0">
                            <Star size={10} className="text-amber-400 fill-amber-400" />
                            <span className="text-xs font-bold">{it.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <p className="text-white/65 text-sm leading-snug line-clamp-2 mb-3">
                          {it.shortDescription}
                        </p>

                        <div className="flex items-center gap-3 text-[11px] text-white/45 mb-4">
                          <span className="flex items-center gap-1">
                            <MapPin size={10} />
                            {it.district}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {it.openTime} – {it.closeTime}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[10px] text-white/40 uppercase tracking-wider">
                              Giá vé từ
                            </div>
                            <div className="text-white font-bold text-base">
                              {it.priceFrom.toLocaleString("vi-VN")}₫
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-fuchsia-300 text-sm font-semibold group-hover:gap-2 transition-all">
                            Xem chi tiết
                            <ArrowUpRight
                              size={15}
                              className="group-hover:rotate-12 transition-transform"
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────
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
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`relative rounded-3xl overflow-hidden border border-white/10 group cursor-pointer ${className}`}
      data-testid={`spotlight-${item.id}`}
    >
      <Link href={`/vui-choi-giai-tri/${item.slug}`}>
        <img
          src={item.cover}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r ${item.tagColor} shadow-lg`}
        >
          {item.tag}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            onLike();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center hover:bg-black/60"
        >
          <Heart
            size={15}
            className={liked ? "text-rose-400 fill-rose-400" : "text-white"}
          />
        </button>

        <div
          className={`absolute bottom-0 left-0 right-0 p-${large ? "6" : "4"}`}
        >
          <div className="text-[10px] uppercase tracking-widest text-fuchsia-300 font-bold mb-1.5">
            {categoryLabels[item.category]}
          </div>
          <h3
            className={`text-white font-bold leading-tight ${
              large ? "text-3xl md:text-4xl" : "text-lg"
            } drop-shadow-2xl`}
          >
            {item.name}
          </h3>
          {large && (
            <p className="text-white/75 text-sm mt-3 max-w-xl line-clamp-2">
              {item.shortDescription}
            </p>
          )}
          <div className="flex items-center gap-3 mt-3 text-xs text-white/70">
            <span className="flex items-center gap-1">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              <strong className="text-white">{item.rating}</strong>
              <span className="text-white/50">
                ({item.reviews.toLocaleString()})
              </span>
            </span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {item.district}
            </span>
            {large && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>
                  Từ{" "}
                  <strong className="text-white">
                    {item.priceFrom.toLocaleString("vi-VN")}₫
                  </strong>
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
