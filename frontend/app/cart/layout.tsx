import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopping Cart - E-Commerce Platform',
  description: 'Review your cart and proceed to checkout',
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}