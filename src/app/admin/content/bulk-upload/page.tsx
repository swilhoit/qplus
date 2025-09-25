"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import {
  ArrowLeft,
  Upload,
  FileText,
  Video,
  Music,
  File,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Download,
  Loader2
} from "lucide-react"

interface ContentItemUpload {
  id: string
  title: string
  description: string
  category: string
  contentType: "video" | "audio" | "pdf" | "template"
  price: number
  tags: string[]
  file?: File
  videoUrl?: string
  status: "pending" | "uploading" | "success" | "error"
  error?: string
}

export default function BulkUploadPage() {
  const [items, setItems] = useState<ContentItemUpload[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [currentItem, setCurrentItem] = useState<ContentItemUpload | null>(null)

  const categories = [
    "Risk & Safety Resources",
    "Organizational Tools & Templates",
    "The Collective Conversation"
  ]

  const addNewItem = () => {
    const newItem: ContentItemUpload = {
      id: Date.now().toString(),
      title: "",
      description: "",
      category: categories[0],
      contentType: "pdf",
      price: 10,
      tags: [],
      status: "pending"
    }
    setItems([...items, newItem])
    setCurrentItem(newItem)
  }

  const updateItem = (id: string, updates: Partial<ContentItemUpload>) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
    if (currentItem?.id === id) {
      setCurrentItem(items[0] || null)
    }
  }

  const handleFileChange = (id: string, file: File) => {
    updateItem(id, { file })
  }

  const uploadToSanity = async (item: ContentItemUpload) => {
    try {
      updateItem(item.id, { status: "uploading" })

      // Upload file to Sanity if present
      let fileAsset = null
      if (item.file) {
        fileAsset = await client.assets.upload('file', item.file, {
          filename: item.file.name
        })
      }

      // Create document in Sanity
      const doc = {
        _type: 'contentItem',
        title: item.title,
        slug: {
          current: item.title.toLowerCase().replace(/\s+/g, '-')
        },
        description: item.description,
        category: {
          _type: 'reference',
          _ref: 'category-id' // In production, fetch actual category ID
        },
        contentType: item.contentType,
        price: item.price,
        tags: item.tags,
        isFeatured: false,
        viewCount: 0,
        publishedAt: new Date().toISOString()
      }

      // Add file reference based on content type
      if (item.contentType === 'video' && item.videoUrl) {
        (doc as any).videoUrl = item.videoUrl
      } else if (item.contentType === 'audio' && fileAsset) {
        (doc as any).audioFile = {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: fileAsset._id
          }
        }
      } else if (['pdf', 'template'].includes(item.contentType) && fileAsset) {
        (doc as any).pdfFile = {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: fileAsset._id
          }
        }
      }

      await client.create(doc)
      updateItem(item.id, { status: "success" })
      return true
    } catch (error: any) {
      updateItem(item.id, { 
        status: "error", 
        error: error.message || "Upload failed" 
      })
      return false
    }
  }

  const handleBulkUpload = async () => {
    const validItems = items.filter(item => 
      item.title && item.description && 
      (item.file || item.videoUrl)
    )

    if (validItems.length === 0) {
      alert("Please add at least one complete item to upload")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    for (let i = 0; i < validItems.length; i++) {
      await uploadToSanity(validItems[i])
      setUploadProgress(((i + 1) / validItems.length) * 100)
    }

    setIsUploading(false)
  }

  const downloadTemplate = () => {
    const csvContent = [
      "Title,Description,Category,Content Type,Price,Tags,Video URL",
      "Example Training Video,Learn the basics of community organizing,The Collective Conversation,video,15,training;video;basics,https://vimeo.com/123456",
      "Safety Planning Template,Comprehensive safety planning document,Risk & Safety Resources,pdf,10,safety;planning;template,"
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "content-upload-template.csv"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="h-4 w-4" />
      case "audio": return <Music className="h-4 w-4" />
      case "pdf": return <FileText className="h-4 w-4" />
      default: return <File className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-display font-bold">Bulk Content Upload</h1>
                <p className="text-sm text-muted-foreground">
                  Upload multiple content items to Sanity
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadTemplate}
            >
              <Download className="mr-2 h-4 w-4" />
              Download CSV Template
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Item List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Content Items</CardTitle>
                <CardDescription>
                  {items.length} item{items.length !== 1 ? 's' : ''} ready to upload
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={addNewItem}
                  className="w-full mb-4"
                  variant="outline"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Item
                </Button>

                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setCurrentItem(item)}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          currentItem?.id === item.id
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {getContentIcon(item.contentType)}
                              <p className="font-medium text-sm">
                                {item.title || "Untitled"}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.category} • ${item.price}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.status === "success" && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            {item.status === "error" && (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            )}
                            {item.status === "uploading" && (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeItem(item.id)
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Item Editor */}
          <div className="lg:col-span-2">
            {currentItem ? (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Content Item</CardTitle>
                  <CardDescription>
                    Configure the details for this content item
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={currentItem.title}
                        onChange={(e) => updateItem(currentItem.id, { title: e.target.value })}
                        placeholder="Enter content title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={currentItem.price}
                        onChange={(e) => updateItem(currentItem.id, { price: Number(e.target.value) })}
                        min="0"
                        step="5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={currentItem.description}
                      onChange={(e) => updateItem(currentItem.id, { description: e.target.value })}
                      placeholder="Describe the content..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={currentItem.category}
                        onValueChange={(value) => updateItem(currentItem.id, { category: value })}
                      >
                        <SelectTrigger id="category">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="type">Content Type</Label>
                      <Select
                        value={currentItem.contentType}
                        onValueChange={(value: any) => updateItem(currentItem.id, { contentType: value })}
                      >
                        <SelectTrigger id="type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="audio">Audio</SelectItem>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="template">Template</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {currentItem.contentType === "video" ? (
                    <div>
                      <Label htmlFor="videoUrl">Video URL</Label>
                      <Input
                        id="videoUrl"
                        type="url"
                        value={currentItem.videoUrl || ""}
                        onChange={(e) => updateItem(currentItem.id, { videoUrl: e.target.value })}
                        placeholder="https://vimeo.com/..."
                      />
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="file">Upload File</Label>
                      <Input
                        id="file"
                        type="file"
                        accept={
                          currentItem.contentType === "audio"
                            ? "audio/*"
                            : currentItem.contentType === "pdf"
                            ? ".pdf"
                            : "*"
                        }
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileChange(currentItem.id, file)
                        }}
                      />
                      {currentItem.file && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Selected: {currentItem.file.name}
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={currentItem.tags.join(", ")}
                      onChange={(e) => updateItem(currentItem.id, {
                        tags: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                      })}
                      placeholder="safety, planning, template"
                    />
                  </div>

                  {currentItem.status === "error" && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">
                        Error: {currentItem.error}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center text-muted-foreground">
                    <Upload className="h-12 w-12 mx-auto mb-4" />
                    <p>Add items to begin uploading</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Upload Action */}
        {items.length > 0 && (
          <Card className="mt-6">
            <CardContent className="py-6">
              {isUploading && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Uploading content to Sanity...
                  </p>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    Ready to upload {items.filter(i => i.status === "pending").length} items
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {items.filter(i => i.status === "success").length} uploaded, 
                    {items.filter(i => i.status === "error").length} failed
                  </p>
                </div>
                <Button
                  onClick={handleBulkUpload}
                  disabled={isUploading || items.filter(i => i.status === "pending").length === 0}
                  className="gradient-primary text-white"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Start Upload
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}