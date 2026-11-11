"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Package,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Search,
  Database,
} from "lucide-react";
import { SchemaSetupBanner } from "@/components/admin/SchemaSetupBanner";
import { formatVnd } from "@/lib/admin-format";

type ProductCategory = "upvc" | "ppr" | "ppr-antibacterial" | "hdpe" | "fittings";

const CATEGORY_OPTIONS: Array<{ value: ProductCategory; label: string }> = [
  { value: "upvc", label: "Ống nhựa uPVC" },
  { value: "ppr", label: "Ống nhựa PP-R" },
  { value: "ppr-antibacterial", label: "Ống PP-R kháng khuẩn" },
  { value: "hdpe", label: "Ống nhựa HDPE" },
  { value: "fittings", label: "Phụ kiện đồng bộ" },
];

interface DbSpecRow {
  id?: number;
  code: string;
  nominal_diameter: string;
  pressure_rating: string;
  wall_thickness: string;
  standard_length: string;
  standard: string;
  price_guide: number | null;
}

interface DbProductRow {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  category_name: string;
  short_desc: string;
  description: string;
  image: string;
  banner_badge?: string | null;
  features?: string[];
  advantages?: string[];
  applications?: string[];
  standards?: string[];
  is_featured: boolean;
  is_active: boolean;
  product_specifications?: DbSpecRow[];
}

interface SpecDraft {
  code: string;
  nominalDiameter: string;
  pressureRating: string;
  wallThickness: string;
  standardLength: string;
  standard: string;
  priceGuide: string;
}

interface ProductDraft {
  isNew: boolean;
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  shortDesc: string;
  description: string;
  image: string;
  bannerBadge: string;
  featuresText: string;
  advantagesText: string;
  applicationsText: string;
  standardsText: string;
  isFeatured: boolean;
  isActive: boolean;
  specifications: SpecDraft[];
}

function toDraft(p?: DbProductRow): ProductDraft {
  if (!p) {
    const id = `prod-${Date.now()}`;
    return {
      isNew: true,
      id,
      slug: id,
      name: "",
      category: "upvc",
      categoryName: "Ống nhựa uPVC",
      shortDesc: "",
      description: "",
      image: "/images/products/upvc.png",
      bannerBadge: "",
      featuresText: "",
      advantagesText: "",
      applicationsText: "",
      standardsText: "ISO 1452, TCVN 8491",
      isFeatured: false,
      isActive: true,
      specifications: [
        {
          code: "QC-01",
          nominalDiameter: "DN21",
          pressureRating: "PN10",
          wallThickness: "1.6mm",
          standardLength: "4m / cây",
          standard: "ISO 1452",
          priceGuide: "",
        },
      ],
    };
  }

  return {
    isNew: false,
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    categoryName: p.category_name,
    shortDesc: p.short_desc,
    description: p.description,
    image: p.image,
    bannerBadge: p.banner_badge || "",
    featuresText: (p.features || []).join("\n"),
    advantagesText: (p.advantages || []).join("\n"),
    applicationsText: (p.applications || []).join("\n"),
    standardsText: (p.standards || []).join(", "),
    isFeatured: Boolean(p.is_featured),
    isActive: Boolean(p.is_active),
    specifications: (p.product_specifications || []).map((s) => ({
      code: s.code,
      nominalDiameter: s.nominal_diameter,
      pressureRating: s.pressure_rating,
      wallThickness: s.wall_thickness,
      standardLength: s.standard_length,
      standard: s.standard,
      priceGuide:
        s.price_guide !== null && s.price_guide !== undefined
          ? String(s.price_guide)
          : "",
    })),
  };
}

function splitLines(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<DbProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [schemaMissing, setSchemaMissing] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<"all" | ProductCategory>("all");
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState<ProductDraft | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setSchemaMissing(Boolean(data.schemaMissing));
      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch {
      setFeedback({ type: "error", text: "Không thể tải danh sách sản phẩm." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSeed = async () => {
    setSeeding(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setFeedback({ type: "error", text: data.error || "Seed dữ liệu thất bại." });
        return;
      }
      setFeedback({
        type: "success",
        text: `Đã đồng bộ ${data.seeded?.products || 0} sản phẩm và ${
          data.seeded?.specifications || 0
        } quy cách.`,
      });
      await loadProducts();
    } catch {
      setFeedback({ type: "error", text: "Lỗi kết nối khi seed dữ liệu." });
    } finally {
      setSeeding(false);
    }
  };

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.category_name.toLowerCase().includes(q)
      );
    });
  }, [products, categoryFilter, search]);

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setSaving(true);
    setFeedback(null);

    const payload = {
      id: draft.id.trim(),
      slug: draft.slug.trim(),
      name: draft.name.trim(),
      category: draft.category,
      categoryName: draft.categoryName.trim(),
      shortDesc: draft.shortDesc.trim(),
      description: draft.description.trim(),
      image: draft.image.trim(),
      bannerBadge: draft.bannerBadge.trim() || undefined,
      features: splitLines(draft.featuresText),
      advantages: splitLines(draft.advantagesText),
      applications: splitLines(draft.applicationsText),
      standards: draft.standardsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      isFeatured: draft.isFeatured,
      isActive: draft.isActive,
      specifications: draft.specifications.map((s) => ({
        code: s.code.trim(),
        nominalDiameter: s.nominalDiameter.trim(),
        pressureRating: s.pressureRating.trim(),
        wallThickness: s.wallThickness.trim(),
        standardLength: s.standardLength.trim(),
        standard: s.standard.trim(),
        priceGuide:
          s.priceGuide.trim() === "" ? null : Math.max(0, Number(s.priceGuide)),
      })),
    };

    try {
      const endpoint = draft.isNew
        ? "/api/admin/products"
        : `/api/admin/products/${draft.id}`;
      const method = draft.isNew ? "POST" : "PATCH";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setFeedback({
          type: "error",
          text: data.error || "Lưu sản phẩm thất bại. Kiểm tra các trường bắt buộc.",
        });
        return;
      }

      const saved: DbProductRow = data.product;
      if (draft.isNew) {
        setProducts((prev) => [saved, ...prev]);
      } else {
        setProducts((prev) =>
          prev.map((row) => (row.id === saved.id ? saved : row))
        );
      }

      setDraft(null);
      setFeedback({
        type: "success",
        text: `Đã lưu sản phẩm "${saved.name}" và bảng giá quy cách.`,
      });
    } catch {
      setFeedback({ type: "error", text: "Lỗi kết nối khi lưu sản phẩm." });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (product: DbProductRow) => {
    if (!window.confirm(`Xác nhận xóa sản phẩm "${product.name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setFeedback({ type: "error", text: "Xóa sản phẩm thất bại." });
        return;
      }
      setProducts((prev) => prev.filter((row) => row.id !== product.id));
      setFeedback({ type: "success", text: `Đã xóa "${product.name}".` });
    } catch {
      setFeedback({ type: "error", text: "Lỗi kết nối khi xóa sản phẩm." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#061B33]">
            Quản lý Sản phẩm &amp; Bảng giá Quy cách
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Chỉnh sửa thông số kỹ thuật, đơn giá tham khảo cho từng đường kính DN / cấp áp lực PN.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={loadProducts}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-sm font-medium text-[#102035] cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Tải lại
          </button>

          <button
            type="button"
            onClick={() => setDraft(toDraft())}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#007A4D] hover:bg-[#00633e] text-white text-sm font-semibold shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Thêm sản phẩm
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`flex items-start gap-2.5 p-4 rounded-xl border text-sm ${
            feedback.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {schemaMissing && <SchemaSetupBanner onSeed={handleSeed} seeding={seeding} />}

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm sản phẩm theo tên hoặc slug..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#007A4D]"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setCategoryFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              categoryFilter === "all"
                ? "bg-[#061B33] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Tất cả ({products.length})
          </button>
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategoryFilter(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                categoryFilter === cat.value
                  ? "bg-[#007A4D] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-slate-500">
            Đang tải sản phẩm từ Supabase...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-10 text-center space-y-3">
            <Package className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm text-slate-500">
              Chưa có sản phẩm nào trong cơ sở dữ liệu.
            </p>
            {!schemaMissing && products.length === 0 && (
              <button
                type="button"
                onClick={handleSeed}
                disabled={seeding}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#007A4D] text-white text-xs font-semibold cursor-pointer"
              >
                <Database className="w-4 h-4" />
                {seeding ? "Đang nạp..." : "Nạp sản phẩm mẫu ngay"}
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3.5 font-semibold">Sản phẩm</th>
                  <th className="px-4 py-3.5 font-semibold">Nhóm</th>
                  <th className="px-4 py-3.5 font-semibold">Quy cách &amp; Giá</th>
                  <th className="px-4 py-3.5 font-semibold">Hiển thị</th>
                  <th className="px-4 py-3.5 font-semibold text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => {
                  const specs = p.product_specifications || [];
                  const minPrice = specs
                    .map((s) => s.price_guide)
                    .filter((v): v is number => typeof v === "number" && v > 0)
                    .sort((a, b) => a - b)[0];

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-[#061B33]">{p.name}</div>
                        <div className="text-xs text-slate-500 font-mono">
                          /{p.slug}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {p.category_name}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs">
                        <div className="font-semibold text-[#102035]">
                          {specs.length} quy cách
                        </div>
                        <div className="text-slate-500">
                          Từ {minPrice ? formatVnd(minPrice) : "Liên hệ"}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex flex-wrap gap-1.5">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                              p.is_active
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {p.is_active ? "Đang bán" : "Đang ẩn"}
                          </span>
                          {p.is_featured && (
                            <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                              Nổi bật
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setDraft(toDraft(p))}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#007A4D] hover:text-white text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            Sửa giá &amp; QC
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(p)}
                            aria-label="Xóa sản phẩm"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Product & Specification Editor Modal */}
      {draft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <form
            onSubmit={handleSaveProduct}
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden"
          >
            <div className="px-6 py-4 bg-[#061B33] text-white flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-lg font-bold">
                  {draft.isNew
                    ? "Thêm sản phẩm mới"
                    : `Chỉnh sửa: ${draft.name}`}
                </h2>
                <p className="text-xs text-slate-300">
                  Cập nhật thông tin sản phẩm và đơn giá quy cách (VND)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDraft(null)}
                aria-label="Đóng trình chỉnh sửa"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Tên sản phẩm *
                  </label>
                  <input
                    required
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Slug URL *
                  </label>
                  <input
                    required
                    value={draft.slug}
                    onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Nhóm sản phẩm *
                  </label>
                  <select
                    value={draft.category}
                    onChange={(e) => {
                      const val = e.target.value as ProductCategory;
                      const found = CATEGORY_OPTIONS.find((c) => c.value === val);
                      setDraft({
                        ...draft,
                        category: val,
                        categoryName: found?.label || draft.categoryName,
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Đường dẫn ảnh (/images/...) *
                  </label>
                  <input
                    required
                    value={draft.image}
                    onChange={(e) => setDraft({ ...draft, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1">
                    Mô tả ngắn *
                  </label>
                  <input
                    required
                    value={draft.shortDesc}
                    onChange={(e) =>
                      setDraft({ ...draft, shortDesc: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1">
                    Mô tả chi tiết *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={draft.description}
                    onChange={(e) =>
                      setDraft({ ...draft, description: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div className="md:col-span-2 flex flex-wrap gap-6 pt-1">
                  <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draft.isActive}
                      onChange={(e) =>
                        setDraft({ ...draft, isActive: e.target.checked })
                      }
                      className="rounded border-slate-300 text-[#007A4D]"
                    />
                    Hiển thị sản phẩm trên Website
                  </label>

                  <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draft.isFeatured}
                      onChange={(e) =>
                        setDraft({ ...draft, isFeatured: e.target.checked })
                      }
                      className="rounded border-slate-300 text-[#007A4D]"
                    />
                    Đánh dấu Sản phẩm nổi bật
                  </label>
                </div>
              </div>

              {/* Specifications & Pricing Table */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#061B33]">
                      Bảng Quy cách Kỹ thuật &amp; Đơn giá Tham khảo
                    </h3>
                    <p className="text-xs text-slate-500">
                      Để trống giá nếu hiển thị &ldquo;Liên hệ&rdquo; trên web.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        specifications: [
                          ...draft.specifications,
                          {
                            code: `QC-${draft.specifications.length + 1}`,
                            nominalDiameter: "DN25",
                            pressureRating: "PN10",
                            wallThickness: "2.0mm",
                            standardLength: "4m / cây",
                            standard: "ISO 1452",
                            priceGuide: "",
                          },
                        ],
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#082B4A] text-white text-xs font-semibold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Thêm quy cách
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 uppercase border-b border-slate-200">
                      <tr>
                        <th className="px-2.5 py-2 font-semibold">Mã QC</th>
                        <th className="px-2.5 py-2 font-semibold">Đường kính</th>
                        <th className="px-2.5 py-2 font-semibold">Áp lực</th>
                        <th className="px-2.5 py-2 font-semibold">Độ dày</th>
                        <th className="px-2.5 py-2 font-semibold">Chiều dài</th>
                        <th className="px-2.5 py-2 font-semibold">Tiêu chuẩn</th>
                        <th className="px-2.5 py-2 font-semibold">Đơn giá (VND)</th>
                        <th className="px-2.5 py-2"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {draft.specifications.map((spec, idx) => {
                        const updateSpec = (
                          field: keyof SpecDraft,
                          value: string
                        ) => {
                          const next = [...draft.specifications];
                          next[idx] = { ...next[idx], [field]: value };
                          setDraft({ ...draft, specifications: next });
                        };
                        return (
                          <tr key={idx}>
                            <td className="p-2">
                              <input
                                required
                                value={spec.code}
                                onChange={(e) => updateSpec("code", e.target.value)}
                                className="w-24 px-2 py-1 rounded border border-slate-300 font-mono"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                required
                                value={spec.nominalDiameter}
                                onChange={(e) =>
                                  updateSpec("nominalDiameter", e.target.value)
                                }
                                className="w-20 px-2 py-1 rounded border border-slate-300"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                required
                                value={spec.pressureRating}
                                onChange={(e) =>
                                  updateSpec("pressureRating", e.target.value)
                                }
                                className="w-20 px-2 py-1 rounded border border-slate-300"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                required
                                value={spec.wallThickness}
                                onChange={(e) =>
                                  updateSpec("wallThickness", e.target.value)
                                }
                                className="w-20 px-2 py-1 rounded border border-slate-300"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                required
                                value={spec.standardLength}
                                onChange={(e) =>
                                  updateSpec("standardLength", e.target.value)
                                }
                                className="w-24 px-2 py-1 rounded border border-slate-300"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                required
                                value={spec.standard}
                                onChange={(e) =>
                                  updateSpec("standard", e.target.value)
                                }
                                className="w-24 px-2 py-1 rounded border border-slate-300"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="number"
                                min={0}
                                value={spec.priceGuide}
                                placeholder="Liên hệ"
                                onChange={(e) =>
                                  updateSpec("priceGuide", e.target.value)
                                }
                                className="w-28 px-2 py-1 rounded border border-slate-300 font-semibold text-[#007A4D]"
                              />
                            </td>
                            <td className="p-2 text-right">
                              <button
                                type="button"
                                onClick={() => {
                                  setDraft({
                                    ...draft,
                                    specifications: draft.specifications.filter(
                                      (_, i) => i !== idx
                                    ),
                                  });
                                }}
                                aria-label="Xóa quy cách"
                                className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setDraft(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-sm font-medium text-slate-700 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#007A4D] hover:bg-[#00633e] disabled:opacity-60 text-white text-sm font-semibold cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {saving ? "Đang lưu..." : "Lưu sản phẩm"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
