/**
 * components/ProtectedRoute.tsx
 * 
 * Protected Route Component
 * এই component user login করা আছে কিনা check করে
 * Login না থাকলে signin page এ redirect করে
 */

import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

/**
 * Props interface
 * children = যে component protect করতে হবে
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute Component
 * 
 * ব্যবহার:
 * <ProtectedRoute>
 *   <EmployeeList />
 * </ProtectedRoute>
 * 
 * যদি user login না করা থাকে, signin page এ redirect হবে
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check if user is authenticated
  if (!isAuthenticated()) {
    // User login করেনি - signin page এ redirect করো
    return <Navigate to="/signin" replace />;
  }

  // User login করা আছে - requested component টা show করো
  return <>{children}</>;
};

export default ProtectedRoute;
