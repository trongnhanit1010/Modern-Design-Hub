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
  { id: 1, name: "Đà Nẵng", temp: 28, highTemp: 32, lowTemp: 25, condition: "Nhiều mây, nắng nhẹ", type: "partly-cloudy" as const, icon: Cloud, humidity: 75, wind: 12, uv: 8, gradient: "from-sky-400 to-blue-500", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop" },
  { id: 2, name: "Hội An", temp: 30, highTemp: 34, lowTemp: 26, condition: "Nắng nhiều", type: "sunny" as const, icon: Sun, humidity: 68, wind: 8, uv: 9, gradient: "from-orange-400 to-orange-600", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop" },
  { id: 3, name: "Bà Nà Hills", temp: 18, highTemp: 22, lowTemp: 14, condition: "Có mây, mát mẻ", type: "cloudy" as const, icon: Cloud, humidity: 88, wind: 15, uv: 4, gradient: "from-slate-500 to-slate-700", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop" },
  { id: 4, name: "Mỹ Khê", temp: 29, highTemp: 33, lowTemp: 26, condition: "Gió nhẹ, nắng đẹp", type: "partly-cloudy" as const, icon: Cloud, humidity: 72, wind: 18, uv: 8, gradient: "from-teal-400 to-teal-600", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop" },
  { id: 5, name: "Cù Lao Chàm", temp: 27, highTemp: 31, lowTemp: 24, condition: "Nắng gió biển", type: "sunny" as const, icon: Sun, humidity: 80, wind: 22, uv: 9, gradient: "from-violet-400 to-indigo-600", image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&auto=format&fit=crop" },
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

function AnimatedWeatherBg({ type }: { type: WeatherType }) {
  const cfg = weatherConfig[type];
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: cfg.bg }}>
      {type === "sunny" && (
        <>
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 0.9, 0.7] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full"
            style={{ top: "-5%", right: "5%", width: 280, height: 280, background: "radial-gradient(circle, rgba(253,224,71,0.6) 0%, rgba(251,191,36,0.3) 40%, transparent 70%)", filter: "blur(20px)" }}
          />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 85% 15%, rgba(253,224,71,0.15) 0%, transparent 50%)" }} />
        </>
      )}
      {type === "partly-cloudy" && (
        <>
          <motion.div
            animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full"
            style={{ top: "-5%", right: "8%", width: 240, height: 240, background: "radial-gradient(circle, rgba(253,224,71,0.5) 0%, rgba(251,191,36,0.2) 40%, transparent 70%)", filter: "blur(20px)" }}
          />
          <motion.div
            animate={{ x: [0, 30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute"
            style={{ top: "8%", right: "15%", width: 200, height: 80, background: "rgba(255,255,255,0.12)", borderRadius: "50%", filter: "blur(16px)" }}
          />
        </>
      )}
      {type === "cloudy" && (
        <>
          {[{ top: "5%", left: "10%", w: 280 }, { top: "0%", left: "45%", w: 240 }, { top: "12%", left: "70%", w: 200 }].map((c, i) => (
            <motion.div
              key={i}
              animate={{ x: [0, 15, 0] }}
              transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute"
              style={{ top: c.top, left: c.left, width: c.w, height: c.w * 0.35, background: "rgba(55,65,81,0.5)", borderRadius: "50%", filter: "blur(20px)" }}
            />
          ))}
          {[{ top: "60%", speed: 22 }, { top: "75%", speed: 28 }].map((f, i) => (
            <motion.div key={`fog-${i}`} className="absolute w-[200%]" style={{ top: f.top, height: "15%", background: "linear-gradient(to right, transparent, rgba(200,200,220,0.3), transparent)", filter: "blur(16px)" }} animate={{ x: ["-50%", "0%", "-50%"] }} transition={{ duration: f.speed, repeat: Infinity, ease: "easeInOut", delay: i * 3 }} />
          ))}
        </>
      )}
      {type === "rainy" && (
        <>
          {[{ top: "2%", left: "5%", w: 300 }, { top: "0%", left: "40%", w: 260 }, { top: "8%", left: "65%", w: 220 }].map((c, i) => (
            <motion.div
              key={i}
              animate={{ x: [0, 12, 0] }}
              transition={{ duration: 18 + i * 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute"
              style={{ top: c.top, left: c.left, width: c.w, height: c.w * 0.35, background: "rgba(30,58,95,0.6)", borderRadius: "50%", filter: "blur(18px)" }}
            />
          ))}
          {Array.from({ length: 30 }, (_, i) => (
            <motion.div
              key={`rain-${i}`}
              className="absolute rounded-full"
              style={{ left: `${(i * 3.33) % 100}%`, width: 1.5, height: 12, top: "20%", background: `rgba(147,197,253,${0.25 + (i % 3) * 0.1})`, transform: "rotate(10deg)" }}
              animate={{ y: ["0%", "500%"], opacity: [0, 0.4, 0.4, 0] }}
              transition={{ duration: 0.6 + (i % 4) * 0.1, repeat: Infinity, delay: (i * 0.1) % 2, ease: "linear" }}
            />
          ))}
        </>
      )}
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}

function LocationWeatherCard({ loc, isInView, index }: { loc: typeof locationsWeather[0]; isInView: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-lg bg-gradient-to-br ${loc.gradient}`}
      data-testid={`card-weather-loc-${loc.id}`}
    >
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white font-bold text-sm tracking-wide leading-tight">{loc.name.toUpperCase()}</p>
            <p className="text-white/75 text-xs mt-0.5 leading-snug">{loc.condition}</p>
          </div>
          <loc.icon size={28} className="text-white/90 drop-shadow shrink-0" />
        </div>

        <div>
          <div className="flex items-start gap-0.5">
            <span className="text-white font-bold leading-none" style={{ fontSize: "3.2rem" }}>{loc.temp}°</span>
          </div>
          <p className="text-white/65 text-sm mt-1">{loc.highTemp}° / {loc.lowTemp}°</p>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-white/20">
          <div className="flex items-center gap-1 text-white/70 text-xs">
            <Droplets size={11} /><span>{loc.humidity}%</span>
          </div>
          <div className="flex items-center gap-1 text-white/70 text-xs">
            <Wind size={11} /><span>{loc.wind} km/h</span>
          </div>
          <div className="flex items-center gap-1 text-white/70 text-xs">
            <Sun size={11} /><span>UV {loc.uv}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WeatherSection() {
  const [option, setOption] = useState<"A" | "B" | "C">("A");
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
            <motion.div key="B" initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }} className="relative rounded-3xl overflow-hidden shadow-xl">
              <div className="absolute inset-0">
                <img src={weatherData.image} alt="Weather background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
              </div>
              <div className="relative z-10 p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-white/60 text-sm font-medium mb-4">{weatherData.city}, {weatherData.country}</p>
                    <div className="flex items-center gap-5 mb-4">
                      <motion.div animate={{ rotate: [0, 12, 0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                        <Sun size={72} className="text-yellow-300 drop-shadow-lg" />
                      </motion.div>
                      <div>
                        <div className="flex items-start gap-1">
                          <span className="text-white font-bold" style={{ fontSize: "4.5rem", lineHeight: 1 }}>{weatherData.temp}</span>
                          <span className="text-white/70 text-2xl mt-3">°C</span>
                        </div>
                        <p className="text-white text-lg font-medium">{weatherData.conditionVi}</p>
                        <p className="text-white/50 text-sm mt-0.5">Cảm giác như {weatherData.feelsLike}°C</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { icon: Droplets, label: "Độ ẩm", value: `${weatherData.humidity}%` },
                        { icon: Wind, label: "Gió", value: `${weatherData.wind} km/h` },
                        { icon: Sun, label: "UV Index", value: `${weatherData.uvIndex} (${uv.label})` },
                        { icon: Eye, label: "Tầm nhìn", value: `${weatherData.visibility} km` },
                        { icon: Thermometer, label: "Áp suất", value: `${weatherData.pressure} hPa` },
                        { icon: Cloud, label: "Điều kiện", value: weatherData.conditionVi },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 flex items-center gap-2">
                          <stat.icon size={14} className="text-white/70 shrink-0" />
                          <div><p className="text-white/50 text-xs">{stat.label}</p><p className="text-white text-xs font-semibold">{stat.value}</p></div>
                        </div>
                      ))}
                    </div>
                    <p className="text-white/30 text-xs mt-3">Powered by AccuWeather • Cập nhật lúc 14:30</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-3">Dự báo 5 ngày</p>
                    <div className="flex flex-col gap-2">
                      {weatherData.forecast.map((day, i) => (
                        <motion.div key={day.day} initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.08 + 0.3 }} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5">
                          <span className="text-white/60 text-sm font-medium w-6">{day.day}</span>
                          <day.icon size={22} className={`shrink-0 ${day.type === "sunny" ? "text-yellow-300" : day.type === "rainy" ? "text-blue-200" : "text-white/80"}`} />
                          <span className="text-white/60 text-xs flex-1">{day.condition}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-sm">{day.high}°</span>
                            <span className="text-white/40 text-xs">{day.low}°</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {option === "C" && (
            <motion.div key="C" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {locationsWeather.map((loc, i) => <LocationWeatherCard key={loc.id} loc={loc} isInView={isInView} index={i} />)}
              </div>
              <p className="text-center text-muted-foreground text-xs mt-4">Powered by AccuWeather • Cập nhật lúc 14:30</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
