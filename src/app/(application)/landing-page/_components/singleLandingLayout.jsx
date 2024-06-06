'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getFromLocalStorage } from '@/utils/localStorage';

const LandingPage = ({ landingId }) => {
  const landingPagesData = getFromLocalStorage('landingData');
  const [mainData, setMainData] = useState(null);
  const isHeroSelected = mainData?.selectedComponents?.some(
    (component) => component?.title === 'Image' && component?.isSelected
  );

  useEffect(() => {
    if (!landingPagesData) return;
    const landingPage = landingPagesData?.find(
      (page) => page?.id === Number(landingId)
    );

    setMainData(landingPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(landingPagesData)]);

  return (
    <>
      <title>{mainData?.title}</title>
      <div className='flex flex-col min-h-screen'>
        {mainData?.selectedComponents?.map(
          (component) =>
            component?.title === 'Header' &&
            component?.isSelected && (
              <header
                className='text-lg bg-gray-800 text-white py-4 px-6'
                key={component?.id}
              >
                {component?.content}
              </header>
            )
        )}
        <main className='flex-grow h-auto bg-gray-100 p-4'>
          <div
            className={`h-full rounded-lg grid  w-full text-lg p-4 ${
              isHeroSelected
                ? 'sm:grid-cols-2 grid-cols-1 gap-x-4 place-content-center'
                : 'grid-cols-1'
            }`}
          >
            {mainData?.selectedComponents?.map(
              (component) =>
                (component?.title === 'Text Block' ||
                  component.title === 'Image') && (
                  <div key={component?.id} className='w-full h-full'>
                    {component?.title === 'Text Block' && (
                      <p>{component?.content}</p>
                    )}
                    <div className='w-full flex justify-center items-center'>
                      {component.title === 'Image' && component?.content && (
                        <Image
                          src={component?.content}
                          width={0}
                          height={0}
                          sizes='100vw'
                          alt='hero'
                          className='w-full h-full'
                        />
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
        </main>
        {mainData?.selectedComponents?.map(
          (component) =>
            component?.title === 'Footer' &&
            component?.isSelected && (
              <footer
                key={component?.id}
                className='bg-gray-800 text-white py-4 px-6'
              >
                {component?.content}
              </footer>
            )
        )}
      </div>
    </>
  );
};

export default LandingPage;
