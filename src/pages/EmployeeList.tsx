/**
 * pages/EmployeeList.tsx
 * 
 * Employee List Page - Main dashboard
 * Employee list দেখার এবং manage করার main page
 */

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
  Typography,
  InputAdornment,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';
import { employeeAPI } from '../services/api';
import { Employee } from '../types';

/**
 * Sort order type
 */
type Order = 'asc' | 'desc';

/**
 * EmployeeList Component
 * 
 * Features:
 * - Employee list display in table
 * - Search by keyword (ID, Name, KanaName)
 * - Show/hide retired employees
 * - Sort by EmployeeId or Name
 * - Pagination
 * - New registration button
 * - Edit button for each employee
 */
const EmployeeList = () => {
  const navigate = useNavigate();

  // ===== State Management =====
  // All employees from API
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  // Loading state
  const [loading, setLoading] = useState(true);
  
  // Error message
  const [error, setError] = useState<string | null>(null);

  // Search keyword
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // Show retired employees checkbox
  const [showRetired, setShowRetired] = useState(false);

  // Sorting
  const [orderBy, setOrderBy] = useState<'EmployeeId' | 'Name'>('EmployeeId');
  const [order, setOrder] = useState<Order>('asc');

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /**
   * Load employees from API
   * Component load হলে employee list fetch করা
   */
  useEffect(() => {
    let isMounted = true; // Track if component is still mounted
    
    const fetchData = async () => {
      if (isMounted) {
        await loadEmployees();
      }
    };
    
    fetchData();
    
    // Cleanup function - component unmount হলে run হবে
    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Fetch employees from backend
   */
  const loadEmployees = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await employeeAPI.getAll();
      
      console.log('API Response:', response.data); // Debug log
      
      // Check multiple possible response formats
      if (response.data.employees && Array.isArray(response.data.employees)) {
        setEmployees(response.data.employees);
      } else if (Array.isArray(response.data)) {
        // Sometimes API might return array directly
        setEmployees(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setError('社員データの取得に失敗しました。Response format: ' + JSON.stringify(response.data).substring(0, 100));
      }
    } catch (err: any) {
      // Ignore cancelled requests - they're not real errors!
      if (err.code === 'ERR_CANCELED' || err.code === 'ECONNABORTED' || err.message?.includes('cancel') || err.message?.includes('abort')) {
        console.log('Request was cancelled (duplicate request), ignoring...');
        return;
      }
      
      console.error('Error loading employees:', err);
      console.error('Error details:', err.response?.data);
      
      const errorMsg = err.response?.data?.message || err.message || '予期せぬエラーが発生しました。';
      setError(`エラー: ${errorMsg}. APIが正しく設定されているか確認してください。`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Filter and sort employees
   * useMemo = performance optimization (unnecessary re-calculation prevent করে)
   */
  const filteredEmployees = useMemo(() => {
    let filtered = employees;

    // Filter by retired status
    if (!showRetired) {
      filtered = filtered.filter(emp => !emp.RetireFlg);
    }

    // Filter by search keyword - ONLY if 3+ characters
    if (searchKeyword && searchKeyword.length >= 3) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(emp => {
        const matchesId = (emp.EmployeeId || '').toLowerCase().includes(keyword);
        const matchesName = (emp.Name || '').toLowerCase().includes(keyword);
        const matchesKana = (emp.KanaName || '').toLowerCase().includes(keyword);
        const matchesPhone = (emp.PhoneNumber || '').toLowerCase().includes(keyword);
        const matchesEmail = (emp.Email || '').toLowerCase().includes(keyword);
        return matchesId || matchesName || matchesKana || matchesPhone || matchesEmail;
      });
    }

    // Sort employees
    filtered = [...filtered].sort((a, b) => {
      const aValue = a[orderBy] || '';
      const bValue = b[orderBy] || '';
      
      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [employees, showRetired, searchKeyword, orderBy, order]);

  /**
   * Handle sort request
   * Column header click করলে sort order change করা
   */
  const handleSort = (property: 'EmployeeId' | 'Name') => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  /**
   * Handle page change
   * Pagination button click করলে page change করা
   */
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * Handle rows per page change
   * Rows per page dropdown change করলে
   */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);  // Reset to first page
  };

  /**
   * Navigate to employee detail page (Edit)
   */
  const handleEdit = (id: number) => {
    navigate(`/employees/${id}`);
  };

  /**
   * Navigate to new employee page
   */
  const handleNewEmployee = () => {
    navigate('/employees/new');
  };

  /**
   * Get sex label (Japanese)
   */
  const getSexLabel = (sex: number): string => {
    return sex === 1 ? '男性' : sex === 2 ? '女性' : '';
  };

  // Calculate pagination
  const paginatedEmployees = filteredEmployees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Layout>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            社員一覧
          </Typography>
        </Box>

        {/* Filters and Actions Section */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              alignItems: 'center',
            }}
          >
            {/* Search Field */}
            <TextField
              placeholder="キーワード検索 (3文字以上)"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              size="small"
              sx={{ flexGrow: 1, minWidth: 250 }}
              helperText={searchKeyword.length > 0 && searchKeyword.length < 3 ? "3文字以上入力してください" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/* Show Retired Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={showRetired}
                  onChange={(e) => setShowRetired(e.target.checked)}
                />
              }
              label="退職者も表示する"
            />

            {/* New Registration Button */}
            <Button
              variant="contained"
              color="warning"
              startIcon={<AddIcon />}
              onClick={handleNewEmployee}
              sx={{ ml: 'auto' }}
            >
              新規登録
            </Button>
          </Box>
        </Paper>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Employee Table */}
        <Paper>
          {loading ? (
            // Loading Spinner
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 400,
              }}
            >
              <CircularProgress />
            </Box>
          ) : filteredEmployees.length === 0 ? (
            // No Data Message
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 400,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                データがありません
              </Typography>
            </Box>
          ) : (
            <>
              {/* Table */}
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>アクション</TableCell>
                      
                      {/* Sortable Employee ID Column */}
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'EmployeeId'}
                          direction={orderBy === 'EmployeeId' ? order : 'asc'}
                          onClick={() => handleSort('EmployeeId')}
                        >
                          社員ID
                        </TableSortLabel>
                      </TableCell>

                      {/* Sortable Name Column */}
                      <TableCell>
                        <TableSortLabel
                          active={orderBy === 'Name'}
                          direction={orderBy === 'Name' ? order : 'asc'}
                          onClick={() => handleSort('Name')}
                        >
                          社員名
                        </TableSortLabel>
                      </TableCell>

                      <TableCell>カナ氏名</TableCell>
                      <TableCell>性別</TableCell>
                      <TableCell>電話番号</TableCell>
                      <TableCell>メールアドレス</TableCell>
                      <TableCell>退職</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {paginatedEmployees.map((employee) => (
                      <TableRow key={employee.id} hover>
                        {/* Edit Button */}
                        <TableCell>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={() => handleEdit(employee.id!)}
                          >
                            修正
                          </Button>
                        </TableCell>

                        {/* Employee ID */}
                        <TableCell>{employee.EmployeeId}</TableCell>

                        {/* Name */}
                        <TableCell>
                          {employee.Name}
                          {(employee.RetireFlg === 1) && (
                            <Chip
                              label="退職"
                              size="small"
                              color="default"
                              sx={{ ml: 1 }}
                            />
                          )}
                        </TableCell>

                        {/* Kana Name */}
                        <TableCell>{employee.KanaName || '-'}</TableCell>

                        {/* Sex */}
                        <TableCell>{getSexLabel(employee.Sex)}</TableCell>

                        {/* Phone Number */}
                        <TableCell>{employee.PhoneNumber || '-'}</TableCell>

                        {/* Email */}
                        <TableCell>{employee.Email || '-'}</TableCell>

                        {/* Retire Flag */}
                        <TableCell>
                          {employee.RetireFlg === 1 ? (
                            <Checkbox checked disabled />
                          ) : (
                            <Checkbox checked={false} disabled />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              <TablePagination
                component="div"
                count={filteredEmployees.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage="Rows per page:"
              />
            </>
          )}
        </Paper>
      </Container>
    </Layout>
  );
};

export default EmployeeList;