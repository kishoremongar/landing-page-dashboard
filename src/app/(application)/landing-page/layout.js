import CreateLandingButton from '@/components/common/createLandingButton';

export default function LandingLayout({ children }) {
  return (
    <div className='flex flex-col w-full relative'>
      {children}
      <CreateLandingButton goToHome={true} />
    </div>
  );
}
