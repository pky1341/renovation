'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '@/lib/data'

export default function TestimonialsPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ))
  }

  return (
    <div className="pt-20">
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            Client Success Stories
          </h1>
          <p className="text-lg text-[var(--text-muted)] mb-8">
            Don't just take our word for it. Hear from satisfied clients who have experienced 
            the OfficeTransform difference and seen measurable improvements in their workplace.
          </p>
          <div className="flex justify-center items-center space-x-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[var(--accent)]">98%</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--accent)]">500+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--accent)]">5★</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg text-center mb-8">
            <div className="flex justify-center mb-6">
              <Quote className="text-[var(--accent)]" size={48} />
            </div>
            
            <div className="flex justify-center mb-4">
              {renderStars(testimonials[currentTestimonial].rating)}
            </div>
            
            <blockquote className="text-xl italic mb-6 max-w-3xl mx-auto leading-relaxed">
              "{testimonials[currentTestimonial].testimonial}"
            </blockquote>
            
            <div className="flex items-center justify-center mb-4">
              <img
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].name}
                className="w-20 h-20 rounded-full mr-6 object-cover"
              />
              <div className="text-left">
                <div className="text-xl font-semibold text-[var(--text-primary)]">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-gray-600">
                  {testimonials[currentTestimonial].position}
                </div>
                <div className="text-gray-600">
                  {testimonials[currentTestimonial].company}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 max-w-md mx-auto">
              <div className="text-sm text-gray-600 mb-1">Project:</div>
              <div className="font-medium">{testimonials[currentTestimonial].project}</div>
              <div className="text-sm text-gray-600 mt-2 mb-1">Service:</div>
              <div className="font-medium text-[var(--accent)]">{testimonials[currentTestimonial].service}</div>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full border border-gray-300 hover:border-[var(--accent)] hover:bg-green-50 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial
                      ? 'bg-[var(--accent)]'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full border border-gray-300 hover:border-[var(--accent)] hover:bg-green-50 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--section)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">All Client Reviews</h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              Read through all of our client testimonials to see the consistent quality 
              and satisfaction across different industries and project types.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-white p-6 rounded-lg shadow-sm cursor-pointer transition-all ${
                  index === currentTestimonial
                    ? 'ring-2 ring-[var(--accent)] shadow-lg scale-105'
                    : 'hover:shadow-lg hover:scale-102'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex justify-center mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-sm italic text-center mb-4 line-clamp-4">
                  "{testimonial.testimonial}"
                </p>
                
                <div className="border-t pt-3">
                  <div className="text-sm text-gray-600 text-center">
                    <div className="font-medium text-[var(--accent)]">{testimonial.service}</div>
                    <div className="mt-1">{testimonial.project}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Proven Results</h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              Our client testimonials are backed by measurable results and concrete improvements 
              in workplace productivity and employee satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl font-bold text-[var(--accent)] mb-2">87%</div>
              <div className="font-semibold mb-2">Productivity Increase</div>
              <p className="text-sm text-gray-600">
                Average productivity improvement reported by clients after office transformation
              </p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">92%</div>
              <div className="font-semibold mb-2">Employee Satisfaction</div>
              <p className="text-sm text-gray-600">
                Employees report higher job satisfaction in newly transformed office spaces
              </p>
            </div>
            
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <div className="text-4xl font-bold text-yellow-600 mb-2">78%</div>
              <div className="font-semibold mb-2">Return Clients</div>
              <p className="text-sm text-gray-600">
                Clients who return for additional projects or recommend us to other businesses
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--accent)] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Success Stories</h2>
          <p className="text-lg mb-8 opacity-90">
            Ready to become our next success story? Let's discuss how we can transform 
            your office space and create a testimonial-worthy experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-[var(--accent)] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Start Your Project
            </Link>
            <Link href="/gallery" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[var(--accent)] transition-colors">
              View Our Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}