'use client';
import CreateLandingButton from '@/components/common/createLandingButton';
import SidebarLayout from '@/components/common/sidebarLayout';

export default function AppLayout({ children }) {
  return (
    <div className='flex sm:flex-row flex-col w-full relative'>
      <SidebarLayout />
      {children}
      <CreateLandingButton />
    </div>
  );
}
