'use client'

import { useState, useEffect } from 'react'
import { Package, Truck, CheckCircle, XCircle, Clock, Eye } from 'lucide-react'
import Link from 'next/link'
import { api, Order } from '../../../lib/api'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState('all')

  useEffect(() => {
    loadOrders()
  }, [selectedStatus])

  const loadOrders = async () => {
    try {
      setLoading(true)
      // Use the real API with integrated access token
      const response = await api.getOrders({ 
        status: selectedStatus === 'all' ? undefined : selectedStatus 
      })
      setOrders(response.data || [])
    } catch (error) {
      console.error('Failed to load orders:', error)
      setError('Failed to load orders')
      
      // Fallback to mock data if API fails
      setOrders([
        {
          id: 1,
          user_id: 1,
          order_number: 'ORD-ABC123456',
          total_amount: 129.99,
          tax_amount: 10.40,
          shipping_amount: 0,
          discount_amount: 0,
          final_amount: 140.39,
          status: 'delivered',
          payment_status: 'paid',
          payment_method: 'Credit Card',
          shipping_address: {
            full_name: 'John Doe',
            phone: '+1234567890',
            email: 'john@example.com',
            address_line_1: '123 Main St',
            city: 'New York',
            state: 'NY',
            postal_code: '10001',
            country: 'US'
          },
          billing_address: {
            full_name: 'John Doe',
            phone: '+1234567890',
            email: 'john@example.com',
            address_line_1: '123 Main St',
            city: 'New York',
            state: 'NY',
            postal_code: '10001',
            country: 'US'
          },
          items: [
            {
              id: 1,
              product_id: 1,
              product_name: 'Gaming Laptop Pro',
              product_image: '/images/placeholder.svg',
              quantity: 1,
              unit_price: 129.99,
              total_price: 129.99
            }
          ],
          created_at: '2025-01-15T10:00:00.000Z',
          updated_at: '2025-01-20T15:30:00.000Z',
          delivered_at: '2025-01-20T15:30:00.000Z',
          tracking_number: 'TRK123456789'
        },
        {
          id: 2,
          user_id: 1,
          order_number: 'ORD-DEF789012',
          total_amount: 89.99,
          tax_amount: 7.20,
          shipping_amount: 9.99,
          discount_amount: 10.00,
          final_amount: 97.18,
          status: 'shipped',
          payment_status: 'paid',
          payment_method: 'PayPal',
          shipping_address: {
            full_name: 'John Doe',
            phone: '+1234567890',
            email: 'john@example.com',
            address_line_1: '123 Main St',
            city: 'New York',
            state: 'NY',
            postal_code: '10001',
            country: 'US'
          },
          billing_address: {
            full_name: 'John Doe',
            phone: '+1234567890',
            email: 'john@example.com',
            address_line_1: '123 Main St',
            city: 'New York',
            state: 'NY',
            postal_code: '10001',
            country: 'US'
          },
          items: [
            {
              id: 2,
              product_id: 2,
              product_name: 'Custom Tumbler',
              product_image: '/images/placeholder.svg',
              quantity: 2,
              unit_price: 44.99,
              total_price: 89.98
            }
          ],
          created_at: '2025-01-10T14:30:00.000Z',
          updated_at: '2025-01-18T09:15:00.000Z',
          tracking_number: 'TRK987654321'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'confirmed':
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'cancelled':
      case 'refunded':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400'
      case 'confirmed':
      case 'processing':
        return 'text-blue-400'
      case 'shipped':
        return 'text-purple-400'
      case 'delivered':
        return 'text-green-400'
      case 'cancelled':
      case 'refunded':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your orders...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">My Orders</h1>
          <p className="text-gray-400">Track and manage your orders</p>
        </div>

        {/* Status Filter */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {error ? (
          <div className="text-center py-16">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={loadOrders}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Orders Found</h3>
            <p className="text-gray-400 mb-6">You haven't placed any orders yet.</p>
            <Link 
              href="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-800 rounded-lg p-6">
                
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Order #{order.order_number}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Placed on {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    {getStatusIcon(order.status)}
                    <span className={`font-medium capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.product_image || '/images/placeholder.svg'}
                        alt={item.product_name}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/images/placeholder.svg'
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{item.product_name}</h4>
                        <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                        <p className="text-white font-semibold">${item.total_price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <p className="text-gray-400 text-sm">
                        Payment: <span className="text-white">{order.payment_method}</span>
                      </p>
                      {order.tracking_number && (
                        <p className="text-gray-400 text-sm">
                          Tracking: <span className="text-blue-400">{order.tracking_number}</span>
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">Total</p>
                        <p className="text-white font-bold text-lg">${order.final_amount.toFixed(2)}</p>
                      </div>
                      <Link
                        href={`/account/orders/${order.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="flex flex-wrap gap-2">
                    {order.tracking_number && (
                      <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                        Track Package
                      </button>
                    )}
                    {order.status === 'delivered' && (
                      <button className="text-green-400 hover:text-green-300 text-sm transition-colors">
                        Leave Review
                      </button>
                    )}
                    {['pending', 'confirmed'].includes(order.status) && (
                      <button className="text-red-400 hover:text-red-300 text-sm transition-colors">
                        Cancel Order
                      </button>
                    )}
                    <button className="text-gray-400 hover:text-gray-300 text-sm transition-colors">
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}