import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabasePublicConfig, isAllowedAdminEmail } from "@/lib/supabase/config";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiAdmin = pathname.startsWith("/api/admin");
  const isLoginRoute = pathname === "/admin/login";

  const { url, anonKey } = getSupabasePublicConfig();
  if (!url || !anonKey) {
    if (isApiAdmin) {
      return NextResponse.json(
        { error: "Supabase environment variables are not configured." },
        { status: 500 }
      );
    }
    if (!isLoginRoute) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("error", "config_missing");
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthorizedAdmin = Boolean(user && isAllowedAdminEmail(user.email));

  if (isApiAdmin) {
    if (!user) {
      return NextResponse.json({ error: "Chưa đăng nhập phiên quản trị" }, { status: 401 });
    }
    if (!isAuthorizedAdmin) {
      return NextResponse.json(
        { error: "Tài khoản không có quyền quản trị hệ thống" },
        { status: 403 }
      );
    }
    return response;
  }

  if (isLoginRoute) {
    if (isAuthorizedAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return response;
  }

  if (!isAuthorizedAdmin) {
    const loginUrl = new URL("/admin/login", request.url);
    if (user && !isAllowedAdminEmail(user.email)) {
      loginUrl.searchParams.set("error", "forbidden");
    }
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
