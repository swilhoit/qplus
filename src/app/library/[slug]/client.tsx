"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import {
  Lock,
  Play,
  Download,
  FileText,
  Headphones,
  Clock,
  Tag,
  ArrowLeft,
  CheckCircle,
  Eye
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

interface ContentItem {
  _id: string
  title: string
  slug: { current: string }
  description: string
  category: string
  categorySlug: string
  contentType: string
  price: number
  thumbnail?: string
  videoUrl?: string
  pdfFile?: string
  audioFile?: string
  tags?: string[]
  publishedAt: string
  isFeatured?: boolean
}

export default function ContentDetailClient({ content }: { content: ContentItem }) {
  const router = useRouter()
  const { user, userProfile } = useAuth()
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
      router.push(`/login?redirect=/library/${content.slug.current}`)
      return
    }
    router.push(`/checkout?content=${content._id}&price=${content.price}`)
  }

  const handleSubscribe = () => {
    router.push('/pricing')
  }

  const handleDownload = () => {
    if (content.pdfFile) {
      window.open(content.pdfFile, '_blank')
    } else if (content.videoUrl) {
      window.open(content.videoUrl, '_blank')
    } else if (content.audioFile) {
      window.open(content.audioFile, '_blank')
    }
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
    <div className="min-h-screen bg-white">
      <header className="border-b border-beige-dark bg-white">
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
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span>{content.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Icon className="h-4 w-4" />
                  {content.contentType}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-forest font-montserrat mb-4">
                {content.title}
              </h1>
              <p className="text-lg text-gray-700">
                {content.description}
              </p>
            </div>

            {/* Preview or Content Area */}
            <Card className="overflow-hidden border-beige-dark">
              {content.thumbnail ? (
                <div className="relative aspect-video">
                  <Image
                    src={content.thumbnail}
                    alt={content.title}
                    fill
                    className="object-cover"
                  />
                  {!hasAccess && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center text-white">
                        <Lock className="h-16 w-16 mb-4 mx-auto" />
                        <p className="text-lg font-medium">Premium Content</p>
                        <p className="text-sm opacity-90">Subscribe or purchase to access</p>
                      </div>
                    </div>
                  )}
                  {hasAccess && (
                    <div className="absolute bottom-4 right-4">
                      <Button
                        onClick={handleDownload}
                        className="bg-forest text-white hover:bg-forest/90"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Content
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center relative">
                  {hasAccess ? (
                    <div className="text-center">
                      <Icon className="h-16 w-16 text-forest mb-4 mx-auto" />
                      <p className="text-lg font-medium mb-2">Ready to access</p>
                      <Button
                        onClick={handleDownload}
                        className="bg-forest text-white hover:bg-forest/90"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Content
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Lock className="h-16 w-16 text-gray-400 mb-4 mx-auto" />
                      <p className="text-lg font-medium">Premium Content</p>
                      <p className="text-sm text-gray-600">Subscribe or purchase to access</p>
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Tags */}
            {content.tags && content.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-gray-600" />
                {content.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-beige-light">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Purchase/Access Sidebar */}
          <div className="space-y-6">
            {hasAccess ? (
              <Card className="border-forest">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-forest">
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
                  <Button
                    className="w-full bg-forest text-white hover:bg-forest/90"
                    onClick={handleDownload}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Now
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <Card className="border-beige-dark">
                  <CardHeader>
                    <CardTitle>Get Access</CardTitle>
                    <CardDescription>
                      Choose how you'd like to access this content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border border-beige-dark rounded-lg">
                      <h4 className="font-semibold mb-2">One-Time Purchase</h4>
                      <p className="text-2xl font-bold mb-3 text-forest">${content.price}</p>
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
                        <span className="w-full border-t border-beige-dark" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-600">or</span>
                      </div>
                    </div>

                    <div className="p-4 border-2 border-forest rounded-lg bg-forest/5">
                      <h4 className="font-semibold mb-2">Full Library Access</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Starting at $10/month
                      </p>
                      <Button
                        className="w-full bg-forest text-white hover:bg-forest/90"
                        onClick={handleSubscribe}
                      >
                        View Subscription Plans
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {!user && (
                  <Card className="border-beige-dark">
                    <CardHeader>
                      <CardTitle>Already a member?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/login?redirect=/library/${content.slug.current}`}>
                          Sign in to access
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* Content Info */}
            <Card className="border-beige-dark">
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type</span>
                  <span className="capitalize">{content.contentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span>{content.category}</span>
                </div>
                {content.isFeatured && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge className="bg-amber-100 text-amber-800">Featured</Badge>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Published</span>
                  <span>{new Date(content.publishedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}