import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "@/components/Footer"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, Shield, Users, Sparkles, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-beige-dark bg-white fixed w-full top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/qplus_logo.svg"
              alt="Q+ Library"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/library" className="text-sm font-semibold text-black hover:text-forest transition-colors">
              Library
            </Link>
            <Link href="/pricing" className="text-sm font-semibold text-black hover:text-forest transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-semibold text-black hover:text-forest transition-colors">
              About
            </Link>
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 px-6 bg-beige-light">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-forest font-montserrat leading-tight">
                Q+ Library
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-montserrat">
                Talks, trainings, and tips from queer leaders building the future
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg">
                  <Link href="/library">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Explore the Library
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/pricing">
                    View Pricing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black font-montserrat mb-4">
                What's Inside
              </h2>
              <p className="text-lg text-gray-700 font-montserrat">
                Curated resources for community organizers and leaders
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-beige flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="h-8 w-8 text-forest" />
                  </div>
                  <CardTitle className="font-montserrat text-xl">Risk & Safety Resources</CardTitle>
                  <CardDescription className="mt-2">
                    Comprehensive guides and tools for creating safer spaces
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center"><span className="text-forest mr-2">•</span> Safety protocols</li>
                    <li className="flex items-center"><span className="text-forest mr-2">•</span> Risk assessment tools</li>
                    <li className="flex items-center"><span className="text-forest mr-2">•</span> Emergency planning guides</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-beige flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="h-8 w-8 text-forest" />
                  </div>
                  <CardTitle className="font-montserrat text-xl">Organizational Tools</CardTitle>
                  <CardDescription className="mt-2">
                    Ready-to-use resources for effective organizing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center"><span className="text-forest mr-2">•</span> Event planning templates</li>
                    <li className="flex items-center"><span className="text-forest mr-2">•</span> Communication frameworks</li>
                    <li className="flex items-center"><span className="text-forest mr-2">•</span> Budget spreadsheets</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-beige flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="h-8 w-8 text-forest" />
                  </div>
                  <CardTitle className="font-montserrat text-xl">The Collective Conversation</CardTitle>
                  <CardDescription className="mt-2">
                    Insights and discussions from community leaders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center"><span className="text-forest mr-2">•</span> Video interviews</li>
                    <li className="flex items-center"><span className="text-forest mr-2">•</span> Panel discussions</li>
                    <li className="flex items-center"><span className="text-forest mr-2">•</span> Community stories</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto max-w-4xl text-center">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Join Our Community
            </h3>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Get instant access to all resources with a subscription, or purchase individual items that matter most to you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary text-white hover:opacity-90 transition-opacity">
                <Link href="/pricing">View Pricing Plans</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/library">Browse Free Previews</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}