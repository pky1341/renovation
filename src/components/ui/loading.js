'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function RouteLoader() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [pathname])

  if (!loading) return null

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-[60]">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 animate-loading-bar" />
      </div>
      
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[60]">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
      
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[59]"></div>
      
      <style jsx>{`
        @keyframes loading-bar {
          0% { width: 0% }
          50% { width: 70% }
          100% { width: 100% }
        }
        .animate-loading-bar {
          animation: loading-bar 0.8s ease-out;
        }
      `}</style>
    </>
  )
}