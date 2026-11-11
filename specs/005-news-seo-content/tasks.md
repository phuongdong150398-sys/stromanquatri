# Tasks: Giai Đoạn 1 + Gói B Tin Tức Chuẩn SEO (`005-news-seo-content`)

- [x] T001 Tạo 7 ảnh minh họa editorial 16:9 (Chromium Studio Renderer từ ảnh sản phẩm gốc Stroman) và lưu vào `public/images/news/`.
- [x] T002 Tạo `src/lib/news-repository.ts` kết nối Supabase `news_articles` kèm fallback `newsData`.
- [x] T003 Tạo `src/components/news/NewsArticleRenderer.tsx` và `src/components/news/NewsCatalogClient.tsx`.
- [x] T004 Xây dựng `src/app/tin-tuc/[slug]/page.tsx` (SEO Metadata, JSON-LD `Article`, Mục lục, CTA, Bài liên quan) và cập nhật `src/app/tin-tuc/page.tsx` + `src/app/page.tsx`.
- [x] T005 Bổ sung `src/app/sitemap.ts` và `src/app/robots.ts`.
- [x] T006 Phủ nội dung 12 bài viết chuẩn SEO (Gói B) vào `src/data/news.ts` và đồng bộ lên bảng `news_articles` trên Supabase.
- [x] T007 Chạy `tsc --noEmit`, `npm run build`, push GitHub, deploy Vercel và kiểm thử live cả Desktop & Mobile.
