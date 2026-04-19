import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, Wifi, Waves, Utensils, Car, Heart,
  ChevronLeft, ChevronRight, Phone, Globe, ExternalLink,
  Clock, CheckCircle2, X, Dumbbell, Wind,
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
  { id: 1, name: "Nguyễn Minh Anh", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop", rating: 5, date: "Tháng 4/2026", title: "Kỳ nghỉ hoàn hảo!", text: "Khách sạn tuyệt vời, phòng rộng rãi và sạch sẽ. View biển đẹp mê hồn, nhân viên phục vụ rất nhiệt tình.", trip: "Gia đình" },
  { id: 2, name: "David Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop", rating: 5, date: "Tháng 3/2026", title: "Exceptional luxury resort", text: "Best resort in Da Nang! The beach is pristine, the pool is massive, and the breakfast buffet is incredible. Will definitely come back.", trip: "Đôi" },
  { id: 3, name: "Trần Thị Hoa", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop", rating: 4, date: "Tháng 2/2026", title: "Rất hài lòng với dịch vụ", text: "Phòng deluxe view biển thực sự rất đẹp. Bể bơi vô cực tuyệt vời. Chỉ thiếu 1 sao vì check-in hơi lâu.", trip: "Cặp đôi" },
  { id: 4, name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop", rating: 5, date: "Tháng 2/2026", title: "Perfect beachfront getaway", text: "The sunset view from our ocean-view balcony was breathtaking. Staff went above and beyond to make our anniversary special. Highly recommend!", trip: "Cặp đôi" },
  { id: 5, name: "Phạm Văn Đức", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop", rating: 5, date: "Tháng 1/2026", title: "Đáng đồng tiền bát gạo", text: "Hồ bơi vô cực nhìn ra biển cực ấn tượng. Đồ ăn sáng phong phú, đa dạng. Nhân viên thân thiện và chuyên nghiệp. Sẽ quay lại!", trip: "Gia đình" },
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

const TABS = ["Tổng quan", "Tiện nghi"];

function TaBubbles({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="rounded-full border-2"
          style={{
            width: size, height: size,
            borderColor: "#00aa6c",
            backgroundColor: i < rating ? "#00aa6c" : "transparent",
          }} />
      ))}
    </div>
  );
}

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

            </AnimatePresence>

          </div>

          {/* ── Right sidebar ────────────────────────────────── */}
          <div className="hidden lg:block lg:col-span-1">
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
                  {/* TripAdvisor Rating */}
                  <div className="pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 mb-2">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#00aa6c]" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm0-12.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                      </svg>
                      <span className="text-[#00aa6c] font-bold text-xs tracking-wide">TripAdvisor</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center bg-[#00aa6c]/10 border border-[#00aa6c]/25 rounded-2xl px-3 py-2 shrink-0">
                        <span className="text-[#007a52] font-extrabold text-xl leading-none">{hotel.rating}</span>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-3 h-3 rounded-full ${i < Math.round(hotel.rating) ? "bg-[#00aa6c]" : "bg-slate-200"}`} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-800 font-semibold text-sm">Xuất sắc</p>
                        <p className="text-slate-400 text-xs">{hotel.reviews.toLocaleString()} đánh giá</p>
                        <p className="text-[#00aa6c] text-[11px] font-medium mt-0.5">Xem trên TripAdvisor ↗</p>
                      </div>
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

              {/* TripAdvisor Booking Prices */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                className="bg-white border border-slate-200 rounded-3xl p-5 shadow-md shadow-slate-200/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#00aa6c]" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm0-12.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                    </svg>
                    <h3 className="text-slate-700 font-bold text-sm">Giá booking từ TripAdvisor</h3>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">Hôm nay</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { type: "Phòng Deluxe", desc: "View biển · 1 giường đôi", price: "2.800.000đ", tag: "Phổ biến" },
                    { type: "Phòng Superior", desc: "View vườn · 2 giường đơn", price: "2.200.000đ", tag: null },
                    { type: "Suite Hướng Biển", desc: "Phòng khách riêng · 1 giường King", price: "5.200.000đ", tag: "Sang trọng" },
                  ].map((room) => (
                    <div key={room.type} className="flex items-center justify-between gap-2 py-2.5 border-b border-slate-100 last:border-0">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-slate-800 font-semibold text-xs leading-snug">{room.type}</span>
                          {room.tag && (
                            <span className="text-[9px] font-bold bg-amber-50 text-amber-600 border border-amber-200 px-1.5 py-0.5 rounded-full">{room.tag}</span>
                          )}
                        </div>
                        <p className="text-slate-400 text-[11px] mt-0.5">{room.desc}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[#007a52] font-bold text-sm leading-none">từ {room.price}</p>
                        <p className="text-slate-400 text-[10px] mt-0.5">/đêm</p>
                      </div>
                    </div>
                  ))}
                </div>
                <motion.a href="#" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-[#00aa6c] text-white font-bold rounded-2xl shadow-md shadow-[#00aa6c]/25 hover:bg-[#008f5b] transition-colors text-sm">
                  <ExternalLink size={14} />Xem giá trên TripAdvisor
                </motion.a>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Reviews — TripAdvisor layout ───────────────────────── */}
      <div ref={reviewRef} className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-slate-900 font-bold text-xl flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-[#00aa6c] inline-block" />
            Đánh giá TripAdvisor
          </h2>
          <a href="#" className="text-[#00aa6c] text-sm font-semibold flex items-center gap-1 hover:underline">
            Xem tất cả <ExternalLink size={13} />
          </a>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* ── Left: Rating summary card ─── */}
          <div className="w-full lg:w-72 shrink-0 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            {/* TA header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#00aa6c] flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7" cy="12" r="5"/><circle cx="17" cy="12" r="5"/>
                  <circle cx="7" cy="12" r="2" fill="#00aa6c"/><circle cx="17" cy="12" r="2" fill="#00aa6c"/>
                </svg>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm leading-tight">Tripadvisor</p>
                <p className="text-[#00aa6c] text-[11px] leading-tight">Số 38 trên 1.515 KS tại Đà Nẵng</p>
              </div>
            </div>

            {/* Big rating + bubbles */}
            <div className="flex items-end gap-3 mb-1">
              <span className="text-5xl font-bold text-slate-900 leading-none">{hotel.rating}</span>
              <div className="mb-1"><TaBubbles rating={Math.round(hotel.rating)} size={16} /></div>
            </div>
            <p className="text-slate-400 text-xs mb-4">{hotel.reviews.toLocaleString()} Đánh giá TripAdvisor</p>

            {/* Star bars 5→1 */}
            <div className="space-y-1.5 mb-5">
              {ratingBars.map((r, idx) => (
                <div key={r.label} className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 w-4 shrink-0 text-right">{5 - idx}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={reviewsInView ? { width: `${r.pct}%` } : {}}
                      transition={{ delay: 0.2 + idx * 0.08, duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-[#00aa6c]"
                    />
                  </div>
                  <span className="text-slate-400 w-7 shrink-0 text-right">{r.pct}%</span>
                </div>
              ))}
            </div>

            {/* Category ratings */}
            <p className="text-slate-700 font-bold text-xs mb-3">Xếp hạng</p>
            <div className="space-y-2">
              {[
                "Địa điểm", "Giấc ngủ", "Phòng", "Dịch vụ", "Giá trị", "Sự sạch sẽ"
              ].map((cat) => (
                <div key={cat} className="flex items-center gap-2">
                  <span className="text-slate-500 text-xs w-24 shrink-0">{cat}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[96%] rounded-full bg-[#00aa6c]" />
                  </div>
                  <span className="text-slate-600 text-xs font-semibold w-6 text-right shrink-0">{hotel.rating}</span>
                </div>
              ))}
            </div>

            <a href="#" className="mt-5 flex items-center justify-center gap-1.5 w-full py-2.5 border border-[#00aa6c] text-[#00aa6c] font-semibold rounded-xl text-sm hover:bg-[#00aa6c]/5 transition-colors">
              Xem tất cả <ExternalLink size={13} />
            </a>
          </div>

          {/* ── Right: Review list ─── */}
          <div className="flex-1 space-y-3 min-w-0">
            <p className="text-slate-400 text-sm mb-4">{hotel.reviews.toLocaleString()} đánh giá từ du khách thực tế</p>
            {reviews.map((rv, idx) => (
              <motion.div key={rv.id}
                initial={{ opacity: 0, y: 12 }}
                animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + idx * 0.08 }}
                className="bg-white border border-slate-200 rounded-2xl p-4">
                {/* Top row */}
                <div className="flex items-start gap-3 mb-2.5">
                  <img src={rv.avatar} alt={rv.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-slate-800 font-semibold text-sm block leading-tight">{rv.name}</span>
                    <span className="text-slate-400 text-[12px]">{rv.trip}</span>
                  </div>
                  <span className="text-slate-400 text-[12px] shrink-0">{rv.date}</span>
                </div>
                {/* Bubbles */}
                <div className="mb-2"><TaBubbles rating={rv.rating} size={13} /></div>
                {/* Title */}
                <p className="text-slate-800 font-semibold text-sm mb-1.5">"{rv.title}"</p>
                {/* Body */}
                <p className="text-slate-500 text-[13px] leading-relaxed mb-3">{rv.text}</p>
                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-slate-400 text-[12px]">👍 0 người thấy hữu ích</span>
                  <a href="#" className="text-[#00aa6c] text-[12px] font-medium flex items-center gap-0.5 hover:underline">
                    Đánh giá từ Tripadvisor <ExternalLink size={11} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Nearby — full width ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-36 lg:pb-12">
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

      {/* ── Mobile sticky CTA (below bottom nav) ─────────────── */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-30 px-4 pb-2">
        <div className="flex gap-2 bg-background/95 backdrop-blur-xl border border-border rounded-2xl p-2 shadow-xl shadow-black/10">
          <motion.a href={`tel:${hotel.phone}`} whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl text-sm shadow-md shadow-amber-400/30">
            <Phone size={15} />Gọi ngay
          </motion.a>
          <motion.a href={`https://www.google.com/maps/search/${encodeURIComponent(hotel.address)}`}
            target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl text-sm hover:bg-slate-50 transition-colors">
            <Navigation size={14} />Chỉ đường
          </motion.a>
        </div>
      </div>
    </div>
  );
}
