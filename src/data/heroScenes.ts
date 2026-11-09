export interface HeroScene {
  id: "hdpe" | "upvc" | "ppr" | "electric";
  tabLabel: string;
  tabCategory: string;
  shortDesc: string;
  fullName: string;
  categorySlug: string;
  detailUrl: string;
  quoteUrl: string;
  badgeText: string;
  tagline: string;
  image: string;
  secondaryImage?: string;
  accent: {
    primary: string;
    glow: string;
    cyan: string;
    badgeBg: string;
    badgeBorder: string;
    textClass: string;
    spotlightClass: string;
  };
  keyHighlights: string[];
  applicationTags: string[];
  specs: {
    label: string;
    value: string;
  }[];
}

export const HERO_SCENES: HeroScene[] = [
  {
    id: "hdpe",
    tabLabel: "1. Ống HDPE PE100",
    tabCategory: "Hạ tầng ngầm & Cấp nước áp lực",
    shortDesc: "Vật liệu PE100 nguyên sinh, uốn dẻo theo địa hình, độ bền trên 50 năm.",
    fullName: "Ống Nhựa HDPE Ströman PE100",
    categorySlug: "hdpe",
    detailUrl: "/san-pham/ong-nhua-hdpe-stroman-pe100",
    quoteUrl: "/du-toan-bao-gia?category=hdpe",
    badgeText: "VẬT LIỆU PE100 NGUYÊN SINH • BỀN BỈ 50+ NĂM",
    tagline: "Ống nhựa đen sọc xanh chuyên dụng ngầm hóa & truyền dẫn áp lực cao",
    image: "https://stroman.vn/Upload/products/Ong-nhua-HDPE134248429157536896.png",
    accent: {
      primary: "#006C41",
      glow: "rgba(0, 108, 65, 0.45)",
      cyan: "#06B6D4",
      badgeBg: "bg-emerald-500/15",
      badgeBorder: "border-emerald-500/30",
      textClass: "text-emerald-400",
      spotlightClass: "from-emerald-500/20 via-cyan-500/10 to-transparent",
    },
    keyHighlights: [
      "100% hạt nhựa PE100 nhập khẩu từ tập đoàn hóa chất hàng đầu",
      "Hàm lượng Carbon Black >= 2% kháng tia tử ngoại UV ngoài trời",
      "Độ đàn hồi cao, chống động đất & sụt lún nền móng",
      "Mối hàn nhiệt đối đầu (butt fusion) hòa tan liền khối không rò rỉ",
    ],
    applicationTags: [
      "Mạng lưới cấp nước đô thị",
      "Hạ tầng khu công nghiệp",
      "Dẫn bùn quặng & nước biển",
      "Thủy lợi nông nghiệp",
    ],
    specs: [
      { label: "Tiêu chuẩn", value: "ISO 4427 / TCVN 7305" },
      { label: "Áp lực", value: "PN6 – PN20 (SDR11/17)" },
      { label: "Đường kính", value: "Ø20mm – Ø1200mm" },
      { label: "Tuổi thọ", value: "Trên 50 năm" },
    ],
  },
  {
    id: "upvc",
    tabLabel: "2. Ống uPVC Chuẩn Đức",
    tabCategory: "Cấp nước sạch & Thoát nước thải",
    shortDesc: "Đạt chuẩn ISO 1452 / TCVN 8491, công nghệ CHLB Đức, lòng ống siêu nhẵn.",
    fullName: "Ống Nhựa uPVC Ströman Hệ Mét & Hệ Inch",
    categorySlug: "upvc",
    detailUrl: "/san-pham/ong-nhua-upvc-he-met",
    quoteUrl: "/du-toan-bao-gia?category=upvc",
    badgeText: "CÔNG NGHỆ CHLB ĐỨC • KHÔNG CHÌ AN TOÀN",
    tagline: "Giải pháp hàng đầu cho thoát nước trọng lực & cấp nước sinh hoạt",
    image: "https://stroman.vn/Upload/products/He-Met134248426535377688.png",
    secondaryImage: "https://stroman.vn/Upload/products/Ong-nhua-uPVC134248424738456593.png",
    accent: {
      primary: "#0284C7",
      glow: "rgba(2, 132, 199, 0.45)",
      cyan: "#38BDF8",
      badgeBg: "bg-sky-500/15",
      badgeBorder: "border-sky-500/30",
      textClass: "text-sky-400",
      spotlightClass: "from-sky-500/20 via-cyan-500/10 to-transparent",
    },
    keyHighlights: [
      "Nguyên liệu PVC nguyên sinh nhập khẩu từ Đức & Nhật Bản",
      "Lòng ống nhẵn bóng (Hazen-Williams C = 150), chống lắng cặn",
      "Kháng axit, bazơ, kiềm và hóa chất ăn mòn trong nước thải",
      "Đầy đủ quy cách nong đầu gioăng cao su & nong dán keo",
    ],
    applicationTags: [
      "Thoát nước thải & nước mưa",
      "Cấp nước sạch sinh hoạt",
      "Hộp kỹ thuật nhà cao tầng",
      "Ống luồn cáp viễn thông",
    ],
    specs: [
      { label: "Tiêu chuẩn", value: "ISO 1452 / TCVN 8491" },
      { label: "Áp suất", value: "PN6 – PN25 (Class 0 - 3)" },
      { label: "Đường kính", value: "Ø21mm – Ø400mm" },
      { label: "Liên kết", value: "Gioăng / Dán keo" },
    ],
  },
  {
    id: "ppr",
    tabLabel: "3. Ống PP-R Chịu Nhiệt",
    tabCategory: "Nước nóng lạnh 95°C & Kháng khuẩn",
    shortDesc: "Chịu nhiệt độ cao tới 95°C, công nghệ hàn nhiệt hòa tan chống rò rỉ vĩnh viễn.",
    fullName: "Ống Nhựa PP-R Chịu Nhiệt & Kháng Khuẩn Nano Bạc",
    categorySlug: "ppr",
    detailUrl: "/san-pham/ong-nhua-ppr-stroman",
    quoteUrl: "/du-toan-bao-gia?category=ppr",
    badgeText: "CHỊU NHIỆT 95°C • BẢO HÀNH 10 NĂM",
    tagline: "Đẳng cấp châu Âu cho đường nước nóng năng lượng mặt trời & biệt thự",
    image: "https://stroman.vn/Upload/products/Ong-nhua-PPR134248427957542709.png",
    secondaryImage: "https://stroman.vn/Upload/products/Ong-nhua-PPR-Khang-Khuan134248423105369332.png",
    accent: {
      primary: "#10B981",
      glow: "rgba(16, 185, 129, 0.45)",
      cyan: "#34D399",
      badgeBg: "bg-emerald-500/15",
      badgeBorder: "border-emerald-500/30",
      textClass: "text-emerald-400",
      spotlightClass: "from-emerald-500/20 via-teal-500/10 to-transparent",
    },
    keyHighlights: [
      "Hạt nhựa PP-R Random Copolymer nhập khẩu từ Borealis & Basell",
      "Mối nối hàn nhiệt 260°C hòa tan nguyên khối, triệt tiêu 100% rò rỉ",
      "Giữ nhiệt tối ưu với hệ số dẫn nhiệt thấp chỉ 0.24 W/m.K",
      "Dòng Nano Silver diệt 99.9% vi khuẩn, chuẩn y tế uống tại vòi",
    ],
    applicationTags: [
      "Hệ thống cấp nước nóng lạnh",
      "Bơm nhiệt Heatpump & Thái dương năng",
      "Bệnh viện, khách sạn 5 sao",
      "Đường ống hơi công nghiệp",
    ],
    specs: [
      { label: "Tiêu chuẩn", value: "DIN 8077/8078 / ISO 15874" },
      { label: "Nhiệt độ đỉnh", value: "Lên tới 110°C" },
      { label: "Áp suất", value: "PN10 – PN25" },
      { label: "Bảo hành", value: "10 năm chính hãng" },
    ],
  },
  {
    id: "electric",
    tabLabel: "4. Ống Luồn Dây Điện",
    tabCategory: "Bảo vệ cáp & Chống cháy lan",
    shortDesc: "Nhựa uPVC chống cháy tự tắt lửa, chịu lực nén 750N, uốn cong cơ học không gãy.",
    fullName: "Ống Luồn Dây Điện uPVC Chống Cháy Ströman",
    categorySlug: "upvc",
    detailUrl: "/san-pham?category=upvc",
    quoteUrl: "/du-toan-bao-gia?category=upvc",
    badgeText: "CHỐNG CHÁY LAN • CHỊU LỰC NÉN 750N",
    tagline: "Bảo vệ tuyệt đối hệ thống cáp điện ngầm và âm tường công trình",
    image: "https://stroman.vn/Upload/products/Ong-nhua-uPVC134248424738456593.png",
    accent: {
      primary: "#EAB308",
      glow: "rgba(234, 179, 8, 0.45)",
      cyan: "#FDE047",
      badgeBg: "bg-amber-500/15",
      badgeBorder: "border-amber-500/30",
      textClass: "text-amber-400",
      spotlightClass: "from-amber-500/20 via-yellow-500/10 to-transparent",
    },
    keyHighlights: [
      "Tự dập tắt lửa khi dời khỏi nguồn nhiệt, chống cháy lan hiệu quả",
      "Khả năng chịu lực nén cơ học 750N, không móp méo khi đổ bê tông",
      "Vật liệu cách điện cực cao, ngăn ngừa nguy cơ rò điện âm tường",
      "Lòng ống trơn láng, luồn dây và kéo cáp nhanh chóng, nhẹ nhàng",
    ],
    applicationTags: [
      "Đi âm sàn bê tông & tường gạch",
      "Tòa nhà văn phòng & chung cư",
      "Hệ thống điện hạ tầng ngầm",
      "Hộp kỹ thuật điện công nghiệp",
    ],
    specs: [
      { label: "Tiêu chuẩn", value: "BS EN 61386 / TCVN 7417" },
      { label: "Lực nén", value: "750N / 1250N" },
      { label: "Tính năng", value: "Chống cháy tự tắt" },
      { label: "Quy cách", value: "Ø16, Ø20, Ø25, Ø32mm" },
    ],
  },
];
