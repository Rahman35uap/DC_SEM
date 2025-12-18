# React Employee Management System - Setup Guide (বাংলা)

## 📋 বিষয়বস্তু (Contents)
1. [প্রয়োজনীয় Software Install](#1-প্রয়োজনীয়-software-install)
2. [Project Setup](#2-project-setup)
3. [File Structure বুঝা](#3-file-structure-বুঝা)
4. [কোড ব্যাখ্যা](#4-কোড-ব্যাখ্যা)
5. [Run করার নিয়ম](#5-run-করার-নিয়ম)
6. [Build করার নিয়ম](#6-build-করার-নিয়ম)

---

## 1. প্রয়োজনীয় Software Install

### Step 1.1: Node.js Install করুন
```bash
# Windows এর জন্য:
# https://nodejs.org/ থেকে LTS version download করুন (v18 বা v20)
# Install করার পর terminal/command prompt খুলে check করুন:

node --version
npm --version
```

**কেন দরকার?**
- Node.js = JavaScript runtime (backend এ না, frontend development এর জন্য)
- npm = Package manager (library install করতে হয়)

---

## 2. Project Setup

### Step 2.1: Vite দিয়ে React Project তৈরি করুন

```bash
# Terminal/Command Prompt খুলে এই command run করুন:
npm create vite@latest employee-management-react -- --template react-ts

# এরপর প্রশ্ন আসবে, এভাবে answer করুন:
# ✔ Project name: employee-management-react
# ✔ Select a framework: React
# ✔ Select a variant: TypeScript
```

**ব্যাখ্যা:**
- `vite` = Modern build tool (খুব fast)
- `react-ts` = React + TypeScript template
- TypeScript = JavaScript এর typed version (error কম হয়)

### Step 2.2: Project folder এ যান

```bash
cd employee-management-react
```

### Step 2.3: Dependencies Install করুন

```bash
# React Router (page navigation এর জন্য)
npm install react-router-dom

# Material-UI (UI components - Bootstrap এর মত)
npm install @mui/material @emotion/react @emotion/styled

# Material-UI Icons
npm install @mui/icons-material

# Date picker (date input এর জন্য)
npm install @mui/x-date-pickers

# Date library (date handling)
npm install dayjs

# Axios (API call করার জন্য - fetch এর alternative)
npm install axios

# Types (TypeScript এর জন্য type definitions)
npm install --save-dev @types/node
```

**প্রতিটি library কেন?**
- `react-router-dom` → Page change করতে (signin → employee list → details)
- `@mui/material` → Ready-made components (Button, TextField, Table etc.)
- `axios` → API call সহজে করতে (fetch এর চেয়ে ভালো)

---

## 3. File Structure বুঝা

আপনার project এ এই structure হবে:

```
employee-management-react/
├── public/                  # Static files (images etc.)
├── src/                     # Main source code folder
│   ├── components/          # Reusable components
│   │   ├── Layout.tsx       # Common navbar/layout
│   │   └── ProtectedRoute.tsx  # Authentication check
│   ├── pages/               # Individual pages
│   │   ├── SignIn.tsx       # Login page
│   │   ├── SignUp.tsx       # Registration page
│   │   ├── EmployeeList.tsx # Employee list/grid
│   │   └── EmployeeDetail.tsx # Add/Edit employee
│   ├── services/            # API calls
│   │   └── api.ts           # Axios configuration + API functions
│   ├── types/               # TypeScript types
│   │   └── index.ts         # Data types/interfaces
│   ├── utils/               # Helper functions
│   │   └── auth.ts          # Authentication helpers
│   ├── App.tsx              # Main app component (routing)
│   ├── main.tsx             # Entry point
│   └── index.css            # Global CSS
├── package.json             # Dependencies list
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # Project documentation
```

**বুঝতে হবে:**
- **components** = যা বারবার ব্যবহার হবে (Navbar, ProtectedRoute)
- **pages** = প্রতিটি screen/page
- **services** = API related code (IRIS backend এর সাথে communicate)
- **types** = Data structure define করা (TypeScript)

---

## 4. কোড ব্যাখ্যা

### 4.1 TypeScript Types (`src/types/index.ts`)

```typescript
// Employee data structure define করা
export interface Employee {
  id?: number;              // Optional (new employee এ থাকবে না)
  EmployeeId: string;       // Required field
  Name: string;             // Required field
  KanaName?: string;        // Optional field
  Sex: number;              // 1=Male, 2=Female
  PostCode?: string;
  Address?: string;
  PhoneNumber?: string;
  Department?: string;
  RetireFlg: boolean;       // true/false
}

// API response type
export interface ApiResponse<T> {
  message: string;
  data?: T;                 // Generic type (flexible)
  employees?: T[];          // For list response
}
```

**কেন TypeScript?**
- Compile time এ error দেখায় (runtime এ না)
- Auto-complete পাবেন editor এ
- Refactoring সহজ

### 4.2 API Service (`src/services/api.ts`)

```typescript
import axios from 'axios';

// Axios instance তৈরি (configuration একবার)
const api = axios.create({
  baseURL: '/sem',  // IRIS backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const authAPI = {
  signIn: (email: string, password: string) => 
    api.post('/signin', { inputEmail: email, inputPassword: password }),
  
  signUp: (data: SignUpData) => 
    api.post('/signup', data),
};

export const employeeAPI = {
  getAll: () => api.get('/employees'),
  getById: (id: number) => api.get(`/employee/${id}`),
  create: (data: Employee) => api.post('/employee', data),
  update: (id: number, data: Employee) => api.put(`/employee/${id}`, data),
  delete: (id: number) => api.delete(`/employee/${id}`),
};
```

**Axios benefits:**
- Automatic JSON parsing
- Request/response interceptors
- Error handling সহজ
- Base URL configuration

### 4.3 React Component Structure

```typescript
import { useState, useEffect } from 'react';

function EmployeeList() {
  // State management (data store)
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  // useEffect = component load হলে run হবে
  useEffect(() => {
    loadEmployees();
  }, []); // [] = শুধু একবার run হবে

  // API call function
  const loadEmployees = async () => {
    setLoading(true);
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data.employees);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? <CircularProgress /> : <EmployeeTable data={employees} />}
    </div>
  );
}
```

**React Hooks ব্যাখ্যা:**
- `useState` → Variable যার value change হলে UI re-render হয়
- `useEffect` → Side effects (API call, event listener) এর জন্য
- `async/await` → Asynchronous code সহজে লিখতে

### 4.4 Material-UI Components

```typescript
import { Button, TextField, Box } from '@mui/material';

// MUI components use করা
<TextField
  label="Employee ID"
  value={employeeId}
  onChange={(e) => setEmployeeId(e.target.value)}
  required
  fullWidth
/>

<Button variant="contained" color="primary" onClick={handleSubmit}>
  Submit
</Button>
```

**MUI Benefits:**
- Pre-styled components
- Responsive by default
- Accessibility built-in
- Theme customization

---

## 5. Run করার নিয়ম

### Development Mode (development করার সময়)

```bash
npm run dev
```

- Browser এ খুলুন: `http://localhost:5173`
- Code change করলে automatic refresh হবে (Hot Module Replacement)
- Console এ error দেখাবে

### Backend Proxy Setup

`vite.config.ts` file এ:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/sem': {
        target: 'http://localhost:52773',  // আপনার IRIS server port
        changeOrigin: true,
      },
    },
  },
});
```

**কেন proxy?**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:52773`
- Direct call করলে CORS error আসবে
- Proxy setup করলে `/sem` request backend এ যাবে

---

## 6. Build করার নিয়ম

### Production Build তৈরি করুন

```bash
npm run build
```

- `dist/` folder তৈরি হবে
- Optimized, minified code
- এই folder টা deploy করতে হবে

### Build Test করুন

```bash
npm run preview
```

- Production build locally test করতে পারবেন
- `http://localhost:4173` এ খুলবে

### IRIS এ Deploy করার নিয়ম

1. **Build করুন:**
```bash
npm run build
```

2. **dist folder এর content copy করুন:**
```bash
# dist/ folder এর সব file IRIS এর CSP application folder এ copy করুন
# Example: C:\InterSystems\IRIS\CSP\sem\
```

3. **IRIS Management Portal এ:**
   - System Administration → Security → Applications → Web Applications
   - `/sem` application check করুন
   - Resource নাম note করুন

4. **CSP file configuration:**
   - `index.html` কে CSP application এর root এ রাখুন
   - REST API routes: `/sem/signin`, `/sem/employees` etc.

---

## 🎯 Important Commands Summary

```bash
# Project setup (প্রথম বার)
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install

# Dependencies install
npm install react-router-dom @mui/material axios

# Development run
npm run dev

# Production build
npm run build

# Dependencies update
npm update

# Specific package install
npm install package-name

# Package uninstall
npm uninstall package-name
```

---

## 🔧 Troubleshooting (সমস্যা সমাধান)

### Problem 1: `npm: command not found`
**Solution:** Node.js properly install করুন, terminal restart করুন

### Problem 2: CORS Error
**Solution:** `vite.config.ts` এ proxy setup check করুন

### Problem 3: Module not found error
**Solution:** 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem 4: Port already in use
**Solution:**
```bash
# Port change করুন vite.config.ts এ
server: { port: 5174 }
```

### Problem 5: TypeScript errors
**Solution:** `tsconfig.json` check করুন, type definitions install করুন

---

## 📚 শিখতে হবে (Learning Resources)

### React Basics:
1. Components, Props, State
2. Hooks (useState, useEffect, useNavigate)
3. Event Handling
4. Conditional Rendering

### TypeScript Basics:
1. Types, Interfaces
2. Generics
3. Type Inference

### Material-UI:
1. Component API documentation
2. Theming
3. Grid system

---

## 🎓 Next Steps (পরবর্তী পদক্ষেপ)

1. ✅ Setup complete করুন
2. ✅ প্রতিটি file create করুন (নিচের section এ আছে)
3. ✅ Code টা বুঝার চেষ্টা করুন
4. ✅ Run করুন এবং test করুন
5. ✅ Customize করুন আপনার requirements অনুযায়ী

---

**সাহায্য দরকার?**
- React docs: https://react.dev
- MUI docs: https://mui.com
- TypeScript docs: https://www.typescriptlang.org
- Vite docs: https://vitejs.dev

---

আপনার যদি কোনো specific question থাকে, জিজ্ঞাসা করুন! 🚀
