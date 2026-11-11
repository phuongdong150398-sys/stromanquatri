import { z } from "zod";
import { quoteRequestSchema } from "./validations";

export const quoteItemPayloadSchema = z.object({
  productId: z.string().min(1),
  productName: z.string().min(1),
  productSlug: z.string().min(1),
  category: z.string().min(1),
  specificationCode: z.string().min(1),
  nominalDiameter: z.string().min(1),
  pressureRating: z.string().min(1),
  wallThickness: z.string().min(1),
  quantity: z.number().positive("Số lượng phải lớn hơn 0"),
  unit: z.string().min(1),
  note: z.string().max(500).optional(),
});

export const createQuotePayloadSchema = z.object({
  customer: quoteRequestSchema,
  items: z.array(quoteItemPayloadSchema).min(1, "Vui lòng chọn ít nhất 1 quy cách sản phẩm"),
});

export const updateQuoteAdminSchema = z.object({
  status: z.enum(["new", "quoting", "sent", "won", "cancelled"]).optional(),
  discount_percent: z.number().min(0).max(100).optional(),
  admin_notes: z.string().max(2000).optional(),
});

export const updateDealerApplicationSchema = z.object({
  status: z.enum(["new", "reviewing", "approved", "rejected"]).optional(),
  admin_notes: z.string().max(2000).optional(),
});

export const updateContactMessageSchema = z.object({
  status: z.enum(["unread", "replied", "archived"]).optional(),
  admin_notes: z.string().max(2000).optional(),
});

export const specInputSchema = z.object({
  id: z.number().optional(),
  code: z.string().min(1),
  nominalDiameter: z.string().min(1),
  pressureRating: z.string().min(1),
  wallThickness: z.string().min(1),
  standardLength: z.string().min(1),
  standard: z.string().min(1),
  priceGuide: z.number().nonnegative().nullable().optional(),
});

export const upsertProductSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(2),
  category: z.enum(["upvc", "ppr", "ppr-antibacterial", "hdpe", "fittings"]),
  categoryName: z.string().min(1),
  shortDesc: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  bannerBadge: z.string().optional(),
  features: z.array(z.string()).default([]),
  advantages: z.array(z.string()).default([]),
  applications: z.array(z.string()).default([]),
  standards: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  specifications: z.array(specInputSchema).default([]),
});

export const upsertNewsSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(3),
  summary: z.string().min(5),
  category: z.enum(["Dự Án", "Kỹ Thuật", "Sự Kiện", "Chính Sách"]),
  date: z.string().min(1),
  image: z.string().min(1),
  content: z.array(z.string()).min(1),
  isPublished: z.boolean().default(true),
});

export const upsertDealerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  type: z.enum(["headquarter", "factory", "warehouse", "distributor"]),
  typeName: z.string().min(1),
  region: z.enum(["Bắc", "Trung", "Nam"]),
  province: z.string().min(1),
  address: z.string().min(3),
  phone: z.string().min(8),
  email: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export const siteSettingsSchema = z.object({
  brandName: z.string().min(2),
  distributorName: z.string().min(2),
  tagline: z.string().min(2),
  slogan: z.string().min(2),
  description: z.string().min(5),
  hotline: z.string().min(6),
  zalo: z.string().min(6),
  email: z.string().email(),
  mainWarehouse: z.string().min(3),
  northFactory: z.string().min(3),
  southFactory: z.string().min(3),
  zaloUrl: z.string().url(),
});
