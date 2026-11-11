# Technical Plan: Trang Quản Trị & Kết Nối Supabase / Vercel

**Feature Track**: `004-admin-portal`  
**Prerequisites**: [spec.md](./spec.md)  

---

## 1. Kiến Trúc Kết Nối Supabase (`@supabase/supabase-js` + `@supabase/ssr`)

- `src/lib/supabase/client.ts`: Browser client dùng `createBrowserClient` với `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY` (hoặc `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`).
- `src/lib/supabase/server.ts`: Server Component / Route Handler client dùng `createServerClient` đồng bộ cookie Next.js 15 (`await cookies()`).
- `src/lib/supabase/admin.ts`: Privileged server-only client dùng `SUPABASE_SERVICE_ROLE_KEY` cho thao tác ghi đơn công khai từ API (sau khi validate Zod) và quản trị hệ thống, **không bao giờ import ở Client Component**.
- `src/middleware.ts`: Bảo vệ mọi đường dẫn `/admin` (trừ `/admin/login`) và `/api/admin/*` bằng phiên Supabase Auth + đối chiếu `ADMIN_ALLOWED_EMAILS`.

---

## 2. Thiết Kế Schema PostgreSQL (`supabase/migrations/001_init_schema.sql`)

Tuân thủ chuẩn thiết kế PostgreSQL (`snake_case`, `TIMESTAMPTZ`, `NUMERIC` cho tiền tệ/chiết khấu, index cho FK và cột tìm kiếm, RLS bật trên 100% bảng):

1. `quote_requests` (id UUID PK, quote_code UNIQUE, thông tin khách, role CHECK, status CHECK, discount_percent NUMERIC(5,2), admin_notes, created_at, updated_at)
2. `quote_items` (id BIGINT IDENTITY PK, quote_request_id UUID FK ON DELETE CASCADE + index, thông số ống, quantity NUMERIC > 0, unit, unit_price_guide NUMERIC(12,2), note)
3. `dealer_applications` (id UUID PK, business_name, contact_person, phone, email, province, district, current_business, estimated_monthly_volume, notes, status CHECK, admin_notes, created_at, updated_at)
4. `contact_messages` (id UUID PK, full_name, phone, email, subject, message, status CHECK, admin_notes, created_at, updated_at)
5. `products` & `product_specifications` (đồng bộ 1-1 cấu trúc `Product` & `ProductSpecification` từ `src/data/products.ts` để seed & quản lý giá `price_guide`)
6. `news_articles`, `dealers`, `site_settings` (CMS tin tức, đại lý, cấu hình hotline/email/kho bãi)

**Row Level Security (RLS)**:
- Bật `ENABLE ROW LEVEL SECURITY` trên tất cả bảng.
- Public chỉ được `SELECT` các bảng công khai (`products`, `product_specifications`, `news_articles`, `dealers`, `site_settings`); việc ghi form khách hàng đi qua API Route Handler Server đã validate `Zod` kỹ lưỡng.

---

## 3. Cấu Trúc Thư Mục & API Endpoints Mới

- `src/app/api/quotes/route.ts` (`POST`: tạo đơn dự toán mới từ trang khách)
- `src/app/api/dealers/register/route.ts` (`POST`: nhận hồ sơ đăng ký đại lý)
- `src/app/api/contact/route.ts` (`POST`: nhận liên hệ)
- `src/app/api/admin/quotes/route.ts`, `src/app/api/admin/quotes/[id]/route.ts`
- `src/app/api/admin/leads/route.ts`, `src/app/api/admin/leads/[id]/route.ts`
- `src/app/api/admin/products/route.ts`, `src/app/api/admin/products/[id]/route.ts`
- `src/app/api/admin/content/route.ts`
- `src/app/api/admin/settings/route.ts`
- `src/app/api/admin/seed/route.ts` (`POST`: nút bấm 1-click đồng bộ dữ liệu mẫu từ `src/data/*.ts` vào Supabase lần đầu)
- `src/app/admin/login/page.tsx`
- `src/app/admin/layout.tsx` (Sidebar Navigation chuẩn màu `#061B33`, `#007A4D`, `#F6F9FB`)
- `src/app/admin/page.tsx` (Dashboard KPIs)
- `src/app/admin/quotes/page.tsx`
- `src/app/admin/leads/page.tsx`
- `src/app/admin/products/page.tsx`
- `src/app/admin/content/page.tsx`
- `src/app/admin/settings/page.tsx`
