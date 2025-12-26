# 📚 Bibliotheca - Library Management System

A stunning, production-ready Library Management System with a **Dark Academia** aesthetic, built with modern web technologies.

![Tech Stack](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E?logo=supabase)

## 🎨 Features

### ✨ UI/UX Design
- **Dark Academia Aesthetic** with deep mahogany, forest greens, and gold accents
- **3D Book Animation** on landing page using React Three Fiber
- **Smooth Animations** powered by Framer Motion
- **Fully Responsive** design for mobile, tablet, and desktop
- **Custom Scrollbar** and elegant typography

### 🔐 Authentication
- Secure admin authentication via Supabase Auth
- Protected routes with session management
- Real-time auth state updates

### 📖 Public Features
- Beautiful landing page with 3D book hero section
- Searchable catalog with filters (Category, Author, Status)
- Real-time book availability status
- Detailed book information modals

### 🛠️ Admin Dashboard
- **Overview Tab**: Visual analytics with charts (Recharts)
  - Total books, available, borrowed statistics
  - Pie chart showing distribution
  - Recent activity feed
  
- **Book Management**:
  - Add, Edit, Delete books
  - Track status (Available/Borrowed)
  - Comprehensive book details (Title, Author, Publisher, Year, Category)
  
- **Member Management**:
  - Register new members
  - View member profiles
  - Track membership dates
  
- **Loan System**:
  - Check out books to members
  - Automatic status updates
  - Return book interface
  - Transaction history

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- A Supabase account (free tier works)

### Installation

1. **Clone/Navigate to the project directory**
```powershell
cd "c:\Users\hp\Desktop\library management"
```

2. **Install dependencies**
```powershell
npm install
```

3. **Set up Supabase**
   - Go to [supabase.com](https://supabase.com) and create a new project
   - Wait for the database to be provisioned (2-3 minutes)
   - Go to **Project Settings** > **API**
   - Copy your `Project URL` and `anon/public` key

4. **Configure environment variables**
   - Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

5. **Set up database tables**
   - Go to your Supabase project dashboard
   - Navigate to **SQL Editor**
   - Copy and paste the SQL from `database-setup.sql` (see below)
   - Run the query

6. **Start development server**
```powershell
npm run dev
```

The app will open at `http://localhost:3000`

## 🗄️ Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- Books Table
CREATE TABLE books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  publisher TEXT,
  year INTEGER NOT NULL,
  category TEXT NOT NULL,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'borrowed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Members Table
CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff Table (Optional - for tracking staff)
CREATE TABLE staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Loans Table
CREATE TABLE loans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  staff_id UUID REFERENCES staff(id),
  borrow_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  return_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'borrowed' CHECK (status IN ('borrowed', 'returned')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read books" ON books FOR SELECT USING (true);
CREATE POLICY "Public can read members" ON members FOR SELECT USING (true);
CREATE POLICY "Public can read loans" ON loans FOR SELECT USING (true);

-- Create policies for authenticated users (admin)
CREATE POLICY "Authenticated users can insert books" ON books FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update books" ON books FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete books" ON books FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert members" ON members FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert loans" ON loans FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update loans" ON loans FOR UPDATE USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO books (title, author, publisher, year, category, status) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Scribner', 1925, 'Fiction', 'available'),
('To Kill a Mockingbird', 'Harper Lee', 'J.B. Lippincott & Co.', 1960, 'Fiction', 'available'),
('1984', 'George Orwell', 'Secker & Warburg', 1949, 'Science Fiction', 'borrowed'),
('Pride and Prejudice', 'Jane Austen', 'T. Egerton', 1813, 'Romance', 'available'),
('The Hobbit', 'J.R.R. Tolkien', 'George Allen & Unwin', 1937, 'Fantasy', 'available'),
('Moby-Dick', 'Herman Melville', 'Harper & Brothers', 1851, 'Adventure', 'available'),
('War and Peace', 'Leo Tolstoy', 'The Russian Messenger', 1869, 'Historical Fiction', 'borrowed'),
('The Catcher in the Rye', 'J.D. Salinger', 'Little, Brown', 1951, 'Fiction', 'available');

INSERT INTO members (name, email, phone) VALUES
('John Smith', 'john.smith@email.com', '+1234567890'),
('Emma Watson', 'emma.watson@email.com', '+1234567891'),
('Michael Brown', 'michael.brown@email.com', '+1234567892');
```

## 🔑 Creating an Admin User

After setting up the database:

1. Go to your Supabase dashboard
2. Navigate to **Authentication** > **Users**
3. Click **Add User** > **Create New User**
4. Enter:
   - Email: `admin@library.com`
   - Password: `password123` (or your choice)
5. Click **Create User**

Now you can login with these credentials!

## 📁 Project Structure

```
library-management/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ThreeDBook.jsx   # 3D book animation
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── BookCard.jsx     # Book display card
│   │   ├── Modal.jsx        # Modal component
│   │   ├── LoadingSpinner.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Landing page
│   │   ├── Login.jsx        # Authentication
│   │   ├── Catalog.jsx      # Book catalog
│   │   └── AdminDashboard.jsx
│   ├── context/             # React Context
│   │   └── AuthContext.jsx  # Auth state management
│   ├── lib/                 # Utilities
│   │   └── supabase.js      # Supabase client & helpers
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json              # Vercel deployment config
└── README.md
```

## 🎨 Color Palette

The Dark Academia theme uses:

- **Mahogany**: `#6f2f28` (primary dark)
- **Forest Green**: `#5a7f5c` (accents)
- **Gold**: `#f19c13` (highlights)
- **Parchment**: `#fdf9f5` (text)
- **Dark Leather**: `#3f3935` (backgrounds)

## 🚢 Deployment to Vercel

1. **Push to GitHub**
```powershell
git init
git add .
git commit -m "Initial commit: Library Management System"
git branch -M main
git remote add origin your-repo-url
git push -u origin main
```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click **New Project**
   - Import your GitHub repository
   - Add environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Click **Deploy**

The `vercel.json` configuration is already set up for SPA routing!

## 📊 Tech Stack Details

- **Frontend Framework**: React 18.2 with Vite
- **Styling**: Tailwind CSS 3.4 with custom configuration
- **Animations**: Framer Motion 11.0
- **3D Graphics**: React Three Fiber 8.16 + Three.js 0.163
- **Charts**: Recharts 2.12
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Routing**: React Router DOM 6.22
- **Icons**: Lucide React 0.344
- **Deployment**: Vercel-ready configuration

## 🔧 Available Scripts

```powershell
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm run preview  # Preview production build locally
```

## 📝 API Endpoints (Supabase)

All database operations are handled through Supabase:

- **Books**: CRUD operations with status tracking
- **Members**: Registration and profile management
- **Loans**: Check out/return with automatic status updates
- **Stats**: Real-time analytics dashboard

## 🎯 Key Features Implementation

### 3D Book Component
- Uses React Three Fiber for WebGL rendering
- Mouse-reactive rotation with smooth interpolation
- Floating animation with sine wave
- Gold accent lighting

### Loan System
- Select available books and members
- Automatically updates book status to "borrowed"
- Return functionality that reverts status to "available"
- Transaction history with timestamps

### Real-time Updates
- Supabase Realtime for instant data sync
- Auth state changes propagated immediately
- No manual refresh needed

## 🐛 Troubleshooting

### Build Errors
- Ensure Node.js version is 18+
- Delete `node_modules` and run `npm install` again

### Supabase Connection Issues
- Verify `.env` variables are set correctly
- Check Supabase project is active
- Ensure RLS policies are created

### 3D Component Not Rendering
- Check browser WebGL support
- Ensure `three` and `@react-three/fiber` are installed

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built with ❤️ using modern web technologies and a passion for elegant design.

---

**Enjoy your magical library experience! ✨📚**
