import Link from 'next/link';
import AddIcon from '@@assets/icons/plusIcon.svg';
import HomeIcon from '@@assets/icons/homeIcon.svg';

export default function CreateLandingButton({ goToHome = false }) {
  return (
    <Link
      href={goToHome ? '/dashboard' : '/landing-page/create'}
      title={goToHome ? 'Go back home' : 'Create New Landing Page'}
      className='text-red-500 fixed z-10 bottom-10 right-10 w-12 h-12 flex justify-center items-center bg-white shadow-catShadow rounded-full'
    >
      {goToHome ? (
        <HomeIcon className='w-6 h-6 text-primary' />
      ) : (
        <AddIcon className='w-8 h-8 text-primary' />
      )}
    </Link>
  );
}
