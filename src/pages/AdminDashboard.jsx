import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Users,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  RotateCcw,
  LogOut as LogOutIcon,
  BarChart3,
} from 'lucide-react'
import {
  fetchBooks,
  fetchMembers,
  fetchLoans,
  createBook,
  updateBook,
  deleteBook,
  createMember,
  createLoan,
  returnLoan,
  getStats,
} from '../lib/supabase'
import Modal from '../components/Modal'
import LoadingSpinner from '../components/LoadingSpinner'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [books, setBooks] = useState([])
  const [members, setMembers] = useState([])
  const [loans, setLoans] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  
  // Modal states
  const [showBookModal, setShowBookModal] = useState(false)
  const [showMemberModal, setShowMemberModal] = useState(false)
  const [showLoanModal, setShowLoanModal] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  
  // Form states
  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    publisher: '',
    year: new Date().getFullYear(),
    category: '',
    status: 'available',
  })
  
  const [memberForm, setMemberForm] = useState({
    name: '',
    email: '',
    phone: '',
  })
  
  const [loanForm, setLoanForm] = useState({
    book_id: '',
    member_id: '',
    staff_id: '',
  })
  
  useEffect(() => {
    loadAllData()
  }, [])
  
  const loadAllData = async () => {
    setLoading(true)
    const [booksData, membersData, loansData, statsData] = await Promise.all([
      fetchBooks(),
      fetchMembers(),
      fetchLoans(),
      getStats(),
    ])
    
    if (booksData.data) setBooks(booksData.data)
    if (membersData.data) setMembers(membersData.data)
    if (loansData.data) setLoans(loansData.data)
    setStats(statsData)
    setLoading(false)
  }
  
  const handleAddBook = async () => {
    const { data, error } = await createBook(bookForm)
    if (!error) {
      setBooks([data[0], ...books])
      setShowBookModal(false)
      resetBookForm()
      loadAllData()
    }
  }
  
  const handleEditBook = async () => {
    const { data, error } = await updateBook(editingBook.id, bookForm)
    if (!error) {
      setBooks(books.map(b => b.id === editingBook.id ? data[0] : b))
      setShowBookModal(false)
      setEditingBook(null)
      resetBookForm()
    }
  }
  
  const handleDeleteBook = async (id) => {
    if (confirm('Are you sure you want to delete this book?')) {
      await deleteBook(id)
      setBooks(books.filter(b => b.id !== id))
      loadAllData()
    }
  }
  
  const handleAddMember = async () => {
    const { data, error } = await createMember(memberForm)
    if (!error) {
      setMembers([data[0], ...members])
      setShowMemberModal(false)
      resetMemberForm()
      loadAllData()
    }
  }
  
  const handleCheckOut = async () => {
    const { data, error } = await createLoan(loanForm)
    if (!error) {
      setShowLoanModal(false)
      resetLoanForm()
      loadAllData()
    }
  }
  
  const handleReturn = async (loanId, bookId) => {
    await returnLoan(loanId, bookId)
    loadAllData()
  }
  
  const resetBookForm = () => {
    setBookForm({
      title: '',
      author: '',
      publisher: '',
      year: new Date().getFullYear(),
      category: '',
      status: 'available',
    })
  }
  
  const resetMemberForm = () => {
    setMemberForm({ name: '', email: '', phone: '' })
  }
  
  const resetLoanForm = () => {
    setLoanForm({ book_id: '', member_id: '', staff_id: '' })
  }
  
  const openEditBook = (book) => {
    setEditingBook(book)
    setBookForm(book)
    setShowBookModal(true)
  }
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'loans', label: 'Loans', icon: TrendingUp },
  ]
  
  const chartData = [
    { name: 'Available', value: stats.availableBooks || 0, color: '#5a7f5c' },
    { name: 'Borrowed', value: stats.borrowedBooks || 0, color: '#c2493a' },
  ]
  
  if (loading) return <LoadingSpinner />
  
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-serif font-bold gradient-text mb-2">
            Admin Dashboard
          </h1>
          <p className="text-parchment-300">Manage your library system</p>
        </motion.div>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gold-500 text-darkLeather-900 shadow-gold-glow'
                  : 'bg-darkLeather-800 text-parchment-300 hover:bg-darkLeather-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-parchment-300">Total Books</h3>
                  <BookOpen className="w-8 h-8 text-gold-500" />
                </div>
                <p className="text-4xl font-bold text-parchment-100">
                  {stats.totalBooks}
                </p>
              </div>
              
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-parchment-300">Available</h3>
                  <div className="w-3 h-3 bg-forestGreen-500 rounded-full" />
                </div>
                <p className="text-4xl font-bold text-forestGreen-400">
                  {stats.availableBooks}
                </p>
              </div>
              
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-parchment-300">Borrowed</h3>
                  <div className="w-3 h-3 bg-mahogany-500 rounded-full" />
                </div>
                <p className="text-4xl font-bold text-mahogany-400">
                  {stats.borrowedBooks}
                </p>
              </div>
              
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-parchment-300">Members</h3>
                  <Users className="w-8 h-8 text-gold-500" />
                </div>
                <p className="text-4xl font-bold text-parchment-100">
                  {stats.totalMembers}
                </p>
              </div>
            </div>
            
            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-xl font-serif font-bold text-parchment-100 mb-6">
                  Book Status Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="card p-6">
                <h3 className="text-xl font-serif font-bold text-parchment-100 mb-6">
                  Recent Activity
                </h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  {loans.slice(0, 5).map((loan) => (
                    <div key={loan.id} className="flex items-center justify-between p-3 bg-darkLeather-700 rounded-lg">
                      <div>
                        <p className="text-parchment-100 font-semibold">
                          {loan.books?.title}
                        </p>
                        <p className="text-parchment-400 text-sm">
                          {loan.members?.name}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        loan.status === 'borrowed'
                          ? 'bg-mahogany-600 text-parchment-100'
                          : 'bg-forestGreen-600 text-parchment-100'
                      }`}>
                        {loan.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Books Tab */}
        {activeTab === 'books' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-parchment-100">
                Book Management
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setEditingBook(null)
                  resetBookForm()
                  setShowBookModal(true)
                }}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Book</span>
              </motion.button>
            </div>
            
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-darkLeather-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-gold-400 font-semibold">Title</th>
                      <th className="px-6 py-4 text-left text-gold-400 font-semibold">Author</th>
                      <th className="px-6 py-4 text-left text-gold-400 font-semibold">Category</th>
                      <th className="px-6 py-4 text-left text-gold-400 font-semibold">Year</th>
                      <th className="px-6 py-4 text-left text-gold-400 font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-gold-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book.id} className="border-t border-gold-500/20 hover:bg-darkLeather-700/50">
                        <td className="px-6 py-4 text-parchment-100">{book.title}</td>
                        <td className="px-6 py-4 text-parchment-300">{book.author}</td>
                        <td className="px-6 py-4 text-parchment-300">{book.category}</td>
                        <td className="px-6 py-4 text-parchment-300">{book.year}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            book.status === 'available'
                              ? 'bg-forestGreen-600 text-parchment-100'
                              : 'bg-mahogany-600 text-parchment-100'
                          }`}>
                            {book.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openEditBook(book)}
                              className="text-gold-400 hover:text-gold-300"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteBook(book.id)}
                              className="text-mahogany-400 hover:text-mahogany-300"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Members Tab */}
        {activeTab === 'members' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-parchment-100">
                Member Management
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMemberModal(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Member</span>
              </motion.button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card p-6"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-700 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-darkLeather-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-parchment-100">
                        {member.name}
                      </h3>
                      <p className="text-parchment-400 text-sm">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-parchment-300">
                      <span className="text-gold-400">Phone:</span> {member.phone}
                    </p>
                    <p className="text-parchment-300">
                      <span className="text-gold-400">Joined:</span>{' '}
                      {new Date(member.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Loans Tab */}
        {activeTab === 'loans' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-parchment-100">
                Loan Management
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLoanModal(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <LogOutIcon className="w-5 h-5" />
                <span>Check Out Book</span>
              </motion.button>
            </div>
            
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-darkLeather-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-gold-400 font-semibold">Book</th>
                      <th className="px-6 py-4 text-left text-gold-400 font-semibold">Member</th>
                      <th className="px-6 py-4 text-left text-gold-400 font-semibold">Borrow Date</th>
                      <th className="px-6 py-4 text-left text-gold-400 font-semibold">Return Date</th>
                      <th className="px-6 py-4 text-left text-gold-400 font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-gold-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans.map((loan) => (
                      <tr key={loan.id} className="border-t border-gold-500/20 hover:bg-darkLeather-700/50">
                        <td className="px-6 py-4 text-parchment-100">
                          {loan.books?.title || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-parchment-300">
                          {loan.members?.name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-parchment-300">
                          {new Date(loan.borrow_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-parchment-300">
                          {loan.return_date
                            ? new Date(loan.return_date).toLocaleDateString()
                            : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            loan.status === 'borrowed'
                              ? 'bg-mahogany-600 text-parchment-100'
                              : 'bg-forestGreen-600 text-parchment-100'
                          }`}>
                            {loan.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {loan.status === 'borrowed' && (
                            <button
                              onClick={() => handleReturn(loan.id, loan.book_id)}
                              className="text-forestGreen-400 hover:text-forestGreen-300 flex items-center space-x-1"
                            >
                              <RotateCcw className="w-4 h-4" />
                              <span>Return</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Book Modal */}
      <Modal
        isOpen={showBookModal}
        onClose={() => {
          setShowBookModal(false)
          setEditingBook(null)
          resetBookForm()
        }}
        title={editingBook ? 'Edit Book' : 'Add New Book'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-parchment-200 font-semibold mb-2">Title</label>
            <input
              type="text"
              value={bookForm.title}
              onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-parchment-200 font-semibold mb-2">Author</label>
            <input
              type="text"
              value={bookForm.author}
              onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-parchment-200 font-semibold mb-2">Publisher</label>
            <input
              type="text"
              value={bookForm.publisher}
              onChange={(e) => setBookForm({ ...bookForm, publisher: e.target.value })}
              className="input-field w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-parchment-200 font-semibold mb-2">Year</label>
              <input
                type="number"
                value={bookForm.year}
                onChange={(e) => setBookForm({ ...bookForm, year: parseInt(e.target.value) })}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-parchment-200 font-semibold mb-2">Category</label>
              <input
                type="text"
                value={bookForm.category}
                onChange={(e) => setBookForm({ ...bookForm, category: e.target.value })}
                className="input-field w-full"
                placeholder="Fiction, Science, etc."
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={editingBook ? handleEditBook : handleAddBook}
            className="btn-primary w-full"
          >
            {editingBook ? 'Update Book' : 'Add Book'}
          </motion.button>
        </div>
      </Modal>
      
      {/* Member Modal */}
      <Modal
        isOpen={showMemberModal}
        onClose={() => {
          setShowMemberModal(false)
          resetMemberForm()
        }}
        title="Add New Member"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-parchment-200 font-semibold mb-2">Name</label>
            <input
              type="text"
              value={memberForm.name}
              onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-parchment-200 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={memberForm.email}
              onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-parchment-200 font-semibold mb-2">Phone</label>
            <input
              type="tel"
              value={memberForm.phone}
              onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
              className="input-field w-full"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddMember}
            className="btn-primary w-full"
          >
            Add Member
          </motion.button>
        </div>
      </Modal>
      
      {/* Loan Modal */}
      <Modal
        isOpen={showLoanModal}
        onClose={() => {
          setShowLoanModal(false)
          resetLoanForm()
        }}
        title="Check Out Book"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-parchment-200 font-semibold mb-2">Select Book</label>
            <select
              value={loanForm.book_id}
              onChange={(e) => setLoanForm({ ...loanForm, book_id: e.target.value })}
              className="input-field w-full"
            >
              <option value="">Choose a book...</option>
              {books.filter(b => b.status === 'available').map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} by {book.author}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-parchment-200 font-semibold mb-2">Select Member</label>
            <select
              value={loanForm.member_id}
              onChange={(e) => setLoanForm({ ...loanForm, member_id: e.target.value })}
              className="input-field w-full"
            >
              <option value="">Choose a member...</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.email})
                </option>
              ))}
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckOut}
            disabled={!loanForm.book_id || !loanForm.member_id}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Out
          </motion.button>
        </div>
      </Modal>
    </div>
  )
}
