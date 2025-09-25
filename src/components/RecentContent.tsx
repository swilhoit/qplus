"use client"

import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ContentItem {
  _id: string
  title: string
  slug: { current: string }
  category: string
  contentType: string
  viewCount: number
  publishedAt: string
}

export default function RecentContent() {
  const [recentContent, setRecentContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentContent = async () => {
      try {
        const content = await client.fetch(`
          *[_type == "contentItem"] | order(publishedAt desc) [0...5] {
            _id,
            title,
            slug,
            "category": category->title,
            contentType,
            viewCount,
            publishedAt
          }
        `)
        setRecentContent(content)
      } catch (error) {
        console.error("Error fetching recent content:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentContent()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (recentContent.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No content available yet</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link href="/library">Browse Library</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {recentContent.map((item) => (
        <div key={item._id} className="flex items-center justify-between">
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-gray-500">
              {item.category} • {item.contentType} • {item.viewCount} views
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/library/${item.slug.current}`}>View</Link>
          </Button>
        </div>
      ))}
    </div>
  )
}