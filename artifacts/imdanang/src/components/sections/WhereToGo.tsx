import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MapPin, Eye, Star, ChevronLeft, ChevronRight } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Crowne Plaza Danang",
    location: "Mỹ Khê Beach",
    listings: "41 Listing",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Grand Tourane Hotel",
    location: "City Center",
    listings: "35 Listing",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Happy Day Riverside",
    location: "Hàn River",
    listings: "27 Listing",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Moonlight Hotel",
    location: "Dragon Bridge",
    listings: "19 Listing",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "La Siesta Hoi An",
    location: "Hội An Ancient Town",
    listings: "42 Listing",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Brilliant Hotel",
    location: "Bạch Đằng Street",
    listings: "33 Listing",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "KOI Resort Da Nang",
    location: "Ngũ Hành Sơn",
    listings: "28 Listing",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Vinpearl Resort",
    location: "Non Nước Beach",
    listings: "52 Listing",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&auto=format&fit=crop",
  },
];

const accordionDestinations = [
  { id: 1, name: "Đà Nẵng", listings: "128 Listing", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&auto=format&fit=crop" },
  { id: 2, name: "Hội An", listings: "85 Listing", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop" },
  { id: 3, name: "Bà Nà Hills", listings: "42 Listing", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop" },
  { id: 4, name: "Non Nước", listings: "56 Listing", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop" },
  { id: 5, name: "Lăng Cô", listings: "29 Listing", image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&auto=format&fit=crop" },
];

const VISIBLE = 3;

function CarouselOption() {
  const [current, setCurrent] = useState(0);
  const maxIndex = destinations.length - VISIBLE;

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(maxIndex, c + 1));

  return (
    <div className="relative px-2">
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-5"
          animate={{ x: `calc(-${current * (100 / VISIBLE)}% - ${current * 20 / VISIBLE}px)` }}
          transition={{ type: "spring", stiffness: 300, damping: 36 }}
          style={{ width: `${(destinations.length / VISIBLE) * 100}%` }}
        >
          {destinations.map((dest) => (
            <motion.div
              key={dest.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="group cursor-pointer shrink-0 rounded-3xl overflow-hidden shadow-md bg-white border border-gray-100"
              style={{ width: `${100 / destinations.length}%` }}
              data-testid={`card-destination-carousel-${dest.id}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3">
                  <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                    <Star size={10} className="text-amber-400 fill-amber-400" />
                    {dest.rating}
                  </span>
                </div>
                <motion.div
                  className="absolute bottom-3 left-0 right-0 flex justify-center"
                  initial={{ opacity: 0, y: 8 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  <span className="bg-blue-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Eye size={11} /> Xem ngay
                  </span>
                </motion.div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1.5 line-clamp-1">{dest.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <MapPin size={11} className="text-blue-400 shrink-0" />
                  <span className="text-xs text-gray-500 line-clamp-1">{dest.location}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{dest.listings}</span>
                  <span className="text-xs font-semibold text-blue-500 group-hover:text-blue-600 transition-colors">Đặt ngay →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <button
        onClick={prev}
        disabled={current === 0}
        className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-1 z-10 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all disabled:opacity-25 disabled:cursor-not-allowed"
        data-testid="button-carousel-prev"
      >
        <ChevronLeft size={17} />
      </button>
      <button
        onClick={next}
        disabled={current >= maxIndex}
        className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-1 z-10 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all disabled:opacity-25 disabled:cursor-not-allowed"
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
    <div className="flex gap-2 h-[480px]">
      {accordionDestinations.map((dest) => {
        const isActive = active === dest.id;
        return (
          <motion.div
            key={dest.id}
            layout
            animate={{ flex: isActive ? 4 : 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            onClick={() => setActive(dest.id)}
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            data-testid={`card-destination-accordion-${dest.id}`}
          >
            <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {isActive ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-0 left-0 right-0 p-6"
              >
                <h3 className="text-white font-serif font-bold text-3xl mb-1">{dest.name}</h3>
                <p className="text-white/70 text-sm mb-4">{dest.listings}</p>
                <button className="flex items-center gap-2 bg-white text-foreground px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-50 transition-colors">
                  <Eye size={14} /> Book Now
                </button>
              </motion.div>
            ) : (
              <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center">
                <span
                  className="text-white font-semibold text-sm whitespace-nowrap"
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                >
                  {dest.name}
                </span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function WhereToGo() {
  const [option, setOption] = useState<"A" | "B">("B");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 px-4 bg-white dark:bg-card" ref={ref} data-testid="section-where-to-go">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Where do you want to go?</h2>
            <p className="text-muted-foreground text-sm mt-1">Bạn muốn đến đâu?</p>
          </div>
          <div className="flex items-center gap-3">
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
            <a href="#" className="text-primary text-sm font-medium hover:underline">View all</a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
