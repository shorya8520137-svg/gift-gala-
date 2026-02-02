'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Heart, ShoppingCart, Star, Minus, Plus, ArrowLeft, Share2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { api, Product } from '../../../lib/api'

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    if (params.id) {
      loadProduct()
    }
  }, [params.id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const response = await api.getProduct(params.id as string)
      setProduct(response.data || null)
    } catch (error) {
      console.error('Failed to load product:', error)
      setError('Failed to load product details')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!product) return
    
    try {
      // For now, just show success message
      // In real implementation, you would call the API with authentication
      alert('Product added to cart!')
    } catch (error) {
      console.error('Failed to add to cart:', error)
      alert('Failed to add to cart. Please try again.')
    }
  }

  const handleBuyNow = () => {
    if (!product) return
    
    // Navigate to checkout with this product
    router.push(`/checkout?product=${product.id}&quantity=${quantity}`)
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    // In real implementation, you would call the API to add/remove from wishlist
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading product details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <p className="text-red-400 mb-4">{error || 'Product not found'}</p>
            <Link href="/products" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const images = product.additional_images && product.additional_images.length > 0 
    ? [product.image_url, ...product.additional_images].filter(Boolean)
    : [product.image_url].filter(Boolean)

  const finalPrice = product.offer_price && Number(product.offer_price) < Number(product.price) ? Number(product.offer_price) : Number(product.price)

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={images[selectedImage] || '/images/placeholder.svg'}
                alt={product.product_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/images/placeholder.svg'
                }}
              />
            </div>
            
            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-600'
                    }`}
                  >
                    <img
                      src={image || '/images/placeholder.svg'}
                      alt={`${product.product_name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/images/placeholder.svg'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            
            {/* Product Title and Category */}
            <div>
              {product.category_name && (
                <Link 
                  href={`/products?category=${product.category_slug}`}
                  className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  {product.category_name}
                </Link>
              )}
              <h1 className="text-3xl font-bold text-white mt-2">{product.product_name}</h1>
              {product.sku && (
                <p className="text-gray-400 text-sm mt-1">SKU: {product.sku}</p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                {product.offer_price && Number(product.offer_price) < Number(product.price) ? (
                  <>
                    <span className="text-gray-400 line-through text-xl">${Number(product.price || 0).toFixed(2)}</span>
                    <span className="text-white font-bold text-3xl">${Number(product.offer_price || 0).toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-white font-bold text-3xl">${Number(product.price || 0).toFixed(2)}</span>
                )}
              </div>
              {product.discount_percentage > 0 && (
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{Math.round(product.discount_percentage)}% OFF
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.stock_quantity > 0 ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-400">In Stock ({product.stock_quantity} available)</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-400">Out of Stock</span>
                </>
              )}
              {product.stock_quantity <= product.min_stock_level && product.stock_quantity > 0 && (
                <span className="text-orange-400 ml-2">Low Stock!</span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-white font-semibold mb-2">Description</h3>
              <p className="text-gray-300 leading-relaxed">
                {product.description || product.short_description}
              </p>
            </div>

            {/* Product Variants */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3">Options</h3>
                <div className="space-y-3">
                  {product.variants.map((variant) => (
                    <div key={variant.id} className="flex items-center justify-between">
                      <span className="text-gray-300">{variant.variant_name}: {variant.variant_value}</span>
                      {variant.price_adjustment !== 0 && (
                        <span className="text-blue-400">
                          {variant.price_adjustment > 0 ? '+' : ''}${variant.price_adjustment.toFixed(2)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Attributes */}
            {product.attributes && Object.keys(product.attributes).length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-400 capitalize">{key.replace('_', ' ')}:</span>
                      <span className="text-white">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <h3 className="text-white font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 text-white font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    disabled={quantity >= product.stock_quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-gray-400">
                  Total: ${(finalPrice * quantity).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
              
              <button
                onClick={handleBuyNow}
                disabled={product.stock_quantity === 0}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
              
              <button
                onClick={handleWishlist}
                className={`p-3 rounded-lg border transition-colors ${
                  isWishlisted 
                    ? 'bg-red-600 border-red-600 text-white' 
                    : 'border-gray-600 text-gray-400 hover:text-red-500 hover:border-red-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              
              <button className="p-3 border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 rounded-lg transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {/* Additional Product Info */}
            <div className="border-t border-gray-700 pt-6 space-y-4">
              {product.weight && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Weight:</span>
                  <span className="text-white">{product.weight} kg</span>
                </div>
              )}
              {product.dimensions && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Dimensions:</span>
                  <span className="text-white">{product.dimensions}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Added:</span>
                <span className="text-white">{new Date(product.created_at).toLocaleDateString()}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}