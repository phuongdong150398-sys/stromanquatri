# Tasks: Clean Industrial High-Tech Hero Banner

**Input**: Design documents from `specs/002-clean-industrial-hero/`  
**Prerequisites**: [plan.md](./plan.md) (required), [spec.md](./spec.md) (required)  

---

## Phase 1: Chuẩn hóa Tài nguyên Ảnh Sản Phẩm (Asset Preparation)
**Vai trò phụ trách**: `ui-designer` & `javascript-pro`

- [x] T001 Khử nền trắng đặc của `Stroman_Phu_kien_uPVC.png` và chuyển đổi sang định dạng RGBA trong suốt 100%.
- [x] T002 Kiểm toán xác minh toàn bộ các file ảnh trong `public/images/products/` được sử dụng trên Hero Banner đều có kênh Alpha (RGBA) và không còn viền trắng.

---

## Phase 2: Tái thiết kế Giao diện HeroSection (Frontend Implementation)
**Vai trò phụ trách**: `frontend-developer` & `ui-designer`

- [x] T003 Chuyển đổi màu nền tổng thể của `HeroSection.tsx` sang nền sáng công nghệ cao (Off-White & Ice-Slate gradient), kết nối mượt mà với thanh Header trắng ở trên.
- [x] T004 Đập bỏ hoàn toàn khối Card đóng khung thô kệch; thiết kế lại không gian trưng bày ảnh sản phẩm kích thước lớn (Hero Size `h-80 sm:h-96`) với bệ đỡ ánh sáng và bóng sàn tự nhiên (Pedestal floor shadow).
- [x] T005 Thiết kế lại thanh chọn danh mục sản phẩm (Pill Tabs) tối giản, có icon và nhãn ngắn gọn, chống tràn viền trên mọi kích thước màn hình.
- [x] T006 Tinh chỉnh cột trái: nâng cấp Typography tiêu đề chính, thông điệp bảo chứng công nghệ Đức và hệ thống nút bấm CTA xanh Ströman Green (`#006C41`) với hiệu ứng hover bóng bẩy.
- [x] T007 Cập nhật dải số liệu uy tín (70M$ Vốn đầu tư, 50+ Năm Độ bền, 100% Tự động hóa) thành thanh đo lường công nghiệp hiện đại.

---

## Phase 3: Kiểm thử & Hoàn thiện (Testing & Verification)
**Vai trò phụ trách**: `test-automator` & `accessibility-expert`

- [x] T008 Thực hiện kiểm thử biên dịch `npm run build` để đảm bảo 0 lỗi TypeScript, 0 lỗi CSS/Webpack.
- [x] T009 Xác minh trực tiếp trên máy chủ thử nghiệm `http://localhost:3001`, đối soát tiêu chí nghiệm thu trong `spec.md` và bàn giao cho người dùng.
