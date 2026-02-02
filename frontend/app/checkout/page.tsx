'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react'
import Link from 'next/link'
import { api, Product, ShippingAddress } from '../../lib/api'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  
  // Form states
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    full_name: '',
    phone: '',
    email: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US'
  })
  
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [sameAsBilling, setSameAsBilling] = useState(true)

  useEffect(() => {
    const productId = searchParams.get('product')
    const qty = searchParams.get('quantity')
    
    if (productId) {
      loadProduct(productId)
      if (qty) {
        setQuantity(parseInt(qty))
      }
    } else {
      // Redirect to cart if no product specified
      router.push('/cart')
    }
  }, [searchParams, router])

  const loadProduct = async (productId: string) => {
    try {
      setLoading(true)
      const response = await api.getProduct(productId)
      setProduct(response.data || null)
    } catch (error) {
      console.error('Failed to load product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateTotals = () => {
    if (!product) return { subtotal: 0, tax: 0, shipping: 0, total: 0 }
    
    const finalPrice = product.offer_price && Number(product.offer_price) < Number(product.price) ? Number(product.offer_price) : Number(product.price)
    const subtotal = finalPrice * quantity
    const tax = subtotal * 0.08 // 8% tax
    const shipping = subtotal > 50 ? 0 : 9.99 // Free shipping over $50
    const total = subtotal + tax + shipping
    
    return { subtotal, tax, shipping, total }
  }

  const handlePlaceOrder = async () => {
    if (!product) return
    
    // Validate required fields
    if (!shippingAddress.full_name || !shippingAddress.email || !shippingAddress.phone || 
        !shippingAddress.address_line_1 || !shippingAddress.city || !shippingAddress.state || 
        !shippingAddress.postal_code) {
      alert('Please fill in all required shipping information.')
      return
    }
    
    setProcessing(true)
    
    try {
      // Prepare order data for the real inventory API
      const orderData = {
        items: [{
          product_id: Number(product.id),
          quantity: quantity,
          variant_details: {} // Add any customization options here
        }],
        shipping_address: shippingAddress,
        billing_address: shippingAddress, // Use same as shipping for now
        payment_method: paymentMethod,
        coupon_code: undefined
      }
      
      // Call the real inventory API
      const response = await api.createOrder(orderData)
      
      if (response.success && response.data) {
        // Order successfully created in inventory system
        console.log('Order created successfully:', response.data)
        
        // Redirect to success page with order details
        const orderParams = new URLSearchParams({
          orderId: response.data.order_id.toString(),
          orderNumber: response.data.order_number,
          total: totals.total.toFixed(2)
        })
        
        router.push(`/order-success?${orderParams.toString()}`)
      } else {
        throw new Error(response.message || 'Failed to create order')
      }
      
    } catch (error) {
      console.error('Failed to place order:', error)
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Failed to place order. Please try again.'
      alert(`Order failed: ${errorMessage}`)
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading checkout...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <p className="text-red-400 mb-4">Product not found</p>
            <Link href="/products" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const totals = calculateTotals()
  const finalPrice = product.offer_price && product.offer_price < product.price ? product.offer_price : product.price

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-white">Checkout</h1>
          <div></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Shipping Information */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Shipping Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={shippingAddress.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={shippingAddress.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Address Line 1</label>
                  <input
                    type="text"
                    value={shippingAddress.address_line_1}
                    onChange={(e) => handleInputChange('address_line_1', e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Address Line 2 (Optional)</label>
                  <input
                    type="text"
                    value={shippingAddress.address_line_2}
                    onChange={(e) => handleInputChange('address_line_2', e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">State</label>
                  <input
                    type="text"
                    value={shippingAddress.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Postal Code</label>
                  <input
                    type="text"
                    value={shippingAddress.postal_code}
                    onChange={(e) => handleInputChange('postal_code', e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Country</label>
                  <select
                    value={shippingAddress.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-300">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-300">PayPal</span>
                  </label>
                </div>
                
                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 text-sm font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
              
              {/* Product Item */}
              <div className="flex gap-4 mb-6">
                <img
                  src={product.image_url || '/images/placeholder.svg'}
                  alt={product.product_name}
                  className="w-16 h-16 object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/images/placeholder.svg'
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-white font-medium">{product.product_name}</h3>
                  <p className="text-gray-400 text-sm">Quantity: {quantity}</p>
                  <p className="text-white font-semibold">${Number(finalPrice || 0).toFixed(2)} each</p>
                </div>
              </div>
              
              {/* Order Totals */}
              <div className="border-t border-gray-700 pt-4 space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>${totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax:</span>
                  <span>${totals.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping:</span>
                  <span>{totals.shipping === 0 ? 'Free' : `$${totals.shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total:</span>
                    <span>${totals.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Security Badge */}
              <div className="flex items-center justify-center mt-6 text-gray-400 text-sm">
                <Shield className="h-4 w-4 mr-2" />
                Secure checkout with SSL encryption
              </div>
              
              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={processing}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed mt-6"
              >
                {processing ? 'Processing...' : `Place Order - $${totals.total.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}