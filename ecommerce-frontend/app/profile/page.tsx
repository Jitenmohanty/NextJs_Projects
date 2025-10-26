"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { useOrders } from "@/context/orders-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function ProfilePage() {
  const router = useRouter()
  const { user, signOut, isAuthenticated } = useAuth()
  const { orders } = useOrders()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Profile</h1>
            <p className="text-text-light mb-8">Please sign in to view your profile</p>
            <Link href="/auth/login">
              <Button className="bg-primary text-white hover:bg-primary-light">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container-custom py-8">
          <h1 className="text-3xl font-bold text-primary">My Profile</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{user?.name?.charAt(0).toUpperCase()}</span>
                </div>

                {!isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-text-light mb-1">Name</p>
                      <p className="font-semibold text-primary">{user?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-light mb-1">Email</p>
                      <p className="font-semibold text-primary">{user?.email}</p>
                    </div>
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="w-full bg-primary text-white hover:bg-primary-light"
                    >
                      Edit Profile
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <Input
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-primary text-white hover:bg-primary-light"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="flex-1 border-border text-primary hover:bg-background-dark"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full border-error text-error hover:bg-error/10 bg-transparent"
                >
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-text-light mb-4">No orders yet</p>
                    <Link href="/products">
                      <Button className="bg-primary text-white hover:bg-primary-light">Start Shopping</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Link key={order.id} href={`/profile/orders/${order.id}`}>
                        <div className="border border-border rounded-lg p-4 hover:bg-background-dark transition-colors cursor-pointer">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-semibold text-primary">Order #{order.id.slice(0, 8)}</p>
                              <p className="text-sm text-text-light">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
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
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-text-light text-sm">{order.items.length} item(s)</p>
                            <p className="font-bold text-accent">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
