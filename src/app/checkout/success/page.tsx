"use client"

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // Here you would verify the session and update user's subscription status
      // This would typically call an API endpoint to verify the payment
      setTimeout(() => setLoading(false), 1000)
    }
  }, [sessionId])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Q+ Library
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>
              Welcome to the Q+ Library community
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-gray-600">
              Your subscription is now active. You have full access to all content in the library.
            </p>

            <div className="space-y-3">
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href="/library">Browse Library</Link>
              </Button>
            </div>

            <p className="text-xs text-gray-500">
              You&apos;ll receive a confirmation email shortly with your receipt and account details.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  )
}