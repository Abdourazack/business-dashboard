export interface Product {
  ean: string
  productId: string
  title: string
  author: string
  publisher: string
  status: string
  price: number
  currency: string
  stock: number
  lastModified: string

  productDetails: Record<string, string | number>

  pricing: Record<string, string | number>[]

  classification: Record<string, string>[]

  availability: Record<string, string | number>[]

  metadata: Record<string, string | number>
}