# Feature Specification: Hệ Thống Tin Tức Chuẩn SEO & Phủ Nội Dung Topic Cluster (Gói B)

**Feature Branch / Track**: `005-news-seo-content`  
**Status**: Approved (`triển khai giai đoạn 1 + gói B ngay`)  

---

## 1. Mục tiêu Nghiệp vụ & SEO
1. Tạo trang chi tiết bài viết `/tin-tuc/[slug]` chuẩn SEO để Google index từng bài viết độc lập và chuyển đổi người đọc thành khách hàng dự toán báo giá.
2. Kết nối trang danh sách `/tin-tuc`, trang chi tiết `/tin-tuc/[slug]` và mục Tin tức trên Trang chủ `/` với bảng `news_articles` trên Supabase (fallback mượt mà về `src/data/news.ts`).
3. Tự động xuất `sitemap.xml` (`src/app/sitemap.ts`) và `robots.txt` (`src/app/robots.ts`) bao gồm toàn bộ đường dẫn công khai, sản phẩm và bài viết.
4. Phủ đủ **12 bài viết chuẩn SEO (Gói B)** bao quát 4 chuyên mục (`Dự Án`, `Kỹ Thuật`, `Sự Kiện`, `Chính Sách`) kèm bộ ảnh cover sắc nét lưu tại `public/images/news/` và ảnh sản phẩm thực tế, đồng bộ thẳng lên Supabase `news_articles`.

## 2. Yêu cầu Tính năng & Kiểm chứng Dữ liệu
- **Định dạng nội dung phong phú**: Hỗ trợ `##` (H2 kèm Mục lục tự động), `###` (H3), `- ` (danh sách kỹ thuật), `> ` (hộp lưu ý chuyên gia) và liên kết nội bộ tới `/san-pham/[slug]` & `/du-toan-bao-gia`.
- **SEO & Structured Data**:
  - `generateMetadata` riêng cho mỗi bài (`/tin-tuc/[slug]`) với `title`, `description`, `openGraph.images`.
  - JSON-LD `Article` và `BreadcrumbList`.
- **Tính chính xác tuyệt đối**: Chỉ sử dụng thông số và tiêu chuẩn đã xác minh trong `src/data/products.ts` (`TCVN 8491:2011`, `ISO 1452:2009`, `DIN 8077/8078`, `ISO 4427:2007`, `TCVN 7305:2008`, `QCVN 12-1:2011/BYT`, `BS 3505`) và thông tin liên hệ chính thức trong `src/config/site.ts` (`0915 333 808`, `phuongdongmi4@gmail.com`).
- **Mobile-first**: Trang `/tin-tuc` và `/tin-tuc/[slug]` không tràn ngang ở `375px`/`390px`, tap target tối thiểu `40–44px`.
