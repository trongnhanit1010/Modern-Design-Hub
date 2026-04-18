import { useRef } from "react";
import { useLocation } from "wouter";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight, Clock, MapPin, Sparkles, Star, Ticket } from "lucide-react";
import { places } from "@/data/destinations";

const featuredPlaces = places.slice(0, 6);
const mainPlace = featuredPlaces[0];
const sidePlaces = featuredPlaces.slice(1);

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

function StatPill({ icon: Icon, children }: { icon: typeof MapPin; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/14 px-3 py-1.5 text-xs font-medium text-white/88 backdrop-blur">
      <Icon size={12} className="shrink-0" />
      {children}
    </span>
  );
}

function SideCard({ place, index, onClick }: { place: typeof sidePlaces[0]; index: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl text-left shadow-md transition-shadow hover:shadow-xl hover:shadow-slate-900/12 ${
        index === 4 ? "md:col-span-2 md:h-40" : ""
      }`}
      style={{ height: "13rem" }}
      data-testid={`card-attractive-${place.id}`}
    >
      <img
        src={place.image}
        alt={place.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/30 to-transparent" />
      <div className="absolute left-3 right-3 top-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          <Star size={10} className="fill-amber-300 text-amber-300" />
          {place.rating}
        </span>
        <span className={`rounded-full bg-gradient-to-r ${place.tagColor} px-2.5 py-1 text-[10px] font-bold text-white shadow`}>
          {place.tag}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3.5">
        <div className="mb-0.5 flex items-center gap-1 text-white/65 text-[11px]">
          <MapPin size={10} className="shrink-0" />
          <span className="line-clamp-1">{place.area}</span>
        </div>
        <h3 className="text-sm font-bold leading-snug text-white">{place.name}</h3>
        {index !== 4 && (
          <p className="mt-1 text-[11px] leading-relaxed text-white/68 line-clamp-2">{place.desc}</p>
        )}
        <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-white/80 transition-colors group-hover:text-white">
          Khám phá <ArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  );
}

export default function AttractiveDestinations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [, navigate] = useLocation();

  const goToPlace = (slug: string) => navigate(`/destinations/${slug}`);

  return (
    <section className="px-4 py-12 md:px-6" ref={ref} data-testid="section-attractive-destinations">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles size={13} />
              Gợi ý nổi bật
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">Điểm du lịch hấp dẫn</h2>
            <p className="mt-1 text-sm text-muted-foreground">Những điểm đến được yêu thích nhất cho hành trình khám phá Đà Nẵng</p>
          </div>
          <button
            onClick={() => navigate("/destinations")}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md"
            data-testid="button-attractive-all"
          >
            Xem tất cả <ArrowRight size={14} />
          </button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-4 lg:grid-cols-[1.18fr_1fr]"
        >
          {/* Main hero card */}
          <motion.button
            variants={cardVariants}
            whileHover={{ y: -4 }}
            onClick={() => goToPlace(mainPlace.slug)}
            className="group relative min-h-[400px] overflow-hidden rounded-[2rem] text-left shadow-2xl shadow-slate-900/15 md:min-h-[500px]"
            data-testid="card-attractive-main"
          >
            <img
              src={mainPlace.image}
              alt={mainPlace.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/42 to-black/10" />
            <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
              <span className={`rounded-full bg-gradient-to-r ${mainPlace.tagColor} px-3 py-1.5 text-xs font-bold text-white shadow-lg`}>
                {mainPlace.tag}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/18 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                <Star size={12} className="fill-amber-300 text-amber-300" />
                {mainPlace.rating}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
              <div className="mb-3 flex flex-wrap gap-2">
                <StatPill icon={MapPin}>{mainPlace.area}</StatPill>
                <StatPill icon={Clock}>{mainPlace.bestTime}</StatPill>
                <StatPill icon={Ticket}>{mainPlace.price}</StatPill>
              </div>
              <h3 className="font-serif text-3xl font-bold leading-tight text-white md:text-4xl">{mainPlace.name}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/76">{mainPlace.desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-bold text-slate-900 transition-transform group-hover:translate-x-1">
                Khám phá ngay <ArrowRight size={14} />
              </span>
            </div>
          </motion.button>

          {/* Side cards */}
          <div>
            {/* Mobile: full-width horizontal scroll */}
            <div
              className="flex gap-3 overflow-x-auto pb-2 md:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              {sidePlaces.map((place, index) => (
                <div key={place.id} className="shrink-0 w-[72vw] max-w-xs">
                  <SideCard place={place} index={index} onClick={() => goToPlace(place.slug)} />
                </div>
              ))}
            </div>

            {/* Desktop: 2-col grid with animations */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="hidden md:grid md:grid-cols-2 gap-3"
            >
              {sidePlaces.map((place, index) => (
                <motion.div
                  key={place.id}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  className={index === 4 ? "col-span-2" : ""}
                >
                  <SideCard place={place} index={index} onClick={() => goToPlace(place.slug)} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
