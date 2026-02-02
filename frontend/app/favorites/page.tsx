'use client'

import { useState } from 'react'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([
    { id: 1, name: 'Desert Tumbler', price: 24.99, image: '/images/products/tumbler/desert.png', description: 'Desert-themed design' },
    { id: 2, name: 'Gold Bracelet', price: 89.99, image: '/images/products/menjewl/Copilot_20260131_112137.png', description: 'Engrave your love\'s name' },
    { id: 3, name: 'Elegant Frame', price: 48.99, image: '/images/products/framers/ChatGPT Image Jan 31, 2026, 06_43_50 PM.png', description: 'Sophisticated design' },
    { id: 4, name: 'Travel Tumbler', price: 19.99, image: '/images/products/tumbler/Copilot_20260131_111159.png', description: 'Perfect for on-the-go' },
  ])

  const removeFromFavorites = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id))
  }

  const addToCart = (id: number) => {
    // Add to cart logic here
    console.log('Added to cart:', id)
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-400 mb-8">Save items you love to your wishlist!</p>
            <a 
              href="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">My Wishlist</h1>
          <p className="text-gray-300">Items you've saved for later ({favorites.length})</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Remove from Favorites */}
                <button 
                  onClick={() => removeFromFavorites(item.id)}
                  className="absolute top-3 right-3 p-2 bg-red-500 bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
                >
                  <Heart className="w-4 h-4 text-white fill-current" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1">{item.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold text-lg">${item.price}</span>
                  <button 
                    onClick={() => addToCart(item.id)}
                    className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="text-center mt-12">
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Add All to Cart
            </button>
            <button 
              onClick={() => setFavorites([])}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Clear Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}