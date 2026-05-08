import { useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, type LucideIcon } from "lucide-react";
import { categoryThemes, type CategoryKey } from "@/lib/categoryThemes";

const themeBackdrops: Record<
  CategoryKey,
  { bgFrom: string; bgVia: string; bgTo: string; orbA: string; orbB: string; orbC: string }
> = {
  home:          { bgFrom: "#0b1220", bgVia: "#0e1828", bgTo: "#0b1220", orbA: "#475569", orbB: "#1e293b", orbC: "#334155" },
  hotels:        { bgFrom: "#1a0f02", bgVia: "#22150a", bgTo: "#0e0a04", orbA: "#f59e0b", orbB: "#b45309", orbC: "#d97706" },
  destinations:  { bgFrom: "#02140c", bgVia: "#04231a", bgTo: "#01120a", orbA: "#10b981", orbB: "#047857", orbC: "#059669" },
  restaurants:   { bgFrom: "#1a0a03", bgVia: "#241006", bgTo: "#100804", orbA: "#f97316", orbB: "#ea580c", orbC: "#ea580c" },
  localfood:     { bgFrom: "#1a0410", bgVia: "#260a18", bgTo: "#10040a", orbA: "#f43f5e", orbB: "#e11d48", orbC: "#e11d48" },
  transport:     { bgFrom: "#04101e", bgVia: "#06182c", bgTo: "#020a16", orbA: "#0ea5e9", orbB: "#1d4ed8", orbC: "#0284c7" },
  events:        { bgFrom: "#0e041a", bgVia: "#170628", bgTo: "#08020f", orbA: "#8b5cf6", orbB: "#5b21b6", orbC: "#7c3aed" },
  shopping:      { bgFrom: "#1a0413", bgVia: "#26081d", bgTo: "#11030c", orbA: "#ec4899", orbB: "#db2777", orbC: "#db2777" },
  entertainment: { bgFrom: "#0b0420", bgVia: "#160a35", bgTo: "#080219", orbA: "#d946ef", orbB: "#6366f1", orbC: "#d946ef" },
  cyclo:         { bgFrom: "#1c1107", bgVia: "#2a190a", bgTo: "#0f0a04", orbA: "#d97706", orbB: "#b45309", orbC: "#d97706" },
  map:           { bgFrom: "#031618", bgVia: "#062228", bgTo: "#020e10", orbA: "#0891b2", orbB: "#0e7490", orbC: "#0891b2" },
  ai:            { bgFrom: "#0a0a1f", bgVia: "#10112e", bgTo: "#06061a", orbA: "#6366f1", orbB: "#3730a3", orbC: "#6366f1" },
};

export type CategoryFilter = { key: string; label: string };
export type StatItem = { icon: LucideIcon; label: string; value: string };
export type CollageImage = { src: string; className: string };
export type FloatingBadge = { icon: LucideIcon; title: string; subtitle: string };

/** Hero layout variants */
export type HeroVariant =
  | "split"     // title left · collage right           (Hotels, Restaurants, Shopping)
  | "banner"    // full-width title + panoramic below    (Destinations, Events)
  | "magazine"; // large image left · title right        (Transport, LocalFood)

interface CategoryShellProps {
  themeKey: CategoryKey;
  heroVariant?: HeroVariant;
  badge?: { icon?: LucideIcon; text: string };
  titleLines: ReactNode[];
  gradientLineIndex?: number;
  subtitle?: string;
  stats?: StatItem[];
  /** Used by split (3 images) and banner (first image = panoramic) */
  collage?: CollageImage[];
  floatingBadge?: FloatingBadge;
  search: string;
  setSearch: (value: string) => void;
  searchPlaceholder?: string;
  categories?: CategoryFilter[];
  activeCat?: string;
  setActiveCat?: (key: string) => void;
  sortOptions?: { label: string; value: string }[];
  sort?: string;
  setSort?: (value: string) => void;
  resultCount?: ReactNode;
  children: ReactNode;
}

/* ─── shared accent bar + badge ─── */
function Badge({ icon: Icon, text, bd }: { icon: LucideIcon; text: string; bd: typeof themeBackdrops[CategoryKey] }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wide"
      style={{ borderColor: `${bd.orbA}40`, background: `${bd.orbA}0c`, color: bd.orbA }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: bd.orbA }} />
      <Icon size={11} />
      {text}
    </div>
  );
}

function AccentBar({ bd }: { bd: typeof themeBackdrops[CategoryKey] }) {
  return (
    <div
      className="h-0.5 w-16 rounded-full mt-4 mb-4"
      style={{ background: `linear-gradient(90deg, ${bd.orbA}, transparent)` }}
    />
  );
}

function StatRow({ stats, bd, compact = false }: { stats: StatItem[]; bd: typeof themeBackdrops[CategoryKey]; compact?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center ${compact ? "gap-5 md:gap-8" : "gap-6 md:gap-10"}`}>
      {stats.map(({ icon: Icon, label, value }, si) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + si * 0.06 }}
          className="flex items-center gap-2.5"
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${bd.orbA}14`, border: `1px solid ${bd.orbA}28` }}
          >
            <Icon size={14} style={{ color: bd.orbA }} />
          </div>
          <div>
            <div className="font-black text-lg leading-none" style={{ color: bd.orbA }}>{value}</div>
            <div className="text-gray-400 text-[11px] mt-0.5">{label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function CategoryShell({
  themeKey,
  heroVariant = "split",
  badge,
  titleLines,
  gradientLineIndex = 1,
  subtitle,
  stats,
  collage,
  floatingBadge,
  search,
  setSearch,
  searchPlaceholder = "Tìm kiếm...",
  categories,
  activeCat,
  setActiveCat,
  sortOptions,
  sort,
  setSort,
  resultCount,
  children,
}: CategoryShellProps) {
  const bd = themeBackdrops[themeKey];
  const Badgeicon = badge?.icon ?? Sparkles;

  const gradientStyle = useMemo(
    () => ({
      backgroundImage: `linear-gradient(90deg, ${bd.orbA}, ${bd.orbC})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }),
    [bd]
  );

  const TitleBlock = (
    <h1 className={`font-serif font-black leading-[1.0] tracking-tight text-gray-900 ${
      heroVariant === "minimal"
        ? "text-5xl sm:text-6xl md:text-7xl"
        : heroVariant === "banner"
        ? "text-5xl sm:text-6xl"
        : "text-[2.6rem] sm:text-5xl md:text-[3.4rem]"
    }`}>
      {titleLines.map((line, i) => (
        <span key={i} className="block" style={i === gradientLineIndex ? gradientStyle : undefined}>
          {line}
        </span>
      ))}
    </h1>
  );

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full blur-[220px] opacity-[0.07]" style={{ background: bd.orbA }} />
        <div className="absolute -top-20 -right-60 w-[600px] h-[600px] rounded-full blur-[220px] opacity-[0.04]" style={{ background: bd.orbB }} />
      </div>

      {/* ───── HERO ───── */}
      <section className="relative px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* ══ SPLIT variant ══ */}
          {heroVariant === "split" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="pt-10 sm:pt-14 pb-6 grid lg:grid-cols-[1.15fr_1fr] gap-10 items-center"
            >
              <div>
                {badge && <div className="mb-5"><Badge icon={Badgeicon} text={badge.text} bd={bd} /></div>}
                {TitleBlock}
                <AccentBar bd={bd} />
                {subtitle && <p className="text-gray-500 text-[1.02rem] max-w-md leading-relaxed">{subtitle}</p>}
                {stats && stats.length > 0 && (
                  <div className="mt-6"><StatRow stats={stats} bd={bd} /></div>
                )}
              </div>

              {collage && collage.length > 0 && (
                <div className="relative h-[300px] hidden lg:block">
                  {collage.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.88, y: 18 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                      className={`absolute ${p.className} rounded-2xl overflow-hidden`}
                      style={{ boxShadow: "0 14px 36px -8px rgba(0,0,0,0.18)", border: "1px solid rgba(0,0,0,0.06)" }}
                    >
                      <img src={p.src} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </motion.div>
                  ))}
                  {floatingBadge && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.6, type: "spring", stiffness: 280 }}
                      className="absolute -bottom-2 right-2 rounded-2xl px-4 py-2.5 flex items-center gap-2.5 text-white"
                      style={{ background: `linear-gradient(135deg, ${bd.orbA}, ${bd.orbB})`, boxShadow: `0 10px 28px ${bd.orbA}55` }}
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                        <floatingBadge.icon size={14} />
                      </div>
                      <div>
                        <div className="text-[10px] opacity-75 leading-none">{floatingBadge.subtitle}</div>
                        <div className="text-sm font-bold leading-none mt-0.5">{floatingBadge.title}</div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* ══ BANNER variant ══ */}
          {heroVariant === "banner" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="pt-10 sm:pt-14 pb-6"
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div className="flex-1 max-w-2xl">
                  {badge && <div className="mb-5"><Badge icon={Badgeicon} text={badge.text} bd={bd} /></div>}
                  {TitleBlock}
                  <AccentBar bd={bd} />
                  {subtitle && <p className="text-gray-500 text-[1.02rem] leading-relaxed">{subtitle}</p>}
                </div>
                {stats && stats.length > 0 && (
                  <div className="shrink-0 pb-1"><StatRow stats={stats} bd={bd} compact /></div>
                )}
              </div>

              {/* Panoramic banner image */}
              {collage && collage.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                  className="relative h-60 sm:h-72 md:h-80 rounded-2xl overflow-hidden"
                  style={{ boxShadow: "0 16px 48px -12px rgba(0,0,0,0.18)", border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <img src={collage[0].src} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

                  {/* mini thumbnails — top-right */}
                  {collage.length > 1 && (
                    <div className="absolute top-3 right-3 flex gap-2">
                      {collage.slice(1).map((p, i) => (
                        <div key={i} className="w-20 h-14 rounded-xl overflow-hidden border-2 border-white/40 shadow-md">
                          <img src={p.src} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {floatingBadge && (
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute bottom-4 left-4 rounded-2xl px-4 py-2.5 flex items-center gap-2.5 text-white"
                      style={{ background: `linear-gradient(135deg, ${bd.orbA}, ${bd.orbB})`, boxShadow: `0 10px 28px ${bd.orbA}55` }}
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                        <floatingBadge.icon size={14} />
                      </div>
                      <div>
                        <div className="text-[10px] opacity-75 leading-none">{floatingBadge.subtitle}</div>
                        <div className="text-sm font-bold leading-none mt-0.5">{floatingBadge.title}</div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ══ MAGAZINE variant ══ */}
          {heroVariant === "magazine" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="pt-10 sm:pt-14 pb-6 grid lg:grid-cols-[56%_44%] gap-8 items-center"
            >
              {/* LEFT — large featured image */}
              {collage && collage.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
                  className="relative h-[340px] sm:h-[380px] rounded-3xl overflow-hidden"
                  style={{ boxShadow: `0 20px 60px -12px ${bd.orbA}30`, border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <img src={collage[0].src} alt="" className="w-full h-full object-cover" />
                  {/* dark-to-transparent gradient on bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  {/* accent colour vignette on left */}
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to right, ${bd.orbA}22, transparent 55%)` }}
                  />

                  {/* Thumbnail strip — bottom-left */}
                  {collage.length > 1 && (
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {collage.slice(1).map((p, i) => (
                        <div
                          key={i}
                          className="w-16 h-12 rounded-xl overflow-hidden border-2 border-white/50 shadow-lg"
                        >
                          <img src={p.src} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Floating badge — top-right */}
                  {floatingBadge && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                      className="absolute top-4 right-4 rounded-2xl px-3.5 py-2.5 flex items-center gap-2 text-white"
                      style={{
                        background: `linear-gradient(135deg, ${bd.orbA}, ${bd.orbB})`,
                        boxShadow: `0 8px 24px ${bd.orbA}55`,
                      }}
                    >
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                        <floatingBadge.icon size={13} />
                      </div>
                      <div>
                        <div className="text-[10px] opacity-75 leading-none">{floatingBadge.subtitle}</div>
                        <div className="text-sm font-bold leading-none mt-0.5">{floatingBadge.title}</div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* RIGHT — text */}
              <div>
                {badge && <div className="mb-5"><Badge icon={Badgeicon} text={badge.text} bd={bd} /></div>}
                {TitleBlock}
                <AccentBar bd={bd} />
                {subtitle && (
                  <p className="text-gray-500 text-[1.02rem] leading-relaxed max-w-sm">{subtitle}</p>
                )}
                {stats && stats.length > 0 && (
                  <div className="mt-6"><StatRow stats={stats} bd={bd} compact /></div>
                )}
              </div>
            </motion.div>
          )}

          {/* ─── Search + filter bar ─── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.45 }}
            className="pb-6 rounded-2xl border border-gray-200 bg-white p-2.5 sm:p-3 shadow-sm"
          >
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200/80">
              <Search size={15} className="text-gray-400 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="bg-transparent flex-1 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none min-w-0"
              />
              {sortOptions && setSort && (
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-white text-gray-600 text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 cursor-pointer focus:outline-none hidden sm:block"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value} className="bg-white text-gray-800">{o.label}</option>
                  ))}
                </select>
              )}
              {search && (
                <button onClick={() => setSearch("")} className="text-gray-400 text-xs hover:text-gray-600 shrink-0 transition-colors">
                  Xóa
                </button>
              )}
            </div>

            {categories && activeCat !== undefined && setActiveCat && categories.length > 0 && (
              <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-0.5 scrollbar-thin">
                {categories.map((c) => {
                  const active = activeCat === c.key;
                  return (
                    <button
                      key={c.key}
                      onClick={() => setActiveCat(c.key)}
                      className="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all border"
                      style={
                        active
                          ? { background: `linear-gradient(135deg, ${bd.orbA}, ${bd.orbB})`, color: "#fff", borderColor: "transparent", boxShadow: `0 3px 12px ${bd.orbA}40` }
                          : { borderColor: "#e5e7eb", color: "#6b7280", background: "transparent" }
                      }
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            )}

            {resultCount && (
              <div className="mt-2 px-1 text-xs text-gray-400">{resultCount}</div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── CHILDREN ── */}
      <section className="relative px-4 sm:px-6 pb-20">
        <div className="max-w-7xl mx-auto">{children}</div>
      </section>
    </div>
  );
}

export function CategoryCardShell({
  children,
  className = "",
  testId,
  themeKey,
}: {
  children: ReactNode;
  className?: string;
  testId?: string;
  themeKey: CategoryKey;
}) {
  const bd = themeBackdrops[themeKey];
  return (
    <div
      data-testid={testId}
      className={`group relative rounded-3xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition-all ${className}`}
      style={{ borderColor: "#f1f5f9" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${bd.orbA}50`; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#f1f5f9"; }}
    >
      {children}
    </div>
  );
}

export function useThemeAccents(themeKey: CategoryKey) {
  return themeBackdrops[themeKey];
}
