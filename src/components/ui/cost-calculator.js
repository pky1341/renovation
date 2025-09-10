'use client'
import { useState, useEffect } from 'react'
import { Calculator, TrendingUp, DollarSign } from 'lucide-react'

export default function CostCalculator() {
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
    const monthlyROI = netCost * 0.08 // 8% monthly productivity gain value

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

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Space Size (sq ft)</label>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={sqft}
              onChange={(e) => setSqft(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>500</span>
              <span className="font-bold text-emerald-600">{sqft} sq ft</span>
              <span>5,000</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Space Type</label>
            <select
              value={spaceType}
              onChange={(e) => setSpaceType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="office">Office Space</option>
              <option value="retail">Retail Store</option>
              <option value="restaurant">Restaurant</option>
              <option value="medical">Medical Office</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Current Furniture Value</label>
            <input
              type="range"
              min="2000"
              max="50000"
              step="500"
              value={furnitureValue}
              onChange={(e) => setFurnitureValue(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>$2K</span>
              <span className="font-bold text-emerald-600">${furnitureValue.toLocaleString()}</span>
              <span>$50K</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700">Transformation Cost:</span>
              <span className="text-xl font-bold text-gray-900">${results.totalCost?.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700">Buyback Credit:</span>
              <span className="text-xl font-bold text-green-600">+${results.buybackCredit?.toLocaleString()}</span>
            </div>
            <div className="border-t border-emerald-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">Net Investment:</span>
                <span className="text-2xl font-bold text-emerald-600">${results.netCost?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <div className="flex items-center mb-3">
              <TrendingUp size={20} className="text-blue-600 mr-2" />
              <span className="font-bold text-gray-900">ROI Analysis</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Monthly Value Gain:</span>
                <span className="font-bold text-blue-600">${results.monthlyROI?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Payback Period:</span>
                <span className="font-bold text-blue-600">{results.paybackMonths} months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Annual ROI:</span>
                <span className="font-bold text-green-600">+{((results.monthlyROI * 12 / results.netCost) * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg transition-colors">
            Get Detailed Quote
          </button>
        </div>
      </div>
    </div>
  )
}