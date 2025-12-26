import { createClient } from '@supabase/supabase-js'

// Get these from your Supabase project settings
// Go to: Project Settings > API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Auth helpers
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Database queries
export const fetchBooks = async (filters = {}) => {
  let query = supabase.from('books').select('*')
  
  if (filters.category) {
    query = query.eq('category', filters.category)
  }
  
  if (filters.author) {
    query = query.ilike('author', `%${filters.author}%`)
  }
  
  if (filters.status) {
    query = query.eq('status', filters.status)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  return { data, error }
}

export const fetchMembers = async () => {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export const fetchLoans = async () => {
  const { data, error } = await supabase
    .from('loans')
    .select(`
      *,
      books (title, author),
      members (name, email)
    `)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const createBook = async (bookData) => {
  const { data, error } = await supabase
    .from('books')
    .insert([bookData])
    .select()
  return { data, error }
}

export const updateBook = async (id, bookData) => {
  const { data, error } = await supabase
    .from('books')
    .update(bookData)
    .eq('id', id)
    .select()
  return { data, error }
}

export const deleteBook = async (id) => {
  const { data, error } = await supabase
    .from('books')
    .delete()
    .eq('id', id)
  return { data, error }
}

export const createMember = async (memberData) => {
  const { data, error } = await supabase
    .from('members')
    .insert([memberData])
    .select()
  return { data, error }
}

export const createLoan = async (loanData) => {
  const { data, error } = await supabase
    .from('loans')
    .insert([{
      ...loanData,
      borrow_date: new Date().toISOString(),
      status: 'borrowed'
    }])
    .select()
  
  if (!error) {
    // Update book status to borrowed
    await supabase
      .from('books')
      .update({ status: 'borrowed' })
      .eq('id', loanData.book_id)
  }
  
  return { data, error }
}

export const returnLoan = async (loanId, bookId) => {
  const { data, error } = await supabase
    .from('loans')
    .update({
      return_date: new Date().toISOString(),
      status: 'returned'
    })
    .eq('id', loanId)
    .select()
  
  if (!error) {
    // Update book status to available
    await supabase
      .from('books')
      .update({ status: 'available' })
      .eq('id', bookId)
  }
  
  return { data, error }
}

export const getStats = async () => {
  const { data: books } = await supabase.from('books').select('status')
  const { data: members } = await supabase.from('members').select('id')
  const { data: loans } = await supabase.from('loans').select('status')
  
  return {
    totalBooks: books?.length || 0,
    availableBooks: books?.filter(b => b.status === 'available').length || 0,
    borrowedBooks: books?.filter(b => b.status === 'borrowed').length || 0,
    totalMembers: members?.length || 0,
    activeLoans: loans?.filter(l => l.status === 'borrowed').length || 0,
  }
}
