/**
 * Signup Page Component
 * 新規アカウント登録画面
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  PersonCircle as PersonIcon,
  ArrowForward,
} from '@mui/icons-material';
import { signup } from '../services/api';
import { isValidEmail, isValidPassword } from '../utils/helpers';
import type { SignupData } from '../types';

const SignupPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<SignupData>({
    inputEmail: '',
    inputName: '',
    inputPassword: '',
    inputConfirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.inputEmail || !formData.inputName || 
        !formData.inputPassword || !formData.inputConfirmPassword) {
      setError('すべての項目を入力してください。');
      return;
    }
    
    if (!isValidEmail(formData.inputEmail)) {
      setError('有効なメールアドレスを入力してください。');
      return;
    }
    
    if (!isValidPassword(formData.inputPassword)) {
      setError('パスワードは8文字以上で、英字と数字を含む必要があります。');
      return;
    }
    
    if (formData.inputPassword !== formData.inputConfirmPassword) {
      setError('パスワードが一致しません。');
      return;
    }

    // API call
    setLoading(true);
    setError(null);
    
    try {
      const response = await signup(formData);
      
      if (response.message === 'Registration successful.') {
        setSuccess('アカウント作成に成功しました！');
        
        // Clear form
        setFormData({
          inputEmail: '',
          inputName: '',
          inputPassword: '',
          inputConfirmPassword: '',
        });
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.message || 'アカウント作成に失敗しました。');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        '予期せぬエラーが発生しました。もう一度お試しください。'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        padding: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <Typography variant="h5" gutterBottom>
              簡易社員管理システム
            </Typography>
            <PersonIcon sx={{ fontSize: 60, color: 'primary.main', my: 2 }} />
            <Typography variant="h6">サインアップ</Typography>
          </Box>

          {/* Alert messages */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="メールアドレス"
              name="inputEmail"
              type="email"
              value={formData.inputEmail}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
              placeholder="メールアドレスを入力"
            />

            <TextField
              fullWidth
              label="氏名"
              name="inputName"
              value={formData.inputName}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
              placeholder="氏名を入力"
            />

            <TextField
              fullWidth
              label="パスワード"
              name="inputPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.inputPassword}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
              helperText="8文字以上、英字と数字を含む"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="パスワード確認"
              name="inputConfirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.inputConfirmPassword}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <ArrowForward />}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {loading ? '作成中...' : '作成'}
            </Button>

            <Typography variant="body2" textAlign="center">
              既にアカウントを持っていますか？{' '}
              <Link to="/login" style={{ textDecoration: 'none' }}>
                ログイン
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignupPage;
