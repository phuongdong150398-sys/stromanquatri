export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: "Dự Án" | "Kỹ Thuật" | "Sự Kiện" | "Chính Sách";
  date: string;
  image: string;
  content: string[];
}

export const newsData: NewsArticle[] = [
  {
    id: "news-01",
    slug: "stroman-cung-cap-ong-nhua-hdpe-du-an-cap-nuoc-dong-bang-song-cuu-long",
    title: "Stroman Cung Cấp Ống Nhựa HDPE Cho Dự Án Dẫn Nước Ngọt Miền Tây",
    summary:
      "Tập đoàn Tân Á Đại Thành cùng thương hiệu nhựa Stroman vừa ký kết bàn giao hơn 50.000m ống HDPE PE100 cho dự án chống hạn mặn khu vực ĐBSCL.",
    category: "Dự Án",
    date: "28/10/2026",
    image: "/images/applications/cap-thoat-nuoc.jpg",
    content: [
      "Nhựa Stroman tự hào là đơn vị được lựa chọn cung cấp ống nhựa HDPE đường kính lớn Ø400 - Ø800 cho tuyến ống dẫn nước ngọt cấp bách vượt sông Tiền và sông Hậu.",
      "Sản phẩm được sản xuất trực tiếp tại Nhà máy Stroman Long An, đáp ứng tiến độ thần tốc và tiêu chuẩn kỹ thuật kiểm định khắt khe của Bộ Nông Nghiệp & PTNT.",
    ],
  },
  {
    id: "news-02",
    slug: "so-sanh-ong-nhua-ppr-thong-thuong-va-ong-ppr-khang-khuan-stroman",
    title: "So Sánh Ống Nhựa PP-R Thông Thường Và Ống PP-R Kháng Khuẩn Stroman",
    summary:
      "Vì sao các công trình bệnh viện, trường học và biệt thự hiện đại đang chuyển dịch sang dùng ống PP-R kháng khuẩn công nghệ Nano Bạc 3 lớp?",
    category: "Kỹ Thuật",
    date: "15/10/2026",
    image: "/images/products/Stroman_Ong_nhua_PP-R_Khang_khuan.png",
    content: [
      "Theo nghiên cứu của Viện Sức khỏe Nghề nghiệp & Môi trường, lòng ống cấp nước sau 3-5 năm sử dụng thường hình thành lớp màng sinh học biofilm là nơi trú ngụ của vi khuẩn E.coli và trực khuẩn mủ xanh.",
      "Ống nhựa PP-R Kháng Khuẩn Stroman với các phân tử Nano Bạc tích hợp trực tiếp vào lớp nhựa trong cùng có khả năng phá hủy cấu trúc DNA của vi khuẩn, duy trì độ tinh khiết của dòng nước suốt vòng đời công trình.",
    ],
  },
  {
    id: "news-03",
    slug: "chinh-sach-chiet-khau-nha-phan-phoi-ong-nhua-stroman-2026",
    title: "Công Bố Chính Sách Chiết Khấu & Hỗ Trợ Đại Lý Toàn Quốc Mùa Xây Dựng 2026",
    summary:
      "Chương trình đồng hành cùng đại lý: Chiết khấu lên tới 35%, hỗ trợ chi phí làm biển quảng cáo showroom và bảo hiểm vận chuyển hàng tận chân công trình.",
    category: "Chính Sách",
    date: "02/10/2026",
    image: "/images/news/he-thong-phan-phoi.png",
    content: [
      "Nhằm mở rộng mạng lưới phân phối tại các tỉnh thành trọng điểm, Stroman ban hành gói chính sách hỗ trợ tài chính linh hoạt, bảo lãnh công nợ và thưởng doanh số theo quý cho các đại lý cấp 1 và cấp 2 trên toàn quốc.",
    ],
  },
];
