import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Phone, Mail, Globe, MapPin, Star, ChevronRight, UtensilsCrossed, Soup, Award, Flame,
} from "lucide-react";
import { CategoryShell, useThemeAccents } from "@/components/category/CategoryShell";

interface Restaurant {
  id: number; name: string; address: string; phone: string; email: string; website: string;
  rating: number; priceRange: string; hours: string; image: string;
}

interface Dish {
  id: number; name: string; tag: string; category: string; area: string;
  desc: string; longDesc: string; image: string; emoji: string; restaurants: Restaurant[];
}

const dishes: Dish[] = [
  {
    id: 1, name: "Mì Quảng", tag: "Đặc sản số 1", category: "bun-mi", area: "Đà Nẵng", emoji: "🍜",
    desc: "Sợi mì vàng đặc trưng với nước dùng đậm đà, nhân tôm thịt, rau sống và bánh tráng giòn.",
    longDesc: "Mì Quảng là linh hồn của ẩm thực xứ Quảng, với sợi mì được làm từ gạo xay nhuộm màu vàng nghệ đặc trưng. Nước dùng không chan đầy bát mà chỉ xâm xấp, đậm vị tôm, thịt, trứng cút cùng rau thơm, đậu phộng rang và bánh tráng nướng giòn rụm.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop",
    restaurants: [
      { id: 101, name: "Mì Quảng 1A", address: "1 Hải Phòng, Hải Châu, Đà Nẵng", phone: "0236 3827 936", email: "miquang1a@gmail.com", website: "miquang1a.vn", rating: 4.8, priceRange: "35k–50k", hours: "6:00–14:00", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&auto=format&fit=crop" },
      { id: 102, name: "Mì Quảng Bà Mua", address: "19 Trần Bình Trọng, Hải Châu, Đà Nẵng", phone: "0905 123 456", email: "miquangbamua@gmail.com", website: "miquangbamua.com", rating: 4.7, priceRange: "30k–45k", hours: "6:00–13:00", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&auto=format&fit=crop" },
      { id: 103, name: "Mì Quảng Phú Chiêm", address: "45 Ngô Gia Tự, Hải Châu, Đà Nẵng", phone: "0236 3651 234", email: "miquangphuchiem@gmail.com", website: "miquangphuchiem.vn", rating: 4.6, priceRange: "30k–40k", hours: "7:00–14:00", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&auto=format&fit=crop" },
    ],
  },
  {
    id: 2, name: "Bánh Mì Đà Nẵng", tag: "Phải thử", category: "banh", area: "Đà Nẵng", emoji: "🥖",
    desc: "Bánh mì giòn với thịt nướng, pa tê và rau sống – đặc sản đường phố Đà Nẵng.",
    longDesc: "Bánh mì Đà Nẵng khác với bánh mì Sài Gòn hay Hà Nội ở chỗ vỏ bánh giòn tan, nhân đặc biệt với thịt nướng thơm lừng, pa tê béo ngậy, dưa cải muối chua ngọt và ớt tươi.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop",
    restaurants: [
      { id: 201, name: "Bánh Mì Bà Lan", address: "26 Thái Phiên, Hải Châu, Đà Nẵng", phone: "0905 321 654", email: "banhmibualan@gmail.com", website: "banhmibualan.com", rating: 4.9, priceRange: "20k–35k", hours: "6:00–20:00", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&auto=format&fit=crop" },
      { id: 202, name: "Bánh Mì Phượng Hội An", address: "2B Phan Châu Trinh, Hội An, Quảng Nam", phone: "0235 3861 527", email: "banhmiaphuong@hoian.vn", website: "banhmiaphuong.com", rating: 4.8, priceRange: "25k–40k", hours: "6:30–21:30", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&auto=format&fit=crop" },
    ],
  },
  {
    id: 3, name: "Bún Chả Cá", tag: "Đặc sản biển", category: "bun-mi", area: "Đà Nẵng", emoji: "🐟",
    desc: "Bún nước với chả cá thơm ngon, vị đặc trưng của người Đà Nẵng qua nhiều thế hệ.",
    longDesc: "Bún chả cá Đà Nẵng là món ăn sáng quốc dân của người dân địa phương. Nước dùng từ xương cá trong vắt, ngọt tự nhiên, chả cá được làm từ cá tươi xay nhuyễn pha hành, tiêu rồi hấp hoặc chiên vàng.",
    image: "https://images.unsplash.com/photo-1556040220-4096d522378d?w=900&auto=format&fit=crop",
    restaurants: [
      { id: 301, name: "Bún Chả Cá Ngô Thì Nhậm", address: "10 Ngô Thì Nhậm, Hải Châu, Đà Nẵng", phone: "0905 456 789", email: "bunchacangothinhm@gmail.com", website: "bunchaca-danang.com", rating: 4.7, priceRange: "25k–40k", hours: "6:00–11:00", image: "https://images.unsplash.com/photo-1556040220-4096d522378d?w=300&auto=format&fit=crop" },
    ],
  },
  {
    id: 4, name: "Cao Lầu Hội An", tag: "Di sản ẩm thực", category: "dac-san", area: "Hội An", emoji: "🍝",
    desc: "Món mì đặc biệt chỉ có tại Hội An, nước tro và giếng cổ làm nên hương vị độc nhất.",
    longDesc: "Cao Lầu là món ăn thuần Hội An không thể tìm thấy ở nơi nào khác. Sợi mì được làm từ gạo ngâm nước tro lấy từ đảo Cham Pa, kết hợp nước giếng cổ Bá Lễ tạo độ dai và màu vàng đặc trưng.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop",
    restaurants: [
      { id: 401, name: "Cao Lầu Bà Bé", address: "45 Trần Phú, Minh An, Hội An, Quảng Nam", phone: "0235 3861 445", email: "caolaubabe@hoian.vn", website: "caolaubabe.com", rating: 4.8, priceRange: "40k–60k", hours: "8:00–20:00", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&auto=format&fit=crop" },
    ],
  },
  {
    id: 5, name: "Bánh Xèo Đà Nẵng", tag: "Giòn tan", category: "banh", area: "Đà Nẵng", emoji: "🥞",
    desc: "Bánh xèo nhân tôm thịt giòn rụm, ăn kèm rau sống và mắm chua ngọt đặc trưng.",
    longDesc: "Bánh xèo Đà Nẵng có kích thước nhỏ hơn bánh xèo miền Nam nhưng lại giòn hơn, vỏ bánh vàng ươm với nhân tôm, thịt ba chỉ và giá đỗ tươi.",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96e?w=900&auto=format&fit=crop",
    restaurants: [
      { id: 501, name: "Bánh Xèo Bà Dưỡng", address: "280/23 Hoàng Diệu, Hải Châu, Đà Nẵng", phone: "0905 777 888", email: "banhxeobaDuong@gmail.com", website: "banhxeobaDuong.com", rating: 4.9, priceRange: "30k–55k", hours: "10:00–21:00", image: "https://images.unsplash.com/photo-1563379091339-03246963d96e?w=300&auto=format&fit=crop" },
    ],
  },
  {
    id: 6, name: "Cơm Gà Hội An", tag: "Chuẩn vị Hội An", category: "dac-san", area: "Hội An", emoji: "🍗",
    desc: "Cơm trắng dẻo với gà ta luộc xé phay, nước dùng vàng óng và tương ớt đặc biệt.",
    longDesc: "Cơm gà Hội An nức tiếng khắp cả nước với cơm trắng nấu bằng nước luộc gà vàng ươm, thơm lừng mùi gừng và hành.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&auto=format&fit=crop",
    restaurants: [
      { id: 601, name: "Cơm Gà Bà Buội", address: "22 Trần Phú, Minh An, Hội An, Quảng Nam", phone: "0235 3910 441", email: "comgababuoi@hoian.vn", website: "comgababuoi.com", rating: 4.8, priceRange: "40k–70k", hours: "8:00–18:00", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&auto=format&fit=crop" },
    ],
  },
  {
    id: 7, name: "Nem Lụi", tag: "Nướng than hoa", category: "dac-san", area: "Đà Nẵng", emoji: "🍢",
    desc: "Chả nem nướng trên lửa than, cuốn bánh tráng với đủ loại rau thơm và nước chấm đặc biệt.",
    longDesc: "Nem lụi là món ăn thú vị với những xiên thịt heo xay pha sả băm nhỏ, nướng trên than hồng tỏa mùi thơm ngào ngạt.",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=900&auto=format&fit=crop",
    restaurants: [
      { id: 701, name: "Nem Lụi Bà Năm", address: "108 Hoàng Diệu, Hải Châu, Đà Nẵng", phone: "0905 999 111", email: "nemluibaNam@gmail.com", website: "nemluibaNam.com", rating: 4.7, priceRange: "50k–80k", hours: "10:00–22:00", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&auto=format&fit=crop" },
    ],
  },
  {
    id: 8, name: "Bánh Tráng Cuốn Thịt Heo", tag: "Cực kỳ dân dã", category: "banh", area: "Đà Nẵng", emoji: "🌯",
    desc: "Bánh tráng mướt cuốn thịt heo luộc, rau sống, nước mắm ớt chua ngọt – đặc sản dân dã Đà Nẵng.",
    longDesc: "Bánh tráng cuốn thịt heo được xem là món ăn quốc dân của người Đà Nẵng. Bánh tráng mỏng mướt được nhúng qua nước nóng, đặt lên mâm cùng thịt ba chỉ luộc chín thái mỏng.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=900&auto=format&fit=crop",
    restaurants: [
      { id: 801, name: "Trần Restaurant", address: "Hoàng Sa, Sơn Trà, Đà Nẵng", phone: "0236 3941 234", email: "tranrestaurant@gmail.com", website: "tranrestaurant.vn", rating: 4.8, priceRange: "80k–150k/người", hours: "10:00–22:00", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&auto=format&fit=crop" },
    ],
  },
];

const categoryFilters = [
  { key: "all",     label: "Tất cả",    emoji: "🍽️" },
  { key: "bun-mi",  label: "Bún & Mì",  emoji: "🍜" },
  { key: "banh",    label: "Bánh & Xôi",emoji: "🥖" },
  { key: "dac-san", label: "Đặc sản",   emoji: "⭐" },
];

const collage = [
  { src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop", className: "top-0 right-0 w-[58%] h-[58%]" },
  { src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop", className: "top-[18%] left-0 w-[48%] h-[52%]" },
  { src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&auto=format&fit=crop", className: "bottom-0 right-[10%] w-[52%] h-[42%]" },
];

export default function LocalFood() {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");
  const acc = useThemeAccents("localfood");

  const filtered = dishes.filter((d) => {
    if (activeCat !== "all" && d.category !== activeCat) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!d.name.toLowerCase().includes(q) && !d.desc.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <>
      <CategoryShell
        themeKey="localfood"
        badge={{ icon: Soup, text: `${dishes.length} món gia truyền · Xứ Quảng` }}
        titleLines={["Món ngon", "mẹ nấu.", "Hồn quê trong từng bát."]}
        gradientLineIndex={1}
        subtitle="Mì Quảng, Cao Lầu, Bánh Xèo, Cơm Gà — công thức truyền đời từ những ngôi nhà cổ Hội An đến gánh hàng Đà Nẵng."
        stats={[
          { icon: Soup,  label: "Món đặc sản",     value: `${dishes.length}+` },
          { icon: Flame, label: "Hương vị TB",      value: "4.8" },
          { icon: Award, label: "Quán gia truyền",  value: "30+" },
        ]}
        collage={collage}
        floatingBadge={{ icon: Flame, title: "Mì Quảng", subtitle: "★ ICONIC" }}
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Tìm món: Mì Quảng, Cao Lầu..."
        categories={categoryFilters}
        activeCat={activeCat}
        setActiveCat={setActiveCat}
        resultCount={<><span className="text-gray-800 font-semibold">{filtered.length}</span> món đặc sản</>}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((dish, i) => (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedDish(dish)}
                role="button"
                whileHover={{ y: -6 }}
                className="group rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-200 transition-all cursor-pointer"
                data-testid={`card-dish-${dish.id}`}
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-black/40 backdrop-blur flex items-center justify-center text-xl">
                    {dish.emoji}
                  </div>
                  <div
                    className="absolute top-3 right-3 text-white text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${acc.orbA}, ${acc.orbB})` }}
                  >
                    {dish.tag}
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 text-white/90 rounded-full px-2 py-0.5 text-[10px]">
                    <MapPin size={9} />{dish.area}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm leading-tight text-gray-900 mb-1">{dish.name}</h3>
                  <p className="text-[11px] leading-relaxed line-clamp-2 mb-3 text-gray-500">{dish.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">{dish.restaurants.length} nhà hàng</span>
                    <div className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: acc.orbA }}>
                      Xem chi tiết <ChevronRight size={11} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="pt-16 flex flex-col items-center justify-center text-center">
            <UtensilsCrossed size={40} className="text-gray-300 mb-3" />
            <p className="text-gray-700 font-medium">Không tìm thấy món ngon phù hợp</p>
            <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </CategoryShell>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedDish(null); }}
          >
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col bg-white border border-gray-200"
              style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.2)" }}
            >
              <div className="relative h-52 shrink-0 overflow-hidden">
                <img src={selectedDish.image} alt={selectedDish.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <button
                  onClick={() => setSelectedDish(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-4 left-4 right-16">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-2xl">{selectedDish.emoji}</span>
                    <span
                      className="text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: `linear-gradient(135deg, ${acc.orbA}, ${acc.orbB})` }}
                    >
                      {selectedDish.tag}
                    </span>
                    <span className="flex items-center gap-1 bg-black/40 text-white/80 text-[10px] px-2 py-0.5 rounded-full">
                      <MapPin size={9} />{selectedDish.area}
                    </span>
                  </div>
                  <h2 className="text-white font-bold text-xl leading-tight drop-shadow">{selectedDish.name}</h2>
                </div>
              </div>

              <div className="overflow-y-auto flex-1">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 text-gray-400">Giới thiệu</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{selectedDish.longDesc}</p>
                </div>

                <div className="px-5 py-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 text-gray-400">
                    {selectedDish.restaurants.length} nhà hàng phục vụ
                  </h3>
                  <div className="space-y-3">
                    {selectedDish.restaurants.map((r, i) => (
                      <motion.div
                        key={r.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
                      >
                        <div className="flex gap-3 mb-3">
                          <img src={r.image} alt={r.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm leading-tight mb-1 text-gray-900">{r.name}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="flex items-center gap-1">
                                <Star size={10} style={{ color: acc.orbA }} className="fill-current" />
                                <span style={{ color: acc.orbA }} className="text-xs font-bold">{r.rating}</span>
                              </div>
                              <span className="text-[10px] text-gray-400">{r.hours}</span>
                              <span className="text-[10px] font-medium text-emerald-600">{r.priceRange}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <ContactRow icon={<MapPin size={12} />} value={r.address} color="text-rose-500" />
                          <ContactRow icon={<Phone size={12} />} value={r.phone} color="text-indigo-500" href={`tel:${r.phone.replace(/\s/g, "")}`} />
                          <ContactRow icon={<Mail size={12} />} value={r.email} color="text-sky-500" href={`mailto:${r.email}`} />
                          <ContactRow icon={<Globe size={12} />} value={r.website} color="text-emerald-600" href={`https://${r.website}`} external />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="h-4" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ContactRow({
  icon, value, color, href, external,
}: { icon: React.ReactNode; value: string; color: string; href?: string; external?: boolean }) {
  const inner = (
    <div className="flex items-start gap-2 text-xs text-gray-500">
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
