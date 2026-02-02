import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products - E-Commerce Platform',
  description: 'Browse our collection of amazing products',
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}