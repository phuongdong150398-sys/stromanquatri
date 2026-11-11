import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { newsData, type NewsArticle } from "@/data/news";

export function parseVnDateTimestamp(dateStr?: string | null): number {
  if (!dateStr) return 0;
  const trimmed = dateStr.trim();
  const vnMatch = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmed);
  if (vnMatch) {
    const [, dd, mm, yyyy] = vnMatch;
    return Date.UTC(Number(yyyy), Number(mm) - 1, Number(dd));
  }
  const parsed = Date.parse(trimmed);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function sortNewsArticlesDesc(items: NewsArticle[]): NewsArticle[] {
  return [...items].sort(
    (a, b) => parseVnDateTimestamp(b.date) - parseVnDateTimestamp(a.date)
  );
}

export function isNewsContainImage(imagePath: string): boolean {
  return (
    imagePath.includes("/images/products/") ||
    imagePath.endsWith("he-thong-phan-phoi.png")
  );
}

function mapDbRowToNewsArticle(row: Record<string, unknown>): NewsArticle {
  return {
    id: String(row.id || ""),
    slug: String(row.slug || ""),
    title: String(row.title || ""),
    summary: String(row.summary || ""),
    category: (row.category as NewsArticle["category"]) || "Kỹ Thuật",
    date: String(row.published_date || ""),
    image: String(row.image || "/images/hero-banner.png"),
    content: Array.isArray(row.content)
      ? row.content.map((p) => String(p))
      : [],
  };
}

export async function getPublishedNewsArticles(): Promise<NewsArticle[]> {
  try {
    const { url, anonKey } = getSupabasePublicConfig();
    if (!url || !anonKey) {
      return sortNewsArticlesDesc(newsData);
    }

    const supabase = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await supabase
      .from("news_articles")
      .select("id, slug, title, summary, category, published_date, image, content")
      .eq("is_published", true);

    if (error || !data || data.length === 0) {
      return sortNewsArticlesDesc(newsData);
    }

    const mapped = data.map((row) =>
      mapDbRowToNewsArticle(row as Record<string, unknown>)
    );
    return sortNewsArticlesDesc(mapped);
  } catch {
    return sortNewsArticlesDesc(newsData);
  }
}

export async function getNewsArticleBySlug(
  slug: string
): Promise<NewsArticle | null> {
  const articles = await getPublishedNewsArticles();
  return articles.find((a) => a.slug === slug) || null;
}
