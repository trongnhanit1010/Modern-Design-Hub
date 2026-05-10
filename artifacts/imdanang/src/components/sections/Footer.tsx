import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram } from "lucide-react";

const footerLinks = {
  "Điểm đến": ["Hotels", "Địa điểm tham quan", "Restaurants", "Sự kiện - Lễ hội"],
  "Khám phá": ["Tourist Map", "Search", "AI Trợ lý", "Lịch sự kiện"],
};

export default function Footer() {
  return (
    <footer className="bg-[hsl(220_40%_10%)] text-white/70 pt-14 pb-6" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center">
                <span className="text-white text-sm font-bold">i</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                im<span className="text-blue-400">danang</span>
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-5 max-w-xs">
              Da Nang city tourism information portal. Discover the endless beauty of Central Vietnam.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors" data-testid="link-facebook">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-colors" data-testid="link-youtube">
                <Youtube size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-colors" data-testid="link-instagram">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/50 hover:text-white transition-colors hover:pl-1 inline-block"
                      data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z-]/g, "")}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Liên hệ</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 shrink-0 text-blue-400" />
                <span className="text-sm text-white/50">Da Nang Department of Tourism</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="shrink-0 text-blue-400" />
                <span className="text-sm text-white/50">+84 (0)236.3550.111</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="shrink-0 text-blue-400" />
                <span className="text-sm text-white/50">cms@imdanang.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © 2026 imdanang — Da Nang Tourism Information Portal. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Chính sách bảo mật</a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
