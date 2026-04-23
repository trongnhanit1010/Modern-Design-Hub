import { useState, useRef, useMemo, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  CalendarDays, MapPin, Clock, Music, Utensils,
  Landmark, Waves, ChevronLeft, ChevronRight,
  Radio, Users, ArrowRight, Flame, Tag,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

/* ─── Types ─────────────────────────────────────────────── */
type Category = "festival" | "music" | "food" | "culture" | "sport";
type Status   = "live" | "upcoming";

interface EventItem {
  id: number; name: string; category: Category; status: Status;
  startDate: string; endDate: string; time: string; location: string;
  image: string; desc: string; price: string; attendees: number;
  gradient: string;
}

/* ─── Data (today = 14 Apr 2026) ────────────────────────── */
const ALL_EVENTS: EventItem[] = [
  {
    id: 1, name: "Lễ hội Pháo hoa Quốc tế Đà Nẵng 2026",
    category: "festival", status: "live",
    startDate: "2026-04-04", endDate: "2026-04-28",
    time: "21:00 – 22:00", location: "Cầu Rồng & Cầu Sông Hàn",
    image: "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?w=1200&auto=format&fit=crop",
    desc: "Sự kiện pháo hoa quốc tế lớn nhất Đông Nam Á với hơn 10 quốc gia trình diễn.",
    price: "Miễn phí", attendees: 120000,
    gradient: "from-violet-700 via-indigo-700 to-blue-700",
  },
  {
    id: 2, name: "Đêm Nhạc Acoustic Sông Hàn",
    category: "music", status: "live",
    startDate: "2026-04-01", endDate: "2026-04-30",
    time: "19:30 – 22:00", location: "Bờ Tây Sông Hàn",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop",
    desc: "Âm nhạc acoustic mỗi tối cuối tuần bên bờ sông Hàn thơ mộng.",
    price: "Miễn phí", attendees: 3000,
    gradient: "from-teal-700 via-emerald-700 to-green-700",
  },
  {
    id: 3, name: "Triển lãm Ảnh Đà Nẵng Xưa & Nay",
    category: "culture", status: "live",
    startDate: "2026-04-10", endDate: "2026-04-30",
    time: "08:00 – 17:00", location: "Bảo tàng Điêu khắc Chăm",
    image: "https://images.unsplash.com/photo-1536924430914-91f9e2041b83?w=1200&auto=format&fit=crop",
    desc: "Hơn 200 bức ảnh lịch sử ghi lại cuộc sống Đà Nẵng qua các thập kỷ.",
    price: "30.000đ", attendees: 5000,
    gradient: "from-amber-700 via-orange-700 to-red-700",
  },
  {
    id: 4, name: "Festival Biển Đà Nẵng 2026",
    category: "festival", status: "upcoming",
    startDate: "2026-05-15", endDate: "2026-05-20",
    time: "18:00 – 23:00", location: "Bãi biển Mỹ Khê",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&auto=format&fit=crop",
    desc: "Lễ hội biển lớn nhất với thể thao, âm nhạc, ẩm thực và trình diễn ánh sáng.",
    price: "Miễn phí", attendees: 50000,
    gradient: "from-sky-700 via-blue-700 to-indigo-700",
  },
  {
    id: 5, name: "Lễ hội Ẩm thực Phố Cổ Hội An",
    category: "food", status: "upcoming",
    startDate: "2026-05-20", endDate: "2026-05-22",
    time: "09:00 – 22:00", location: "Phố Cổ Hội An",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop",
    desc: "Hội tụ ẩm thực 3 miền với hơn 500 gian hàng và workshop nấu ăn.",
    price: "Miễn phí vào cửa", attendees: 30000,
    gradient: "from-orange-700 via-red-700 to-rose-700",
  },
  {
    id: 6, name: "Danang Music Festival 2026",
    category: "music", status: "upcoming",
    startDate: "2026-06-06", endDate: "2026-06-07",
    time: "20:00 – 24:00", location: "Công viên APEC",
    image: "https://images.unsplash.com/photo-1501386761578-eaa54b7f791e?w=1200&auto=format&fit=crop",
    desc: "Liên hoan âm nhạc quy tụ các nghệ sĩ hàng đầu Việt Nam và quốc tế.",
    price: "350.000đ", attendees: 20000,
    gradient: "from-violet-700 via-purple-700 to-fuchsia-700",
  },
  {
    id: 7, name: "Hội chợ Di sản Miền Trung",
    category: "culture", status: "upcoming",
    startDate: "2026-07-10", endDate: "2026-07-15",
    time: "08:00 – 21:00", location: "Trung tâm Triển lãm",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&auto=format&fit=crop",
    desc: "Giới thiệu di sản văn hóa, nghề thủ công và ẩm thực miền Trung.",
    price: "50.000đ", attendees: 15000,
    gradient: "from-amber-700 via-yellow-700 to-lime-700",
  },
  {
    id: 8, name: "Lễ Vu Lan Báo Hiếu 2026",
    category: "culture", status: "upcoming",
    startDate: "2026-08-08", endDate: "2026-08-09",
    time: "Cả ngày", location: "Các chùa lớn Đà Nẵng",
    image: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=1200&auto=format&fit=crop",
    desc: "Nghi lễ truyền thống tại các ngôi chùa lớn, thả hoa đăng trên sông Hàn.",
    price: "Miễn phí", attendees: 40000,
    gradient: "from-rose-700 via-pink-700 to-fuchsia-700",
  },
];

const CAT_ICON: Record<Category, typeof Music> = {
  festival: Waves, music: Music, food: Utensils, culture: Landmark, sport: Waves,
};
const CAT_LABEL: Record<Category, string> = {
  festival: "Lễ hội", music: "Âm nhạc", food: "Ẩm thực", culture: "Văn hóa", sport: "Thể thao",
};
const CAT_COLOR: Record<Category, string> = {
  festival: "bg-violet-500", music: "bg-teal-500", food: "bg-orange-500",
  culture: "bg-amber-500", sport: "bg-sky-500",
};

const MONTHS = ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6",
                 "Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];
const DAYS   = ["CN","Th2","Th3","Th4","Th5","Th6","Th7"];

function formatAttendees(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return `${n}`;
}

/* ─── Mini Calendar ─────────────────────────────────────── */
function MiniCalendar({
  year, month, events, selectedDay, onSelectDay, onPrev, onNext,
}: {
  year: number; month: number; events: EventItem[];
  selectedDay: number | null; onSelectDay: (d: number | null) => void;
  onPrev: () => void; onNext: () => void;
}) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();

  const eventDayMap = useMemo(() => {
    const map: Record<number, string[]> = {};
    for (const ev of events) {
      const s = new Date(ev.startDate + "T00:00:00");
      const e = new Date(ev.endDate   + "T00:00:00");
      for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        if (d.getFullYear() === year && d.getMonth() === month) {
          const dd = d.getDate();
          if (!map[dd]) map[dd] = [];
          map[dd].push(ev.category);
        }
      }
    }
    return map;
  }, [year, month, events]);

  const today = { y: 2026, m: 3, d: 14 }; // April 14, 2026

  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="select-none">
      {/* Month header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onPrev} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
          <ChevronLeft size={18} className="text-slate-500" />
        </button>
        <span className="text-slate-800 font-bold text-base">{MONTHS[month]} {year}</span>
        <button onClick={onNext} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
          <ChevronRight size={18} className="text-slate-500" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-semibold text-slate-400 pb-1.5">{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const isToday = today.y === year && today.m === month && today.d === day;
          const isSelected = selectedDay === day;
          const cats = eventDayMap[day] ?? [];
          const hasEvent = cats.length > 0;

          return (
            <button
              key={day}
              onClick={() => onSelectDay(isSelected ? null : day)}
              className={`relative flex flex-col items-center justify-center h-9 w-full rounded-xl text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-indigo-600 text-white shadow-md"
                  : isToday
                  ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200"
                  : hasEvent
                  ? "text-slate-800 hover:bg-slate-100"
                  : "text-slate-300 cursor-default"
              }`}
            >
              {day}
              {hasEvent && !isSelected && (
                <div className="flex gap-[2px] mt-0.5">
                  {cats.slice(0, 3).map((c, ci) => (
                    <span key={ci} className={`w-1 h-1 rounded-full ${
                      c === "festival" ? "bg-violet-500" :
                      c === "music"   ? "bg-teal-500"   :
                      c === "food"    ? "bg-orange-500"  :
                      "bg-amber-500"
                    }`} />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-2">
        {(["festival","music","food","culture"] as Category[]).map((c) => (
          <span key={c} className="flex items-center gap-1 text-[10px] text-slate-400">
            <span className={`w-1.5 h-1.5 rounded-full ${
              c === "festival" ? "bg-violet-500" :
              c === "music"    ? "bg-teal-500"   :
              c === "food"     ? "bg-orange-500"  :
              "bg-amber-500"
            }`} />
            {CAT_LABEL[c]}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Live Event Card ────────────────────────────────────── */
function LiveCard({ ev }: { ev: EventItem }) {
  const Icon = CAT_ICON[ev.category];
  return (
    <div className="flex-shrink-0 w-72 md:w-80 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-100 transition-shadow group cursor-pointer">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={ev.image} alt={ev.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />LIVE
        </div>
        <div className={`absolute top-3 right-3 flex items-center gap-1 ${CAT_COLOR[ev.category]} text-white text-[10px] font-bold px-2.5 py-1 rounded-full`}>
          <Icon size={9} />{CAT_LABEL[ev.category]}
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        <h3 className="text-slate-900 font-bold text-sm leading-snug mb-2.5 line-clamp-2">{ev.name}</h3>
        <div className="space-y-1 mb-3">
          <span className="flex items-center gap-1.5 text-slate-500 text-xs"><Clock size={11} className="text-slate-400 shrink-0" />{ev.time}</span>
          <span className="flex items-center gap-1.5 text-slate-500 text-xs"><MapPin size={11} className="text-slate-400 shrink-0" />{ev.location}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="flex items-center gap-1 text-slate-400 text-xs">
            <Users size={10} />{formatAttendees(ev.attendees)} quan tâm
          </span>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            ev.price === "Miễn phí"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-slate-100 text-slate-600"
          }`}>{ev.price}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Upcoming Event Card ────────────────────────────────── */
function UpcomingCard({ ev, index, isInView }: { ev: EventItem; index: number; isInView: boolean }) {
  const Icon = CAT_ICON[ev.category];
  const start = new Date(ev.startDate + "T00:00:00");
  const dayNum = start.getDate();
  const monthName = MONTHS[start.getMonth()].replace("Tháng ", "Th") + " " + start.getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.09 }}
      whileHover={{ y: -4 }}
      className="group flex gap-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden"
    >
      {/* Date block */}
      <div className={`flex-shrink-0 w-16 bg-gradient-to-b ${ev.gradient} flex flex-col items-center justify-center py-3 px-2`}>
        <span className="text-white font-extrabold text-2xl leading-none">{dayNum}</span>
        <span className="text-white/70 text-[10px] font-medium mt-0.5 text-center leading-tight">{monthName}</span>
      </div>

      {/* Image */}
      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden self-center rounded-xl m-2 ml-0">
        <img src={ev.image} alt={ev.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 py-3 pr-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className={`flex items-center gap-1 ${CAT_COLOR[ev.category]} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
            <Icon size={9} />{CAT_LABEL[ev.category]}
          </span>
          {ev.price === "Miễn phí" || ev.price === "Miễn phí vào cửa" ? (
            <span className="text-emerald-600 text-[10px] font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Miễn phí
            </span>
          ) : (
            <span className="text-slate-500 text-[10px] font-medium">{ev.price}</span>
          )}
        </div>
        <h3 className="text-slate-900 font-bold text-sm leading-tight mb-1.5 line-clamp-2 group-hover:text-indigo-700 transition-colors">{ev.name}</h3>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-slate-400 text-xs">
          <span className="flex items-center gap-1"><Clock size={10} />{ev.time}</span>
          <span className="flex items-center gap-1 truncate"><MapPin size={10} />{ev.location}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function Events() {
  const liveEvents     = ALL_EVENTS.filter((e) => e.status === "live");
  const upcomingEvents = ALL_EVENTS.filter((e) => e.status === "upcoming");

  const [calYear,  setCalYear]  = useState(2026);
  const [calMonth, setCalMonth] = useState(3); // April
  const [selDay,   setSelDay]   = useState<number | null>(null);
  const [catFilter, setCatFilter] = useState<Category | "all">("all");

  const upcomingRef = useRef(null);
  const upcomingInView = useInView(upcomingRef, { once: true, margin: "-60px" });

  const [liveEmblaRef, liveEmblaApi] = useEmblaCarousel({ loop: true, align: "start", dragFree: true });
  const scrollLivePrev = useCallback(() => liveEmblaApi?.scrollPrev(), [liveEmblaApi]);
  const scrollLiveNext = useCallback(() => liveEmblaApi?.scrollNext(), [liveEmblaApi]);

  function prevMonth() {
    if (calMonth === 0) { setCalYear((y) => y - 1); setCalMonth(11); }
    else setCalMonth((m) => m - 1);
    setSelDay(null);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalYear((y) => y + 1); setCalMonth(0); }
    else setCalMonth((m) => m + 1);
    setSelDay(null);
  }

  // Events that fall in the current calendar month (for the calendar section)
  const calMonthEvents = useMemo(() =>
    ALL_EVENTS.filter((ev) => {
      const s = new Date(ev.startDate + "T00:00:00");
      const e = new Date(ev.endDate   + "T00:00:00");
      const first = new Date(calYear, calMonth, 1);
      const last  = new Date(calYear, calMonth + 1, 0);
      return s <= last && e >= first;
    }),
    [calYear, calMonth]
  );

  // Events on selected day (or all month events if no day selected)
  const calPanelEvents = useMemo(() => {
    if (!selDay) return calMonthEvents;
    return calMonthEvents.filter((ev) => {
      const s = new Date(ev.startDate + "T00:00:00");
      const e = new Date(ev.endDate   + "T00:00:00");
      const selected = new Date(calYear, calMonth, selDay);
      return s <= selected && e >= selected;
    });
  }, [selDay, calMonthEvents, calYear, calMonth]);

  // Filtered upcoming events
  const filteredUpcoming = catFilter === "all"
    ? upcomingEvents
    : upcomingEvents.filter((e) => e.category === catFilter);

  const cats: (Category | "all")[] = ["all", "festival", "music", "food", "culture"];
  const catAllLabel: Record<string, string> = { all: "Tất cả", ...CAT_LABEL };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ── Festival w/ Live Photo Mosaic ────────── */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1e1b4b 0%,#581c87 50%,#1e1b4b 100%)" }}>
        {/* Firework particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span key={i} className="absolute rounded-full pointer-events-none"
            style={{
              left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`,
              width: 3 + (i % 3), height: 3 + (i % 3),
              background: ["#fcd34d", "#f472b6", "#a78bfa", "#60a5fa"][i % 4],
              boxShadow: `0 0 10px currentColor`, color: ["#fcd34d", "#f472b6", "#a78bfa", "#60a5fa"][i % 4],
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: (i * 0.2) % 4 }} />
        ))}
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 20% 100%, #fcd34d 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, #f472b6 0%, transparent 50%)"
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
          <div className="grid md:grid-cols-[1.2fr,1.4fr] gap-4 items-center">
            {/* LEFT: Title + ticket info */}
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-1.5 mb-2 px-2.5 py-1 rounded-full bg-violet-50/10 border border-violet-300/30 backdrop-blur text-violet-100 text-[10px] font-bold tracking-wider">
                <Tag size={11} className="text-amber-400" /> ADMIT ONE · FESTIVAL 2026
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black leading-[0.95] mb-1 text-violet-50">
                Đà Nẵng
              </h1>
              <h2 className="text-2xl sm:text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-fuchsia-400 to-pink-400 mb-3">
                Lễ Hội Quanh Năm
              </h2>
              <p className="text-violet-200/70 text-sm max-w-md mb-3 hidden sm:block">
                Pháo hoa quốc tế, festival biển, đêm nhạc sông Hàn — luôn có một sự kiện đang chờ bạn.
              </p>

              {/* Stats compact */}
              <div className="flex gap-2 mb-3">
                {[
                  { value: liveEvents.length, label: "Đang diễn ra", color: "text-red-300", dot: "bg-red-500", live: true },
                  { value: upcomingEvents.length, label: "Sắp tới", color: "text-sky-300", dot: "bg-sky-500" },
                  { value: ALL_EVENTS.length, label: "Tổng 2026", color: "text-amber-300", dot: "bg-amber-500" },
                ].map((s) => (
                  <div key={s.label} className="flex-1 bg-white/5 backdrop-blur border border-violet-300/20 rounded-lg px-2.5 py-1.5">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${s.live ? "animate-pulse" : ""}`} />
                      <span className={`text-[9px] uppercase tracking-wider font-bold ${s.color}`}>{s.live ? "LIVE" : "INFO"}</span>
                    </div>
                    <div className="font-black text-violet-50 text-xl leading-none">{s.value}</div>
                    <div className="text-violet-200/60 text-[10px] mt-0.5 truncate">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Mini ticket footer with VIP + countdown */}
              <div className="rounded-xl bg-gradient-to-r from-violet-50 to-fuchsia-50 p-2 flex items-center gap-2 shadow-lg relative overflow-hidden">
                {/* perforation */}
                <div className="absolute left-[60%] top-0 bottom-0 w-px border-l-2 border-dashed border-violet-300" />
                <div className="flex items-center gap-2 flex-1 px-1">
                  <Flame size={20} className="text-rose-500 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-violet-950 font-black text-xs leading-tight truncate">26.04 · Pháo hoa QT</div>
                    <div className="text-violet-700/60 text-[10px] truncate">Cầu Rồng · 21:00</div>
                  </div>
                </div>
                <div className="text-right pr-2">
                  <div className="text-[8px] font-black text-violet-700 tracking-widest">SECTION</div>
                  <div className="text-violet-950 font-black text-lg leading-none">VIP</div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: 4-tile event photo mosaic */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-3 gap-1.5 h-44 sm:h-48 md:h-52">
              {/* Big featured event */}
              <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden border-2 border-violet-300/30 shadow-2xl group">
                <img src={ALL_EVENTS[0]?.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-950/95 via-violet-950/30 to-transparent" />
                <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-black">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
                </div>
                <div className="absolute bottom-2 left-2.5 right-2.5 text-violet-50">
                  <div className="text-[9px] tracking-widest font-bold opacity-80">★ ĐANG DIỄN RA</div>
                  <div className="font-bold text-sm sm:text-base leading-tight line-clamp-2">{ALL_EVENTS[0]?.name}</div>
                </div>
              </div>
              {/* Smaller tiles */}
              {[ALL_EVENTS[1], ALL_EVENTS[2]].filter(Boolean).map((ev, i) => (
                <motion.div key={ev.id}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.1 }}
                  className="relative rounded-xl overflow-hidden border border-violet-300/30 shadow-lg group">
                  <img src={ev.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-950/90 to-transparent" />
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 text-violet-50">
                    <div className="text-[8px] tracking-widest font-bold opacity-80">{ev.status === "live" ? "🔴 LIVE" : "📅 SẮP TỚI"}</div>
                    <div className="font-bold text-[11px] leading-tight line-clamp-2">{ev.name}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Đang diễn ra ─────────────────────────────────── */}
      <div className="bg-white border-b border-slate-100 px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <Radio size={15} className="text-red-500" />
              <h2 className="text-slate-900 font-extrabold text-lg">Đang diễn ra</h2>
              <span className="bg-red-50 text-red-600 text-[11px] font-bold px-2 py-0.5 rounded-full border border-red-100 ml-1">
                {liveEvents.length} sự kiện
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={scrollLivePrev} className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl shadow-sm text-slate-600 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button onClick={scrollLiveNext} className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl shadow-sm text-slate-600 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="overflow-hidden" ref={liveEmblaRef}>
            <div className="flex gap-4">
              {liveEvents.map((ev) => <LiveCard key={ev.id} ev={ev} />)}
            </div>
          </div>
        </div>
      </div>

      {/* ── Lịch sự kiện ─────────────────────────────────── */}
      <div className="bg-slate-50 border-t border-slate-100 px-4 sm:px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <CalendarDays size={20} className="text-indigo-600" />
            <h2 className="text-slate-900 font-extrabold text-xl">Lịch sự kiện</h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <MiniCalendar
                year={calYear} month={calMonth}
                events={ALL_EVENTS}
                selectedDay={selDay}
                onSelectDay={setSelDay}
                onPrev={prevMonth} onNext={nextMonth}
              />
            </div>

            {/* Event panel */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-500 text-sm">
                  {selDay
                    ? `Sự kiện ngày ${selDay} tháng ${calMonth + 1}, ${calYear}`
                    : `Sự kiện tháng ${calMonth + 1}/${calYear}`}
                </p>
                {selDay && (
                  <button onClick={() => setSelDay(null)} className="text-slate-400 hover:text-slate-700 text-xs transition-colors">
                    Xem tất cả tháng
                  </button>
                )}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${calYear}-${calMonth}-${selDay}`}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3 max-h-80 lg:max-h-96 overflow-y-auto pr-1 scrollbar-hide"
                >
                  {calPanelEvents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-300">
                      <CalendarDays size={36} strokeWidth={1} />
                      <p className="mt-3 text-sm">Không có sự kiện trong ngày này</p>
                    </div>
                  ) : (
                    calPanelEvents.map((ev, i) => {
                      const Icon = CAT_ICON[ev.category];
                      return (
                        <motion.div
                          key={ev.id}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="flex gap-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-3.5 cursor-pointer transition-all group shadow-sm"
                        >
                          <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden">
                            <img src={ev.image} alt={ev.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-1">
                              {ev.status === "live" && (
                                <span className="flex items-center gap-1 bg-red-50 text-red-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-red-100">
                                  <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />LIVE
                                </span>
                              )}
                              <span className={`flex items-center gap-0.5 ${CAT_COLOR[ev.category]} text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full`}>
                                <Icon size={8} />{CAT_LABEL[ev.category]}
                              </span>
                            </div>
                            <h4 className="text-slate-800 font-semibold text-xs leading-tight mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors">{ev.name}</h4>
                            <div className="flex gap-2 text-slate-400 text-[10px]">
                              <span className="flex items-center gap-0.5"><Clock size={9} />{ev.time}</span>
                              <span className="flex items-center gap-0.5 truncate"><MapPin size={9} />{ev.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center shrink-0">
                            <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sắp diễn ra ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pb-16" ref={upcomingRef}>
        {/* Section header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Flame size={20} className="text-orange-500" />
            <h2 className="text-slate-900 font-extrabold text-xl">Sắp diễn ra</h2>
          </div>
          {/* Category filter */}
          <div className="flex gap-1.5 flex-wrap">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCatFilter(c)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  catFilter === c
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-md"
                    : "bg-white border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {c !== "all" && (() => { const I = CAT_ICON[c as Category]; return <I size={10} />; })()}
                {catAllLabel[c]}
              </button>
            ))}
          </div>
        </div>

        {/* Event list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={catFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 gap-3"
          >
            {filteredUpcoming.length === 0 ? (
              <div className="sm:col-span-2 flex flex-col items-center py-16 text-slate-400">
                <Tag size={36} strokeWidth={1} />
                <p className="mt-3 text-sm">Không có sự kiện nào trong danh mục này</p>
              </div>
            ) : (
              filteredUpcoming.map((ev, i) => (
                <UpcomingCard key={ev.id} ev={ev} index={i} isInView={upcomingInView} />
              ))
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
