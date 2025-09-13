"use client"
import { Recycle, Hammer, Sparkles, Camera, Star, TrendingUp, Zap } from 'lucide-react'
import Link from 'next/link'
import CostCalculator from '../src/components/ui/cost-calculator.js'
import BeforeAfterSlider from '../src/components/ui/before-after-slider.js'
import ProjectFilter from '../src/components/ui/project-filter.js'
import AdvancedForm from '../src/components/ui/advanced-form.js'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50 pt-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200 rounded-full blur-xl animate-pulse opacity-30"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200 rounded-full blur-xl animate-pulse delay-1000 opacity-30"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <TrendingUp size={16} className="mr-2" />
              #1 Interior Transformation Service
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              We <span className="text-blue-600">Buy</span>
              <br />
              <span className="text-orange-600">Remove</span>
              <br />
              <span className="text-emerald-600">Redesign</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0">
              Turn your old furniture into cash, get professional removal, and install stunning new interiors. 
              <strong className="text-emerald-600"> All in one service.</strong>
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">500+</div>
                <div className="text-sm text-gray-600">Projects Done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">2-4</div>
                <div className="text-sm text-gray-600">Week Timeline</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4 shadow-lg">
                Get Free Assessment
              </Link>
              <Link href="/gallery" className="flex items-center justify-center gap-2 text-lg px-8 py-4 border-2 border-gray-300 rounded-full hover:border-emerald-500 transition-colors">
                <Camera size={20} className="text-emerald-600" />
                Virtual Tour
              </Link>
            </div>
          </div>
          
          {/* Right Visual */}
          <div className="relative">
            <div className="bg-white p-6 rounded-3xl shadow-2xl">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400" 
                    alt="Old cluttered office" 
                    className="w-full h-48 object-cover rounded-2xl transition-transform group-hover:scale-105" 
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    OLD & CLUTTERED
                  </div>
                </div>
                <div className="relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400" 
                    alt="Modern clean office" 
                    className="w-full h-48 object-cover rounded-2xl transition-transform group-hover:scale-105" 
                  />
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    MODERN & CLEAN
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center bg-gradient-to-r from-red-500 to-emerald-500 text-white px-6 py-3 rounded-full font-bold">
                  <Zap size={20} className="mr-2" />
                  2-Week Transformation
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-lg animate-float">
              <div className="text-2xl font-bold text-emerald-600">₹20Cr+</div>
              <div className="text-xs text-gray-600">Furniture Bought</div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-lg animate-float delay-1000">
              <div className="text-2xl font-bold text-blue-600">Zero</div>
              <div className="text-xs text-gray-600">Waste Generated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Cost Calculator */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Calculate Your Savings</h2>
            <p className="text-xl text-gray-600">See how much you can save with our buyback program</p>
          </div>
          
          <CostCalculator />
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Simple Process</h2>
            <p className="text-xl text-gray-600">From assessment to installation in 3 easy steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: <Recycle size={48} className="text-blue-600" />,
                title: "Buy & Assess",
                description: "We evaluate and purchase your existing furniture at fair market value",
                image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
                color: "blue"
              },
              {
                step: "2", 
                icon: <Hammer size={48} className="text-orange-600" />,
                title: "Remove & Prep",
                description: "Professional removal and space preparation for your new design",
                image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
                color: "orange"
              },
              {
                step: "3",
                icon: <Sparkles size={48} className="text-emerald-600" />,
                title: "Design & Install", 
                description: "Install modern, ergonomic furniture and contemporary design elements",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
                color: "emerald"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
                <div className="relative">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
                  <div className={`absolute top-4 left-4 w-12 h-12 bg-${item.color}-600 text-white rounded-full flex items-center justify-center font-bold text-lg`}>
                    {item.step}
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Before/After Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Interactive Transformations</h2>
            <p className="text-xl text-gray-600">Drag to reveal the dramatic results</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600"
              afterImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"
              title="Tech Startup Office"
              location="Mumbai, India"
              savings="₹2,65,000"
            />
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600"
              afterImage="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600"
              title="Creative Agency"
              location="Bangalore, India"
              savings="₹2,30,000"
            />
          </div>
        </div>
      </section>

      {/* Project Portfolio with Filters */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Project Portfolio</h2>
            <p className="text-xl text-gray-600">Browse our completed transformations</p>
          </div>
          
          {/* <ProjectFilter 
            projects={[
              {
                id: 1,
                title: "Tech Startup Office",
                category: "office",
                location: "Mumbai, India",
                size: "2,500 sq ft",
                timeline: "3 weeks",
                beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
                afterImage: "https://images.unsplash.com/photo-1497366216548-37526070297c",
                description: "Complete transformation of a dated office space"
              },
              {
                id: 2,
                title: "Creative Agency",
                category: "office",
                location: "Bangalore, India",
                size: "1,800 sq ft",
                timeline: "2 weeks",
                beforeImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
                afterImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
                description: "Vibrant creative space transformation"
              },
              {
                id: 3,
                title: "Law Firm Office",
                category: "office",
                location: "Delhi, India",
                size: "3,200 sq ft",
                timeline: "4 weeks",
                beforeImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
                afterImage: "https://images.unsplash.com/photo-1631193816258-28b44b21e78b",
                description: "Professional law firm modernization"
              }
            ]}
            onFilterChange={(filtered) => console.log('Filtered projects:', filtered)}
          /> */}
        </div>
      </section>

      {/* Advanced Contact Form */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Start Your Transformation</h2>
            <p className="text-xl text-gray-600">Get a detailed quote with our smart form</p>
          </div>
          
          <AdvancedForm 
            onSubmit={async (formData) => {
              const response = await fetch('/api/contacts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
              })
              if (!response.ok) throw new Error('Failed to submit')
            }}
          />
        </div>
      </section> */}

      {/* Social Proof */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} size={24} className="text-yellow-400 fill-current" />
              ))}
              <span className="text-2xl font-bold ml-2">4.9/5</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Trusted by 500+ Businesses</h2>
            <p className="text-xl opacity-90">Real reviews from real transformations</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Jennifer Martinez",
                company: "TechFlow Solutions", 
                review: "They bought our old furniture for ₹2,65,000 and transformed our office in just 2 weeks. Productivity increased 40%!",
                avatar: "JM"
              },
              {
                name: "David Chen",
                company: "Creative Studio",
                review: "Professional team, zero damage, amazing results. The before/after difference is incredible.",
                avatar: "DC"
              },
              {
                name: "Sarah Williams", 
                company: "Law Firm Partners",
                review: "The buyback program covered 35% of our renovation costs. Smart investment that paid for itself.",
                avatar: "SW"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm opacity-75">{testimonial.company}</p>
                  </div>
                </div>
                <p className="italic mb-4">"{testimonial.review}"</p>
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} size={16} className="fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-8 animate-pulse">
            <Zap size={16} className="mr-2" />
            Limited Time: Free Assessment (Save ₹40,000)
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join 500+ businesses who chose smart interior transformation. 
            Book your free assessment today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link href="/contact" className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-colors shadow-xl">
              Book Free Assessment
            </Link>
            <a href="tel:+919876543210" className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-colors">
              Call: +91 98765 43210
            </a>
          </div>
          
          <div className="grid grid-cols-3 gap-8 text-sm opacity-75 max-w-md mx-auto">
            <div>✓ Free assessment</div>
            <div>✓ Same-day quotes</div>
            <div>✓ 2-week completion</div>
          </div>
        </div>
      </section>
    </div>
  )
}