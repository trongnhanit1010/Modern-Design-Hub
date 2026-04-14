import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bus, Car, Bike, Plane, Ship, Navigation, Clock, DollarSign, PhoneCall, ChevronRight, Zap } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gray-50" ref={ref}>
      <div className="relative h-56 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1400&auto=format&fit=crop" alt="Transport" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-gray-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-blue-500 text-white rounded-full px-4 py-1.5 text-sm mb-3 shadow-md">
              <Navigation size={14} />Hướng dẫn di chuyển tại Đà Nẵng
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Giao Thông & Di Chuyển</h1>
          </motion.div>
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
