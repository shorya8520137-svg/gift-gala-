# E-Commerce Platform

A modern, full-stack e-commerce platform built with Next.js and Node.js.

## 🚀 Features

### Frontend (Next.js)
- ✨ Modern UI with Tailwind CSS
- 🔍 SEO optimized with server-side rendering
- 📱 Responsive design
- 🛒 Shopping cart functionality
- 🔐 User authentication
- 📦 Product catalog with search
- 💳 Checkout process

### Backend (Node.js)
- 🔒 Secure REST API
- 🛡️ Authentication & authorization
- 📊 Product management
- 🛒 Cart management
- 📋 Order processing
- 🔐 Rate limiting & security headers

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icons)

**Backend:**
- Node.js
- Express.js
- JWT authentication
- bcryptjs for password hashing
- Express rate limiting
- CORS & Helmet for security

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**
   ```bash
   # Copy the example env file in backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration
   ```

3. **Start development servers:**
   ```bash
   npm run dev
   ```

This will start:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### Individual Commands

**Frontend only:**
```bash
cd frontend
npm install
npm run dev
```

**Backend only:**
```bash
cd backend
npm install
npm run dev
```

## 📁 Project Structure

```
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App router pages
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   ├── products/        # Products pages
│   │   └── cart/            # Cart page
│   ├── lib/                 # Utility functions
│   │   └── api.ts           # API client
│   ├── components/          # Reusable components
│   └── public/              # Static assets
├── backend/                 # Node.js backend API
│   ├── routes/              # API routes
│   │   ├── auth.js          # Authentication
│   │   ├── products.js      # Products CRUD
│   │   ├── cart.js          # Cart management
│   │   └── orders.js        # Order processing
│   ├── server.js            # Express server
│   └── .env.example         # Environment variables template
└── package.json             # Root package.json
```

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/search/:query` - Search products

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Cart
- `GET /api/cart/:userId` - Get user cart
- `POST /api/cart/:userId/add` - Add item to cart
- `PUT /api/cart/:userId/update` - Update cart item
- `DELETE /api/cart/:userId/remove/:productId` - Remove item
- `DELETE /api/cart/:userId/clear` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:userId` - Get user orders
- `GET /api/orders/order/:orderId` - Get specific order

## 🔒 Security Features

- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet security headers
- Password hashing with bcrypt
- JWT token authentication
- Input validation

## 🚀 Deployment

### Frontend (Vercel recommended)
```bash
cd frontend
npm run build
```

### Backend (Railway, Heroku, or VPS)
```bash
cd backend
npm start
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

**Happy coding! 🚀**