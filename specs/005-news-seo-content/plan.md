# Technical Plan: Tin Tức Chuẩn SEO & Đồng Bộ Supabase (`005-news-seo-content`)

1. **Data Access Layer (`src/lib/news-repository.ts`)**:
   - Đọc danh sách bài viết `is_published = true` từ Supabase qua anon client (`createClient` từ `@supabase/supabase-js`).
   - Sắp xếp theo ngày đăng `DD/MM/YYYY` giảm dần.
   - Fallback sang `newsData` trong `src/data/news.ts` nếu Supabase chưa có dữ liệu hoặc lỗi kết nối; hỗ trợ `getPublishedNewsArticles()` và `getNewsArticleBySlug(slug)`.
2. **UI & Components**:
   - `src/components/news/NewsCatalogClient.tsx`: Lọc theo chuyên mục + tìm kiếm bài viết trên `/tin-tuc`, card bấm mở `/tin-tuc/[slug]`.
   - `src/components/news/NewsArticleRenderer.tsx`: Parse mảng `content: string[]` (nhận diện `##`, `###`, `-`, `>`) tạo mục lục + định dạng bài viết kỹ thuật sạch sẽ, giữ tương thích hoàn toàn với bài nhập từ `/admin/content`.
   - `src/app/tin-tuc/page.tsx`: Server Component (`revalidate = 60`).
   - `src/app/tin-tuc/[slug]/page.tsx`: Server Component (`revalidate = 60`, `generateStaticParams`, `generateMetadata`, JSON-LD `Article` + `BreadcrumbList`, CTA dự toán, bài viết liên quan).
   - `src/app/page.tsx`: Nối 3 bài viết mới nhất tới `/tin-tuc/[slug]`.
3. **Crawlability**:
   - `src/app/sitemap.ts` & `src/app/robots.ts` (ẩn `/admin`, `/api`).
4. **Content & Visual Assets (12 bài Gói B)**:
   - Sinh 7 ảnh editorial cover bằng `image-generator` và lưu tại `public/images/news/`.
   - Viết đầy đủ 12 bài viết chuẩn SEO vào `src/data/news.ts`, sau đó upsert đồng bộ trực tiếp vào bảng `news_articles` trên Supabase.
