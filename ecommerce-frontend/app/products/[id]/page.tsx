"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { fetchProductById, fetchProducts } from "@/lib/products"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const { id } = React.use(params)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const productData = await fetchProductById(id)
        setProduct(productData)

        if (productData) {
          const allProducts = await fetchProducts({ category: productData.category })
          setRelatedProducts(allProducts.filter((p) => p.id !== id).slice(0, 3))
        }
      } catch (error) {
        console.error("Failed to load product:", error)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-text-light">Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Product not found</h1>
          <Link href="/products">
            <Button className="bg-primary text-white hover:bg-primary-light">Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = async () => {
    try {
      await addItem(product.id, quantity)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (error) {
      console.error("Failed to add to cart:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container-custom py-4">
          <Link href="/products" className="text-accent hover:text-accent-light">
            Products
          </Link>
          <span className="text-text-light mx-2">/</span>
          <span className="text-primary font-medium">{product.title}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="flex items-center justify-center bg-background-dark rounded-lg overflow-hidden h-96">
            <img
              src={product.thumbnail || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-primary mb-2">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-lg font-semibold text-primary">{product.rating}</span>
                  <span className="text-text-light">⭐</span>
                </div>
                <span className={`text-sm font-medium ${product.stock > 0 ? "text-success" : "text-error"}`}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            <p className="text-text-light mb-6 leading-relaxed">{product.description}</p>

            <div className="mb-8">
              <span className="text-4xl font-bold text-accent">${product.price.toFixed(2)}</span>
            </div>

            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium">Quantity:</label>
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-text-light hover:bg-background-dark"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-text-light hover:bg-background-dark"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-primary text-white hover:bg-primary-light py-6 text-lg"
                >
                  {added ? "Added to Cart!" : "Add to Cart"}
                </Button>
              </div>
            )}

            {product.stock <= 0 && (
              <Button disabled className="w-full py-6 text-lg">
                Out of Stock
              </Button>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold text-primary mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="h-40 bg-background-dark overflow-hidden">
                      <img
                        src={relatedProduct.thumbnail || "/placeholder.svg"}
                        alt={relatedProduct.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardContent>
                  <div className="p-4">
                    <h3 className="font-semibold text-primary line-clamp-2 mb-2">{relatedProduct.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-accent">${relatedProduct.price.toFixed(2)}</span>
                      <Link href={`/products/${relatedProduct.id}`}>
                        <Button size="sm" className="bg-primary text-white hover:bg-primary-light">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
