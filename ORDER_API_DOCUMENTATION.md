# Real Inventory Management API Integration

## Overview
The Gift Gala e-commerce website is now integrated with the real inventory management system. When customers place orders on the website, they automatically appear in the inventory dashboard for processing and fulfillment.

## Integration Details

### API Base URL
```
https://54.169.31.95:8443/api/website
```

### Order Integration Endpoint
**POST** `/orders`

This endpoint receives orders from the website and creates them in the inventory management system.

### Order Data Format
The website sends order data in the following format to match the inventory system requirements:

```javascript
{
  cartItems: [
    {
      productId: "string",           // Product ID from catalog
      quantity: number,              // Quantity ordered
      customization: {               // Optional customizations
        text: "string",              // Custom text
        color: "string",             // Color choice
        size: "string",              // Size selection
        font: "string",              // Font style
        additionalOptions: {}        // Other custom options
      }
    }
  ],
  customer: {
    email: "string",                 // Customer email (required)
    firstName: "string",             // Customer first name (required)
    lastName: "string"               // Customer last name (required)
  },
  shippingAddress: {
    name: "string",                  // Full name
    phone: "string",                 // Phone number
    email: "string",                 // Email address
    addressLine1: "string",          // Address line 1
    addressLine2: "string",          // Address line 2 (optional)
    city: "string",                  // City
    state: "string",                 // State/Province
    postalCode: "string",            // Postal/ZIP code
    country: "string"                // Country
  },
  billingAddress: {
    // Same structure as shippingAddress (optional)
  },
  payment: {
    method: "string",                // Payment method (credit_card, paypal, etc.)
    transactionId: "string",         // Transaction ID
    amount: number,                  // Total amount
    currency: "string",              // Currency (USD, etc.)
    status: "string"                 // Payment status (completed, etc.)
  },
  orderDetails: {
    subtotal: number,                // Subtotal amount
    tax: number,                     // Tax amount
    shipping: number,                // Shipping cost
    discount: number,                // Discount applied
    total: number                    // Final total
  }
}
```

### Expected Response
```javascript
{
  success: true,
  data: {
    order_id: number,                // Unique order ID
    order_number: "string"           // Human-readable order number
  },
  message: "Order created successfully"
}
```

## Website Integration Points

### 1. Checkout Process
- **File**: `frontend/app/checkout/page.tsx`
- **Function**: `handlePlaceOrder()`
- **Description**: Collects customer information and product details, then sends order to inventory API

### 2. API Utility
- **File**: `frontend/lib/api.ts`
- **Function**: `api.createOrder()`
- **Description**: Transforms website order data to inventory API format and handles the API call

### 3. Order Success Page
- **File**: `frontend/app/order-success/page.tsx`
- **Description**: Displays order confirmation with details received from inventory API

## Data Flow

1. **Customer Checkout**: Customer fills out shipping information and payment details
2. **Order Preparation**: Website collects product details, quantities, and customer information
3. **API Call**: Order data is sent to inventory management system via POST `/orders`
4. **Inventory Processing**: Order appears in inventory dashboard for admin processing
5. **Confirmation**: Customer sees success page with order number and details

## Authentication

Currently, the integration works without authentication for testing purposes. For production deployment, you should implement one of these authentication methods:

### Option 1: JWT Token Authentication
```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN',
  'Content-Type': 'application/json'
}
```

### Option 2: API Key Authentication
```javascript
headers: {
  'X-API-Key': 'YOUR_API_KEY',
  'Content-Type': 'application/json'
}
```

## Testing the Integration

### Manual Testing
1. Visit the website: https://frontend-sigma-two-47.vercel.app
2. Browse products and select an item
3. Click "Buy Now" to go to checkout
4. Fill in shipping information
5. Complete the order
6. Check your inventory dashboard for the new order

### Automated Testing
Run the test script:
```bash
node inventory-api-test.js
```

This script will:
- Test the orders endpoint with sample data
- Verify the API response format
- Check if orders appear in the inventory system

## Error Handling

The website handles various error scenarios:

### Network Errors
- Connection timeouts
- Server unavailable
- CORS policy issues

### API Errors
- Invalid data format
- Missing required fields
- Authentication failures
- Server-side validation errors

### User Experience
- Clear error messages for customers
- Retry mechanisms for temporary failures
- Fallback options when API is unavailable

## Production Considerations

### Security
1. **HTTPS Only**: All API calls use HTTPS encryption
2. **Input Validation**: All customer data is validated before sending
3. **Authentication**: Implement proper API authentication
4. **Rate Limiting**: Consider implementing rate limiting for order submissions

### Performance
1. **Async Processing**: Orders are processed asynchronously
2. **Error Recovery**: Automatic retry for failed API calls
3. **Caching**: Product data is cached to reduce API calls
4. **Monitoring**: Log all order submissions for monitoring

### Scalability
1. **Load Balancing**: API can handle multiple concurrent orders
2. **Database Optimization**: Proper indexing for order queries
3. **Queue Management**: Orders can be queued during high traffic

## Troubleshooting

### Common Issues

#### Orders Not Appearing in Dashboard
- Check API endpoint URL
- Verify network connectivity
- Confirm authentication credentials
- Check server logs for errors

#### API Returns 404 Error
- Verify the `/orders` endpoint is implemented
- Check API base URL configuration
- Confirm server is running and accessible

#### Invalid Data Format Errors
- Review order data structure
- Check required field validation
- Verify data type conversions

### Debug Steps
1. Check browser network tab for API calls
2. Review server logs for error details
3. Test API endpoint directly with tools like Postman
4. Verify inventory dashboard configuration

## Support

For technical support with the inventory API integration:
1. Check the API documentation
2. Review server logs for detailed error messages
3. Test individual API endpoints
4. Contact the inventory system administrator

---

**Last Updated**: February 3, 2026
**Integration Status**: ✅ Active and Functional
**Website URL**: https://frontend-sigma-two-47.vercel.app
**API Endpoint**: https://54.169.31.95:8443/api/website/orders