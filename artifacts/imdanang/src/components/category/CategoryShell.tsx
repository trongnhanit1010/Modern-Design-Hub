import { useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, type LucideIcon } from "lucide-react";
import { categoryThemes, type CategoryKey } from "@/lib/categoryThemes";

/* ── Per-theme dark backdrop colors (background + 3 orb tints) ── */
const themeBackdrops: Record<
  CategoryKey,
  { bgFrom: string; bgVia: string; bgTo: string; orbA: string; orbB: string; orbC: string }
> = {
  home:          { bgFrom: "#0b1220", bgVia: "#0e1828", bgTo: "#0b1220", orbA: "#475569", orbB: "#1e293b", orbC: "#334155" },
  hotels:        { bgFrom: "#1a0f02", bgVia: "#22150a", bgTo: "#0e0a04", orbA: "#f59e0b", orbB: "#b45309", orbC: "#fde68a" },
  destinations:  { bgFrom: "#02140c", bgVia: "#04231a", bgTo: "#01120a", orbA: "#10b981", orbB: "#047857", orbC: "#5eead4" },
  restaurants:   { bgFrom: "#1a0a03", bgVia: "#241006", bgTo: "#100804", orbA: "#f97316", orbB: "#9a3412", orbC: "#fb923c" },
  localfood:     { bgFrom: "#1a0410", bgVia: "#260a18", bgTo: "#10040a", orbA: "#f43f5e", orbB: "#9f1239", orbC: "#fda4af" },
  transport:     { bgFrom: "#04101e", bgVia: "#06182c", bgTo: "#020a16", orbA: "#0ea5e9", orbB: "#1d4ed8", orbC: "#7dd3fc" },
  events:        { bgFrom: "#0e041a", bgVia: "#170628", bgTo: "#08020f", orbA: "#8b5cf6", orbB: "#5b21b6", orbC: "#f0abfc" },
  shopping:      { bgFrom: "#1a0413", bgVia: "#26081d", bgTo: "#11030c", orbA: "#ec4899", orbB: "#9d174d", orbC: "#f9a8d4" },
  entertainment: { bgFrom: "#0b0420", bgVia: "#160a35", bgTo: "#080219", orbA: "#d946ef", orbB: "#6366f1", orbC: "#f59e0b" },
  cyclo:         { bgFrom: "#1c1107", bgVia: "#2a190a", bgTo: "#0f0a04", orbA: "#a16207", orbB: "#7c2d12", orbC: "#fde047" },
  map:           { bgFrom: "#031618", bgVia: "#062228", bgTo: "#020e10", orbA: "#0891b2", orbB: "#0e7490", orbC: "#67e8f9" },
  ai:            { bgFrom: "#0a0a1f", bgVia: "#10112e", bgTo: "#06061a", orbA: "#6366f1", orbB: "#3730a3", orbC: "#a5b4fc" },
};

export type CategoryFilter = { key: string; label: string; emoji?: string };

export type StatItem = { icon: LucideIcon; label: string; value: string };

export type CollageImage = { src: string; className: string };

export type FloatingBadge = { icon: LucideIcon; title: string; subtitle: string };

interface CategoryShellProps {
  themeKey: CategoryKey;
  badge?: { icon?: LucideIcon; text: string };
  /** Title rendered as multiple lines; the line at `gradientLineIndex` gets the gradient effect */
  titleLines: ReactNode[];
  gradientLineIndex?: number;
  subtitle?: string;
  stats?: StatItem[];
  collage?: CollageImage[];
  floatingBadge?: FloatingBadge;

  /** Single search bar */
  search: string;
  setSearch: (value: string) => void;
  searchPlaceholder?: string;

  /** One filter row (category pills) */
  categories?: CategoryFilter[];
  activeCat?: string;
  setActiveCat?: (key: string) => void;

  /** Optional sort selector rendered inline with search */
  sortOptions?: { label: string; value: string }[];
  sort?: string;
  setSort?: (value: string) => void;

  /** Optional right-side meta beside the search bar (e.g. result count) */
  resultCount?: ReactNode;

  children: ReactNode;
}

export function CategoryShell({
  themeKey,
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
  const theme = categoryThemes[themeKey];
  const bd = themeBackdrops[themeKey];

  const gradientStyle = useMemo(
    () => ({
      backgroundImage: `linear-gradient(90deg, ${bd.orbA}, ${bd.orbC}, ${bd.orbA})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }),
    [bd]
  );

  const Badgeicon = badge?.icon ?? Sparkles;

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${bd.bgFrom} 0%, ${bd.bgVia} 50%, ${bd.bgTo} 100%)` }}
    >
      {/* ── Animated themed backdrop (orbs + dot grid) ── */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-[120px] opacity-30"
          style={{ background: bd.orbA }}
        />
        <div
          className="absolute top-40 -right-40 w-[520px] h-[520px] rounded-full blur-[120px] opacity-30"
          style={{ background: bd.orbB }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full blur-[120px] opacity-20"
          style={{ background: bd.orbC }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ── HERO ── */}
      <section className="relative pt-10 pb-6 sm:pt-12 sm:pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center"
          >
            <div>
              {badge && (
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium backdrop-blur-md mb-5"
                  style={{
                    borderColor: `${bd.orbA}55`,
                    background: `${bd.orbA}1a`,
                    color: "#fff",
                  }}
                >
                  <Badgeicon size={13} style={{ color: bd.orbC }} />
                  {badge.text}
                </div>
              )}

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.02] tracking-tight">
                {titleLines.map((line, i) => (
                  <span
                    key={i}
                    className="block"
                    style={i === gradientLineIndex ? gradientStyle : undefined}
                  >
                    {line}
                  </span>
                ))}
              </h1>

              {subtitle && (
                <p className="text-white/65 text-base md:text-lg mt-5 max-w-xl leading-relaxed">
                  {subtitle}
                </p>
              )}

              {stats && stats.length > 0 && (
                <div className="flex flex-wrap items-center gap-5 md:gap-8 mt-6">
                  {stats.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl border backdrop-blur-md flex items-center justify-center"
                        style={{
                          borderColor: "rgba(255,255,255,0.1)",
                          background: "rgba(255,255,255,0.05)",
                        }}
                      >
                        <Icon size={16} style={{ color: bd.orbC }} />
                      </div>
                      <div>
                        <div className="font-bold text-lg leading-none">{value}</div>
                        <div className="text-white/50 text-xs mt-1">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: collage */}
            {collage && collage.length > 0 && (
              <div className="relative h-[320px] hidden lg:block">
                {collage.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.85, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.55 }}
                    className={`absolute ${p.className} rounded-3xl overflow-hidden border border-white/15 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.6)]`}
                  >
                    <img src={p.src} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </motion.div>
                ))}

                {floatingBadge && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute -bottom-2 right-2 rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-2 text-white"
                    style={{ background: `linear-gradient(135deg, ${bd.orbA}, ${bd.orbB})` }}
                  >
                    <floatingBadge.icon size={16} />
                    <div>
                      <div className="text-xs opacity-85 leading-none">{floatingBadge.subtitle}</div>
                      <div className="text-sm font-bold leading-none mt-1">{floatingBadge.title}</div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>

          {/* ── Single search + filter bar (glass card) ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-3 sm:p-4 shadow-2xl shadow-black/40"
          >
            <div className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-black/30 border border-white/10">
              <Search size={16} className="text-white/40 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="bg-transparent flex-1 text-sm placeholder:text-white/35 focus:outline-none min-w-0"
              />
              {sortOptions && setSort && (
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent text-white/70 text-xs sm:text-sm border border-white/10 rounded-lg px-2 py-1 cursor-pointer focus:outline-none hidden sm:block"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value} className="bg-slate-900">
                      {o.label}
                    </option>
                  ))}
                </select>
              )}
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-white/40 text-xs hover:text-white/80 shrink-0"
                >
                  Xóa
                </button>
              )}
            </div>

            {categories && activeCat !== undefined && setActiveCat && categories.length > 0 && (
              <div className="flex items-center gap-2 mt-3 sm:mt-4 overflow-x-auto pb-1 scrollbar-thin">
                {categories.map((c) => {
                  const active = activeCat === c.key;
                  return (
                    <button
                      key={c.key}
                      onClick={() => setActiveCat(c.key)}
                      className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all border"
                      style={
                        active
                          ? {
                              background: `linear-gradient(135deg, ${bd.orbA}, ${bd.orbB})`,
                              color: "#fff",
                              borderColor: "transparent",
                              boxShadow: `0 6px 18px ${bd.orbA}55`,
                            }
                          : {
                              borderColor: "rgba(255,255,255,0.12)",
                              color: "rgba(255,255,255,0.65)",
                              background: "transparent",
                            }
                      }
                    >
                      {c.emoji && <span>{c.emoji}</span>}
                      {c.label}
                    </button>
                  );
                })}
              </div>
            )}

            {resultCount && (
              <div className="mt-2 sm:mt-3 px-1 text-xs text-white/55">{resultCount}</div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── CHILDREN (listings) ── */}
      <section className="relative px-4 sm:px-6 pb-20">
        <div className="max-w-7xl mx-auto">{children}</div>
      </section>
    </div>
  );
}

/* ── Re-usable dark card wrapper for consistency across categories ── */
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
      className={`group relative rounded-3xl overflow-hidden border bg-white/[0.04] backdrop-blur-md hover:shadow-2xl transition-all ${className}`}
      style={{
        borderColor: "rgba(255,255,255,0.10)",
        boxShadow: `0 0 0 0 ${bd.orbA}00`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${bd.orbA}66`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.10)";
      }}
    >
      {children}
    </div>
  );
}

/* Utility: get the theme accent hex (for inline use in pages) */
export function useThemeAccents(themeKey: CategoryKey) {
  return themeBackdrops[themeKey];
}
