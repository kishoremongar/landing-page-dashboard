'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getFromLocalStorage, setInLocalStorage } from '@/utils/localStorage';

export default function DashboardHome() {
  const getLandingPages = getFromLocalStorage('landingData');
  const [landingPages, setLandingPages] = useState([]);
  const handleDeleteLandingPage = (id) => {
    setLandingPages(landingPages?.filter((page) => page?.id !== id));
    setInLocalStorage(
      'landingData',
      landingPages?.filter((page) => page?.id !== id)
    );
  };

  useEffect(() => {
    if (!getLandingPages) return;
    setLandingPages(getLandingPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(getLandingPages)]);

  if (!landingPages) {
    return (
      <div className='min-h-screen flex justify-center items-center text-lg'>
        Loading...
      </div>
    );
  }
  return (
    <div className='bg-gray-100 min-h-screen py-12 w-full'>
      <div className='max-w-4xl mx-auto px-4 h-full'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-6 text-primary'>
          Dashboard Home
        </h1>
        <div className='bg-white shadow-md min-h-[80%] p-6 rounded-lg'>
          <h2 className='text-xl font-bold mb-4'>Existing Landing Pages</h2>
          <ul className='overflow-auto'>
            {landingPages?.length > 0 ? (
              landingPages?.map((page) => (
                <li
                  key={page?.id}
                  className='grid grid-cols-2 items-center justify-between border-b border-gray-300 py-2'
                >
                  <div className='col-span-1 flex sm:items-center sm:flex-row flex-col flex-wrap'>
                    <Link
                      href={`/landing-page/${page?.id}`}
                      className='text-xs sm:text-lg font-semibold'
                    >
                      {page?.title} -{' '}
                      <span className='text-xs sm:text-base font-normal'>
                        Status: {page?.status}
                      </span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      className='text-xs sm:text-base px-3 py-1 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                      href={`/landing-page/edit?id=${page?.id}`}
                    >
                      Edit
                    </Link>
                    <Link
                      className='text-xs sm:text-base px-3 py-1 mr-2 bg-green-500 text-white rounded hover:bg-green-600'
                      href={`/landing-page/${page?.id}`}
                    >
                      View
                    </Link>
                    <button
                      className='text-xs sm:text-base px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                      onClick={() => handleDeleteLandingPage(page?.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li>No Landing Pages</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
