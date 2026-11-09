export type ProductCategory = 'upvc' | 'ppr' | 'ppr-antibacterial' | 'hdpe' | 'fittings';

export interface ProductSpecification {
  code: string;
  nominalDiameter: string;     // VD: Ø20, Ø25, Ø110, Ø315...
  pressureRating: string;      // VD: PN6, PN8, PN10, PN16, PN20, PN25, Class 0..3
  wallThickness: string;       // VD: 2.0 mm, 3.2 mm, 10.0 mm
  standardLength: string;      // 4m / cây, 6m / cây, Cuộn 50m/100m
  standard: string;            // TCVN 8491, ISO 1452, DIN 8077/8078, ISO 4427
  priceGuide?: number;         // Giá niêm yết tham khảo (VNĐ)
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  shortDesc: string;
  description: string;
  image: string;
  gallery?: string[];
  bannerBadge?: string;
  features: string[];
  advantages: string[];
  applications: string[];
  standards: string[];
  specifications: ProductSpecification[];
  catalogueUrl?: string;
  isFeatured?: boolean;
}

export interface CategoryMeta {
  id: ProductCategory;
  name: string;
  tagline: string;
  description: string;
  image: string;
  featuredCount: number;
}
