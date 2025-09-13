'use client'
import { useState, useEffect } from 'react'
import { Calculator, TrendingUp, MessageCircle, X, Send, User } from 'lucide-react'

// Cost Calculator Component
export function CostCalculator() {
  const [sqft, setSqft] = useState(1000)
  const [spaceType, setSpaceType] = useState('office')
  const [furnitureValue, setFurnitureValue] = useState(8000)
  const [results, setResults] = useState({})

  const spaceTypes = {
    office: { multiplier: 12, buybackRate: 0.35 },
    retail: { multiplier: 15, buybackRate: 0.25 },
    restaurant: { multiplier: 18, buybackRate: 0.30 },
    medical: { multiplier: 20, buybackRate: 0.40 }
  }

  useEffect(() => {
    const config = spaceTypes[spaceType]
    const totalCost = sqft * config.multiplier
    const buybackCredit = furnitureValue * config.buybackRate
    const netCost = totalCost - buybackCredit
    const monthlyROI = netCost * 0.08
    setResults({
      totalCost,
      buybackCredit,
      netCost,
      monthlyROI,
      paybackMonths: Math.ceil(netCost / monthlyROI)
    })
  }, [sqft, spaceType, furnitureValue])

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-emerald-100">
      <div className="flex items-center mb-6">
        <Calculator size={24} className="text-emerald-600 mr-3" />
        <h3 className="text-2xl font-bold">Smart ROI Calculator</h3>
      </div>
      {/* ...rest of the CostCalculator JSX... */}
    </div>
  )
}

// Before/After Slider Component
export function BeforeAfterSlider({ beforeImage, afterImage, beforeText, afterText }) {
  const [sliderPosition, setSliderPosition] = useState(50)

  return (
    <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-xl">
      <div className="absolute inset-0">
        <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          BEFORE: {beforeText}
        </div>
      </div>
      <div 
        className="absolute inset-0 transition-all duration-300"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={afterImage} alt="After" className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          AFTER: {afterText}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(e.target.value)}
          className="w-full h-2 bg-transparent appearance-none cursor-pointer"
        />
      </div>
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