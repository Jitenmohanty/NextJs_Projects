"use client"

import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { CartIcon } from "@/components/cart-icon"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Navigation() {
  const { isAuthenticated, user, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b border-border sticky top-0 bg-background z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            ShopHub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4 items-center">
            <Link href="/products">
              <Button variant="ghost">Products</Button>
            </Link>

            {isAuthenticated && (
              <>
                <Link href="/profile">
                  <Button variant="ghost">Profile</Button>
                </Link>
                <Link href="/admin">
                  <Button variant="ghost">Admin</Button>
                </Link>
              </>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex gap-2 items-center">
            <ThemeToggle />
            <CartIcon />

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-light hidden sm:inline">{user?.name}</span>
                <Button onClick={() => signOut()} className="bg-error text-white hover:bg-error/90" size="sm">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button className="bg-primary text-white hover:bg-primary-light" size="sm">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-background-dark rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4">
            <Link href="/products" className="block">
              <Button variant="ghost" className="w-full justify-start">
                Products
              </Button>
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/profile" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    Profile
                  </Button>
                </Link>
                <Link href="/admin" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    Admin
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
