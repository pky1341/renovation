'use client'
import { useState, useEffect } from 'react'
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react'

export default function ProjectFilter({ 
  projects = [], 
  onFilterChange,
  className = ""
}) {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    location: 'all',
    size: 'all',
    timeline: 'all'
  })
  
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('newest')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Extract unique values for filter options
  const categories = [...new Set(projects.map(p => p.category))].filter(Boolean)
  const locations = [...new Set(projects.map(p => p.location))].filter(Boolean)
  const sizes = [...new Set(projects.map(p => p.size))].filter(Boolean)
  const timelines = [...new Set(projects.map(p => p.timeline))].filter(Boolean)

  useEffect(() => {
    const filteredProjects = filterProjects()
    onFilterChange?.(filteredProjects, viewMode, sortBy)
  }, [filters, viewMode, sortBy, projects])

  const filterProjects = () => {
    let filtered = [...projects]

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(project =>
        project.title?.toLowerCase().includes(searchTerm) ||
        project.description?.toLowerCase().includes(searchTerm) ||
        project.location?.toLowerCase().includes(searchTerm)
      )
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(project => project.category === filters.category)
    }

    // Location filter
    if (filters.location !== 'all') {
      filtered = filtered.filter(project => project.location === filters.location)
    }

    // Size filter
    if (filters.size !== 'all') {
      filtered = filtered.filter(project => project.size === filters.size)
    }

    // Timeline filter
    if (filters.timeline !== 'all') {
      filtered = filtered.filter(project => project.timeline === filters.timeline)
    }

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        case 'oldest':
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
        case 'title':
          return (a.title || '').localeCompare(b.title || '')
        case 'location':
          return (a.location || '').localeCompare(b.location || '')
        default:
          return 0
      }
    })

    return filtered
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      location: 'all',
      size: 'all',
      timeline: 'all'
    })
  }

  const activeFiltersCount = Object.values(filters).filter(
    (value, index) => index > 0 && value !== 'all'
  ).length + (filters.search ? 1 : 0)

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Filter size={24} className="text-emerald-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Filter Projects</h3>
          {activeFiltersCount > 0 && (
            <span className="ml-3 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List size={18} />
            </button>
          </div>
          
          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center px-4 py-2 rounded-lg border-2 transition-colors ${
              showAdvanced 
                ? 'border-emerald-500 text-emerald-600 bg-emerald-50' 
                : 'border-gray-200 text-gray-600 hover:border-emerald-300'
            }`}
          >
            <SlidersHorizontal size={18} className="mr-2" />
            Advanced
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects by title, description, or location..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Quick Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-emerald-500 focus:outline-none"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-emerald-500 focus:outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title">By Title</option>
          <option value="location">By Location</option>
        </select>

        <select
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-emerald-500 focus:outline-none"
        >
          <option value="all">All Locations</option>
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>

        <button
          onClick={clearFilters}
          className="border-2 border-gray-200 text-gray-600 rounded-lg px-4 py-2 hover:border-red-300 hover:text-red-600 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Size</label>
            <select
              value={filters.size}
              onChange={(e) => handleFilterChange('size', e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-emerald-500 focus:outline-none"
            >
              <option value="all">All Sizes</option>
              {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
            <select
              value={filters.timeline}
              onChange={(e) => handleFilterChange('timeline', e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-emerald-500 focus:outline-none"
            >
              <option value="all">All Timelines</option>
              {timelines.map(timeline => (
                <option key={timeline} value={timeline}>{timeline}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {filterProjects().length} of {projects.length} projects
          </span>
          <span>
            View: {viewMode === 'grid' ? 'Grid' : 'List'} | Sort: {sortBy}
          </span>
        </div>
      </div>
    </div>
  )
}