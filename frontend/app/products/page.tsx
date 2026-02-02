'use client'

import { useState, useEffect } from 'react'
import { Heart, ShoppingCart, Filter } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { api, Product, Category } from '../../lib/api'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [pagination, setPagination] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Get category from URL parameters
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [searchParams])

  // Load categories on component mount
  useEffect(() => {
    loadCategories()
  }, [])

  // Load products when filters change
  useEffect(() => {
    loadProducts()
  }, [selectedCategory, priceRange, searchQuery, currentPage])

  const loadCategories = async () => {
    try {
      const response = await api.getCategories()
      setCategories(response.data || [])
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const loadProducts = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const params = {
        page: currentPage,
        limit: 12,
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(searchQuery && { search: searchQuery }),
        ...(priceRange === 'under-30' && { maxPrice: 30 }),
        ...(priceRange === '30-60' && { minPrice: 30, maxPrice: 60 }),
        ...(priceRange === 'over-60' && { minPrice: 60 }),
      }

      const response = await api.getProducts(params)
      setProducts(response.data || [])
      setPagination(response.pagination)
    } catch (error) {
      setError('Failed to load products. Please try again.')
      console.error('Failed to load products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    loadProducts()
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={loadProducts}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Products</h1>
          <p className="text-gray-300">Discover our amazing collection of quality products</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="h-5 w-5 text-white" />
            <h3 className="text-white font-semibold">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-white font-medium mb-2">Category</label>
              <select 
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name} ({category.product_count})
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-white font-medium mb-2">Price Range</label>
              <select 
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Prices</option>
                <option value="under-30">Under $30</option>
                <option value="30-60">$30 - $60</option>
                <option value="over-60">Over $60</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <Link href={`/product/${product.id}`}>
                <div className="aspect-square overflow-hidden relative cursor-pointer">
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
                  <button 
                    className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all z-10"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      // Handle wishlist functionality
                    }}
                  >
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                  </button>
                  {/* Discount Badge */}
                  {product.discount_percentage > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      -{Math.round(product.discount_percentage)}%
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-white font-semibold mb-1 hover:text-blue-400 transition-colors cursor-pointer">{product.product_name}</h3>
                </Link>
                <p className="text-gray-400 text-sm mb-3">{product.short_description || product.description?.substring(0, 50) + '...'}</p>
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
                  <button 
                    className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      // Handle add to cart functionality
                    }}
                  >
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

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              Previous
            </button>
            
            {[...Array(pagination.pages)].map((_, index) => {
              const page = index + 1
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              )
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.pages}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* No Products Found */}
        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products found matching your filters.</p>
          </div>
        )}

        {/* Results Info */}
        {pagination && (
          <div className="text-center mt-8">
            <p className="text-gray-400">
              Showing {((currentPage - 1) * pagination.limit) + 1} to {Math.min(currentPage * pagination.limit, pagination.total)} of {pagination.total} products
            </p>
          </div>
        )}
      </div>
    </div>
  )
}