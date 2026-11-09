# Stroman Pipe Distribution Platform Constitution

## Core Principles

### I. Specification-First & Traceability (Spec-Driven Development)
- Không viết bất kỳ mã nguồn triển khai nào khi chưa có `spec.md`, `plan.md` và `tasks.md` được phê duyệt.
- Mọi thay đổi kỹ thuật hoặc bổ sung tính năng đều phải được đối chiếu với các tiêu chí nghiệm thu (Acceptance Criteria) trong `spec.md`.

### II. Hiệu năng & Trải nghiệm Người dùng (Performance & UX)
- Stack công nghệ bắt buộc: **Next.js 15 App Router (React 19)**, **TypeScript Strict**, **Tailwind CSS**, **Lucide Icons**.
- Thời gian tải trang dưới 1.5s, điểm Core Web Vitals (LCP, FID, CLS) xanh toàn diện.
- Trải nghiệm đa thiết bị (Mobile First): Mọi bảng tra cứu thông số kỹ thuật (đường kính, áp suất, độ dày) phải hiển thị rõ ràng, dễ cuộn và trực quan trên cả điện thoại di động và máy tính để bàn.

### III. Cấu trúc Quản trị Tập trung (Single Source of Truth)
- Toàn bộ thông tin định danh thương hiệu (Brand name, logo, hotline, Zalo, địa chỉ kho, email, chính sách đại lý) được quản lý tập trung trong file cấu hình `site.config.ts`.
- Không hardcode thông tin liên hệ, hotline hay URL tĩnh phân tán trong mã nguồn.

### IV. Chuẩn hóa Dữ liệu Kỹ thuật & Báo giá (Strict Schema & Type Safety)
- Danh mục sản phẩm (uPVC, PP-R, HDPE, Kháng khuẩn, Phụ kiện) phải được định kiểu dữ liệu nghiêm ngặt bằng TypeScript và Zod schema.
- Hỗ trợ công cụ tính toán dự toán vật tư và tạo yêu cầu báo giá (Quick Quote Builder) xuất danh mục rõ ràng cho đại lý và nhà thầu.

### V. Bảo mật, An toàn & Độ tin cậy (Security & Reliability)
- Tuân thủ tiêu chuẩn bảo mật OWASP: Xác thực và lọc sạch mọi input người dùng tại form liên hệ/báo giá, ngăn chặn XSS, CSRF và injection.
- Không commit secrets, khóa API hay thông tin nhạy cảm vào git repository.

## Quản trị & Tuân thủ (Governance)

- Mọi Pull Request hoặc commit tính năng phải đáp ứng kiểm thử và thỏa mãn checklist chất lượng.
- Các Sub-agent chuyên môn (`frontend-developer`, `database-architect`, `security-auditor`, `test-automator`) thực thi đúng ranh giới trách nhiệm theo phân công từ `tasks.md`.

**Version**: 1.0.0 | **Ratified**: 2026-11-09 | **Status**: Active
