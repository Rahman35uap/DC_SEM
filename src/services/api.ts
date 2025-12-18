/**
 * services/api.ts
 * 
 * API service layer - IRIS backend এর সাথে communicate করার জন্য
 * সব API calls এই file এ define করা আছে
 */

import axios, { AxiosInstance, CancelTokenSource } from 'axios';
import { 
  Employee, 
  SignInRequest, 
  SignUpRequest, 
  ApiResponse 
} from '../types';

// ===== Request Deduplication =====
// একই request বার বার যাওয়া থেকে বাঁচানোর জন্য
const pendingRequests = new Map<string, CancelTokenSource>();

/**
 * Generate unique key for request
 */
const getRequestKey = (config: any): string => {
  return `${config.method}-${config.url}`;
};

/**
 * Cancel duplicate pending requests
 */
const cancelPendingRequest = (key: string) => {
  const source = pendingRequests.get(key);
  if (source) {
    source.cancel('Duplicate request cancelled');
    pendingRequests.delete(key);
  }
};

// ===== Axios Instance তৈরি =====
// এটা একবার configuration করলে সব API call এ use করা যাবে
const api: AxiosInstance = axios.create({
  baseURL: '/sem',  // IRIS backend base URL (vite proxy এর মাধ্যমে route হবে)
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,   // 30 second timeout (increased from 10)
});

// ===== Request Interceptor =====
// প্রতিটি request এর আগে run হবে (duplicate cancellation)
api.interceptors.request.use(
  (config) => {
    // Generate request key
    const requestKey = getRequestKey(config);
    
    // Cancel any pending request with same key
    cancelPendingRequest(requestKey);
    
    // Create new cancel token for this request
    const source = axios.CancelToken.source();
    config.cancelToken = source.token;
    
    // Store the cancel token
    pendingRequests.set(requestKey, source);
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ===== Response Interceptor =====
// প্রতিটি response এর পরে run হবে (error handling)
api.interceptors.response.use(
  (response) => {
    // Success - cleanup pending request
    const requestKey = getRequestKey(response.config);
    pendingRequests.delete(requestKey);
    
    return response;
  },
  async (error) => {
    // Cleanup on error too
    if (error.config) {
      const requestKey = getRequestKey(error.config);
      pendingRequests.delete(requestKey);
    }
    
    // Skip retry for cancelled requests
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message);
      return Promise.reject(error);
    }
    
    // Error handling - NO RETRY!
    // Retry was causing more problems by multiplying failed requests
    if (error.response) {
      // Server response পেয়েছি কিন্তু error status code
      console.error('API Error Response:', error.response.data);
      console.error('Status Code:', error.response.status);
    } else if (error.request) {
      // Request গিয়েছে কিন্তু response পাইনি
      console.error('API No Response:', error.request);
    } else {
      // Request তৈরি করতেই error
      console.error('API Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// ===== Authentication API =====
// Login/Registration এর জন্য API functions

export const authAPI = {
  /**
   * Sign In / Login
   * User login করানোর জন্য
   * 
   * @param email - User email
   * @param password - User password
   * @returns Promise with API response
   */
  signIn: (email: string, password: string) => {
    const data: SignInRequest = {
      inputEmail: email,
      inputPassword: password,
    };
    return api.post<ApiResponse>('/signin', data);
  },

  /**
   * Sign Up / Registration
   * নতুন user registration করার জন্য
   * 
   * @param signUpData - Registration form data
   * @returns Promise with API response
   */
  signUp: (signUpData: SignUpRequest) => {
    return api.post<ApiResponse>('/signup', signUpData);
  },
};

// ===== Employee API =====
// Employee CRUD operations এর জন্য API functions

export const employeeAPI = {
  /**
   * Get all employees
   * সব employee এর list get করা
   * 
   * @returns Promise with employees array
   */
  getAll: () => {
    return api.get<ApiResponse<Employee>>('/employees');
  },

  /**
   * Get employee by ID
   * Specific employee এর details get করা
   * 
   * @param id - Employee ID (database ID, not EmployeeId)
   * @returns Promise with employee data
   */
  getById: (id: number) => {
    return api.get<ApiResponse<Employee>>(`/employee/${id}`);
  },

  /**
   * Create new employee
   * নতুন employee তৈরি করা
   * 
   * @param employeeData - Employee form data
   * @returns Promise with created employee data
   */
  create: (employeeData: Partial<Employee>) => {
    // Backend expects specific field names (lowercase)
    const payload = {
      employeeId: employeeData.EmployeeId,
      name: employeeData.Name,
      kanaName: employeeData.KanaName || '',
      sex: employeeData.Sex || 0,
      postCode: employeeData.PostCode || '',
      address: employeeData.Address || '',
      phoneNumber: employeeData.PhoneNumber || '',
      department: employeeData.Department || '',
      retireFlg: employeeData.RetireFlg ? 1 : 0,  // Convert boolean to 0/1
    };
    return api.post<ApiResponse>('/employee', payload);
  },

  /**
   * Update existing employee
   * Employee এর information update করা
   * 
   * @param id - Employee ID (database ID)
   * @param employeeData - Updated employee data
   * @returns Promise with API response
   */
  update: (id: number, employeeData: Partial<Employee>) => {
    // Backend expects specific field names (lowercase)
    const payload = {
      employeeId: employeeData.EmployeeId,
      name: employeeData.Name,
      kanaName: employeeData.KanaName || '',
      sex: employeeData.Sex || 0,
      postCode: employeeData.PostCode || '',
      address: employeeData.Address || '',
      phoneNumber: employeeData.PhoneNumber || '',
      department: employeeData.Department || '',
      retireFlg: employeeData.RetireFlg ? 1 : 0,  // Convert boolean to 0/1
    };
    return api.put<ApiResponse>(`/employee/${id}`, payload);
  },

  /**
   * Delete employee (soft delete)
   * Employee delete করা (soft delete - deleteFlg = 1)
   * 
   * @param id - Employee ID (database ID)
   * @returns Promise with API response
   */
  delete: (id: number) => {
    return api.delete<ApiResponse>(`/employee/${id}`);
  },
};

// Default export
export default api;