'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from 'lucide-react'
import { api, Product } from '../lib/api'

export default function FeaturedProductsSlider() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true)
      const response = await api.getFeaturedProducts(8)
      setProducts(response.data || [])
    } catch (error) {
      console.error('Failed to load featured products:', error)
      setError('Failed to load featured products')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading featured products...</p>
      </div>
    )
  }

  if (error || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No featured products available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Left Navigation Arrow */}
      <button
        onClick={() => {
          const slider = document.getElementById('featured-slider');
          if (slider) {
            slider.scrollBy({ left: -300, behavior: 'smooth' });
          }
        }}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-all duration-200"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={() => {
          const slider = document.getElementById('featured-slider');
          if (slider) {
            slider.scrollBy({ left: 300, behavior: 'smooth' });
          }
        }}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-all duration-200"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Scrollable Product Container */}
      <div
        id="featured-slider"
        className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-none w-72 bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="aspect-square overflow-hidden relative">
              <img
                src={product.image_url || '/images/placeholder.svg'}
                alt={product.product_name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/images/placeholder.svg'
                }}
              />
              {/* Wishlist Icon */}
              <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
              </button>
              {/* Discount Badge */}
              {product.discount_percentage > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  -{Math.round(product.discount_percentage)}%
                </div>
              )}
              {/* Featured Badge */}
              <div className="absolute bottom-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                Featured
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1">{product.product_name}</h3>
              <p className="text-gray-400 text-sm mb-3">
                {product.short_description || product.description?.substring(0, 50) + '...'}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  {product.offer_price && Number(product.offer_price) < Number(product.price) ? (
                    <>
                      <span className="text-gray-400 line-through text-sm">${Number(product.price || 0).toFixed(2)}</span>
                      <span className="text-white font-bold text-lg">${Number(product.offer_price || 0).toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-white font-bold text-lg">${Number(product.price || 0).toFixed(2)}</span>
                  )}
                </div>
                <button className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </button>
              </div>
              {product.stock_quantity <= product.min_stock_level && (
                <p className="text-red-400 text-xs mt-2">Low Stock!</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View All Products Button */}
      <div className="text-center mt-8">
        <a 
          href="/products"
          className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
        >
          View All Products
        </a>
      </div>
    </div>
  )
}