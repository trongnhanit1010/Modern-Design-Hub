import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MapPin, Star, ChevronLeft, ChevronRight, Clock, Users, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const destinations = [
  {
    id: 1,
    name: "Bà Nà Hills",
    category: "KHU VUI CHƠI",
    location: "Đà Nẵng, Việt Nam",
    description: "Thiên đường giữa mây với cáp treo dài nhất thế giới và Cầu Vàng huyền thoại nâng đỡ bàn tay khổng lồ.",
    rating: 9.2,
    season: "Quanh năm",
    visitors: "3.2 triệu/năm",
    spots: "185 điểm tham quan",
    tags: ["CẦU VÀNG", "LÀNG PHÁP", "CÁP TREO KỶ LỤC"],
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Bãi biển Mỹ Khê",
    category: "BÃI BIỂN",
    location: "Đà Nẵng, Việt Nam",
    description: "Một trong 6 bãi biển quyến rũ nhất hành tinh theo Forbes. Cát trắng mịn trải dài hơn 30km.",
    rating: 9.5,
    season: "Tháng 3 – 8",
    visitors: "5 triệu/năm",
    spots: "96 điểm tham quan",
    tags: ["LƯỚT SÓNG", "THỂ THAO BIỂN", "HOÀNG HÔN"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Phố cổ Hội An",
    category: "DI SẢN UNESCO",
    location: "Đà Nẵng, Việt Nam",
    description: "Thành phố cổ kính với đèn lồng lung linh, hội tụ văn hóa Nhật – Hoa – Việt hơn 400 năm lịch sử.",
    rating: 9.7,
    season: "Tháng 2 – 4",
    visitors: "4.5 triệu/năm",
    spots: "210 điểm tham quan",
    tags: ["ĐÈN LỒNG", "RỪNG DỪA", "ẨM THỰC"],
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Ngũ Hành Sơn",
    category: "TÂM LINH",
    location: "Đà Nẵng, Việt Nam",
    description: "Quần thể 5 ngọn núi đá cẩm thạch huyền bí với hang động chứa chùa cổ và làng nghề điêu khắc.",
    rating: 8.9,
    season: "Quanh năm",
    visitors: "1.8 triệu/năm",
    spots: "74 điểm tham quan",
    tags: ["CHÙA LINH ỨNG", "HANG ĐỘNG", "ĐIÊU KHẮC ĐÁ"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Bán Đảo Sơn Trà",
    category: "THIÊN NHIÊN",
    location: "Đà Nẵng, Việt Nam",
    description: "Lá phổi xanh của thành phố với rừng nguyên sinh, voọc chà vá chân nâu và bãi biển hoang sơ.",
    rating: 9.1,
    season: "Quanh năm",
    visitors: "2.1 triệu/năm",
    spots: "58 điểm tham quan",
    tags: ["VOỌC CHÀ VÁ", "RỪNG NGUYÊN SINH", "BIỂN HOANG SƠ"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Làng Chài Nam Ô",
    category: "VĂN HÓA",
    location: "Đà Nẵng, Việt Nam",
    description: "Ngôi làng chài cổ hơn 600 năm tuổi với nghề làm nước mắm truyền thống và bãi đá san hô kỳ bí.",
    rating: 8.6,
    season: "Tháng 4 – 9",
    visitors: "0.5 triệu/năm",
    spots: "32 điểm tham quan",
    tags: ["NƯỚC MẮM", "BÃI ĐÁ", "VĂN HÓA CỔ"],
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop",
  },
];

const accordionDestinations = destinations.slice(0, 5);

const VISIBLE = 4;
const VISIBLE_MOBILE = 1;

function CarouselOption() {
  const isMobile = useIsMobile();
  const visible = isMobile ? VISIBLE_MOBILE : VISIBLE;
  const [current, setCurrent] = useState(0);
  const maxIndex = destinations.length - visible;

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(maxIndex, c + 1));

  return (
    <div className="relative px-6">
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: `calc(-${current * (100 / visible)}% - ${current * 16 / visible}px)` }}
          transition={{ type: "spring", stiffness: 300, damping: 36 }}
          style={{ width: `${(destinations.length / visible) * 100}%` }}
        >
          {destinations.map((dest) => (
            <motion.div
              key={dest.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="group cursor-pointer shrink-0 relative rounded-2xl overflow-hidden shadow-md"
              style={{ width: `${100 / destinations.length}%`, height: isMobile ? "360px" : "420px" }}
              data-testid={`card-destination-carousel-${dest.id}`}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="inline-block bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  {dest.category}
                </span>
                <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  <Star size={9} className="fill-white" />
                  {dest.rating}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-xl leading-tight mb-1">{dest.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <MapPin size={10} className="text-white/60 shrink-0" />
                  <span className="text-white/60 text-xs">{dest.location}</span>
                </div>
                <p className="text-white/70 text-xs leading-snug mb-3 line-clamp-3">{dest.description}</p>

                <div className="border-t border-white/20 pt-2.5 mb-2.5 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-white/70 text-xs">
                    <Clock size={11} className="shrink-0" />
                    <span>{dest.season}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/70 text-xs">
                    <Users size={11} className="shrink-0" />
                    <span>{dest.visitors}</span>
                  </div>
                </div>

                <p className="text-amber-400 text-[10px] font-semibold tracking-wide leading-snug">
                  {dest.tags.join(" • ")}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <button
        onClick={prev}
        disabled={current === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-25 disabled:cursor-not-allowed"
        data-testid="button-carousel-prev"
      >
        <ChevronLeft size={17} />
      </button>
      <button
        onClick={next}
        disabled={current >= maxIndex}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-25 disabled:cursor-not-allowed"
        data-testid="button-carousel-next"
      >
        <ChevronRight size={17} />
      </button>
    </div>
  );
}

function AccordionOption() {
  const [active, setActive] = useState<number>(3);

  return (
    <div className="flex gap-2 h-[460px]">
      {accordionDestinations.map((dest) => {
        const isActive = active === dest.id;
        return (
          <motion.div
            key={dest.id}
            layout
            animate={{ flex: isActive ? 5 : 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            onClick={() => setActive(dest.id)}
            className="relative rounded-2xl overflow-hidden cursor-pointer min-w-0"
            data-testid={`card-destination-accordion-${dest.id}`}
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

            {isActive ? (
              <motion.div
                key="active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute inset-0 p-6 flex flex-col justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    <MapPin size={9} /> {dest.category}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                    <Star size={9} className="fill-white" /> {dest.rating}
                  </span>
                </div>

                <div>
                  <h3 className="text-white font-bold text-3xl leading-tight mb-2">{dest.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">{dest.description}</p>

                  <div className="flex items-center gap-4 mb-3 text-white/70 text-xs">
                    <span className="flex items-center gap-1.5"><Clock size={12} />{dest.season}</span>
                    <span className="flex items-center gap-1.5"><Users size={12} />{dest.visitors}</span>
                    <span className="text-white/50">{dest.spots}</span>
                  </div>

                  <p className="text-amber-400 text-[10px] font-semibold tracking-wide mb-5">
                    {dest.tags.join(" • ")}
                  </p>

                  <button className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
                    Khám phá ngay <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex flex-col items-center justify-between py-5"
              >
                <div />
                <span
                  className="text-white font-semibold text-sm whitespace-nowrap"
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                >
                  {dest.name}
                </span>
                <MapPin size={16} className="text-white/60" />
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function MobileList() {
  return (
    <div className="flex flex-col gap-3">
      {destinations.map((dest, i) => (
        <motion.div
          key={dest.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
          className="flex gap-3 rounded-2xl overflow-hidden bg-card shadow-sm border border-border/50 cursor-pointer group active:scale-[0.99] transition-transform"
          data-testid={`card-destination-mobile-${dest.id}`}
        >
          <div className="w-28 shrink-0 relative overflow-hidden" style={{ height: "5.5rem" }}>
            <img
              src={dest.image}
              alt={dest.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center py-2.5 pr-3 flex-1 min-w-0">
            <p className="text-[10px] font-bold text-primary tracking-wide mb-0.5">{dest.category}</p>
            <h3 className="font-bold text-sm text-foreground leading-snug line-clamp-1">{dest.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-0.5">
                <Star size={10} className="fill-amber-400 text-amber-400" />
                <span className="text-xs font-semibold text-amber-600">{dest.rating}</span>
              </span>
              <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                <Clock size={10} className="shrink-0" />
                {dest.season}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">{dest.tags.join(" · ")}</p>
          </div>
          <div className="flex items-center pr-3 shrink-0">
            <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function WhereToGo() {
  const [option, setOption] = useState<"A" | "B">("B");
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 px-4 bg-white dark:bg-card" ref={ref} data-testid="section-where-to-go">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Where do you want to go?</h2>
            <p className="text-muted-foreground text-sm mt-1">Bạn muốn đến đâu?</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Option toggle: desktop only */}
            {!isMobile && (
              <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                <button
                  onClick={() => setOption("A")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "A" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
                  data-testid="button-whereto-option-a"
                >
                  Carousel
                </button>
                <button
                  onClick={() => setOption("B")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "B" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
                  data-testid="button-whereto-option-b"
                >
                  Accordion
                </button>
              </div>
            )}
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md"
            >
              Xem tất cả <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {isMobile ? (
            <MobileList />
          ) : (
            <AnimatePresence mode="wait">
              {option === "A" ? (
                <motion.div key="carousel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <CarouselOption />
                </motion.div>
              ) : (
                <motion.div key="accordion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <AccordionOption />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
}
