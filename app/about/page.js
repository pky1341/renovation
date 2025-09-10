import Link from 'next/link'
import { Building, Calendar, Star, Clock, Award, Users, CheckCircle, Target, Eye } from 'lucide-react'
import { statistics } from '@/lib/data'

export const metadata = {
  title: 'About Us - OfficeTransform',
  description: 'Learn about OfficeTransform - 15+ years of office transformation expertise with 500+ successful projects.',
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
                About OfficeTransform
              </h1>
              <p className="text-lg text-[var(--text-muted)] mb-8">
                For over 15 years, we've been transforming workspaces and elevating productivity 
                for businesses across the nation. Our comprehensive approach combines expertise, 
                innovation, and exceptional service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary">
                  Work With Us
                </Link>
                <Link href="/gallery" className="btn-secondary">
                  View Our Work
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd" 
                alt="Modern office transformation"
                className="w-full h-64 object-cover rounded-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1631193816258-28b44b21e78b" 
                alt="Professional office design"
                className="w-full h-48 object-cover rounded-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Our Track Record</h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and client satisfaction
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statistics.map((stat) => (
              <div key={stat.id}>
                <div className="text-3xl md:text-4xl font-bold text-[var(--accent)] mb-2">
                  {stat.number}
                </div>
                <div className="font-semibold mb-2">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--section)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Our Story</h2>
              <div className="space-y-4">
                <p className="text-[var(--text-muted)]">
                  Founded in 2008, OfficeTransform began with a simple mission: to help businesses 
                  create workspaces that inspire productivity and foster collaboration. What started 
                  as a small furniture removal service has evolved into a comprehensive office 
                  transformation company.
                </p>
                <p className="text-[var(--text-muted)]">
                  Today, we're proud to serve businesses of all sizes, from startups to Fortune 500 
                  companies, with our unique combination of buyback services, professional removal, 
                  expert installation, and innovative design solutions.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Target className="text-[var(--accent)] mb-3" size={24} />
                <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                <p className="text-sm text-gray-600">
                  To transform ordinary offices into extraordinary workspaces that inspire productivity, 
                  foster collaboration, and reflect each company's unique culture and values.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Eye className="text-[var(--accent)] mb-3" size={24} />
                <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                <p className="text-sm text-gray-600">
                  To be the leading office transformation company, known for exceptional service, 
                  sustainable practices, and innovative design solutions that drive business success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Our Core Values</h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              These principles guide everything we do and shape our relationships with clients, 
              partners, and team members.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-[var(--accent)]" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-sm text-gray-600">
                We strive for perfection in every project, from initial consultation to final installation, 
                ensuring exceptional results that exceed expectations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-[var(--accent)]" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Partnership</h3>
              <p className="text-sm text-gray-600">
                We believe in building long-term relationships with our clients, working as trusted partners 
                to understand and fulfill their unique needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-[var(--accent)]" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainability</h3>
              <p className="text-sm text-gray-600">
                We're committed to eco-friendly practices, from responsible furniture disposal to 
                sustainable design solutions that benefit both businesses and the environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--accent)] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Workspace?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join the hundreds of businesses that have trusted us to create inspiring, 
            productive workspaces. Let's discuss your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-[var(--accent)] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Start Your Project
            </Link>
            <Link href="/testimonials" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[var(--accent)] transition-colors">
              Read Success Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}