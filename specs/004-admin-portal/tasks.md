# Tasks: Hệ Thống Quản Trị & Kết Nối Supabase/Vercel (`/admin`)

**Feature Track**: `004-admin-portal`  
**Prerequisites**: [spec.md](./spec.md), [plan.md](./plan.md)  

---

## Phase 1 — Thiết lập Nền Tảng Supabase & Database Migration
- [x] T001 Cài đặt `@supabase/supabase-js` và `@supabase/ssr`.
- [x] T002 Viết SQL Migration chuẩn PostgreSQL + RLS tại `supabase/migrations/001_init_schema.sql`.
- [x] T003 Tạo các Supabase client helpers (`src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/lib/supabase/admin.ts`) và hàm kiểm tra quyền quản trị `requireAdmin()`.

## Phase 2 — Xác Thực & Middleware Bảo Vệ
- [x] T004 Xây dựng `src/middleware.ts` bảo vệ toàn bộ `/admin/*` (trừ `/admin/login`) và `/api/admin/*`.
- [x] T005 Tạo trang đăng nhập `/admin/login` kết nối Supabase Auth Email/Password + nút đăng xuất.

## Phase 3 — Kết Nối API Thật Cho 3 Biểu Mẫu Trang Khách
- [x] T006 Xây dựng `POST /api/quotes`, `POST /api/dealers/register`, `POST /api/contact` với Zod validation chặt chẽ.
- [x] T007 Nối [`QuoteForm.tsx`](file:///e:/%C4%90%C3%B4ng/Website%20AI/src/components/quote/QuoteForm.tsx), [`chinh-sach-dai-ly/page.tsx`](file:///e:/%C4%90%C3%B4ng/Website%20AI/src/app/chinh-sach-dai-ly/page.tsx) và [`lien-he/page.tsx`](file:///e:/%C4%90%C3%B4ng/Website%20AI/src/app/lien-he/page.tsx) vào API lưu Supabase thật (vẫn giữ nguyên giao diện & xử lý lỗi rõ ràng).

## Phase 4 — Xây Dựng Giao Diện Quản Trị (`/admin`)
- [x] T008 Tạo Layout Sidebar & Topbar chuyên nghiệp cho `/admin` (`src/app/admin/layout.tsx`).
- [x] T009 Xây dựng Dashboard Tổng quan KPIs (`src/app/admin/page.tsx`) + tính năng 1-click Seed dữ liệu mẫu (`POST /api/admin/seed`).
- [x] T010 Xây dựng Quản lý Đơn dự toán (`/admin/quotes`): danh sách, tìm kiếm, lọc trạng thái, modal/drawer chi tiết vật tư, cập nhật chiết khấu/ghi chú và xuất CSV.
- [x] T011 Xây dựng Quản lý Hồ sơ Đại lý & Liên hệ (`/admin/leads`).
- [x] T012 Xây dựng Quản lý Sản phẩm & Bảng giá quy cách (`/admin/products`).
- [x] T013 Xây dựng Quản lý Tin tức, Kho bãi & Cấu hình Website (`/admin/content`, `/admin/settings`) kèm `revalidatePath`.

## Phase 5 — Kiểm Thử & Sẵn Sàng Deploy Vercel
- [x] T014 Chạy `npx tsc --noEmit` và `npm run build` kiểm tra 0 lỗi.
- [x] T015 Kiểm thử tự động API bảo mật (chặn truy cập chưa đăng nhập), form submission và giao diện `/admin` trên Chrome headless.
- [x] T016 Commit & push lên GitHub `origin` (`stromanquatri.git`), liên kết Vercel (`dong-b9b6/stromanquatri`), đồng bộ 5 biến môi trường và deploy Production.
- [ ] T017 Người dùng chạy `001_init_schema.sql` trong Supabase SQL Editor, tạo tài khoản Auth Admin và bấm Seed Data tại `/admin`.
