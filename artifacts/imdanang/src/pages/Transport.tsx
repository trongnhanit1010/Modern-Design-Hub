import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Bus, Car, Bike, Plane, Ship, Navigation, Clock, DollarSign, PhoneCall, ChevronRight, Zap, MapPin, ArrowRight, Search } from "lucide-react";

const transportModes = [
  { icon: Plane, label: "Sân bay", color: "text-sky-500", bg: "bg-sky-50 border-sky-200", iconBg: "bg-sky-100", desc: "Sân bay Đà Nẵng – Quốc tế", detail: "Trung tâm thành phố: 15 phút · Grab: 80–120K · Taxi: 100–150K" },
  { icon: Bus, label: "Xe buýt", color: "text-green-600", bg: "bg-green-50 border-green-200", iconBg: "bg-green-100", desc: "Mạng lưới 10 tuyến nội thành", detail: "Giá vé: 5.000₫/lượt · Hoạt động 05:30–21:00 · Thẻ tháng 120K" },
  { icon: Car, label: "Taxi / Grab", color: "text-amber-600", bg: "bg-amber-50 border-amber-200", iconBg: "bg-amber-100", desc: "Grab, Be, Mai Linh, Tiên Sa", detail: "Khoảng 15K/km nội thành · Grab Car/Bike sẵn có 24/7" },
  { icon: Bike, label: "Xe máy / Xe đạp", color: "text-rose-500", bg: "bg-rose-50 border-rose-200", iconBg: "bg-rose-100", desc: "Thuê xe tự lái khắp thành phố", detail: "Xe máy: 100–200K/ngày · Xe đạp: 50–80K/ngày · Cọc CCCD" },
  { icon: Ship, label: "Tàu thuyền", color: "text-teal-600", bg: "bg-teal-50 border-teal-200", iconBg: "bg-teal-100", desc: "Phà ra đảo Cù Lao Chàm", detail: "Cảng Mân Quang → Cù Lao Chàm · 2h · 230K/người" },
  { icon: Navigation, label: "Xe điện", color: "text-purple-600", bg: "bg-purple-50 border-purple-200", iconBg: "bg-purple-100", desc: "Xe điện tham quan nội thành", detail: "Tour 1h30 · Các điểm trên đường ven biển · 80K/người" },
];

const routes = [
  { from: "Sân bay Đà Nẵng", to: "Bãi biển Mỹ Khê", time: "20 phút", cost: "80–120K", via: "Grab/Taxi", accent: "border-l-sky-400", tagColor: "bg-sky-100 text-sky-700" },
  { from: "Trung tâm TP", to: "Bà Nà Hills", time: "45 phút", cost: "120–200K", via: "Taxi/Thuê xe", accent: "border-l-violet-400", tagColor: "bg-violet-100 text-violet-700" },
  { from: "Trung tâm TP", to: "Phố Cổ Hội An", time: "35 phút", cost: "250–350K", via: "Taxi/Shuttle", accent: "border-l-amber-400", tagColor: "bg-amber-100 text-amber-700" },
  { from: "Trung tâm TP", to: "Đèo Hải Vân", time: "30 phút", cost: "150–200K", via: "Taxi/Xe máy", accent: "border-l-emerald-400", tagColor: "bg-emerald-100 text-emerald-700" },
];

const tips = [
  { icon: Zap, tip: "Dùng Grab đặt trước để không bị chặt chém giá" },
  { icon: PhoneCall, tip: "Lưu số taxi uy tín: Mai Linh 0236 3525 252" },
  { icon: Clock, tip: "Giờ cao điểm 07:00–08:30 và 17:00–18:30, hạn chế di chuyển" },
  { icon: DollarSign, tip: "Xe buýt số 6 nối sân bay với trung tâm giá chỉ 5K" },
];

export default function Transport() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [from, setFrom] = useState("Sân bay Đà Nẵng");
  const [to, setTo] = useState("Bãi biển Mỹ Khê");

  return (
    <div className="min-h-screen bg-gray-50" ref={ref}>
      {/* ── Hero ── Trip Planner with Animated Route ── */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#eff6ff 0%,#dbeafe 50%,#bfdbfe 100%)" }}>
        {/* Sky grid */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "linear-gradient(#0ea5e9 1px,transparent 1px),linear-gradient(90deg,#0ea5e9 1px,transparent 1px)",
          backgroundSize: "32px 32px"
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-12">
          <div className="grid lg:grid-cols-[1fr,1.1fr] gap-8 items-center">
            {/* LEFT: Title + planner */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-sky-600 text-white text-xs font-bold shadow-md">
                <Navigation size={13} />
                CHỈ DẪN DI CHUYỂN · LIVE
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-3 text-sky-950">
                Đi Đâu
                <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600">
                  Cũng Đến
                </span>
              </h1>
              <p className="text-sky-900/70 text-base max-w-md leading-relaxed mb-6">
                Sân bay, taxi, Grab, xe buýt, xe máy thuê, phà — chọn cách đi phù hợp & xem giá ngay.
              </p>

              {/* TRIP PLANNER WIDGET */}
              <div className="rounded-3xl bg-white p-2 sm:p-3 shadow-2xl border-2 border-sky-200">
                <div className="flex items-center justify-between px-2 mb-2">
                  <div className="text-[10px] font-black tracking-widest text-sky-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> TRIP PLANNER
                  </div>
                  <div className="text-[10px] text-sky-500 font-mono">{new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 bg-sky-50 rounded-xl px-3 py-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <MapPin size={14} />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-wider text-sky-600 font-bold">Điểm đi</div>
                      <input value={from} onChange={e => setFrom(e.target.value)} className="w-full bg-transparent text-sky-950 text-sm font-semibold focus:outline-none" />
                    </div>
                  </div>
                  {/* Connector dots */}
                  <div className="flex items-center justify-center gap-1 -my-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <span key={i} className="block w-1 h-1 rounded-full bg-sky-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 bg-sky-50 rounded-xl px-3 py-2.5">
                    <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
                      <MapPin size={14} />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-wider text-sky-600 font-bold">Điểm đến</div>
                      <input value={to} onChange={e => setTo(e.target.value)} className="w-full bg-transparent text-sky-950 text-sm font-semibold focus:outline-none" />
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-sky-500/40 transition-shadow">
                    <Search size={14} /> Tìm phương tiện <ArrowRight size={14} />
                  </button>
                </div>
                {/* Quick stats */}
                <div className="flex justify-around mt-3 pt-3 border-t border-sky-100 text-center">
                  <div><div className="text-sky-950 font-black text-sm">20p</div><div className="text-sky-600 text-[10px]">ETA</div></div>
                  <div><div className="text-sky-950 font-black text-sm">8.5km</div><div className="text-sky-600 text-[10px]">Khoảng cách</div></div>
                  <div><div className="text-sky-950 font-black text-sm">~95K</div><div className="text-sky-600 text-[10px]">Giá</div></div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Animated route map */}
            <div className="relative h-[320px] lg:h-[420px] hidden md:block">
              <div className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-sky-200 shadow-2xl bg-gradient-to-br from-sky-100 to-blue-100">
                <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                  {/* Map roads */}
                  <path d="M0 320 L 400 320" stroke="#e0f2fe" strokeWidth="40" />
                  <path d="M180 0 L 180 400" stroke="#e0f2fe" strokeWidth="32" />
                  <path d="M0 180 L 400 180" stroke="#e0f2fe" strokeWidth="28" />
                  {/* River */}
                  <path d="M0 80 Q 100 120, 200 100 T 400 130" stroke="#7dd3fc" strokeWidth="14" fill="none" opacity="0.6" />
                  {/* Route dotted line */}
                  <motion.path
                    d="M50 350 Q 120 280, 180 220 T 340 80"
                    stroke="#0284c7" strokeWidth="4" strokeDasharray="8 6" fill="none"
                    initial={{ strokeDashoffset: 0 }} animate={{ strokeDashoffset: -28 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Stops */}
                  <circle cx="50" cy="350" r="10" fill="#10b981" stroke="white" strokeWidth="3" />
                  <circle cx="180" cy="220" r="6" fill="#0ea5e9" stroke="white" strokeWidth="2" />
                  <circle cx="340" cy="80" r="10" fill="#f43f5e" stroke="white" strokeWidth="3" />
                </svg>

                {/* Moving vehicle */}
                <motion.div
                  className="absolute w-10 h-10 rounded-full bg-sky-500 border-4 border-white shadow-lg flex items-center justify-center text-white"
                  initial={{ left: 30, top: 330 }}
                  animate={{
                    left: [30, 165, 320],
                    top: [330, 200, 60],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Car size={18} />
                </motion.div>

                {/* Pin labels */}
                <div className="absolute bottom-6 left-12 bg-white/95 backdrop-blur rounded-lg px-2 py-1 shadow-md border border-sky-100">
                  <div className="text-[9px] uppercase font-bold text-emerald-600">Start</div>
                  <div className="text-sky-950 text-xs font-bold">Sân bay</div>
                </div>
                <div className="absolute top-6 right-12 bg-white/95 backdrop-blur rounded-lg px-2 py-1 shadow-md border border-sky-100">
                  <div className="text-[9px] uppercase font-bold text-rose-600">End</div>
                  <div className="text-sky-950 text-xs font-bold">Mỹ Khê</div>
                </div>

                {/* Floating mode badges */}
                {[
                  { Icon: Plane, x: 8, y: 8, color: "bg-sky-500" },
                  { Icon: Bus, x: 300, y: 8, color: "bg-emerald-500" },
                  { Icon: Bike, x: 8, y: 300, color: "bg-rose-500" },
                  { Icon: Ship, x: 300, y: 300, color: "bg-teal-500" },
                ].map(({ Icon, x, y, color }, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute w-10 h-10 rounded-2xl ${color} flex items-center justify-center text-white shadow-xl border-2 border-white`}
                    style={{ left: x, top: y }}
                  >
                    <Icon size={16} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10 pb-14">
        <div>
          <motion.h2 initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-gray-900 font-bold text-xl mb-5">Phương tiện di chuyển</motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {transportModes.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }} whileHover={{ scale: 1.02, y: -4 }} className={`rounded-2xl border p-5 cursor-pointer bg-white hover:shadow-lg transition-shadow ${m.bg}`} data-testid={`card-transport-${m.label.toLowerCase()}`}>
                <div className={`w-10 h-10 rounded-xl ${m.iconBg} flex items-center justify-center mb-3`}>
                  <m.icon size={20} className={m.color} />
                </div>
                <h3 className="text-gray-900 font-bold text-base mb-1">{m.label}</h3>
                <p className="text-gray-600 text-sm mb-2">{m.desc}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{m.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <motion.h2 initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-gray-900 font-bold text-xl mb-5">Tuyến đường phổ biến</motion.h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {routes.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.08 }} className={`bg-white border border-gray-200 rounded-2xl overflow-hidden group cursor-pointer hover:shadow-md transition-shadow border-l-4 ${r.accent}`}>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1">
                      <div className="text-gray-400 text-xs mb-0.5">Điểm đi</div>
                      <div className="text-gray-800 font-semibold text-sm">{r.from}</div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 shrink-0" />
                    <div className="flex-1 text-right">
                      <div className="text-gray-400 text-xs mb-0.5">Điểm đến</div>
                      <div className="text-gray-800 font-semibold text-sm">{r.to}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500"><Clock size={12} className="text-gray-400" />{r.time}</div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500"><DollarSign size={12} className="text-gray-400" />{r.cost}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.tagColor}`}>{r.via}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <motion.h2 initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-gray-900 font-bold text-xl mb-5">Mẹo di chuyển thông minh</motion.h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {tips.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 + i * 0.07 }} className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
                <div className="shrink-0 mt-0.5 p-2 bg-blue-50 rounded-lg"><t.icon size={16} className="text-blue-500" /></div>
                <p className="text-gray-600 text-sm leading-relaxed">{t.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
