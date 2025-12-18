/**
 * pages/SignIn.tsx
 * 
 * Sign In / Login Page
 * User login করার জন্য page
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
  Login as LoginIcon,
} from '@mui/icons-material';
import { authAPI } from '../services/api';
import { setAuthData } from '../utils/auth';

/**
 * SignIn Component
 * 
 * Features:
 * - Email এবং Password input fields
 * - Password show/hide toggle
 * - Form validation
 * - Error handling
 * - Loading state
 */
const SignIn = () => {
  const navigate = useNavigate();

  // ===== State Management =====
  // Form input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  
  // Loading state (API call করার সময়)
  const [loading, setLoading] = useState(false);
  
  // Error/Success messages
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Form validation errors
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  /**
   * Validate form fields
   * Form submit করার আগে validation check করা
   */
  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!email) {
      newErrors.email = 'メールアドレスを入力してください。';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '有効なメールアドレスを入力してください。';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'パスワードを入力してください。';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;  // No errors = valid
  };

  /**
   * Handle form submission
   * Login button click করলে এই function run হবে
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();  // Prevent default form submission
    setMessage(null);    // Clear previous messages

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);    // Show loading spinner

    try {
      // Call login API
      const response = await authAPI.signIn(email, password);

      // Check response
      if (response.data.message === 'Authentication successful.') {
        // Success - save login info and redirect
        setMessage({
          type: 'success',
          text: 'ログイン成功! リダイレクト中...',
        });

        // Save to localStorage
        setAuthData(email);

        // Redirect to employee list after 1.5 seconds
        setTimeout(() => {
          navigate('/employees');
        }, 1500);
      } else {
        // Error - show error message
        setMessage({
          type: 'error',
          text: response.data.message || 'ログインに失敗しました。',
        });
      }
    } catch (error: any) {
      // Network or server error
      console.error('Login error:', error);
      
      const errorMessage = error.response?.data?.message || 
        'ログインに失敗しました。認証情報を確認してください。';
      
      setMessage({
        type: 'error',
        text: errorMessage,
      });
    } finally {
      setLoading(false);  // Hide loading spinner
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
              <Typography variant="h6">ログイン</Typography>
            </Box>

            {/* Status Message (Success/Error) */}
            {message && (
              <Alert severity={message.type} sx={{ mb: 3 }}>
                {message.text}
              </Alert>
            )}

            {/* Login Form */}
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

              {/* Password Field */}
              <TextField
                fullWidth
                label="パスワード"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
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

              {/* Submit Button */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {loading ? 'ログイン中...' : 'ログイン'}
              </Button>

              {/* Sign Up Link */}
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                アカウントをまだ持っていませんか？{' '}
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  新規アカウント登録
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SignIn;
