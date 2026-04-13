import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { Hotel, MapPin, UtensilsCrossed, Bus, CalendarDays, ShoppingBag, LayoutGrid, X, Coffee, Waves, Compass, Gamepad2 } from "lucide-react";

const categories = [
  { icon: Hotel, label: "Hotels", color: "from-blue-500 to-blue-700", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&auto=format&fit=crop" },
  { icon: MapPin, label: "Địa điểm tham quan", color: "from-emerald-500 to-teal-700", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&auto=format&fit=crop" },
  { icon: UtensilsCrossed, label: "Restaurants", color: "from-orange-500 to-red-600", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop" },
  { icon: Bus, label: "Giao thông / Di chuyển", color: "from-violet-500 to-purple-700", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop" },
  { icon: CalendarDays, label: "Sự kiện - Lễ hội", color: "from-pink-500 to-rose-700", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&auto=format&fit=crop" },
  { icon: ShoppingBag, label: "Mua sắm", color: "from-amber-500 to-yellow-600", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop" },
];

const allCategories = [
  ...categories,
  { icon: Waves, label: "Bãi biển", color: "from-sky-500 to-blue-700", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop" },
  { icon: Coffee, label: "Cafe & Bakery", color: "from-amber-700 to-amber-900", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop" },
  { icon: Hotel, label: "Spa & Wellness", color: "from-teal-500 to-cyan-700", img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&auto=format&fit=crop" },
  { icon: Compass, label: "Tour du lịch", color: "from-indigo-500 to-blue-700", img: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop" },
  { icon: Gamepad2, label: "Vui chơi giải trí", color: "from-lime-500 to-green-600", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&auto=format&fit=crop" },
  { icon: MapPin, label: "Bảo tàng", color: "from-slate-500 to-slate-700", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&auto=format&fit=crop" },
];

export default function CategoriesSection() {
  const [option, setOption] = useState<"A" | "B">("A");
  const [showAll, setShowAll] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 px-4 bg-white dark:bg-card" ref={ref} data-testid="section-categories">
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
              className="grid grid-cols-4 sm:grid-cols-7 gap-3"
            >
              {categories.map((cat, i) => (
                <motion.button
                  key={cat.label}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  whileHover={{ scale: 1.07, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-3 p-3 rounded-2xl group"
                  data-testid={`button-category-${i}`}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <cat.icon size={28} className="text-white drop-shadow" />
                  </div>
                  <span className="text-xs text-center text-foreground font-medium leading-tight">{cat.label}</span>
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, scale: 0.88 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: categories.length * 0.06, duration: 0.35 }}
                whileHover={{ scale: 1.07, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAll(true)}
                className="flex flex-col items-center gap-3 p-3 rounded-2xl group"
                data-testid="button-category-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <LayoutGrid size={28} className="text-white drop-shadow" />
                </div>
                <span className="text-xs text-center text-foreground font-medium leading-tight">Tất cả</span>
              </motion.button>
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
                    className="relative group h-32 rounded-2xl overflow-hidden shadow-sm"
                    data-testid={`button-category-img-${i}`}
                  >
                    <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-65`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-2">
                      <cat.icon size={22} className="text-white drop-shadow" />
                      <span className="text-white text-xs font-semibold text-center leading-tight drop-shadow">{cat.label}</span>
                    </div>
                  </motion.button>
                ))}

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: categories.length * 0.07, duration: 0.4 }}
                  whileHover={{ scale: 1.04, y: -3 }}
                  onClick={() => setShowAll(true)}
                  className="relative group h-32 rounded-2xl overflow-hidden shadow-sm bg-gradient-to-br from-slate-600 to-slate-900 flex flex-col items-center justify-center gap-1.5"
                  data-testid="button-category-img-all"
                >
                  <LayoutGrid size={22} className="text-white" />
                  <span className="text-white text-xs font-semibold">Tất cả</span>
                </motion.button>
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
                      className="flex flex-col items-center gap-2.5 p-4 rounded-2xl hover:bg-muted transition-colors"
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-md`}>
                        <cat.icon size={24} className="text-white" />
                      </div>
                      <span className="text-xs text-center font-medium leading-tight">{cat.label}</span>
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
