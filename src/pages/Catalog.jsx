import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'
import { fetchBooks } from '../lib/supabase'
import BookCard from '../components/BookCard'
import LoadingSpinner from '../components/LoadingSpinner'
import Modal from '../components/Modal'

export default function Catalog() {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedBook, setSelectedBook] = useState(null)
  const [categories, setCategories] = useState([])
  
  useEffect(() => {
    loadBooks()
  }, [])
  
  useEffect(() => {
    filterBooks()
  }, [searchTerm, categoryFilter, statusFilter, books])
  
  const loadBooks = async () => {
    setLoading(true)
    const { data, error } = await fetchBooks()
    if (!error && data) {
      setBooks(data)
      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(book => book.category))]
      setCategories(uniqueCategories)
    }
    setLoading(false)
  }
  
  const filterBooks = () => {
    let filtered = [...books]
    
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (categoryFilter) {
      filtered = filtered.filter(book => book.category === categoryFilter)
    }
    
    if (statusFilter) {
      filtered = filtered.filter(book => book.status === statusFilter)
    }
    
    setFilteredBooks(filtered)
  }
  
  const clearFilters = () => {
    setSearchTerm('')
    setCategoryFilter('')
    setStatusFilter('')
  }
  
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-serif font-bold gradient-text mb-4">
            Book Catalog
          </h1>
          <p className="text-xl text-parchment-300">
            Browse our extensive collection of literary treasures
          </p>
        </motion.div>
        
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6 mb-8"
        >
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title or author..."
                  className="input-field w-full pl-12"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="input-field w-full"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field w-full"
              >
                <option value="">All Status</option>
                <option value="available">Available</option>
                <option value="borrowed">Borrowed</option>
              </select>
            </div>
          </div>
          
          {/* Active Filters Display */}
          {(searchTerm || categoryFilter || statusFilter) && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gold-500/20">
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="px-3 py-1 bg-gold-500/20 text-gold-400 text-sm rounded-full">
                    Search: {searchTerm}
                  </span>
                )}
                {categoryFilter && (
                  <span className="px-3 py-1 bg-gold-500/20 text-gold-400 text-sm rounded-full">
                    Category: {categoryFilter}
                  </span>
                )}
                {statusFilter && (
                  <span className="px-3 py-1 bg-gold-500/20 text-gold-400 text-sm rounded-full">
                    Status: {statusFilter}
                  </span>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="text-parchment-300 hover:text-gold-400 transition-colors text-sm flex items-center space-x-1"
              >
                <X className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </motion.div>
        
        {/* Results Count */}
        <div className="mb-6 text-parchment-300">
          Showing <span className="text-gold-400 font-semibold">{filteredBooks.length}</span> books
        </div>
        
        {/* Books Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : filteredBooks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-serif font-bold text-parchment-100 mb-2">
              No Books Found
            </h3>
            <p className="text-parchment-400">
              Try adjusting your search or filters
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BookCard
                  book={book}
                  onSelect={setSelectedBook}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Book Detail Modal */}
      <Modal
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        title={selectedBook?.title}
      >
        {selectedBook && (
          <div className="space-y-4">
            <div>
              <h4 className="text-gold-400 font-semibold mb-1">Author</h4>
              <p className="text-parchment-200">{selectedBook.author}</p>
            </div>
            <div>
              <h4 className="text-gold-400 font-semibold mb-1">Publisher</h4>
              <p className="text-parchment-200">{selectedBook.publisher || 'N/A'}</p>
            </div>
            <div>
              <h4 className="text-gold-400 font-semibold mb-1">Year</h4>
              <p className="text-parchment-200">{selectedBook.year}</p>
            </div>
            <div>
              <h4 className="text-gold-400 font-semibold mb-1">Category</h4>
              <p className="text-parchment-200">{selectedBook.category}</p>
            </div>
            <div>
              <h4 className="text-gold-400 font-semibold mb-1">Status</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                selectedBook.status === 'available'
                  ? 'bg-forestGreen-600 text-parchment-100'
                  : 'bg-mahogany-600 text-parchment-100'
              }`}>
                {selectedBook.status === 'available' ? 'Available' : 'Currently Borrowed'}
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
