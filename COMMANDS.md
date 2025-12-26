# 📋 COMMAND REFERENCE

All commands to copy-paste for setup and development.

## Initial Setup Commands

### 1. Install Dependencies
```powershell
npm install
```

### 2. Create Environment File
```powershell
# Create .env file
New-Item -Path ".env" -ItemType File

# Open in notepad to edit
notepad .env
```

Then add:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Development Commands

### Start Development Server
```powershell
npm run dev
```
Opens at http://localhost:3000

### Build for Production
```powershell
npm run build
```
Creates optimized build in `dist/` folder

### Preview Production Build
```powershell
npm run preview
```
Test production build locally

## Git Commands (for Deployment)

### Initialize Git Repository
```powershell
git init
git add .
git commit -m "Initial commit: Library Management System"
```

### Connect to GitHub
```powershell
# Replace with your repo URL
git remote add origin https://github.com/yourusername/library-management.git
git branch -M main
git push -u origin main
```

## Vercel Deployment Commands

### Install Vercel CLI (One-time)
```powershell
npm install -g vercel
```

### Deploy to Vercel
```powershell
vercel
```

### Deploy to Production
```powershell
vercel --prod
```

## Troubleshooting Commands

### Clear Node Modules and Reinstall
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

### Clear Vite Cache
```powershell
Remove-Item -Recurse -Force node_modules/.vite
npm run dev
```

### Check Node/NPM Versions
```powershell
node --version
npm --version
```
Requires: Node 18+ and npm 9+

### List Installed Packages
```powershell
npm list --depth=0
```

## Supabase CLI Commands (Optional)

### Install Supabase CLI
```powershell
npm install -g supabase
```

### Initialize Supabase Locally
```powershell
supabase init
```

### Link to Remote Project
```powershell
supabase link --project-ref your-project-ref
```

### Pull Database Schema
```powershell
supabase db pull
```

## Package Management

### Install New Package
```powershell
npm install package-name
```

### Install Dev Dependency
```powershell
npm install --save-dev package-name
```

### Update All Packages
```powershell
npm update
```

### Check for Outdated Packages
```powershell
npm outdated
```

## Environment Variables

### Test Environment Variables
```powershell
# In PowerShell, print env vars
Get-Content .env
```

### Set Environment Variable Temporarily
```powershell
$env:VITE_SUPABASE_URL="your-url"
```

## Project Structure Commands

### View Project Tree
```powershell
tree /F
```

### Count Lines of Code
```powershell
# Count all .jsx and .js files
(Get-ChildItem -Path src -Recurse -Include *.jsx,*.js | Get-Content).Count
```

## Quick Start (All-in-One)

Copy and run this for complete setup:

```powershell
# 1. Install dependencies
npm install

# 2. Create .env file (then edit manually)
New-Item -Path ".env" -ItemType File
Write-Host "✅ Now edit .env and add your Supabase credentials"
Write-Host "Press any key after editing .env..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# 3. Start dev server
npm run dev
```

## Default Credentials

```
Admin Login:
Email: admin@library.com
Password: password123
```

## Port Configuration

Default port: 3000

To change port, edit `vite.config.js`:
```js
server: {
  port: 5000, // Your custom port
  open: true
}
```

## Browser URLs

- Development: http://localhost:3000
- Preview: http://localhost:4173 (after `npm run preview`)

## Useful NPM Scripts

View all available scripts:
```powershell
npm run
```

Current scripts in package.json:
- `dev`: Start development server
- `build`: Build for production
- `preview`: Preview production build

## Quick Reference: File Paths

Important files to know:
```
.env                          # Environment variables
src/lib/supabase.js          # Supabase configuration
src/App.jsx                  # Main app & routing
src/pages/AdminDashboard.jsx # Admin interface
tailwind.config.js           # Color theme
vite.config.js              # Vite settings
vercel.json                 # Vercel deployment config
database-setup.sql          # Database schema
```

## Emergency Reset

If everything breaks:
```powershell
# 1. Remove all generated files
Remove-Item -Recurse -Force node_modules, dist, .vite

# 2. Clean install
npm install

# 3. Restart dev server
npm run dev
```

---

**Keep this file handy for quick command reference!** 🚀
