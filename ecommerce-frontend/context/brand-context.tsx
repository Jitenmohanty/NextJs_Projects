"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { apiClient } from "@/lib/api"

export interface Brand {
  id: string
  label: string
  value: string
}

interface BrandContextType {
  brands: Brand[]
  loading: boolean
  error: string | null
}

const BrandContext = createContext<BrandContextType | undefined>(undefined)

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true)
        const response = await apiClient.get<{ brands: Brand[] }>("/brands")
        setBrands(response.brands || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch brands")
        setBrands([])
      } finally {
        setLoading(false)
      }
    }
    fetchBrands()
  }, [])

  return <BrandContext.Provider value={{ brands, loading, error }}>{children}</BrandContext.Provider>
}

export function useBrands() {
  const context = useContext(BrandContext)
  if (context === undefined) {
    throw new Error("useBrands must be used within a BrandProvider")
  }
  return context
}
