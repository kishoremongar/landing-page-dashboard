'use client';
import dynamic from 'next/dynamic';
import PageLoaderOverlay from '@/components/common/pageLoader';

const CreateLandingPage = dynamic(
  () => import('../_components/createLandingPage'),
  {
    loading: () => <PageLoaderOverlay />,
  }
);

export default function CreateLandingpage() {
  return <CreateLandingPage />;
}
