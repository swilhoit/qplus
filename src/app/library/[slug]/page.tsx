import { client } from "@/sanity/lib/client"
import { notFound } from "next/navigation"
import ContentDetailClient from "./client"

async function getContentItem(slug: string) {
  const content = await client.fetch(`
    *[_type == "contentItem" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      contentType,
      price,
      isFeatured,
      "thumbnail": thumbnail.asset->url,
      videoUrl,
      "pdfFile": pdfFile.asset->url,
      "audioFile": audioFile.asset->url,
      "category": category->title,
      "categorySlug": category->slug.current,
      tags,
      viewCount,
      publishedAt
    }
  `, { slug })

  if (!content) {
    notFound()
  }

  return content
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ContentDetailPage({ params }: PageProps) {
  const { slug } = await params
  const content = await getContentItem(slug)

  return <ContentDetailClient content={content} />
}

export async function generateStaticParams() {
  const slugs = await client.fetch(`
    *[_type == "contentItem"] {
      "slug": slug.current
    }
  `)

  return slugs.map((item: { slug: string }) => ({
    slug: item.slug
  }))
}