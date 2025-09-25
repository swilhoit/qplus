const { createClient } = require('@sanity/client')
const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')

// Create Sanity client
const client = createClient({
  projectId: 'xdnhcrmj',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN // You'll need to set this
})

// Demo images from Unsplash (we'll download and upload to Sanity)
const demoImages = [
  { id: 'content-1', url: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&h=600&fit=crop' },
  { id: 'content-2', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop' },
  { id: 'content-3', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop' },
  { id: 'content-4', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop' },
  { id: 'content-5', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop' },
  { id: 'content-6', url: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800&h=600&fit=crop' },
  { id: 'content-7', url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop' },
  { id: 'content-8', url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop' },
  { id: 'content-9', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop' },
  { id: 'content-10', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop' },
  { id: 'content-11', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },
  { id: 'content-12', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop' },
  { id: 'content-13', url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop' },
  { id: 'content-14', url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop' },
  { id: 'content-15', url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop' },
  { id: 'content-16', url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop' },
  { id: 'content-17', url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop' },
  { id: 'content-18', url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop' },
  { id: 'content-19', url: 'https://images.unsplash.com/photo-1516119555254-e3b36f4b6769?w=800&h=600&fit=crop' },
  { id: 'content-20', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop' },
]

async function downloadImage(url) {
  const response = await fetch(url)
  const buffer = await response.buffer()
  return buffer
}

async function uploadImageToSanity(buffer, filename) {
  try {
    const asset = await client.assets.upload('image', buffer, {
      filename: filename
    })
    return asset
  } catch (error) {
    console.error(`Error uploading ${filename}:`, error)
    return null
  }
}

async function updateContentWithImage(contentId, imageAsset) {
  try {
    await client
      .patch(contentId)
      .set({
        thumbnail: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        }
      })
      .commit()

    console.log(`✓ Updated ${contentId} with image`)
  } catch (error) {
    console.error(`Error updating ${contentId}:`, error)
  }
}

async function main() {
  console.log('Starting image upload process...')

  for (const item of demoImages) {
    console.log(`Processing ${item.id}...`)

    try {
      // Download image
      const buffer = await downloadImage(item.url)

      // Upload to Sanity
      const asset = await uploadImageToSanity(buffer, `${item.id}.jpg`)

      if (asset) {
        // Update content document
        await updateContentWithImage(item.id, asset)
      }
    } catch (error) {
      console.error(`Failed to process ${item.id}:`, error)
    }
  }

  console.log('Image upload complete!')
}

// Run the script
if (!process.env.SANITY_API_TOKEN) {
  console.error('Please set SANITY_API_TOKEN environment variable')
  console.log('You can create a token at: https://www.sanity.io/manage')
  process.exit(1)
}

main().catch(console.error)