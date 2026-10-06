'use client';

import { useState, ChangeEvent } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Alert, Button, Container, Link, Paper, TextField, Typography } from '@mui/material';
import { useAuth } from '../auth/AuthContext';

export default function SignUpPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError('');
    if (form.password.length < 8) return setError('Password must be at least 8 characters');
    if (form.password !== form.confirm) return setError('Passwords do not match');
    setLoading(true);
    try {
      await signUp(form.name, form.email, form.password);
      router.push('/confirm');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Create account</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField fullWidth margin="normal" label="Name" name="name" value={form.name} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Confirm password" name="confirm" type="password" value={form.confirm} onChange={handleChange} />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} disabled={loading} onClick={handleSubmit}>
          {loading ? 'Creating account...' : 'Sign up'}
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link component={NextLink} href="/login">Log in</Link>
        </Typography>
      </Paper>
    </Container>
  );
}