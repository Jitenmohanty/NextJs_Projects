import type React from "react"
import type { Metadata } from "next"
import { AuthProvider } from "@/context/auth-context"
import { CartProvider } from "@/context/cart-context"
import { OrdersProvider } from "@/context/orders-context"
import { BrandProvider } from "@/context/brand-context"
import { CategoryProvider } from "@/context/category-context"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import "./globals.css"

export const metadata: Metadata = {
  title: "ShopHub - Your Premium eCommerce Store",
  description: "Discover quality products with seamless shopping experience",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <BrandProvider>
            <CategoryProvider>
              <CartProvider>
                <OrdersProvider>
                  <Navigation />
                  <main className="min-h-screen">{children}</main>
                  <Footer />
                </OrdersProvider>
              </CartProvider>
            </CategoryProvider>
          </BrandProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
