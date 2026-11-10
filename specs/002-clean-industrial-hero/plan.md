# Technical Plan: Clean Industrial High-Tech Hero Banner

**Feature Branch / Track**: `002-clean-industrial-hero`  
**Prerequisites**: [spec.md](./spec.md)  
**Status**: Ready for Review / Planned  

---

## 1. Kiến trúc Giao diện & Hệ Thống Màu Sắc

### Bảng màu Sáng Công Nghiệp (Clean Industrial Palette)
- **Background Base**: `bg-gradient-to-b from-white via-slate-50/70 to-slate-100/80`
- **Subtle Texture**: Lưới kỹ thuật chấm mờ nhẹ `tech-grid-pattern opacity-10`
- **Accent Lighting**: Quầng sáng mờ xanh ngọc nhạt `emerald-500/5` và xanh dương nhạt `cyan-500/5`
- **Heading Text**: `text-slate-950` và `text-slate-900` với font chữ đậm, sắc cạnh
- **Primary Accent**: `text-emerald-600` và `bg-emerald-600 hover:bg-emerald-700` (Xanh thương hiệu Ströman)
- **Secondary Surface**: `bg-white/90 border border-slate-200/80 shadow-xs hover:shadow-md`

---

## 2. Cấu trúc Component `HeroSection.tsx`

```
┌────────────────────────────────────────────────────────────────────────┐
│                        HERO SECTION (Nền Sáng)                         │
│                                                                        │
│  ┌─────────────────────────┐            ┌───────────────────────────┐  │
│  │   LEFT: CONTENT & CTA   │            │  RIGHT: HERO PRODUCT      │  │
│  │                         │            │         SHOWCASE          │  │
│  │ • 🇩🇪 German Tech Badge   │            │ • Horizontal Pill Tabs    │  │
│  │ • Headline H1 (Bold)    │            │ • Large Transparent Image │  │
│  │ • Value Proposition     │            │   (1600x1200 RGBA, 3D)    │  │
│  │ • 3 Trust Micro-Pills   │            │ • Soft Floor Pedestal     │  │
│  │ • Primary & Sec Buttons │            │ • Dynamic Specs Bar       │  │
│  │ • Hotline & Zalo        │            │                           │  │
│  └─────────────────────────┘            └───────────────────────────┘  │
│                                                                        │
│  ────────────────────────────────────────────────────────────────────  │
│        BOTTOM TRUST BAR: 🇩🇪 Krauss Maffei • ISO 1452 • TCVN • Tân Á    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Quản lý Tài nguyên Hình ảnh (Asset Pipeline)

1. **Chuyển đổi 100% ảnh sang định dạng RGBA trong suốt**:
   - Sử dụng các file RGBA chuẩn:
     * `06_BO_SAN_PHAM_PNG_KHONG_CHU.png` (Trọn bộ hệ sinh thái)
     * `01_HDPE_PNG_KHONG_CHU.png` (Ống HDPE PE100)
     * `02_uPVC_PNG_KHONG_CHU.png` (Ống uPVC cao cấp)
     * `03_PPR_XANH_PNG_KHONG_CHU.png` (Ống PP-R Chịu nhiệt)
     * `04_PPR_TRANG_PNG_KHONG_CHU.png` (Ống PP-R Kháng khuẩn)
   - Chạy script xử lý tách nền trong suốt cho ảnh phụ kiện `Stroman_Phu_kien_uPVC.png` để đảm bảo 100% không còn nền trắng.

2. **Tối ưu hiển thị**:
   - Tăng chiều cao vùng hiển thị ảnh lên `h-72 sm:h-80 md:h-96` để ảnh sản phẩm có kích thước lớn, hoành tráng, xứng tầm hero banner.
   - Thêm bóng chân thực (`radial-gradient` đen mờ 15% ở đáy) tạo cảm giác sản phẩm đặt trên mặt sàn nhà máy.

---

## 4. Danh mục File Tác động
1. `src/components/home/HeroSection.tsx`: Tái thiết kế toàn bộ mã nguồn giao diện banner sáng.
2. `public/images/products/`: Chuẩn hóa các file ảnh RGBA trong suốt.
3. `src/app/globals.css`: Đảm bảo các utility hiệu ứng bóng đổ và lưới kỹ thuật hiển thị chuẩn xác trên nền sáng.
