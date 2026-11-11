import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  createAdminSupabaseClient,
  getAuthenticatedAdminUser,
  isSchemaMissingError,
} from "@/lib/supabase/admin";
import { productsData } from "@/data/products";
import { newsData } from "@/data/news";
import { dealersData } from "@/data/dealers";
import { siteConfig } from "@/config/site";

export async function POST() {
  const admin = await getAuthenticatedAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createAdminSupabaseClient();

    // 1. Seed products
    const productRows = productsData.map((p, index) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category: p.category,
      category_name: p.categoryName,
      short_desc: p.shortDesc,
      description: p.description,
      image: p.image,
      banner_badge: p.bannerBadge || "",
      features: p.features,
      advantages: p.advantages,
      applications: p.applications,
      standards: p.standards,
      is_featured: Boolean(p.isFeatured),
      is_active: true,
      sort_order: index,
    }));

    const { error: prodError } = await supabase
      .from("products")
      .upsert(productRows, { onConflict: "id" });

    if (prodError) {
      if (isSchemaMissingError(prodError)) {
        return NextResponse.json(
          { error: "Bảng dữ liệu chưa tồn tại. Vui lòng chạy file SQL Migration trước." },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: prodError.message }, { status: 500 });
    }

    // 2. Seed specifications
    const specRows = productsData.flatMap((p) =>
      p.specifications.map((s, idx) => ({
        product_id: p.id,
        code: s.code,
        nominal_diameter: s.nominalDiameter,
        pressure_rating: s.pressureRating,
        wall_thickness: s.wallThickness,
        standard_length: s.standardLength,
        standard: s.standard,
        price_guide: s.priceGuide ?? null,
        sort_order: idx,
      }))
    );

    if (specRows.length > 0) {
      const { error: specError } = await supabase
        .from("product_specifications")
        .upsert(specRows, { onConflict: "product_id,code" });
      if (specError) {
        return NextResponse.json({ error: specError.message }, { status: 500 });
      }
    }

    // 3. Seed news
    const newsRows = newsData.map((n) => ({
      id: n.id,
      slug: n.slug,
      title: n.title,
      summary: n.summary,
      category: n.category,
      published_date: n.date,
      image: n.image,
      content: n.content,
      is_published: true,
    }));

    const { error: newsError } = await supabase
      .from("news_articles")
      .upsert(newsRows, { onConflict: "id" });
    if (newsError) {
      return NextResponse.json({ error: newsError.message }, { status: 500 });
    }

    // 4. Seed dealers
    const dealerRows = dealersData.map((d) => ({
      id: d.id,
      name: d.name,
      type: d.type,
      type_name: d.typeName,
      region: d.region,
      province: d.province,
      address: d.address,
      phone: d.phone,
      email: d.email || "",
      google_map_url: d.googleMapUrl || "",
      is_featured: Boolean(d.isFeatured),
      is_active: true,
    }));

    const { error: dealerError } = await supabase
      .from("dealers")
      .upsert(dealerRows, { onConflict: "id" });
    if (dealerError) {
      return NextResponse.json({ error: dealerError.message }, { status: 500 });
    }

    // 5. Seed site settings
    const { error: settingsError } = await supabase
      .from("site_settings")
      .upsert(
        {
          key: "default",
          brand_name: siteConfig.brandName,
          distributor_name: siteConfig.distributorName,
          tagline: siteConfig.tagline,
          slogan: siteConfig.slogan,
          description: siteConfig.description,
          hotline: siteConfig.hotline,
          zalo: siteConfig.zalo,
          email: siteConfig.email,
          main_warehouse: siteConfig.addresses.mainWarehouse,
          north_factory: siteConfig.addresses.northFactory,
          south_factory: siteConfig.addresses.southFactory,
          zalo_url: siteConfig.socials.zaloUrl,
        },
        { onConflict: "key" }
      );

    if (settingsError) {
      return NextResponse.json({ error: settingsError.message }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/san-pham");
    revalidatePath("/tin-tuc");
    revalidatePath("/he-thong-phan-phoi");

    return NextResponse.json({
      success: true,
      seeded: {
        products: productRows.length,
        specifications: specRows.length,
        news: newsRows.length,
        dealers: dealerRows.length,
      },
    });
  } catch (err) {
    console.error("POST /api/admin/seed error:", err);
    return NextResponse.json({ error: "Lỗi máy chủ khi seed dữ liệu." }, { status: 500 });
  }
}
