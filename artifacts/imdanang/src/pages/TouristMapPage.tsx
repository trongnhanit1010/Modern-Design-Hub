/// <reference types="@types/google.maps" />
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hotel, UtensilsCrossed, Camera, Star,
  Search, Map, ChevronRight, Grid3X3, List, ChevronLeft,
  Waves, MapPin, Heart, X, Navigation, Coffee, SlidersHorizontal, ChevronDown,
} from "lucide-react";
import { useDarkMode } from "@/context/DarkModeContext";

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface Location {
  id: number; category: string; name: string; lat: number; lng: number;
  address: string; rating: number; reviews: number; hours: string;
  desc: string; image: string; tag?: string; stars?: number;
  hotelType?: string; city?: string; attractionType?: string;
  cuisine?: string; priceRange?: string; district?: string; slug?: string;
}
interface DishRestaurant {
  id: number; name: string; address: string; lat: number; lng: number;
  rating: number; reviews: number; hours: string; priceRange: string; image: string;
}
interface Dish {
  id: number; name: string; desc: string; image: string;
  lat: number; lng: number; tag: string;
  dishType: string; area: string;
  restaurants: DishRestaurant[];
}

// ─── GOOGLE MAPS LOADER HOOK ─────────────────────────────────────────────────

function useGoogleMaps(apiKey: string) {
  const [loaded, setLoaded] = useState(() => typeof window !== "undefined" && !!window.google?.maps);
  useEffect(() => {
    if (loaded) return;
    const cb = "__gm_init__" + Date.now();
    (window as unknown as Record<string, unknown>)[cb] = () => setLoaded(true);
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${cb}&loading=async`;
    s.async = true;
    document.head.appendChild(s);
    return () => { delete (window as unknown as Record<string, unknown>)[cb]; };
  }, [apiKey, loaded]);
  return loaded;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const DANANG_CENTER = { lat: 16.0544, lng: 108.2022 };

const categories = [
  { id: "hotel",      label: "Khách sạn",           icon: Hotel,           g1: "#14b8a6", g2: "#10b981", emoji: "🏨" },
  { id: "attraction", label: "Địa điểm",             icon: Camera,          g1: "#8b5cf6", g2: "#7c3aed", emoji: "📸" },
  { id: "restaurant", label: "Ẩm thực",              icon: UtensilsCrossed, g1: "#f97316", g2: "#ef4444", emoji: "🍽️" },
  { id: "beach",      label: "Bãi biển",             icon: Waves,           g1: "#0ea5e9", g2: "#06b6d4", emoji: "🏖️" },
  { id: "dish",       label: "Món ngon địa phương",  icon: Coffee,          g1: "#f43f5e", g2: "#ec4899", emoji: "🍜" },
];

const hotelData: Location[] = [
  { id: 101, category: "hotel", name: "Crowne Plaza Danang", lat: 16.0870, lng: 108.2471, address: "200 Võ Nguyên Giáp, Sơn Trà", rating: 4.9, reviews: 1240, hours: "Check-in: 14:00", desc: "Resort 5 sao sang trọng trực tiếp bên bờ biển Mỹ Khê", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop", tag: "Best Seller", stars: 5, hotelType: "resort", city: "Đà Nẵng", slug: "crowne-plaza-danang" },
  { id: 102, category: "hotel", name: "Furama Resort Danang", lat: 16.0258, lng: 108.2614, address: "105 Võ Nguyên Giáp, Ngũ Hành Sơn", rating: 4.8, reviews: 2341, hours: "Check-in: 14:00", desc: "Resort hạng sang với bãi biển riêng và dịch vụ đẳng cấp", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&auto=format&fit=crop", tag: "Luxury", stars: 5, hotelType: "resort", city: "Đà Nẵng", slug: "furama-resort-danang" },
  { id: 103, category: "hotel", name: "Grand Tourane Hotel", lat: 16.0678, lng: 108.2199, address: "252 Lê Duẩn, Hải Châu", rating: 4.7, reviews: 876, hours: "Check-in: 14:00", desc: "Khách sạn boutique hiện đại ngay trung tâm thành phố", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&auto=format&fit=crop", tag: "City Center", stars: 5, hotelType: "hotel", city: "Đà Nẵng", slug: "grand-tourane-hotel" },
  { id: 104, category: "hotel", name: "La Siesta Hội An Resort", lat: 15.8728, lng: 108.3313, address: "Cẩm Kim, Hội An, Quảng Nam", rating: 4.9, reviews: 3100, hours: "Check-in: 14:00", desc: "Resort cao cấp với kiến trúc cổ điển giữa lòng Hội An", image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&auto=format&fit=crop", tag: "Premium", stars: 5, hotelType: "resort", city: "Hội An", slug: "la-siesta-resort-hoi-an" },
  { id: 105, category: "hotel", name: "Brilliant Hotel Danang", lat: 16.0709, lng: 108.2237, address: "162 Bạch Đằng, Hải Châu", rating: 4.5, reviews: 654, hours: "Check-in: 14:00", desc: "Khách sạn 4 sao view sông Hàn tuyệt đẹp", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&auto=format&fit=crop", tag: "River View", stars: 4, hotelType: "hotel", city: "Đà Nẵng", slug: "brilliant-hotel-danang" },
  { id: 106, category: "hotel", name: "Blooming Hội An Hotel", lat: 15.8773, lng: 108.3350, address: "Phố Cổ Hội An, Quảng Nam", rating: 4.6, reviews: 520, hours: "Check-in: 14:00", desc: "Boutique hotel quyến rũ giữa khu phố cổ di sản", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&auto=format&fit=crop", tag: "Boutique", stars: 4, hotelType: "boutique", city: "Hội An", slug: "blooming-hotel-hoi-an" },
];
const attractionData: Location[] = [
  { id: 201, category: "attraction", name: "Bà Nà Hills & Cầu Vàng", lat: 15.9979, lng: 107.9893, address: "Hòa Ninh, Hòa Vang, Đà Nẵng", rating: 4.9, reviews: 15230, hours: "7:00 – 22:00", desc: "Thiên đường trên mây với cầu Vàng nổi tiếng thế giới", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop", tag: "Top 1", attractionType: "giải trí" },
  { id: 202, category: "attraction", name: "Cầu Rồng", lat: 16.0615, lng: 108.2272, address: "Nguyễn Văn Linh, Hải Châu, Đà Nẵng", rating: 4.8, reviews: 12340, hours: "Phun lửa: 21:00 T7, CN", desc: "Biểu tượng Đà Nẵng phun lửa và nước mỗi cuối tuần", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&auto=format&fit=crop", tag: "Icon", attractionType: "di tích" },
  { id: 203, category: "attraction", name: "Phố cổ Hội An", lat: 15.8801, lng: 108.3380, address: "Hội An, Quảng Nam", rating: 4.9, reviews: 22100, hours: "Mở cửa 24/7", desc: "Di sản văn hóa UNESCO với đèn lồng rực rỡ sắc màu", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&auto=format&fit=crop", tag: "UNESCO", attractionType: "di tích" },
  { id: 204, category: "attraction", name: "Ngũ Hành Sơn", lat: 16.0022, lng: 108.2641, address: "Ngũ Hành Sơn, Đà Nẵng", rating: 4.7, reviews: 8900, hours: "7:00 – 17:00", desc: "Cụm núi đá vôi kỳ vĩ với hang động và chùa chiền cổ", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&auto=format&fit=crop", tag: "Thiên nhiên", attractionType: "tự nhiên" },
  { id: 205, category: "attraction", name: "Bán đảo Sơn Trà", lat: 16.1144, lng: 108.2763, address: "Sơn Trà, Đà Nẵng", rating: 4.8, reviews: 6750, hours: "5:00 – 22:00", desc: "Rừng nhiệt đới nguyên sinh và chùa Linh Ứng linh thiêng", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&auto=format&fit=crop", tag: "Sinh thái", attractionType: "tự nhiên" },
];
const restaurantData: Location[] = [
  { id: 301, category: "restaurant", name: "Nhà hàng Trần", lat: 16.0825, lng: 108.2438, address: "Hoàng Sa, Sơn Trà, Đà Nẵng", rating: 4.7, reviews: 2890, hours: "10:00 – 23:00", desc: "Hải sản tươi sống ngon nhất Đà Nẵng, view biển tuyệt đẹp", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop", tag: "Hải sản", cuisine: "hải sản", priceRange: "200k–500k" },
  { id: 302, category: "restaurant", name: "Madame Lân", lat: 16.0695, lng: 108.2218, address: "4 Bạch Đằng, Hải Châu, Đà Nẵng", rating: 4.6, reviews: 4210, hours: "9:00 – 22:00", desc: "Nhà hàng Việt truyền thống view sông Hàn lãng mạn", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop", tag: "Việt Nam", cuisine: "việt nam", priceRange: "100k–200k" },
  { id: 303, category: "restaurant", name: "Waterfront Restaurant", lat: 16.0710, lng: 108.2230, address: "150-152 Bạch Đằng, Hải Châu", rating: 4.5, reviews: 1820, hours: "11:00 – 23:00", desc: "Nhà hàng quốc tế sang trọng bên bờ sông Hàn", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&auto=format&fit=crop", tag: "Quốc tế", cuisine: "quốc tế", priceRange: "300k–700k" },
];
const beachData: Location[] = [
  { id: 401, category: "beach", name: "Bãi biển Mỹ Khê", lat: 16.0630, lng: 108.2472, address: "Phước Mỹ, Sơn Trà, Đà Nẵng", rating: 4.9, reviews: 8412, hours: "Mở cửa 24/7", desc: "Bãi biển đẹp nhất hành tinh, cát trắng mịn dài 9km", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop", tag: "Nổi tiếng", district: "Sơn Trà" },
  { id: 402, category: "beach", name: "Bãi biển Non Nước", lat: 16.0030, lng: 108.2653, address: "Hòa Hải, Ngũ Hành Sơn, Đà Nẵng", rating: 4.7, reviews: 5230, hours: "Mở cửa 24/7", desc: "Bãi biển thơ mộng bên chân núi Ngũ Hành Sơn", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&auto=format&fit=crop", tag: "Yên tĩnh", district: "Ngũ Hành Sơn" },
  { id: 403, category: "beach", name: "Bãi biển Mân Thái", lat: 16.1050, lng: 108.2645, address: "Mân Thái, Sơn Trà, Đà Nẵng", rating: 4.6, reviews: 2100, hours: "Mở cửa 24/7", desc: "Bãi biển hoang sơ ít người biết đến, nước trong xanh", image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=400&auto=format&fit=crop", tag: "Hoang sơ", district: "Sơn Trà" },
];
const dishData: Dish[] = [
  { id: 501, name: "Mì Quảng", tag: "Đặc sản số 1", dishType: "bún & mì", area: "Đà Nẵng", desc: "Sợi mì vàng đặc trưng với nước dùng đậm đà, nhân tôm thịt, rau sống và bánh tráng giòn", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop", lat: 16.0600, lng: 108.2100, restaurants: [
    { id: 5011, name: "Mì Quảng 1A", address: "1 Hải Phòng, Hải Châu", lat: 16.0612, lng: 108.2115, rating: 4.8, reviews: 3200, hours: "6:00–14:00", priceRange: "35k–50k", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop" },
    { id: 5012, name: "Mì Quảng Bà Mua", address: "19 Trần Bình Trọng", lat: 16.0644, lng: 108.2088, rating: 4.7, reviews: 1870, hours: "6:00–13:00", priceRange: "30k–45k", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop" },
    { id: 5013, name: "Mì Quảng Phú Chiêm", address: "45 Ngô Gia Tự", lat: 16.0588, lng: 108.2130, rating: 4.6, reviews: 2450, hours: "7:00–14:00", priceRange: "30k–40k", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop" },
  ]},
  { id: 502, name: "Bánh Mì Đà Nẵng", tag: "Phải thử", dishType: "bánh & xôi", area: "Cả hai", desc: "Bánh mì giòn với thịt nướng, pa tê và rau sống – đặc sản đường phố Đà Nẵng", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop", lat: 16.0720, lng: 108.2260, restaurants: [
    { id: 5021, name: "Bánh Mì Bà Lan", address: "26 Thái Phiên, Hải Châu", lat: 16.0735, lng: 108.2271, rating: 4.9, reviews: 5600, hours: "6:00–20:00", priceRange: "20k–35k", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&auto=format&fit=crop" },
    { id: 5022, name: "Bánh Mì Phượng Hội An", address: "2B Phan Châu Trinh, Hội An", lat: 15.8790, lng: 108.3360, rating: 4.8, reviews: 8900, hours: "6:30–21:30", priceRange: "25k–40k", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&auto=format&fit=crop" },
  ]},
  { id: 503, name: "Bún Chả Cá", tag: "Đặc sản biển", dishType: "bún & mì", area: "Đà Nẵng", desc: "Bún nước với chả cá thơm ngon, vị đặc trưng của người Đà Nẵng qua nhiều thế hệ", image: "https://images.unsplash.com/photo-1556040220-4096d522378d?w=400&auto=format&fit=crop", lat: 16.0480, lng: 108.2340, restaurants: [
    { id: 5031, name: "Bún Chả Cá Ngô Thì Nhậm", address: "10 Ngô Thì Nhậm", lat: 16.0490, lng: 108.2350, rating: 4.7, reviews: 2100, hours: "6:00–11:00", priceRange: "25k–40k", image: "https://images.unsplash.com/photo-1556040220-4096d522378d?w=200&auto=format&fit=crop" },
    { id: 5032, name: "Bún Chả Cá Bà Hiền", address: "64 Phan Chu Trinh", lat: 16.0510, lng: 108.2320, rating: 4.6, reviews: 1430, hours: "6:30–11:30", priceRange: "20k–35k", image: "https://images.unsplash.com/photo-1556040220-4096d522378d?w=200&auto=format&fit=crop" },
    { id: 5033, name: "Bún Chả Cá Hoàng", address: "28 Lê Hồng Phong", lat: 16.0460, lng: 108.2360, rating: 4.5, reviews: 980, hours: "6:00–12:00", priceRange: "20k–30k", image: "https://images.unsplash.com/photo-1556040220-4096d522378d?w=200&auto=format&fit=crop" },
  ]},
  { id: 504, name: "Cao Lầu Hội An", tag: "Di sản ẩm thực", dishType: "đặc sản", area: "Hội An", desc: "Món mì đặc biệt chỉ có tại Hội An, nước tro và giếng cổ làm nên hương vị độc nhất", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop", lat: 15.8810, lng: 108.3370, restaurants: [
    { id: 5041, name: "Cao Lầu Bà Bé", address: "45 Trần Phú, Hội An", lat: 15.8798, lng: 108.3382, rating: 4.8, reviews: 3400, hours: "8:00–20:00", priceRange: "40k–60k", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop" },
    { id: 5042, name: "Cao Lầu Thanh", address: "26 Thái Phiên, Hội An", lat: 15.8820, lng: 108.3355, rating: 4.7, reviews: 2100, hours: "7:00–21:00", priceRange: "35k–55k", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop" },
  ]},
  { id: 505, name: "Bánh Xèo Đà Nẵng", tag: "Giòn tan", dishType: "bánh & xôi", area: "Đà Nẵng", desc: "Bánh xèo nhân tôm thịt giòn rụm, ăn kèm rau sống và mắm chua ngọt đặc trưng xứ Quảng", image: "https://images.unsplash.com/photo-1563379091339-03246963d96e?w=400&auto=format&fit=crop", lat: 16.0550, lng: 108.2050, restaurants: [
    { id: 5051, name: "Bánh Xèo Bà Dưỡng", address: "280/23 Hoàng Diệu, Hải Châu", lat: 16.0560, lng: 108.2065, rating: 4.9, reviews: 7200, hours: "10:00–21:00", priceRange: "30k–55k", image: "https://images.unsplash.com/photo-1563379091339-03246963d96e?w=200&auto=format&fit=crop" },
    { id: 5052, name: "Bánh Xèo Trần Quý Cáp", address: "18 Trần Quý Cáp, Hải Châu", lat: 16.0545, lng: 108.2040, rating: 4.6, reviews: 3100, hours: "9:00–20:00", priceRange: "25k–45k", image: "https://images.unsplash.com/photo-1563379091339-03246963d96e?w=200&auto=format&fit=crop" },
  ]},
  { id: 506, name: "Cơm Gà Hội An", tag: "Hội An chuẩn vị", dishType: "đặc sản", area: "Hội An", desc: "Cơm trắng dẻo với gà ta luộc xé phay, nước dùng vàng óng và tương ớt đặc biệt", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&auto=format&fit=crop", lat: 15.8795, lng: 108.3345, restaurants: [
    { id: 5061, name: "Cơm Gà Bà Buội", address: "22 Trần Phú, Hội An", lat: 15.8800, lng: 108.3358, rating: 4.8, reviews: 4500, hours: "8:00–18:00", priceRange: "40k–70k", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&auto=format&fit=crop" },
    { id: 5062, name: "Cơm Gà Hải Nam Phương", address: "6 Hoàng Diệu, Hội An", lat: 15.8782, lng: 108.3340, rating: 4.7, reviews: 2800, hours: "7:30–19:00", priceRange: "35k–60k", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&auto=format&fit=crop" },
  ]},
];

const allLocations: Location[] = [...hotelData, ...attractionData, ...restaurantData, ...beachData];
const ITEMS_PER_PAGE = 6;
const dishEmojiMap: Record<number, string> = { 501: "🍜", 502: "🥖", 503: "🐟", 504: "🍝", 505: "🥞", 506: "🍗" };

// ─── MARKER ICON — glowing circle, no pin ────────────────────────────────────

function markerSvg(color: string, emoji: string, selected: boolean) {
  const s = selected ? 56 : 44;
  const r = s / 2;
  // Three concentric rings: outer glow → mid halo → inner solid
  const svg = `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${r}" cy="${r}" r="${r - 1}"   fill="${color}" opacity="${selected ? 0.18 : 0.12}"/>
    <circle cx="${r}" cy="${r}" r="${r * 0.68}" fill="${color}" opacity="${selected ? 0.32 : 0.22}"/>
    <circle cx="${r}" cy="${r}" r="${r * 0.48}" fill="${color}" opacity="${selected ? 1 : 0.88}"/>
    <circle cx="${r}" cy="${r}" r="${r * 0.48}" fill="none" stroke="white" stroke-width="${selected ? 2.2 : 1.6}" opacity="0.95"/>
    <text x="${r}" y="${r + 5}" text-anchor="middle" font-size="${selected ? 18 : 14}" dominant-baseline="auto">${emoji}</text>
  </svg>`;
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: { width: s, height: s } as google.maps.Size,
    anchor: { x: r, y: r } as google.maps.Point,
  };
}

// ─── MAP DARK STYLES ─────────────────────────────────────────────────────────

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { featureType: "all",                      elementType: "geometry",           stylers: [{ color: "#1a1a2e" }] },
  { featureType: "water",                    elementType: "geometry",           stylers: [{ color: "#0d2e6e" }] },
  { featureType: "water",                    elementType: "labels.text.fill",   stylers: [{ color: "#4a90d9" }] },
  { featureType: "road",                     elementType: "geometry",           stylers: [{ color: "#2a2a40" }] },
  { featureType: "road.arterial",            elementType: "geometry",           stylers: [{ color: "#32325c" }] },
  { featureType: "road.highway",             elementType: "geometry",           stylers: [{ color: "#3d3d60" }] },
  { featureType: "poi",                      elementType: "geometry",           stylers: [{ color: "#222238" }] },
  { featureType: "poi.park",                 elementType: "geometry",           stylers: [{ color: "#1a3028" }] },
  { featureType: "transit",                  elementType: "geometry",           stylers: [{ color: "#222238" }] },
  {                                          elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2e" }] },
  {                                          elementType: "labels.text.fill",   stylers: [{ color: "#7888aa" }] },
  { featureType: "administrative.locality",  elementType: "labels.text.fill",   stylers: [{ color: "#b0c4de" }] },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function TouristMapPage() {
  const mapsReady = useGoogleMaps(import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "");
  const { isDark } = useDarkMode();

  const mapDivRef    = useRef<HTMLDivElement>(null);
  const gmapRef      = useRef<google.maps.Map | null>(null);
  const markersRef   = useRef<google.maps.Marker[]>([]);
  const infoWinRef   = useRef<google.maps.InfoWindow | null>(null);

  const [activeCategory, setActiveCategory] = useState("hotel");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [expandedDishId, setExpandedDishId] = useState<number | null>(null);
  const [liked, setLiked] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const [hf, setHf] = useState({ stars: [] as number[], type: [] as string[], city: [] as string[] });
  const [af, setAf] = useState({ type: [] as string[] });
  const [rf, setRf] = useState({ cuisine: [] as string[] });
  const [bf, setBf] = useState({ district: [] as string[] });
  const [df, setDf] = useState({ dishType: [] as string[], area: [] as string[] });

  const cat = categories.find(c => c.id === activeCategory)!;
  const toggle = <T,>(arr: T[], v: T): T[] => arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];

  // theme helpers
  const D = isDark;
  const sb  = D ? "bg-[#0f0f1e] border-white/5"  : "bg-white border-gray-100";
  const sbB = D ? "border-white/5"                : "border-gray-100";
  const tx  = D ? "text-white"                    : "text-gray-900";
  const txS = D ? "text-white/45"                 : "text-gray-400";
  const txM = D ? "text-white/70"                 : "text-gray-600";
  const inp = D ? "bg-white/5 border-white/8"     : "bg-gray-50 border-gray-200";
  const cardBg  = D ? "bg-white/[0.02] border-white/5 hover:border-white/12"    : "bg-white border-gray-100 hover:border-gray-300 shadow-sm hover:shadow";
  const cardAct = D ? "border-white/20 bg-white/5"                               : "border-gray-300 bg-gray-50 shadow-md";
  const dishAct = D ? "border-rose-400/40 bg-rose-500/5"                         : "border-rose-300 bg-rose-50 shadow-sm";
  const dishDef = D ? "border-white/5 hover:border-white/15 bg-white/[0.02]"     : "bg-white border-gray-100 hover:border-gray-300 shadow-sm hover:shadow";
  const pgBtn   = D ? "text-white/30 hover:text-white/60"                        : "text-gray-400 hover:text-gray-700";
  const mapCtrl = D ? "bg-[#0f0f1e]/90 border-white/10 text-white/60 hover:text-white hover:bg-white/10" : "bg-white/95 border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 shadow-sm";
  const statusBar = D ? "bg-[#0f0f1e]/80 border-white/8 text-white/50"           : "bg-white/95 border-gray-200 text-gray-500 shadow-sm";

  // ── filtered list ──
  const filteredList = useCallback((): (Location | Dish)[] => {
    if (activeCategory === "dish") {
      let dl = dishData.filter(d => !search || d.name.toLowerCase().includes(search.toLowerCase()));
      if (df.dishType.length) dl = dl.filter(d => df.dishType.includes(d.dishType));
      if (df.area.length)     dl = dl.filter(d => df.area.includes(d.area) || d.area === "Cả hai");
      return dl;
    }
    let list = allLocations.filter(l => l.category === activeCategory);
    if (search) list = list.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.address.toLowerCase().includes(search.toLowerCase()));
    if (activeCategory === "hotel") {
      if (hf.stars.length) list = list.filter(l => hf.stars.includes(l.stars!));
      if (hf.type.length)  list = list.filter(l => hf.type.includes(l.hotelType!));
      if (hf.city.length)  list = list.filter(l => hf.city.includes(l.city!));
    }
    if (activeCategory === "attraction" && af.type.length)    list = list.filter(l => af.type.includes(l.attractionType!));
    if (activeCategory === "restaurant" && rf.cuisine.length) list = list.filter(l => rf.cuisine.includes(l.cuisine!));
    if (activeCategory === "beach" && bf.district.length)     list = list.filter(l => bf.district.includes(l.district!));
    return list;
  }, [activeCategory, search, hf, af, rf, bf, df])();

  const totalPages  = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const pageItems   = filteredList.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE) as Location[];
  const selLoc      = selectedId ? allLocations.find(l => l.id === selectedId) : null;
  const selDish     = expandedDishId ? dishData.find(d => d.id === expandedDishId) : null;
  const selDishRest = selDish && selectedId ? selDish.restaurants.find(r => r.id === selectedId) : null;

  useEffect(() => { setPage(1); setSelectedId(null); setExpandedDishId(null); }, [activeCategory, search]);

  // ── init map ──
  useEffect(() => {
    if (!mapsReady || !mapDivRef.current || gmapRef.current) return;
    gmapRef.current = new google.maps.Map(mapDivRef.current, {
      center: DANANG_CENTER, zoom: 12,
      disableDefaultUI: true, styles: isDark ? MAP_STYLES : [],
    });
  }, [mapsReady, isDark]);

  // ── update map styles when dark mode changes ──
  useEffect(() => {
    if (!gmapRef.current) return;
    gmapRef.current.setOptions({ styles: isDark ? MAP_STYLES : [] });
  }, [isDark]);


  // ── InfoWindow for selected regular location ──
  useEffect(() => {
    if (!mapsReady || !gmapRef.current) return;
    if (activeCategory === "dish") return; // handled by dish effect below
    if (!infoWinRef.current) {
      infoWinRef.current = new google.maps.InfoWindow({ disableAutoPan: false });
    }
    const iw = infoWinRef.current;
    iw.close();
    if (!selLoc) return;

    const bg   = isDark ? "#0d0d1a"             : "#ffffff";
    const border = isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb";
    const name = isDark ? "#f1f5f9"             : "#111827";
    const sub  = isDark ? "rgba(255,255,255,0.4)" : "#6b7280";
    const btn  = `linear-gradient(135deg,${cat.g1},${cat.g2})`;

    iw.setContent(`
      <div style="background:${bg};border:${border};border-radius:14px;overflow:hidden;width:220px;font-family:system-ui,sans-serif;box-shadow:0 8px 32px rgba(0,0,0,0.18)">
        <div style="position:relative;height:90px">
          <img src="${selLoc.image}" style="width:100%;height:100%;object-fit:cover" />
          <div style="position:absolute;inset:0;background:linear-gradient(to top,${bg} 0%,transparent 60%)"></div>
          <span style="position:absolute;bottom:6px;left:10px;font-size:9px;font-weight:700;color:#fff;background:${btn};padding:2px 8px;border-radius:99px">${selLoc.tag || cat.label}</span>
        </div>
        <div style="padding:10px 12px 12px">
          <div style="font-weight:700;font-size:13px;color:${name};margin-bottom:4px;line-height:1.3">${selLoc.name}</div>
          <div style="font-size:10px;color:${sub};margin-bottom:3px">⭐ ${selLoc.rating} &nbsp;·&nbsp; 🕐 ${selLoc.hours}</div>
          <div style="font-size:10px;color:${sub};line-height:1.5;margin-bottom:8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${selLoc.desc}</div>
          ${selLoc.slug
            ? `<a href="/luu-tru-khach-san/${selLoc.slug}" style="display:flex;align-items:center;justify-content:center;gap:4px;padding:7px;background:${btn};color:#fff;border-radius:9px;font-size:11px;font-weight:700;text-decoration:none">Xem chi tiết →</a>`
            : `<div style="display:flex;align-items:center;justify-content:center;gap:4px;padding:7px;background:${btn};color:#fff;border-radius:9px;font-size:11px;font-weight:700;cursor:pointer">Xem chi tiết →</div>`}
        </div>
      </div>`);
    iw.setOptions({ pixelOffset: new google.maps.Size(0, -8) });
    iw.setPosition({ lat: selLoc.lat, lng: selLoc.lng });
    google.maps.event.clearListeners(iw, "closeclick");
    iw.addListener("closeclick", () => setSelectedId(null));
    iw.open(gmapRef.current);
  }, [mapsReady, selectedId, isDark, activeCategory]);

  // ── InfoWindow for dish mode: only when a restaurant is selected ──
  useEffect(() => {
    if (!mapsReady || !gmapRef.current || activeCategory !== "dish") return;
    if (!infoWinRef.current) {
      infoWinRef.current = new google.maps.InfoWindow({ disableAutoPan: false });
    }
    const iw = infoWinRef.current;
    iw.close();
    if (!selDishRest || !selDish) return;

    const bg    = isDark ? "#0d0d1a" : "#ffffff";
    const bdr   = isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #fce7f3";
    const nameC = isDark ? "#f1f5f9" : "#111827";
    const subC  = isDark ? "rgba(255,255,255,0.42)" : "#6b7280";

    iw.setContent(`
      <div style="background:${bg};border:${bdr};border-radius:14px;overflow:hidden;width:220px;font-family:system-ui,sans-serif;box-shadow:0 8px 32px rgba(0,0,0,0.20)">
        <div style="position:relative;height:80px">
          <img src="${selDishRest.image}" style="width:100%;height:100%;object-fit:cover" />
          <div style="position:absolute;inset:0;background:linear-gradient(to top,${bg},transparent 60%)"></div>
          <span style="position:absolute;bottom:7px;left:10px;font-size:9px;font-weight:700;color:#fff;background:linear-gradient(135deg,#f43f5e,#ec4899);padding:2px 8px;border-radius:99px">${selDish.name}</span>
        </div>
        <div style="padding:10px 12px 12px">
          <div style="font-weight:700;font-size:13px;color:${nameC};margin-bottom:5px;line-height:1.3">${selDishRest.name}</div>
          <div style="font-size:10px;color:${subC};margin-bottom:2px">📍 ${selDishRest.address}</div>
          <div style="font-size:10px;color:${subC};margin-bottom:2px">🕐 ${selDishRest.hours}</div>
          <div style="font-size:10px;color:${subC}">⭐ ${selDishRest.rating} &nbsp;·&nbsp; 💰 ${selDishRest.priceRange}</div>
        </div>
      </div>`);
    iw.setOptions({ pixelOffset: new google.maps.Size(0, -8) });
    iw.setPosition({ lat: selDishRest.lat, lng: selDishRest.lng });
    google.maps.event.clearListeners(iw, "closeclick");
    iw.addListener("closeclick", () => setSelectedId(null));
    iw.open(gmapRef.current);
  }, [mapsReady, selectedId, isDark, activeCategory]);

  // ── rebuild markers ──
  useEffect(() => {
    if (!mapsReady || !gmapRef.current) return;
    const gmap = gmapRef.current;
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    const mkIcon = (color: string, emoji: string, selected: boolean) => {
      const ic = markerSvg(color, emoji, selected);
      return { url: ic.url, scaledSize: new google.maps.Size(ic.scaledSize.width, ic.scaledSize.height), anchor: new google.maps.Point(ic.anchor.x, ic.anchor.y) };
    };

    if (activeCategory === "dish") {
      (filteredList as Dish[]).forEach(dish => {
        const sel = expandedDishId === dish.id;
        const m = new google.maps.Marker({ map: gmap, position: { lat: dish.lat, lng: dish.lng }, icon: mkIcon("#f43f5e", dishEmojiMap[dish.id] || "🍜", sel) });
        m.addListener("click", () => {
          setExpandedDishId(p => { const n = p === dish.id ? null : dish.id; if (n) { gmap.panTo({ lat: dish.lat, lng: dish.lng }); gmap.setZoom(14); } return n; });
          setSelectedId(null);
        });
        markersRef.current.push(m);
      });
      if (selDish) {
        selDish.restaurants.forEach(r => {
          const sel = selectedId === r.id;
          const m = new google.maps.Marker({ map: gmap, position: { lat: r.lat, lng: r.lng }, icon: mkIcon("#fb923c", "🏪", sel) });
          m.addListener("click", () => { setSelectedId(p => p === r.id ? null : r.id); gmap.panTo({ lat: r.lat, lng: r.lng }); gmap.setZoom(17); });
          markersRef.current.push(m);
        });
      }
    } else {
      (filteredList as Location[]).forEach(loc => {
        const sel = selectedId === loc.id;
        const m = new google.maps.Marker({ map: gmap, position: { lat: loc.lat, lng: loc.lng }, icon: mkIcon(cat.g1, cat.emoji, sel), animation: sel ? google.maps.Animation.BOUNCE : undefined });
        m.addListener("click", () => {
          setSelectedId(p => { const n = p === loc.id ? null : loc.id; if (n) { gmap.panTo({ lat: loc.lat, lng: loc.lng }); gmap.setZoom(16); } return n; });
        });
        markersRef.current.push(m);
      });
    }
  }, [mapsReady, filteredList, activeCategory, expandedDishId, selectedId, selDish, cat]);

  const panTo = (lat: number, lng: number, zoom = 16) => { gmapRef.current?.panTo({ lat, lng }); gmapRef.current?.setZoom(zoom); };

  // ── render ──
  const filterLabel = D ? "text-white/30" : "text-gray-400";
  const chipOff     = D ? "border-white/10 text-white/40 hover:border-white/25 hover:text-white/70" : "border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-700";

  return (
    <div className={`flex h-[calc(100vh-56px)] overflow-hidden ${D ? "bg-[#0d0d1a]" : "bg-gray-100"}`}>

      {/* ─── SIDEBAR ─── */}
      <motion.aside initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}
        className={`w-[400px] shrink-0 flex flex-col overflow-hidden border-r ${sb}`}>

        {/* header */}
        <div className={`px-4 pt-4 pb-3 border-b ${sbB}`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Map size={15} className="text-white" />
            </div>
            <div>
              <h1 className={`font-bold text-sm leading-none ${tx}`}>Bản đồ Du lịch</h1>
              <p className={`text-[10px] mt-0.5 ${txS}`}>Đà Nẵng · Hội An</p>
            </div>
          </div>
        </div>

        {/* circular category icons */}
        <div className={`px-3 pt-5 pb-4 border-b ${sbB}`}>
          <div className="flex justify-between">
            {categories.map(c => {
              const active = activeCategory === c.id;
              return (
                <button key={c.id} onClick={() => { setActiveCategory(c.id); setShowFilters(false); }}
                  className="flex flex-col items-center gap-1.5 group">
                  <div className={`rounded-full flex items-center justify-center transition-all duration-300 ${
                    active ? "w-14 h-14" : "w-10 h-10 opacity-65 group-hover:opacity-90 group-hover:scale-110"
                  }`}
                    style={{
                      background: `linear-gradient(135deg, ${c.g1}, ${c.g2})`,
                      boxShadow: active ? `0 0 22px ${c.g1}80, 0 4px 16px ${c.g1}50` : `0 2px 8px ${c.g1}30`,
                    }}>
                    <c.icon size={active ? 22 : 17} className="text-white transition-all duration-300" />
                  </div>
                  <span className={`text-[9px] font-semibold leading-tight text-center max-w-[58px] transition-colors ${active ? tx : txS}`}>
                    {c.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* search + filter toggle */}
        <div className={`px-3 py-2 border-b ${sbB} flex gap-2`}>
          <div className={`flex items-center gap-2 border rounded-xl px-3 py-2 flex-1 ${inp}`}>
            <Search size={13} className={`${txS} shrink-0`} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Tìm ${cat.label.toLowerCase()}...`}
              className={`bg-transparent text-xs focus:outline-none flex-1 ${txM} ${D ? "placeholder:text-white/25" : "placeholder:text-gray-400"}`} />
            {search && <button onClick={() => setSearch("")}><X size={11} className={txS} /></button>}
          </div>
          <button onClick={() => setShowFilters(v => !v)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-[11px] font-medium transition-all ${showFilters
              ? D ? "bg-white/10 border-white/20 text-white" : "bg-gray-100 border-gray-300 text-gray-700"
              : D ? "border-white/10 text-white/40 hover:border-white/20 hover:text-white/70" : "border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600"}`}>
            <SlidersHorizontal size={12} />
            <ChevronDown size={10} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* filters — collapsible */}
        <AnimatePresence>
          {showFilters && (
            <motion.div key="filters" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
              className={`overflow-hidden border-b ${sbB}`}>
              <div className="px-3 py-2.5 space-y-2">
                {activeCategory === "hotel" && <>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className={`text-[10px] ${filterLabel}`}>Sao:</span>
                    {[5,4,3].map(s => <button key={s} onClick={() => setHf(f => ({ ...f, stars: toggle(f.stars, s) }))}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium border transition-all ${hf.stars.includes(s) ? "bg-amber-500/15 border-amber-400/60 text-amber-500" : chipOff}`}>{"★".repeat(s)}</button>)}
                    <span className={`text-[10px] ml-1 ${filterLabel}`}>Loại:</span>
                    {["resort","hotel","boutique"].map(t => <button key={t} onClick={() => setHf(f => ({ ...f, type: toggle(f.type, t) }))}
                      className={`px-2 py-0.5 rounded-full text-[10px] border capitalize transition-all ${hf.type.includes(t) ? "bg-teal-500/15 border-teal-500/60 text-teal-600" : chipOff}`}>{t}</button>)}
                  </div>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className={`text-[10px] ${filterLabel}`}>Thành phố:</span>
                    {["Đà Nẵng","Hội An"].map(c => <button key={c} onClick={() => setHf(f => ({ ...f, city: toggle(f.city, c) }))}
                      className={`px-2 py-0.5 rounded-full text-[10px] border transition-all ${hf.city.includes(c) ? "bg-emerald-500/15 border-emerald-500/60 text-emerald-600" : chipOff}`}>{c}</button>)}
                  </div>
                </>}
                {activeCategory === "attraction" && (
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className={`text-[10px] ${filterLabel}`}>Loại hình:</span>
                    {["di tích","tự nhiên","giải trí"].map(t => <button key={t} onClick={() => setAf(f => ({ ...f, type: toggle(f.type, t) }))}
                      className={`px-2 py-0.5 rounded-full text-[10px] border capitalize transition-all ${af.type.includes(t) ? "bg-violet-500/15 border-violet-500/60 text-violet-600" : chipOff}`}>{t}</button>)}
                  </div>
                )}
                {activeCategory === "restaurant" && (
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className={`text-[10px] ${filterLabel}`}>Ẩm thực:</span>
                    {["hải sản","việt nam","quốc tế"].map(t => <button key={t} onClick={() => setRf(f => ({ ...f, cuisine: toggle(f.cuisine, t) }))}
                      className={`px-2 py-0.5 rounded-full text-[10px] border capitalize transition-all ${rf.cuisine.includes(t) ? "bg-orange-500/15 border-orange-500/60 text-orange-600" : chipOff}`}>{t}</button>)}
                  </div>
                )}
                {activeCategory === "beach" && (
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className={`text-[10px] ${filterLabel}`}>Quận:</span>
                    {["Sơn Trà","Ngũ Hành Sơn"].map(d => <button key={d} onClick={() => setBf(f => ({ ...f, district: toggle(f.district, d) }))}
                      className={`px-2 py-0.5 rounded-full text-[10px] border transition-all ${bf.district.includes(d) ? "bg-sky-500/15 border-sky-500/60 text-sky-600" : chipOff}`}>{d}</button>)}
                  </div>
                )}
                {activeCategory === "dish" && <>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className={`text-[10px] ${filterLabel}`}>Loại:</span>
                    {["bún & mì","bánh & xôi","đặc sản"].map(t => <button key={t} onClick={() => setDf(f => ({ ...f, dishType: toggle(f.dishType, t) }))}
                      className={`px-2 py-0.5 rounded-full text-[10px] border capitalize transition-all ${df.dishType.includes(t) ? "bg-rose-500/15 border-rose-500/60 text-rose-500" : chipOff}`}>{t}</button>)}
                  </div>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className={`text-[10px] ${filterLabel}`}>Khu vực:</span>
                    {["Đà Nẵng","Hội An"].map(a => <button key={a} onClick={() => setDf(f => ({ ...f, area: toggle(f.area, a) }))}
                      className={`px-2 py-0.5 rounded-full text-[10px] border transition-all ${df.area.includes(a) ? "bg-pink-500/15 border-pink-500/60 text-pink-600" : chipOff}`}>{a}</button>)}
                  </div>
                </>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* list header */}
        <div className={`px-3 py-2 flex items-center justify-between border-b ${sbB}`}>
          <span className={`text-[10px] ${txS}`}>
            <span className={`font-semibold ${txM}`}>{filteredList.length}</span> kết quả
          </span>
          <div className="flex items-center gap-1">
            <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? D ? "bg-white/10 text-white" : "bg-gray-100 text-gray-700" : txS}`}><List size={12} /></button>
            <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? D ? "bg-white/10 text-white" : "bg-gray-100 text-gray-700" : txS}`}><Grid3X3 size={12} /></button>
          </div>
        </div>

        {/* list body */}
        <div className="flex-1 overflow-y-auto scrollbar-none">
          {filteredList.length === 0 ? (
            <div className={`flex flex-col items-center justify-center h-32 text-xs ${txS}`}>
              <MapPin size={20} className="mb-2 opacity-40" />Không có kết quả
            </div>
          ) : activeCategory === "dish" ? (
            <AnimatePresence mode="wait">
              {selDish ? (
                /* ═══ DRILL-DOWN: restaurant list for selected dish ═══ */
                <motion.div key="rest-view" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 28 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                  {/* Back bar */}
                  <div onClick={() => { setExpandedDishId(null); setSelectedId(null); }}
                    role="button"
                    className={`sticky top-0 z-10 flex items-center gap-2 px-3 py-2.5 border-b cursor-pointer transition-colors ${sb} ${sbB} hover:${D ? "bg-white/5" : "bg-gray-50"}`}>
                    <ChevronLeft size={14} className="text-rose-400 shrink-0" />
                    <span className={`text-xs font-medium ${txM}`}>Tất cả món ngon</span>
                  </div>
                  {/* Dish summary card */}
                  <div className="p-2 pb-1">
                    <div className={`rounded-xl overflow-hidden border ${dishAct}`}>
                      <div className="relative h-[72px]">
                        <img src={selDish.image} alt={selDish.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                        <span className="absolute bottom-2 left-3 text-[9px] font-bold text-white bg-rose-500/80 px-2 py-0.5 rounded-full">{selDish.tag}</span>
                      </div>
                      <div className="px-3 py-2.5">
                        <p className={`font-bold text-sm ${tx}`}>{selDish.name}</p>
                        <p className={`text-[10px] leading-relaxed mt-0.5 ${txS}`}>{selDish.desc}</p>
                      </div>
                    </div>
                  </div>
                  {/* Restaurant count */}
                  <div className={`px-3 pt-1 pb-1.5 text-[10px] font-semibold ${txS}`}>{selDish.restaurants.length} quán phục vụ món này</div>
                  {/* Restaurant list */}
                  <div className="px-2 pb-3 space-y-1.5">
                    {selDish.restaurants.map((r, i) => {
                      const sel = selectedId === r.id;
                      return (
                        <motion.div key={r.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                          <div onClick={() => { setSelectedId(sel ? null : r.id); if (!sel) panTo(r.lat, r.lng, 17); }}
                            role="button"
                            className={`rounded-xl border cursor-pointer p-2.5 flex gap-2.5 items-center transition-all ${sel
                              ? D ? "border-rose-400/40 bg-rose-500/10" : "border-rose-300 bg-rose-50"
                              : D ? "border-white/5 hover:border-white/15 bg-white/[0.02]" : "bg-white border-gray-100 hover:border-gray-300 shadow-sm"}`}>
                            <img src={r.image} alt={r.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className={`font-semibold text-[11px] leading-tight ${sel ? "text-rose-400" : tx}`}>{r.name}</p>
                              <p className={`text-[10px] truncate mt-0.5 ${txS}`}>{r.address}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-amber-500 text-[10px] font-semibold">⭐ {r.rating}</span>
                                <span className={`text-[10px] ${txS}`}>· {r.priceRange}</span>
                              </div>
                            </div>
                            {sel
                              ? <div className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                              : <ChevronRight size={12} className={`shrink-0 ${txS}`} />}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                /* ═══ DISH LIST view ═══ */
                <motion.div key="dish-list" initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                  {viewMode === "grid" ? (
                    /* Grid layout */
                    <div className="p-2 grid grid-cols-2 gap-2">
                      {(filteredList as Dish[]).map((dish, i) => (
                        <motion.div key={dish.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                          <div onClick={() => { setExpandedDishId(dish.id); setSelectedId(null); panTo(dish.lat, dish.lng, 13); }}
                            role="button" className={`rounded-xl border cursor-pointer transition-all overflow-hidden ${dishDef}`}>
                            <div className="relative h-28 overflow-hidden">
                              <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                              <span className="absolute bottom-2 left-2 text-[9px] font-bold text-white bg-rose-500/80 px-1.5 py-0.5 rounded-full leading-none">{dish.tag}</span>
                              <span className="absolute top-2 right-2 text-[9px] font-medium text-white/80 bg-black/40 px-1.5 py-0.5 rounded-full">{dish.area}</span>
                            </div>
                            <div className="p-2.5">
                              <p className={`font-bold text-xs leading-tight mb-0.5 ${tx}`}>{dish.name}</p>
                              <p className={`text-[10px] line-clamp-2 leading-relaxed ${txS} mb-1`}>{dish.desc}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-rose-500/70 text-[10px]">{dish.restaurants.length} quán</span>
                                <ChevronRight size={11} className={txS} />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    /* List layout */
                    <div className="p-2 space-y-1.5">
                    {(filteredList as Dish[]).map((dish, i) => (
                      <motion.div key={dish.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <div onClick={() => { setExpandedDishId(dish.id); setSelectedId(null); panTo(dish.lat, dish.lng, 13); }}
                          role="button" className={`rounded-xl border cursor-pointer transition-all ${dishDef}`}>
                          <div className="flex gap-2.5 p-2.5 items-center">
                            <img src={dish.image} alt={dish.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                                <p className={`font-semibold text-xs leading-tight ${tx}`}>{dish.name}</p>
                                <span className="text-[9px] text-rose-500 bg-rose-500/10 px-1.5 py-0.5 rounded-full border border-rose-300/40">{dish.tag}</span>
                              </div>
                              <p className={`text-[10px] line-clamp-2 leading-relaxed ${txS}`}>{dish.desc}</p>
                              <p className="text-rose-500/60 text-[10px] mt-0.5">{dish.restaurants.length} quán · {dish.area}</p>
                            </div>
                            <ChevronRight size={13} className={`shrink-0 ${txS}`} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div className={`p-2 ${viewMode === "grid" ? "grid grid-cols-2 gap-2" : "space-y-1.5"}`}>
              <AnimatePresence mode="popLayout">
                {pageItems.map((item, i) => {
                  const active = selectedId === item.id;
                  return (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.04 }}
                      onClick={() => { setSelectedId(active ? null : item.id); if (!active) panTo(item.lat, item.lng); }}
                      role="button" className={`rounded-xl overflow-hidden border cursor-pointer transition-all ${active ? cardAct : cardBg}`}>
                      {viewMode === "grid" ? (
                        <>
                          <div className="h-24 relative overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute top-1.5 right-1.5" onClick={e => { e.stopPropagation(); setLiked(l => toggle(l, item.id)); }}>
                              <div className="w-6 h-6 bg-black/40 rounded-full flex items-center justify-center">
                                <Heart size={10} className={liked.includes(item.id) ? "text-rose-400 fill-rose-400" : "text-white/60"} />
                              </div>
                            </div>
                            {item.tag && <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold text-white bg-black/50 px-1.5 py-0.5 rounded-full">{item.tag}</span>}
                          </div>
                          <div className="p-2">
                            <p className={`font-semibold text-[11px] leading-tight line-clamp-1 ${tx}`}>{item.name}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star size={9} className="text-amber-400 fill-amber-400" />
                              <span className="text-amber-500 text-[10px] font-bold">{item.rating}</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex gap-2.5 p-2.5">
                          <div className="relative shrink-0">
                            <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                            {item.stars && (
                              <div className={`absolute -bottom-1 -right-1 bg-amber-500 rounded-full px-1 py-0.5 text-[8px] text-white font-bold border-2 ${D ? "border-[#0d0d1a]" : "border-white"}`}>{item.stars}★</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1 mb-0.5">
                              <p className={`font-semibold text-[11px] leading-tight line-clamp-1 ${tx}`}>{item.name}</p>
                              <div onClick={e => { e.stopPropagation(); setLiked(l => toggle(l, item.id)); }} className="shrink-0 mt-0.5 cursor-pointer">
                                <Heart size={11} className={liked.includes(item.id) ? "text-rose-400 fill-rose-400" : `${txS} hover:text-rose-400`} />
                              </div>
                            </div>
                            <div className="flex items-center gap-1 mb-0.5">
                              <Star size={9} className="text-amber-400 fill-amber-400" />
                              <span className="text-amber-500 text-[10px] font-bold">{item.rating}</span>
                              <span className={`text-[10px] ${txS}`}>({item.reviews.toLocaleString()})</span>
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] ${txS}`}>
                              <MapPin size={8} className="shrink-0" /><span className="truncate">{item.address}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* pagination */}
        {activeCategory !== "dish" && totalPages > 1 && (
          <div className={`px-3 py-2.5 border-t ${sbB} flex items-center justify-between`}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className={`flex items-center gap-1 text-xs disabled:opacity-30 transition-colors ${pgBtn}`}>
              <ChevronLeft size={12} /> Trước
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`w-5 h-5 rounded-full text-[10px] font-medium transition-all ${page === i + 1 ? "text-white" : pgBtn}`}
                  style={page === i + 1 ? { background: `linear-gradient(135deg, ${cat.g1}, ${cat.g2})` } : {}}>
                  {i + 1}
                </button>
              ))}
            </div>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className={`flex items-center gap-1 text-xs disabled:opacity-30 transition-colors ${pgBtn}`}>
              Sau <ChevronRight size={12} />
            </button>
          </div>
        )}
      </motion.aside>

      {/* ─── MAP ─── */}
      <div className="flex-1 relative">
        {!mapsReady && (
          <div className={`absolute inset-0 flex items-center justify-center z-20 ${D ? "bg-[#0d0d1a]" : "bg-gray-100"}`}>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/40">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}>
                  <Map size={22} className="text-white" />
                </motion.div>
              </div>
              <p className={`text-sm ${txS}`}>Đang tải Google Maps...</p>
            </div>
          </div>
        )}
        <div ref={mapDivRef} className="absolute inset-0" />

        {/* zoom controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button onClick={() => gmapRef.current?.setZoom((gmapRef.current.getZoom() || 12) + 1)}
            className={`w-9 h-9 backdrop-blur border rounded-xl flex items-center justify-center transition-all text-xl font-light ${mapCtrl}`}>+</button>
          <button onClick={() => gmapRef.current?.setZoom((gmapRef.current.getZoom() || 12) - 1)}
            className={`w-9 h-9 backdrop-blur border rounded-xl flex items-center justify-center transition-all text-xl font-light ${mapCtrl}`}>−</button>
          <button onClick={() => { gmapRef.current?.panTo(DANANG_CENTER); gmapRef.current?.setZoom(12); }}
            className={`w-9 h-9 backdrop-blur border rounded-xl flex items-center justify-center transition-all ${mapCtrl}`}>
            <Navigation size={14} />
          </button>
        </div>

        {/* status */}
        <div className={`absolute bottom-4 left-4 z-10 flex items-center gap-2 backdrop-blur border rounded-xl px-3 py-2 ${statusBar}`}>
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-[11px]">{filteredList.length} {cat.label} · Đà Nẵng &amp; Hội An</span>
        </div>

      </div>
    </div>
  );
}
