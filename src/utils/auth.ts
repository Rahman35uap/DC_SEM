/**
 * utils/auth.ts
 * 
 * Authentication helper functions
 * Login/Logout এর জন্য helper functions
 */

import { UserInfo } from '../types';

// localStorage key constants
const AUTH_KEY = 'isLoggedIn';
const EMAIL_KEY = 'userEmail';

/**
 * Check if user is logged in
 * User login করা আছে কিনা check করে
 * 
 * @returns boolean - true if logged in, false otherwise
 */
export const isAuthenticated = (): boolean => {
  // localStorage থেকে login status check করা
  const isLoggedIn = localStorage.getItem(AUTH_KEY);
  return isLoggedIn === 'true';
};

/**
 * Get current user info
 * Current user এর information get করা
 * 
 * @returns UserInfo object or null
 */
export const getCurrentUser = (): UserInfo | null => {
  const isLoggedIn = localStorage.getItem(AUTH_KEY) === 'true';
  const userEmail = localStorage.getItem(EMAIL_KEY);

  if (isLoggedIn && userEmail) {
    return {
      isLoggedIn: true,
      userEmail: userEmail,
    };
  }

  return null;
};

/**
 * Save user login info to localStorage
 * User login করলে localStorage এ save করা
 * 
 * @param email - User email
 */
export const setAuthData = (email: string): void => {
  localStorage.setItem(AUTH_KEY, 'true');
  localStorage.setItem(EMAIL_KEY, email);
};

/**
 * Clear authentication data (logout)
 * Logout করার সময় localStorage clear করা
 */
export const clearAuthData = (): void => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(EMAIL_KEY);
};

/**
 * Get auth token (if you implement token-based auth)
 * Token-based authentication এর জন্য (future enhancement)
 * 
 * @returns token string or null
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

/**
 * Set auth token
 * Token save করা (future enhancement)
 * 
 * @param token - JWT token or similar
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};
