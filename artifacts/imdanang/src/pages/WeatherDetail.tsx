import { useState, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Sun, Cloud, CloudRain, Wind, Droplets, Eye, Thermometer,
  Gauge, CloudDrizzle, Sunset, Sunrise, Layers, MapPin, Activity, Clock
} from "lucide-react";

type WeatherType = "sunny" | "partly-cloudy" | "cloudy" | "rainy";

const locationsData: Record<string, {
  id: number; name: string; country: string; temp: number; highTemp: number; lowTemp: number;
  feelsLike: number; condition: string; type: WeatherType;
  humidity: number; wind: number; windDir: string; pressure: number; visibility: number;
  uv: number; rain: number; cloudCover: number; dewPoint: number; aqi: number; aqiLabel: string;
  sunrise: string; sunset: string;
  hourly: { time: string; icon: WeatherType; temp: number; rain: number; wind: number }[];
  weekly: { day: string; icon: WeatherType; high: number; low: number; rain: number }[];
}> = {
  "da-nang": {
    id: 1, name: "Đà Nẵng", country: "Việt Nam", temp: 28, highTemp: 32, lowTemp: 25, feelsLike: 31,
    condition: "Nhiều mây, nắng nhẹ", type: "partly-cloudy",
    humidity: 75, wind: 12, windDir: "ĐN", pressure: 1012, visibility: 10,
    uv: 8, rain: 20, cloudCover: 60, dewPoint: 23, aqi: 52, aqiLabel: "Trung bình",
    sunrise: "05:32", sunset: "18:15",
    hourly: [
      { time: "Hiện tại", icon: "partly-cloudy", temp: 28, rain: 10, wind: 12 },
      { time: "15:00", icon: "sunny", temp: 29, rain: 5, wind: 10 },
      { time: "16:00", icon: "sunny", temp: 30, rain: 0, wind: 10 },
      { time: "17:00", icon: "sunny", temp: 29, rain: 10, wind: 9 },
      { time: "18:00", icon: "partly-cloudy", temp: 27, rain: 20, wind: 11 },
      { time: "19:00", icon: "cloudy", temp: 26, rain: 30, wind: 12 },
      { time: "20:00", icon: "partly-cloudy", temp: 25, rain: 25, wind: 13 },
      { time: "21:00", icon: "partly-cloudy", temp: 25, rain: 15, wind: 10 },
      { time: "22:00", icon: "cloudy", temp: 25, rain: 10, wind: 8 },
      { time: "23:00", icon: "cloudy", temp: 24, rain: 5, wind: 8 },
      { time: "00:00", icon: "cloudy", temp: 24, rain: 5, wind: 8 },
      { time: "01:00", icon: "cloudy", temp: 24, rain: 5, wind: 8 },
    ],
    weekly: [
      { day: "Hôm nay", icon: "partly-cloudy", high: 32, low: 25, rain: 20 },
      { day: "T3", icon: "sunny", high: 33, low: 26, rain: 5 },
      { day: "T4", icon: "cloudy", high: 30, low: 24, rain: 35 },
      { day: "T5", icon: "rainy", high: 27, low: 22, rain: 70 },
      { day: "T6", icon: "sunny", high: 31, low: 25, rain: 10 },
      { day: "T7", icon: "sunny", high: 33, low: 26, rain: 5 },
      { day: "CN", icon: "partly-cloudy", high: 31, low: 25, rain: 15 },
    ],
  },
  "hoi-an": {
    id: 2, name: "Hội An", country: "Việt Nam", temp: 30, highTemp: 34, lowTemp: 26, feelsLike: 33,
    condition: "Nắng nhiều", type: "sunny",
    humidity: 68, wind: 8, windDir: "NĐ", pressure: 1010, visibility: 15,
    uv: 9, rain: 5, cloudCover: 20, dewPoint: 21, aqi: 38, aqiLabel: "Tốt",
    sunrise: "05:30", sunset: "18:14",
    hourly: [
      { time: "Hiện tại", icon: "sunny", temp: 30, rain: 0, wind: 8 },
      { time: "15:00", icon: "sunny", temp: 32, rain: 0, wind: 7 },
      { time: "16:00", icon: "sunny", temp: 33, rain: 0, wind: 7 },
      { time: "17:00", icon: "partly-cloudy", temp: 31, rain: 5, wind: 8 },
      { time: "18:00", icon: "partly-cloudy", temp: 29, rain: 10, wind: 9 },
      { time: "19:00", icon: "cloudy", temp: 28, rain: 15, wind: 8 },
      { time: "20:00", icon: "cloudy", temp: 27, rain: 10, wind: 7 },
      { time: "21:00", icon: "partly-cloudy", temp: 27, rain: 5, wind: 6 },
      { time: "22:00", icon: "sunny", temp: 26, rain: 0, wind: 5 },
      { time: "23:00", icon: "sunny", temp: 26, rain: 0, wind: 5 },
      { time: "00:00", icon: "sunny", temp: 25, rain: 0, wind: 5 },
      { time: "01:00", icon: "sunny", temp: 25, rain: 0, wind: 5 },
    ],
    weekly: [
      { day: "Hôm nay", icon: "sunny", high: 34, low: 26, rain: 5 },
      { day: "T3", icon: "sunny", high: 35, low: 27, rain: 0 },
      { day: "T4", icon: "partly-cloudy", high: 32, low: 25, rain: 20 },
      { day: "T5", icon: "cloudy", high: 29, low: 23, rain: 40 },
      { day: "T6", icon: "sunny", high: 32, low: 25, rain: 5 },
      { day: "T7", icon: "sunny", high: 34, low: 26, rain: 0 },
      { day: "CN", icon: "sunny", high: 33, low: 26, rain: 5 },
    ],
  },
  "ba-na-hills": {
    id: 3, name: "Bà Nà Hills", country: "Việt Nam", temp: 18, highTemp: 22, lowTemp: 14, feelsLike: 16,
    condition: "Có mây, mát mẻ", type: "cloudy",
    humidity: 88, wind: 15, windDir: "TB", pressure: 1015, visibility: 5,
    uv: 4, rain: 45, cloudCover: 85, dewPoint: 16, aqi: 25, aqiLabel: "Tốt",
    sunrise: "05:35", sunset: "18:18",
    hourly: [
      { time: "Hiện tại", icon: "cloudy", temp: 18, rain: 30, wind: 15 },
      { time: "15:00", icon: "cloudy", temp: 19, rain: 35, wind: 14 },
      { time: "16:00", icon: "rainy", temp: 18, rain: 50, wind: 16 },
      { time: "17:00", icon: "rainy", temp: 17, rain: 60, wind: 18 },
      { time: "18:00", icon: "rainy", temp: 16, rain: 40, wind: 15 },
      { time: "19:00", icon: "cloudy", temp: 15, rain: 25, wind: 13 },
      { time: "20:00", icon: "cloudy", temp: 15, rain: 25, wind: 13 },
      { time: "21:00", icon: "partly-cloudy", temp: 14, rain: 20, wind: 12 },
      { time: "22:00", icon: "cloudy", temp: 14, rain: 15, wind: 10 },
      { time: "23:00", icon: "cloudy", temp: 14, rain: 10, wind: 10 },
      { time: "00:00", icon: "cloudy", temp: 14, rain: 10, wind: 10 },
      { time: "01:00", icon: "cloudy", temp: 14, rain: 10, wind: 10 },
    ],
    weekly: [
      { day: "Hôm nay", icon: "cloudy", high: 22, low: 14, rain: 45 },
      { day: "T3", icon: "rainy", high: 19, low: 12, rain: 70 },
      { day: "T4", icon: "cloudy", high: 20, low: 13, rain: 40 },
      { day: "T5", icon: "partly-cloudy", high: 21, low: 14, rain: 20 },
      { day: "T6", icon: "cloudy", high: 20, low: 13, rain: 35 },
      { day: "T7", icon: "rainy", high: 18, low: 12, rain: 65 },
      { day: "CN", icon: "cloudy", high: 21, low: 14, rain: 30 },
    ],
  },
  "my-khe": {
    id: 4, name: "Mỹ Khê", country: "Việt Nam", temp: 29, highTemp: 33, lowTemp: 26, feelsLike: 32,
    condition: "Gió nhẹ, nắng đẹp", type: "partly-cloudy",
    humidity: 72, wind: 18, windDir: "ĐB", pressure: 1011, visibility: 12,
    uv: 8, rain: 10, cloudCover: 40, dewPoint: 22, aqi: 45, aqiLabel: "Tốt",
    sunrise: "05:31", sunset: "18:16",
    hourly: [
      { time: "Hiện tại", icon: "partly-cloudy", temp: 29, rain: 5, wind: 18 },
      { time: "15:00", icon: "sunny", temp: 31, rain: 0, wind: 17 },
      { time: "16:00", icon: "sunny", temp: 32, rain: 0, wind: 16 },
      { time: "17:00", icon: "partly-cloudy", temp: 30, rain: 10, wind: 18 },
      { time: "18:00", icon: "partly-cloudy", temp: 28, rain: 15, wind: 20 },
      { time: "19:00", icon: "cloudy", temp: 27, rain: 20, wind: 18 },
      { time: "20:00", icon: "partly-cloudy", temp: 27, rain: 10, wind: 15 },
      { time: "21:00", icon: "partly-cloudy", temp: 26, rain: 5, wind: 14 },
      { time: "22:00", icon: "partly-cloudy", temp: 26, rain: 5, wind: 13 },
      { time: "23:00", icon: "cloudy", temp: 25, rain: 5, wind: 12 },
      { time: "00:00", icon: "cloudy", temp: 25, rain: 5, wind: 12 },
      { time: "01:00", icon: "cloudy", temp: 25, rain: 5, wind: 12 },
    ],
    weekly: [
      { day: "Hôm nay", icon: "partly-cloudy", high: 33, low: 26, rain: 10 },
      { day: "T3", icon: "sunny", high: 34, low: 27, rain: 5 },
      { day: "T4", icon: "partly-cloudy", high: 31, low: 25, rain: 20 },
      { day: "T5", icon: "cloudy", high: 28, low: 23, rain: 45 },
      { day: "T6", icon: "sunny", high: 32, low: 25, rain: 5 },
      { day: "T7", icon: "sunny", high: 34, low: 26, rain: 0 },
      { day: "CN", icon: "partly-cloudy", high: 32, low: 26, rain: 15 },
    ],
  },
  "cu-lao-cham": {
    id: 5, name: "Cù Lao Chàm", country: "Việt Nam", temp: 27, highTemp: 31, lowTemp: 24, feelsLike: 30,
    condition: "Nắng gió biển", type: "sunny",
    humidity: 80, wind: 22, windDir: "ĐB", pressure: 1009, visibility: 18,
    uv: 9, rain: 5, cloudCover: 30, dewPoint: 23, aqi: 20, aqiLabel: "Tốt",
    sunrise: "05:33", sunset: "18:13",
    hourly: [
      { time: "Hiện tại", icon: "sunny", temp: 27, rain: 0, wind: 22 },
      { time: "15:00", icon: "sunny", temp: 29, rain: 0, wind: 21 },
      { time: "16:00", icon: "sunny", temp: 30, rain: 0, wind: 20 },
      { time: "17:00", icon: "partly-cloudy", temp: 28, rain: 5, wind: 22 },
      { time: "18:00", icon: "partly-cloudy", temp: 27, rain: 10, wind: 24 },
      { time: "19:00", icon: "partly-cloudy", temp: 26, rain: 5, wind: 22 },
      { time: "20:00", icon: "sunny", temp: 25, rain: 0, wind: 20 },
      { time: "21:00", icon: "sunny", temp: 25, rain: 0, wind: 18 },
      { time: "22:00", icon: "sunny", temp: 24, rain: 0, wind: 16 },
      { time: "23:00", icon: "sunny", temp: 24, rain: 0, wind: 15 },
      { time: "00:00", icon: "sunny", temp: 24, rain: 0, wind: 15 },
      { time: "01:00", icon: "sunny", temp: 24, rain: 0, wind: 15 },
    ],
    weekly: [
      { day: "Hôm nay", icon: "sunny", high: 31, low: 24, rain: 5 },
      { day: "T3", icon: "sunny", high: 32, low: 25, rain: 0 },
      { day: "T4", icon: "partly-cloudy", high: 29, low: 23, rain: 20 },
      { day: "T5", icon: "cloudy", high: 27, low: 22, rain: 35 },
      { day: "T6", icon: "sunny", high: 30, low: 24, rain: 5 },
      { day: "T7", icon: "sunny", high: 32, low: 25, rain: 0 },
      { day: "CN", icon: "sunny", high: 31, low: 24, rain: 5 },
    ],
  },
};

const allLocations = [
  { slug: "da-nang", name: "Đà Nẵng" },
  { slug: "hoi-an", name: "Hội An" },
  { slug: "ba-na-hills", name: "Bà Nà Hills" },
  { slug: "my-khe", name: "Mỹ Khê" },
  { slug: "cu-lao-cham", name: "Cù Lao Chàm" },
];

const heroBg: Record<WeatherType, { bg: string; rain: boolean }> = {
  sunny: { bg: "linear-gradient(180deg, #1a6fa8 0%, #2fa3d8 30%, #65c9f0 60%, #bde8ff 85%, #f0f8ff 100%)", rain: false },
  "partly-cloudy": { bg: "linear-gradient(180deg, #1565a8 0%, #3a90c8 35%, #7abde0 65%, #c5e4f5 90%, #e8f4fc 100%)", rain: false },
  cloudy: { bg: "linear-gradient(180deg, #1e2a3a 0%, #2d3f56 30%, #374d66 60%, #4a607a 80%, #607a8f 100%)", rain: true },
  rainy: { bg: "linear-gradient(180deg, #111928 0%, #1f2e42 30%, #263548 60%, #2e4060 80%, #3a5070 100%)", rain: true },
};

function WeatherIcon({ type, size = 48, className = "" }: { type: WeatherType; size?: number; className?: string }) {
  if (type === "rainy") return <CloudRain size={size} className={className || "text-blue-200"} />;
  if (type === "cloudy") return <Cloud size={size} className={className || "text-gray-300"} />;
  if (type === "partly-cloudy") return <Cloud size={size} className={className || "text-white/90"} />;
  return <Sun size={size} className={className || "text-yellow-300"} />;
}

function AnimatedHeroBg({ type }: { type: WeatherType }) {
  const cfg = heroBg[type];
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: cfg.bg }}>
      {(type === "sunny" || type === "partly-cloudy") && (
        <>
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.85, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute"
            style={{ top: "-5%", right: "8%", width: 260, height: 260, background: "radial-gradient(circle, rgba(253,224,71,0.55) 0%, rgba(251,191,36,0.25) 45%, transparent 70%)", filter: "blur(24px)" }}
          />
          {type === "partly-cloudy" && (
            <>
              {[{ top: "12%", left: "35%", w: 200 }, { top: "6%", left: "55%", w: 160 }].map((c, i) => (
                <motion.div key={i} animate={{ x: [0, 20, 0] }} transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute" style={{ top: c.top, left: c.left, width: c.w, height: c.w * 0.38, background: "rgba(255,255,255,0.28)", borderRadius: "50%", filter: "blur(14px)" }} />
              ))}
            </>
          )}
        </>
      )}
      {cfg.rain && (
        <>
          {[{ top: "4%", left: "5%", w: 320 }, { top: "0%", left: "40%", w: 280 }, { top: "6%", left: "68%", w: 240 }].map((c, i) => (
            <motion.div key={i} animate={{ x: [0, 12, 0] }} transition={{ duration: 18 + i * 6, repeat: Infinity }}
              className="absolute" style={{ top: c.top, left: c.left, width: c.w, height: c.w * 0.32, background: "rgba(30,50,80,0.5)", borderRadius: "50%", filter: "blur(18px)" }} />
          ))}
          {Array.from({ length: 55 }, (_, i) => (
            <motion.div key={`rain-${i}`} className="absolute rounded-full"
              style={{ left: `${(i * 1.82) % 100}%`, width: 1.5, height: 14, top: "15%", background: `rgba(147,197,253,${0.2 + (i % 3) * 0.08})`, transform: "rotate(12deg)" }}
              animate={{ y: ["0%", "600%"], opacity: [0, 0.5, 0.5, 0] }}
              transition={{ duration: 0.65 + (i % 5) * 0.08, repeat: Infinity, delay: (i * 0.09) % 2.5, ease: "linear" }} />
          ))}
        </>
      )}
    </div>
  );
}

const uvConfig = (uv: number) => {
  if (uv <= 2) return { label: "Thấp", color: "#22c55e", bar: 18 };
  if (uv <= 5) return { label: "TB", color: "#eab308", bar: 45 };
  if (uv <= 7) return { label: "Cao", color: "#f97316", bar: 64 };
  if (uv <= 10) return { label: "Rất cao", color: "#ef4444", bar: 82 };
  return { label: "Cực cao", color: "#8b5cf6", bar: 100 };
};

const aqiConfig = (aqi: number) => {
  if (aqi <= 50) return { color: "#22c55e", pct: (aqi / 50) * 33 };
  if (aqi <= 100) return { color: "#eab308", pct: 33 + ((aqi - 50) / 50) * 34 };
  return { color: "#ef4444", pct: 67 + ((aqi - 100) / 150) * 33 };
};

export default function WeatherDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const [forecastTab, setForecastTab] = useState<"hourly" | "weekly">("hourly");
  const ref = useRef<HTMLDivElement>(null);

  const loc = locationsData[slug || "da-nang"];

  if (!loc) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Không tìm thấy địa điểm</p>
          <button onClick={() => navigate("/")} className="text-blue-600 hover:underline">← Quay lại trang chủ</button>
        </div>
      </div>
    );
  }

  const uv = uvConfig(loc.uv);
  const aqi = aqiConfig(loc.aqi);

  return (
    <div ref={ref} data-testid="page-weather-detail">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: 280 }}>
        <AnimatePresence mode="wait">
          <motion.div key={slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
            <AnimatedHeroBg type={loc.type} />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10">
          <div className="px-6 pt-5 pb-3">
            <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-4 transition-colors" data-testid="button-weather-back">
              <ArrowLeft size={16} /> Quay lại
            </button>
            {/* Location tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {allLocations.map((l) => {
                const lData = locationsData[l.slug];
                const isActive = l.slug === slug;
                return (
                  <motion.button key={l.slug} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(`/thoi-tiet/${l.slug}`)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${isActive ? "bg-white/25 border border-white/40 text-white" : "bg-black/15 border border-white/15 text-white/70 hover:bg-white/15 hover:text-white"}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white" : "bg-white/50"}`} />
                    {l.name} {lData?.temp}°
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="px-6 pb-8">
            <div className="flex items-center gap-1.5 text-white/70 text-sm mb-3">
              <MapPin size={13} /><span>{loc.name}, {loc.country}</span>
            </div>
            <div className="flex items-center gap-5 mb-2">
              <motion.span key={`temp-${slug}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-white font-bold leading-none" style={{ fontSize: "5.5rem" }}>
                {loc.temp}°
              </motion.span>
              <div>
                <motion.div animate={loc.type === "sunny" ? { rotate: [0, 12, 0, -12, 0] } : { rotate: [0, 4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                  <WeatherIcon type={loc.type} size={52} />
                </motion.div>
                <p className="text-white text-sm font-medium mt-1">{loc.condition}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/75 text-sm">
              <span>↑ {loc.highTemp}°</span>
              <span>↓ {loc.lowTemp}°</span>
              <span className="text-white/40">|</span>
              <span>Cảm giác {loc.feelsLike}°</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail content */}
      <div className="bg-background px-4 py-6 max-w-4xl mx-auto">

        {/* Stats rows */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
          {[
            { label: "Độ ẩm", value: `${loc.humidity}%`, icon: Droplets, iconBg: "bg-blue-100", iconColor: "text-blue-500" },
            { label: "Gió", value: `${loc.wind} km/h`, sub: loc.windDir, icon: Wind, iconBg: "bg-cyan-100", iconColor: "text-cyan-500" },
            { label: "Áp suất", value: `${loc.pressure} hPa`, icon: Gauge, iconBg: "bg-purple-100", iconColor: "text-purple-500" },
            { label: "Tầm nhìn", value: `${loc.visibility} km`, icon: Eye, iconBg: "bg-teal-100", iconColor: "text-teal-500" },
          ].map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground text-xs">{s.label}</span>
                <div className={`${s.iconBg} rounded-full p-1.5`}><s.icon size={14} className={s.iconColor} /></div>
              </div>
              <p className="text-foreground font-bold text-xl">{s.value}</p>
              {s.sub && <p className="text-muted-foreground text-xs mt-0.5">{s.sub}</p>}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { label: "Mưa", value: `${loc.rain}%`, icon: CloudDrizzle, iconBg: "bg-sky-100", iconColor: "text-sky-500" },
            { label: "Mây che", value: `${loc.cloudCover}%`, icon: Cloud, iconBg: "bg-slate-100", iconColor: "text-slate-400" },
            { label: "Điểm sương", value: `${loc.dewPoint}°`, icon: Thermometer, iconBg: "bg-green-100", iconColor: "text-green-500" },
            { label: "Chất lượng KK", value: `AQI ${loc.aqi}`, sub: loc.aqiLabel, icon: Layers, iconBg: "bg-orange-100", iconColor: "text-orange-500" },
          ].map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground text-xs">{s.label}</span>
                <div className={`${s.iconBg} rounded-full p-1.5`}><s.icon size={14} className={s.iconColor} /></div>
              </div>
              <p className="text-foreground font-bold text-xl">{s.value}</p>
              {s.sub && <p className="text-muted-foreground text-xs mt-0.5">{s.sub}</p>}
            </motion.div>
          ))}
        </div>

        {/* UV / Sunrise / AQI */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center"><Sun size={14} className="text-orange-500" /></div>
              <span className="text-sm font-medium text-foreground">Chỉ số UV</span>
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-foreground font-bold text-3xl">{loc.uv}</span>
              <span className="text-sm font-semibold mb-0.5" style={{ color: uv.color }}>{uv.label}</span>
            </div>
            <div className="relative h-2 rounded-full overflow-hidden" style={{ background: "linear-gradient(90deg, #22c55e 0%, #eab308 25%, #f97316 50%, #ef4444 75%, #8b5cf6 100%)" }}>
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-gray-300 rounded-full shadow" style={{ left: `calc(${uv.bar}% - 6px)` }} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>0</span><span>11+</span></div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center"><Sunrise size={14} className="text-amber-500" /></div>
              <span className="text-sm font-medium text-foreground">Bình minh / Hoàng hôn</span>
            </div>
            <div className="flex justify-around items-center">
              <div className="text-center">
                <Sunrise size={26} className="text-amber-400 mx-auto mb-1" />
                <p className="text-foreground font-bold text-xl">{loc.sunrise}</p>
                <p className="text-muted-foreground text-xs">Bình minh</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <Sunset size={26} className="text-orange-400 mx-auto mb-1" />
                <p className="text-foreground font-bold text-xl">{loc.sunset}</p>
                <p className="text-muted-foreground text-xs">Hoàng hôn</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center"><Activity size={14} className="text-green-500" /></div>
              <span className="text-sm font-medium text-foreground">Chất lượng không khí</span>
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-foreground font-bold text-3xl">{loc.aqi}</span>
              <span className="text-sm font-semibold mb-0.5" style={{ color: aqi.color }}>{loc.aqiLabel}</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${aqi.pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full" style={{ background: aqi.color }} />
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-6 mb-4 border-b border-border pb-3">
            <button onClick={() => setForecastTab("hourly")}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${forecastTab === "hourly" ? "text-blue-600 border-b-2 border-blue-500 pb-3 -mb-3" : "text-muted-foreground hover:text-foreground"}`}>
              <Clock size={13} /> Theo giờ
            </button>
            <button onClick={() => setForecastTab("weekly")}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${forecastTab === "weekly" ? "text-blue-600 border-b-2 border-blue-500 pb-3 -mb-3" : "text-muted-foreground hover:text-foreground"}`}>
              <Wind size={13} /> 7 ngày tới
            </button>
          </div>

          <AnimatePresence mode="wait">
            {forecastTab === "hourly" ? (
              <motion.div key="hourly" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-x-auto">
                <div className="flex gap-2.5 pb-2 min-w-max">
                  {loc.hourly.map((h, i) => (
                    <div key={i} className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl min-w-[68px] ${i === 0 ? "bg-blue-50 border border-blue-100" : "bg-muted/40"}`}>
                      <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">{h.time}</span>
                      <WeatherIcon type={h.icon} size={20} className={h.icon === "sunny" ? "text-amber-400" : h.icon === "rainy" ? "text-blue-400" : "text-gray-400"} />
                      <span className="text-foreground font-bold text-base">{h.temp}°</span>
                      <div className="flex items-center gap-0.5 text-sky-500 text-[10px]"><Droplets size={9} /><span>{h.rain}%</span></div>
                      <div className="flex items-center gap-0.5 text-gray-400 text-[10px]"><Wind size={9} /><span>{h.wind}</span></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="weekly" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1.5">
                {loc.weekly.map((d, i) => (
                  <div key={i} className={`flex items-center gap-4 px-3 py-2.5 rounded-xl ${i === 0 ? "bg-blue-50 border border-blue-100" : "hover:bg-muted/40 transition-colors"}`}>
                    <span className="text-sm font-medium text-foreground w-16">{d.day}</span>
                    <WeatherIcon type={d.icon} size={18} className={d.icon === "sunny" ? "text-amber-400" : d.icon === "rainy" ? "text-blue-400" : "text-gray-400"} />
                    <div className="flex items-center gap-1 text-sky-500 text-xs flex-1"><Droplets size={10} /><span>{d.rain}%</span></div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-foreground font-bold">{d.high}°</span>
                      <div className="w-14 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-300 to-orange-400" style={{ width: "70%" }} />
                      </div>
                      <span className="text-muted-foreground">{d.low}°</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-4">Dữ liệu mô phỏng phong OpenWeatherMap API</p>
      </div>
    </div>
  );
}
