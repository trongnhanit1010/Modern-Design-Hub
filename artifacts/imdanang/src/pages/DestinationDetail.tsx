import { useRef, useState } from "react";
import { useParams } from "wouter";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Star, MapPin, Clock, DollarSign, Calendar, Heart,
  CheckCircle2, Lightbulb, ChevronLeft, ChevronRight, X, Share2,
  Compass, Images,
} from "lucide-react";
import { places, categoryIcons, categoryLabels } from "@/data/destinations";

export default function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const place = places.find(p => p.slug === slug);

  const [liked, setLiked]         = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  if (!place) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <Compass size={48} className="text-gray-300" />
        <p className="text-gray-600 font-semibold text-lg">Không tìm thấy địa điểm</p>
        <Link href="/destinations">
          <button className="flex items-center gap-2 bg-teal-500 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-teal-400 transition-colors">
            <ArrowLeft size={16} /> Quay lại danh sách
          </button>
        </Link>
      </div>
    );
  }

  const CategoryIcon  = categoryIcons[place.category];
  const hasGallery    = place.gallery && place.gallery.length > 1;
  const heroSrc       = hasGallery ? place.gallery[activeImg] : place.image;
  const related       = places
    .filter(p => p.id !== place.id && (p.category === place.category || p.area === place.area))
    .slice(0, 3);

  const openLightbox  = (idx: number) => { setLightboxIdx(idx); };
  const closeLightbox = () => setLightboxIdx(null);
  const prevPhoto     = () => setLightboxIdx(i => i !== null ? (i - 1 + place.gallery.length) % place.gallery.length : 0);
  const nextPhoto     = () => setLightboxIdx(i => i !== null ? (i + 1) % place.gallery.length : 0);

  return (
    <div className="min-h-screen bg-gray-50" ref={ref}>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/96 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-5 right-5 p-2.5 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors z-10">
              <X size={22} />
            </button>
            <button onClick={e => { e.stopPropagation(); prevPhoto(); }} className="absolute left-4 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10">
              <ChevronLeft size={26} />
            </button>
            <motion.img
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.18 }}
              src={place.gallery[lightboxIdx]}
              alt={place.name}
              className="max-h-[85vh] max-w-[88vw] object-contain rounded-xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
            <button onClick={e => { e.stopPropagation(); nextPhoto(); }} className="absolute right-4 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10">
              <ChevronRight size={26} />
            </button>
            {/* Filmstrip inside lightbox */}
            <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-2 px-8">
              {place.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setLightboxIdx(i); }}
                  className={`relative w-12 h-8 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${lightboxIdx === i ? "border-white scale-110" : "border-transparent opacity-50 hover:opacity-80"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ height: hasGallery ? "calc(65vh + 90px)" : "65vh", minHeight: hasGallery ? 560 : 460 }}>

        {/* Main hero image — transitions on activeImg change */}
        <AnimatePresence mode="sync">
          <motion.img
            key={heroSrc}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            src={heroSrc}
            alt={place.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />

        {/* Back button */}
        <div className="absolute top-5 left-5">
          <Link href="/destinations">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-white/25 transition-all shadow-lg">
              <ArrowLeft size={15} /> Địa điểm
            </motion.button>
          </Link>
        </div>

        {/* Like & Share */}
        <div className="absolute top-5 right-5 flex items-center gap-2.5">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="p-2.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl hover:bg-white/25 transition-all">
            <Share2 size={18} className="text-white" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => setLiked(l => !l)}
            className="p-2.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl hover:bg-white/25 transition-all">
            <Heart size={18} className={liked ? "text-rose-400 fill-rose-400" : "text-white"} />
          </motion.button>
        </div>

        {/* Hero text + gallery strip */}
        <div className="absolute bottom-0 left-0 right-0">
          {/* Title info */}
          <div className="px-6 md:px-10 pb-4">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full text-white bg-gradient-to-r ${place.tagColor}`}>
                  {place.tag}
                </div>
                <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 rounded-full px-3 py-1 text-xs">
                  <CategoryIcon size={11} />
                  {categoryLabels[place.category]}
                </div>
                <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white/90 rounded-full px-2.5 py-1 text-xs">
                  <MapPin size={10} />{place.area}
                </div>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-xl mb-3 leading-tight">
                {place.name}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(place.rating) ? "text-amber-400 fill-amber-400" : "text-white/30 fill-white/30"} />
                  ))}
                  <span className="text-white font-bold text-sm ml-1">{place.rating}</span>
                  <span className="text-white/60 text-sm">({place.reviews.toLocaleString()} đánh giá)</span>
                </div>
                <span className="text-white/40">·</span>
                <span className="text-white/70 text-sm">{place.distance} từ trung tâm</span>
              </div>
            </motion.div>
          </div>

          {/* Gallery filmstrip — only when gallery exists */}
          {hasGallery && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="px-6 md:px-10 pb-5"
            >
              <div className="flex items-center gap-2">
                {place.gallery.slice(0, 6).map((img, i) => (
                  <motion.button
                    key={i}
                    onClick={() => { setActiveImg(i); }}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${activeImg === i ? "border-white shadow-lg shadow-black/40 scale-105" : "border-white/25 opacity-65 hover:opacity-90 hover:border-white/60"}`}
                    style={{ width: 80, height: 56 }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </motion.button>
                ))}

                {/* "View all" button */}
                <motion.button
                  onClick={() => openLightbox(activeImg)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0 flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-white/30 bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 hover:border-white/60 transition-all"
                  style={{ width: 80, height: 56 }}
                >
                  <Images size={15} className="text-white/80" />
                  <span className="text-[10px] font-semibold text-white/80 leading-none">
                    {place.gallery.length} ảnh
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Left: Main info */}
          <div className="lg:col-span-2 space-y-10">

            {/* Description */}
            <motion.section initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
              <h2 className="text-gray-900 font-bold text-xl mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-teal-500 rounded-full inline-block" />
                Giới thiệu
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">{place.longDesc}</p>
            </motion.section>

            {/* Highlights */}
            <motion.section initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}>
              <h2 className="text-gray-900 font-bold text-xl mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-amber-400 rounded-full inline-block" />
                Điểm nổi bật
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {place.highlights.map((h, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 + i * 0.06 }}
                    className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-shadow">
                    <CheckCircle2 size={17} className="text-teal-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-relaxed">{h}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Tips */}
            {place.tips && place.tips.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
                <h2 className="text-gray-900 font-bold text-xl mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-orange-400 rounded-full inline-block" />
                  Mẹo hữu ích
                </h2>
                <div className="space-y-3">
                  {place.tips.map((tip, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.25 + i * 0.06 }}
                      className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3.5 hover:border-amber-200 transition-colors">
                      <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm leading-relaxed">{tip}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Right: Info card */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: 24 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-5 sticky top-20"
            >
              <h3 className="text-gray-900 font-bold text-base mb-4">Thông tin chi tiết</h3>
              <div className="space-y-3.5">
                <div className="flex items-start gap-3 pb-3.5 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                    <MapPin size={15} className="text-teal-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">Địa chỉ</p>
                    <p className="text-gray-800 text-sm font-medium">{place.area}, Việt Nam</p>
                    <p className="text-gray-500 text-xs">{place.distance} từ trung tâm</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3.5 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <Clock size={15} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">Giờ mở cửa</p>
                    <p className="text-gray-800 text-sm font-medium">{place.hours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3.5 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                    <DollarSign size={15} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">Giá vé</p>
                    <p className="text-gray-800 text-sm font-medium">{place.price}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3.5 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                    <Calendar size={15} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">Thời điểm lý tưởng</p>
                    <p className="text-gray-800 text-sm font-medium">{place.bestTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                    <Star size={15} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5">Đánh giá</p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-800 text-sm font-bold">{place.rating}</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} className={i < Math.floor(place.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
                        ))}
                      </div>
                      <span className="text-gray-400 text-xs">({place.reviews.toLocaleString()})</span>
                    </div>
                  </div>
                </div>
              </div>
              <motion.a
                href={`https://www.google.com/maps?q=${place.coords.lat},${place.coords.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 w-full mt-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold py-3 rounded-xl shadow-md shadow-teal-100 hover:from-teal-400 hover:to-cyan-400 transition-all text-sm">
                <MapPin size={15} /> Xem trên Google Maps
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* ── Related places ── */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-14"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900 font-bold text-xl flex items-center gap-2">
                <span className="w-1 h-6 bg-rose-400 rounded-full inline-block" />
                Địa điểm liên quan
              </h2>
              <Link href="/destinations">
                <button className="text-teal-600 text-sm font-medium hover:text-teal-500 transition-colors flex items-center gap-1">
                  Xem tất cả <ChevronRight size={14} />
                </button>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p, i) => {
                const RelIcon = categoryIcons[p.category];
                return (
                  <motion.div key={p.id}
                    initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 + i * 0.08 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link href={`/destinations/${p.slug}`}>
                      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-shadow cursor-pointer group">
                        <div className="relative h-44 overflow-hidden">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${p.tagColor}`}>{p.tag}</div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <h3 className="text-gray-900 font-bold text-sm leading-tight">{p.name}</h3>
                            <div className="shrink-0 flex items-center gap-1 bg-amber-50 text-amber-600 rounded-lg px-2 py-0.5 border border-amber-100">
                              <Star size={10} className="fill-amber-500 text-amber-500" />
                              <span className="text-xs font-bold">{p.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-500 text-xs line-clamp-2 mb-3 leading-relaxed">{p.desc}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                              <RelIcon size={11} />{categoryLabels[p.category]}
                            </div>
                            <div className="flex items-center gap-1 text-teal-500 text-xs font-medium group-hover:gap-1.5 transition-all">
                              Khám phá <ChevronRight size={12} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
