/**
 * Employee Detail Page Component
 * 社員詳細画面 (Create/Edit)
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ArrowBack,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Logout as LogoutIcon,
  PersonPinCircle as PersonIcon,
} from '@mui/icons-material';
import {
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../services/api';
import { 
  clearLoginSession,
  isValidEmployeeId,
  isValidPhoneNumber,
  isValidPostalCode,
} from '../utils/helpers';
import type { Employee, EmployeeFormData } from '../types';

const EmployeeDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isNewEmployee = id === 'new';

  // State management
  const [loading, setLoading] = useState(!isNewEmployee);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form data state
  const [formData, setFormData] = useState<EmployeeFormData>({
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

  // Modal state
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    type: 'register' | 'delete' | null;
  }>({
    open: false,
    type: null,
  });

  // Load employee data if editing
  useEffect(() => {
    if (!isNewEmployee && id) {
      loadEmployeeData(Number(id));
    }
  }, [id, isNewEmployee]);

  // Load employee data from API
  const loadEmployeeData = async (employeeId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const employee = await getEmployeeById(employeeId);
      
      // Map API response to form data
      setFormData({
        employeeId: employee.EmployeeId,
        name: employee.Name,
        kanaName: employee.KanaName || '',
        sex: employee.Sex || 0,
        postCode: employee.PostCode || '',
        address: employee.Address || '',
        phoneNumber: employee.PhoneNumber || '',
        department: employee.Department || '',
        retireFlg: employee.RetireFlg || false,
      });
    } catch (err: any) {
      setError('社員データの取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value,
    }));
    
    setError(null);
  };

  // Handle radio button change
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      sex: Number(e.target.value),
    }));
  };

  // Validate form
  const validateForm = (): boolean => {
    if (!formData.employeeId) {
      setError('社員IDを入力してください。');
      return false;
    }
    
    if (!isValidEmployeeId(formData.employeeId)) {
      setError('社員IDは5桁の数字で入力してください。');
      return false;
    }
    
    if (!formData.name) {
      setError('氏名を入力してください。');
      return false;
    }
    
    if (formData.sex === 0) {
      setError('性別を選択してください。');
      return false;
    }
    
    if (formData.phoneNumber && !isValidPhoneNumber(formData.phoneNumber)) {
      setError('電話番号の形式が正しくありません。');
      return false;
    }
    
    if (formData.postCode && !isValidPostalCode(formData.postCode)) {
      setError('郵便番号の形式が正しくありません。');
      return false;
    }
    
    return true;
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Show confirmation modal
    setConfirmModal({
      open: true,
      type: 'register',
    });
  };

  // Confirm registration/update
  const handleConfirmRegister = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setConfirmModal({ open: false, type: null });
    
    try {
      let response;
      
      if (isNewEmployee) {
        response = await createEmployee(formData);
      } else {
        response = await updateEmployee(Number(id), formData);
      }
      
      setSuccess(response.message || '登録しました。');
      
      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate('/employees');
      }, 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        '登録に失敗しました。'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = () => {
    setConfirmModal({
      open: true,
      type: 'delete',
    });
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    setLoading(true);
    setError(null);
    setConfirmModal({ open: false, type: null });
    
    try {
      const response = await deleteEmployee(Number(id));
      setSuccess(response.message || '削除しました。');
      
      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate('/employees');
      }, 1500);
    } catch (err: any) {
      setError('削除に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    clearLoginSession();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <PersonIcon sx={{ mr: 2 }} />
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

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Typography variant="h4">
            <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            社員詳細
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/employees')}
              startIcon={<ArrowBack />}
            >
              戻る
            </Button>
            {!isNewEmployee && (
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                startIcon={<DeleteIcon />}
              >
                削除
              </Button>
            )}
            <Button
              variant="contained"
              type="submit"
              form="employeeForm"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
            >
              登録
            </Button>
          </Box>
        </Box>

        {/* Alerts */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        {/* Form */}
        {loading && !success ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper sx={{ p: 4 }}>
            <form id="employeeForm" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Row 1 */}
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="社員ID"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    required
                    inputProps={{ maxLength: 5 }}
                    disabled={loading}
                  />
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="郵便番号"
                    name="postCode"
                    value={formData.postCode}
                    onChange={handleChange}
                    placeholder="000-0000"
                    inputProps={{ maxLength: 8 }}
                    disabled={loading}
                  />
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <FormControl component="fieldset" required>
                    <FormLabel component="legend">性別</FormLabel>
                    <RadioGroup
                      row
                      value={formData.sex}
                      onChange={handleRadioChange}
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
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="retireFlg"
                        checked={formData.retireFlg}
                        onChange={handleChange}
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
                    name="kanaName"
                    value={formData.kanaName}
                    onChange={handleChange}
                    placeholder="ヤマダ タロウ"
                    inputProps={{ maxLength: 64 }}
                    disabled={loading}
                  />
                </Grid>
                
                <Grid item xs={12} md={9}>
                  <TextField
                    fullWidth
                    label="住所"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="090-XXXX-XXXX"
                    inputProps={{ maxLength: 13 }}
                    disabled={loading}
                  />
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="所属"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="開発部"
                    inputProps={{ maxLength: 64 }}
                    disabled={loading}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        )}
      </Container>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, type: null })}
      >
        <DialogTitle sx={{ color: 'primary.main' }}>
          {confirmModal.type === 'register' ? '登録確認' : '削除確認'}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {confirmModal.type === 'register'
              ? '入力された内容を登録しますか?'
              : '選択された社員を削除しますか?'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={
              confirmModal.type === 'register'
                ? handleConfirmRegister
                : handleConfirmDelete
            }
            variant="contained"
            autoFocus
          >
            はい
          </Button>
          <Button
            onClick={() => setConfirmModal({ open: false, type: null })}
            variant="contained"
            color="warning"
            sx={{ color: 'white' }}
          >
            いいえ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeDetailPage;
