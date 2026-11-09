export const siteConfig = {
  brandName: "Stroman Việt Nam",
  distributorName: "Tổng Đại Lý Phân Phối Ống Nhựa Stroman",
  tagline: "Đẳng cấp Đức - Sức sống mới",
  slogan: "Giải pháp toàn diện về nguồn nước cho mọi công trình",
  description:
    "Hệ thống phân phối chính hãng ống nhựa và phụ kiện Stroman (uPVC, PP-R, HDPE, Kháng khuẩn) tiêu chuẩn CHLB Đức thuộc Tập đoàn Tân Á Đại Thành. Cam kết giá xuất xưởng, chiết khấu cao cho đại lý và dự án.",
  url: "https://stroman-distribution.vn",
  logo: "/images/logo.svg",
  hotline: "1900 6086",
  phoneDisplay: "1900 6086",
  directPhone: "0968 123 456",
  zalo: "0968123456",
  email: "kinhdoanh@stroman-distribution.vn",
  officialWebsite: "https://stroman.vn",
  investmentCapital: "70 triệu USD",
  manufacturingTech: "Công nghệ dây chuyền tự động hóa 100% từ CHLB Đức",
  addresses: {
    northHeadquarter: "Tòa nhà Tân Á Đại Thành, 124 Tôn Đức Thắng, Quốc Tử Giám, Đống Đa, Hà Nội",
    northFactory: "KCN Như Quỳnh, Trưng Trắc, Văn Lâm, Hưng Yên",
    southFactory: "Lô B01, Đường số 1, KCN Đức Hòa III, Ấp Đức Hạnh 2, Xã Đức Lập Hạ, Huyện Đức Hòa, Long An",
    mainWarehouse: "Tổng kho Logistics Cầu Giẽ, Phú Xuyên, Hà Nội & Kho Tân Bình, TP. Hồ Chí Minh",
  },
  socials: {
    facebook: "https://facebook.com/Stromanvietnam",
    youtube: "https://youtube.com/@StromanVietnam",
    zaloUrl: "https://zalo.me/0968123456",
  },
  navItems: [
    { label: "Trang Chủ", href: "/" },
    {
      label: "Sản Phẩm",
      href: "/san-pham",
      children: [
        { label: "Ống & Phụ kiện uPVC", href: "/san-pham?category=upvc" },
        { label: "Ống & Phụ kiện PP-R", href: "/san-pham?category=ppr" },
        { label: "Ống PP-R Kháng Khuẩn", href: "/san-pham?category=ppr-antibacterial" },
        { label: "Ống & Phụ kiện HDPE", href: "/san-pham?category=hdpe" },
        { label: "Phụ kiện ống các loại", href: "/san-pham?category=fittings" },
      ],
    },
    { label: "Bảng Giá & Dự Toán", href: "/du-toan-bao-gia", isHighlight: true },
    { label: "Hệ Thống Phân Phối", href: "/he-thong-phan-phoi" },
    { label: "Lĩnh Vực Ứng Dụng", href: "/ung-dung" },
    { label: "Chính Sách Đại Lý", href: "/chinh-sach-dai-ly" },
    { label: "Tin Tức", href: "/tin-tuc" },
    { label: "Liên Hệ", href: "/lien-he" },
  ],
};

export type SiteConfig = typeof siteConfig;
