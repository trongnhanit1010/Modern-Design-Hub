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

      {/* ════════════ HERO — Bento Grid ════════════ */}
      <section className="w-full px-3 sm:px-4 pt-3 sm:pt-4 pb-0" style={{ background: "#f0f2f5" }}>
        <div
          className="grid gap-3"
          style={{ gridTemplate: '"img title" "img stats" "img cta" / 1.15fr 1fr', height: 460 }}
        >
          {/* ── Cell A: Main image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden"
            style={{ gridArea: "img", boxShadow: "0 2px 20px rgba(0,0,0,0.10)" }}
          >
            {collage.length > 0 && (
              <img
                src={collage[0].src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Badge on image */}
            {badge && (
              <div className="absolute top-4 left-4">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide text-white"
                  style={{
                    background: "rgba(0,0,0,0.38)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: bd.orbC }} />
                  {badge.text}
                </span>
              </div>
            )}

            {/* Floating badge bottom */}
            {floatingBadge && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-white"
                style={{
                  background: `linear-gradient(135deg, ${bd.orbA}ee, ${bd.orbB}ee)`,
                  backdropFilter: "blur(10px)",
                  boxShadow: `0 6px 20px ${bd.orbA}50`,
                }}
              >
                <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                  <floatingBadge.icon size={12} />
                </div>
                <div>
                  <div className="text-[9px] opacity-70 leading-none tracking-widest uppercase">{floatingBadge.subtitle}</div>
                  <div className="text-[12px] font-bold leading-none mt-0.5">{floatingBadge.title}</div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* ── Cell B: Title card ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-white flex flex-col justify-center px-8 py-6"
            style={{ gridArea: "title", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
          >
            <h1 className="font-serif font-black leading-[0.9] tracking-[-0.03em] text-gray-950 text-[2.4rem] xl:text-[2.8rem]">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {i === gradientLineIndex
                    ? <span style={gradientStyle}>{line}</span>
                    : line}
                </span>
              ))}
            </h1>
            {subtitle && (
              <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-xs">{subtitle}</p>
            )}
          </motion.div>

          {/* ── Cell C: Stats card ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-white flex items-center px-8"
            style={{ gridArea: "stats", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
          >
            {stats && stats.length > 0 && (
              <div className="flex items-center gap-0 divide-x divide-gray-100 w-full">
                {stats.map(({ label, value }) => (
                  <div key={label} className="flex-1 flex flex-col items-center gap-1 py-2">
                    <span
                      className="text-[1.7rem] font-black leading-none tracking-tight"
                      style={{ color: bd.orbA }}
                    >
                      {value}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest text-center">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── Cell D: CTA card ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl flex items-center justify-between px-8 py-5 overflow-hidden relative"
            style={{
              gridArea: "cta",
              background: `linear-gradient(135deg, ${bd.orbA}, ${bd.orbB})`,
              boxShadow: `0 4px 24px -4px ${bd.orbA}60`,
            }}
          >
            {/* Decorative circle */}
            <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/8" />
            <div className="absolute -right-2 -bottom-6 w-24 h-24 rounded-full bg-white/6" />

            <span className="text-white font-bold text-base relative z-10">Khám phá ngay</span>
            <motion.div
              whileHover={{ x: 4 }}
              className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center relative z-10"
            >
              <ArrowRight size={18} className="text-white" />
            </motion.div>
          </motion.div>
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
