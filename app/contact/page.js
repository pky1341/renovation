'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { contactInfo, services } from '@/lib/data'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [submitError, setSubmitError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitStatus('')
    
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          serviceType: '',
          message: ''
        })
      } else {
        setSubmitError(result.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-20">
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            Get Your Free Quote Today
          </h1>
          <p className="text-lg text-[var(--text-muted)] mb-8">
            Ready to transform your office space? Contact us for a free consultation 
            and personalized quote tailored to your specific needs and budget.
          </p>
          <div className="flex justify-center items-center space-x-8 text-center">
            <div>
              <div className="text-2xl font-bold text-[var(--accent)]">24hr</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--accent)]">Free</div>
              <div className="text-sm text-gray-600">Consultation</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--accent)]">No</div>
              <div className="text-sm text-gray-600">Obligation</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Request Your Free Quote
                </h2>
                
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
                    <CheckCircle className="mr-2" size={20} />
                    Thank you! We've received your request and will contact you within 24 hours.
                  </div>
                )}

                {submitError && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                    <AlertCircle className="mr-2" size={20} />
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        suppressHydrationWarning
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Your company"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium mb-2">
                      Service Needed *
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.slug}>
                          {service.title}
                        </option>
                      ))}
                      <option value="complete">Complete Transformation</option>
                      <option value="consultation">Consultation Only</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Project Description
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Tell us about your specific needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Get My Free Quote
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin size={20} className="text-[var(--accent)] mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Office Address</h4>
                      <p className="text-sm text-gray-600">{contactInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone size={20} className="text-[var(--accent)] mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <p className="text-sm text-gray-600">{contactInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail size={20} className="text-[var(--accent)] mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-sm text-gray-600">{contactInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock size={20} className="text-[var(--accent)] mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Business Hours</h4>
                      <p className="text-sm text-gray-600">{contactInfo.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-green-800 mb-3">Our Promise</h3>
                <ul className="space-y-2">
                  {[
                    '24-hour response guarantee',
                    'Free consultation included',
                    'No obligation quotes',
                    'Competitive pricing'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-sm text-green-700">
                      <CheckCircle className="mr-2" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}