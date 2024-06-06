import LoadingBg from '@@assets/icons/loadingBg.svg';

export default function PageLoaderOverlay() {
  return (
    <div className='flex flex-auto w-full min-h-screen h-full bg-gray-100 flex-col items-center justify-center animate-pulse gap-y-6'>
      <LoadingBg className='w-full h-auto sm:w-1/4 sm:h-1/4' />
      <h2 className='text-center text-olive text-base md:text-xl font-semibold'>
        Hang tight...
        <br />
        <span className='text-sm md:text-base text-center text-olive'>{`We're preparing your content.`}</span>
      </h2>
    </div>
  );
}
