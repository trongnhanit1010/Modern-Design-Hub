import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  Home, Hotel, MapPin, UtensilsCrossed, Bus, CalendarDays,
  ShoppingBag, Map, Bot, ChevronRight, Soup, PartyPopper
} from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";

const navItems = [
  { icon: Home, label: "Trang chủ", href: "/" },
  { icon: Hotel, label: "Hotels", href: "/luu-tru-khach-san" },
  { icon: MapPin, label: "Địa điểm tham quan", href: "/destinations" },
  { icon: UtensilsCrossed, label: "Restaurants", href: "/restaurants" },
  { icon: Soup, label: "Món ngon địa phương", href: "/mon-ngon" },
  { icon: Bus, label: "Giao thông / Di chuyển", href: "/transport" },
  { icon: CalendarDays, label: "Sự kiện - Lễ hội", href: "/events" },
  { icon: ShoppingBag, label: "Mua sắm", href: "/shopping" },
  { icon: PartyPopper, label: "Vui chơi giải trí", href: "/vui-choi-giai-tri" },
  { icon: Map, label: "Bản đồ", href: "/ban-do" },
  { icon: Bot, label: "AI Trợ lý", href: "/ai" },
];

export default function Sidebar() {
  const { isExpanded, toggle } = useSidebar();
  const [location] = useLocation();

  return (
    <motion.aside
      animate={{ width: isExpanded ? 224 : 60 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex fixed left-0 top-14 bottom-0 z-40 bg-background border-r border-border flex-col overflow-hidden"
      data-testid="sidebar"
    >
      <nav className="flex-1 py-4 overflow-hidden">
        {navItems.map((item, i) => {
          const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));

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
                    layoutId="sidebar-active"
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-r"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <div className={`shrink-0 w-[33px] flex items-center justify-center ${isActive ? "text-primary" : ""}`}>
                  <item.icon size={18} />
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
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight size={16} />
        </motion.div>
      </button>
    </motion.aside>
  );
}
