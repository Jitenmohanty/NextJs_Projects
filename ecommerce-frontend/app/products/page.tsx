"use client"

import { useState, useEffect } from "react"
import { fetchProducts } from "@/lib/products"
import { useCategories } from "@/context/category-context"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { categories } = useCategories()

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        console.log("[v0] Loading products with category:", selectedCategory)
        const data = await fetchProducts(selectedCategory ? { category: selectedCategory } : undefined)
        console.log("[v0] Products loaded:", data)
        setProducts(data)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to load products"
        console.error("[v0] Error loading products:", errorMessage)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container-custom py-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Our Products</h1>
          <p className="text-text-light">Browse our collection of premium items</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-background-dark p-4 rounded-lg">
              <h3 className="font-semibold text-primary mb-4">Categories</h3>
              <div className="space-y-2">
                <Button
                  variant={selectedCategory === null ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Products
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.value ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">Error: {error}</p>
                <p className="text-red-600 text-sm mt-2">
                  Backend URL:{" "}
                  {process.env.NEXT_PUBLIC_API_URL ||
                    "https://ecommerce-app-full-satck-jitenmohantys-projects.vercel.app"}
                </p>
              </div>
            )}

            {loading ? (
              <div className="text-center py-12">
                <p className="text-text-light">Loading products...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {products.length === 0 && !error && (
                  <div className="text-center py-12">
                    <p className="text-text-light">No products found in this category</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
