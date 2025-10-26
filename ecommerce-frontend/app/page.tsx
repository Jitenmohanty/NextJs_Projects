import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container-custom py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">ShopHub</h1>
          <div className="flex gap-4">
            <Link href="/products">
              <Button variant="ghost">Products</Button>
            </Link>
            <Link href="/auth/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container-custom py-20 text-center">
        <h2 className="text-4xl font-bold mb-4 text-primary">Welcome to ShopHub</h2>
        <p className="text-lg text-text-light mb-8">Discover quality products with seamless shopping experience</p>
        <Link href="/products">
          <Button size="lg" className="bg-accent text-primary hover:bg-accent-light">
            Start Shopping
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-background-dark py-16">
        <div className="container-custom">
          <h3 className="text-2xl font-bold mb-12 text-center text-primary">Why Choose ShopHub?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality Products",
                description: "Carefully curated selection of premium items",
              },
              {
                title: "Fast Shipping",
                description: "Quick and reliable delivery to your doorstep",
              },
              {
                title: "Secure Checkout",
                description: "Safe and encrypted payment processing",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-background p-6 rounded-lg border border-border">
                <h4 className="text-lg font-semibold mb-2 text-primary">{feature.title}</h4>
                <p className="text-text-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
