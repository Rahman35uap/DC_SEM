/**
 * components/Layout.tsx
 * 
 * Layout Component - Common layout with navbar
 * সব page এর common layout (navbar সহ)
 */

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { clearAuthData } from '../utils/auth';

/**
 * Props interface
 * children = page content
 */
interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout Component
 * 
 * Features:
 * - Top navbar with app title
 * - Logout button
 * - Content area for pages
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  /**
   * Handle logout
   * Logout button click করলে:
   * 1. localStorage clear করা
   * 2. signin page এ redirect করা
   */
  const handleLogout = () => {
    clearAuthData();              // Clear localStorage
    navigate('/signin');          // Redirect to signin page
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* App Bar / Navbar */}
      <AppBar position="static">
        <Toolbar>
          {/* App Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            簡易社員管理システム
          </Typography>
          
          {/* Logout Button */}
          <Button 
            color="inherit" 
            onClick={handleLogout}
          >
            ログアウト
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,  // padding
          backgroundColor: '#f5f5f5'  // Light gray background
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
