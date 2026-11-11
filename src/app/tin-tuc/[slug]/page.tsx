import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  ChevronRight,
  Clock,
  ArrowLeft,
  ArrowRight,
  Phone,
  FileSpreadsheet,
  ListTree,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { newsData } from "@/data/news";
import {
  getNewsArticleBySlug,
  getPublishedNewsArticles,
  isNewsContainImage,
} from "@/lib/news-repository";
import {
  NewsArticleRenderer,
  extractTableOfContents,
  estimateReadingMinutes,
} from "@/components/news/NewsArticleRenderer";

export const revalidate = 60;

interface NewsDetailProps {
  params: Promise<{ slug: string }>;
}

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return siteConfig.url;
}

export async function generateStaticParams() {
  return newsData.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: NewsDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);
  if (!article) {
    return {
      title: "Bài viết không tồn tại | Stroman",
    };
  }

  return {
    title: `${article.title} | Stroman Việt Nam`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      images: [{ url: article.image }],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([
    getNewsArticleBySlug(slug),
    getPublishedNewsArticles(),
  ]);

  if (!article) {
    notFound();
  }

  const toc = extractTableOfContents(article.content);
  const readingMinutes = estimateReadingMinutes(article.content);
  const isContain = isNewsContainImage(article.image);
  const baseUrl = getBaseUrl();

  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) =>
      a.category === article.category && b.category !== article.category ? -1 : 0
    )
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.summary,
        image: `${baseUrl}${article.image}`,
        author: {
          "@type": "Organization",
          name: siteConfig.distributorName,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.brandName,
        },
        mainEntityOfPage: `${baseUrl}/tin-tuc/${article.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Trang chủ",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tin tức & Kỹ thuật",
            item: `${baseUrl}/tin-tuc`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: `${baseUrl}/tin-tuc/${article.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-5 whitespace-nowrap overflow-x-auto no-scrollbar py-1">
          <Link
            href="/"
            className="hover:text-[#007A4D] inline-flex items-center min-h-[36px]"
          >
            Trang Chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link
            href="/tin-tuc"
            className="hover:text-[#007A4D] inline-flex items-center min-h-[36px]"
          >
            Tin Tức &amp; Kỹ Thuật
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-sm">
            {article.title}
          </span>
        </nav>

        {/* ARTICLE HEADER & CONTENT */}
        <article className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-10 pb-0 sm:pb-0">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#007A4D] border border-[#007A4D]/20">
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-[#007A4D]" />
                {article.date}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-[#007A4D]" />
                {readingMinutes} phút đọc
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#061B33] tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-medium bg-[#F6F9FB] p-4 sm:p-5 rounded-2xl border border-slate-200/70">
              {article.summary}
            </p>
          </div>

          {/* COVER IMAGE */}
          <div className="px-5 sm:px-10 pt-6">
            <div
              className={`relative rounded-2xl overflow-hidden border border-slate-200/80 ${
                isContain
                  ? "bg-white p-6 max-h-96 flex items-center justify-center"
                  : "aspect-[16/9] bg-slate-100"
              }`}
            >
              <img
                src={article.image}
                alt={article.title}
                className={
                  isContain
                    ? "max-h-80 w-auto object-contain"
                    : "w-full h-full object-cover"
                }
              />
            </div>
          </div>

          {/* TABLE OF CONTENTS + ARTICLE BODY */}
          <div className="p-5 sm:p-10 space-y-6">
            {toc.length > 0 && (
              <div className="rounded-2xl bg-[#F6F9FB] border border-slate-200 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#061B33] uppercase tracking-wider mb-3">
                  <ListTree className="w-4 h-4 text-[#007A4D]" />
                  <span>Nội dung chính trong bài</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm">
                  {toc.map((heading, i) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className="inline-flex items-start gap-2 text-slate-700 hover:text-[#007A4D] font-medium py-0.5 transition-colors"
                      >
                        <span className="text-[#007A4D] font-bold">{i + 1}.</span>
                        <span>{heading.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <NewsArticleRenderer content={article.content} />

            {/* IN-ARTICLE PROJECT QUOTE CTA */}
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#061B33] to-[#082B4A] p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#00C389] uppercase tracking-wider">
                  {siteConfig.distributorName}
                </div>
                <h3 className="text-lg sm:text-xl font-black">
                  Cần bóc tách vật tư &amp; nhận báo giá xuất xưởng?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Hỗ trợ tư vấn lựa chọn PN, đường kính DN và giao hàng nhanh tận chân công trình.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
                <Link
                  href="/du-toan-bao-gia"
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#007A4D] hover:bg-[#00613d] text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Tạo dự toán ngay</span>
                </Link>
                <a
                  href={`tel:${siteConfig.hotline.replace(/\s+/g, "")}`}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white text-[#061B33] hover:bg-slate-100 text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-[#007A4D]" />
                  <span>{siteConfig.hotline}</span>
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* BACK TO NEWS LIST */}
        <div className="mt-6">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 min-h-[42px] text-xs sm:text-sm font-bold text-[#082B4A] hover:text-[#007A4D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại danh sách Tin tức &amp; Dự án</span>
          </Link>
        </div>

        {/* RELATED ARTICLES */}
        {relatedArticles.length > 0 && (
          <section className="mt-10 pt-8 border-t border-slate-200">
            <h2 className="text-xl font-black text-[#061B33] mb-5">
              Bài viết liên quan hữu ích
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedArticles.map((rel) => {
                const relContain = isNewsContainImage(rel.image);
                return (
                  <Link
                    key={rel.id}
                    href={`/tin-tuc/${rel.slug}`}
                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div
                        className={`aspect-[16/9] overflow-hidden ${
                          relContain ? "bg-white p-3 border-b border-slate-100" : "bg-slate-100"
                        }`}
                      >
                        <img
                          src={rel.image}
                          alt={rel.title}
                          className={`w-full h-full group-hover:scale-105 transition-transform duration-300 ${
                            relContain ? "object-contain" : "object-cover"
                          }`}
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <span className="text-xs font-bold text-[#007A4D]">
                          {rel.category} &bull; {rel.date}
                        </span>
                        <h3 className="mt-1 text-sm font-bold text-[#102035] group-hover:text-[#007A4D] line-clamp-2 leading-snug">
                          {rel.title}
                        </h3>
                      </div>
                    </div>
                    <div className="px-4 pb-4 inline-flex items-center gap-1 text-xs font-bold text-[#007A4D]">
                      <span>Đọc tiếp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
