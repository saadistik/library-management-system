import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, LogIn, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    const { data, error } = await signIn(email, password)
    
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/dashboard')
    }
  }
  
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        {/* Left Column - Decorative */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex flex-col justify-center"
        >
          <div className="card p-12">
            <div className="w-20 h-20 bg-gradient-to-br from-gold-500 to-gold-700 rounded-lg flex items-center justify-center mb-6 shadow-gold-glow">
              <BookOpen className="w-10 h-10 text-darkLeather-900" />
            </div>
            
            <h2 className="text-4xl font-serif font-bold gradient-text mb-4">
              Admin Portal
            </h2>
            
            <p className="text-parchment-300 text-lg mb-6">
              Access the complete library management system. Manage books, members, 
              and track all borrowing activities with ease.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gold-500 rounded-full mt-2" />
                <p className="text-parchment-300">Complete book inventory management</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gold-500 rounded-full mt-2" />
                <p className="text-parchment-300">Member registration and tracking</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gold-500 rounded-full mt-2" />
                <p className="text-parchment-300">Real-time loan management</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gold-500 rounded-full mt-2" />
                <p className="text-parchment-300">Visual analytics and reports</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Right Column - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center"
        >
          <div className="card p-12 w-full">
            <h1 className="text-3xl font-serif font-bold text-parchment-100 mb-2">
              Welcome Back
            </h1>
            <p className="text-parchment-400 mb-8">
              Sign in to access the admin dashboard
            </p>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-mahogany-500/20 border border-mahogany-500 text-mahogany-200 px-4 py-3 rounded-lg mb-6"
              >
                {error}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-parchment-200 font-semibold mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field w-full pl-12"
                    placeholder="admin@library.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-parchment-200 font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field w-full pl-12"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-darkLeather-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </motion.button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-gold-500/20">
              <p className="text-parchment-400 text-sm text-center">
                Demo credentials: admin@library.com / password123
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
