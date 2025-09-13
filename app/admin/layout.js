'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, Users, LogOut } from 'lucide-react'

export default function AdminLayout({ children }) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          </div>
          <nav className="mt-6">
            <Link href="/admin/dashboard" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
              <LayoutDashboard size={20} className="mr-3" />
              Dashboard
            </Link>
            <Link href="/admin/contacts" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
              <Users size={20} className="mr-3" />
              Inquiries
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="flex justify-between items-center px-6 py-4">
              <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut size={20} className="mr-2" />
                Logout
              </button>
            </div>
          </header>

          {/* Content */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}