'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'

export default function GalleryPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: "Tech Startup Office",
      category: "office",
      location: "San Francisco, CA",
      size: "2,500 sq ft",
      timeline: "3 weeks",
      beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
      afterImage: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      description: "Complete transformation of a dated office space into a modern, collaborative workspace with sustainable materials.",
      services: ["Interior Buyback", "Professional Removal", "Modern Installation"],
      beforeDescription: "Outdated cubicles, poor lighting, worn carpeting",
      afterDescription: "Open concept, natural lighting, modern furniture, collaborative spaces"
    },
    {
      id: 2,
      title: "Creative Agency Redesign",
      category: "office",
      location: "New York, NY", 
      size: "1,800 sq ft",
      timeline: "2 weeks",
      beforeImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      afterImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
      description: "Transformed a traditional office into a vibrant creative space that inspires innovation and collaboration.",
      services: ["Interior Buyback", "Professional Removal", "Creative Installation"],
      beforeDescription: "Traditional layout, beige walls, standard office furniture",
      afterDescription: "Colorful design, flexible workspaces, creative meeting areas"
    },
    {
      id: 3,
      title: "Law Firm Modernization",
      category: "office",
      location: "Chicago, IL",
      size: "3,200 sq ft", 
      timeline: "4 weeks",
      beforeImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
      afterImage: "https://images.unsplash.com/photo-1631193816258-28b44b21e78b",
      description: "Updated a traditional law firm with modern amenities while maintaining professional elegance.",
      services: ["Interior Buyback", "Professional Removal", "Executive Installation"],
      beforeDescription: "Heavy wooden furniture, dark colors, closed offices",
      afterDescription: "Modern glass offices, neutral tones, ergonomic furniture"
    },
    {
      id: 4,
      title: "Retail Space Conversion",
      category: "retail",
      location: "Los Angeles, CA",
      size: "1,200 sq ft",
      timeline: "2 weeks", 
      beforeImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      afterImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      description: "Converted an old retail space into a modern showroom with interactive displays.",
      services: ["Space Clearing", "Custom Installation", "Lighting Design"],
      beforeDescription: "Empty retail shell, poor lighting, dated fixtures",
      afterDescription: "Modern showroom, LED lighting, interactive displays"
    },
    {
      id: 5,
      title: "Restaurant Interior Refresh",
      category: "restaurant",
      location: "Miami, FL",
      size: "2,000 sq ft",
      timeline: "3 weeks",
      beforeImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      afterImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      description: "Complete restaurant interior makeover with sustainable materials and modern design.",
      services: ["Furniture Buyback", "Interior Removal", "Restaurant Installation"],
      beforeDescription: "Dated decor, worn seating, poor ambiance",
      afterDescription: "Modern dining area, comfortable seating, ambient lighting"
    },
    {
      id: 6,
      title: "Medical Office Upgrade",
      category: "medical",
      location: "Seattle, WA", 
      size: "1,500 sq ft",
      timeline: "2 weeks",
      beforeImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
      afterImage: "https://images.unsplash.com/photo-1551601651-2a8555f1a136",
      description: "Modernized medical office with patient-friendly design and efficient workflow.",
      services: ["Medical Equipment Buyback", "Sanitized Removal", "Healthcare Installation"],
      beforeDescription: "Clinical feel, outdated equipment, poor patient flow",
      afterDescription: "Welcoming atmosphere, modern equipment, efficient layout"
    }
  ]

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'office', name: 'Office Spaces', count: projects.filter(p => p.category === 'office').length },
    { id: 'retail', name: 'Retail Spaces', count: projects.filter(p => p.category === 'retail').length },
    { id: 'restaurant', name: 'Restaurants', count: projects.filter(p => p.category === 'restaurant').length },
    { id: 'medical', name: 'Medical Offices', count: projects.filter(p => p.category === 'medical').length }
  ]

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transformation
            <span className="block gradient-text">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            See the dramatic before and after results of our interior transformation projects. 
            Real spaces, real results, real satisfaction.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "2-4", label: "Week Timeline" },
              { number: "0%", label: "Waste to Landfill" }
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 bg-white sticky top-20 z-40 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  filter === category.id
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Before/After Images */}
                <div className="relative">
                  <div className="grid grid-cols-2">
                    <div className="relative">
                      <img src={project.beforeImage} alt="Before" className="w-full h-64 object-cover" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">BEFORE</span>
                      </div>
                    </div>
                    <div className="relative">
                      <img src={project.afterImage} alt="After" className="w-full h-64 object-cover" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">AFTER</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-3 rounded-full shadow-xl">
                      <ArrowRight size={24} className="text-emerald-600" />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600">{project.location}</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{project.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Project Details</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>Size: {project.size}</li>
                        <li>Timeline: {project.timeline}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Services Used</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {project.services.map((service, idx) => (
                          <li key={idx}>• {service}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-full font-semibold transition-colors"
                  >
                    View Full Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {/* Large Before/After */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="relative mb-4">
                    <img src={selectedProject.beforeImage} alt="Before" className="w-full h-64 object-cover rounded-xl" />
                    <span className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold">BEFORE</span>
                  </div>
                  <p className="text-gray-600">{selectedProject.beforeDescription}</p>
                </div>
                <div>
                  <div className="relative mb-4">
                    <img src={selectedProject.afterImage} alt="After" className="w-full h-64 object-cover rounded-xl" />
                    <span className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-2 rounded-full font-bold">AFTER</span>
                  </div>
                  <p className="text-gray-600">{selectedProject.afterDescription}</p>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-bold mb-2">Location</h4>
                  <p className="text-gray-600">{selectedProject.location}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-bold mb-2">Size</h4>
                  <p className="text-gray-600">{selectedProject.size}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-bold mb-2">Timeline</h4>
                  <p className="text-gray-600">{selectedProject.timeline}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4">Services Provided</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.services.map((service, idx) => (
                    <span key={idx} className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <Link
                  href="/contact"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-colors mr-4"
                >
                  Start Your Project
                </Link>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="border-2 border-gray-300 text-gray-600 px-8 py-3 rounded-full font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Your Transformation?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our gallery of successful transformations. Get your free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
              Get Free Consultation
            </Link>
            <Link href="/gallery" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-emerald-600 transition-colors">
              View More Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}