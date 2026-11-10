# Feature Specification: Clean Industrial High-Tech Hero Banner

**Feature Branch / Track**: `002-clean-industrial-hero`  
**Created**: 2026-11-10  
**Status**: Ready for Review / Specified  
**Category**: Frontend & UI/UX Redesign  

---

## 1. Tổng quan & Mục tiêu Cải tiến (Executive Summary)

Nâng cấp và tái thiết kế toàn diện khu vực **Hero Banner trang chủ** của Website Phân phối Ống Nhựa Ströman theo phong cách **"Clean Industrial High-Tech"** (Phong cách Công nghiệp Hiện đại Châu Âu).

### Mục tiêu giải quyết triệt để các tồn đọng hiện tại:
1. **Khắc phục lỗi mảng nền trắng**: Sử dụng 100% ảnh sản phẩm hệ màu **RGBA có lớp trong suốt (Transparent Alpha Channel)** độ phân giải cao (1600x1200px), loại bỏ hoàn toàn viền trắng/hộp trắng đục.
2. **Loại bỏ "hội chứng đóng hộp/widget"**: Bỏ khung viền Card thô kệch, đưa sản phẩm ra không gian thoáng đạt, tỷ lệ kích thước lớn (Hero Size) tạo ấn tượng bề thế của thương hiệu 70 triệu USD.
3. **Đồng bộ màu sắc liền mạch**: Chuyển Banner sang nền **Sáng / Trắng xám công nghệ (Off-White & Ice-Slate subtle gradient)**, kết nối mượt mà 100% với thanh Header màu trắng phía trên và các khối nội dung phía dưới.
4. **Tối ưu thứ bậc thị giác (Visual Hierarchy)**:
   - Cột trái: Tiêu đề mạnh mẽ, thông điệp bảo chứng chất lượng Đức ngắn gọn, súc tích; nút CTA màu xanh Ströman Green (`#006C41`) nổi bật.
   - Cột phải: Khối trưng bày sản phẩm nổi khối 3D với bóng đổ sàn tự nhiên (ambient ground reflection & drop shadow), tích hợp thanh chuyển dòng sản phẩm dạng viên thuốc (Pill tabs) tinh tế, không bị tràn viền hay che khuất.
   - Dải số liệu uy tín: 3 chỉ số vàng (70 Triệu USD • 50+ Năm • 100% Tự động hóa) trình bày dạng dải đo lường công nghiệp thanh lịch.

---

## 2. Tiêu chí Nghiệm thu Chi tiết (Acceptance Criteria)

### Scenario 1 - Tính liền mạch thị giác và màu sắc (Color Harmony)
- **Given** người dùng truy cập trang chủ `http://localhost:3001/`,
- **When** quan sát từ thanh Header cuộn xuống hết khu vực Hero Banner,
- **Then** không còn sự đứt gãy giữa Header trắng và Banner đen; nền banner sáng sủa, công nghệ cao, chữ đọc rõ ràng với độ tương phản WCAG 2.1 AA.

### Scenario 2 - Hiển thị ảnh sản phẩm độ nét cao và không có lỗi nền trắng
- **Given** người dùng ở khu vực Hero Showcase bên phải,
- **When** xem ảnh cụm toàn bộ sản phẩm hoặc nhấp vào từng dòng ống (HDPE, uPVC, PP-R, PP-R Kháng khuẩn, Phụ kiện),
- **Then** ảnh hiển thị cực kỳ sắc nét, viền sản phẩm mịn màng, trong suốt 100%, tuyệt đối không có bất kỳ mảng viền trắng hay lỗi đè nền nào.

### Scenario 3 - Tương tác chuyển đổi danh mục sản phẩm mượt mà
- **Given** người dùng muốn xem từng loại ống cụ thể,
- **When** nhấp chọn vào các nút tab ("Trọn Bộ", "Ống HDPE", "Ống uPVC", "PP-R Nóng", "Kháng Khuẩn", "Phụ Kiện"),
- **Then** ảnh sản phẩm chuyển đổi mượt mà với hiệu ứng chuyển cảnh nhẹ, thông số kỹ thuật (tiêu chuẩn, dải kích thước) bên dưới cập nhật chính xác theo dòng sản phẩm được chọn; thanh tab không bị tràn lề hay vỡ chữ trên cả màn hình Desktop và Mobile.

### Scenario 4 - Tỷ lệ chuyển đổi CTA & Liên hệ Báo giá
- **Given** người dùng muốn nhận báo giá hoặc gọi kỹ thuật,
- **When** nhấp vào nút "Tạo Dự Toán & Nhận Báo Giá", "Hotline Kỹ Thuật" hoặc "Zalo",
- **Then** hệ thống điều hướng chính xác tới trang `/du-toan-bao-gia`, kích hoạt cuộc gọi `tel:` hoặc mở cửa sổ Zalo đúng cấu hình hotline 0915 333 808.

### Scenario 5 - Hiệu năng và Độ ổn định
- **Given** chạy kiểm thử biên dịch `npm run build`,
- **Then** mã nguồn biên dịch thành công 100% không cảnh báo lỗi, không sử dụng WebGL nặng để đảm bảo tương thích 100% thiết bị.
