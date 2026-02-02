'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Search, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setIsSearchOpen(false) // Close search when menu opens
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    setIsMenuOpen(false) // Close menu when search opens
  }

  return (
    <>
      <nav className="bg-gray-900 shadow-lg border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 mx-2 sm:mx-0">
              <Image
                src="/images/icons/logo.svg"
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-8 sm:h-10 sm:w-10 filter invert"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8 ml-8">
              <Link href="/" className="text-white hover:text-blue-400 transition-colors font-medium">
                Home
              </Link>
              <Link href="/products" className="text-white hover:text-blue-400 transition-colors font-medium">
                Products
              </Link>
              <Link href="/about" className="text-white hover:text-blue-400 transition-colors font-medium">
                About
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-6 xl:mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 xl:h-5 xl:w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="block w-full pl-9 xl:pl-10 pr-3 py-2 xl:py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
              
              {/* Mobile Search Button */}
              <button
                onClick={toggleSearch}
                className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Search className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </button>

              {/* User Account */}
              <Link href="/account" className="p-1.5 sm:p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Image
                  src="/images/icons/user.png"
                  alt="Account"
                  width={20}
                  height={20}
                  className="h-5 w-5 sm:h-6 sm:w-6 filter invert"
                />
              </Link>

              {/* Favorites - Hidden on very small screens */}
              <Link href="/favorites" className="hidden xs:block p-1.5 sm:p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Image
                  src="/images/icons/favourite.png"
                  alt="Favorites"
                  width={20}
                  height={20}
                  className="h-5 w-5 sm:h-6 sm:w-6 filter invert"
                />
              </Link>

              {/* Shopping Cart */}
              <Link href="/cart" className="p-1.5 sm:p-2 hover:bg-gray-800 rounded-lg transition-colors relative">
                <Image
                  src="/images/icons/shopping-bag.png"
                  alt="Cart"
                  width={20}
                  height={20}
                  className="h-5 w-5 sm:h-6 sm:w-6 filter invert"
                />
                {/* Cart Badge */}
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium text-[10px] sm:text-xs">
                  2
                </span>
              </Link>

            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden pb-3 px-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="block w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-lg"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-14 sm:top-16 bg-black bg-opacity-60 z-40">
            <div className="bg-gray-900 w-full max-w-xs sm:max-w-sm h-full shadow-2xl animate-slide-in border-r border-gray-800">
              <div className="p-4 sm:p-6">
                
                {/* User Profile Section */}
                <div className="flex items-center pb-4 sm:pb-6 border-b border-gray-800">
                  <div className="bg-gray-800 p-2 rounded-full">
                    <Image
                      src="/images/icons/user.png"
                      alt="Profile"
                      width={24}
                      height={24}
                      className="h-6 w-6 sm:h-8 sm:w-8 filter invert"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-base sm:text-lg font-medium text-white">Welcome!</p>
                    <p className="text-xs sm:text-sm text-gray-400">Sign in to your account</p>
                  </div>
                </div>

                {/* Mobile Menu Items */}
                <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
                  
                  {/* Navigation Links */}
                  <div className="space-y-1">
                    <Link 
                      href="/" 
                      className="flex items-center py-3 sm:py-4 px-3 text-white hover:bg-gray-800 rounded-lg transition-colors text-base sm:text-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-3 text-lg sm:text-xl">🏠</span>
                      Home
                    </Link>
                    
                    <Link 
                      href="/products" 
                      className="flex items-center py-3 sm:py-4 px-3 text-white hover:bg-gray-800 rounded-lg transition-colors text-base sm:text-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-3 text-lg sm:text-xl">🛍️</span>
                      All Products
                    </Link>

                    <Link 
                      href="/about" 
                      className="flex items-center py-3 sm:py-4 px-3 text-white hover:bg-gray-800 rounded-lg transition-colors text-base sm:text-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-3 text-lg sm:text-xl">ℹ️</span>
                      About Us
                    </Link>

                    <Link 
                      href="/favorites" 
                      className="flex items-center py-3 sm:py-4 px-3 text-white hover:bg-gray-800 rounded-lg transition-colors text-base sm:text-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Image
                        src="/images/icons/favourite.png"
                        alt="Favorites"
                        width={18}
                        height={18}
                        className="h-4 w-4 sm:h-5 sm:w-5 mr-3 filter invert"
                      />
                      Favorites
                    </Link>

                    <Link 
                      href="/cart" 
                      className="flex items-center py-3 sm:py-4 px-3 text-white hover:bg-gray-800 rounded-lg transition-colors text-base sm:text-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Image
                        src="/images/icons/shopping-bag.png"
                        alt="Cart"
                        width={18}
                        height={18}
                        className="h-4 w-4 sm:h-5 sm:w-5 mr-3 filter invert"
                      />
                      Shopping Cart
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center font-medium">
                        2
                      </span>
                    </Link>

                    <Link 
                      href="/account" 
                      className="flex items-center py-3 sm:py-4 px-3 text-white hover:bg-gray-800 rounded-lg transition-colors text-base sm:text-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Image
                        src="/images/icons/user.png"
                        alt="Account"
                        width={18}
                        height={18}
                        className="h-4 w-4 sm:h-5 sm:w-5 mr-3 filter invert"
                      />
                      My Account
                    </Link>
                  </div>

                  {/* Categories Section */}
                  <div className="border-t border-gray-800 pt-4 sm:pt-6">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 sm:mb-4 px-3">
                      Shop by Category
                    </h3>
                    <div className="space-y-1">
                      <Link 
                        href="/products?category=tumbler" 
                        className="flex items-center py-2.5 sm:py-3 px-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors text-sm sm:text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="mr-3 text-base sm:text-lg">🥤</span>
                        Tumbler
                      </Link>
                      <Link 
                        href="/products?category=framers" 
                        className="flex items-center py-2.5 sm:py-3 px-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors text-sm sm:text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="mr-3 text-base sm:text-lg">🖼️</span>
                        Framers
                      </Link>
                      <Link 
                        href="/products?category=table-accessories" 
                        className="flex items-center py-2.5 sm:py-3 px-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors text-sm sm:text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="mr-3 text-base sm:text-lg">🍽️</span>
                        Table Accessories
                      </Link>
                      <Link 
                        href="/products?category=men-jewellery" 
                        className="flex items-center py-2.5 sm:py-3 px-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors text-sm sm:text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="mr-3 text-base sm:text-lg">💍</span>
                        Men Jewellery
                      </Link>
                      <Link 
                        href="/products?category=valentine" 
                        className="flex items-center py-2.5 sm:py-3 px-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors text-sm sm:text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="mr-3 text-base sm:text-lg">💝</span>
                        Valentine Special
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}