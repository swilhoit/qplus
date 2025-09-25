import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import crypto from 'crypto'

// Temporary storage for download tokens (in production, use Redis or database)
const downloadTokens = new Map<string, { userId: string; contentId: string; expires: number }>()

// Generate secure download token
export async function POST(request: NextRequest) {
  try {
    const { userId, contentId } = await request.json()

    if (!userId || !contentId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Verify user has access to this content
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const userData = userDoc.data()
    const hasSubscription = userData.subscriptionStatus === 'active'
    const hasPurchased = userData.purchasedContent?.includes(contentId)
    const hasFreeAccess = userData.freeAccess

    if (!hasSubscription && !hasPurchased && !hasFreeAccess) {
      return NextResponse.json(
        { error: 'Access denied. Purchase required.' },
        { status: 403 }
      )
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex')
    const expires = Date.now() + (15 * 60 * 1000) // 15 minutes

    // Store token
    downloadTokens.set(token, { userId, contentId, expires })

    // Clean up expired tokens
    for (const [key, value] of downloadTokens.entries()) {
      if (value.expires < Date.now()) {
        downloadTokens.delete(key)
      }
    }

    // Generate download URL
    const downloadUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/download/${token}`

    // Log download request for analytics
    // TODO: Update content view count in Sanity

    return NextResponse.json({
      success: true,
      downloadUrl,
      expiresIn: 900, // 15 minutes in seconds
    })
  } catch (error: any) {
    console.error('Download token generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate download link' },
      { status: 500 }
    )
  }
}

// Handle actual file download
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const token = url.pathname.split('/').pop()

    if (!token) {
      return NextResponse.json(
        { error: 'Invalid download link' },
        { status: 400 }
      )
    }

    // Verify token
    const tokenData = downloadTokens.get(token)

    if (!tokenData) {
      return NextResponse.json(
        { error: 'Invalid or expired download link' },
        { status: 403 }
      )
    }

    if (tokenData.expires < Date.now()) {
      downloadTokens.delete(token)
      return NextResponse.json(
        { error: 'Download link has expired' },
        { status: 403 }
      )
    }

    // Get content details from Sanity
    // TODO: Fetch actual file URL from Sanity based on contentId
    const { contentId } = tokenData

    // For demo purposes, we'll simulate file serving
    // In production, you would:
    // 1. Fetch the actual file URL from Sanity/storage
    // 2. Either proxy the file or redirect to a signed URL

    // Example response for a PDF file
    const mockFileContent = Buffer.from('Mock PDF content for demo purposes')

    // Delete token after single use
    downloadTokens.delete(token)

    // Return file with appropriate headers
    return new NextResponse(mockFileContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="resource-${contentId}.pdf"`,
        'Content-Length': mockFileContent.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error: any) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    )
  }
}