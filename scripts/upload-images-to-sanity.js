const { createClient } = require('@sanity/client')
const fetch = require('node-fetch')

// Configure Sanity client with write permissions
const client = createClient({
  projectId: 'duoy0d82',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN // Must be set as environment variable
})

// Map of content titles to Unsplash image URLs
const contentImageMap = {
  'Building Inclusive Workplaces': 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1600&h=900&fit=crop&q=80',
  'Healthcare Navigation Guide': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=900&fit=crop&q=80',
  'Youth Support Framework': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&h=900&fit=crop&q=80',
  'Risk Assessment Toolkit': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop&q=80',
  'Digital Security for Activists': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&h=900&fit=crop&q=80',
  'Crisis Response Planning': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop&q=80',
  'Community Engagement Workshop': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&h=900&fit=crop&q=80',
  'Volunteer Coordination Guide': 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&h=900&fit=crop&q=80',
  'Safe Space Guidelines': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop&q=80',
  'Emerging Leaders Training Series': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop&q=80',
  'Public Speaking for Advocates': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&q=80',
  'Board Governance Guide': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&h=900&fit=crop&q=80',
  'Policy Brief Template': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&h=900&fit=crop&q=80',
  'Media Relations Toolkit': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&h=900&fit=crop&q=80',
  'Impact Measurement Survey': 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1600&h=900&fit=crop&q=80',
  'Grant Writing Fundamentals': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&h=900&fit=crop&q=80',
  'Storytelling for Change Audio Series': 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1600&h=900&fit=crop&q=80',
  'Community Resilience Planning': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&h=900&fit=crop&q=80',
  'Advocacy Campaign Toolkit': 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&h=900&fit=crop&q=80',
  'Mental Health Resources Directory': 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1600&h=900&fit=crop&q=80',
  // Missing items
  'Community Survey Templates': 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1600&h=900&fit=crop&q=80',
  'Trans Rights in Healthcare': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&h=900&fit=crop&q=80',
  'Youth Mentorship Programs': 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1600&h=900&fit=crop&q=80',
  'Event Risk Assessment Template': 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&h=900&fit=crop&q=80',
  'Digital Security Guide': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&h=900&fit=crop&q=80',
  'Crisis Communication Plan': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=900&fit=crop&q=80',
  'Volunteer Recruitment Toolkit': 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&h=900&fit=crop&q=80',
  'Building Safe Spaces': 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1600&h=900&fit=crop&q=80'
}

async function uploadImageFromUrl(imageUrl, title) {
  try {
    console.log(`📥 Downloading image for: ${title}`)

    // Download the image
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    console.log(`📤 Uploading to Sanity...`)

    // Upload to Sanity
    const asset = await client.assets.upload('image', buffer, {
      filename: `${title.toLowerCase().replace(/\s+/g, '-')}.jpg`,
      contentType: 'image/jpeg'
    })

    console.log(`✅ Uploaded successfully: ${asset._id}`)

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    }
  } catch (error) {
    console.error(`❌ Error uploading image for ${title}:`, error.message)
    return null
  }
}

async function updateAllContentWithImages() {
  console.log('🎨 Starting to upload images to Sanity CDN...\n')

  // Check for API token
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN environment variable is not set!')
    console.log('\n📝 To get a write token:')
    console.log('1. Go to https://www.sanity.io/manage/project/duoy0d82/api')
    console.log('2. Click "Add API token"')
    console.log('3. Name it "Image Upload" and select "Editor" permissions')
    console.log('4. Copy the token')
    console.log('5. Run: export SANITY_API_TOKEN="your-token-here"')
    console.log('6. Run this script again: node scripts/upload-images-to-sanity.js')
    process.exit(1)
  }

  try {
    // First, get all content items
    const contentItems = await client.fetch(`
      *[_type == "contentItem"] {
        _id,
        title,
        "hasThumbnail": defined(thumbnail.asset._ref)
      }
    `)

    console.log(`Found ${contentItems.length} content items\n`)

    let successCount = 0
    let skipCount = 0
    let errorCount = 0

    for (const item of contentItems) {
      const imageUrl = contentImageMap[item.title]

      if (!imageUrl) {
        console.log(`⚠️  No image URL found for: ${item.title}\n`)
        errorCount++
        continue
      }

      if (item.hasThumbnail) {
        console.log(`✓ ${item.title} already has a thumbnail, skipping...\n`)
        skipCount++
        continue
      }

      // Upload the image
      const imageAsset = await uploadImageFromUrl(imageUrl, item.title)

      if (imageAsset) {
        // Update the content item with the uploaded image
        console.log(`🔄 Updating content item...`)

        await client
          .patch(item._id)
          .set({ thumbnail: imageAsset })
          .commit()

        console.log(`✅ Successfully updated: ${item.title}\n`)
        successCount++
      } else {
        errorCount++
      }

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    console.log('\n' + '='.repeat(50))
    console.log('📊 Upload Summary:')
    console.log(`✅ Successfully uploaded: ${successCount}`)
    console.log(`⏭️  Skipped (already had images): ${skipCount}`)
    console.log(`❌ Errors: ${errorCount}`)
    console.log('='.repeat(50))

    console.log('\n🎉 Image upload complete!')
    console.log('\n📱 View your content:')
    console.log('- Library: http://localhost:3001/library')
    console.log('- Studio: http://localhost:3001/studio')

  } catch (error) {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  }
}

// Run the script
updateAllContentWithImages()