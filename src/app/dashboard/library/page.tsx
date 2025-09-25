"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  Download,
  Play,
  FileText,
  Headphones,
  Search,
  Filter,
  Clock,
  BookOpen,
  ArrowLeft,
  Star
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

// Mock user's content - replace with Firestore queries
const mockUserContent = {
  purchased: [
    {
      id: "1",
      title: "Community Safety Guide",
      type: "pdf",
      category: "Risk & Safety",
      purchaseDate: "2024-01-15",
      lastAccessed: "2024-01-20",
      downloadUrl: "/downloads/safety-guide.pdf"
    },
    {
      id: "2",
      title: "Event Planning Template",
      type: "template",
      category: "Organizational Tools",
      purchaseDate: "2024-01-10",
      lastAccessed: "2024-01-18",
      downloadUrl: "/downloads/event-template.xlsx"
    },
    {
      id: "3",
      title: "Leadership Training Video",
      type: "video",
      category: "Collective Conversation",
      purchaseDate: "2024-01-05",
      lastAccessed: "2024-01-19",
      videoUrl: "https://example.com/video"
    }
  ],
  favorites: [
    {
      id: "4",
      title: "Crisis Response Protocol",
      type: "pdf",
      category: "Risk & Safety",
      isFavorite: true
    }
  ],
  recentlyViewed: [
    {
      id: "5",
      title: "Budget Planning Spreadsheet",
      type: "template",
      category: "Organizational Tools",
      lastViewed: "2024-01-20"
    }
  ],
  subscriptionContent: [] // All content if subscribed
}

const contentTypeIcons = {
  video: Play,
  audio: Headphones,
  pdf: FileText,
  template: FileText,
  resource: FileText,
}

export default function MyLibraryPage() {
  const { user, userProfile } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [userContent, setUserContent] = useState(mockUserContent)

  const hasSubscription = userProfile?.subscriptionStatus === 'active'

  const handleDownload = (item: any) => {
    // TODO: Track download in analytics
    // TODO: Generate secure download URL
    console.log('Downloading:', item.title)
  }

  const handleFavorite = (itemId: string) => {
    // TODO: Update Firestore
    console.log('Toggle favorite:', itemId)
  }

  const filteredContent = () => {
    let content = []

    switch (activeTab) {
      case "all":
        content = [...userContent.purchased, ...userContent.subscriptionContent]
        break
      case "purchased":
        content = userContent.purchased
        break
      case "favorites":
        content = userContent.favorites
        break
      case "recent":
        content = userContent.recentlyViewed
        break
      default:
        content = [...userContent.purchased, ...userContent.subscriptionContent]
    }

    if (searchTerm) {
      content = content.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return content
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-display font-bold">My Library</h1>
                <p className="text-sm text-muted-foreground">
                  {hasSubscription ? "Full library access" : `${userContent.purchased.length} items purchased`}
                </p>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link href="/library">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse More
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search your library..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Content</TabsTrigger>
            {!hasSubscription && (
              <TabsTrigger value="purchased">Purchased</TabsTrigger>
            )}
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredContent().length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">No content found</p>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "Try adjusting your search" : "Start building your library"}
                  </p>
                  <Button asChild>
                    <Link href="/library">Browse Library</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContent().map((item: any) => {
                  const Icon = contentTypeIcons[item.type as keyof typeof contentTypeIcons] || FileText

                  return (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <Icon className="h-8 w-8 text-primary" />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFavorite(item.id)}
                          >
                            <Star className={`h-4 w-4 ${item.isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                          </Button>
                        </div>
                        <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                        <CardDescription>{item.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {item.purchaseDate && (
                            <div className="text-sm text-muted-foreground">
                              Purchased {new Date(item.purchaseDate).toLocaleDateString()}
                            </div>
                          )}
                          {item.lastAccessed && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              Last accessed {new Date(item.lastAccessed).toLocaleDateString()}
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button
                              className="flex-1"
                              size="sm"
                              onClick={() => handleDownload(item)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <Link href={`/library/${item.id}`}>View</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="purchased" className="space-y-4">
            {/* Similar content grid for purchased items */}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            {userContent.favorites.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">No favorites yet</p>
                  <p className="text-muted-foreground">
                    Star content to quickly access it later
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Favorites grid */}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            {/* Recently viewed content */}
          </TabsContent>
        </Tabs>

        {/* Subscription Upsell for non-subscribers */}
        {!hasSubscription && (
          <Card className="mt-8 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Unlock Full Library Access
              </CardTitle>
              <CardDescription>
                Get unlimited access to all content with a subscription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-3">
                    Access hundreds of resources, templates, and exclusive content
                  </p>
                  <div className="flex gap-2">
                    <Button asChild className="gradient-primary text-white">
                      <Link href="/pricing">View Plans</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/library">Browse Library</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}