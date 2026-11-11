# Feature Specification: Hệ Thống Quản Trị & Kết Nối Supabase/Vercel (`/admin`)

**Feature Track**: `004-admin-portal`  
**Created**: 2026-11-11  
**Status**: Pending User Approval (Spec-First)  
**Tech Stack**: Next.js 15 App Router, `@supabase/supabase-js`, `@supabase/ssr`, Supabase PostgreSQL + Auth + RLS, Zod, Vercel Deployment  

---

## 1. Tổng Quan & Mục Tiêu (Executive Summary)

Xây dựng hoàn chỉnh hệ thống **Trang Quản Trị (`/admin`)** và tầng **Backend API + PostgreSQL trên Supabase** cho Website Phân phối Ống Nhựa STROMAN Quảng Trị, giúp chuyển đổi từ dữ liệu tĩnh sang vận hành kinh doanh thực tế và sẵn sàng triển khai lên **Vercel**.

### Nguyên tắc bắt buộc:
- **Không làm gián đoạn trang khách hàng**: Giữ nguyên 100% giao diện trang chủ, danh mục sản phẩm, bảng tra kỹ thuật và giỏ dự toán hiện tại.
- **Bảo mật tuyệt đối**: Tách biệt hoàn toàn `SUPABASE_SERVICE_ROLE_KEY` ở server, bật Row Level Security (RLS) trên toàn bộ bảng PostgreSQL, bảo vệ mọi route `/admin/*` và `/api/admin/*` qua Middleware + Supabase Auth + danh sách email quản trị được cấp phép (`ADMIN_ALLOWED_EMAILS`).

---

## 2. User Stories & Tiêu Chí Nghiệm Thu (Acceptance Criteria)

### US1 — Xác Thực & Bảo Vệ Trang Quản Trị (P1)
- **Given** người chưa đăng nhập truy cập `/admin` hoặc gọi `/api/admin/*`,
- **When** hệ thống kiểm tra phiên Supabase Auth qua `src/middleware.ts`,
- **Then** tự động điều hướng về `/admin/login` (với page) hoặc trả HTTP `401 Unauthorized` (với API).
- **Given** quản trị viên đăng nhập bằng email thuộc `ADMIN_ALLOWED_EMAILS` và mật khẩu đúng,
- **Then** đăng nhập thành công qua cookie `HttpOnly`, chuyển vào Dashboard `/admin`. Nếu email không nằm trong danh sách quản trị thì bị từ chối quyền (`403 Forbidden`).

### US2 — Tiếp Nhận Đơn Dự Toán, Hồ Sơ Đại Lý & Liên Hệ Thật (P1)
- **Given** khách hàng điền form trên `/du-toan-bao-gia`, `/chinh-sach-dai-ly` hoặc `/lien-he` và bấm gửi,
- **When** dữ liệu vượt qua kiểm tra Zod (`validations.ts`) ở cả Client lẫn API Server (`POST /api/quotes`, `POST /api/dealers/register`, `POST /api/contact`),
- **Then** hệ thống lưu thật vào Supabase (`quote_requests` + `quote_items`, `dealer_applications`, `contact_messages`) và trả về mã đơn thực tế cho khách hàng.

### US3 — Quản Lý Đơn Dự Toán & Báo Giá (`/admin/quotes`) (P1)
- **Given** quản trị viên mở `/admin/quotes`,
- **Then** xem được danh sách đơn lọc theo trạng thái (`Mới`, `Đang báo giá`, `Đã gửi giá`, `Đã chốt`, `Hủy`), tìm theo mã đơn / SĐT / tên dự án; bấm vào đơn để xem chi tiết từng quy cách ống ($\varnothing$, `PN`, độ dày, số lượng), nhập `% chiết khấu` + ghi chú nội bộ, cập nhật trạng thái và xuất file CSV.

### US4 — Quản Lý Hồ Sơ Đại Lý & Liên Hệ (`/admin/leads`) (P1)
- **Given** quản trị viên mở `/admin/leads`,
- **Then** chuyển đổi tab giữa `Đăng ký mở Đại lý` và `Tin nhắn Liên hệ`, cập nhật trạng thái xử lý (`Mới`, `Đang chăm sóc`, `Đã duyệt`, `Từ chối` / `Đã phản hồi`) và lưu ghi chú.

### US5 — Quản Lý Sản Phẩm, Bảng Giá, Tin Tức & Cấu Hình Site (P2)
- **Given** quản trị viên truy cập `/admin/products`, `/admin/content`, `/admin/settings`,
- **When** cập nhật giá tham khảo (`price_guide`), thêm/sửa tin tức dự án, đại lý hoặc đổi Hotline/Email/Địa chỉ kho,
- **Then** dữ liệu được cập nhật vào Supabase và kích hoạt làm mới cache Next.js (`revalidatePath`), giữ dự phòng fallback về `src/data/*.ts` nếu bảng chưa được seed.

### US6 — Sẵn Sàng Đẩy Lên GitHub & Triển Khai Vercel (P1)
- **Given** toàn bộ code vượt qua `npx tsc --noEmit` và `npm run build` với `0` lỗi và không chứa bất kỳ secret key nào trong Git,
- **Then** push sạch sẽ lên `origin` (`https://github.com/phuongdong150398-sys/stromanquatri.git`) để triển khai lên Vercel kèm hướng dẫn chạy SQL migration trên Supabase.
