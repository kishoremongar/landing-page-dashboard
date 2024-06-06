'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addTokens, addUser, removeTokens } from '../store/slices/auth';

export default function UserAuthWrapper({ userData }) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    if (userData?.isAuthenticated && !accessToken) {
      dispatch(
        addTokens({
          accessToken: userData?.accessToken,
          refreshToken: userData?.refreshToken,
        })
      );
      dispatch(addUser(userData));
      if (pathName === '/') {
        router.push('/dashboard');
      }
    } else {
      dispatch(removeTokens());
      router.push('/auth/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(userData)]);

  return null;
}
