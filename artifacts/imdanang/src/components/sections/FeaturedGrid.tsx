import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { MapPin, Star, ArrowRight } from "lucide-react";

const featured = {
  main: {
    id: 1,
    title: "Crowne Plaza Danang Hotel & Resort",
    subtitle: "Sơn Trà, Đà Nẵng",
    rating: 4.9,
    category: "Resort 5 sao",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&auto=format&fit=crop",
  },
  topRight: [
    {
      id: 2,
      title: "Bà Nà Hills – Cầu Vàng",
      subtitle: "Bà Nà Hills, Đà Nẵng",
      rating: 4.9,
      category: "Địa điểm",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Phố Cổ Hội An",
      subtitle: "Hội An, Quảng Nam",
      rating: 4.8,
      category: "Di sản UNESCO",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Happy Day Riverside Hotel",
      subtitle: "Sông Hàn, Đà Nẵng",
      rating: 4.6,
      category: "Spa Resort",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Bãi Biển Mỹ Khê",
      subtitle: "Mỹ Khê, Đà Nẵng",
      rating: 4.8,
      category: "Bãi biển",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop",
    },
  ],
  bottom: [
    {
      id: 6,
      title: "La Siesta Hoi An Resort",
      subtitle: "Hội An, Quảng Nam",
      rating: 4.9,
      category: "Resort",
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&auto=format&fit=crop",
    },
    {
      id: 7,
      title: "Cầu Rồng Đà Nẵng",
      subtitle: "Trung tâm, Đà Nẵng",
      rating: 4.7,
      category: "Địa điểm",
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop",
    },
    {
      id: 8,
      title: "Lăng Cô Bay Resort",
      subtitle: "Lăng Cô, Huế",
      rating: 4.8,
      category: "Resort",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&auto=format&fit=crop",
    },
  ],
};

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

function FeatureCard({
  item,
  className = "",
}: {
  item: { id: number; title: string; subtitle: string; rating: number; category: string; image: string };
  className?: string;
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.22 }}
      className={`relative group overflow-hidden rounded-2xl cursor-pointer ${className}`}
      data-testid={`card-featured-${item.id}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="inline-block bg-blue-500/80 backdrop-blur-sm text-white text-[11px] px-2.5 py-0.5 rounded-full mb-1.5">
          {item.category}
        </span>
        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-1">{item.title}</h3>
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-1 text-white/60 text-xs">
            <MapPin size={10} />
            <span className="line-clamp-1">{item.subtitle}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={10} className="text-amber-400 fill-amber-400" />
            <span className="text-amber-400 text-xs font-semibold">{item.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 px-4 md:px-6" ref={ref} data-testid="section-featured-grid">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Nội dung nổi bật tại đây
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Khám phá những địa điểm tuyệt vời nhất tại Đà Nẵng</p>
          </div>
          <a href="#" className="flex items-center gap-1 text-primary text-sm font-medium hover:underline shrink-0">
            Xem tất cả <ArrowRight size={14} />
          </a>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="hidden md:grid gap-3"
          style={{
            gridTemplateColumns: "2fr 1fr 1fr",
            gridTemplateRows: "280px 180px 200px",
          }}
        >
          <FeatureCard item={featured.main} className="col-span-1 row-span-2" />

          {featured.topRight.map((item) => (
            <FeatureCard key={item.id} item={item} />
          ))}

          {featured.bottom.map((item) => (
            <FeatureCard key={item.id} item={item} />
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="md:hidden grid grid-cols-2 gap-3"
          style={{ gridTemplateRows: "220px 220px 220px" }}
        >
          <FeatureCard item={featured.main} className="col-span-2 row-span-1" />
          <FeatureCard item={featured.topRight[0]} />
          <FeatureCard item={featured.topRight[1]} />
          <FeatureCard item={featured.topRight[2]} />
          <FeatureCard item={featured.bottom[0]} />
        </motion.div>
      </div>
    </section>
  );
}
