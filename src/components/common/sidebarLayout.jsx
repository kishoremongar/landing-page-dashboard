'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AnalyticsIcon from '@@assets/icons/analyticsIcon.svg';
import HomeIcon from '@@assets/icons/homeIcon.svg';

export default function SidebarLayout() {
  const pathName = usePathname();
  const getCurrentPath = pathName.split('/')?.[1];
  const isLandingPath = getCurrentPath === 'landing-page';

  const sidebarItems = [
    {
      id: 1,
      label: 'Home',
      navigateTo: '/dashboard',
      activeClassName: getCurrentPath === 'dashboard',
      icon: <AnalyticsIcon className='text-red-500 w-4 h-4' />,
    },
    {
      id: 2,
      label: 'Analytics',
      navigateTo: '/analytics',
      activeClassName: getCurrentPath === 'analytics',
      icon: <HomeIcon className='text-red-500 w-4 h-4' />,
    },
  ];

  return (
    <div
      className={`flex sm:flex-col justify-between sm:justify-normal gap-y-4 sm:w-1/4 w-full h-1/12 sm:h-screen bg-secondary text-white ${
        isLandingPath && 'hidden'
      }`}
    >
      <div className='p-4 border-b border-gray-700'>Fibr</div>
      <div className='flex-grow flex sm:justify-normal justify-end sm:flex-col gap-y-4'>
        {sidebarItems.map((item) => (
          <Link
            key={item?.id}
            href={item?.navigateTo}
            className={`flex gap-x-3 items-center py-2 px-4 text-sm hover:bg-gray-700 transition-colors duration-300 ${
              item?.activeClassName && 'bg-gray-700'
            } `}
          >
            {item?.icon}
            {item?.label}
          </Link>
        ))}
      </div>
      <div className='p-4 border-t sm:block hidden border-gray-700'>
        Hello Demo
      </div>
    </div>
  );
}
