import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sun, Cloud, CloudRain, Wind, Droplets, Eye, Thermometer, MapPin } from "lucide-react";

const weatherData = {
  city: "Đà Nẵng",
  country: "Việt Nam",
  temp: 32,
  feelsLike: 35,
  condition: "sunny" as "sunny" | "cloudy" | "rainy" | "partly-cloudy",
  conditionVi: "Nắng đẹp",
  humidity: 78,
  wind: 15,
  uvIndex: 7,
  visibility: 12,
  pressure: 1012,
  image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&auto=format&fit=crop",
  forecast: [
    { day: "T2", icon: Sun, high: 34, low: 26, condition: "Nắng", type: "sunny" as const },
    { day: "T3", icon: Cloud, high: 31, low: 25, condition: "Có mây", type: "cloudy" as const },
    { day: "T4", icon: CloudRain, high: 28, low: 23, condition: "Mưa nhẹ", type: "rainy" as const },
    { day: "T5", icon: Sun, high: 33, low: 26, condition: "Nắng", type: "sunny" as const },
    { day: "T6", icon: Sun, high: 35, low: 27, condition: "Nắng đẹp", type: "sunny" as const },
  ],
};

const locationsWeather = [
  { id: 1, name: "Hội An", temp: 30, condition: "Nắng nhẹ", type: "sunny" as const, icon: Sun, humidity: 72, wind: 12, image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop", gradient: "from-amber-500 to-orange-600" },
  { id: 2, name: "Đà Nẵng", temp: 32, condition: "Có mây rải rác", type: "partly-cloudy" as const, icon: Cloud, humidity: 78, wind: 15, image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop", gradient: "from-sky-500 to-blue-600" },
  { id: 3, name: "Bà Nà Hills", temp: 22, condition: "Mát mẻ, sương mù", type: "cloudy" as const, icon: Cloud, humidity: 90, wind: 20, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop", gradient: "from-slate-600 to-slate-800" },
  { id: 4, name: "Cù Lao Chàm", temp: 29, condition: "Nắng đẹp, sóng nhẹ", type: "sunny" as const, icon: Sun, humidity: 75, wind: 18, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop", gradient: "from-teal-500 to-cyan-600" },
];

const uvLabel = (uv: number) => {
  if (uv <= 2) return { label: "Thấp", color: "text-green-500" };
  if (uv <= 5) return { label: "Trung bình", color: "text-yellow-500" };
  if (uv <= 7) return { label: "Cao", color: "text-orange-500" };
  return { label: "Rất cao", color: "text-red-500" };
};

type WeatherType = "sunny" | "cloudy" | "rainy" | "partly-cloudy";

const weatherConfig: Record<WeatherType, { bg: string }> = {
  sunny: { bg: "linear-gradient(180deg, #0284c7 0%, #38bdf8 45%, #7dd3fc 75%, #fef9c3 100%)" },
  "partly-cloudy": { bg: "linear-gradient(180deg, #1e40af 0%, #3b82f6 45%, #93c5fd 100%)" },
  cloudy: { bg: "linear-gradient(180deg, #1f2937 0%, #374151 40%, #4b5563 75%, #6b7280 100%)" },
  rainy: { bg: "linear-gradient(180deg, #0c1a2e 0%, #1e3a5f 30%, #1e40af 70%, #1d4ed8 100%)" },
};

function SunFlare() {
  return (
    <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
      <div className="absolute" style={{ top: "6%", right: "12%", width: 220, height: 220 }}>
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle, #fff7c2 0%, #fde047 20%, #f59e0b 45%, #d97706 65%, transparent 100%)", filter: "blur(2px)" }}
        />
        <motion.div
          animate={{ scale: [1.15, 1.4, 1.15], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(253,224,71,0.7) 0%, transparent 70%)", filter: "blur(8px)" }}
        />
        <motion.div
          animate={{ scale: [1.6, 2.2, 1.6], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(253,224,71,0.5) 0%, transparent 70%)", filter: "blur(20px)" }}
        />
        {[...Array(16)].map((_, i) => {
          const angle = (i / 16) * 360;
          const len = i % 2 === 0 ? 90 : 55;
          return (
            <motion.div
              key={i}
              animate={{ opacity: [0.35, 0.75, 0.35], scaleY: [0.85, 1.1, 0.85] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 origin-bottom"
              style={{ width: 2.5, height: len, background: "linear-gradient(to top, rgba(253,224,71,0.9), transparent)", transform: `rotate(${angle}deg) translateX(-50%)`, transformOrigin: "50% 100%", borderRadius: 2 }}
            />
          );
        })}
        {[{ x: 60, y: -15, w: 180, h: 10, a: 22 }, { x: -30, y: 50, w: 120, h: 6, a: -15 }, { x: 80, y: 30, w: 80, h: 5, a: 10 }].map((f, i) => (
          <motion.div
            key={`flare-${i}`}
            animate={{ opacity: [0.3, 0.65, 0.3] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
            className="absolute"
            style={{ top: "50%", left: "50%", width: f.w, height: f.h, background: "linear-gradient(to right, transparent, rgba(255,255,240,0.85), transparent)", transform: `translate(${f.x}px, ${f.y}px) rotate(${f.a}deg)`, borderRadius: 4, filter: "blur(2px)" }}
          />
        ))}
      </div>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 88% 10%, rgba(253,224,71,0.18) 0%, transparent 55%)" }} />
    </div>
  );
}

function StormClouds() {
  const clouds = [
    { top: "2%", left: "-5%", w: 340, delay: 0, speed: 32 },
    { top: "0%", left: "30%", w: 280, delay: -10, speed: 42 },
    { top: "5%", left: "60%", w: 320, delay: -20, speed: 36 },
    { top: "14%", left: "10%", w: 220, delay: -5, speed: 48 },
    { top: "12%", left: "55%", w: 200, delay: -15, speed: 50 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {clouds.map((c, i) => (
        <motion.div key={i} className="absolute" style={{ top: c.top, left: c.left }} initial={{ x: 0 }} animate={{ x: [0, 20, 0] }} transition={{ duration: c.speed, repeat: Infinity, delay: c.delay, ease: "easeInOut" }}>
          <svg width={c.w} height={Math.round(c.w * 0.45)} viewBox="0 0 340 150" fill="none">
            <ellipse cx="170" cy="130" rx="165" ry="45" fill="#1f2937" fillOpacity="0.97" />
            <ellipse cx="100" cy="100" rx="80" ry="58" fill="#1f2937" fillOpacity="0.97" />
            <ellipse cx="220" cy="90" rx="75" ry="60" fill="#374151" fillOpacity="0.97" />
            <ellipse cx="160" cy="70" rx="65" ry="52" fill="#374151" />
            <ellipse cx="240" cy="105" rx="55" ry="42" fill="#1f2937" fillOpacity="0.9" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function FairClouds({ count = 2 }: { count?: number }) {
  const clouds = [
    { top: "8%", size: 1.3, speed: 35, delay: 0, from: "105%", to: "-25%" },
    { top: "18%", size: 0.95, speed: 50, delay: -18, from: "108%", to: "-20%" },
    { top: "4%", size: 0.75, speed: 62, delay: -30, from: "110%", to: "-18%" },
  ].slice(0, count);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {clouds.map((c, i) => (
        <motion.div key={i} className="absolute" style={{ top: c.top }} initial={{ x: c.from }} animate={{ x: c.to }} transition={{ duration: c.speed, repeat: Infinity, delay: c.delay, ease: "linear" }}>
          <svg width={160 * c.size} height={72 * c.size} viewBox="0 0 160 72" fill="none">
            <ellipse cx="80" cy="56" rx="72" ry="24" fill="white" fillOpacity="0.88" />
            <ellipse cx="52" cy="44" rx="36" ry="26" fill="white" fillOpacity="0.9" />
            <ellipse cx="105" cy="40" rx="30" ry="22" fill="white" fillOpacity="0.85" />
            <ellipse cx="78" cy="34" rx="26" ry="20" fill="white" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function FogDrift() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[{ top: "55%", opacity: 0.55, speed: 18 }, { top: "70%", opacity: 0.45, speed: 24 }, { top: "82%", opacity: 0.38, speed: 30 }].map((f, i) => (
        <motion.div key={i} className="absolute w-[200%]" style={{ top: f.top, height: "20%", background: "linear-gradient(to right, transparent, rgba(200,200,220,0.6), rgba(200,200,220,0.5), transparent)", opacity: f.opacity, filter: "blur(12px)" }} animate={{ x: ["-50%", "0%", "-50%"] }} transition={{ duration: f.speed, repeat: Infinity, ease: "easeInOut", delay: i * 2 }} />
      ))}
    </div>
  );
}

function HeavyRain() {
  const drops = Array.from({ length: 70 }, (_, i) => ({
    left: `${(i * 1.43) % 100}%`,
    delay: (i * 0.07) % 1.8,
    duration: 0.45 + (i % 5) * 0.08,
    height: 16 + (i % 8) * 2,
    width: i % 3 === 0 ? 2.5 : 1.5,
    opacity: 0.5 + (i % 4) * 0.1,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <StormClouds />
      {drops.map((d, i) => (
        <motion.div key={i} className="absolute rounded-full" style={{ left: d.left, height: d.height, width: d.width, top: "18%", background: `rgba(147,197,253,${d.opacity})`, transform: "rotate(10deg)" }} animate={{ y: ["0%", "580%"], opacity: [0, d.opacity, d.opacity, 0] }} transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: "linear" }} />
      ))}
      <motion.div animate={{ opacity: [0, 0, 0, 0.25, 0, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 2 }} className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 20%, rgba(200,220,255,0.6), transparent 60%)" }} />
    </div>
  );
}

function AnimatedWeatherBg({ type }: { type: WeatherType }) {
  const cfg = weatherConfig[type];
  return (
    <div className="absolute inset-0" style={{ background: cfg.bg }}>
      {type === "sunny" && <SunFlare />}
      {type === "partly-cloudy" && (
        <>
          <SunFlare />
          <FairClouds count={2} />
        </>
      )}
      {type === "cloudy" && (
        <>
          <StormClouds />
          <FogDrift />
        </>
      )}
      {type === "rainy" && <HeavyRain />}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}

function LocationWeatherCard({ loc, subMode, isInView, index }: { loc: typeof locationsWeather[0]; subMode: "color" | "image"; isInView: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer shadow-lg"
      data-testid={`card-weather-loc-${loc.id}`}
      style={{ minHeight: 200 }}
    >
      {subMode === "image" ? (
        <>
          <img src={loc.image} alt={loc.name} className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${loc.gradient}`} />
      )}
      <div className="relative z-10 p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5 mb-1"><MapPin size={12} className="text-white/60" /><span className="text-white/70 text-xs">{loc.name}, Việt Nam</span></div>
            <p className="text-white/80 text-sm">{loc.condition}</p>
          </div>
          <loc.icon size={32} className="text-yellow-300 drop-shadow" />
        </div>
        <div className="flex items-end gap-1 mt-2">
          <span className="text-white font-bold" style={{ fontSize: "3.5rem", lineHeight: 1 }}>{loc.temp}</span>
          <span className="text-white/70 text-2xl mb-2">°C</span>
        </div>
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/20">
          <div className="flex items-center gap-1 text-white/60 text-xs"><Droplets size={11} /><span>{loc.humidity}%</span></div>
          <div className="flex items-center gap-1 text-white/60 text-xs"><Wind size={11} /><span>{loc.wind} km/h</span></div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WeatherSection() {
  const [option, setOption] = useState<"A" | "B" | "C">("A");
  const [locSub, setLocSub] = useState<"color" | "image">("color");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const uv = uvLabel(weatherData.uvIndex);

  return (
    <section className="py-12 px-4 bg-background" ref={ref} data-testid="section-weather">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Thời tiết Đà Nẵng</h2>
            <p className="text-muted-foreground text-sm mt-1">Thông tin thời tiết cập nhật từ AccuWeather</p>
          </div>
          <div className="flex items-center gap-2 bg-muted rounded-full p-1">
            <button onClick={() => setOption("A")} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "A" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`} data-testid="button-weather-option-a">Icons</button>
            <button onClick={() => setOption("B")} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "B" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`} data-testid="button-weather-option-b">Image</button>
            <button onClick={() => setOption("C")} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "C" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`} data-testid="button-weather-option-c">4 Vùng</button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {option === "A" && (
            <motion.div key="A" initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }} className="rounded-3xl overflow-hidden shadow-xl">
              <div className="relative">
                <AnimatedWeatherBg type={weatherData.condition} />
                <div className="relative z-10 p-6 md:p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex items-start gap-6">
                      <motion.div animate={{ rotate: weatherData.condition === "sunny" ? [0, 15, 0, -15, 0] : [0, 5, 0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                        {weatherData.condition === "rainy" ? <CloudRain size={80} className="text-white drop-shadow-lg" /> : weatherData.condition === "cloudy" ? <Cloud size={80} className="text-white drop-shadow-lg" /> : <Sun size={80} className="text-yellow-300 drop-shadow-lg" />}
                      </motion.div>
                      <div>
                        <p className="text-white/70 text-sm font-medium mb-1">{weatherData.city}, {weatherData.country}</p>
                        <div className="flex items-start gap-1">
                          <span className="text-white font-bold" style={{ fontSize: "5rem", lineHeight: 1 }}>{weatherData.temp}</span>
                          <span className="text-white/80 text-2xl mt-4">°C</span>
                        </div>
                        <p className="text-white text-lg font-medium mt-1">{weatherData.conditionVi}</p>
                        <p className="text-white/60 text-sm mt-0.5">Cảm giác như {weatherData.feelsLike}°C</p>
                        <p className="text-white/40 text-xs mt-2">Powered by AccuWeather • Cập nhật lúc 14:30</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: Droplets, label: "Độ ẩm", value: `${weatherData.humidity}%`, color: "bg-white/15" },
                        { icon: Wind, label: "Gió", value: `${weatherData.wind} km/h`, color: "bg-white/15" },
                        { icon: Sun, label: "UV Index", value: `${weatherData.uvIndex} (${uv.label})`, color: "bg-white/15" },
                        { icon: Eye, label: "Tầm nhìn", value: `${weatherData.visibility} km`, color: "bg-white/15" },
                        { icon: Thermometer, label: "Áp suất", value: `${weatherData.pressure} hPa`, color: "bg-white/15" },
                        { icon: Cloud, label: "Điều kiện", value: weatherData.condition === "sunny" ? "Nắng đẹp" : "Có mây", color: "bg-white/15" },
                      ].map((stat, i) => (
                        <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.06 + 0.2, duration: 0.3 }} className={`${stat.color} backdrop-blur-sm rounded-2xl p-3 flex items-center gap-2`}>
                          <stat.icon size={16} className="text-white/80 shrink-0" />
                          <div><p className="text-white/60 text-xs">{stat.label}</p><p className="text-white text-sm font-semibold">{stat.value}</p></div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 pt-5 border-t border-white/20">
                    <p className="text-white/60 text-xs mb-3 uppercase tracking-wide font-medium">Dự báo 5 ngày</p>
                    <div className="grid grid-cols-5 gap-2">
                      {weatherData.forecast.map((day, i) => (
                        <motion.div key={day.day} initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 + 0.5, duration: 0.3 }} className="flex flex-col items-center gap-1 bg-white/15 backdrop-blur-sm rounded-xl p-2">
                          <span className="text-white/70 text-xs font-medium">{day.day}</span>
                          <day.icon size={20} className={day.type === "sunny" ? "text-yellow-300" : day.type === "rainy" ? "text-blue-200" : "text-white"} />
                          <span className="text-white text-sm font-bold">{day.high}°</span>
                          <span className="text-white/50 text-xs">{day.low}°</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {option === "B" && (
            <motion.div key="B" initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }} className="relative rounded-3xl overflow-hidden shadow-xl h-72">
              <img src={weatherData.image} alt="Weather background" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
              <div className="absolute inset-0 p-8 flex items-center gap-8">
                <div>
                  <p className="text-white/70 text-sm mb-2">{weatherData.city}, {weatherData.country}</p>
                  <div className="flex items-center gap-4">
                    <motion.div animate={{ rotate: [0, 10, 0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}>
                      <Sun size={64} className="text-yellow-300" />
                    </motion.div>
                    <div>
                      <span className="text-white font-bold" style={{ fontSize: "4rem", lineHeight: 1 }}>{weatherData.temp}°C</span>
                      <p className="text-white/80 text-lg mt-1">{weatherData.conditionVi}</p>
                    </div>
                  </div>
                  <p className="text-white/50 text-xs mt-3">Cảm giác như {weatherData.feelsLike}°C • Gió {weatherData.wind} km/h • Độ ẩm {weatherData.humidity}%</p>
                  <p className="text-white/40 text-xs mt-1">Powered by AccuWeather</p>
                </div>
                <div className="ml-auto grid grid-cols-3 gap-3">
                  {weatherData.forecast.slice(0, 3).map((day) => (
                    <div key={day.day} className="glass rounded-xl p-3 text-center min-w-[72px]">
                      <p className="text-white/70 text-xs">{day.day}</p>
                      <day.icon size={22} className="mx-auto my-1.5 text-yellow-300" />
                      <p className="text-white font-bold text-sm">{day.high}°</p>
                      <p className="text-white/50 text-xs">{day.low}°</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {option === "C" && (
            <motion.div key="C" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-1.5 bg-muted rounded-full p-1">
                  <button onClick={() => setLocSub("color")} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${locSub === "color" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`} data-testid="button-weather-4loc-color">Hiệu ứng</button>
                  <button onClick={() => setLocSub("image")} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${locSub === "image" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`} data-testid="button-weather-4loc-image">Hình ảnh</button>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ minHeight: 220 }}>
                {locationsWeather.map((loc, i) => <LocationWeatherCard key={loc.id} loc={loc} subMode={locSub} isInView={isInView} index={i} />)}
              </div>
              <p className="text-center text-muted-foreground text-xs mt-4">Powered by AccuWeather • Cập nhật lúc 14:30</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
