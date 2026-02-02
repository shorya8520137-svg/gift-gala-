'use client'

import { useState } from 'react'
import { User, Package, Heart, MapPin, Edit3, Calendar, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export default function AccountPage() {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2024-01-15',
    totalOrders: 12,
    totalSpent: 1249.99,
    wishlistItems: 8
  })

  const recentOrders = [
    {
      id: 1,
      orderNumber: 'ORD-ABC123456',
      date: '2025-01-20',
      status: 'delivered',
      total: 140.39,
      items: 1
    },
    {
      id: 2,
      orderNumber: 'ORD-DEF789012',
      date: '2025-01-18',
      status: 'shipped',
      total: 97.18,
      items: 2
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-400 bg-green-400/10'
      case 'shipped':
        return 'text-purple-400 bg-purple-400/10'
      case 'processing':
        return 'text-blue-400 bg-blue-400/10'
      default:
        return 'text-gray-400 bg-gray-400/10'
    }
  }

  return (
    <div className="space-y-8">
      
      {/* Welcome Section */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome back, {user.name}!</h1>
            <p className="text-gray-400">Manage your account and track your orders</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Account Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Orders</p>
              <p className="text-white text-2xl font-bold">{user.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-600 p-3 rounded-lg">
              <span className="text-white text-xl font-bold">$</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Spent</p>
              <p className="text-white text-2xl font-bold">${user.totalSpent.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-600 p-3 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Wishlist Items</p>
              <p className="text-white text-2xl font-bold">{user.wishlistItems}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-gray-400 text-sm">Full Name</p>
                <p className="text-white">{user.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-gray-400 text-sm">Email Address</p>
                <p className="text-white">{user.email}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-gray-400 text-sm">Phone Number</p>
                <p className="text-white">{user.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-gray-400 text-sm">Member Since</p>
                <p className="text-white">{new Date(user.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
          <Link 
            href="/account/orders"
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            View All Orders
          </Link>
        </div>
        
        {recentOrders.length === 0 ? (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No orders yet</p>
            <Link 
              href="/products"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Order #{order.orderNumber}</h3>
                    <p className="text-gray-400 text-sm">
                      {new Date(order.date).toLocaleDateString()} • {order.items} item{order.items > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">${order.total.toFixed(2)}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link 
          href="/account/orders"
          className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors group"
        >
          <Package className="h-8 w-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-medium mb-1">My Orders</h3>
          <p className="text-gray-400 text-sm">Track your orders</p>
        </Link>
        
        <Link 
          href="/account/wishlist"
          className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors group"
        >
          <Heart className="h-8 w-8 text-red-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-medium mb-1">Wishlist</h3>
          <p className="text-gray-400 text-sm">Saved items</p>
        </Link>
        
        <Link 
          href="/account/addresses"
          className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors group"
        >
          <MapPin className="h-8 w-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-medium mb-1">Addresses</h3>
          <p className="text-gray-400 text-sm">Manage addresses</p>
        </Link>
        
        <Link 
          href="/products"
          className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors group"
        >
          <span className="text-2xl mb-3 block group-hover:scale-110 transition-transform">🛍️</span>
          <h3 className="text-white font-medium mb-1">Shop Now</h3>
          <p className="text-gray-400 text-sm">Browse products</p>
        </Link>
      </div>
    </div>
  )
}