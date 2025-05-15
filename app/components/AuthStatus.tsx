'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AuthStatus() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  useEffect(() => {
    if (status === 'success') {
      toast.success('Successfully signed in!');
    } else if (status === 'error') {
      toast.error('Failed to sign in. Please try again.');
    }
  }, [status]);

  return null;
} 