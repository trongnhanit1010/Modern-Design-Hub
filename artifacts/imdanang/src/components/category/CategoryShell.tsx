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

      {/* ════════════ HERO — Editorial full-bleed ════════════ */}
      <section className="relative w-full overflow-hidden" style={{ height: "88vh", minHeight: 580, maxHeight: 860 }}>

        {/* Background — Ken Burns slow zoom */}
        {collage.length > 0 && (
          <motion.img
            src={collage[0].src}
            alt=""
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 9, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Layered overlays — heavy bottom, light top */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, rgba(5,8,20,0.92) 0%, rgba(5,8,20,0.55) 38%, rgba(5,8,20,0.18) 65%, transparent 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, rgba(5,8,20,0.4) 0%, transparent 55%)"
        }} />

        {/* Thin accent left border */}
        <div
          className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-full"
          style={{ background: `linear-gradient(to bottom, transparent, ${bd.orbA}, transparent)` }}
        />

        {/* Floating badge — top right, glass pill */}
        {floatingBadge && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.45 }}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 flex items-center gap-2.5 rounded-2xl px-4 py-2.5"
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            }}
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `linear-gradient(135deg, ${bd.orbA}, ${bd.orbB})` }}
            >
              <floatingBadge.icon size={12} className="text-white" />
            </div>
            <div>
              <div className="text-[9px] text-white/55 leading-none tracking-widest uppercase">{floatingBadge.subtitle}</div>
              <div className="text-[12px] font-bold text-white leading-none mt-0.5">{floatingBadge.title}</div>
            </div>
          </motion.div>
        )}

        {/* Bottom-anchored editorial content */}
        <div className="absolute inset-x-0 bottom-0 px-6 sm:px-10 xl:px-14 pb-10 sm:pb-14">

          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5"
            >
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: bd.orbC }} />
                {badge.text}
              </span>
            </motion.div>
          )}

          {/* Two-column bottom: title left — stats+CTA right */}
          <div className="flex items-end justify-between gap-8 flex-wrap">

            {/* Title block */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-serif font-black leading-[0.88] tracking-[-0.03em] text-white text-[3.4rem] sm:text-[4.8rem] xl:text-[5.6rem] max-w-[660px]">
                {titleLines.map((line, i) => (
                  <span key={i} className="block">
                    {i === gradientLineIndex
                      ? (
                        <span style={{
                          backgroundImage: `linear-gradient(100deg, #93c5fd, ${bd.orbC})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}>
                          {line}
                        </span>
                      )
                      : line}
                  </span>
                ))}
              </h1>
              {subtitle && (
                <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-[420px]">
                  {subtitle}
                </p>
              )}
            </motion.div>

            {/* Right: stats + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-end gap-5 shrink-0"
            >
              {/* Stats row */}
              {stats && stats.length > 0 && (
                <div className="flex items-center gap-5">
                  {stats.map(({ label, value }, i) => (
                    <div key={label} className={`text-right ${i > 0 ? "pl-5 border-l border-white/15" : ""}`}>
                      <div className="text-[1.6rem] font-black text-white leading-none tracking-tight">{value}</div>
                      <div className="text-[10px] text-white/50 uppercase tracking-widest mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-white font-semibold text-sm"
                style={{
                  background: `linear-gradient(135deg, ${bd.orbA}, ${bd.orbB})`,
                  boxShadow: `0 10px 32px -4px ${bd.orbA}70`,
                }}
              >
                Khám phá ngay
                <ArrowRight size={15} />
              </motion.button>
            </motion.div>
          </div>
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
