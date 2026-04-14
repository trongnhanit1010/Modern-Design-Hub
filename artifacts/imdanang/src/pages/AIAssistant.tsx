import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, MapPin, Utensils, Hotel, Waves,
  RefreshCw, X, ChevronRight, Mic, Sparkles,
} from "lucide-react";
import { useDarkMode } from "@/context/DarkModeContext";

type Message = { role: "user" | "bot"; text: string; time: string };

const categories = [
  { icon: Utensils, label: "Ẩm thực địa phương",    color: "#f97316" },
  { icon: Waves,    label: "Bãi biển & thiên nhiên", color: "#0ea5e9" },
  { icon: Hotel,    label: "Khách sạn & lưu trú",    color: "#8b5cf6" },
  { icon: MapPin,   label: "Tham quan & điểm đến",   color: "#10b981" },
];

const chips = [
  "Phố cổ Hội An có gì nổi bật?",
  "Ăn gì ngon ở Hội An?",
  "Thuê xe đạp tham quan phố cổ ở đâu?",
];

const botReplies: Record<string, string> = {
  "Những địa điểm đẹp nhất ở Đà Nẵng?": "Đà Nẵng có rất nhiều điểm đến tuyệt vời! Top 5 không thể bỏ qua:\n\n1. **Bãi biển Mỹ Khê** – Một trong 6 bãi biển quyến rũ nhất hành tinh\n2. **Cầu Vàng / Bà Nà Hills** – Biểu tượng du lịch Đà Nẵng\n3. **Ngũ Hành Sơn** – Quần thể núi đá cẩm thạch huyền bí\n4. **Phố Cổ Hội An** – Di sản UNESCO chỉ 30 phút lái xe\n5. **Đèo Hải Vân** – Con đèo đẹp nhất Việt Nam\n\nBạn muốn tìm hiểu chi tiết về điểm nào?",
  "Khách sạn nào view biển tốt nhất?": "Dưới đây là top khách sạn view biển đẹp nhất Đà Nẵng:\n\n**Furama Resort** – 5 sao, bãi biển riêng, giá từ 5.8M/đêm\n**Crowne Plaza** – 5 sao, pool vô cực nhìn ra biển, từ 3.2M/đêm\n**Pullman Beach Resort** – 5 sao sang trọng, từ 3.9M/đêm\n\nMẹo: Đặt phòng trước ít nhất 2 tuần để có giá tốt nhất, đặc biệt mùa hè từ tháng 5–8.",
  "Nên ăn gì khi đến Đà Nẵng?": "Đà Nẵng là thiên đường ẩm thực! Nhất định phải thử:\n\n**Mỳ Quảng** – Đặc sản nổi tiếng nhất miền Trung\n**Bún chả cá** – Súp cá sấu tươi đậm đà\n**Hải sản Mỹ Khê** – Tôm hùm, cua, ốc tươi sống\n**Bánh tráng cuốn thịt heo** – Món cuốn truyền thống\n\nChợ Cồn và khu vực Bãi biển Mỹ Khê là thiên đường ẩm thực giá tốt nhất!",
  "Khi nào là mùa đẹp nhất để đến?": "Đà Nẵng đẹp quanh năm, nhưng lý tưởng nhất là:\n\n**Tháng 3–8**: Thời tiết nắng đẹp, biển êm – mùa cao điểm du lịch. Tháng 6–7 có Lễ hội Pháo hoa quốc tế đặc sắc!\n\n**Tháng 9–12**: Mùa mưa, ít khách, giá thấp hơn 30–40%. Vẫn có thể thăm quan nội thành và Hội An.\n\n**Thời điểm vàng**: Tháng 3–5 – thời tiết mát mẻ, ít mưa, biển đẹp và ít đông đúc hơn mùa hè.",
};

function getTime() {
  return new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

const initMessages: Message[] = [
  { role: "bot", text: "Xin chào! Tôi là **Trợ lý Du lịch AI** của imdanang.\n\nTôi có thể giúp bạn:\n• Tìm địa điểm tham quan và lịch trình\n• Gợi ý nhà hàng và ẩm thực\n• Tìm khách sạn phù hợp ngân sách\n• Thông tin thời tiết và mùa du lịch\n\nHãy đặt câu hỏi hoặc chọn gợi ý bên dưới!", time: getTime() },
];

/* ─── Chatbot Mascot ──────────────────────────────────────────────── */
function ChatbotMascot({ size = "lg" }: { size?: "sm" | "lg" }) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const fire = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
      setTimeout(fire, 2800 + Math.random() * 2200);
    };
    const t = setTimeout(fire, 1500);
    return () => clearTimeout(t);
  }, []);

  if (size === "sm") {
    return (
      <div className="relative w-8 h-8 shrink-0 rounded-xl flex flex-col items-center justify-center gap-[3px]"
        style={{ background: "linear-gradient(135deg,#4f46e5 0%,#0ea5e9 100%)", boxShadow: "0 0 10px rgba(99,102,241,0.45)" }}>
        <div className="flex gap-[5px]">
          <div className={`w-[5px] bg-white rounded-sm transition-all duration-100 ${blink ? "h-[1px]" : "h-[5px]"}`} />
          <div className={`w-[5px] bg-white rounded-sm transition-all duration-100 ${blink ? "h-[1px]" : "h-[5px]"}`} />
        </div>
        <div className="flex gap-[2px]">
          {[2, 1, 0, 1, 2].map((d, i) => (
            <div key={i} className="w-[2px] h-[2px] rounded-full bg-white/55"
              style={{ marginTop: `${d}px` }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div className="flex flex-col items-center"
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>

      {/* Antenna */}
      <div className="flex flex-col items-center mb-0.5">
        <motion.div className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#a5b4fc", boxShadow: "0 0 10px #818cf8, 0 0 20px rgba(129,140,248,0.5)" }}
          animate={{ opacity: [1, 0.4, 1], scale: [1, 1.25, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }} />
        <div className="w-[2px] h-5" style={{ background: "linear-gradient(to bottom, #a5b4fc, #4f46e5)" }} />
      </div>

      {/* Head */}
      <div className="relative w-[72px] h-[72px] rounded-[22px] flex flex-col items-center justify-center gap-2.5"
        style={{ background: "linear-gradient(145deg,#4f46e5 0%,#2563eb 50%,#0ea5e9 100%)", boxShadow: "0 0 28px rgba(99,102,241,0.55), 0 0 56px rgba(14,165,233,0.25), inset 0 1px 1px rgba(255,255,255,0.18)" }}>

        {/* Ear left */}
        <div className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-[7px] h-8 rounded-l-full"
          style={{ background: "linear-gradient(180deg,#4f46e5,#0ea5e9)" }} />
        {/* Ear right */}
        <div className="absolute -right-[7px] top-1/2 -translate-y-1/2 w-[7px] h-8 rounded-r-full"
          style={{ background: "linear-gradient(180deg,#4f46e5,#0ea5e9)" }} />

        {/* Eyes */}
        <div className="flex gap-4">
          <div className={`w-3.5 bg-white rounded-sm transition-all duration-100 ${blink ? "h-[2px]" : "h-3.5"}`}
            style={{ boxShadow: blink ? "none" : "0 0 8px rgba(255,255,255,0.9), 0 0 14px rgba(165,180,252,0.6)" }} />
          <div className={`w-3.5 bg-white rounded-sm transition-all duration-100 ${blink ? "h-[2px]" : "h-3.5"}`}
            style={{ boxShadow: blink ? "none" : "0 0 8px rgba(255,255,255,0.9), 0 0 14px rgba(165,180,252,0.6)" }} />
        </div>

        {/* Mouth dots */}
        <div className="flex gap-[3px] items-end">
          {[3, 1, 0, 1, 3].map((d, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/55"
              style={{ marginTop: `${d}px` }} />
          ))}
        </div>

        {/* Gloss */}
        <div className="absolute top-2 left-3 w-8 h-3 rounded-full"
          style={{ background: "rgba(255,255,255,0.15)", filter: "blur(3px)" }} />
      </div>

      {/* Ground shadow */}
      <motion.div className="w-10 h-1.5 rounded-full mt-1.5"
        style={{ background: "radial-gradient(ellipse,rgba(99,102,241,0.3) 0%,transparent 70%)" }}
        animate={{ scaleX: [1, 0.75, 1], opacity: [0.7, 0.3, 0.7] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }} />
    </motion.div>
  );
}

/* ─── Small bot orb for topbar ───────────────────────────────────── */
function TopbarMascot() {
  return (
    <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center"
      style={{ background: "linear-gradient(135deg,#4f46e5,#0ea5e9)", boxShadow: "0 0 12px rgba(99,102,241,0.45)" }}>
      <Sparkles size={14} className="text-white" />
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────────────── */
export default function AIAssistant() {
  const { isDark } = useDarkMode();
  const [messages, setMessages] = useState<Message[]>(initMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isWelcome = messages.length <= 1;

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((p) => [...p, { role: "user", text, time: getTime() }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const reply = botReplies[text] ?? "Cảm ơn câu hỏi của bạn! Đà Nẵng là điểm đến tuyệt vời. Bạn có thể hỏi tôi về địa điểm tham quan, ẩm thực, khách sạn hay lịch trình du lịch nhé!";
      setMessages((p) => [...p, { role: "bot", text: reply, time: getTime() }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 600);
  };

  const renderText = (text: string) =>
    text.split("\n").map((line, i) => (
      <span key={i}>
        {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="font-semibold">{part}</strong> : part
        )}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ));

  const bg        = isDark ? "bg-[#080d1a]" : "bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30";
  const surface   = isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200/80";
  const botBubble = isDark ? "bg-white/8 border border-white/10 text-white/90" : "bg-white border border-slate-200 text-slate-700";
  const inputBg   = isDark ? "bg-white/6 border-white/10 focus-within:border-indigo-500/60" : "bg-white border-slate-200 focus-within:border-indigo-400/70";
  const txPrimary = isDark ? "text-white" : "text-slate-900";
  const txSub     = isDark ? "text-white/40" : "text-slate-400";
  const txMid     = isDark ? "text-white/65" : "text-slate-600";

  return (
    <div className={`h-[calc(100vh-56px)] flex flex-col overflow-hidden ${bg}`}>

      {/* ── Decorative blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {[...Array(5)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{
              width:  [200, 140, 180, 100, 150][i],
              height: [200, 140, 180, 100, 150][i],
              left:   `${[8, 68, 38, 82, 18][i]}%`,
              top:    `${[12, 8, 58, 38, 78][i]}%`,
              background: `radial-gradient(circle, ${isDark ? "rgba(99,102,241,0.07)" : "rgba(99,102,241,0.05)"} 0%, transparent 70%)`,
            }}
            animate={{ y: [0, -16, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 5 + i * 1.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
          />
        ))}
      </div>

      {/* ── Topbar ── */}
      <div className={`relative z-10 shrink-0 border-b px-5 py-2.5 flex items-center gap-3 ${isDark ? "border-white/8 bg-white/4 backdrop-blur" : "border-slate-200/70 bg-white/70 backdrop-blur"}`}>
        <TopbarMascot />
        <div>
          <h1 className={`font-bold text-sm ${txPrimary}`}>AI Trợ Lý Du Lịch</h1>
          <div className={`flex items-center gap-1.5 text-[11px] ${txSub}`}>
            <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            Đang hoạt động · Đà Nẵng Expert
          </div>
        </div>
        <motion.button whileHover={{ rotate: 180 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.4 }}
          onClick={() => setMessages(initMessages)}
          className={`ml-auto p-2 rounded-xl transition-colors ${isDark ? "hover:bg-white/8 text-white/30 hover:text-white/65" : "hover:bg-slate-100 text-slate-400 hover:text-slate-600"}`}>
          <RefreshCw size={15} />
        </motion.button>
      </div>

      {/* ── Body ── */}
      <div className="relative z-10 flex-1 overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">

          {/* ── Welcome state (no scroll) ── */}
          {isWelcome ? (
            <motion.div key="welcome"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4 overflow-hidden pb-2"
            >
              <ChatbotMascot size="lg" />

              <div>
                <h2 className={`text-xl font-bold tracking-tight ${txPrimary}`}>Ask anything about Da Nang</h2>
                <p className={`text-xs mt-1 ${txSub}`}>AI Travel Assistant</p>
                <div className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-[11px] font-medium ${isDark ? "bg-white/8 text-white/55" : "bg-slate-100 text-slate-500"}`}>
                  <MapPin size={9} /> Đà Nẵng &amp; Hội An
                </div>
              </div>

              {/* Category cards */}
              <div className="grid grid-cols-4 gap-2.5 w-full max-w-[520px]">
                {categories.map((c, i) => (
                  <motion.button key={i}
                    whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => sendMessage("Nên ăn gì khi đến Đà Nẵng?")}
                    className={`flex flex-col items-center gap-2 p-3.5 rounded-2xl border text-center transition-all ${surface} ${isDark ? "hover:bg-white/10" : "hover:bg-slate-50 hover:border-slate-300"} shadow-sm`}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${c.color}18` }}>
                      <c.icon size={17} style={{ color: c.color }} />
                    </div>
                    <span className={`text-[10px] font-medium leading-snug ${txMid}`}>{c.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Chips */}
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {chips.map((chip, i) => (
                  <motion.button key={i}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => sendMessage(chip)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all ${surface} ${isDark ? "text-white/55 hover:bg-white/10 hover:text-white/80" : "text-slate-500 hover:text-slate-700 hover:border-slate-300"}`}
                  >
                    {chip}
                    <ChevronRight size={10} className="opacity-50" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

          ) : (
            /* ── Chat state (scrollable inside) ── */
            <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}
                    className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {msg.role === "bot" && <ChatbotMascot size="sm" />}
                    {msg.role === "user" && (
                      <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: "linear-gradient(135deg,#64748b,#475569)" }}>U</div>
                    )}
                    <div className={`max-w-[76%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                      <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === "bot" ? `${botBubble} rounded-tl-sm` : "bg-gradient-to-br from-indigo-500 to-sky-500 text-white rounded-tr-sm"}`}>
                        {renderText(msg.text)}
                      </div>
                      <span className={`text-[10px] px-1 ${txSub}`}>{msg.time}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {isTyping && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-2.5">
                    <ChatbotMascot size="sm" />
                    <div className={`px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm ${botBubble}`}>
                      {[0, 1, 2].map((j) => (
                        <motion.div key={j} className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.7, delay: j * 0.16, repeat: Infinity }} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isTyping && messages[messages.length - 1]?.role === "bot" && messages.length <= 3 && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2 pl-10">
                  {chips.slice(0, 2).map((chip, i) => (
                    <motion.button key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => sendMessage(chip)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all ${surface} ${isDark ? "text-white/55 hover:text-white/80" : "text-slate-500 hover:text-slate-700 hover:border-slate-300"}`}>
                      {chip}
                    </motion.button>
                  ))}
                </motion.div>
              )}
              <div ref={bottomRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Input ── */}
      <div className={`relative z-10 shrink-0 px-4 py-3 ${isDark ? "border-t border-white/8" : "border-t border-slate-200/70"}`}>
        <div className={`flex items-end gap-2 border rounded-2xl px-4 py-2.5 transition-colors ${inputBg}`}>
          <ChevronRight size={13} className={`shrink-0 rotate-90 ${isDark ? "text-white/20" : "text-slate-300"}`} />
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder="Type your question..."
            rows={1}
            className={`flex-1 bg-transparent text-sm focus:outline-none resize-none leading-5 max-h-20 ${isDark ? "text-white placeholder:text-white/30" : "text-slate-800 placeholder:text-slate-400"}`}
          />
          {input && (
            <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={() => setInput("")}
              className={isDark ? "text-white/30 hover:text-white/60" : "text-slate-300 hover:text-slate-500"}>
              <X size={13} />
            </motion.button>
          )}
          <button className={`shrink-0 p-1 transition-colors ${isDark ? "text-white/25 hover:text-white/55" : "text-slate-300 hover:text-slate-500"}`}>
            <Mic size={15} />
          </button>
          <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
            onClick={() => sendMessage(input)} disabled={!input.trim()}
            className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all disabled:opacity-35"
            style={input.trim()
              ? { background: "linear-gradient(135deg,#4f46e5,#0ea5e9)", boxShadow: "0 0 14px rgba(99,102,241,0.5)" }
              : { background: isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0" }}>
            <Send size={13} className="text-white" />
          </motion.button>
        </div>
        <p className={`text-[10px] text-center mt-1.5 ${txSub}`}>
          AI trả lời dựa trên dữ liệu du lịch Đà Nẵng — chỉ mang tính tham khảo.
        </p>
      </div>
    </div>
  );
}
