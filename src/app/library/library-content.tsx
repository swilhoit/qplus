"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Lock, Play, FileText, Headphones, Grid3X3, List } from "lucide-react"
import Image from "next/image"

const contentTypeIcons = {
  video: Play,
  audio: Headphones,
  pdf: FileText,
  template: FileText,
  resource: FileText,
  training: Play,
}

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  icon?: string;
}

interface ContentItem {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  contentType: string;
  price: number;
  isFeatured: boolean;
  thumbnail?: string;
  category: string;
  categorySlug: string;
}

interface LibraryContentProps {
  categories: Category[];
  content: ContentItem[];
}

export default function LibraryContent({ categories, content }: LibraryContentProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  const contentByCategory = categories.map((category) => ({
    ...category,
    items: content.filter((item) => item.categorySlug === category.slug?.current)
  }))

  return (
    <>
      {/* View Toggle */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex rounded-lg border border-gray-200 p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              viewMode === 'grid'
                ? 'bg-forest text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Grid3X3 className="h-4 w-4" />
            Card View
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              viewMode === 'table'
                ? 'bg-forest text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <List className="h-4 w-4" />
            Table View
          </button>
        </div>
      </div>

      {contentByCategory.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Content Coming Soon</CardTitle>
            <CardDescription>
              We&apos;re preparing amazing resources for you. Check back soon!
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        contentByCategory.map((category) => (
          <section key={category._id} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              {category.icon && (
                <Image
                  src={category.icon}
                  alt={category.title}
                  width={32}
                  height={32}
                  className="rounded"
                />
              )}
              <div>
                <h2 className="text-3xl font-bold text-black font-montserrat">{category.title}</h2>
                {category.description && (
                  <p className="text-gray-700 font-montserrat">{category.description}</p>
                )}
              </div>
            </div>

            {category.items.length === 0 ? (
              <p className="text-gray-600 italic font-montserrat">No content in this category yet</p>
            ) : viewMode === 'grid' ? (
              <div className="grid md:grid-cols-3 gap-6">
                {category.items.map((item) => {
                  const Icon = contentTypeIcons[item.contentType as keyof typeof contentTypeIcons] || FileText

                  return (
                    <Card key={item._id} className="transition-all duration-300 relative border-beige-dark overflow-hidden">
                      {item.thumbnail && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={category.items.indexOf(item) === 0 && categories.indexOf(category) === 0}
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-white/95 rounded-full p-2">
                            <Icon className="h-4 w-4 text-forest" />
                          </div>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="line-clamp-1">{item.title}</span>
                          <Lock className="h-4 w-4 text-gray-400" />
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            ${item.price} or Subscribe
                          </span>
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/library/${item.slug.current}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.items.map((item) => {
                      const Icon = contentTypeIcons[item.contentType as keyof typeof contentTypeIcons] || FileText

                      return (
                        <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              {item.thumbnail && (
                                <div className="relative h-12 w-12 rounded overflow-hidden flex-shrink-0">
                                  <Image
                                    src={item.thumbnail}
                                    alt={item.title}
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{item.title}</span>
                                <Lock className="h-3 w-3 text-gray-400" />
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-forest" />
                              <span className="text-sm text-gray-600 capitalize">{item.contentType}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-sm text-gray-600 line-clamp-1 max-w-md">
                              {item.description}
                            </p>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm font-medium">${item.price}</span>
                          </td>
                          <td className="py-3 px-4">
                            <Button asChild size="sm" variant="outline">
                              <Link href={`/library/${item.slug.current}`}>
                                View
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))
      )}
    </>
  )
}