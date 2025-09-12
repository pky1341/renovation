'use client'
import { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, Loader, Upload, X } from 'lucide-react'

export default function AdvancedForm({ 
  onSubmit, 
  initialData = {},
  className = "",
  title = "Contact Form"
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    spaceType: 'office',
    currentSize: '',
    budget: '',
    timeline: '',
    message: '',
    attachments: [],
    ...initialData
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const spaceTypes = [
    { value: 'office', label: 'Office Space', icon: '🏢' },
    { value: 'retail', label: 'Retail Store', icon: '🏪' },
    { value: 'restaurant', label: 'Restaurant', icon: '🍽️' },
    { value: 'medical', label: 'Medical Office', icon: '🏥' }
  ]

  const budgetRanges = [
    { value: '5-10', label: '₹5L - ₹10L' },
    { value: '10-25', label: '₹10L - ₹25L' },
    { value: '25-50', label: '₹25L - ₹50L' },
    { value: '50+', label: '₹50L+' }
  ]

  const timelineOptions = [
    { value: '1-2', label: '1-2 weeks' },
    { value: '2-4', label: '2-4 weeks' },
    { value: '1-2m', label: '1-2 months' },
    { value: '3m+', label: '3+ months' }
  ]

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
      else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Invalid phone number'
      }
    }

    if (step === 2) {
      if (!formData.spaceType) newErrors.spaceType = 'Space type is required'
      if (!formData.currentSize.trim()) newErrors.currentSize = 'Current size is required'
      if (!formData.budget) newErrors.budget = 'Budget range is required'
      if (!formData.timeline) newErrors.timeline = 'Timeline is required'
    }

    if (step === 3) {
      if (!formData.message.trim()) newErrors.message = 'Message is required'
      else if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword']

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, attachments: 'File size must be less than 5MB' }))
        return false
      }
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, attachments: 'Only images, PDF, and Word documents allowed' }))
        return false
      }
      return true
    })

    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles]
    }))
  }

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await onSubmit?.(formData)
      setSubmitStatus('success')
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '', email: '', phone: '', company: '', spaceType: 'office',
          currentSize: '', budget: '', timeline: '', message: '', attachments: []
        })
        setCurrentStep(1)
        setSubmitStatus(null)
      }, 3000)
    } catch (error) {
      setSubmitStatus('error')
      setErrors({ submit: error.message || 'Submission failed. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
              errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
            placeholder="Your company name"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
              errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'
            }`}
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
              errors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'
            }`}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Project Details</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Space Type *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {spaceTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => handleInputChange('spaceType', type.value)}
              className={`p-4 border-2 rounded-xl text-center transition-all ${
                formData.spaceType === type.value
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 hover:border-emerald-300'
              }`}
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <div className="font-medium text-sm">{type.label}</div>
            </button>
          ))}
        </div>
        {errors.spaceType && <p className="text-red-500 text-sm mt-1">{errors.spaceType}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Space Size *
          </label>
          <input
            type="text"
            value={formData.currentSize}
            onChange={(e) => handleInputChange('currentSize', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
              errors.currentSize ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'
            }`}
            placeholder="e.g., 1000 sq ft"
          />
          {errors.currentSize && <p className="text-red-500 text-sm mt-1">{errors.currentSize}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range *
          </label>
          <select
            value={formData.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
              errors.budget ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'
            }`}
          >
            <option value="">Select budget range</option>
            {budgetRanges.map((range) => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
          {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Timeline *
        </label>
        <select
          value={formData.timeline}
          onChange={(e) => handleInputChange('timeline', e.target.value)}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
            errors.timeline ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'
          }`}
        >
          <option value="">Select timeline</option>
          {timelineOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Description *
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          rows={6}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors resize-none ${
            errors.message ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'
          }`}
          placeholder="Describe your project requirements, current challenges, and vision for the new space..."
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        <div className="text-sm text-gray-500 mt-1">
          {formData.message.length}/1000 characters
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Attachments (Optional)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors">
          <Upload size={32} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 mb-2">
            Upload floor plans, photos, or documents
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Max 5MB per file. Supports: JPG, PNG, PDF, DOC
          </p>
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
          >
            Choose Files
          </label>
        </div>
        
        {formData.attachments.length > 0 && (
          <div className="mt-4 space-y-2">
            {formData.attachments.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="text-sm text-gray-700">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {errors.attachments && <p className="text-red-500 text-sm mt-1">{errors.attachments}</p>}
      </div>
    </div>
  )

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto ${className}`}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">Get a personalized quote for your interior transformation</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                i + 1 <= currentStep 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {i + 1 <= currentStep ? <CheckCircle size={20} /> : i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div className={`w-20 h-1 mx-2 ${
                  i + 1 < currentStep ? 'bg-emerald-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader size={20} className="animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )}
            </button>
          )}
        </div>

        {/* Submit Status */}
        {submitStatus && (
          <div className={`mt-6 p-4 rounded-xl flex items-center ${
            submitStatus === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {submitStatus === 'success' ? (
              <>
                <CheckCircle size={20} className="mr-3" />
                Thank you! Your request has been submitted successfully. We'll contact you within 24 hours.
              </>
            ) : (
              <>
                <AlertCircle size={20} className="mr-3" />
                {errors.submit || 'Something went wrong. Please try again.'}
              </>
            )}
          </div>
        )}
      </form>
    </div>
  )
}