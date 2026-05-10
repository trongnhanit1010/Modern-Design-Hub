import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bus, Car, Bike, Plane, Ship, Navigation, Clock, PhoneCall,
  ChevronRight, Zap, MapPin, ArrowRight, Route, ChevronDown,
  ExternalLink, Ticket, Info, CheckCircle2, AlertCircle,
} from "lucide-react";
import { CategoryShell, useThemeAccents } from "@/components/category/CategoryShell";
import { busRoutes, journeyGuides, ROUTE_TABS, ticketTypes, type BusRouteType } from "@/data/busRoutes";

/* ═══ Transport mode cards ═══════════════════════════════════════════════════ */

interface Mode { key: string; icon: typeof Bus; label: string; desc: string; detail: string; tips: string[] }

const transportModes: Mode[] = [
  {
    key: "plane", icon: Plane, label: "Sân bay", desc: "Sân bay Quốc tế Đà Nẵng (DAD)",
    detail: "Cách trung tâm ~3km · Grab: 50–80K · Taxi: 80–120K · Bus 01SB: 30K",
    tips: ["Terminal 1 (nội địa) & Terminal 2 (quốc tế)", "Grab Bike/Car sẵn tại bãi xe P4", "Bus 01SB đến Hội An chỉ 30K"],
  },
  {
    key: "bus", icon: Bus, label: "Xe buýt", desc: "16 tuyến · trợ giá từ 8.000đ",
    detail: "Tuyến du lịch: 01SB (sân bay→Hội An) · 03 (→Bà Nà) · LK01 (→Huế)",
    tips: ["Vé lượt mua trực tiếp trên xe", "Vé tháng 120K không giới hạn lượt", "Tần suất cao điểm 15 phút/chuyến"],
  },
  {
    key: "taxi", icon: Car, label: "Taxi / Grab", desc: "Grab, Be, Mai Linh, Tiên Sa",
    detail: "~15K/km nội thành · Grab Car/Bike sẵn 24/7 · Mai Linh: 0236 3525 252",
    tips: ["Dùng app tránh bị chặt chém giá", "GrabCar từ sân bay ra trung tâm: 50–80K", "Tiên Sa Taxi uy tín cho chuyến dài"],
  },
  {
    key: "bike", icon: Bike, label: "Xe máy / Đạp", desc: "Thuê xe tự lái khắp thành phố",
    detail: "Xe máy: 100–200K/ngày · Xe đạp: 50–80K/ngày · Cọc CCCD/Passport",
    tips: ["Nhiều cửa hàng quanh khu phố Tây An Thượng", "Điện thoại có GPS là đủ di chuyển", "Đường Phạm Văn Đồng không cho xe máy"],
  },
  {
    key: "ship", icon: Ship, label: "Tàu thuyền", desc: "Phà ra đảo Cù Lao Chàm",
    detail: "Cảng Mân Quang → Cù Lao Chàm · 2h · ~230K/người",
    tips: ["Chỉ chạy buổi sáng, về chiều", "Cần đặt trước qua tour operator", "Mùa biển động (tháng 10–2) có thể nghỉ"],
  },
  {
    key: "ev", icon: Navigation, label: "Xe điện", desc: "Tham quan nội thành & ven biển",
    detail: "Tour 60–90 phút · Dọc đường ven biển · 80K/người · Không cần lịch hẹn",
    tips: ["Xuất phát từ khu vực Công viên Biển Đông", "Phù hợp gia đình có trẻ nhỏ", "Chạy đến 22:00 hàng ngày"],
  },
];

/* ═══ BusRoute Card ══════════════════════════════════════════════════════════ */

const TYPE_BADGE: Record<string, string> = {
  subsidized:      "bg-emerald-600 text-white",
  tourist:         "bg-sky-500 text-white",
  unsubsidized:    "bg-violet-600 text-white",
  interprovincial: "bg-orange-500 text-white",
};
const TYPE_DOT: Record<string, string> = {
  subsidized: "bg-emerald-400", tourist: "bg-sky-400",
  unsubsidized: "bg-violet-400", interprovincial: "bg-orange-400",
};

function BusRouteCard({ route, acc, index }: { route: typeof busRoutes[0]; acc: { orbA: string; orbB: string }; index: number }) {
  const [open, setOpen] = useState(false);
  const badgeClass = route.pending ? "bg-gray-400 text-white" : (TYPE_BADGE[route.type] ?? "bg-gray-400 text-white");
  const hasStops = (route.stops?.length ?? 0) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className={`rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden ${route.pending ? "opacity-50" : ""}`}
    >
      {/* Image strip */}
      {!route.pending && (
        <div className="relative h-28 overflow-hidden">
          <img src={route.image} alt={route.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-3.5 pb-2.5 flex items-end justify-between">
            <div>
              <p className="text-white font-bold text-sm leading-tight drop-shadow">{route.name}</p>
              {route.duration && (
                <p className="text-white/70 text-[11px] flex items-center gap-1 mt-0.5">
                  <Clock size={10} />{route.duration} · {route.distance ?? ""}
                </p>
              )}
            </div>
            <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-xl ${badgeClass} shadow`}>{route.no}</span>
          </div>
        </div>
      )}

      {/* Compact header for pending */}
      {route.pending && (
        <div className="flex items-center gap-3 px-4 py-3.5">
          <span className={`shrink-0 text-xs font-bold w-14 text-center py-1.5 rounded-xl ${badgeClass}`}>{route.no}</span>
          <div className="flex-1 min-w-0">
            <p className="text-gray-700 text-sm font-semibold leading-tight">{route.name}</p>
            <p className="text-gray-400 text-xs mt-0.5">Đang làm thủ tục vận hành</p>
          </div>
          <span className="shrink-0 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Sắp mở</span>
        </div>
      )}

      {/* Info row */}
      {!route.pending && (
        <div className="px-3.5 py-3 grid grid-cols-3 gap-2 border-b border-gray-50 text-center">
          <div>
            <p className="text-[10px] text-gray-400 mb-0.5">Giá vé</p>
            <p className="text-xs font-bold text-gray-900">{route.price}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 mb-0.5">Giờ chạy</p>
            <p className="text-xs font-semibold text-gray-700 leading-tight">{route.hours.split("–")[0]}–{route.hours.split("–")[1]}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 mb-0.5">Tần suất</p>
            <p className="text-xs font-semibold text-gray-700 leading-tight">{route.frequency.replace("/chuyến","")}</p>
          </div>
        </div>
      )}

      {/* From→To + expand */}
      {!route.pending && (
        <button
          onClick={() => hasStops && setOpen(!open)}
          className={`w-full flex items-center gap-2 px-3.5 py-2.5 text-left ${hasStops ? "hover:bg-gray-50 cursor-pointer" : "cursor-default"}`}
        >
          <div className="flex-1 flex items-center gap-1.5 min-w-0 text-xs text-gray-500">
            <MapPin size={10} className="text-emerald-500 shrink-0" />
            <span className="truncate">{route.from}</span>
            <ArrowRight size={10} className="text-gray-300 shrink-0" />
            <MapPin size={10} className="text-rose-400 shrink-0" />
            <span className="truncate">{route.to}</span>
          </div>
          {hasStops && (
            <div className="flex items-center gap-1 text-[10px] text-gray-400 shrink-0">
              {route.stops!.length} điểm
              <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={12} />
              </motion.div>
            </div>
          )}
        </button>
      )}

      {/* Expandable stops */}
      <AnimatePresence initial={false}>
        {open && hasStops && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            transition={{ duration: 0.22 }} className="overflow-hidden"
          >
            <div className="px-3.5 pb-4 bg-gray-50/80 border-t border-gray-100">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-3 mb-2.5">
                Lộ trình · {route.stops!.length} điểm dừng
              </p>
              <div className="relative pl-4">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200" />
                {route.stops!.map((stop, i) => {
                  const isFirst = i === 0;
                  const isLast  = i === route.stops!.length - 1;
                  return (
                    <div key={i} className="relative flex items-start gap-2.5 mb-2.5 last:mb-0">
                      <div
                        className={`shrink-0 w-3.5 h-3.5 rounded-full border-2 border-white z-10 mt-0.5 ${
                          isFirst ? "bg-emerald-500" : isLast ? "bg-rose-400" : "bg-gray-300"
                        }`}
                        style={{ boxShadow: "0 0 0 2px " + (isFirst ? "#10b98130" : isLast ? "#f8717130" : "#d1d5db40") }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold leading-tight ${isFirst || isLast ? "text-gray-900" : "text-gray-600"}`}>
                          {stop.name}
                        </p>
                        {stop.address && <p className="text-[10px] text-gray-400 mt-0.5">{stop.address}</p>}
                        {stop.landmark && (
                          <span className="inline-block text-[10px] px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-500 border border-blue-100 mt-0.5">
                            {stop.landmark}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              {route.note && (
                <div className="mt-3 flex items-start gap-1.5 rounded-xl bg-amber-50 border border-amber-100 px-2.5 py-2">
                  <Info size={11} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-700 leading-relaxed">{route.note}</p>
                </div>
              )}
              {route.vehicles && (
                <p className="text-[10px] text-gray-400 mt-2.5 flex items-center gap-1">
                  <Bus size={10} /> {route.vehicles} phương tiện · {route.operator}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══ Journey Guide Card ══════════════════════════════════════════════════════ */

function JourneyCard({ guide, acc }: { guide: typeof journeyGuides[0]; acc: { orbA: string; orbB: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
    >
      {/* Image + header */}
      <div className="relative h-36 overflow-hidden">
        <img src={guide.image} alt={guide.to} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute top-2.5 left-2.5">
          <span className="text-[11px] font-bold px-2 py-1 rounded-lg text-white bg-sky-500 shadow">
            Bus {guide.busNo}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-3.5 pb-3">
          <div className="flex items-center gap-1.5 text-white/80 text-[11px] mb-1">
            <MapPin size={10} className="text-emerald-400" />{guide.from}
            <ArrowRight size={10} />
            <MapPin size={10} className="text-rose-400" />{guide.to}
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-white font-bold">{guide.price}</span>
            <span className="text-white/70 flex items-center gap-1"><Clock size={10} />{guide.duration}</span>
          </div>
        </div>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-gray-50 transition-colors"
      >
        <span className="text-xs font-semibold text-gray-700">Hướng dẫn từng bước</span>
        <div className="flex items-center gap-1 text-gray-400 text-xs">
          {guide.freq}
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={13} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            transition={{ duration: 0.22 }} className="overflow-hidden"
          >
            <div className="px-3.5 pb-4 pt-1 border-t border-gray-100 bg-gray-50/60 space-y-2.5">
              {guide.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                    style={{ background: `linear-gradient(135deg, ${acc.orbA}, ${acc.orbB})` }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{step}</p>
                </div>
              ))}
              {guide.tip && (
                <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-100 px-3 py-2 mt-1">
                  <Zap size={12} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-700 leading-relaxed">{guide.tip}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══ Bus Network Section ════════════════════════════════════════════════════ */

function BusNetworkSection({ acc }: { acc: { orbA: string; orbB: string } }) {
  const [activeTab, setActiveTab] = useState<BusRouteType | "pending">("tourist");
  const [activeJourney, setActiveJourney] = useState<"guide" | "ticket" | "howto">("guide");
  const tabRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const onTabMouseDown = (e: React.MouseEvent) => {
    drag.current = { active: true, startX: e.pageX - (tabRef.current?.offsetLeft ?? 0), scrollLeft: tabRef.current?.scrollLeft ?? 0 };
    if (tabRef.current) tabRef.current.style.cursor = "grabbing";
  };
  const onTabMouseUp = () => { drag.current.active = false; if (tabRef.current) tabRef.current.style.cursor = ""; };
  const onTabMouseMove = (e: React.MouseEvent) => {
    if (!drag.current.active) return; e.preventDefault();
    const x = e.pageX - (tabRef.current?.offsetLeft ?? 0);
    if (tabRef.current) tabRef.current.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX) * 1.5;
  };

  const filtered = activeTab === "pending"
    ? busRoutes.filter((r) => r.pending)
    : busRoutes.filter((r) => !r.pending && r.type === activeTab);

  const currentTab = ROUTE_TABS.find((t) => t.key === activeTab)!;

  const stats = [
    { value: `${busRoutes.filter(r => !r.pending).length}`, label: "Tuyến đang chạy", color: acc.orbA },
    { value: "05:10", label: "Chuyến sớm nhất", color: "#10b981" },
    { value: "8K", label: "Giá vé thấp nhất", color: "#f59e0b" },
    { value: "14–15'", label: "Tần suất cao điểm", color: "#8b5cf6" },
  ];

  return (
    <section className="pt-14 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900 font-bold text-xl flex items-center gap-2">
          <Bus size={20} style={{ color: acc.orbA }} /> Mạng lưới xe buýt Đà Nẵng
        </h2>
        <a
          href="https://www.danangbus.vn/lo-trinh-tuyen.html"
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors"
        >
          danangbus.vn <ExternalLink size={11} />
        </a>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-3.5 text-center">
            <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Route type tabs */}
      <div
        ref={tabRef}
        className="flex gap-2 overflow-x-auto pb-1 select-none cursor-grab"
        style={{ scrollbarWidth: "none" } as React.CSSProperties}
        onMouseDown={onTabMouseDown}
        onMouseUp={onTabMouseUp}
        onMouseLeave={onTabMouseUp}
        onMouseMove={onTabMouseMove}
      >
        {ROUTE_TABS.map((tab) => {
          const active = activeTab === tab.key;
          const count = tab.key === "pending"
            ? busRoutes.filter(r => r.pending).length
            : busRoutes.filter(r => !r.pending && r.type === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as BusRouteType | "pending")}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                active
                  ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${tab.dot}`} />
              {tab.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab desc */}
      <div className="flex items-start gap-2 rounded-xl bg-blue-50 border border-blue-100 px-3.5 py-2.5">
        <Info size={13} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700">{currentTab.desc}</p>
      </div>

      {/* Route cards grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((route, i) => (
            <BusRouteCard key={route.no} route={route} acc={acc} index={i} />
          ))}
          {filtered.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-3 py-10 text-center text-gray-400 text-sm">
              Không có tuyến nào
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Journey & Ticket section */}
      <div className="pt-6">
        <h3 className="text-gray-900 font-bold text-lg mb-4 flex items-center gap-2">
          <Route size={18} style={{ color: acc.orbA }} /> Dành cho du khách
        </h3>

        {/* Sub tabs */}
        <div className="flex gap-2 mb-4">
          {[
            { key: "guide" as const, label: "Hướng dẫn chuyến đi" },
            { key: "ticket" as const, label: "Loại vé & giá" },
            { key: "howto" as const, label: "Cách đi xe buýt" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveJourney(t.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                activeJourney === t.key
                  ? "text-white border-transparent shadow-sm"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
              }`}
              style={activeJourney === t.key ? { background: `linear-gradient(135deg, ${acc.orbA}, ${acc.orbB})` } : {}}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Journey guides */}
        {activeJourney === "guide" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {journeyGuides.map((guide, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <JourneyCard guide={guide} acc={acc} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Ticket types */}
        {activeJourney === "ticket" && (
          <div className="grid sm:grid-cols-2 gap-3">
            {ticketTypes.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className={`rounded-2xl border bg-white shadow-sm p-4 ${t.highlight ? "border-blue-200" : "border-gray-100"}`}
                style={t.highlight ? { background: `${acc.orbA}06`, borderColor: `${acc.orbA}40` } : {}}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: t.highlight ? `${acc.orbA}15` : "#f3f4f6" }}
                    >
                      <Ticket size={18} style={{ color: t.highlight ? acc.orbA : "#9ca3af" }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{t.type}</p>
                      <p className="text-[11px] text-gray-400">{t.desc}</p>
                    </div>
                  </div>
                  <p
                    className="text-base font-black shrink-0"
                    style={{ color: t.highlight ? acc.orbA : "#374151" }}
                  >
                    {t.price}
                  </p>
                </div>
              </motion.div>
            ))}
            <div className="sm:col-span-2 rounded-2xl border border-amber-100 bg-amber-50 p-4">
              <div className="flex items-start gap-2.5">
                <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-800 mb-1">Mua vé ở đâu?</p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Vé lượt: mua trực tiếp trên xe (trả tiền mặt cho nhân viên soát vé) · 
                    Vé tháng: mua tại Bến xe Trung tâm (33 Điện Biên Phủ) hoặc điểm bán vé Phương Trang · 
                    Thông tin: <strong>1900 1234</strong> (đường dây nóng Phương Trang)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* How to ride */}
        {activeJourney === "howto" && (
          <div className="space-y-3">
            {[
              {
                step: "1",
                title: "Tìm điểm dừng xe buýt",
                desc: "Các trạm có biển màu xanh-trắng với tên tuyến. Dùng Google Maps tìm kiếm \"Bus stop\" gần vị trí bạn đang đứng.",
                icon: MapPin,
                color: "#10b981",
              },
              {
                step: "2",
                title: "Lên xe & mua vé",
                desc: "Xe buýt có cửa trước/sau. Lên xe, đợi nhân viên soát vé đến thu tiền mặt. Cho biết điểm xuống để nhận vé lượt đúng giá.",
                icon: Bus,
                color: acc.orbA,
              },
              {
                step: "3",
                title: "Theo dõi lộ trình",
                desc: "Mở Google Maps, bật GPS — xe buýt Đà Nẵng hiển thị real-time. Nhân viên cũng thông báo điểm dừng trên loa.",
                icon: Navigation,
                color: "#8b5cf6",
              },
              {
                step: "4",
                title: "Xuống đúng điểm",
                desc: "Bấm nút yêu cầu dừng hoặc ra hiệu cho nhân viên trước điểm dừng khoảng 500m. Đa số điểm có nhà chờ có mái che.",
                icon: CheckCircle2,
                color: "#f59e0b",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3.5 rounded-2xl border border-gray-100 bg-white shadow-sm p-4"
              >
                <div
                  className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm"
                  style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)` }}
                >
                  {s.step}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-0.5">{s.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-start gap-2.5">
                <PhoneCall size={14} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-blue-800 mb-1">Liên hệ hỗ trợ</p>
                  <p className="text-xs text-blue-700">
                    Phương Trang Futabuslines: <strong>1900 6067</strong> · 
                    Trung tâm điều hành xe buýt ĐN: <strong>0236 3.630.630</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══ Main page ══════════════════════════════════════════════════════════════ */

const collage = [
  { src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1502920514313-52581002a659?w=900&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=900&auto=format&fit=crop" },
];

const tips = [
  { icon: Zap,       tip: "Tuyến 01SB từ sân bay đi Hội An chỉ 30K — rẻ nhất, có khoang hành lý" },
  { icon: PhoneCall, tip: "Taxi uy tín: Mai Linh 0236 3525 252 · Tiên Sa 0236 3791 791" },
  { icon: Clock,     tip: "Cao điểm 07:00–08:30 & 17:00–18:30 — xe buýt 15 phút/chuyến" },
  { icon: Bus,       tip: "Vé tháng 120K đi không giới hạn toàn tuyến có trợ giá" },
  { icon: Bike,      tip: "Đường Phạm Văn Đồng (ven biển) không cho xe máy — dùng xe đạp hoặc xe điện" },
  { icon: Navigation,tip: "Google Maps hiện real-time vị trí xe buýt Đà Nẵng — rất chính xác" },
];

export default function Transport() {
  const [search, setSearch]       = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const acc = useThemeAccents("transport");

  const categoryFilters = [
    { key: "all",   label: "Tất cả" },
    { key: "plane", label: "Sân bay" },
    { key: "bus",   label: "Xe buýt" },
    { key: "taxi",  label: "Taxi / Grab" },
    { key: "bike",  label: "Xe máy / Đạp" },
    { key: "ship",  label: "Tàu thuyền" },
    { key: "ev",    label: "Xe điện" },
  ];

  const visibleModes = activeCat === "all" ? transportModes : transportModes.filter((m) => m.key === activeCat);
  const filteredModes = search
    ? visibleModes.filter((m) =>
        [m.label, m.desc, m.detail, ...m.tips].join(" ").toLowerCase().includes(search.toLowerCase())
      )
    : visibleModes;

  return (
    <CategoryShell
      themeKey="transport"
      heroVariant="magazine"
      badge={{ icon: Navigation, text: "Chỉ dẫn di chuyển · Đà Nẵng 2026" }}
      titleLines={["Di chuyển", "dễ dàng."]}
      gradientLineIndex={1}
      subtitle="Xe buýt, sân bay, Grab, xe máy — thông tin đầy đủ nhất về giao thông Đà Nẵng."
      stats={[
        { icon: Bus,   label: "Tuyến xe buýt", value: "16+"  },
        { icon: Route, label: "Tuyến du lịch",  value: "5"    },
        { icon: Clock, label: "Giá vé thấp nhất", value: "8K" },
      ]}
      collage={collage}
      floatingBadge={{ icon: Plane, title: "Sân bay quốc tế", subtitle: "★ ĐÀ NẴNG" }}
      search={search}
      setSearch={setSearch}
      searchPlaceholder="Tìm phương tiện, tuyến đường..."
      categories={categoryFilters}
      activeCat={activeCat}
      setActiveCat={setActiveCat}
    >
      {/* ── Phương tiện ── */}
      <section className="pt-4 space-y-4">
        <h2 className="text-gray-900 font-bold text-xl flex items-center gap-2">
          <Navigation size={20} style={{ color: acc.orbA }} /> Phương tiện di chuyển
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredModes.map((m, i) => (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-3xl border border-gray-100 bg-white shadow-sm p-5 hover:shadow-md hover:border-gray-200 transition-all"
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-3 border"
                  style={{ background: `${acc.orbA}10`, borderColor: `${acc.orbA}30` }}
                >
                  <m.icon size={20} style={{ color: acc.orbA }} />
                </div>
                <h3 className="text-gray-900 font-bold text-base mb-1">{m.label}</h3>
                <p className="text-gray-500 text-sm mb-2">{m.desc}</p>
                <p className="text-gray-400 text-xs leading-relaxed mb-3">{m.detail}</p>
                <div className="space-y-1.5 border-t border-gray-50 pt-3">
                  {m.tips.map((tip, j) => (
                    <div key={j} className="flex items-start gap-1.5">
                      <CheckCircle2 size={11} className="shrink-0 mt-0.5" style={{ color: acc.orbA }} />
                      <p className="text-[11px] text-gray-500 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredModes.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-3 py-12 text-center text-gray-400">
              Không tìm thấy phương tiện phù hợp
            </div>
          )}
        </div>
      </section>

      {/* ── Mạng lưới xe buýt ── */}
      <BusNetworkSection acc={acc} />

      {/* ── Mẹo ── */}
      <section className="pt-14 space-y-4 pb-4">
        <h2 className="text-gray-900 font-bold text-xl flex items-center gap-2">
          <Zap size={20} style={{ color: acc.orbA }} /> Mẹo di chuyển thông minh
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                <t.icon size={15} style={{ color: acc.orbA }} />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{t.tip}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="pt-2 flex justify-center">
        <a
          href="https://www.danangbus.vn/lo-trinh-tuyen.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.div
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-2xl text-sm shadow-md"
            style={{
              background: `linear-gradient(135deg, ${acc.orbA}, ${acc.orbB})`,
              boxShadow: `0 10px 24px ${acc.orbA}44`,
            }}
          >
            Xem lịch trình đầy đủ tại danangbus.vn <ExternalLink size={14} />
          </motion.div>
        </a>
      </div>
    </CategoryShell>
  );
}
