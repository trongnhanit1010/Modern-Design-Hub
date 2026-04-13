import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MapPin, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { format, isSameDay } from "date-fns";
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

export default function EventCalendar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<number>(events[0].id);
  const [paused, setPaused] = useState(false);

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
    if (paused) return;
    const timer = setInterval(goNext, 8000);
    return () => clearInterval(timer);
  }, [paused, goNext]);

  return (
    <section className="py-12 px-4 bg-background" ref={ref} id="events" data-testid="section-events">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Lịch sự kiện</h2>
            <p className="text-muted-foreground text-sm mt-1">Các sự kiện nổi bật tại Đà Nẵng</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
              Xem tất cả lịch <ArrowRight size={14} />
            </a>
            <div className="flex items-center gap-2 bg-muted rounded-full p-1">
              <button onClick={goPrev} className="p-1.5 rounded-full hover:bg-gray-200 transition-colors" data-testid="button-events-prev">
                <ChevronLeft size={16} className="text-foreground" />
              </button>
              <span className="text-sm text-muted-foreground font-medium tabular-nums px-1">{activeIndex + 1} / {events.length}</span>
              <button onClick={goNext} className="p-1.5 rounded-full hover:bg-gray-200 transition-colors" data-testid="button-events-next">
                <ChevronRight size={16} className="text-foreground" />
              </button>
            </div>
          </div>
        </div>

        <div
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
        </div>
      </div>
    </section>
  );
}
