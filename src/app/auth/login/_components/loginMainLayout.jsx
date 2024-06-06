'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setInLocalStorage } from '@/utils/localStorage';
import { generateRandomToken } from '@/utils/generateFakeToken';
import PrimaryButton from '@/components/common/primaryButton';

const LoginMainLayout = () => {
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: false,
    success: false,
  });
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    if (!email || !password) {
      setFormStatus({ loading: false, error: true, success: false });
      return;
    }
    setFormStatus({ loading: true, error: false, success: false });

    if (email === 'demo@user.com' && password === 'Abcd.1234') {
      const accessToken = generateRandomToken(32);
      const refreshToken = generateRandomToken(64);
      setInLocalStorage('user', {
        email,
        password,
        isAuthenticated: true,
        accessToken,
        refreshToken,
      });
      setFormStatus({ loading: false, error: false, success: true });
      router.push('/dashboard');
    } else {
      setFormStatus({ loading: false, error: true, success: false });
    }
  };

  return (
    <div className='flex items-center h-screen w-full'>
      <div className='w-full flex flex-col gap-y-4 bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto'>
        {formStatus.error && (
          <span className='flex justify-center text-sm text-red-400'>
            Invalid credentials
          </span>
        )}
        <span className='block w-full text-center text-xl uppercase font-bold'>
          Login
        </span>
        <form
          onSubmit={handleLogin}
          className='flex justify-center flex-col gap-y-4'
          method='post'
        >
          <div className='md:w-full'>
            <label htmlFor='email' className='block text-xs mb-1'>
              Email
            </label>
            <input
              className='w-full border rounded p-2 outline-none focus:shadow-outline'
              type='email'
              name='email'
              id='email'
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='md:w-full'>
            <label htmlFor='password' className='block text-xs mb-1'>
              Password
            </label>
            <input
              className='w-full border rounded p-2 outline-none focus:shadow-outline'
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              required
            />
          </div>
          <PrimaryButton type='submit' filled>
            Login
          </PrimaryButton>
        </form>
        <p className='text-tertiary font-medium flex justify-center text-center w-full text-sm'>
          Forgot password?
        </p>
      </div>
    </div>
  );
};

export default LoginMainLayout;
