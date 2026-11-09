# Website AI - Multi-Agent Architecture & Specification Guide

Hệ thống kết hợp **GitHub Spec-Kit (Spec-Driven Development)** và **wshobson Agent Workforce (26 chuyên gia & 51 kỹ năng)** trên nền tảng **Antigravity**.

---

## 1. Bản đồ Quy trình (The 5-Phase Workflow)

```
[User Yêu cầu] 
      │
      ▼
1. /speckit.constitution  --> Thiết lập nguyên tắc kiến trúc & công nghệ
      │
      ▼
2. /speckit.specify       --> Tạo đặc tả tính năng (PRD / Functional Spec)
   (/speckit.clarify)     --> Làm rõ các câu hỏi mơ hồ trước khi lập kế hoạch
      │
      ▼
3. /speckit.plan          --> Lập kế hoạch kiến trúc kỹ thuật chi tiết
      │
      ▼
4. /speckit.tasks         --> Phân rã công việc thành danh sách task nguyên tử
      │
      ▼
5. /speckit.implement     --> Phân phối cho từng wshobson Sub-agent thực thi
   (/speckit.converge)    --> Kiểm thử, nghiệm thu & đối soát tiêu chí hoàn thành
```

---

## 2. Các Lệnh Điều Khiển Spec-Kit (`.gemini/commands/`)

| Lệnh Slash | Mục đích | Sản phẩm đầu ra |
| :--- | :--- | :--- |
| `/speckit.constitution` | Thiết lập nguyên tắc dự án, tech-stack, quy chuẩn bảo mật | `.specify/memory/constitution.md` |
| `/speckit.specify` | Tạo tài liệu đặc tả tính năng cho một module/feature | `.specify/specs/<feature>/spec.md` |
| `/speckit.clarify` | Quét các điểm mơ hồ, đưa câu hỏi nhiều lựa chọn để chốt yêu cầu | `clarifications.md` |
| `/speckit.plan` | Thiết kế kiến trúc kỹ thuật, schema dữ liệu, API contracts | `.specify/specs/<feature>/plan.md` |
| `/speckit.tasks` | Sinh danh sách task có phụ thuộc và Acceptance Criteria | `.specify/specs/<feature>/tasks.md` |
| `/speckit.implement` | Kích hoạt các sub-agent thực thi lần lượt theo `tasks.md` | Mã nguồn hoàn thiện |
| `/speckit.checklist` | Sinh checklist đánh giá chất lượng spec & plan | `checklist.md` |
| `/speckit.analyze` | Đối soát tính nhất quán giữa spec, plan và tasks | Báo cáo kiểm định |
| `/speckit.converge` | Đánh giá lại toàn bộ codebase, gom các tồn đọng thành task mới | Báo cáo hội tụ |

---

## 3. Danh mục Đội ngũ Sub-agent (`.agents/agents/`)

Hệ thống tự động kích hoạt hoặc phân công đúng vai trò chuyên gia tương ứng với từng task trong `tasks.md`:

### Giao diện & Trải nghiệm (Frontend & UI/UX)
* **`frontend-developer`**: Chuyên gia React 19, Next.js App Router, SSR/RSC, Client State (Zustand, TanStack Query).
* **`ui-designer`**: Thiết kế giao diện hiện đại, layout, typography, micro-interactions.
* **`design-system-architect`**: Xây dựng UI component library tái sử dụng, token hóa màu sắc, chuẩn Shadcn/Tailwind.
* **`accessibility-expert`**: Tối ưu chuẩn trợ năng WCAG 2.1 AA/AAA, ARIA attributes, keyboard navigation.
* **`mobile-developer`**: Tối ưu responsive trên màn hình cảm ứng di động, PWA, mobile viewports.

### Xử lý Logic & Dịch vụ Nền tảng (Backend & Languages)
* **`typescript-pro`**: Định kiểu chặt chẽ (strict TypeScript), generics nâng cao, type inference, Zod schema.
* **`javascript-pro`**: Tối ưu async/await, event loop, Node.js stream, xử lý dữ liệu hiệu năng cao.
* **`fastapi-pro`**: Xây dựng high-performance RESTful APIs bằng Python FastAPI, Pydantic v2, Async SQLAlchemy.
* **`python-pro`**: Thiết kế logic nghiệp vụ backend Python chuẩn mực, typing, module hóa sạch sẽ.
* **`django-pro`**: Xây dựng các module quản trị, ORM phức tạp, auth & admin nếu cần.

### Cơ sở Dữ liệu & Lưu trữ (Database & Storage)
* **`database-architect`**: Thiết kế quan hệ thực thể (ERD), chuẩn hóa dữ liệu, indexing tối ưu truy vấn.
* **`sql-pro`**: Viết câu truy vấn SQL phức tạp, window functions, phân trang cursor-based, tối ưu EXPLAIN ANALYZE.

### Chất lượng, Kiểm thử & An toàn (Testing & Security)
* **`security-auditor`**: Kiểm toán bảo mật OWASP Top 10, chống SQL Injection, XSS, CSRF, cấu hình CORS, leak secrets.
* **`test-automator`**: Viết Unit test (Vitest/Jest/Pytest), Integration test, E2E test (Playwright).
* **`performance-engineer`**: Tối ưu Core Web Vitals (LCP, FID, CLS), bundle size, caching headers, server response time.

### Vận hành & Tài liệu (DevOps & Documentation)
* **`deployment-engineer`**: Thiết lập CI/CD, Docker containerization, cấu hình deploy (Vercel, Docker, Cloud).
* **`api-documenter`**: Sinh tài liệu OpenAPI/Swagger, mẫu request/response, hướng dẫn tích hợp.
* **`docs-architect`**: Viết tài liệu kiến trúc, hướng dẫn triển khai, README chi tiết.
* **`mermaid-expert`**: Vẽ sơ đồ trực quan luồng dữ liệu (Dataflow), quan hệ bảng và kiến trúc hệ thống.

### Tối ưu Công cụ Tìm kiếm (SEO Optimization)
* **`seo-structure-architect`**: Cấu trúc thẻ Semantic HTML, Schema.org JSON-LD, Sitemap XML, Robots.txt.
* **`seo-meta-optimizer`**: Tối ưu OpenGraph tags, Twitter cards, meta titles & descriptions chuẩn SEO.
* **`seo-keyword-strategist`**: Chiến lược phân bổ từ khóa tự nhiên, thẻ H1-H6.
* **`seo-snippet-hunter`**: Định dạng nội dung để hiển thị trên Google Rich Snippets / Featured Snippets.

---

## 4. Kỹ năng Chuyên sâu Được tích hợp (`.agents/skills/`)

51 kỹ năng chuyên môn tự động nạp theo ngữ cảnh:
* **Frontend**: `nextjs-app-router-patterns`, `react-state-management`, `tailwind-design-system`, `responsive-design`, `web-component-design`
* **Backend & API**: `api-design-principles`, `architecture-patterns`, `fastapi-templates`, `auth-implementation-patterns`
* **Database**: `postgresql-table-design`, `sql-optimization-patterns`
* **AI & LLM**: `rag-implementation`, `prompt-engineering-patterns`, `vector-index-tuning`, `similarity-search-patterns`
* **Thanh toán**: `stripe-integration`, `billing-automation`, `paypal-integration`
* **DevOps**: `deployment-pipeline-design`, `github-actions-templates`, `secrets-management`

---

## 5. Nguyên tắc Thực thi Bất biến (Golden Rules)

1. **Spec First, Code Second**: Không viết bất kỳ code nào khi chưa có `spec.md` và `tasks.md` được người dùng duyệt.
2. **Atomic Tasks**: Mỗi task phải độc lập, có thể test được và có tiêu chí nghiệm thu rõ ràng.
3. **Strict Validation**: Mọi API input/output đều phải validate chặt chẽ (Zod cho TypeScript, Pydantic cho Python).
4. **Clean Git History**: Thực hiện commit theo từng giai đoạn hoàn thành tính năng.
