/**
 * Mock IRIS Backend Server
 * Simple Express server that mimics IRIS REST API
 * 
 * To run:
 * 1. npm install express cors body-parser
 * 2. node mock-server.js
 * 3. Server will run on http://localhost:52773
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 52773;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ===== IN-MEMORY DATABASE =====
// Mock database (resets when server restarts)
let accounts = [
  { id: 1, email: 'test@test.com', password: 'test123', name: 'Test User' },
  { id: 2, email: 'demo@demo.com', password: 'demo123', name: 'Demo User' },
];

let employees = [
  {
    id: 1,
    EmployeeId: '00001',
    Name: '山田太郎',
    KanaName: 'ヤマダ タロウ',
    Sex: 1,
    PostCode: '100-0001',
    Address: '東京都千代田区千代田1-1',
    PhoneNumber: '03-1234-5678',
    Department: '営業部',
    RetireFlg: 0,
    deleteFlg: 0,
    upDateTime: '2024-01-01 10:00:00',
  },
  {
    id: 2,
    EmployeeId: '00002',
    Name: '佐藤花子',
    KanaName: 'サトウ ハナコ',
    Sex: 2,
    PostCode: '150-0001',
    Address: '東京都渋谷区渋谷2-1-1',
    PhoneNumber: '03-9876-5432',
    Department: '開発部',
    RetireFlg: 0,
    deleteFlg: 0,
    upDateTime: '2024-01-02 11:00:00',
  },
  {
    id: 3,
    EmployeeId: '00003',
    Name: '鈴木一郎',
    KanaName: 'スズキ イチロウ',
    Sex: 1,
    PostCode: '160-0001',
    Address: '東京都新宿区新宿3-1-1',
    PhoneNumber: '03-5555-1234',
    Department: '総務部',
    RetireFlg: 1,
    deleteFlg: 0,
    upDateTime: '2024-01-03 12:00:00',
  },
];

let nextAccountId = 3;
let nextEmployeeId = 4;

// ===== UTILITY FUNCTIONS =====
function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// ===== LOGGING MIDDLEWARE =====
app.use((req, res, next) => {
  console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  next();
});

// ===== AUTHENTICATION ENDPOINTS =====

// Sign Up
app.post('/sem/signup', (req, res) => {
  console.log('📝 Sign Up Request');
  const { inputName, inputEmail, inputPassword, inputConfirmPassword } = req.body;

  // Validation
  if (!inputName || !inputEmail || !inputPassword || !inputConfirmPassword) {
    return res.json({ message: 'All fields are required.' });
  }

  if (inputPassword !== inputConfirmPassword) {
    return res.json({ message: 'Passwords do not match.' });
  }

  // Check if email exists
  const existingAccount = accounts.find(acc => acc.email === inputEmail);
  if (existingAccount) {
    return res.json({ message: 'Email already registered.' });
  }

  // Create new account
  const newAccount = {
    id: nextAccountId++,
    email: inputEmail,
    password: inputPassword,
    name: inputName,
  };
  accounts.push(newAccount);

  console.log('✅ Account created:', newAccount.email);
  res.json({ message: 'Registration successful.' });
});

// Sign In
app.post('/sem/signin', (req, res) => {
  console.log('🔐 Sign In Request');
  const { inputEmail, inputPassword } = req.body;

  // Validation
  if (!inputEmail || !inputPassword) {
    return res.json({ message: 'Email and password are required.' });
  }

  // Find account
  const account = accounts.find(
    acc => acc.email === inputEmail && acc.password === inputPassword
  );

  if (account) {
    console.log('✅ Login successful:', account.email);
    res.json({ message: 'Authentication successful.' });
  } else {
    console.log('❌ Login failed: Invalid credentials');
    res.json({ message: 'Invalid email or password.' });
  }
});

// ===== EMPLOYEE ENDPOINTS =====

// Get All Employees
app.get('/sem/employees', (req, res) => {
  console.log('📋 Get All Employees');
  
  // Filter out deleted employees
  const activeEmployees = employees.filter(emp => emp.deleteFlg === 0);
  
  console.log(`✅ Returning ${activeEmployees.length} active employees`);
  res.json({
    message: 'Employees retrieved successfully',
    employees: activeEmployees,
  });
});

// Get Employee by ID
app.get('/sem/employee/:id', (req, res) => {
  console.log('👤 Get Employee by ID');
  const id = parseInt(req.params.id);
  
  const employee = employees.find(emp => emp.id === id);
  
  if (!employee) {
    console.log('❌ Employee not found:', id);
    return res.json({ message: 'Employee not found' });
  }
  
  if (employee.deleteFlg === 1) {
    console.log('❌ Employee has been deleted:', id);
    return res.json({ message: 'Employee has been deleted' });
  }
  
  console.log('✅ Employee found:', employee.Name);
  res.json({
    message: 'Employee retrieved successfully',
    ...employee,
  });
});

// Create Employee
app.post('/sem/employee', (req, res) => {
  console.log('➕ Create Employee');
  const { employeeId, name, kanaName, sex, postCode, address, phoneNumber, department, retireFlg } = req.body;

  // Validation
  if (!employeeId || !name) {
    return res.json({ message: 'Employee ID and Name are required.' });
  }

  // Check if EmployeeId already exists (among active employees)
  const existingEmployee = employees.find(
    emp => emp.EmployeeId === employeeId && emp.deleteFlg === 0
  );
  if (existingEmployee) {
    return res.json({ message: 'Employee ID already exists' });
  }

  // Create new employee
  const newEmployee = {
    id: nextEmployeeId++,
    EmployeeId: employeeId,
    Name: name,
    KanaName: kanaName || '',
    Sex: sex || 0,
    PostCode: postCode || '',
    Address: address || '',
    PhoneNumber: phoneNumber || '',
    Department: department || '',
    RetireFlg: retireFlg || 0,
    deleteFlg: 0,
    upDateTime: getCurrentDateTime(),
  };

  employees.push(newEmployee);
  
  console.log('✅ Employee created:', newEmployee.Name);
  res.json({
    message: 'Employee created successfully',
    id: newEmployee.id,
  });
});

// Update Employee
app.put('/sem/employee/:id', (req, res) => {
  console.log('✏️ Update Employee');
  const id = parseInt(req.params.id);
  const { employeeId, name, kanaName, sex, postCode, address, phoneNumber, department, retireFlg } = req.body;

  // Find employee
  const employeeIndex = employees.findIndex(emp => emp.id === id);
  
  if (employeeIndex === -1) {
    console.log('❌ Employee not found:', id);
    return res.json({ message: 'Employee not found' });
  }
  
  const employee = employees[employeeIndex];
  
  if (employee.deleteFlg === 1) {
    console.log('❌ Cannot update deleted employee:', id);
    return res.json({ message: 'Cannot update deleted employee' });
  }

  // Validation
  if (!employeeId || !name) {
    return res.json({ message: 'Employee ID and Name are required.' });
  }

  // Check if new EmployeeId conflicts with another employee
  if (employeeId !== employee.EmployeeId) {
    const conflict = employees.find(
      emp => emp.EmployeeId === employeeId && emp.deleteFlg === 0 && emp.id !== id
    );
    if (conflict) {
      return res.json({ message: 'Employee ID already exists' });
    }
  }

  // Update employee
  employees[employeeIndex] = {
    ...employee,
    EmployeeId: employeeId,
    Name: name,
    KanaName: kanaName || employee.KanaName,
    Sex: sex !== undefined ? sex : employee.Sex,
    PostCode: postCode !== undefined ? postCode : employee.PostCode,
    Address: address !== undefined ? address : employee.Address,
    PhoneNumber: phoneNumber !== undefined ? phoneNumber : employee.PhoneNumber,
    Department: department !== undefined ? department : employee.Department,
    RetireFlg: retireFlg !== undefined ? retireFlg : employee.RetireFlg,
    upDateTime: getCurrentDateTime(),
  };

  console.log('✅ Employee updated:', employees[employeeIndex].Name);
  res.json({ message: 'Employee updated successfully' });
});

// Delete Employee (Soft Delete)
app.delete('/sem/employee/:id', (req, res) => {
  console.log('🗑️ Delete Employee');
  const id = parseInt(req.params.id);

  // Find employee
  const employeeIndex = employees.findIndex(emp => emp.id === id);
  
  if (employeeIndex === -1) {
    console.log('❌ Employee not found:', id);
    return res.json({ message: 'Employee not found' });
  }
  
  const employee = employees[employeeIndex];
  
  if (employee.deleteFlg === 1) {
    console.log('❌ Employee already deleted:', id);
    return res.json({ message: 'Employee already deleted' });
  }

  // Soft delete
  employees[employeeIndex].deleteFlg = 1;
  employees[employeeIndex].upDateTime = getCurrentDateTime();

  console.log('✅ Employee deleted:', employee.Name);
  res.json({ message: 'Employee deleted successfully' });
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('🚀 Mock IRIS Backend Server is running!');
  console.log('='.repeat(60));
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`\n📋 Pre-loaded Accounts:`);
  accounts.forEach(acc => {
    console.log(`   - ${acc.email} / ${acc.password}`);
  });
  console.log(`\n👥 Pre-loaded Employees: ${employees.length}`);
  console.log('='.repeat(60));
  console.log('\n✅ Ready to accept requests!\n');
});