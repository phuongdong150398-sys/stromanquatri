# Tasks: Nền tảng Phân phối Ống Nhựa Stroman Việt Nam

**Input**: Design documents from `specs/001-stroman-distribution-portal/`  
**Prerequisites**: [plan.md](./plan.md) (required), [spec.md](./spec.md) (required)  

---

## Phase 1: Khởi tạo Khung Dự án (Project Scaffolding)
**Vai trò phụ trách**: `deployment-engineer` & `typescript-pro`

- [x] T001 Khởi tạo cấu hình `package.json` với Next.js 15, React 19, Tailwind CSS, Lucide React, Zod và TypeScript.
- [x] T002 Cấu hình TypeScript `tsconfig.json` và Next.js `next.config.ts`.
- [x] T003 Cấu hình Tailwind CSS `tailwind.config.ts` với hệ màu thương hiệu Stroman (Xanh lá `#006C41`, Xanh đậm `#004d2e`, Xám kim loại, Vàng điểm nhấn).
- [x] T004 Thiết lập cấu trúc thư mục dự án theo bản kế hoạch `plan.md`.

---

## Phase 2: Nền tảng Dữ liệu & Cấu hình Tập trung (Foundational)
**Vai trò phụ trách**: `database-architect`, `design-system-architect` & `typescript-pro`

- [x] T005 [P] Tạo file cấu hình tập trung `src/config/site.ts` (lưu trữ tên thương hiệu, hotline, logo, email, địa chỉ kho).
- [x] T006 [P] Định nghĩa các kiểu dữ liệu Type-Safe tại `src/types/product.ts` và `src/types/quote.ts`.
- [x] T007 Xây dựng bộ dữ liệu kỹ thuật đầy đủ cho ống Stroman tại `src/data/products.ts` (uPVC hệ Inch/Met, PP-R, PP-R kháng khuẩn, HDPE, phụ kiện).
- [x] T008 [P] Xây dựng bộ dữ liệu hệ thống đại lý & kho hàng tại `src/data/dealers.ts` và ứng dụng công trình tại `src/data/applications.ts`.
- [x] T009 [P] Xây dựng các hàm tiện ích định dạng tiền tệ, xử lý classnames tại `src/lib/utils.ts` và Zod schemas tại `src/lib/validations.ts`.
- [x] T010 Xây dựng `QuoteContext.tsx` tại `src/context/QuoteContext.tsx` để quản lý trạng thái giỏ dự toán và đồng bộ `localStorage`.

---

## Phase 3: Giao diện Khung & Nhận diện Thương hiệu (Layout & Header/Footer)
**Vai trò phụ trách**: `ui-designer` & `frontend-developer`

- [x] T011 Xây dựng Component thanh điều hướng `src/components/layout/Header.tsx` (Logo, Menu đa cấp, Hotline nhanh, Huy hiệu số lượng dự toán).
- [x] T012 Xây dựng Component chân trang `src/components/layout/Footer.tsx` (Thông tin nhà máy, danh mục, liên kết chính sách, chứng chỉ).
- [x] T013 Xây dựng Component liên hệ nhanh `src/components/layout/FloatingContact.tsx` (Nút gọi Hotline & chat Zalo nổi cố định ở góc màn hình).
- [x] T014 Xây dựng Root Layout `src/app/layout.tsx` tích hợp Font Inter/Roboto, QuoteProvider, Header, Footer và FloatingContact.

---

## Phase 4: User Story 1 - Khám phá Sản phẩm & Tra cứu Kỹ thuật (P1)
**Vai trò phụ trách**: `frontend-developer` & `ui-designer`

- [x] T015 Xây dựng Component `src/components/products/ProductCard.tsx` hiển thị hình ảnh, tiêu chuẩn, dải kích thước và nút thao tác nhanh.
- [x] T016 Xây dựng Component `src/components/products/ProductFilter.tsx` cho phép lọc theo loại vật liệu (uPVC/PP-R/HDPE), đường kính $\varnothing$ và áp lực PN.
- [x] T017 Xây dựng Trang danh mục sản phẩm `src/app/san-pham/page.tsx` tích hợp thanh tìm kiếm và bộ lọc thời gian thực.
- [x] T018 Xây dựng Component `src/components/products/SpecTable.tsx` hiển thị bảng tra quy cách (đường kính, độ dày, PN, chiều dài) tối ưu hiển thị mobile/desktop.
- [x] T019 Xây dựng Trang chi tiết sản phẩm `src/app/san-pham/[slug]/page.tsx` với bảng tra kỹ thuật, ưu điểm, chứng nhận và nút tải catalogue.

---

## Phase 5: User Story 2 - Công cụ Lập Dự toán & Yêu cầu Báo giá Nhanh (P1)
**Vai trò phụ trách**: `frontend-developer` & `security-auditor`

- [x] T020 Xây dựng Component `src/components/products/AddToQuoteButton.tsx` cho phép chọn quy cách và nhập số lượng để thêm vào bảng dự toán.
- [x] T021 Xây dựng Component `src/components/quote/QuoteCartList.tsx` hiển thị danh sách vật tư đã chọn với tính năng tăng/giảm số lượng và xóa mục.
- [x] T022 Xây dựng Component `src/components/quote/QuoteForm.tsx` tiếp nhận thông tin người nhận báo giá với validation chặt chẽ bằng Zod.
- [x] T023 Xây dựng Trang dự toán báo giá `src/app/du-toan-bao-gia/page.tsx` và Modal thông báo thành công `QuoteSuccessModal.tsx` hỗ trợ in/xuất danh mục.

---

## Phase 6: User Story 3 - Trang chủ & Trình diễn Thương hiệu Stroman (P1)
**Vai trò phụ trách**: `ui-designer` & `frontend-developer`

- [x] T024 Xây dựng Hero Section `src/components/home/HeroSection.tsx` giới thiệu thương hiệu "Đẳng cấp Đức - Sức sống mới", quy mô đầu tư 70M USD.
- [x] T025 Xây dựng Showcase 4 dòng sản phẩm chủ lực `src/components/home/CategoryShowcase.tsx`.
- [x] T026 Xây dựng Khối đặc tính kỹ thuật vượt trội `src/components/home/TechnicalFeatures.tsx`.
- [x] T027 Xây dựng Khối ứng dụng công trình thực tế `src/components/home/ApplicationGrid.tsx`.
- [x] T028 Ghép nối hoàn chỉnh Trang chủ `src/app/page.tsx`.

---

## Phase 7: User Story 4, 5 & Các Trang Hỗ trợ (P2)
**Vai trò phụ trách**: `frontend-developer` & `seo-structure-architect`

- [x] T029 Xây dựng Trang mạng lưới phân phối `src/app/he-thong-phan-phoi/page.tsx` lọc theo Tỉnh/Thành phố.
- [x] T030 Xây dựng Trang ứng dụng & dự án tiêu biểu `src/app/ung-dung/page.tsx`.
- [x] T031 Xây dựng Trang chính sách đại lý & Form đăng ký hợp tác `src/app/chinh-sach-dai-ly/page.tsx`.
- [x] T032 Xây dựng Trang tin tức & bài viết kỹ thuật `src/app/tin-tuc/page.tsx`.
- [x] T033 Xây dựng Trang liên hệ & thông tin kho bãi `src/app/lien-he/page.tsx`.

---

## Phase 8: Kiểm thử, Tối ưu SEO & Nghiệm thu (Verification & Polish)
**Vai trò phụ trách**: `test-automator`, `security-auditor` & `performance-engineer`

- [x] T034 Cấu hình Schema.org JSON-LD và metadata chuẩn SEO cho tất cả các trang.
- [x] T035 Kiểm tra Build `npm run build` đảm bảo không có lỗi type hoặc lint.
- [x] T036 Đối soát toàn bộ tiêu chí nghiệm thu theo `spec.md` và nghiệm thu hoàn thành.
