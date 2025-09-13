'use client'
import { useState, useEffect } from 'react'
import { Search, Eye, Edit, Trash2, Download, Filter, Plus } from 'lucide-react'

export const ContactsAdmin = () => {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('view') // 'view', 'edit', 'delete'

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/contacts')
      const data = await res.json()
      if (data.success) {
        setInquiries(data.data)
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateInquiryStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (res.ok) {
        fetchInquiries()
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const deleteInquiry = async (id) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchInquiries()
        setShowModal(false)
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error)
    }
  }

  const exportData = () => {
    const csv = inquiries.map(i => 
      `${i.name},${i.email},${i.phone || ''},${i.spaceType},${i.status},${new Date(i.createdAt).toLocaleDateString()}`
    ).join('\n')
    const blob = new Blob([`Name,Email,Phone,Space Type,Status,Date\n${csv}`], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'inquiries.csv'
    a.click()
  }

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const openModal = (type, inquiry = null) => {
    setModalType(type)
    setSelectedInquiry(inquiry)
    setShowModal(true)
  }

  if (loading) {
    return <div className="p-4">Loading inquiries...</div>
  }

  return (
    <div>
      {/* Header with Search and Filters */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="px-6 py-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Inquiry Management</h2>
            <button onClick={exportData} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download size={16} className="mr-2" />
              Export CSV
            </button>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="quoted">Quoted</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Space Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {inquiry.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {inquiry.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {inquiry.phone || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {inquiry.spaceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={inquiry.status}
                      onChange={(e) => updateInquiryStatus(inquiry.id, e.target.value)}
                      className={`px-2 py-1 text-xs rounded-full border-0 focus:ring-2 ${
                        inquiry.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        inquiry.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                        inquiry.status === 'quoted' ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="quoted">Quoted</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal('view', inquiry)}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => openModal('delete', inquiry)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            {modalType === 'view' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Inquiry Details</h3>
                <div className="space-y-3">
                  <div><strong>Name:</strong> {selectedInquiry?.name}</div>
                  <div><strong>Email:</strong> {selectedInquiry?.email}</div>
                  <div><strong>Phone:</strong> {selectedInquiry?.phone || 'N/A'}</div>
                  <div><strong>Space Type:</strong> {selectedInquiry?.spaceType}</div>
                  <div><strong>Status:</strong> {selectedInquiry?.status}</div>
                  <div><strong>Message:</strong> {selectedInquiry?.message}</div>
                  <div><strong>Date:</strong> {new Date(selectedInquiry?.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            
            {modalType === 'delete' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Delete Inquiry</h3>
                <p className="mb-6">Are you sure you want to delete this inquiry from {selectedInquiry?.name}?</p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteInquiry(selectedInquiry?.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}