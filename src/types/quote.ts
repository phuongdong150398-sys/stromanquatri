export interface QuoteItem {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  category: string;
  specificationCode: string;
  nominalDiameter: string;
  pressureRating: string;
  wallThickness: string;
  quantity: number;
  unit: string; // "Cây (4m)", "Cây (6m)", "Mét", "Cái"
  note?: string;
}

export interface QuoteRequestFormValues {
  fullName: string;
  phone: string;
  email?: string;
  province: string;
  companyOrProject?: string;
  role: 'contractor' | 'dealer' | 'consultant' | 'individual';
  deliveryAddress?: string;
  notes?: string;
}

export interface Dealer {
  id: string;
  name: string;
  type: 'headquarter' | 'factory' | 'warehouse' | 'distributor';
  typeName: string;
  region: 'Bắc' | 'Trung' | 'Nam';
  province: string;
  address: string;
  phone: string;
  email?: string;
  googleMapUrl?: string;
  isFeatured?: boolean;
}
