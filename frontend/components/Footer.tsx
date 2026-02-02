import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Partners Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <h3 className="text-2xl font-bold text-center mb-8">Our Partners</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            
            {/* F&P Partner */}
            <div className="bg-gray-900 rounded-lg p-6 text-center hover:bg-gray-800 transition-colors">
              <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">F&P</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">F&P</h4>
              <p className="text-gray-400 text-sm">Premium quality partner for exceptional products</p>
            </div>

            {/* BMW Partner */}
            <div className="bg-gray-900 rounded-lg p-6 text-center hover:bg-gray-800 transition-colors">
              <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-lg font-bold text-white">BMW</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">BMW</h4>
              <p className="text-gray-400 text-sm">Luxury automotive excellence and innovation</p>
            </div>

            {/* Twist and Spin Partner */}
            <div className="bg-gray-900 rounded-lg p-6 text-center hover:bg-gray-800 transition-colors">
              <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-sm font-bold text-white">T&S</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Twist and Spin</h4>
              <p className="text-gray-400 text-sm">Creative design solutions and unique products</p>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">E-Store</h3>
            <p className="text-gray-300 mb-4">
              Your trusted online destination for quality products across multiple categories. 
              We deliver excellence with every purchase.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-blue-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-pink-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://youtube.com" className="text-gray-300 hover:text-red-500 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/cart" className="text-gray-300 hover:text-white transition-colors">Cart</Link></li>
              <li><Link href="/favorites" className="text-gray-300 hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/products?category=tumbler" className="text-gray-300 hover:text-white transition-colors">Tumblers</Link></li>
              <li><Link href="/products?category=bracelet" className="text-gray-300 hover:text-white transition-colors">Bracelets</Link></li>
              <li><Link href="/products?category=frame" className="text-gray-300 hover:text-white transition-colors">Frames</Link></li>
              <li><Link href="/products?category=valentine" className="text-gray-300 hover:text-white transition-colors">Valentine Special</Link></li>
              <li><Link href="/products?category=accessories" className="text-gray-300 hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">123 E-Store Street, Shopping District, City 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">support@estore.com</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2026 E-Store. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link href="/shipping" className="text-gray-400 hover:text-white text-sm transition-colors">Shipping Info</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}