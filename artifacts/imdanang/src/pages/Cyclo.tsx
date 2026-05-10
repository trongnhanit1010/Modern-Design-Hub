import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  Bike, Headphones, Play, Pause, MapPin, Clock, Star, Globe,
  Search, Volume2, Radio, ChevronRight, Sparkles, Route, Languages,
} from "lucide-react";
import { cycloTours } from "@/data/cyclo";

const SEPIA_BG =
  "https://images.unsplash.com/photo-1528127269322-539801943592?w=1800&auto=format&fit=crop";

/* ─── Animated audio waveform ────────────────────────────── */
function Waveform({ playing, bars = 28, color = "#d97706" }: { playing: boolean; bars?: number; color?: string }) {
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

/* ─── Pulsing concentric rings around speaker ────────────── */
function SpeakerPulse({ playing }: { playing: boolean }) {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      {playing &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border-2 border-amber-500"
            initial={{ scale: 0.6, opacity: 0.7 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
          />
        ))}
      <div
        className="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg"
        style={{ boxShadow: "0 0 20px rgba(217,119,6,0.4)" }}
      >
        <Headphones size={20} className="text-white" />
      </div>
    </div>
  );
}

/* ─── Animated cyclo SVG (rolling wheels) ────────────────── */
function CycloIcon({ size = 64 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 64" width={size} height={(size * 64) / 120} fill="none">
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "92px 46px" }}
      >
        <circle cx="92" cy="46" r="14" stroke="#92400e" strokeWidth="2" />
        <line x1="92" y1="32" x2="92" y2="60" stroke="#92400e" strokeWidth="1.2" />
        <line x1="78" y1="46" x2="106" y2="46" stroke="#92400e" strokeWidth="1.2" />
        <line x1="82" y1="36" x2="102" y2="56" stroke="#92400e" strokeWidth="1.2" />
        <line x1="82" y1="56" x2="102" y2="36" stroke="#92400e" strokeWidth="1.2" />
      </motion.g>
      {[20, 50].map((cx) => (
        <motion.g
          key={cx}
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${cx}px 50px` }}
        >
          <circle cx={cx} cy="50" r="10" stroke="#92400e" strokeWidth="2" />
          <line x1={cx - 10} y1="50" x2={cx + 10} y2="50" stroke="#92400e" strokeWidth="1.2" />
          <line x1={cx} y1="40" x2={cx} y2="60" stroke="#92400e" strokeWidth="1.2" />
        </motion.g>
      ))}
      <path d="M10 30 L40 30 L40 14 L20 14 Z" fill="#fbbf24" stroke="#92400e" strokeWidth="2" />
      <path d="M10 30 L20 14" stroke="#92400e" strokeWidth="2" />
      <line x1="40" y1="30" x2="92" y2="46" stroke="#92400e" strokeWidth="3" />
      <line x1="40" y1="30" x2="50" y2="50" stroke="#92400e" strokeWidth="3" />
      <circle cx="80" cy="22" r="5" fill="#92400e" />
      <line x1="80" y1="27" x2="86" y2="40" stroke="#92400e" strokeWidth="2.5" />
    </svg>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function Cyclo() {
  const [search, setSearch] = useState("");
  const [activeArea, setActiveArea] = useState<"Tất cả" | "Đà Nẵng" | "Hội An">("Tất cả");
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [heroPlaying, setHeroPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!heroPlaying) return;
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.6)), 80);
    return () => clearInterval(id);
  }, [heroPlaying]);

  const filtered = useMemo(
    () =>
      cycloTours.filter((t) => {
        const ma = activeArea === "Tất cả" || t.area === activeArea;
        const ms =
          !search ||
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.shortDesc.toLowerCase().includes(search.toLowerCase());
        return ma && ms;
      }),
    [search, activeArea]
  );

  return (
    <div className="min-h-screen bg-white">
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-100">

        {/* Decorative dotted route line */}
        <svg className="absolute inset-x-0 bottom-0 w-full h-24 opacity-30" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <motion.path
            d="M0 50 Q 200 10, 400 50 T 800 50 T 1200 50"
            stroke="#d97706"
            strokeWidth="2"
            strokeDasharray="8 8"
            fill="none"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -32 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          {[100, 350, 600, 850, 1100].map((x, i) => (
            <circle key={i} cx={x} cy="50" r="4" fill="#d97706" />
          ))}
        </svg>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-8 items-center">
            {/* LEFT */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-200 mb-4"
              >
                <Sparkles size={12} className="text-amber-600" />
                <span className="text-amber-700 text-xs font-semibold tracking-wider uppercase">
                  Trải nghiệm hoài niệm · Có audio guide
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none mb-3"
                style={{ fontFamily: "Georgia, serif" }}
              >
                <span className="text-amber-900">Xích Lô</span>{" "}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700">
                  Du Lịch
                </span>
              </motion.h1>

              <p className="text-amber-800/70 text-base max-w-xl mb-6">
                Mỗi vòng bánh xe là một câu chuyện. Tai nghe sẽ tự động kể bạn nghe khi đến từng điểm dừng – như có hướng dẫn viên riêng đi theo.
              </p>

              <div className="flex items-center gap-5 mb-6">
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <CycloIcon size={88} />
                </motion.div>
                <div className="h-12 w-px bg-amber-200" />
                <div className="flex items-center gap-3">
                  <SpeakerPulse playing={heroPlaying} />
                  <div>
                    <div className="text-amber-600 text-[10px] uppercase tracking-widest font-semibold">Audio guide</div>
                    <Waveform playing={heroPlaying} bars={32} color="#d97706" />
                  </div>
                </div>
              </div>

              <div className="flex gap-5 text-amber-800/70 text-sm">
                <span className="flex items-center gap-1.5"><Bike size={14} className="text-amber-600" /><b className="text-amber-900">{cycloTours.length}</b> tour</span>
                <span className="flex items-center gap-1.5"><Headphones size={14} className="text-amber-600" /> 6 ngôn ngữ</span>
                <span className="flex items-center gap-1.5"><Star size={14} className="text-amber-500 fill-amber-500" /> 4.8 trung bình</span>
              </div>
            </div>

            {/* RIGHT: Audio device mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="relative"
            >
              <div
                className="relative rounded-3xl p-6 border border-amber-200 bg-white shadow-xl"
                style={{ boxShadow: "0 24px 60px rgba(217,119,6,0.12), 0 4px 16px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Radio size={16} className="text-amber-600" />
                    <span className="text-amber-700 font-bold tracking-widest text-xs">IMDANANG · AUDIO</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600/80 text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    PHÁT TRỰC TIẾP
                  </div>
                </div>

                <div
                  className="rounded-2xl p-4 mb-4 border border-amber-100 bg-amber-50"
                >
                  <div className="text-amber-500 text-[10px] uppercase tracking-widest mb-1">
                    Điểm dừng 02 / 04
                  </div>
                  <div className="text-amber-900 font-bold text-lg leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                    Chùa Cầu Nhật Bản
                  </div>
                  <div className="text-amber-700/60 text-xs mt-1 mb-3">
                    "Cây cầu được xây dựng giữa thế kỷ 17, là minh chứng cho sự giao thoa giữa hai nền văn hóa…"
                  </div>

                  <Waveform playing={heroPlaying} bars={36} color="#d97706" />

                  <div className="mt-3 space-y-1">
                    <div className="h-1 rounded-full bg-amber-100 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                      />
                    </div>
                    <div className="flex justify-between text-amber-400 text-[10px] font-mono">
                      <span>{Math.floor((progress / 100) * 240).toString().padStart(2, "0")}:00</span>
                      <span>04:00</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center hover:bg-amber-100 transition-colors">
                    <ChevronRight size={16} className="rotate-180" />
                  </button>
                  <button
                    onClick={() => setHeroPlaying((p) => !p)}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                    style={{ boxShadow: "0 8px 20px rgba(217,119,6,0.35)" }}
                  >
                    {heroPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                  </button>
                  <button className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center hover:bg-amber-100 transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-4 text-amber-500">
                  <Volume2 size={12} />
                  <div className="flex-1 h-1 rounded-full bg-amber-100 overflow-hidden">
                    <div className="h-full w-3/4 bg-amber-400" />
                  </div>
                  <Languages size={12} />
                  <span className="text-[10px] font-mono text-amber-600">VI</span>
                </div>
              </div>

              <svg className="absolute -top-6 -right-3 w-16 h-16 opacity-40" viewBox="0 0 64 64">
                <motion.path
                  d="M10 10 Q 20 30, 30 20 T 54 30"
                  stroke="#d97706"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
              </svg>
            </motion.div>
          </div>

          {/* ─── SEARCH bar ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 relative max-w-3xl mx-auto"
          >
            <div className="rounded-2xl p-2 sm:p-3 flex items-center gap-2 bg-white border border-amber-200 shadow-sm">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-widest border border-amber-100">
                <Route size={14} /> Tour
              </div>
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search size={16} className="text-amber-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm hành trình xích lô của bạn..."
                  className="bg-transparent flex-1 text-amber-900 placeholder:text-amber-400/70 text-sm focus:outline-none py-2"
                />
              </div>
              <div className="flex items-center gap-1 pr-1">
                {(["Tất cả", "Đà Nẵng", "Hội An"] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => setActiveArea(a)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeArea === a
                        ? "bg-amber-500 text-white"
                        : "text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TOUR LIST ──────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-amber-900 text-lg font-bold flex items-center gap-2">
            <Bike size={18} className="text-amber-600" />
            {filtered.length} hành trình có sẵn
          </h2>
          <span className="text-amber-600/60 text-xs">Chạm vào sóng âm để nghe thử</span>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((tour, idx) => {
              const isPlaying = playingId === tour.id;
              return (
                <motion.div
                  key={tour.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative rounded-3xl overflow-hidden border border-amber-100 bg-white shadow-sm hover:shadow-md hover:border-amber-200 transition-all"
                >
                  {/* IMAGE */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      <MapPin size={10} /> {tour.area}
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                      <Star size={10} className="fill-amber-500 text-amber-500" /> {tour.rating}
                    </div>

                    <motion.div
                      className="absolute bottom-2 right-2 opacity-90"
                      animate={{ x: [0, -6, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    >
                      <CycloIcon size={56} />
                    </motion.div>

                    <div className="absolute bottom-3 left-3 right-20">
                      <h3 className="text-white font-bold text-xl leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                        {tour.name}
                      </h3>
                      <div className="flex items-center gap-3 text-white/75 text-[11px] mt-1">
                        <span className="flex items-center gap-1"><Clock size={10} />{tour.duration}</span>
                        <span className="flex items-center gap-1"><Route size={10} />{tour.distanceKm} km</span>
                      </div>
                    </div>
                  </div>

                  {/* AUDIO ROW */}
                  <div className="px-4 pt-3 pb-4">
                    <div
                      className="flex items-center gap-3 rounded-2xl border border-amber-100 bg-amber-50 px-3 py-2.5 mb-3"
                    >
                      <button
                        onClick={() => setPlayingId(isPlaying ? null : tour.id)}
                        className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                        style={{ boxShadow: "0 4px 12px rgba(217,119,6,0.35)" }}
                      >
                        {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-[10px] mb-1">
                          <span className="text-amber-600 uppercase tracking-widest font-bold">Audio preview</span>
                          <span className="text-amber-400 font-mono">04:00</span>
                        </div>
                        <Waveform playing={isPlaying} bars={26} color="#d97706" />
                      </div>
                    </div>

                    <p className="text-amber-800/65 text-xs leading-relaxed line-clamp-2 mb-3">
                      {tour.shortDesc}
                    </p>

                    <div className="flex items-center justify-between text-[11px] mb-3">
                      <div className="flex items-center gap-3 text-amber-700/60">
                        <span className="flex items-center gap-1">
                          <MapPin size={11} className="text-amber-500" />
                          {tour.stops.length} điểm dừng
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe size={11} className="text-amber-500" />
                          {tour.languages.length} ngôn ngữ
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-amber-100">
                      <div>
                        <div className="text-amber-700 text-xl font-bold">
                          {tour.price.toLocaleString("vi-VN")}đ
                        </div>
                        <div className="text-amber-500/70 text-[10px]">/ người · bao audio guide</div>
                      </div>
                      <Link href={`/xich-lo-du-lich/${tour.slug}`}>
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-bold shadow-md"
                          style={{
                            background: "linear-gradient(135deg, #d97706, #b45309)",
                            boxShadow: "0 6px 18px rgba(217,119,6,0.35)",
                          }}
                        >
                          Đặt tour <ChevronRight size={14} />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="py-20 flex flex-col items-center text-center">
            <Bike size={40} className="text-amber-200 mb-3" />
            <p className="text-amber-700 font-medium">Không tìm thấy tour phù hợp</p>
            <p className="text-amber-400 text-sm mt-1">Thử thay đổi khu vực hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </section>
    </div>
  );
}
