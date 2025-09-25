import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mt-20 bg-forest text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h4 className="text-xl font-bold mb-4 text-beige">Q+ Collective</h4>
            <p className="text-beige-light mb-4">
              Empowering LGBTQ+ leaders through education, resources, and community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-beige transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-beige transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-beige transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-beige transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-xl font-bold mb-4 text-beige">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-beige-light hover:text-beige transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/library" className="text-beige-light hover:text-beige transition-colors">
                  Library
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-beige-light hover:text-beige transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-beige-light hover:text-beige transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-beige-light hover:text-beige transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="text-xl font-bold mb-4 text-beige">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-beige-light hover:text-beige transition-colors">
                  Leadership Training
                </Link>
              </li>
              <li>
                <Link href="#" className="text-beige-light hover:text-beige transition-colors">
                  Diversity Workshops
                </Link>
              </li>
              <li>
                <Link href="#" className="text-beige-light hover:text-beige transition-colors">
                  Community Events
                </Link>
              </li>
              <li>
                <Link href="#" className="text-beige-light hover:text-beige transition-colors">
                  Support Groups
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="text-xl font-bold mb-4 text-beige">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 text-beige" />
                <span className="text-beige-light">hello@qpluscollective.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 text-beige" />
                <span className="text-beige-light">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-beige" />
                <span className="text-beige-light">San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-beige-dark">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-bold mb-4 text-beige">Stay Connected</h4>
            <p className="text-beige-light mb-4">
              Subscribe to our newsletter for the latest resources and community updates
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-black"
              />
              <Button type="submit" className="bg-beige text-forest hover:bg-beige-light">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-beige-dark text-center">
          <p className="text-beige-light">
            &copy; {new Date().getFullYear()} Q+ Collective. All rights reserved.
          </p>
          <div className="mt-2 space-x-4">
            <Link href="#" className="text-beige-light hover:text-beige transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-beige-light hover:text-beige transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-beige-light hover:text-beige transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}