/**
 * Employee List Page Component
 * 社員一覧画面
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Alert,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Logout as LogoutIcon,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';
import { getAllEmployees } from '../services/api';
import { 
  clearLoginSession, 
  filterEmployees, 
  paginateEmployees,
  getPaginationInfo,
  formatGender,
} from '../utils/helpers';
import type { Employee, EmployeeFilters, PaginationState } from '../types';

const EmployeeListPage = () => {
  const navigate = useNavigate();
  
  // State management
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters state
  const [filters, setFilters] = useState<EmployeeFilters>({
    keyword: '',
    showRetired: false,
    sortField: '',
    sortDirection: 'asc',
  });
  
  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    rowsPerPage: 10,
    totalItems: 0,
  });

  // Load employees on component mount
  useEffect(() => {
    loadEmployees();
  }, []);

  // Apply filters whenever employees or filters change
  useEffect(() => {
    const filtered = filterEmployees(employees, filters);
    setFilteredEmployees(filtered);
    setPagination(prev => ({
      ...prev,
      currentPage: 1,  // Reset to page 1 when filtering
      totalItems: filtered.length,
    }));
  }, [employees, filters]);

  // Load all employees from API
  const loadEmployees = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        '社員データの取得に失敗しました。APIが正しく設定されているか確認してください。'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    clearLoginSession();
    navigate('/login');
  };

  // Handle search
  const handleSearch = () => {
    // Filters are applied automatically via useEffect
    // This function is just for the search button click
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof EmployeeFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle sort
  const handleSort = (field: 'EmployeeId' | 'Name') => {
    setFilters(prev => ({
      ...prev,
      sortField: field,
      sortDirection: 
        prev.sortField === field && prev.sortDirection === 'asc' 
          ? 'desc' 
          : 'asc',
    }));
  };

  // Handle pagination change
  const handlePageChange = (direction: 'next' | 'prev') => {
    setPagination(prev => ({
      ...prev,
      currentPage: direction === 'next' 
        ? prev.currentPage + 1 
        : prev.currentPage - 1,
    }));
  };

  const handleRowsPerPageChange = (value: number) => {
    setPagination(prev => ({
      ...prev,
      rowsPerPage: value,
      currentPage: 1,
    }));
  };

  // Get current page employees
  const currentPageEmployees = paginateEmployees(
    filteredEmployees,
    pagination.currentPage,
    pagination.rowsPerPage
  );

  // Calculate pagination info
  const paginationInfo = getPaginationInfo(
    pagination.currentPage,
    pagination.rowsPerPage,
    pagination.totalItems
  );

  const totalPages = Math.ceil(pagination.totalItems / pagination.rowsPerPage);
  const canGoPrevious = pagination.currentPage > 1;
  const canGoNext = pagination.currentPage < totalPages;

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            簡易社員管理システム
          </Typography>
          <Button 
            color="inherit" 
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            ログアウト
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Search and Filter Row */}
        <Box 
          sx={{ 
            mb: 3, 
            display: 'flex', 
            gap: 2, 
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {/* Search Box */}
          <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
            <TextField
              placeholder="キーワードを入力 (3文字以上)"
              value={filters.keyword}
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              size="small"
              helperText={filters.keyword.length > 0 && filters.keyword.length < 3 ? "3文字以上入力してください" : ""}
              sx={{ flexGrow: 1, maxWidth: 400 }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
            >
              検索
            </Button>
          </Box>

          {/* Show Retired Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.showRetired}
                onChange={(e) => handleFilterChange('showRetired', e.target.checked)}
              />
            }
            label="退職者も表示する"
          />

          {/* New Employee Button */}
          <Button
            variant="contained"
            color="warning"
            onClick={() => navigate('/employee/new')}
            startIcon={<AddIcon />}
            sx={{ color: 'white' }}
          >
            新規登録
          </Button>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Employee Table */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                    <TableCell>アクション</TableCell>
                    <TableCell>
                      <Box 
                        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        onClick={() => handleSort('EmployeeId')}
                      >
                        社員ID
                        {filters.sortField === 'EmployeeId' && (
                          filters.sortDirection === 'asc' 
                            ? <ArrowUpward fontSize="small" /> 
                            : <ArrowDownward fontSize="small" />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box 
                        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        onClick={() => handleSort('Name')}
                      >
                        社員名
                        {filters.sortField === 'Name' && (
                          filters.sortDirection === 'asc' 
                            ? <ArrowUpward fontSize="small" /> 
                            : <ArrowDownward fontSize="small" />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>カナ氏名</TableCell>
                    <TableCell>性別</TableCell>
                    <TableCell>電話番号</TableCell>
                    <TableCell>メールアドレス</TableCell>
                    <TableCell>退職</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentPageEmployees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        データがありません
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentPageEmployees.map((employee) => (
                      <TableRow 
                        key={employee.id}
                        hover
                        sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}
                      >
                        <TableCell>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => navigate(`/employee/${employee.id}`)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                        <TableCell>{employee.EmployeeId}</TableCell>
                        <TableCell>{employee.Name}</TableCell>
                        <TableCell>{employee.KanaName}</TableCell>
                        <TableCell>{formatGender(employee.Sex)}</TableCell>
                        <TableCell>{employee.PhoneNumber || '-'}</TableCell>
                        <TableCell>{employee.Email || '-'}</TableCell>
                        <TableCell>
                          {employee.RetireFlg && (
                            <Checkbox checked disabled />
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination Controls */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                alignItems: 'center',
                gap: 2,
                mt: 2,
              }}
            >
              <Typography variant="body2">Rows per page:</Typography>
              <FormControl size="small">
                <Select
                  value={pagination.rowsPerPage}
                  onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                </Select>
              </FormControl>
              
              <Typography variant="body2">{paginationInfo}</Typography>
              
              <Button
                size="small"
                onClick={() => handlePageChange('prev')}
                disabled={!canGoPrevious}
              >
                &lt;
              </Button>
              <Button
                size="small"
                onClick={() => handlePageChange('next')}
                disabled={!canGoNext}
              >
                &gt;
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default EmployeeListPage;