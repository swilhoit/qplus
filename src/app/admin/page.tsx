"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  Users,
  DollarSign,
  FileText,
  TrendingUp,
  Package,
  Tag,
  BarChart3,
  Download,
  Eye,
  UserCheck
} from "lucide-react"

// Mock data - replace with real Firestore/Stripe queries
const mockAnalytics = {
  totalSubscribers: 156,
  monthlySubscribers: 89,
  annualSubscribers: 67,
  totalRevenue: 2340,
  monthlyRevenue: 890,
  oneTimePurchases: 43,
  totalContent: 47,
  mostViewedContent: [
    { title: "Community Safety Guide", views: 234, type: "pdf" },
    { title: "Event Planning Template", views: 189, type: "template" },
    { title: "Leadership Training Video", views: 156, type: "video" },
  ],
  recentSubscriptions: [
    { email: "user1@example.com", type: "monthly", date: "2024-01-20" },
    { email: "user2@example.com", type: "annual", date: "2024-01-19" },
    { email: "user3@example.com", type: "monthly", date: "2024-01-18" },
  ],
  cancelledSubscriptions: 12,
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState(mockAnalytics)

  useEffect(() => {
    // TODO: Fetch real analytics from Firestore/Stripe
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-display font-bold">Q+ Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your library content and users</p>
          </div>
          <nav className="flex items-center space-x-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/">View Site</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/studio">Sanity Studio</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalSubscribers}</div>
              <p className="text-xs text-muted-foreground">
                {analytics.monthlySubscribers} monthly, {analytics.annualSubscribers} annual
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analytics.monthlyRevenue}</div>
              <p className="text-xs text-muted-foreground">
                +{analytics.oneTimePurchases} one-time purchases
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Content</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalContent}</div>
              <p className="text-xs text-muted-foreground">
                Across all categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.cancelledSubscriptions}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="promos">Promo Codes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Most Viewed Content
                  </CardTitle>
                  <CardDescription>Top performing resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.mostViewedContent.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-muted-foreground">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.type}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium">{item.views} views</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Recent Subscriptions
                  </CardTitle>
                  <CardDescription>New members this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.recentSubscriptions.map((sub, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{sub.email}</p>
                          <p className="text-sm text-muted-foreground">{sub.date}</p>
                        </div>
                        <span className="text-sm font-medium px-2 py-1 bg-primary/10 rounded">
                          {sub.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <Button asChild variant="outline">
                  <Link href="/studio/desk/contentItem">
                    <Package className="mr-2 h-4 w-4" />
                    Add Content
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/admin/users">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Users
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/admin/promos">
                    <Tag className="mr-2 h-4 w-4" />
                    Create Promo
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/admin/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Analytics
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/admin/exports">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Upload and organize library content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button asChild className="w-full gradient-primary text-white">
                    <Link href="/studio/desk/contentItem">
                      <Package className="mr-2 h-4 w-4" />
                      Add New Content in Sanity Studio
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/admin/content/bulk-upload">
                      <FileText className="mr-2 h-4 w-4" />
                      Bulk Upload Content
                    </Link>
                  </Button>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button asChild variant="outline">
                      <Link href="/studio/desk/category">Manage Categories</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/studio/desk/contentItem">View All Content</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage subscriptions and access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/admin/users">
                      <Users className="mr-2 h-4 w-4" />
                      View All Users
                    </Link>
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Grant free access, revoke accounts, and manage subscriptions
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="promos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Promo Code Management</CardTitle>
                <CardDescription>Create and track promotional codes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button asChild className="w-full gradient-primary text-white">
                    <Link href="/studio/desk/promoCode">
                      <Tag className="mr-2 h-4 w-4" />
                      Create New Promo Code
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/admin/promos">View Active Promos</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}