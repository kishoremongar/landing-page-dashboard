'use client';
import { useRouter } from 'next/navigation';
import PrimaryButton from '@/components/common/primaryButton';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-y-4'>
      <div className='text-black-primary text-sm flex flex-col items-center'>
        <p>Oops!</p>
        <p>Page not found.</p>
      </div>
      <PrimaryButton onClick={() => router.push('/dashboard')} filled>
        Return Home
      </PrimaryButton>
    </div>
  );
}
