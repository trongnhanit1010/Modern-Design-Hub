import { useMemo, useRef, type ReactNode } from "react";
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

  const filterRowRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    drag.current.active = true;
    drag.current.startX = e.pageX - (filterRowRef.current?.offsetLeft ?? 0);
    drag.current.scrollLeft = filterRowRef.current?.scrollLeft ?? 0;
    if (filterRowRef.current) filterRowRef.current.style.cursor = "grabbing";
  };
  const onMouseLeave = () => {
    drag.current.active = false;
    if (filterRowRef.current) filterRowRef.current.style.cursor = "";
  };
  const onMouseUp = () => {
    drag.current.active = false;
    if (filterRowRef.current) filterRowRef.current.style.cursor = "";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current.active) return;
    e.preventDefault();
    const x = e.pageX - (filterRowRef.current?.offsetLeft ?? 0);
    const walk = (x - drag.current.startX) * 1.5;
    if (filterRowRef.current) filterRowRef.current.scrollLeft = drag.current.scrollLeft - walk;
  };

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
    <div className="bg-[#f5f5f4]">

      {/* ════════════ HERO — Search-first, full-bleed ════════════ */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: 520 }}>

        {/* Background image mosaic: 3 images side by side, slightly zoomed */}
        <div className="absolute inset-0 flex">
          {collage.slice(0, 3).map((img, i) => (
            <div key={i} className="flex-1 relative overflow-hidden">
              <img
                src={img.src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover scale-105"
                style={{ filter: i === 1 ? "brightness(0.9)" : "brightness(0.85)" }}
              />
            </div>
          ))}
          {collage.length === 0 && (
            <div className="flex-1" style={{ background: `linear-gradient(135deg, ${bd.orbB}, ${bd.orbA})` }} />
          )}
        </div>

        {/* Unified dark overlay so everything reads clearly */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.72) 100%)" }} />

        {/* Thin seam lines between images — gives structure */}
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="flex-1" />
          <div className="w-px bg-white/10" />
          <div className="flex-1" />
          {collage.length >= 3 && <><div className="w-px bg-white/10" /><div className="flex-1" /></>}
        </div>

        {/* ── Centered content ── */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">

          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-5"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase text-white/90"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: bd.orbC }} />
                {badge.text}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-black text-white leading-[0.88] tracking-[-0.03em] text-[2.8rem] sm:text-[3.6rem] xl:text-[4.2rem] drop-shadow-lg"
          >
            {titleLines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-3 text-white/70 text-sm max-w-sm leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.28, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 w-full max-w-xl"
          >
            <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-2xl">
              <Search size={17} className="text-gray-400 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="flex-1 text-[0.95rem] text-gray-800 placeholder:text-gray-400 focus:outline-none bg-transparent min-w-0"
              />
              {search ? (
                <button
                  onClick={() => setSearch("")}
                  className="text-gray-400 text-xs hover:text-gray-600 shrink-0 transition-colors"
                >
                  Xóa
                </button>
              ) : (
                <div
                  className="shrink-0 px-4 py-1.5 rounded-xl text-white text-xs font-semibold"
                  style={{ background: `linear-gradient(135deg, ${bd.orbA}, ${bd.orbB})` }}
                >
                  Tìm
                </div>
              )}
            </div>

            {/* Filter pills inside hero — horizontal scroll on mobile */}
            {categories && activeCat !== undefined && setActiveCat && categories.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.35 }}
                ref={filterRowRef}
                className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 select-none cursor-grab"
                style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
              >
                <div className="shrink-0 w-4" aria-hidden="true" />
                {categories.map((c) => {
                  const active = activeCat === c.key;
                  return (
                    <button
                      key={c.key}
                      onClick={() => setActiveCat(c.key)}
                      className="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
                      style={
                        active
                          ? { background: "#fff", color: bd.orbA, boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }
                          : { background: "rgba(255,255,255,0.18)", color: "#fff", border: "1px solid rgba(255,255,255,0.28)", backdropFilter: "blur(6px)" }
                      }
                    >
                      {c.label}
                    </button>
                  );
                })}
                <div className="shrink-0 w-4" aria-hidden="true" />
              </motion.div>
            )}
          </motion.div>

          {/* Stats row — bottom of hero */}
          {stats && stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-6 flex items-center gap-6 divide-x divide-white/20"
            >
              {stats.map(({ label, value }) => (
                <div key={label} className="pl-6 first:pl-0 text-center">
                  <div className="text-white font-black text-lg leading-none">{value}</div>
                  <div className="text-white/55 text-[9px] uppercase tracking-widest mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Sort + result count bar ── */}
      {(sortOptions || resultCount) && (
        <div className="px-4 sm:px-6 py-3 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {resultCount && <span className="text-xs text-gray-400">{resultCount}</span>}
            {sortOptions && setSort && (
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="ml-auto bg-white text-gray-600 text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 cursor-pointer focus:outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value} className="bg-white text-gray-800">{o.label}</option>
                ))}
              </select>
            )}
          </div>
        </div>
      )}

      {/* ── Children ── */}
      <section className="relative px-4 sm:px-6 py-6 pb-20">
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
