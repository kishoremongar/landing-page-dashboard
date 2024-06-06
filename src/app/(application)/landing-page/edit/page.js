import dynamic from 'next/dynamic';
import PageLoaderOverlay from '@/components/common/pageLoader';

const EditLandingPage = dynamic(
  () => import('../_components/editLandingLayout'),
  {
    loading: () => <PageLoaderOverlay />,
  }
);

export default async function EditLandingpage({ searchParams }) {
  return <EditLandingPage editId={searchParams?.id} />;
}
