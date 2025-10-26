"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useOrders } from "@/context/orders-context"
import { fetchProducts } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  const { orders } = useOrders()
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders">("overview")
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(false)

  useEffect(() => {
    const loadProducts = async () => {
      setProductsLoading(true)
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (error) {
        console.error("Failed to load products:", error)
      } finally {
        setProductsLoading(false)
      }
    }
    loadProducts()
  }, [])

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
  const totalOrders = orders.length
  const totalProducts = products.length
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container-custom py-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
            <Link href="/">
              <Button variant="outline" className="border-border text-primary hover:bg-background-dark bg-transparent">
                Back to Store
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border sticky top-16 bg-background z-40">
        <div className="container-custom flex gap-4">
          {["overview", "products", "orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-4 py-4 font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-text-light hover:text-primary"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-text-light text-sm mb-2">Total Revenue</p>
                    <p className="text-3xl font-bold text-accent">${totalRevenue.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-text-light text-sm mb-2">Total Orders</p>
                    <p className="text-3xl font-bold text-primary">{totalOrders}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-text-light text-sm mb-2">Delivered Orders</p>
                    <p className="text-3xl font-bold text-success">{deliveredOrders}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-text-light text-sm mb-2">Total Products</p>
                    <p className="text-3xl font-bold text-primary">{totalProducts}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-text-light text-center py-8">No orders yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold text-primary">Order ID</th>
                          <th className="text-left py-3 px-4 font-semibold text-primary">Date</th>
                          <th className="text-left py-3 px-4 font-semibold text-primary">Items</th>
                          <th className="text-left py-3 px-4 font-semibold text-primary">Total</th>
                          <th className="text-left py-3 px-4 font-semibold text-primary">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(-5).map((order) => (
                          <tr key={order.id} className="border-b border-border hover:bg-background-dark">
                            <td className="py-3 px-4 text-primary font-medium">#{order.id.slice(0, 8)}</td>
                            <td className="py-3 px-4 text-text-light">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-text-light">{order.totalItems}</td>
                            <td className="py-3 px-4 font-bold text-accent">${order.totalAmount.toFixed(2)}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  order.status === "delivered"
                                    ? "bg-success/20 text-success"
                                    : order.status === "shipped"
                                      ? "bg-accent/20 text-accent"
                                      : "bg-warning/20 text-warning"
                                }`}
                              >
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">Products</h2>
              <Button className="bg-primary text-white hover:bg-primary-light">Add Product</Button>
            </div>

            {productsLoading ? (
              <p className="text-text-light text-center py-8">Loading products...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-primary">Product Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Stock</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Rating</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-border hover:bg-background-dark">
                        <td className="py-3 px-4 text-primary font-medium">{product.title}</td>
                        <td className="py-3 px-4 text-text-light">{product.category}</td>
                        <td className="py-3 px-4 font-bold text-accent">${product.price.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              product.stock > 0 ? "bg-success/20 text-success" : "bg-error/20 text-error"
                            }`}
                          >
                            {product.stock > 0 ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-primary font-medium">{product.rating} ⭐</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-border text-primary hover:bg-background-dark bg-transparent"
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-error text-error hover:bg-error/10 bg-transparent"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">All Orders</h2>

            {orders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-text-light">No orders yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-primary">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Items</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Total</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-border hover:bg-background-dark">
                        <td className="py-3 px-4 text-primary font-medium">#{order.id.slice(0, 8)}</td>
                        <td className="py-3 px-4 text-text-light">{order.selectedAddress.name}</td>
                        <td className="py-3 px-4 text-text-light">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-4 text-text-light">{order.totalItems}</td>
                        <td className="py-3 px-4 font-bold text-accent">${order.totalAmount.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <select
                            defaultValue={order.status}
                            className="px-3 py-1 rounded-lg border border-border bg-background text-primary text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-border text-primary hover:bg-background-dark bg-transparent"
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
