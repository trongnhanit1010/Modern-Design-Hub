import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User, Sparkles, MapPin, Utensils, Hotel, CalendarDays, RefreshCw, X } from "lucide-react";

type Message = { role: "user" | "bot"; text: string; time: string };

const suggestions = [
  { icon: MapPin, text: "Những địa điểm đẹp nhất ở Đà Nẵng?" },
  { icon: Hotel, text: "Khách sạn nào view biển tốt nhất?" },
  { icon: Utensils, text: "Nên ăn gì khi đến Đà Nẵng?" },
  { icon: CalendarDays, text: "Khi nào là mùa đẹp nhất để đến?" },
];

const botReplies: Record<string, string> = {
  "Những địa điểm đẹp nhất ở Đà Nẵng?": "Đà Nẵng có rất nhiều điểm đến tuyệt vời! Top 5 không thể bỏ qua:\n\n1. 🏖️ **Bãi biển Mỹ Khê** – Một trong 6 bãi biển quyến rũ nhất hành tinh\n2. 🌉 **Cầu Vàng / Bà Nà Hills** – Biểu tượng du lịch Đà Nẵng\n3. 🏯 **Ngũ Hành Sơn** – Quần thể núi đá cẩm thạch huyền bí\n4. 🏮 **Phố Cổ Hội An** – Di sản UNESCO chỉ 30 phút lái xe\n5. 🌊 **Đèo Hải Vân** – Con đèo đẹp nhất Việt Nam\n\nBạn muốn tìm hiểu chi tiết về điểm nào?",
  "Khách sạn nào view biển tốt nhất?": "Dưới đây là top khách sạn view biển đẹp nhất Đà Nẵng:\n\n🥇 **Furama Resort** – 5 sao, bãi biển riêng, giá từ 5.8M/đêm\n🥈 **Crowne Plaza** – 5 sao, pool vô cực nhìn ra biển, từ 3.2M/đêm\n🥉 **Pullman Beach Resort** – 5 sao sang trọng, từ 3.9M/đêm\n\n💡 *Mẹo:* Đặt phòng trước ít nhất 2 tuần để có giá tốt nhất, đặc biệt mùa hè từ tháng 5–8.",
  "Nên ăn gì khi đến Đà Nẵng?": "Đà Nẵng là thiên đường ẩm thực! Nhất định phải thử:\n\n🦐 **Mỳ Quảng** – Đặc sản nổi tiếng nhất miền Trung\n🥘 **Bún chả cá** – Súp cá sấu tươi đậm đà\n🦀 **Hải sản Mỹ Khê** – Tôm hùm, cua, ốc tươi sống\n🥗 **Bánh tráng cuốn thịt heo** – Món cuốn truyền thống\n🍞 **Bánh mì Đà Nẵng** – Phong cách riêng biệt\n\n📍 Chợ Cồn và khu vực Bãi biển Mỹ Khê là thiên đường ẩm thực giá tốt nhất!",
  "Khi nào là mùa đẹp nhất để đến?": "Đà Nẵng đẹp quanh năm, nhưng lý tưởng nhất là:\n\n☀️ **Tháng 3–8**: Thời tiết nắng đẹp, biển êm – mùa cao điểm du lịch. Tháng 6–7 có **Lễ hội Pháo hoa quốc tế** đặc sắc!\n\n🌧️ **Tháng 9–12**: Mùa mưa, ít khách, giá thấp hơn 30–40%. Vẫn có thể thăm quan nội thành và Hội An.\n\n🎯 **Thời điểm vàng**: Tháng 3–5 – thời tiết mát mẻ, ít mưa, biển đẹp và ít đông đúc hơn mùa hè.",
};

function getTime() {
  return new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

const initMessages: Message[] = [
  { role: "bot", text: "Xin chào! Tôi là **AI Trợ lý Du lịch Đà Nẵng** 🌊\n\nTôi có thể giúp bạn:\n• Tìm địa điểm tham quan và lịch trình\n• Gợi ý nhà hàng và ẩm thực\n• Tìm khách sạn phù hợp ngân sách\n• Thông tin thời tiết và mùa du lịch\n\nHãy đặt câu hỏi hoặc chọn gợi ý bên dưới!", time: getTime() },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text, time: getTime() };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const reply = botReplies[text] || "Cảm ơn câu hỏi của bạn! Đà Nẵng là điểm đến tuyệt vời với rất nhiều trải nghiệm thú vị. Bạn có thể hỏi tôi về địa điểm tham quan, ẩm thực, khách sạn hay lịch trình du lịch nhé! 😊";
      setMessages((p) => [...p, { role: "bot", text: reply, time: getTime() }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 600);
  };

  const renderText = (text: string) =>
    text.split("\n").map((line, i) => (
      <span key={i}>
        {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="font-semibold text-white">{part}</strong> : part
        )}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ));

  return (
    <div className="h-screen bg-gray-950 flex flex-col overflow-hidden">
      <div className="shrink-0 bg-gray-900 border-b border-white/10 px-5 py-3.5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg">
          <Bot size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-white font-bold text-base">AI Trợ Lý Du Lịch</h1>
          <div className="flex items-center gap-1.5 text-xs text-green-400"><div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Đang hoạt động · Đà Nẵng Expert</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <motion.button whileHover={{ rotate: 180 }} transition={{ duration: 0.4 }} onClick={() => setMessages(initMessages)} className="p-2 hover:bg-white/8 rounded-xl transition-colors text-white/40 hover:text-white">
            <RefreshCw size={16} />
          </motion.button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${msg.role === "bot" ? "bg-gradient-to-br from-blue-500 to-violet-600" : "bg-gray-700"}`}>
                {msg.role === "bot" ? <Bot size={16} className="text-white" /> : <User size={16} className="text-white" />}
              </div>
              <div className={`max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "bot" ? "bg-gray-800 text-white/80 rounded-tl-sm" : "bg-blue-500 text-white rounded-tr-sm"}`}>
                  {renderText(msg.text)}
                </div>
                <span className="text-white/25 text-xs px-1">{msg.time}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {messages.length <= 1 && (
        <div className="shrink-0 px-4 pb-2">
          <p className="text-white/30 text-xs mb-2 flex items-center gap-1.5"><Sparkles size={11} />Gợi ý câu hỏi</p>
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map((s, i) => (
              <motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => sendMessage(s.text)} className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-white/8 hover:border-blue-500/40 text-white/60 hover:text-white text-xs text-left px-3 py-2.5 rounded-xl transition-all" data-testid={`suggestion-${i}`}>
                <s.icon size={13} className="text-blue-400 shrink-0" />{s.text}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <div className="shrink-0 bg-gray-900 border-t border-white/10 px-4 py-3">
        <div className="flex items-end gap-2 bg-gray-800 rounded-2xl border border-white/10 px-4 py-2.5">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder="Hỏi về địa điểm, ẩm thực, khách sạn..."
            rows={1}
            className="flex-1 bg-transparent text-white text-sm placeholder:text-gray-500 focus:outline-none resize-none leading-5 max-h-24"
            data-testid="ai-input"
          />
          {input && (
            <button onClick={() => setInput("")} className="text-white/30 hover:text-white/60 transition-colors"><X size={14} /></button>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="shrink-0 w-8 h-8 bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-xl flex items-center justify-center transition-colors"
            data-testid="ai-send"
          >
            <Send size={14} />
          </motion.button>
        </div>
        <p className="text-white/20 text-xs text-center mt-2">AI phản hồi dựa trên dữ liệu du lịch Đà Nẵng · Demo</p>
      </div>
    </div>
  );
}
