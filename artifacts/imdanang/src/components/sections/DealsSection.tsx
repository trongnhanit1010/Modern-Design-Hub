import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Clock, Star, ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const deals = [
  { id: 1, destination: "Bà Nà Hills", tagline: "Thiên đường trên mây", totalPrice: "$299", originalPrice: "$399", days: "03 ngày", flatColor: "bg-blue-600", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop", thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&auto=format&fit=crop", badge: "Best Seller", badgeColor: "bg-amber-400", rating: 4.9 },
  { id: 2, destination: "Hội An", tagline: "Phố cổ huyền bí đầy sắc màu", totalPrice: "$599", originalPrice: "$799", days: "07 ngày", flatColor: "bg-amber-500", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop", thumb: "https://images.unsplash.com/photo-1548013146-72479768bada?w=200&auto=format&fit=crop", badge: "07 Days Deal", badgeColor: "bg-blue-500", rating: 4.8 },
  { id: 3, destination: "Đảo Lý Sơn", tagline: "Maldives của Việt Nam", totalPrice: "$398", originalPrice: "$520", days: "04 ngày", flatColor: "bg-teal-600", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop", thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop", badge: "Hot Deal", badgeColor: "bg-pink-500", rating: 4.7 },
  { id: 4, destination: "Đà Nẵng City", tagline: "Thành phố biển hiện đại", totalPrice: "$189", originalPrice: "$250", days: "02 ngày", flatColor: "bg-violet-600", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop", thumb: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=200&auto=format&fit=crop", badge: "Weekend", badgeColor: "bg-violet-500", rating: 4.8 },
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
                <motion.div key={deal.id} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.4 }} className="shrink-0 w-72 md:w-80" data-testid={`card-deal-${deal.id}`}>
                  <AnimatePresence mode="wait">
                    {subMode === "color" ? (
                      <motion.div key="color" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className={`rounded-2xl overflow-hidden h-44 ${deal.flatColor} relative`}>
                        <div className="absolute top-3 right-3 w-20 h-20 rounded-2xl overflow-hidden shadow-xl border-2 border-white/30">
                          <img src={deal.thumb} alt={deal.destination} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 p-5 flex flex-col justify-between pr-28">
                          <div>
                            <span className="inline-block bg-white/25 text-white text-xs px-2.5 py-0.5 rounded-full font-medium mb-2">{deal.badge}</span>
                            <h3 className="text-white font-bold text-lg leading-snug">{deal.destination}</h3>
                            <p className="text-white/70 text-xs mt-0.5">{deal.tagline}</p>
                          </div>
                          <div className="flex items-end justify-between">
                            <div>
                              <p className="text-white/60 text-xs">Từ</p>
                              <p className="text-white text-2xl font-bold">{deal.totalPrice}</p>
                              <p className="text-white/40 text-xs line-through">{deal.originalPrice}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-white/60 text-xs mb-1.5"><Clock size={10} />{deal.days}</div>
                              <button className="bg-white/25 hover:bg-white/40 text-white text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">Đặt <ArrowRight size={10} /></button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="relative rounded-2xl overflow-hidden h-44 group cursor-pointer">
                        <img src={deal.image} alt={deal.destination} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className={`inline-block ${deal.badgeColor} text-white text-xs px-2.5 py-0.5 rounded-full font-medium`}>{deal.badge}</span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-center gap-1.5 mb-0.5"><MapPin size={10} className="text-white/60" /><span className="text-white/60 text-xs">{deal.destination}</span></div>
                          <h3 className="text-white font-bold text-sm">{deal.tagline}</h3>
                          <div className="flex items-center justify-between mt-1.5">
                            <p className="text-white font-bold">{deal.totalPrice}<span className="text-xs font-normal text-white/60">/pp</span></p>
                            <div className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400" /><span className="text-amber-400 text-xs font-semibold">{deal.rating}</span></div>
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
