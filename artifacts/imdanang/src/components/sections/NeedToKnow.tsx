import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Banknote, PhoneCall, Plane, ArrowRight, CheckCircle2 } from "lucide-react";

const mainTip = {
  title: "Visa & Nhập cảnh",
  badge: "Cần biết",
  desc: "Công dân từ hơn 45 quốc gia được miễn thị thực khi đến Việt Nam. E-visa có thể xin online trong 3 ngày làm việc với chi phí 25 USD. Hộ chiếu cần còn hiệu lực ít nhất 6 tháng.",
};

const tips = [
  {
    id: 1,
    title: "Tiền tệ & Thanh toán",
    desc: "Đồng Việt Nam (VND). Tỷ giá: 1 USD ≈ 25,000 VND. ATM có sẵn khắp nơi. Thẻ tín dụng được chấp nhận tại hầu hết khách sạn.",
    icon: Banknote,
    iconBg: "bg-emerald-100 dark:bg-emerald-950/60",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconHoverBg: "group-hover:bg-emerald-500",
    accentBorder: "group-hover:border-emerald-200 dark:group-hover:border-emerald-800",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
    linkColor: "text-emerald-600 dark:text-emerald-400",
    glowColor: "group-hover:shadow-emerald-900/10",
  },
  {
    id: 2,
    title: "An toàn & Sức khỏe",
    desc: "Đà Nẵng rất an toàn. Nên có bảo hiểm du lịch. Uống nước đóng chai. Thoa kem chống nắng SPF 50+ khi ra biển.",
    icon: Shield,
    iconBg: "bg-amber-100 dark:bg-amber-950/60",
    iconColor: "text-amber-600 dark:text-amber-400",
    iconHoverBg: "group-hover:bg-amber-500",
    accentBorder: "group-hover:border-amber-200 dark:group-hover:border-amber-800",
    badgeBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
    linkColor: "text-amber-600 dark:text-amber-400",
    glowColor: "group-hover:shadow-amber-900/10",
  },
  {
    id: 3,
    title: "Liên lạc khẩn cấp",
    desc: "Cảnh sát: 113 · Cứu hỏa: 114 · Cấp cứu: 115. Đường dây hỗ trợ du lịch: 1800 599 954 (miễn phí).",
    icon: PhoneCall,
    iconBg: "bg-rose-100 dark:bg-rose-950/60",
    iconColor: "text-rose-600 dark:text-rose-400",
    iconHoverBg: "group-hover:bg-rose-500",
    accentBorder: "group-hover:border-rose-200 dark:group-hover:border-rose-800",
    badgeBg: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400",
    linkColor: "text-rose-600 dark:text-rose-400",
    glowColor: "group-hover:shadow-rose-900/10",
  },
  {
    id: 4,
    title: "Di chuyển & Giao thông",
    desc: "Grab là ứng dụng gọi xe phổ biến nhất. Thuê xe máy ~150K VND/ngày. Sân bay cách trung tâm chỉ 3km.",
    icon: Plane,
    iconBg: "bg-violet-100 dark:bg-violet-950/60",
    iconColor: "text-violet-600 dark:text-violet-400",
    iconHoverBg: "group-hover:bg-violet-500",
    accentBorder: "group-hover:border-violet-200 dark:group-hover:border-violet-800",
    badgeBg: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400",
    linkColor: "text-violet-600 dark:text-violet-400",
    glowColor: "group-hover:shadow-violet-900/10",
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

        <div className="hidden md:grid grid-cols-[1.15fr_1.85fr] gap-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 via-blue-600 to-cyan-500 p-7 text-white shadow-xl shadow-sky-900/15"
            data-testid="card-needtoknow-main"
          >
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute -bottom-20 -left-12 h-52 w-52 rounded-full bg-cyan-200/20 blur-3xl" />
            <div className="relative z-10 flex h-full min-h-[390px] flex-col justify-between">
              <div>
                <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                  {mainTip.badge}
                </span>
                <h3 className="mt-5 font-serif text-3xl font-bold leading-tight">{mainTip.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80">{mainTip.desc}</p>
              </div>

              <div className="mt-6 space-y-3">
                {["Kiểm tra hộ chiếu còn hạn 6 tháng", "Xin e-visa online trước chuyến đi", "Lưu bản mềm giấy tờ quan trọng"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 rounded-2xl bg-white/15 p-3 backdrop-blur">
                    <CheckCircle2 size={17} className="shrink-0 text-emerald-200" />
                    <span className="text-sm font-medium text-white/90">{item}</span>
                  </div>
                ))}
              </div>

              <button className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-lg shadow-blue-950/15 transition-transform hover:-translate-y-0.5">
                Tìm hiểu thêm <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {tips.map((tip, i) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 26 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.15, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className={`group rounded-3xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-xl ${tip.accentBorder} ${tip.glowColor}`}
                data-testid={`card-needtoknow-${tip.id}`}
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all ${tip.iconBg} ${tip.iconColor} ${tip.iconHoverBg} group-hover:text-white`}>
                    <tip.icon size={22} />
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${tip.badgeBg}`}>
                    0{tip.id}
                  </span>
                </div>
                <h4 className="text-base font-bold text-foreground">{tip.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip.desc}</p>
                <button className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${tip.linkColor}`}>
                  Chi tiết <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="md:hidden space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-gradient-to-br from-sky-600 via-blue-600 to-cyan-500 p-5 text-white shadow-lg"
          >
            <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">{mainTip.badge}</span>
            <h3 className="mt-4 font-serif text-2xl font-bold">{mainTip.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/80 line-clamp-4">{mainTip.desc}</p>
          </motion.div>

          <div className="grid gap-3">
            {tips.map((tip, i) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tip.iconBg} ${tip.iconColor}`}>
                  <tip.icon size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{tip.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{tip.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
