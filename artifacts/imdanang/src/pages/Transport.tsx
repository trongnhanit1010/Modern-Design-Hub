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
      {/* ── Hero ── Compact Trip Planner ── */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#eff6ff 0%,#dbeafe 50%,#bfdbfe 100%)" }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "linear-gradient(#0ea5e9 1px,transparent 1px),linear-gradient(90deg,#0ea5e9 1px,transparent 1px)",
          backgroundSize: "28px 28px"
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
          <div className="grid md:grid-cols-[1.3fr,1fr] gap-4 items-center">
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-1.5 mb-2 px-2.5 py-1 rounded-full bg-sky-600 text-white text-[10px] font-bold tracking-wider shadow-md">
                <Navigation size={11} /> CHỈ DẪN DI CHUYỂN · LIVE
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black leading-[0.95] mb-2 text-sky-950">
                Đi Đâu <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600">Cũng Đến</span>
              </h1>
              <p className="text-sky-900/70 text-sm max-w-md mb-3 hidden sm:block">
                Sân bay, taxi, Grab, xe buýt, xe máy thuê — chọn cách đi & xem giá tức thì.
              </p>

              {/* COMPACT TRIP PLANNER (single row) */}
              <div className="rounded-xl bg-white p-1.5 shadow-2xl border-2 border-sky-200">
                <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr,auto] gap-1 items-center">
                  <div className="flex items-center gap-2 px-2 py-1.5 bg-sky-50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <MapPin size={11} />
                    </div>
                    <input value={from} onChange={e => setFrom(e.target.value)} className="w-full bg-transparent text-sky-950 text-xs font-semibold focus:outline-none min-w-0" placeholder="Điểm đi" />
                  </div>
                  <ArrowRight size={14} className="text-sky-500 hidden sm:block mx-auto" />
                  <div className="flex items-center gap-2 px-2 py-1.5 bg-sky-50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
                      <MapPin size={11} />
                    </div>
                    <input value={to} onChange={e => setTo(e.target.value)} className="w-full bg-transparent text-sky-950 text-xs font-semibold focus:outline-none min-w-0" placeholder="Điểm đến" />
                  </div>
                  <button className="bg-gradient-to-br from-sky-500 to-blue-600 text-white font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1 shrink-0">
                    <Search size={12} /> Tìm
                  </button>
                </div>
                {/* Quick info row */}
                <div className="flex justify-between mt-2 px-2 text-center text-[10px]">
                  <span className="flex items-center gap-1 text-sky-700"><Clock size={10} /> 20p</span>
                  <span className="flex items-center gap-1 text-sky-700"><Navigation size={10} /> 8.5 km</span>
                  <span className="flex items-center gap-1 text-emerald-600"><DollarSign size={10} /> ~95K</span>
                  <span className="flex items-center gap-1 text-sky-700 font-mono">{new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Compact route map */}
            <div className="relative hidden md:block h-44 lg:h-48">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-sky-200 shadow-xl bg-gradient-to-br from-sky-100 to-blue-100">
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
                  <path d="M0 160 L 400 160" stroke="#e0f2fe" strokeWidth="22" />
                  <path d="M200 0 L 200 200" stroke="#e0f2fe" strokeWidth="18" />
                  <path d="M0 60 Q 100 90, 200 70 T 400 90" stroke="#7dd3fc" strokeWidth="8" fill="none" opacity="0.6" />
                  <motion.path d="M40 170 Q 120 130, 200 110 T 360 40"
                    stroke="#0284c7" strokeWidth="3" strokeDasharray="6 5" fill="none"
                    initial={{ strokeDashoffset: 0 }} animate={{ strokeDashoffset: -22 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
                  <circle cx="40" cy="170" r="7" fill="#10b981" stroke="white" strokeWidth="2" />
                  <circle cx="200" cy="110" r="4" fill="#0ea5e9" stroke="white" strokeWidth="1.5" />
                  <circle cx="360" cy="40" r="7" fill="#f43f5e" stroke="white" strokeWidth="2" />
                </svg>
                <motion.div className="absolute w-8 h-8 rounded-full bg-sky-500 border-2 border-white shadow-lg flex items-center justify-center text-white"
                  initial={{ left: 24, top: 154 }}
                  animate={{ left: [24, 184, 344], top: [154, 94, 24] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  <Car size={14} />
                </motion.div>
                {[
                  { Icon: Plane, x: 6, y: 6, color: "bg-sky-500" },
                  { Icon: Bus, x: "auto", y: 6, color: "bg-emerald-500", right: 6 },
                  { Icon: Bike, x: 6, y: "auto", color: "bg-rose-500", bottom: 6 },
                  { Icon: Ship, x: "auto", y: "auto", color: "bg-teal-500", right: 6, bottom: 6 },
                ].map(({ Icon, x, y, color, right, bottom }, i) => (
                  <motion.div key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute w-8 h-8 rounded-xl ${color} flex items-center justify-center text-white shadow-lg border-2 border-white`}
                    style={{ left: x as any, top: y as any, right: right as any, bottom: bottom as any }}>
                    <Icon size={13} />
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
