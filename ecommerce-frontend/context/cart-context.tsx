"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { apiClient } from "@/lib/api"
import { useAuth } from "./auth-context"

export interface CartItem {
  id: string
  product: {
    id: string
    title: string
    price: number
    thumbnail: string
  }
  quantity: number
  size?: string
  color?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (productId: string, quantity: number, size?: string, color?: string) => Promise<void>
  removeItem: (cartItemId: string) => Promise<void>
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  total: number
  loading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      const fetchCart = async () => {
        try {
          const response = await apiClient.get<{ items: CartItem[] }>("/cart")
          setItems(response.items || [])
        } catch (error) {
          console.error("Failed to fetch cart:", error)
        }
      }
      fetchCart()
    } else {
      setItems([])
    }
  }, [isAuthenticated])

  const addItem = async (productId: string, quantity: number, size?: string, color?: string) => {
    setLoading(true)
    try {
      const response = await apiClient.post<{ items: CartItem[] }>("/cart", {
        product: productId,
        quantity,
        size,
        color,
      })
      setItems(response.items || [])
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (cartItemId: string) => {
    setLoading(true)
    try {
      await apiClient.delete(`/cart/${cartItemId}`)
      setItems((prev) => prev.filter((item) => item.id !== cartItemId))
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(cartItemId)
      return
    }
    setLoading(true)
    try {
      const response = await apiClient.patch<{ items: CartItem[] }>(`/cart/${cartItemId}`, {
        quantity,
      })
      setItems(response.items || [])
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    setLoading(true)
    try {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
