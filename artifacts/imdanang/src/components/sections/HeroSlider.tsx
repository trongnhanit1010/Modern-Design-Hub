import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, MapPin, Utensils, Hotel, X } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1600&auto=format&fit=crop",
    title: "Explore Da Nang",
    subtitle: "Discover joy anywhere, anytime - from great coastal trips to adventures all around the world",
    location: "Bãi biển Mỹ Khê, Đà Nẵng",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop",
    title: "Núi Bà Nà",
    subtitle: "Khám phá thiên đường mây trắng trên đỉnh núi hùng vĩ, nơi hội tụ kỳ quan thiên nhiên",
    location: "Bà Nà Hills, Đà Nẵng",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&auto=format&fit=crop",
    title: "Hội An Cổ Kính",
    subtitle: "Dạo bước qua phố cổ huyền bí với những chiếc đèn lồng rực rỡ sắc màu",
    location: "Phố Cổ Hội An, Quảng Nam",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1600&auto=format&fit=crop",
    title: "Hoàng Hôn Biển",
    subtitle: "Chiêm ngưỡng vẻ đẹp kỳ diệu của bầu trời hoàng hôn rực rỡ trên bãi biển",
    location: "Bãi Biển Non Nước, Đà Nẵng",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&auto=format&fit=crop",
    title: "Thiên Đường Xanh",
    subtitle: "Tận hưởng khoảnh khắc bình yên giữa đại ngàn xanh mướt của núi rừng Việt Nam",
    location: "Vườn Quốc Gia Bạch Mã",
  },
];

const suggestions = [
  { icon: MapPin, label: "Bà Nà Hills", sub: "Địa điểm tham quan · Đà Nẵng", type: "place" },
  { icon: MapPin, label: "Bãi biển Mỹ Khê", sub: "Bãi biển · Đà Nẵng", type: "place" },
  { icon: Hotel, label: "Crowne Plaza Danang", sub: "Resort 5 sao · Sơn Trà", type: "hotel" },
  { icon: Utensils, label: "Nhà hàng Trần", sub: "Hải sản tươi sống · Hải Châu", type: "restaurant" },
  { icon: MapPin, label: "Phố cổ Hội An", sub: "Di sản UNESCO · Quảng Nam", type: "place" },
  { icon: Hotel, label: "La Siesta Hoi An Resort", sub: "Resort 5 sao · Hội An", type: "hotel" },
];

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: EASE_OUT },
  }),
  exit: { opacity: 0, y: -15, transition: { duration: 0.3 } },
};

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
    setProgress(0);
  }, []);

  const prev = () => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { next(); return 0; }
        return p + 0.5;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [paused, next]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = searchVal
    ? suggestions.filter((s) => s.label.toLowerCase().includes(searchVal.toLowerCase()))
    : suggestions;

  return (
    <section
      className="relative h-[88vh] min-h-[560px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      data-testid="section-hero"
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/75" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col justify-end pb-28 px-6 md:px-20 lg:px-28">
        <AnimatePresence mode="wait">
          <div key={current} className="max-w-2xl">
            <motion.div
              custom={0}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-white/90 text-sm mb-4"
            >
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              {slides[current].location}
            </motion.div>

            <motion.h1
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
            >
              {slides[current].title}
            </motion.h1>

            <motion.p
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-white/80 text-base md:text-lg max-w-xl leading-relaxed"
            >
              {slides[current].subtitle}
            </motion.p>
          </div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 max-w-2xl"
          ref={searchRef}
        >
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-2 shadow-2xl">
            <Search className="ml-2 text-white/60" size={18} />
            <input
              type="search"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Find places, restaurants, hotels..."
              className="flex-1 bg-transparent text-white placeholder:text-white/50 text-sm py-1.5 px-2 focus:outline-none"
              data-testid="input-search-hero"
            />
            {searchVal && (
              <button onClick={() => { setSearchVal(""); setShowSuggestions(true); }} className="text-white/50 hover:text-white transition-colors">
                <X size={15} />
              </button>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors"
              data-testid="button-search-hero"
            >
              Explore
            </button>
          </div>

          <AnimatePresence>
            {showSuggestions && filtered.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="absolute mt-2 left-0 right-0 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-20 max-w-2xl"
                data-testid="search-suggestions"
              >
                <div className="p-1.5">
                  <p className="text-white/40 text-xs px-3 py-1.5 font-medium uppercase tracking-wide">Gợi ý tìm kiếm</p>
                  {filtered.map((item, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => { setSearchVal(item.label); setShowSuggestions(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/15 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                        <item.icon size={15} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{item.label}</p>
                        <p className="text-white/50 text-xs">{item.sub}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white border border-white/20 transition-all"
        data-testid="button-hero-prev"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white border border-white/20 transition-all"
        data-testid="button-hero-next"
      >
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setProgress(0); }}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-6 h-2" : "bg-white/40 w-2 h-2"
            }`}
            data-testid={`button-hero-dot-${i}`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/15">
        <motion.div
          className="h-full bg-blue-400"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0 }}
        />
      </div>
    </section>
  );
}
