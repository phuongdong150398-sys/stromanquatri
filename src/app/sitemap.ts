import type { MetadataRoute } from "next";
import { productsData } from "@/data/products";
import { siteConfig } from "@/config/site";
import { getPublishedNewsArticles } from "@/lib/news-repository";

export const revalidate = 60;

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return siteConfig.url;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const articles = await getPublishedNewsArticles();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/san-pham",
    "/du-toan-bao-gia",
    "/he-thong-phan-phoi",
    "/ung-dung",
    "/chinh-sach-dai-ly",
    "/tin-tuc",
    "/lien-he",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/tin-tuc" ? "daily" : "weekly",
    priority: route === "" ? 1 : route === "/san-pham" || route === "/du-toan-bao-gia" ? 0.9 : 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = productsData.map((p) => ({
    url: `${baseUrl}/san-pham/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const newsRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/tin-tuc/${a.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...productRoutes, ...newsRoutes];
}
