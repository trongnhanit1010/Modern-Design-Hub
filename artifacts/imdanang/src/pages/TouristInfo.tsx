import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Landmark, Hotel, Bus, Stethoscope, DollarSign,
  MapPin, Phone, ChevronDown, ChevronRight, Clock, Ticket,
  Star, TreePine, Pill, Building2, Waves, ArrowRight, Route,
} from "lucide-react";
import { busRoutes, journeyGuides, type BusRoute, type JourneyGuide } from "@/data/busRoutes";

const TABS = [
  { id: "culture",   label: "Di tích & Văn hóa", icon: Landmark,    color: "text-amber-600",  bg: "bg-amber-50 dark:bg-amber-950/30",  border: "border-amber-200 dark:border-amber-800",  active: "bg-amber-600" },
  { id: "hotels",    label: "Lưu trú",            icon: Hotel,       color: "text-blue-600",   bg: "bg-blue-50 dark:bg-blue-950/30",    border: "border-blue-200 dark:border-blue-800",    active: "bg-blue-600" },
  { id: "transport", label: "Di chuyển xe buýt",  icon: Bus,         color: "text-emerald-600",bg: "bg-emerald-50 dark:bg-emerald-950/30",border: "border-emerald-200 dark:border-emerald-800", active: "bg-emerald-600" },
  { id: "services",  label: "Dịch vụ thiết yếu",  icon: Stethoscope, color: "text-rose-600",   bg: "bg-rose-50 dark:bg-rose-950/30",    border: "border-rose-200 dark:border-rose-800",    active: "bg-rose-600" },
];

// ── DATA ──────────────────────────────────────────────────────────────────────

const HOI_AN_INFO = {
  title: "Phố cổ Hội An",
  subtitle: "Di sản văn hóa thế giới UNESCO (1999) · Di tích quốc gia đặc biệt",
  desc: "Đô thị cổ Hội An với hơn 1.000 di tích giàu giá trị kiến trúc nghệ thuật bao gồm đình, chùa, hội quán, cầu, nhà ở, nhà thờ tộc, giếng cổ và nhiều lễ hội truyền thống đặc sắc.",
  tickets: [
    { label: "Khách Việt Nam", price: "80.000đ / người" },
    { label: "Khách nước ngoài", price: "120.000đ / người" },
    { label: "Trẻ em dưới 16 tuổi", price: "Miễn phí" },
  ],
  selling: [
    { place: "Bán vé online", address: "49 Phan Chu Trinh, Hội An" },
    { place: "Điểm bán trực tiếp", address: "Các tuyến đường: Lê Lợi, Nguyễn Huệ, Hai Bà Trưng, Nguyễn Phúc Chu, Nguyễn Thị Minh Khai" },
  ],
};

const VILLAGES = [
  { name: "Làng mộc Kim Bồng", address: "Các tổ dân phố Phước Trung, Trung Hà, Đông Hà, phường Hội An", adult: "35.000đ", child: "", phone: "0901 137 313", contact: "Trần Đình Vũ" },
  { name: "Làng gốm Thanh Hà", address: "Khối Nam Diêu, phường Hội An Tây", adult: "35.000đ", child: "15.000đ", phone: "0937 021 704", contact: "Hồ Hữu Chánh" },
  { name: "Làng rau Trà Quế",  address: "Thôn Trà Quế, phường Hội An Tây", adult: "35.000đ", child: "", phone: "0937 021 704", contact: "Hồ Hữu Chánh" },
];

const HOTELS: {
  area: "danang" | "hoian";
  location: "center" | "beach";
  stars: "budget" | "luxury";
  name: string;
  address: string;
}[] = [
  // Da Nang center budget
  { area: "danang", location: "center", stars: "budget", name: "Sunriver", address: "132–136 Bạch Đằng, Sơn Trà" },
  { area: "danang", location: "center", stars: "budget", name: "Pariat River Front Hotel", address: "202–204 Bạch Đằng, Hải Châu" },
  { area: "danang", location: "center", stars: "budget", name: "Moonlight Hotel", address: "136–140 Phan Châu Trinh, Hải Châu" },
  { area: "danang", location: "center", stars: "budget", name: "Tre Xanh Bên Cảng", address: "177 Trần Phú, Hải Châu" },
  { area: "danang", location: "center", stars: "budget", name: "Val Soleil", address: "186 Trần Phú, Phước Ninh, Sơn Trà" },
  { area: "danang", location: "center", stars: "budget", name: "Adaline Hotel", address: "45–47 Võ Văn Kiệt, Sơn Trà" },
  { area: "danang", location: "center", stars: "budget", name: "Hoàng Đại II", address: "97 Võ Văn Kiệt, Phước Mỹ, Sơn Trà" },
  // Da Nang beach budget
  { area: "danang", location: "beach", stars: "budget", name: "Seafront Hotel", address: "240 Võ Nguyên Giáp, Sơn Trà" },
  { area: "danang", location: "beach", stars: "budget", name: "Hùng Anh Hotel", address: "25 Võ Văn Kiệt, Phước Mỹ, Sơn Trà" },
  { area: "danang", location: "beach", stars: "budget", name: "Nam Hotel & Spa", address: "109A Dương Đình Nghệ, An Hải Bắc, Sơn Trà" },
  { area: "danang", location: "beach", stars: "budget", name: "Grand Sunrise 3", address: "05 Đường Morrison, Sơn Trà" },
  { area: "danang", location: "beach", stars: "budget", name: "Titan Hotel", address: "102–104 Hồ Xuân Hương, Ngũ Hành Sơn" },
  { area: "danang", location: "beach", stars: "budget", name: "San San Hotel", address: "54 An Thượng 26, Mỹ An, Ngũ Hành Sơn" },
  // Hoi An center luxury
  { area: "hoian", location: "center", stars: "luxury", name: "Vĩnh Hưng Riverside Resort", address: "111 Ngô Quyền, Hội An" },
  { area: "hoian", location: "center", stars: "luxury", name: "Hội An Historic Hotel", address: "10 Trần Hưng Đạo, Hội An" },
  { area: "hoian", location: "center", stars: "luxury", name: "Hội An Central Hotel", address: "91 Hùng Vương, Hội An" },
  { area: "hoian", location: "center", stars: "luxury", name: "Hadana Boutique Resort", address: "538 Cửa Đại, Hội An" },
  // Hoi An beach luxury
  { area: "hoian", location: "beach", stars: "luxury", name: "Victoria Hội An Resort", address: "Đường Âu Cơ, Cửa Đại, Hội An" },
  { area: "hoian", location: "beach", stars: "luxury", name: "Mường Thanh Hội An", address: "Khu đô thị Phước Trạch, Âu Cơ, Hội An" },
  { area: "hoian", location: "beach", stars: "luxury", name: "Legacy Hoi An Resort", address: "Thôn Thanh Đông, phường Hội An Đông" },
  { area: "hoian", location: "beach", stars: "luxury", name: "Hội An Beach Resort", address: "01 Cửa Đại, phường Hội An Đông" },
  { area: "hoian", location: "beach", stars: "luxury", name: "The Saga Hotel Hội An", address: "321 Cửa Đại, Hội An" },
  // Hoi An center budget
  { area: "hoian", location: "center", stars: "budget", name: "Emerald Hoi An Riverside Resort", address: "An Hội, Phường Minh An, Hội An" },
  { area: "hoian", location: "center", stars: "budget", name: "The Signature Hoi An", address: "21 La Hối, Hội An" },
  { area: "hoian", location: "center", stars: "budget", name: "Rivertown Resort & Spa", address: "47 Thoại Ngọc Hầu, Hội An" },
  // Hoi An beach budget
  { area: "hoian", location: "beach", stars: "budget", name: "Ally Beach Boutique Hotel & Spa", address: "15 Phan Tình, Cửa Đại, Hội An" },
  { area: "hoian", location: "beach", stars: "budget", name: "Lasenta Boutique Hotel", address: "57 Lý Thường Kiệt, Hội An" },
  { area: "hoian", location: "beach", stars: "budget", name: "Ancient House Hotel", address: "377 Cửa Đại, Hội An" },
  { area: "hoian", location: "beach", stars: "budget", name: "Hotel Aurora (Hừng Đông)", address: "242 Cửa Đại, Hội An" },
  { area: "hoian", location: "beach", stars: "budget", name: "Silkian Hoian Boutique Hotel & Spa", address: "07 Lê Đình Thám, Cẩm Châu, Hội An" },
];


const PHARMACIES = {
  danang: [
    { area: "Khu vực Trần Phú", items: [
      { name: "Hana Pharmacy", address: "149 Trần Phú, Hải Châu", phone: "0338 891 822" },
      { name: "Dapharco BLU Pharmacy", address: "110 Trần Phú, Hải Châu", phone: "0918 727 489" },
      { name: "Blue Pharmacy", address: "07 Trần Quốc Toản, Hải Châu", phone: "0773 252 934" },
      { name: "Nhà thuốc ABC", address: "47 Trần Quốc Toản, Hải Châu", phone: "0236 3820 015" },
    ]},
    { area: "Khu vực Bạch Đằng", items: [
      { name: "Diệp Tô Đường (Y học cổ truyền)", address: "120 Bạch Đằng, Hải Châu", phone: "0236 3822 828" },
    ]},
    { area: "Khu vực Nguyễn Thái Học", items: [
      { name: "Sông Hàn Pharmacy", address: "53 Nguyễn Thái Học, Hải Châu", phone: "0886 194 499" },
      { name: "Pharmacity Thái Phiên", address: "37 Thái Phiên, Hải Châu", phone: "1800 6821" },
      { name: "FPT Long Châu Đống Đa", address: "120–122 Đống Đa, Hải Châu", phone: "1800 6928" },
    ]},
  ],
  hoian: [
    { name: "Long Châu Pharmacy", address: "105 Nguyễn Thị Minh Khai", phone: "" },
    { name: "Nhà thuốc Minh An 115", address: "115 Nguyễn Phúc Tầng", phone: "0901 167 317" },
    { name: "Nhà thuốc Mi Na", address: "119 Phan Chu Trinh", phone: "0774 493 130" },
    { name: "Nhà thuốc 65 Lê Lợi", address: "65 Lê Lợi", phone: "0913 438 399" },
  ],
};

const MONEY_EXCHANGE = {
  banks: [
    { name: "Vietcombank (VCB)", addresses: ["142 Lê Lợi, Hải Châu", "325 Hùng Vương, Thanh Khê", "537 Trần Hưng Đạo, Sơn Trà"], phone: "0236 3822 110" },
    { name: "BIDV", addresses: ["90 Nguyễn Chí Thanh, Hải Châu", "129 Lê Lợi, Hải Châu", "132 Lê Đình Lý, Thanh Khê"], phone: "0236 3822 371" },
    { name: "VietinBank", addresses: ["36 Trần Quốc Toản, Hải Châu"], phone: "0236 3821 214" },
    { name: "Agribank", addresses: ["23 Phan Đình Phùng, Hải Châu"], phone: "0236 3752 900" },
    { name: "Sacombank", addresses: ["130 Bạch Đằng, Hải Châu"], phone: "0236 3891 004" },
  ],
  gold: [
    { name: "Tiệm Vàng Soạn Hà", address: "121 Trần Phú, Hải Châu", phone: "0236 3825 296" },
    { name: "Hiệu Vàng Kim Yến", address: "122 Bạch Đằng, Hải Châu", phone: "0905 500 333" },
    { name: "Tiệm Vàng Tâm Thịnh Lợi – CS1", address: "34 Nguyễn Thái Học, Hải Châu", phone: "0236 3539 252" },
    { name: "Tiệm Vàng Tâm Thịnh Lợi – CS2", address: "15 Nguyễn Văn Linh, Hải Châu", phone: "0236 7109 549" },
    { name: "Hiệu Vàng Kim Mai", address: "223 Hùng Vương, Hải Châu", phone: "0236 3823 932" },
    { name: "Khải Hoàn I", address: "19 Phó Đức Chính, Sơn Trà", phone: "0236 3831 318" },
    { name: "Khải Hoàn II", address: "01 Tôn Quang Phiệt, Sơn Trà", phone: "0236 3918 285" },
    { name: "Khải Hoàn III", address: "63 Nguyễn Duy Hiệu, Sơn Trà", phone: "0236 3928 289" },
  ],
};

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function InfoBadge({ children, color = "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300" }: { children: React.ReactNode; color?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {children}
    </span>
  );
}

function SectionHeader({ icon: Icon, title, subtitle, color }: { icon: React.ElementType; title: string; subtitle?: string; color: string }) {
  return (
    <div className={`flex items-start gap-3 mb-5`}>
      <div className={`p-2.5 rounded-xl ${color} shrink-0`}>
        <Icon size={20} />
      </div>
      <div>
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false, badge }: { title: string; children: React.ReactNode; defaultOpen?: boolean; badge?: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-foreground">{title}</span>
          {badge}
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-muted-foreground shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-border bg-muted/20">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── TAB CONTENT ───────────────────────────────────────────────────────────────

function CultureTab() {
  return (
    <div className="space-y-8">
      {/* Hoi An */}
      <div>
        <SectionHeader icon={Landmark} title="Phố cổ Hội An" subtitle="Di sản văn hóa thế giới UNESCO" color="text-amber-600 bg-amber-100 dark:bg-amber-900/30" />
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 mb-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <InfoBadge color="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">UNESCO 1999</InfoBadge>
            <InfoBadge color="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">Di tích quốc gia đặc biệt</InfoBadge>
            <InfoBadge color="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">1.000+ di tích</InfoBadge>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            {HOI_AN_INFO.desc}
          </p>

          {/* Tickets */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Ticket size={15} className="text-amber-600 shrink-0" />
              <span className="text-sm font-semibold text-foreground">Giá vé tham quan</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {HOI_AN_INFO.tickets.map((t) => (
                <div key={t.label} className="bg-white dark:bg-card border border-amber-200 dark:border-amber-800/50 rounded-xl px-4 py-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">{t.label}</div>
                  <div className="text-base font-bold text-amber-600">{t.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Selling points */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={15} className="text-amber-600 shrink-0" />
              <span className="text-sm font-semibold text-foreground">Điểm bán vé</span>
            </div>
            <div className="space-y-2">
              {HOI_AN_INFO.selling.map((s) => (
                <div key={s.place} className="flex gap-3 text-sm">
                  <span className="font-medium text-foreground shrink-0">{s.place}:</span>
                  <span className="text-muted-foreground">{s.address}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Craft villages */}
      <div>
        <SectionHeader icon={TreePine} title="Làng nghề truyền thống" subtitle="Tham quan nửa ngày hoặc cả ngày, gần phố cổ Hội An" color="text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30" />
        <div className="grid gap-4 sm:grid-cols-3">
          {VILLAGES.map((v) => (
            <div key={v.name} className="bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-3">
                <TreePine size={18} className="text-emerald-600" />
              </div>
              <h3 className="font-bold text-sm text-foreground mb-2">{v.name}</h3>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex gap-1.5">
                  <MapPin size={12} className="shrink-0 mt-0.5" />
                  <span>{v.address}</span>
                </div>
                <div className="flex gap-1.5">
                  <Ticket size={12} className="shrink-0 mt-0.5" />
                  <span>Người lớn: <strong className="text-foreground">{v.adult}</strong>{v.child && ` · Trẻ em: ${v.child}`}</span>
                </div>
                <div className="flex gap-1.5">
                  <Phone size={12} className="shrink-0 mt-0.5" />
                  <span>{v.contact} · {v.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HotelsTab() {
  const [area, setArea] = useState<"danang" | "hoian">("danang");
  const [loc, setLoc] = useState<"all" | "center" | "beach">("all");
  const [stars, setStars] = useState<"all" | "budget" | "luxury">("all");

  const filtered = HOTELS.filter(
    (h) =>
      h.area === area &&
      (loc === "all" || h.location === loc) &&
      (stars === "all" || h.stars === stars)
  );

  return (
    <div>
      {/* Area tabs */}
      <div className="flex gap-2 mb-5">
        {([["danang", "Đà Nẵng"], ["hoian", "Hội An"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setArea(key)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${area === key ? "bg-blue-600 text-white shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        <div className="flex gap-1.5">
          {([["all", "Tất cả"], ["center", "Trung tâm"], ["beach", "Ven biển"]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setLoc(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${loc === key ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 border-blue-300 dark:border-blue-700" : "border-border text-muted-foreground hover:border-blue-300"}`}
            >
              {key === "center" && <Building2 size={11} />}
              {key === "beach" && <Waves size={11} />}
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          {([["all", "Tất cả hạng"], ["budget", "Dưới 3 sao"], ["luxury", "4–5 sao"]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setStars(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${stars === key ? "bg-amber-50 dark:bg-amber-950/30 text-amber-600 border-amber-300 dark:border-amber-700" : "border-border text-muted-foreground hover:border-amber-300"}`}
            >
              {key === "luxury" && <Star size={11} />}
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground mb-3">{filtered.length} khách sạn</p>

      {/* Hotel list */}
      <div className="grid gap-3 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((h) => (
            <motion.div
              key={`${h.name}-${h.area}`}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="bg-card border border-border rounded-xl px-4 py-3.5 flex gap-3 hover:shadow-sm transition-shadow"
            >
              <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${h.location === "beach" ? "bg-sky-100 dark:bg-sky-900/30 text-sky-600" : "bg-blue-100 dark:bg-blue-900/30 text-blue-600"}`}>
                {h.location === "beach" ? <Waves size={16} /> : <Building2 size={16} />}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">{h.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{h.address}</p>
                <div className="flex gap-1.5 mt-2">
                  <InfoBadge color={h.location === "beach" ? "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300" : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"}>
                    {h.location === "beach" ? "Ven biển" : "Trung tâm"}
                  </InfoBadge>
                  <InfoBadge color={h.stars === "luxury" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}>
                    {h.stars === "luxury" ? "4–5 sao" : "Dưới 3 sao"}
                  </InfoBadge>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Không có kết quả phù hợp. Thử thay đổi bộ lọc.
        </div>
      )}
    </div>
  );
}

function JourneyCard({ guide }: { guide: JourneyGuide }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="px-5 py-4 bg-emerald-50 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/30">
        <div className="flex items-start gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">Bus {guide.busNo}</span>
              <InfoBadge color="bg-white dark:bg-card text-emerald-700 dark:text-emerald-300">{guide.price}</InfoBadge>
              <InfoBadge color="bg-white dark:bg-card text-gray-500 dark:text-gray-400">{guide.duration}</InfoBadge>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-bold text-foreground flex-wrap">
              <span>{guide.from}</span>
              <ArrowRight size={14} className="text-emerald-600 shrink-0" />
              <span>{guide.to}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1"><Clock size={12} />{guide.time}</div>
          <div className="flex items-center gap-1"><Bus size={12} />{guide.freq}</div>
        </div>
      </div>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">
        <span>Xem hướng dẫn chi tiết</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={15} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <div className="px-5 pb-4 space-y-2 border-t border-border">
              <div className="pt-3 space-y-2">
                {guide.steps.map((step, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center text-xs font-bold">{i + 1}</div>
                    <p className="text-muted-foreground leading-relaxed pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
              {guide.tip && (
                <div className="flex gap-2 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2 mt-3">
                  <span className="shrink-0 font-bold">Mẹo:</span>
                  <span>{guide.tip}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BusRouteCard({ route }: { route: BusRoute }) {
  const [open, setOpen] = useState(false);
  const badgeClass: Record<string, string> = {
    subsidized:      "bg-emerald-600 text-white",
    unsubsidized:    "bg-violet-600 text-white",
    tourist:         "bg-sky-500 text-white",
    interprovincial: "bg-orange-500 text-white",
  };
  const dotClass: Record<string, string> = {
    subsidized:      "bg-emerald-500",
    unsubsidized:    "bg-violet-500",
    tourist:         "bg-sky-400",
    interprovincial: "bg-orange-400",
  };
  const badge = route.pending ? "bg-gray-400 text-white" : (badgeClass[route.type] ?? "bg-gray-400 text-white");
  const dot   = route.pending ? "bg-gray-400"             : (dotClass[route.type]   ?? "bg-gray-400");
  const hasDetail = !route.pending && !!route.keyStops?.length;

  return (
    <div className={`border border-border rounded-xl overflow-hidden bg-card ${route.pending ? "opacity-60" : ""}`}>
      <button
        onClick={() => hasDetail && setOpen(!open)}
        className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left ${hasDetail ? "hover:bg-muted/40 cursor-pointer" : "cursor-default"}`}
      >
        <span className={`shrink-0 text-xs font-bold w-14 text-center py-1 rounded-lg ${badge}`}>{route.no}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{route.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {route.hours !== "–" ? route.hours : "Chờ vận hành"}
            {route.price !== "–" ? " · " + route.price : ""}
          </p>
        </div>
        {route.touristFriendly && !route.pending && (
          <span className="shrink-0 text-xs text-sky-600 bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 px-1.5 py-0.5 rounded-md font-medium">Du lịch</span>
        )}
        {route.pending && (
          <span className="shrink-0 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-md">Sắp mở</span>
        )}
        {hasDetail && (
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={14} className="text-muted-foreground shrink-0" />
          </motion.div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && hasDetail && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-4 pb-3 border-t border-border bg-muted/20">
              <p className="text-xs text-muted-foreground font-medium mt-2.5 mb-2">Các điểm dừng chính:</p>
              <div className="flex flex-wrap gap-1.5">
                {route.keyStops!.map((stop, i) => (
                  <span key={i} className="flex items-center gap-1 text-xs bg-card border border-border rounded-full px-2 py-0.5 text-muted-foreground">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${i === 0 ? "bg-emerald-500" : i === route.keyStops!.length - 1 ? "bg-rose-400" : dot}`} />
                    {stop}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                {route.distance  && <span className="flex items-center gap-1"><Route size={11} />{route.distance}</span>}
                {route.frequency !== "–" && <span className="flex items-center gap-1"><Clock size={11} />{route.frequency}</span>}
                {route.operator  && <span className="flex items-center gap-1"><Bus size={11} />{route.operator}</span>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TransportTab() {
  const [view, setView] = useState<"network" | "journey">("network");

  const activeRoutes  = busRoutes.filter((r) => !r.pending);
  const pendingRoutes = busRoutes.filter((r) => r.pending);

  const grouped = {
    subsidized:      activeRoutes.filter((r) => r.type === "subsidized"),
    tourist:         activeRoutes.filter((r) => r.type === "tourist"),
    unsubsidized:    activeRoutes.filter((r) => r.type === "unsubsidized"),
    interprovincial: activeRoutes.filter((r) => r.type === "interprovincial"),
  };

  const touristUnsubsidized   = grouped.unsubsidized.filter((r) => r.touristFriendly);
  const regularUnsubsidized   = grouped.unsubsidized.filter((r) => !r.touristFriendly);

  return (
    <div>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { value: "18+", label: "Tuyến xe buýt" },
          { value: "05:30–19:00", label: "Giờ hoạt động" },
          { value: "Từ 8K", label: "Giá vé/lượt" },
        ].map((s) => (
          <div key={s.label} className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-3 text-center">
            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* View switcher */}
      <div className="flex gap-2 mb-5">
        {([["network", "Mạng lưới tuyến"], ["journey", "Hành trình A → B"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${view === key ? "bg-emerald-600 text-white shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Network view */}
      {view === "network" && (
        <div className="space-y-6">
          {[
            { dot: "bg-emerald-500", title: "Tuyến có trợ giá", sub: "5 tuyến · Phương Trang · 8.000đ/lượt", routes: grouped.subsidized },
            { dot: "bg-sky-400",     title: "Tuyến du lịch",    sub: "Sân bay, Bà Nà Hills, Hội An, Mỹ Sơn", routes: [...grouped.tourist, ...touristUnsubsidized] },
            { dot: "bg-orange-400",  title: "Tuyến liền kề",    sub: "Đà Nẵng ↔ Huế · 100km · 80.000đ",       routes: grouped.interprovincial },
            { dot: "bg-violet-500",  title: "Tuyến không trợ giá", sub: "Nội thành & ngoại ô", routes: regularUnsubsidized },
            { dot: "bg-gray-400",    title: "Đang làm thủ tục vận hành", sub: "Sắp mở · 5 tuyến",             routes: pendingRoutes },
          ].map(({ dot, title, sub, routes }) => (
            <div key={title}>
              <div className="flex items-center gap-2 mb-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${dot} shrink-0`} />
                <h3 className="text-sm font-bold text-foreground">{title}</h3>
                <span className="text-xs text-muted-foreground hidden sm:inline">· {sub}</span>
              </div>
              <div className="space-y-1.5">
                {routes.map((r) => <BusRouteCard key={r.no} route={r} />)}
              </div>
            </div>
          ))}

          <a
            href="https://www.danangbus.vn/lo-trinh-tuyen.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-emerald-600 transition-colors py-2"
          >
            Nguồn: danangbus.vn <ChevronRight size={11} />
          </a>
        </div>
      )}

      {/* Journey guide view */}
      {view === "journey" && (
        <div className="space-y-4">
          {journeyGuides.map((g) => <JourneyCard key={`${g.from}-${g.to}`} guide={g} />)}
        </div>
      )}
    </div>
  );
}

function ServicesTab() {
  return (
    <div className="space-y-8">
      {/* Pharmacy */}
      <div>
        <SectionHeader icon={Pill} title="Nhà thuốc" subtitle="Tìm nhà thuốc gần nhất tại Đà Nẵng và Hội An" color="text-rose-600 bg-rose-100 dark:bg-rose-900/30" />
        <div className="mb-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="px-2 py-0.5 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-md text-xs">Đà Nẵng</span>
          </h3>
          {PHARMACIES.danang.map((group) => (
            <Accordion key={group.area} title={group.area}>
              <div className="space-y-3 mt-3">
                {group.items.map((p) => (
                  <div key={p.name} className="flex gap-3 text-sm">
                    <div className="shrink-0 w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                      <Pill size={13} className="text-rose-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.address}</p>
                      {p.phone && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Phone size={11} />{p.phone}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Accordion>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-md text-xs">Hội An</span>
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {PHARMACIES.hoian.map((p) => (
              <div key={p.name} className="bg-card border border-border rounded-xl p-3.5 flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Pill size={14} className="text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.address}</p>
                  {p.phone && <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Phone size={11} />{p.phone}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Money exchange */}
      <div>
        <SectionHeader icon={DollarSign} title="Đổi tiền" subtitle="Ngân hàng và tiệm vàng uy tín tại Đà Nẵng" color="text-violet-600 bg-violet-100 dark:bg-violet-900/30" />

        <Accordion title="Ngân hàng" defaultOpen>
          <div className="space-y-4 mt-3">
            {MONEY_EXCHANGE.banks.map((b) => (
              <div key={b.name} className="text-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                    <Building2 size={12} className="text-violet-600" />
                  </div>
                  <span className="font-bold text-foreground">{b.name}</span>
                  <span className="text-xs text-muted-foreground">· {b.phone}</span>
                </div>
                <div className="pl-8 space-y-0.5">
                  {b.addresses.map((addr) => (
                    <div key={addr} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ChevronRight size={11} className="shrink-0" />{addr}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Accordion>

        <Accordion title="Tiệm vàng đổi ngoại tệ">
          <div className="grid gap-3 sm:grid-cols-2 mt-3">
            {MONEY_EXCHANGE.gold.map((g) => (
              <div key={g.name} className="flex gap-2.5 text-sm">
                <div className="shrink-0 w-7 h-7 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <Star size={12} className="text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{g.name}</p>
                  <p className="text-xs text-muted-foreground">{g.address}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Phone size={11} />{g.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </Accordion>
      </div>
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function TouristInfo() {
  const [tab, setTab] = useState("culture");
  const activeTab = TABS.find((t) => t.id === tab)!;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 px-4 pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,white,transparent_70%)]" />
        <div className="max-w-4xl mx-auto relative">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5 text-white/90 text-xs font-medium mb-4">
            <BookOpen size={13} />
            Thông tin hữu ích cho du khách
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
            Những điều du khách<br className="md:hidden" /> quan tâm tại Đà Nẵng
          </h1>
          <p className="text-teal-100 text-sm md:text-base max-w-xl">
            Thông tin được tổng hợp chính xác từ Trung tâm Thông tin Xúc tiến Du lịch Đà Nẵng — cập nhật 2026.
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="sticky top-14 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-2 md:px-4 flex overflow-x-auto scrollbar-none">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative flex items-center gap-2 px-4 py-3.5 whitespace-nowrap text-sm font-medium transition-colors shrink-0 ${isActive ? "text-teal-600" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Icon size={15} />
                {t.label}
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "culture"   && <CultureTab />}
            {tab === "hotels"    && <HotelsTab />}
            {tab === "transport" && <TransportTab />}
            {tab === "services"  && <ServicesTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
