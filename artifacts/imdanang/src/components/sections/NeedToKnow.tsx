import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Banknote, PhoneCall, Plane, ArrowRight } from "lucide-react";

const mainTip = {
  title: "Visa & Nhập cảnh",
  badge: "Cần biết",
  badgeColor: "bg-blue-500",
  desc: "Công dân từ hơn 45 quốc gia được miễn thị thực khi đến Việt Nam. E-visa có thể xin online trong 3 ngày làm việc với chi phí 25 USD. Hộ chiếu cần còn hiệu lực ít nhất 6 tháng.",
  image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop",
};

const tips = [
  {
    id: 1,
    title: "Tiền tệ & Thanh toán",
    desc: "Đồng Việt Nam (VND). Tỷ giá: 1 USD ≈ 25,000 VND. ATM có sẵn khắp nơi. Thẻ tín dụng được chấp nhận tại hầu hết khách sạn.",
    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=500&auto=format&fit=crop",
    icon: Banknote,
  },
  {
    id: 2,
    title: "An toàn & Sức khỏe",
    desc: "Đà Nẵng rất an toàn. Nên có bảo hiểm du lịch. Uống nước đóng chai. Thoa kem chống nắng SPF 50+ khi ra biển.",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=500&auto=format&fit=crop",
    icon: Shield,
  },
  {
    id: 3,
    title: "Liên lạc khẩn cấp",
    desc: "Cảnh sát: 113 · Cứu hỏa: 114 · Cấp cứu: 115. Đường dây hỗ trợ du lịch: 1800 599 954 (miễn phí).",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=500&auto=format&fit=crop",
    icon: PhoneCall,
  },
  {
    id: 4,
    title: "Di chuyển & Giao thông",
    desc: "Grab là ứng dụng gọi xe phổ biến nhất. Thuê xe máy ~150K VND/ngày. Sân bay cách trung tâm chỉ 3km.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&auto=format&fit=crop",
    icon: Plane,
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

        <div
          className="hidden md:grid gap-3"
          style={{ gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "280px 180px" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative col-span-1 row-span-2 rounded-2xl overflow-hidden group cursor-pointer shadow-md"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <tip.icon size={14} className="text-white" />
                  </div>
                  <h4 className="text-white font-bold text-sm">{tip.title}</h4>
                </div>
                <p className="text-white/70 text-xs leading-relaxed line-clamp-3">{tip.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md h-64"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center"><tip.icon size={12} className="text-white" /></div>
                      <h4 className="text-white font-bold text-sm">{tip.title}</h4>
                    </div>
                    <p className="text-white/70 text-xs mt-1 line-clamp-2">{tip.desc}</p>
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
