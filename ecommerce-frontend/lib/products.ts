import { apiClient } from "./api"

export interface Product {
  id: string
  title: string
  description: string
  price: number
  discountPercentage?: number
  discountPrice?: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
  colors?: string[]
  sizes?: string[]
  highlights?: string[]
}

export async function fetchProducts(filters?: {
  category?: string
  brand?: string
  search?: string
}): Promise<Product[]> {
  try {
    const params = new URLSearchParams()
    if (filters?.category) params.append("category", filters.category)
    if (filters?.brand) params.append("brand", filters.brand)
    if (filters?.search) params.append("search", filters.search)

    const queryString = params.toString()
    const endpoint = `/products${queryString ? `?${queryString}` : ""}`

    console.log("[v0] Fetching products from:", endpoint)

    const response = await apiClient.get<{ products: Product[] }>(endpoint)
    console.log("[v0] Products response:", response)

    return response.products || []
  } catch (error) {
    console.error("[v0] Failed to fetch products:", error instanceof Error ? error.message : error)
    console.error("[v0] Full error:", error)
    return []
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const response = await apiClient.get<Product>(`/products/${id}`)
    return response
  } catch (error) {
    console.error("Failed to fetch product:", error)
    return null
  }
}

export const products: Product[] = []
