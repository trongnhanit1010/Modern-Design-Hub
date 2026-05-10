export type BusRouteType = "subsidized" | "unsubsidized" | "tourist" | "interprovincial";

export interface BusRoute {
  no: string;
  name: string;
  from: string;
  to: string;
  hours: string;
  frequency: string;
  price: string;
  distance?: string;
  operator?: string;
  type: BusRouteType;
  pending?: boolean;
  touristFriendly?: boolean;
  keyStops?: string[];
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
}

// ── Toàn bộ tuyến xe buýt – nguồn: danangbus.vn ──────────────────────────────

export const busRoutes: BusRoute[] = [
  // Tuyến có trợ giá (Phương Trang Futabuslines)
  {
    no: "05",
    name: "KCC Hòa Hiệp Nam – Công viên Biển Đông",
    from: "Khu chung cư Hòa Hiệp Nam",
    to: "Công viên Biển Đông",
    hours: "05:30 – 19:00",
    frequency: "15 phút (cao điểm) · 30 phút (còn lại)",
    price: "8.000đ",
    distance: "20km",
    operator: "Phương Trang",
    type: "subsidized",
    touristFriendly: true,
    keyStops: ["KCC Hòa Hiệp Nam", "Nguyễn Lương Bằng", "Tôn Đức Thắng", "Quang Trung", "Lê Lợi", "Lê Duẩn", "Cầu Sông Hàn", "Phạm Văn Đồng", "Công viên Biển Đông"],
  },
  {
    no: "07",
    name: "Xuân Diệu – Hòa Phước",
    from: "Trạm xe buýt Xuân Diệu",
    to: "Ngã ba Tứ Câu (Hòa Phước)",
    hours: "05:30 – 19:00",
    frequency: "15 phút (cao điểm) · 30 phút (còn lại)",
    price: "8.000đ",
    distance: "20.15km",
    operator: "Phương Trang",
    type: "subsidized",
    keyStops: ["Xuân Diệu", "Đường 3/2", "Trần Phú", "Quang Trung", "Lê Lợi", "Phan Châu Trinh", "Nguyễn Văn Linh", "Hoàng Diệu", "Phạm Hùng", "QL1A", "Ngã ba Tứ Câu"],
  },
  {
    no: "08",
    name: "Vũng Thùng – BXB Phạm Hùng",
    from: "Vũng Thùng (Bùi Dương Lịch)",
    to: "Bến xe buýt Phạm Hùng",
    hours: "05:30 – 19:00",
    frequency: "15 phút (cao điểm) · 30 phút (còn lại)",
    price: "8.000đ",
    operator: "Phương Trang",
    type: "subsidized",
    keyStops: ["Vũng Thùng", "Ngô Quyền", "Ngũ Hành Sơn", "Tiên Sơn", "Xô Viết Nghệ Tĩnh", "Nguyễn Hữu Thọ", "Cầu Cẩm Lệ", "Phạm Hùng"],
  },
  {
    no: "11",
    name: "Xuân Diệu – BV Phụ sản Nhi",
    from: "Trạm xe buýt Xuân Diệu",
    to: "Bệnh viện Phụ sản Nhi",
    hours: "05:30 – 19:00",
    frequency: "15 phút (cao điểm) · 30 phút (còn lại)",
    price: "8.000đ",
    operator: "Phương Trang",
    type: "subsidized",
  },
  {
    no: "12",
    name: "Xuân Diệu – BXB Phạm Hùng",
    from: "Trạm xe buýt Xuân Diệu",
    to: "Bến xe buýt Phạm Hùng",
    hours: "05:30 – 19:00",
    frequency: "15 phút (cao điểm) · 30 phút (còn lại)",
    price: "8.000đ",
    operator: "Phương Trang",
    type: "subsidized",
  },

  // Tuyến không trợ giá – nội thành
  {
    no: "02",
    name: "Bến xe TT – TTHCTP – Cửa Đại",
    from: "Bến xe Trung tâm Đà Nẵng",
    to: "Cửa Đại (Hội An)",
    hours: "05:30 – 17:30",
    frequency: "~20 phút",
    price: "20.000đ",
    distance: "~35km",
    operator: "Phương Trang",
    type: "unsubsidized",
    touristFriendly: true,
    keyStops: ["Bến xe Trung tâm", "Trung tâm hành chính TP", "Lê Văn Hiến", "Ngũ Hành Sơn", "Cửa Đại – Hội An"],
  },
  {
    no: "03",
    name: "Sân bay Đà Nẵng – Bà Nà Hills",
    from: "Sân bay Đà Nẵng",
    to: "Khu du lịch Bà Nà Hills",
    hours: "07:00 – 18:00",
    frequency: "15 – 30 phút",
    price: "15.000 – 30.000đ",
    operator: "Phương Trang",
    type: "unsubsidized",
    touristFriendly: true,
    keyStops: ["Sân bay Đà Nẵng", "Nguyễn Văn Linh", "Nguyễn Tri Phương", "Điện Biên Phủ", "Tôn Đức Thắng", "Hoàng Văn Thái", "Bà Nà Hills"],
  },
  {
    no: "06",
    name: "Sân bay – Đại học Việt Hàn",
    from: "Sân bay Đà Nẵng",
    to: "Đại học Việt Hàn",
    hours: "05:30 – 19:00",
    frequency: "–",
    price: "–",
    type: "unsubsidized",
  },
  {
    no: "09",
    name: "BV Ung Bướu – Phạm Hùng",
    from: "Bệnh viện Ung Bướu",
    to: "Phạm Hùng",
    hours: "–",
    frequency: "–",
    price: "–",
    type: "unsubsidized",
  },
  {
    no: "13",
    name: "BV Ung Bướu – Đại học Việt Hàn",
    from: "Bệnh viện Ung Bướu",
    to: "Đại học Việt Hàn",
    hours: "–",
    frequency: "–",
    price: "–",
    type: "unsubsidized",
  },
  {
    no: "14",
    name: "Cảng sông Hàn – Khu CNC",
    from: "Cảng sông Hàn",
    to: "Khu công nghệ cao",
    hours: "–",
    frequency: "–",
    price: "–",
    type: "unsubsidized",
  },
  {
    no: "21",
    name: "Bến xe TT – TTHCTP – Cầu Tam Kỳ",
    from: "Bến xe Trung tâm",
    to: "Cầu Tam Kỳ (P. Hương Trà)",
    hours: "–",
    frequency: "–",
    price: "–",
    type: "unsubsidized",
  },

  // Đang làm thủ tục vận hành
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
  },

  // Tuyến du lịch (không trợ giá – Quảng Nam cũ)
  {
    no: "01SB",
    name: "Sân Bay Đà Nẵng – Hội An",
    from: "Sân bay Đà Nẵng",
    to: "Hội An",
    hours: "05:10 – 18:00",
    frequency: "15 – 30 phút",
    price: "30.000đ",
    distance: "~30km",
    type: "tourist",
    touristFriendly: true,
    keyStops: ["Sân bay Đà Nẵng", "Nguyễn Văn Linh", "Điện Biên Phủ", "Cầu Rồng", "Bạch Đằng", "Ngũ Hành Sơn", "04 Lý Thường Kiệt (Hội An)"],
  },
  {
    no: "01DL",
    name: "Hội An – Mỹ Sơn – Cổng trời Đông Giang",
    from: "Hội An",
    to: "Cổng trời Đông Giang",
    hours: "08:10 & 14:10 (từ Hội An)",
    frequency: "2 chuyến/ngày",
    price: "Liên hệ",
    type: "tourist",
    touristFriendly: true,
    keyStops: ["04 Lý Thường Kiệt (Hội An)", "Khu Đền tháp Mỹ Sơn", "Cổng trời Đông Giang"],
  },

  // Tuyến liền kề (liên tỉnh)
  {
    no: "LK01",
    name: "Đà Nẵng – Huế",
    from: "Bến xe Trung tâm Đà Nẵng",
    to: "Bến xe phía Nam Huế",
    hours: "05:30 – 19:00",
    frequency: "14 – 15 phút",
    price: "80.000đ",
    distance: "100km",
    type: "interprovincial",
    touristFriendly: true,
    keyStops: ["Bến xe Trung tâm ĐN", "Tôn Đức Thắng", "Nguyễn Lương Bằng", "Hầm Hải Vân", "QL1A", "Bến xe phía Nam Huế"],
  },
];

// ── Nhóm theo loại ────────────────────────────────────────────────────────────

export const ROUTE_GROUPS: { type: BusRouteType | "pending"; label: string; desc: string; color: string; badge: string }[] = [
  { type: "subsidized",      label: "Có trợ giá",     desc: "5 tuyến · Phương Trang · Giá 8.000đ/lượt",           color: "emerald", badge: "bg-emerald-600" },
  { type: "tourist",         label: "Du lịch",         desc: "Sân bay → Hội An · Hội An → Mỹ Sơn",                  color: "sky",     badge: "bg-sky-500" },
  { type: "unsubsidized",    label: "Không trợ giá",   desc: "Tuyến nội thành & ngoại ô đang vận hành",             color: "violet",  badge: "bg-violet-600" },
  { type: "interprovincial", label: "Liên tỉnh",       desc: "Đà Nẵng – Huế · 80.000đ suốt tuyến",                 color: "orange",  badge: "bg-orange-500" },
  { type: "pending",         label: "Sắp vận hành",    desc: "Đang hoàn thiện thủ tục vận hành",                    color: "gray",    badge: "bg-gray-400" },
];

// ── Lịch trình du lịch A→B ────────────────────────────────────────────────────

export const journeyGuides: JourneyGuide[] = [
  {
    from: "Trung tâm Đà Nẵng",
    to: "Bà Nà Hills",
    busNo: "03",
    time: "07:00 – 18:00",
    freq: "15–30 phút/chuyến",
    price: "30.000đ",
    duration: "~1 giờ 15 phút",
    steps: [
      "Ra đường Nguyễn Văn Linh hoặc Điện Biên Phủ (đi bộ ~10–15 phút từ trung tâm)",
      "Bắt Bus số 03 hướng Bà Nà Hills",
      "Lộ trình: Sân bay → Nguyễn Văn Linh → Điện Biên Phủ → Tôn Đức Thắng → Hoàng Văn Thái → Bà Nà Hills",
      "Xuống bãi đỗ xe Bà Nà, mua vé cáp treo lên khu du lịch",
    ],
    tip: "Nên đi chuyến trước 8h sáng để tránh đông. Bus quay lại trung tâm khoảng 17:00–19:00.",
  },
  {
    from: "Trung tâm Đà Nẵng",
    to: "Ngũ Hành Sơn",
    busNo: "02",
    time: "05:30 – 17:30",
    freq: "~20 phút/chuyến",
    price: "20.000đ",
    duration: "30–40 phút",
    steps: [
      "Ra điểm dừng xe buýt tại khu vực Nhà thờ Con Gà (đi bộ ~3–5 phút)",
      "Bắt Bus số 02 (Bến xe Trung tâm – TTHC – Cửa Đại)",
      "Xuống tại 754 Lê Văn Hiến (gần khu thắng cảnh Ngũ Hành Sơn)",
      "Đi bộ 2–8 phút vào khu vực Ngũ Hành Sơn",
    ],
  },
  {
    from: "Sân bay Đà Nẵng",
    to: "Hội An",
    busNo: "01SB",
    time: "05:10 – 18:00",
    freq: "15–30 phút/chuyến",
    price: "30.000đ",
    duration: "~1 giờ",
    steps: [
      "Ra cửa Arrivals, đi bộ ~3 phút đến trạm xe buýt sân bay",
      "Bắt Bus số 01SB hướng Hội An",
      "Lộ trình: Sân bay → Nguyễn Văn Linh → Điện Biên Phủ → Bạch Đằng → Ngũ Hành Sơn → Hội An",
      "Xuống tại 04 Lý Thường Kiệt, Hội An (điểm cuối tuyến)",
    ],
    tip: "Xe buýt có khoang hành lý rộng, phù hợp mang vali. Chạy đến 18h nên chú ý giờ về.",
  },
  {
    from: "Hội An",
    to: "Mỹ Sơn",
    busNo: "01DL",
    time: "08:10 & 14:10 (từ Hội An)",
    freq: "2 chuyến/ngày",
    price: "Liên hệ",
    duration: "~50 phút",
    steps: [
      "Đến điểm bắt xe buýt: 04 Đường Lý Thường Kiệt, Hội An",
      "Bắt Bus du lịch số 01DL: Hội An – Mỹ Sơn – Cổng trời Đông Giang",
      "Xuống tại bãi xe Khu Đền tháp Mỹ Sơn",
    ],
    tip: "Giờ xuất bến từ Mỹ Sơn: 09:00 và 15:00. Chỉ có 2 chuyến/ngày nên đặt trước.",
  },
  {
    from: "Đà Nẵng",
    to: "Huế",
    busNo: "LK01",
    time: "05:30 – 19:00",
    freq: "14–15 phút/chuyến",
    price: "80.000đ",
    duration: "~2 giờ 30 phút",
    steps: [
      "Ra Bến xe Trung tâm Đà Nẵng (số 33 Điện Biên Phủ)",
      "Bắt Bus LK01 hướng Huế",
      "Qua Hầm Hải Vân (khoảng 1 tiếng từ Đà Nẵng)",
      "Đến Bến xe phía Nam Huế",
    ],
    tip: "Đây là tuyến nhanh và rẻ hơn taxi/xe khách. Chạy qua Hầm Hải Vân nên không thấy đèo.",
  },
];
