import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Clock, Star, ArrowRight, ChevronLeft, ChevronRight, MapPin, CheckCircle } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const deals = [
  {
    id: 1,
    title: "Combo Bà Nà Hills 2 Ngày",
    price: "1.299.000đ/người",
    gradient: "from-violet-600 to-fuchsia-500",
    days: "02 Ngày, 01 Đêm",
    include: "*Bao gồm vé cáp treo & buffet trưa",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&auto=format&fit=crop",
    rating: 4.9,
    badge: "HOT DEAL",
    badgeColor: "bg-pink-500",
    tagline: "Thiên đường trên mây",
    destination: "Bà Nà Hills",
  },
  {
    id: 2,
    title: "Nghỉ Dưỡng Mỹ Khê 3N2Đ",
    price: "2.499.000đ/phòng",
    gradient: "from-teal-500 to-cyan-400",
    days: "03 Ngày, 02 Đêm",
    include: "*Dành cho 2 người lớn, ăn sáng",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop",
    rating: 4.8,
    badge: "HOT DEAL",
    badgeColor: "bg-teal-600",
    tagline: "Nghỉ dưỡng view biển",
    destination: "Mỹ Khê",
  },
  {
    id: 3,
    title: "Du Thuyền Sông Hàn",
    price: "350.000đ/người",
    gradient: "from-orange-500 to-amber-400",
    days: "120 Phút",
    include: "*Kèm cocktail và đồ ăn nhẹ",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&auto=format&fit=crop",
    rating: 4.7,
    badge: "HOT DEAL",
    badgeColor: "bg-orange-600",
    tagline: "Trải nghiệm sông Hàn về đêm",
    destination: "Sông Hàn",
  },
  {
    id: 4,
    title: "Tour Hội An – Phố Cổ",
    price: "450.000đ/người",
    gradient: "from-rose-500 to-pink-400",
    days: "01 Ngày",
    include: "*Bao gồm hướng dẫn viên & vé tham quan",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1548013146-72479768bada?w=200&auto=format&fit=crop",
    rating: 4.9,
    badge: "HOT DEAL",
    badgeColor: "bg-rose-600",
    tagline: "Di sản văn hóa thế giới",
    destination: "Hội An",
  },
];

export default function DealsSection() {
  const [subMode, setSubMode] = useState<"color" | "image">("color");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-12 px-4 bg-background" ref={ref} data-testid="section-deals">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Deals for You</h2>
            <p className="text-muted-foreground text-sm mt-1">Ưu đãi đặc biệt dành cho bạn</p>
          </div>
          <div className="flex items-center gap-2 bg-muted rounded-full p-1">
            <button onClick={() => setSubMode("color")} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${subMode === "color" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`} data-testid="button-deals-option-a">Màu sắc</button>
            <button onClick={() => setSubMode("image")} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${subMode === "image" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`} data-testid="button-deals-option-b">Hình ảnh</button>
          </div>
        </div>

        <div className="relative" data-testid="deals-carousel">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {deals.map((deal, i) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="shrink-0 w-72 md:w-80"
                  data-testid={`card-deal-${deal.id}`}
                >
                  <AnimatePresence mode="wait">
                    {subMode === "color" ? (
                      <motion.div
                        key="color"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`rounded-2xl overflow-hidden h-48 bg-gradient-to-br ${deal.gradient} relative cursor-pointer`}
                      >
                        <div className="absolute top-4 right-4 w-[72px] h-[72px] rounded-xl overflow-hidden shadow-lg border-2 border-white/30 shrink-0">
                          <img src={deal.thumb} alt={deal.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="absolute inset-0 p-4 pr-24 flex flex-col justify-between">
                          <div>
                            <span className="inline-block bg-white/25 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-2 tracking-wide">{deal.badge}</span>
                            <h3 className="text-white font-bold text-base leading-snug line-clamp-2">{deal.title}</h3>
                            <p className="text-white font-bold text-lg mt-1">{deal.price}</p>
                          </div>

                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-white/80 text-xs">
                              <Clock size={11} className="shrink-0" />
                              <span>{deal.days}</span>
                            </div>
                            <div className="flex items-start gap-1.5 text-white/80 text-xs">
                              <CheckCircle size={11} className="shrink-0 mt-0.5" />
                              <span className="leading-tight">{deal.include}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative rounded-2xl overflow-hidden h-48 group cursor-pointer"
                      >
                        <img src={deal.image} alt={deal.destination} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className={`inline-block ${deal.badgeColor} text-white text-xs px-2.5 py-0.5 rounded-full font-medium`}>{deal.badge}</span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <MapPin size={10} className="text-white/60" />
                            <span className="text-white/60 text-xs">{deal.destination}</span>
                          </div>
                          <h3 className="text-white font-bold text-sm">{deal.tagline}</h3>
                          <div className="flex items-center justify-between mt-1.5">
                            <p className="text-white font-bold">{deal.price}</p>
                            <div className="flex items-center gap-1">
                              <Star size={11} className="text-amber-400 fill-amber-400" />
                              <span className="text-amber-400 text-xs font-semibold">{deal.rating}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
          <button onClick={scrollPrev} className="absolute -left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white shadow-lg border border-border hover:bg-muted transition-colors z-10"><ChevronLeft size={18} /></button>
          <button onClick={scrollNext} className="absolute -right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white shadow-lg border border-border hover:bg-muted transition-colors z-10"><ChevronRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}
