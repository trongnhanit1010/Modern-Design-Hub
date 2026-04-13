import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarDays, MapPin, Clock, Ticket, Star, Music, Utensils, Landmark, Waves, Sparkles } from "lucide-react";

const featured = {
  name: "Lễ hội pháo hoa quốc tế Đà Nẵng 2025",
  date: "01/06 – 05/07/2025",
  time: "21:00 hàng tối thi đấu",
  location: "Cầu Rồng & Cầu Sông Hàn",
  image: "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?w=1200&auto=format&fit=crop",
  tags: ["Quốc tế", "Ngoài trời", "Miễn phí xem"],
  desc: "Sự kiện pháo hoa quốc tế lớn nhất Đông Nam Á với sự tham gia của hơn 10 quốc gia trình diễn nghệ thuật pháo hoa đỉnh cao trên bầu trời Đà Nẵng.",
};

const events = [
  { id: 1, name: "Festival Biển Đà Nẵng", category: "culture", date: "15–20 Jul 2025", time: "18:00–23:00", location: "Bãi biển Mỹ Khê", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&auto=format&fit=crop", tag: "Sắp diễn ra", icon: Waves, tagBg: "bg-sky-500" },
  { id: 2, name: "Lễ hội Ẩm thực Phố Cổ", category: "food", date: "20–22 Jul 2025", time: "09:00–22:00", location: "Phố Cổ Hội An", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop", tag: "Ẩm thực", icon: Utensils, tagBg: "bg-orange-500" },
  { id: 3, name: "Danang Music Festival", category: "music", date: "02–03 Aug 2025", time: "20:00–24:00", location: "Công viên APEC", image: "https://images.unsplash.com/photo-1501386761578-eaa54b7f791e?w=500&auto=format&fit=crop", tag: "Âm nhạc", icon: Music, tagBg: "bg-violet-500" },
  { id: 4, name: "Hội chợ Di sản Miền Trung", category: "culture", date: "10–15 Aug 2025", time: "08:00–21:00", location: "Trung tâm Triển lãm", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=500&auto=format&fit=crop", tag: "Di sản", icon: Landmark, tagBg: "bg-amber-500" },
  { id: 5, name: "Lễ Vu Lan Báo Hiếu", category: "culture", date: "10 Aug 2025", time: "Cả ngày", location: "Các chùa Đà Nẵng", image: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=500&auto=format&fit=crop", tag: "Văn hóa", icon: Star, tagBg: "bg-rose-500" },
  { id: 6, name: "Đêm nhạc Acoustic Sông Hàn", category: "music", date: "Thứ 7 hàng tuần", time: "19:30–22:00", location: "Bờ Tây Sông Hàn", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop", tag: "Định kỳ", icon: Music, tagBg: "bg-teal-500" },
];

export default function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen bg-gray-50" ref={ref}>
      <div className="relative h-56 overflow-hidden">
        <img src={featured.image} alt="Events" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-gray-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-indigo-500 text-white rounded-full px-4 py-1.5 text-sm mb-3 shadow-md">
              <CalendarDays size={14} />Sự Kiện & Lễ Hội 2025
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Đà Nẵng Lễ Hội</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 pb-14 space-y-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-white">
          <img src={featured.image} alt={featured.name} className="w-full h-56 object-cover" />
          <div className="absolute top-0 left-0 right-0 h-56 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
            {featured.tags.map((t) => <span key={t} className="bg-indigo-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">{t}</span>)}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 pb-6">
            <div className="flex items-center gap-2 text-indigo-300 text-xs mb-2"><Sparkles size={12} />SỰ KIỆN NỔI BẬT</div>
            <h2 className="text-white font-bold text-xl md:text-2xl mb-2">{featured.name}</h2>
            <p className="text-white/70 text-sm mb-3 max-w-2xl">{featured.desc}</p>
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <div className="flex items-center gap-1.5"><CalendarDays size={14} className="text-indigo-300" />{featured.date}</div>
              <div className="flex items-center gap-1.5"><Clock size={14} className="text-indigo-300" />{featured.time}</div>
              <div className="flex items-center gap-1.5"><MapPin size={14} className="text-indigo-300" />{featured.location}</div>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="absolute bottom-5 right-5 flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-lg">
            <Ticket size={15} />Đăng ký
          </motion.button>
        </motion.div>

        <div>
          <h2 className="text-gray-900 font-bold text-xl mb-5">Sự kiện sắp tới</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((e, i) => (
              <motion.div key={e.id} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 + i * 0.07 }} whileHover={{ y: -6 }} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-shadow group cursor-pointer" data-testid={`card-event-${e.id}`}>
                <div className="relative h-40 overflow-hidden">
                  <img src={e.image} alt={e.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className={`absolute top-3 left-3 text-xs font-bold text-white px-2.5 py-1 rounded-full shadow-md ${e.tagBg}`}>{e.tag}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-gray-900 font-bold text-sm mb-3 leading-tight">{e.name}</h3>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-gray-500 text-xs"><CalendarDays size={12} className="text-indigo-400 shrink-0" />{e.date}</div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs"><Clock size={12} className="text-indigo-400 shrink-0" />{e.time}</div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs"><MapPin size={12} className="text-indigo-400 shrink-0" />{e.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
