import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Utensils, Hotel, Waves, Mountain,
  RefreshCw, ChevronRight, Mic, Plane, CreditCard, Sun, Zap,
  Heart, Brain, X,
} from "lucide-react";
import { useDarkMode } from "@/context/DarkModeContext";

type Message = { role: "user" | "bot"; text: string; time: string };

const features = [
  { icon: Brain, label: "Thông minh", color: "#a855f7" },
  { icon: Zap, label: "Nhanh chóng", color: "#eab308" },
  { icon: Heart, label: "Đáng yêu", color: "#fb7185" },
  { icon: Heart, label: "Tận tâm", color: "#f43f5e" },
];

const categories = [
  { icon: Utensils, label: "Ẩm thực", sub: "Món ngon phải thử", color: "#f97316", bg: "linear-gradient(135deg,#f97316,#ef4444)" },
  { icon: Waves, label: "Bãi biển", sub: "Biển xanh cát trắng", color: "#0ea5e9", bg: "linear-gradient(135deg,#0ea5e9,#06b6d4)" },
  { icon: Hotel, label: "Lưu trú", sub: "Khách sạn & Resort", color: "#6366f1", bg: "linear-gradient(135deg,#6366f1,#8b5cf6)" },
  { icon: Mountain, label: "Tham quan", sub: "Điểm đến nổi bật", color: "#10b981", bg: "linear-gradient(135deg,#10b981,#059669)" },
];

const faqs = [
  { icon: Plane, q: "Đi từ sân bay về trung tâm bao nhiêu?", msg: "Đi từ sân bay về trung tâm bao nhiêu?" },
  { icon: CreditCard, q: "Đổi tiền hoặc mua SIM ở đâu?", msg: "Đổi tiền hoặc mua SIM ở đâu?" },
  { icon: Utensils, q: "Đặc sản Đà Nẵng phải thử là gì?", msg: "Nên ăn gì khi đến Đà Nẵng?" },
  { icon: Sun, q: "Thời điểm đẹp nhất đến Đà Nẵng?", msg: "Khi nào là mùa đẹp nhất để đến?" },
];

const categoryMessages: Record<string, string> = {
  "Ẩm thực": "Nên ăn gì khi đến Đà Nẵng?",
  "Bãi biển": "Những bãi biển đẹp nhất ở Đà Nẵng?",
  "Lưu trú": "Khách sạn nào view biển tốt nhất?",
  "Tham quan": "Những địa điểm đẹp nhất ở Đà Nẵng?",
};

const botReplies: Record<string, string> = {
  "Những địa điểm đẹp nhất ở Đà Nẵng?": "Đà Nẵng có rất nhiều điểm đến tuyệt vời! Top 5 không thể bỏ qua:\n\n1. **Bãi biển Mỹ Khê** – Một trong 6 bãi biển quyến rũ nhất hành tinh\n2. **Cầu Vàng / Bà Nà Hills** – Biểu tượng du lịch Đà Nẵng\n3. **Ngũ Hành Sơn** – Quần thể núi đá cẩm thạch huyền bí\n4. **Phố Cổ Hội An** – Di sản UNESCO chỉ 30 phút lái xe\n5. **Đèo Hải Vân** – Con đèo đẹp nhất Việt Nam",
  "Những bãi biển đẹp nhất ở Đà Nẵng?": "Đà Nẵng nổi tiếng với những bãi biển tuyệt đẹp:\n\n**Mỹ Khê** – Bãi biển sạch đẹp nổi tiếng thế giới\n**Non Nước** – Gần Ngũ Hành Sơn, ít đông hơn\n**Mân Thái** – Bãi biển yên tĩnh dành cho gia đình\n**Xuân Thiều** – Bãi biển hoang sơ, ít du khách",
  "Khách sạn nào view biển tốt nhất?": "Top khách sạn view biển đẹp nhất Đà Nẵng:\n\n**Furama Resort** – 5 sao, bãi biển riêng, từ 5.8M/đêm\n**Crowne Plaza** – 5 sao, pool vô cực nhìn ra biển, từ 3.2M/đêm\n**Pullman Beach Resort** – 5 sao sang trọng, từ 3.9M/đêm",
  "Nên ăn gì khi đến Đà Nẵng?": "Đà Nẵng là thiên đường ẩm thực! Nhất định phải thử:\n\n**Mỳ Quảng** – Đặc sản nổi tiếng nhất miền Trung\n**Bún chả cá** – Súp cá sấu tươi đậm đà\n**Hải sản Mỹ Khê** – Tôm hùm, cua, ốc tươi sống\n**Bánh tráng cuốn thịt heo** – Món cuốn truyền thống",
  "Khi nào là mùa đẹp nhất để đến?": "Thời điểm lý tưởng để du lịch Đà Nẵng:\n\n**Tháng 3–8**: Nắng đẹp, biển êm – mùa cao điểm\n**Tháng 6–7**: Lễ hội Pháo hoa quốc tế đặc sắc!\n**Tháng 3–5**: Thời điểm vàng – mát mẻ, ít mưa, đẹp nhất",
  "Đi từ sân bay về trung tâm bao nhiêu?": "Từ sân bay Đà Nẵng về trung tâm có nhiều lựa chọn:\n\n**Grab/Be** – 60–100k, 20–30 phút, tiện nhất\n**Taxi** – 80–120k, đặt tại bến taxi sân bay\n**Xe buýt số 6** – 7k/người, chạy đến bến xe Trung tâm\n**Xe ôm** – Khoảng 50–70k\n\nMẹo: Dùng Grab để tránh bị chặt chém.",
  "Đổi tiền hoặc mua SIM ở đâu?": "Đổi tiền và mua SIM ở Đà Nẵng:\n\n**Đổi tiền**: Vietcombank, Agribank, chợ Cồn có tỷ giá tốt. Tránh đổi ở khách sạn!\n\n**Mua SIM**: Ngay tại sân bay có cửa hàng Viettel, Mobifone, Vinaphone. Gói SIM du lịch 7 ngày từ 100k–150k, data 5–10GB.",
};

function getTime() {
  return new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

const initMessages: Message[] = [
  {
    role: "bot",
    text: "Xin chào! Tôi là **DaNa** – Trợ lý AI du lịch của bạn tại Đà Nẵng.\n\nTôi có thể giúp bạn tìm địa điểm, gợi ý ẩm thực, khách sạn và lên lịch trình du lịch. Hỏi tôi bất cứ điều gì!",
    time: getTime(),
  },
];

function DaNaMascot() {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const fire = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 130);
      setTimeout(fire, 2600 + Math.random() * 2000);
    };
    const t = setTimeout(fire, 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center relative"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Antennae */}
      <div className="flex gap-6 mb-[-4px] relative z-10">
        {["-8px", "8px"].map((x, i) => (
          <div key={i} className="flex flex-col items-center" style={{ transform: `rotate(${i === 0 ? "-15deg" : "15deg"})` }}>
            <motion.div
              className="w-3.5 h-3.5 rounded-full"
              style={{ background: "linear-gradient(135deg,#fbbf24,#f59e0b)", boxShadow: "0 0 8px rgba(251,191,36,0.7)" }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
            />
            <div className="w-[3px] h-5 rounded-full" style={{ background: "linear-gradient(to bottom, #f59e0b, #4f46e5)" }} />
          </div>
        ))}
      </div>

      {/* Head */}
      <div
        className="relative w-16 h-16 rounded-full flex flex-col items-center justify-center gap-1.5"
        style={{
          background: "linear-gradient(145deg, #4f46e5 0%, #3b82f6 50%, #0ea5e9 100%)",
          boxShadow: "0 8px 32px rgba(79,70,229,0.5), 0 2px 8px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.2)",
        }}
      >
        {/* Eyes */}
        <div className="flex gap-3 mt-1">
          {[0, 1].map((i) => (
            <div key={i} className="relative">
              <div
                className={`bg-white rounded-full transition-all duration-100 ${blink ? "w-3 h-[3px]" : "w-3 h-3"}`}
                style={{ boxShadow: blink ? "none" : "0 0 8px rgba(255,255,255,0.8)" }}
              />
              {!blink && (
                <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
              )}
            </div>
          ))}
        </div>

        {/* Smile */}
        <div className="flex gap-[3px] items-end mb-0.5">
          {[2, 1, 0, 1, 2].map((d, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-white/60" style={{ marginTop: `${d}px` }} />
          ))}
        </div>

        {/* Gloss */}
        <div className="absolute top-2.5 left-4 w-8 h-3 rounded-full bg-white/20 blur-sm" />
      </div>

      {/* Shadow */}
      <motion.div
        className="w-12 h-1.5 rounded-full mt-2"
        style={{ background: "radial-gradient(ellipse, rgba(79,70,229,0.25) 0%, transparent 70%)" }}
        animate={{ scaleX: [1, 0.75, 1], opacity: [0.7, 0.3, 0.7] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function SmallDaNa() {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
      style={{ background: "linear-gradient(135deg,#4f46e5,#0ea5e9)", boxShadow: "0 2px 8px rgba(79,70,229,0.4)" }}
    >
      <span className="text-white text-xs font-bold">DN</span>
    </div>
  );
}

export default function AIAssistant() {
  const { isDark } = useDarkMode();
  const [messages, setMessages] = useState<Message[]>(initMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isWelcome = messages.length <= 1;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((p) => [...p, { role: "user", text, time: getTime() }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const reply =
        botReplies[text] ??
        "Cảm ơn câu hỏi của bạn! Đà Nẵng là điểm đến tuyệt vời với biển đẹp, ẩm thực phong phú và nhiều điểm tham quan hấp dẫn. Bạn có thể hỏi tôi chi tiết hơn về địa điểm, ẩm thực hoặc khách sạn nhé!";
      setMessages((p) => [...p, { role: "bot", text: reply, time: getTime() }]);
      setIsTyping(false);
    }, 1100 + Math.random() * 700);
  };

  const renderText = (text: string) =>
    text.split("\n").map((line, i, arr) => (
      <span key={i}>
        {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="font-semibold">{part}</strong> : part
        )}
        {i < arr.length - 1 && <br />}
      </span>
    ));

  const bg = isDark ? "bg-[#080d1a]" : "bg-[#f0f4f8]";
  const card = isDark ? "bg-white/8 border border-white/10" : "bg-white border border-slate-100 shadow-sm";
  const txPrimary = isDark ? "text-white" : "text-slate-900";
  const txSub = isDark ? "text-white/40" : "text-slate-400";
  const txMid = isDark ? "text-white/65" : "text-slate-600";
  const botBubble = isDark ? "bg-white/8 border border-white/10 text-white/90" : "bg-white border border-slate-200 text-slate-700 shadow-sm";

  return (
    <div className={`h-[calc(100vh-56px)] flex flex-col overflow-hidden ${bg}`} data-testid="page-ai-assistant">

      {/* ── Body ── */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">

          {/* ── Welcome state ── */}
          {isWelcome ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1 overflow-hidden px-5 py-4 flex flex-col items-center text-center"
            >
              {/* Mascot */}
              <DaNaMascot />

              {/* Title */}
              <div className="mt-3 mb-3">
                <h1 className={`text-xl md:text-2xl font-bold tracking-tight ${txPrimary}`}>
                  Xin chào! Tôi là{" "}
                  <span style={{ background: "linear-gradient(135deg,#f97316,#eab308)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    DaNa
                  </span>
                </h1>
                <p className={`text-xs md:text-sm mt-1 ${txMid}`}>Trợ lý AI du lịch thông minh của bạn tại Đà Nẵng</p>
              </div>

              {/* Feature pills */}
              <div className="flex items-center gap-3 flex-wrap justify-center mb-3">
                {features.map((f) => (
                  <div key={f.label} className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${f.color}18` }}>
                      <f.icon size={15} style={{ color: f.color }} />
                    </div>
                    <span className={`text-[10px] font-medium ${txMid}`}>{f.label}</span>
                  </div>
                ))}
              </div>

              {/* Category cards */}
              <div className="grid grid-cols-4 gap-2.5 w-full max-w-[760px] mb-4">
                {categories.map((c) => (
                  <motion.button
                    key={c.label}
                    whileHover={{ y: -4, scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => sendMessage(categoryMessages[c.label] || c.label)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl ${card} transition-all`}
                    data-testid={`button-ai-cat-${c.label}`}
                  >
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center"
                      style={{ background: c.bg, boxShadow: `0 4px 12px ${c.color}35` }}
                    >
                      <c.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className={`text-xs font-semibold leading-tight ${txPrimary}`}>{c.label}</p>
                      <p className={`text-[10px] leading-snug mt-0.5 ${txSub}`}>{c.sub}</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* FAQ */}
              <div className="w-full max-w-[920px]">
                <div className={`flex items-center gap-2 mb-2 ${txSub}`}>
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                    <span className="text-white text-[8px] font-bold">?</span>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider">Câu hỏi thường gặp</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5">
                  {faqs.map((faq) => (
                    <motion.button
                      key={faq.q}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => sendMessage(faq.msg)}
                      className={`flex items-center gap-2 p-3 rounded-2xl text-left transition-all ${card} hover:border-blue-200`}
                      data-testid={`button-ai-faq`}
                    >
                      <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                        <faq.icon size={13} className="text-slate-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium leading-snug whitespace-nowrap overflow-hidden text-ellipsis ${txMid}`}>{faq.q}</p>
                      </div>
                      <ChevronRight size={13} className={`shrink-0 ${txSub}`} />
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="h-2" />
            </motion.div>

          ) : (
            /* ── Chat state ── */
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
            >
              {/* Reset button */}
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setMessages(initMessages)}
                  className={`p-2 rounded-xl transition-colors ${isDark ? "text-white/30 hover:text-white/60 hover:bg-white/8" : "text-slate-400 hover:text-slate-600 hover:bg-white"}`}
                >
                  <RefreshCw size={15} />
                </motion.button>
              </div>

              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28 }}
                    className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {msg.role === "bot" && <SmallDaNa />}
                    {msg.role === "user" && (
                      <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: "linear-gradient(135deg,#64748b,#475569)" }}>U</div>
                    )}
                    <div className={`max-w-[78%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "bot" ? `${botBubble} rounded-tl-sm` : "bg-gradient-to-br from-indigo-500 to-sky-500 text-white rounded-tr-sm shadow-sm"}`}>
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
                    <SmallDaNa />
                    <div className={`px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm ${botBubble}`}>
                      {[0, 1, 2].map((j) => (
                        <motion.div key={j} className="w-2 h-2 rounded-full bg-indigo-400"
                          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.7, delay: j * 0.15, repeat: Infinity }} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Input bar ── */}
      <div className={`shrink-0 px-4 pt-2 pb-3 ${isDark ? "border-t border-white/8" : "border-t border-slate-200/60"}`}>
        <div className={`flex items-center gap-3 rounded-2xl px-5 py-3 shadow-md transition-colors ${isDark ? "bg-white/8 border border-white/10" : "bg-white border border-slate-200"}`}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") sendMessage(input); }}
            placeholder="Hỏi DaNa về địa điểm, ẩm thực, khách sạn..."
            className={`flex-1 bg-transparent text-sm focus:outline-none ${isDark ? "text-white placeholder:text-white/30" : "text-slate-800 placeholder:text-slate-400"}`}
            data-testid="input-ai-message"
          />
          {input && (
            <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={() => setInput("")}
              className={isDark ? "text-white/30 hover:text-white/60" : "text-slate-300 hover:text-slate-500"}>
              <X size={14} />
            </motion.button>
          )}
          <button className={`shrink-0 transition-colors ${isDark ? "text-white/30 hover:text-white/55" : "text-slate-400 hover:text-slate-600"}`}>
            <Mic size={18} />
          </button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-35 transition-all"
            style={input.trim()
              ? { background: "linear-gradient(135deg,#3b82f6,#6366f1)", boxShadow: "0 4px 14px rgba(99,102,241,0.45)" }
              : { background: isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0" }}
            data-testid="button-ai-send"
          >
            <Send size={15} className="text-white" />
          </motion.button>
        </div>
        <p className={`text-[10px] text-center mt-2 flex items-center justify-center gap-1 ${txSub}`}>
          <span className="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-400 to-sky-400 inline-flex items-center justify-center">
            <span className="text-white text-[6px] font-bold">D</span>
          </span>
          DaNa trả lời dựa trên dữ liệu du lịch Đà Nẵng – chỉ mang tính tham khảo.
        </p>
      </div>
    </div>
  );
}
