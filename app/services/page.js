import { Recycle, Hammer, Sparkles, ArrowRight, CheckCircle, Clock, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      icon: <Recycle size={48} className="text-blue-600" />,
      title: "Interior Buyback",
      subtitle: "Turn Your Old Into Value",
      description: "We purchase your existing furniture, fixtures, and decor items at competitive market rates, giving you immediate value for items you no longer need.",
      features: [
        "Fair market value assessment",
        "Immediate cash payment",
        "Professional item evaluation",
        "Eco-friendly disposal alternative"
      ],
      process: [
        "Free on-site evaluation",
        "Instant quote provided",
        "Same-day payment",
        "Scheduled pickup"
      ],
      beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
      afterImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
      color: "blue",
      price: "We pay you up to 40% of original value"
    },
    {
      id: 2,
      icon: <Hammer size={48} className="text-orange-600" />,
      title: "Professional Deconstruction",
      subtitle: "Safe & Efficient Removal",
      description: "Expert deconstruction and removal of outdated interior elements, preparing your space for transformation while minimizing disruption.",
      features: [
        "Non-destructive removal techniques",
        "Minimal disruption to operations",
        "Professional cleanup included",
        "Salvageable materials preserved"
      ],
      process: [
        "Space assessment & planning",
        "Careful deconstruction",
        "Material sorting & removal",
        "Site cleanup & preparation"
      ],
      beforeImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      afterImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
      color: "orange",
      price: "Starting from $15/sq ft"
    },
    {
      id: 3,
      icon: <Sparkles size={48} className="text-emerald-600" />,
      title: "Modern Installation",
      subtitle: "Transform Your Vision",
      description: "Professional installation of contemporary interior designs using sustainable materials and modern techniques for stunning results.",
      features: [
        "Custom design consultation",
        "Sustainable material selection",
        "Professional installation team",
        "Quality guarantee included"
      ],
      process: [
        "Design consultation & planning",
        "Material sourcing & delivery",
        "Professional installation",
        "Final inspection & handover"
      ],
      beforeImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
      afterImage: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      color: "emerald",
      price: "Starting from $25/sq ft"
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-600",
        button: "bg-blue-600 hover:bg-blue-700"
      },
      orange: {
        bg: "bg-orange-50",
        border: "border-orange-200", 
        text: "text-orange-600",
        button: "bg-orange-600 hover:bg-orange-700"
      },
      emerald: {
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        text: "text-emerald-600", 
        button: "bg-emerald-600 hover:bg-emerald-700"
      }
    }
    return colors[color]
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Complete Interior
            <span className="block gradient-text">Transformation Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            From buyback to installation, we handle every aspect of your interior transformation. 
            Sustainable, professional, and designed for your success.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: <DollarSign size={32} />, title: "Fair Buyback Prices", desc: "Get value for your old items" },
              { icon: <Clock size={32} />, title: "2-4 Week Timeline", desc: "Fast, efficient transformation" },
              { icon: <CheckCircle size={32} />, title: "100% Satisfaction", desc: "Guaranteed quality results" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="text-emerald-600 mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {services.map((service, index) => {
            const colors = getColorClasses(service.color)
            const isReverse = index % 2 === 1
            
            return (
              <div key={service.id} className={`mb-32 ${isReverse ? 'lg:flex-row-reverse' : ''} lg:flex items-center gap-16`}>
                {/* Content */}
                <div className="lg:w-1/2 mb-12 lg:mb-0">
                  <div className="flex items-center mb-6">
                    <div className={`p-4 rounded-2xl ${colors.bg} mr-4`}>
                      {service.icon}
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold text-gray-900 mb-2">{service.title}</h2>
                      <p className={`text-lg font-medium ${colors.text}`}>{service.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-xl text-gray-600 mb-8">{service.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="font-bold text-lg mb-4">Key Features</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle size={16} className={`${colors.text} mt-1 mr-2 flex-shrink-0`} />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-lg mb-4">Our Process</h4>
                      <ol className="space-y-2">
                        {service.process.map((step, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className={`${colors.bg} ${colors.text} w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0`}>
                              {idx + 1}
                            </span>
                            <span className="text-gray-600">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  
                  <div className={`${colors.bg} ${colors.border} border-2 rounded-2xl p-6 mb-8`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-lg mb-1">Pricing</h4>
                        <p className={`${colors.text} font-semibold`}>{service.price}</p>
                      </div>
                      <Link href="/contact" className={`${colors.button} text-white px-6 py-3 rounded-full font-semibold transition-colors`}>
                        Get Quote
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Visual */}
                <div className="lg:w-1/2">
                  <div className="relative">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-2xl shadow-lg hover-lift">
                          <img src={service.beforeImage} alt="Before" className="w-full h-40 object-cover rounded-xl mb-3" />
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">BEFORE</span>
                        </div>
                      </div>
                      <div className="space-y-4 mt-8">
                        <div className="bg-white p-4 rounded-2xl shadow-lg hover-lift">
                          <img src={service.afterImage} alt="After" className="w-full h-40 object-cover rounded-xl mb-3" />
                          <span className={`${colors.bg} ${colors.text} px-3 py-1 rounded-full text-sm font-bold`}>AFTER</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`${colors.button} text-white p-4 rounded-full shadow-xl animate-pulse`}>
                        <ArrowRight size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Package Deals */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Transformation Packages</h2>
            <p className="text-xl text-gray-600">Save more with our bundled services</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                name: "Essential Package",
                price: "$8,000",
                savings: "Save 15%",
                services: ["Interior Buyback", "Professional Removal", "Basic Installation"],
                features: ["Up to 500 sq ft", "Standard materials", "2-week completion"],
                popular: false
              },
              {
                name: "Premium Package", 
                price: "$15,000",
                savings: "Save 25%",
                services: ["Interior Buyback", "Professional Removal", "Premium Installation", "Design Consultation"],
                features: ["Up to 1000 sq ft", "Premium materials", "Custom design", "3-week completion"],
                popular: true
              },
              {
                name: "Enterprise Package",
                price: "$25,000",
                savings: "Save 30%",
                services: ["Interior Buyback", "Professional Removal", "Luxury Installation", "Full Design Service", "Project Management"],
                features: ["Unlimited sq ft", "Luxury materials", "Full design team", "4-week completion"],
                popular: false
              }
            ].map((pkg, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-lg p-8 ${pkg.popular ? 'ring-4 ring-emerald-500 scale-105' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold">MOST POPULAR</span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-emerald-600 mb-2">{pkg.price}</div>
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">{pkg.savings}</span>
                </div>
                
                <div className="mb-8">
                  <h4 className="font-bold mb-4">Included Services:</h4>
                  <ul className="space-y-2">
                    {pkg.services.map((service, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle size={16} className="text-emerald-600 mr-2" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-8">
                  <h4 className="font-bold mb-4">Package Features:</h4>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle size={16} className="text-emerald-600 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link href="/contact" className={`w-full block text-center py-4 rounded-full font-bold transition-colors ${pkg.popular ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white'}`}>
                  Choose Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get a free consultation and detailed quote for your interior transformation project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors">
              Get Free Consultation
            </Link>
            <Link href="/gallery" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-colors">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}