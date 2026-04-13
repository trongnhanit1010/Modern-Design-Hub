import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarDays, MapPin, Tag, Clock, ArrowRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths, getDay } from "date-fns";
import { vi } from "date-fns/locale";

const events = [
  {
    id: 1,
    title: "Lễ hội Pháo hoa Quốc tế Đà Nẵng",
    date: new Date(2026, 3, 16),
    endDate: new Date(2026, 4, 31),
    location: "Cầu Rồng, Đà Nẵng",
    category: "Lễ hội",
    categoryColor: "bg-pink-100 text-pink-700",
    accent: "from-pink-500 to-rose-600",
    accentSolid: "bg-pink-500",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&auto=format&fit=crop",
    desc: "Lễ hội pháo hoa quốc tế lớn nhất Đông Nam Á với sự tham gia của các đội pháo hoa đến từ nhiều quốc gia trên thế giới.",
  },
  {
    id: 2,
    title: "Festival Ẩm Thực Đà Nẵng 2026",
    date: new Date(2026, 3, 20),
    endDate: new Date(2026, 3, 22),
    location: "Công viên Biển Đông",
    category: "Ẩm thực",
    categoryColor: "bg-orange-100 text-orange-700",
    accent: "from-orange-500 to-amber-500",
    accentSolid: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&auto=format&fit=crop",
    desc: "Sự kiện ẩm thực lớn nhất miền Trung với hàng trăm gian hàng và màn trình diễn chế biến món ăn từ các đầu bếp nổi tiếng.",
  },
  {
    id: 3,
    title: "Cuộc đua xe đạp Toàn Quốc",
    date: new Date(2026, 3, 13),
    endDate: new Date(2026, 3, 13),
    location: "Trung tâm Thành phố",
    category: "Thể thao",
    categoryColor: "bg-blue-100 text-blue-700",
    accent: "from-blue-500 to-indigo-500",
    accentSolid: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&auto=format&fit=crop",
    desc: "Giải đua xe đạp toàn quốc đi qua những cung đường đẹp nhất của Đà Nẵng và khu vực lân cận.",
  },
  {
    id: 4,
    title: "Triển lãm Nghệ thuật Đương đại",
    date: new Date(2026, 3, 25),
    endDate: new Date(2026, 4, 5),
    location: "Bảo tàng Đà Nẵng",
    category: "Nghệ thuật",
    categoryColor: "bg-purple-100 text-purple-700",
    accent: "from-purple-500 to-violet-600",
    accentSolid: "bg-purple-500",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1548013146-72479768bada?w=200&auto=format&fit=crop",
    desc: "Triển lãm quy tụ hơn 200 tác phẩm nghệ thuật đương đại từ các nghệ sĩ trong nước và quốc tế.",
  },
  {
    id: 5,
    title: "Festival Biển Đà Nẵng",
    date: new Date(2026, 4, 1),
    endDate: new Date(2026, 4, 3),
    location: "Bãi biển Mỹ Khê",
    category: "Festival",
    categoryColor: "bg-teal-100 text-teal-700",
    accent: "from-teal-500 to-cyan-500",
    accentSolid: "bg-teal-500",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop",
    desc: "Lễ hội biển lớn nhất miền Trung với các hoạt động thể thao biển, âm nhạc và ẩm thực.",
  },
];

const eventDates = events.map((e) => e.date);

const categoryDotColor: Record<string, string> = {
  "Lễ hội": "bg-pink-500",
  "Ẩm thực": "bg-orange-500",
  "Thể thao": "bg-blue-500",
  "Nghệ thuật": "bg-purple-500",
  "Festival": "bg-teal-500",
};

function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDow = getDay(monthStart);
  const filteredEvents = selectedDate ? events.filter((e) => isSameDay(e.date, selectedDate)) : events;
  const hasEvent = (date: Date) => eventDates.some((ed) => isSameDay(ed, date));
  const eventOnDay = (date: Date) => events.find((e) => isSameDay(e.date, date));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid md:grid-cols-5 gap-5">
      <div className="md:col-span-2 rounded-3xl overflow-hidden shadow-lg border border-card-border">
        <div className="bg-gradient-to-br from-primary to-blue-700 px-5 pt-5 pb-4">
          <div className="flex items-center justify-between mb-1">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-all" data-testid="button-calendar-prev">
              <ChevronLeft size={18} />
            </button>
            <div className="text-center">
              <h3 className="text-white font-bold text-lg capitalize tracking-wide">{format(currentMonth, "MMMM", { locale: vi })}</h3>
              <p className="text-white/60 text-xs font-medium">{format(currentMonth, "yyyy")}</p>
            </div>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-all" data-testid="button-calendar-next">
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-7 mt-3">
            {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d) => (
              <div key={d} className="text-center text-xs text-white/50 font-semibold py-1">{d}</div>
            ))}
          </div>
        </div>
        <div className="bg-card p-3">
          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({ length: startDow }).map((_, i) => <div key={`empty-${i}`} />)}
            {days.map((day) => {
              const hasEv = hasEvent(day);
              const evOnDay = eventOnDay(day);
              const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
              const isTod = isToday(day);
              const dotColor = evOnDay ? categoryDotColor[evOnDay.category] : "bg-amber-400";
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(isSelected ? null : day)}
                  className={`relative flex flex-col items-center justify-center h-9 rounded-xl text-sm font-medium transition-all ${isSelected ? "bg-primary text-white shadow-md" : isTod ? "bg-primary/12 text-primary font-bold" : hasEv ? "hover:bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/60"}`}
                  data-testid={`button-calendar-day-${format(day, "d")}`}
                >
                  {format(day, "d")}
                  {hasEv && !isSelected && <span className={`absolute bottom-1 w-1.5 h-1.5 ${dotColor} rounded-full`} />}
                </button>
              );
            })}
          </div>
          {selectedDate && (
            <button onClick={() => setSelectedDate(null)} className="mt-3 w-full text-xs text-muted-foreground hover:text-primary transition-colors py-1.5 rounded-lg hover:bg-muted">
              ← Xem tất cả sự kiện
            </button>
          )}
        </div>
      </div>

      <div className="md:col-span-3 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <CalendarDays size={15} className="text-primary" />
          <span className="text-sm font-semibold text-foreground">
            {selectedDate ? `Sự kiện ngày ${format(selectedDate, "d MMMM yyyy", { locale: vi })}` : "Sự kiện sắp diễn ra"}
          </span>
          {!selectedDate && (
            <span className="ml-auto bg-primary/10 text-primary text-xs px-2.5 py-0.5 rounded-full font-semibold">{filteredEvents.length}</span>
          )}
        </div>
        <AnimatePresence mode="popLayout">
          {filteredEvents.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16 text-muted-foreground rounded-3xl bg-muted/30">
              <CalendarDays size={38} className="mb-3 opacity-25" />
              <p className="text-sm">Không có sự kiện vào ngày này</p>
            </motion.div>
          ) : filteredEvents.map((event, i) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ delay: i * 0.05, duration: 0.28 }}
              whileHover={{ scale: 1.015 }}
              onHoverStart={() => setHoveredEvent(event.id)}
              onHoverEnd={() => setHoveredEvent(null)}
              className="relative overflow-hidden rounded-2xl border border-card-border bg-card shadow-sm cursor-pointer"
              data-testid={`card-event-${event.id}`}
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${event.accent}`} />
              <div className="flex gap-0 pl-3">
                <div className="relative shrink-0 w-24 h-24 overflow-hidden rounded-xl m-3 ml-0">
                  <img src={event.thumb} alt={event.title} className="w-full h-full object-cover transition-transform duration-500" style={{ transform: hoveredEvent === event.id ? "scale(1.08)" : "scale(1)" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-1.5 left-0 right-0 text-center">
                    <span className="text-white font-bold text-xl leading-none block">{format(event.date, "d")}</span>
                    <span className="text-white/80 text-xs capitalize">{format(event.date, "MMM", { locale: vi })}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0 py-3 pr-3">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="font-bold text-sm text-foreground leading-snug line-clamp-2 flex-1">{event.title}</h4>
                    <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-semibold ${event.categoryColor}`}>{event.category}</span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-2">{event.desc}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin size={10} className="shrink-0" /><span className="line-clamp-1">{event.location}</span></span>
                    <span className="flex items-center gap-1 shrink-0"><Clock size={10} />{format(event.date, "d/M")}{!isSameDay(event.date, event.endDate) && ` - ${format(event.endDate, "d/M")}`}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function TimelineView({ isInView }: { isInView: boolean }) {
  const [selected, setSelected] = useState<number>(events[0].id);

  const activeEvent = events.find((e) => e.id === selected)!;

  return (
    <div className="grid md:grid-cols-5 gap-5 min-h-[480px]">
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
    </div>
  );
}

export default function EventCalendar() {
  const [option, setOption] = useState<"A" | "B">("A");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 px-4 bg-background" ref={ref} id="events" data-testid="section-events">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Lịch sự kiện</h2>
            <p className="text-muted-foreground text-sm mt-1">Các sự kiện nổi bật tại Đà Nẵng</p>
          </div>
          <div className="flex items-center gap-2 bg-muted rounded-full p-1">
            <button onClick={() => setOption("A")} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "A" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`} data-testid="button-events-option-a">Lịch</button>
            <button onClick={() => setOption("B")} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "B" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`} data-testid="button-events-option-b">Timeline</button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {option === "A" ? (
            <motion.div key="A" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><CalendarView /></motion.div>
          ) : (
            <motion.div key="B" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><TimelineView isInView={isInView} /></motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
