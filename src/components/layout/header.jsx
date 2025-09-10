'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { navigationLinks } from '@/lib/data'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={`nav-header ${isScrolled ? 'shadow-xl' : ''}`}>
      <Link href="/" className="flex items-center" onClick={closeMenu}>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">
          OfficeTransform
        </h1>
      </Link>

      <nav className="hidden md:flex items-center space-x-1">
        {navigationLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
              pathname === link.href
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="hidden md:block">
        <Link href="/contact" className="btn-primary text-sm px-4 py-2">
          Get Free Quote
        </Link>
      </div>

      <button
        className="md:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white border border-gray-200 rounded-lg shadow-lg py-4 z-50">
          <nav className="flex flex-col space-y-2 px-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className={`px-3 py-2 rounded-lg text-left transition-colors ${
                  pathname === link.href
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="btn-primary mt-4 text-center"
            >
              Get Free Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}