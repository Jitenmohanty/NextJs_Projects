// TypeScript interfaces for type safety
export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  addresses?: Address[]
  orders?: string[]
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  discountPercentage: number
  discountPrice: number
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

export interface CartItem {
  id: string
  product: Product
  quantity: number
  size?: string
  color?: string
  user: string
}

export interface Order {
  id: string
  items: CartItem[]
  totalAmount: number
  totalItems: number
  user: string
  paymentMethod: "card" | "cash"
  paymentStatus: "pending" | "received"
  status: "pending" | "processing" | "shipped" | "delivered"
  selectedAddress: Address
  createdAt: string
}

export interface Address {
  id?: string
  name: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface Brand {
  id: string
  label: string
  value: string
}

export interface Category {
  id: string
  label: string
  value: string
}
