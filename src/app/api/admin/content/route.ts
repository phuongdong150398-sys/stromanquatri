import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { upsertDealerSchema, upsertNewsSchema } from "@/lib/admin-validations";
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

    const [newsRes, dealersRes] = await Promise.all([
      supabase
        .from("news_articles")
        .select("*")
        .order("published_date", { ascending: false })
        .order("created_at", { ascending: false }),
      supabase
        .from("dealers")
        .select("*")
        .order("region", { ascending: true })
        .order("name", { ascending: true }),
    ]);

    if (newsRes.error || dealersRes.error) {
      const err = newsRes.error || dealersRes.error;
      if (isSchemaMissingError(err)) {
        return NextResponse.json({ news: [], dealers: [], schemaMissing: true });
      }
      return NextResponse.json(
        { error: err?.message || "Lỗi tải dữ liệu nội dung." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      news: newsRes.data || [],
      dealers: dealersRes.data || [],
      schemaMissing: false,
    });
  } catch (err) {
    console.error("GET /api/admin/content error:", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi tải nội dung." },
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
    const { entity, data } = body || {};
    const supabase = createAdminSupabaseClient();

    if (entity === "news") {
      const parsed = upsertNewsSchema.safeParse(data);
      if (!parsed.success) {
        return NextResponse.json(
          {
            error: "Dữ liệu bài viết không hợp lệ.",
            details: parsed.error.flatten().fieldErrors,
          },
          { status: 400 }
        );
      }

      const item = parsed.data;
      const { data: saved, error } = await supabase
        .from("news_articles")
        .upsert(
          {
            id: item.id,
            slug: item.slug,
            title: item.title,
            summary: item.summary,
            category: item.category,
            published_date: item.date,
            image: item.image,
            content: item.content,
            is_published: item.isPublished,
          },
          { onConflict: "id" }
        )
        .select("*")
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      revalidatePath("/");
      revalidatePath("/tin-tuc");
      revalidatePath(`/tin-tuc/${item.slug}`);

      return NextResponse.json({ item: saved }, { status: 201 });
    }

    if (entity === "dealer") {
      const parsed = upsertDealerSchema.safeParse(data);
      if (!parsed.success) {
        return NextResponse.json(
          {
            error: "Dữ liệu điểm phân phối không hợp lệ.",
            details: parsed.error.flatten().fieldErrors,
          },
          { status: 400 }
        );
      }

      const item = parsed.data;
      const { data: saved, error } = await supabase
        .from("dealers")
        .upsert(
          {
            id: item.id,
            name: item.name,
            type: item.type,
            type_name: item.typeName,
            region: item.region,
            province: item.province,
            address: item.address,
            phone: item.phone,
            email: item.email || "",
            is_featured: item.isFeatured,
            is_active: item.isActive,
          },
          { onConflict: "id" }
        )
        .select("*")
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      revalidatePath("/");
      revalidatePath("/he-thong-phan-phoi");

      return NextResponse.json({ item: saved }, { status: 201 });
    }

    return NextResponse.json({ error: "Entity không hợp lệ." }, { status: 400 });
  } catch (err) {
    console.error("POST /api/admin/content error:", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi lưu nội dung." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const admin = await getAuthenticatedAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    let entity = url.searchParams.get("entity");
    let id = url.searchParams.get("id");

    if (!entity || !id) {
      try {
        const body = await request.json();
        entity = entity || body?.entity;
        id = id || body?.id;
      } catch {
        // Ignore empty body
      }
    }

    if (!id || (entity !== "news" && entity !== "dealer")) {
      return NextResponse.json(
        { error: "Thiếu entity hoặc id cần xóa." },
        { status: 400 }
      );
    }

    const table = entity === "news" ? "news_articles" : "dealers";
    const supabase = createAdminSupabaseClient();

    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/tin-tuc");
    revalidatePath("/he-thong-phan-phoi");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/content error:", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi xóa nội dung." },
      { status: 500 }
    );
  }
}
