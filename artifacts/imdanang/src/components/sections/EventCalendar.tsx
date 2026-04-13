import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarDays, MapPin, Tag } from "lucide-react";
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
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Festival Ẩm Thực Đà Nẵng 2026",
    date: new Date(2026, 3, 20),
    endDate: new Date(2026, 3, 22),
    location: "Công viên Biển Đông",
    category: "Ẩm thực",
    categoryColor: "bg-orange-100 text-orange-700",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Cuộc đua xe đạp Toàn Quốc",
    date: new Date(2026, 3, 13),
    endDate: new Date(2026, 3, 13),
    location: "Trung tâm Thành phố",
    category: "Thể thao",
    categoryColor: "bg-blue-100 text-blue-700",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Triển lãm Nghệ thuật Đương đại",
    date: new Date(2026, 3, 25),
    endDate: new Date(2026, 4, 5),
    location: "Bảo tàng Đà Nẵng",
    category: "Nghệ thuật",
    categoryColor: "bg-purple-100 text-purple-700",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Festival Biển Đà Nẵng",
    date: new Date(2026, 4, 1),
    endDate: new Date(2026, 4, 3),
    location: "Bãi biển Mỹ Khê",
    category: "Festival",
    categoryColor: "bg-teal-100 text-teal-700",
    image: "https://images.unsplash.com/photo-1591017403997-bdf27de5700a?w=200&auto=format&fit=crop",
  },
];

const eventDates = events.map((e) => e.date);

export default function EventCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDow = getDay(monthStart);

  const filteredEvents = selectedDate
    ? events.filter((e) => isSameDay(e.date, selectedDate))
    : events;

  const hasEvent = (date: Date) => eventDates.some((ed) => isSameDay(ed, date));

  return (
    <section className="py-12 px-4 bg-background" ref={ref} id="events" data-testid="section-events">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Lịch sự kiện</h2>
          <p className="text-muted-foreground text-sm mt-1">Các sự kiện nổi bật tại Đà Nẵng</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-5 gap-6"
        >
          <div className="md:col-span-2 bg-card rounded-3xl border border-card-border p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                data-testid="button-calendar-prev"
              >
                <ChevronLeft size={18} />
              </button>
              <h3 className="font-semibold text-foreground capitalize">
                {format(currentMonth, "MMMM yyyy", { locale: vi })}
              </h3>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                data-testid="button-calendar-next"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d) => (
                <div key={d} className="text-center text-xs text-muted-foreground font-medium py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5">
              {Array.from({ length: startDow }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {days.map((day) => {
                const hasEv = hasEvent(day);
                const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
                const isTod = isToday(day);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(isSelected ? null : day)}
                    className={`relative flex flex-col items-center justify-center h-9 rounded-full text-sm font-medium transition-all ${
                      isSelected
                        ? "bg-primary text-white"
                        : isTod
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted text-foreground"
                    }`}
                    data-testid={`button-calendar-day-${format(day, "d")}`}
                  >
                    {format(day, "d")}
                    {hasEv && !isSelected && (
                      <span className="absolute bottom-1 w-1 h-1 bg-amber-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <button
                onClick={() => setSelectedDate(null)}
                className="mt-3 w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Xem tất cả sự kiện
              </button>
            )}
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">
                {selectedDate
                  ? `Sự kiện ngày ${format(selectedDate, "d MMMM", { locale: vi })}`
                  : "Sự kiện sắp diễn ra"}
              </span>
              {!selectedDate && (
                <span className="ml-auto bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">
                  {filteredEvents.length} sự kiện
                </span>
              )}
            </div>

            <AnimatePresence mode="popLayout">
              {filteredEvents.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-muted-foreground"
                >
                  <CalendarDays size={40} className="mb-3 opacity-30" />
                  <p className="text-sm">Không có sự kiện nào vào ngày này</p>
                </motion.div>
              ) : (
                filteredEvents.map((event, i) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    whileHover={{ x: 4 }}
                    className="flex gap-4 p-4 bg-card rounded-2xl border border-card-border shadow-sm cursor-pointer group"
                    data-testid={`card-event-${event.id}`}
                  >
                    <div className="relative shrink-0 w-20 h-16 rounded-xl overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-white font-bold text-lg leading-none">
                          {format(event.date, "d")}
                        </span>
                        <span className="text-white/80 text-xs">
                          {format(event.date, "MMM", { locale: vi })}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                          {event.title}
                        </h4>
                        <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${event.categoryColor}`}>
                          {event.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-muted-foreground text-xs">
                        <MapPin size={11} />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-muted-foreground text-xs">
                        <Tag size={11} />
                        <span>
                          {format(event.date, "d MMM", { locale: vi })}
                          {!isSameDay(event.date, event.endDate) && ` — ${format(event.endDate, "d MMM", { locale: vi })}`}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
