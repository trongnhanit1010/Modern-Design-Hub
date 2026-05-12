export interface CycloStop {
  id: number;
  name: string;
  durationMin?: number;
  description: string;
}

export interface CycloTour {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  duration: string;
  durationMin: number;
  price: number | null;
  priceNote?: string;
  rating: number;
  hours: string;
  image: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  stops: CycloStop[];
  driverName?: string;
  color: string;
  accentHex: string;
}

export const cycloTours: CycloTour[] = [
  {
    id: 1,
    slug: "dao-ven-song-han",
    name: "Dạo Ven Sông Hàn",
    tagline: "City Tour",
    duration: "45 phút",
    durationMin: 45,
    price: 230000,
    rating: 4.8,
    hours: "08:00 – 21:00",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1400&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&auto=format&fit=crop",
    ],
    overview: "Dành cho những du khách mong muốn cảm nhận Đà Nẵng theo cách nhẹ nhàng, gần gũi với nhịp sống người dân địa phương. Tour đưa du khách dạo quanh các tuyến phố du lịch ven sông Hàn, đi qua các công trình mang tính biểu tượng. Gọn nhẹ, dễ đi, dễ yêu – đúng chất \"đi chậm giữa lịch trình nhanh\".",
    highlights: [
      "Cảnh quan sông Hàn và các cây cầu biểu tượng",
      "Dừng chân tham quan Nhà thờ Chính tòa (15 phút)",
      "Hành trình nhẹ nhàng, phù hợp mọi lứa tuổi",
      "Có trang bị audio guide đa ngôn ngữ (tùy chọn)",
    ],
    stops: [
      { id: 1, name: "Bảo tàng Điêu khắc Chăm", description: "Điểm đón khách – Bảo tàng điêu khắc Chăm pa lớn nhất thế giới" },
      { id: 2, name: "Công viên APEC", description: "Công viên biểu tượng soi bóng bên sông Hàn" },
      { id: 3, name: "Đường Bạch Đằng – Quang Trung", description: "Cung đường ven sông đẹp nhất Đà Nẵng" },
      { id: 4, name: "Nhà thờ Chính tòa Đà Nẵng", description: "Công trình kiến trúc Pháp hơn 100 năm tuổi · Tham quan 15 phút" },
      { id: 5, name: "Trả khách tại Bảo tàng Chăm", description: "Kết thúc hành trình" },
    ],
    color: "from-blue-700 to-blue-500",
    accentHex: "#2563eb",
  },
  {
    id: 2,
    slug: "dau-an-thoi-gian",
    name: "Dấu Ấn Thời Gian",
    tagline: "Xích lô & Bảo tàng Đà Nẵng",
    duration: "120 phút",
    durationMin: 120,
    price: null,
    priceNote: "Liên hệ để biết giá",
    rating: 4.9,
    hours: "08:00 – 15:30",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1400&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=800&auto=format&fit=crop",
    ],
    overview: "Tour đưa du khách thong thả khám phá Đà Nẵng qua những công trình mang dấu ấn lịch sử và văn hóa. Hành trình ngắm nhìn con đường du lịch ven sông Hàn – nơi mỗi điểm dừng đều kể một câu chuyện về thành phố. Dành cho những ai muốn hiểu Đà Nẵng từ chiều sâu văn hóa, chậm rãi và đầy cảm xúc.",
    highlights: [
      "Tham quan Bảo tàng Đà Nẵng – 60 phút khám phá lịch sử",
      "Chiêm ngưỡng Nhà thờ Chính tòa – kiến trúc hơn 100 năm",
      "Ngắm Công viên APEC, Cầu Rồng, cầu Sông Hàn",
      "Trải nghiệm nhịp sống địa phương chậm rãi, gần gũi",
    ],
    stops: [
      { id: 1, name: "Bảo tàng Điêu khắc Chăm", description: "Điểm đón khách" },
      { id: 2, name: "Công viên APEC", description: "Biểu tượng bên bờ sông Hàn" },
      { id: 3, name: "Đường Bạch Đằng – ven sông", description: "Cung đường lãng mạn nhất thành phố" },
      { id: 4, name: "Bảo tàng Đà Nẵng", description: "Tham quan 60 phút · Lưu giữ văn hóa và lịch sử thành phố" },
      { id: 5, name: "Nhà thờ Chính tòa", description: "Tham quan 15 phút · Kiến trúc Pháp cổ điển" },
      { id: 6, name: "Trả khách tại Bảo tàng Chăm", description: "Kết thúc hành trình" },
    ],
    color: "from-blue-800 to-blue-600",
    accentHex: "#1d4ed8",
  },
  {
    id: 3,
    slug: "huong-vi-viet",
    name: "Xích Lô Hương Vị Việt",
    tagline: "Văn hóa cà phê truyền thống",
    duration: "80 phút",
    durationMin: 80,
    price: null,
    priceNote: "Liên hệ để biết giá",
    rating: 4.9,
    hours: "08:00 – 15:30",
    image: "https://images.unsplash.com/photo-1622484212850-eb596d769edc?w=1400&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop",
    ],
    overview: "Không chỉ là dạo phố, tour đưa du khách \"chạm tay\" vào văn hóa Việt qua trải nghiệm quy trình pha chế cà phê truyền thống. Vừa ngắm thành phố, hoà nhịp vào đời sống người dân địa phương, vừa dừng lại để tự tay pha chế và cảm nhận hương vị cà phê Việt. Một hành trình tương tác, vui, gần gũi và rất \"đời\".",
    highlights: [
      "Dạo quanh đường Bạch Đằng ven sông Hàn",
      "Thực hành pha cà phê phin truyền thống",
      "Thưởng thức: cà phê dừa / cà phê muối / cà phê trứng",
      "Chụp ảnh tại quán cà phê phong cách bản địa Trình Café",
    ],
    stops: [
      { id: 1, name: "Bảo tàng Điêu khắc Chăm", description: "Điểm đón khách" },
      { id: 2, name: "Công viên APEC", description: "Ngắm cảnh ven sông Hàn" },
      { id: 3, name: "Bạch Đằng – Quang Trung – Trần Phú", description: "Cung đường trung tâm thành phố" },
      { id: 4, name: "Trình Café", description: "Trải nghiệm pha chế & thưởng thức cà phê: 40 phút" },
      { id: 5, name: "Trả khách tại Bảo tàng Chăm", description: "Kết thúc hành trình" },
    ],
    color: "from-blue-600 to-indigo-500",
    accentHex: "#2563eb",
  },
];

export const cycloContacts = [
  { name: "Chị Phương", phone: "0903 978 437" },
  { name: "Anh Thịnh",  phone: "0905 499 639" },
  { name: "Anh Minh",   phone: "0905 717 574" },
];

export const cycloParking = [
  "Bãi đỗ xe Bảo tàng Chăm Đà Nẵng, đường 2/9",
  "Nhà thờ Chính tòa Đà Nẵng, 156 Trần Phú, Hải Châu",
  "Công viên APEC, đường 2/9",
  "Khu vực chợ Hàn, trung tâm thành phố",
];

export const audioGuideLanguages = [
  "Tiếng Việt", "English", "中文", "日本語", "한국어",
  "ภาษาไทย", "Русский", "Français", "Português", "हिन्दी",
  "Deutsch", "Ελληνικά", "Italiano", "Polski", "Español",
];

export function findCycloBySlug(slug: string) {
  return cycloTours.find((t) => t.slug === slug);
}
