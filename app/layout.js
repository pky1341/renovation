'use client'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import RouteLoader from '@/components/ui/loading'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin') || pathname === '/login'

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <RouteLoader />
        {!isAdminRoute && <Header />}
        <main>{children}</main>
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  )
}