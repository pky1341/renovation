import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import { contactInfo, navigationLinks } from '@/lib/data'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">OfficeTransform</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transforming workspaces across the nation with comprehensive office 
              buyback, removal, and redesign services. We make office transformation 
              simple, sustainable, and stylish.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={20} className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  {contactInfo.address}
                </p>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="text-green-400 mr-3 flex-shrink-0" />
                <p className="text-gray-300">{contactInfo.phone}</p>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="text-green-400 mr-3 flex-shrink-0" />
                <p className="text-gray-300">{contactInfo.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 OfficeTransform. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a key={item} href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}