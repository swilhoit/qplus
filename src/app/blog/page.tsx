import { client } from "@/sanity/lib/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

async function getPosts() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt
    }
  `)
  return posts
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Q Plus</h1>
          <nav className="space-x-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/studio" className="hover:underline">Studio</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>

        {posts.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No posts yet</CardTitle>
              <CardDescription>
                Visit the <Link href="/studio" className="underline">Studio</Link> to create your first post.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-6">
            {posts.map((post: any) => (
              <Card key={post._id}>
                <CardHeader>
                  <CardTitle>
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                {post.excerpt && (
                  <CardContent>
                    <p>{post.excerpt}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}