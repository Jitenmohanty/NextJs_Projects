export interface Order {
  id: string
  userId: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  shippingAddress: {
    fullName: string
    email: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod: string
  createdAt: Date
}
