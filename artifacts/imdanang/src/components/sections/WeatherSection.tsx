import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sun, Cloud, CloudRain, Wind, Droplets, Eye, Thermometer, MapPin } from "lucide-react";

const weatherData = {
  city: "Đà Nẵng",
  country: "Việt Nam",
  temp: 32,
  feelsLike: 35,
  condition: "Partly Cloudy",
  conditionVi: "Có mây rải rác",
  humidity: 78,
  wind: 15,
  uvIndex: 7,
  visibility: 12,
  pressure: 1012,
  image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&auto=format&fit=crop",
  forecast: [
    { day: "T2", icon: Sun, high: 34, low: 26, condition: "Nắng" },
    { day: "T3", icon: Cloud, high: 31, low: 25, condition: "Có mây" },
    { day: "T4", icon: CloudRain, high: 28, low: 23, condition: "Mưa nhẹ" },
    { day: "T5", icon: Sun, high: 33, low: 26, condition: "Nắng" },
    { day: "T6", icon: Sun, high: 35, low: 27, condition: "Nắng đẹp" },
  ],
};

const locationsWeather = [
  {
    id: 1,
    name: "Hội An",
    temp: 30,
    condition: "Nắng nhẹ",
    icon: Sun,
    humidity: 72,
    wind: 12,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop",
    gradient: "from-amber-500 to-orange-600",
    iconColor: "text-yellow-300",
  },
  {
    id: 2,
    name: "Đà Nẵng",
    temp: 32,
    condition: "Có mây rải rác",
    icon: Cloud,
    humidity: 78,
    wind: 15,
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop",
    gradient: "from-sky-500 to-blue-600",
    iconColor: "text-white",
  },
  {
    id: 3,
    name: "Bà Nà Hills",
    temp: 22,
    condition: "Mát mẻ, sương mù",
    icon: Cloud,
    humidity: 90,
    wind: 20,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop",
    gradient: "from-slate-600 to-slate-800",
    iconColor: "text-slate-300",
  },
  {
    id: 4,
    name: "Cù Lao Chàm",
    temp: 29,
    condition: "Nắng đẹp, sóng nhẹ",
    icon: Sun,
    humidity: 75,
    wind: 18,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop",
    gradient: "from-teal-500 to-cyan-600",
    iconColor: "text-yellow-300",
  },
];

const uvLabel = (uv: number) => {
  if (uv <= 2) return { label: "Thấp", color: "text-green-500" };
  if (uv <= 5) return { label: "Trung bình", color: "text-yellow-500" };
  if (uv <= 7) return { label: "Cao", color: "text-orange-500" };
  return { label: "Rất cao", color: "text-red-500" };
};

function LocationWeatherCard({ loc, subMode, isInView, index }: {
  loc: typeof locationsWeather[0];
  subMode: "color" | "image";
  isInView: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer shadow-lg"
      data-testid={`card-weather-loc-${loc.id}`}
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
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin size={12} className="text-white/60" />
              <span className="text-white/70 text-xs">{loc.name}, Việt Nam</span>
            </div>
            <p className="text-white/80 text-sm">{loc.condition}</p>
          </div>
          <loc.icon size={32} className={loc.iconColor} />
        </div>
        <div className="flex items-end gap-1 mt-2">
          <span className="text-white font-bold" style={{ fontSize: "3.5rem", lineHeight: 1 }}>{loc.temp}</span>
          <span className="text-white/70 text-2xl mb-2">°C</span>
        </div>
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/20">
          <div className="flex items-center gap-1 text-white/60 text-xs">
            <Droplets size={11} />
            <span>{loc.humidity}%</span>
          </div>
          <div className="flex items-center gap-1 text-white/60 text-xs">
            <Wind size={11} />
            <span>{loc.wind} km/h</span>
          </div>
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
            <button
              onClick={() => setOption("A")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "A" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
              data-testid="button-weather-option-a"
            >
              Icons
            </button>
            <button
              onClick={() => setOption("B")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "B" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
              data-testid="button-weather-option-b"
            >
              Image
            </button>
            <button
              onClick={() => setOption("C")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${option === "C" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
              data-testid="button-weather-option-c"
            >
              4 Vùng
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {option === "A" && (
            <motion.div
              key="A"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl overflow-hidden shadow-xl"
            >
              <div className="bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-6">
                    <motion.div animate={{ rotate: [0, 10, 0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                      <Sun size={80} className="text-yellow-300 drop-shadow-lg" />
                    </motion.div>
                    <div>
                      <p className="text-white/70 text-sm font-medium mb-1">{weatherData.city}, {weatherData.country}</p>
                      <div className="flex items-start gap-1">
                        <span className="text-white font-bold" style={{ fontSize: "5rem", lineHeight: 1 }}>{weatherData.temp}</span>
                        <span className="text-white/80 text-2xl mt-4">°C</span>
                      </div>
                      <p className="text-white text-lg font-medium mt-1">{weatherData.conditionVi}</p>
                      <p className="text-white/60 text-sm mt-0.5">Cảm giác như {weatherData.feelsLike}°C</p>
                      <p className="text-white/50 text-xs mt-2">Powered by AccuWeather • Cập nhật lúc 14:30</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Droplets, label: "Độ ẩm", value: `${weatherData.humidity}%`, color: "bg-blue-400/30" },
                      { icon: Wind, label: "Gió", value: `${weatherData.wind} km/h`, color: "bg-cyan-400/30" },
                      { icon: Sun, label: "UV Index", value: `${weatherData.uvIndex} (${uv.label})`, color: "bg-yellow-400/30" },
                      { icon: Eye, label: "Tầm nhìn", value: `${weatherData.visibility} km`, color: "bg-purple-400/30" },
                      { icon: Thermometer, label: "Áp suất", value: `${weatherData.pressure} hPa`, color: "bg-green-400/30" },
                      { icon: Cloud, label: "Điều kiện", value: weatherData.condition, color: "bg-white/20" },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: i * 0.06 + 0.2, duration: 0.3 }}
                        className={`${stat.color} backdrop-blur-sm rounded-2xl p-3 flex items-center gap-2`}
                      >
                        <stat.icon size={16} className="text-white/80 shrink-0" />
                        <div>
                          <p className="text-white/60 text-xs">{stat.label}</p>
                          <p className="text-white text-sm font-semibold">{stat.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-white/20">
                  <p className="text-white/60 text-xs mb-3 uppercase tracking-wide font-medium">Dự báo 5 ngày</p>
                  <div className="grid grid-cols-5 gap-2">
                    {weatherData.forecast.map((day, i) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: i * 0.07 + 0.5, duration: 0.3 }}
                        className="flex flex-col items-center gap-1 bg-white/10 rounded-xl p-2"
                      >
                        <span className="text-white/70 text-xs font-medium">{day.day}</span>
                        <day.icon size={20} className="text-yellow-300" />
                        <span className="text-white text-sm font-bold">{day.high}°</span>
                        <span className="text-white/50 text-xs">{day.low}°</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {option === "B" && (
            <motion.div
              key="B"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl overflow-hidden shadow-xl h-72"
            >
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
            <motion.div
              key="C"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-1.5 bg-muted rounded-full p-1">
                  <button
                    onClick={() => setLocSub("color")}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${locSub === "color" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
                    data-testid="button-weather-4loc-color"
                  >
                    Màu sắc
                  </button>
                  <button
                    onClick={() => setLocSub("image")}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${locSub === "image" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
                    data-testid="button-weather-4loc-image"
                  >
                    Hình ảnh
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ minHeight: 220 }}>
                {locationsWeather.map((loc, i) => (
                  <LocationWeatherCard key={loc.id} loc={loc} subMode={locSub} isInView={isInView} index={i} />
                ))}
              </div>
              <p className="text-center text-muted-foreground text-xs mt-4">Powered by AccuWeather • Cập nhật lúc 14:30</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
