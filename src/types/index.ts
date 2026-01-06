/**
 * types/index.ts
 * 
 * এই file এ সব data structure define করা আছে
 * TypeScript এর জন্য এই type definitions দরকার
 */

// ===== Employee Interface =====
// Employee data এর structure define করা
export interface Employee {
  id?: number;                    // Optional - new employee এ id থাকবে না
  EmployeeId: string;             // Required - 5 digit employee ID
  Name: string;                   // Required - Employee name (Japanese characters supported)
  KanaName?: string;              // Optional - Furigana (katakana)
  Sex: number;                    // Required - 1 = Male (男性), 2 = Female (女性)
  PostCode?: string;              // Optional - Postal code (郵便番号)
  Address?: string;               // Optional - Address (住所)
  PhoneNumber?: string;           // Optional - Phone number (電話番号)
  Email?: string;                 // Optional - Email address (メールアドレス)
  Department?: string;            // Optional - Department (所属)
  RetireFlg: boolean;             // Required - Retirement flag (退職フラグ)
  upDateTime?: string;            // Optional - Update timestamp
}

// ===== API Response Interfaces =====
// Backend থেকে যে response আসে তার structure

// Generic API Response
// Generic = flexible, different data type এর জন্য reusable
export interface ApiResponse<T = any> {
  message: string;                // Success/Error message
  data?: T;                       // Response data (flexible type)
  employees?: T[];                // For employee list response
  id?: number;                    // For create/update response
}

// ===== Authentication Interfaces =====
// Login/Registration এর জন্য data structure

// Sign In Request
export interface SignInRequest {
  inputEmail: string;
  inputPassword: string;
}

// Sign Up Request
export interface SignUpRequest {
  inputName: string;
  inputEmail: string;
  inputPassword: string;
  inputConfirmPassword: string;
}

// User Info (localStorage এ save করা)
export interface UserInfo {
  isLoggedIn: boolean;
  userEmail: string;
}

// ===== Employee List Interfaces =====
// Employee list page এর জন্য

// Filter state
export interface EmployeeFilters {
  keyword: string;                // Search keyword
  showRetired: boolean;           // Show retired employees checkbox
  sortField: string;              // Sort by which field
  sortDirection: 'asc' | 'desc';  // Ascending or Descending
}

// Pagination state
export interface PaginationState {
  currentPage: number;
  rowsPerPage: number;
  totalItems: number;
}

// ===== Form Field Errors =====
// Form validation error messages

export interface FormErrors {
  [key: string]: string;          // Dynamic keys for different fields
}

// ===== Employee Detail Form State =====
// Employee add/edit form এর state

export interface EmployeeFormState {
  employeeId: string;
  name: string;
  kanaName: string;
  sex: number;
  postCode: string;
  address: string;
  phoneNumber: string;
  email: string;
  department: string;
  retireFlg: boolean;
}

// ===== Dialog State =====
// Confirmation dialog এর state

export interface DialogState {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}