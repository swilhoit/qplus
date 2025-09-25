"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  Play,
  FileText,
  Download,
  Lock,
  Eye,
  Clock,
  Users,
  Star,
  ShoppingCart,
  Check,
  ChevronRight,
  BookOpen,
  Video,
  Headphones,
  FileSpreadsheet
} from "lucide-react"

interface PreviewContent {
  _id: string
  title: string
  description: string
  category: string
  contentType: "video" | "audio" | "pdf" | "template"
  price: number
  slug: { current: string }
  tags: string[]
  duration?: string
  fileSize?: string
  rating?: number
  preview?: {
    text?: string
    videoUrl?: string
    audioUrl?: string
    images?: string[]
    bulletPoints?: string[]
    tableOfContents?: string[]
  }
  features?: string[]
  testimonials?: Array<{
    name: string
    role: string
    text: string
  }>
}

interface ContentPreviewProps {
  content: PreviewContent
  isOpen: boolean
  onClose: () => void
  hasAccess: boolean
  isSubscribed: boolean
  onPurchase?: () => void
  onSubscribe?: () => void
}

export function ContentPreview({
  content,
  isOpen,
  onClose,
  hasAccess,
  isSubscribed,
  onPurchase,
  onSubscribe
}: ContentPreviewProps) {
  const [activeTab, setActiveTab] = useState("preview")
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false)
      setActiveTab("preview")
    }
  }, [isOpen])

  const getContentIcon = () => {
    switch (content.contentType) {
      case "video":
        return <Video className="h-5 w-5" />
      case "audio":
        return <Headphones className="h-5 w-5" />
      case "pdf":
        return <FileText className="h-5 w-5" />
      case "template":
        return <FileSpreadsheet className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const renderPreviewContent = () => {
    if (!content.preview) {
      return (
        <div className="text-center py-12">
          <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Preview not available</p>
          <p className="text-sm mt-2">Subscribe to access full content</p>
        </div>
      )
    }

    switch (content.contentType) {
      case "video":
        return (
          <div className="space-y-4">
            {content.preview.videoUrl ? (
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  controls
                  className="w-full h-full"
                  poster={content.preview.images?.[0]}
                >
                  <source src={content.preview.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  Preview - First 2 minutes
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Video preview unavailable</p>
                </div>
              </div>
            )}
            {content.preview.bulletPoints && (
              <div>
                <h4 className="font-semibold mb-2">What you'll learn:</h4>
                <ul className="space-y-2">
                  {content.preview.bulletPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )

      case "audio":
        return (
          <div className="space-y-4">
            {content.preview.audioUrl ? (
              <div className="bg-muted rounded-lg p-4">
                <audio controls className="w-full">
                  <source src={content.preview.audioUrl} type="audio/mp3" />
                  Your browser does not support the audio tag.
                </audio>
                <p className="text-xs text-muted-foreground mt-2">
                  Preview - First 5 minutes
                </p>
              </div>
            ) : (
              <div className="bg-muted rounded-lg p-8 text-center">
                <Headphones className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Audio preview unavailable</p>
              </div>
            )}
            {content.preview.tableOfContents && (
              <div>
                <h4 className="font-semibold mb-2">Episode Contents:</h4>
                <ul className="space-y-1">
                  {content.preview.tableOfContents.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )

      case "pdf":
      case "template":
        return (
          <div className="space-y-4">
            {content.preview.images && content.preview.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {content.preview.images.slice(0, 4).map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img}
                      alt={`Preview page ${i + 1}`}
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    {i === 3 && content.preview?.images && content.preview.images.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                        <p className="text-white font-semibold">
                          +{content.preview.images.length - 4} more pages
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : content.preview.text ? (
              <div className="prose max-w-none">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm leading-relaxed">{content.preview.text}</p>
                  <p className="text-xs text-muted-foreground mt-4">
                    ... Preview limited to first section
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-muted rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Document preview unavailable</p>
              </div>
            )}
            {content.preview.tableOfContents && (
              <div>
                <h4 className="font-semibold mb-2">Table of Contents:</h4>
                <ul className="space-y-1">
                  {content.preview.tableOfContents.map((item, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <ChevronRight className="h-3 w-3 text-muted-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl flex items-center gap-2">
                {getContentIcon()}
                {content.title}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{content.category}</Badge>
                <Badge variant="outline">{content.contentType}</Badge>
                {!hasAccess && (
                  <Badge className="bg-primary text-white">
                    ${content.price}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <DialogDescription className="mt-2">
            {content.description}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px] mt-4">
            <TabsContent value="preview" className="px-1">
              {renderPreviewContent()}
            </TabsContent>

            <TabsContent value="details" className="space-y-4 px-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  {content.duration && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{content.duration}</span>
                    </div>
                  )}
                  {content.fileSize && (
                    <div className="flex items-center gap-2 text-sm">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <span>{content.fileSize}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {content.rating && (
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{content.rating}/5.0</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Community favorite</span>
                  </div>
                </div>
              </div>

              {content.features && content.features.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">What's Included:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {content.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {content.tags && content.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {content.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4 px-1">
              {content.testimonials && content.testimonials.length > 0 ? (
                content.testimonials.map((testimonial, i) => (
                  <div key={i} className="border-b pb-4 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm mb-2">{testimonial.text}</p>
                    <p className="text-xs text-muted-foreground">
                      — {testimonial.name}, {testimonial.role}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No reviews yet</p>
                  <p className="text-sm mt-2">Be the first to review this content</p>
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {hasAccess ? (
            <Button asChild className="w-full sm:w-auto gradient-primary text-white">
              <Link href={`/library/${content.slug.current}`}>
                <BookOpen className="mr-2 h-4 w-4" />
                Access Full Content
              </Link>
            </Button>
          ) : isSubscribed ? (
            <div className="w-full text-center">
              <p className="text-sm text-muted-foreground mb-2">
                This content requires a one-time purchase
              </p>
              <Button
                onClick={onPurchase}
                className="w-full gradient-primary text-white"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Purchase for ${content.price}
              </Button>
            </div>
          ) : (
            <div className="w-full space-y-2">
              <Button
                onClick={onSubscribe}
                className="w-full gradient-primary text-white"
              >
                Subscribe for Full Access
              </Button>
              <Button
                onClick={onPurchase}
                variant="outline"
                className="w-full"
              >
                Or Purchase for ${content.price}
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}