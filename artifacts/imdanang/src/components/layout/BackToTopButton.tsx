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
          whileHover={{ y: -4, scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 360, damping: 24 }}
          className="group fixed bottom-24 right-5 md:bottom-7 md:right-7 z-50 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-500 text-white shadow-2xl shadow-sky-500/30 ring-1 ring-white/30 backdrop-blur focus:outline-none focus:ring-4 focus:ring-sky-300/50"
          aria-label="Quay lại đầu trang"
          data-testid="button-back-to-top"
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_32%)] opacity-90" />
          <span className="absolute inset-x-2 bottom-1 h-px bg-white/40" />
          <ArrowUp className="relative z-10 h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1" strokeWidth={2.6} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}