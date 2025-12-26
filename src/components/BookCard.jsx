import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Calendar, User } from 'lucide-react'

export default function BookCard({ book, onSelect, showActions = false }) {
  const isAvailable = book.status === 'available'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="card p-6 group cursor-pointer relative overflow-hidden"
      onClick={() => onSelect && onSelect(book)}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 group-hover:to-gold-600/5 transition-all duration-300" />
      
      {/* Status badge */}
      <div className="absolute top-4 right-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isAvailable
              ? 'bg-forestGreen-600 text-parchment-100'
              : 'bg-mahogany-600 text-parchment-100'
          }`}
        >
          {isAvailable ? 'Available' : 'Borrowed'}
        </span>
      </div>
      
      <div className="relative z-10">
        {/* Book Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-700 rounded-lg flex items-center justify-center mb-4 shadow-gold-glow group-hover:scale-110 transition-transform">
          <BookOpen className="w-8 h-8 text-darkLeather-900" />
        </div>
        
        {/* Book Details */}
        <h3 className="text-xl font-serif font-bold text-parchment-100 mb-2 group-hover:text-gold-400 transition-colors">
          {book.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-parchment-300 text-sm">
            <User className="w-4 h-4 mr-2 text-gold-500" />
            <span>{book.author}</span>
          </div>
          
          <div className="flex items-center text-parchment-300 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-gold-500" />
            <span>{book.year}</span>
          </div>
        </div>
        
        {/* Category & Publisher */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-darkLeather-700 text-gold-400 text-xs rounded-full border border-gold-500/30">
            {book.category}
          </span>
          {book.publisher && (
            <span className="px-3 py-1 bg-darkLeather-700 text-parchment-300 text-xs rounded-full">
              {book.publisher}
            </span>
          )}
        </div>
        
        {showActions && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
              isAvailable
                ? 'bg-forestGreen-600 hover:bg-forestGreen-500 text-parchment-100'
                : 'bg-darkLeather-700 text-parchment-400 cursor-not-allowed'
            }`}
            disabled={!isAvailable}
          >
            {isAvailable ? 'Borrow Book' : 'Currently Borrowed'}
          </motion.button>
        )}
      </div>
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-gold-500/20 group-hover:border-gold-500/50 transition-colors" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-gold-500/20 group-hover:border-gold-500/50 transition-colors" />
    </motion.div>
  )
}
