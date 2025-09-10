'use client'
import { useState, useEffect } from 'react'
import { MessageCircle, X, Send, User } from 'lucide-react'

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: "Hi! I'm Sarah from InteriorTransform. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const quickReplies = [
    "What's the process?",
    "How much does it cost?",
    "How long does it take?",
    "Do you buy furniture?"
  ]

  const agentResponses = {
    "What's the process?": "Great question! We have a simple 3-step process: 1) We assess and buy your old furniture, 2) Professional removal and space prep, 3) Install your new modern interior. The whole process takes 2-4 weeks.",
    "How much does it cost?": "Our pricing is very competitive! For a typical 1,000 sq ft office, total cost is $12,000-15,000, but with our buyback program, you could get $3,000-5,000 credit, making your net cost $8,000-12,000.",
    "How long does it take?": "Most projects are completed in 2-4 weeks depending on size and complexity. We work efficiently to minimize disruption to your business operations.",
    "Do you buy furniture?": "Yes! We purchase your existing furniture, fixtures, and decor at fair market value - typically 25-40% of original cost. This helps offset your renovation expenses significantly."
  }

  const sendMessage = (text) => {
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Simulate agent response
    setTimeout(() => {
      const agentMessage = {
        id: messages.length + 2,
        sender: 'agent',
        text: agentResponses[text] || "Thanks for your message! Let me connect you with a specialist who can provide detailed information about your specific needs.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, agentMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      sendMessage(newMessage)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50"
      >
        <MessageCircle size={24} />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                <User size={16} />
              </div>
              <div>
                <h4 className="font-bold">Sarah - Interior Specialist</h4>
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

          {/* Messages */}
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
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
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

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
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