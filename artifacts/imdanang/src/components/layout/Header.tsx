import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Bell, User, Menu, Moon, Sun, ChevronDown, Check,
  X, Hotel, MapPin, Utensils, ShoppingBag, Ticket, ArrowRight, Clock,
} from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { useDarkMode } from "@/context/DarkModeContext";
import { useLocation } from "wouter";

const LANGUAGES = [
  { code: "VI", label: "Tiếng Việt", flagSrc: "https://flagcdn.com/w40/vn.png" },
  { code: "EN", label: "English", flagSrc: "https://flagcdn.com/w40/us.png" },
];

const SEARCH_DATA = [
  { type: "hotel",       icon: Hotel,      label: "Crowne Plaza Danang",          sub: "Mỹ Khê Beach · 5 sao",         href: "/luu-tru-khach-san/crowne-plaza-danang" },
  { type: "hotel",       icon: Hotel,      label: "Furama Resort Danang",         sub: "Non Nước · 5 sao",              href: "/luu-tru-khach-san/furama-resort-danang" },
  { type: "hotel",       icon: Hotel,      label: "La Siesta Hội An Resort",      sub: "Hội An · 5 sao",                href: "/luu-tru-khach-san/la-siesta-resort-hoi-an" },
  { type: "destination", icon: MapPin,     label: "Bãi biển Mỹ Khê",             sub: "Điểm đến · Top 6 thế giới",    href: "/destinations/bai-bien-my-khe" },
  { type: "destination", icon: MapPin,     label: "Cầu Vàng Bà Nà Hills",        sub: "Điểm đến · Bà Nà Hills",       href: "/destinations/cau-vang-ba-na-hills" },
  { type: "destination", icon: MapPin,     label: "Phố Cổ Hội An",               sub: "Điểm đến · UNESCO",             href: "/destinations/pho-co-hoi-an" },
  { type: "destination", icon: MapPin,     label: "Bán Đảo Sơn Trà",             sub: "Điểm đến · Thiên nhiên",        href: "/destinations/ban-dao-son-tra" },
  { type: "restaurant",  icon: Utensils,   label: "Nhà Hàng Bé Mận",             sub: "Hải sản · Đường Phạm Văn Đồng", href: "/restaurants" },
  { type: "food",        icon: Utensils,   label: "Mì Quảng Bà Mua",             sub: "Món ngon · 35.000đ/người",      href: "/mon-ngon" },
  { type: "food",        icon: Utensils,   label: "Bánh Mì Bà Lan",              sub: "Món ngon · Trần Phú",           href: "/mon-ngon" },
  { type: "shopping",    icon: ShoppingBag,label: "Chợ Hàn",                      sub: "Mua sắm · Iconic",              href: "/shopping" },
  { type: "shopping",    icon: ShoppingBag,label: "Vincom Đà Nẵng",               sub: "Mua sắm · Ngô Quyền",          href: "/shopping" },
  { type: "event",       icon: Ticket,     label: "Lễ hội pháo hoa Đà Nẵng",     sub: "Sự kiện · Hàng năm",           href: "/events" },
  { type: "event",       icon: Ticket,     label: "Festival Biển Đà Nẵng",        sub: "Sự kiện · Tháng 6",            href: "/events" },
];

const POPULAR = ["Bãi biển Mỹ Khê", "Cầu Vàng", "Mì Quảng", "Khách sạn 5 sao", "Phố Cổ Hội An"];

const TYPE_LABELS: Record<string, string> = {
  hotel: "Khách sạn", destination: "Địa điểm", restaurant: "Nhà hàng",
  food: "Món ngon", shopping: "Mua sắm", event: "Sự kiện",
};

function SearchModal({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return SEARCH_DATA.filter(
      (d) => d.label.toLowerCase().includes(s) || d.sub.toLowerCase().includes(s)
    );
  }, [q]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof SEARCH_DATA> = {};
    results.forEach((r) => {
      if (!map[r.type]) map[r.type] = [];
      map[r.type].push(r);
    });
    return map;
  }, [results]);

  const goTo = (href: string) => { navigate(href); onClose(); };

  return (
    <motion.div
      key="search-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[100] flex flex-col"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal panel */}
      <motion.div
        initial={{ opacity: 0, y: -24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.97 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto mt-20 w-full max-w-2xl px-4"
      >
        <div className="bg-background rounded-3xl shadow-2xl overflow-hidden border border-border">

          {/* Search input row */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <Search size={18} className="text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm khách sạn, địa điểm, món ăn..."
              className="flex-1 bg-transparent text-foreground text-base placeholder:text-muted-foreground focus:outline-none"
            />
            {q && (
              <button onClick={() => setQ("")} className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <X size={15} />
              </button>
            )}
            <button
              onClick={onClose}
              className="ml-1 px-3 py-1.5 rounded-xl text-xs text-muted-foreground bg-muted hover:bg-muted/80 transition-colors font-medium"
            >
              Esc
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[60vh] overflow-y-auto">
            {!q.trim() ? (
              /* Popular searches */
              <div className="px-5 py-4">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Clock size={11} /> Tìm kiếm phổ biến
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR.map((p) => (
                    <button
                      key={p}
                      onClick={() => setQ(p)}
                      className="px-3 py-1.5 rounded-full text-sm border border-border bg-muted/50 hover:bg-muted text-foreground transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {/* Quick nav links */}
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mt-5 mb-3">Khám phá nhanh</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Khách sạn", href: "/luu-tru-khach-san", icon: Hotel, color: "#2563eb" },
                    { label: "Địa điểm", href: "/destinations", icon: MapPin, color: "#0891b2" },
                    { label: "Ẩm thực", href: "/restaurants", icon: Utensils, color: "#d97706" },
                    { label: "Mua sắm", href: "/shopping", icon: ShoppingBag, color: "#7c3aed" },
                  ].map((item) => (
                    <button
                      key={item.href}
                      onClick={() => goTo(item.href)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-2xl border border-border hover:bg-muted transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.color}18` }}>
                        <item.icon size={15} style={{ color: item.color }} />
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <ArrowRight size={13} className="ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <Search size={32} className="mx-auto text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground text-sm">Không tìm thấy kết quả cho <strong className="text-foreground">"{q}"</strong></p>
              </div>
            ) : (
              <div className="py-2">
                {Object.entries(grouped).map(([type, items]) => (
                  <div key={type}>
                    <p className="px-5 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      {TYPE_LABELS[type] ?? type}
                    </p>
                    {items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => goTo(item.href)}
                        className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-muted transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center shrink-0">
                          <item.icon size={15} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.label}</p>
                          <p className="text-xs text-muted-foreground truncate">{item.sub}</p>
                        </div>
                        <ArrowRight size={13} className="text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="px-5 py-2.5 border-t border-border flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">
              {results.length > 0 ? `${results.length} kết quả` : "Nhấn Enter để tìm kiếm"}
            </span>
            <span className="text-[11px] text-muted-foreground">Esc để đóng</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen]     = useState(false);
  const [activeLang, setActiveLang] = useState(LANGUAGES[0]);
  const langRef = useRef<HTMLDivElement>(null);
  const { toggle } = useSidebar();
  const { isDark, toggle: toggleDark } = useDarkMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Cmd+K / Ctrl+K shortcut */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl shadow-sm border-border"
            : "bg-background border-border"
        }`}
        data-testid="header"
      >
        {/*
          Mobile: [Menu] [flex-1 logo-center] [search] [dark] [lang]
          Desktop: [Menu] [logo] [flex-1] [search-icon] [dark] [bell] [user] [lang]
        */}
        <div className="flex items-center h-14 px-4 gap-2">

          {/* Hamburger — always visible */}
          <button
            onClick={toggle}
            className="flex p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
            data-testid="button-sidebar-toggle"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          {/* Logo — mobile: flex-1 centered | desktop: static */}
          <div className="flex-1 md:flex-none flex justify-center md:justify-start">
            <a
              href="/"
              className="flex items-center gap-1.5"
              data-testid="link-logo"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <span className="text-foreground font-bold text-lg tracking-tight">
                im<span className="text-blue-500">danang</span>
              </span>
            </a>
          </div>

          {/* Desktop spacer */}
          <div className="hidden md:flex flex-1" />

          {/* Right side */}
          <div className="flex items-center gap-1 shrink-0">

            {/* Search icon — always just an icon now */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Search"
              data-testid="button-search-open"
            >
              <Search size={18} />
            </button>

            {/* Dark mode */}
            <button
              onClick={toggleDark}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              data-testid="button-darkmode"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun size={17} />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon size={17} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Bell + User — desktop only */}
            <button
              className="relative hidden md:flex p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              data-testid="button-notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full" />
            </button>
            <button
              className="hidden md:flex p-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              data-testid="button-user"
            >
              <User size={16} className="text-foreground" />
            </button>

            {/* Language switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-border bg-muted/50 hover:bg-muted text-sm font-medium text-foreground transition-all"
                data-testid="button-language"
                aria-label="Switch language"
              >
                <img src={activeLang.flagSrc} alt={activeLang.code} className="w-5 h-3.5 rounded-sm object-cover shadow-sm" />
                <span className="text-xs font-semibold tracking-wide">{activeLang.code}</span>
                <ChevronDown size={12} className={`text-muted-foreground transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-44 rounded-2xl border border-border bg-popover shadow-xl overflow-hidden z-50"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setActiveLang(lang); setLangOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted ${
                          activeLang.code === lang.code ? "bg-primary/5 text-primary font-semibold" : "text-foreground"
                        }`}
                      >
                        <img src={lang.flagSrc} alt={lang.code} className="w-6 h-4 rounded-sm object-cover shadow-sm shrink-0" />
                        <span className="flex-1 text-left">{lang.label}</span>
                        {activeLang.code === lang.code && <Check size={14} className="text-primary shrink-0" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search modal */}
      <AnimatePresence>
        {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
