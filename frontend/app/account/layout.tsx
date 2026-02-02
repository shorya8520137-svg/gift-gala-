'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut } from 'lucide-react'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const menuItems = [
    {
      href: '/account',
      label: 'Profile',
      icon: User,
      exact: true
    },
    {
      href: '/account/orders',
      label: 'My Orders',
      icon: Package
    },
    {
      href: '/account/wishlist',
      label: 'Wishlist',
      icon: Heart
    },
    {
      href: '/account/addresses',
      label: 'Addresses',
      icon: MapPin
    },
    {
      href: '/account/payment-methods',
      label: 'Payment Methods',
      icon: CreditCard
    },
    {
      href: '/account/settings',
      label: 'Settings',
      icon: Settings
    }
  ]

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 sticky top-8">
              
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b border-gray-700">
                <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-white font-semibold text-lg">John Doe</h3>
                <p className="text-gray-400 text-sm">john.doe@example.com</p>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.href, item.exact)
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  )
                })}
                
                {/* Logout */}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors">
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}