"use client"

import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Shopping Cart</h1>
            <p className="text-text-light mb-8">Your cart is empty</p>
            <Link href="/products">
              <Button className="bg-primary text-white hover:bg-primary-light">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container-custom py-8">
          <h1 className="text-3xl font-bold text-primary">Shopping Cart</h1>
          <p className="text-text-light mt-2">{items.length} item(s) in your cart</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-background-dark rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary mb-1">{item.name}</h3>
                        <p className="text-lg font-bold text-accent mb-3">${item.price.toFixed(2)}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 border border-border rounded hover:bg-background-dark"
                          >
                            −
                          </button>
                          <span className="px-3 py-1 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 border border-border rounded hover:bg-background-dark"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price & Remove */}
                      <div className="text-right flex flex-col justify-between">
                        <div>
                          <p className="text-sm text-text-light mb-1">Subtotal</p>
                          <p className="text-xl font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-error hover:text-error/80 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-8">
              <Link href="/products">
                <Button
                  variant="outline"
                  className="border-border text-primary hover:bg-background-dark bg-transparent"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
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
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-text-light">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-text-light">
                    <span>Tax</span>
                    <span>${(total * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-accent">${(total * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="block">
                  <Button className="w-full bg-primary text-white hover:bg-primary-light py-6">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  onClick={() => clearCart()}
                  className="w-full border-border text-error hover:bg-error/10"
                >
                  Clear Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
