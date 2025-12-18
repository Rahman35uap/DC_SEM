/**
 * App.tsx
 * 
 * Main Application Component
 * Routing configuration এবং main app structure
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetail from './pages/EmployeeDetail';

/**
 * Material-UI Theme Configuration
 * আপনি চাইলে theme customize করতে পারবেন
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#0d6efd',  // Bootstrap primary blue
    },
    secondary: {
      main: '#6c757d',  // Bootstrap secondary gray
    },
    warning: {
      main: '#ffc107',  // Bootstrap warning yellow
    },
    error: {
      main: '#dc3545',  // Bootstrap danger red
    },
    success: {
      main: '#198754',  // Bootstrap success green
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

/**
 * App Component
 * 
 * Routes:
 * - / → Redirect to /employees
 * - /signin → Login page (Public)
 * - /signup → Registration page (Public)
 * - /employees → Employee list (Protected)
 * - /employees/new → New employee form (Protected)
 * - /employees/:id → Edit employee form (Protected)
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline = Global CSS reset এবং default styles */}
      <CssBaseline />
      
      <BrowserRouter>
        <Routes>
          {/* Default Route - Redirect to employees */}
          <Route path="/" element={<Navigate to="/employees" replace />} />

          {/* Public Routes - Authentication not required */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes - Authentication required */}
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employees/:id"
            element={
              <ProtectedRoute>
                <EmployeeDetail />
              </ProtectedRoute>
            }
          />

          {/* 404 Not Found - Redirect to employees */}
          <Route path="*" element={<Navigate to="/employees" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
