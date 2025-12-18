/**
 * pages/EmployeeDetail.tsx
 * 
 * Employee Detail Page - Add/Edit Employee
 * Employee নতুন তৈরি করা বা edit করার page
 */

import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Grid,
  Typography,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';
import { employeeAPI } from '../services/api';
import { Employee } from '../types';

/**
 * EmployeeDetail Component
 * 
 * Features:
 * - Add new employee (URL: /employees/new)
 * - Edit existing employee (URL: /employees/:id)
 * - Form validation
 * - Confirmation dialogs
 * - Delete functionality (only for existing employees)
 */
const EmployeeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();  // Get ID from URL parameter
  
  // Check if this is new employee or edit mode
  const isNewEmployee = id === 'new';
  const employeeId = isNewEmployee ? null : parseInt(id || '0');

  // ===== State Management =====
  // Form data
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    kanaName: '',
    sex: 0,
    postCode: '',
    address: '',
    phoneNumber: '',
    department: '',
    retireFlg: false,
  });

  // Loading states
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!isNewEmployee);

  // Messages
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Form validation errors
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Confirmation dialogs
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [saveDialog, setSaveDialog] = useState(false);

  /**
   * Load employee data (Edit mode only)
   * Edit mode হলে existing employee data load করা
   */
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      if (!isNewEmployee && employeeId && isMounted) {
        await loadEmployeeData(employeeId);
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [isNewEmployee, employeeId]);

  /**
   * Fetch employee data by ID
   */
  const loadEmployeeData = async (id: number) => {
    setInitialLoading(true);
    setMessage(null);

    try {
      const response = await employeeAPI.getById(id);
      
      console.log('Employee data response:', response.data); // Debug log
      
      // Check if data exists
      if (!response.data) {
        throw new Error('No data received from API');
      }
      
      // Set form data from API response - handle both formats
      const data = response.data.data || response.data; // Some APIs nest data
      
      setFormData({
        employeeId: data.employeeId || data.EmployeeId || '',
        name: data.name || data.Name || '',
        kanaName: data.kanaName || data.KanaName || '',
        sex: data.sex || data.Sex || 0,
        postCode: data.postCode || data.PostCode || '',
        address: data.address || data.Address || '',
        phoneNumber: data.phoneNumber || data.PhoneNumber || '',
        department: data.department || data.Department || '',
        retireFlg: data.retireFlg || data.RetireFlg || false,
      });
    } catch (err: any) {
      // Ignore cancelled requests - they're not real errors!
      if (err.code === 'ERR_CANCELED' || err.code === 'ECONNABORTED' || err.message?.includes('cancel') || err.message?.includes('abort')) {
        console.log('Request was cancelled (duplicate request), ignoring...');
        return;
      }
      
      console.error('Error loading employee:', err);
      console.error('Error details:', err.response?.data);
      
      const errorMsg = err.response?.data?.message || err.message || '社員データの読み込みに失敗しました。';
      setMessage({
        type: 'error',
        text: `エラー: ${errorMsg}`,
      });
    } finally {
      setInitialLoading(false);
    }
  };

  /**
   * Handle input change
   * Form field এর value change হলে state update করা
   */
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  /**
   * Validate form
   * Form submit করার আগে validation check করা
   */
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Employee ID validation (5 digits)
    if (!formData.employeeId) {
      newErrors.employeeId = '社員IDを入力してください。';
    } else if (formData.employeeId.length !== 5) {
      newErrors.employeeId = '社員IDは5桁で入力してください。';
    }

    // Name validation
    if (!formData.name) {
      newErrors.name = '氏名を入力してください。';
    }

    // Sex validation
    if (!formData.sex || (formData.sex !== 1 && formData.sex !== 2)) {
      newErrors.sex = '性別を選択してください。';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * Register button click করলে confirmation dialog show করা
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Show confirmation dialog
    setSaveDialog(true);
  };

  /**
   * Confirm save
   * Confirmation dialog এ "Yes" click করলে actual save করা
   */
  const handleConfirmSave = async () => {
    setSaveDialog(false);
    setLoading(true);
    setMessage(null);

    try {
      // Prepare employee data
      const employeeData: Partial<Employee> = {
        EmployeeId: formData.employeeId,
        Name: formData.name,
        KanaName: formData.kanaName,
        Sex: formData.sex,
        PostCode: formData.postCode,
        Address: formData.address,
        PhoneNumber: formData.phoneNumber,
        Department: formData.department,
        RetireFlg: formData.retireFlg,
      };

      let response;
      
      if (isNewEmployee) {
        // Create new employee
        response = await employeeAPI.create(employeeData);
      } else {
        // Update existing employee
        response = await employeeAPI.update(employeeId!, employeeData);
      }

      // Show success message
      setMessage({
        type: 'success',
        text: response.data.message || '保存に成功しました。',
      });

      // Redirect to employee list after 1.5 seconds
      setTimeout(() => {
        navigate('/employees');
      }, 1500);
    } catch (err: any) {
      console.error('Save error:', err);
      
      const errorMessage = err.response?.data?.message || 
        '保存に失敗しました。';
      
      setMessage({
        type: 'error',
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle delete
   * Delete button click করলে confirmation dialog show করা
   */
  const handleDelete = () => {
    setDeleteDialog(true);
  };

  /**
   * Confirm delete
   * Delete confirmation dialog এ "Yes" click করলে delete করা
   */
  const handleConfirmDelete = async () => {
    setDeleteDialog(false);
    setLoading(true);
    setMessage(null);

    try {
      const response = await employeeAPI.delete(employeeId!);
      
      setMessage({
        type: 'success',
        text: response.data.message || '削除に成功しました。',
      });

      // Redirect to employee list after 1.5 seconds
      setTimeout(() => {
        navigate('/employees');
      }, 1500);
    } catch (err: any) {
      console.error('Delete error:', err);
      
      const errorMessage = err.response?.data?.message || 
        '削除に失敗しました。';
      
      setMessage({
        type: 'error',
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle back button
   * Back button click করলে employee list এ return করা
   */
  const handleBack = () => {
    navigate('/employees');
  };

  // Show loading spinner while fetching employee data
  if (initialLoading) {
    return (
      <Layout>
        <Container>
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
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon fontSize="large" color="primary" />
            <Typography variant="h4">社員詳細</Typography>
          </Box>

          <Box>
            {/* Back Button */}
            <Button
              variant="outlined"
              startIcon={<BackIcon />}
              onClick={handleBack}
              sx={{ mr: 2 }}
            >
              戻る
            </Button>

            {/* Delete Button (only for existing employees) */}
            {!isNewEmployee && (
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
                sx={{ mr: 2 }}
                disabled={loading}
              >
                削除
              </Button>
            )}

            {/* Register Button */}
            <Button
              type="submit"
              form="employeeForm"
              variant="contained"
              color="primary"
              startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
              disabled={loading}
            >
              {loading ? '処理中...' : '登録'}
            </Button>
          </Box>
        </Box>

        {/* Status Message */}
        {message && (
          <Alert severity={message.type} sx={{ mb: 3 }}>
            {message.text}
          </Alert>
        )}

        {/* Employee Form */}
        <Paper sx={{ p: 4 }}>
          <form id="employeeForm" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Row 1 */}
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="社員ID"
                  value={formData.employeeId}
                  onChange={(e) => handleChange('employeeId', e.target.value)}
                  error={!!errors.employeeId}
                  helperText={errors.employeeId}
                  required
                  inputProps={{ maxLength: 5 }}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="郵便番号"
                  value={formData.postCode}
                  onChange={(e) => handleChange('postCode', e.target.value)}
                  placeholder="000-0000"
                  inputProps={{ maxLength: 8 }}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl component="fieldset" error={!!errors.sex} required>
                  <FormLabel component="legend">性別</FormLabel>
                  <RadioGroup
                    row
                    value={formData.sex}
                    onChange={(e) => handleChange('sex', parseInt(e.target.value))}
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="男性"
                      disabled={loading}
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="女性"
                      disabled={loading}
                    />
                  </RadioGroup>
                  {errors.sex && (
                    <Typography variant="caption" color="error">
                      {errors.sex}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3} sx={{ textAlign: 'right' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.retireFlg}
                      onChange={(e) => handleChange('retireFlg', e.target.checked)}
                      disabled={loading}
                    />
                  }
                  label="退職済み"
                />
              </Grid>

              {/* Row 2 */}
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="フリガナ"
                  value={formData.kanaName}
                  onChange={(e) => handleChange('kanaName', e.target.value)}
                  placeholder="ヤマダ タロウ"
                  inputProps={{ maxLength: 64 }}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} md={9}>
                <TextField
                  fullWidth
                  label="住所"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="東京都港区..."
                  inputProps={{ maxLength: 1024 }}
                  disabled={loading}
                />
              </Grid>

              {/* Row 3 */}
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="氏名"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                  placeholder="山田 太郎"
                  required
                  inputProps={{ maxLength: 64 }}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="電話番号"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  placeholder="090-XXXX-XXXX"
                  inputProps={{ maxLength: 13 }}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="所属"
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  placeholder="開発部"
                  inputProps={{ maxLength: 64 }}
                  disabled={loading}
                />
              </Grid>
            </Grid>
          </form>
        </Paper>

        {/* Save Confirmation Dialog */}
        <Dialog
          open={saveDialog}
          onClose={() => setSaveDialog(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle 
            sx={{ 
              borderBottom: 'none',
              pb: 0,
              color: 'primary.main',
              fontSize: '1.25rem'
            }}
          >
            登録確認
          </DialogTitle>
          <DialogContent sx={{ pt: 0 }}>
            <DialogContentText sx={{ mt: 1 }}>
              入力された内容を登録しますか?
            </DialogContentText>
          </DialogContent>
          <DialogActions 
            sx={{ 
              borderTop: 'none',
              px: 3,
              pb: 2
            }}
          >
            <Button 
              onClick={handleConfirmSave} 
              variant="contained"
              color="primary"
              sx={{ px: 4 }}
              autoFocus
            >
              はい
            </Button>
            <Button 
              onClick={() => setSaveDialog(false)}
              variant="contained"
              color="warning"
              sx={{ 
                px: 4,
                color: 'white'
              }}
            >
              いいえ
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialog}
          onClose={() => setDeleteDialog(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle 
            sx={{ 
              borderBottom: 'none',
              pb: 0,
              color: 'primary.main',
              fontSize: '1.25rem'
            }}
          >
            削除確認
          </DialogTitle>
          <DialogContent sx={{ pt: 0 }}>
            <DialogContentText sx={{ mt: 1 }}>
              選択された社員を削除しますか?
            </DialogContentText>
          </DialogContent>
          <DialogActions 
            sx={{ 
              borderTop: 'none',
              px: 3,
              pb: 2
            }}
          >
            <Button 
              onClick={handleConfirmDelete}
              variant="contained"
              color="primary"
              sx={{ px: 4 }}
              autoFocus
            >
              はい
            </Button>
            <Button 
              onClick={() => setDeleteDialog(false)}
              variant="contained"
              color="warning"
              sx={{ 
                px: 4,
                color: 'white'
              }}
            >
              いいえ
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default EmployeeDetail;
