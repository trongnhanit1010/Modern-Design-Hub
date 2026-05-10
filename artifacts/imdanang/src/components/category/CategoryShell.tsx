import { useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, type LucideIcon } from "lucide-react";
import { type CategoryKey } from "@/lib/categoryThemes";

/* ─── Theme accents ─── */
const BLUE = { orbA: "#2563eb", orbB: "#1d4ed8", orbC: "#3b82f6" };

const themeBackdrops: Record<
  CategoryKey,
  { orbA: string; orbB: string; orbC: string }
> = {
  home:          BLUE,
  hotels:        BLUE,
  destinations:  BLUE,
  restaurants:   BLUE,
  localfood:     BLUE,
  transport:     BLUE,
  events:        BLUE,
  shopping:      BLUE,
  entertainment: BLUE,
  cyclo:         { orbA: "#d97706", orbB: "#b45309", orbC: "#d97706" },
  map:           BLUE,
  ai:            BLUE,
};

/* ─── Public types ─── */
export type CategoryFilter  = { key: string; label: string };
export type StatItem        = { icon: LucideIcon; label: string; value: string };
export type CollageImage    = { src: string; className?: string };
export type FloatingBadge   = { icon: LucideIcon; title: string; subtitle: string };
export type HeroVariant     = "split" | "banner" | "magazine" | "minimal";

interface CategoryShellProps {
  themeKey: CategoryKey;
  heroVariant?: HeroVariant;
  badge?: { icon?: LucideIcon; text: string };
  titleLines: ReactNode[];
  gradientLineIndex?: number;
  subtitle?: string;
  stats?: StatItem[];
  collage?: CollageImage[];
  floatingBadge?: FloatingBadge;
  search: string;
  setSearch: (v: string) => void;
  searchPlaceholder?: string;
  categories?: CategoryFilter[];
  activeCat?: string;
  setActiveCat?: (k: string) => void;
  sortOptions?: { label: string; value: string }[];
  sort?: string;
  setSort?: (v: string) => void;
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
  collage = [],
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

  const gradientStyle = useMemo(
    () => ({
      backgroundImage: `linear-gradient(100deg, ${bd.orbA}, ${bd.orbC})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }),
    [bd]
  );

  return (
    <div className="min-h-screen bg-white">

      {/* ════════════ HERO — Text Mask ════════════ */}
      <section className="relative w-full overflow-hidden bg-[#08090d]" style={{ minHeight: 560 }}>

        {/* ── MASKED TITLE: image shows THROUGH giant letters ── */}
        <div className="relative px-4 sm:px-8 xl:px-12 pt-10 sm:pt-14 select-none pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-black leading-[0.85] tracking-[-0.04em]"
            style={{
              fontSize: "clamp(5rem, 15vw, 14rem)",
              backgroundImage: collage.length > 0 ? `url(${collage[0].src})` : `linear-gradient(135deg, ${bd.orbA}, ${bd.orbC})`,
              backgroundSize: "cover",
              backgroundPosition: "center 30%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "brightness(1.15) contrast(1.05)",
            }}
          >
            {titleLines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </motion.h1>
        </div>

        {/* ── BOTTOM INFO BAR ── */}
        <div className="relative px-4 sm:px-8 xl:px-12 pt-6 pb-10 sm:pb-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">

            {/* Left: badge + subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              {badge && (
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase mb-4"
                  style={{
                    background: `${bd.orbA}20`,
                    color: bd.orbC,
                    border: `1px solid ${bd.orbA}40`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: bd.orbA }} />
                  {badge.text}
                </span>
              )}
              {subtitle && (
                <p className="text-white/50 text-sm leading-relaxed max-w-[380px]">{subtitle}</p>
              )}
            </motion.div>

            {/* Right: stats + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex items-end gap-8"
            >
              {stats && stats.length > 0 && (
                <div className="flex items-center gap-6">
                  {stats.map(({ label, value }, i) => (
                    <div key={label} className={`${i > 0 ? "pl-6 border-l border-white/10" : ""}`}>
                      <div className="text-[1.5rem] font-black text-white leading-none">{value}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-white font-semibold text-sm"
                style={{
                  background: `linear-gradient(135deg, ${bd.orbA}, ${bd.orbB})`,
                  boxShadow: `0 8px 28px -4px ${bd.orbA}60`,
                }}
              >
                Khám phá
                <ArrowRight size={14} />
              </motion.button>
            </motion.div>
          </div>

          {/* Divider line */}
          <div className="mt-8 h-px w-full" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.08), transparent)" }} />

          {/* Floating badge row */}
          {floatingBadge && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-5 flex items-center gap-2.5"
            >
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `linear-gradient(135deg, ${bd.orbA}, ${bd.orbB})` }}
              >
                <floatingBadge.icon size={13} className="text-white" />
              </div>
              <div>
                <span className="text-[10px] text-white/35 uppercase tracking-widest">{floatingBadge.subtitle}</span>
                <span className="text-[12px] font-semibold text-white/70 ml-2">{floatingBadge.title}</span>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ════════════ SEARCH + FILTER ════════════ */}
      <section className="relative px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            className="mt-6 mb-6 rounded-2xl border border-gray-200 bg-white p-2.5 shadow-sm"
          >
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
              <Search size={14} className="text-gray-400 shrink-0" />
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
                    <option key={o.value} value={o.value} className="bg-white text-gray-800">
                      {o.label}
                    </option>
                  ))}
                </select>
              )}
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-gray-400 text-xs hover:text-gray-600 shrink-0 transition-colors"
                >
                  Xóa
                </button>
              )}
            </div>

            {categories && activeCat !== undefined && setActiveCat && categories.length > 0 && (
              <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-0.5">
                {categories.map((c) => {
                  const active = activeCat === c.key;
                  return (
                    <button
                      key={c.key}
                      onClick={() => setActiveCat(c.key)}
                      className="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all border"
                      style={
                        active
                          ? {
                              background: `linear-gradient(135deg, ${bd.orbA}, ${bd.orbB})`,
                              color: "#fff",
                              borderColor: "transparent",
                              boxShadow: `0 2px 10px ${bd.orbA}45`,
                            }
                          : {
                              borderColor: "#e5e7eb",
                              color: "#6b7280",
                              background: "transparent",
                            }
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

      {/* ── Children ── */}
      <section className="relative px-4 sm:px-6 pb-20">
        <div className="max-w-7xl mx-auto">{children}</div>
      </section>
    </div>
  );
}

/* ─── Card shell ─── */
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
      className={`group relative rounded-3xl overflow-hidden border bg-white shadow-sm transition-all duration-200 ${className}`}
      style={{ borderColor: "#f1f5f9" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${bd.orbA}50`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 28px -6px ${bd.orbA}22`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#f1f5f9";
        (e.currentTarget as HTMLElement).style.boxShadow = "";
      }}
    >
      {children}
    </div>
  );
}

export function useThemeAccents(themeKey: CategoryKey) {
  return themeBackdrops[themeKey];
}
