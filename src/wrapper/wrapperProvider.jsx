'use client';
import { Provider as ReduxProvider } from 'react-redux';
import NextTopLoader from 'nextjs-toploader';
import store from '../store/store';
import UserAuthWrapper from './userAuthWrapper';
import { getFromLocalStorage } from '@/utils/localStorage';

export default function WrapperProvider({ children }) {
  const userData = getFromLocalStorage('user');

  return (
    <ReduxProvider store={store}>
      <NextTopLoader showSpinner={false} />
      <UserAuthWrapper userData={userData} />
      {children}
    </ReduxProvider>
  );
}
