import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import RouteLoader from '@/components/ui/loading'

export const metadata = {
  title: 'OfficeTransform - Professional Office Transformation Services',
  description: 'Transform your workspace with our comprehensive office buyback, removal, and redesign services. 15+ years of experience, 500+ offices transformed.',
  keywords: 'office transformation, furniture buyback, office redesign, workspace renovation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <RouteLoader />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}