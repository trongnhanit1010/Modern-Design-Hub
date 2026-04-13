import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Hotel, MapPin, UtensilsCrossed, Bus, CalendarDays,
  ShoppingBag, Map, Bot, ChevronRight
} from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";

const navItems = [
  { icon: Home, label: "Trang chủ", href: "#" },
  { icon: Hotel, label: "Hotels", href: "#hotels" },
  { icon: MapPin, label: "Địa điểm tham quan", href: "#destinations" },
  { icon: UtensilsCrossed, label: "Restaurants", href: "#deals" },
  { icon: Bus, label: "Giao thông / Di chuyển", href: "#" },
  { icon: CalendarDays, label: "Sự kiện - Lễ hội", href: "#events" },
  { icon: ShoppingBag, label: "Mua sắm", href: "#" },
  { icon: Map, label: "Bản đồ", href: "#map" },
  { icon: Bot, label: "AI Trợ lý", href: "#" },
];

export default function Sidebar() {
  const { isExpanded, toggle } = useSidebar();

  return (
    <motion.aside
      animate={{ width: isExpanded ? 224 : 60 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-14 bottom-0 z-40 bg-[hsl(220_40%_12%)] border-r border-white/8 flex flex-col overflow-hidden"
      data-testid="sidebar"
    >
      <nav className="flex-1 py-4 overflow-hidden">
        {navItems.map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href}
            initial={false}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            className="flex items-center gap-3 px-3.5 py-2.5 text-white/60 hover:text-white transition-colors group relative"
            data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z-]/g, "")}`}
          >
            <div className="shrink-0 w-[33px] flex items-center justify-center">
              <item.icon size={18} />
            </div>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ delay: i * 0.03, duration: 0.18 }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
            {!isExpanded && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                {item.label}
              </div>
            )}
          </motion.a>
        ))}
      </nav>

      <button
        onClick={toggle}
        className="m-3 flex items-center justify-center p-2 rounded-lg bg-white/8 text-white/50 hover:text-white hover:bg-white/15 transition-colors"
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
