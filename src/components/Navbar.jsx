import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, LogOut, User, Menu, X, Library } from 'lucide-react'
import { signOut } from '../lib/supabase'

export default function Navbar({ user }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const navigate = useNavigate()
  
  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }
  
  const navLinks = [
    { name: 'Home', path: '/', icon: Library },
    { name: 'Catalog', path: '/catalog', icon: BookOpen },
  ]
  
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-darkLeather-900/95 backdrop-blur-md border-b border-gold-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-700 rounded-lg flex items-center justify-center shadow-gold-glow">
                <Library className="w-7 h-7 text-darkLeather-900" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold gradient-text">
                  Bibliotheca
                </h1>
                <p className="text-xs text-parchment-400">Library Management</p>
              </div>
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-parchment-100 hover:text-gold-400 transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </motion.div>
              </Link>
            ))}
            
            {user ? (
              <>
                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <User className="w-5 h-5" />
                    <span>Dashboard</span>
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="text-parchment-300 hover:text-mahogany-400 transition-colors flex items-center space-x-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </motion.button>
              </>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </motion.button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gold-400 hover:text-gold-300 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-darkLeather-800 border-t border-gold-500/20"
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-3 text-parchment-100 hover:text-gold-400 transition-colors py-2">
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </div>
              </Link>
            ))}
            
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full btn-primary justify-center">
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="w-full text-mahogany-400 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full btn-secondary justify-center">
                  Login
                </button>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
