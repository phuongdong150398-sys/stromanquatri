import { Product, CategoryMeta } from "@/types/product";

export const categoriesMeta: CategoryMeta[] = [
  {
    id: "upvc",
    name: "Ống & Phụ Kiện uPVC",
    tagline: "Tiêu chuẩn ISO 1452 & TCVN 8491 - Công nghệ Đức",
    description:
      "Dòng ống uPVC cao cấp phục vụ thoát nước thải, cấp nước sạch và ống luồn bảo vệ cáp điện ngầm. Độ bền cơ học cao, không độc hại, chịu áp lực va đập vượt trội.",
    image: "https://stroman.vn/Upload/products/Ong-nhua-uPVC134248424738456593.png",
    featuredCount: 42,
  },
  {
    id: "ppr",
    name: "Ống & Phụ Kiện PP-R",
    tagline: "Chịu nhiệt tới 95°C - Áp lực tới 25 bar",
    description:
      "Sản xuất từ hạt nhựa nguyên sinh PP-R nhập khẩu từ các tập đoàn hàng đầu thế giới (Borealis, Basell). Lý tưởng cho hệ thống cấp nước nóng lạnh dân dụng và công nghiệp.",
    image: "https://stroman.vn/Upload/products/Ong-nhua-PPR134248427957542709.png",
    featuredCount: 28,
  },
  {
    id: "ppr-antibacterial",
    name: "Ống PP-R Kháng Khuẩn",
    tagline: "Công nghệ Nano Bạc 3 lớp - An toàn tuyệt đối cho nước uống",
    description:
      "Cấu trúc 3 lớp tích hợp hợp chất kháng khuẩn Nano Silver, ngăn chặn 99.9% vi khuẩn, nấm mốc và rêu bám trong lòng ống. Đạt chuẩn y tế cao cấp nhất.",
    image: "https://stroman.vn/Upload/products/Ong-nhua-PPR-Khang-Khuan134248423105369332.png",
    featuredCount: 16,
  },
  {
    id: "hdpe",
    name: "Ống & Phụ Kiện HDPE",
    tagline: "Vật liệu PE100 nguyên sinh - Tuổi thọ trên 50 năm",
    description:
      "Ống chịu áp suất cực cao, dẻo dai, uốn lượn theo địa hình, kháng hóa chất ăn mòn và tia cực tím UV. Giải pháp số 1 cho hạ tầng đô thị, ngầm hóa và khai khoáng.",
    image: "https://stroman.vn/Upload/products/Ong-nhua-HDPE134248429157536896.png",
    featuredCount: 35,
  },
  {
    id: "fittings",
    name: "Phụ Kiện Đồng Bộ",
    tagline: "Cút, Tê, Măng Sông, Đầu Ren Đồng Cao Cấp",
    description:
      "Hệ phụ kiện đồng bộ 100% về kích cỡ và cơ tính với thân ống, giúp mối nối kín khít tuyệt đối, chống rò rỉ dưới mọi áp suất thử nghiệm.",
    image: "https://stroman.vn/Upload/products/Phu-kien-uPVC134248427637228230.png",
    featuredCount: 64,
  },
];

export const productsData: Product[] = [
  // --- 1. ỐNG uPVC ---
  {
    id: "upvc-pipe-metric",
    slug: "ong-nhua-upvc-he-met",
    name: "Ống Nhựa uPVC Stroman Hệ Met (TCVN 8491 / ISO 1452)",
    category: "upvc",
    categoryName: "Ống & Phụ Kiện uPVC",
    bannerBadge: "Bán chạy nhất",
    isFeatured: true,
    shortDesc:
      "Ống nhựa uPVC hệ mét tiêu chuẩn ISO 1452-2:2009 / TCVN 8491-2:2011, đường kính từ Ø21mm đến Ø400mm, độ bền cơ học cao, chịu hóa chất.",
    description:
      "Ống nhựa uPVC Stroman hệ mét được sản xuất trên dây chuyền công nghệ tự động hóa hoàn toàn từ CHLB Đức của hãng Krauss Maffei và Battenfeld-Cincinnati. Sản phẩm không chứa chì, an toàn tuyệt đối cho nguồn nước sinh hoạt và có độ nhẵn lòng ống tối ưu, giảm thiểu lực cản dòng chảy.",
    image: "https://stroman.vn/Upload/products/He-Met134248426535377688.png",
    features: [
      "Nguyên liệu nhựa PVC nguyên sinh nhập khẩu từ Đức, Nhật Bản, Đài Loan",
      "Khả năng chịu áp lực cao từ PN6 đến PN25",
      "Kháng hóa chất, axit, kiềm, không bị rỉ sét hay đóng cặn",
      "Trọng lượng nhẹ, dễ dàng vận chuyển và thi công nong đầu gioăng/dán keo",
    ],
    advantages: [
      "Tuổi thọ thiết kế lên đến 50 năm trong điều kiện tiêu chuẩn",
      "Độ đàn hồi cao, chống nứt gãy khi có rung chấn nhẹ nền móng",
      "Hệ số ma sát lòng ống cực thấp (hệ số Hazen-Williams C = 150)",
    ],
    applications: [
      "Hệ thống phân phối nước sạch sinh hoạt đô thị và nông thôn",
      "Hệ thống thoát nước mưa, nước thải gia đình và nhà máy",
      "Ống bảo vệ cáp điện, cáp viễn thông ngầm hóa",
      "Hệ thống tưới tiêu nông nghiệp hiện đại",
    ],
    standards: ["TCVN 8491:2011", "ISO 1452:2009", "DIN 8061/8062", "BS 3505"],
    specifications: [
      { code: "STR-UPVC-M21-C0", nominalDiameter: "Ø21 mm", pressureRating: "PN6 (Class 0)", wallThickness: "1.2 mm", standardLength: "4m", standard: "TCVN 8491" },
      { code: "STR-UPVC-M27-C1", nominalDiameter: "Ø27 mm", pressureRating: "PN8.5 (Class 1)", wallThickness: "1.5 mm", standardLength: "4m", standard: "TCVN 8491" },
      { code: "STR-UPVC-M34-C2", nominalDiameter: "Ø34 mm", pressureRating: "PN9 (Class 2)", wallThickness: "1.7 mm", standardLength: "4m", standard: "TCVN 8491" },
      { code: "STR-UPVC-M42-C2", nominalDiameter: "Ø42 mm", pressureRating: "PN9 (Class 2)", wallThickness: "2.1 mm", standardLength: "4m", standard: "TCVN 8491" },
      { code: "STR-UPVC-M60-C1", nominalDiameter: "Ø60 mm", pressureRating: "PN6.3 (Class 1)", wallThickness: "2.0 mm", standardLength: "4m", standard: "TCVN 8491" },
      { code: "STR-UPVC-M60-C2", nominalDiameter: "Ø60 mm", pressureRating: "PN8 (Class 2)", wallThickness: "2.5 mm", standardLength: "4m", standard: "TCVN 8491" },
      { code: "STR-UPVC-M90-C1", nominalDiameter: "Ø90 mm", pressureRating: "PN6 (Class 1)", wallThickness: "2.7 mm", standardLength: "4m", standard: "TCVN 8491" },
      { code: "STR-UPVC-M90-C2", nominalDiameter: "Ø90 mm", pressureRating: "PN9 (Class 2)", wallThickness: "3.8 mm", standardLength: "4m", standard: "TCVN 8491" },
      { code: "STR-UPVC-M110-C1", nominalDiameter: "Ø110 mm", pressureRating: "PN6 (Class 1)", wallThickness: "3.2 mm", standardLength: "4m", standard: "TCVN 8491" },
      { code: "STR-UPVC-M110-C2", nominalDiameter: "Ø110 mm", pressureRating: "PN9 (Class 2)", wallThickness: "4.2 mm", standardLength: "4m", standard: "TCVN 8491" },
      { code: "STR-UPVC-M110-C3", nominalDiameter: "Ø110 mm", pressureRating: "PN12.5 (Class 3)", wallThickness: "5.3 mm", standardLength: "4m", standard: "TCVN 8491" },
      { code: "STR-UPVC-M160-C2", nominalDiameter: "Ø160 mm", pressureRating: "PN9 (Class 2)", wallThickness: "6.2 mm", standardLength: "4m", standard: "TCVN 8491" },
      { code: "STR-UPVC-M200-C2", nominalDiameter: "Ø200 mm", pressureRating: "PN9 (Class 2)", wallThickness: "7.7 mm", standardLength: "4m", standard: "TCVN 8491" },
      { code: "STR-UPVC-M250-C2", nominalDiameter: "Ø250 mm", pressureRating: "PN9 (Class 2)", wallThickness: "9.6 mm", standardLength: "4m", standard: "TCVN 8491" },
      { code: "STR-UPVC-M315-C2", nominalDiameter: "Ø315 mm", pressureRating: "PN9 (Class 2)", wallThickness: "12.1 mm", standardLength: "4m", standard: "TCVN 8491" },
    ],
  },
  {
    id: "upvc-pipe-inch",
    slug: "ong-nhua-upvc-he-inch",
    name: "Ống Nhựa uPVC Stroman Hệ Inch (BS 3505)",
    category: "upvc",
    categoryName: "Ống & Phụ Kiện uPVC",
    isFeatured: false,
    shortDesc:
      "Ống nhựa uPVC hệ inch đường kính danh nghĩa từ 1/2 inch đến 8 inch (tương đương Ø21 đến Ø220), phù hợp các công trình cấp thoát nước dân dụng truyền thống.",
    description:
      "Dòng ống uPVC hệ inch sản xuất theo tiêu chuẩn Anh Quốc BS 3505 / AS/NZS 1477, chuyên dụng cho các nhà thầu thi công cải tạo và xây mới mạng lưới dân dụng quen thuộc với hệ đo lường inch.",
    image: "https://stroman.vn/Upload/products/He-Inch134248426348120967.png",
    features: [
      "Tương thích hoàn hảo với các phụ kiện van vòi ren hệ inch phổ biến tại Việt Nam",
      "Khả năng chống tia UV ngoài trời khi sử dụng các mã có phụ gia carbon black",
      "Mối nối dán keo dung môi tiện lợi, đông kết nhanh và chịu lực tức thì",
    ],
    advantages: [
      "Chi phí đầu tư tiết kiệm, hiệu quả kinh tế cao cho công trình nhà ở",
      "Trọng lượng nhẹ chỉ bằng 1/5 ống gang đúc cùng kích cỡ",
    ],
    applications: [
      "Cấp nước nhà phố, biệt thự, chung cư thấp tầng",
      "Ống thông hơi, ống thoát nước ban công, mái nhà",
    ],
    standards: ["BS 3505:1968", "AS/NZS 1477", "TCVN 6151"],
    specifications: [
      { code: "STR-UPVC-I1/2-C0", nominalDiameter: '1/2" (Ø21 mm)', pressureRating: "Class 0", wallThickness: "1.4 mm", standardLength: "4m", standard: "BS 3505" },
      { code: "STR-UPVC-I3/4-C1", nominalDiameter: '3/4" (Ø27 mm)', pressureRating: "Class 1", wallThickness: "1.8 mm", standardLength: "4m", standard: "BS 3505" },
      { code: "STR-UPVC-I1-C2", nominalDiameter: '1" (Ø34 mm)', pressureRating: "Class 2", wallThickness: "2.0 mm", standardLength: "4m", standard: "BS 3505" },
      { code: "STR-UPVC-I2-C2", nominalDiameter: '2" (Ø60 mm)', pressureRating: "Class 2", wallThickness: "2.8 mm", standardLength: "4m", standard: "BS 3505" },
      { code: "STR-UPVC-I3-C2", nominalDiameter: '3" (Ø90 mm)', pressureRating: "Class 2", wallThickness: "3.2 mm", standardLength: "4m", standard: "BS 3505" },
      { code: "STR-UPVC-I4-C2", nominalDiameter: '4" (Ø114 mm)', pressureRating: "Class 2", wallThickness: "3.8 mm", standardLength: "4m", standard: "BS 3505" },
    ],
  },

  // --- 2. ỐNG PP-R ---
  {
    id: "ppr-pipe-standard",
    slug: "ong-nhua-ppr-stroman",
    name: "Ống Nhựa Chịu Nhiệt PP-R Stroman (DIN 8077/8078)",
    category: "ppr",
    categoryName: "Ống & Phụ Kiện PP-R",
    bannerBadge: "Chịu nhiệt 95°C",
    isFeatured: true,
    shortDesc:
      "Ống chịu nhiệt PP-R Stroman chuyên dùng cho đường nước nóng lạnh, sản xuất từ hạt nhựa Random Copolymer Polypropylene nguyên sinh, áp suất PN10 đến PN25.",
    description:
      "Ống nhựa PP-R Stroman là giải pháp hàng đầu cho đường ống dẫn nước nóng năng lượng mặt trời, lò hơi và nước sinh hoạt cao cấp. Nhờ liên kết phân tử đồng nhất khi hàn nhiệt ở nhiệt độ 260°C, mối hàn hòa tan hoàn toàn tạo nên khối liền mạch, không bao giờ xảy ra hiện tượng rò rỉ tại khớp nối.",
    image: "https://stroman.vn/Upload/products/Ong-nhua-PPR134248427957542709.png",
    features: [
      "Chịu được nhiệt độ làm việc liên tục đến 95°C và nhiệt độ đỉnh lên tới 110°C",
      "Độ dẫn nhiệt thấp (0.24 W/m.K), giúp giữ nhiệt nước nóng cực tốt, tiết kiệm năng lượng",
      "Cách âm tuyệt vời, giảm tiếng ồn của dòng nước chảy xiết trong hộp kỹ thuật",
      "Bề mặt trong láng bóng, không bị vôi hóa, đóng cặn hay phát triển rong rêu",
    ],
    advantages: [
      "Tuyệt đối an toàn vệ sinh thực phẩm theo chuẩn DIN 1988 và tiêu chuẩn Đức",
      "Khả năng kháng mài mòn cao gấp 3 lần so với ống thép mạ kẽm",
      "Bảo hành chính hãng lên đến 10 năm",
    ],
    applications: [
      "Hệ thống cấp nước nóng lạnh khách sạn, resort, chung cư cao cấp",
      "Đường ống dẫn nước năng lượng mặt trời, bơm nhiệt Heatpump",
      "Đường ống dẫn khí nén, hóa chất lỏng trong công nghiệp chế biến",
      "Hệ thống sưởi ấm sàn nhà công nghệ mới",
    ],
    standards: ["DIN 8077:2008", "DIN 8078:2008", "ISO 15874", "TCVN 10097:2013"],
    specifications: [
      { code: "STR-PPR-20-PN10", nominalDiameter: "Ø20 mm", pressureRating: "PN10 (Nước lạnh)", wallThickness: "1.9 mm", standardLength: "4m", standard: "DIN 8077/8078" },
      { code: "STR-PPR-20-PN16", nominalDiameter: "Ø20 mm", pressureRating: "PN16 (Nước ấm/lạnh)", wallThickness: "2.3 mm", standardLength: "4m", standard: "DIN 8077/8078" },
      { code: "STR-PPR-20-PN20", nominalDiameter: "Ø20 mm", pressureRating: "PN20 (Nước nóng)", wallThickness: "3.4 mm", standardLength: "4m", standard: "DIN 8077/8078" },
      { code: "STR-PPR-25-PN10", nominalDiameter: "Ø25 mm", pressureRating: "PN10 (Nước lạnh)", wallThickness: "2.3 mm", standardLength: "4m", standard: "DIN 8077/8078" },
      { code: "STR-PPR-25-PN20", nominalDiameter: "Ø25 mm", pressureRating: "PN20 (Nước nóng)", wallThickness: "4.2 mm", standardLength: "4m", standard: "DIN 8077/8078" },
      { code: "STR-PPR-32-PN20", nominalDiameter: "Ø32 mm", pressureRating: "PN20 (Nước nóng)", wallThickness: "5.4 mm", standardLength: "4m", standard: "DIN 8077/8078" },
      { code: "STR-PPR-40-PN20", nominalDiameter: "Ø40 mm", pressureRating: "PN20 (Nước nóng)", wallThickness: "6.7 mm", standardLength: "4m", standard: "DIN 8077/8078" },
      { code: "STR-PPR-50-PN20", nominalDiameter: "Ø50 mm", pressureRating: "PN20 (Nước nóng)", wallThickness: "8.3 mm", standardLength: "4m", standard: "DIN 8077/8078" },
      { code: "STR-PPR-63-PN20", nominalDiameter: "Ø63 mm", pressureRating: "PN20 (Nước nóng)", wallThickness: "10.5 mm", standardLength: "4m", standard: "DIN 8077/8078" },
      { code: "STR-PPR-75-PN20", nominalDiameter: "Ø75 mm", pressureRating: "PN20 (Nước nóng)", wallThickness: "12.5 mm", standardLength: "4m", standard: "DIN 8077/8078" },
      { code: "STR-PPR-90-PN20", nominalDiameter: "Ø90 mm", pressureRating: "PN20 (Nước nóng)", wallThickness: "15.0 mm", standardLength: "4m", standard: "DIN 8077/8078" },
      { code: "STR-PPR-110-PN20", nominalDiameter: "Ø110 mm", pressureRating: "PN20 (Nước nóng)", wallThickness: "18.3 mm", standardLength: "4m", standard: "DIN 8077/8078" },
    ],
  },

  // --- 3. ỐNG PP-R KHÁNG KHUẨN ---
  {
    id: "ppr-pipe-antibacterial",
    slug: "ong-nhua-ppr-khang-khuan-stroman",
    name: "Ống Nhựa PP-R Kháng Khuẩn Stroman Nano Bạc",
    category: "ppr-antibacterial",
    categoryName: "Ống PP-R Kháng Khuẩn",
    bannerBadge: "Đẳng cấp Y Tế",
    isFeatured: true,
    shortDesc:
      "Đột phá công nghệ 3 lớp tích hợp Nano Bạc kháng khuẩn 99.99%, ngăn ngừa màng sinh học biofilm, bảo vệ tuyệt đối nguồn nước uống trực tiếp.",
    description:
      "Ống PP-R Kháng Khuẩn Stroman là sản phẩm cao cấp độc quyền của Tập đoàn Tân Á Đại Thành. Ống có cấu tạo 3 lớp đặc biệt: Lớp trong cùng phủ hạt Nano Silver diệt khuẩn và chống đóng bám cặn; Lớp giữa là nhựa PP-R nguyên sinh gia cường tăng cứng chịu áp lực cao; Lớp ngoài chống tia tử ngoại UV ngăn ngừa lão hóa quang hóa khi lắp đặt ngoài trời.",
    image: "https://stroman.vn/Upload/products/Ong-nhua-PPR-Khang-Khuan134248423105369332.png",
    features: [
      "Diệt khuẩn chủ động: Các ion bạc (Ag+) phá vỡ màng tế bào của 650+ chủng vi khuẩn gây hại",
      "Ngăn chặn 100% rêu mốc và nấm tảo sinh sôi trong lòng ống",
      "Lớp ngoài chống tia cực tím UV chuyên dụng, tăng gấp đôi độ bền khi phơi nắng",
      "Chứng nhận an toàn sinh học bởi Viện Pasteur và Tổng Cục Tiêu Chuẩn Đo Lường Chất Lượng",
    ],
    advantages: [
      "Cung cấp nguồn nước vô trùng có thể uống trực tiếp tại vòi",
      "Thích hợp tuyệt đối cho bệnh viện, nhà máy dược phẩm, trường mầm non và biệt thự siêu cao cấp",
    ],
    applications: [
      "Hệ thống lọc nước tinh khiết uống tại vòi trong các công trình chuẩn 5 sao",
      "Bệnh viện, phòng mổ, trung tâm nghiên cứu y sinh học",
      "Nhà máy chế biến thực phẩm, sữa tươi, nước giải khát đóng chai",
    ],
    standards: ["DIN 8077/8078", "ISO 15874", "QCVN 12-1:2011/BYT", "FDA Compliant"],
    specifications: [
      { code: "STR-PPR-AB-20-PN20", nominalDiameter: "Ø20 mm", pressureRating: "PN20", wallThickness: "3.4 mm", standardLength: "4m", standard: "DIN 8077/8078" },
      { code: "STR-PPR-AB-25-PN20", nominalDiameter: "Ø25 mm", pressureRating: "PN20", wallThickness: "4.2 mm", standardLength: "4m", standard: "DIN 8077/8078" },
      { code: "STR-PPR-AB-32-PN20", nominalDiameter: "Ø32 mm", pressureRating: "PN20", wallThickness: "5.4 mm", standardLength: "4m", standard: "DIN 8077/8078" },
      { code: "STR-PPR-AB-40-PN20", nominalDiameter: "Ø40 mm", pressureRating: "PN20", wallThickness: "6.7 mm", standardLength: "4m", standard: "DIN 8077/8078" },
      { code: "STR-PPR-AB-50-PN20", nominalDiameter: "Ø50 mm", pressureRating: "PN20", wallThickness: "8.3 mm", standardLength: "4m", standard: "DIN 8077/8078" },
      { code: "STR-PPR-AB-63-PN20", nominalDiameter: "Ø63 mm", pressureRating: "PN20", wallThickness: "10.5 mm", standardLength: "4m", standard: "DIN 8077/8078" },
    ],
  },

  // --- 4. ỐNG HDPE ---
  {
    id: "hdpe-pipe-pe100",
    slug: "ong-nhua-hdpe-stroman-pe100",
    name: "Ống Nhựa HDPE Stroman PE100 (ISO 4427 / TCVN 7305)",
    category: "hdpe",
    categoryName: "Ống & Phụ Kiện HDPE",
    bannerBadge: "Bền bỉ 50 năm",
    isFeatured: true,
    shortDesc:
      "Ống nhựa HDPE PE100 chịu áp suất từ PN6 đến PN20, đường kính từ Ø20mm đến Ø1200mm, đàn hồi cao, chống động đất, ngầm hóa hạ tầng quy mô lớn.",
    description:
      "Ống HDPE Stroman được chế tạo từ 100% hợp chất polyetylen mật độ cao thế hệ PE100. Ống sở hữu khả năng uốn dẻo tuyệt vời, có thể cuộn tròn đối với các cỡ nhỏ (Ø20 - Ø90) hoặc cung cấp dạng cây 6m-12m (Ø110 - Ø1200). Các đoạn ống liên kết bằng phương pháp hàn nhiệt đối đầu (butt fusion) hoặc hàn điện trở (electrofusion) tạo nên đường ống liên tục không có mối nối yếu.",
    image: "https://stroman.vn/Upload/products/Ong-nhua-HDPE134248429157536896.png",
    features: [
      "Vật liệu PE100 hàm lượng carbon black >= 2% chống lại sự phân hủy của tia UV",
      "Kháng mài mòn cực tốt khi bơm bùn cát, quặng mỏ và nước biển mặn",
      "Độ đàn hồi cao, chịu biến dạng đất, chống nứt gãy lan truyền nhanh (RCP)",
      "Trọng lượng nhẹ, phương pháp hàn đa dạng và tốc độ thi công hạ tầng nhanh gấp 3 lần ống bêtông",
    ],
    advantages: [
      "Tuổi thọ vượt 50 năm chôn ngầm trong lòng đất",
      "Không bị ăn mòn điện hóa bởi dòng điện rò rỉ trong lòng đất đô thị",
      "Thân thiện môi trường, tái chế 100%",
    ],
    applications: [
      "Mạng lưới cấp nước sạch đô thị, truyền tải nước liên tỉnh",
      "Hệ thống thoát nước thải sinh hoạt và nước thải khu công nghiệp",
      "Ống xả ngầm ngập mặn ra biển, trạm bơm nước biển",
      "Dẫn bùn khai thác khoáng sản, thủy điện và nông nghiệp tưới tiêu quy mô lớn",
    ],
    standards: ["ISO 4427:2007", "TCVN 7305:2008", "DIN 8074/8075", "EN 12201"],
    specifications: [
      { code: "STR-HDPE-20-PN16", nominalDiameter: "Ø20 mm", pressureRating: "PN16 (SDR11)", wallThickness: "2.0 mm", standardLength: "Cuộn 100m", standard: "ISO 4427" },
      { code: "STR-HDPE-25-PN16", nominalDiameter: "Ø25 mm", pressureRating: "PN16 (SDR11)", wallThickness: "2.3 mm", standardLength: "Cuộn 100m", standard: "ISO 4427" },
      { code: "STR-HDPE-32-PN16", nominalDiameter: "Ø32 mm", pressureRating: "PN16 (SDR11)", wallThickness: "3.0 mm", standardLength: "Cuộn 100m", standard: "ISO 4427" },
      { code: "STR-HDPE-40-PN16", nominalDiameter: "Ø40 mm", pressureRating: "PN16 (SDR11)", wallThickness: "3.7 mm", standardLength: "Cuộn 100m", standard: "ISO 4427" },
      { code: "STR-HDPE-50-PN16", nominalDiameter: "Ø50 mm", pressureRating: "PN16 (SDR11)", wallThickness: "4.6 mm", standardLength: "Cuộn 100m", standard: "ISO 4427" },
      { code: "STR-HDPE-63-PN10", nominalDiameter: "Ø63 mm", pressureRating: "PN10 (SDR17)", wallThickness: "3.8 mm", standardLength: "Cuộn 100m/Thanh 6m", standard: "ISO 4427" },
      { code: "STR-HDPE-63-PN16", nominalDiameter: "Ø63 mm", pressureRating: "PN16 (SDR11)", wallThickness: "5.8 mm", standardLength: "Cuộn 100m/Thanh 6m", standard: "ISO 4427" },
      { code: "STR-HDPE-90-PN10", nominalDiameter: "Ø90 mm", pressureRating: "PN10 (SDR17)", wallThickness: "5.4 mm", standardLength: "Thanh 6m", standard: "ISO 4427" },
      { code: "STR-HDPE-110-PN10", nominalDiameter: "Ø110 mm", pressureRating: "PN10 (SDR17)", wallThickness: "6.6 mm", standardLength: "Thanh 6m", standard: "ISO 4427" },
      { code: "STR-HDPE-110-PN16", nominalDiameter: "Ø110 mm", pressureRating: "PN16 (SDR11)", wallThickness: "10.0 mm", standardLength: "Thanh 6m", standard: "ISO 4427" },
      { code: "STR-HDPE-160-PN10", nominalDiameter: "Ø160 mm", pressureRating: "PN10 (SDR17)", wallThickness: "9.5 mm", standardLength: "Thanh 6m", standard: "ISO 4427" },
      { code: "STR-HDPE-200-PN10", nominalDiameter: "Ø200 mm", pressureRating: "PN10 (SDR17)", wallThickness: "11.9 mm", standardLength: "Thanh 6m", standard: "ISO 4427" },
      { code: "STR-HDPE-250-PN10", nominalDiameter: "Ø250 mm", pressureRating: "PN10 (SDR17)", wallThickness: "14.8 mm", standardLength: "Thanh 6m", standard: "ISO 4427" },
      { code: "STR-HDPE-315-PN10", nominalDiameter: "Ø315 mm", pressureRating: "PN10 (SDR17)", wallThickness: "18.7 mm", standardLength: "Thanh 6m", standard: "ISO 4427" },
      { code: "STR-HDPE-400-PN10", nominalDiameter: "Ø400 mm", pressureRating: "PN10 (SDR17)", wallThickness: "23.7 mm", standardLength: "Thanh 6m", standard: "ISO 4427" },
    ],
  },

  // --- 5. PHỤ KIỆN ---
  {
    id: "fittings-upvc-all",
    slug: "phu-kien-ong-nhua-upvc-dong-bo",
    name: "Hệ Phụ Kiện uPVC Stroman Đồng Bộ (Cút, Tê, Măng Sông, Van)",
    category: "fittings",
    categoryName: "Phụ Kiện Đồng Bộ",
    isFeatured: false,
    shortDesc:
      "Phụ kiện đúc ép định hình đồng bộ cho ống uPVC: Cút 90°, Cút 45°, Tê đều, Tê thu, Nối ren trong/ngoài, Van bi rắc co kép.",
    description:
      "Phụ kiện uPVC Stroman được ép phun trên khuôn thép cao cấp xuất xứ từ châu Âu, độ dày thành phụ kiện luôn đạt chuẩn đồng đều, bề mặt nhẵn bóng, khít chặt với thân ống khi dán keo, triệt tiêu 100% rủi ro bung khớp nối.",
    image: "https://stroman.vn/Upload/products/Phu-kien-uPVC134248427637228230.png",
    features: [
      "Khuôn ép áp lực cao chịu va đập",
      "Kích thước chính xác tới từng micromet",
      "Đầy đủ chủng loại từ Ø21 đến Ø315",
    ],
    advantages: ["Đồng bộ chất liệu với ống giúp liên kết keo bám dính tuyệt đối"],
    applications: ["Lắp đặt hệ thống đường ống cấp thoát nước gia đình và công nghiệp"],
    standards: ["TCVN 8491:2011", "ISO 1452:2009"],
    specifications: [
      { code: "PK-UPVC-CUT-21", nominalDiameter: "Cút 90° Ø21", pressureRating: "PN16", wallThickness: "Chuẩn", standardLength: "Cái", standard: "TCVN 8491" },
      { code: "PK-UPVC-CUT-27", nominalDiameter: "Cút 90° Ø27", pressureRating: "PN16", wallThickness: "Chuẩn", standardLength: "Cái", standard: "TCVN 8491" },
      { code: "PK-UPVC-CUT-60", nominalDiameter: "Cút 90° Ø60", pressureRating: "PN10", wallThickness: "Chuẩn", standardLength: "Cái", standard: "TCVN 8491" },
      { code: "PK-UPVC-CUT-90", nominalDiameter: "Cút 90° Ø90", pressureRating: "PN10", wallThickness: "Chuẩn", standardLength: "Cái", standard: "TCVN 8491" },
      { code: "PK-UPVC-CUT-110", nominalDiameter: "Cút 90° Ø110", pressureRating: "PN10", wallThickness: "Chuẩn", standardLength: "Cái", standard: "TCVN 8491" },
      { code: "PK-UPVC-TE-110", nominalDiameter: "Tê đều Ø110", pressureRating: "PN10", wallThickness: "Chuẩn", standardLength: "Cái", standard: "TCVN 8491" },
      { code: "PK-UPVC-MS-110", nominalDiameter: "Măng sông nối Ø110", pressureRating: "PN10", wallThickness: "Chuẩn", standardLength: "Cái", standard: "TCVN 8491" },
    ],
  },
  {
    id: "fittings-ppr-brass",
    slug: "phu-kien-ppr-ren-dong-stroman",
    name: "Phụ Kiện PP-R Stroman Khớp Nối Ren Đồng Thau Cao Cấp",
    category: "fittings",
    categoryName: "Phụ Kiện Đồng Bộ",
    isFeatured: false,
    shortDesc:
      "Phụ kiện PP-R ren đồng thau mạ niken chống oxy hóa: Nối ren trong, Nối ren ngoài, Cút ren đồng, Tê ren đồng, Rắc co nhiệt.",
    description:
      "Phần ren kim loại được tiện CNC từ đồng thau chuyên dụng nguyên khối, có thiết kế các gờ chống xoay và rãnh gioăng cao su chịu nhiệt, đảm bảo không bị xoay trượt ren hoặc rò rỉ khi vặn xiết lực lớn.",
    image: "https://stroman.vn/Upload/products/Phu-kien-PPR134248428464118182.png",
    features: [
      "Đồng thau đúc chất lượng cao, không chì, không nhiễm kim loại nặng",
      "Khắc hoa văn chống trượt và chống xoay khi hàn nhiệt",
      "Chịu nhiệt độ nước sôi liên tục 100°C",
    ],
    advantages: ["Khớp nối ren siêu bền, liên kết hoàn hảo giữa ống nhiệt và thiết bị vệ sinh"],
    applications: ["Đấu nối bình nước nóng, vòi sen tắm, máy bơm nước tăng áp"],
    standards: ["DIN 8077/8078", "ISO 15874"],
    specifications: [
      { code: "PK-PPR-RT-20-1/2", nominalDiameter: 'Nối ren trong Ø20 x 1/2"', pressureRating: "PN25", wallThickness: "Chuẩn", standardLength: "Cái", standard: "DIN 8077" },
      { code: "PK-PPR-RN-20-1/2", nominalDiameter: 'Nối ren ngoài Ø20 x 1/2"', pressureRating: "PN25", wallThickness: "Chuẩn", standardLength: "Cái", standard: "DIN 8077" },
      { code: "PK-PPR-CRT-20-1/2", nominalDiameter: 'Cút ren trong Ø20 x 1/2"', pressureRating: "PN25", wallThickness: "Chuẩn", standardLength: "Cái", standard: "DIN 8077" },
      { code: "PK-PPR-TRT-25-1/2", nominalDiameter: 'Tê ren trong Ø25 x 1/2"', pressureRating: "PN25", wallThickness: "Chuẩn", standardLength: "Cái", standard: "DIN 8077" },
      { code: "PK-PPR-RACCO-25", nominalDiameter: "Rắc co nhiệt Ø25", pressureRating: "PN25", wallThickness: "Chuẩn", standardLength: "Cái", standard: "DIN 8077" },
    ],
  },
];
