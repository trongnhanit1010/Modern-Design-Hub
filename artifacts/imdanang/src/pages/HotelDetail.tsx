import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, Wifi, Waves, Utensils, Car, Heart, ChevronLeft, ChevronRight,
  Phone, Globe, ExternalLink, Clock, Users, CheckCircle2, Shield, X,
  Dumbbell, Wind, Coffee, Tv, Bath, Sunrise
} from "lucide-react";
import { Link, useParams } from "wouter";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

const hotelsData: Record<string, {
  id: number;
  name: string;
  stars: number;
  rating: number;
  reviews: number;
  price: number;
  location: string;
  district: string;
  address: string;
  phone: string;
  website: string;
  description: string;
  images: string[];
  amenities: string[];
  policies: string[];
  type: string;
  views: number;
}> = {
  "crowne-plaza-danang": {
    id: 1,
    name: "Crowne Plaza Danang",
    stars: 5,
    rating: 4.9,
    reviews: 1240,
    price: 3200000,
    location: "Mỹ Khê Beach",
    district: "Sơn Trà, Đà Nẵng",
    address: "200 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng",
    phone: "+84 (0)236 3797 979",
    website: "www.crowneplaza.com",
    type: "resort",
    views: 48231,
    description: "Crowne Plaza Danang là khu nghỉ dưỡng 5 sao tọa lạc ngay trên bãi biển Mỹ Khê nổi tiếng. Với kiến trúc hiện đại, phòng nghỉ sang trọng và dịch vụ đẳng cấp quốc tế, đây là lựa chọn hàng đầu cho kỳ nghỉ dưỡng hoàn hảo tại Đà Nẵng.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&auto=format&fit=crop",
    ],
    amenities: ["wifi", "pool", "restaurant", "parking", "gym", "spa", "bar", "beach", "tv", "aircon"],
    policies: [
      "Check-in: 14:00, Check-out: 12:00",
      "Trẻ em dưới 12 tuổi ở miễn phí khi dùng giường có sẵn",
      "Thú cưng không được phép",
      "Hủy phòng miễn phí trước 24 giờ",
      "Phòng không hút thuốc",
    ],
  },
  "grand-tourane-hotel": {
    id: 2,
    name: "Grand Tourane Hotel",
    stars: 5,
    rating: 4.7,
    reviews: 876,
    price: 2400000,
    location: "City Center",
    district: "Hải Châu, Đà Nẵng",
    address: "252 Trần Phú, Hải Châu, Đà Nẵng",
    phone: "+84 (0)236 3556 789",
    website: "www.grandtourane.com",
    type: "hotel",
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
      "Check-in: 14:00, Check-out: 12:00",
      "Hủy phòng miễn phí trước 48 giờ",
      "Phòng không hút thuốc",
      "Thú cưng không được phép",
    ],
  },
};

const DEFAULT_HOTEL = hotelsData["crowne-plaza-danang"];

const amenityDetails: Record<string, { icon: typeof Wifi; label: string }> = {
  wifi: { icon: Wifi, label: "WiFi miễn phí" },
  pool: { icon: Waves, label: "Hồ bơi" },
  restaurant: { icon: Utensils, label: "Nhà hàng" },
  parking: { icon: Car, label: "Đỗ xe miễn phí" },
  gym: { icon: Dumbbell, label: "Phòng gym" },
  spa: { icon: Bath, label: "Spa & Massage" },
  bar: { icon: Coffee, label: "Bar & Lounge" },
  beach: { icon: Sunrise, label: "Bãi biển riêng" },
  tv: { icon: Tv, label: "Smart TV" },
  aircon: { icon: Wind, label: "Điều hòa" },
};

const tripadvisorReviews = [
  {
    id: 1,
    name: "Nguyễn Minh Anh",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop",
    rating: 5,
    date: "Tháng 3/2026",
    title: "Kỳ nghỉ hoàn hảo!",
    text: "Khách sạn tuyệt vời, phòng rộng rãi và sạch sẽ. View biển đẹp mê hồn, nhân viên phục vụ rất nhiệt tình.",
    trip: "Gia đình",
  },
  {
    id: 2,
    name: "David Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop",
    rating: 5,
    date: "Tháng 2/2026",
    title: "Exceptional luxury resort",
    text: "Best resort in Da Nang! The beach is pristine, the pool is massive, and the breakfast buffet is incredible.",
    trip: "Đôi",
  },
  {
    id: 3,
    name: "Trần Thị Hoa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop",
    rating: 4,
    date: "Tháng 1/2026",
    title: "Rất hài lòng với dịch vụ",
    text: "Phòng deluxe view biển thực sự rất đẹp. Bể bơi vô cực tuyệt vời. Chỉ thiếu 1 sao vì check-in hơi lâu.",
    trip: "Cặp đôi",
  },
];

const ratingBreakdown = [
  { label: "Tuyệt vời", value: 5, count: 82, color: "from-emerald-500 to-teal-500" },
  { label: "Rất tốt", value: 4, count: 12, color: "from-green-500 to-emerald-500" },
  { label: "Bình thường", value: 3, count: 4, color: "from-yellow-500 to-amber-500" },
  { label: "Kém", value: 2, count: 1, color: "from-orange-500 to-red-500" },
  { label: "Tệ", value: 1, count: 1, color: "from-red-600 to-rose-700" },
];

const nearbyHotels = [
  {
    id: 1,
    slug: "grand-tourane-hotel",
    name: "Grand Tourane Hotel",
    stars: 5,
    rating: 4.7,
    price: 2400000,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&auto=format&fit=crop",
    distance: "2.1km",
  },
  {
    id: 2,
    slug: "furama-resort-danang",
    name: "Furama Resort Danang",
    stars: 5,
    rating: 4.8,
    price: 5800000,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&auto=format&fit=crop",
    distance: "3.4km",
  },
  {
    id: 3,
    slug: "pullman-danang-beach",
    name: "Pullman Danang Beach",
    stars: 5,
    rating: 4.7,
    price: 3900000,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&auto=format&fit=crop",
    distance: "1.8km",
  },
  {
    id: 4,
    slug: "vinpearl-resort-spa",
    name: "Vinpearl Resort & Spa",
    stars: 5,
    rating: 4.8,
    price: 4500000,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&auto=format&fit=crop",
    distance: "5.2km",
  },
];

const tabs = ["Tổng quan", "Tiện nghi", "Chính sách"];

export default function HotelDetail() {
  const { slug } = useParams<{ slug: string }>();
  const hotel = hotelsData[slug || ""] || DEFAULT_HOTEL;

  const [activeTab, setActiveTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const totalPrice = hotel.price * nights;

  return (
    <div className="min-h-screen bg-gray-50" ref={ref}>
      <div className="relative">
        <div className="grid grid-cols-4 grid-rows-2 gap-1.5 h-[55vh] max-h-[480px] overflow-hidden">
          {hotel.images.slice(0, 5).map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`relative overflow-hidden cursor-zoom-in group ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <img src={img} alt={`${hotel.name} ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              {i === 4 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <span className="text-white font-semibold text-sm">+{hotel.images.length - 5} ảnh</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="absolute top-4 left-4 z-10">
          <Link href="/luu-tru-khach-san">
            <button className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-sm hover:bg-black/70 transition-colors">
              <ChevronLeft size={16} />Quay lại
            </button>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-4 right-4 text-white/70 hover:text-white" onClick={() => setSelectedImage(null)}>
              <X size={24} />
            </button>
            <img src={hotel.images[selectedImage]} alt="" className="max-w-full max-h-full object-contain rounded-xl" onClick={(e) => e.stopPropagation()} />
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedImage((p) => (p! - 1 + hotel.images.length) % hotel.images.length); }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedImage((p) => (p! + 1) % hotel.images.length); }}
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">{hotel.type}</span>
                    <span className="text-gray-500 text-xs flex items-center gap-1"><Clock size={11} />{hotel.views.toLocaleString()} lượt xem</span>
                  </div>
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(hotel.stars)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                    <MapPin size={13} className="text-amber-400 shrink-0" />
                    <span>{hotel.address}</span>
                  </div>
                </div>
                <button
                  onClick={() => setLiked((p) => !p)}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shrink-0"
                >
                  <Heart size={18} className={liked ? "text-rose-500 fill-rose-500" : "text-gray-400"} />
                </button>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-amber-500/15 rounded-xl px-3 py-2">
                  <Star size={15} className="text-amber-400 fill-amber-400" />
                  <span className="text-amber-400 font-bold text-base">{hotel.rating}</span>
                  <span className="text-gray-500 text-sm">/ 5</span>
                </div>
                <span className="text-gray-400 text-sm">{hotel.reviews.toLocaleString()} đánh giá</span>
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <Phone size={13} />
                  <span>{hotel.phone}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <Globe size={13} />
                  <a href={`https://${hotel.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">{hotel.website}</a>
                </div>
              </div>
            </motion.div>

            <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === i ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 0 && (
                <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="bg-white rounded-2xl p-5 mb-5 border border-gray-200 shadow-sm">
                    <h2 className="text-gray-900 font-bold text-lg mb-3">Giới thiệu</h2>
                    <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                    <h2 className="text-gray-900 font-bold text-lg mb-4">Đặt phòng qua OTA</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { name: "Booking.com", color: "from-blue-600 to-blue-700", logo: "🏨", badge: "Ưu đãi hôm nay" },
                        { name: "Agoda", color: "from-rose-600 to-rose-700", logo: "🌏", badge: "Giảm 15%" },
                        { name: "TripAdvisor", color: "from-emerald-600 to-teal-700", logo: "🦉", badge: "Đánh giá tốt nhất" },
                      ].map((ota) => (
                        <motion.a
                          key={ota.name}
                          href="#"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative bg-gradient-to-br ${ota.color} rounded-xl p-4 text-white flex flex-col items-center gap-2 text-center group overflow-hidden`}
                        >
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 transition-opacity" />
                          <span className="text-2xl">{ota.logo}</span>
                          <span className="font-bold text-sm">{ota.name}</span>
                          <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">{ota.badge}</span>
                          <ExternalLink size={12} className="text-white/60" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div key="amenities" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                    <h2 className="text-gray-900 font-bold text-lg mb-4">Tiện nghi & Dịch vụ</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {hotel.amenities.map((a) => {
                        const detail = amenityDetails[a];
                        if (!detail) return null;
                        return (
                          <div key={a} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                              <detail.icon size={16} className="text-amber-400" />
                            </div>
                            <span className="text-gray-700 text-sm font-medium">{detail.label}</span>
                            <CheckCircle2 size={14} className="text-emerald-400 ml-auto shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 2 && (
                <motion.div key="policies" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                    <h2 className="text-gray-900 font-bold text-lg mb-4">Chính sách khách sạn</h2>
                    <div className="space-y-3">
                      {hotel.policies.map((p, i) => (
                        <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
                          <Shield size={14} className="text-amber-400 shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-gray-900 font-bold text-lg">Đánh giá TripAdvisor</h2>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">{hotel.rating}</span>
                  <div>
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < Math.round(hotel.rating) ? "text-amber-400 fill-amber-400" : "text-gray-500"} />)}</div>
                    <span className="text-gray-500 text-xs">{hotel.reviews.toLocaleString()} đánh giá</span>
                  </div>
                </div>
              </div>

              <div className="mb-5 space-y-2">
                {ratingBreakdown.map((r) => (
                  <div key={r.value} className="flex items-center gap-3 text-xs">
                    <span className="text-gray-400 w-16 shrink-0">{r.label}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${r.count}%` } : {}}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${r.color} rounded-full`}
                      />
                    </div>
                    <span className="text-gray-500 w-8 text-right">{r.count}%</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {tripadvisorReviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <img src={review.avatar} alt={review.name} className="w-9 h-9 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-900 font-semibold text-sm">{review.name}</span>
                          <span className="text-gray-500 text-xs">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-500"} />)}</div>
                          <span className="text-gray-500 text-xs">· {review.trip}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-800 font-semibold text-sm mb-1">{review.title}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900 font-bold text-lg">Khách sạn lân cận</h2>
                <div className="flex gap-2">
                  <button onClick={scrollPrev} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-gray-600">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={scrollNext} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-gray-600">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4">
                  {nearbyHotels.map((h) => (
                    <Link key={h.id} href={`/luu-tru-khach-san/${h.slug}`}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="shrink-0 w-56 bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm cursor-pointer group"
                      >
                        <div className="relative h-32 overflow-hidden">
                          <img src={h.image} alt={h.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                          <div className="absolute bottom-2 left-2 flex gap-0.5">
                            {[...Array(h.stars)].map((_, i) => <Star key={i} size={9} className="text-amber-400 fill-amber-400" />)}
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-gray-800 font-semibold text-xs leading-tight mb-1 line-clamp-2">{h.name}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                              <Star size={10} className="fill-amber-400" />{h.rating}
                            </div>
                            <span className="text-gray-500 text-[10px]">{h.distance}</span>
                          </div>
                          <p className="text-amber-400 font-bold text-xs mt-1">{h.price.toLocaleString("vi-VN")}₫<span className="text-gray-500 font-normal">/đêm</span></p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent p-5 border-b border-white/8">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-gray-900">{hotel.price.toLocaleString("vi-VN")}₫</span>
                    <span className="text-gray-400 text-sm">/đêm</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star size={13} className="text-amber-400 fill-amber-400" />
                    <span className="text-amber-400 font-bold text-sm">{hotel.rating}</span>
                    <span className="text-gray-500 text-xs">· {hotel.reviews.toLocaleString()} đánh giá</span>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <label className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2 block">Số đêm</label>
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                      <button onClick={() => setNights((n) => Math.max(1, n - 1))} className="text-gray-700 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm transition-colors">−</button>
                      <span className="flex-1 text-center text-gray-900 font-bold">{nights}</span>
                      <button onClick={() => setNights((n) => n + 1)} className="text-gray-700 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm transition-colors">+</button>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2 block">Số khách</label>
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                      <Users size={15} className="text-gray-400" />
                      <button onClick={() => setGuests((g) => Math.max(1, g - 1))} className="text-gray-700 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm transition-colors">−</button>
                      <span className="flex-1 text-center text-gray-900 font-bold">{guests} khách</span>
                      <button onClick={() => setGuests((g) => Math.min(10, g + 1))} className="text-gray-700 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm transition-colors">+</button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{hotel.price.toLocaleString("vi-VN")}₫ × {nights} đêm</span>
                      <span className="text-gray-900">{totalPrice.toLocaleString("vi-VN")}₫</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Phí dịch vụ</span>
                      <span className="text-gray-900">{Math.round(totalPrice * 0.1).toLocaleString("vi-VN")}₫</span>
                    </div>
                    <div className="flex items-center justify-between font-bold pt-2 border-t border-white/10">
                      <span className="text-gray-900">Tổng cộng</span>
                      <span className="text-amber-400 text-lg">{Math.round(totalPrice * 1.1).toLocaleString("vi-VN")}₫</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-orange-400 transition-all"
                  >
                    Đặt phòng ngay
                  </motion.button>
                  <p className="text-center text-gray-500 text-xs">Miễn phí hủy phòng trước 24 giờ</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
