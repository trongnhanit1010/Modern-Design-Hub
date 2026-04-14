import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, Wifi, Waves, Utensils, Car, Heart,
  ChevronLeft, ChevronRight, Phone, Globe, ExternalLink,
  Clock, CheckCircle2, Shield, X, Dumbbell, Wind,
  Coffee, Tv, Bath, Sunrise, Navigation, Images,
} from "lucide-react";
import { Link, useParams } from "wouter";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

const hotelsData: Record<string, {
  id: number; name: string; stars: number; rating: number;
  reviews: number; location: string; district: string; address: string;
  phone: string; website: string; description: string; images: string[];
  amenities: string[]; policies: string[]; type: string; views: number;
}> = {
  "crowne-plaza-danang": {
    id: 1, name: "Crowne Plaza Danang", stars: 5, rating: 4.9, reviews: 1240,
    location: "Mỹ Khê Beach", district: "Sơn Trà, Đà Nẵng",
    address: "200 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng",
    phone: "+84 (0)236 3797 979", website: "www.crowneplaza.com", type: "Resort",
    views: 48231,
    description: "Crowne Plaza Danang là khu nghỉ dưỡng 5 sao tọa lạc ngay trên bãi biển Mỹ Khê nổi tiếng. Với kiến trúc hiện đại, phòng nghỉ sang trọng và dịch vụ đẳng cấp quốc tế, đây là lựa chọn hàng đầu cho kỳ nghỉ dưỡng hoàn hảo tại Đà Nẵng.\n\nCrowne Plaza Danang Resort & Spa Ngũ Hành Sơn là điểm vi sa c với vị trí thuận lợi, nằm trên con đường ven biển đẹp bậc nhất Đà Nẵng, chỉ cách sân bay 15 phút lái xe, gần khu mua sắm Vincom, Helio, Big C và vô số nhà hàng nổi tiếng.\n\nKhu nghỉ dưỡng sở hữu 330 phòng và căn hộ với tầm nhìn biển tuyệt đẹp, hồ bơi ngoài trời, spa đẳng cấp và nhiều nhà hàng ẩm thực đa dạng từ món Việt truyền thống đến ẩm thực quốc tế.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&auto=format&fit=crop",
    ],
    amenities: ["wifi", "pool", "restaurant", "parking", "gym", "spa", "bar", "beach", "tv", "aircon"],
    policies: [
      "Check-in: 14:00 · Check-out: 12:00",
      "Trẻ em dưới 12 tuổi ở miễn phí khi dùng giường có sẵn",
      "Thú cưng không được phép",
      "Hủy phòng miễn phí trước 24 giờ",
      "Phòng không hút thuốc",
    ],
  },
  "grand-tourane-hotel": {
    id: 2, name: "Grand Tourane Hotel", stars: 5, rating: 4.7, reviews: 876,
    location: "City Center", district: "Hải Châu, Đà Nẵng",
    address: "252 Trần Phú, Hải Châu, Đà Nẵng",
    phone: "+84 (0)236 3556 789", website: "www.grandtourane.com", type: "Hotel",
    views: 32450,
    description: "Grand Tourane Hotel nằm tại trung tâm thành phố Đà Nẵng, gần các điểm tham quan và trung tâm mua sắm. Khách sạn mang đến không gian sang trọng với dịch vụ ân cần chu đáo.",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&auto=format&fit=crop",
    ],
    amenities: ["wifi", "restaurant", "parking", "gym", "bar", "tv", "aircon"],
    policies: [
      "Check-in: 14:00 · Check-out: 12:00",
      "Hủy phòng miễn phí trước 48 giờ",
      "Phòng không hút thuốc",
      "Thú cưng không được phép",
    ],
  },
};

const DEFAULT_HOTEL = hotelsData["crowne-plaza-danang"];

const amenityMap: Record<string, { icon: typeof Wifi; label: string; color: string }> = {
  wifi:       { icon: Wifi,      label: "WiFi miễn phí",   color: "#3b82f6" },
  pool:       { icon: Waves,     label: "Hồ bơi",           color: "#0ea5e9" },
  restaurant: { icon: Utensils,  label: "Nhà hàng",         color: "#f97316" },
  parking:    { icon: Car,       label: "Đỗ xe miễn phí",   color: "#64748b" },
  gym:        { icon: Dumbbell,  label: "Phòng gym",         color: "#8b5cf6" },
  spa:        { icon: Bath,      label: "Spa & Massage",     color: "#ec4899" },
  bar:        { icon: Coffee,    label: "Bar & Lounge",      color: "#d97706" },
  beach:      { icon: Sunrise,   label: "Bãi biển riêng",   color: "#10b981" },
  tv:         { icon: Tv,        label: "Smart TV",          color: "#6366f1" },
  aircon:     { icon: Wind,      label: "Điều hòa",          color: "#06b6d4" },
};

const reviews = [
  { id: 1, name: "Nguyễn Minh Anh", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop", rating: 5, date: "Tháng 3/2026", title: "Kỳ nghỉ hoàn hảo!", text: "Khách sạn tuyệt vời, phòng rộng rãi và sạch sẽ. View biển đẹp mê hồn, nhân viên phục vụ rất nhiệt tình.", trip: "Gia đình" },
  { id: 2, name: "David Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop", rating: 5, date: "Tháng 2/2026", title: "Exceptional luxury resort", text: "Best resort in Da Nang! The beach is pristine, the pool is massive, and the breakfast buffet is incredible.", trip: "Đôi" },
  { id: 3, name: "Trần Thị Hoa", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop", rating: 4, date: "Tháng 1/2026", title: "Rất hài lòng với dịch vụ", text: "Phòng deluxe view biển thực sự rất đẹp. Bể bơi vô cực tuyệt vời. Chỉ thiếu 1 sao vì check-in hơi lâu.", trip: "Cặp đôi" },
];

const ratingBars = [
  { label: "Tuyệt vời", pct: 82, color: "#10b981" },
  { label: "Rất tốt",   pct: 12, color: "#34d399" },
  { label: "Bình thường", pct: 4, color: "#fbbf24" },
  { label: "Kém",       pct: 1,  color: "#fb923c" },
  { label: "Tệ",        pct: 1,  color: "#f87171" },
];

const nearbyHotels = [
  { id: 1, slug: "grand-tourane-hotel",  name: "Grand Tourane Hotel",  stars: 5, rating: 4.7, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&auto=format&fit=crop", distance: "2.1 km" },
  { id: 2, slug: "furama-resort-danang", name: "Furama Resort Danang", stars: 5, rating: 4.8, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&auto=format&fit=crop", distance: "3.4 km" },
  { id: 3, slug: "pullman-danang-beach", name: "Pullman Danang Beach",  stars: 5, rating: 4.7, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&auto=format&fit=crop", distance: "1.8 km" },
  { id: 4, slug: "vinpearl-resort-spa",  name: "Vinpearl Resort & Spa",stars: 5, rating: 4.8, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&auto=format&fit=crop", distance: "5.2 km" },
];

const TABS = ["Tổng quan", "Tiện nghi", "Chính sách"];

export default function HotelDetail() {
  const { slug } = useParams<{ slug: string }>();
  const hotel = hotelsData[slug ?? ""] ?? DEFAULT_HOTEL;

  const [activeTab, setActiveTab] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const reviewRef = useRef(null);
  const reviewsInView = useInView(reviewRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Gallery ───────────────────────────────────────────── */}
      <div className="relative h-[58vh] max-h-[520px]">
        <div className="grid grid-cols-4 grid-rows-2 gap-1.5 h-full overflow-hidden">
          {hotel.images.slice(0, 5).map((img, i) => (
            <div key={i}
              onClick={() => setLightboxIdx(i)}
              className={`relative overflow-hidden cursor-zoom-in group ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
              <img src={img} alt={`${hotel.name} ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-107" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/12 transition-colors duration-300" />
              {i === 4 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Images size={20} className="text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm">Xem tất cả</span>
                  <span className="text-white/75 text-xs">{hotel.images.length} ảnh</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Back button */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/luu-tru-khach-san">
            <button className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white px-3.5 py-2 rounded-xl text-sm font-medium hover:bg-black/70 transition-colors shadow-lg">
              <ChevronLeft size={16} />Quay lại
            </button>
          </Link>
        </div>

        {/* Like button */}
        <button
          onClick={() => setLiked((p) => !p)}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-colors shadow-lg">
          <Heart size={17} className={liked ? "text-rose-400 fill-rose-400" : "text-white"} />
        </button>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/96 flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}>
            <button className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors" onClick={() => setLightboxIdx(null)}><X size={22} /></button>
            <img src={hotel.images[lightboxIdx]} alt="" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
            <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => (p! - 1 + hotel.images.length) % hotel.images.length); }}>
              <ChevronLeft size={20} />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => (p! + 1) % hotel.images.length); }}>
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {hotel.images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setLightboxIdx(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === lightboxIdx ? "bg-white w-4" : "bg-white/40"}`} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* ── Left (main) ──────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6 min-w-0">

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm shadow-amber-300/40">
                      {hotel.type}
                    </span>
                    <span className="text-slate-400 text-xs flex items-center gap-1.5">
                      <Clock size={11} />{hotel.views.toLocaleString()} lượt xem
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">{hotel.name}</h1>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(hotel.stars)].map((_, i) => <Star key={i} size={15} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-500 text-sm">
                    <MapPin size={14} className="text-amber-500 shrink-0 mt-0.5" />
                    <span>{hotel.address}</span>
                  </div>
                </div>
              </div>

              {/* Rating row */}
              <div className="flex items-center flex-wrap gap-3 mt-5 pt-5 border-t border-slate-200">
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2.5">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span className="text-amber-600 font-bold text-xl">{hotel.rating}</span>
                  <div className="w-px h-4 bg-amber-200" />
                  <span className="text-slate-500 text-xs">{hotel.reviews.toLocaleString()} đánh giá</span>
                </div>
                <a href={`tel:${hotel.phone}`} className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-slate-600 text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-sm">
                  <Phone size={13} className="text-slate-400" />
                  {hotel.phone}
                </a>
                <a href={`https://${hotel.website}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-slate-600 text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-sm">
                  <Globe size={13} className="text-slate-400" />
                  {hotel.website}
                  <ExternalLink size={10} className="text-slate-300" />
                </a>
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-1 bg-slate-100 rounded-2xl p-1 shadow-inner">
              {TABS.map((tab, i) => (
                <button key={tab} onClick={() => setActiveTab(i)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeTab === i
                      ? "bg-white text-slate-900 shadow-md shadow-slate-200/80"
                      : "text-slate-500 hover:text-slate-700"
                  }`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === 0 && (
                <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                    <h2 className="text-slate-900 font-bold text-lg mb-4 flex items-center gap-2">
                      <span className="w-1 h-5 rounded-full bg-amber-500 inline-block" />
                      Giới thiệu
                    </h2>
                    {hotel.description.split("\n\n").map((para, i) => (
                      <p key={i} className="text-slate-600 leading-relaxed mb-3 last:mb-0 text-[15px]">{para}</p>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div key="amenities" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                    <h2 className="text-slate-900 font-bold text-lg mb-5 flex items-center gap-2">
                      <span className="w-1 h-5 rounded-full bg-emerald-500 inline-block" />
                      Tiện nghi & Dịch vụ
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {hotel.amenities.map((key) => {
                        const a = amenityMap[key];
                        if (!a) return null;
                        return (
                          <motion.div key={key} whileHover={{ y: -2, scale: 1.02 }}
                            className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3.5 transition-colors cursor-default">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                              style={{ background: `${a.color}18` }}>
                              <a.icon size={17} style={{ color: a.color }} />
                            </div>
                            <span className="text-slate-700 text-sm font-medium flex-1 leading-tight">{a.label}</span>
                            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 2 && (
                <motion.div key="policies" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                    <h2 className="text-slate-900 font-bold text-lg mb-5 flex items-center gap-2">
                      <span className="w-1 h-5 rounded-full bg-violet-500 inline-block" />
                      Chính sách khách sạn
                    </h2>
                    <div className="space-y-0 divide-y divide-slate-100">
                      {hotel.policies.map((p, i) => (
                        <div key={i} className="flex items-start gap-3.5 py-3.5">
                          <div className="w-7 h-7 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Shield size={13} className="text-violet-500" />
                          </div>
                          <span className="text-slate-600 text-sm leading-relaxed">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* ── Right sidebar ────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">

              {/* Contact card */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60">

                {/* Hero image */}
                <div className="relative h-44 overflow-hidden">
                  <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-1 mb-0.5">
                      {[...Array(hotel.stars)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                    </div>
                    <h3 className="text-white font-bold text-base leading-tight">{hotel.name}</h3>
                  </div>
                </div>

                {/* Info + actions */}
                <div className="p-5 space-y-4">
                  {/* Rating */}
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center shrink-0">
                      <span className="text-amber-600 font-extrabold text-lg leading-none">{hotel.rating}</span>
                      <Star size={9} className="text-amber-400 fill-amber-400 mt-0.5" />
                    </div>
                    <div>
                      <p className="text-slate-800 font-semibold text-sm">Xuất sắc</p>
                      <p className="text-slate-400 text-xs">{hotel.reviews.toLocaleString()} đánh giá</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <MapPin size={15} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-slate-600 text-sm leading-relaxed">{hotel.address}</p>
                  </div>

                  {/* Stay info */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Check-in",  value: "14:00" },
                      { label: "Check-out", value: "12:00" },
                    ].map((s) => (
                      <div key={s.label} className="bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-center">
                        <p className="text-slate-400 text-[10px] uppercase tracking-wider font-medium">{s.label}</p>
                        <p className="text-slate-800 font-bold text-base mt-0.5">{s.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA buttons */}
                  <div className="space-y-2.5 pt-1">
                    <motion.a href={`tel:${hotel.phone}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-amber-400/30 hover:from-amber-400 hover:to-orange-400 transition-all text-sm">
                      <Phone size={15} />Gọi ngay
                    </motion.a>
                    <motion.a href={`https://www.google.com/maps/search/${encodeURIComponent(hotel.address)}`}
                      target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 w-full py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all text-sm">
                      <Navigation size={14} />Chỉ đường
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* Top amenities quick-view */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
                className="bg-white border border-slate-200 rounded-3xl p-5 shadow-md shadow-slate-200/50">
                <h3 className="text-slate-700 font-bold text-sm mb-3 flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500" />Tiện nghi nổi bật
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {hotel.amenities.slice(0, 10).map((key) => {
                    const a = amenityMap[key];
                    if (!a) return null;
                    return (
                      <div key={key} title={a.label}
                        className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-default">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${a.color}15` }}>
                          <a.icon size={14} style={{ color: a.color }} />
                        </div>
                        <span className="text-[9px] text-slate-400 text-center leading-tight">{a.label.split(" ")[0]}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── OTA — full width ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-2 mb-8">
        <h2 className="text-slate-900 font-bold text-xl mb-5 flex items-center gap-2">
          <span className="w-1 h-6 rounded-full bg-blue-500 inline-block" />
          Đặt phòng qua
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Booking.com",
              color: "#003580",
              accent: "#0071c2",
              img: hotel.images[1],
              sub: "Hơn 6 triệu đánh giá",
              badge: "Ưu đãi hôm nay",
              features: ["Đặt phòng linh hoạt", "Hủy miễn phí", "Thanh toán sau"],
            },
            {
              name: "Agoda",
              color: "#b20710",
              accent: "#e02020",
              img: hotel.images[2],
              sub: "Giá tốt nhất",
              badge: "Giảm đến 25%",
              features: ["Giá thành viên", "Điểm thưởng AgodaCash", "Đặt ngay xác nhận"],
            },
            {
              name: "TripAdvisor",
              color: "#007a52",
              accent: "#00aa6c",
              img: hotel.images[3],
              sub: "So sánh giá tốt nhất",
              badge: "Top đánh giá",
              features: ["So sánh nhiều OTA", "Đánh giá du khách thực", "Gợi ý cá nhân hoá"],
            },
          ].map((ota, idx) => (
            <motion.a key={ota.name} href="#"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}
              className="relative rounded-3xl overflow-hidden block group cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img src={ota.img} alt={ota.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${ota.color}ee 0%, ${ota.accent}cc 100%)` }} />
              </div>

              {/* Content */}
              <div className="relative p-6 flex flex-col gap-4 min-h-[200px]">
                {/* Badge */}
                <span className="self-start bg-white/20 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/25">
                  {ota.badge}
                </span>

                {/* Name */}
                <div>
                  <h3 className="text-white font-extrabold text-2xl tracking-tight leading-none">{ota.name}</h3>
                  <p className="text-white/70 text-sm mt-1">{ota.sub}</p>
                </div>

                {/* Features */}
                <ul className="space-y-1.5 flex-1">
                  {ota.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-white/85 text-xs">
                      <CheckCircle2 size={12} className="text-white/60 shrink-0" />{f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-white/20">
                  <span className="text-white font-semibold text-sm">Xem trên {ota.name}</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/35 transition-colors">
                    <ExternalLink size={14} className="text-white" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* ── Reviews — full width ───────────────────────────────── */}
      <div ref={reviewRef} className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-slate-900 font-bold text-xl flex items-center gap-2 mb-1">
                <span className="w-1 h-6 rounded-full bg-amber-400 inline-block" />
                Đánh giá TripAdvisor
              </h2>
              <p className="text-slate-400 text-sm">{hotel.reviews.toLocaleString()} đánh giá từ du khách thực</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-slate-900 leading-none">{hotel.rating}</div>
                <div className="flex gap-0.5 justify-center mt-1.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className={i < Math.round(hotel.rating) ? "text-amber-400 fill-amber-400" : "text-slate-300"} />)}
                </div>
                <span className="text-xs text-slate-400 mt-0.5 block">Xuất sắc</span>
              </div>
              {/* Bars */}
              <div className="space-y-1.5 w-52">
                {ratingBars.map((r) => (
                  <div key={r.label} className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500 w-20 shrink-0 text-right">{r.label}</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={reviewsInView ? { width: `${r.pct}%` } : {}}
                        transition={{ delay: 0.2, duration: 0.9, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: r.color }}
                      />
                    </div>
                    <span className="text-slate-400 w-8 shrink-0">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Review cards grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {reviews.map((rv, idx) => (
              <motion.div key={rv.id}
                initial={{ opacity: 0, y: 16 }}
                animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + idx * 0.1 }}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <img src={rv.avatar} alt={rv.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-slate-800 font-semibold text-sm block">{rv.name}</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < rv.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"} />)}
                      </div>
                      <span className="text-slate-400 text-[11px]">· {rv.trip}</span>
                    </div>
                  </div>
                  <span className="text-slate-400 text-[11px] shrink-0">{rv.date}</span>
                </div>
                <p className="text-slate-800 font-semibold text-sm mb-1.5">{rv.title}</p>
                <p className="text-slate-500 text-[13px] leading-relaxed flex-1">{rv.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Nearby — full width ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-slate-900 font-bold text-xl flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-sky-500 inline-block" />
            Khách sạn lân cận
          </h2>
          <div className="flex gap-2">
            <button onClick={scrollPrev} className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors text-slate-600 shadow-sm"><ChevronLeft size={16} /></button>
            <button onClick={scrollNext} className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors text-slate-600 shadow-sm"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {nearbyHotels.map((h) => (
              <Link key={h.id} href={`/luu-tru-khach-san/${h.slug}`}>
                <motion.div whileHover={{ y: -5 }}
                  className="shrink-0 w-72 bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer group">
                  <div className="relative h-44 overflow-hidden">
                    <img src={h.image} alt={h.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex gap-0.5 mb-1">{[...Array(h.stars)].map((_, i) => <Star key={i} size={10} className="text-amber-400 fill-amber-400" />)}</div>
                      <p className="text-white font-semibold text-sm leading-tight line-clamp-2">{h.name}</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-amber-500 text-sm font-bold">
                      <Star size={12} className="fill-amber-400" />{h.rating}
                      <span className="text-slate-400 font-normal text-xs">/ 5</span>
                    </div>
                    <span className="flex items-center gap-1 text-slate-400 text-xs">
                      <MapPin size={10} />{h.distance}
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
