# Mock IRIS Backend Server - Setup Guide

## 📦 STEP 1: Install Dependencies

Open PowerShell/Command Prompt:

```powershell
# Create a new folder for the mock server
mkdir C:\mock-iris-backend
cd C:\mock-iris-backend

# Initialize npm
npm init -y

# Install required packages
npm install express cors body-parser
```

## 📄 STEP 2: Copy the Server File

1. Download `mock-server.js` 
2. Copy it to `C:\mock-iris-backend\mock-server.js`

## 🚀 STEP 3: Start the Server

```powershell
cd C:\mock-iris-backend
node mock-server.js
```

You should see:
```
============================================================
🚀 Mock IRIS Backend Server is running!
============================================================
📍 URL: http://localhost:52773

📋 Pre-loaded Accounts:
   - test@test.com / test123
   - demo@demo.com / demo123

👥 Pre-loaded Employees: 3
============================================================

✅ Ready to accept requests!
```

## 🧪 STEP 4: Test the Server

Open browser and go to:
```
http://localhost:52773/sem/employees
```

You should see JSON data with 3 employees!

## 🎯 STEP 5: Test Your React App

Now your React app will work!

```powershell
# In a NEW terminal window
cd D:\DataCube_WorkSpace\employee-management-react
npm run dev
```

Open `http://localhost:5173` and login with:
- Email: `test@test.com`
- Password: `test123`

## 📋 Pre-loaded Test Data

### Accounts:
1. **test@test.com** / test123
2. **demo@demo.com** / demo123

### Employees:
1. **00001** - 山田太郎 (Male, 営業部)
2. **00002** - 佐藤花子 (Female, 開発部)
3. **00003** - 鈴木一郎 (Male, 総務部, Retired)

## 🔧 Features

✅ Sign Up (create new accounts)
✅ Sign In (login)
✅ Get all employees
✅ Get employee by ID
✅ Create employee
✅ Update employee
✅ Delete employee (soft delete)
✅ Validation (duplicate email, duplicate employee ID)
✅ Retired employee filtering

## 📝 Notes

- Data is stored in memory (resets when server restarts)
- All CRUD operations work exactly like IRIS
- Console shows all requests for debugging
- CORS enabled (no CORS issues!)

## 🛑 To Stop the Server

Press `Ctrl + C` in the terminal

## ✅ Everything Should Work Now!

Your React app → Mock Server (port 52773) → Returns JSON

Have fun! 🎉