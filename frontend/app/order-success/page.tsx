'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Package, Truck, CreditCard } from 'lucide-react'
import Link from 'next/link'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    orderNumber: '',
    total: '0.00'
  })

  useEffect(() => {
    // Get order details from URL parameters
    const orderId = searchParams.get('orderId') || ''
    const orderNumber = searchParams.get('orderNumber') || 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    const total = searchParams.get('total') || '0.00'
    
    setOrderDetails({
      orderId,
      orderNumber,
      total
    })
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        
        {/* Success Icon and Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-300 text-lg">
            Thank you for your purchase. Your order has been confirmed and will appear in the inventory dashboard for processing.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Order Details</h2>
          
          <div className="space-y-4">
            {orderDetails.orderId && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Order ID:</span>
                <span className="text-white font-semibold">#{orderDetails.orderId}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Order Number:</span>
              <span className="text-white font-semibold">{orderDetails.orderNumber}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Order Date:</span>
              <span className="text-white">{new Date().toLocaleDateString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Amount:</span>
              <span className="text-white font-semibold">${orderDetails.total}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Payment Status:</span>
              <span className="text-green-400 font-semibold">Completed</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Order Status:</span>
              <span className="text-blue-400 font-semibold">Pending</span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">What's Next?</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Payment Confirmed</h3>
                <p className="text-gray-400 text-sm">Your payment has been processed successfully.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Package className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Order Received</h3>
                <p className="text-gray-400 text-sm">Your order has been sent to the inventory system for processing.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                <Package className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Processing</h3>
                <p className="text-gray-400 text-sm">The admin will review and confirm your order in the inventory dashboard.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <Truck className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Shipping</h3>
                <p className="text-gray-400 text-sm">You'll receive a tracking number once your order ships.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Success Notice */}
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-8">
          <p className="text-green-300 text-sm">
            ✅ Your order has been successfully integrated with the inventory management system and will appear in the admin dashboard.
          </p>
        </div>

        {/* Email Confirmation */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-8">
          <p className="text-blue-300 text-sm">
            📧 A confirmation email will be sent to your email address with order details and tracking information.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/account/orders"
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            View My Orders
          </Link>
          
          <Link 
            href="/products"
            className="flex-1 bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors text-center"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Support */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Need help? Contact our support team for assistance with your order.
          </p>
        </div>
      </div>
    </div>
  )
}