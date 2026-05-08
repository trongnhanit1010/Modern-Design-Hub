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

export type CategoryFilter = { key: string; label: string; emoji?: string };
export type StatItem = { icon: LucideIcon; label: string; value: string };
export type CollageImage = { src: string; className: string };
export type FloatingBadge = { icon: LucideIcon; title: string; subtitle: string };

interface CategoryShellProps {
  themeKey: CategoryKey;
  badge?: { icon?: LucideIcon; text: string };
  titleLines: ReactNode[];
  gradientLineIndex?: number;
  subtitle?: string;
  stats?: StatItem[];
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
      backgroundImage: `linear-gradient(90deg, ${bd.orbA}, ${bd.orbC})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }),
    [bd]
  );

  const Badgeicon = badge?.icon ?? Sparkles;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle colored accent blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full blur-[200px] opacity-[0.07]"
          style={{ background: bd.orbA }}
        />
        <div
          className="absolute -top-20 -right-60 w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.05]"
          style={{ background: bd.orbB }}
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
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold mb-5"
                  style={{
                    borderColor: `${bd.orbA}40`,
                    background: `${bd.orbA}0e`,
                    color: bd.orbA,
                  }}
                >
                  <Badgeicon size={13} style={{ color: bd.orbA }} />
                  {badge.text}
                </div>
              )}

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.02] tracking-tight text-gray-900">
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
                <p className="text-gray-500 text-base md:text-lg mt-5 max-w-xl leading-relaxed">
                  {subtitle}
                </p>
              )}

              {stats && stats.length > 0 && (
                <div className="flex flex-wrap items-center gap-5 md:gap-8 mt-6">
                  {stats.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center border"
                        style={{
                          background: `${bd.orbA}12`,
                          borderColor: `${bd.orbA}30`,
                        }}
                      >
                        <Icon size={16} style={{ color: bd.orbA }} />
                      </div>
                      <div>
                        <div className="font-bold text-lg leading-none text-gray-900">{value}</div>
                        <div className="text-gray-400 text-xs mt-1">{label}</div>
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
                    className={`absolute ${p.className} rounded-3xl overflow-hidden border border-gray-100 shadow-lg`}
                  >
                    <img src={p.src} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </motion.div>
                ))}

                {floatingBadge && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute -bottom-2 right-2 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2 text-white"
                    style={{ background: `linear-gradient(135deg, ${bd.orbA}, ${bd.orbB})` }}
                  >
                    <floatingBadge.icon size={16} />
                    <div>
                      <div className="text-xs opacity-90 leading-none">{floatingBadge.subtitle}</div>
                      <div className="text-sm font-bold leading-none mt-1">{floatingBadge.title}</div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>

          {/* ── Search + filter bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="mt-8 rounded-3xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm"
          >
            <div className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-gray-50 border border-gray-200">
              <Search size={16} className="text-gray-400 shrink-0" />
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
                  className="bg-white text-gray-600 text-xs sm:text-sm border border-gray-200 rounded-lg px-2 py-1 cursor-pointer focus:outline-none hidden sm:block"
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
                  className="text-gray-400 text-xs hover:text-gray-700 shrink-0"
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
                              boxShadow: `0 4px 14px ${bd.orbA}44`,
                            }
                          : {
                              borderColor: "#e5e7eb",
                              color: "#6b7280",
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
              <div className="mt-2 sm:mt-3 px-1 text-xs text-gray-500">{resultCount}</div>
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
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${bd.orbA}50`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#f1f5f9";
      }}
    >
      {children}
    </div>
  );
}

export function useThemeAccents(themeKey: CategoryKey) {
  return themeBackdrops[themeKey];
}
