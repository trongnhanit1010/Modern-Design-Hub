import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Banknote, PhoneCall, Plane, ArrowRight } from "lucide-react";

const mainTip = {
  title: "Visa & Nhập cảnh",
  subtitle: "Mọi điều bạn cần biết trước khi đến Đà Nẵng",
  desc: "Công dân từ hơn 45 quốc gia được miễn thị thực khi đến Việt Nam. E-visa có thể xin online trong 3 ngày làm việc với chi phí 25 USD. Hộ chiếu cần còn hiệu lực ít nhất 6 tháng.",
  image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop",
  badge: "Cần biết",
  badgeColor: "bg-blue-500",
  icon: Plane,
};

const tips = [
  {
    id: 1,
    title: "Tiền tệ & Thanh toán",
    desc: "Đồng Việt Nam (VND) là tiền tệ chính thức. Tỷ giá: 1 USD ≈ 24,000–25,000 VND. ATM có sẵn khắp nơi. Thẻ tín dụng được chấp nhận tại hầu hết khách sạn và nhà hàng.",
    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400&auto=format&fit=crop",
    icon: Banknote,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 2,
    title: "An toàn & Sức khỏe",
    desc: "Đà Nẵng là thành phố an toàn cho du khách. Nên có bảo hiểm du lịch. Uống nước đóng chai. Thoa kem chống nắng SPF 50+ khi ra biển.",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400&auto=format&fit=crop",
    icon: Shield,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 3,
    title: "Liên lạc khẩn cấp",
    desc: "Cảnh sát: 113 · Cứu hỏa: 114 · Cấp cứu: 115. Đường dây hỗ trợ du lịch: 1800 599 954 (miễn phí). Đại sứ quán nhiều nước tại Hà Nội, lãnh sự quán tại TP.HCM.",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&auto=format&fit=crop",
    icon: PhoneCall,
    color: "from-orange-500 to-red-500",
  },
  {
    id: 4,
    title: "Di chuyển & Giao thông",
    desc: "Grab là ứng dụng gọi xe phổ biến nhất. Xe buýt công cộng có sẵn nhưng ít tiện lợi. Thuê xe máy khoảng 150,000–200,000 VND/ngày. Sân bay cách trung tâm 3km.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&auto=format&fit=crop",
    icon: Plane,
    color: "from-violet-500 to-purple-600",
  },
];

export default function NeedToKnow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 px-4 bg-background" ref={ref} data-testid="section-need-to-know">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Thông tin cần biết</h2>
            <p className="text-muted-foreground text-sm mt-1">Chuẩn bị hành trình hoàn hảo tới Đà Nẵng</p>
          </div>
          <a href="#" className="flex items-center gap-1 text-primary text-sm font-medium hover:underline shrink-0">
            Xem thêm <ArrowRight size={14} />
          </a>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-4" style={{ gridTemplateRows: "480px" }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative col-span-1 row-span-1 rounded-3xl overflow-hidden group cursor-pointer shadow-lg"
            data-testid="card-needtoknow-main"
          >
            <img src={mainTip.image} alt={mainTip.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <span className={`inline-block self-start ${mainTip.badgeColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                {mainTip.badge}
              </span>
              <div>
                <h3 className="text-white font-bold text-2xl mb-2 font-serif">{mainTip.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">{mainTip.desc}</p>
                <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors">
                  Tìm hiểu thêm <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </motion.div>

          <div className="col-span-2 grid grid-cols-2 gap-4" style={{ gridTemplateRows: "repeat(2, 1fr)" }}>
            {tips.map((tip, i) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md"
                data-testid={`card-needtoknow-${tip.id}`}
              >
                <img src={tip.image} alt={tip.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className={`absolute inset-0 bg-gradient-to-br ${tip.color} opacity-75`} />
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <tip.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">{tip.title}</h4>
                    <p className="text-white/80 text-xs leading-relaxed line-clamp-3">{tip.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="md:hidden space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg h-64"
          >
            <img src={mainTip.image} alt={mainTip.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <span className={`inline-block self-start ${mainTip.badgeColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>{mainTip.badge}</span>
              <div>
                <h3 className="text-white font-bold text-xl font-serif mb-1">{mainTip.title}</h3>
                <p className="text-white/75 text-sm line-clamp-2">{mainTip.desc}</p>
              </div>
            </div>
          </motion.div>

          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex gap-3" style={{ width: "max-content" }}>
              {tips.map((tip, i) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="relative w-52 h-52 rounded-2xl overflow-hidden shrink-0 cursor-pointer shadow-md"
                >
                  <img src={tip.image} alt={tip.title} className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${tip.color} opacity-75`} />
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center"><tip.icon size={18} className="text-white" /></div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{tip.title}</h4>
                      <p className="text-white/75 text-xs mt-1 line-clamp-2">{tip.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
