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

// Live Chat Component
export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: "Hi! I'm Sarah from OfficeTransform. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [newMessage, setNewMessage] = useState('')

  const quickReplies = [
    "What's the process?",
    "How much does it cost?",
    "How long does it take?",
    "Do you buy furniture?"
  ]

  const sendMessage = (text) => {
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages(prev => [...prev, userMessage])
    setNewMessage('')

    setTimeout(() => {
      const agentMessage = {
        id: messages.length + 2,
        sender: 'agent',
        text: "Thanks for your message! Let me connect you with a specialist.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, agentMessage])
    }, 1000)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50"
      >
        <MessageCircle size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col">
          <div className="bg-emerald-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                <User size={16} />
              </div>
              <div>
                <h4 className="font-bold">Sarah - Specialist</h4>
                <div className="flex items-center text-sm opacity-90">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Online now
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-emerald-500 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-emerald-100' : 'text-gray-500'
                  }`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(reply)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); if (newMessage.trim()) sendMessage(newMessage) }} className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}