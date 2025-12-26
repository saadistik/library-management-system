import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Users, TrendingUp, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import ThreeDBook from '../components/ThreeDBook'

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: 'Vast Collection',
      description: 'Access thousands of books across multiple genres and categories',
    },
    {
      icon: Users,
      title: 'Member Management',
      description: 'Easy registration and tracking system for all library members',
    },
    {
      icon: TrendingUp,
      title: 'Real-time Tracking',
      description: 'Monitor book availability and borrowing status instantly',
    },
  ]
  
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-gold-500/10 border border-gold-500/30 rounded-full px-4 py-2 mb-6"
              >
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span className="text-gold-400 text-sm font-semibold">
                  Welcome to the Future of Library Management
                </span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
                <span className="gradient-text">Bibliotheca</span>
                <br />
                <span className="text-parchment-100">Library System</span>
              </h1>
              
              <p className="text-xl text-parchment-300 mb-8 leading-relaxed">
                Experience the perfect blend of classical elegance and modern technology. 
                Manage your library with grace, efficiency, and style.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/catalog">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <span>Explore Catalog</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary"
                  >
                    Admin Login
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            
            {/* Right Column - 3D Book */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ThreeDBook />
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-forestGreen-500/5 rounded-full blur-3xl" />
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-darkLeather-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text mb-4">
              Why Choose Bibliotheca?
            </h2>
            <p className="text-xl text-parchment-300">
              A comprehensive system designed for modern libraries
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="card p-8 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-700 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-gold-glow">
                  <feature.icon className="w-8 h-8 text-darkLeather-900" />
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-parchment-100 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-parchment-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card p-12"
          >
            <h2 className="text-4xl font-serif font-bold gradient-text mb-6">
              Ready to Transform Your Library?
            </h2>
            <p className="text-xl text-parchment-300 mb-8">
              Join us in bringing the elegance of classical libraries into the digital age
            </p>
            <Link to="/catalog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Exploring
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
