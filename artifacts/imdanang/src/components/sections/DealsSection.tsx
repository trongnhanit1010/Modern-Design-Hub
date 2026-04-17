import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Clock, ArrowRight, CheckCircle } from "lucide-react";

const imageDeals = [
  {
    id: 1,
    title: "Tuần lễ vàng du lịch Đà Nẵng",
    subtitle: "Giảm đến 40% các gói nghỉ dưỡng 5 sao",
    badge: "ĐẶC BIỆT",
    badgeColor: "bg-orange-500",
    cta: "Đặt ngay",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Trải nghiệm biển xanh Mỹ Khê",
    subtitle: "Combo resort + tour 3N2D chỉ từ 3.500.000đ",
    badge: "MỚI",
    badgeColor: "bg-teal-500",
    cta: "Khám phá",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Bà Nà Hills – Trải Nghiệm Cầu Vàng",
    subtitle: "Vé trọn gói cáp treo + vui chơi không giới hạn",
    badge: "HOT",
    badgeColor: "bg-rose-500",
    cta: "Đặt ngay",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Khám Phá Phố Cổ Hội An",
    subtitle: "Tour 1 ngày từ Đà Nẵng chỉ từ 350.000đ/người",
    badge: "PHỔ BIẾN",
    badgeColor: "bg-violet-500",
    cta: "Khám phá",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=900&auto=format&fit=crop",
  },
];

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

        <AnimatePresence mode="wait">
          {subMode === "color" ? (
            <motion.div
              key="color-mode"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-testid="deals-color-grid"
            >
              {deals.slice(0, 3).map((deal, i) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className={`rounded-3xl overflow-hidden bg-gradient-to-br ${deal.gradient} cursor-pointer shadow-lg`}
                  data-testid={`card-deal-${deal.id}`}
                >
                  {/* Top section: badge + title + price + thumb */}
                  <div className="p-5 flex gap-3 justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <span className="inline-block bg-white/25 text-white text-[10px] font-bold px-2.5 py-1 rounded-full mb-3 tracking-widest">
                        {deal.badge}
                      </span>
                      <h3 className="text-white font-bold text-lg leading-snug">{deal.title}</h3>
                      <p className="text-white font-bold text-xl mt-1">{deal.price}</p>
                    </div>
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white/25 shrink-0">
                      <img src={deal.thumb} alt={deal.title} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mx-5 border-t border-white/25" />

                  {/* Bottom section: details */}
                  <div className="px-5 py-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-white/85 text-sm">
                      <Clock size={13} className="shrink-0" />
                      <span>{deal.days}</span>
                    </div>
                    <div className="flex items-start gap-2 text-white/85 text-sm">
                      <CheckCircle size={13} className="shrink-0 mt-0.5" />
                      <span className="leading-snug">{deal.include}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="image-mode"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              data-testid="deals-image-grid"
            >
              {imageDeals.map((deal, i) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl overflow-hidden h-44 group cursor-pointer"
                  data-testid={`card-deal-img-${deal.id}`}
                >
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

                  <div className="absolute inset-0 p-5 flex flex-col justify-between">
                    <div>
                      <span className={`inline-block ${deal.badgeColor} text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide`}>
                        {deal.badge}
                      </span>
                      <h3 className="text-white font-bold text-lg leading-snug mt-2 line-clamp-2 max-w-[70%]">
                        {deal.title}
                      </h3>
                      <p className="text-white/70 text-xs mt-1 max-w-[65%] leading-snug">
                        {deal.subtitle}
                      </p>
                    </div>
                    <div>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white text-sm font-medium transition-colors border border-white/20">
                        {deal.cta} <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
