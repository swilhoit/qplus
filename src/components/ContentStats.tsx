"use client"

import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"

interface ContentStats {
  totalContent: number
  categories: number
  featuredContent: number
}

export default function ContentStats({ type }: { type: 'total' | 'categories' | 'featured' }) {
  const [stats, setStats] = useState<ContentStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [totalContent, categories, featuredContent] = await Promise.all([
          client.fetch(`count(*[_type == "contentItem"])`),
          client.fetch(`count(*[_type == "category"])`),
          client.fetch(`count(*[_type == "contentItem" && isFeatured == true])`)
        ])

        setStats({
          totalContent,
          categories,
          featuredContent
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="text-2xl font-bold animate-pulse">...</div>
  }

  const value = type === 'total' ? stats?.totalContent :
                type === 'categories' ? stats?.categories :
                stats?.featuredContent

  return <div className="text-2xl font-bold">{value || 0}</div>
}