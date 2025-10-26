"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { apiClient } from "@/lib/api"
import { useAuth } from "./auth-context"

export interface OrderItem {
  id: string
  product: {
    id: string
    title: string
    price: number
  }
  quantity: number
  size?: string
  color?: string
}

export interface UserOrder {
  id: string
  items: OrderItem[]
  totalAmount: number
  totalItems: number
  status: "pending" | "processing" | "shipped" | "delivered"
  selectedAddress: {
    name: string
    email: string
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  createdAt: string
  estimatedDelivery?: string
}

interface OrdersContextType {
  orders: UserOrder[]
  addOrder: (orderData: any) => Promise<UserOrder>
  getOrderById: (id: string) => Promise<UserOrder | undefined>
  loading: boolean
  error: string | null
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<UserOrder[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      const fetchOrders = async () => {
        try {
          setLoading(true)
          const response = await apiClient.get<{ orders: UserOrder[] }>("/orders/own")
          setOrders(response.orders || [])
          setError(null)
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to fetch orders")
        } finally {
          setLoading(false)
        }
      }
      fetchOrders()
    } else {
      setOrders([])
    }
  }, [isAuthenticated])

  const addOrder = async (orderData: any): Promise<UserOrder> => {
    setLoading(true)
    try {
      const response = await apiClient.post<UserOrder>("/orders", orderData)
      setOrders((prev) => [...prev, response])
      setError(null)
      return response
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to create order"
      setError(errorMsg)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getOrderById = async (id: string): Promise<UserOrder | undefined> => {
    try {
      const response = await apiClient.get<UserOrder>(`/orders/${id}`)
      return response
    } catch (err) {
      console.error("Failed to fetch order:", err)
      return undefined
    }
  }

  return (
    <OrdersContext.Provider value={{ orders, addOrder, getOrderById, loading, error }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider")
  }
  return context
}
