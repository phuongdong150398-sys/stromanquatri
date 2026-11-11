import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { upsertProductSchema } from "@/lib/admin-validations";
import {
  createAdminSupabaseClient,
  getAuthenticatedAdminUser,
} from "@/lib/supabase/admin";

const partialProductSchema = upsertProductSchema.partial();

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthenticatedAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = await request.json();
    const parsed = partialProductSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Dữ liệu cập nhật sản phẩm không hợp lệ.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const input = parsed.data;
    const updatePayload: Record<string, unknown> = {};

    if (input.slug !== undefined) updatePayload.slug = input.slug;
    if (input.name !== undefined) updatePayload.name = input.name;
    if (input.category !== undefined) updatePayload.category = input.category;
    if (input.categoryName !== undefined) updatePayload.category_name = input.categoryName;
    if (input.shortDesc !== undefined) updatePayload.short_desc = input.shortDesc;
    if (input.description !== undefined) updatePayload.description = input.description;
    if (input.image !== undefined) updatePayload.image = input.image;
    if (input.bannerBadge !== undefined) updatePayload.banner_badge = input.bannerBadge;
    if (input.features !== undefined) updatePayload.features = input.features;
    if (input.advantages !== undefined) updatePayload.advantages = input.advantages;
    if (input.applications !== undefined) updatePayload.applications = input.applications;
    if (input.standards !== undefined) updatePayload.standards = input.standards;
    if (input.isFeatured !== undefined) updatePayload.is_featured = input.isFeatured;
    if (input.isActive !== undefined) updatePayload.is_active = input.isActive;

    const supabase = createAdminSupabaseClient();

    if (Object.keys(updatePayload).length > 0) {
      const { error: prodError } = await supabase
        .from("products")
        .update(updatePayload)
        .eq("id", id);

      if (prodError) {
        return NextResponse.json({ error: prodError.message }, { status: 500 });
      }
    }

    if (input.specifications !== undefined) {
      const submittedCodes = input.specifications.map((s) => s.code);

      if (submittedCodes.length > 0) {
        const specRows = input.specifications.map((s, idx) => ({
          product_id: id,
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

      const { data: existingSpecs } = await supabase
        .from("product_specifications")
        .select("id, code")
        .eq("product_id", id);

      const idsToDelete = (existingSpecs || [])
        .filter((s) => !submittedCodes.includes(s.code))
        .map((s) => s.id);

      if (idsToDelete.length > 0) {
        await supabase.from("product_specifications").delete().in("id", idsToDelete);
      }
    }

    const { data: updatedProduct, error: fetchError } = await supabase
      .from("products")
      .select("*, product_specifications(*)")
      .eq("id", id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/san-pham");
    if (updatedProduct?.slug) {
      revalidatePath(`/san-pham/${updatedProduct.slug}`);
    }
    revalidatePath("/du-toan-bao-gia");

    return NextResponse.json({
      product: {
        ...updatedProduct,
        product_specifications: Array.isArray(updatedProduct?.product_specifications)
          ? [...updatedProduct.product_specifications].sort(
              (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
            )
          : [],
      },
    });
  } catch (err) {
    console.error("PATCH /api/admin/products/[id] error:", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi cập nhật sản phẩm." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthenticatedAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const supabase = createAdminSupabaseClient();

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/san-pham");
    revalidatePath("/du-toan-bao-gia");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/products/[id] error:", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi xóa sản phẩm." },
      { status: 500 }
    );
  }
}
