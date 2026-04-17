import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const hotels = [
  {
    id: 1,
    name: "InterContinental Danang Sun Peninsula",
    location: "Bãi Bắc, Bán đảo Sơn Trà, Đà Nẵng",
    stars: 5,
    rating: 9.6,
    ratingLabel: "Xuất sắc",
    price: "5.800.000",
    badge: "SANG TRỌNG BẬC NHẤT",
    badgeGradient: "from-orange-400 to-amber-500",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Furama Resort Danang",
    location: "Khuê Mỹ, Ngũ Hành Sơn, Đà Nẵng",
    stars: 5,
    rating: 9.4,
    ratingLabel: "Tuyệt vời",
    price: "3.200.000",
    badge: "GẦN BIỂN",
    badgeGradient: "from-teal-400 to-cyan-500",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=700&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Hyatt Regency Danang",
    location: "Đường Trường Sa, Ngũ Hành Sơn",
    stars: 5,
    rating: 9.2,
    ratingLabel: "Tuyệt vời",
    price: "2.900.000",
    badge: "ƯU ĐÃI HÔM NAY",
    badgeGradient: "from-rose-500 to-orange-500",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Naman Retreat",
    location: "Đường Trường Sa, Đà Nẵng",
    stars: 5,
    rating: 9.3,
    ratingLabel: "Tuyệt vời",
    price: "4.100.000",
    badge: "ECO RESORT",
    badgeGradient: "from-green-500 to-emerald-600",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=700&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Crowne Plaza Danang Hotel & Resort",
    location: "Mỹ Khê, Sơn Trà, Đà Nẵng",
    stars: 5,
    rating: 9.0,
    ratingLabel: "Tuyệt vời",
    price: "2.500.000",
    badge: "GẦN BIỂN",
    badgeGradient: "from-teal-400 to-cyan-500",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=700&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "La Siesta Hoi An Resort & Spa",
    location: "Hội An, Quảng Nam",
    stars: 5,
    rating: 9.5,
    ratingLabel: "Xuất sắc",
    price: "3.600.000",
    badge: "SANG TRỌNG BẬC NHẤT",
    badgeGradient: "from-orange-400 to-amber-500",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=700&auto=format&fit=crop",
  },
];

export default function HotelsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start", slidesToScroll: 1 });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 px-4 bg-background" ref={ref} id="hotels" data-testid="section-hotels">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Khách sạn nổi bật</h2>
            <p className="text-muted-foreground text-sm mt-1">Lựa chọn chỗ lưu trú hoàn hảo cho chuyến đi</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className="p-2.5 rounded-full bg-muted hover:bg-primary hover:text-white border border-border transition-colors"
              data-testid="button-hotels-prev"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="p-2.5 rounded-full bg-muted hover:bg-primary hover:text-white border border-border transition-colors"
              data-testid="button-hotels-next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {hotels.map((hotel, i) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.12)" }}
                  className="shrink-0 w-[260px] rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm cursor-pointer group"
                  data-testid={`card-hotel-${hotel.id}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className={`absolute top-3 left-3 bg-gradient-to-r ${hotel.badgeGradient} text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wide shadow`}>
                      {hotel.badge}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-sm text-gray-900 leading-tight flex-1 line-clamp-2">
                        {hotel.name}
                      </h3>
                      <div className="shrink-0 bg-blue-600 text-white rounded-lg px-2 py-1 text-center min-w-[48px]">
                        <p className="text-sm font-bold leading-tight">{hotel.rating}</p>
                        <p className="text-[9px] leading-tight opacity-90">{hotel.ratingLabel}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-2.5">
                      <MapPin size={11} className="shrink-0" />
                      <span className="line-clamp-1">{hotel.location}</span>
                    </div>

                    <div className="flex items-center gap-0.5 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} className={i < hotel.stars ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-xs">Giá từ</p>
                        <p className="text-gray-900 font-bold text-sm">{hotel.price}đ<span className="text-gray-400 font-normal text-xs">/đêm</span></p>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors">
                        Đặt ngay
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
