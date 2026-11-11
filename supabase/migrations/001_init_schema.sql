-- ============================================================================
-- STROMAN QUANG TRI - SUPABASE POSTGRESQL SCHEMA & RLS MIGRATION (001)
-- Paste & run this script in Supabase Dashboard -> SQL Editor -> Run
-- ============================================================================

-- 1. Trigger helper to automatically maintain updated_at timestamps
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 2. QUOTE REQUESTS & ITEMS (Smart Quote Builder Leads)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_code TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT DEFAULT '',
  province TEXT NOT NULL,
  company_or_project TEXT DEFAULT '',
  role TEXT NOT NULL CHECK (role IN ('contractor', 'dealer', 'consultant', 'individual')),
  delivery_address TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'quoting', 'sent', 'won', 'cancelled')),
  discount_percent NUMERIC(5, 2) NOT NULL DEFAULT 0 CHECK (discount_percent >= 0 AND discount_percent <= 100),
  admin_notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON public.quote_requests (status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON public.quote_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_phone ON public.quote_requests (phone);

DROP TRIGGER IF EXISTS trg_quote_requests_updated_at ON public.quote_requests;
CREATE TRIGGER trg_quote_requests_updated_at
  BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.quote_items (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  quote_request_id UUID NOT NULL REFERENCES public.quote_requests(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  category TEXT NOT NULL,
  specification_code TEXT NOT NULL,
  nominal_diameter TEXT NOT NULL,
  pressure_rating TEXT NOT NULL,
  wall_thickness TEXT NOT NULL,
  quantity NUMERIC(12, 2) NOT NULL CHECK (quantity > 0),
  unit TEXT NOT NULL,
  unit_price_guide NUMERIC(12, 2),
  note TEXT DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_quote_items_request_id ON public.quote_items (quote_request_id);

-- ============================================================================
-- 3. DEALER APPLICATIONS & CONTACT MESSAGES
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.dealer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  province TEXT NOT NULL,
  district TEXT NOT NULL,
  current_business TEXT NOT NULL,
  estimated_monthly_volume TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'approved', 'rejected')),
  admin_notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_dealer_applications_status ON public.dealer_applications (status);
CREATE INDEX IF NOT EXISTS idx_dealer_applications_created_at ON public.dealer_applications (created_at DESC);

DROP TRIGGER IF EXISTS trg_dealer_applications_updated_at ON public.dealer_applications;
CREATE TRIGGER trg_dealer_applications_updated_at
  BEFORE UPDATE ON public.dealer_applications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT DEFAULT '',
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'replied', 'archived')),
  admin_notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages (status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages (created_at DESC);

DROP TRIGGER IF EXISTS trg_contact_messages_updated_at ON public.contact_messages;
CREATE TRIGGER trg_contact_messages_updated_at
  BEFORE UPDATE ON public.contact_messages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 4. CATALOG PRODUCTS & SPECIFICATIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('upvc', 'ppr', 'ppr-antibacterial', 'hdpe', 'fittings')),
  category_name TEXT NOT NULL,
  short_desc TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  banner_badge TEXT DEFAULT '',
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  advantages JSONB NOT NULL DEFAULT '[]'::jsonb,
  applications JSONB NOT NULL DEFAULT '[]'::jsonb,
  standards JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products (is_active);

DROP TRIGGER IF EXISTS trg_products_updated_at ON public.products;
CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.product_specifications (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  nominal_diameter TEXT NOT NULL,
  pressure_rating TEXT NOT NULL,
  wall_thickness TEXT NOT NULL,
  standard_length TEXT NOT NULL,
  standard TEXT NOT NULL,
  price_guide NUMERIC(12, 2),
  sort_order INTEGER NOT NULL DEFAULT 0,
  UNIQUE (product_id, code)
);

CREATE INDEX IF NOT EXISTS idx_product_specs_product_id ON public.product_specifications (product_id);

-- ============================================================================
-- 5. CMS CONTENT: NEWS, DEALER NETWORK & SITE SETTINGS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.news_articles (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Dự Án', 'Kỹ Thuật', 'Sự Kiện', 'Chính Sách')),
  published_date TEXT NOT NULL,
  image TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_news_published ON public.news_articles (is_published);

DROP TRIGGER IF EXISTS trg_news_articles_updated_at ON public.news_articles;
CREATE TRIGGER trg_news_articles_updated_at
  BEFORE UPDATE ON public.news_articles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.dealers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('headquarter', 'factory', 'warehouse', 'distributor')),
  type_name TEXT NOT NULL,
  region TEXT NOT NULL CHECK (region IN ('Bắc', 'Trung', 'Nam')),
  province TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT DEFAULT '',
  google_map_url TEXT DEFAULT '',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_dealers_region ON public.dealers (region);

DROP TRIGGER IF EXISTS trg_dealers_updated_at ON public.dealers;
CREATE TRIGGER trg_dealers_updated_at
  BEFORE UPDATE ON public.dealers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  brand_name TEXT NOT NULL,
  distributor_name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  hotline TEXT NOT NULL,
  zalo TEXT NOT NULL,
  email TEXT NOT NULL,
  main_warehouse TEXT NOT NULL,
  north_factory TEXT NOT NULL,
  south_factory TEXT NOT NULL,
  zalo_url TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trg_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER trg_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public read-only access for active public storefront content
DROP POLICY IF EXISTS "Public read active products" ON public.products;
CREATE POLICY "Public read active products"
  ON public.products FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public read product specifications" ON public.product_specifications;
CREATE POLICY "Public read product specifications"
  ON public.product_specifications FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read published news" ON public.news_articles;
CREATE POLICY "Public read published news"
  ON public.news_articles FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public read active dealers" ON public.dealers;
CREATE POLICY "Public read active dealers"
  ON public.dealers FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public read site settings" ON public.site_settings;
CREATE POLICY "Public read site settings"
  ON public.site_settings FOR SELECT USING (true);

-- Note: quote_requests, quote_items, dealer_applications, contact_messages have NO anon SELECT/UPDATE/DELETE policies.
-- All writes & admin operations happen strictly through Next.js Server Route Handlers validated by Zod + Admin Session.
