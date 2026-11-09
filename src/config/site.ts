export const siteConfig = {
  brandName: "Stroman Việt Nam",
  distributorName: "Tổng Kho Ống Nhựa Stroman Quảng Trị",
  tagline: "Đẳng cấp Đức - Sức sống mới",
  slogan: "Giải pháp toàn diện về nguồn nước cho mọi công trình",
  description:
    "Tổng Kho Phân Phối Chính Hãng Ống Nhựa Stroman tại Quảng Trị, Quảng Bình và Miền Trung. Cung cấp đầy đủ các dòng ống uPVC, PP-R Chịu Nhiệt, PP-R Kháng Khuẩn, HDPE PE100 tiêu chuẩn CHLB Đức thuộc Tập đoàn Tân Á Đại Thành. Giá xuất kho trực tiếp, chiết khấu cao cho đại lý và dự án.",
  url: "https://stroman-quangtri.vn",
  logo: "/images/logo.svg",
  hotline: "0915 333 808",
  phoneDisplay: "0915 333 808",
  directPhone: "0915 333 808",
  zalo: "0915333808",
  email: "phuongdongmi4@gmail.com",
  officialWebsite: "https://stroman.vn",
  investmentCapital: "70 triệu USD",
  manufacturingTech: "Công nghệ dây chuyền tự động hóa 100% từ CHLB Đức",
  addresses: {
    mainWarehouse: "Cầu Nhật Lệ 3, Lương Yến, Quảng Ninh, Quảng Trị (Quảng Bình cũ)",
    centralHub: "Cầu Nhật Lệ 3, Lương Yến, Quảng Ninh, Quảng Trị",
    northHeadquarter: "Tòa nhà Tân Á Đại Thành, 124 Tôn Đức Thắng, Quốc Tử Giám, Đống Đa, Hà Nội",
    northFactory: "KCN Như Quỳnh, Trưng Trắc, Văn Lâm, Hưng Yên",
    southFactory: "Lô B01, Đường số 1, KCN Đức Hòa III, Ấp Đức Hạnh 2, Xã Đức Lập Hạ, Huyện Đức Hòa, Long An",
  },
  socials: {
    facebook: "https://facebook.com/Stromanvietnam",
    youtube: "https://youtube.com/@StromanVietnam",
    zaloUrl: "https://zalo.me/0915333808",
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
