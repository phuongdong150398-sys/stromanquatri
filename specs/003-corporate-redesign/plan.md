# Implementation Plan: Tái Thiết Kế Giao Diện Website STROMAN

**Feature Track**: `003-corporate-redesign`  
**Prerequisites**: [spec.md](./spec.md)  

---

## 1. Chiến Lược Triển Khai Theo 5 Phase

### Phase 1 — Audit (Đã hoàn thành)
- Kiểm tra toàn bộ mã nguồn, Tailwind config, Next.js 15 App Router.
- Tạo checkpoint Git `0daf078`.
- Phát hiện và khắc phục lỗi SSL hết hạn của `stroman.vn` bằng cách lưu cục bộ ảnh chính thức (`public/images/applications/`, `public/images/news/`).
- Lưu ảnh nền Hero sạch `public/images/hero-banner.png` (`1024x576`, RGBA) và kiểm chứng 6 ảnh sản phẩm trong suốt (`RGBA`) khớp 100% với 6 danh mục thiết kế mẫu.

### Phase 2 — Design System (`tailwind.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`)
- Bổ sung hệ màu doanh nghiệp chuẩn:
  - `navy: #061B33`, `deepblue: #082B4A`, `brandgreen: #007A4D`, `emeraldaccent: #00C389`, `surface: #F6F9FB`, `ink: #102035`.
- Bổ sung utility transition tinh tế & media rule `@media (prefers-reduced-motion: reduce)`.
- Cập nhật `layout.tsx` với `metadataBase` và OpenGraph image cục bộ `/images/hero-banner.png`.

### Phase 3 — Homepage & Layout Components
- `src/components/layout/Header.tsx`: Top Bar xanh Ströman, Navigation tinh tế, kính lúp tra cứu nhanh, nút `Dự toán & Báo giá`, mobile drawer.
- `src/components/home/HeroSection.tsx`: Khối Banner đẳng cấp khớp ảnh mẫu 100%, giữ nguyên ảnh thật không chỉnh sửa ống.
- `src/components/home/CategoryShowcase.tsx`: 6 card bằng chiều cao (`Ống nhựa PP-R`, `Ống nhựa HDPE`, `Ống nhựa uPVC`, `Phụ kiện PP-R`, `Phụ kiện HDPE`, `Phụ kiện uPVC`), `lg:grid-cols-6`, `md:grid-cols-3`, `grid-cols-2`.
- `src/components/home/TechnicalFeatures.tsx`: "Vì sao chọn STROMAN?" — Bố cục ngang 5 cột nền sáng `#F6F9FB`.
- `src/components/home/StandardsSection.tsx` *(Mới)*: "CHẤT LƯỢNG & TIÊU CHUẨN" (`ISO 4427`, `ISO 1452`, `TCVN 7305`, `TCVN 8491`, `DIN 8077/8078`, `QCVN 12-1:2011/BYT`).
- `src/components/home/ApplicationGrid.tsx`: 4 lĩnh vực ứng dụng trọng tâm với ảnh local sạch, hover zoom nhẹ.
- `src/components/home/DistributionPreview.tsx`: Nâng cấp tích hợp bản đồ phân phối Việt Nam chính thức `public/images/news/he-thong-phan-phoi.png` với nền sáng đồng bộ.
- `src/components/home/BottomCtaSection.tsx` *(Mới)*: Section "Nhận tư vấn & báo giá nhanh" nền Navy `#061B33` / Deep Blue `#082B4A`.
- `src/components/layout/Footer.tsx`: Đồng bộ Navy `#061B33`.

### Phase 4 — Responsive Audit
- Kiểm thử ở các độ phân giải `1920px`, `1440px`, `768px`, `390px`, `375px` đảm bảo `overflow-x: hidden`, không vỡ chữ, không cắt đầu ống.

### Phase 5 — Verification & Visual Browser Inspection
- Chạy `npm run build` & `npx tsc --noEmit`.
- Mở website local trong headless browser (hoặc Playwright/Chrome nếu khả dụng) chụp ảnh màn hình thực tế Desktop & Mobile để đối soát trực tiếp với ảnh mẫu.
- Kiểm tra toàn bộ route, dropdown, giỏ dự toán và console không lỗi.
