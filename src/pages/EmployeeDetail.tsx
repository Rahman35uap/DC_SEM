/**
 * pages/EmployeeDetail.tsx
 * 
 * Employee Detail Page - Add/Edit Employee
 * 
 * UPDATED FEATURES:
 * 1. Input masks for PostCode (###-####) and PhoneNumber (###-####-####)
 * 2. Automatic hyphen insertion while typing
 * 3. Validation for correct format
 * 4. Error messages in RED
 * 5. No redirect on errors
 * 6. Email field support
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
  Tooltip,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';
import { employeeAPI } from '../services/api';
import { Employee } from '../types';

/**
 * EmployeeDetail Component
 * 
 * NEW FEATURES:
 * - Auto-format PostCode as ###-####
 * - Auto-format PhoneNumber as ###-####-####
 * - Validation for correct formats
 * - Real-time format checking
 */
const EmployeeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const isNewEmployee = id === 'new';
  const employeeId = isNewEmployee ? null : parseInt(id || '0');

  // ===== State Management =====
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    kanaName: '',
    email: '',
    sex: 0,
    postCode: '',
    address: '',
    phoneNumber: '',
    department: '',
    retireFlg: false,
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!isNewEmployee);

  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [saveDialog, setSaveDialog] = useState(false);

  /**
   * FORMAT POSTAL CODE: ###-####
   * Automatically adds hyphen at correct position
   */
  const formatPostCode = (value: string): string => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    
    // Limit to 7 digits
    const limited = numbers.slice(0, 7);
    
    // Add hyphen after 3rd digit
    if (limited.length <= 3) {
      return limited;
    }
    
    return `${limited.slice(0, 3)}-${limited.slice(3)}`;
  };

  /**
   * FORMAT PHONE NUMBER: ###-####-####
   * Automatically adds hyphens at correct positions
   */
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    
    // Limit to 11 digits
    const limited = numbers.slice(0, 11);
    
    // Add hyphens at correct positions
    if (limited.length <= 3) {
      return limited;
    } else if (limited.length <= 7) {
      return `${limited.slice(0, 3)}-${limited.slice(3)}`;
    } else {
      return `${limited.slice(0, 3)}-${limited.slice(3, 7)}-${limited.slice(7)}`;
    }
  };

  /**
   * VALIDATE POSTAL CODE: Must be ###-#### (8 chars total)
   */
  const validatePostCode = (value: string): boolean => {
    if (!value) return true; // Optional field
    
    const pattern = /^\d{3}-\d{4}$/;
    return pattern.test(value);
  };

  /**
   * VALIDATE PHONE NUMBER: Must be ###-####-#### (13 chars total)
   */
  const validatePhoneNumber = (value: string): boolean => {
    if (!value) return true; // Optional field
    
    const pattern = /^\d{3}-\d{4}-\d{4}$/;
    return pattern.test(value);
  };

  /**
   * Load employee data (Edit mode only)
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
      
      console.log('Employee data response:', response.data);
      
      if (!response.data) {
        throw new Error('No data received from API');
      }
      
      const data = response.data.data || response.data;
      
      setFormData({
        employeeId: data.employeeId || data.EmployeeId || '',
        name: data.name || data.Name || '',
        kanaName: data.kanaName || data.KanaName || '',
        email: data.email || data.Email || '',
        sex: data.sex || data.Sex || 0,
        postCode: data.postCode || data.PostCode || '',
        address: data.address || data.Address || '',
        phoneNumber: data.phoneNumber || data.PhoneNumber || '',
        department: data.department || data.Department || '',
        retireFlg: data.retireFlg || data.RetireFlg || false,
      });
    } catch (err: any) {
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
   * Handle input change with auto-formatting
   * SPECIAL HANDLING for PostCode and PhoneNumber
   */
  const handleChange = (field: string, value: any) => {
    let processedValue = value;
    
    // Auto-format PostCode
    if (field === 'postCode') {
      processedValue = formatPostCode(value);
    }
    
    // Auto-format PhoneNumber
    if (field === 'phoneNumber') {
      processedValue = formatPhoneNumber(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: processedValue,
    }));
    
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  /**
   * Validate form
   * INCLUDES PostCode and PhoneNumber format validation
   */
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Name validation (Required)
    if (!formData.name) {
      newErrors.name = '氏名を入力してください。';
    }

    // Sex validation (Required)
    if (!formData.sex || (formData.sex !== 1 && formData.sex !== 2)) {
      newErrors.sex = '性別を選択してください。';
    }

    // PostCode format validation (Optional but must be valid if provided)
    if (formData.postCode && !validatePostCode(formData.postCode)) {
      newErrors.postCode = '郵便番号の形式が正しくありません。（例: 123-4567）';
    }

    // PhoneNumber format validation (Optional but must be valid if provided)
    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = '電話番号の形式が正しくありません。（例: 090-1234-5678）';
    }

    // Email format validation (Optional but must be valid if provided)
    if (formData.email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        newErrors.email = 'メールアドレスの形式が正しくありません。';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validate form
    if (!validateForm()) {
      setMessage({
        type: 'error',
        text: '入力内容に誤りがあります。エラー箇所を確認してください。',
      });
      return;
    }

    // Show confirmation dialog
    setSaveDialog(true);
  };

  /**
   * Confirm save
   * Only redirects on SUCCESS, stays on page on ERROR
   */
  const handleConfirmSave = async () => {
    setSaveDialog(false);
    setLoading(true);
    setMessage(null);

    try {
      const employeeData: Partial<Employee> = {
        Name: formData.name,
        KanaName: formData.kanaName,
        Email: formData.email,
        Sex: formData.sex,
        PostCode: formData.postCode,
        Address: formData.address,
        PhoneNumber: formData.phoneNumber,
        Department: formData.department,
        RetireFlg: formData.retireFlg,
      };

      // Only include EmployeeId on UPDATE (not on CREATE)
      if (!isNewEmployee) {
        employeeData.EmployeeId = formData.employeeId;
      }

      let response;
      
      if (isNewEmployee) {
        response = await employeeAPI.create(employeeData);
        
        setMessage({
          type: 'success',
          text: `社員を登録しました。社員ID: ${response.data.employeeId || '不明'}`,
        });
      } else {
        response = await employeeAPI.update(employeeId!, employeeData);
        
        setMessage({
          type: 'success',
          text: response.data.message || '保存に成功しました。',
        });
      }

      // Only redirect on SUCCESS
      setTimeout(() => {
        navigate('/employees');
      }, 2000);
      
    } catch (err: any) {
      console.error('Save error:', err);
      
      const errorMessage = err.response?.data?.message || 
        err.message || 
        '保存に失敗しました。';
      
      // Show error in RED
      setMessage({
        type: 'error',
        text: `エラー: ${errorMessage}`,
      });
      
      // NO redirect on error - user stays on page
      
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle delete
   */
  const handleDelete = () => {
    setDeleteDialog(true);
  };

  /**
   * Confirm delete
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

      setTimeout(() => {
        navigate('/employees');
      }, 1500);
      
    } catch (err: any) {
      console.error('Delete error:', err);
      
      const errorMessage = err.response?.data?.message || 
        err.message || 
        '削除に失敗しました。';
      
      setMessage({
        type: 'error',
        text: `エラー: ${errorMessage}`,
      });
      
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle back button
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
            <Button
              variant="outlined"
              startIcon={<BackIcon />}
              onClick={handleBack}
              sx={{ mr: 2 }}
            >
              戻る
            </Button>

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
          <Alert 
            severity={message.type} 
            sx={{ 
              mb: 3,
              '& .MuiAlert-message': {
                fontSize: '1rem',
                fontWeight: 500,
              }
            }}
          >
            {message.text}
          </Alert>
        )}

        {/* Employee Form */}
        <Paper sx={{ p: 4 }}>
          <form id="employeeForm" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Row 1 */}
              <Grid item xs={12} md={3}>
                <Tooltip 
                  title={isNewEmployee ? "社員IDは自動生成されます" : "社員IDは変更できません"}
                  arrow
                  placement="top"
                >
                  <TextField
                    fullWidth
                    label="社員ID"
                    value={isNewEmployee ? '自動生成' : formData.employeeId}
                    disabled={true}
                    InputProps={{
                      endAdornment: (
                        <InfoIcon 
                          sx={{ 
                            color: 'primary.main', 
                            fontSize: 20,
                            ml: 1 
                          }} 
                        />
                      ),
                    }}
                    helperText={isNewEmployee ? "自動採番されます" : "変更不可"}
                  />
                </Tooltip>
              </Grid>

              {/* PostCode with auto-formatting and validation */}
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="郵便番号"
                  value={formData.postCode}
                  onChange={(e) => handleChange('postCode', e.target.value)}
                  placeholder="123-4567"
                  error={!!errors.postCode}
                  helperText={errors.postCode || "7桁の数字（自動でハイフン挿入）"}
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

              {/* Email field */}
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="メールアドレス"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="example@company.com"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email}
                  inputProps={{ maxLength: 64 }}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} md={6}>
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

              {/* PhoneNumber with auto-formatting and validation */}
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="電話番号"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  placeholder="090-1234-5678"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber || "11桁の数字（自動でハイフン挿入）"}
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
              {isNewEmployee 
                ? '新しい社員を登録しますか？（社員IDは自動採番されます）'
                : '入力された内容を登録しますか?'
              }
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