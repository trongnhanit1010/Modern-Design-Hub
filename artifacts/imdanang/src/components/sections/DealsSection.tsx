import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Clock, Star, ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const deals = [
  {
    id: 1,
    destination: "Bà Nà Hills",
    tagline: "Thiên đường trên mây",
    totalPrice: "$299",
    originalPrice: "$399",
    days: "03 ngày",
    nights: "02 đêm",
    gradient: "from-blue-600 via-blue-500 to-cyan-500",
    flatColor: "bg-blue-600",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop",
    badge: "Best Seller",
    badgeColor: "bg-amber-400",
    rating: 4.9,
  },
  {
    id: 2,
    destination: "Hội An",
    tagline: "Phố cổ huyền bí đầy sắc màu",
    totalPrice: "$599",
    originalPrice: "$799",
    days: "07 ngày",
    nights: "05 đêm",
    gradient: "from-amber-500 via-orange-400 to-pink-500",
    flatColor: "bg-amber-500",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop",
    badge: "07 Days Deal",
    badgeColor: "bg-blue-500",
    rating: 4.8,
  },
  {
    id: 3,
    destination: "Đảo Lý Sơn",
    tagline: "Maldives của Việt Nam",
    totalPrice: "$398",
    originalPrice: "$520",
    days: "04 ngày",
    nights: "03 đêm",
    gradient: "from-teal-600 via-emerald-500 to-cyan-400",
    flatColor: "bg-teal-600",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop",
    badge: "Hot Deal",
    badgeColor: "bg-pink-500",
    rating: 4.7,
  },
  {
    id: 4,
    destination: "Đà Nẵng City",
    tagline: "Thành phố biển hiện đại",
    totalPrice: "$189",
    originalPrice: "$250",
    days: "02 ngày",
    nights: "01 đêm",
    gradient: "from-violet-600 via-purple-500 to-indigo-500",
    flatColor: "bg-violet-600",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop",
    badge: "Weekend",
    badgeColor: "bg-violet-500",
    rating: 4.8,
  },
];

function GradientCards({ isInView }: { isInView: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {deals.slice(0, 3).map((deal, i) => (
        <motion.div
          key={deal.id}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className={`relative rounded-3xl p-6 bg-gradient-to-br ${deal.gradient} overflow-hidden cursor-pointer shadow-lg`}
          data-testid={`card-deal-color-${deal.id}`}
        >
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)" }} />
          <div className="relative z-10">
            <span className={`inline-block ${deal.badgeColor} text-white text-xs px-3 py-1 rounded-full font-medium mb-4`}>{deal.badge}</span>
            <h3 className="text-white font-bold text-2xl mb-1">{deal.destination}</h3>
            <p className="text-white/80 text-sm mb-5">{deal.tagline}</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white/60 text-xs">Total Price</p>
                <p className="text-white text-3xl font-bold">{deal.totalPrice}</p>
                <p className="text-white/50 text-xs line-through">{deal.originalPrice}</p>
              </div>
              <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
                <Clock size={12} className="text-white/80" />
                <span className="text-white/90 text-xs">{deal.days}, {deal.nights}</span>
              </div>
            </div>
            <button className="mt-5 w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
              Đặt ngay <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ImageCards({ isInView }: { isInView: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {deals.slice(0, 3).map((deal, i) => (
        <motion.div
          key={deal.id}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="relative rounded-3xl overflow-hidden cursor-pointer shadow-lg group h-72"
          data-testid={`card-deal-img-${deal.id}`}
        >
          <img src={deal.image} alt={deal.destination} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className={`inline-block ${deal.badgeColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>{deal.badge}</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-white font-bold text-xl mb-0.5">{deal.destination}</h3>
            <p className="text-white/70 text-sm mb-3">{deal.tagline}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs">Total Price</p>
                <p className="text-white text-2xl font-bold">{deal.totalPrice}<span className="text-base font-normal">/pp</span></p>
              </div>
              <button className="bg-white text-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors flex items-center gap-1.5">
                <Star size={13} className="text-amber-500 fill-amber-500" />
                Book Now
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CarouselCards({ isInView, subMode }: { isInView: boolean; subMode: "color" | "image" }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
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
              data-testid={`card-deal-carousel-${deal.id}`}
            >
              {subMode === "color" ? (
                <div className={`rounded-2xl overflow-hidden h-52 ${deal.flatColor} flex flex-col`}>
                  <div className="flex-1 flex items-center px-5 pt-5">
                    <div>
                      <span className="inline-block bg-white/25 text-white text-xs px-2.5 py-0.5 rounded-full font-medium mb-2">{deal.badge}</span>
                      <h3 className="text-white font-bold text-xl">{deal.destination}</h3>
                      <p className="text-white/75 text-sm mt-0.5">{deal.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-5 pb-5 mt-2">
                    <div>
                      <p className="text-white/60 text-xs">Từ</p>
                      <p className="text-white text-2xl font-bold">{deal.totalPrice}</p>
                      <p className="text-white/40 text-xs line-through">{deal.originalPrice}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-white/70 text-xs mb-1">
                        <Clock size={11} />
                        {deal.days}
                      </div>
                      <button className="bg-white/25 hover:bg-white/40 text-white text-xs px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                        Đặt <ArrowRight size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden h-52 group cursor-pointer">
                  <img src={deal.image} alt={deal.destination} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-block ${deal.badgeColor} text-white text-xs px-2.5 py-0.5 rounded-full font-medium`}>{deal.badge}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <MapPin size={10} className="text-white/60" />
                      <span className="text-white/60 text-xs">{deal.destination}</span>
                    </div>
                    <h3 className="text-white font-bold text-base">{deal.tagline}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-white font-bold text-lg">{deal.totalPrice}<span className="text-xs font-normal text-white/60">/pp</span></p>
                      <div className="flex items-center gap-1">
                        <Star size={11} className="text-amber-400 fill-amber-400" />
                        <span className="text-amber-400 text-xs font-semibold">{deal.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <button onClick={scrollPrev} className="absolute -left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white shadow-lg border border-border hover:bg-muted transition-colors z-10">
        <ChevronLeft size={18} />
      </button>
      <button onClick={scrollNext} className="absolute -right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white shadow-lg border border-border hover:bg-muted transition-colors z-10">
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default function DealsSection() {
  const [option, setOption] = useState<"A" | "B" | "C">("A");
  const [carouselSub, setCarouselSub] = useState<"color" | "image">("color");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 px-4 bg-background" ref={ref} data-testid="section-deals">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Deals for You</h2>
            <p className="text-muted-foreground text-sm mt-1">Ưu đãi đặc biệt dành cho bạn</p>
          </div>
          <div className="flex items-center gap-2 bg-muted rounded-full p-1">
            <button
              onClick={() => setOption("A")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "A" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
              data-testid="button-deals-option-a"
            >
              Colors
            </button>
            <button
              onClick={() => setOption("B")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "B" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
              data-testid="button-deals-option-b"
            >
              Images
            </button>
            <button
              onClick={() => setOption("C")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "C" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
              data-testid="button-deals-option-c"
            >
              Carousel
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {option === "A" && (
            <motion.div key="A" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
              <GradientCards isInView={isInView} />
            </motion.div>
          )}
          {option === "B" && (
            <motion.div key="B" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
              <ImageCards isInView={isInView} />
            </motion.div>
          )}
          {option === "C" && (
            <motion.div key="C" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-1.5 bg-muted rounded-full p-1">
                  <button
                    onClick={() => setCarouselSub("color")}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${carouselSub === "color" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
                    data-testid="button-deals-carousel-color"
                  >
                    Màu sắc
                  </button>
                  <button
                    onClick={() => setCarouselSub("image")}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${carouselSub === "image" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
                    data-testid="button-deals-carousel-image"
                  >
                    Hình ảnh
                  </button>
                </div>
              </div>
              <CarouselCards isInView={isInView} subMode={carouselSub} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
