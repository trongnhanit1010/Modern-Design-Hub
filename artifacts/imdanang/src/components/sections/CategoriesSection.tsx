import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { Hotel, Compass, UtensilsCrossed, Car, CalendarDays, Camera, ShoppingBag, LayoutGrid, X, Coffee, Waves, Gamepad2, MapPin } from "lucide-react";

const categories = [
  { icon: Hotel, label: "Khách sạn", count: "248", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&auto=format&fit=crop", color: "from-blue-500 to-blue-700" },
  { icon: Compass, label: "Tham quan", count: "134", img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&auto=format&fit=crop", color: "from-emerald-500 to-teal-700" },
  { icon: UtensilsCrossed, label: "Nhà hàng", count: "512", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop", color: "from-orange-500 to-red-600" },
  { icon: Car, label: "Di chuyển", count: "86", img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop", color: "from-violet-500 to-purple-700" },
  { icon: CalendarDays, label: "Sự kiện", count: "42", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&auto=format&fit=crop", color: "from-pink-500 to-rose-700" },
  { icon: Camera, label: "Check-in", count: "318", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop", color: "from-sky-500 to-blue-700" },
  { icon: ShoppingBag, label: "Mua sắm", count: "195", img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&auto=format&fit=crop", color: "from-amber-500 to-yellow-600" },
];

const allCategories = [
  ...categories,
  { icon: Waves, label: "Bãi biển", count: "67", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop", color: "from-cyan-500 to-blue-600" },
  { icon: Coffee, label: "Cafe & Bakery", count: "203", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop", color: "from-amber-700 to-amber-900" },
  { icon: Hotel, label: "Spa & Wellness", count: "89", img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&auto=format&fit=crop", color: "from-teal-500 to-cyan-700" },
  { icon: Gamepad2, label: "Vui chơi", count: "55", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&auto=format&fit=crop", color: "from-lime-500 to-green-600" },
  { icon: MapPin, label: "Bảo tàng", count: "28", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&auto=format&fit=crop", color: "from-slate-500 to-slate-700" },
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
              className="grid grid-cols-4 sm:grid-cols-8 gap-3"
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
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
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
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                      <cat.icon size={22} className="text-white drop-shadow" />
                      <span className="text-white text-[11px] font-semibold text-center leading-tight drop-shadow px-1">{cat.label}</span>
                      <span className="text-white/80 text-[10px] font-medium drop-shadow">{cat.count}</span>
                    </div>
                  </motion.button>
                ))}

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: categories.length * 0.07, duration: 0.4 }}
                  whileHover={{ scale: 1.04, y: -3 }}
                  onClick={() => setShowAll(true)}
                  className="relative group h-32 rounded-2xl overflow-hidden shadow-sm"
                  data-testid="button-category-img-all"
                >
                  <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&auto=format&fit=crop" alt="Tất cả" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/55" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                    <LayoutGrid size={22} className="text-white drop-shadow" />
                    <span className="text-white text-[11px] font-semibold drop-shadow">Tất cả</span>
                    <span className="text-white/80 text-[10px] font-medium drop-shadow">1.5k+</span>
                  </div>
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
                className="bg-white rounded-3xl p-6 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
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
                {option === "A" ? (
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
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {allCategories.map((cat, i) => (
                      <motion.button
                        key={`${cat.label}-img-${i}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        whileHover={{ scale: 1.03 }}
                        className="relative group h-28 rounded-2xl overflow-hidden shadow-sm"
                      >
                        <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                          <cat.icon size={20} className="text-white drop-shadow" />
                          <span className="text-white text-[11px] font-semibold text-center leading-tight px-1">{cat.label}</span>
                          <span className="text-white/80 text-[10px] font-medium drop-shadow">{cat.count}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
