'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { LoginForm, RegisterForm } from './AuthForms';

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'login' ? 'Login' : 'Create Account'}
    >
      {mode === 'login' ? (
        <LoginForm
          onSuccess={onClose}
          onSwitchToRegister={() => setMode('register')}
        />
      ) : (
        <RegisterForm
          onSuccess={onClose}
          onSwitchToLogin={() => setMode('login')}
        />
      )}
    </Modal>
  );
}