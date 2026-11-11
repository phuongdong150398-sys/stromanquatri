import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { upsertProductSchema } from "@/lib/admin-validations";
import {
  createAdminSupabaseClient,
  getAuthenticatedAdminUser,
  isSchemaMissingError,
} from "@/lib/supabase/admin";

export async function GET() {
  const admin = await getAuthenticatedAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, product_specifications(*)")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      if (isSchemaMissingError(error)) {
        return NextResponse.json({ products: [], schemaMissing: true });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const products = (data || []).map((item) => ({
      ...item,
      product_specifications: Array.isArray(item.product_specifications)
        ? [...item.product_specifications].sort(
            (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
          )
        : [],
    }));

    return NextResponse.json({ products, schemaMissing: false });
  } catch (err) {
    console.error("GET /api/admin/products error:", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi tải danh sách sản phẩm." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const admin = await getAuthenticatedAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = upsertProductSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Dữ liệu sản phẩm không hợp lệ.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const input = parsed.data;
    const supabase = createAdminSupabaseClient();

    const productRow = {
      id: input.id,
      slug: input.slug,
      name: input.name,
      category: input.category,
      category_name: input.categoryName,
      short_desc: input.shortDesc,
      description: input.description,
      image: input.image,
      banner_badge: input.bannerBadge || "",
      features: input.features,
      advantages: input.advantages,
      applications: input.applications,
      standards: input.standards,
      is_featured: input.isFeatured,
      is_active: input.isActive,
    };

    const { error: prodError } = await supabase
      .from("products")
      .upsert(productRow, { onConflict: "id" });

    if (prodError) {
      if (isSchemaMissingError(prodError)) {
        return NextResponse.json(
          { error: "Bảng dữ liệu chưa tồn tại. Vui lòng chạy SQL Migration trước." },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: prodError.message }, { status: 500 });
    }

    const submittedCodes = input.specifications.map((s) => s.code);
    if (submittedCodes.length > 0) {
      const specRows = input.specifications.map((s, idx) => ({
        product_id: input.id,
        code: s.code,
        nominal_diameter: s.nominalDiameter,
        pressure_rating: s.pressureRating,
        wall_thickness: s.wallThickness,
        standard_length: s.standardLength,
        standard: s.standard,
        price_guide: s.priceGuide ?? null,
        sort_order: idx,
      }));

      const { error: specError } = await supabase
        .from("product_specifications")
        .upsert(specRows, { onConflict: "product_id,code" });

      if (specError) {
        return NextResponse.json({ error: specError.message }, { status: 500 });
      }
    }

    // Remove obsolete specs that are no longer in the submitted list
    const { data: existingSpecs } = await supabase
      .from("product_specifications")
      .select("id, code")
      .eq("product_id", input.id);

    const codesToDelete = (existingSpecs || [])
      .filter((s) => !submittedCodes.includes(s.code))
      .map((s) => s.id);

    if (codesToDelete.length > 0) {
      await supabase.from("product_specifications").delete().in("id", codesToDelete);
    }

    const { data: savedProduct, error: fetchError } = await supabase
      .from("products")
      .select("*, product_specifications(*)")
      .eq("id", input.id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/san-pham");
    revalidatePath(`/san-pham/${input.slug}`);
    revalidatePath("/du-toan-bao-gia");

    return NextResponse.json({ product: savedProduct }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/products error:", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi lưu sản phẩm." },
      { status: 500 }
    );
  }
}
