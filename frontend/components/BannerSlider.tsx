'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const bannerData = [
  {
    id: 1,
    title: 'Premium Tumblers',
    quote: 'Quality is not an act, it is a habit.',
    author: 'Aristotle',
    category: 'Tumbler',
    bgColor: 'from-blue-600 to-purple-700'
  },
  {
    id: 2,
    title: 'Beautiful Frames',
    quote: 'Every moment is a fresh beginning.',
    author: 'T.S. Eliot',
    category: 'Framers',
    bgColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 3,
    title: 'Table Accessories',
    quote: 'Simplicity is the ultimate sophistication.',
    author: 'Leonardo da Vinci',
    category: 'Table Accessories',
    bgColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 4,
    title: 'Men\'s Jewelry',
    quote: 'Style is a way to say who you are without having to speak.',
    author: 'Rachel Zoe',
    category: 'Men Jewellery',
    bgColor: 'from-gray-700 to-gray-900'
  },
  {
    id: 5,
    title: 'Valentine Special',
    quote: 'Love is composed of a single soul inhabiting two bodies.',
    author: 'Aristotle',
    category: 'Valentine',
    bgColor: 'from-pink-600 to-red-700'
  }
]

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerData.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerData.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerData.length) % bannerData.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-2xl">
      
      {/* Main Slider */}
      <div className="relative w-full h-full">
        {bannerData.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor} opacity-90`} />

            {/* Content Grid */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Side - Text Content */}
                  <div className="text-center lg:text-left">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-white text-sm font-medium backdrop-blur-sm">
                        {banner.category}
                      </span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                      {banner.title}
                    </h1>
                    
                    <blockquote className="mb-6">
                      <p className="text-lg sm:text-xl lg:text-2xl text-white text-opacity-90 italic leading-relaxed mb-3">
                        "{banner.quote}"
                      </p>
                      <cite className="text-white text-opacity-70 text-base sm:text-lg font-medium">
                        — {banner.author}
                      </cite>
                    </blockquote>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                        Shop Now
                      </button>
                      <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>

                  {/* Right Side - Placeholder for Product Image */}
                  <div className="hidden lg:flex justify-center">
                    <div className="relative w-80 h-80 xl:w-96 xl:h-96">
                      <div className="absolute inset-0 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm shadow-2xl" />
                      <div className="absolute inset-4 rounded-xl overflow-hidden bg-white bg-opacity-20 flex items-center justify-center">
                        <div className="text-white text-opacity-70 text-center">
                          <div className="text-4xl mb-2">📦</div>
                          <p className="text-sm">Product Image</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-white scale-110' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 right-4 p-2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
      >
        {isAutoPlaying ? (
          <div className="h-4 w-4 flex items-center justify-center">
            <div className="w-1 h-3 bg-white mr-0.5"></div>
            <div className="w-1 h-3 bg-white"></div>
          </div>
        ) : (
          <div className="h-4 w-4 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"></div>
          </div>
        )}
      </button>

    </div>
  )
}