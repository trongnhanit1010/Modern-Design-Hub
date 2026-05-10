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

      {/* ════════════ HERO — Centered overlay ════════════ */}
      <section className="relative h-[82vh] min-h-[560px] max-h-[780px] overflow-hidden">

        {/* Background image */}
        {collage.length > 0 && (
          <motion.img
            src={collage[0].src}
            alt=""
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Overlay layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-[2rem] shadow-2xl px-10 py-10 sm:px-14 sm:py-12 max-w-2xl w-full text-center"
            style={{ boxShadow: "0 32px 80px -8px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.9)" }}
          >
            {/* Badge */}
            {badge && (
              <div className="mb-6">
                <span
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide"
                  style={{
                    background: `${bd.orbA}10`,
                    color: bd.orbA,
                    border: `1px solid ${bd.orbA}30`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: bd.orbA }} />
                  {badge.text}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-serif font-black leading-[0.92] tracking-[-0.03em] text-gray-950 text-[2.8rem] sm:text-[3.6rem]">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {i === gradientLineIndex
                    ? <span style={gradientStyle}>{line}</span>
                    : line}
                </span>
              ))}
            </h1>

            {/* Divider */}
            <div
              className="mx-auto mt-5 h-[2px] w-10 rounded-full"
              style={{ background: `linear-gradient(90deg, ${bd.orbA}, ${bd.orbC})` }}
            />

            {/* Subtitle */}
            {subtitle && (
              <p className="mt-5 text-gray-500 text-sm leading-[1.8] max-w-sm mx-auto">
                {subtitle}
              </p>
            )}

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="mt-7 flex items-center justify-center gap-0 divide-x divide-gray-100">
                {stats.map(({ label, value }) => (
                  <div key={label} className="flex flex-col items-center gap-0.5 px-6">
                    <span
                      className="text-[1.6rem] font-black leading-none tracking-tight"
                      style={{ color: bd.orbA }}
                    >
                      {value}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-8">
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-white font-semibold text-sm"
                style={{
                  background: `linear-gradient(135deg, ${bd.orbA}, ${bd.orbB})`,
                  boxShadow: `0 8px 28px -4px ${bd.orbA}55`,
                }}
              >
                Khám phá ngay
                <ArrowRight size={15} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Floating badge — bottom right corner */}
        {floatingBadge && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="absolute bottom-6 right-6 flex items-center gap-2.5 rounded-xl px-4 py-3 text-white"
            style={{
              background: "rgba(15,23,42,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 8px 28px rgba(0,0,0,0.3)",
            }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `linear-gradient(135deg, ${bd.orbA}, ${bd.orbB})` }}
            >
              <floatingBadge.icon size={14} />
            </div>
            <div>
              <div className="text-[10px] text-white/60 leading-none tracking-wide uppercase">
                {floatingBadge.subtitle}
              </div>
              <div className="text-[13px] font-bold leading-none mt-1 text-white">
                {floatingBadge.title}
              </div>
            </div>
          </motion.div>
        )}
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
