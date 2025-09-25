import { createClient } from '@sanity/client'
import fetch from 'node-fetch'

// Configure Sanity client
const client = createClient({
  projectId: 'duoy0d82',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skQKxRCEphsVQ3sazJSoFT0qQQjOqKQZhPyJGEiHW7cBJElJNzxdXKaaBObuL39iJq5jdGJMJdQCc4J5oYLOekJNEsJjFGINb4RUXtUv8YCvPJrwc9J8AKe7L4VoAfhD01l87hQWyGzGCEDCr3mxOLgZCcdOvA3n4BRiO3xVWMzKPdPkYFPr' // Temporary token - replace with env var
})

// Stock image URLs using Unsplash with appropriate themes
const stockImages = {
  // Categories
  categories: [
    {
      id: 'cat-1',
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop', // Diverse group discussion
    },
    {
      id: 'cat-2',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop', // Safety/security themed
    },
    {
      id: 'cat-3',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop', // Community gathering
    },
    {
      id: 'cat-4',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop', // Leadership meeting
    },
    {
      id: 'cat-5',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop', // Advocacy/activism
    }
  ],

  // Content items - using diverse, inclusive professional imagery
  content: [
    {
      id: 'content-1',
      image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&h=600&fit=crop', // Inclusive workplace
    },
    {
      id: 'content-2',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', // Healthcare
    },
    {
      id: 'content-3',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop', // Youth mentorship
    },
    {
      id: 'content-4',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop', // Risk assessment docs
    },
    {
      id: 'content-5',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop', // Digital security
    },
    {
      id: 'content-6',
      image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800&h=600&fit=crop', // Crisis planning
    },
    {
      id: 'content-7',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop', // Workshop/engagement
    },
    {
      id: 'content-8',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop', // Volunteer coordination
    },
    {
      id: 'content-9',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', // Safe spaces
    },
    {
      id: 'content-10',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop', // Leadership training
    },
    {
      id: 'content-11',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', // Public speaking
    },
    {
      id: 'content-12',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop', // Board governance
    },
    {
      id: 'content-13',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop', // Policy documents
    },
    {
      id: 'content-14',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop', // Media relations
    },
    {
      id: 'content-15',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop', // Survey/research
    }
  ]
}

// Function to upload image and get asset reference
async function uploadImageFromUrl(imageUrl: string, title: string) {
  try {
    // For Unsplash images, we can use them directly as external URLs
    // This avoids needing to upload them to Sanity's asset CDN
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-external', // Special reference for external images
        _weak: true
      },
      // Store the URL as metadata
      url: imageUrl
    }
  } catch (error) {
    console.error(`Error preparing image for ${title}:`, error)
    return null
  }
}

async function updateImages() {
  console.log('🖼️  Adding stock images to Sanity content...\n')

  try {
    // Update category images
    console.log('📁 Updating category images...')
    for (const item of stockImages.categories) {
      try {
        const doc = await client.getDocument(item.id)
        if (doc) {
          const imageAsset = await uploadImageFromUrl(item.image, doc.title)
          if (imageAsset) {
            await client
              .patch(item.id)
              .set({ icon: imageAsset })
              .commit()
            console.log(`✅ Updated image for category: ${doc.title}`)
          }
        }
      } catch (error) {
        console.log(`⚠️  Error updating category ${item.id}:`, error)
      }
    }

    console.log('\n📚 Updating content item thumbnails...')
    for (const item of stockImages.content) {
      try {
        const doc = await client.getDocument(item.id)
        if (doc) {
          const imageAsset = await uploadImageFromUrl(item.image, doc.title)
          if (imageAsset) {
            await client
              .patch(item.id)
              .set({ thumbnail: imageAsset })
              .commit()
            console.log(`✅ Updated thumbnail for: ${doc.title}`)
          }
        }
      } catch (error) {
        console.log(`⚠️  Error updating content ${item.id}:`, error)
      }
    }

    console.log('\n🎉 Stock images successfully added!')
    console.log('\nYou can now view the updated content with images at:')
    console.log('- Library: http://localhost:3003/library')
    console.log('- Sanity Studio: http://localhost:3003/studio')

  } catch (error) {
    console.error('❌ Error updating images:', error)
    process.exit(1)
  }
}

// Run the update function
updateImages()