# Implementation Plan: Nền tảng Phân phối Ống Nhựa Stroman Việt Nam

**Branch**: `001-stroman-distribution-portal` | **Date**: 2026-11-09 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/001-stroman-distribution-portal/spec.md`  

---

## 1. Tóm tắt Kỹ thuật (Technical Summary)

Xây dựng hệ thống web ứng dụng phân phối B2B/B2C bằng **Next.js 15 App Router** với kiến trúc module hóa cao. Hệ thống tận dụng Server Components để tối ưu hóa SEO và thời gian phản hồi đầu tiên (FCP), đồng thời dùng Client Components tương tác mượt mà cho Bộ lọc kỹ thuật đa tiêu chí (uPVC, PP-R, HDPE) và Công cụ lập dự toán vật tư trực tuyến (Smart Quote Builder).

Toàn bộ thông tin nhận diện doanh nghiệp được trừu tượng hóa qua `src/config/site.ts` để người dùng có thể thay đổi logo, hotline, địa chỉ kho mà không đụng tới mã nguồn giao diện.

---

## 2. Bối cảnh Kỹ thuật & Ràng buộc (Technical Context)

* **Framework & Runtime:** Next.js 15 (App Router, React 19), Node.js v22.
* **Ngôn ngữ:** TypeScript Strict Mode (`tsconfig.json` với `strict: true`, no implicit any).
* **Styling & Theme:** Tailwind CSS v3.4+, PostCSS, Lucide React (bộ icon công nghiệp, sắc nét).
* **Quản lý Trạng thái:** React Context / Zustand tích hợp `localStorage` cho giỏ dự toán vật tư (`QuoteContext`).
* **Validation & Types:** Zod v3 cho form báo giá, form đăng ký đại lý và form liên hệ.
* **Mục tiêu Hiệu năng:** Lighthouse Score > 90 (Performance, Accessibility, Best Practices, SEO).
* **SEO & Metadata:** Thẻ OpenGraph, Twitter Card, Canonical URL, cấu trúc dữ liệu JSON-LD Schema (`Organization`, `Product`, `BreadcrumbList`).

---

## 3. Kiến trúc Cấu trúc Thư mục (Project Structure)

```text
Website AI/
├── src/
│   ├── app/                                 # Next.js App Router routes
│   │   ├── layout.tsx                       # Root layout với Navbar, Footer, Meta, Schema
│   │   ├── page.tsx                         # Trang chủ (Hero, Giới thiệu, Sản phẩm, Ứng dụng, Tin tức)
│   │   ├── san-pham/
│   │   │   ├── page.tsx                     # Danh mục sản phẩm & Bộ lọc kỹ thuật
│   │   │   └── [slug]/
│   │   │       └── page.tsx                 # Chi tiết sản phẩm & Bảng tra quy cách
│   │   ├── du-toan-bao-gia/
│   │   │   └── page.tsx                     # Công cụ Smart Quote Builder & Gửi yêu cầu
│   │   ├── he-thong-phan-phoi/
│   │   │   └── page.tsx                     # Tra cứu đại lý & kho hàng theo Tỉnh thành
│   │   ├── ung-dung/
│   │   │   └── page.tsx                     # Ứng dụng cho các lĩnh vực công trình
│   │   ├── chinh-sach-dai-ly/
│   │   │   └── page.tsx                     # Chính sách hợp tác & Form đăng ký đại lý
│   │   ├── tin-tuc/
│   │   │   └── page.tsx                     # Tin tức ngành & dự án
│   │   └── lien-he/
│   │       └── page.tsx                     # Thông tin liên hệ & bản đồ trụ sở/kho
│   ├── components/                          # UI & Business Components
│   │   ├── layout/
│   │   │   ├── Header.tsx                   # Thanh điều hướng, hotline, nút dự toán
│   │   │   ├── Footer.tsx                   # Chân trang, thông tin pháp lý, liên kết
│   │   │   └── FloatingContact.tsx          # Nút gọi Hotline & Zalo nhanh ở góc màn hình
│   │   ├── home/
│   │   │   ├── HeroSection.tsx              # Banner công nghệ Đức, thông điệp 70M USD
│   │   │   ├── CategoryShowcase.tsx         # Khối 4 dòng sản phẩm chính uPVC/PPR/HDPE
│   │   │   ├── TechnicalFeatures.tsx        # Điểm mạnh vượt trội của nhựa Stroman
│   │   │   ├── ApplicationGrid.tsx          # 6 lĩnh vực ứng dụng thực tế
│   │   │   └── DistributionPreview.tsx      # Bản đồ mạng lưới đại lý toàn quốc
│   │   ├── products/
│   │   │   ├── ProductCard.tsx              # Card sản phẩm hiển thị tiêu chuẩn & quy cách
│   │   │   ├── ProductFilter.tsx            # Bộ lọc theo chất liệu, phi Ø, áp suất PN
│   │   │   ├── SpecTable.tsx                # Bảng tra kích thước, độ dày, áp suất làm việc
│   │   │   └── AddToQuoteButton.tsx         # Nút chọn quy cách đưa vào dự toán
│   │   ├── quote/
│   │   │   ├── QuoteCartList.tsx            # Bảng danh sách vật tư đã chọn
│   │   │   ├── QuoteForm.tsx                # Form thông tin người nhận báo giá (Zod)
│   │   │   └── QuoteSuccessModal.tsx        # Màn hình xác nhận thành công & xuất in
│   │   └── ui/                              # Atomic UI components
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       └── Modal.tsx
│   ├── config/
│   │   └── site.ts                          # Single source of truth cho thương hiệu, hotline, địa chỉ
│   ├── data/
│   │   ├── products.ts                      # Bộ dữ liệu kỹ thuật đầy đủ của ống Stroman
│   │   ├── dealers.ts                       # Danh sách kho nhà máy & đại lý tiêu biểu
│   │   ├── applications.ts                  # Dữ liệu 6 lĩnh vực ứng dụng công trình
│   │   └── news.ts                          # Dữ liệu bài viết & dự án
│   ├── context/
│   │   └── QuoteContext.tsx                 # Context quản lý giỏ dự toán (localStorage sync)
│   ├── types/
│   │   ├── product.ts                       # Type definitions cho sản phẩm & bảng quy cách
│   │   └── quote.ts                         # Type definitions cho dự toán & đại lý
│   └── lib/
│       ├── utils.ts                         # Classnames merger, định dạng số, định dạng slug
│       └── validations.ts                   # Zod schemas cho form báo giá & đăng ký
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 4. Mô hình Dữ liệu Kỹ thuật (Data Schema)

### Product Model (`src/types/product.ts`)
```typescript
export type ProductCategory = 'upvc' | 'ppr' | 'ppr-antibacterial' | 'hdpe' | 'fittings';

export interface ProductSpecification {
  code: string;               // Mã quy cách (VD: STR-UPVC-110-C2)
  nominalDiameter: string;    // Đường kính ngoài danh nghĩa (VD: Ø110 mm)
  pressureRating: string;     // Áp suất làm việc (VD: PN10, PN16, PN25, Class 1..3)
  wallThickness: string;      // Độ dày thành ống (VD: 3.2 mm)
  standardLength: string;     // Chiều dài cây (VD: 4m, 6m hoặc cuộn 50m/100m)
  standard: string;           // Tiêu chuẩn (VD: TCVN 8491 / ISO 1452 / DIN 8077/8078)
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  shortDesc: string;
  description: string;
  bannerImage: string;
  specifications: ProductSpecification[];
  advantages: string[];
  applications: string[];
  catalogueUrl?: string;
  isFeatured?: boolean;
}
```

### Quote Model (`src/types/quote.ts`)
```typescript
export interface QuoteItem {
  id: string;
  productId: string;
  productName: string;
  category: string;
  specificationCode: string;
  nominalDiameter: string;
  pressureRating: string;
  quantity: number;
  unit: string;               // mét / cây / cuộn
  note?: string;
}

export interface QuoteRequest {
  fullName: string;
  phone: string;
  email?: string;
  province: string;
  companyOrProject?: string;
  role: 'contractor' | 'dealer' | 'consultant' | 'individual';
  items: QuoteItem[];
  notes?: string;
  createdAt: string;
}
```

---

## 5. Phân công Sub-agent Triển khai (Agent Task Mapping)

| Sub-agent | Phạm vi triển khai |
| :--- | :--- |
| **`design-system-architect`** & **`ui-designer`** | Cấu hình Tailwind theme (màu nhận diện Stroman xanh lá `#006C41`, xám titan, trắng), xây dựng Header, Footer, Hero, Layout và các atomic components. |
| **`database-architect`** & **`typescript-pro`** | Xây dựng dataset kỹ thuật chính xác cho Stroman (`src/data/products.ts`, `dealers.ts`, `applications.ts`), Zod schemas và TypeScript definitions. |
| **`frontend-developer`** | Xây dựng Catalog sản phẩm, Bộ lọc thông minh, Trang chi tiết với Bảng tra quy cách, và Module Smart Quote Builder với Context API. |
| **`seo-structure-architect`** | Tối ưu Schema.org JSON-LD, Sitemap, Robots.txt, OpenGraph tags, semantic tags. |
| **`security-auditor`** & **`test-automator`** | Kiểm toán an toàn dữ liệu đầu vào (XSS/CSRF), kiểm tra hiển thị responsive và luồng tạo đơn báo giá. |
