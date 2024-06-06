'use client';

import dynamic from 'next/dynamic';
import PageLoaderOverlay from '@/components/common/pageLoader';

const DashboardHome = dynamic(() => import('./_components/dashboardHome'), {
  loading: () => <PageLoaderOverlay />,
});

export default function AdminDashboardPage() {
  return <DashboardHome />;
}
