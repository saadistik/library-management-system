# 🎴 QUICK REFERENCE CARD

**Keep this handy for daily development!**

---

## ⚡ Essential Commands

```powershell
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build           # Build for production
npm run preview         # Preview production build

# Package Management
npm install             # Install all dependencies
npm install <package>   # Add new package
npm update             # Update packages

# Git Commands
git status             # Check changes
git add .              # Stage all changes
git commit -m "..."    # Commit changes
git push               # Push to remote

# Troubleshooting
Remove-Item -Recurse -Force node_modules  # Delete node_modules
npm install --legacy-peer-deps           # Force install
```

---

## 🔑 Default Credentials

```
Admin Login:
Email:    admin@library.com
Password: password123

Supabase Dashboard:
URL: https://app.supabase.com
```

---

## 📁 Key File Locations

```
Configuration:
├── .env                  # API keys (SECRET!)
├── package.json          # Dependencies
├── vite.config.js        # Build settings
└── tailwind.config.js    # Design tokens

Source Code:
├── src/App.jsx           # Routes & layout
├── src/main.jsx          # Entry point
├── src/index.css         # Global styles
├── src/lib/supabase.js   # Database client
└── src/pages/            # Page components

Documentation:
├── README.md            # Main docs
├── INSTALL.md           # Setup guide
└── FEATURES.md          # Feature list
```

---

## 🎨 Color Variables

```css
Dark Academia Palette:
mahogany-900:    #6f2f28
forestGreen-600: #5a7f5c
gold-500:        #f19c13
parchment-100:   #fdf9f5
darkLeather-900: #3f3935
```

---

## 🔧 Common Tasks

### Add New Book
1. Login to dashboard
2. Click "Books" tab
3. Click "Add Book" button
4. Fill form and submit

### Check Out Book
1. Go to "Loans" tab
2. Click "Check Out Book"
3. Select book (available only)
4. Select member
5. Click "Check Out"

### Return Book
1. Go to "Loans" tab
2. Find borrowed book
3. Click "Return" button
4. Confirm action

---

## 🗄️ Database Quick Reference

### Tables
- `books` - Book inventory
- `members` - Library members
- `staff` - Staff accounts
- `loans` - Borrowing records

### Key Columns
```sql
books:
  - id, title, author, year
  - category, status, publisher

members:
  - id, name, email, phone

loans:
  - id, book_id, member_id
  - borrow_date, return_date
  - status (borrowed/returned)
```

---

## 🚨 Troubleshooting Quick Fixes

### Can't start server
```powershell
Remove-Item -Recurse -Force node_modules .vite
npm install
npm run dev
```

### Login not working
1. Check Supabase user exists
2. Verify "Auto Confirm User" checked
3. Check .env credentials

### Changes not showing
- Hard refresh: `Ctrl + Shift + R`
- Clear browser cache
- Restart dev server

### Database errors
1. Check Supabase project active
2. Verify RLS policies exist
3. Check API keys in .env

---

## 🌐 URLs & Ports

```
Development:  http://localhost:3000
Preview:      http://localhost:4173
Supabase:     https://app.supabase.com
Vercel:       https://vercel.com
GitHub:       https://github.com
```

---

## 📊 Component Props Reference

### BookCard
```jsx
<BookCard 
  book={bookObject}
  onSelect={handleSelect}
  showActions={boolean}
/>
```

### Modal
```jsx
<Modal 
  isOpen={boolean}
  onClose={function}
  title={string}
>
  {children}
</Modal>
```

### ProtectedRoute
```jsx
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

---

## 🎯 State Structure

### AuthContext
```javascript
{
  user: {
    id: "uuid",
    email: "admin@library.com"
  },
  loading: false
}
```

### Book Object
```javascript
{
  id: "uuid",
  title: "Book Title",
  author: "Author Name",
  publisher: "Publisher",
  year: 2024,
  category: "Fiction",
  status: "available", // or "borrowed"
  created_at: "2025-12-26T..."
}
```

### Loan Object
```javascript
{
  id: "uuid",
  book_id: "uuid",
  member_id: "uuid",
  borrow_date: "2025-12-26T...",
  return_date: null, // or timestamp
  status: "borrowed" // or "returned"
}
```

---

## 🔐 Environment Variables

```env
# Required in .env file:
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...

# Access in code:
import.meta.env.VITE_SUPABASE_URL
```

---

## 📱 Responsive Classes

```css
Tailwind Breakpoints:
sm:  min-width: 640px
md:  min-width: 768px
lg:  min-width: 1024px
xl:  min-width: 1280px
2xl: min-width: 1536px

Example:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Mobile: 1 column
  Tablet: 2 columns
  Desktop: 3 columns
```

---

## ⚡ Performance Tips

```
1. Keep images < 500KB
2. Use lazy loading for images
3. Minimize database queries
4. Use React.memo for heavy components
5. Debounce search inputs
6. Use production build for deployment
```

---

## 🐛 Debug Checklist

```
Issues?
□ Check browser console (F12)
□ Check Network tab for failed requests
□ Verify .env file exists and correct
□ Check Supabase project status
□ Verify node_modules installed
□ Try hard refresh (Ctrl+Shift+R)
□ Restart dev server
□ Check for TypeScript/linting errors
```

---

## 🎨 Custom Utility Classes

```css
.btn-primary     → Gold gradient button
.btn-secondary   → Forest green button
.card           → Dark leather card
.input-field    → Styled input box
.gradient-text  → Gold gradient text
```

---

## 🔄 Git Workflow

```powershell
# Daily workflow
git status                      # Check changes
git add .                       # Stage changes
git commit -m "Add feature X"   # Commit
git push                        # Push to remote

# Feature branch
git checkout -b feature-name    # Create branch
# ... make changes ...
git add .
git commit -m "Complete feature"
git checkout main               # Switch back
git merge feature-name          # Merge
```

---

## 📞 Support Resources

```
Documentation:    See /docs folder
Supabase Docs:    https://supabase.com/docs
React Docs:       https://react.dev
Tailwind Docs:    https://tailwindcss.com
Three.js Docs:    https://threejs.org
```

---

## 🎓 Learning Resources

```
React:           https://react.dev/learn
Supabase:        https://supabase.com/docs/guides
Tailwind:        https://tailwindcss.com/docs
Framer Motion:   https://www.framer.com/motion
Three.js:        https://threejs.org/manual
```

---

## ⏰ Development Time Estimates

```
Task                    Time
─────────────────────  ──────
Setup project          15 min
Create component       15-30 min
Add new page           30-60 min
Database changes       20-30 min
Styling tweaks         10-20 min
Bug fixes              5-30 min
Testing feature        15-30 min
```

---

## 🎯 Next Steps After Setup

```
1. □ Test all features
2. □ Customize colors/fonts
3. □ Add more sample data
4. □ Deploy to Vercel
5. □ Set up custom domain
6. □ Add more features
7. □ Write tests
8. □ Optimize performance
```

---

**Print this out or keep it as a bookmark!** 📌

*Quick Reference v1.0 - December 26, 2025*
