import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, User, Globe, Menu, Moon, Sun } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { useDarkMode } from "@/context/DarkModeContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const { toggle } = useSidebar();
  const { isDark, toggle: toggleDark } = useDarkMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
      <div className="flex items-center h-14 px-4 gap-4">
        <button
          onClick={toggle}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          data-testid="button-sidebar-toggle"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        <a href="/" className="flex items-center gap-2 shrink-0" data-testid="link-logo">
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <span className="text-foreground font-bold text-lg tracking-tight">
              im<span className="text-blue-500">danang</span>
            </span>
          </div>
        </a>

        <div className="flex-1 max-w-xl mx-auto">
          <div className="relative">
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

        <div className="flex items-center gap-1 shrink-0">
          <button
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted text-sm transition-colors"
            data-testid="button-language"
          >
            <Globe size={15} />
            <span className="hidden sm:inline">VI</span>
          </button>

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

          <button
            className="relative hidden sm:block p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            data-testid="button-notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full" />
          </button>
          <button
            className="hidden sm:block p-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            data-testid="button-user"
          >
            <User size={16} className="text-foreground" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
