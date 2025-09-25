"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Download, Calendar, Settings, CreditCard, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Image from "next/image"
import RecentContent from "@/components/RecentContent"
import ContentStats from "@/components/ContentStats"

export default function DashboardPage() {
  const { user, userProfile, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-beige-light">
      <header className="border-b border-beige-dark bg-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/qplus_logo.svg"
              alt="Q+ Library"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/library" className="text-black font-semibold hover:text-forest transition-colors">Library</Link>
            <Link href="/dashboard" className="text-forest font-bold">My Dashboard</Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black font-montserrat mb-2">My Library Dashboard</h1>
          <p className="text-gray-700 font-montserrat">Welcome back, {userProfile?.name || user.email}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold">Subscription Status</CardTitle>
              <CreditCard className="h-4 w-4 text-forest" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{userProfile?.subscriptionStatus || 'none'}</div>
              <p className="text-xs text-muted-foreground">
                {userProfile?.subscriptionType === 'monthly' ? 'Monthly plan' :
                 userProfile?.subscriptionType === 'annual' ? 'Annual plan' : 'No active subscription'}
              </p>
              <Button variant="link" className="px-0 mt-2" asChild>
                <Link href="/account/billing">Manage Billing</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold">Content Access</CardTitle>
              <BookOpen className="h-4 w-4 text-forest" />
            </CardHeader>
            <CardContent>
              <ContentStats type="total" />
              <p className="text-xs text-muted-foreground">
                Total content items available
              </p>
              <Button variant="link" className="px-0 mt-2" asChild>
                <Link href="/library">Browse Library</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold">Featured Content</CardTitle>
              <Download className="h-4 w-4 text-forest" />
            </CardHeader>
            <CardContent>
              <ContentStats type="featured" />
              <p className="text-xs text-muted-foreground">
                Featured content available
              </p>
              <Button variant="link" className="px-0 mt-2" asChild>
                <Link href="/dashboard/downloads">View Downloads</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Accessed</CardTitle>
              <CardDescription>Your recently viewed content</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentContent />
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/dashboard/history">View All History</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/profile">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/billing">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing & Subscription
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/downloads">
                  <Download className="mr-2 h-4 w-4" />
                  My Downloads
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/purchases">
                  <Calendar className="mr-2 h-4 w-4" />
                  Purchase History
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>New Content Alert</CardTitle>
            <CardDescription>Fresh resources added this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-beige p-4 rounded-lg border border-beige-dark">
              <p className="font-semibold text-black mb-2">3 new resources added to Risk & Safety</p>
              <Button size="sm" asChild>
                <Link href="/library?category=risk-safety">Explore New Content</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}