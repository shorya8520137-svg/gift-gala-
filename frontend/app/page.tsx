'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import FeaturedProductsSlider from '../components/FeaturedProductsSlider'
import { api, Category } from '../lib/api'

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [categories, setCategories] = useState<Category[]>([])
  
  const slides = [
    {
      image: '/images/products/P1140020.JPG',
      title: 'Handcrafted Collection',
      quote: 'Quality is not an act, it is a habit.',
      author: 'Aristotle'
    },
    {
      image: '/images/products/P1140053.JPG',
      title: 'Exclusive Design',
      quote: 'Every moment is a fresh beginning.',
      author: 'T.S. Eliot'
    },
    {
      image: '/images/PixelBin-AI-Editor-1769794034459.png',
      title: 'Limited Edition',
      quote: 'Simplicity is the ultimate sophistication.',
      author: 'Leonardo da Vinci'
    },
    {
      image: '/images/tumbler.png',
      title: 'Custom Tumblers',
      quote: 'Where Hydration Meets Personalization',
      author: 'E-Store Collection'
    }
  ]

  // Load categories on component mount
  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const response = await api.getCategories()
      setCategories(response.data || [])
    } catch (error) {
      console.error('Failed to load categories:', error)
      // Fallback to static categories if API fails
      setCategories([
        { id: 1, name: 'Tumbler', slug: 'tumbler', image_url: '/images/tumbler-cat.png', description: 'Custom tumblers', sort_order: 1, is_active: true, created_at: '', updated_at: '', product_count: 0 },
        { id: 2, name: 'Framers', slug: 'framers', image_url: '/images/frame.png', description: 'Picture frames', sort_order: 2, is_active: true, created_at: '', updated_at: '', product_count: 0 },
        { id: 3, name: 'Men Jewellery', slug: 'men-jewellery', image_url: '/images/menjellwary.png', description: 'Men\'s jewelry', sort_order: 3, is_active: true, created_at: '', updated_at: '', product_count: 0 }
      ])
    }
  }

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen">
      {/* Full-Frame Banner Slider */}
      <section className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-2xl mb-8">
        
        {/* Slider Images */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            
            {/* No text overlay - just clean image */}
          </div>
        ))}

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white rounded-full transition-all duration-200 z-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white rounded-full transition-all duration-200 z-10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>

      </section>

      {/* Welcome Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Welcome to E-Store
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our curated collection of premium products across multiple categories. 
            Quality, style, and elegance in every piece.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
          
          {categories.length > 0 ? (
            categories.slice(0, 3).map((category) => (
              <Link key={category.id} href={`/products?category=${category.slug}`}>
                <div className="text-center hover:transform hover:scale-105 transition-transform cursor-pointer">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden bg-white shadow-lg">
                    <img
                      src={category.image_url || `/images/${category.slug}-cat.png`}
                      alt={`${category.name} Category`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/images/placeholder.svg'
                      }}
                    />
                  </div>
                  <h3 className="text-white font-medium text-lg">{category.name}</h3>
                </div>
              </Link>
            ))
          ) : (
            // Fallback static categories
            <>
              <Link href="/products?category=tumbler">
                <div className="text-center hover:transform hover:scale-105 transition-transform cursor-pointer">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden bg-white shadow-lg">
                    <img
                      src="/images/tumbler-cat.png"
                      alt="Tumbler Category"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-white font-medium text-lg">Tumbler</h3>
                </div>
              </Link>

              <Link href="/products?category=framers">
                <div className="text-center hover:transform hover:scale-105 transition-transform cursor-pointer">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden bg-white shadow-lg">
                    <img
                      src="/images/frame.png"
                      alt="Frame Category"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-white font-medium text-lg">Framers</h3>
                </div>
              </Link>

              <Link href="/products?category=men-jewellery">
                <div className="text-center hover:transform hover:scale-105 transition-transform cursor-pointer">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden bg-white shadow-lg">
                    <img
                      src="/images/menjellwary.png"
                      alt="Men Jewellery Category"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-white font-medium text-lg">Men Jewellery</h3>
                </div>
              </Link>
            </>
          )}

        </div>
      </section>

      {/* Featured Products Slider */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Featured Products
          </h2>
          <p className="text-gray-300">Discover our most popular items</p>
        </div>

        <FeaturedProductsSlider />
      </section>

      {/* Self Customized Bracelets - Valentine Special */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Self Customized Bracelets
          </h2>
          <p className="text-gray-300 mb-2">Engrave Your Love One's Name</p>
          <p className="text-pink-400 font-semibold">💝 Make This Valentine Special 💝</p>
        </div>

        {/* Bracelet Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          
          {/* Gold Bracelet */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="aspect-square overflow-hidden relative">
              <Image
                src="/images/products/menjewl/Copilot_20260131_112137.png"
                alt="Gold Customized Bracelet"
                width={288}
                height={288}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Wishlist Icon */}
              <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                <svg className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              {/* Valentine Badge */}
              <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                Valentine Special
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1">Gold Bracelet</h3>
              <p className="text-gray-400 text-sm mb-3">Engrave your love's name</p>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">$89.99</span>
                <button className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Black Bracelet */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="aspect-square overflow-hidden relative">
              <Image
                src="/images/products/menjewl/Copilot_20260131_112138.png"
                alt="Black Customized Bracelet"
                width={288}
                height={288}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Wishlist Icon */}
              <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                <svg className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              {/* Valentine Badge */}
              <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                Valentine Special
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1">Black Bracelet</h3>
              <p className="text-gray-400 text-sm mb-3">Engrave your love's name</p>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">$79.99</span>
                <button className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Silver Bracelet */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="aspect-square overflow-hidden relative">
              <Image
                src="/images/products/menjewl/Copilot_20260131_153321.png"
                alt="Silver Customized Bracelet"
                width={288}
                height={288}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Wishlist Icon */}
              <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                <svg className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              {/* Valentine Badge */}
              <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                Valentine Special
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1">Silver Bracelet</h3>
              <p className="text-gray-400 text-sm mb-3">Engrave your love's name</p>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">$69.99</span>
                <button className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Copper Bracelet */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="aspect-square overflow-hidden relative">
              <Image
                src="/images/products/menjewl/Copilot_20260131_153331.png"
                alt="Copper Customized Bracelet"
                width={288}
                height={288}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Wishlist Icon */}
              <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                <svg className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              {/* Valentine Badge */}
              <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                Valentine Special
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1">Copper Bracelet</h3>
              <p className="text-gray-400 text-sm mb-3">Engrave your love's name</p>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">$59.99</span>
                <button className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Frame Collection Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Frame Collection
          </h2>
          <p className="text-gray-300">Capture Your Precious Moments</p>
        </div>

        {/* Frame Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          
          {/* Frame 1 - Modern Frame */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="aspect-square overflow-hidden relative">
              <img
                src="/images/products/framers/ChatGPT Image Jan 31, 2026, 06_40_52 PM.png"
                alt="Modern Frame"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Wishlist Icon */}
              <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                <svg className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1">Modern Frame</h3>
              <p className="text-gray-400 text-sm mb-3">Contemporary style</p>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">$52.99</span>
                <button className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Frame 3 - Elegant Frame */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="aspect-square overflow-hidden relative">
              <img
                src="/images/products/framers/ChatGPT Image Jan 31, 2026, 06_43_50 PM.png"
                alt="Elegant Frame"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Wishlist Icon */}
              <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                <svg className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1">Elegant Frame</h3>
              <p className="text-gray-400 text-sm mb-3">Sophisticated design</p>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">$48.99</span>
                <button className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Frame 4 - Artistic Frame */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="aspect-square overflow-hidden relative">
              <img
                src="/images/products/framers/ChatGPT Image Jan 31, 2026, 06_46_20 PM.png"
                alt="Artistic Frame"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Wishlist Icon */}
              <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                <svg className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1">Artistic Frame</h3>
              <p className="text-gray-400 text-sm mb-3">Creative expression</p>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">$55.99</span>
                <button className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Frame 5 - Designer Frame */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="aspect-square overflow-hidden relative">
              <img
                src="/images/products/framers/Copilot_20260131_182728.png"
                alt="Designer Frame"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Wishlist Icon */}
              <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                <svg className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1">Designer Frame</h3>
              <p className="text-gray-400 text-sm mb-3">Luxury collection</p>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">$62.99</span>
                <button className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* View All Frames Button */}
        <div className="text-center mt-8">
          <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            View All Frames
          </button>
        </div>
      </section>
    </div>
  )
}