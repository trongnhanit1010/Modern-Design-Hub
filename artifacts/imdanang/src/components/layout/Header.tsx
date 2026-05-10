import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, User, Menu, Moon, Sun, ChevronDown, Check } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { useDarkMode } from "@/context/DarkModeContext";

const LANGUAGES = [
  { code: "VI", label: "Tiếng Việt", flagSrc: "https://flagcdn.com/w40/vn.png" },
  { code: "EN", label: "English", flagSrc: "https://flagcdn.com/w40/us.png" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [langOpen, setLangOpen] = useState(false);
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
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
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
      <div className="relative flex items-center h-14 px-4 gap-3">

        {/* Hamburger — desktop only */}
        <button
          onClick={toggle}
          className="hidden md:flex p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
          data-testid="button-sidebar-toggle"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Logo — centered on mobile via absolute, normal flow on desktop */}
        <a
          href="/"
          className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center gap-1.5 shrink-0"
          data-testid="link-logo"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <span className="text-foreground font-bold text-lg tracking-tight">
            im<span className="text-blue-500">danang</span>
          </span>
        </a>

        {/* Search — desktop only */}
        <div className="hidden md:flex flex-1 max-w-xl mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="search"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Tìm kiếm..."
              className="w-full bg-muted border border-border rounded-full pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-background transition-all"
              data-testid="input-search-header"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-1 shrink-0">

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

          {/* Language switcher — always visible, far right */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-border bg-muted/50 hover:bg-muted text-sm font-medium text-foreground transition-all"
              data-testid="button-language"
              aria-label="Switch language"
            >
              <img
                src={activeLang.flagSrc}
                alt={activeLang.code}
                className="w-5 h-3.5 rounded-sm object-cover shadow-sm"
              />
              <span className="text-xs font-semibold tracking-wide">{activeLang.code}</span>
              <ChevronDown
                size={12}
                className={`text-muted-foreground transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
              />
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
                      onClick={() => {
                        setActiveLang(lang);
                        setLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted ${
                        activeLang.code === lang.code ? "bg-primary/5 text-primary font-semibold" : "text-foreground"
                      }`}
                    >
                      <img
                        src={lang.flagSrc}
                        alt={lang.code}
                        className="w-6 h-4 rounded-sm object-cover shadow-sm shrink-0"
                      />
                      <span className="flex-1 text-left">{lang.label}</span>
                      {activeLang.code === lang.code && (
                        <Check size={14} className="text-primary shrink-0" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
