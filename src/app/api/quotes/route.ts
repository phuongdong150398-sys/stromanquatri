import { NextResponse } from "next/server";
import { createQuotePayloadSchema } from "@/lib/admin-validations";
import { createAdminSupabaseClient, isSchemaMissingError } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createQuotePayloadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Dữ liệu không hợp lệ",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { customer, items } = parsed.data;
    const supabase = createAdminSupabaseClient();
    const quoteCode = `STR-Q-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const { data: quoteRow, error: insertQuoteError } = await supabase
      .from("quote_requests")
      .insert({
        quote_code: quoteCode,
        full_name: customer.fullName,
        phone: customer.phone,
        email: customer.email || "",
        province: customer.province,
        company_or_project: customer.companyOrProject || "",
        role: customer.role,
        delivery_address: customer.deliveryAddress || "",
        notes: customer.notes || "",
        status: "new",
      })
      .select("id, quote_code, created_at")
      .single();

    if (insertQuoteError || !quoteRow) {
      if (isSchemaMissingError(insertQuoteError)) {
        return NextResponse.json(
          { error: "Bảng cơ sở dữ liệu chưa được khởi tạo trên Supabase." },
          { status: 503 }
        );
      }
      return NextResponse.json(
        { error: insertQuoteError?.message || "Không thể lưu đơn dự toán." },
        { status: 500 }
      );
    }

    const itemRows = items.map((item) => ({
      quote_request_id: quoteRow.id,
      product_id: item.productId,
      product_name: item.productName,
      product_slug: item.productSlug,
      category: item.category,
      specification_code: item.specificationCode,
      nominal_diameter: item.nominalDiameter,
      pressure_rating: item.pressureRating,
      wall_thickness: item.wallThickness,
      quantity: item.quantity,
      unit: item.unit,
      note: item.note || "",
    }));

    const { error: itemsError } = await supabase.from("quote_items").insert(itemRows);
    if (itemsError) {
      // Clean up orphan header record on item insertion failure
      await supabase.from("quote_requests").delete().eq("id", quoteRow.id);
      return NextResponse.json(
        { error: itemsError.message || "Không thể lưu danh sách vật tư." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        quoteCode: quoteRow.quote_code,
        id: quoteRow.id,
        createdAt: quoteRow.created_at,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/quotes error:", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi xử lý yêu cầu báo giá." },
      { status: 500 }
    );
  }
}
