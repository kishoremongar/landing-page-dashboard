'use client';

import { useEffect, useState } from 'react';
import CreateLandingPage from './createLandingPage';
import { getFromLocalStorage } from '@/utils/localStorage';

const EditLandingPage = ({ editId }) => {
  const landingPagesData = getFromLocalStorage('landingData');
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    if (!landingPagesData) return;
    const landingPage = landingPagesData?.find(
      (page) => page?.id === Number(editId)
    );

    setMainData(landingPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId]);

  return (
    <div className='bg-gray-100 min-h-screen py-12'>
      <CreateLandingPage landingId={editId} mainData={mainData} />
    </div>
  );
};

export default EditLandingPage;
