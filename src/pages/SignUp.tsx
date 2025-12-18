/**
 * pages/SignUp.tsx
 * 
 * Sign Up / Registration Page
 * নতুন user registration করার জন্য page
 */

import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  AccountCircle as PersonIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { authAPI } from '../services/api';

/**
 * SignUp Component
 * 
 * Features:
 * - Name, Email, Password, Confirm Password fields
 * - Password show/hide toggle
 * - Form validation
 * - Password match validation
 * - Error handling
 */
const SignUp = () => {
  const navigate = useNavigate();

  // ===== State Management =====
  // Form input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Loading state
  const [loading, setLoading] = useState(false);
  
  // Messages
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Form validation errors
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  /**
   * Validate form fields
   * Form submit করার আগে validation check করা
   */
  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    // Name validation
    if (!name) {
      newErrors.name = '氏名を入力してください。';
    }

    // Email validation
    if (!email) {
      newErrors.email = 'メールアドレスを入力してください。';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '有効なメールアドレスを入力してください。';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'パスワードを入力してください。';
    } else if (password.length < 8) {
      newErrors.password = 'パスワードは8文字以上で入力してください。';
    } else if (!/^(?=.*[a-z])(?=.*\d).{8,}$/.test(password)) {
      newErrors.password = 'パスワードには英字と数字を含めてください。';
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'パスワード確認を入力してください。';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません。';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * Create button click করলে এই function run হবে
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Call registration API
      const response = await authAPI.signUp({
        inputName: name,
        inputEmail: email,
        inputPassword: password,
        inputConfirmPassword: confirmPassword,
      });

      // Check response
      if (response.data.message === 'Registration successful.') {
        // Success
        setMessage({
          type: 'success',
          text: 'アカウント作成に成功しました！',
        });

        // Clear form
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors({});

        // Optional: Redirect to signin after success
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } else {
        // Error from API
        setMessage({
          type: 'error',
          text: response.data.message || 'アカウント作成に失敗しました。',
        });
      }
    } catch (error: any) {
      // Network or server error
      console.error('Sign up error:', error);
      
      const errorMessage = error.response?.data?.message || 
        '予期せぬエラーが発生しました。もう一度お試しください。';
      
      setMessage({
        type: 'error',
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 400 }}>
          <CardContent sx={{ p: 4 }}>
            {/* Header Section */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                簡易社員管理システム
              </Typography>
              <PersonIcon sx={{ fontSize: 60, color: 'primary.main', my: 2 }} />
              <Typography variant="h6">サインアップ</Typography>
            </Box>

            {/* Status Message */}
            {message && (
              <Alert severity={message.type} sx={{ mb: 3 }}>
                {message.text}
              </Alert>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <TextField
                fullWidth
                label="メールアドレス"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                required
                disabled={loading}
              />

              {/* Name Field */}
              <TextField
                fullWidth
                label="氏名"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
                required
                disabled={loading}
              />

              {/* Password Field */}
              <TextField
                fullWidth
                label="パスワード"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password || '英字と数字を含む8文字以上'}
                margin="normal"
                required
                disabled={loading}
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

              {/* Confirm Password Field */}
              <TextField
                fullWidth
                label="パスワード確認"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
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

              {/* Submit Button */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <ArrowIcon />}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {loading ? '作成中...' : '作成'}
              </Button>

              {/* Sign In Link */}
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                既にアカウントを持っていますか？{' '}
                <Link to="/signin" style={{ textDecoration: 'none' }}>
                  ログイン
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SignUp;
