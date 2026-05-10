export type BusRouteType = "subsidized" | "unsubsidized" | "tourist" | "interprovincial";

export interface Stop {
  name: string;
  address?: string;
  isTerminal?: boolean;
  landmark?: string;
}

export interface BusRoute {
  no: string;
  name: string;
  from: string;
  to: string;
  hours: string;
  frequency: string;
  frequencyPeak?: string;
  price: string;
  distance?: string;
  duration?: string;
  operator?: string;
  vehicles?: number;
  type: BusRouteType;
  pending?: boolean;
  touristFriendly?: boolean;
  stops?: Stop[];
  color: string;
  image: string;
  note?: string;
}

export interface JourneyGuide {
  from: string;
  to: string;
  busNo: string;
  time: string;
  freq: string;
  price: string;
  duration: string;
  steps: string[];
  tip?: string;
  image: string;
}

// ── Toàn bộ tuyến xe buýt – nguồn: danangbus.vn ──────────────────────────────

export const busRoutes: BusRoute[] = [

  // ════ Tuyến du lịch ════
  {
    no: "01SB",
    name: "Sân Bay Đà Nẵng – Hội An",
    from: "Sân bay Đà Nẵng",
    to: "04 Lý Thường Kiệt, Hội An",
    hours: "05:10 – 18:00",
    frequency: "15 – 30 phút/chuyến",
    price: "30.000đ",
    distance: "~30 km",
    duration: "~60 phút",
    operator: "Phương Trang Futabuslines",
    vehicles: 10,
    type: "tourist",
    touristFriendly: true,
    color: "#0ea5e9",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&auto=format&fit=crop",
    note: "Xe có khoang hành lý rộng, phù hợp mang vali từ sân bay thẳng ra Hội An",
    stops: [
      { name: "Sân bay Đà Nẵng", address: "Đường Duy Tân", isTerminal: true, landmark: "Cửa Arrivals T1/T2" },
      { name: "Điện Biên Phủ – Nguyễn Văn Linh", address: "Ngã tư Điện Biên Phủ" },
      { name: "Nguyễn Văn Linh – Lê Văn Hiến", address: "Nguyễn Văn Linh" },
      { name: "Lê Văn Hiến – Trần Đại Nghĩa", address: "Lê Văn Hiến" },
      { name: "Ngũ Hành Sơn (Chùa Ông)", address: "754 Lê Văn Hiến", landmark: "Khu danh thắng Ngũ Hành Sơn" },
      { name: "Ngũ Hành Sơn – Trường Sa", address: "Ngũ Hành Sơn" },
      { name: "Phan Bội Châu (Điện Bàn)", address: "QL1A, Điện Bàn" },
      { name: "Lý Thường Kiệt, Hội An", address: "04 Lý Thường Kiệt, Hội An", isTerminal: true, landmark: "Cạnh chợ Hội An" },
    ],
  },
  {
    no: "01DL",
    name: "Hội An – Mỹ Sơn – Cổng trời Đông Giang",
    from: "04 Lý Thường Kiệt, Hội An",
    to: "Cổng trời Đông Giang",
    hours: "08:10 & 14:10 (từ Hội An) · 09:00 & 15:00 (từ Mỹ Sơn)",
    frequency: "2 chuyến/ngày",
    price: "Liên hệ nhà xe",
    distance: "~75 km",
    duration: "~50 phút đến Mỹ Sơn",
    operator: "Phương Trang Futabuslines",
    type: "tourist",
    touristFriendly: true,
    color: "#8b5cf6",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&auto=format&fit=crop",
    note: "Chỉ 2 chuyến/ngày — đặt vé trước qua danangbus.vn hoặc điện thoại",
    stops: [
      { name: "04 Lý Thường Kiệt, Hội An", isTerminal: true, landmark: "Điểm xuất phát Hội An" },
      { name: "Khu Đền tháp Mỹ Sơn", address: "Duy Phú, Duy Xuyên", landmark: "Di sản UNESCO Mỹ Sơn" },
      { name: "Thị trấn Thạnh Mỹ", address: "Nam Giang, Quảng Nam" },
      { name: "Cổng trời Đông Giang", address: "Đông Giang, Quảng Nam", isTerminal: true, landmark: "Cổng làng văn hóa Cơtu" },
    ],
  },

  // ════ Tuyến có trợ giá (Phương Trang Futabuslines) ════
  {
    no: "05",
    name: "KCC Hòa Hiệp Nam – Công viên Biển Đông",
    from: "Khu chung cư Hòa Hiệp Nam",
    to: "Công viên Biển Đông",
    hours: "05:30 – 19:00",
    frequency: "30 phút",
    frequencyPeak: "15 phút (06:00–08:30 & 16:30–18:30)",
    price: "8.000đ",
    distance: "20 km",
    duration: "~45 phút",
    operator: "Phương Trang Futabuslines",
    vehicles: 8,
    type: "subsidized",
    touristFriendly: true,
    color: "#10b981",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
    note: "Tuyến xương sống nối bắc – nam thành phố, đi qua trung tâm và bờ biển Mỹ Khê",
    stops: [
      { name: "KCC Hòa Hiệp Nam", address: "Liên Chiểu", isTerminal: true },
      { name: "Nguyễn Lương Bằng", address: "Cạnh Chi cục Thống kê" },
      { name: "Tôn Đức Thắng – Nguyễn Tất Thành", address: "Ngã tư Tôn Đức Thắng" },
      { name: "Quang Trung (Bệnh viện C)", address: "Quang Trung", landmark: "Bệnh viện C Đà Nẵng" },
      { name: "Lê Lợi – Sở Tài Chính", address: "Lê Lợi" },
      { name: "Lê Duẩn – Chợ Đống Đa", address: "Lê Duẩn", landmark: "Chợ Đống Đa" },
      { name: "Bạch Đằng – Trần Phú", address: "Bạch Đằng", landmark: "Bờ sông Hàn" },
      { name: "Cầu Sông Hàn", address: "Đường Trần Hưng Đạo", landmark: "Cầu Sông Hàn" },
      { name: "Phạm Văn Đồng (Chợ Đầu Mối)", address: "Phạm Văn Đồng" },
      { name: "Công viên Biển Đông", address: "Võ Nguyên Giáp", isTerminal: true, landmark: "Bãi biển Mỹ Khê" },
    ],
  },
  {
    no: "07",
    name: "Xuân Diệu – Hòa Phước",
    from: "Trạm xe buýt Xuân Diệu",
    to: "Ngã ba Tứ Câu (Hòa Phước)",
    hours: "05:30 – 19:00",
    frequency: "30 phút",
    frequencyPeak: "15 phút (cao điểm)",
    price: "8.000đ",
    distance: "20,15 km",
    duration: "~50 phút",
    operator: "Phương Trang Futabuslines",
    vehicles: 8,
    type: "subsidized",
    color: "#10b981",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&auto=format&fit=crop",
    stops: [
      { name: "Xuân Diệu", address: "Sơn Trà", isTerminal: true },
      { name: "Đường 3/2 – Hoàng Diệu", address: "Ngã tư Đường 3/2" },
      { name: "Trần Phú (Bưu điện TW)", address: "Trần Phú" },
      { name: "Quang Trung", address: "Quang Trung" },
      { name: "Lê Lợi (Sở Kế hoạch)", address: "Lê Lợi" },
      { name: "Phan Châu Trinh", address: "Phan Châu Trinh" },
      { name: "Nguyễn Văn Linh – QL14B", address: "Nguyễn Văn Linh" },
      { name: "Hoàng Diệu – Hoà Thọ Đông", address: "Hoàng Diệu" },
      { name: "Phạm Hùng (BXB)", address: "Phạm Hùng" },
      { name: "QL1A – Hòa Phước", address: "QL1A" },
      { name: "Ngã ba Tứ Câu, Hòa Phước", isTerminal: true },
    ],
  },
  {
    no: "08",
    name: "Vũng Thùng – BXB Phạm Hùng",
    from: "Vũng Thùng (Bùi Dương Lịch)",
    to: "Bến xe buýt Phạm Hùng",
    hours: "05:30 – 19:00",
    frequency: "30 phút",
    frequencyPeak: "15 phút (cao điểm)",
    price: "8.000đ",
    distance: "19,5 km",
    duration: "~45 phút",
    operator: "Phương Trang Futabuslines",
    vehicles: 8,
    type: "subsidized",
    color: "#10b981",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop",
    stops: [
      { name: "Vũng Thùng", address: "Bùi Dương Lịch, Liên Chiểu", isTerminal: true },
      { name: "Ngô Quyền", address: "Ngô Quyền, Sơn Trà" },
      { name: "Ngũ Hành Sơn (Bãi biển)", address: "Trường Sa, Ngũ Hành Sơn", landmark: "Gần bãi biển Non Nước" },
      { name: "Tiên Sơn (Sân vận động)", address: "Lê Văn Hiến", landmark: "Sân vận động Tiên Sơn" },
      { name: "Xô Viết Nghệ Tĩnh", address: "Xô Viết Nghệ Tĩnh" },
      { name: "Nguyễn Hữu Thọ (Cầu Cẩm Lệ)", address: "Nguyễn Hữu Thọ" },
      { name: "Cầu Cẩm Lệ", address: "QL1A" },
      { name: "BXB Phạm Hùng", address: "Phạm Hùng, Cẩm Lệ", isTerminal: true, landmark: "Bến xe buýt Phạm Hùng" },
    ],
  },
  {
    no: "11",
    name: "Xuân Diệu – BV Phụ sản Nhi",
    from: "Trạm xe buýt Xuân Diệu",
    to: "Bệnh viện Phụ sản Nhi",
    hours: "05:30 – 19:00",
    frequency: "30 phút",
    frequencyPeak: "15 phút (cao điểm)",
    price: "8.000đ",
    distance: "18 km",
    duration: "~40 phút",
    operator: "Phương Trang Futabuslines",
    vehicles: 6,
    type: "subsidized",
    color: "#10b981",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&auto=format&fit=crop",
    stops: [
      { name: "Xuân Diệu", isTerminal: true },
      { name: "Đường 3/2", address: "Sơn Trà" },
      { name: "Hải Phòng – Đống Đa", address: "Hải Phòng" },
      { name: "Trần Phú – Phan Châu Trinh", address: "Trần Phú" },
      { name: "Nguyễn Văn Linh", address: "Nguyễn Văn Linh" },
      { name: "Ông Ích Khiêm", address: "Ông Ích Khiêm" },
      { name: "Bệnh viện Phụ sản Nhi", address: "410 Trần Phú", isTerminal: true, landmark: "BV Phụ sản – Nhi Đà Nẵng" },
    ],
  },
  {
    no: "12",
    name: "Xuân Diệu – BXB Phạm Hùng",
    from: "Trạm xe buýt Xuân Diệu",
    to: "Bến xe buýt Phạm Hùng",
    hours: "05:30 – 19:00",
    frequency: "30 phút",
    frequencyPeak: "15 phút (cao điểm)",
    price: "8.000đ",
    distance: "20 km",
    duration: "~45 phút",
    operator: "Phương Trang Futabuslines",
    vehicles: 6,
    type: "subsidized",
    color: "#10b981",
    image: "https://images.unsplash.com/photo-1545063328-c8e3faffa16f?w=800&auto=format&fit=crop",
    stops: [
      { name: "Xuân Diệu", isTerminal: true },
      { name: "Đường 3/2", address: "Sơn Trà" },
      { name: "Trần Phú", address: "Trần Phú" },
      { name: "Quang Trung", address: "Quang Trung" },
      { name: "Điện Biên Phủ (Sân bay)", address: "Điện Biên Phủ" },
      { name: "Hùng Vương", address: "Hùng Vương" },
      { name: "Nguyễn Hữu Thọ", address: "Nguyễn Hữu Thọ" },
      { name: "BXB Phạm Hùng", address: "Phạm Hùng, Cẩm Lệ", isTerminal: true },
    ],
  },

  // ════ Tuyến không trợ giá – nội thành ════
  {
    no: "02",
    name: "Bến xe TT – TTHCTP – Cửa Đại",
    from: "Bến xe Trung tâm Đà Nẵng",
    to: "Cửa Đại (Hội An)",
    hours: "05:30 – 17:30",
    frequency: "~20 phút",
    price: "20.000đ",
    distance: "~35 km",
    duration: "~75 phút",
    operator: "Phương Trang Futabuslines",
    vehicles: 12,
    type: "unsubsidized",
    touristFriendly: true,
    color: "#7c3aed",
    image: "https://images.unsplash.com/photo-1573408301185-9519f94816b4?w=800&auto=format&fit=crop",
    note: "Tuyến qua Ngũ Hành Sơn — thuận tiện cho du khách đến di tích và Hội An",
    stops: [
      { name: "Bến xe Trung tâm Đà Nẵng", address: "33 Điện Biên Phủ", isTerminal: true, landmark: "Cạnh sân bay Đà Nẵng" },
      { name: "Trung tâm Hành chính TP", address: "24 Trần Phú", landmark: "UBND TP Đà Nẵng" },
      { name: "Lê Văn Hiến (Sân vận động)", address: "Lê Văn Hiến", landmark: "Sân vận động Tiên Sơn" },
      { name: "Ngũ Hành Sơn", address: "754 Lê Văn Hiến", landmark: "Khu danh thắng Ngũ Hành Sơn" },
      { name: "Phan Bội Châu (Điện Bàn)", address: "QL1A, Điện Bàn" },
      { name: "Trần Phú, Hội An", address: "Trần Phú, Hội An" },
      { name: "Cửa Đại, Hội An", address: "Cửa Đại", isTerminal: true, landmark: "Bãi biển Cửa Đại" },
    ],
  },
  {
    no: "03",
    name: "Sân bay Đà Nẵng – Bà Nà Hills",
    from: "Sân bay Đà Nẵng",
    to: "Khu du lịch Bà Nà Hills",
    hours: "07:00 – 18:00",
    frequency: "15 – 30 phút",
    price: "15.000 – 30.000đ",
    distance: "~35 km",
    duration: "~75 phút",
    operator: "Phương Trang Futabuslines",
    vehicles: 10,
    type: "unsubsidized",
    touristFriendly: true,
    color: "#f59e0b",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&auto=format&fit=crop",
    note: "Tuyến thẳng ra Bà Nà Hills, đi qua trung tâm và khu công nghiệp Hòa Khánh",
    stops: [
      { name: "Sân bay Đà Nẵng", address: "Đường Duy Tân", isTerminal: true },
      { name: "Nguyễn Văn Linh – Điện Biên Phủ", address: "Nguyễn Văn Linh" },
      { name: "Nguyễn Tri Phương", address: "Nguyễn Tri Phương" },
      { name: "Điện Biên Phủ – Núi Thành", address: "Điện Biên Phủ" },
      { name: "Tôn Đức Thắng (Cầu Phú Lộc)", address: "Tôn Đức Thắng" },
      { name: "Hoàng Văn Thái (KCN Hòa Khánh)", address: "Hoàng Văn Thái", landmark: "Khu công nghiệp Hòa Khánh" },
      { name: "Ngã ba Hòa Nhơn", address: "ĐT604" },
      { name: "Bà Nà Hills (bãi xe)", address: "Thôn An Sơn, Hòa Ninh", isTerminal: true, landmark: "Điểm đón cáp treo Bà Nà" },
    ],
  },
  {
    no: "06",
    name: "Sân bay – Đại học Việt Hàn",
    from: "Sân bay Đà Nẵng",
    to: "Đại học Việt Hàn",
    hours: "05:30 – 19:00",
    frequency: "Xem lịch vận hành",
    price: "Liên hệ",
    type: "unsubsidized",
    color: "#7c3aed",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop",
    stops: [
      { name: "Sân bay Đà Nẵng", isTerminal: true },
      { name: "Điện Biên Phủ", address: "Điện Biên Phủ" },
      { name: "Nguyễn Tri Phương", address: "Nguyễn Tri Phương" },
      { name: "Đại học Việt Hàn", address: "131 Lương Nhữ Hộc, Thanh Khê", isTerminal: true },
    ],
  },
  {
    no: "09",
    name: "BV Ung Bướu – BXB Phạm Hùng",
    from: "Bệnh viện Ung Bướu",
    to: "Bến xe buýt Phạm Hùng",
    hours: "05:30 – 18:30",
    frequency: "Xem lịch vận hành",
    price: "Liên hệ",
    type: "unsubsidized",
    color: "#7c3aed",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&auto=format&fit=crop",
    stops: [
      { name: "Bệnh viện Ung Bướu", address: "Ung Bướu, Cẩm Lệ", isTerminal: true },
      { name: "Nguyễn Hữu Thọ", address: "Nguyễn Hữu Thọ" },
      { name: "Phạm Hùng – Cẩm Lệ", address: "Phạm Hùng" },
      { name: "BXB Phạm Hùng", isTerminal: true },
    ],
  },
  {
    no: "13",
    name: "BV Ung Bướu – Đại học Việt Hàn",
    from: "Bệnh viện Ung Bướu",
    to: "Đại học Việt Hàn",
    hours: "05:30 – 19:00",
    frequency: "Xem lịch vận hành",
    price: "Liên hệ",
    type: "unsubsidized",
    color: "#7c3aed",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop",
    stops: [
      { name: "Bệnh viện Ung Bướu", isTerminal: true },
      { name: "Cầu Cẩm Lệ", address: "QL1A" },
      { name: "Điện Biên Phủ", address: "Điện Biên Phủ" },
      { name: "Đại học Việt Hàn", address: "131 Lương Nhữ Hộc", isTerminal: true },
    ],
  },
  {
    no: "14",
    name: "Cảng sông Hàn – Khu CNC",
    from: "Cảng sông Hàn",
    to: "Khu công nghệ cao Đà Nẵng",
    hours: "06:00 – 18:30",
    frequency: "Xem lịch vận hành",
    price: "Liên hệ",
    type: "unsubsidized",
    color: "#7c3aed",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop",
    stops: [
      { name: "Cảng sông Hàn", address: "Bạch Đằng, Hải Châu", isTerminal: true },
      { name: "Trần Phú – Lý Tự Trọng", address: "Trần Phú" },
      { name: "Nguyễn Văn Linh", address: "Nguyễn Văn Linh" },
      { name: "Khu công nghệ cao", address: "Hòa Liên, Hòa Vang", isTerminal: true, landmark: "KCNC Đà Nẵng" },
    ],
  },
  {
    no: "21",
    name: "Bến xe TT – TTHCTP – Cầu Tam Kỳ",
    from: "Bến xe Trung tâm",
    to: "Cầu Tam Kỳ, P. Hương Trà",
    hours: "05:30 – 17:30",
    frequency: "~30 phút",
    price: "Liên hệ",
    type: "unsubsidized",
    color: "#7c3aed",
    image: "https://images.unsplash.com/photo-1545063328-c8e3faffa16f?w=800&auto=format&fit=crop",
    stops: [
      { name: "Bến xe Trung tâm", address: "33 Điện Biên Phủ", isTerminal: true },
      { name: "Trung tâm Hành chính TP", address: "24 Trần Phú" },
      { name: "Ngũ Hành Sơn", address: "Lê Văn Hiến" },
      { name: "Điện Bàn", address: "QL1A, Điện Bàn" },
      { name: "Cầu Tam Kỳ, P. Hương Trà", isTerminal: true },
    ],
  },

  // ════ Tuyến liên tỉnh ════
  {
    no: "LK01",
    name: "Đà Nẵng – Huế",
    from: "Bến xe Trung tâm Đà Nẵng",
    to: "Bến xe phía Nam Huế",
    hours: "05:30 – 19:00",
    frequency: "14 – 15 phút/chuyến",
    price: "80.000đ",
    distance: "~100 km",
    duration: "~2h30 phút",
    operator: "Phương Trang Futabuslines",
    vehicles: 14,
    type: "interprovincial",
    touristFriendly: true,
    color: "#f97316",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
    note: "Đi qua Hầm Hải Vân (không qua đèo). Rẻ hơn 3–4 lần so với taxi hay xe khách",
    stops: [
      { name: "Bến xe Trung tâm Đà Nẵng", address: "33 Điện Biên Phủ", isTerminal: true },
      { name: "Tôn Đức Thắng (Ngã tư sân bay)", address: "Tôn Đức Thắng" },
      { name: "Nguyễn Lương Bằng", address: "Liên Chiểu" },
      { name: "Hầm Hải Vân (cửa nam)", address: "Liên Chiểu", landmark: "Cửa nam Hầm Hải Vân" },
      { name: "Hầm Hải Vân (cửa bắc)", address: "Phú Lộc, Thừa Thiên Huế" },
      { name: "Lăng Cô", address: "Phú Lộc", landmark: "Vịnh Lăng Cô" },
      { name: "QL1A – Phú Bài", address: "Hương Thủy, Huế" },
      { name: "Bến xe phía Nam Huế", address: "Phú Bài, Huế", isTerminal: true, landmark: "Cách trung tâm Huế ~15km" },
    ],
  },

  // ════ Đang làm thủ tục vận hành ════
  {
    no: "04",
    name: "Cầu Trần Thị Lý – Hòa Tiến",
    from: "Cầu Trần Thị Lý",
    to: "Hòa Tiến",
    hours: "–",
    frequency: "–",
    price: "–",
    type: "unsubsidized",
    pending: true,
    color: "#9ca3af",
    image: "https://images.unsplash.com/photo-1545063328-c8e3faffa16f?w=800&auto=format&fit=crop",
  },
  {
    no: "10",
    name: "Sân bay Đà Nẵng – Thọ Quang",
    from: "Sân bay Đà Nẵng",
    to: "Thọ Quang",
    hours: "–",
    frequency: "–",
    price: "–",
    type: "unsubsidized",
    pending: true,
    touristFriendly: true,
    color: "#9ca3af",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop",
  },
  {
    no: "15",
    name: "Bến xe TT – Bến xe Phía Nam",
    from: "Bến xe Trung tâm",
    to: "Bến xe Phía Nam",
    hours: "–",
    frequency: "–",
    price: "–",
    type: "unsubsidized",
    pending: true,
    color: "#9ca3af",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&auto=format&fit=crop",
  },
  {
    no: "16",
    name: "Kim Liên – Đại học Việt Hàn",
    from: "Kim Liên",
    to: "Đại học Việt Hàn",
    hours: "–",
    frequency: "–",
    price: "–",
    type: "unsubsidized",
    pending: true,
    color: "#9ca3af",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop",
  },
  {
    no: "17",
    name: "Cảng sông Hàn – Hòa Khương",
    from: "Cảng sông Hàn",
    to: "Hòa Khương",
    hours: "–",
    frequency: "–",
    price: "–",
    type: "unsubsidized",
    pending: true,
    color: "#9ca3af",
    image: "https://images.unsplash.com/photo-1545063328-c8e3faffa16f?w=800&auto=format&fit=crop",
  },
];

// ── Phân nhóm tuyến ──────────────────────────────────────────────────────────

export const ROUTE_TABS: {
  key: BusRouteType | "pending";
  label: string;
  desc: string;
  color: string;
  dot: string;
  badge: string;
}[] = [
  {
    key: "tourist",
    label: "Du lịch",
    desc: "Tuyến chuyên phục vụ du khách, kết nối sân bay – Hội An – Bà Nà Hills – Mỹ Sơn",
    color: "sky",
    dot: "bg-sky-400",
    badge: "bg-sky-500 text-white",
  },
  {
    key: "subsidized",
    label: "Có trợ giá",
    desc: "5 tuyến vận hành bởi Phương Trang, giá vé chỉ 8.000đ/lượt",
    color: "emerald",
    dot: "bg-emerald-400",
    badge: "bg-emerald-600 text-white",
  },
  {
    key: "interprovincial",
    label: "Liên tỉnh",
    desc: "Đà Nẵng ↔ Huế — 80.000đ, 14–15 phút/chuyến, qua Hầm Hải Vân",
    color: "orange",
    dot: "bg-orange-400",
    badge: "bg-orange-500 text-white",
  },
  {
    key: "unsubsidized",
    label: "Nội thành",
    desc: "Tuyến nội thành & ngoại ô đang vận hành, chưa có trợ giá",
    color: "violet",
    dot: "bg-violet-500",
    badge: "bg-violet-600 text-white",
  },
  {
    key: "pending",
    label: "Sắp mở",
    desc: "Đang hoàn thiện thủ tục – chưa vận hành chính thức",
    color: "gray",
    dot: "bg-gray-400",
    badge: "bg-gray-400 text-white",
  },
];

// ── Vé & giá ────────────────────────────────────────────────────────────────

export const ticketTypes = [
  {
    type: "Vé lượt – Trợ giá",
    price: "8.000đ",
    desc: "Áp dụng tuyến số 05, 07, 08, 11, 12",
    icon: "single",
    highlight: true,
  },
  {
    type: "Vé lượt – Không trợ giá",
    price: "15.000 – 80.000đ",
    desc: "Tùy tuyến nội thành hoặc liên tỉnh",
    icon: "single",
    highlight: false,
  },
  {
    type: "Vé tháng – Học sinh/SV",
    price: "80.000đ/tháng",
    desc: "Trình thẻ học sinh / sinh viên khi mua",
    icon: "monthly",
    highlight: false,
  },
  {
    type: "Vé tháng – Phổ thông",
    price: "120.000đ/tháng",
    desc: "Đi không giới hạn số lượt trên tuyến có trợ giá",
    icon: "monthly",
    highlight: false,
  },
];

// ── Hướng dẫn chuyến đi du lịch ─────────────────────────────────────────────

export const journeyGuides: JourneyGuide[] = [
  {
    from: "Sân bay Đà Nẵng",
    to: "Hội An",
    busNo: "01SB",
    time: "05:10 – 18:00",
    freq: "15–30 phút/chuyến",
    price: "30.000đ",
    duration: "~60 phút",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&auto=format&fit=crop",
    steps: [
      "Ra cửa Arrivals, đi bộ ~3 phút đến trạm xe buýt ngay cổng sân bay",
      "Bắt Bus số 01SB hướng Hội An — vé mua trên xe",
      "Qua: Nguyễn Văn Linh → Điện Biên Phủ → Cầu Rồng → Bạch Đằng → Ngũ Hành Sơn",
      "Xuống điểm cuối: 04 Lý Thường Kiệt, Hội An (cạnh chợ Hội An)",
    ],
    tip: "Xe có khoang hành lý rộng, phù hợp mang vali. Xe chạy đến 18:00 — chú ý giờ xe về.",
  },
  {
    from: "Trung tâm Đà Nẵng",
    to: "Bà Nà Hills",
    busNo: "03",
    time: "07:00 – 18:00",
    freq: "15–30 phút/chuyến",
    price: "30.000đ",
    duration: "~75 phút",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&auto=format&fit=crop",
    steps: [
      "Ra điểm dừng trên đường Điện Biên Phủ (gần sân bay, đi bộ 5–10 phút từ trung tâm)",
      "Bắt Bus số 03 hướng Bà Nà Hills",
      "Qua: Sân bay → Nguyễn Văn Linh → Tôn Đức Thắng → Hoàng Văn Thái → ĐT604",
      "Xuống bãi đỗ xe Bà Nà Hills — mua vé cáp treo (riêng) lên khu du lịch",
    ],
    tip: "Nên đi chuyến sáng sớm (trước 8:00) để tránh đông. Cuối ngày xe về 17:00–18:00.",
  },
  {
    from: "Trung tâm Đà Nẵng",
    to: "Ngũ Hành Sơn",
    busNo: "02",
    time: "05:30 – 17:30",
    freq: "~20 phút/chuyến",
    price: "20.000đ",
    duration: "30–40 phút",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop",
    steps: [
      "Bắt đầu từ Bến xe Trung tâm (33 Điện Biên Phủ) hoặc điểm dừng dọc Trần Phú",
      "Bắt Bus số 02 hướng Cửa Đại",
      "Xuống tại điểm dừng 754 Lê Văn Hiến (gần cổng Ngũ Hành Sơn)",
      "Đi bộ 2–5 phút vào khu danh thắng",
    ],
    tip: "Từ Ngũ Hành Sơn có thể đi tiếp đến Hội An cùng tuyến 02 — rất tiện.",
  },
  {
    from: "Hội An",
    to: "Mỹ Sơn",
    busNo: "01DL",
    time: "08:10 & 14:10 từ Hội An",
    freq: "2 chuyến/ngày",
    price: "Liên hệ nhà xe",
    duration: "~50 phút",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&auto=format&fit=crop",
    steps: [
      "Đến điểm đón: 04 Đường Lý Thường Kiệt, Hội An",
      "Xe khởi hành lúc 08:10 hoặc 14:10",
      "Đến Khu Đền tháp Mỹ Sơn (Di sản UNESCO) sau ~50 phút",
      "Xe từ Mỹ Sơn về Hội An lúc 09:00 và 15:00",
    ],
    tip: "Chỉ 2 chuyến/ngày — nhớ đặt chỗ trước qua danangbus.vn hoặc điện thoại.",
  },
  {
    from: "Đà Nẵng",
    to: "Huế",
    busNo: "LK01",
    time: "05:30 – 19:00",
    freq: "14–15 phút/chuyến",
    price: "80.000đ",
    duration: "~2h30 phút",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
    steps: [
      "Ra Bến xe Trung tâm Đà Nẵng (33 Điện Biên Phủ)",
      "Mua vé, lên xe LK01 hướng Huế — tần suất dày 14–15 phút",
      "Qua Hầm Hải Vân (không qua đèo) — khoảng 1 tiếng từ Đà Nẵng",
      "Qua Lăng Cô → Phú Bài, đến Bến xe phía Nam Huế",
      "Từ bến xe, bắt xe ôm/taxi ~15km vào trung tâm Huế",
    ],
    tip: "Rẻ hơn 3–4 lần so với taxi. Từ Huế đặt xe ôm hoặc xe đạp vào trung tâm (~15km).",
  },
];
