import type { Metadata } from "next";
import { Roboto, Lato } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { QuoteProvider } from "@/context/QuoteContext";
import { siteConfig } from "@/config/site";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-roboto",
});

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brandName} - ${siteConfig.distributorName}`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.description,
  keywords: [
    "Ống nhựa Stroman",
    "Ống uPVC Stroman",
    "Ống PPR Stroman",
    "Ống PPR Kháng Khuẩn",
    "Ống HDPE PE100",
    "Báo giá ống nhựa Stroman",
    "Đại lý ống nhựa Stroman",
    "Tân Á Đại Thành",
    "Bảng giá ống nhựa 2026",
  ],
  authors: [{ name: siteConfig.distributorName }],
  creator: siteConfig.distributorName,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteConfig.url,
    title: `${siteConfig.brandName} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.brandName,
    images: [
      {
        url: "https://stroman.vn/Upload/banner/20261453-145336-banner-web-strm-(1).jpg",
        width: 1200,
        height: 630,
        alt: "Ống nhựa Stroman - Công nghệ Đức",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brandName} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["https://stroman.vn/Upload/banner/20261453-145336-banner-web-strm-(1).jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brandName,
    alternateName: siteConfig.distributorName,
    url: siteConfig.url,
    logo: "https://stroman.vn/images/logo-meta.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+84-915-333-808",
      contactType: "sales and customer service",
      areaServed: "VN",
      availableLanguage: "Vietnamese",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addresses.mainWarehouse,
      addressLocality: "Quảng Trị",
      addressCountry: "VN",
    },
  };

  return (
    <html lang="vi" suppressHydrationWarning className={`scroll-smooth ${roboto.variable} ${lato.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col antialiased font-sans">
        <QuoteProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContact />
        </QuoteProvider>
      </body>
    </html>
  );
}
