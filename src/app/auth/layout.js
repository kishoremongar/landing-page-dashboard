'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function AuthLayout({ children }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const router = useRouter();
  useEffect(() => {
    if (accessToken) {
      router.push('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return <div className=' bg-gray-200 text-gray-900 font-sans'>{children}</div>;
}
