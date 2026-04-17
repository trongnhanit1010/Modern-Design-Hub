import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 420);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 18, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.85 }}
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 360, damping: 24 }}
          className="group fixed bottom-24 right-5 md:bottom-7 md:right-7 z-50 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-amber-300/45 bg-white/85 text-amber-600 shadow-xl shadow-amber-900/10 backdrop-blur-xl transition-colors duration-300 hover:border-amber-400/70 hover:bg-amber-50/95 hover:text-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300/30 dark:border-amber-300/25 dark:bg-slate-950/70 dark:text-amber-300 dark:shadow-black/30 dark:hover:bg-slate-900/85"
          aria-label="Quay lại đầu trang"
          data-testid="button-back-to-top"
        >
          <span className="absolute inset-1 rounded-full bg-gradient-to-br from-amber-100/70 via-white/35 to-transparent opacity-80 dark:from-amber-300/10 dark:via-white/5" />
          <span className="absolute bottom-2 h-1 w-5 rounded-full bg-amber-400/25 blur-sm transition-opacity duration-300 group-hover:opacity-80" />
          <ArrowUp className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={2.4} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}