'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  beforeText = "Before", 
  afterText = "After",
  className = ""
}) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    updateSliderPosition(e)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    updateSliderPosition(e)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const updateSliderPosition = (e) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-2xl ${className}`}>
      <div 
        ref={containerRef}
        className="relative w-full h-80 cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
      >
        {/* Before Image */}
        <div className="absolute inset-0">
          <img 
            src={beforeImage} 
            alt="Before transformation" 
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
            {beforeText}
          </div>
        </div>
        
        {/* After Image with Clip Path */}
        <div 
          className="absolute inset-0 transition-all duration-100"
          style={{ 
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            transition: isDragging ? 'none' : 'clip-path 0.1s ease-out'
          }}
        >
          <img 
            src={afterImage} 
            alt="After transformation" 
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
            {afterText}
          </div>
        </div>
        
        {/* Slider Line */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 transition-all duration-100"
          style={{ 
            left: `${sliderPosition}%`,
            transition: isDragging ? 'none' : 'left 0.1s ease-out'
          }}
        />
        
        {/* Slider Handle */}
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl border-4 border-emerald-600 cursor-ew-resize z-20 flex items-center justify-center transition-all duration-100 hover:scale-110"
          style={{ 
            left: `calc(${sliderPosition}% - 24px)`,
            transition: isDragging ? 'none' : 'left 0.1s ease-out, transform 0.2s ease-out'
          }}
        >
          <ChevronLeft size={16} className="text-emerald-600 -mr-1" />
          <ChevronRight size={16} className="text-emerald-600 -ml-1" />
        </div>
        
        {/* Instruction Text */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm font-medium">
          Drag to compare
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-red-500 to-emerald-500 transition-all duration-100"
          style={{ 
            width: `${sliderPosition}%`,
            transition: isDragging ? 'none' : 'width 0.1s ease-out'
          }}
        />
      </div>
    </div>
  )
}