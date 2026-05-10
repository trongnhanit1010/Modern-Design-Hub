import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ChevronDown, MapPin, Phone, Bus, Hotel, Pill,
  DollarSign, Landmark, Wifi, Thermometer, Star, X,
  Clock, Ticket, BookOpen, Zap, Shield,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   DATA — toàn bộ câu hỏi FAQ
═══════════════════════════════════════════════════════════════════ */

export type FaqCategory =
  | "diadiem"
  | "dichuyên"
  | "luutru"
  | "ytecap"
  | "tien"
  | "thongtin";

interface FaqItem {
  id: string;
  category: FaqCategory;
  q: string;
  tags?: string[];
  popular?: boolean;
  answer: React.ReactNode;
}

const CATEGORIES: { key: FaqCategory | "all"; label: string; icon: typeof MapPin; color: string; dot: string }[] = [
  { key: "all",      label: "Tất cả",          icon: BookOpen,    color: "#6b7280", dot: "bg-gray-400" },
  { key: "diadiem",  label: "Địa điểm & Vé",   icon: Landmark,    color: "#d97706", dot: "bg-amber-500" },
  { key: "dichuyên", label: "Di chuyển",        icon: Bus,         color: "#2563eb", dot: "bg-blue-500" },
  { key: "luutru",   label: "Lưu trú",          icon: Hotel,       color: "#7c3aed", dot: "bg-violet-500" },
  { key: "ytecap",   label: "Y tế & Khẩn cấp", icon: Shield,      color: "#dc2626", dot: "bg-red-500" },
  { key: "tien",     label: "Tiền & Chi phí",   icon: DollarSign,  color: "#059669", dot: "bg-emerald-500" },
  { key: "thongtin", label: "Thực tế hữu ích",  icon: Wifi,        color: "#0891b2", dot: "bg-cyan-500" },
];

const DOT: Record<FaqCategory, string> = {
  diadiem:  "bg-amber-400",
  dichuyên: "bg-blue-400",
  luutru:   "bg-violet-400",
  ytecap:   "bg-red-400",
  tien:     "bg-emerald-400",
  thongtin: "bg-cyan-400",
};

function Chip({ text }: { text: string }) {
  return (
    <span className="inline-block text-[10px] px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500 border border-gray-200 font-medium">
      {text}
    </span>
  );
}

function InfoRow({ icon: Icon, children }: { icon: typeof MapPin; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm text-gray-600">
      <Icon size={13} className="mt-0.5 shrink-0 text-gray-400" />
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}

function ContactCard({ name, address, phone, badge }: { name: string; address: string; phone?: string; badge?: string }) {
  return (
    <div className="flex gap-2.5 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
      <div className="w-2 rounded-full shrink-0 bg-gray-200" />
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          {badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">{badge}</span>}
        </div>
        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1"><MapPin size={10} />{address}</p>
        {phone && <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1"><Phone size={10} />{phone}</p>}
      </div>
    </div>
  );
}

const FAQS: FaqItem[] = [
  /* ── Địa điểm & Vé ───────────────────────────────────────────── */
  {
    id: "hoi-an-ticket",
    category: "diadiem",
    q: "Vé vào phố cổ Hội An giá bao nhiêu?",
    popular: true,
    tags: ["Hội An", "vé", "tham quan"],
    answer: (
      <div className="space-y-3">
        <p className="text-sm text-gray-600">Vé tham quan phố cổ gồm 5 phiếu, mỗi phiếu dùng cho 1 điểm tham quan trong danh sách được chỉ định.</p>
        <div className="grid grid-cols-3 gap-2">
          {[["Khách Việt Nam", "80.000đ"], ["Khách nước ngoài", "120.000đ"], ["Trẻ em dưới 16", "Miễn phí"]].map(([label, price]) => (
            <div key={label} className="rounded-xl border border-amber-100 bg-amber-50 p-2.5 text-center">
              <p className="text-[10px] text-amber-700">{label}</p>
              <p className="text-sm font-bold text-amber-800 mt-0.5">{price}</p>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <InfoRow icon={MapPin}>Bán vé online tại: 49 Phan Chu Trinh, Hội An</InfoRow>
          <InfoRow icon={MapPin}>Bán trực tiếp trên: Lê Lợi · Nguyễn Huệ · Hai Bà Trưng · Nguyễn Phúc Chu · Nguyễn Thị Minh Khai</InfoRow>
        </div>
      </div>
    ),
  },
  {
    id: "hoi-an-open",
    category: "diadiem",
    q: "Phố cổ Hội An mở cửa mấy giờ? Có đi ban đêm được không?",
    tags: ["Hội An", "giờ mở cửa"],
    answer: (
      <div className="space-y-2 text-sm text-gray-600">
        <p>Phố cổ Hội An không có cổng đóng — bạn có thể đi lại tự do 24/7. Tuy nhiên, vé tham quan chỉ áp dụng cho các điểm di tích trong giờ hành chính.</p>
        <InfoRow icon={Clock}>Các điểm tham quan thường mở: <strong>08:00 – 17:30</strong></InfoRow>
        <InfoRow icon={Star}>Ban đêm (sau 18:00): phố đèn lồng, hàng ăn, không cần vé — rất đẹp vào ngày rằm (15 âm lịch)</InfoRow>
      </div>
    ),
  },
  {
    id: "villages",
    category: "diadiem",
    q: "Các làng nghề truyền thống gần Hội An đáng đi là gì?",
    tags: ["làng nghề", "Hội An", "vé"],
    answer: (
      <div className="space-y-2">
        {[
          { name: "Làng mộc Kim Bồng", address: "Các tổ dân phố Phước Trung, Trung Hà, Đông Hà, TP Hội An", adult: "35.000đ", phone: "0901 137 313" },
          { name: "Làng gốm Thanh Hà", address: "Khối Nam Diêu, phường Hội An Tây", adult: "35.000đ · Trẻ em: 15.000đ", phone: "0937 021 704" },
          { name: "Làng rau Trà Quế",  address: "Thôn Trà Quế, phường Hội An Tây", adult: "35.000đ", phone: "0937 021 704" },
        ].map((v) => (
          <ContactCard key={v.name} name={v.name} address={`${v.address} · Vé: ${v.adult}`} phone={v.phone} />
        ))}
      </div>
    ),
  },
  {
    id: "ba-na-ticket",
    category: "diadiem",
    q: "Vé cáp treo Bà Nà Hills giá bao nhiêu?",
    popular: true,
    tags: ["Bà Nà", "cáp treo", "vé"],
    answer: (
      <div className="space-y-2 text-sm text-gray-600">
        <p>Vé Bà Nà Hills bao gồm cáp treo khứ hồi + vào tất cả khu vui chơi trong khuôn viên.</p>
        <div className="grid grid-cols-2 gap-2">
          {[["Người lớn", "750.000đ"], ["Trẻ em (1–1,4m)", "600.000đ"], ["Trẻ dưới 1m", "Miễn phí"], ["Người cao tuổi (60+)", "600.000đ"]].map(([l, p]) => (
            <div key={l} className="rounded-xl border border-gray-100 bg-gray-50 p-2.5">
              <p className="text-[10px] text-gray-500">{l}</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{p}</p>
            </div>
          ))}
        </div>
        <InfoRow icon={Clock}>Mở cửa: 07:00 – 22:00 hàng ngày</InfoRow>
        <InfoRow icon={MapPin}>Địa chỉ: Thôn An Sơn, xã Hòa Ninh, huyện Hòa Vang · Cách trung tâm ~35km</InfoRow>
      </div>
    ),
  },
  {
    id: "my-son",
    category: "diadiem",
    q: "Thánh địa Mỹ Sơn ở đâu? Vé vào cổng bao nhiêu?",
    tags: ["Mỹ Sơn", "UNESCO", "vé"],
    answer: (
      <div className="space-y-2 text-sm text-gray-600">
        <p>Mỹ Sơn là quần thể đền tháp Chăm Pa, di sản UNESCO, cách Hội An ~40km.</p>
        <div className="grid grid-cols-2 gap-2">
          {[["Người lớn", "150.000đ"], ["Trẻ em", "Miễn phí (dưới 1,2m)"]].map(([l, p]) => (
            <div key={l} className="rounded-xl border border-gray-100 bg-gray-50 p-2.5">
              <p className="text-[10px] text-gray-500">{l}</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{p}</p>
            </div>
          ))}
        </div>
        <InfoRow icon={Clock}>Mở cửa: 06:00 – 17:00</InfoRow>
        <InfoRow icon={Bus}>Đi bằng Bus 01DL từ Hội An: 08:10 hoặc 14:10, về lúc 09:00 và 15:00</InfoRow>
      </div>
    ),
  },

  /* ── Di chuyển ───────────────────────────────────────────────── */
  {
    id: "airport-hoian",
    category: "dichuyên",
    q: "Từ sân bay Đà Nẵng đi Hội An bằng cách nào rẻ nhất?",
    popular: true,
    tags: ["sân bay", "Hội An", "xe buýt", "Grab"],
    answer: (
      <div className="space-y-3 text-sm text-gray-600">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Xe buýt 01SB", price: "30.000đ", time: "~60 phút", note: "Ra cổng Arrivals, đi bộ 3 phút đến trạm" },
            { label: "Grab Car",     price: "250–350K", time: "~35 phút", note: "Tiện nhất nếu nhiều người hoặc có vali lớn" },
            { label: "Taxi Mai Linh", price: "300–400K", time: "~35 phút", note: "0236 3525 252 — đặt trước tránh chặt chém" },
            { label: "Xe khách limousine", price: "150–200K", time: "~45 phút", note: "Có dịch vụ đưa đón theo lịch hằng ngày" },
          ].map((o) => (
            <div key={o.label} className="rounded-xl border border-gray-100 bg-gray-50 p-2.5">
              <p className="text-xs font-bold text-gray-900">{o.label}</p>
              <p className="text-sm font-black text-blue-600">{o.price}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{o.time} · {o.note}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-blue-50 border border-blue-100 px-3 py-2 flex gap-2">
          <Zap size={13} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700">Bus 01SB rẻ nhất, có khoang hành lý, chạy 05:10–18:00. Mua vé trên xe.</p>
        </div>
      </div>
    ),
  },
  {
    id: "airport-center",
    category: "dichuyên",
    q: "Từ sân bay vào trung tâm Đà Nẵng mất bao lâu và bao nhiêu tiền?",
    tags: ["sân bay", "trung tâm", "Grab"],
    answer: (
      <div className="space-y-2 text-sm text-gray-600">
        <p>Sân bay Đà Nẵng cách trung tâm (khu Bạch Đằng – Sông Hàn) chỉ <strong>~3–4km</strong>.</p>
        <div className="grid grid-cols-3 gap-2">
          {[["Grab Bike", "20–35K", "10 phút"], ["Grab Car", "50–80K", "12 phút"], ["Taxi", "80–120K", "12 phút"]].map(([m, p, t]) => (
            <div key={m} className="rounded-xl border border-gray-100 bg-gray-50 p-2.5 text-center">
              <p className="text-[10px] text-gray-500">{m}</p>
              <p className="text-sm font-bold text-gray-900">{p}</p>
              <p className="text-[10px] text-gray-400">{t}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "bus-bana",
    category: "dichuyên",
    q: "Có xe buýt đến Bà Nà Hills không?",
    tags: ["xe buýt", "Bà Nà", "Bus 03"],
    answer: (
      <div className="space-y-2 text-sm text-gray-600">
        <p>Có — <strong>Bus số 03</strong> chạy thẳng Sân bay Đà Nẵng → Bà Nà Hills.</p>
        <InfoRow icon={Clock}>Giờ chạy: 07:00 – 18:00 · Tần suất: 15–30 phút/chuyến</InfoRow>
        <InfoRow icon={Ticket}>Giá vé: 15.000–30.000đ</InfoRow>
        <InfoRow icon={Bus}>Lộ trình: Sân bay → Điện Biên Phủ → Tôn Đức Thắng → Hoàng Văn Thái → Bà Nà Hills (~75 phút)</InfoRow>
        <div className="rounded-xl bg-amber-50 border border-amber-100 px-3 py-2 flex gap-2">
          <Zap size={13} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700">Nên đi chuyến sáng trước 8:00. Xuống bãi đỗ xe, mua vé cáp treo riêng lên khu du lịch.</p>
        </div>
      </div>
    ),
  },
  {
    id: "bus-hue",
    category: "dichuyên",
    q: "Từ Đà Nẵng đi Huế bằng xe buýt được không? Giá bao nhiêu?",
    popular: true,
    tags: ["Huế", "xe buýt", "LK01"],
    answer: (
      <div className="space-y-2 text-sm text-gray-600">
        <p>Được — <strong>Bus LK01</strong> (Đà Nẵng – Huế) tần suất rất dày, chạy qua Hầm Hải Vân.</p>
        <div className="grid grid-cols-3 gap-2">
          {[["Giá vé", "80.000đ"], ["Thời gian", "~2h30"], ["Tần suất", "14–15 phút"]].map(([l, v]) => (
            <div key={l} className="rounded-xl border border-gray-100 bg-gray-50 p-2.5 text-center">
              <p className="text-[10px] text-gray-500">{l}</p>
              <p className="text-sm font-bold text-gray-900">{v}</p>
            </div>
          ))}
        </div>
        <InfoRow icon={MapPin}>Điểm xuất phát: Bến xe Trung tâm Đà Nẵng — 33 Điện Biên Phủ</InfoRow>
        <InfoRow icon={Clock}>Giờ chạy: 05:30 – 19:00</InfoRow>
        <div className="rounded-xl bg-blue-50 border border-blue-100 px-3 py-2 flex gap-2">
          <Zap size={13} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700">Rẻ hơn 3–4 lần so với taxi. Từ bến xe Huế vào trung tâm cần thêm xe ôm/taxi ~15km.</p>
        </div>
      </div>
    ),
  },
  {
    id: "bus-marbles",
    category: "dichuyên",
    q: "Xe buýt nào đến Ngũ Hành Sơn (Núi Ngũ Hành Sơn)?",
    tags: ["Ngũ Hành Sơn", "xe buýt"],
    answer: (
      <div className="space-y-2 text-sm text-gray-600">
        <p><strong>Bus số 02</strong> (Bến xe TT → Cửa Đại) đi qua Ngũ Hành Sơn.</p>
        <InfoRow icon={Ticket}>Giá: 20.000đ · Giờ: 05:30–17:30 · Tần suất: ~20 phút</InfoRow>
        <InfoRow icon={MapPin}>Xuống tại điểm dừng <strong>754 Lê Văn Hiến</strong> → đi bộ 2–5 phút vào cổng</InfoRow>
        <InfoRow icon={Bus}>Từ điểm này có thể đi tiếp Bus 02 đến Hội An (không cần đổi xe)</InfoRow>
      </div>
    ),
  },
  {
    id: "grab-available",
    category: "dichuyên",
    q: "Grab hoạt động ở Đà Nẵng không? Có an toàn không?",
    tags: ["Grab", "taxi", "di chuyển"],
    answer: (
      <div className="space-y-2 text-sm text-gray-600">
        <p>Grab hoạt động 24/7 tại Đà Nẵng và rất phổ biến — an toàn, giá hiển thị trước, không mặc cả.</p>
        <InfoRow icon={Zap}>Grab Bike (xe máy): phù hợp ngắn, giá từ 15K/km</InfoRow>
        <InfoRow icon={Zap}>GrabCar: phù hợp nhóm hoặc di chuyển xa, giá từ 25K/km</InfoRow>
        <InfoRow icon={Phone}>Taxi thay thế uy tín: Mai Linh <strong>0236 3525 252</strong> · Tiên Sa <strong>0236 3791 791</strong></InfoRow>
      </div>
    ),
  },
  {
    id: "bus-ticket",
    category: "dichuyên",
    q: "Mua vé xe buýt ở đâu? Có thẻ tháng không?",
    tags: ["vé xe buýt", "thẻ tháng"],
    answer: (
      <div className="space-y-2 text-sm text-gray-600">
        <InfoRow icon={Ticket}>Vé lượt: mua trực tiếp trên xe, trả tiền mặt cho nhân viên soát vé</InfoRow>
        <InfoRow icon={Ticket}>Vé tháng học sinh/SV: <strong>80.000đ/tháng</strong> (xuất trình thẻ)</InfoRow>
        <InfoRow icon={Ticket}>Vé tháng phổ thông: <strong>120.000đ/tháng</strong> không giới hạn lượt</InfoRow>
        <InfoRow icon={MapPin}>Mua vé tháng tại: Bến xe Trung tâm — 33 Điện Biên Phủ, hoặc điểm bán Phương Trang</InfoRow>
        <InfoRow icon={Phone}>Hotline Phương Trang Futabuslines: <strong>1900 6067</strong></InfoRow>
      </div>
    ),
  },
  {
    id: "rent-motorbike",
    category: "dichuyên",
    q: "Thuê xe máy ở Đà Nẵng giá bao nhiêu? Cần giấy tờ gì?",
    tags: ["xe máy", "thuê xe"],
    answer: (
      <div className="space-y-2 text-sm text-gray-600">
        <div className="grid grid-cols-2 gap-2">
          {[["Xe máy số (Wave, Future)", "100–150K/ngày"], ["Xe số tự động (Airblade)", "150–200K/ngày"], ["Xe đạp điện", "80–120K/ngày"], ["Xe đạp thường", "50–80K/ngày"]].map(([l, p]) => (
            <div key={l} className="rounded-xl border border-gray-100 bg-gray-50 p-2 text-sm">
              <p className="text-[10px] text-gray-500">{l}</p>
              <p className="font-bold text-gray-900">{p}</p>
            </div>
          ))}
        </div>
        <InfoRow icon={Zap}>Yêu cầu: CCCD hoặc Passport gốc (để lại làm cọc)</InfoRow>
        <InfoRow icon={MapPin}>Nhiều cửa hàng tập trung ở khu An Thượng (gần bãi biển Mỹ Khê)</InfoRow>
        <InfoRow icon={Zap}>Lưu ý: đường Phạm Văn Đồng (ven biển) cấm xe máy — dùng xe đạp hoặc xe điện</InfoRow>
      </div>
    ),
  },

  /* ── Lưu trú ─────────────────────────────────────────────────── */
  {
    id: "hotel-area",
    category: "luutru",
    q: "Nên ở khu nào tại Đà Nẵng? Gần biển hay trung tâm?",
    popular: true,
    tags: ["khách sạn", "khu ở", "bãi biển"],
    answer: (
      <div className="space-y-3 text-sm text-gray-600">
        <div className="space-y-2">
          {[
            { area: "Mỹ Khê / Phạm Văn Đồng", desc: "Ven biển — lý tưởng nếu muốn tắm biển sáng sớm. Nhiều nhà hàng hải sản, khách sạn từ bình dân đến 5 sao.", icon: "🏖️" },
            { area: "Trung tâm (Hải Châu)", desc: "Gần chợ Hàn, cầu Rồng, bờ sông Hàn. Tiện di chuyển, nhiều lựa chọn ăn uống, phù hợp ở trong ngân sách.", icon: "🏙️" },
            { area: "Ngũ Hành Sơn / An Thượng", desc: "Cộng đồng khách Tây lớn, nhà nghỉ & hostel giá tốt, gần bãi biển Non Nước. Yên tĩnh hơn.", icon: "🌿" },
            { area: "Phố cổ Hội An", desc: "Nếu muốn tập trung khám phá Hội An — ở trong phố cổ rất thuận tiện, không khí cổ kính.", icon: "🏮" },
          ].map((o) => (
            <div key={o.area} className="rounded-xl border border-gray-100 bg-gray-50 p-3 flex gap-2.5">
              <span className="text-xl shrink-0">{o.icon}</span>
              <div>
                <p className="text-xs font-bold text-gray-900">{o.area}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{o.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "hotel-danang-budget",
    category: "luutru",
    q: "Gợi ý khách sạn bình dân (dưới 3 sao) tại Đà Nẵng?",
    tags: ["khách sạn", "bình dân", "Đà Nẵng"],
    answer: (
      <div className="space-y-2">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">Khu trung tâm</p>
        {["Sunriver — 132–136 Bạch Đằng, Sơn Trà", "Pariat River Front — 202–204 Bạch Đằng, Hải Châu", "Moonlight Hotel — 136–140 Phan Châu Trinh", "Val Soleil — 186 Trần Phú, Phước Ninh", "Adaline Hotel — 45–47 Võ Văn Kiệt"].map((h) => {
          const [name, addr] = h.split(" — ");
          return <ContactCard key={name} name={name} address={addr} />;
        })}
        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-3 mb-2">Ven biển Mỹ Khê</p>
        {["Seafront Hotel — 240 Võ Nguyên Giáp", "Grand Sunrise 3 — 05 Đường Morrison, Sơn Trà", "Titan Hotel — 102–104 Hồ Xuân Hương", "San San Hotel — 54 An Thượng 26, Ngũ Hành Sơn"].map((h) => {
          const [name, addr] = h.split(" — ");
          return <ContactCard key={name} name={name} address={addr} />;
        })}
      </div>
    ),
  },
  {
    id: "hotel-hoian",
    category: "luutru",
    q: "Gợi ý khách sạn tại Hội An — cả bình dân và cao cấp?",
    tags: ["khách sạn", "Hội An", "resort"],
    answer: (
      <div className="space-y-2">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">Cao cấp (4–5 sao)</p>
        {[
          ["Vĩnh Hưng Riverside Resort", "111 Ngô Quyền", "Trung tâm"],
          ["Hội An Historic Hotel", "10 Trần Hưng Đạo", "Trung tâm"],
          ["Victoria Hội An Resort", "Đường Âu Cơ, Cửa Đại", "Bãi biển"],
          ["La Siesta Hội An Resort", "Cẩm Kim, Hội An", "Bãi biển"],
        ].map(([name, addr, badge]) => (
          <ContactCard key={name} name={name} address={addr} badge={badge} />
        ))}
        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-3 mb-2">Bình dân – tầm trung</p>
        {[
          ["Emerald Hoi An Riverside", "An Hội, Phường Minh An"],
          ["The Signature Hoi An", "21 La Hối"],
          ["Ally Beach Boutique Hotel", "15 Phan Tình, Cửa Đại"],
          ["Lasenta Boutique Hotel", "57 Lý Thường Kiệt"],
        ].map(([name, addr]) => (
          <ContactCard key={name} name={name} address={addr} />
        ))}
      </div>
    ),
  },

  /* ── Y tế & Khẩn cấp ─────────────────────────────────────────── */
  {
    id: "emergency",
    category: "ytecap",
    q: "Số điện thoại khẩn cấp tại Đà Nẵng là gì?",
    popular: true,
    tags: ["khẩn cấp", "cấp cứu", "cảnh sát"],
    answer: (
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Cấp cứu y tế", no: "115", color: "bg-red-50 border-red-200 text-red-700" },
          { label: "Cảnh sát (Police)", no: "113", color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Cứu hỏa", no: "114", color: "bg-orange-50 border-orange-200 text-orange-700" },
          { label: "Tai nạn giao thông", no: "1800 599 925", color: "bg-gray-50 border-gray-200 text-gray-700" },
          { label: "BV Đà Nẵng (ĐT)", no: "0236 3821 480", color: "bg-purple-50 border-purple-200 text-purple-700" },
          { label: "BV C Đà Nẵng", no: "0236 3822 180", color: "bg-purple-50 border-purple-200 text-purple-700" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl border p-3 ${s.color}`}>
            <p className="text-[10px] opacity-70 mb-0.5">{s.label}</p>
            <p className="text-base font-black">{s.no}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "pharmacy-danang",
    category: "ytecap",
    q: "Nhà thuốc nào uy tín gần trung tâm Đà Nẵng?",
    tags: ["nhà thuốc", "pharmacy", "Đà Nẵng"],
    answer: (
      <div className="space-y-2">
        {[
          { name: "FPT Long Châu Đống Đa", address: "120–122 Đống Đa, Hải Châu", phone: "1800 6928" },
          { name: "Pharmacity Thái Phiên", address: "37 Thái Phiên, Hải Châu", phone: "1800 6821" },
          { name: "Hana Pharmacy", address: "149 Trần Phú, Hải Châu", phone: "0338 891 822" },
          { name: "Dapharco BLU Pharmacy", address: "110 Trần Phú, Hải Châu", phone: "0918 727 489" },
          { name: "Sông Hàn Pharmacy", address: "53 Nguyễn Thái Học, Hải Châu", phone: "0886 194 499" },
        ].map((p) => <ContactCard key={p.name} name={p.name} address={p.address} phone={p.phone} />)}
      </div>
    ),
  },
  {
    id: "pharmacy-hoian",
    category: "ytecap",
    q: "Nhà thuốc ở Hội An ở đâu?",
    tags: ["nhà thuốc", "pharmacy", "Hội An"],
    answer: (
      <div className="space-y-2">
        {[
          { name: "Long Châu Pharmacy", address: "105 Nguyễn Thị Minh Khai" },
          { name: "Nhà thuốc Minh An 115", address: "115 Nguyễn Phúc Tầng", phone: "0901 167 317" },
          { name: "Nhà thuốc Mi Na", address: "119 Phan Chu Trinh", phone: "0774 493 130" },
          { name: "Nhà thuốc 65 Lê Lợi", address: "65 Lê Lợi", phone: "0913 438 399" },
        ].map((p) => <ContactCard key={p.name} name={p.name} address={p.address} phone={p.phone} />)}
      </div>
    ),
  },
  {
    id: "hospital",
    category: "ytecap",
    q: "Bệnh viện nào có khoa quốc tế hoặc nói được tiếng Anh tại Đà Nẵng?",
    tags: ["bệnh viện", "tiếng Anh", "quốc tế"],
    answer: (
      <div className="space-y-2 text-sm text-gray-600">
        {[
          { name: "Bệnh viện Đà Nẵng", address: "124 Hải Phòng, Hải Châu", phone: "0236 3821 480", badge: "Khoa quốc tế" },
          { name: "BV C Đà Nẵng", address: "122 Hải Phòng, Hải Châu", phone: "0236 3822 180", badge: "Cấp cứu 24/7" },
          { name: "BV Phụ sản Nhi Đà Nẵng", address: "402 Lê Văn Hiến, Ngũ Hành Sơn", phone: "0236 3958 005", badge: "Nhi – Sản" },
          { name: "Phòng khám Quốc tế Đà Nẵng", address: "50 Nguyễn Văn Linh, Hải Châu", phone: "0236 3577 999", badge: "Tiếng Anh" },
        ].map((h) => <ContactCard key={h.name} name={h.name} address={h.address} phone={h.phone} badge={h.badge} />)}
      </div>
    ),
  },

  /* ── Tiền & Chi phí ──────────────────────────────────────────── */
  {
    id: "money-exchange",
    category: "tien",
    q: "Đổi tiền ở đâu tốt nhất tại Đà Nẵng?",
    popular: true,
    tags: ["đổi tiền", "ngoại tệ", "ngân hàng"],
    answer: (
      <div className="space-y-3 text-sm text-gray-600">
        <p>Nên đổi tại ngân hàng hoặc tiệm vàng uy tín — tỷ giá tốt hơn khách sạn.</p>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Ngân hàng lớn</p>
        {[
          { name: "Vietcombank", address: "142 Lê Lợi · 325 Hùng Vương · 537 Trần Hưng Đạo", phone: "0236 3822 110" },
          { name: "BIDV", address: "90 Nguyễn Chí Thanh · 129 Lê Lợi · 132 Lê Đình Lý", phone: "0236 3822 371" },
          { name: "Agribank", address: "23 Phan Đình Phùng, Hải Châu", phone: "0236 3752 900" },
        ].map((b) => <ContactCard key={b.name} name={b.name} address={b.address} phone={b.phone} />)}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-2">Tiệm vàng (đổi tỷ giá tốt)</p>
        {[
          { name: "Tiệm Vàng Soạn Hà", address: "121 Trần Phú, Hải Châu", phone: "0236 3825 296" },
          { name: "Hiệu Vàng Kim Yến", address: "122 Bạch Đằng, Hải Châu", phone: "0905 500 333" },
          { name: "Khải Hoàn I", address: "19 Phó Đức Chính, Sơn Trà", phone: "0236 3831 318" },
        ].map((g) => <ContactCard key={g.name} name={g.name} address={g.address} phone={g.phone} />)}
      </div>
    ),
  },
  {
    id: "budget-daily",
    category: "tien",
    q: "Cần chuẩn bị bao nhiêu tiền cho 1 ngày ở Đà Nẵng?",
    tags: ["ngân sách", "chi phí", "tiết kiệm"],
    answer: (
      <div className="space-y-3 text-sm text-gray-600">
        <div className="space-y-2">
          {[
            { type: "Tiết kiệm (phượt)", budget: "400.000–600.000đ/ngày", note: "Hostel: 150K · Bún bò/bánh mì: 30–50K · Xe buýt: 8–30K · Vào biển miễn phí" },
            { type: "Thoải mái (khách du lịch)", budget: "1.000.000–1.500.000đ/ngày", note: "Khách sạn 3 sao: 500–700K · Nhà hàng: 150–300K · Grab: 100K" },
            { type: "Cao cấp (resort)", budget: "3.000.000đ+/ngày", note: "Resort 5 sao: 2–5 triệu · Nhà hàng fine dining: 500K–1 triệu" },
          ].map((b) => (
            <div key={b.type} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs font-bold text-gray-900">{b.type}</p>
              <p className="text-base font-black text-emerald-600">{b.budget}</p>
              <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">{b.note}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "atm",
    category: "tien",
    q: "ATM ở đâu? Rút tiền nước ngoài có bị phí không?",
    tags: ["ATM", "rút tiền", "thẻ quốc tế"],
    answer: (
      <div className="space-y-2 text-sm text-gray-600">
        <InfoRow icon={MapPin}>ATM dày đặc trên trục Lê Lợi, Bạch Đằng, Nguyễn Văn Linh, Hùng Vương</InfoRow>
        <InfoRow icon={DollarSign}>Phí rút ATM bằng thẻ nước ngoài: <strong>55.000–85.000đ/lần</strong> (tùy ngân hàng)</InfoRow>
        <InfoRow icon={Zap}>Vietcombank và BIDV chấp nhận Visa, MasterCard, UnionPay tốt nhất</InfoRow>
        <InfoRow icon={Zap}>Hạn mức rút: thường 5.000.000đ/lần — rút nhiều lần nếu cần nhiều hơn</InfoRow>
        <InfoRow icon={Star}>Mẹo: Dùng thẻ Wise hoặc Revolut để tránh phí chuyển đổi ngoại tệ</InfoRow>
      </div>
    ),
  },

  /* ── Thực tế hữu ích ─────────────────────────────────────────── */
  {
    id: "sim-card",
    category: "thongtin",
    q: "Mua SIM điện thoại ở đâu? Mạng nào tốt nhất?",
    tags: ["SIM", "internet", "3G 4G"],
    answer: (
      <div className="space-y-2 text-sm text-gray-600">
        <p>Du khách nước ngoài mua SIM tại sân bay hoặc cửa hàng chính hãng — cần trình Passport.</p>
        <div className="grid grid-cols-3 gap-2">
          {[["Viettel", "Phủ sóng rộng nhất", "#e11d48"], ["Mobifone", "Tốt ở đô thị, resort", "#2563eb"], ["Vietnamobile", "Giá rẻ nhất", "#7c3aed"]].map(([n, d, c]) => (
            <div key={n} className="rounded-xl border border-gray-100 bg-gray-50 p-2 text-center">
              <p className="text-xs font-bold text-gray-900">{n}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{d}</p>
            </div>
          ))}
        </div>
        <InfoRow icon={Ticket}>SIM du lịch 10 ngày (data không giới hạn): <strong>50.000–100.000đ</strong></InfoRow>
        <InfoRow icon={MapPin}>Mua tại: Cửa hàng trong sân bay T1/T2 · Hệ thống cửa hàng Viettel/Mobifone trên Điện Biên Phủ, Lê Lợi</InfoRow>
      </div>
    ),
  },
  {
    id: "best-time",
    category: "thongtin",
    q: "Mùa nào đẹp nhất để đến Đà Nẵng?",
    popular: true,
    tags: ["thời tiết", "mùa", "kế hoạch"],
    answer: (
      <div className="space-y-3 text-sm text-gray-600">
        <div className="space-y-2">
          {[
            { months: "Tháng 3 – 8", type: "Mùa khô ☀️", desc: "Tốt nhất để đi biển. Nắng ấm, ít mưa. Tháng 6–8 nóng nhất (~33°C) nhưng biển đẹp nhất.", color: "bg-amber-50 border-amber-200" },
            { months: "Tháng 9 – 11", type: "Mùa mưa 🌧️", desc: "Mưa nhiều và mạnh, có thể lũ lụt ở Hội An. Nên tránh nếu muốn du lịch biển. Vẫn đẹp nếu thích khám phá văn hóa.", color: "bg-blue-50 border-blue-200" },
            { months: "Tháng 12 – 2", type: "Mùa lạnh 🌬️", desc: "Trời lạnh và ít nắng (~20°C), có thể có mưa phùn. Phù hợp tham quan văn hóa, ít khách du lịch, giá rẻ hơn.", color: "bg-gray-50 border-gray-200" },
          ].map((m) => (
            <div key={m.months} className={`rounded-xl border p-3 ${m.color}`}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-gray-900">{m.type}</p>
                <p className="text-[10px] text-gray-500">{m.months}</p>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "useful-apps",
    category: "thongtin",
    q: "Những ứng dụng điện thoại nào hữu ích khi đến Đà Nẵng?",
    tags: ["app", "ứng dụng", "tiện ích"],
    answer: (
      <div className="space-y-2">
        {[
          { name: "Google Maps", use: "Bản đồ, tìm đường, xe buýt real-time", icon: "🗺️" },
          { name: "Grab", use: "Đặt xe taxi/xe máy, giao đồ ăn", icon: "🚕" },
          { name: "Shopee Food / BeFood", use: "Đặt đồ ăn giao tận nơi", icon: "🍱" },
          { name: "Google Translate", use: "Dịch thực đơn, bảng hiệu (chụp ảnh dịch)", icon: "🌐" },
          { name: "imdanang (trang này)", use: "Thông tin du lịch Đà Nẵng đầy đủ nhất", icon: "📍" },
        ].map((a) => (
          <div key={a.name} className="flex gap-3 items-center bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
            <span className="text-xl shrink-0">{a.icon}</span>
            <div>
              <p className="text-sm font-bold text-gray-900">{a.name}</p>
              <p className="text-xs text-gray-500">{a.use}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "internet-cafe",
    category: "thongtin",
    q: "Wifi công cộng ở Đà Nẵng có không? Tốt không?",
    tags: ["wifi", "internet"],
    answer: (
      <div className="space-y-2 text-sm text-gray-600">
        <InfoRow icon={Wifi}>Hầu hết khách sạn, quán cà phê, nhà hàng có Wifi miễn phí — chất lượng tốt</InfoRow>
        <InfoRow icon={Wifi}>Sân bay Đà Nẵng: Wifi miễn phí phủ toàn nhà ga (DAD_Free_Wifi)</InfoRow>
        <InfoRow icon={Wifi}>Khu phố đi bộ Bạch Đằng và Trần Phú có Wifi công cộng thành phố</InfoRow>
        <InfoRow icon={Zap}>Khuyến nghị: mua SIM data (50–100K) để chủ động — 4G Viettel rất mạnh</InfoRow>
      </div>
    ),
  },
  {
    id: "dress-code",
    category: "thongtin",
    q: "Khi vào chùa, đền ở Đà Nẵng cần ăn mặc thế nào?",
    tags: ["trang phục", "chùa", "văn hóa"],
    answer: (
      <div className="space-y-2 text-sm text-gray-600">
        <InfoRow icon={Zap}>Che vai và đầu gối — không mặc áo cộc tay, quần short ngắn vào nơi thờ tự</InfoRow>
        <InfoRow icon={Zap}>Cởi giày trước khi vào chánh điện (có biển nhắc nhở)</InfoRow>
        <InfoRow icon={Zap}>Ở Ngũ Hành Sơn và các chùa lớn thường có khăn/vải cho thuê nếu ăn mặc không phù hợp</InfoRow>
        <InfoRow icon={Star}>Phố cổ Hội An: thoải mái hơn, không có yêu cầu nghiêm ngặt ngoài khu thờ tự</InfoRow>
      </div>
    ),
  },
];

/* ═══════════════════════════════════════════════════════════════════
   FAQ ITEM COMPONENT
═══════════════════════════════════════════════════════════════════ */

function FaqRow({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  const cat = CATEGORIES.find((c) => c.key === item.category)!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 px-4 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className={`shrink-0 w-2 h-2 rounded-full mt-2 ${DOT[item.category]}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 leading-snug pr-2">{item.q}</p>
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">{cat.label}</span>
            {item.popular && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-500 border border-rose-100 font-medium">
                Thường hỏi
              </span>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 mt-1"
        >
          <ChevronDown size={16} className="text-gray-300" />
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
            <div className="px-4 pb-4 pt-1 border-t border-gray-100 bg-gray-50/40">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════ */

export default function TouristInfo() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<FaqCategory | "all">("all");

  const filtered = useMemo(() => {
    let list = FAQS;
    if (activeCat !== "all") list = list.filter((f) => f.category === activeCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((f) =>
        f.q.toLowerCase().includes(q) ||
        (f.tags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [search, activeCat]);

  const popular = FAQS.filter((f) => f.popular);

  return (
    <div className="bg-[#f5f5f4] min-h-screen">

      {/* ── Hero ── */}
      <div className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 px-4 pt-12 pb-10 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,white,transparent_70%)]" />
        <div className="max-w-2xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5 text-white/90 text-xs font-medium mb-4">
            <BookOpen size={12} />
            {FAQS.length} câu hỏi thường gặp · Cập nhật 2026
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
            Du khách thường hỏi gì<br />về Đà Nẵng?
          </h1>
          <p className="text-teal-100 text-sm mb-7">
            Tìm câu trả lời nhanh — vé tham quan, xe buýt, khách sạn, đổi tiền, y tế và nhiều hơn nữa.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm câu hỏi... VD: vé Hội An, xe buýt sân bay, đổi tiền"
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 bg-white shadow-lg"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-8 pb-20">

        {/* ── Category chips ── */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-6" style={{ scrollbarWidth: "none" } as React.CSSProperties}>
          {CATEGORIES.map((cat) => {
            const active = activeCat === cat.key;
            const count = cat.key === "all" ? FAQS.length : FAQS.filter((f) => f.category === cat.key).length;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCat(cat.key as FaqCategory | "all")}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all border ${
                  active
                    ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                }`}
              >
                <cat.icon size={12} style={{ color: active ? "#fff" : cat.color }} />
                {cat.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Popular section (only when no filter/search) ── */}
        <AnimatePresence>
          {!search && activeCat === "all" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-3">
                <Zap size={14} className="text-rose-500" />
                <h2 className="text-sm font-bold text-gray-900">Câu hỏi hay được hỏi nhất</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {popular.map((f) => {
                  const cat = CATEGORIES.find((c) => c.key === f.category)!;
                  return (
                    <button
                      key={f.id}
                      onClick={() => {
                        setActiveCat(f.category);
                        setTimeout(() => {
                          document.getElementById(`faq-${f.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                        }, 100);
                      }}
                      className="flex items-start gap-2.5 text-left bg-white border border-gray-100 rounded-xl px-3.5 py-3 hover:border-gray-200 hover:shadow-sm transition-all group"
                    >
                      <span className={`shrink-0 w-2 h-2 rounded-full mt-1.5 ${DOT[f.category]}`} />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-800 leading-snug group-hover:text-teal-700 transition-colors">{f.q}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{cat.label}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── FAQ list ── */}
        {search || activeCat !== "all" ? (
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-sm font-bold text-gray-900">
              {filtered.length > 0 ? `${filtered.length} kết quả` : "Không tìm thấy"}
            </h2>
            {(search || activeCat !== "all") && (
              <button
                onClick={() => { setSearch(""); setActiveCat("all"); }}
                className="text-xs text-teal-600 hover:text-teal-800 flex items-center gap-0.5"
              >
                <X size={11} /> Xóa bộ lọc
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-bold text-gray-900">Tất cả câu hỏi</h2>
            <span className="text-xs text-gray-400">{FAQS.length} câu hỏi</span>
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="space-y-2">
            {filtered.map((item, i) => (
              <div key={item.id} id={`faq-${item.id}`}>
                <FaqRow item={item} index={i} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search size={36} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-600 font-medium text-sm">Không tìm thấy câu hỏi phù hợp</p>
            <p className="text-gray-400 text-xs mt-1">Thử từ khóa khác hoặc chọn danh mục khác</p>
            <button
              onClick={() => { setSearch(""); setActiveCat("all"); }}
              className="mt-4 text-sm text-teal-600 hover:text-teal-800 font-medium"
            >
              Xem tất cả câu hỏi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
