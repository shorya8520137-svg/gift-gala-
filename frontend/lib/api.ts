const API_BASE_URL = 'https://54.169.31.95:8443/api/website'
const ACCESS_TOKEN = 'wk_live_3c6930a44febffade97a5e1a00e4db23a0dc552e3bf8a55800c1f3fd1f03de37'

// Helper function to get authentication headers with multiple fallback options
const getAuthHeaders = (method = 'bearer') => {
  const baseHeaders = {
    'Content-Type': 'application/json'
  }
  
  switch (method) {
    case 'bearer':
      return {
        ...baseHeaders,
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    case 'apikey':
      return {
        ...baseHeaders,
        'X-API-Key': ACCESS_TOKEN
      }
    case 'token':
      return {
        ...baseHeaders,
        'Token': ACCESS_TOKEN
      }
    case 'auth-token':
      return {
        ...baseHeaders,
        'Auth-Token': ACCESS_TOKEN
      }
    case 'access-token':
      return {
        ...baseHeaders,
        'Access-Token': ACCESS_TOKEN
      }
    default:
      return baseHeaders
  }
}

// TypeScript interfaces based on API documentation
export interface Product {
  id: number
  product_name: string
  description: string
  short_description?: string
  price: number | string
  offer_price?: number | string
  image_url?: string
  additional_images?: string[]
  sku?: string
  stock_quantity: number
  min_stock_level: number
  weight?: number
  dimensions?: string
  is_active: boolean
  is_featured: boolean
  meta_title?: string
  meta_description?: string
  tags?: string[]
  attributes?: Record<string, any>
  created_at: string
  updated_at: string
  category_name?: string
  category_slug?: string
  final_price: number | string
  discount_percentage: number
  variants?: ProductVariant[]
}

export interface ProductVariant {
  id: number
  variant_name: string
  variant_value: string
  price_adjustment: number
  is_active: boolean
}

export interface Category {
  id: number
  name: string
  description?: string
  slug: string
  parent_id?: number
  sort_order: number
  image_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
  product_count: number
  parent_name?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface Order {
  id: number
  user_id: number
  order_number: string
  total_amount: number
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  final_amount: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method: string
  shipping_address: ShippingAddress
  billing_address: ShippingAddress
  items: OrderItem[]
  created_at: string
  updated_at: string
  delivered_at?: string
  tracking_number?: string
}

export interface OrderItem {
  id: number
  product_id: number
  product_name: string
  product_image: string
  quantity: number
  unit_price: number
  total_price: number
  variant_details?: Record<string, any>
}

export interface ShippingAddress {
  id?: number
  full_name: string
  phone: string
  email: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  postal_code: string
  country: string
  is_default?: boolean
}

export interface CartItem {
  id: number
  product_id: number
  product_name: string
  product_image: string
  price: number
  offer_price?: number
  quantity: number
  variant_details?: Record<string, any>
  stock_quantity: number
}

export interface Cart {
  id: number
  user_id: number
  items: CartItem[]
  total_items: number
  subtotal: number
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  total_amount: number
  updated_at: string
}

// Types for API parameters
interface ProductParams {
  page?: number
  limit?: number
  search?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  featured?: boolean
  active?: boolean
  sortBy?: 'product_name' | 'price' | 'created_at' | 'stock_quantity'
  sortOrder?: 'ASC' | 'DESC'
}

interface CreateProductData {
  product_name: string
  description?: string
  short_description?: string
  price: number
  offer_price?: number
  image_url?: string
  additional_images?: string[]
  category_id: number
  sku?: string
  stock_quantity?: number
  min_stock_level?: number
  weight?: number
  dimensions?: string
  is_active?: boolean
  is_featured?: boolean
  meta_title?: string
  meta_description?: string
  tags?: string[]
  attributes?: Record<string, any>
}

export interface BulkUploadStatus {
  id: number
  filename: string
  total_rows: number
  processed_rows: number
  success_rows: number
  error_rows: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  started_at: string
  completed_at?: string
  error_log?: string
}

interface CreateCategoryData {
  name: string
  description?: string
  slug?: string
  parent_id?: number
  sort_order?: number
  image_url?: string
}

interface AddToCartData {
  product_id: number
  quantity: number
  variant_details?: Record<string, any>
}

interface CreateOrderData {
  items: Array<{
    product_id: number
    quantity: number
    variant_details?: Record<string, any>
  }>
  shipping_address: ShippingAddress
  billing_address?: ShippingAddress
  payment_method: string
  coupon_code?: string
}

// API utility functions for the e-commerce platform
export const api = {
  // Get all products with filters and pagination
  async getProducts(params: ProductParams = {}): Promise<ApiResponse<Product[]>> {
    const queryParams = new URLSearchParams()
    
    // Add parameters if they exist
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.limit) queryParams.append('limit', params.limit.toString())
    if (params.search) queryParams.append('search', params.search)
    if (params.category) queryParams.append('category', params.category)
    if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString())
    if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString())
    if (params.featured !== undefined) queryParams.append('featured', params.featured.toString())
    if (params.active !== undefined) queryParams.append('active', params.active.toString())
    if (params.sortBy) queryParams.append('sortBy', params.sortBy)
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder)

    const url = `${API_BASE_URL}/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`
    
    try {
      const response = await fetch(url)
      const data: ApiResponse<Product[]> = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch products')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  // Get single product by ID
  async getProduct(id: string | number): Promise<ApiResponse<Product>> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`)
      const data: ApiResponse<Product> = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch product')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  // Get featured products
  async getFeaturedProducts(limit: number = 8): Promise<ApiResponse<Product[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/featured?limit=${limit}`)
      const data: ApiResponse<Product[]> = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch featured products')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  // Get all categories
  async getCategories(): Promise<ApiResponse<Category[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`)
      const data: ApiResponse<Category[]> = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch categories')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  // Create a new product (requires authentication)
  async createProduct(productData: CreateProductData, token: string): Promise<ApiResponse<{ id: number; sku: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to create product')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  // Update a product (requires authentication)
  async updateProduct(id: number, productData: Partial<CreateProductData>, token: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to update product')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  // Delete a product (requires authentication)
  async deleteProduct(id: number, token: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to delete product')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  // Bulk upload products (requires authentication)
  async bulkUploadProducts(csvFile: File, token: string): Promise<ApiResponse<{ uploadId: number }>> {
    try {
      const formData = new FormData()
      formData.append('csvFile', csvFile)
      
      const response = await fetch(`${API_BASE_URL}/products/bulk-upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to upload products')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  // Get bulk upload status (requires authentication)
  async getBulkUploadStatus(uploadId: number, token: string): Promise<ApiResponse<BulkUploadStatus>> {
    try {
      const response = await fetch(`${API_BASE_URL}/bulk-upload/${uploadId}/status`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get upload status')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  // Create a new category (requires authentication)
  async createCategory(categoryData: CreateCategoryData, token: string): Promise<ApiResponse<{ id: number; name: string; slug: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryData)
      })
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to create category')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  // Update a category (requires authentication)
  async updateCategory(id: number, categoryData: Partial<CreateCategoryData>, token: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryData)
      })
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to update category')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  // Delete a category (requires authentication)
  async deleteCategory(id: number, token: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to delete category')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  // Search products
  async searchProducts(query: string, limit: number = 20): Promise<ApiResponse<Product[]>> {
    return this.getProducts({ search: query, limit })
  },

  // Get products by category
  async getProductsByCategory(categorySlug: string, params: ProductParams = {}): Promise<ApiResponse<Product[]>> {
    return this.getProducts({ ...params, category: categorySlug })
  },

  // Cart Management
  async getCart(): Promise<ApiResponse<Cart>> {
    try {
      // Try with Authorization Bearer header first
      let response = await fetch(`${API_BASE_URL}/cart`, {
        headers: getAuthHeaders('bearer')
      })
      
      // If Authorization Bearer fails, try with X-API-Key header
      if (!response.ok && response.status === 401) {
        response = await fetch(`${API_BASE_URL}/cart`, {
          headers: getAuthHeaders('apikey')
        })
      }
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get cart')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async addToCart(cartData: AddToCartData): Promise<ApiResponse<void>> {
    try {
      // Try with Authorization Bearer header first
      let response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: getAuthHeaders('bearer'),
        body: JSON.stringify(cartData)
      })
      
      // If Authorization Bearer fails, try with X-API-Key header
      if (!response.ok && response.status === 401) {
        response = await fetch(`${API_BASE_URL}/cart/add`, {
          method: 'POST',
          headers: getAuthHeaders('apikey'),
          body: JSON.stringify(cartData)
        })
      }
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to add to cart')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async updateCartItem(itemId: number, quantity: number): Promise<ApiResponse<void>> {
    try {
      // Try with Authorization Bearer header first
      let response = await fetch(`${API_BASE_URL}/cart/update/${itemId}`, {
        method: 'PUT',
        headers: getAuthHeaders('bearer'),
        body: JSON.stringify({ quantity })
      })
      
      // If Authorization Bearer fails, try with X-API-Key header
      if (!response.ok && response.status === 401) {
        response = await fetch(`${API_BASE_URL}/cart/update/${itemId}`, {
          method: 'PUT',
          headers: getAuthHeaders('apikey'),
          body: JSON.stringify({ quantity })
        })
      }
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to update cart item')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async removeFromCart(itemId: number): Promise<ApiResponse<void>> {
    try {
      // Try with Authorization Bearer header first
      let response = await fetch(`${API_BASE_URL}/cart/remove/${itemId}`, {
        method: 'DELETE',
        headers: getAuthHeaders('bearer')
      })
      
      // If Authorization Bearer fails, try with X-API-Key header
      if (!response.ok && response.status === 401) {
        response = await fetch(`${API_BASE_URL}/cart/remove/${itemId}`, {
          method: 'DELETE',
          headers: getAuthHeaders('apikey')
        })
      }
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to remove from cart')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async clearCart(): Promise<ApiResponse<void>> {
    try {
      // Try with Authorization Bearer header first
      let response = await fetch(`${API_BASE_URL}/cart/clear`, {
        method: 'DELETE',
        headers: getAuthHeaders('bearer')
      })
      
      // If Authorization Bearer fails, try with X-API-Key header
      if (!response.ok && response.status === 401) {
        response = await fetch(`${API_BASE_URL}/cart/clear`, {
          method: 'DELETE',
          headers: getAuthHeaders('apikey')
        })
      }
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to clear cart')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  // Order Management - Real Inventory API Integration
  async createOrder(orderData: CreateOrderData): Promise<ApiResponse<{ order_id: number; order_number: string }>> {
    try {
      // Transform data to match inventory API format
      const inventoryOrderData = {
        cartItems: orderData.items.map(item => ({
          productId: item.product_id.toString(),
          quantity: item.quantity,
          customization: item.variant_details || {}
        })),
        customer: {
          email: orderData.shipping_address.email,
          firstName: orderData.shipping_address.full_name.split(' ')[0] || orderData.shipping_address.full_name,
          lastName: orderData.shipping_address.full_name.split(' ').slice(1).join(' ') || ''
        },
        shippingAddress: {
          name: orderData.shipping_address.full_name,
          phone: orderData.shipping_address.phone,
          email: orderData.shipping_address.email,
          addressLine1: orderData.shipping_address.address_line_1,
          addressLine2: orderData.shipping_address.address_line_2 || '',
          city: orderData.shipping_address.city,
          state: orderData.shipping_address.state,
          postalCode: orderData.shipping_address.postal_code,
          country: orderData.shipping_address.country
        },
        billingAddress: orderData.billing_address ? {
          name: orderData.billing_address.full_name,
          phone: orderData.billing_address.phone,
          email: orderData.billing_address.email,
          addressLine1: orderData.billing_address.address_line_1,
          addressLine2: orderData.billing_address.address_line_2 || '',
          city: orderData.billing_address.city,
          state: orderData.billing_address.state,
          postalCode: orderData.billing_address.postal_code,
          country: orderData.billing_address.country
        } : undefined,
        payment: {
          method: orderData.payment_method,
          transactionId: `txn_${Date.now()}`, // Generate transaction ID
          amount: 0, // Will be calculated by backend
          currency: 'USD',
          status: 'completed'
        },
        orderDetails: {
          subtotal: 0, // Will be calculated by backend
          tax: 0,
          shipping: 0,
          discount: 0,
          total: 0
        }
      }

      // Debug: Log what we're sending
      console.log('🔍 Creating order with token:', ACCESS_TOKEN.substring(0, 20) + '...')
      console.log('🔍 Order data:', inventoryOrderData)

      // Try different authentication methods
      const authMethods = ['bearer', 'apikey', 'access-token', 'auth-token', 'token']
      
      for (const method of authMethods) {
        const headers = getAuthHeaders(method)
        console.log(`🔍 Trying ${method} authentication:`, headers)
        
        try {
          const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers,
            body: JSON.stringify(inventoryOrderData)
          })
          
          console.log(`🔍 ${method} Response status:`, response.status, response.statusText)
          
          const responseText = await response.text()
          console.log(`🔍 ${method} Raw response:`, responseText)
          
          if (response.ok) {
            let data
            try {
              data = JSON.parse(responseText)
            } catch (e) {
              console.error('🔍 Failed to parse response as JSON:', e)
              throw new Error(`Invalid response format: ${responseText}`)
            }
            
            if (data.success) {
              console.log(`🔍 ✅ ${method} authentication successful!`, data)
              return data
            } else {
              console.log(`🔍 ❌ ${method} authentication failed:`, data.message)
              // Continue to next method
            }
          } else {
            console.log(`🔍 ❌ ${method} HTTP error:`, response.status, responseText)
            // Continue to next method
          }
        } catch (fetchError) {
          console.log(`🔍 ❌ ${method} fetch error:`, fetchError.message)
          // Continue to next method
        }
      }
      
      // If all methods failed
      throw new Error('All authentication methods failed. Please check your access token.')
      
    } catch (error) {
      console.error('🔍 API Error in createOrder:', error)
      throw error
    }
  },

  async getOrders(params: { page?: number; limit?: number; status?: string } = {}): Promise<ApiResponse<Order[]>> {
    try {
      const queryParams = new URLSearchParams()
      if (params.page) queryParams.append('page', params.page.toString())
      if (params.limit) queryParams.append('limit', params.limit.toString())
      if (params.status) queryParams.append('status', params.status)

      const url = `${API_BASE_URL}/orders${queryParams.toString() ? '?' + queryParams.toString() : ''}`
      
      // Try with Authorization Bearer header first
      let response = await fetch(url, {
        headers: getAuthHeaders('bearer')
      })
      
      // If Authorization Bearer fails, try with X-API-Key header
      if (!response.ok && response.status === 401) {
        response = await fetch(url, {
          headers: getAuthHeaders('apikey')
        })
      }
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get orders')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async getOrder(orderId: number): Promise<ApiResponse<Order>> {
    try {
      // Try with Authorization Bearer header first
      let response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        headers: getAuthHeaders('bearer')
      })
      
      // If Authorization Bearer fails, try with X-API-Key header
      if (!response.ok && response.status === 401) {
        response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
          headers: getAuthHeaders('apikey')
        })
      }
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get order')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async cancelOrder(orderId: number): Promise<ApiResponse<void>> {
    try {
      // Try with Authorization Bearer header first
      let response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: getAuthHeaders('bearer')
      })
      
      // If Authorization Bearer fails, try with X-API-Key header
      if (!response.ok && response.status === 401) {
        response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
          method: 'PUT',
          headers: getAuthHeaders('apikey')
        })
      }
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to cancel order')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async trackOrder(orderNumber: string): Promise<ApiResponse<{ status: string; tracking_details: any[] }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/track/${orderNumber}`)
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to track order')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  // Legacy methods for backward compatibility (now deprecated)
  async addToCartLegacy(userId: string, item: any) {
    console.warn('This method is deprecated. Use addToCart instead.')
    return { success: true, message: 'Added to cart' }
  },

  async getCartLegacy(userId: string) {
    console.warn('This method is deprecated. Use getCart instead.')
    return { success: true, data: [] }
  },

  async updateCartItemLegacy(userId: string, productId: string, quantity: number) {
    console.warn('This method is deprecated. Use updateCartItem instead.')
    return { success: true, message: 'Cart updated' }
  },

  async removeFromCartLegacy(userId: string, productId: string) {
    console.warn('This method is deprecated. Use removeFromCart instead.')
    return { success: true, message: 'Item removed' }
  }
}

export default api