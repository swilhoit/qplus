import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Check, Sparkles } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Monthly Subscription",
      price: "$10",
      period: "/month",
      description: "Full access to all content",
      features: [
        "Unlimited access to all resources",
        "New content added weekly",
        "Download templates and guides",
        "Access to video trainings",
        "Community discussion access",
        "Cancel anytime"
      ],
      highlighted: false,
      cta: "Start Monthly",
      href: "/checkout?plan=monthly"
    },
    {
      name: "Annual Subscription",
      price: "$100",
      period: "/year",
      description: "Best value - save $20",
      features: [
        "Everything in Monthly",
        "Save 17% compared to monthly",
        "Priority access to new content",
        "Exclusive annual member resources",
        "Early access to events",
        "Annual member badge"
      ],
      highlighted: true,
      cta: "Start Annual",
      href: "/checkout?plan=annual"
    },
    {
      name: "One-Time Purchase",
      price: "$5-15",
      period: "/item",
      description: "Buy individual items",
      features: [
        "Purchase specific resources",
        "Lifetime access to purchased items",
        "Download purchased content",
        "No recurring fees",
        "Mix and match what you need",
        "Keep forever"
      ],
      highlighted: false,
      cta: "Browse Library",
      href: "/library"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-beige-dark bg-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/qplus_logo.svg"
              alt="Q+ Library"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <nav className="space-x-6">
            <Link href="/library" className="font-semibold text-black hover:text-forest transition-colors">Library</Link>
            <Link href="/pricing" className="font-semibold text-forest">Pricing</Link>
            <Link href="/login" className="font-semibold text-black hover:text-forest transition-colors">Login</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 bg-beige-light p-8 rounded-lg">
          <h1 className="text-5xl font-bold text-forest font-montserrat mb-4">Choose Your Access</h1>
          <p className="text-lg text-gray-700 font-montserrat max-w-2xl mx-auto">
            Get unlimited access with a subscription or purchase individual items as you need them
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${
                plan.highlighted
                  ? 'border-forest border-2 shadow-xl scale-105'
                  : 'hover:shadow-lg transition-all duration-300 border-beige-dark'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 font-montserrat">
                    <Sparkles className="h-3 w-3" />
                    BEST VALUE
                  </span>
                </div>
              )}

              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl font-montserrat">{plan.name}</CardTitle>
                <CardDescription className="font-montserrat">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-forest">{plan.price}</span>
                  <span className="text-gray-700 font-montserrat">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-forest shrink-0 mt-0.5" />
                      <span className="text-sm font-montserrat">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  asChild
                  className="w-full"
                  variant={plan.highlighted ? 'default' : 'outline'}
                  size="lg"
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Have a promo code?</h3>
          <p className="text-gray-600 mb-4">
            Enter your code at checkout to receive your discount
          </p>
        </div>

        <div className="mt-8 p-8 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-center">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div>
              <h4 className="font-semibold mb-2">Can I switch between plans?</h4>
              <p className="text-sm text-gray-600">
                Yes! You can upgrade or downgrade your subscription at any time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Is there a free trial?</h4>
              <p className="text-sm text-gray-600">
                Browse our library for free and see previews of all content before purchasing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">How do I access purchased content?</h4>
              <p className="text-sm text-gray-600">
                Log in to your account to access all your subscribed or purchased content.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Can I get a refund?</h4>
              <p className="text-sm text-gray-600">
                We offer a 7-day money-back guarantee for subscriptions.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}