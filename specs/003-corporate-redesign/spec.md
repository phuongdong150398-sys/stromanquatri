# Feature Specification: Tái Thiết Kế Giao Diện Website STROMAN Chuẩn Doanh Nghiệp Công Nghiệp Cao Cấp

**Feature Branch / Track**: `003-corporate-redesign`  
**Created**: 2026-11-10  
**Status**: Approved by User Request / Implementing  
**Category**: Production-Ready Frontend Corporate UI/UX Redesign  

---

## 1. Tổng Quan & Mục Tiêu Thiết Kế (Executive Summary)

Triển khai đồng bộ giao diện mới theo **ảnh mẫu thiết kế đã duyệt** và bản **ảnh nền Hero Banner sạch không chữ (`public/images/hero-banner.png`)**, đạt chuẩn:
- **Modern Industrial & Premium Corporate**
- **Clean & Minimal**
- **Professional Typography & Spacing**
- **High-end Product Presentation**
- **Responsive Design** (1920px, 1440px, 768px, 390px, 375px)
- **Bảo vệ 100% mã nguồn chức năng hiện tại**: Giữ nguyên toàn bộ routing (`/`, `/san-pham`, `/san-pham/[slug]`, `/du-toan-bao-gia`, `/he-thong-phan-phoi`, `/ung-dung`, `/chinh-sach-dai-ly`, `/tin-tuc`, `/lien-he`), QuoteContext, bộ lọc, bảng tra thông số, dữ liệu sản phẩm và Form Zod.

---

## 2. Hệ Thống Bảng Màu Chuẩn Hóa (Design Tokens)

- **Navy**: `#061B33`
- **Deep Blue**: `#082B4A`
- **Brand Green**: `#007A4D` (kết hợp `#006C41` từ nhận diện STROMAN)
- **Emerald**: `#00C389`
- **Light Background**: `#F6F9FB`
- **White**: `#FFFFFF`
- **Primary Text**: `#102035`

---

## 3. Đặc Tả Từng Section & Tiêu Chí Nghiệm Thu (Acceptance Criteria)

### 3.1. Header & Navigation (`src/components/layout/Header.tsx`)
- **Top Bar**: Nền Brand Green (`#006C41` / `#007A4D`), hiển thị: Slogan thương hiệu (`Ống nhựa cao cấp Stroman | Công nghệ CHLB Đức | Bền vững cho mọi công trình`), Hotline (`0915 333 808`) và Email (`phuongdongmta@gmail.com`) từ `siteConfig`.
- **Main Navigation**: Sticky trắng sáng; Logo `[S] STROMAN®` + phụ đề `HỆ THỐNG PHÂN PHỐI CHÍNH HÃNG`; menu ngang đầy đủ (`Trang chủ`, `Sản phẩm ⌄` dropdown hoạt động bình thường, `Hệ thống phân phối`, `Lĩnh vực ứng dụng`, `Chính sách đại lý`, `Tin tức`, `Liên hệ`); nút kính lúp tìm kiếm nhanh; nút CTA `Dự toán & Báo giá` kèm badge đếm số lượng từ `QuoteContext`; hamburger menu hoạt động trơn tru trên mobile.

### 3.2. Hero Section (`src/components/home/HeroSection.tsx`) — Ưu tiên cao nhất
- **Cột trái**:
  - Label với cờ Đức: `CÔNG NGHỆ CHLB ĐỨC`
  - Headline: `ỐNG NHỰA STROMAN`
  - Subheadline: `Giải pháp dẫn nước bền vững cho mọi công trình`
  - 3 lợi thế có icon thanh mảnh: `Độ bền cao` (Trên 50 năm), `An toàn cho nguồn nước`, `Đạt tiêu chuẩn chất lượng`.
  - 2 nút CTA: `Khám phá sản phẩm` (`/san-pham`) và `Dự toán & nhận báo giá` (`/du-toan-bao-gia`).
- **Cột phải & Background**:
  - Sử dụng ảnh nền Hero sạch `/images/hero-banner.png` hiển thị 3 dòng ống HDPE, PP-R, uPVC sắc nét, không bị cắt mất đầu ống, không khung trắng vuông thô kệch, hòa hợp mượt mà với nền sáng bên trái qua lớp chuyển sắc mềm tinh tế. Không chèn chữ hay logo giả lên thân ống.
  - Trên mobile/tablet bố cục tách dọc hoặc đệm đáy rõ ràng, chữ không bao giờ đè lên hình ống.

### 3.3. Danh mục sản phẩm (`src/components/home/CategoryShowcase.tsx`)
- 6 nhóm đúng thứ tự trên mẫu:
  1. `Ống nhựa PP-R` (`/images/products/Stroman_Ong_nhua_PP-R.png`)
  2. `Ống nhựa HDPE` (`/images/products/Stroman_Ong_nhua_HDPE.png`)
  3. `Ống nhựa uPVC` (`/images/products/02_uPVC_PNG_KHONG_CHU.png`)
  4. `Phụ kiện PP-R` (`/images/products/Stroman_Phu_kien_PP-R.png`)
  5. `Phụ kiện HDPE` (`/images/products/Stroman_Phu_kien_HDPE.png`)
  6. `Phụ kiện uPVC` (`/images/products/Stroman_Phu_kien_uPVC.png`)
- Grid: Desktop 6 card/hàng (`lg:grid-cols-6`), Tablet 3 card/hàng (`md:grid-cols-3`), Mobile 2 card/hàng (`grid-cols-2`).
- Mỗi card: Ảnh `object-contain` không crop, chiều cao bằng nhau (`h-full`), border tinh tế, shadow nhẹ, tên danh mục + nút mũi tên tròn xanh xem chi tiết, hover animation nhẹ nhàng.

### 3.4. Section lợi thế STROMAN (`src/components/home/TechnicalFeatures.tsx`)
- Tiêu đề: `Vì sao chọn STROMAN?`
- 5 lợi thế trình bày dạng **bố cục ngang trên nền sáng tinh tế** (`#F6F9FB`), tránh card đen rời rạc:
  1. `Công nghệ Đức`
  2. `Chất lượng cao`
  3. `Giải pháp đa dạng`
  4. `An toàn và thân thiện`
  5. `Bảo hành lâu dài`

### 3.5. Section chất lượng & tiêu chuẩn (`src/components/home/StandardsSection.tsx` - Mới)
- Tiêu đề: `CHẤT LƯỢNG & TIÊU CHUẨN`
- Chỉ hiển thị các tiêu chuẩn đã xác minh trong `src/data/products.ts` & `src/config/site.ts`:
  - `ISO 4427:2007` (Ống HDPE PE100)
  - `ISO 1452:2009` (Ống uPVC cấp thoát nước)
  - `TCVN 7305:2008` (Tiêu chuẩn Việt Nam ống PE)
  - `TCVN 8491:2011` (Tiêu chuẩn Việt Nam ống uPVC)
  - `DIN 8077 / 8078` (Tiêu chuẩn CHLB Đức ống PP-R chịu nhiệt)
  - `QCVN 12-1:2011/BYT` (An toàn vệ sinh thực phẩm - PP-R Kháng khuẩn)

### 3.6. Section lĩnh vực ứng dụng (`src/components/home/ApplicationGrid.tsx`)
- Hiển thị 4 lĩnh vực trọng tâm:
  - `Nhà ở dân dụng`
  - `Công trình cao tầng`
  - `Nhà máy và khu công nghiệp`
  - `Nông nghiệp và tưới tiêu`
- Ảnh local sạch (đã cache từ ảnh chính thức Ströman để tránh lỗi SSL), hover zoom nhẹ, liên kết tới `/ung-dung`.

### 3.7. CTA cuối trang (`src/components/home/BottomCtaSection.tsx` - Mới) & Footer (`src/components/layout/Footer.tsx`)
- CTA cuối trang: Tiêu đề `Nhận tư vấn & báo giá nhanh`, nền Navy `#061B33` / Deep Blue `#082B4A`, hiển thị Hotline `0915 333 808`, nút `Tạo dự toán báo giá`, thông tin hỗ trợ bóc tách khối lượng & chiết khấu đại lý/nhà thầu.
- Footer đồng bộ Navy `#061B33`, giữ toàn bộ thông tin nhà máy, sản phẩm và chứng nhận.
