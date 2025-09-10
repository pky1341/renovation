'use client'
import { useState } from 'react'

export default function InteractiveSlider({ beforeImage, afterImage, beforeText, afterText }) {
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value)
  }

  return (
    <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-xl">
      {/* Before Image */}
      <div className="absolute inset-0">
        <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          BEFORE: {beforeText}
        </div>
      </div>
      
      {/* After Image with Clip Path */}
      <div 
        className="absolute inset-0 transition-all duration-300"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={afterImage} alt="After" className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          AFTER: {afterText}
        </div>
      </div>
      
      {/* Slider Control */}
      <div className="absolute inset-0 flex items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="w-full h-2 bg-transparent appearance-none cursor-pointer slider"
        />
      </div>
      
      {/* Slider Handle */}
      <div 
        className="absolute top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-4 border-emerald-600 cursor-pointer transition-all hover:scale-110"
        style={{ left: `calc(${sliderPosition}% - 16px)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-4 bg-emerald-600 rounded"></div>
        </div>
      </div>
    </div>
  )
}