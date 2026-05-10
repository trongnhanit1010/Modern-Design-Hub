import { useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Search, type LucideIcon } from "lucide-react";
import { type CategoryKey } from "@/lib/categoryThemes";

/* ─── Theme accents ─── */
const themeBackdrops: Record<
  CategoryKey,
  { orbA: string; orbB: string; orbC: string }
> = {
  home:          { orbA: "#475569", orbB: "#1e293b", orbC: "#334155" },
  hotels:        { orbA: "#f59e0b", orbB: "#b45309", orbC: "#d97706" },
  destinations:  { orbA: "#10b981", orbB: "#047857", orbC: "#059669" },
  restaurants:   { orbA: "#f97316", orbB: "#ea580c", orbC: "#ea580c" },
  localfood:     { orbA: "#f43f5e", orbB: "#e11d48", orbC: "#e11d48" },
  transport:     { orbA: "#0ea5e9", orbB: "#1d4ed8", orbC: "#0284c7" },
  events:        { orbA: "#8b5cf6", orbB: "#5b21b6", orbC: "#7c3aed" },
  shopping:      { orbA: "#ec4899", orbB: "#db2777", orbC: "#db2777" },
  entertainment: { orbA: "#d946ef", orbB: "#6366f1", orbC: "#d946ef" },
  cyclo:         { orbA: "#d97706", orbB: "#b45309", orbC: "#d97706" },
  map:           { orbA: "#0891b2", orbB: "#0e7490", orbC: "#0891b2" },
  ai:            { orbA: "#6366f1", orbB: "#3730a3", orbC: "#6366f1" },
};

/* ─── Public types ─── */
export type CategoryFilter  = { key: string; label: string };
export type StatItem        = { icon: LucideIcon; label: string; value: string };
export type CollageImage    = { src: string; className?: string };          // className kept for backward compat, ignored
export type FloatingBadge   = { icon: LucideIcon; title: string; subtitle: string };
export type HeroVariant     = "split" | "banner" | "magazine" | "minimal"; // kept for backward compat, ignored

interface CategoryShellProps {
  themeKey: CategoryKey;
  heroVariant?: HeroVariant;      // ignored — single premium layout used for all
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
      {/* Very subtle ambient wash */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-80 -left-80 w-[900px] h-[900px] rounded-full blur-[260px] opacity-[0.045]"
          style={{ background: bd.orbA }}
        />
      </div>

      {/* ════════════ HERO ════════════ */}
      <section className="relative px-4 sm:px-6 pt-10 sm:pt-14">
        <div className="max-w-7xl mx-auto">

          {/* Two-column hero grid */}
          <div className="grid lg:grid-cols-[45%_55%] gap-10 xl:gap-14 items-start">

            {/* ── LEFT: Text ── */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center lg:pt-4"
            >
              {/* Badge */}
              {badge && (
                <div className="mb-6">
                  <span
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide"
                    style={{
                      background: `${bd.orbA}12`,
                      color: bd.orbA,
                      border: `1px solid ${bd.orbA}35`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: bd.orbA }}
                    />
                    {badge.text}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="font-serif font-black leading-[1.0] tracking-[-0.02em] text-gray-950 text-[2.8rem] sm:text-5xl xl:text-[3.4rem]">
                {titleLines.map((line, i) => (
                  <span key={i} className="block">
                    {i === gradientLineIndex
                      ? <span style={gradientStyle}>{line}</span>
                      : line}
                  </span>
                ))}
              </h1>

              {/* Accent rule */}
              <div
                className="mt-5 h-[2px] w-12 rounded-full"
                style={{ background: `linear-gradient(90deg, ${bd.orbA}, transparent)` }}
              />

              {/* Subtitle */}
              {subtitle && (
                <p className="mt-4 text-gray-500 text-[0.97rem] leading-[1.78] max-w-[340px]">
                  {subtitle}
                </p>
              )}

              {/* Stats card */}
              {stats && stats.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.45 }}
                  className="mt-8 inline-flex rounded-2xl border border-gray-100 overflow-hidden shadow-sm bg-white w-fit"
                >
                  {stats.map(({ label, value }, i) => (
                    <div
                      key={label}
                      className={`px-5 py-3.5 text-center ${i > 0 ? "border-l border-gray-100" : ""}`}
                    >
                      <div
                        className="text-[1.35rem] font-black leading-none tracking-tight"
                        style={{ color: bd.orbA }}
                      >
                        {value}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-1 leading-none whitespace-nowrap">
                        {label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* ── RIGHT: Image mosaic ── */}
            {collage.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 24, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className={`relative hidden lg:grid gap-2.5 h-[400px] ${
                  collage.length >= 3
                    ? "grid-cols-[1.4fr_1fr] grid-rows-2"
                    : collage.length === 2
                    ? "grid-rows-[1.6fr_1fr]"
                    : ""
                }`}
              >
                {/* Main image — spans 2 rows if 3 images */}
                <div
                  className={`relative overflow-hidden rounded-2xl ${
                    collage.length >= 3 ? "row-span-2" : ""
                  }`}
                  style={{
                    boxShadow: `0 20px 50px -10px ${bd.orbA}28`,
                  }}
                >
                  <img
                    src={collage[0].src}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                  {/* Accent left-edge glow */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `linear-gradient(to right, ${bd.orbA}55, transparent 40%)`,
                    }}
                  />

                  {/* Floating badge — inside main image */}
                  {floatingBadge && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-white"
                      style={{
                        background: `linear-gradient(135deg, ${bd.orbA}ee, ${bd.orbB}ee)`,
                        backdropFilter: "blur(8px)",
                        boxShadow: `0 8px 24px ${bd.orbA}55`,
                      }}
                    >
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                        <floatingBadge.icon size={13} />
                      </div>
                      <div>
                        <div className="text-[10px] opacity-75 leading-none">{floatingBadge.subtitle}</div>
                        <div className="text-[13px] font-bold leading-none mt-0.5">{floatingBadge.title}</div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Secondary images */}
                {collage.slice(1).map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-xl"
                    style={{ boxShadow: "0 8px 24px -4px rgba(0,0,0,0.12)" }}
                  >
                    <img
                      src={img.src}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* ── Search + filter bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            className="mt-8 mb-6 rounded-2xl border border-gray-200 bg-white p-2.5 shadow-sm"
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
