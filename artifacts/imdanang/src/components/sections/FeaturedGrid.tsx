import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Star } from "lucide-react";

const items = [
  {
    id: 1,
    title: "Crowne Plaza Danang Hotel & Resort",
    subtitle: "2 Phan Đình Phùng, Mân Thái, Sơn Trà",
    rating: 4.9,
    category: "Resort 5 sao",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&auto=format&fit=crop",
    large: true,
  },
  {
    id: 2,
    title: "Grand Tourane Hotel Da Nang",
    subtitle: "252 Võ Nguyên Giáp, Mỹ An, Ngũ Hành Sơn",
    rating: 4.7,
    category: "Khách sạn",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Happy Day Riverside Hotel & Spa Danang",
    subtitle: "75 Bạch Đằng, Hải Châu",
    rating: 4.6,
    category: "Spa Resort",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Moonlight Hotel & Suites - City Center Views",
    subtitle: "Hàn River & Dragon Bridge Views",
    rating: 4.8,
    category: "Khách sạn cao cấp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "La Siesta Hoi An Resort & Spa",
    subtitle: "132 Hùng Vương, Hội An",
    rating: 4.9,
    category: "Resort",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Brilliant Hotel - Afternoon Tea Inclusive",
    subtitle: "162 Bạch Đằng, Hải Châu, Đà Nẵng",
    rating: 4.5,
    category: "Khách sạn",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "KOI Resort & Residence Da Nang",
    subtitle: "Inclusive Spa access, Ngũ Hành Sơn",
    rating: 4.8,
    category: "Luxury Resort",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function FeatureCard({ item, className }: { item: (typeof items)[0]; className?: string }) {
  return (
    <motion.div
      variants={cardVariants}
      className={`relative group overflow-hidden rounded-2xl cursor-pointer ${className}`}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.25 }}
      data-testid={`card-featured-${item.id}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="inline-block bg-blue-500/80 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full mb-2">
          {item.category}
        </span>
        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2">{item.title}</h3>
        <div className="flex items-center gap-1 mt-1">
          <MapPin size={11} className="text-white/60" />
          <span className="text-white/60 text-xs line-clamp-1">{item.subtitle}</span>
        </div>
        <div className="flex items-center gap-1 mt-1.5">
          <Star size={11} className="text-amber-400 fill-amber-400" />
          <span className="text-amber-400 text-xs font-medium">{item.rating}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-12 px-4" ref={ref} data-testid="section-featured-grid">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-1">
          Nội dung nổi bật tại đây
        </h2>
        <p className="text-muted-foreground text-sm mb-8">Khám phá những địa điểm tuyệt vời nhất tại Đà Nẵng</p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-3 gap-4"
          style={{ gridTemplateRows: "240px 240px" }}
        >
          <FeatureCard item={items[0]} className="row-span-2 col-span-1" />
          <FeatureCard item={items[1]} className="col-span-1" />
          <FeatureCard item={items[2]} className="col-span-1" />
          <FeatureCard item={items[3]} className="col-span-1" />
          <FeatureCard item={items[4]} className="col-span-1" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 gap-4 mt-4"
          style={{ gridTemplateRows: "220px" }}
        >
          <FeatureCard item={items[5]} className="col-span-1" />
          <FeatureCard item={items[6]} className="col-span-1" />
        </motion.div>
      </div>
    </section>
  );
}
