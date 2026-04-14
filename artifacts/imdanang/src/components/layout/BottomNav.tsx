import { Link, useLocation } from "wouter";
import { Home, Hotel, UtensilsCrossed, Map, Bot } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: Home,            label: "Trang chủ", href: "/" },
  { icon: Hotel,           label: "Khách sạn", href: "/luu-tru-khach-san" },
  { icon: UtensilsCrossed, label: "Ẩm thực",   href: "/restaurants" },
  { icon: Map,             label: "Bản đồ",     href: "/ban-do" },
  { icon: Bot,             label: "AI",          href: "/ai" },
];

export default function BottomNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="bg-background/95 backdrop-blur-xl border-t border-border flex items-center justify-around h-16 px-1">
        {items.map(({ icon: Icon, label, href }) => {
          const isActive =
            location === href ||
            (href !== "/" && location.startsWith(href));

          return (
            <Link key={href} href={href}>
              <div className="relative flex flex-col items-center gap-1 py-2 px-3 cursor-pointer">
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-bg"
                    className="absolute inset-0 bg-primary/10 rounded-2xl"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <Icon
                  size={21}
                  strokeWidth={isActive ? 2.5 : 1.75}
                  className={`relative transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}
                />
                <span className={`relative text-[10px] font-medium leading-none transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
