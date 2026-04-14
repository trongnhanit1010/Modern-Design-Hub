/// <reference types="@types/google.maps" />
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hotel, UtensilsCrossed, Camera, Star,
  Search, Map, ChevronRight, Grid3X3, List, ChevronLeft,
  Waves, MapPin, Heart, X, Navigation, Coffee,
} from "lucide-react";

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
  lat: number; lng: number; tag: string; restaurants: DishRestaurant[];
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
  { id: 501, name: "Mì Quảng", tag: "Đặc sản số 1", desc: "Sợi mì vàng đặc trưng với nước dùng đậm đà, nhân tôm thịt, rau sống và bánh tráng giòn", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop", lat: 16.0600, lng: 108.2100, restaurants: [
    { id: 5011, name: "Mì Quảng 1A", address: "1 Hải Phòng, Hải Châu", lat: 16.0612, lng: 108.2115, rating: 4.8, reviews: 3200, hours: "6:00–14:00", priceRange: "35k–50k", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop" },
    { id: 5012, name: "Mì Quảng Bà Mua", address: "19 Trần Bình Trọng", lat: 16.0644, lng: 108.2088, rating: 4.7, reviews: 1870, hours: "6:00–13:00", priceRange: "30k–45k", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop" },
    { id: 5013, name: "Mì Quảng Phú Chiêm", address: "45 Ngô Gia Tự", lat: 16.0588, lng: 108.2130, rating: 4.6, reviews: 2450, hours: "7:00–14:00", priceRange: "30k–40k", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop" },
  ]},
  { id: 502, name: "Bánh Mì Đà Nẵng", tag: "Phải thử", desc: "Bánh mì giòn với thịt nướng, pa tê và rau sống – đặc sản đường phố Đà Nẵng", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop", lat: 16.0720, lng: 108.2260, restaurants: [
    { id: 5021, name: "Bánh Mì Bà Lan", address: "26 Thái Phiên, Hải Châu", lat: 16.0735, lng: 108.2271, rating: 4.9, reviews: 5600, hours: "6:00–20:00", priceRange: "20k–35k", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&auto=format&fit=crop" },
    { id: 5022, name: "Bánh Mì Phượng Hội An", address: "2B Phan Châu Trinh, Hội An", lat: 15.8790, lng: 108.3360, rating: 4.8, reviews: 8900, hours: "6:30–21:30", priceRange: "25k–40k", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&auto=format&fit=crop" },
  ]},
  { id: 503, name: "Bún Chả Cá", tag: "Đặc sản biển", desc: "Bún nước với chả cá thơm ngon, vị đặc trưng của người Đà Nẵng qua nhiều thế hệ", image: "https://images.unsplash.com/photo-1556040220-4096d522378d?w=400&auto=format&fit=crop", lat: 16.0480, lng: 108.2340, restaurants: [
    { id: 5031, name: "Bún Chả Cá Ngô Thì Nhậm", address: "10 Ngô Thì Nhậm", lat: 16.0490, lng: 108.2350, rating: 4.7, reviews: 2100, hours: "6:00–11:00", priceRange: "25k–40k", image: "https://images.unsplash.com/photo-1556040220-4096d522378d?w=200&auto=format&fit=crop" },
    { id: 5032, name: "Bún Chả Cá Bà Hiền", address: "64 Phan Chu Trinh", lat: 16.0510, lng: 108.2320, rating: 4.6, reviews: 1430, hours: "6:30–11:30", priceRange: "20k–35k", image: "https://images.unsplash.com/photo-1556040220-4096d522378d?w=200&auto=format&fit=crop" },
    { id: 5033, name: "Bún Chả Cá Hoàng", address: "28 Lê Hồng Phong", lat: 16.0460, lng: 108.2360, rating: 4.5, reviews: 980, hours: "6:00–12:00", priceRange: "20k–30k", image: "https://images.unsplash.com/photo-1556040220-4096d522378d?w=200&auto=format&fit=crop" },
  ]},
  { id: 504, name: "Cao Lầu Hội An", tag: "Di sản ẩm thực", desc: "Món mì đặc biệt chỉ có tại Hội An, nước tro và giếng cổ làm nên hương vị độc nhất", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop", lat: 15.8810, lng: 108.3370, restaurants: [
    { id: 5041, name: "Cao Lầu Bà Bé", address: "45 Trần Phú, Hội An", lat: 15.8798, lng: 108.3382, rating: 4.8, reviews: 3400, hours: "8:00–20:00", priceRange: "40k–60k", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop" },
    { id: 5042, name: "Cao Lầu Thanh", address: "26 Thái Phiên, Hội An", lat: 15.8820, lng: 108.3355, rating: 4.7, reviews: 2100, hours: "7:00–21:00", priceRange: "35k–55k", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop" },
  ]},
];

const allLocations: Location[] = [...hotelData, ...attractionData, ...restaurantData, ...beachData];
const ITEMS_PER_PAGE = 6;
const dishEmojiMap: Record<number, string> = { 501: "🍜", 502: "🥖", 503: "🐟", 504: "🍝" };

// ─── MARKER ICON ─────────────────────────────────────────────────────────────

function markerSvg(color: string, emoji: string, selected: boolean) {
  const s = selected ? 48 : 38;
  const h = s + 10;
  const svg = `<svg width="${s}" height="${h}" viewBox="0 0 ${s} ${h}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${s / 2}" cy="${s / 2}" r="${s / 2 - 1}" fill="${color}" opacity="${selected ? 1 : 0.88}"/>
    <circle cx="${s / 2}" cy="${s / 2}" r="${s / 2 - 1}" fill="none" stroke="white" stroke-width="${selected ? 2.5 : 1.8}" opacity="0.9"/>
    <text x="${s / 2}" y="${s / 2 + 6}" text-anchor="middle" font-size="${selected ? 20 : 15}">${emoji}</text>
    <polygon points="${s / 2 - 5},${s - 2} ${s / 2 + 5},${s - 2} ${s / 2},${h - 1}" fill="${color}" opacity="${selected ? 1 : 0.88}"/>
  </svg>`;
  return { url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`, scaledSize: { width: s, height: h } as google.maps.Size, anchor: { x: s / 2, y: h } as google.maps.Point };
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

  const mapDivRef = useRef<HTMLDivElement>(null);
  const gmapRef   = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const [activeCategory, setActiveCategory] = useState("hotel");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [expandedDishId, setExpandedDishId] = useState<number | null>(null);
  const [liked, setLiked] = useState<number[]>([]);

  const [hf, setHf] = useState({ stars: [] as number[], type: [] as string[], city: [] as string[] });
  const [af, setAf] = useState({ type: [] as string[] });
  const [rf, setRf] = useState({ cuisine: [] as string[] });
  const [bf, setBf] = useState({ district: [] as string[] });

  const cat = categories.find(c => c.id === activeCategory)!;
  const toggle = <T,>(arr: T[], v: T): T[] => arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];

  // ── filtered list ──
  const filteredList = useCallback((): (Location | Dish)[] => {
    if (activeCategory === "dish")
      return dishData.filter(d => !search || d.name.toLowerCase().includes(search.toLowerCase()));
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
  }, [activeCategory, search, hf, af, rf, bf])();

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
      disableDefaultUI: true, styles: MAP_STYLES,
    });
  }, [mapsReady]);

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
  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden bg-[#0d0d1a]">

      {/* ─── SIDEBAR ─── */}
      <motion.aside initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}
        className="w-[340px] shrink-0 flex flex-col overflow-hidden border-r border-white/5"
        style={{ background: "linear-gradient(180deg, #0f0f1e 0%, #0d0d1a 100%)" }}>

        {/* header */}
        <div className="px-4 pt-4 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Map size={15} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-sm leading-none">Bản đồ Du lịch</h1>
              <p className="text-white/30 text-[10px] mt-0.5">Đà Nẵng · Hội An</p>
            </div>
          </div>
        </div>

        {/* circular category icons */}
        <div className="px-3 py-3 border-b border-white/5">
          <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
            {categories.map(c => {
              const active = activeCategory === c.id;
              return (
                <button key={c.id} onClick={() => setActiveCategory(c.id)} className="shrink-0 flex flex-col items-center gap-1.5 group">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${active ? "scale-110" : "opacity-40 grayscale group-hover:opacity-70 group-hover:grayscale-0 group-hover:scale-105"}`}
                    style={{ background: `linear-gradient(135deg, ${c.g1}, ${c.g2})`, boxShadow: active ? `0 0 20px ${c.g1}70, 0 4px 14px ${c.g1}40` : undefined }}>
                    <c.icon size={20} className="text-white" />
                  </div>
                  <span className={`text-[9px] font-medium leading-tight text-center max-w-[56px] transition-colors ${active ? "text-white" : "text-white/30 group-hover:text-white/55"}`}>
                    {c.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* search */}
        <div className="px-3 py-2 border-b border-white/5">
          <div className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-2">
            <Search size={13} className="text-white/30 shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Tìm ${cat.label.toLowerCase()}...`}
              className="bg-transparent text-white/80 text-xs placeholder:text-white/25 focus:outline-none flex-1" />
            {search && <button onClick={() => setSearch("")}><X size={11} className="text-white/30 hover:text-white/60" /></button>}
          </div>
        </div>

        {/* filters */}
        <div className="px-3 py-2.5 border-b border-white/5" style={{ minHeight: 62 }}>
          {activeCategory === "hotel" && (
            <div className="space-y-1.5">
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-white/25 text-[10px]">Sao:</span>
                {[5,4,3].map(s => <button key={s} onClick={() => setHf(f => ({ ...f, stars: toggle(f.stars, s) }))} className={`px-2 py-0.5 rounded-full text-[10px] font-medium border transition-all ${hf.stars.includes(s) ? "bg-amber-500/20 border-amber-400/50 text-amber-300" : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/70"}`}>{"★".repeat(s)}</button>)}
                <span className="text-white/25 text-[10px] ml-1">Loại:</span>
                {["resort","hotel","boutique"].map(t => <button key={t} onClick={() => setHf(f => ({ ...f, type: toggle(f.type, t) }))} className={`px-2 py-0.5 rounded-full text-[10px] border capitalize transition-all ${hf.type.includes(t) ? "bg-teal-500/20 border-teal-400/50 text-teal-300" : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/70"}`}>{t}</button>)}
              </div>
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-white/25 text-[10px]">Thành phố:</span>
                {["Đà Nẵng","Hội An"].map(c => <button key={c} onClick={() => setHf(f => ({ ...f, city: toggle(f.city, c) }))} className={`px-2 py-0.5 rounded-full text-[10px] border transition-all ${hf.city.includes(c) ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-300" : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/70"}`}>{c}</button>)}
              </div>
            </div>
          )}
          {activeCategory === "attraction" && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-white/25 text-[10px]">Loại hình:</span>
              {["di tích","tự nhiên","giải trí"].map(t => <button key={t} onClick={() => setAf(f => ({ ...f, type: toggle(f.type, t) }))} className={`px-2 py-0.5 rounded-full text-[10px] border capitalize transition-all ${af.type.includes(t) ? "bg-violet-500/20 border-violet-400/50 text-violet-300" : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/70"}`}>{t}</button>)}
            </div>
          )}
          {activeCategory === "restaurant" && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-white/25 text-[10px]">Ẩm thực:</span>
              {["hải sản","việt nam","quốc tế"].map(t => <button key={t} onClick={() => setRf(f => ({ ...f, cuisine: toggle(f.cuisine, t) }))} className={`px-2 py-0.5 rounded-full text-[10px] border capitalize transition-all ${rf.cuisine.includes(t) ? "bg-orange-500/20 border-orange-400/50 text-orange-300" : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/70"}`}>{t}</button>)}
            </div>
          )}
          {activeCategory === "beach" && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-white/25 text-[10px]">Quận:</span>
              {["Sơn Trà","Ngũ Hành Sơn"].map(d => <button key={d} onClick={() => setBf(f => ({ ...f, district: toggle(f.district, d) }))} className={`px-2 py-0.5 rounded-full text-[10px] border transition-all ${bf.district.includes(d) ? "bg-sky-500/20 border-sky-400/50 text-sky-300" : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/70"}`}>{d}</button>)}
            </div>
          )}
          {activeCategory === "dish" && <p className="text-white/25 text-[10px] leading-relaxed">Bấm vào tên món để xem tất cả quán ăn trên bản đồ</p>}
        </div>

        {/* list header */}
        <div className="px-3 py-2 flex items-center justify-between border-b border-white/5">
          <span className="text-white/35 text-[10px]"><span className="text-white/70 font-semibold">{filteredList.length}</span> kết quả</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"}`}><List size={12} /></button>
            <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"}`}><Grid3X3 size={12} /></button>
          </div>
        </div>

        {/* list body */}
        <div className="flex-1 overflow-y-auto scrollbar-none">
          {filteredList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-white/25 text-xs">
              <MapPin size={20} className="mb-2 opacity-40" />Không có kết quả
            </div>
          ) : activeCategory === "dish" ? (
            <div className={`p-2 ${viewMode === "grid" ? "grid grid-cols-2 gap-2" : "space-y-2"}`}>
              {(filteredList as Dish[]).map((dish, i) => {
                const active = expandedDishId === dish.id;
                return (
                  <motion.div key={dish.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    onClick={() => { const n = active ? null : dish.id; setExpandedDishId(n); setSelectedId(null); if (n) panTo(dish.lat, dish.lng, 14); }}
                    role="button" className={`rounded-xl overflow-hidden border cursor-pointer transition-all ${active ? "border-rose-400/40 bg-rose-500/5" : "border-white/5 hover:border-white/15 bg-white/[0.02]"}`}>
                    {viewMode === "grid" ? (
                      <>
                        <div className="h-24 relative overflow-hidden">
                          <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold text-white bg-rose-500/80 px-1.5 py-0.5 rounded-full">{dish.tag}</span>
                        </div>
                        <div className="p-2"><p className="text-white/85 font-semibold text-xs">{dish.name}</p><p className="text-white/35 text-[10px]">{dish.restaurants.length} quán</p></div>
                      </>
                    ) : (
                      <div className="flex gap-2.5 p-2.5">
                        <img src={dish.image} alt={dish.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                            <p className="text-white/85 font-semibold text-xs leading-tight">{dish.name}</p>
                            <span className="text-[9px] text-rose-300 bg-rose-500/15 px-1.5 py-0.5 rounded-full border border-rose-400/20">{dish.tag}</span>
                          </div>
                          <p className="text-white/35 text-[10px] line-clamp-2 leading-relaxed">{dish.desc}</p>
                          <p className="text-rose-400/60 text-[10px] mt-1">{dish.restaurants.length} quán · bấm để xem bản đồ</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className={`p-2 ${viewMode === "grid" ? "grid grid-cols-2 gap-2" : "space-y-1.5"}`}>
              <AnimatePresence mode="popLayout">
                {pageItems.map((item, i) => {
                  const active = selectedId === item.id;
                  return (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.04 }}
                      onClick={() => { setSelectedId(active ? null : item.id); if (!active) panTo(item.lat, item.lng); }}
                      role="button" className={`rounded-xl overflow-hidden border cursor-pointer transition-all ${active ? "border-white/20 bg-white/5" : "border-white/5 hover:border-white/12 bg-white/[0.02]"}`}>
                      {viewMode === "grid" ? (
                        <>
                          <div className="h-24 relative overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute top-1.5 right-1.5"
                              onClick={e => { e.stopPropagation(); setLiked(l => toggle(l, item.id)); }}>
                              <div className="w-6 h-6 bg-black/40 rounded-full flex items-center justify-center">
                                <Heart size={10} className={liked.includes(item.id) ? "text-rose-400 fill-rose-400" : "text-white/60"} />
                              </div>
                            </div>
                            {item.tag && <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold text-white bg-black/50 px-1.5 py-0.5 rounded-full">{item.tag}</span>}
                          </div>
                          <div className="p-2">
                            <p className="text-white/85 font-semibold text-[11px] leading-tight line-clamp-1">{item.name}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star size={9} className="text-amber-400 fill-amber-400" />
                              <span className="text-amber-300 text-[10px] font-bold">{item.rating}</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex gap-2.5 p-2.5">
                          <div className="relative shrink-0">
                            <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                            {item.stars && (
                              <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full px-1 py-0.5 text-[8px] text-white font-bold border-2 border-[#0d0d1a]">{item.stars}★</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1 mb-0.5">
                              <p className="text-white/85 font-semibold text-[11px] leading-tight line-clamp-1">{item.name}</p>
                              <div onClick={e => { e.stopPropagation(); setLiked(l => toggle(l, item.id)); }} className="shrink-0 mt-0.5 cursor-pointer">
                                <Heart size={11} className={liked.includes(item.id) ? "text-rose-400 fill-rose-400" : "text-white/20 hover:text-white/50"} />
                              </div>
                            </div>
                            <div className="flex items-center gap-1 mb-0.5">
                              <Star size={9} className="text-amber-400 fill-amber-400" />
                              <span className="text-amber-300 text-[10px] font-bold">{item.rating}</span>
                              <span className="text-white/25 text-[10px]">({item.reviews.toLocaleString()})</span>
                            </div>
                            <div className="flex items-center gap-1 text-white/30 text-[10px]">
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
          <div className="px-3 py-2.5 border-t border-white/5 flex items-center justify-between">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="flex items-center gap-1 text-white/40 text-xs disabled:opacity-30 hover:text-white/70 transition-colors">
              <ChevronLeft size={12} /> Trước
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`w-5 h-5 rounded-full text-[10px] font-medium transition-all ${page === i + 1 ? "text-white" : "text-white/30 hover:text-white/60"}`}
                  style={page === i + 1 ? { background: `linear-gradient(135deg, ${cat.g1}, ${cat.g2})` } : {}}>
                  {i + 1}
                </button>
              ))}
            </div>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="flex items-center gap-1 text-white/40 text-xs disabled:opacity-30 hover:text-white/70 transition-colors">
              Sau <ChevronRight size={12} />
            </button>
          </div>
        )}
      </motion.aside>

      {/* ─── MAP ─── */}
      <div className="flex-1 relative">
        {!mapsReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0d0d1a] z-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/40">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}>
                  <Map size={22} className="text-white" />
                </motion.div>
              </div>
              <p className="text-white/40 text-sm">Đang tải Google Maps...</p>
            </div>
          </div>
        )}
        <div ref={mapDivRef} className="absolute inset-0" />

        {/* zoom controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button onClick={() => gmapRef.current?.setZoom((gmapRef.current.getZoom() || 12) + 1)}
            className="w-9 h-9 bg-[#0f0f1e]/90 backdrop-blur border border-white/10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all text-xl font-light">+</button>
          <button onClick={() => gmapRef.current?.setZoom((gmapRef.current.getZoom() || 12) - 1)}
            className="w-9 h-9 bg-[#0f0f1e]/90 backdrop-blur border border-white/10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all text-xl font-light">−</button>
          <button onClick={() => { gmapRef.current?.panTo(DANANG_CENTER); gmapRef.current?.setZoom(12); }}
            className="w-9 h-9 bg-[#0f0f1e]/90 backdrop-blur border border-white/10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
            <Navigation size={14} />
          </button>
        </div>

        {/* status */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-[#0f0f1e]/80 backdrop-blur border border-white/8 rounded-xl px-3 py-2">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-white/50 text-[11px]">{filteredList.length} {cat.label} · Đà Nẵng &amp; Hội An</span>
        </div>

        {/* detail card - regular location */}
        <AnimatePresence>
          {selLoc && !selDishRest && (
            <motion.div key={selLoc.id} initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.96 }} transition={{ duration: 0.2 }}
              className="absolute bottom-4 right-4 z-10 w-[270px]">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/8" style={{ background: "rgba(12,12,26,0.96)", backdropFilter: "blur(20px)" }}>
                <div className="relative h-32">
                  <img src={selLoc.image} alt={selLoc.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c1a] via-[#0c0c1a]/10 to-transparent" />
                  <button onClick={() => setSelectedId(null)} className="absolute top-2.5 right-2.5 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center text-white/70 hover:text-white"><X size={12} /></button>
                  <span className="absolute bottom-2 left-3 text-[10px] font-bold text-white px-2 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${cat.g1}, ${cat.g2})` }}>{selLoc.tag || cat.label}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1.5">
                    <h3 className="text-white font-bold text-sm leading-tight flex-1 pr-2">{selLoc.name}</h3>
                    <div className="flex items-center gap-1 bg-amber-400/10 rounded-full px-2 py-0.5 shrink-0">
                      <Star size={10} className="text-amber-400 fill-amber-400" />
                      <span className="text-amber-300 text-xs font-bold">{selLoc.rating}</span>
                    </div>
                  </div>
                  <p className="text-white/35 text-[11px] mb-1 flex items-center gap-1"><MapPin size={9} className="shrink-0" />{selLoc.address}</p>
                  <p className="text-white/45 text-[11px] mb-3 line-clamp-2 leading-relaxed">{selLoc.desc}</p>
                  {selLoc.slug ? (
                    <a href={`/luu-tru-khach-san/${selLoc.slug}`}
                      className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-white text-xs font-bold no-underline"
                      style={{ background: `linear-gradient(135deg, ${cat.g1}, ${cat.g2})` }}>
                      Xem chi tiết <ChevronRight size={13} />
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-white text-xs font-bold cursor-pointer"
                      style={{ background: `linear-gradient(135deg, ${cat.g1}, ${cat.g2})` }}>
                      Xem chi tiết <ChevronRight size={13} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* detail card - dish + restaurants */}
        <AnimatePresence>
          {selDish && (
            <motion.div key={selDish.id} initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.96 }} transition={{ duration: 0.2 }}
              className="absolute bottom-4 right-4 z-10 w-[270px]">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-rose-500/15" style={{ background: "rgba(12,12,26,0.96)", backdropFilter: "blur(20px)" }}>
                {selDishRest ? (
                  <>
                    <div className="relative h-28">
                      <img src={selDishRest.image} alt={selDishRest.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c1a] to-transparent" />
                      <button onClick={() => setSelectedId(null)} className="absolute top-2.5 right-2.5 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center text-white/70 hover:text-white"><X size={12} /></button>
                      <span className="absolute bottom-2 left-3 text-[10px] text-rose-300 font-semibold">{selDish.name}</span>
                    </div>
                    <div className="p-3.5">
                      <h3 className="text-white font-bold text-sm mb-2">{selDishRest.name}</h3>
                      <div className="space-y-1 mb-3">
                        <p className="text-white/35 text-[11px] flex items-center gap-1"><MapPin size={9} />{selDishRest.address}</p>
                        <p className="text-white/35 text-[11px]">🕐 {selDishRest.hours}</p>
                        <div className="flex items-center gap-1">
                          <Star size={9} className="text-amber-400 fill-amber-400" />
                          <span className="text-amber-300 text-[10px] font-bold">{selDishRest.rating}</span>
                          <span className="text-white/25 text-[10px]">· {selDishRest.priceRange}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-white text-xs font-bold cursor-pointer"
                        style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899)" }}>
                        Xem chi tiết {selDish.name} <ChevronRight size={13} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative h-24">
                      <img src={selDish.image} alt={selDish.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c1a] to-transparent" />
                      <button onClick={() => { setExpandedDishId(null); setSelectedId(null); }} className="absolute top-2.5 right-2.5 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center text-white/70 hover:text-white"><X size={12} /></button>
                      <span className="absolute bottom-2 left-3 text-[9px] font-bold text-white bg-rose-500/80 px-2 py-0.5 rounded-full">{selDish.tag}</span>
                    </div>
                    <div className="p-3.5">
                      <p className="text-white font-bold text-sm mb-1">{selDish.name}</p>
                      <p className="text-white/40 text-[10px] leading-relaxed mb-2.5">{selDish.desc}</p>
                      <p className="text-white/25 text-[10px] mb-2">Chọn quán để xem chi tiết:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selDish.restaurants.map(r => (
                          <div key={r.id} role="button"
                            onClick={() => { setSelectedId(r.id); panTo(r.lat, r.lng, 17); }}
                            className={`text-[10px] px-2 py-0.5 rounded-full border cursor-pointer transition-all ${selectedId === r.id ? "bg-rose-500/20 border-rose-400/40 text-rose-300" : "border-white/10 text-white/50 hover:border-white/25 hover:text-white/80"}`}>
                            {r.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
