export interface ApplicationItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  recommendedPipes: string[];
  benefits: string[];
}

export const applicationsData: ApplicationItem[] = [
  {
    id: "app-water-supply-drainage",
    slug: "cap-thoat-nuoc",
    title: "Cấp Thoát Nước Đô Thị",
    subtitle: "Hạ tầng bền vững cho khu đô thị & thành phố",
    image: "/images/applications/cap-thoat-nuoc.jpg",
    description:
      "Ống nhựa Stroman cung cấp giải pháp trọn gói từ đường ống truyền tải nước sạch áp lực lớn đến hệ thống thu gom thoát nước mưa và nước thải cho các khu đô thị mới, chống rò rỉ và sụt lún.",
    recommendedPipes: ["Ống HDPE PE100 (Ø90 - Ø1200)", "Ống uPVC Hệ Met (Ø110 - Ø400)"],
    benefits: [
      "Tuổi thọ trên 50 năm chôn ngầm",
      "Khả năng chống nứt gãy và uốn lượn theo địa hình",
      "Kín khít tuyệt đối với mối hàn đối đầu hoặc gioăng cao su",
    ],
  },
  {
    id: "app-agriculture-irrigation",
    slug: "thuy-loi-nong-nghiep",
    title: "Thủy Lợi & Nông Nghiệp",
    subtitle: "Tưới tiêu tự động & nông nghiệp công nghệ cao",
    image: "/images/applications/thuy-loi-nong-nghiep.png",
    description:
      "Tối ưu hóa nguồn nước tưới cho trang trại hoa quả, cao su, cà phê và nuôi trồng thủy sản. Kháng phân bón, thuốc bảo vệ thực vật và chịu được bức xạ mặt trời gay gắt.",
    recommendedPipes: ["Ống HDPE cuộn (Ø20 - Ø90)", "Ống uPVC thoát nước"],
    benefits: [
      "Kháng tia cực tím UV không giòn gãy ngoài trời",
      "Chống đóng rong rêu và tắc nghẽn béc tưới nhỏ giọt",
      "Tiết kiệm 40% chi phí lắp đặt và bảo dưỡng",
    ],
  },
  {
    id: "app-civil-construction",
    slug: "dan-dung",
    title: "Xây Dựng Dân Dụng",
    subtitle: "Hệ thống cấp nước nóng lạnh & thoát sàn biệt thự, chung cư",
    image: "/images/applications/dan-dung.png",
    description:
      "Từ nhà phố đến các tòa nhà chọc trời, ống PP-R và uPVC Stroman đảm bảo lưu thông nước êm ái, cách âm vượt trội, không bao giờ lo rỉ sét hay thẩm thấu vào tường nhà.",
    recommendedPipes: ["Ống PP-R Chịu Nhiệt", "Ống PP-R Kháng Khuẩn", "Ống uPVC Thoát Nước"],
    benefits: [
      "Chịu nước sôi 95°C và áp suất tới 25 bar",
      "Cách âm lòng ống không gây tiếng ồn trong hộp kỹ thuật",
      "Mối hàn nhiệt hòa tan tạo khối liền khối vĩnh cửu",
    ],
  },
  {
    id: "app-infrastructure-building",
    slug: "xay-dung-ha-tang",
    title: "Xây Dựng Hạ Tầng KCN",
    subtitle: "Đường ống ngầm hạ tầng kỹ thuật & nhà máy",
    image: "/images/applications/xay-dung.png",
    description:
      "Hệ thống cấp nước cứu hỏa PCCC, xử lý nước thải công nghiệp và luồn cáp quang viễn thông trong các khu công nghiệp trọng điểm trên cả nước.",
    recommendedPipes: ["Ống HDPE PE100 PN16", "Ống uPVC nong gioăng"],
    benefits: [
      "Kháng hóa chất ăn mòn, axit công nghiệp",
      "Khả năng chịu tải trọng xe cộ lưu thông bên trên",
    ],
  },
  {
    id: "app-mining",
    slug: "khai-khoang",
    title: "Khai Khoáng & Bơm Bùn",
    subtitle: "Dẫn quặng mỏ, than bùn & nước biển ngập mặn",
    image: "/images/applications/khai-khoang.png",
    description:
      "Chịu mài mòn từ cát quặng và nước chua phèn ở các mỏ khoáng sản và công trình ven biển đảo.",
    recommendedPipes: ["Ống HDPE thành dày SDR11", "Ống HDPE áp lực cao"],
    benefits: [
      "Kháng mài mòn cao gấp 4 lần ống thép",
      "Không bị ăn mòn rỉ sét trong môi trường muối mặn",
    ],
  },
  {
    id: "app-light-industry",
    slug: "cong-nghiep-nhe",
    title: "Công Nghiệp Nhẹ & Thực Phẩm",
    subtitle: "Vận chuyển dung dịch tinh khiết & khí nén",
    image: "/images/applications/cong-nghiep-nhe.png",
    description:
      "Ống nhựa kháng khuẩn chuyên dụng cho các nhà máy chế biến thực phẩm, dược phẩm và dây chuyền đóng chai nước giải khát.",
    recommendedPipes: ["Ống PP-R Kháng Khuẩn Nano Silver"],
    benefits: [
      "Chuẩn vi sinh y tế an toàn thực phẩm",
      "Bề mặt trong siêu nhẵn hạn chế phát sinh vi khuẩn",
    ],
  },
];
