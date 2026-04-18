import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";

const featuredPost = {
  category: "DU LỊCH CUỐI TUẦN",
  title: "Cuối Tuần Đi Đâu Chơi Gì Gần Đà Nẵng?",
  description: "Khám phá những điểm đến cắm trại, dã ngoại cực chill lẩn khuất giữa thiên nhiên hùng vĩ quanh thành phố.",
  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&auto=format&fit=crop",
  cta: "Khám phá",
};

const gridPosts = [
  {
    id: 1,
    category: "VĂN HÓA & ẨM THỰC",
    title: "Trải Nghiệm Văn Hóa Địa Phương Đà Nẵng",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "NGHỈ DƯỠNG & WELLNESS",
    title: "Hành Trình Chữa Lành Bên Biển Mỹ Khê",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "ẨM THỰC",
    title: "Khám Phá Ẩm Thực Đêm Đà Nẵng",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "LỄ HỘI",
    title: "Lễ Hội Pháo Hoa DIFF – Đêm Bừng Sáng Sông Hàn",
    image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=600&auto=format&fit=crop",
  },
];

export default function ExperiencesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <section className="py-12 px-4 bg-background" ref={ref} data-testid="section-experiences">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Trải nghiệm cho mọi người</h2>
            <p className="text-muted-foreground text-sm mt-1">Góc nhìn mới lạ và truyền cảm hứng về Đà Nẵng</p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md"
          >
            Xem tất cả <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Featured large card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
            className="lg:col-span-2 relative rounded-2xl overflow-hidden cursor-pointer group min-h-[280px] lg:min-h-[420px]"
            data-testid="card-exp-featured"
          >
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-6 min-h-[280px] lg:min-h-[420px]">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] font-semibold px-3 py-1.5 rounded-full tracking-wide">
                  <LayoutGrid size={10} />
                  {featuredPost.category}
                </div>
              </div>
              <h3 className="text-white font-bold text-xl md:text-2xl leading-tight mb-2">
                {featuredPost.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-5 line-clamp-3">
                {featuredPost.description}
              </p>
              <button className="self-start flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all">
                {featuredPost.cta} <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>

          {/* Mobile: horizontal scroll with arrows; Desktop: 2x2 grid */}
          <div className="lg:col-span-3">
            {/* Mobile carousel with arrows */}
            <div className="relative lg:hidden">
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-3"
                style={{ scrollbarWidth: "none" }}
              >
                {gridPosts.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1 + 0.15, duration: 0.45 }}
                    className="shrink-0 w-64 h-52 relative rounded-2xl overflow-hidden cursor-pointer group"
                    data-testid={`card-exp-mobile-${post.id}`}
                  >
                    <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="relative z-10 h-full flex flex-col justify-end p-4">
                      <p className="text-white/60 text-[9px] font-bold tracking-widest uppercase mb-1">{post.category}</p>
                      <h4 className="text-white font-semibold text-sm leading-snug mb-1 line-clamp-2">{post.title}</h4>
                      <span className="inline-flex items-center gap-1 text-white/80 text-xs font-medium">Đọc thêm <ArrowRight size={11} /></span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Arrow buttons */}
              <button
                onClick={() => scroll(-1)}
                className="absolute -left-1 top-1/2 -translate-y-4 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all"
                data-testid="button-exp-prev"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => scroll(1)}
                className="absolute -right-1 top-1/2 -translate-y-4 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all"
                data-testid="button-exp-next"
              >
                <ChevronRight size={15} />
              </button>
            </div>

            {/* Desktop 2x2 grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {gridPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 + 0.15, duration: 0.45 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  data-testid={`card-exp-${post.id}`}
                  style={{ minHeight: 200 }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="relative z-10 h-full flex flex-col justify-end p-4" style={{ minHeight: 200 }}>
                    <p className="text-white/60 text-[9px] font-bold tracking-widest uppercase mb-1">{post.category}</p>
                    <h4 className="text-white font-semibold text-sm leading-snug mb-1.5 line-clamp-2">{post.title}</h4>
                    <span className="inline-flex items-center gap-1 text-white/80 text-xs font-medium">Đọc thêm <ArrowRight size={11} /></span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
