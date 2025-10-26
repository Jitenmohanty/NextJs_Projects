"use client"

import React from "react"
import Link from "next/link"
import { useOrders } from "@/context/orders-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OrderDetailPageProps {
  params: Promise<{ id: string }>
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { getOrderById } = useOrders()

  // Unwrap params
  const { id } = React.use(params)

  const order = getOrderById(id)

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Order not found</h1>
            <Link href="/profile">
              <Button className="bg-primary text-white hover:bg-primary-light">Back to Profile</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const statusSteps = ["pending", "processing", "shipped", "delivered"]
  const currentStepIndex = statusSteps.indexOf(order.status)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container-custom py-8">
          <Link href="/profile" className="text-accent hover:text-accent-light mb-4 inline-block">
            ← Back to Profile
          </Link>
          <h1 className="text-3xl font-bold text-primary">Order #{order.id.slice(0, 8)}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusSteps.map((step, index) => (
                    <div key={step} className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                          index <= currentStepIndex ? "bg-success text-white" : "bg-background-dark text-text-light"
                        }`}
                      >
                        {index < currentStepIndex ? "✓" : index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-primary capitalize">{step}</p>
                        {index === currentStepIndex && (
                          <p className="text-sm text-text-light">
                            {order.estimatedDelivery ? `Estimated delivery: ${order.estimatedDelivery}` : "In progress"}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle>Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center pb-4 border-b border-border last:border-0"
                    >
                      <div>
                        <p className="font-semibold text-primary">{item.name}</p>
                        <p className="text-sm text-text-light">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-accent">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-light">
                  {order.shippingAddress.fullName}
                  <br />
                  {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  <br />
                  {order.shippingAddress.country}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-text-light">
                    <span>Subtotal</span>
                    <span>${(order.total / 1.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-text-light">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-text-light">
                    <span>Tax (10%)</span>
                    <span>${(order.total - order.total / 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-accent">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-text-light mb-2">Order Date</p>
                  <p className="font-semibold text-primary">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <Link href="/products" className="block">
                  <Button className="w-full bg-primary text-white hover:bg-primary-light">Continue Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
