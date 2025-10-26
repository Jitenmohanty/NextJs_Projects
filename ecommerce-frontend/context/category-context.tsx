"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { apiClient } from "@/lib/api"

export interface Category {
  id: string
  label: string
  value: string
}

interface CategoryContextType {
  categories: Category[]
  loading: boolean
  error: string | null
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await apiClient.get<{ categories: Category[] }>("/categories")
        setCategories(response.categories || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch categories")
        setCategories([])
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return <CategoryContext.Provider value={{ categories, loading, error }}>{children}</CategoryContext.Provider>
}

export function useCategories() {
  const context = useContext(CategoryContext)
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoryProvider")
  }
  return context
}
