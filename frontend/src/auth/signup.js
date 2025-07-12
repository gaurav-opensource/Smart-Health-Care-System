import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField, Button, Typography, Box, Alert, MenuItem,
} from '@mui/material';

const roleOptions = [
  { value: 'user', label: 'User' },
  { value: 'doctor', label: 'Doctor' },
  { value: 'admin', label: 'Admin' },
];

const specializations = [
  'Cardiology',
  'General Physician',
  'Orthopedics',
  'Pediatrics',
  'Neurology',
  'Dermatology',
  'Other',
];

const SignupPage = () => {
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    phoneNumber: '',
    licenseNumber: '',
    fees: '',
    specialization: '',
  });

  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [certificationFile, setCertificationFile] = useState(null);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'profilePhoto') setProfilePhotoFile(files[0]);
    if (name === 'certification') setCertificationFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    let endpoint = '';
    if (role === 'user') endpoint = '/users/register';
    else if (role === 'doctor') endpoint = '/doctors/register';
    else if (role === 'admin') endpoint = '/admin/register';

    try {
      if (role === 'doctor') {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('location', formData.location);
        data.append('phoneNumber', formData.phoneNumber);
        data.append('licenseNumber', formData.licenseNumber);
        data.append('fees', formData.fees);
        data.append('specialization', formData.specialization);

        if (profilePhotoFile) data.append('profilePhoto', profilePhotoFile);
        if (certificationFile) data.append('certification', certificationFile);

        const res = await axios.post(`http://localhost:5000/api${endpoint}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        setSuccess(res.data.message || 'Signup successful! Please log in.');
      } else {
        let payload = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        if (role === 'user') {
          payload.location = formData.location;
          payload.phoneNumber = formData.phoneNumber;
        }
        const res = await axios.post(`http://localhost:5000/api${endpoint}`, payload);
        setSuccess(res.data.message || 'Signup successful! Please log in.');
      }

      setFormData({
        name: '',
        email: '',
        password: '',
        location: '',
        phoneNumber: '',
        licenseNumber: '',
        fees: '',
        specialization: '',
      });
      setProfilePhotoFile(null);
      setCertificationFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom align="center">Sign Up</Typography>

      <TextField
        select
        label="Role"
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        fullWidth
        margin="normal"
      >
        {roleOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </TextField>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        {(role === 'user' || role === 'doctor') && (
          <>
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
              placeholder="+1234567890"
            />
          </>
        )}

        {role === 'doctor' && (
          <>
            <TextField
              label="License Number"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />

            <TextField
              label="Fees"
              name="fees"
              type="number"
              value={formData.fees}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              inputProps={{ min: 1 }}
            />

            <TextField
              select
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            >
              {specializations.map(spec => (
                <MenuItem key={spec} value={spec}>{spec}</MenuItem>
              ))}
            </TextField>

            <Box sx={{ mt: 2 }}>
              <Typography>Profile Photo (Image file)</Typography>
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography>Certification (PDF file)</Typography>
              <input
                type="file"
                name="certification"
                accept="application/pdf"
                onChange={handleFileChange}
                required
              />
            </Box>
          </>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          className="blink"
        >
          Sign Up
        </Button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Login</a>
      </p>
    </Box>
  );
};

export default SignupPage;