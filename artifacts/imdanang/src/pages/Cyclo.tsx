import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bike, Headphones, Play, Pause, MapPin, Clock, Star,
  Volume2, Radio, ChevronRight, Sparkles, Route, Languages,
  Phone, CheckCircle2, Navigation, Coffee, Building2,
} from "lucide-react";
import { cycloTours, cycloContacts, cycloParking, audioGuideLanguages } from "@/data/cyclo";

/* ─── Animated audio waveform ────────────────────────────── */
function Waveform({ playing, bars = 28, color = "#0d9488" }: { playing: boolean; bars?: number; color?: string }) {
  return (
    <div className="flex items-end gap-[3px] h-9">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full"
          style={{ background: color, opacity: 0.85 }}
          animate={
            playing
              ? { height: ["20%", `${30 + ((i * 17) % 70)}%`, "20%"] }
              : { height: "18%" }
          }
          transition={{
            duration: 0.7 + (i % 5) * 0.07,
            repeat: playing ? Infinity : 0,
            delay: (i % 7) * 0.05,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function SpeakerPulse({ playing }: { playing: boolean }) {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      {playing && [0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border-2 border-teal-500"
          initial={{ scale: 0.6, opacity: 0.7 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
        />
      ))}
      <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg"
        style={{ boxShadow: "0 0 20px rgba(13,148,136,0.4)" }}>
        <Headphones size={20} className="text-white" />
      </div>
    </div>
  );
}

function CycloIcon({ size = 64 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 64" width={size} height={(size * 64) / 120} fill="none">
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "92px 46px" }}>
        <circle cx="92" cy="46" r="14" stroke="#0f766e" strokeWidth="2" />
        <line x1="92" y1="32" x2="92" y2="60" stroke="#0f766e" strokeWidth="1.2" />
        <line x1="78" y1="46" x2="106" y2="46" stroke="#0f766e" strokeWidth="1.2" />
        <line x1="82" y1="36" x2="102" y2="56" stroke="#0f766e" strokeWidth="1.2" />
        <line x1="82" y1="56" x2="102" y2="36" stroke="#0f766e" strokeWidth="1.2" />
      </motion.g>
      {[20, 50].map((cx) => (
        <motion.g key={cx} animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: `${cx}px 50px` }}>
          <circle cx={cx} cy="50" r="10" stroke="#0f766e" strokeWidth="2" />
          <line x1={cx - 10} y1="50" x2={cx + 10} y2="50" stroke="#0f766e" strokeWidth="1.2" />
          <line x1={cx} y1="40" x2={cx} y2="60" stroke="#0f766e" strokeWidth="1.2" />
        </motion.g>
      ))}
      <path d="M10 30 L40 30 L40 14 L20 14 Z" fill="#99f6e4" stroke="#0f766e" strokeWidth="2" />
      <path d="M10 30 L20 14" stroke="#0f766e" strokeWidth="2" />
      <line x1="40" y1="30" x2="92" y2="46" stroke="#0f766e" strokeWidth="3" />
      <line x1="40" y1="30" x2="50" y2="50" stroke="#0f766e" strokeWidth="3" />
      <circle cx="80" cy="22" r="5" fill="#0f766e" />
      <line x1="80" y1="27" x2="86" y2="40" stroke="#0f766e" strokeWidth="2.5" />
    </svg>
  );
}

/* ─── Tour card ───────────────────────────────────────────── */
function TourCard({ tour, index }: { tour: typeof cycloTours[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-teal-100 hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Floating cyclo icon */}
        <motion.div
          className="absolute bottom-4 right-4 opacity-90"
          animate={{ x: [0, -6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <CycloIcon size={52} />
        </motion.div>

        {/* Tags */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`flex items-center gap-1 bg-gradient-to-r ${tour.color} text-white text-[10px] font-bold px-2.5 py-1 rounded-full`}>
            <Bike size={10} /> Xích lô
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur text-teal-700 text-[11px] font-bold px-2.5 py-1 rounded-full">
          <Star size={10} className="fill-teal-500 text-teal-500" /> {tour.rating}
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-4 left-4 right-20">
          <p className="text-teal-300 text-[10px] font-bold uppercase tracking-widest mb-1">{tour.tagline}</p>
          <h3 className="text-white font-black text-2xl leading-tight" style={{ fontFamily: "Georgia, serif" }}>
            {tour.name}
          </h3>
          <div className="flex items-center gap-3 text-white/75 text-[11px] mt-1.5">
            <span className="flex items-center gap-1"><Clock size={10} />{tour.duration}</span>
            <span className="flex items-center gap-1"><Clock size={10} />{tour.hours}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Audio preview row */}
        <div className="flex items-center gap-3 rounded-2xl border border-teal-100 bg-teal-50 px-3 py-2.5 mb-4">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white flex items-center justify-center hover:scale-105 transition-transform shadow"
            style={{ boxShadow: "0 4px 12px rgba(13,148,136,0.35)" }}
          >
            {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-[10px] mb-1">
              <span className="text-teal-600 uppercase tracking-widest font-bold">Audio guide preview</span>
              <span className="text-teal-400 font-mono">15 ngôn ngữ</span>
            </div>
            <Waveform playing={playing} bars={24} color="#0d9488" />
          </div>
        </div>

        {/* Overview */}
        <p className="text-teal-900/70 text-sm leading-relaxed mb-4 line-clamp-3">
          {tour.overview}
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-1 gap-1.5 mb-4">
          {tour.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={14} className="shrink-0 text-teal-500 mt-0.5" />
              <span className="text-teal-900/80">{h}</span>
            </div>
          ))}
        </div>

        {/* Route toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-teal-200 bg-teal-50 text-sm font-semibold text-teal-700 hover:bg-teal-100 transition-colors mb-4"
        >
          <span className="flex items-center gap-2"><Route size={14} /> Xem lộ trình ({tour.stops.length} điểm)</span>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight size={15} className="rotate-90" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mb-4"
            >
              <div className="relative pl-4">
                {/* Vertical line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-teal-200" />
                <div className="space-y-3">
                  {tour.stops.map((stop, i) => (
                    <div key={stop.id} className="flex gap-3 relative">
                      <div className={`shrink-0 w-3.5 h-3.5 rounded-full border-2 mt-1 z-10 ${i === 0 || i === tour.stops.length - 1 ? "border-teal-500 bg-teal-500" : "border-teal-300 bg-white"}`} />
                      <div>
                        <p className="text-sm font-semibold text-teal-900">{stop.name}</p>
                        <p className="text-xs text-teal-700/60 mt-0.5">{stop.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-teal-100">
          <div>
            {tour.price ? (
              <>
                <div className="text-teal-700 text-2xl font-black">
                  {tour.price.toLocaleString("vi-VN")}đ
                </div>
                <div className="text-teal-500/70 text-[11px]">/ khách</div>
              </>
            ) : (
              <div className="text-teal-700 text-sm font-semibold">{tour.priceNote}</div>
            )}
          </div>
          <a href="tel:0903978437">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-md bg-gradient-to-r ${tour.color}`}
              style={{ boxShadow: `0 6px 18px ${tour.accentHex}55` }}
            >
              <Phone size={14} /> Đặt tour
            </motion.button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function Cyclo() {
  const [heroPlaying, setHeroPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!heroPlaying) return;
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.6)), 80);
    return () => clearInterval(id);
  }, [heroPlaying]);

  return (
    <div className="bg-white">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-100">
        <svg className="absolute inset-x-0 bottom-0 w-full h-24 opacity-30" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <motion.path
            d="M0 50 Q 200 10, 400 50 T 800 50 T 1200 50"
            stroke="#0d9488" strokeWidth="2" strokeDasharray="8 8" fill="none"
            initial={{ strokeDashoffset: 0 }} animate={{ strokeDashoffset: -32 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          {[100, 350, 600, 850, 1100].map((x, i) => (
            <circle key={i} cx={x} cy="50" r="4" fill="#0d9488" />
          ))}
        </svg>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-8 items-center">
            {/* LEFT */}
            <div>
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100 border border-teal-200 mb-4">
                <Sparkles size={12} className="text-teal-600" />
                <span className="text-teal-700 text-xs font-semibold tracking-wider uppercase">
                  Trải nghiệm hoài niệm · Có audio guide
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none mb-3" style={{ fontFamily: "Georgia, serif" }}>
                <span className="text-teal-900">Xích Lô</span>{" "}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500">Du Lịch</span>
              </motion.h1>

              <p className="text-teal-800/70 text-sm sm:text-base max-w-xl mb-5">
                Khám phá Đà Nẵng theo cách chậm rãi, gần gũi và đầy cảm xúc. Mỗi hành trình có tai nghe tự động kể chuyện khi đến từng điểm dừng.
              </p>

              <div className="flex items-center gap-4 mb-5 overflow-hidden">
                <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} className="shrink-0">
                  <CycloIcon size={56} />
                </motion.div>
                <div className="h-10 w-px bg-teal-200 shrink-0" />
                <div className="flex items-center gap-2 min-w-0">
                  <SpeakerPulse playing={heroPlaying} />
                  <div className="min-w-0 flex-1">
                    <div className="text-teal-600 text-[10px] uppercase tracking-widest font-semibold mb-1">Audio guide</div>
                    <div className="overflow-hidden"><Waveform playing={heroPlaying} bars={20} color="#0d9488" /></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-teal-800/70 text-sm">
                <span className="flex items-center gap-1.5"><Bike size={14} className="text-teal-600" /><b className="text-teal-900">{cycloTours.length}</b> tour</span>
                <span className="flex items-center gap-1.5"><Headphones size={14} className="text-teal-600" /> 15 ngôn ngữ</span>
                <span className="flex items-center gap-1.5"><Star size={14} className="text-teal-500 fill-teal-500" /> 4.8 trung bình</span>
              </div>
            </div>

            {/* RIGHT: Audio device mockup — desktop only */}
            <motion.div initial={{ opacity: 0, scale: 0.95, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }} className="relative hidden lg:block">
              <div className="relative rounded-3xl p-6 border border-teal-200 bg-white shadow-xl"
                style={{ boxShadow: "0 24px 60px rgba(13,148,136,0.12), 0 4px 16px rgba(0,0,0,0.06)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Radio size={16} className="text-teal-600" />
                    <span className="text-teal-700 font-bold tracking-widest text-xs">IMDANANG · AUDIO</span>
                  </div>
                  <div className="flex items-center gap-1 text-teal-600/80 text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    PHÁT TRỰC TIẾP
                  </div>
                </div>
                <div className="rounded-2xl p-4 mb-4 border border-teal-100 bg-teal-50">
                  <div className="text-teal-500 text-[10px] uppercase tracking-widest mb-1">Điểm dừng 02 / 05</div>
                  <div className="text-teal-900 font-bold text-lg leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                    Công viên APEC
                  </div>
                  <div className="text-teal-700/60 text-xs mt-1 mb-3">
                    "Biểu tượng hội nhập quốc tế của Đà Nẵng, nơi từng là điểm tổ chức Hội nghị APEC 2017…"
                  </div>
                  <Waveform playing={heroPlaying} bars={36} color="#0d9488" />
                  <div className="mt-3 space-y-1">
                    <div className="h-1 rounded-full bg-teal-100 overflow-hidden">
                      <motion.div className="h-full bg-gradient-to-r from-teal-500 to-teal-400"
                        animate={{ width: `${progress}%` }} transition={{ duration: 0.1, ease: "linear" }} />
                    </div>
                    <div className="flex justify-between text-teal-400 text-[10px] font-mono">
                      <span>{Math.floor((progress / 100) * 180).toString().padStart(2, "0")}:00</span>
                      <span>03:00</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-teal-50 border border-teal-200 text-teal-500 flex items-center justify-center hover:bg-teal-100 transition-colors">
                    <ChevronRight size={16} className="rotate-180" />
                  </button>
                  <button onClick={() => setHeroPlaying((p) => !p)}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                    style={{ boxShadow: "0 8px 20px rgba(13,148,136,0.35)" }}>
                    {heroPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                  </button>
                  <button className="w-10 h-10 rounded-full bg-teal-50 border border-teal-200 text-teal-500 flex items-center justify-center hover:bg-teal-100 transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-4 text-teal-500">
                  <Volume2 size={12} />
                  <div className="flex-1 h-1 rounded-full bg-teal-100 overflow-hidden">
                    <div className="h-full w-3/4 bg-teal-400" />
                  </div>
                  <Languages size={12} />
                  <span className="text-[10px] font-mono text-teal-600">VI</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TOUR CARDS ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-teal-900 text-2xl font-black" style={{ fontFamily: "Georgia, serif" }}>
              {cycloTours.length} Hành trình có sẵn
            </h2>
            <p className="text-teal-700/60 text-sm mt-1">Hoạt động hàng ngày · Có audio guide tự động</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cycloTours.map((tour, idx) => (
            <TourCard key={tour.id} tour={tour} index={idx} />
          ))}
        </div>
      </section>

      {/* ─── AUDIO GUIDE ADD-ON ────────────────────────────── */}
      <section className="bg-gradient-to-br from-teal-950 to-teal-900 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0">
              <Headphones size={22} className="text-teal-300" />
            </div>
            <div>
              <h2 className="text-white text-xl font-bold mb-1" style={{ fontFamily: "Georgia, serif" }}>
                Thiết bị thuyết minh tự động
              </h2>
              <p className="text-teal-300/70 text-sm">Nâng cấp trải nghiệm — Audio guide đa ngôn ngữ theo GPS</p>
            </div>
          </div>

          <p className="text-teal-100/80 text-sm leading-relaxed mb-6 max-w-2xl">
            Trên hành trình xích lô, du khách có thể trang bị thiết bị audio guide đa ngôn ngữ để vừa ngắm cảnh vừa nghe giải thích về lịch sử, văn hóa các điểm nổi bật như cầu Rồng, Công viên APEC hay chợ Hàn — tự động theo GPS. Tích hợp chatbot AI để khám phá sâu hơn.
          </p>

          <div className="mb-6">
            <p className="text-teal-300 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <Languages size={13} /> 15 ngôn ngữ hỗ trợ
            </p>
            <div className="flex flex-wrap gap-2">
              {audioGuideLanguages.map((lang) => (
                <span key={lang} className="px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/25 text-teal-200 text-xs font-medium">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            {[
              { icon: Navigation, label: "Tự động theo GPS", desc: "Bắt đầu kể khi đến điểm dừng" },
              { icon: Headphones, label: "Chatbot AI tích hợp", desc: "Hỏi thêm về bất kỳ địa điểm nào" },
              { icon: Volume2,    label: "Chất lượng studio", desc: "Giọng đọc chuyên nghiệp, nhạc nền nhẹ" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4">
                <Icon size={18} className="text-teal-300 mb-2" />
                <p className="text-white font-semibold text-sm">{label}</p>
                <p className="text-teal-200/60 text-xs mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INFO: CONTACTS + PARKING ─────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Contacts */}
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6">
            <h3 className="text-teal-900 font-bold text-lg mb-4 flex items-center gap-2">
              <Phone size={18} className="text-teal-600" /> Liên hệ đặt tour
            </h3>
            <div className="space-y-3">
              {cycloContacts.map((c) => (
                <a key={c.phone} href={`tel:${c.phone.replace(/\./g, "")}`}
                  className="flex items-center justify-between p-3 bg-white rounded-xl border border-teal-100 hover:border-teal-300 hover:shadow-sm transition-all group">
                  <span className="text-teal-900 font-medium text-sm">{c.name}</span>
                  <span className="text-teal-600 font-mono text-sm font-bold group-hover:text-teal-700">{c.phone}</span>
                </a>
              ))}
            </div>
            <p className="text-teal-600/70 text-xs mt-3 text-center">Hoạt động 8:00 – 21:00 hằng ngày</p>
          </div>

          {/* Parking */}
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6">
            <h3 className="text-teal-900 font-bold text-lg mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-teal-600" /> Điểm đón khách
            </h3>
            <div className="space-y-3">
              {cycloParking.map((spot, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700 text-xs font-bold">{i + 1}</div>
                  <p className="text-teal-900/80 leading-relaxed">{spot}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 flex items-start gap-3 p-4 bg-teal-50 border border-teal-200 rounded-xl text-sm">
          <Coffee size={18} className="text-teal-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-teal-900">Lưu ý:</span>
            <span className="text-teal-800/70"> Tour Dạo ven sông Hàn hoạt động từ 8h00 đến 21h00 hằng ngày. Các tour Dấu Ấn Thời Gian và Hương Vị Việt hoạt động từ 8h00 đến 15h30. Vui lòng liên hệ trước để đặt lịch.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
