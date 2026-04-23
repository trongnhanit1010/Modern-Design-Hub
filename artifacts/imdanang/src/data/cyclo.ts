export interface CycloStop {
  id: number;
  name: string;
  durationMin: number;
  audioLengthSec: number;
  description: string;
}

export interface CycloTour {
  id: number;
  slug: string;
  name: string;
  area: "Đà Nẵng" | "Hội An";
  duration: string;
  durationMin: number;
  distanceKm: number;
  price: number;
  rating: number;
  reviews: number;
  languages: string[];
  startTime: string;
  image: string;
  gallery: string[];
  shortDesc: string;
  longDesc: string;
  highlights: string[];
  stops: CycloStop[];
  audioPreview: string;
  driverName: string;
  capacity: number;
}

export const cycloTours: CycloTour[] = [
  {
    id: 1,
    slug: "pho-co-hoi-an-vintage",
    name: "Phố Cổ Hội An – Hoài Niệm",
    area: "Hội An",
    duration: "60 phút",
    durationMin: 60,
    distanceKm: 4.2,
    price: 250000,
    rating: 4.9,
    reviews: 482,
    languages: ["Việt", "English", "Français"],
    startTime: "07:00 – 21:00",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1400&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&auto=format&fit=crop",
    ],
    shortDesc: "Vòng quanh phố cổ trên xích lô, nghe câu chuyện 400 năm qua tai nghe.",
    longDesc:
      "Hành trình xích lô đi qua những con phố vàng đặc trưng của Hội An, dừng tại Chùa Cầu, Hội Quán Phúc Kiến, nhà cổ Tấn Ký. Mỗi điểm dừng, thiết bị âm thanh tự động phát kể chuyện bằng giọng kể truyền cảm với nhạc nền đệm.",
    highlights: [
      "Đèn lồng rực rỡ vào buổi tối",
      "Tự động kể chuyện theo từng điểm dừng",
      "Tai nghe không dây cho từng khách",
      "Bác tài 20+ năm kinh nghiệm",
    ],
    stops: [
      { id: 1, name: "Chùa Cầu Nhật Bản", durationMin: 8,  audioLengthSec: 240, description: "Biểu tượng 400 năm của Hội An, do người Nhật xây dựng giữa thế kỷ 17." },
      { id: 2, name: "Hội Quán Phúc Kiến", durationMin: 10, audioLengthSec: 320, description: "Nơi thờ Thiên Hậu Thánh Mẫu, kiến trúc Trung Hoa cổ tinh xảo." },
      { id: 3, name: "Nhà Cổ Tấn Ký",      durationMin: 7,  audioLengthSec: 210, description: "Ngôi nhà cổ 200 năm tuổi, chứng nhân của thương cảng phồn hoa." },
      { id: 4, name: "Bến Bạch Đằng",      durationMin: 6,  audioLengthSec: 180, description: "Ngắm sông Hoài, nơi hoa đăng được thả mỗi đêm rằm." },
    ],
    audioPreview: "Chào mừng quý khách đến với Hội An – đô thị cổ được UNESCO công nhận năm 1999...",
    driverName: "Bác Tám",
    capacity: 1,
  },
  {
    id: 2,
    slug: "song-han-dem-danang",
    name: "Sông Hàn Đêm – Đà Nẵng",
    area: "Đà Nẵng",
    duration: "75 phút",
    durationMin: 75,
    distanceKm: 5.5,
    price: 320000,
    rating: 4.8,
    reviews: 351,
    languages: ["Việt", "English", "한국어"],
    startTime: "18:00 – 23:00",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1400&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?w=800&auto=format&fit=crop",
    ],
    shortDesc: "Ngắm Cầu Rồng phun lửa, đèn đêm rực rỡ ven sông Hàn.",
    longDesc:
      "Tour xích lô buổi tối dọc bờ sông Hàn, đi qua Cầu Rồng, Cầu Tình Yêu, Tượng Cá Chép Hóa Rồng. Tai nghe phát kể chuyện về sự phát triển của Đà Nẵng từ làng chài thành thành phố đáng sống nhất Việt Nam.",
    highlights: [
      "Cầu Rồng phun lửa lúc 21:00 cuối tuần",
      "Đèn led 7 màu sông Hàn",
      "Audio guide đa ngôn ngữ",
      "Có chỗ chụp hình check-in",
    ],
    stops: [
      { id: 1, name: "Cầu Rồng",          durationMin: 10, audioLengthSec: 280, description: "Cây cầu hình rồng dài 666m, biểu tượng Đà Nẵng hiện đại." },
      { id: 2, name: "Cầu Tình Yêu",      durationMin: 8,  audioLengthSec: 220, description: "Nơi treo những ổ khóa tình yêu, view sông Hàn lung linh." },
      { id: 3, name: "Cá Chép Hóa Rồng",  durationMin: 6,  audioLengthSec: 160, description: "Tượng đá trắng cao 7.5m, tâm linh và phong thủy của thành phố." },
      { id: 4, name: "Bến Du Thuyền",     durationMin: 7,  audioLengthSec: 200, description: "Nơi xuất phát các tour du thuyền sông Hàn buổi tối." },
    ],
    audioPreview: "Đêm đến, sông Hàn khoác lên mình tấm áo ánh sáng lộng lẫy...",
    driverName: "Anh Hùng",
    capacity: 1,
  },
  {
    id: 3,
    slug: "lang-nghe-truyen-thong",
    name: "Làng Nghề Truyền Thống",
    area: "Hội An",
    duration: "120 phút",
    durationMin: 120,
    distanceKm: 8.0,
    price: 480000,
    rating: 4.9,
    reviews: 218,
    languages: ["Việt", "English"],
    startTime: "08:00 – 16:00",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=1400&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542315192-1f61a1792f33?w=800&auto=format&fit=crop",
    ],
    shortDesc: "Khám phá làng gốm Thanh Hà, làng mộc Kim Bồng & làng rau Trà Quế.",
    longDesc:
      "Tour dài đưa du khách qua 3 làng nghề trứ danh của Hội An. Audio guide kể về lịch sử mỗi làng, kỹ thuật làm nghề và những nghệ nhân hơn 50 năm tuổi nghề.",
    highlights: [
      "Trải nghiệm nặn gốm tại làng",
      "Học làm rau Trà Quế truyền thống",
      "Audio guide có phần phỏng vấn nghệ nhân",
      "Tour dài, kèm nước & khăn lạnh",
    ],
    stops: [
      { id: 1, name: "Làng Gốm Thanh Hà", durationMin: 30, audioLengthSec: 480, description: "Làng nghề 500 năm với những lò gốm đỏ rực." },
      { id: 2, name: "Làng Mộc Kim Bồng", durationMin: 25, audioLengthSec: 420, description: "Làng mộc cung cấp gỗ cho Kinh Thành Huế xưa." },
      { id: 3, name: "Làng Rau Trà Quế",  durationMin: 25, audioLengthSec: 360, description: "Ruộng rau hữu cơ thơm dậy hương khắp đồng." },
    ],
    audioPreview: "Hội An không chỉ có phố cổ, mà còn có ba làng nghề trứ danh...",
    driverName: "Bác Sáu",
    capacity: 1,
  },
  {
    id: 4,
    slug: "binh-minh-bien-my-khe",
    name: "Bình Minh Biển Mỹ Khê",
    area: "Đà Nẵng",
    duration: "90 phút",
    durationMin: 90,
    distanceKm: 6.0,
    price: 380000,
    rating: 4.7,
    reviews: 165,
    languages: ["Việt", "English"],
    startTime: "05:00 – 07:00",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1400&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
    ],
    shortDesc: "Đón bình minh trên biển Mỹ Khê – top 6 bãi biển đẹp nhất hành tinh.",
    longDesc:
      "Khởi hành từ 5 giờ sáng, xích lô đưa bạn dọc đường Hoàng Sa – Trường Sa, dừng tại các điểm ngắm bình minh đẹp nhất. Audio guide phát nhạc thiền nhẹ và lời kể về biển Đà Nẵng.",
    highlights: [
      "Bình minh tuyệt đẹp lúc 5:30",
      "Ngắm thuyền cá làng chài Mân Thái",
      "Nhạc thiền sáng sớm thư giãn",
      "Khăn ấm & bữa sáng nhẹ",
    ],
    stops: [
      { id: 1, name: "Bãi Mỹ Khê",        durationMin: 25, audioLengthSec: 300, description: "Top 6 bãi biển quyến rũ nhất hành tinh theo Forbes." },
      { id: 2, name: "Làng Chài Mân Thái", durationMin: 20, audioLengthSec: 240, description: "Làng chài cổ với thuyền thúng đặc trưng." },
      { id: 3, name: "Bãi Phạm Văn Đồng", durationMin: 20, audioLengthSec: 220, description: "Bãi tắm công cộng đẹp nhất Đà Nẵng." },
    ],
    audioPreview: "Bình minh trên biển Đà Nẵng là một trong những khoảnh khắc đẹp nhất...",
    driverName: "Anh Tâm",
    capacity: 1,
  },
  {
    id: 5,
    slug: "ngu-hanh-son-tam-linh",
    name: "Ngũ Hành Sơn Tâm Linh",
    area: "Đà Nẵng",
    duration: "150 phút",
    durationMin: 150,
    distanceKm: 12.0,
    price: 550000,
    rating: 4.8,
    reviews: 142,
    languages: ["Việt", "English"],
    startTime: "07:00 – 14:00",
    image: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=1400&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=800&auto=format&fit=crop",
    ],
    shortDesc: "Hành trình tâm linh qua 5 ngọn núi đá vôi linh thiêng.",
    longDesc:
      "Tour kết hợp xích lô + leo bộ khám phá quần thể Ngũ Hành Sơn. Audio guide kể chuyện thần thoại Kim – Mộc – Thủy – Hỏa – Thổ và các ngôi chùa cổ.",
    highlights: [
      "Leo 156 bậc lên đỉnh Thủy Sơn",
      "Thăm động Huyền Không huyền bí",
      "Audio guide có nhạc thiền chuông chùa",
      "Bao gồm vé vào cửa & nước",
    ],
    stops: [
      { id: 1, name: "Chùa Linh Ứng",     durationMin: 30, audioLengthSec: 380, description: "Ngôi chùa cổ trên đỉnh Thủy Sơn." },
      { id: 2, name: "Động Huyền Không",  durationMin: 25, audioLengthSec: 320, description: "Hang động lớn nhất, ánh sáng tự nhiên huyền ảo." },
      { id: 3, name: "Làng Đá Mỹ Nghệ",   durationMin: 20, audioLengthSec: 260, description: "Làng nghề điêu khắc đá nổi tiếng dưới chân núi." },
    ],
    audioPreview: "Ngũ Hành Sơn – nơi giao thoa giữa tín ngưỡng và thiên nhiên kỳ vĩ...",
    driverName: "Bác Long",
    capacity: 1,
  },
  {
    id: 6,
    slug: "hoi-an-am-thuc-ban-dem",
    name: "Hội An Ẩm Thực Đêm",
    area: "Hội An",
    duration: "90 phút",
    durationMin: 90,
    distanceKm: 5.0,
    price: 380000,
    rating: 4.9,
    reviews: 297,
    languages: ["Việt", "English", "日本語"],
    startTime: "18:00 – 22:00",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop",
    ],
    shortDesc: "Tour xích lô + thử 5 món đặc sản Hội An tại các quán địa phương.",
    longDesc:
      "Vừa đi vừa ăn! Bác tài đưa bạn đến 5 hàng quán nổi tiếng nhất phố cổ. Audio guide giới thiệu lịch sử món ăn, công thức cổ truyền và mẹo thưởng thức.",
    highlights: [
      "5 món: Cao Lầu, Mì Quảng, Bánh Mì, Hoành Thánh, Chè",
      "Audio kể chuyện đầu bếp 3 đời",
      "Ngắm đèn lồng dọc đường",
      "Bao trọn gói món ăn",
    ],
    stops: [
      { id: 1, name: "Cao Lầu Bà Bé",       durationMin: 18, audioLengthSec: 200, description: "Quán Cao Lầu gia truyền 3 đời." },
      { id: 2, name: "Bánh Mì Phượng",      durationMin: 15, audioLengthSec: 180, description: "Bánh mì nổi tiếng nhất Hội An, được Anthony Bourdain ca ngợi." },
      { id: 3, name: "Hoành Thánh Hội An",  durationMin: 15, audioLengthSec: 180, description: "Món hoành thánh chiên giòn rụm độc đáo." },
      { id: 4, name: "Chè Bà Hai",          durationMin: 12, audioLengthSec: 140, description: "Chè ngọt dịu, tráng miệng hoàn hảo." },
    ],
    audioPreview: "Ẩm thực Hội An là sự pha trộn của ba nền văn hóa Việt – Hoa – Nhật...",
    driverName: "Bác Hùng",
    capacity: 1,
  },
];

export function findCycloBySlug(slug: string) {
  return cycloTours.find((t) => t.slug === slug);
}
