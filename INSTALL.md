# 🚀 INSTALLATION INSTRUCTIONS

**Complete step-by-step guide to get your Library Management System running.**

---

## ⏱️ Estimated Time: 15 minutes

Follow these steps in order. Don't skip any!

---

## 📋 Prerequisites

Before starting, ensure you have:

- ✅ **Windows 10/11** (you're on Windows)
- ✅ **Node.js 18+** installed
  - Check: Open PowerShell and run `node --version`
  - Download from: https://nodejs.org (if needed)
- ✅ **Internet connection** (for package installation)
- ✅ **Web browser** (Chrome, Firefox, or Edge)
- ✅ **Text editor** (VS Code recommended)

---

## 🎯 STEP 1: Open Project in Terminal

1. Open **PowerShell** (Windows key + X, then select "Windows PowerShell")
2. Navigate to project directory:

```powershell
cd "C:\Users\hp\Desktop\library management"
```

3. Verify you're in the right place:

```powershell
Get-ChildItem
```

You should see files like `package.json`, `README.md`, etc.

---

## 📦 STEP 2: Install Dependencies

Run this command (takes 2-3 minutes):

```powershell
npm install
```

**What's happening?**
- Downloads React, Vite, Tailwind, and all required packages
- Creates `node_modules` folder with ~500MB of dependencies
- Generates `package-lock.json` for version locking

**Wait for**: "added XXX packages" message

**If you see errors**:
```powershell
# Try this alternative
npm install --legacy-peer-deps
```

---

## 🗄️ STEP 3: Set Up Supabase Account

### A. Create Supabase Project (5 minutes)

1. Go to: https://supabase.com
2. Click **"Start your project"**
3. Sign up with GitHub or email
4. After login, click **"New Project"**
5. Fill in the form:
   ```
   Name: Library Management System
   Database Password: [Create strong password - SAVE IT!]
   Region: [Choose closest to you]
   Pricing Plan: Free
   ```
6. Click **"Create new project"**
7. ⏳ Wait 2-3 minutes for database to provision

### B. Get API Credentials

1. In your Supabase dashboard, look for your project
2. Click on your project name
3. On the left sidebar, click **⚙️ Settings** (gear icon at bottom)
4. Click **API** in the settings menu
5. You'll see two important values:

   📋 **Project URL** (looks like):
   ```
   https://abcdefghijklmnop.supabase.co
   ```

   📋 **anon/public key** (long string starting with "eyJ..."):
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJz...
   ```

6. **Keep this tab open** - you'll need these values!

---

## 🔑 STEP 4: Configure Environment Variables

### A. Create .env File

In PowerShell (in your project directory):

```powershell
New-Item -Path ".env" -ItemType File
```

### B. Edit .env File

```powershell
notepad .env
```

### C. Add Your Credentials

Paste this into the opened Notepad, **replacing** with YOUR actual values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-key-here
```

**Important**:
- ❌ Do NOT use quotes around values
- ❌ Do NOT add spaces around `=`
- ✅ Replace with YOUR actual URL and key from Step 3B

### D. Save and Close

- Press `Ctrl+S` to save
- Close Notepad

### E. Verify (Optional)

```powershell
Get-Content .env
```

Should show your two environment variables.

---

## 🗃️ STEP 5: Set Up Database

### A. Open SQL Editor

1. Go back to your Supabase dashboard
2. On the left sidebar, click **🔧 SQL Editor**
3. Click **"New query"** button (top right)

### B. Run Setup Script

1. In your file explorer, open: `database-setup.sql` (in project folder)
2. **Select ALL** the SQL code (Ctrl+A)
3. **Copy** it (Ctrl+C)
4. Go back to Supabase SQL Editor
5. **Paste** the code (Ctrl+V)
6. Click **"Run"** button (or press Ctrl+Enter)
7. Wait for success message: ✅ "Success. No rows returned"

**What this does**:
- Creates 4 tables (books, members, staff, loans)
- Sets up Row Level Security policies
- Creates database indexes
- Inserts sample data (15 books, 5 members)

### C. Verify Tables Created

1. On left sidebar, click **🗂️ Table Editor**
2. You should see 4 tables:
   - books
   - members
   - staff
   - loans
3. Click on `books` - you should see 15 sample books

---

## 👤 STEP 6: Create Admin User

### A. Go to Authentication

1. In Supabase sidebar, click **🔐 Authentication**
2. Click **Users** (if not already selected)
3. Click **"Add user"** button (top right)
4. Select **"Create new user"**

### B. Enter Admin Credentials

Fill in the form:

```
Email: admin@library.com
Password: password123
```

**Important**: 
- ✅ Check the box: **"Auto Confirm User"**
- This allows immediate login without email verification

### C. Create User

- Click **"Create user"** button
- You should see the new user in the list

---

## 🎮 STEP 7: Start Development Server

Back in PowerShell, run:

```powershell
npm run dev
```

**What happens**:
- Vite starts development server
- Your default browser opens automatically
- URL: http://localhost:3000

**You should see**:
- ✨ Beautiful landing page
- 🎨 3D rotating book animation
- 📚 "Bibliotheca" header

---

## ✅ STEP 8: Verify Everything Works

### Test Public Features

1. **Home Page**: 
   - Move mouse over 3D book - it should react
   - Scroll down to see features
   - Animations should be smooth

2. **Catalog Page**:
   - Click "Explore Catalog" or navbar link
   - You should see 15 sample books
   - Try searching: type "gatsby" in search box
   - Try filtering: select "Fiction" from category dropdown

### Test Admin Features

3. **Login**:
   - Click "Admin Login" or "Login" in navbar
   - Enter credentials:
     ```
     Email: admin@library.com
     Password: password123
     ```
   - Click "Sign In"

4. **Dashboard**:
   - After login, you're automatically redirected
   - You should see:
     - Statistics cards (Total Books: 15, etc.)
     - Pie chart showing book distribution
     - Recent activity (empty for now)

5. **Books Tab**:
   - Click "Books" tab
   - Table showing all 15 books
   - Click "Add Book" - modal opens
   - Try adding a test book:
     ```
     Title: Test Book
     Author: Test Author
     Year: 2024
     Category: Fiction
     ```
   - Click "Add Book" - should appear in table

6. **Members Tab**:
   - Click "Members" tab
   - You should see 5 sample members
   - Click "Add Member" to test

7. **Loans Tab**:
   - Click "Loans" tab
   - Click "Check Out Book"
   - Select a book (marked Available)
   - Select a member
   - Click "Check Out"
   - Book status should change to "Borrowed"
   - Click "Return" button to return it

---

## 🎉 SUCCESS!

If all tests pass, your system is fully operational!

---

## 🐛 Troubleshooting

### Problem 1: "npm install" fails

```powershell
# Solution: Delete and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install --legacy-peer-deps
```

### Problem 2: "Module not found" errors

```powershell
# Solution: Clear cache and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .vite
npm install
npm run dev
```

### Problem 3: Can't connect to Supabase

**Check**:
1. Is your `.env` file in the root directory?
2. Are the values correct (no quotes, no spaces)?
3. Is your Supabase project active?

**Fix**:
```powershell
# Restart dev server
# Press Ctrl+C to stop
npm run dev
```

### Problem 4: Login doesn't work

**Check**:
1. Did you create the user in Supabase Authentication?
2. Did you check "Auto Confirm User"?
3. Are you using the exact email/password?

**Fix**:
- Go to Supabase > Authentication > Users
- Delete the user
- Create it again with "Auto Confirm User" checked

### Problem 5: 3D book doesn't show

**Check**:
- Your browser supports WebGL (Chrome/Firefox/Edge do)
- Open browser console (F12) - any errors?

**Fix**:
- Try hard refresh: Ctrl+Shift+R
- Try different browser

### Problem 6: Port 3000 already in use

```powershell
# Option 1: Kill process using port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Option 2: Use different port
# Edit vite.config.js and change port to 5000
npm run dev
```

---

## 📱 Next Steps

### Development
```powershell
# Keep developing
npm run dev
# Press Ctrl+C to stop server when done
```

### Build for Production
```powershell
npm run build
# Creates optimized build in 'dist' folder
```

### Deploy to Vercel
See **README.md** section "Deployment to Vercel"

---

## 📚 Quick Reference

### Project Structure
```
library management/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── lib/            # Supabase client
│   └── context/        # Auth context
├── package.json        # Dependencies
├── .env               # Your credentials
└── database-setup.sql # Database schema
```

### Important Commands
```powershell
npm install          # Install dependencies
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
```

### Default Login
```
Email: admin@library.com
Password: password123
```

### Ports
- Development: http://localhost:3000
- Preview: http://localhost:4173

---

## 🎓 Learning Resources

- **Supabase**: https://supabase.com/docs
- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Tailwind**: https://tailwindcss.com
- **Three.js**: https://threejs.org

---

## 💬 Need More Help?

1. Check **README.md** for detailed documentation
2. See **FEATURES.md** for feature explanations
3. Review **COMMANDS.md** for command reference
4. Check browser console (F12) for errors

---

**Congratulations! You now have a fully functional Library Management System!** 🎊📚

**Enjoy your beautiful Dark Academia library!** ✨

---

*Setup completed on: December 26, 2025*
