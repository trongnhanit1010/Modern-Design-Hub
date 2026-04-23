export type EntertainmentCategory =
  | "theme-park"
  | "water-park"
  | "show"
  | "nightlife"
  | "kids"
  | "cinema"
  | "karaoke"
  | "adventure";

export const categoryLabels: Record<EntertainmentCategory, string> = {
  "theme-park": "Công viên giải trí",
  "water-park": "Công viên nước",
  show: "Show diễn nghệ thuật",
  nightlife: "Bar & Nightlife",
  kids: "Khu vui chơi trẻ em",
  cinema: "Rạp chiếu phim",
  karaoke: "Karaoke",
  adventure: "Trải nghiệm mạo hiểm",
};

export type EntertainmentItem = {
  id: number;
  slug: string;
  name: string;
  category: EntertainmentCategory;
  shortDescription: string;
  description: string;
  priceFrom: number;
  priceNote: string;
  address: string;
  district: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  facebook: string;
  notes: string[];
  openTime: string;
  closeTime: string;
  openDays: string;
  rating: number;
  reviews: number;
  views: number;
  cover: string;
  images: string[];
  highlights: string[];
  tag: string;
  tagColor: string;
};

export const entertainmentItems: EntertainmentItem[] = [
  {
    id: 1,
    slug: "ba-na-hills",
    name: "Sun World Bà Nà Hills",
    category: "theme-park",
    shortDescription:
      "Khu du lịch nghỉ dưỡng giải trí trên đỉnh núi với Cầu Vàng huyền thoại",
    description:
      "Sun World Bà Nà Hills là khu phức hợp giải trí - nghỉ dưỡng nổi tiếng bậc nhất Đà Nẵng, nằm ở độ cao 1.487m so với mực nước biển. Du khách có thể trải nghiệm hệ thống cáp treo đạt nhiều kỷ lục thế giới, tham quan Cầu Vàng biểu tượng, làng Pháp cổ kính, hầm rượu Debay và công viên Fantasy Park với hơn 90 trò chơi trong nhà.\n\nKhí hậu Bà Nà mát mẻ quanh năm, được mệnh danh là 'Đà Lạt của miền Trung'. Đây là điểm đến lý tưởng cho gia đình, cặp đôi và cả nhóm bạn muốn tận hưởng một ngày đầy trải nghiệm khó quên.",
    priceFrom: 950000,
    priceNote: "Vé cáp treo khứ hồi đã bao gồm Fantasy Park",
    address: "Thôn An Sơn, xã Hòa Ninh, huyện Hòa Vang, Đà Nẵng",
    district: "Hòa Vang",
    city: "Đà Nẵng",
    phone: "+84 (0)236 3749 888",
    email: "info@banahills.sunworld.vn",
    website: "banahills.sunworld.vn",
    facebook: "facebook.com/SunWorldBaNaHills",
    notes: [
      "Mang theo áo khoác mỏng vì nhiệt độ trên núi thấp hơn 8-10°C so với trung tâm",
      "Nên đặt vé online trước để tránh xếp hàng dài",
      "Trẻ em dưới 1m miễn phí vé cáp treo",
      "Không mang đồ ăn nước uống từ ngoài vào khu vực Fantasy Park",
    ],
    openTime: "07:00",
    closeTime: "22:00",
    openDays: "Tất cả các ngày trong tuần",
    rating: 4.7,
    reviews: 28450,
    views: 152340,
    cover:
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545569310-6df2e6ddf68a?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601331546420-a9000802c0a8?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519074069390-98277fc02a5d?w=1200&auto=format&fit=crop",
    ],
    highlights: [
      "Cầu Vàng nổi tiếng thế giới",
      "Cáp treo dài 5.801m đạt 4 kỷ lục Guinness",
      "Làng Pháp cổ tích trên đỉnh núi",
      "Fantasy Park 21.000m² với 90+ trò chơi",
    ],
    tag: "Biểu tượng Đà Nẵng",
    tagColor: "from-amber-400 via-orange-500 to-rose-500",
  },
  {
    id: 2,
    slug: "asia-park-sun-wheel",
    name: "Công viên Châu Á - Asia Park",
    category: "theme-park",
    shortDescription:
      "Tổ hợp công viên giải trí với Sun Wheel - một trong 10 vòng quay cao nhất thế giới",
    description:
      "Asia Park là công viên giải trí 9 ha bên bờ sông Hàn, kết hợp văn hóa 10 quốc gia châu Á với hơn 20 trò chơi mạo hiểm hiện đại. Điểm nhấn là Sun Wheel cao 115m, lung linh ánh đèn về đêm và mang đến góc nhìn toàn cảnh thành phố Đà Nẵng.\n\nVào buổi tối, công viên trở thành điểm hẹn lý tưởng với show ánh sáng, các tiết mục biểu diễn đường phố và khu vực ẩm thực đa dạng.",
    priceFrom: 200000,
    priceNote: "Vé vào cổng + Sun Wheel, miễn phí trẻ dưới 1m",
    address: "1 Phan Đăng Lưu, Hòa Cường Bắc, Hải Châu, Đà Nẵng",
    district: "Hải Châu",
    city: "Đà Nẵng",
    phone: "+84 (0)236 3681 666",
    email: "support@asiapark.sunworld.vn",
    website: "asiapark.sunworld.vn",
    facebook: "facebook.com/AsiaParkDanang",
    notes: [
      "Mở cửa từ chiều tối, đẹp nhất là khi lên đèn (sau 18:00)",
      "Một số trò chơi yêu cầu chiều cao từ 1m20",
      "Có khu food court phong cách châu Á",
    ],
    openTime: "15:00",
    closeTime: "22:00",
    openDays: "Thứ 3 đến Chủ nhật (Thứ 2 đóng cửa)",
    rating: 4.5,
    reviews: 12080,
    views: 67320,
    cover:
      "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551038247-3d9af20df552?w=1200&auto=format&fit=crop",
    ],
    highlights: [
      "Vòng quay Sun Wheel cao 115m",
      "9 khu văn hóa châu Á thu nhỏ",
      "Show nhạc nước về đêm",
      "Hơn 20 trò chơi mạo hiểm",
    ],
    tag: "Hot Night",
    tagColor: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    id: 3,
    slug: "mikazuki-water-park",
    name: "Mikazuki Water Park 365",
    category: "water-park",
    shortDescription:
      "Công viên nước trong nhà chuẩn Nhật Bản, hoạt động quanh năm bất kể thời tiết",
    description:
      "Mikazuki Water Park 365 là công viên nước trong nhà đầu tiên tại Việt Nam mang phong cách Nhật Bản. Với mái che hiện đại và hệ thống điều hòa nhiệt độ, công viên hoạt động cả 365 ngày trong năm. Các đường trượt cao tốc, hồ tạo sóng, suối lười và khu vui chơi cho trẻ em đều được thiết kế an toàn theo tiêu chuẩn Nhật.",
    priceFrom: 350000,
    priceNote: "Vé người lớn cả ngày, trẻ em < 1m20 giảm 50%",
    address: "Đường Nguyễn Tất Thành, Xuân Thiều, Liên Chiểu, Đà Nẵng",
    district: "Liên Chiểu",
    city: "Đà Nẵng",
    phone: "+84 (0)236 3666 777",
    email: "booking@mikazuki.com.vn",
    website: "mikazuki.com.vn",
    facebook: "facebook.com/MikazukiVietnam",
    notes: [
      "Bắt buộc mặc đồ bơi đúng quy chuẩn",
      "Có khu Onsen tắm khoáng nóng kiểu Nhật",
      "Cho thuê đồ bơi, khăn tắm tại quầy",
      "Có dịch vụ nhà hàng, café Nhật trong khuôn viên",
    ],
    openTime: "09:00",
    closeTime: "21:00",
    openDays: "Tất cả các ngày",
    rating: 4.6,
    reviews: 5240,
    views: 41280,
    cover:
      "https://images.unsplash.com/photo-1560090995-01632a28895b?w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560090995-01632a28895b?w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1200&auto=format&fit=crop",
    ],
    highlights: [
      "Công viên nước trong nhà 365 ngày",
      "Hệ thống đường trượt chuẩn Nhật",
      "Khu Onsen tắm khoáng nóng",
      "An toàn cho trẻ em",
    ],
    tag: "Family Pick",
    tagColor: "from-cyan-400 via-sky-500 to-blue-600",
  },
  {
    id: 4,
    slug: "show-ky-quan-thoi-gian",
    name: "Show 'Kỳ Quan Thời Gian'",
    category: "show",
    shortDescription:
      "Show diễn thực cảnh đa phương tiện hoành tráng tại Đảo Ký Ức Hội An",
    description:
      "'Kỳ Quan Thời Gian' là show diễn thực cảnh quy mô lớn nhất Việt Nam với hơn 500 diễn viên, tái hiện 400 năm lịch sử thương cảng Hội An rực rỡ. Sân khấu nổi trên mặt nước rộng 25.000m², kết hợp công nghệ ánh sáng laser, mapping 3D và pháo hoa nghệ thuật.",
    priceFrom: 600000,
    priceNote: "Vé hạng phổ thông, các hạng VIP cao hơn",
    address: "Đảo Ký Ức Hội An, Cẩm Nam, Hội An, Quảng Nam",
    district: "Cẩm Nam",
    city: "Hội An",
    phone: "+84 (0)235 3963 333",
    email: "show@hoianmemoriesland.com",
    website: "hoianmemoriesland.com",
    facebook: "facebook.com/HoiAnMemoriesShow",
    notes: [
      "Show diễn ra 1 lần/đêm, thường lúc 20:00",
      "Nên đến trước 30 phút để check-in",
      "Mang theo áo mưa mỏng vào mùa mưa (Oct-Dec)",
      "Không sử dụng flash khi chụp ảnh",
    ],
    openTime: "19:30",
    closeTime: "21:30",
    openDays: "Thứ 3 đến Chủ nhật",
    rating: 4.8,
    reviews: 8920,
    views: 53420,
    cover:
      "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&auto=format&fit=crop",
    ],
    highlights: [
      "Sân khấu thực cảnh 25.000m²",
      "500+ diễn viên chuyên nghiệp",
      "Công nghệ mapping 3D & laser",
      "Tái hiện 400 năm Hội An",
    ],
    tag: "Must See",
    tagColor: "from-rose-500 via-pink-500 to-purple-500",
  },
  {
    id: 5,
    slug: "sky36-bar-rooftop",
    name: "Sky36 Rooftop Bar",
    category: "nightlife",
    shortDescription:
      "Bar rooftop cao nhất miền Trung với view 360° toàn cảnh sông Hàn",
    description:
      "Sky36 nằm trên tầng 35-36 của Novotel Danang Premier Han River, là rooftop bar cao nhất miền Trung Việt Nam. Không gian sang trọng, DJ quốc tế, cocktail signature và tầm nhìn ngoạn mục ra cầu Rồng - cầu Sông Hàn về đêm tạo nên trải nghiệm đáng nhớ.",
    priceFrom: 250000,
    priceNote: "Phí vào cửa, đã bao gồm 1 đồ uống",
    address: "36 Bạch Đằng, Thạch Thang, Hải Châu, Đà Nẵng",
    district: "Hải Châu",
    city: "Đà Nẵng",
    phone: "+84 (0)236 3929 999",
    email: "sky36@novoteldanang.com",
    website: "sky36.vn",
    facebook: "facebook.com/Sky36DaNang",
    notes: [
      "Dress code: smart casual (không quần ngắn, dép lê)",
      "Yêu cầu khách trên 18 tuổi",
      "Nên đặt bàn trước vào cuối tuần",
      "Đẹp nhất là từ 19:00 trở đi",
    ],
    openTime: "18:00",
    closeTime: "02:00",
    openDays: "Tất cả các ngày",
    rating: 4.4,
    reviews: 3210,
    views: 28900,
    cover:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&auto=format&fit=crop",
    ],
    highlights: [
      "Rooftop cao nhất miền Trung",
      "View 360° sông Hàn về đêm",
      "DJ quốc tế biểu diễn cuối tuần",
      "Signature cocktail menu",
    ],
    tag: "Nightlife",
    tagColor: "from-violet-500 via-fuchsia-500 to-rose-500",
  },
  {
    id: 6,
    slug: "helio-center",
    name: "Helio Center - Khu vui chơi gia đình",
    category: "kids",
    shortDescription:
      "Trung tâm vui chơi giải trí trong nhà lớn nhất Đà Nẵng dành cho gia đình",
    description:
      "Helio Center là tổ hợp giải trí trong nhà lớn nhất Đà Nẵng với khu vui chơi trẻ em Tini World, sân trượt băng, bowling, game điện tử, food court và rạp chiếu phim. Là điểm hẹn lý tưởng cho cả gia đình vào cuối tuần.",
    priceFrom: 150000,
    priceNote: "Vé combo Tini World cho trẻ em",
    address: "Đường 2/9, Hòa Cường Bắc, Hải Châu, Đà Nẵng",
    district: "Hải Châu",
    city: "Đà Nẵng",
    phone: "+84 (0)236 3686 868",
    email: "info@heliocenter.vn",
    website: "heliocenter.vn",
    facebook: "facebook.com/HelioCenterDaNang",
    notes: [
      "Trẻ em dưới 6 tuổi cần có người lớn đi kèm",
      "Có khu sân trượt băng quanh năm",
      "Buffet hải sản chợ đêm Helio nổi tiếng",
    ],
    openTime: "09:00",
    closeTime: "22:00",
    openDays: "Tất cả các ngày",
    rating: 4.3,
    reviews: 6720,
    views: 35100,
    cover:
      "https://images.unsplash.com/photo-1566838173710-bcd4c8f0fcfc?w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1566838173710-bcd4c8f0fcfc?w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503424886307-b090341d25d1?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1200&auto=format&fit=crop",
    ],
    highlights: [
      "Tini World khu vui chơi trẻ em",
      "Sân trượt băng trong nhà",
      "Bowling 16 line",
      "Chợ đêm hải sản Helio",
    ],
    tag: "Family Hub",
    tagColor: "from-emerald-400 via-teal-500 to-cyan-500",
  },
  {
    id: 7,
    slug: "lotte-cinema-danang",
    name: "Lotte Cinema Đà Nẵng",
    category: "cinema",
    shortDescription:
      "Cụm rạp chiếu phim hiện đại với phòng IMAX và Super Plex tại Lotte Mart",
    description:
      "Lotte Cinema Đà Nẵng được trang bị hệ thống màn hình IMAX, ghế Super Plex và âm thanh Dolby Atmos. Đây là một trong những rạp chiếu phim hiện đại nhất thành phố, chiếu cập nhật các bom tấn quốc tế và phim Việt mới nhất.",
    priceFrom: 90000,
    priceNote: "Vé phim 2D thường, IMAX cao hơn",
    address: "Lotte Mart, 6 Nại Nam, Hòa Cường Bắc, Hải Châu, Đà Nẵng",
    district: "Hải Châu",
    city: "Đà Nẵng",
    phone: "+84 (0)236 3611 999",
    email: "danang@lottecinemavn.com",
    website: "lottecinemavn.com",
    facebook: "facebook.com/LotteCinemaVietnam",
    notes: [
      "Đặt vé qua app Lotte Cinema được giảm giá",
      "Combo bắp nước phong phú",
      "Có phòng Charlotte dành cho cặp đôi",
    ],
    openTime: "08:30",
    closeTime: "23:30",
    openDays: "Tất cả các ngày",
    rating: 4.4,
    reviews: 4180,
    views: 22650,
    cover:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=1200&auto=format&fit=crop",
    ],
    highlights: [
      "Phòng chiếu IMAX & Super Plex",
      "Âm thanh Dolby Atmos",
      "Phòng Charlotte cho cặp đôi",
      "Cập nhật bom tấn mới nhất",
    ],
    tag: "Cinema",
    tagColor: "from-red-500 via-rose-500 to-pink-600",
  },
  {
    id: 8,
    slug: "son-tra-jungle-zipline",
    name: "Sơn Trà Jungle Zipline",
    category: "adventure",
    shortDescription:
      "Trải nghiệm zipline xuyên rừng và trekking khám phá bán đảo Sơn Trà",
    description:
      "Tour adventure dài 4-6 giờ tại bán đảo Sơn Trà, kết hợp trekking khám phá hệ sinh thái rừng nhiệt đới, ngắm voọc chà vá chân nâu quý hiếm và trải nghiệm 5 đoạn zipline xuyên qua tán rừng với góc nhìn ngoạn mục ra biển.",
    priceFrom: 850000,
    priceNote: "Tour trọn gói bao gồm hướng dẫn viên & ăn trưa",
    address: "Bán đảo Sơn Trà, Thọ Quang, Sơn Trà, Đà Nẵng",
    district: "Sơn Trà",
    city: "Đà Nẵng",
    phone: "+84 (0)905 123 456",
    email: "tour@sontraadventure.vn",
    website: "sontraadventure.vn",
    facebook: "facebook.com/SonTraJungleAdventure",
    notes: [
      "Yêu cầu sức khỏe tốt, không phù hợp với phụ nữ mang thai",
      "Cân nặng 30-110kg để đảm bảo an toàn zipline",
      "Mang giày trekking, áo dài tay",
      "Khởi hành cố định 8:00 sáng",
    ],
    openTime: "08:00",
    closeTime: "16:00",
    openDays: "Thứ 2 đến Thứ 7",
    rating: 4.9,
    reviews: 1280,
    views: 14200,
    cover:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533873984035-25970ab07461?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?w=1200&auto=format&fit=crop",
    ],
    highlights: [
      "5 đoạn zipline xuyên rừng",
      "Ngắm voọc chà vá chân nâu",
      "Hướng dẫn viên chuyên nghiệp",
      "View biển từ đỉnh núi",
    ],
    tag: "Adrenaline",
    tagColor: "from-lime-400 via-emerald-500 to-teal-600",
  },
];
