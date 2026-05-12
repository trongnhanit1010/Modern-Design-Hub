import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ChevronRight, X } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { categoryThemes, navOrder } from "@/lib/categoryThemes";

const navItems = navOrder.map((k) => categoryThemes[k]);

export default function Sidebar() {
  const { isExpanded, toggle } = useSidebar();
  const [location] = useLocation();

  // Close mobile overlay on route change
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && isExpanded) toggle();
  }, [location]);

  // Lock body scroll when mobile overlay is open
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isExpanded]);

  const NavList = ({ onItemClick }: { onItemClick?: () => void }) => (
    <nav className="flex-1 py-4 overflow-y-auto">
      {navItems.map((item, i) => {
        const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link key={item.label} href={item.href}>
            <motion.div
              initial={false}
              whileHover={{ backgroundColor: "hsl(var(--muted))" }}
              animate={{ backgroundColor: isActive ? "hsl(var(--muted))" : "transparent" }}
              onClick={onItemClick}
              className={`flex items-center gap-3 px-3.5 py-2.5 cursor-pointer transition-colors group relative ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z-]/g, "")}`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-r"
                  style={{ background: item.hex }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <div
                className={`shrink-0 w-[33px] h-[33px] flex items-center justify-center rounded-lg transition-all ${item.iconColor}`}
                style={isActive ? { background: `${item.hex}1a`, boxShadow: `0 0 0 1px ${item.hex}33 inset` } : undefined}
              >
                <Icon size={18} strokeWidth={isActive ? 2.4 : 2} />
              </div>
              <span className={`text-sm font-medium whitespace-nowrap ${isActive ? "text-foreground font-semibold" : ""}`}>
                {item.label}
              </span>
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <motion.aside
        animate={{ width: isExpanded ? 224 : 60 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex fixed left-0 top-14 bottom-0 z-40 bg-background border-r border-border flex-col overflow-hidden"
        data-testid="sidebar"
      >
        <nav className="flex-1 py-4 overflow-y-auto scrollbar-hide">
          {navItems.map((item, i) => {
            const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href}>
                <motion.div
                  initial={false}
                  whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                  animate={{ backgroundColor: isActive ? "hsl(var(--muted))" : "transparent" }}
                  className={`flex items-center gap-3 px-3.5 py-2.5 cursor-pointer transition-colors group relative ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z-]/g, "")}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-desktop"
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-r"
                      style={{ background: item.hex }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <div
                    className={`shrink-0 w-[33px] h-[33px] flex items-center justify-center rounded-lg transition-all ${item.iconColor}`}
                    style={isActive ? { background: `${item.hex}1a`, boxShadow: `0 0 0 1px ${item.hex}33 inset` } : undefined}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.4 : 2} />
                  </div>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ delay: i * 0.03, duration: 0.18 }}
                        className={`text-sm font-medium whitespace-nowrap ${isActive ? "text-foreground font-semibold" : ""}`}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {!isExpanded && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-card border border-border text-foreground text-xs rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                      {item.label}
                    </div>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={toggle}
          className="m-3 flex items-center justify-center p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors border border-border"
          data-testid="button-sidebar-expand"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronRight size={16} />
          </motion.div>
        </button>
      </motion.aside>

      {/* ── MOBILE OVERLAY ── */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={toggle}
            />

            {/* Drawer */}
            <motion.div
              key="mobile-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 38 }}
              className="md:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-background border-r border-border flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0">
                <a href="/" className="flex items-center gap-1.5" onClick={toggle}>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                  <span className="text-foreground font-bold text-lg tracking-tight">
                    im<span className="text-blue-500">danang</span>
                  </span>
                </a>
                <button
                  onClick={toggle}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav list — full labels always shown */}
              <NavList onItemClick={toggle} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
