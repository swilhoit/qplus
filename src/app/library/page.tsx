import { client } from "@/sanity/lib/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import LibraryContent from "./library-content"

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

export default async function LibraryPage() {
  const [categories, content] = await Promise.all([getCategories(), getContent()])

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
              priority
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

        <LibraryContent categories={categories} content={content} />

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