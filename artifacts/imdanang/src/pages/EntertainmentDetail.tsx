import { useState } from "react";
import { Link, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Clock,
  CalendarDays,
  Ticket,
  ChevronLeft,
  Heart,
  X,
  ChevronRight,
  Images,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Share2,
  ThumbsUp,
} from "lucide-react";
import {
  entertainmentItems,
  categoryLabels,
  type EntertainmentItem,
} from "@/data/entertainment";

const reviews = [
  {
    id: 1,
    name: "Nguyễn Hoàng Anh",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop",
    rating: 5,
    date: "Tháng 4/2026",
    title: "Trải nghiệm cực kỳ đáng nhớ!",
    text: "Cả gia đình đã có một ngày tuyệt vời. Khung cảnh đẹp, dịch vụ chu đáo, đáng đồng tiền. Sẽ quay lại vào dịp gần nhất!",
    trip: "Gia đình",
    helpful: 28,
  },
  {
    id: 2,
    name: "Emily Carter",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop",
    rating: 5,
    date: "Tháng 3/2026",
    title: "An absolute must-visit in Da Nang!",
    text: "Spectacular views, well-organized facilities, and friendly staff. The night atmosphere is something you can't miss. Highly recommend!",
    trip: "Cặp đôi",
    helpful: 45,
  },
  {
    id: 3,
    name: "Trần Minh Khoa",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop",
    rating: 4,
    date: "Tháng 2/2026",
    title: "Khá ấn tượng, hơi đông vào cuối tuần",
    text: "Trải nghiệm chất lượng nhưng cuối tuần đông kinh khủng. Nên đi vào ngày thường để tránh xếp hàng dài. Nhân viên thân thiện.",
    trip: "Bạn bè",
    helpful: 12,
  },
  {
    id: 4,
    name: "Sarah Williams",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop",
    rating: 5,
    date: "Tháng 1/2026",
    title: "Worth every minute",
    text: "From the moment we arrived until we left, every detail was thought out. The shows were beautifully produced and the venue itself is stunning.",
    trip: "Gia đình",
    helpful: 33,
  },
];

const ratingBars = [
  { label: "Tuyệt vời", pct: 78, color: "#00aa6c" },
  { label: "Rất tốt", pct: 15, color: "#34d399" },
  { label: "Bình thường", pct: 5, color: "#fbbf24" },
  { label: "Kém", pct: 1, color: "#fb923c" },
  { label: "Tệ", pct: 1, color: "#f87171" },
];

const DEFAULT = entertainmentItems[0];

function TaBubbles({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="rounded-full border-2"
          style={{
            width: size,
            height: size,
            borderColor: "#00aa6c",
            backgroundColor: i < rating ? "#00aa6c" : "transparent",
          }}
        />
      ))}
    </div>
  );
}

export default function EntertainmentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item: EntertainmentItem =
    entertainmentItems.find((it) => it.slug === slug) ?? DEFAULT;

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(3);

  const related = entertainmentItems
    .filter((x) => x.id !== item.id && x.category === item.category)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── GALLERY ── */}
      <div className="relative h-[60vh] max-h-[560px]">
        <div className="grid grid-cols-4 grid-rows-2 gap-1.5 h-full overflow-hidden">
          {item.images.slice(0, 5).map((img, i) => (
            <div
              key={i}
              onClick={() => setLightboxIdx(i)}
              className={`relative overflow-hidden cursor-zoom-in group ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={img}
                alt={`${item.name} ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              {i === 4 && item.images.length > 5 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 backdrop-blur-sm gap-1.5">
                  <Images size={20} className="text-white" />
                  <span className="text-white text-sm font-semibold">
                    +{item.images.length - 5} ảnh
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute top-4 left-4 z-10">
          <Link href="/vui-choi-giai-tri">
            <button className="flex items-center gap-1.5 bg-black/55 backdrop-blur-md text-white px-3.5 py-2 rounded-xl text-sm font-medium hover:bg-black/75 transition-colors shadow-lg">
              <ChevronLeft size={16} /> Quay lại
            </button>
          </Link>
        </div>

        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={() => setLiked((p) => !p)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/45 backdrop-blur-md hover:bg-black/65 transition-colors shadow-lg"
          >
            <Heart
              size={17}
              className={liked ? "text-rose-400 fill-rose-400" : "text-white"}
            />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/45 backdrop-blur-md hover:bg-black/65 transition-colors shadow-lg">
            <Share2 size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/96 flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white"
              onClick={() => setLightboxIdx(null)}
            >
              <X size={22} />
            </button>
            <img
              src={item.images[lightboxIdx]}
              alt=""
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx(
                  (p) => (p! - 1 + item.images.length) % item.images.length,
                );
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx((p) => (p! + 1) % item.images.length);
              }}
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* ─ LEFT (main) ─ */}
          <div className="lg:col-span-2 space-y-6 min-w-0">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r ${item.tagColor} shadow-md`}
                >
                  {item.tag}
                </span>
                <span className="bg-fuchsia-50 text-fuchsia-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-fuchsia-100">
                  {categoryLabels[item.category]}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
                {item.name}
              </h1>
              <p className="text-slate-500 text-base leading-relaxed mb-4">
                {item.shortDescription}
              </p>

              <div className="flex items-center flex-wrap gap-3 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2.5">
                  <Star size={15} className="text-amber-400 fill-amber-400" />
                  <span className="text-amber-600 font-bold text-lg">
                    {item.rating}
                  </span>
                  <div className="w-px h-4 bg-amber-200" />
                  <span className="text-slate-500 text-xs">
                    {item.reviews.toLocaleString()} đánh giá
                  </span>
                </div>
                <a
                  href={`tel:${item.phone}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-slate-600 text-sm hover:bg-slate-50 shadow-sm"
                >
                  <Phone size={13} className="text-slate-400" />
                  {item.phone}
                </a>
                <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Sparkles size={12} className="text-fuchsia-400" />
                  {item.views.toLocaleString()} lượt xem
                </span>
              </div>
            </motion.div>

            {/* Highlights */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-slate-900 font-bold text-lg mb-5 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-fuchsia-500 inline-block" />
                Điểm nổi bật
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {item.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-start gap-3 bg-gradient-to-br from-fuchsia-50/60 to-pink-50/40 border border-fuchsia-100 rounded-2xl px-4 py-3"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-fuchsia-500 shrink-0 mt-0.5"
                    />
                    <span className="text-slate-700 text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-slate-900 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-amber-500 inline-block" />
                Giới thiệu
              </h2>
              {item.description.split("\n\n").map((p, i) => (
                <p
                  key={i}
                  className="text-slate-600 leading-relaxed mb-3 last:mb-0 text-[15px]"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Notes */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-slate-900 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-orange-500 inline-block" />
                Thông tin lưu ý
              </h2>
              <ul className="space-y-3">
                {item.notes.map((n, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-slate-600 text-[15px]"
                  >
                    <AlertCircle
                      size={16}
                      className="text-orange-500 shrink-0 mt-0.5"
                    />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* TripAdvisor reviews */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#00aa6c] flex items-center justify-center shadow-md shadow-[#00aa6c]/30">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-7 h-7 fill-white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm0-12.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-slate-900 font-bold text-lg leading-tight">
                      Đánh giá từ TripAdvisor
                    </h2>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Dựa trên {item.reviews.toLocaleString()} đánh giá thực tế
                    </p>
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-[#00aa6c] hover:text-[#007a52] text-sm font-semibold"
                >
                  Xem tất cả trên TripAdvisor
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Score + bars */}
              <div className="grid md:grid-cols-[auto_1fr] gap-6 py-6 border-b border-slate-100">
                <div className="flex flex-col items-center justify-center bg-[#00aa6c]/5 border border-[#00aa6c]/20 rounded-3xl px-8 py-5">
                  <span className="text-[#007a52] font-extrabold text-5xl leading-none">
                    {item.rating}
                  </span>
                  <div className="mt-2">
                    <TaBubbles rating={Math.round(item.rating)} size={14} />
                  </div>
                  <p className="text-[#007a52] font-bold text-sm mt-3">
                    Xuất sắc
                  </p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    {item.reviews.toLocaleString()} đánh giá
                  </p>
                </div>

                <div className="space-y-2.5 self-center">
                  {ratingBars.map((b) => (
                    <div key={b.label} className="flex items-center gap-3">
                      <span className="text-slate-600 text-xs w-20 shrink-0">
                        {b.label}
                      </span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${b.pct}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: b.color }}
                        />
                      </div>
                      <span className="text-slate-400 text-xs w-8 text-right">
                        {b.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review list */}
              <div className="space-y-5 pt-5">
                {reviews.slice(0, visibleReviews).map((r) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b border-slate-100 last:border-b-0 pb-5 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={r.avatar}
                        alt={r.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                          <div>
                            <p className="text-slate-900 font-semibold text-sm">
                              {r.name}
                            </p>
                            <p className="text-slate-400 text-xs mt-0.5">
                              {r.trip} · {r.date}
                            </p>
                          </div>
                          <TaBubbles rating={r.rating} size={11} />
                        </div>
                        <h4 className="text-slate-900 font-bold text-base mt-3">
                          {r.title}
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed mt-1">
                          {r.text}
                        </p>
                        <button className="inline-flex items-center gap-1.5 mt-3 text-slate-400 hover:text-[#00aa6c] text-xs font-medium transition-colors">
                          <ThumbsUp size={12} />
                          Hữu ích ({r.helpful})
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {visibleReviews < reviews.length && (
                  <button
                    onClick={() => setVisibleReviews(reviews.length)}
                    className="w-full py-3 border border-[#00aa6c]/30 text-[#00aa6c] font-semibold rounded-2xl hover:bg-[#00aa6c]/5 transition-colors text-sm"
                  >
                    Xem thêm đánh giá
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ─ RIGHT sidebar ─ */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* Price + CTA card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.cover}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-fuchsia-300 text-[10px] uppercase tracking-widest font-bold mb-1">
                      {categoryLabels[item.category]}
                    </div>
                    <h3 className="text-white font-bold text-base leading-tight">
                      {item.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Price */}
                  <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 border border-fuchsia-100 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2 text-fuchsia-600 text-xs font-semibold mb-1">
                      <Ticket size={13} />
                      GIÁ VÉ TỪ
                    </div>
                    <div className="text-slate-900 font-bold text-2xl">
                      {item.priceFrom.toLocaleString("vi-VN")}₫
                    </div>
                    <p className="text-slate-500 text-xs mt-1">
                      {item.priceNote}
                    </p>
                  </div>

                  {/* Hours */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-center">
                      <p className="text-slate-400 text-[10px] uppercase tracking-wider font-medium">
                        Mở cửa
                      </p>
                      <p className="text-slate-800 font-bold text-base mt-0.5">
                        {item.openTime}
                      </p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-center">
                      <p className="text-slate-400 text-[10px] uppercase tracking-wider font-medium">
                        Đóng cửa
                      </p>
                      <p className="text-slate-800 font-bold text-base mt-0.5">
                        {item.closeTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-slate-600 text-sm">
                    <CalendarDays size={14} className="text-fuchsia-500 shrink-0 mt-0.5" />
                    <span>{item.openDays}</span>
                  </div>

                  <div className="flex items-start gap-2 text-slate-600 text-sm">
                    <MapPin size={14} className="text-fuchsia-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item.address}</span>
                  </div>

                  {/* CTA */}
                  <div className="space-y-2.5 pt-1">
                    <motion.a
                      href={`tel:${item.phone}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg shadow-fuchsia-500/30 hover:from-fuchsia-400 hover:to-pink-400 text-sm"
                    >
                      <Phone size={15} />
                      Gọi đặt vé
                    </motion.a>
                    <motion.a
                      href={`https://${item.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 text-sm"
                    >
                      <Globe size={15} />
                      Truy cập website
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* Contact card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
                <h4 className="text-slate-900 font-bold text-sm mb-1">
                  Liên hệ
                </h4>
                <ContactRow icon={Phone} label={item.phone} href={`tel:${item.phone}`} />
                <ContactRow icon={Mail} label={item.email} href={`mailto:${item.email}`} />
                <ContactRow
                  icon={Globe}
                  label={item.website}
                  href={`https://${item.website}`}
                />
                <ContactRow
                  icon={Facebook}
                  label={item.facebook}
                  href={`https://${item.facebook}`}
                />
                <div className="flex items-start gap-3 text-sm pt-1 border-t border-slate-100">
                  <Clock size={14} className="text-slate-400 shrink-0 mt-1" />
                  <div className="text-slate-600">
                    <div>
                      <strong className="text-slate-800">{item.openTime}</strong>{" "}
                      – <strong className="text-slate-800">{item.closeTime}</strong>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {item.openDays}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-slate-900 font-bold text-xl mb-5">
              Hoạt động tương tự
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((r) => (
                <Link key={r.id} href={`/vui-choi-giai-tri/${r.slug}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow cursor-pointer"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={r.cover}
                        alt={r.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-0.5">
                        <Star size={10} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-slate-700">
                          {r.rating}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-slate-800 text-sm leading-tight line-clamp-1">
                        {r.name}
                      </h4>
                      <div className="flex items-center gap-1 text-slate-400 text-[11px] mt-1">
                        <MapPin size={10} />
                        {r.district}
                      </div>
                      <div className="text-fuchsia-600 text-xs font-bold mt-2">
                        Từ {r.priceFrom.toLocaleString("vi-VN")}₫
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  href,
}: {
  icon: typeof Phone;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-sm text-slate-600 hover:text-fuchsia-600 transition-colors group"
    >
      <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-fuchsia-50 group-hover:border-fuchsia-100 transition-colors">
        <Icon size={13} className="text-slate-500 group-hover:text-fuchsia-500" />
      </div>
      <span className="truncate">{label}</span>
    </a>
  );
}
