import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bus, Car, Bike, Plane, Ship, Navigation, Clock, DollarSign, PhoneCall, ChevronRight, Zap } from "lucide-react";

const transportModes = [
  { icon: Plane, label: "Sân bay", color: "text-sky-400", bg: "bg-sky-500/15 border-sky-500/30", desc: "Sân bay Đà Nẵng – Quốc tế", detail: "Trung tâm thành phố: 15 phút · Grab: 80–120K · Taxi: 100–150K" },
  { icon: Bus, label: "Xe buýt", color: "text-green-400", bg: "bg-green-500/15 border-green-500/30", desc: "Mạng lưới 10 tuyến nội thành", detail: "Giá vé: 5.000₫/lượt · Hoạt động 05:30–21:00 · Thẻ tháng 120K" },
  { icon: Car, label: "Taxi / Grab", color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/30", desc: "Grab, Be, Mai Linh, Tiên Sa", detail: "Khoảng 15K/km nội thành · Grab Car/Bike sẵn có 24/7" },
  { icon: Bike, label: "Xe máy / Xe đạp", color: "text-rose-400", bg: "bg-rose-500/15 border-rose-500/30", desc: "Thuê xe tự lái khắp thành phố", detail: "Xe máy: 100–200K/ngày · Xe đạp: 50–80K/ngày · Cọc CCCD" },
  { icon: Ship, label: "Tàu thuyền", color: "text-teal-400", bg: "bg-teal-500/15 border-teal-500/30", desc: "Phà ra đảo Cù Lao Chàm", detail: "Cảng Mân Quang → Cù Lao Chàm · 2h · 230K/người" },
  { icon: Navigation, label: "Xe điện", color: "text-purple-400", bg: "bg-purple-500/15 border-purple-500/30", desc: "Xe điện tham quan nội thành", detail: "Tour 1h30 · Các điểm trên đường ven biển · 80K/người" },
];

const routes = [
  { from: "Sân bay Đà Nẵng", to: "Bãi biển Mỹ Khê", time: "20 phút", cost: "80–120K", via: "Grab/Taxi", color: "from-sky-600 to-teal-600" },
  { from: "Trung tâm TP", to: "Bà Nà Hills", time: "45 phút", cost: "120–200K", via: "Taxi/Thuê xe", color: "from-violet-600 to-purple-700" },
  { from: "Trung tâm TP", to: "Phố Cổ Hội An", time: "35 phút", cost: "250–350K", via: "Taxi/Shuttle", color: "from-amber-600 to-orange-700" },
  { from: "Trung tâm TP", to: "Đèo Hải Vân", time: "30 phút", cost: "150–200K", via: "Taxi/Xe máy", color: "from-emerald-600 to-green-700" },
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-gray-950 to-gray-950" ref={ref}>
      <div className="relative h-64 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1400&auto=format&fit=crop" alt="Transport" className="w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-950/60 to-gray-950" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-blue-400/20 border border-blue-400/30 text-blue-300 rounded-full px-4 py-1.5 text-sm mb-4">
              <Navigation size={14} />Hướng dẫn di chuyển tại Đà Nẵng
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">Giao Thông & Di Chuyển</h1>
            <p className="text-white/60 text-base max-w-lg">Mọi thứ bạn cần biết để di chuyển thuận tiện tại thành phố biển</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10 pb-14">
        <div>
          <motion.h2 initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-white font-bold text-xl mb-5">Phương tiện di chuyển</motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {transportModes.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }} whileHover={{ scale: 1.02, y: -4 }} className={`rounded-2xl border p-5 cursor-pointer transition-shadow hover:shadow-xl ${m.bg}`} data-testid={`card-transport-${m.label.toLowerCase()}`}>
                <div className={`mb-3 ${m.color}`}><m.icon size={24} /></div>
                <h3 className="text-white font-bold text-base mb-1">{m.label}</h3>
                <p className="text-white/60 text-sm mb-2">{m.desc}</p>
                <p className="text-white/40 text-xs leading-relaxed">{m.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <motion.h2 initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-white font-bold text-xl mb-5">Tuyến đường phổ biến</motion.h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {routes.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.08 }} className="bg-gray-900 border border-white/8 rounded-2xl overflow-hidden group cursor-pointer hover:border-white/20 transition-colors">
                <div className={`h-1.5 w-full bg-gradient-to-r ${r.color}`} />
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1">
                      <div className="text-white/50 text-xs mb-0.5">Điểm đi</div>
                      <div className="text-white font-semibold text-sm">{r.from}</div>
                    </div>
                    <ChevronRight size={16} className="text-white/30 shrink-0" />
                    <div className="flex-1 text-right">
                      <div className="text-white/50 text-xs mb-0.5">Điểm đến</div>
                      <div className="text-white font-semibold text-sm">{r.to}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/8">
                    <div className="flex items-center gap-1.5 text-xs text-white/50"><Clock size={12} />{r.time}</div>
                    <div className="flex items-center gap-1.5 text-xs text-white/50"><DollarSign size={12} />{r.cost}</div>
                    <div className="text-xs text-white/50">{r.via}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <motion.h2 initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-white font-bold text-xl mb-5">Mẹo di chuyển thông minh</motion.h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {tips.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 + i * 0.07 }} className="flex items-start gap-3 bg-gray-900/60 border border-white/8 rounded-xl p-4">
                <div className="shrink-0 mt-0.5 p-2 bg-blue-500/15 rounded-lg"><t.icon size={16} className="text-blue-400" /></div>
                <p className="text-white/70 text-sm leading-relaxed">{t.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
