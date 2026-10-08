export type ProductStatus = "AVAILABLE" | "LOW_STOCK" | "OUT_OF_STOCK";

export interface Product {
  ean: string;
  productId: string;
  title: string;
  author: string;
  publisher: string;
  status: ProductStatus;
  price: number;
  currency: string;
  stock: number;
  lastModified: string;
  productDetails: Record<string, string | number>;
  pricing: Record<string, string | number>[];
  classification: Record<string, string>[];
  availability: Record<string, string | number>[];
  metadata: Record<string, string | number>;
}