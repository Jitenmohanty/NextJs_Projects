"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useOrders } from "@/context/orders-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const { addOrder } = useOrders()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<"shipping" | "payment" | "review" | "confirmation">("shipping")

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })

  const [paymentData, setPaymentData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Checkout</h1>
            <p className="text-text-light mb-8">Your cart is empty</p>
            <Link href="/products">
              <Button className="bg-primary text-white hover:bg-primary-light">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Checkout</h1>
            <p className="text-text-light mb-8">Please sign in to continue</p>
            <Link href="/auth/login">
              <Button className="bg-primary text-white hover:bg-primary-light">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("review")
  }

  const handleConfirmOrder = async () => {
    setLoading(true)
    try {
      const orderData = {
        items: items.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        totalAmount: finalTotal,
        totalItems: items.length,
        paymentMethod: "card",
        paymentStatus: "received",
        selectedAddress: {
          name: formData.fullName,
          email: formData.email,
          street: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.zipCode,
          country: formData.country,
        },
      }

      await addOrder(orderData)
      await clearCart()
      setStep("confirmation")
    } catch (error) {
      console.error("Failed to create order:", error)
    } finally {
      setLoading(false)
    }
  }

  const taxAmount = total * 0.1
  const finalTotal = total + taxAmount

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="flex gap-4 mb-8">
              {["shipping", "payment", "review", "confirmation"].map((s, index) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step === s
                        ? "bg-primary text-white"
                        : ["shipping", "payment", "review"].includes(s) &&
                            ["payment", "review", "confirmation"].includes(step)
                          ? "bg-success text-white"
                          : "bg-background-dark text-text-light"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < 3 && <div className="w-8 h-0.5 bg-border mx-2" />}
                </div>
              ))}
            </div>

            {/* Shipping Step */}
            {step === "shipping" && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <Input
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <Input
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">City</label>
                        <Input
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">State</label>
                        <Input
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Zip Code</label>
                        <Input
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Country</label>
                        <Input
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-primary text-white hover:bg-primary-light">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Payment Step */}
            {step === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                      <Input
                        value={paymentData.cardName}
                        onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <Input
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <Input
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep("shipping")}
                        className="flex-1 border-border text-primary hover:bg-background-dark"
                      >
                        Back
                      </Button>
                      <Button type="submit" className="flex-1 bg-primary text-white hover:bg-primary-light">
                        Review Order
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Review Step */}
            {step === "review" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Review</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Shipping Address</h3>
                      <p className="text-text-light text-sm">
                        {formData.fullName}
                        <br />
                        {formData.address}
                        <br />
                        {formData.city}, {formData.state} {formData.zipCode}
                        <br />
                        {formData.country}
                      </p>
                    </div>
                    <div className="border-t border-border pt-4">
                      <h3 className="font-semibold text-primary mb-2">Payment Method</h3>
                      <p className="text-text-light text-sm">Card ending in {paymentData.cardNumber.slice(-4)}</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep("payment")}
                    className="flex-1 border-border text-primary hover:bg-background-dark"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleConfirmOrder}
                    disabled={loading}
                    className="flex-1 bg-primary text-white hover:bg-primary-light"
                  >
                    {loading ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </div>
            )}

            {/* Confirmation Step */}
            {step === "confirmation" && (
              <Card className="border-success bg-success/5">
                <CardContent className="pt-8 text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-primary mb-2">Order Confirmed!</h2>
                  <p className="text-text-light mb-6">
                    Thank you for your purchase. Your order has been placed successfully.
                  </p>
                  <p className="text-sm text-text-light mb-8">A confirmation email has been sent to {formData.email}</p>
                  <Link href="/">
                    <Button className="bg-primary text-white hover:bg-primary-light">Continue Shopping</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-text-light">
                        {item.product.title} x {item.quantity}
                      </span>
                      <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-text-light">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-text-light">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-text-light">
                    <span>Tax (10%)</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-accent">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
