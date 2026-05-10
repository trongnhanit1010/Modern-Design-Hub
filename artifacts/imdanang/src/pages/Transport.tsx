import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bus, Car, Bike, Plane, Ship, Navigation, Clock, DollarSign, PhoneCall,
  ChevronRight, Zap, MapPin, ArrowRight, Route, ChevronDown, ExternalLink,
} from "lucide-react";
import { CategoryShell, useThemeAccents } from "@/components/category/CategoryShell";
import { busRoutes } from "@/data/busRoutes";

interface Mode {
  key: string;
  icon: typeof Bus;
  label: string;
  desc: string;
  detail: string;
}

const transportModes: Mode[] = [
  { key: "all",   icon: Navigation, label: "Tất cả",        desc: "",                                       detail: "" },
  { key: "plane", icon: Plane,      label: "Sân bay",       desc: "Sân bay Đà Nẵng – Quốc tế",              detail: "Trung tâm thành phố: 15 phút · Grab: 80–120K · Taxi: 100–150K" },
  { key: "bus",   icon: Bus,        label: "Xe buýt",       desc: "Mạng lưới 10 tuyến nội thành",           detail: "Giá vé: 5.000₫/lượt · Hoạt động 05:30–21:00 · Thẻ tháng 120K" },
  { key: "taxi",  icon: Car,        label: "Taxi / Grab",   desc: "Grab, Be, Mai Linh, Tiên Sa",            detail: "Khoảng 15K/km nội thành · Grab Car/Bike sẵn có 24/7" },
  { key: "bike",  icon: Bike,       label: "Xe máy / Đạp",  desc: "Thuê xe tự lái khắp thành phố",          detail: "Xe máy: 100–200K/ngày · Xe đạp: 50–80K/ngày · Cọc CCCD" },
  { key: "ship",  icon: Ship,       label: "Tàu thuyền",    desc: "Phà ra đảo Cù Lao Chàm",                 detail: "Cảng Mân Quang → Cù Lao Chàm · 2h · 230K/người" },
  { key: "ev",    icon: Navigation, label: "Xe điện",       desc: "Xe điện tham quan nội thành",            detail: "Tour 1h30 · Các điểm trên đường ven biển · 80K/người" },
];

const routes = [
  { from: "Sân bay Đà Nẵng", to: "Bãi biển Mỹ Khê", time: "20 phút", cost: "80–120K",  via: "Grab/Taxi"     },
  { from: "Trung tâm TP",    to: "Bà Nà Hills",     time: "45 phút", cost: "120–200K", via: "Taxi/Thuê xe"  },
  { from: "Trung tâm TP",    to: "Phố Cổ Hội An",   time: "35 phút", cost: "250–350K", via: "Taxi/Shuttle"  },
  { from: "Trung tâm TP",    to: "Đèo Hải Vân",     time: "30 phút", cost: "150–200K", via: "Taxi/Xe máy"   },
];

const tips = [
  { icon: Zap,        tip: "Dùng Grab đặt trước để không bị chặt chém giá" },
  { icon: PhoneCall,  tip: "Lưu số taxi uy tín: Mai Linh 0236 3525 252" },
  { icon: Clock,      tip: "Giờ cao điểm 07:00–08:30 & 17:00–18:30, hạn chế di chuyển" },
  { icon: DollarSign, tip: "Xe buýt số 6 nối sân bay với trung tâm giá chỉ 5K" },
];

const collage = [
  { src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&auto=format&fit=crop", className: "top-0 right-0 w-[58%] h-[58%]" },
  { src: "https://images.unsplash.com/photo-1502920514313-52581002a659?w=900&auto=format&fit=crop", className: "top-[18%] left-0 w-[48%] h-[52%]" },
  { src: "https://images.unsplash.com/photo-1597211833712-5e41faa202ea?w=900&auto=format&fit=crop", className: "bottom-0 right-[10%] w-[52%] h-[42%]" },
];

const TYPE_COLORS: Record<string, { badge: string; dot: string }> = {
  subsidized:      { badge: "bg-emerald-600 text-white", dot: "bg-emerald-500" },
  tourist:         { badge: "bg-sky-500 text-white",     dot: "bg-sky-400" },
  unsubsidized:    { badge: "bg-violet-600 text-white",  dot: "bg-violet-500" },
  interprovincial: { badge: "bg-orange-500 text-white",  dot: "bg-orange-400" },
};

function BusCard({ route, acc }: { route: typeof busRoutes[0]; acc: { orbA: string; orbB: string } }) {
  const [open, setOpen] = useState(false);
  const colors = TYPE_COLORS[route.type] ?? { badge: "bg-gray-400 text-white", dot: "bg-gray-400" };
  const hasDetail = !route.pending && !!route.keyStops?.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden ${route.pending ? "opacity-55" : ""}`}
    >
      <button
        onClick={() => hasDetail && setOpen(!open)}
        className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${hasDetail ? "hover:bg-gray-50 cursor-pointer" : "cursor-default"}`}
      >
        <span className={`shrink-0 text-xs font-bold w-14 text-center py-1.5 rounded-xl ${colors.badge}`}>{route.no}</span>
        <div className="flex-1 min-w-0">
          <p className="text-gray-900 text-sm font-semibold leading-tight truncate">{route.name}</p>
          <p className="text-gray-400 text-xs mt-0.5">
            {route.hours !== "–" ? route.hours : "Chờ vận hành"}
            {route.price !== "–" ? " · " + route.price : ""}
          </p>
        </div>
        {route.touristFriendly && !route.pending && (
          <span className="shrink-0 text-xs px-1.5 py-0.5 rounded-md font-medium" style={{ color: acc.orbA, background: `${acc.orbA}12`, border: `1px solid ${acc.orbA}25` }}>
            Du lịch
          </span>
        )}
        {route.pending && <span className="shrink-0 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md">Sắp mở</span>}
        {hasDetail && (
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={14} className="text-gray-300 shrink-0" />
          </motion.div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && hasDetail && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50/60">
              <p className="text-xs text-gray-400 font-medium mt-3 mb-2">Các điểm dừng chính:</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {route.keyStops!.map((stop, i) => (
                  <span key={i} className="flex items-center gap-1 text-xs bg-white border border-gray-100 rounded-full px-2.5 py-0.5 text-gray-500">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${i === 0 ? "bg-emerald-500" : i === route.keyStops!.length - 1 ? "bg-rose-400" : colors.dot}`} />
                    {stop}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                {route.distance   && <span className="flex items-center gap-1"><Route size={11} />{route.distance}</span>}
                {route.frequency !== "–" && <span className="flex items-center gap-1"><Clock size={11} />{route.frequency}</span>}
                {route.operator   && <span className="flex items-center gap-1"><Bus size={11} />{route.operator}</span>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function BusNetworkSection({ acc }: { acc: { orbA: string; orbB: string } }) {
  const [expanded, setExpanded] = useState(false);

  const touristRoutes = busRoutes.filter((r) => !r.pending && (r.type === "tourist" || (r.type === "unsubsidized" && r.touristFriendly)));
  const subsidizedRoutes = busRoutes.filter((r) => !r.pending && r.type === "subsidized");
  const interprovincialRoutes = busRoutes.filter((r) => !r.pending && r.type === "interprovincial");
  const otherRoutes = busRoutes.filter((r) => !r.pending && r.type === "unsubsidized" && !r.touristFriendly);
  const pendingRoutes = busRoutes.filter((r) => r.pending);

  return (
    <section className="pt-12 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900 font-bold text-lg flex items-center gap-2">
          <Bus size={18} style={{ color: acc.orbA }} /> Mạng lưới xe buýt Đà Nẵng
        </h2>
        <a
          href="https://www.danangbus.vn/lo-trinh-tuyen.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          danangbus.vn <ExternalLink size={11} />
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "18+ tuyến", sub: "toàn mạng lưới", dot: "bg-emerald-500" },
          { label: "05:30–19:00", sub: "giờ hoạt động", dot: "bg-sky-500" },
          { label: "Từ 8.000đ", sub: "giá vé/lượt", dot: "bg-orange-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-3.5 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className={`w-2 h-2 rounded-full ${s.dot}`} />
              <span className="text-sm font-bold text-gray-900">{s.label}</span>
            </div>
            <p className="text-xs text-gray-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tourist routes – always shown */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-400" /> Tuyến du lịch nổi bật
        </p>
        <div className="space-y-2">
          {[...touristRoutes, ...interprovincialRoutes].map((r) => <BusCard key={r.no} route={r} acc={acc} />)}
        </div>
      </div>

      {/* Subsidized routes – always shown */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Tuyến có trợ giá · 8.000đ/lượt
        </p>
        <div className="space-y-2">
          {subsidizedRoutes.map((r) => <BusCard key={r.no} route={r} acc={acc} />)}
        </div>
      </div>

      {/* Toggle for other routes */}
      <motion.button
        onClick={() => setExpanded(!expanded)}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-gray-100 bg-white text-sm text-gray-500 hover:text-gray-700 hover:border-gray-200 transition-all shadow-sm"
      >
        {expanded ? "Thu gọn" : `Xem thêm ${otherRoutes.length + pendingRoutes.length} tuyến khác`}
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={15} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden space-y-4"
          >
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-500" /> Tuyến không trợ giá
              </p>
              <div className="space-y-2">
                {otherRoutes.map((r) => <BusCard key={r.no} route={r} acc={acc} />)}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-400" /> Đang làm thủ tục vận hành
              </p>
              <div className="space-y-2">
                {pendingRoutes.map((r) => <BusCard key={r.no} route={r} acc={acc} />)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function Transport() {
  const [search, setSearch]       = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const acc = useThemeAccents("transport");

  const categoryFilters = transportModes.map((m) => ({ key: m.key, label: m.label }));
  const visibleModes = activeCat === "all" ? transportModes.filter((m) => m.key !== "all") : transportModes.filter((m) => m.key === activeCat);
  const filteredModes = search
    ? visibleModes.filter((m) =>
        m.label.toLowerCase().includes(search.toLowerCase()) ||
        m.desc.toLowerCase().includes(search.toLowerCase()) ||
        m.detail.toLowerCase().includes(search.toLowerCase())
      )
    : visibleModes;

  return (
    <CategoryShell
      themeKey="transport"
      heroVariant="magazine"
      badge={{ icon: Navigation, text: "Chỉ dẫn di chuyển · Live" }}
      titleLines={["Di chuyển", "dễ dàng."]}
      gradientLineIndex={1}
      subtitle="Sân bay, taxi, Grab, xe buýt, xe máy — giá & tuyến đường phổ biến nhất."
      stats={[
        { icon: Bus,   label: "Phương tiện", value: "6"    },
        { icon: Route, label: "Tuyến gợi ý", value: "12+"  },
        { icon: Clock, label: "Cập nhật",    value: "Live" },
      ]}
      collage={collage}
      floatingBadge={{ icon: Plane, title: "Sân bay quốc tế", subtitle: "★ TRUNG TÂM" }}
      search={search}
      setSearch={setSearch}
      searchPlaceholder="Tìm phương tiện, tuyến đường..."
      categories={categoryFilters}
      activeCat={activeCat}
      setActiveCat={setActiveCat}
    >
      {/* ── Phương tiện ── */}
      <section className="pt-4 space-y-4">
        <h2 className="text-gray-900 font-bold text-lg flex items-center gap-2">
          <Bus size={18} style={{ color: acc.orbA }} /> Phương tiện di chuyển
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModes.map((m, i) => (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-gray-100 bg-white shadow-sm p-5 hover:shadow-md hover:border-gray-200 transition-all"
              data-testid={`card-transport-${m.key}`}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-3 border"
                style={{
                  background: `${acc.orbA}10`,
                  borderColor: `${acc.orbA}30`,
                }}
              >
                <m.icon size={20} style={{ color: acc.orbA }} />
              </div>
              <h3 className="text-gray-900 font-bold text-base mb-1">{m.label}</h3>
              <p className="text-gray-500 text-sm mb-2">{m.desc}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{m.detail}</p>
            </motion.div>
          ))}
          {filteredModes.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-3 py-12 text-center text-gray-400">
              Không tìm thấy phương tiện phù hợp
            </div>
          )}
        </div>
      </section>

      {/* ── Mạng lưới xe buýt ── */}
      <BusNetworkSection acc={acc} />

      {/* ── Tuyến đường ── */}
      <section className="pt-12 space-y-4">
        <h2 className="text-gray-900 font-bold text-lg flex items-center gap-2">
          <Route size={18} style={{ color: acc.orbA }} /> Tuyến đường phổ biến
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {routes.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-all"
              style={{ borderLeftWidth: 3, borderLeftColor: acc.orbA }}
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1">
                    <div className="text-gray-400 text-xs mb-0.5">Điểm đi</div>
                    <div className="text-gray-900 font-semibold text-sm flex items-center gap-1.5">
                      <MapPin size={11} className="text-emerald-500" />{r.from}
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gray-300 shrink-0" />
                  <div className="flex-1 text-right">
                    <div className="text-gray-400 text-xs mb-0.5">Điểm đến</div>
                    <div className="text-gray-900 font-semibold text-sm flex items-center gap-1.5 justify-end">
                      <MapPin size={11} className="text-rose-400" />{r.to}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock size={12} className="text-gray-300" />{r.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <DollarSign size={12} className="text-gray-300" />{r.cost}
                  </div>
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                    style={{ background: `${acc.orbA}12`, color: acc.orbA, border: `1px solid ${acc.orbA}30` }}
                  >
                    {r.via}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Mẹo ── */}
      <section className="pt-12 space-y-4 pb-4">
        <h2 className="text-gray-900 font-bold text-lg flex items-center gap-2">
          <Zap size={18} style={{ color: acc.orbA }} /> Mẹo di chuyển thông minh
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {tips.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white shadow-sm p-4 hover:shadow-md transition-all"
            >
              <div
                className="shrink-0 mt-0.5 p-2 rounded-xl border"
                style={{ background: `${acc.orbA}10`, borderColor: `${acc.orbA}30` }}
              >
                <t.icon size={16} style={{ color: acc.orbA }} />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{t.tip}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="pt-2 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-2xl text-sm shadow-md"
          style={{
            background: `linear-gradient(135deg, ${acc.orbA}, ${acc.orbB})`,
            boxShadow: `0 10px 24px ${acc.orbA}44`,
          }}
        >
          Mở bản đồ Đà Nẵng <ChevronRight size={14} />
        </motion.button>
      </div>
    </CategoryShell>
  );
}
