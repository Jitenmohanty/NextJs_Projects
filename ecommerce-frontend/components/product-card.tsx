import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative h-48 bg-background-dark overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <div className="w-full">
          <h3 className="font-semibold text-primary line-clamp-2">{product.name}</h3>
          <p className="text-sm text-text-light mt-1">{product.category}</p>
        </div>
        <div className="flex items-center gap-2 w-full">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-primary">{product.rating}</span>
            <span className="text-xs text-text-light">({product.reviews})</span>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-bold text-accent">${product.price.toFixed(2)}</span>
          <Link href={`/products/${product.id}`}>
            <Button size="sm" disabled={!product.inStock} className="bg-primary text-white hover:bg-primary-light">
              View
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
