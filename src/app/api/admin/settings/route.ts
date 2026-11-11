import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { siteConfig } from "@/config/site";
import { siteSettingsSchema } from "@/lib/admin-validations";
import {
  createAdminSupabaseClient,
  getAuthenticatedAdminUser,
  isSchemaMissingError,
} from "@/lib/supabase/admin";

function getFallbackSettings() {
  return {
    brandName: siteConfig.brandName,
    distributorName: siteConfig.distributorName,
    tagline: siteConfig.tagline,
    slogan: siteConfig.slogan,
    description: siteConfig.description,
    hotline: siteConfig.hotline,
    zalo: siteConfig.zalo,
    email: siteConfig.email,
    mainWarehouse: siteConfig.addresses.mainWarehouse,
    northFactory: siteConfig.addresses.northFactory,
    southFactory: siteConfig.addresses.southFactory,
    zaloUrl: siteConfig.socials.zaloUrl,
  };
}

export async function GET() {
  const admin = await getAuthenticatedAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("key", "default")
      .maybeSingle();

    if (error) {
      if (isSchemaMissingError(error)) {
        return NextResponse.json({
          settings: getFallbackSettings(),
          schemaMissing: true,
        });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({
        settings: getFallbackSettings(),
        schemaMissing: false,
        isDefaultFallback: true,
      });
    }

    return NextResponse.json({
      settings: {
        brandName: data.brand_name,
        distributorName: data.distributor_name,
        tagline: data.tagline,
        slogan: data.slogan,
        description: data.description,
        hotline: data.hotline,
        zalo: data.zalo,
        email: data.email,
        mainWarehouse: data.main_warehouse,
        northFactory: data.north_factory,
        southFactory: data.south_factory,
        zaloUrl: data.zalo_url,
      },
      schemaMissing: false,
      isDefaultFallback: false,
    });
  } catch (err) {
    console.error("GET /api/admin/settings error:", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi tải cấu hình website." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const admin = await getAuthenticatedAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = siteSettingsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Thông tin cấu hình không hợp lệ.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const s = parsed.data;
    const supabase = createAdminSupabaseClient();

    const { error } = await supabase.from("site_settings").upsert(
      {
        key: "default",
        brand_name: s.brandName,
        distributor_name: s.distributorName,
        tagline: s.tagline,
        slogan: s.slogan,
        description: s.description,
        hotline: s.hotline,
        zalo: s.zalo,
        email: s.email,
        main_warehouse: s.mainWarehouse,
        north_factory: s.northFactory,
        south_factory: s.southFactory,
        zalo_url: s.zaloUrl,
      },
      { onConflict: "key" }
    );

    if (error) {
      if (isSchemaMissingError(error)) {
        return NextResponse.json(
          { error: "Bảng site_settings chưa tồn tại. Vui lòng chạy SQL Migration trước." },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidatePath("/", "layout");

    return NextResponse.json({ settings: s, success: true });
  } catch (err) {
    console.error("PATCH /api/admin/settings error:", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi lưu cấu hình website." },
      { status: 500 }
    );
  }
}
