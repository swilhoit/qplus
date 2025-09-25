"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Sparkles,
  TrendingUp,
  Clock,
  Heart,
  BookOpen,
  Play,
  FileText,
  ChevronLeft,
  ChevronRight,
  Star
} from "lucide-react"

interface ContentItem {
  _id: string
  title: string
  slug: { current: string }
  description: string
  category: string
  contentType: string
  price: number
  tags: string[]
  thumbnail?: string
  matchScore?: number
  reason?: string
}

interface RecommendationsProps {
  userId?: string
  currentContentId?: string
  userHistory?: string[]
  userPreferences?: {
    categories?: string[]
    contentTypes?: string[]
    tags?: string[]
  }
}

export function ContentRecommendations({
  userId,
  currentContentId,
  userHistory = [],
  userPreferences = {}
}: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [recommendationType, setRecommendationType] = useState<"personalized" | "trending" | "new" | "similar">("personalized")

  useEffect(() => {
    loadRecommendations()
  }, [userId, currentContentId, recommendationType])

  const loadRecommendations = async () => {
    setLoading(true)

    // In production, this would call an API that uses:
    // - Collaborative filtering (users who viewed X also viewed Y)
    // - Content-based filtering (similar tags, categories)
    // - Hybrid approach combining both
    // - Machine learning models for better predictions

    const mockRecommendations: ContentItem[] = [
      {
        _id: "rec1",
        title: "Advanced Safety Protocols for Large Events",
        slug: { current: "advanced-safety-protocols" },
        description: "Comprehensive guide for events with 500+ attendees",
        category: "Risk & Safety Resources",
        contentType: "pdf",
        price: 20,
        tags: ["safety", "events", "planning"],
        matchScore: 95,
        reason: "Based on your interest in event planning"
      },
      {
        _id: "rec2",
        title: "Inclusive Leadership Workshop Series",
        slug: { current: "inclusive-leadership" },
        description: "4-part video series on building inclusive teams",
        category: "The Collective Conversation",
        contentType: "video",
        price: 35,
        tags: ["leadership", "inclusion", "workshop"],
        matchScore: 88,
        reason: "Popular with similar users"
      },
      {
        _id: "rec3",
        title: "Budget Planning Spreadsheet Template",
        slug: { current: "budget-template" },
        description: "Customizable budget tracker for organizations",
        category: "Organizational Tools & Templates",
        contentType: "template",
        price: 15,
        tags: ["budget", "finance", "template"],
        matchScore: 82,
        reason: "Frequently downloaded together"
      },
      {
        _id: "rec4",
        title: "Crisis Communication Framework",
        slug: { current: "crisis-communication" },
        description: "Step-by-step guide for emergency communications",
        category: "Risk & Safety Resources",
        contentType: "pdf",
        price: 25,
        tags: ["crisis", "communication", "emergency"],
        matchScore: 78,
        reason: "New in your favorite category"
      },
      {
        _id: "rec5",
        title: "Community Building Best Practices",
        slug: { current: "community-building" },
        description: "Strategies for growing engaged communities",
        category: "The Collective Conversation",
        contentType: "video",
        price: 20,
        tags: ["community", "engagement", "growth"],
        matchScore: 75,
        reason: "Trending this week"
      }
    ]

    // Filter and sort based on recommendation type
    let filtered = [...mockRecommendations]

    switch (recommendationType) {
      case "trending":
        filtered = filtered.map(item => ({
          ...item,
          reason: `Trending this week`
        }))
        break
      case "new":
        filtered = filtered.map(item => ({
          ...item,
          reason: "Recently added"
        }))
        break
      case "similar":
        // Filter by similar category/tags
        if (currentContentId) {
          filtered = filtered.map(item => ({
            ...item,
            reason: "Similar content"
          }))
        }
        break
      case "personalized":
      default:
        // Already sorted by match score
        break
    }

    setRecommendations(filtered.slice(0, 5))
    setLoading(false)
  }

  const getRecommendationIcon = () => {
    switch (recommendationType) {
      case "trending":
        return <TrendingUp className="h-5 w-5" />
      case "new":
        return <Clock className="h-5 w-5" />
      case "similar":
        return <Heart className="h-5 w-5" />
      default:
        return <Sparkles className="h-5 w-5" />
    }
  }

  const getRecommendationTitle = () => {
    switch (recommendationType) {
      case "trending":
        return "Trending Now"
      case "new":
        return "New Arrivals"
      case "similar":
        return "Similar Content"
      default:
        return "Recommended for You"
    }
  }

  const contentTypeIcons = {
    video: Play,
    pdf: FileText,
    template: FileText,
    audio: Play,
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Loading Recommendations...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-muted rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (recommendations.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {getRecommendationIcon()}
            {getRecommendationTitle()}
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant={recommendationType === "personalized" ? "default" : "ghost"}
              size="sm"
              onClick={() => setRecommendationType("personalized")}
            >
              For You
            </Button>
            <Button
              variant={recommendationType === "trending" ? "default" : "ghost"}
              size="sm"
              onClick={() => setRecommendationType("trending")}
            >
              Trending
            </Button>
            <Button
              variant={recommendationType === "new" ? "default" : "ghost"}
              size="sm"
              onClick={() => setRecommendationType("new")}
            >
              New
            </Button>
          </div>
        </div>
        <CardDescription>
          Discover content tailored to your interests
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Carousel View */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {recommendations.map((item, index) => {
              const Icon = contentTypeIcons[item.contentType as keyof typeof contentTypeIcons] || FileText

              return (
                <div
                  key={item._id}
                  className="flex-shrink-0 w-72 group"
                >
                  <Card className="h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <Icon className="h-5 w-5 text-primary" />
                        {item.matchScore && recommendationType === "personalized" && (
                          <Badge variant="secondary" className="text-xs">
                            {item.matchScore}% match
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-base line-clamp-2">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-xs line-clamp-2">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        <span className="text-sm font-semibold">${item.price}</span>
                      </div>

                      {item.reason && (
                        <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {item.reason}
                        </p>
                      )}

                      <Button
                        asChild
                        size="sm"
                        className="w-full"
                        variant="outline"
                      >
                        <Link href={`/library/${item.slug.current}`}>
                          View Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>

          {/* Navigation Buttons */}
          {recommendations.length > 3 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full bg-white border"
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-white border"
                onClick={() => setCurrentIndex(Math.min(recommendations.length - 3, currentIndex + 1))}
                disabled={currentIndex >= recommendations.length - 3}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {/* View All Link */}
        <div className="mt-6 text-center">
          <Button asChild variant="link">
            <Link href="/library?recommended=true">
              View All Recommendations
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}