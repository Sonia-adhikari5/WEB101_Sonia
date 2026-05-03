'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/authContext';
import toast from 'react-hot-toast';

export function LoginForm({ onSuccess, onSwitchToRegister }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Logged in successfully!');
      onSuccess?.();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-red-500 text-white rounded py-2 font-semibold hover:bg-red-600 disabled:opacity-50"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <p className="text-center text-sm">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-red-500 font-semibold hover:underline"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}

export function RegisterForm({ onSuccess, onSwitchToLogin }) {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(username, email, password);
      toast.success('Account created successfully!');
      onSuccess?.();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-red-500 text-white rounded py-2 font-semibold hover:bg-red-600 disabled:opacity-50"
      >
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>
      <p className="text-center text-sm">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-red-500 font-semibold hover:underline"
        >
          Login
        </button>
      </p>
    </form>
  );
}