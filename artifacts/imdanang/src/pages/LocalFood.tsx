import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Phone, Mail, Globe, MapPin, Star, ChevronRight,
  UtensilsCrossed, Search, Filter
} from "lucide-react";
import { useDarkMode } from "@/context/DarkModeContext";

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface Restaurant {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  rating: number;
  priceRange: string;
  hours: string;
  image: string;
}

interface Dish {
  id: number;
  name: string;
  tag: string;
  category: string;
  area: string;
  desc: string;
  longDesc: string;
  image: string;
  emoji: string;
  restaurants: Restaurant[];
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const dishes: Dish[] = [
  {
    id: 1,
    name: "Mì Quảng",
    tag: "Đặc sản số 1",
    category: "Bún & Mì",
    area: "Đà Nẵng",
    emoji: "🍜",
    desc: "Sợi mì vàng đặc trưng với nước dùng đậm đà, nhân tôm thịt, rau sống và bánh tráng giòn.",
    longDesc: "Mì Quảng là linh hồn của ẩm thực xứ Quảng, với sợi mì được làm từ gạo xay nhuộm màu vàng nghệ đặc trưng. Nước dùng không chan đầy bát mà chỉ xâm xấp, đậm vị tôm, thịt, trứng cút cùng rau thơm, đậu phộng rang và bánh tráng nướng giòn rụm. Mỗi quán Mì Quảng có hương vị riêng, tạo nên sức hút khó cưỡng với du khách.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop",
    restaurants: [
      { id: 101, name: "Mì Quảng 1A", address: "1 Hải Phòng, Hải Châu, Đà Nẵng", phone: "0236 3827 936", email: "miquang1a@gmail.com", website: "miquang1a.vn", rating: 4.8, priceRange: "35k–50k", hours: "6:00–14:00", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&auto=format&fit=crop" },
      { id: 102, name: "Mì Quảng Bà Mua", address: "19 Trần Bình Trọng, Hải Châu, Đà Nẵng", phone: "0905 123 456", email: "miquangbamua@gmail.com", website: "miquangbamua.com", rating: 4.7, priceRange: "30k–45k", hours: "6:00–13:00", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&auto=format&fit=crop" },
      { id: 103, name: "Mì Quảng Phú Chiêm", address: "45 Ngô Gia Tự, Hải Châu, Đà Nẵng", phone: "0236 3651 234", email: "miquangphuchiem@gmail.com", website: "miquangphuchiem.vn", rating: 4.6, priceRange: "30k–40k", hours: "7:00–14:00", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&auto=format&fit=crop" },
    ],
  },
  {
    id: 2,
    name: "Bánh Mì Đà Nẵng",
    tag: "Phải thử",
    category: "Bánh & Xôi",
    area: "Đà Nẵng",
    emoji: "🥖",
    desc: "Bánh mì giòn với thịt nướng, pa tê và rau sống – đặc sản đường phố Đà Nẵng.",
    longDesc: "Bánh mì Đà Nẵng khác với bánh mì Sài Gòn hay Hà Nội ở chỗ vỏ bánh giòn tan, nhân đặc biệt với thịt nướng thơm lừng, pa tê béo ngậy, dưa cải muối chua ngọt và ớt tươi. Mỗi chiếc bánh là cả một tác phẩm ẩm thực đường phố, giá cực phải chăng nhưng đậm vị Quảng Nam.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop",
    restaurants: [
      { id: 201, name: "Bánh Mì Bà Lan", address: "26 Thái Phiên, Hải Châu, Đà Nẵng", phone: "0905 321 654", email: "banhmibualan@gmail.com", website: "banhmibualan.com", rating: 4.9, priceRange: "20k–35k", hours: "6:00–20:00", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&auto=format&fit=crop" },
      { id: 202, name: "Bánh Mì Phượng Hội An", address: "2B Phan Châu Trinh, Hội An, Quảng Nam", phone: "0235 3861 527", email: "banhmiaphuong@hoian.vn", website: "banhmiaphuong.com", rating: 4.8, priceRange: "25k–40k", hours: "6:30–21:30", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&auto=format&fit=crop" },
      { id: 203, name: "Bánh Mì Cô Hồng", address: "67 Lê Lợi, Hải Châu, Đà Nẵng", phone: "0905 888 234", email: "banhmicohhong@gmail.com", website: "banhmicohhong.vn", rating: 4.6, priceRange: "18k–30k", hours: "6:00–19:00", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&auto=format&fit=crop" },
    ],
  },
  {
    id: 3,
    name: "Bún Chả Cá",
    tag: "Đặc sản biển",
    category: "Bún & Mì",
    area: "Đà Nẵng",
    emoji: "🐟",
    desc: "Bún nước với chả cá thơm ngon, vị đặc trưng của người Đà Nẵng qua nhiều thế hệ.",
    longDesc: "Bún chả cá Đà Nẵng là món ăn sáng quốc dân của người dân địa phương. Nước dùng từ xương cá trong vắt, ngọt tự nhiên, chả cá được làm từ cá tươi xay nhuyễn pha hành, tiêu rồi hấp hoặc chiên vàng. Ăn kèm bún tươi, rau sống, ớt và chanh – hương vị giản dị mà khó quên.",
    image: "https://images.unsplash.com/photo-1556040220-4096d522378d?w=800&auto=format&fit=crop",
    restaurants: [
      { id: 301, name: "Bún Chả Cá Ngô Thì Nhậm", address: "10 Ngô Thì Nhậm, Hải Châu, Đà Nẵng", phone: "0905 456 789", email: "bunchacangothinhm@gmail.com", website: "bunchaca-danang.com", rating: 4.7, priceRange: "25k–40k", hours: "6:00–11:00", image: "https://images.unsplash.com/photo-1556040220-4096d522378d?w=300&auto=format&fit=crop" },
      { id: 302, name: "Bún Chả Cá Bà Hiền", address: "64 Phan Chu Trinh, Hải Châu, Đà Nẵng", phone: "0236 3922 345", email: "bunchacabahien@gmail.com", website: "bunchacabahien.vn", rating: 4.6, priceRange: "20k–35k", hours: "6:30–11:30", image: "https://images.unsplash.com/photo-1556040220-4096d522378d?w=300&auto=format&fit=crop" },
    ],
  },
  {
    id: 4,
    name: "Cao Lầu Hội An",
    tag: "Di sản ẩm thực",
    category: "Đặc sản",
    area: "Hội An",
    emoji: "🍝",
    desc: "Món mì đặc biệt chỉ có tại Hội An, nước tro và giếng cổ làm nên hương vị độc nhất.",
    longDesc: "Cao Lầu là món ăn thuần Hội An không thể tìm thấy ở nơi nào khác trên thế giới. Sợi mì được làm từ gạo ngâm nước tro lấy từ đảo Cham Pa, kết hợp nước giếng cổ Bá Lễ tạo độ dai và màu vàng đặc trưng. Ăn kèm với thịt xá xíu, rau thơm, bánh đa giòn và ít nước dùng đậm đà – một trải nghiệm ẩm thực không thể bỏ qua khi đến Hội An.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop",
    restaurants: [
      { id: 401, name: "Cao Lầu Bà Bé", address: "45 Trần Phú, Minh An, Hội An, Quảng Nam", phone: "0235 3861 445", email: "caolaubabe@hoian.vn", website: "caolaubabe.com", rating: 4.8, priceRange: "40k–60k", hours: "8:00–20:00", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&auto=format&fit=crop" },
      { id: 402, name: "Cao Lầu Thanh", address: "26 Thái Phiên, Cẩm Phô, Hội An, Quảng Nam", phone: "0905 654 321", email: "caolauthanh@gmail.com", website: "caolauthanh.vn", rating: 4.7, priceRange: "35k–55k", hours: "7:00–21:00", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&auto=format&fit=crop" },
    ],
  },
  {
    id: 5,
    name: "Bánh Xèo Đà Nẵng",
    tag: "Giòn tan",
    category: "Bánh & Xôi",
    area: "Đà Nẵng",
    emoji: "🥞",
    desc: "Bánh xèo nhân tôm thịt giòn rụm, ăn kèm rau sống và mắm chua ngọt đặc trưng.",
    longDesc: "Bánh xèo Đà Nẵng có kích thước nhỏ hơn bánh xèo miền Nam nhưng lại giòn hơn, vỏ bánh vàng ươm với nhân tôm, thịt ba chỉ và giá đỗ tươi. Bí quyết nằm ở chiếc chảo gang nóng già và bột pha nước cốt dừa. Ăn kèm với một chén mắm chua ngọt pha chanh ớt và đĩa rau sống đủ loại – cực kỳ hấp dẫn!",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96e?w=800&auto=format&fit=crop",
    restaurants: [
      { id: 501, name: "Bánh Xèo Bà Dưỡng", address: "280/23 Hoàng Diệu, Hải Châu, Đà Nẵng", phone: "0905 777 888", email: "banhxeobaDuong@gmail.com", website: "banhxeobaDuong.com", rating: 4.9, priceRange: "30k–55k", hours: "10:00–21:00", image: "https://images.unsplash.com/photo-1563379091339-03246963d96e?w=300&auto=format&fit=crop" },
      { id: 502, name: "Bánh Xèo Trần Quý Cáp", address: "18 Trần Quý Cáp, Hải Châu, Đà Nẵng", phone: "0236 3938 182", email: "banhxeotranquycap@gmail.com", website: "banhxeotqc.vn", rating: 4.6, priceRange: "25k–45k", hours: "9:00–20:00", image: "https://images.unsplash.com/photo-1563379091339-03246963d96e?w=300&auto=format&fit=crop" },
    ],
  },
  {
    id: 6,
    name: "Cơm Gà Hội An",
    tag: "Chuẩn vị Hội An",
    category: "Đặc sản",
    area: "Hội An",
    emoji: "🍗",
    desc: "Cơm trắng dẻo với gà ta luộc xé phay, nước dùng vàng óng và tương ớt đặc biệt.",
    longDesc: "Cơm gà Hội An nức tiếng khắp cả nước với cơm trắng nấu bằng nước luộc gà vàng ươm, thơm lừng mùi gừng và hành. Gà ta luộc chin tới được xé nhỏ, trộn với hành phi và rau răm thơm ngát. Điểm nhấn là tô nước dùng trong vắt ngọt tự nhiên và chén tương ớt hội bí truyền gia đình – hương vị không chỗ nào có được.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop",
    restaurants: [
      { id: 601, name: "Cơm Gà Bà Buội", address: "22 Trần Phú, Minh An, Hội An, Quảng Nam", phone: "0235 3910 441", email: "comgababuoi@hoian.vn", website: "comgababuoi.com", rating: 4.8, priceRange: "40k–70k", hours: "8:00–18:00", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&auto=format&fit=crop" },
      { id: 602, name: "Cơm Gà Hải Nam Phương", address: "6 Hoàng Diệu, Minh An, Hội An, Quảng Nam", phone: "0905 234 567", email: "comgahainam@gmail.com", website: "comgahainam.vn", rating: 4.7, priceRange: "35k–60k", hours: "7:30–19:00", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&auto=format&fit=crop" },
    ],
  },
  {
    id: 7,
    name: "Nem Lụi Nha Trang",
    tag: "Nướng than hoa",
    category: "Đặc sản",
    area: "Đà Nẵng",
    emoji: "🍢",
    desc: "Chả nem nướng trên lửa than, cuốn bánh tráng với đủ loại rau thơm và nước chấm đặc biệt.",
    longDesc: "Nem lụi là món ăn thú vị với những xiên thịt heo xay pha sả băm nhỏ, nướng trên than hồng tỏa mùi thơm ngào ngạt. Thực khách tự tay cuốn nem vào bánh tráng mướt với dưa leo, rau thơm, khế chua, chuối sứ xanh và chấm vào tô nước lèo đặc biệt từ gan heo, đậu phộng rang. Đây là trải nghiệm ẩm thực tương tác cực thú vị.",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&auto=format&fit=crop",
    restaurants: [
      { id: 701, name: "Nem Lụi Bà Năm", address: "108 Hoàng Diệu, Hải Châu, Đà Nẵng", phone: "0905 999 111", email: "nemluibaNam@gmail.com", website: "nemluibaNam.com", rating: 4.7, priceRange: "50k–80k", hours: "10:00–22:00", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&auto=format&fit=crop" },
      { id: 702, name: "Quán Nem Lụi Thanh Hương", address: "34 Ngô Quyền, Sơn Trà, Đà Nẵng", phone: "0236 3967 234", email: "nemluith@gmail.com", website: "nemluithanhhuong.vn", rating: 4.5, priceRange: "45k–70k", hours: "11:00–21:30", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&auto=format&fit=crop" },
    ],
  },
  {
    id: 8,
    name: "Bánh Tráng Cuốn Thịt Heo",
    tag: "Cực kỳ dân dã",
    category: "Bánh & Xôi",
    area: "Đà Nẵng",
    emoji: "🌯",
    desc: "Bánh tráng mướt cuốn thịt heo luộc, rau sống, nước mắm ớt chua ngọt – đặc sản dân dã Đà Nẵng.",
    longDesc: "Bánh tráng cuốn thịt heo được xem là món ăn quốc dân của người Đà Nẵng. Bánh tráng mỏng mướt được nhúng qua nước nóng, đặt lên mâm cùng thịt ba chỉ luộc chín thái mỏng, tôm luộc, rau thơm đủ loại, dưa leo, cà rốt bào. Thực khách tự cuốn và chấm mắm nêm sền sệt thơm đặc trưng hoặc nước mắm chua ngọt – hương vị khó quên!",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop",
    restaurants: [
      { id: 801, name: "Trần Restaurant", address: "Hoàng Sa, Sơn Trà, Đà Nẵng", phone: "0236 3941 234", email: "tranrestaurant@gmail.com", website: "tranrestaurant.vn", rating: 4.8, priceRange: "80k–150k/người", hours: "10:00–22:00", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&auto=format&fit=crop" },
      { id: 802, name: "Nhà Hàng Bé Mặn", address: "Mỹ Khê, Phước Mỹ, Sơn Trà, Đà Nẵng", phone: "0905 432 123", email: "beman.danang@gmail.com", website: "bemanrestaurant.com", rating: 4.6, priceRange: "70k–130k/người", hours: "9:00–22:30", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&auto=format&fit=crop" },
    ],
  },
];

const categories = ["Tất cả", "Bún & Mì", "Bánh & Xôi", "Đặc sản"];
const areas = ["Tất cả", "Đà Nẵng", "Hội An"];

// ─── TAG COLOR ────────────────────────────────────────────────────────────────

const tagColors: Record<string, { bg: string; text: string }> = {
  "Bún & Mì":   { bg: "bg-orange-500/15", text: "text-orange-500" },
  "Bánh & Xôi": { bg: "bg-amber-500/15",  text: "text-amber-500" },
  "Đặc sản":    { bg: "bg-rose-500/15",   text: "text-rose-500" },
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function LocalFood() {
  const { isDark: D } = useDarkMode();
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [activeArea, setActiveArea] = useState("Tất cả");
  const [search, setSearch] = useState("");

  const filtered = dishes.filter(d => {
    const matchCat  = activeCategory === "Tất cả" || d.category === activeCategory;
    const matchArea = activeArea === "Tất cả" || d.area === activeArea;
    const matchSrc  = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchArea && matchSrc;
  });

  const tx   = D ? "text-white"         : "text-gray-900";
  const txM  = D ? "text-white/60"      : "text-gray-500";
  const txS  = D ? "text-white/40"      : "text-gray-400";
  const bg   = D ? "bg-[#0d0d1a]"       : "bg-gray-50";
  const card = D ? "bg-white/[0.03] border-white/8 hover:border-white/15" : "bg-white border-gray-100 hover:border-gray-300 shadow-sm hover:shadow-md";
  const inp  = D ? "bg-white/5 border-white/10 text-white placeholder:text-white/30" : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400";
  const chip = (active: boolean) => active
    ? "bg-rose-500 text-white border-rose-500"
    : D ? "border-white/10 text-white/50 hover:border-white/25 hover:text-white/80" : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800";

  return (
    <div className={`min-h-screen ${bg}`}>

      {/* ─── HERO ── Recipe Card / Aged Paper ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: D
            ? "linear-gradient(135deg,#1c0d0d 0%,#2a1010 50%,#1c0d0d 100%)"
            : "linear-gradient(135deg,#fff7f0 0%,#fef3e8 50%,#fde4d4 100%)",
        }}
      >
        {/* Paper texture */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #be185d 0%, transparent 35%), radial-gradient(circle at 75% 75%, #f59e0b 0%, transparent 35%)",
          }}
        />
        {/* Top + bottom dotted "stitches" */}
        <div className={`absolute top-3 inset-x-6 border-t-2 border-dashed ${D ? "border-rose-700/50" : "border-rose-400/50"}`} />
        <div className={`absolute bottom-3 inset-x-6 border-t-2 border-dashed ${D ? "border-rose-700/50" : "border-rose-400/50"}`} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-12">
          <div className="grid lg:grid-cols-[1.1fr,1fr] gap-8 items-center">
            {/* LEFT: Recipe header */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest ${D ? "bg-rose-500 text-white" : "bg-rose-100 text-rose-800 border border-rose-300"}`}>
                <UtensilsCrossed size={13} />
                THỰC ĐƠN · {dishes.length} MÓN GIA TRUYỀN
              </div>

              <h1 className={`font-serif text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-3 ${D ? "text-rose-50" : "text-rose-950"}`}>
                Món Ngon
                <span className={`block italic text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500`} style={{ fontFamily: "'Brush Script MT', cursive" }}>
                  Mẹ Nấu
                </span>
              </h1>

              <p className={`text-base max-w-md leading-relaxed mb-6 ${D ? "text-rose-100/60" : "text-rose-900/70"}`}>
                Mì Quảng nóng hổi, Cao Lầu trăm năm, Bánh Xèo giòn tan — công thức truyền đời của xứ Quảng.
              </p>

              {/* Hand-drawn ingredient chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { emoji: "🍜", label: "Bún & Mì" },
                  { emoji: "🥖", label: "Bánh & Xôi" },
                  { emoji: "🐟", label: "Hải sản" },
                  { emoji: "🍗", label: "Đặc sản" },
                ].map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: i % 2 ? -3 : 3 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-dashed shadow-sm ${D ? "bg-rose-950/50 border-rose-700/60 text-rose-100" : "bg-white border-rose-300 text-rose-900"}`}
                  >
                    <span className="text-lg">{c.emoji}</span>
                    <span className="text-xs font-bold">{c.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Recipe-card search */}
              <div className={`relative rounded-2xl p-1.5 flex items-center gap-2 shadow-2xl border-4 ${D ? "bg-rose-950 border-rose-700" : "bg-white border-rose-300"}`}>
                <div className={`absolute -top-3 left-5 px-2.5 py-0.5 text-[10px] font-black tracking-[0.2em] rounded-md z-10 ${D ? "bg-rose-500 text-white" : "bg-rose-700 text-rose-50"}`}>
                  TÌM CÔNG THỨC
                </div>
                <div className="flex items-center gap-2 flex-1 px-3">
                  <Search size={16} className={D ? "text-rose-300" : "text-rose-700"} />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Mì Quảng, Cao Lầu, Bánh Xèo..."
                    className={`flex-1 bg-transparent text-sm focus:outline-none ${D ? "text-rose-50 placeholder:text-rose-300/40" : "text-rose-950 placeholder:text-rose-600/40"}`}
                  />
                </div>
                <button className="bg-gradient-to-br from-rose-500 to-pink-600 text-white font-black px-4 py-2.5 rounded-xl text-sm flex items-center gap-1">
                  Khám phá <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>

            {/* RIGHT: Recipe-card photo with hand-drawn icons border */}
            <div className="relative h-[280px] lg:h-[360px] hidden md:block">
              <motion.div
                initial={{ opacity: 0, rotate: 4 }}
                animate={{ opacity: 1, rotate: -2 }}
                transition={{ duration: 0.8 }}
                className={`absolute inset-4 rounded-3xl overflow-hidden border-8 shadow-2xl ${D ? "border-rose-50 bg-rose-50" : "border-white bg-white"}`}
                style={{ boxShadow: "0 30px 60px rgba(244,63,94,0.3)" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop"
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/60 via-transparent" />
                {/* Stamp */}
                <div className="absolute top-3 right-3 w-16 h-16 rounded-full border-4 border-rose-500 flex items-center justify-center bg-white/90 -rotate-12">
                  <div className="text-center text-rose-700">
                    <div className="text-[8px] font-black leading-none">TRUYỀN</div>
                    <div className="text-base font-black">100%</div>
                    <div className="text-[8px] font-black leading-none">THỐNG</div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[10px] tracking-widest font-bold opacity-80">★ ICONIC</div>
                  <div className="font-serif font-bold text-2xl">Mì Quảng</div>
                </div>
              </motion.div>

              {/* Floating ingredient emojis */}
              {["🌶️", "🍋", "🌿", "🥢", "🥄"].map((e, i) => (
                <motion.div
                  key={i}
                  className="absolute text-3xl"
                  style={{ left: `${[5, 80, 90, 0, 70][i]}%`, top: `${[5, 10, 80, 75, 50][i]}%` }}
                  animate={{ y: [0, -10, 0], rotate: [0, 12, 0] }}
                  transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
                >
                  {e}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── FILTERS ─── */}
      <div className="max-w-6xl mx-auto px-4 py-5">
        {/* Search */}
        <div className={`flex items-center gap-2.5 border rounded-2xl px-4 py-2.5 mb-4 ${inp}`}>
          <Search size={15} className={txS} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm món ngon..."
            className="bg-transparent text-sm flex-1 focus:outline-none"
          />
          {search && <button onClick={() => setSearch("")}><X size={13} className={txS} /></button>}
        </div>

        {/* Category + Area chips */}
        <div className="flex gap-2 flex-wrap mb-2">
          <div className={`flex items-center gap-1 text-xs font-medium ${txS}`}>
            <Filter size={11} />Loại:
          </div>
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)}
              className={`px-3 py-1 rounded-full border text-xs font-medium transition-all ${chip(activeCategory === c)}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className={`flex items-center gap-1 text-xs font-medium ${txS}`}>
            <MapPin size={11} />Khu vực:
          </div>
          {areas.map(a => (
            <button key={a} onClick={() => setActiveArea(a)}
              className={`px-3 py-1 rounded-full border text-xs font-medium transition-all ${chip(activeArea === a)}`}>
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* ─── GRID ─── */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <p className={`text-xs mb-4 ${txS}`}>{filtered.length} món đặc sản</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((dish, i) => {
              const tc = tagColors[dish.category] || { bg: "bg-indigo-500/15", text: "text-indigo-500" };
              return (
                <motion.div
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedDish(dish)}
                  role="button"
                  className={`rounded-2xl border overflow-hidden cursor-pointer transition-all group ${card}`}
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img src={dish.image} alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* Emoji badge */}
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-black/40 backdrop-blur flex items-center justify-center text-xl">
                      {dish.emoji}
                    </div>
                    {/* Tag */}
                    <div className="absolute top-3 right-3 bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                      {dish.tag}
                    </div>
                    {/* Area */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 text-white/90 rounded-full px-2 py-0.5 text-[10px]">
                      <MapPin size={8} />{dish.area}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-bold text-sm leading-tight ${tx}`}>{dish.name}</h3>
                      <span className={`shrink-0 text-[9px] font-semibold px-2 py-0.5 rounded-full ${tc.bg} ${tc.text}`}>
                        {dish.category}
                      </span>
                    </div>
                    <p className={`text-[11px] leading-relaxed line-clamp-2 mb-3 ${txM}`}>{dish.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] ${txS}`}>{dish.restaurants.length} nhà hàng</span>
                      <div className={`flex items-center gap-1 text-[10px] font-semibold text-rose-500`}>
                        Xem chi tiết <ChevronRight size={10} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-3">🍽️</div>
            <p className={`font-semibold ${tx}`}>Không tìm thấy món ngon phù hợp</p>
            <p className={`text-sm mt-1 ${txS}`}>Thử thay đổi bộ lọc hoặc tìm kiếm khác</p>
          </div>
        )}
      </div>

      {/* ─── MODAL ─── */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.72)" }}
            onClick={e => { if (e.target === e.currentTarget) setSelectedDish(null); }}
          >
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className={`relative w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col ${D ? "bg-[#0f0f1e]" : "bg-white"}`}
              style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}
            >
              {/* Hero image */}
              <div className="relative h-52 shrink-0 overflow-hidden">
                <img src={selectedDish.image} alt={selectedDish.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Close */}
                <button onClick={() => setSelectedDish(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                  <X size={16} />
                </button>

                {/* Title overlay */}
                <div className="absolute bottom-4 left-4 right-16">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-2xl">{selectedDish.emoji}</span>
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">{selectedDish.tag}</span>
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${tagColors[selectedDish.category]?.bg || "bg-indigo-500/20"} ${tagColors[selectedDish.category]?.text || "text-indigo-400"}`}>
                      {selectedDish.category}
                    </span>
                    <span className="flex items-center gap-1 bg-black/40 text-white/80 text-[10px] px-2 py-0.5 rounded-full">
                      <MapPin size={8} />{selectedDish.area}
                    </span>
                  </div>
                  <h2 className="text-white font-bold text-xl leading-tight drop-shadow">{selectedDish.name}</h2>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto flex-1">
                {/* Description */}
                <div className={`px-5 py-4 border-b ${D ? "border-white/8" : "border-gray-100"}`}>
                  <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${D ? "text-white/35" : "text-gray-400"}`}>Giới thiệu</h3>
                  <p className={`text-sm leading-relaxed ${D ? "text-white/75" : "text-gray-600"}`}>{selectedDish.longDesc}</p>
                </div>

                {/* Restaurant list */}
                <div className="px-5 py-4">
                  <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${D ? "text-white/35" : "text-gray-400"}`}>
                    {selectedDish.restaurants.length} Nhà hàng phục vụ món này
                  </h3>
                  <div className="space-y-3">
                    {selectedDish.restaurants.map((r, i) => (
                      <motion.div
                        key={r.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className={`rounded-2xl border p-4 ${D ? "bg-white/[0.03] border-white/8" : "bg-gray-50 border-gray-100"}`}
                      >
                        {/* Top row: image + name + rating */}
                        <div className="flex gap-3 mb-3">
                          <img src={r.image} alt={r.name}
                            className="w-14 h-14 rounded-xl object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className={`font-bold text-sm leading-tight mb-1 ${tx}`}>{r.name}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="flex items-center gap-1">
                                <Star size={10} className="text-amber-400 fill-amber-400" />
                                <span className="text-amber-500 text-xs font-bold">{r.rating}</span>
                              </div>
                              <span className={`text-[10px] ${txS}`}>{r.hours}</span>
                              <span className={`text-[10px] font-medium text-emerald-500`}>{r.priceRange}</span>
                            </div>
                          </div>
                        </div>

                        {/* Contact details */}
                        <div className="space-y-2">
                          <ContactRow icon={<MapPin size={12} />} value={r.address} color="text-rose-400" />
                          <ContactRow
                            icon={<Phone size={12} />}
                            value={r.phone}
                            color="text-indigo-400"
                            href={`tel:${r.phone.replace(/\s/g, "")}`}
                          />
                          <ContactRow
                            icon={<Mail size={12} />}
                            value={r.email}
                            color="text-sky-400"
                            href={`mailto:${r.email}`}
                          />
                          <ContactRow
                            icon={<Globe size={12} />}
                            value={r.website}
                            color="text-emerald-400"
                            href={`https://${r.website}`}
                            external
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Padding bottom for safe area */}
                <div className="h-4" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── HELPER ───────────────────────────────────────────────────────────────────

function ContactRow({
  icon, value, color, href, external,
}: { icon: React.ReactNode; value: string; color: string; href?: string; external?: boolean }) {
  const { isDark: D } = useDarkMode();
  const inner = (
    <div className={`flex items-start gap-2 text-xs ${D ? "text-white/60" : "text-gray-500"}`}>
      <span className={`mt-0.5 shrink-0 ${color}`}>{icon}</span>
      <span className={`leading-snug break-all ${href ? "hover:underline" : ""} ${href ? color : ""}`}>{value}</span>
    </div>
  );
  if (href) {
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {inner}
      </a>
    );
  }
  return inner;
}
