'use client';

import dynamic from 'next/dynamic';
import PageLoaderOverlay from '@/components/common/pageLoader';

const AnalyticsLayout = dynamic(() => import('./_components/analyticsLayout'), {
  loading: () => <PageLoaderOverlay />,
});

export default function AnalyticsPage() {
  return <AnalyticsLayout />;
}
