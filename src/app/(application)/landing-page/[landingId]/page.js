import dynamic from 'next/dynamic';
import PageLoaderOverlay from '@/components/common/pageLoader';

const SingleLandingLayout = dynamic(
  () => import('../_components/singleLandingLayout'),
  {
    loading: () => <PageLoaderOverlay />,
  }
);

export default async function SingleLandingPage({ params }) {
  const { landingId } = params;

  return <SingleLandingLayout landingId={landingId} />;
}
