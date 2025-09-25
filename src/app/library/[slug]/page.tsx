"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Lock,
  Play,
  Download,
  FileText,
  Headphones,
  Clock,
  Tag,
  ArrowLeft,
  CheckCircle
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

// Mock content data - replace with Sanity query
const mockContent = {
  _id: "1",
  title: "Community Safety Planning Guide",
  slug: { current: "community-safety-planning" },
  description: "A comprehensive guide to creating and implementing safety protocols for community events and spaces. Includes templates, checklists, and best practices developed by experienced organizers.",
  category: "Risk & Safety Resources",
  contentType: "pdf",
  price: 15,
  thumbnail: "/placeholder-image.jpg",
  videoUrl: null,
  pdfFile: "/sample.pdf",
  audioFile: null,
  tags: ["safety", "planning", "events", "community"],
  viewCount: 234,
  publishedAt: "2024-01-15",
  duration: "45 pages",
  features: [
    "Downloadable PDF template",
    "Editable safety checklists",
    "Crisis response protocols",
    "Communication templates",
    "Resource directory"
  ]
}

export default function ContentDetailPage() {
  const { slug } = useParams()
  const router = useRouter()
  const { user, userProfile } = useAuth()
  const [content, setContent] = useState(mockContent)
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check user access
    if (userProfile) {
      const hasSubscription = userProfile.subscriptionStatus === 'active'
      const hasPurchased = userProfile.purchasedContent?.includes(content._id)
      const hasFreeAccess = userProfile.freeAccess

      setHasAccess(hasSubscription || hasPurchased || hasFreeAccess || false)
    }
    setLoading(false)
  }, [userProfile, content._id])

  const handlePurchase = () => {
    if (!user) {
      router.push(`/login?redirect=/library/${slug}`)
      return
    }
    router.push(`/checkout?content=${content._id}&price=${content.price}`)
  }

  const handleSubscribe = () => {
    router.push('/pricing')
  }

  const contentTypeIcons = {
    video: Play,
    audio: Headphones,
    pdf: FileText,
    template: FileText,
    resource: FileText,
    training: Play,
  }

  const Icon = contentTypeIcons[content.contentType as keyof typeof contentTypeIcons] || FileText

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/library">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Library
                </Link>
              </Button>
            </div>
            <nav className="flex items-center space-x-4">
              {user ? (
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard">My Dashboard</Link>
                </Button>
              ) : (
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Sign In</Link>
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Content Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>{content.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Icon className="h-4 w-4" />
                  {content.contentType}
                </span>
                {content.duration && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {content.duration}
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {content.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {content.description}
              </p>
            </div>

            {/* Preview or Content Area */}
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
                {hasAccess ? (
                  <div className="text-center">
                    <Icon className="h-16 w-16 text-primary mb-4 mx-auto" />
                    <p className="text-lg font-medium mb-2">Ready to access</p>
                    <Button className="gradient-primary text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Download Content
                    </Button>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center text-white">
                      <Lock className="h-16 w-16 mb-4 mx-auto" />
                      <p className="text-lg font-medium">Premium Content</p>
                      <p className="text-sm opacity-90">Subscribe or purchase to access</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Features */}
            {content.features && content.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {content.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {content.tags && content.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {content.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-muted text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Purchase/Access Sidebar */}
          <div className="space-y-6">
            {hasAccess ? (
              <Card className="border-secondary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-secondary">
                    <CheckCircle className="h-5 w-5" />
                    You have access
                  </CardTitle>
                  <CardDescription>
                    {userProfile?.subscriptionStatus === 'active'
                      ? `Active ${userProfile.subscriptionType} subscription`
                      : 'You own this content'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full gradient-primary text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Download Now
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Get Access</CardTitle>
                    <CardDescription>
                      Choose how you'd like to access this content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">One-Time Purchase</h4>
                      <p className="text-2xl font-bold mb-3">${content.price}</p>
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={handlePurchase}
                      >
                        Buy This Content
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-muted-foreground">or</span>
                      </div>
                    </div>

                    <div className="p-4 border-2 border-primary rounded-lg">
                      <h4 className="font-semibold mb-2">Full Library Access</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Starting at $10/month
                      </p>
                      <Button
                        className="w-full gradient-primary text-white"
                        onClick={handleSubscribe}
                      >
                        View Subscription Plans
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {!user && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Already a member?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/login?redirect=/library/${slug}`}>
                          Sign in to access
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* Content Info */}
            <Card>
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="capitalize">{content.contentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span>{content.category}</span>
                </div>
                {content.duration && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Length</span>
                    <span>{content.duration}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Published</span>
                  <span>{new Date(content.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Views</span>
                  <span>{content.viewCount}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}