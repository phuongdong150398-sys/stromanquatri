# Feature Specification: Nền tảng Phân phối Ống Nhựa Stroman Việt Nam

**Feature Branch**: `001-stroman-distribution-portal`  
**Created**: 2026-11-09  
**Status**: In-Review / Specified  
**Category**: Full-Stack Web Application (B2B & Distribution Portal)  

---

## 1. Tổng quan & Mục tiêu Dự án (Executive Summary)

Xây dựng nền tảng website phân phối trực tuyến hiện đại cho các sản phẩm ống nhựa và phụ kiện **Stroman** (Thương hiệu cao cấp thuộc Tập đoàn Tân Á Đại Thành, sản xuất theo tiêu chuẩn công nghệ CHLB Đức). 

Mục tiêu chính:
* **Tối ưu năng lực bán buôn & tiếp cận dự án:** Hỗ trợ nhà thầu, đại lý cấp 1/cấp 2 và kỹ sư công trình tra cứu thông số kỹ thuật nhanh chóng, chuẩn xác.
* **Bộ tính năng tạo khác biệt:** Tích hợp bộ lọc kỹ thuật đa chiều ($\varnothing$, PN, vật liệu) và công cụ lập dự toán báo giá trực tuyến (Smart Quote Builder).
* **Định danh linh hoạt:** Toàn bộ thông tin nhận diện (logo, hotline, địa chỉ kho) được đồng bộ từ một file cấu hình tập trung `site.config.ts`.
* **Hiệu năng & SEO vượt trội:** Xây dựng trên Next.js 15 App Router, tốc độ tải trang dưới 1.5s, chuẩn Core Web Vitals và cấu trúc dữ liệu Schema.org.

---

## 2. Các Luồng Người Dùng & Tiêu chí Nghiệm thu (User Scenarios & Testing)

### User Story 1 - Khám phá Sản phẩm & Tra cứu Kỹ thuật Thông minh (Priority: P1)

Là một nhà thầu xây dựng hoặc đại lý, tôi muốn tra cứu chi tiết các dòng ống nhựa Stroman theo vật liệu, kích thước và áp suất chịu lực để chọn đúng sản phẩm cho dự án.

* **Dòng sản phẩm bao gồm:**
  1. Ống & Phụ kiện **uPVC** (Hệ Inch & Hệ Met).
  2. Ống & Phụ kiện **PP-R** (Chịu nhiệt, chịu áp lực).
  3. Ống **PP-R Kháng Khuẩn** (Cao cấp cho y tế & nước uống trực tiếp).
  4. Ống & Phụ kiện **HDPE** (Hạ tầng ngầm, độ bền cao).
* **Tiêu chí nghiệm thu (Acceptance Criteria):**
  1. **Given** người dùng truy cập trang Danh mục Sản phẩm (`/san-pham`), **When** chọn bộ lọc vật liệu (ví dụ: "uPVC") hoặc đường kính (ví dụ: "Ø110"), **Then** danh sách sản phẩm lập tức cập nhật tương ứng mà không cần reload lại trang.
  2. **Given** người dùng ở trang Chi tiết Sản phẩm, **When** cuộn tới phần "Bảng thông số kỹ thuật", **Then** hiển thị đầy đủ bảng tra quy cách (Đường kính ngoài, Độ dày thành ống, Áp suất làm việc PN, Chiều dài thanh tiêu chuẩn 4m/6m) và có thể xem mượt mà trên thiết bị di động.
  3. **Given** người dùng muốn lưu tài liệu, **When** nhấn nút "Tải Catalogue & Bảng giá", **Then** hệ thống mở hoặc tải về file tài liệu kỹ thuật chuẩn của dòng sản phẩm đó.

---

### User Story 2 - Công cụ Lập Dự toán & Yêu cầu Báo giá Nhanh (Smart Quote Builder) (Priority: P1)

Là một kỹ sư dự toán hoặc chủ đại lý, tôi muốn chọn nhanh danh mục các loại ống và phụ kiện cần mua để nhận bảng báo giá chiết khấu tốt nhất.

* **Tiêu chí nghiệm thu (Acceptance Criteria):**
  1. **Given** người dùng đang xem một sản phẩm, **When** chọn quy cách (ví dụ: Ống PP-R Ø25 PN20), nhập số lượng mét/cây và bấm "Thêm vào Dự toán", **Then** biểu tượng Bảng dự toán trên thanh tiêu đề hiển thị số lượng cập nhật kèm thông báo xác nhận.
  2. **Given** người dùng truy cập trang Dự toán (`/du-toan-bao-gia`), **When** xem lại danh sách vật tư đã chọn, **Then** người dùng có thể điều chỉnh số lượng hoặc xóa mặt hàng.
  3. **Given** danh sách dự toán hợp lệ, **When** người dùng điền Form liên hệ (Họ tên, Số điện thoại/Zalo, Tỉnh/Thành phố, Tên dự án/Công ty) và nhấn "Gửi yêu cầu báo giá", **Then** hệ thống validate dữ liệu qua Zod, lưu trữ yêu cầu báo giá và hiển thị màn hình thông báo gửi thành công kèm mã tra cứu đơn dự toán.

---

### User Story 3 - Trang chủ Giới thiệu & Định vị Thương hiệu Stroman (Priority: P1)

Là một khách hàng mới, tôi muốn tìm hiểu uy tín thương hiệu, công nghệ sản xuất và năng lực nhà máy của Stroman để yên tâm hợp tác.

* **Tiêu chí nghiệm thu (Acceptance Criteria):**
  1. **Given** người dùng vào Trang chủ (`/`), **When** xem phần Hero & Giới thiệu, **Then** giao diện truyền tải ấn tượng thông điệp "Đẳng cấp Đức - Sức sống mới", quy mô đầu tư 70 triệu USD từ Tập đoàn Tân Á Đại Thành.
  2. **Given** người dùng khám phá các lĩnh vực ứng dụng, **When** nhấn vào từng thẻ (Cấp thoát nước đô thị, Nông nghiệp công nghệ cao, Công nghiệp & Khai khoáng, Dân dụng), **Then** chuyển hướng tới nhóm sản phẩm chuyên dụng tương ứng.
  3. **Given** người dùng cần xem chứng nhận, **When** xem khu vực Tiêu chuẩn & Chứng chỉ, **Then** hiển thị các chứng chỉ ISO 9001, DIN 8077/8078, TCVN.

---

### User Story 4 - Tra cứu Mạng lưới Đại lý & Điểm Phân phối (Priority: P2)

Là người mua hàng, tôi muốn tìm kho hàng hoặc đại lý Stroman gần khu vực công trình nhất để mua hàng nhanh.

* **Tiêu chí nghiệm thu (Acceptance Criteria):**
  1. **Given** người dùng truy cập trang Mạng lưới phân phối (`/he-thong-phan-phoi`), **When** chọn Tỉnh/Thành phố (ví dụ: Hà Nội, TP.HCM, Long An, Hưng Yên...), **Then** danh sách đại lý phân phối, hotline và địa chỉ kho tương ứng được lọc ra ngay lập tức.
  2. **Given** một điểm bán trên danh sách, **When** nhấn nút "Gọi Hotline" hoặc "Xem vị trí", **Then** kích hoạt cuộc gọi điện thoại hoặc mở bản đồ dẫn đường.

---

### User Story 5 - Đăng ký Đại lý & Hợp tác Phân phối (Priority: P2)

Là một chủ cửa hàng thiết bị điện nước hoặc công ty phân phối, tôi muốn đăng ký làm đại lý của Stroman để nhận chính sách chiết khấu và hỗ trợ kinh doanh.

* **Tiêu chí nghiệm thu (Acceptance Criteria):**
  1. **Given** đối tác truy cập trang Chính sách đại lý (`/chinh-sach-dai-ly`), **When** tìm hiểu các quyền lợi (Chiết khấu cao, Hỗ trợ bảng hiệu showroom, Thưởng doanh số, Hỗ trợ vận chuyển tận công trình), **Then** các thông tin được trình bày mạch lạc, trực quan.
  2. **Given** đối tác hoàn thành form đăng ký đại lý, **When** nhấn "Gửi hồ sơ đăng ký", **Then** hệ thống ghi nhận thông tin và cam kết liên hệ lại trong vòng 24 giờ làm việc.

---

### User Story 6 - Cấu hình Tập trung & Chuẩn SEO (Priority: P1)

Là chủ quản trị website, tôi muốn thay đổi logo, hotline, email, địa chỉ kho bất kỳ lúc nào mà không cần sửa code phức tạp.

* **Tiêu chí nghiệm thu (Acceptance Criteria):**
  1. **Given** file `src/config/site.ts`, **When** thay đổi giá trị `hotline` hoặc `brandName`, **Then** toàn bộ Header, Footer, Trang Liên hệ, Trang Dự toán và Metadata tự động hiển thị giá trị mới.
  2. **Given** các công cụ kiểm toán SEO (Lighthouse, Google Rich Results), **When** quét bất kỳ trang sản phẩm nào, **Then** có đầy đủ thẻ OpenGraph, Meta description, Semantic HTML và Schema JSON-LD hợp lệ.

---

## 3. Kiến trúc Thông tin & Cấu trúc Trang (Site Map)

```
/ (Trang chủ)
├── /san-pham (Danh mục tổng hợp)
│   ├── /san-pham/ong-nhua-upvc (uPVC hệ Inch & Met)
│   ├── /san-pham/ong-nhua-ppr (PP-R chịu nhiệt)
│   ├── /san-pham/ong-nhua-ppr-khang-khuan (PP-R kháng khuẩn)
│   ├── /san-pham/ong-nhua-hdpe (HDPE chịu áp lực)
│   └── /san-pham/[slug] (Chi tiết sản phẩm & bảng tra kỹ thuật)
├── /du-toan-bao-gia (Công cụ Smart Quote Builder)
├── /he-thong-phan-phoi (Tra cứu đại lý theo khu vực)
├── /ung-dung (Ứng dụng cho các ngành công trình)
├── /chinh-sach-dai-ly (Chính sách & Form đăng ký hợp tác)
├── /tin-tuc (Tin tức dự án & kỹ thuật ngành nước)
└── /lien-he (Thông tin liên hệ & bản đồ kho hàng)
```

---

## 4. Ràng buộc Kỹ thuật & Chất lượng (Quality & Architectural Constraints)

* **Framework:** Next.js 15 (App Router, React 19).
* **Ngôn ngữ:** TypeScript Strict Mode.
* **Styling & Icons:** Tailwind CSS v3.4+, Lucide React icons, Tailwind Typography.
* **Trạng thái giỏ dự toán (State Management):** Zustand hoặc React Context API có tích hợp `localStorage` để lưu giỏ dự toán của người dùng.
* **Validation:** Zod schema cho mọi form (Dự toán, Đăng ký đại lý, Liên hệ).
* **Mock Database / Initial Data:** Bộ dữ liệu sản phẩm chuẩn kỹ thuật Stroman được tổ chức dạng Type-Safe TypeScript Dataset tại `src/data/`.
