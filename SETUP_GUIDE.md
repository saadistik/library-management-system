# 🚀 SETUP GUIDE - Quick Start

## Step-by-Step Installation Instructions

### 1️⃣ Install Dependencies (2 minutes)

Open PowerShell in the project directory and run:

```powershell
npm install
```

This will install all required packages:
- React & React DOM
- Vite
- Tailwind CSS & plugins
- Framer Motion
- React Three Fiber & Three.js
- Supabase client
- React Router DOM
- Recharts
- Lucide React icons

### 2️⃣ Set Up Supabase Backend (5 minutes)

#### A. Create Supabase Project
1. Go to https://supabase.com
2. Click "Start your project" (sign up if needed)
3. Click "New Project"
4. Fill in:
   - **Name**: Library Management System
   - **Database Password**: (create a strong password, save it)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free
5. Click "Create new project"
6. Wait 2-3 minutes for database provisioning

#### B. Get API Credentials
1. In your Supabase project, go to **Project Settings** (gear icon)
2. Click **API** in the sidebar
3. Copy these two values:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon/public key** (long string starting with "eyJ...")

#### C. Configure Environment Variables
1. In the project root, create a file named `.env`
2. Add your credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace with YOUR actual values from step B!

### 3️⃣ Set Up Database (3 minutes)

#### A. Run SQL Script
1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Open the `database-setup.sql` file from this project
4. Copy ALL the SQL code
5. Paste into the Supabase SQL editor
6. Click **Run** (or press Ctrl+Enter)
7. Wait for "Success. No rows returned" message

This creates:
- ✅ 4 tables (books, members, staff, loans)
- ✅ Row Level Security policies
- ✅ Sample data (15 books, 5 members, 3 staff)
- ✅ Database indexes for performance

#### B. Create Admin User
1. In Supabase, go to **Authentication** > **Users**
2. Click **Add User** button
3. Click **Create new user**
4. Enter:
   - **Email**: `admin@library.com`
   - **Password**: `password123` (or your choice)
   - **Auto Confirm User**: ✅ (check this!)
5. Click **Create user**

### 4️⃣ Start Development Server (1 minute)

```powershell
npm run dev
```

The app will open automatically at: **http://localhost:3000**

## ✅ Verification Checklist

- [ ] Dependencies installed without errors
- [ ] `.env` file created with Supabase credentials
- [ ] Database tables created (check in Supabase Table Editor)
- [ ] Admin user created (check in Authentication > Users)
- [ ] Dev server running on port 3000
- [ ] Landing page displays with 3D book animation
- [ ] Can navigate to Catalog page
- [ ] Can login with admin credentials
- [ ] Dashboard accessible after login

## 🎯 Testing the Application

### Public Features
1. **Home Page**: See the 3D rotating book, move your mouse over it
2. **Catalog**: Click "Explore Catalog" or nav link
   - Search for books by title/author
   - Filter by category or status
   - Click a book card to see details

### Admin Features
1. **Login**: Click "Admin Login" or "Login" in navbar
   - Email: `admin@library.com`
   - Password: `password123`
2. **Dashboard Overview**:
   - View statistics cards
   - See pie chart of book distribution
   - Check recent activity
3. **Books Tab**:
   - Click "Add Book" to create new book
   - Click edit icon to modify book
   - Click delete icon to remove book
4. **Members Tab**:
   - Click "Add Member" to register new member
   - View member cards with details
5. **Loans Tab**:
   - Click "Check Out Book" to borrow a book
   - Select available book and member
   - Click "Return" button to return borrowed books
   - Watch book status change in real-time!

## 🛠️ Troubleshooting

### Problem: `npm install` fails
**Solution**: 
```powershell
# Delete node_modules and try again
Remove-Item -Recurse -Force node_modules
npm install
```

### Problem: "Invalid API key" error
**Solution**: 
- Double-check your `.env` file has correct Supabase credentials
- Ensure no extra spaces or quotes
- Restart dev server: Stop (Ctrl+C) and run `npm run dev` again

### Problem: Can't login / "Invalid credentials"
**Solution**: 
- Verify you created the admin user in Supabase Authentication
- Make sure you checked "Auto Confirm User"
- Try creating user again with different email

### Problem: 3D book not showing
**Solution**: 
- Your browser needs WebGL support (Chrome, Firefox, Edge work)
- Check browser console for errors (F12)
- Try hard refresh: Ctrl+Shift+R

### Problem: Database queries fail
**Solution**: 
- Verify SQL script ran successfully
- Check Supabase dashboard > Table Editor to see tables
- Ensure RLS policies were created (check in Authentication > Policies)

### Problem: Changes not showing
**Solution**: 
```powershell
# Hard refresh the browser
# Or restart dev server
# Press Ctrl+C, then:
npm run dev
```

## 📦 Building for Production

When ready to deploy:

```powershell
npm run build
```

This creates an optimized build in the `dist` folder.

## 🚢 Deploy to Vercel

### Option 1: Vercel CLI
```powershell
npm install -g vercel
vercel
```

### Option 2: Vercel Dashboard
1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables in settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click "Deploy"

Your app will be live at: `https://your-project.vercel.app`

## 💡 Tips

1. **Customize Colors**: Edit `tailwind.config.js` to change the color palette
2. **Add More Books**: Use the admin dashboard or insert via SQL Editor
3. **Enable Realtime**: Supabase Realtime is configured for instant updates
4. **Backup Database**: Use Supabase dashboard > Database > Backups

## 📞 Need Help?

Common issues and solutions:
- **Port 3000 already in use**: Change port in `vite.config.js`
- **Module not found**: Run `npm install` again
- **Supabase timeout**: Check your internet connection

## 🎉 You're All Set!

Enjoy your beautiful Dark Academia library management system!

Next steps:
- Customize the design to your liking
- Add more features (book reviews, reservations, etc.)
- Deploy to production
- Share with your users!

**Happy coding! 📚✨**
