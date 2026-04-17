import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { MapPin, ArrowRight, Hotel, Utensils, UtensilsCrossed, MapPinned, Heart, Landmark, Trees, ShoppingBag, Coffee } from "lucide-react";

type CardItem = {
  id: number;
  title: string;
  location: string;
  highlight: string;
  highlightColor?: string;
  category: string;
  categoryColor: string;
  categoryIcon: React.ReactNode;
  badge: string;
  image: string;
};

const featured: { main: CardItem; grid: CardItem[]; bottom: CardItem[] } = {
  main: {
    id: 1,
    title: "InterContinental Danang Sun Peninsula",
    location: "Bãi Bắc, Bán đảo Sơn Trà",
    highlight: "từ 5.800.000đ/đêm",
    highlightColor: "text-amber-400",
    category: "KHÁCH SẠN",
    categoryColor: "bg-blue-500",
    categoryIcon: <Hotel size={11} />,
    badge: "5 sao",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop",
  },
  grid: [
    {
      id: 2,
      title: "Nhà Hàng Bé Mận – Hải Sản",
      location: "Lô 12, Đường Phạm Văn Đồng",
      highlight: "Hải sản tươi sống",
      highlightColor: "text-amber-400",
      category: "NHÀ HÀNG",
      categoryColor: "bg-orange-500",
      categoryIcon: <Utensils size={11} />,
      badge: "Hot",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Bãi Biển Mỹ Khê",
      location: "Top 6 bãi biển đẹp nhất hành tinh",
      highlight: "Mở cửa 24/7",
      highlightColor: "text-white/80",
      category: "ĐỊA ĐIỂM",
      categoryColor: "bg-teal-500",
      categoryIcon: <MapPinned size={11} />,
      badge: "Miễn phí",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Mì Quảng Bà Mua",
      location: "109 Đường Trần Bình Trọng",
      highlight: "Từ 35.000đ/người",
      highlightColor: "text-amber-400",
      category: "QUÁN ĂN",
      categoryColor: "bg-red-500",
      categoryIcon: <UtensilsCrossed size={11} />,
      badge: "Đặc sản",
      image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Cầu Tình Yêu – Sông Hàn",
      location: "Cầu khóa tình yêu lãng mạn bậc nhất",
      highlight: "Miễn phí tham quan",
      highlightColor: "text-white/80",
      category: "CHECK-IN",
      categoryColor: "bg-purple-500",
      categoryIcon: <Heart size={11} />,
      badge: "Trending",
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop",
    },
  ],
  bottom: [
    {
      id: 6,
      title: "Phố Cổ Hội An",
      location: "Di sản Văn hóa Thế giới UNESCO",
      highlight: "Cách 30km từ ĐN",
      highlightColor: "text-white/80",
      category: "DI SẢN",
      categoryColor: "bg-stone-600",
      categoryIcon: <Landmark size={11} />,
      badge: "UNESCO",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop",
    },
    {
      id: 7,
      title: "Bán Đảo Sơn Trà",
      location: "Lá phổi xanh của Đà Nẵng",
      highlight: "Tham quan miễn phí",
      highlightColor: "text-amber-400",
      category: "THIÊN NHIÊN",
      categoryColor: "bg-green-600",
      categoryIcon: <Trees size={11} />,
      badge: "Eco",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop",
    },
    {
      id: 8,
      title: "Chợ Hàn & Chợ Cồn",
      location: "Thiên đường mua sắm đặc sản",
      highlight: "Mở 6:00 – 22:00",
      highlightColor: "text-white/80",
      category: "MUA SẮM",
      categoryColor: "bg-cyan-600",
      categoryIcon: <ShoppingBag size={11} />,
      badge: "Local",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&auto=format&fit=crop",
    },
    {
      id: 9,
      title: "Bánh Mì Bà Lan",
      location: "Đường Trần Phú, Hải Châu",
      highlight: "Từ 15.000đ",
      highlightColor: "text-amber-400",
      category: "ẨM THỰC",
      categoryColor: "bg-orange-600",
      categoryIcon: <Coffee size={11} />,
      badge: "Must-try",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop",
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

function FeatureCard({ item, className = "" }: { item: CardItem; className?: string }) {
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <span className={`inline-flex items-center gap-1 ${item.categoryColor} text-white text-[10px] font-semibold px-2 py-0.5 rounded-full`}>
          {item.categoryIcon}
          {item.category}
        </span>
        <span className="inline-block bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
          {item.badge}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3.5">
        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-1">{item.title}</h3>
        <div className="flex items-center gap-1 text-white/70 text-xs mt-1">
          <MapPin size={10} className="shrink-0" />
          <span className="line-clamp-1">{item.location}</span>
        </div>
        <p className={`text-xs font-semibold mt-1.5 ${item.highlightColor}`}>{item.highlight}</p>
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
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Nội dung nổi bật tại đây</h2>
            <p className="text-muted-foreground text-sm mt-1">Khách sạn, nhà hàng và địa điểm được yêu thích nhất</p>
          </div>
          <a href="#" className="flex items-center gap-1 text-primary text-sm font-medium hover:underline shrink-0">
            Xem tất cả <ArrowRight size={14} />
          </a>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="hidden md:flex flex-col gap-3"
        >
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "230px 230px" }}
          >
            <FeatureCard item={featured.main} className="row-span-2" />
            <FeatureCard item={featured.grid[0]} />
            <FeatureCard item={featured.grid[1]} />
            <FeatureCard item={featured.grid[2]} />
            <FeatureCard item={featured.grid[3]} />
          </div>

          <div className="grid grid-cols-4 gap-3" style={{ gridTemplateRows: "200px" }}>
            {featured.bottom.map((item) => (
              <FeatureCard key={item.id} item={item} />
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="md:hidden grid grid-cols-2 gap-3"
          style={{ gridTemplateRows: "220px 220px 220px 220px" }}
        >
          <FeatureCard item={featured.main} className="col-span-2" />
          <FeatureCard item={featured.grid[0]} />
          <FeatureCard item={featured.grid[1]} />
          <FeatureCard item={featured.grid[2]} />
          <FeatureCard item={featured.grid[3]} />
        </motion.div>
      </div>
    </section>
  );
}
