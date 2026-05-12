import type { LucideIcon } from "lucide-react";
import {
  Home,
  Hotel,
  MapPin,
  UtensilsCrossed,
  Soup,
  Bus,
  CalendarDays,
  ShoppingBag,
  PartyPopper,
  Bike,
  Map,
  Bot,
  BookOpen,
} from "lucide-react";

export type CategoryKey =
  | "home"
  | "hotels"
  | "destinations"
  | "restaurants"
  | "localfood"
  | "transport"
  | "events"
  | "shopping"
  | "entertainment"
  | "cyclo"
  | "map"
  | "ai"
  | "tourist-info";

export type CategoryTheme = {
  key: CategoryKey;
  label: string;
  href: string;
  icon: LucideIcon;
  /** Tailwind text color for the icon (e.g. text-amber-500) */
  iconColor: string;
  /** Tailwind bg color for the active highlight track */
  activeBg: string;
  /** Hex used in inline styles (gradients, glows) */
  hex: string;
  /** Tailwind gradient pair `from-X to-Y` */
  gradient: string;
};

export const categoryThemes: Record<CategoryKey, CategoryTheme> = {
  home:          { key: "home",          label: "Trang chủ",            href: "/",                    icon: Home,            iconColor: "text-slate-700",   activeBg: "bg-slate-200",      hex: "#475569", gradient: "from-slate-500 to-slate-700" },
  hotels:        { key: "hotels",        label: "Hotels",               href: "/luu-tru-khach-san",   icon: Hotel,           iconColor: "text-amber-500",   activeBg: "bg-amber-50",       hex: "#f59e0b", gradient: "from-amber-500 to-orange-500" },
  destinations:  { key: "destinations",  label: "Địa điểm tham quan",   href: "/destinations",        icon: MapPin,          iconColor: "text-emerald-500", activeBg: "bg-emerald-50",     hex: "#10b981", gradient: "from-emerald-500 to-teal-500" },
  restaurants:   { key: "restaurants",   label: "Restaurants",          href: "/restaurants",         icon: UtensilsCrossed, iconColor: "text-orange-500",  activeBg: "bg-orange-50",      hex: "#f97316", gradient: "from-orange-500 to-red-500" },
  localfood:     { key: "localfood",     label: "Món ngon địa phương",  href: "/mon-ngon",            icon: Soup,            iconColor: "text-rose-500",    activeBg: "bg-rose-50",        hex: "#f43f5e", gradient: "from-rose-500 to-pink-500" },
  transport:     { key: "transport",     label: "Giao thông / Di chuyển", href: "/transport",         icon: Bus,             iconColor: "text-sky-500",     activeBg: "bg-sky-50",         hex: "#0ea5e9", gradient: "from-sky-500 to-blue-500" },
  events:        { key: "events",        label: "Sự kiện - Lễ hội",     href: "/events",              icon: CalendarDays,    iconColor: "text-violet-500",  activeBg: "bg-violet-50",      hex: "#8b5cf6", gradient: "from-violet-500 to-purple-500" },
  shopping:      { key: "shopping",      label: "Mua sắm",              href: "/shopping",            icon: ShoppingBag,     iconColor: "text-pink-500",    activeBg: "bg-pink-50",        hex: "#ec4899", gradient: "from-pink-500 to-rose-500" },
  entertainment: { key: "entertainment", label: "Vui chơi giải trí",    href: "/vui-choi-giai-tri",   icon: PartyPopper,     iconColor: "text-fuchsia-500", activeBg: "bg-fuchsia-50",     hex: "#d946ef", gradient: "from-fuchsia-500 to-pink-500" },
  cyclo:         { key: "cyclo",         label: "Xích lô du lịch",      href: "/xich-lo-du-lich",     icon: Bike,            iconColor: "text-blue-600",    activeBg: "bg-blue-50",        hex: "#2563eb", gradient: "from-blue-700 via-blue-600 to-blue-500" },
  map:           { key: "map",           label: "Bản đồ",               href: "/ban-do",              icon: Map,             iconColor: "text-cyan-600",    activeBg: "bg-cyan-50",        hex: "#0891b2", gradient: "from-cyan-500 to-teal-500" },
  ai:            { key: "ai",            label: "AI Trợ lý",            href: "/ai",                  icon: Bot,             iconColor: "text-indigo-500",  activeBg: "bg-indigo-50",      hex: "#6366f1", gradient: "from-indigo-500 to-blue-500" },
  "tourist-info": { key: "tourist-info", label: "Thông tin hữu ích",   href: "/thong-tin-du-khach",  icon: BookOpen,        iconColor: "text-teal-600",    activeBg: "bg-teal-50",        hex: "#0d9488", gradient: "from-teal-500 to-cyan-500" },
};

export const navOrder: CategoryKey[] = [
  "home",
  "hotels",
  "destinations",
  "restaurants",
  "localfood",
  "transport",
  "events",
  "shopping",
  "entertainment",
  "cyclo",
  "map",
  "ai",
  "tourist-info",
];
