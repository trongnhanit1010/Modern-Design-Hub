import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Hotel, MapPin, UtensilsCrossed, Bus, CalendarDays, ShoppingBag, LayoutGrid, X } from "lucide-react";

const categories = [
  { icon: Hotel, label: "Hotels", color: "from-blue-500 to-blue-700", lightColor: "bg-blue-50 text-blue-600 border-blue-100", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&auto=format&fit=crop" },
  { icon: MapPin, label: "Địa điểm tham quan", color: "from-emerald-500 to-teal-700", lightColor: "bg-emerald-50 text-emerald-600 border-emerald-100", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&auto=format&fit=crop" },
  { icon: UtensilsCrossed, label: "Restaurants", color: "from-orange-500 to-red-600", lightColor: "bg-orange-50 text-orange-600 border-orange-100", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop" },
  { icon: Bus, label: "Giao thông / Di chuyển", color: "from-violet-500 to-purple-700", lightColor: "bg-violet-50 text-violet-600 border-violet-100", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop" },
  { icon: CalendarDays, label: "Sự kiện - Lễ hội", color: "from-pink-500 to-rose-700", lightColor: "bg-pink-50 text-pink-600 border-pink-100", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&auto=format&fit=crop" },
  { icon: ShoppingBag, label: "Mua sắm", color: "from-amber-500 to-yellow-600", lightColor: "bg-amber-50 text-amber-600 border-amber-100", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop" },
  { icon: LayoutGrid, label: "Tất cả", color: "from-slate-600 to-slate-800", lightColor: "bg-slate-50 text-slate-600 border-slate-100", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&auto=format&fit=crop" },
];

const allCategories = [
  ...categories,
  { icon: Hotel, label: "Spa & Wellness", color: "from-teal-500 to-cyan-700", lightColor: "bg-teal-50 text-teal-600 border-teal-100", img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&auto=format&fit=crop" },
  { icon: MapPin, label: "Bãi biển", color: "from-sky-500 to-blue-700", lightColor: "bg-sky-50 text-sky-600 border-sky-100", img: "https://images.unsplash.com/photo-1591017403997-bdf27de5700a?w=400&auto=format&fit=crop" },
  { icon: UtensilsCrossed, label: "Cafe & Bakery", color: "from-brown-500 to-amber-700", lightColor: "bg-amber-50 text-amber-700 border-amber-100", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop" },
  { icon: Bus, label: "Tour du lịch", color: "from-indigo-500 to-blue-700", lightColor: "bg-indigo-50 text-indigo-600 border-indigo-100", img: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop" },
  { icon: CalendarDays, label: "Vui chơi giải trí", color: "from-lime-500 to-green-600", lightColor: "bg-lime-50 text-lime-600 border-lime-100", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&auto=format&fit=crop" },
];

export default function CategoriesSection() {
  const [option, setOption] = useState<"A" | "B">("A");
  const [showAll, setShowAll] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 px-4 bg-white" ref={ref} data-testid="section-categories">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Danh mục</h2>
            <p className="text-muted-foreground text-sm mt-1">Khám phá theo loại hình</p>
          </div>
          <div className="flex items-center gap-2 bg-muted rounded-full p-1">
            <button
              onClick={() => setOption("A")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "A" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              data-testid="button-categories-option-a"
            >
              Icons
            </button>
            <button
              onClick={() => setOption("B")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "B" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              data-testid="button-categories-option-b"
            >
              Images
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {option === "A" ? (
            <motion.div
              key="A"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-4 md:grid-cols-7 gap-3"
            >
              {categories.map((cat, i) => (
                <motion.button
                  key={cat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl group"
                  data-testid={`button-category-${i}`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-md transition-shadow group-hover:shadow-lg`}>
                    <cat.icon size={22} className="text-white" />
                  </div>
                  <span className="text-xs text-center text-foreground font-medium leading-tight">{cat.label}</span>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="B"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {categories.map((cat, i) => (
                  <motion.button
                    key={cat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    whileHover={{ scale: 1.04, y: -3 }}
                    className="relative group h-28 rounded-2xl overflow-hidden shadow-sm"
                    data-testid={`button-category-img-${i}`}
                  >
                    <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-70`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2">
                      <cat.icon size={20} className="text-white drop-shadow" />
                      <span className="text-white text-xs font-semibold text-center leading-tight drop-shadow">{cat.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowAll(true)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-md"
                  data-testid="button-view-all-categories"
                >
                  <LayoutGrid size={16} />
                  Xem tất cả danh mục
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={(e) => { if (e.target === e.currentTarget) setShowAll(false); }}
              data-testid="modal-all-categories"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-xl font-bold">Tất cả danh mục</h3>
                  <button
                    onClick={() => setShowAll(false)}
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                    data-testid="button-close-categories-modal"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {allCategories.map((cat, i) => (
                    <motion.button
                      key={`${cat.label}-${i}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04 }}
                      whileHover={{ scale: 1.04 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted transition-colors"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                        <cat.icon size={20} className="text-white" />
                      </div>
                      <span className="text-xs text-center font-medium">{cat.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
