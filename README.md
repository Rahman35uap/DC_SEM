# Employee Management System - React + TypeScript + MUI

## 📚 প্রজেক্ট সম্পর্কে (About the Project)

এটি একটি Modern Employee Management System যা React, TypeScript, Material-UI দিয়ে তৈরি এবং IRIS database এর সাথে integrated।

This is a modern Employee Management System built with React, TypeScript, and Material-UI, integrated with IRIS database backend.

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **UI Library:** Material-UI (MUI) v5
- **Build Tool:** Vite
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Backend:** InterSystems IRIS (ObjectScript)
- **Database:** InterSystems IRIS

## 📁 Project Structure

```
employee-management-react/
├── public/                     # Static assets
├── src/
│   ├── components/             # Reusable components
│   │   ├── Layout.tsx          # Main layout with navbar
│   │   └── ProtectedRoute.tsx  # Authentication wrapper
│   ├── pages/                  # Page components
│   │   ├── SignIn.tsx          # Login page
│   │   ├── SignUp.tsx          # Registration page
│   │   ├── EmployeeList.tsx    # Employee list/grid
│   │   └── EmployeeDetail.tsx  # Add/Edit employee form
│   ├── services/               # API services
│   │   └── api.ts              # Axios config & API calls
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts            # Interface definitions
│   ├── utils/                  # Utility functions
│   │   └── auth.ts             # Authentication helpers
│   ├── App.tsx                 # Main app with routing
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite config with proxy
└── SETUP_GUIDE_BANGLA.md       # Detailed setup guide in Bangla
```

## 🚀 Quick Start (দ্রুত শুরু করুন)

### Prerequisites (প্রয়োজনীয় Software)

1. **Node.js** (v18 or higher)
   - Download: https://nodejs.org/
   - Check version: `node --version`

2. **IRIS Backend** (running and configured)
   - REST API should be available at: `http://localhost:52773/sem`

### Installation Steps (Installation করার ধাপ)

1. **Navigate to project folder:**
```bash
cd employee-management-react
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure backend URL** (if different from default):
   - Edit `vite.config.ts`
   - Change target URL in proxy configuration

4. **Start development server:**
```bash
npm run dev
```

5. **Open in browser:**
   - URL: http://localhost:5173

## 📖 Usage Guide (ব্যবহার নির্দেশিকা)

### 1. User Registration (নতুন Account তৈরি)
- Go to Sign Up page
- Enter name, email, password
- Password must be 8+ characters with letters and numbers
- Click "作成" (Create) button

### 2. Login (Login করা)
- Go to Sign In page
- Enter email and password
- Click "ログイン" (Login) button

### 3. View Employee List (Employee List দেখা)
- After login, you'll see employee list
- Features:
  - Search by keyword (ID, Name, Kana)
  - Filter retired employees
  - Sort by Employee ID or Name
  - Pagination

### 4. Add New Employee (নতুন Employee যোগ করা)
- Click "新規登録" (New Registration) button
- Fill in the form:
  - Employee ID (5 digits) *Required
  - Name *Required
  - Gender (Male/Female) *Required
  - Optional: Kana name, postal code, address, phone, department
- Click "登録" (Register) button
- Confirm in dialog

### 5. Edit Employee (Employee Edit করা)
- Click "修正" (Edit) button on any employee
- Modify the information
- Click "登録" (Register) button
- Confirm in dialog

### 6. Delete Employee (Employee Delete করা)
- Open employee in edit mode
- Click "削除" (Delete) button
- Confirm in dialog
- This is a soft delete (deleteFlg = 1)

## 🔧 Development Commands

```bash
# Start development server (hot reload enabled)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 API Endpoints

### Authentication
- `POST /sem/signin` - User login
- `POST /sem/signup` - User registration

### Employee Management
- `GET /sem/employees` - Get all employees
- `GET /sem/employee/:id` - Get employee by ID
- `POST /sem/employee` - Create new employee
- `PUT /sem/employee/:id` - Update employee
- `DELETE /sem/employee/:id` - Delete employee (soft delete)

## 📝 Key Features (প্রধান Features)

### 1. Authentication System
- Session-based authentication using localStorage
- Protected routes (redirect to login if not authenticated)
- Logout functionality

### 2. Employee CRUD Operations
- **Create:** Add new employee with validation
- **Read:** List all employees with search/filter
- **Update:** Edit employee information
- **Delete:** Soft delete (set deleteFlg = 1)

### 3. Advanced Features
- **Search:** Keyword search across multiple fields
- **Filter:** Show/hide retired employees
- **Sort:** Ascending/descending order by ID or Name
- **Pagination:** Configurable rows per page (5, 10, 25)

### 4. Form Validation
- Client-side validation before API call
- Required field checking
- Email format validation
- Password strength validation
- Employee ID format (5 digits)

### 5. User Experience
- Loading spinners during API calls
- Success/Error messages with alerts
- Confirmation dialogs for important actions
- Responsive design (works on mobile)

## 🐛 Troubleshooting (সমস্যা সমাধান)

### Issue 1: CORS Error
**Problem:** Browser shows CORS policy error  
**Solution:** Check `vite.config.ts` proxy configuration and IRIS backend CORS settings

### Issue 2: API Not Found (404)
**Problem:** API endpoints return 404  
**Solution:** Verify IRIS REST API is running and routes match backend

### Issue 3: Authentication Not Working
**Problem:** Login succeeds but redirects to login again  
**Solution:** Check browser localStorage (F12 → Application → Local Storage)

### Issue 4: Build Errors
**Problem:** `npm run build` fails  
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📦 Deployment to IRIS (IRIS এ Deploy করা)

### Step 1: Build Production Files
```bash
npm run build
```

### Step 2: Copy Files to IRIS
Copy contents of `dist/` folder to your IRIS CSP application directory.

### Step 3: Test
Open: `http://your-iris-server:port/sem/`

## 📚 Learning Resources

- React: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Material-UI: https://mui.com
- Vite: https://vitejs.dev

---

**Happy Coding! 🚀**

For detailed setup instructions in Bangla, see: **SETUP_GUIDE_BANGLA.md**
