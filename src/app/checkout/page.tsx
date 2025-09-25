"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getStripeJs } from '@/lib/stripe'
import Link from 'next/link'

const PRICE_IDS = {
  monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY || 'price_monthly',
  annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL || 'price_annual',
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') as 'monthly' | 'annual' | null
  const contentId = searchParams.get('content')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!plan && !contentId) {
      router.push('/pricing')
    }
  }, [plan, contentId, router])

  const handleCheckout = async () => {
    if (!user) {
      router.push('/login')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan ? PRICE_IDS[plan] : null,
          userId: user.uid,
          email: user.email,
          mode: plan ? 'subscription' : 'payment',
          contentId: contentId,
        }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        setError(error)
        return
      }

      // Redirect to Stripe Checkout
      const stripe = await getStripeJs()
      if (!stripe) {
        setError('Failed to load payment system')
        return
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (stripeError) {
        setError(stripeError.message || 'Payment failed')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!plan && !contentId) {
    return null
  }

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
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Complete Your Purchase</CardTitle>
            <CardDescription>
              {plan === 'monthly' && 'Monthly Subscription - $10/month'}
              {plan === 'annual' && 'Annual Subscription - $100/year'}
              {contentId && 'One-time purchase'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            {!user ? (
              <div className="text-center">
                <p className="mb-4">Please sign in to continue</p>
                <Button asChild className="w-full">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account:</span>
                    <span>{user.email}</span>
                  </div>
                  {plan && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plan:</span>
                        <span className="capitalize">{plan}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-600">Total:</span>
                        <span>{plan === 'monthly' ? '$10/month' : '$100/year'}</span>
                      </div>
                    </>
                  )}
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                </Button>

                <p className="text-xs text-center text-gray-600">
                  You will be redirected to Stripe for secure payment processing
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}