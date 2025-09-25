"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Lock,
  Play,
  FileText,
  Headphones,
  Search,
  Filter,
  SortDesc,
  Grid3x3,
  List,
  X
} from "lucide-react"
import Image from "next/image"

// Mock data - replace with Sanity queries
const mockContent = [
  {
    _id: "1",
    title: "Community Safety Planning Guide",
    slug: { current: "community-safety-planning" },
    description: "Comprehensive guide for event safety",
    contentType: "pdf",
    price: 15,
    category: "Risk & Safety Resources",
    tags: ["safety", "planning", "events"],
    isFeatured: true,
    publishedAt: "2024-01-15"
  },
  {
    _id: "2",
    title: "Leadership Workshop Recording",
    slug: { current: "leadership-workshop" },
    description: "3-hour workshop on inclusive leadership",
    contentType: "video",
    price: 25,
    category: "The Collective Conversation",
    tags: ["leadership", "workshop", "video"],
    isFeatured: false,
    publishedAt: "2024-01-10"
  },
  // Add more mock items...
]

const categories = [
  "Risk & Safety Resources",
  "Organizational Tools & Templates",
  "The Collective Conversation"
]

const contentTypes = [
  { value: "video", label: "Video", icon: Play },
  { value: "audio", label: "Audio", icon: Headphones },
  { value: "pdf", label: "PDF", icon: FileText },
  { value: "template", label: "Template", icon: FileText },
]

export default function EnhancedLibraryPage() {
  const [content, setContent] = useState(mockContent)
  const [filteredContent, setFilteredContent] = useState(mockContent)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 })
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  useEffect(() => {
    filterAndSortContent()
  }, [searchTerm, sortBy, selectedCategories, selectedTypes, priceRange, showFeaturedOnly])

  const filterAndSortContent = () => {
    let filtered = [...content]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item =>
        selectedCategories.includes(item.category)
      )
    }

    // Content type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(item =>
        selectedTypes.includes(item.contentType)
      )
    }

    // Price range filter
    filtered = filtered.filter(item =>
      item.price >= priceRange.min && item.price <= priceRange.max
    )

    // Featured filter
    if (showFeaturedOnly) {
      filtered = filtered.filter(item => item.isFeatured)
    }

    // Sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
        break
      case "popular":
        // Sort by featured status or other metrics
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    setFilteredContent(filtered)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setSelectedTypes([])
    setPriceRange({ min: 0, max: 100 })
    setShowFeaturedOnly(false)
  }

  const activeFiltersCount =
    selectedCategories.length +
    selectedTypes.length +
    (showFeaturedOnly ? 1 : 0) +
    (priceRange.min > 0 || priceRange.max < 100 ? 1 : 0)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-display font-bold">
              Q+ Library
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/pricing" className="text-sm font-medium hover:text-primary">
                Pricing
              </Link>
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Sign In</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Search and Controls Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources, topics, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SortDesc className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="alphabetical">A-Z</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  {activeFiltersCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Content</SheetTitle>
                  <SheetDescription>
                    Narrow down your search results
                  </SheetDescription>
                </SheetHeader>

                <div className="space-y-6 mt-6">
                  {/* Categories */}
                  <div>
                    <Label className="mb-3 block">Categories</Label>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCategories([...selectedCategories, category])
                              } else {
                                setSelectedCategories(selectedCategories.filter(c => c !== category))
                              }
                            }}
                          />
                          <label
                            htmlFor={category}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Types */}
                  <div>
                    <Label className="mb-3 block">Content Type</Label>
                    <div className="space-y-2">
                      {contentTypes.map(type => (
                        <div key={type.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={type.value}
                            checked={selectedTypes.includes(type.value)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTypes([...selectedTypes, type.value])
                              } else {
                                setSelectedTypes(selectedTypes.filter(t => t !== type.value))
                              }
                            }}
                          />
                          <label
                            htmlFor={type.value}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                          >
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <Label className="mb-3 block">Price Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="min-price" className="text-xs">Min</Label>
                        <Input
                          id="min-price"
                          type="number"
                          min="0"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="max-price" className="text-xs">Max</Label>
                        <Input
                          id="max-price"
                          type="number"
                          min="0"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 100 })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Featured Only */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={showFeaturedOnly}
                      onCheckedChange={(checked) => setShowFeaturedOnly(checked as boolean)}
                    />
                    <label
                      htmlFor="featured"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Featured content only
                    </label>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex gap-1 border rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count and Active Filters */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">
            {filteredContent.length} {filteredContent.length === 1 ? 'result' : 'results'}
            {searchTerm && ` for "${searchTerm}"`}
          </p>

          {(selectedCategories.length > 0 || selectedTypes.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(cat => (
                <Badge key={cat} variant="secondary">
                  {cat}
                  <button
                    onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))}
                    className="ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedTypes.map(type => (
                <Badge key={type} variant="secondary">
                  {type}
                  <button
                    onClick={() => setSelectedTypes(selectedTypes.filter(t => t !== type))}
                    className="ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Content Grid/List */}
        {filteredContent.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-lg font-medium mb-2">No content found</p>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredContent.map((item) => {
              const Icon = contentTypes.find(t => t.value === item.contentType)?.icon || FileText

              return viewMode === "grid" ? (
                <Card key={item._id} className="">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Icon className="h-6 w-6 text-primary" />
                      {item.isFeatured && (
                        <Badge variant="secondary">Featured</Badge>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-muted-foreground">{item.category}</span>
                      <span className="font-semibold">${item.price}</span>
                    </div>
                    <Button asChild className="w-full" variant="outline">
                      <Link href={`/library/${item.slug.current}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card key={item._id} className="">
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4 flex-1">
                      <Icon className="h-8 w-8 text-primary shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{item.category}</Badge>
                          {item.isFeatured && <Badge variant="secondary">Featured</Badge>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-lg">${item.price}</span>
                      <Button asChild>
                        <Link href={`/library/${item.slug.current}`}>
                          View
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}