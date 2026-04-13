import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Star, MapPin, ChevronLeft, ChevronRight, Wifi, Coffee, Waves } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const hotels = [
  {
    id: 1,
    name: "Crowne Plaza Danang Hotel & Resort",
    location: "Mỹ Khê, Sơn Trà",
    stars: 5,
    rating: 9.4,
    price: "$285",
    badge: "Luxury",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&auto=format&fit=crop",
    amenities: [Wifi, Coffee, Waves],
  },
  {
    id: 2,
    name: "Grand Tourane Hotel Da Nang",
    location: "Ngũ Hành Sơn",
    stars: 4,
    rating: 8.8,
    price: "$145",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop",
    amenities: [Wifi, Coffee],
  },
  {
    id: 3,
    name: "Happy Day Riverside Hotel & Spa",
    location: "Hải Châu, Hàn River",
    stars: 4,
    rating: 8.5,
    price: "$120",
    badge: "Best Value",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop",
    amenities: [Wifi, Waves],
  },
  {
    id: 4,
    name: "Moonlight Hotel & Suites",
    location: "Hải Châu, City Center",
    stars: 5,
    rating: 9.1,
    price: "$210",
    badge: "Highly Rated",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop",
    amenities: [Wifi, Coffee, Waves],
  },
  {
    id: 5,
    name: "La Siesta Hoi An Resort & Spa",
    location: "Hội An Ancient Town",
    stars: 5,
    rating: 9.6,
    price: "$320",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop",
    amenities: [Wifi, Coffee, Waves],
  },
  {
    id: 6,
    name: "KOI Resort & Residence",
    location: "Ngũ Hành Sơn, Da Nang",
    stars: 5,
    rating: 9.2,
    price: "$260",
    badge: "Spa Included",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&auto=format&fit=crop",
    amenities: [Wifi, Coffee, Waves],
  },
];

const badgeColors: Record<string, string> = {
  Luxury: "bg-amber-500",
  Popular: "bg-blue-500",
  "Best Value": "bg-green-500",
  "Highly Rated": "bg-purple-500",
  Premium: "bg-rose-500",
  "Spa Included": "bg-teal-500",
};

export default function HotelsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 px-4 bg-white" ref={ref} id="hotels" data-testid="section-hotels">
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
            <div className="flex gap-5">
              {hotels.map((hotel) => (
                <motion.div
                  key={hotel.id}
                  whileHover={{ y: -5 }}
                  className="relative shrink-0 w-72 rounded-2xl overflow-hidden bg-card border border-card-border shadow-sm cursor-pointer group"
                  data-testid={`card-hotel-${hotel.id}`}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    <span className={`absolute top-3 left-3 ${badgeColors[hotel.badge] || "bg-gray-500"} text-white text-xs px-2.5 py-1 rounded-full font-medium`}>
                      {hotel.badge}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm text-foreground leading-tight line-clamp-2 mb-1.5">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
                      <MapPin size={11} />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < hotel.stars ? "text-amber-400 fill-amber-400" : "text-muted"}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 mb-3">
                      {hotel.amenities.map((Icon, i) => (
                        <Icon key={i} size={14} className="text-muted-foreground" />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-muted-foreground text-xs">Từ </span>
                        <span className="text-primary font-bold text-lg">{hotel.price}</span>
                        <span className="text-muted-foreground text-xs"> /đêm</span>
                      </div>
                      <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-lg">
                        <Star size={11} className="fill-primary" />
                        <span className="text-xs font-bold">{hotel.rating}</span>
                      </div>
                    </div>
                    <button className="mt-3 w-full bg-primary text-white py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                      Đặt ngay
                    </button>
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
