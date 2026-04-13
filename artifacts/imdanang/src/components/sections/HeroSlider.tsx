import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, MapPin, Utensils, Hotel, X, Clock, TrendingUp, Trash2 } from "lucide-react";

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

const recentSearches = ["Bà Nà Hills", "Nhà hàng hải sản"];

const trending = ["Pháo hoa Đà Nẵng", "Cầu Vàng", "Hội An đêm", "Cù Lao Chàm", "Bà Nà Hills", "Resort Mỹ Khê"];

const topSearches = [
  { rank: 1, title: "Cầu Vàng Bà Nà Hills", sub: "Đà Nẵng", price: "Từ $45", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&auto=format&fit=crop" },
  { rank: 2, title: "Tour Phố cổ Hội An", sub: "Hội An, Quảng Nam", price: "Từ $30", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=100&auto=format&fit=crop" },
  { rank: 3, title: "Lặn biển Cù Lao Chàm", sub: "Quảng Nam", price: "Từ $60", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&auto=format&fit=crop" },
];

const trendingDest = [
  { rank: 1, title: "Đà Nẵng", sub: "Nghỉ dưỡng & Biển đẹp", img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=100&auto=format&fit=crop" },
  { rank: 2, title: "Hội An", sub: "Di sản & Ẩm thực", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=100&auto=format&fit=crop" },
  { rank: 3, title: "Bà Nà Hills", sub: "Tham quan & Giải trí", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&auto=format&fit=crop" },
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
  const [dropdownStyle, setDropdownStyle] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });

  const updateDropdownPosition = () => {
    if (searchRef.current) {
      const rect = searchRef.current.getBoundingClientRect();
      setDropdownStyle({ top: rect.bottom + 8, left: rect.left, width: rect.width });
    }
  };

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

  const filteredTop = searchVal
    ? topSearches.filter((s) => s.title.toLowerCase().includes(searchVal.toLowerCase()))
    : topSearches;
  const filteredDest = searchVal
    ? trendingDest.filter((s) => s.title.toLowerCase().includes(searchVal.toLowerCase()))
    : trendingDest;

  return (
    <section
      className="relative h-[88vh] min-h-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      data-testid="section-hero"
      style={{ zIndex: 1 }}
    >
      <div className="absolute inset-0 overflow-hidden">
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
      </div>

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
          className="mt-8 max-w-2xl relative"
          ref={searchRef}
        >
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-2 shadow-2xl">
            <Search className="ml-2 text-white/60 shrink-0" size={18} />
            <input
              type="search"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onFocus={() => { updateDropdownPosition(); setShowSuggestions(true); }}
              placeholder="Find places, restaurants, hotels..."
              className="flex-1 bg-transparent text-white placeholder:text-white/50 text-sm py-1.5 px-2 focus:outline-none"
              data-testid="input-search-hero"
            />
            {searchVal && (
              <button onClick={() => { setSearchVal(""); }} className="text-white/50 hover:text-white transition-colors">
                <X size={15} />
              </button>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors shrink-0"
              data-testid="button-search-hero"
            >
              Explore
            </button>
          </div>

          {showSuggestions && dropdownStyle.width > 0 && createPortal(
            <AnimatePresence>
              <motion.div
                key="hero-search-dropdown"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                style={{ position: "fixed", top: dropdownStyle.top, left: dropdownStyle.left, width: dropdownStyle.width, zIndex: 99999, background: "#ffffff" }}
                className="rounded-2xl shadow-2xl overflow-hidden"
                data-testid="search-suggestions"
              >
                <div className="p-4 space-y-4">
                  {!searchVal && (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock size={14} className="text-gray-400" />
                          <span className="text-sm font-semibold">Lịch sử tìm kiếm</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSearchVal(s)}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-gray-700">
                            <TrendingUp size={14} className="text-gray-400" />
                            <span className="text-sm font-semibold">Mọi người đang tìm kiếm</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {trending.map((t) => (
                            <button
                              key={t}
                              onClick={() => setSearchVal(t)}
                              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm rounded-full transition-colors"
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        {searchVal ? "Địa điểm phù hợp" : "Top tìm kiếm"}
                      </p>
                      <div className="space-y-2">
                        {filteredTop.map((item) => (
                          <button
                            key={item.rank}
                            onClick={() => { setSearchVal(item.title); setShowSuggestions(false); }}
                            className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 transition-colors text-left"
                          >
                            <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                              {item.rank}
                            </span>
                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.title}</p>
                              <div className="flex items-center gap-1">
                                <MapPin size={9} className="text-gray-400" />
                                <p className="text-xs text-gray-400 line-clamp-1">{item.sub}</p>
                              </div>
                            </div>
                            <p className="text-xs text-blue-600 font-medium shrink-0 ml-auto">{item.price}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        {searchVal ? "Điểm đến" : "Điểm đến theo xu hướng"}
                      </p>
                      <div className="space-y-2">
                        {filteredDest.map((item) => (
                          <button
                            key={item.rank}
                            onClick={() => { setSearchVal(item.title); setShowSuggestions(false); }}
                            className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 transition-colors text-left"
                          >
                            <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                              {item.rank}
                            </span>
                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.title}</p>
                              <p className="text-xs text-gray-400 line-clamp-1">{item.sub}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>,
            document.body
          )}
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
