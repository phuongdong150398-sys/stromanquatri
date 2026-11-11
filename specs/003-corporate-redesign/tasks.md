# Tasks: Tái Thiết Kế Giao Diện Website STROMAN

**Feature Track**: `003-corporate-redesign`  
**Prerequisites**: [spec.md](./spec.md), [plan.md](./plan.md)  

---

## Phase 1 — Audit
- [x] T001 Kiểm tra Git status và tạo commit checkpoint an toàn `0daf078`.
- [x] T002 Kiểm tra cấu trúc Next.js 15, Tailwind CSS, `site.ts`, `products.ts`, `applications.ts`, `news.ts`.
- [x] T003 Lưu cục bộ ảnh banner `public/images/hero-banner.png` và tải 7 ảnh ứng dụng/bản đồ chính thức từ `stroman.vn` để tránh lỗi SSL hết hạn.

## Phase 2 — Design System
- [x] T004 Cập nhật hệ màu doanh nghiệp (`#061B33`, `#082B4A`, `#007A4D`, `#00C389`, `#F6F9FB`, `#102035`) trong `tailwind.config.ts` và `src/app/globals.css` kèm quy tắc `prefers-reduced-motion`, khắc phục triệt để lỗi font fallback và tràn ngang mobile.
- [x] T005 Cập nhật đường dẫn ảnh local cho `src/data/applications.ts`, `src/data/news.ts`, `src/app/icon.svg` và metadata `src/app/layout.tsx` (giữ nguyên toàn bộ `products.ts`).

## Phase 3 — Homepage & Layout
- [x] T006 Nâng cấp `src/components/layout/Header.tsx` (Top Bar xanh Ströman, logo STROMAN®, menu ngang khớp ảnh mẫu, search quick action, CTA Dự toán & Báo giá, mobile menu).
- [x] T007 Tái thiết kế `src/components/home/HeroSection.tsx` khớp ảnh mẫu (`CÔNG NGHỆ CHLB ĐỨC`, `ỐNG NHỰA STROMAN`, `Giải pháp dẫn nước bền vững cho mọi công trình`, 3 lợi thế, 2 CTA, nền banner 3 ống chéo hài hòa).
- [x] T008 Nâng cấp `src/components/home/CategoryShowcase.tsx` (6 danh mục PP-R, HDPE, uPVC & Phụ kiện tương ứng, layout 6 cột desktop / 3 tablet / 2 mobile).
- [x] T009 Tái thiết kế `src/components/home/TechnicalFeatures.tsx` ("Vì sao chọn STROMAN?" — bố cục ngang 5 lợi thế trên nền sáng `#F6F9FB`).
- [x] T010 Tạo mới `src/components/home/StandardsSection.tsx` ("CHẤT LƯỢNG & TIÊU CHUẨN" xác thực từ `products.ts`).
- [x] T011 Nâng cấp `src/components/home/ApplicationGrid.tsx` (4 lĩnh vực trọng tâm: Nhà ở dân dụng, Công trình cao tầng, Nhà máy và KCN, Nông nghiệp và tưới tiêu).
- [x] T012 Đồng bộ `src/components/home/DistributionPreview.tsx` (tích hợp bản đồ chính thức STROMAN Việt Nam trên nền sáng).
- [x] T013 Tạo mới `src/components/home/BottomCtaSection.tsx` ("Nhận tư vấn & báo giá nhanh") và đồng bộ `src/components/layout/Footer.tsx` nền Navy `#061B33`.
- [x] T014 Cập nhật `src/app/page.tsx` kết nối đầy đủ các section mới theo đúng nhịp điệu thị giác.

## Phase 4 & 5 — Responsive & Visual Browser Verification
- [x] T015 Kiểm tra TypeScript (`npx tsc --noEmit`) và Build (`npm run build`).
- [x] T016 Khởi chạy server local và chụp ảnh màn hình thực tế bằng trình duyệt headless ở Desktop (1440px/1920px), Tablet (768px) và Mobile (390px/375px), đối chiếu trực tiếp với ảnh mẫu (`0` overflow ở mọi độ phân giải).
- [x] T017 Kiểm tra toàn bộ đường dẫn (`200 OK`), console errors (`[]`), ảnh lỗi (`[]`) và chức năng giỏ dự toán báo giá hoạt động chính xác.
