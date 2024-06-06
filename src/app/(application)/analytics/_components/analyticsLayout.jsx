import { Chart, registerables } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import { getFromLocalStorage } from '@/utils/localStorage';

Chart.register(...registerables, Chart.register);

const AnalyticsLayout = () => {
  const landingData = getFromLocalStorage('landingData');
  const [mockData, setMockData] = useState(null);

  const viewsData = {
    labels: mockData?.map((item) => item?.landingPage),
    datasets: [
      {
        label: 'Views',
        data: mockData?.map((item) => item.views),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const ctrData = {
    labels: mockData?.map((item) => item?.landingPage),
    datasets: [
      {
        label: 'Click-Through Rate (CTR)',
        data: mockData?.map((item) => item.ctr),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
      },
    },
  };

  useEffect(() => {
    if (!landingData) return;
    const fakeData = landingData?.map((item) => {
      return {
        landingPage: item.title,
        views: Math.floor(Math.random() * 100),
        ctr: Math.random(),
      };
    });
    setMockData(fakeData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(landingData)]);

  return (
    <div className='bg-gray-100 min-h-screen py-12 w-full'>
      <div className='max-w-4xl mx-auto px-4'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-6 text-primary'>
          Landing Page Analytics
        </h1>
        <div className='grid sm:grid-cols-2 grid-cols-1 gap-y-4 sm:gap-x-4'>
          <div className='col-span-1 bg-white shadow-card p-4'>
            <h3>Views Trend</h3>
            <Line data={viewsData} options={options} />
          </div>
          <div className='col-span-1 bg-white shadow-card p-4'>
            <h3>Click-Through Rates (CTR)</h3>
            <Bar data={ctrData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsLayout;
