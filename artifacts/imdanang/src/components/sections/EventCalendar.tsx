import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MapPin, Clock, ArrowRight, ChevronLeft, ChevronRight, Sparkles, Dumbbell, Music, Star, PartyPopper, UtensilsCrossed } from "lucide-react";
import { format, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";

const events = [
  {
    id: 1,
    title: "Lễ hội pháo hoa quốc tế Đà Nẵng (DIFF 2026)",
    date: new Date(2026, 5, 1),
    endDate: new Date(2026, 5, 1),
    location: "Sông Hàn, Đà Nẵng",
    timeRange: "20:00 – 22:00",
    category: "LỄ HỘI",
    categoryIcon: Sparkles,
    categoryColor: "bg-pink-100 text-pink-700",
    badgeBg: "bg-rose-500",
    accentSolid: "bg-rose-500",
    accent: "from-pink-500 to-rose-600",
    dateBg: "#e11d48",
    image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=700&auto=format&fit=crop",
    desc: "Lễ hội pháo hoa quốc tế lớn nhất Đông Nam Á với sự tham gia của các đội pháo hoa đến từ nhiều quốc gia trên thế giới.",
  },
  {
    id: 2,
    title: "Ironman 70.3 Vietnam 2026",
    date: new Date(2026, 4, 12),
    endDate: new Date(2026, 4, 12),
    location: "Bãi biển Sơn Trà",
    timeRange: "05:00 – 15:00",
    category: "THỂ THAO",
    categoryIcon: Dumbbell,
    categoryColor: "bg-blue-100 text-blue-700",
    badgeBg: "bg-blue-500",
    accentSolid: "bg-blue-500",
    accent: "from-blue-500 to-indigo-500",
    dateBg: "#2563eb",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&auto=format&fit=crop",
    desc: "Giải đua triathlon nổi tiếng thế giới với 3 môn bơi lội, đạp xe và chạy bộ trên những cung đường đẹp nhất Đà Nẵng.",
  },
  {
    id: 3,
    title: "Da Nang International Music Festival",
    date: new Date(2026, 4, 20),
    endDate: new Date(2026, 4, 20),
    location: "Công viên Biển Đông",
    timeRange: "18:00 – 23:00",
    category: "ÂM NHẠC",
    categoryIcon: Music,
    categoryColor: "bg-purple-100 text-purple-700",
    badgeBg: "bg-purple-500",
    accentSolid: "bg-purple-500",
    accent: "from-purple-500 to-violet-600",
    dateBg: "#7c3aed",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=700&auto=format&fit=crop",
    desc: "Festival âm nhạc quốc tế quy tụ các nghệ sĩ nổi tiếng từ khắp nơi trên thế giới biểu diễn trên sân khấu ngoài trời.",
  },
  {
    id: 4,
    title: "Lễ hội Quán Thế Âm Ngũ Hành Sơn",
    date: new Date(2026, 3, 28),
    endDate: new Date(2026, 3, 28),
    location: "Khu du lịch Ngũ Hành Sơn",
    timeRange: "07:00 – 21:00",
    category: "TÂM LINH",
    categoryIcon: Star,
    categoryColor: "bg-amber-100 text-amber-700",
    badgeBg: "bg-amber-500",
    accentSolid: "bg-amber-500",
    accent: "from-amber-500 to-orange-500",
    dateBg: "#d97706",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&auto=format&fit=crop",
    desc: "Lễ hội văn hóa tâm linh lớn nhất miền Trung, thu hút hàng nghìn Phật tử và du khách hành hương.",
  },
  {
    id: 5,
    title: "Danang Electronic Carnival 2026",
    date: new Date(2026, 7, 15),
    endDate: new Date(2026, 7, 15),
    location: "Công viên Châu Á",
    timeRange: "18:00 – 23:59",
    category: "GIẢI TRÍ",
    categoryIcon: PartyPopper,
    categoryColor: "bg-pink-100 text-pink-700",
    badgeBg: "bg-fuchsia-500",
    accentSolid: "bg-fuchsia-500",
    accent: "from-fuchsia-500 to-pink-600",
    dateBg: "#c026d3",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=700&auto=format&fit=crop",
    desc: "Đêm nhạc điện tử sôi động nhất năm với sự tham gia của các DJ hàng đầu Việt Nam và quốc tế.",
  },
  {
    id: 6,
    title: "Tuần lễ văn hóa ẩm thực Đà Nẵng",
    date: new Date(2026, 6, 25),
    endDate: new Date(2026, 6, 25),
    location: "Quảng trường 29/3",
    timeRange: "08:00 – 22:00",
    category: "ẨM THỰC",
    categoryIcon: UtensilsCrossed,
    categoryColor: "bg-orange-100 text-orange-700",
    badgeBg: "bg-orange-500",
    accentSolid: "bg-orange-500",
    accent: "from-orange-500 to-amber-500",
    dateBg: "#ea580c",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&auto=format&fit=crop",
    desc: "Sự kiện ẩm thực lớn nhất miền Trung với hàng trăm gian hàng và màn trình diễn chế biến món ăn từ các đầu bếp nổi tiếng.",
  },
];

function GridEventCard({ event, index, isInView }: { event: typeof events[0]; index: number; isInView: boolean }) {
  const day = format(event.date, "dd");
  const month = format(event.date, "MM");
  const CategoryIcon = event.categoryIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }}
      className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm cursor-pointer group"
      data-testid={`grid-event-${event.id}`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20" />
        {/* Category badge */}
        <div className={`absolute top-3 left-3 ${event.badgeBg} flex items-center gap-1.5 text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wide shadow`}>
          <CategoryIcon size={10} />
          {event.category}
        </div>
      </div>

      {/* Bottom info */}
      <div className="flex items-start gap-3 p-4">
        {/* Date block */}
        <div className="shrink-0 rounded-xl overflow-hidden text-center min-w-[52px] shadow-sm">
          <div className="py-1.5 px-2" style={{ background: event.dateBg }}>
            <p className="text-white font-bold text-xl leading-none">{day}</p>
          </div>
          <div className="py-1 px-2 bg-gray-50 border border-gray-100">
            <p className="text-gray-500 text-[10px] font-semibold">TH.{month}</p>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-1.5">
            {event.title}
          </h4>
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
            <MapPin size={10} className="shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <Clock size={10} className="shrink-0" />
            <span>{event.timeRange}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventCalendar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<number>(events[0].id);
  const [paused, setPaused] = useState(false);
  const [viewMode, setViewMode] = useState<"timeline" | "grid">("timeline");

  const activeEvent = events.find((e) => e.id === selected)!;
  const activeIndex = events.findIndex((e) => e.id === selected);

  const goNext = useCallback(() => {
    setSelected((prev) => {
      const idx = events.findIndex((e) => e.id === prev);
      return events[(idx + 1) % events.length].id;
    });
  }, []);

  const goPrev = useCallback(() => {
    setSelected((prev) => {
      const idx = events.findIndex((e) => e.id === prev);
      return events[(idx - 1 + events.length) % events.length].id;
    });
  }, []);

  useEffect(() => {
    if (paused || viewMode === "grid") return;
    const timer = setInterval(goNext, 8000);
    return () => clearInterval(timer);
  }, [paused, goNext, viewMode]);

  return (
    <section className="py-12 px-4 bg-background" ref={ref} id="events" data-testid="section-events">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Lịch sự kiện</h2>
            <p className="text-muted-foreground text-sm mt-1">Các sự kiện nổi bật tại Đà Nẵng</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <a href="#" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
              Xem tất cả lịch <ArrowRight size={14} />
            </a>
            <div className="flex items-center gap-1 bg-muted rounded-full p-1">
              <button
                onClick={() => setViewMode("timeline")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${viewMode === "timeline" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
                data-testid="button-events-timeline"
              >
                Dòng thời gian
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
                data-testid="button-events-grid"
              >
                Dạng lưới
              </button>
            </div>
            {viewMode === "timeline" && (
              <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                <button onClick={goPrev} className="p-1.5 rounded-full hover:bg-gray-200 transition-colors" data-testid="button-events-prev">
                  <ChevronLeft size={16} className="text-foreground" />
                </button>
                <span className="text-sm text-muted-foreground font-medium tabular-nums px-1">{activeIndex + 1} / {events.length}</span>
                <button onClick={goNext} className="p-1.5 rounded-full hover:bg-gray-200 transition-colors" data-testid="button-events-next">
                  <ChevronRight size={16} className="text-foreground" />
                </button>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "timeline" ? (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-5 gap-5 min-h-[480px]"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="md:col-span-2 space-y-0 relative">
                <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-border z-0" />
                {events.map((event, i) => {
                  const isActive = selected === event.id;
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      onClick={() => setSelected(event.id)}
                      className={`relative pl-14 pr-4 py-4 cursor-pointer rounded-2xl transition-all z-10 ${isActive ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/50"}`}
                      data-testid={`timeline-event-${event.id}`}
                    >
                      <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br ${event.accent} flex items-center justify-center shadow-md z-10 transition-transform ${isActive ? "scale-110" : ""}`}>
                        <span className={`rounded-full transition-all ${isActive ? "w-2.5 h-2.5 bg-white" : "w-2 h-2 bg-white/80"}`} />
                      </div>
                      <p className="text-xs text-muted-foreground mb-0.5">{format(event.date, "d MMM yyyy", { locale: vi })}</p>
                      <h4 className={`font-semibold text-sm leading-tight line-clamp-2 transition-colors ${isActive ? "text-primary" : "text-foreground"}`}>{event.title}</h4>
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium mt-1.5 ${event.categoryColor}`}>{event.category}</span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="md:col-span-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected}
                    initial={{ opacity: 0, scale: 0.97, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="relative rounded-3xl overflow-hidden shadow-xl h-full min-h-[400px]"
                  >
                    <img src={activeEvent.image} alt={activeEvent.title} className="w-full h-full object-cover absolute inset-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                    <div className="absolute top-5 right-5">
                      <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${activeEvent.categoryColor}`}>
                        {activeEvent.category}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-bold text-2xl font-serif leading-tight mb-3">{activeEvent.title}</h3>
                      <p className="text-white/75 text-sm leading-relaxed mb-4 line-clamp-3">{activeEvent.desc}</p>
                      <div className="flex flex-col gap-2 mb-5">
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <MapPin size={14} className="text-white/50 shrink-0" />
                          <span>{activeEvent.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <Clock size={14} className="text-white/50 shrink-0" />
                          <span>{format(activeEvent.date, "d MMMM yyyy", { locale: vi })}{!isSameDay(activeEvent.date, activeEvent.endDate) && ` — ${format(activeEvent.endDate, "d MMMM yyyy", { locale: vi })}`}</span>
                        </div>
                      </div>
                      <button className="inline-flex items-center gap-2 bg-white text-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                        Xem chi tiết <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {events.map((event, i) => (
                <GridEventCard key={event.id} event={event} index={i} isInView={isInView} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
