import { client } from "@/sanity/lib/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Lock, Play, FileText, Headphones } from "lucide-react"
import Image from "next/image"

async function getCategories() {
  const categories = await client.fetch(`
    *[_type == "category"] | order(order asc) {
      _id,
      title,
      slug,
      description,
      "icon": icon.asset->url
    }
  `)
  return categories
}

async function getContent() {
  const content = await client.fetch(`
    *[_type == "contentItem"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      contentType,
      price,
      isFeatured,
      "thumbnail": thumbnail.asset->url,
      "category": category->title,
      "categorySlug": category->slug.current
    }
  `)
  return content
}

const contentTypeIcons = {
  video: Play,
  audio: Headphones,
  pdf: FileText,
  template: FileText,
  resource: FileText,
  training: Play,
}

export default async function LibraryPage() {
  const [categories, content] = await Promise.all([getCategories(), getContent()])

  const contentByCategory = categories.map((category: any) => ({
    ...category,
    items: content.filter((item: any) => item.categorySlug === category.slug?.current)
  }))

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-beige-dark bg-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/qplus_logo.svg"
              alt="Q+ Library"
              width={120}
              height={40}
              style={{ height: '40px', width: 'auto' }}
            />
          </Link>
          <nav className="space-x-6">
            <Link href="/library" className="font-semibold text-forest">Library</Link>
            <Link href="/pricing" className="font-semibold text-black hover:text-forest transition-colors">Pricing</Link>
            <Link href="/login" className="font-semibold text-black hover:text-forest transition-colors">Login</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 bg-beige-light p-8 rounded-lg">
          <h1 className="text-5xl font-bold text-forest font-montserrat mb-4">Q+ Library</h1>
          <p className="text-lg text-gray-700 font-montserrat">
            Explore our collection of resources, tools, and conversations from queer leaders
          </p>
        </div>

        {contentByCategory.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Content Coming Soon</CardTitle>
              <CardDescription>
                We're preparing amazing resources for you. Check back soon!
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          contentByCategory.map((category: any) => (
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
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {category.items.map((item: any) => {
                    const Icon = contentTypeIcons[item.contentType as keyof typeof contentTypeIcons] || FileText

                    return (
                      <Card key={item._id} className="hover:shadow-xl transition-all duration-300 relative border-beige-dark">
                        {item.thumbnail && (
                          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority={category.items.indexOf(item) === 0 && categories.indexOf(category) === 0}
                              className="object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-white/95 rounded-full p-2 shadow-md">
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
              )}
            </section>
          ))
        )}

        <div className="mt-12 p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Unlock Full Access</h3>
          <p className="mb-6">Get unlimited access to all content with a subscription</p>
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
            <Link href="/pricing">View Pricing Options</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}