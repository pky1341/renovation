'use client'
import { useState, useEffect } from 'react'
import { Calculator, TrendingUp, DollarSign, IndianRupee } from 'lucide-react'

export default function CostCalculator() {
  const [formData, setFormData] = useState({
    sqft: 1000,
    spaceType: 'office',
    furnitureValue: 650000,
    location: 'mumbai'
  })
  
  const [results, setResults] = useState({})
  const [isCalculating, setIsCalculating] = useState(false)

  const spaceTypes = {
    office: { multiplier: 800, buybackRate: 0.35, name: 'Office Space' },
    retail: { multiplier: 1200, buybackRate: 0.25, name: 'Retail Store' },
    restaurant: { multiplier: 1500, buybackRate: 0.30, name: 'Restaurant' },
    medical: { multiplier: 1800, buybackRate: 0.40, name: 'Medical Office' }
  }

  const locationMultipliers = {
    mumbai: 1.2,
    delhi: 1.15,
    bangalore: 1.1,
    pune: 1.0,
    chennai: 1.05,
    hyderabad: 1.0
  }

  useEffect(() => {
    calculateCosts()
  }, [formData])

  const calculateCosts = async () => {
    setIsCalculating(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const config = spaceTypes[formData.spaceType]
    const locationMultiplier = locationMultipliers[formData.location]
    
    const baseCost = formData.sqft * config.multiplier * locationMultiplier
    const buybackCredit = formData.furnitureValue * config.buybackRate
    const netCost = baseCost - buybackCredit
    const monthlyROI = netCost * 0.08 // 8% monthly productivity gain value
    const paybackMonths = Math.ceil(netCost / monthlyROI)

    setResults({
      baseCost: Math.round(baseCost),
      buybackCredit: Math.round(buybackCredit),
      netCost: Math.round(netCost),
      monthlyROI: Math.round(monthlyROI),
      paybackMonths,
      savings: Math.round((baseCost - netCost) / baseCost * 100)
    })
    
    setIsCalculating(false)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-6xl mx-auto border border-emerald-100">
      <div className="flex items-center mb-8">
        <Calculator size={32} className="text-emerald-600 mr-4" />
        <div>
          <h3 className="text-3xl font-bold text-gray-900">Smart ROI Calculator</h3>
          <p className="text-gray-600">Get instant cost estimates for your transformation</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Section */}
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Space Size: {formData.sqft.toLocaleString()} sq ft
            </label>
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={formData.sqft}
              onChange={(e) => handleInputChange('sqft', Number(e.target.value))}
              className="w-full h-3 bg-emerald-100 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>500 sq ft</span>
              <span>10,000 sq ft</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Space Type</label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(spaceTypes).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => handleInputChange('spaceType', key)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.spaceType === key
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="font-medium">{config.name}</div>
                  <div className="text-sm text-gray-500">
                    {config.buybackRate * 100}% buyback rate
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Current Furniture Value: {formatCurrency(formData.furnitureValue)}
            </label>
            <input
              type="range"
              min="100000"
              max="5000000"
              step="50000"
              value={formData.furnitureValue}
              onChange={(e) => handleInputChange('furnitureValue', Number(e.target.value))}
              className="w-full h-3 bg-emerald-100 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>₹1L</span>
              <span>₹50L</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
            <select
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:outline-none"
            >
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
              <option value="pune">Pune</option>
              <option value="chennai">Chennai</option>
              <option value="hyderabad">Hyderabad</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {isCalculating ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Cost Breakdown</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Transformation Cost:</span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(results.baseCost)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-green-600">
                    <span>Buyback Credit:</span>
                    <span className="text-xl font-bold">
                      +{formatCurrency(results.buybackCredit)}
                    </span>
                  </div>
                  <div className="border-t border-emerald-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Net Investment:</span>
                      <span className="text-2xl font-bold text-emerald-600">
                        {formatCurrency(results.netCost)}
                      </span>
                    </div>
                    <div className="text-sm text-emerald-700 mt-1">
                      {results.savings}% savings from buyback program
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <TrendingUp size={24} className="text-blue-600 mr-3" />
                  <h4 className="text-xl font-bold text-gray-900">ROI Analysis</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monthly Value Gain:</span>
                    <span className="font-bold text-blue-600">
                      {formatCurrency(results.monthlyROI)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Payback Period:</span>
                    <span className="font-bold text-blue-600">{results.paybackMonths} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Annual ROI:</span>
                    <span className="font-bold text-green-600">
                      +{((results.monthlyROI * 12 / results.netCost) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl p-6">
                <div className="text-center">
                  <IndianRupee size={32} className="mx-auto mb-3" />
                  <div className="text-2xl font-bold mb-2">
                    Save {formatCurrency(results.buybackCredit)}
                  </div>
                  <div className="text-emerald-100">
                    With our furniture buyback program
                  </div>
                </div>
              </div>

              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg">
                Get Detailed Quote
              </button>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
      `}</style>
    </div>
  )
}