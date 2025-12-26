-- ============================================
-- BIBLIOTHECA LIBRARY MANAGEMENT SYSTEM
-- Database Setup Script for Supabase
-- ============================================

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS loans CASCADE;
DROP TABLE IF EXISTS staff CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS books CASCADE;

-- ============================================
-- CREATE TABLES
-- ============================================

-- Books Table
CREATE TABLE books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  publisher TEXT,
  year INTEGER NOT NULL,
  category TEXT NOT NULL,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'borrowed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Members Table
CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff Table
CREATE TABLE staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Loans Table
CREATE TABLE loans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE NOT NULL,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE NOT NULL,
  staff_id UUID REFERENCES staff(id) ON DELETE SET NULL,
  borrow_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  return_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'borrowed' CHECK (status IN ('borrowed', 'returned')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_books_status ON books(status);
CREATE INDEX idx_books_category ON books(category);
CREATE INDEX idx_books_author ON books(author);
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_loans_status ON loans(status);
CREATE INDEX idx_loans_book_id ON loans(book_id);
CREATE INDEX idx_loans_member_id ON loans(member_id);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CREATE RLS POLICIES
-- ============================================

-- Books Policies
CREATE POLICY "Anyone can read books" 
  ON books FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert books" 
  ON books FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update books" 
  ON books FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete books" 
  ON books FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Members Policies
CREATE POLICY "Anyone can read members" 
  ON members FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert members" 
  ON members FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update members" 
  ON members FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Loans Policies
CREATE POLICY "Anyone can read loans" 
  ON loans FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert loans" 
  ON loans FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update loans" 
  ON loans FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Staff Policies
CREATE POLICY "Anyone can read staff" 
  ON staff FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can manage staff" 
  ON staff FOR ALL 
  USING (auth.role() = 'authenticated');

-- ============================================
-- CREATE FUNCTIONS FOR AUTO-UPDATING TIMESTAMPS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON books
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON staff
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loans_updated_at BEFORE UPDATE ON loans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INSERT SAMPLE DATA
-- ============================================

-- Sample Books
INSERT INTO books (title, author, publisher, year, category, status) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Scribner', 1925, 'Fiction', 'available'),
('To Kill a Mockingbird', 'Harper Lee', 'J.B. Lippincott & Co.', 1960, 'Fiction', 'available'),
('1984', 'George Orwell', 'Secker & Warburg', 1949, 'Science Fiction', 'borrowed'),
('Pride and Prejudice', 'Jane Austen', 'T. Egerton', 1813, 'Romance', 'available'),
('The Hobbit', 'J.R.R. Tolkien', 'George Allen & Unwin', 1937, 'Fantasy', 'available'),
('Moby-Dick', 'Herman Melville', 'Harper & Brothers', 1851, 'Adventure', 'available'),
('War and Peace', 'Leo Tolstoy', 'The Russian Messenger', 1869, 'Historical Fiction', 'borrowed'),
('The Catcher in the Rye', 'J.D. Salinger', 'Little, Brown', 1951, 'Fiction', 'available'),
('Brave New World', 'Aldous Huxley', 'Chatto & Windus', 1932, 'Science Fiction', 'available'),
('The Lord of the Rings', 'J.R.R. Tolkien', 'George Allen & Unwin', 1954, 'Fantasy', 'available'),
('Jane Eyre', 'Charlotte Brontë', 'Smith, Elder & Co.', 1847, 'Romance', 'available'),
('Wuthering Heights', 'Emily Brontë', 'Thomas Cautley Newby', 1847, 'Romance', 'borrowed'),
('The Odyssey', 'Homer', 'Ancient Text', -800, 'Epic', 'available'),
('Crime and Punishment', 'Fyodor Dostoevsky', 'The Russian Messenger', 1866, 'Psychological Fiction', 'available'),
('The Brothers Karamazov', 'Fyodor Dostoevsky', 'The Russian Messenger', 1880, 'Philosophical Fiction', 'available');

-- Sample Members
INSERT INTO members (name, email, phone) VALUES
('John Smith', 'john.smith@email.com', '+1234567890'),
('Emma Watson', 'emma.watson@email.com', '+1234567891'),
('Michael Brown', 'michael.brown@email.com', '+1234567892'),
('Sarah Johnson', 'sarah.johnson@email.com', '+1234567893'),
('David Lee', 'david.lee@email.com', '+1234567894');

-- Sample Staff
INSERT INTO staff (name, position, email) VALUES
('Admin User', 'Head Librarian', 'admin@library.com'),
('Jane Doe', 'Assistant Librarian', 'jane.doe@library.com'),
('Robert Wilson', 'Library Clerk', 'robert.wilson@library.com');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Verify tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';

-- Count sample data
SELECT 
  (SELECT COUNT(*) FROM books) as total_books,
  (SELECT COUNT(*) FROM members) as total_members,
  (SELECT COUNT(*) FROM staff) as total_staff,
  (SELECT COUNT(*) FROM loans) as total_loans;

-- ============================================
-- SETUP COMPLETE
-- ============================================

-- To create an admin user:
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add User" > "Create New User"
-- 3. Email: admin@library.com
-- 4. Password: password123 (or your choice)
-- 5. Click "Create User"
