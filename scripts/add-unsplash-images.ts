import { createClient } from '@sanity/client'

// Configure Sanity client
const client = createClient({
  projectId: 'duoy0d82',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  // Token with write permissions required - get from sanity.io/manage
  token: process.env.SANITY_WRITE_TOKEN
})

// High-quality Unsplash images for Q+ Collective content
const contentImages = [
  {
    title: 'Building Inclusive Workplaces',
    imageUrl: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Healthcare Navigation Guide',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Youth Support Framework',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Risk Assessment Toolkit',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Digital Security for Activists',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Crisis Response Planning',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Community Engagement Workshop',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Volunteer Coordination Guide',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Safe Space Guidelines',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Emerging Leaders Training Series',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Public Speaking for Advocates',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Board Governance Guide',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Policy Brief Template',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Media Relations Toolkit',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Impact Measurement Survey',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Grant Writing Fundamentals',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Storytelling for Change Audio Series',
    imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Community Resilience Planning',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Advocacy Campaign Toolkit',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=800&fit=crop&q=80'
  },
  {
    title: 'Mental Health Resources Directory',
    imageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1200&h=800&fit=crop&q=80'
  }
]

async function uploadImageFromUrl(imageUrl: string) {
  try {
    const response = await fetch(imageUrl)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop()?.split('?')[0] || 'image.jpg'
    })

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    return null
  }
}

async function updateContentWithImages() {
  console.log('🎨 Adding Unsplash images to Sanity content...\n')

  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('❌ SANITY_WRITE_TOKEN environment variable is required')
    console.log('\n📝 To get a write token:')
    console.log('1. Go to https://www.sanity.io/manage/project/duoy0d82')
    console.log('2. Navigate to API → Tokens')
    console.log('3. Create a new token with "Editor" permissions')
    console.log('4. Run: export SANITY_WRITE_TOKEN="your-token-here"')
    console.log('5. Run this script again: npm run update-images')
    process.exit(1)
  }

  try {
    // Get all content items
    const contentItems = await client.fetch(`
      *[_type == "contentItem"] {
        _id,
        title,
        "hasImage": defined(thumbnail)
      }
    `)

    console.log(`Found ${contentItems.length} content items\n`)

    for (const item of contentItems) {
      // Find matching image by title
      const imageData = contentImages.find(img =>
        img.title.toLowerCase() === item.title.toLowerCase()
      )

      if (imageData) {
        if (!item.hasImage) {
          console.log(`📸 Adding image for: ${item.title}`)

          // Upload image to Sanity
          const imageAsset = await uploadImageFromUrl(imageData.imageUrl)

          if (imageAsset) {
            // Update the content item with the image
            await client
              .patch(item._id)
              .set({ thumbnail: imageAsset })
              .commit()

            console.log(`✅ Updated: ${item.title}\n`)
          } else {
            console.log(`⚠️  Failed to upload image for: ${item.title}\n`)
          }
        } else {
          console.log(`✓ ${item.title} already has an image\n`)
        }
      } else {
        console.log(`⚠️  No image mapping found for: ${item.title}\n`)
      }
    }

    console.log('\n🎉 Images successfully added to Sanity!')
    console.log('\n📱 View your content:')
    console.log('- Library: http://localhost:3003/library')
    console.log('- Studio: http://localhost:3003/studio/structure/contentItem')

  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

// Run the script
updateContentWithImages()