import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  MenuItem,
} from '@mui/material';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const LoginPage = () => {
  const { login } = useContext(AuthContext); // Get login function
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    try {
      let endpoint = '';
      if (role === 'user') endpoint = 'http://localhost:5000/api/users/login';
      else if (role === 'doctor') endpoint = 'http://localhost:5000/api/doctors/login';
      else if (role === 'admin') endpoint = 'http://localhost:5000/api/admin/login';

      const response = await axios.post(endpoint, { email, password });

      // Use AuthContext login
      login(response.data[role], response.data.token, role);

      setSuccessMsg('Login successful!');

      // Redirect handled by AuthContext, but kept for clarity
      if (role === 'admin') navigate('/admin/home');
      else if (role === 'doctor') navigate('/doctor/home');
      else navigate('/user/home');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Box sx={{ mt: 4, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

      <form onSubmit={handleLogin}>
        <TextField
          select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="doctor">Doctor</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} className="blink">
          Login
        </Button>
      </form>

      <Typography sx={{ mt: 2, textAlign: 'center' }}>
        Don't have an account?{' '}
        <a href="/signup" style={{ color: '#1976d2' }}>Sign up</a>
      </Typography>
    </Box>
  );
};

export default LoginPage;