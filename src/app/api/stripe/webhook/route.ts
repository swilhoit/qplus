import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/firebase'
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature') as string

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      )
    }

    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      )
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      )
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutSession(session)
        break

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdate(subscription)
        break

      case 'customer.subscription.deleted':
        const cancelledSubscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCancellation(cancelledSubscription)
        break

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice
        await handleSuccessfulPayment(invoice)
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice
        await handleFailedPayment(failedInvoice)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutSession(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId
  if (!userId) {
    console.error('No userId in session metadata')
    return
  }

  const userRef = doc(db, 'users', userId)
  const userDoc = await getDoc(userRef)

  if (!userDoc.exists()) {
    // Create new user document
    await setDoc(userRef, {
      email: session.customer_email,
      stripeCustomerId: session.customer,
      createdAt: new Date().toISOString(),
    })
  }

  // Check if this was a subscription or one-time payment
  if (session.mode === 'subscription') {
    // Update user's subscription status
    await updateDoc(userRef, {
      subscriptionId: session.subscription,
      subscriptionStatus: 'active',
      subscriptionType: session.metadata?.subscriptionType || 'monthly',
      stripeCustomerId: session.customer,
      updatedAt: new Date().toISOString(),
    })

    // TODO: Send welcome email for new subscribers
  } else if (session.mode === 'payment') {
    // Handle one-time purchase
    const contentId = session.metadata?.contentId
    if (contentId) {
      const userData = userDoc.data()
      const purchasedContent = userData?.purchasedContent || []

      await updateDoc(userRef, {
        purchasedContent: [...new Set([...purchasedContent, contentId])],
        stripeCustomerId: session.customer,
        updatedAt: new Date().toISOString(),
      })

      // TODO: Send purchase confirmation email
    }
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId
  if (!userId) return

  const status = subscription.status
  let subscriptionType = 'monthly'

  // Determine subscription type based on price
  if (subscription.items.data.length > 0) {
    const priceId = subscription.items.data[0].price.id
    if (priceId === process.env.STRIPE_PRICE_ANNUAL) {
      subscriptionType = 'annual'
    }
  }

  await updateDoc(doc(db, 'users', userId), {
    subscriptionId: subscription.id,
    subscriptionStatus: status,
    subscriptionType,
    currentPeriodEnd: new Date((subscription as any).current_period_end * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  })
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId
  if (!userId) return

  await updateDoc(doc(db, 'users', userId), {
    subscriptionStatus: 'cancelled',
    subscriptionEndDate: new Date((subscription as any).current_period_end * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  })

  // TODO: Send cancellation confirmation email
}

async function handleSuccessfulPayment(invoice: Stripe.Invoice) {
  // Log successful payment
  console.log('Payment successful for invoice:', invoice.id)

  // TODO: Send payment receipt email
}

async function handleFailedPayment(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string

  // Find user by Stripe customer ID
  // TODO: Query Firestore for user with this stripeCustomerId

  // TODO: Send payment failure email
  console.log('Payment failed for invoice:', invoice.id)
}