import { createClient } from '@sanity/client'

// Configure Sanity client
const client = createClient({
  projectId: 'duoy0d82',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN // You'll need to set this
})

// Demo categories
const categories = [
  {
    _type: 'category',
    _id: 'cat-1',
    title: 'The Collective Conversation',
    slug: { current: 'collective-conversation' },
    description: 'Engaging talks and discussions from LGBTQ+ leaders and innovators',
    order: 1
  },
  {
    _type: 'category',
    _id: 'cat-2',
    title: 'Risk & Safety Resources',
    slug: { current: 'risk-safety' },
    description: 'Essential tools and templates for community safety and risk management',
    order: 2
  },
  {
    _type: 'category',
    _id: 'cat-3',
    title: 'Community Building',
    slug: { current: 'community-building' },
    description: 'Resources for creating inclusive and thriving communities',
    order: 3
  },
  {
    _type: 'category',
    _id: 'cat-4',
    title: 'Leadership Development',
    slug: { current: 'leadership' },
    description: 'Training and resources for emerging LGBTQ+ leaders',
    order: 4
  },
  {
    _type: 'category',
    _id: 'cat-5',
    title: 'Advocacy Tools',
    slug: { current: 'advocacy' },
    description: 'Templates and guides for effective advocacy work',
    order: 5
  }
]

// Demo content items
const contentItems = [
  // The Collective Conversation
  {
    _type: 'contentItem',
    title: 'Building Inclusive Workplaces',
    slug: { current: 'building-inclusive-workplaces' },
    description: 'A comprehensive discussion on creating truly inclusive workplace environments for LGBTQ+ employees, featuring insights from leading diversity experts.',
    category: { _type: 'reference', _ref: 'cat-1' },
    contentType: 'video',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    price: 15,
    isFeatured: true,
    tags: ['workplace', 'diversity', 'inclusion', 'leadership'],
    viewCount: 245,
    publishedAt: new Date('2024-01-15').toISOString()
  },
  {
    _type: 'contentItem',
    title: 'Trans Rights in Healthcare',
    slug: { current: 'trans-rights-healthcare' },
    description: 'An important conversation about advancing transgender healthcare rights and access, featuring healthcare advocates and medical professionals.',
    category: { _type: 'reference', _ref: 'cat-1' },
    contentType: 'video',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    price: 20,
    isFeatured: true,
    tags: ['healthcare', 'trans rights', 'advocacy', 'policy'],
    viewCount: 389,
    publishedAt: new Date('2024-01-20').toISOString()
  },
  {
    _type: 'contentItem',
    title: 'Youth Mentorship Programs',
    slug: { current: 'youth-mentorship-programs' },
    description: 'Exploring successful LGBTQ+ youth mentorship programs and their impact on the next generation of leaders.',
    category: { _type: 'reference', _ref: 'cat-1' },
    contentType: 'audio',
    price: 10,
    tags: ['youth', 'mentorship', 'education', 'community'],
    viewCount: 156,
    publishedAt: new Date('2024-01-25').toISOString()
  },

  // Risk & Safety Resources
  {
    _type: 'contentItem',
    title: 'Event Risk Assessment Template',
    slug: { current: 'event-risk-assessment-template' },
    description: 'A comprehensive template for assessing and managing risks at LGBTQ+ community events, including safety protocols and emergency procedures.',
    category: { _type: 'reference', _ref: 'cat-2' },
    contentType: 'template',
    price: 25,
    isFeatured: true,
    tags: ['safety', 'events', 'risk management', 'template'],
    viewCount: 523,
    publishedAt: new Date('2024-01-10').toISOString()
  },
  {
    _type: 'contentItem',
    title: 'Digital Security Guide',
    slug: { current: 'digital-security-guide' },
    description: 'Essential digital security practices for LGBTQ+ organizations and activists to protect sensitive information and communications.',
    category: { _type: 'reference', _ref: 'cat-2' },
    contentType: 'pdf',
    price: 15,
    tags: ['security', 'digital', 'privacy', 'guide'],
    viewCount: 298,
    publishedAt: new Date('2024-01-18').toISOString()
  },
  {
    _type: 'contentItem',
    title: 'Crisis Communication Plan',
    slug: { current: 'crisis-communication-plan' },
    description: 'A ready-to-use crisis communication plan template for LGBTQ+ organizations facing emergencies or public relations challenges.',
    category: { _type: 'reference', _ref: 'cat-2' },
    contentType: 'template',
    price: 30,
    tags: ['crisis management', 'communication', 'PR', 'template'],
    viewCount: 176,
    publishedAt: new Date('2024-01-22').toISOString()
  },

  // Community Building
  {
    _type: 'contentItem',
    title: 'Community Engagement Workshop',
    slug: { current: 'community-engagement-workshop' },
    description: 'A recorded workshop on effective community engagement strategies for LGBTQ+ organizations and grassroots groups.',
    category: { _type: 'reference', _ref: 'cat-3' },
    contentType: 'video',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    price: 18,
    isFeatured: true,
    tags: ['workshop', 'engagement', 'community', 'organizing'],
    viewCount: 412,
    publishedAt: new Date('2024-01-12').toISOString()
  },
  {
    _type: 'contentItem',
    title: 'Volunteer Recruitment Toolkit',
    slug: { current: 'volunteer-recruitment-toolkit' },
    description: 'A comprehensive toolkit for recruiting, training, and retaining volunteers in LGBTQ+ organizations.',
    category: { _type: 'reference', _ref: 'cat-3' },
    contentType: 'resource',
    price: 22,
    tags: ['volunteers', 'recruitment', 'management', 'toolkit'],
    viewCount: 234,
    publishedAt: new Date('2024-01-16').toISOString()
  },
  {
    _type: 'contentItem',
    title: 'Building Safe Spaces',
    slug: { current: 'building-safe-spaces' },
    description: 'Guidelines and best practices for creating and maintaining safe spaces for LGBTQ+ community members.',
    category: { _type: 'reference', _ref: 'cat-3' },
    contentType: 'pdf',
    price: 12,
    tags: ['safe spaces', 'guidelines', 'inclusion', 'community'],
    viewCount: 367,
    publishedAt: new Date('2024-01-24').toISOString()
  },

  // Leadership Development
  {
    _type: 'contentItem',
    title: 'Emerging Leaders Training Series',
    slug: { current: 'emerging-leaders-training' },
    description: 'A comprehensive 6-part training series designed for emerging LGBTQ+ leaders covering essential leadership skills.',
    category: { _type: 'reference', _ref: 'cat-4' },
    contentType: 'training',
    price: 45,
    isFeatured: true,
    tags: ['leadership', 'training', 'professional development', 'series'],
    viewCount: 567,
    publishedAt: new Date('2024-01-08').toISOString()
  },
  {
    _type: 'contentItem',
    title: 'Public Speaking for Advocates',
    slug: { current: 'public-speaking-advocates' },
    description: 'Master the art of public speaking and presentation skills specifically tailored for LGBTQ+ advocates and leaders.',
    category: { _type: 'reference', _ref: 'cat-4' },
    contentType: 'video',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    price: 20,
    tags: ['public speaking', 'communication', 'advocacy', 'skills'],
    viewCount: 289,
    publishedAt: new Date('2024-01-14').toISOString()
  },
  {
    _type: 'contentItem',
    title: 'Board Governance Guide',
    slug: { current: 'board-governance-guide' },
    description: 'Essential guide for LGBTQ+ organizations on effective board governance, responsibilities, and best practices.',
    category: { _type: 'reference', _ref: 'cat-4' },
    contentType: 'pdf',
    price: 28,
    tags: ['governance', 'board', 'leadership', 'guide'],
    viewCount: 198,
    publishedAt: new Date('2024-01-19').toISOString()
  },

  // Advocacy Tools
  {
    _type: 'contentItem',
    title: 'Policy Brief Template',
    slug: { current: 'policy-brief-template' },
    description: 'Professional template for creating compelling policy briefs on LGBTQ+ issues for lawmakers and stakeholders.',
    category: { _type: 'reference', _ref: 'cat-5' },
    contentType: 'template',
    price: 18,
    tags: ['policy', 'advocacy', 'government', 'template'],
    viewCount: 423,
    publishedAt: new Date('2024-01-11').toISOString()
  },
  {
    _type: 'contentItem',
    title: 'Media Relations Toolkit',
    slug: { current: 'media-relations-toolkit' },
    description: 'Everything you need to build effective media relationships and get your LGBTQ+ organization\'s message heard.',
    category: { _type: 'reference', _ref: 'cat-5' },
    contentType: 'resource',
    price: 32,
    isFeatured: true,
    tags: ['media', 'PR', 'communications', 'toolkit'],
    viewCount: 345,
    publishedAt: new Date('2024-01-17').toISOString()
  },
  {
    _type: 'contentItem',
    title: 'Community Survey Templates',
    slug: { current: 'community-survey-templates' },
    description: 'Ready-to-use survey templates for gathering community feedback and data on LGBTQ+ issues and needs.',
    category: { _type: 'reference', _ref: 'cat-5' },
    contentType: 'template',
    price: 15,
    tags: ['survey', 'research', 'data', 'template'],
    viewCount: 267,
    publishedAt: new Date('2024-01-23').toISOString()
  }
]

async function seedData() {
  console.log('🌱 Starting to seed Sanity with demo content...\n')

  try {
    // Create categories
    console.log('📁 Creating categories...')
    for (const category of categories) {
      try {
        await client.createOrReplace(category)
        console.log(`✅ Created category: ${category.title}`)
      } catch (error) {
        console.log(`⚠️ Error creating category ${category.title}:`, error)
      }
    }

    console.log('\n📚 Creating content items...')
    for (const item of contentItems) {
      try {
        await client.create(item)
        console.log(`✅ Created content: ${item.title}`)
      } catch (error) {
        console.log(`⚠️ Error creating content ${item.title}:`, error)
      }
    }

    console.log('\n🎉 Demo content successfully added to Sanity!')
    console.log('\n📝 Summary:')
    console.log(`- ${categories.length} categories created`)
    console.log(`- ${contentItems.length} content items created`)
    console.log('\nYou can now view this content in:')
    console.log('- Sanity Studio: http://localhost:3003/studio')
    console.log('- Your application: http://localhost:3003/library')

  } catch (error) {
    console.error('❌ Error seeding data:', error)
    process.exit(1)
  }
}

// Run the seed function
seedData()