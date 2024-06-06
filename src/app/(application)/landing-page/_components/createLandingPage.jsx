import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getFromLocalStorage, setInLocalStorage } from '@/utils/localStorage';
import PrimaryButton from '@/components/common/primaryButton';
import { fileToBase64 } from '@/utils/fileTobase64';
import { base64ToFile } from '@/utils/base64ToFile';
import { closeMessage, showMessage } from '@/store/slices/auth';

const CreateLandingPage = ({ landingId, mainData }) => {
  const [selectedComponents, setSelectedComponents] = useState([
    { id: 0, title: 'Header', isSelected: false },
    { id: 1, title: 'Footer', isSelected: false },
    { id: 2, title: 'Text Block', isSelected: false },
    { id: 3, title: 'Image', isSelected: false },
  ]);
  const formMessage = useSelector((store) => store.auth.landingMessage);
  const dispatch = useDispatch();

  const formRef = useRef(null);

  const landingPageData = getFromLocalStorage('landingData') ?? [];
  const router = useRouter();

  const handleSubmit = async (e, status = 'draft') => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const formDataObject = {};

    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    formDataObject.selectedComponents = await Promise.all(
      selectedComponents.map(async (component) => {
        switch (component?.title) {
          case 'Header': {
            const headerData = {
              title: 'Header',
              content: formDataObject.headerContent,
              isSelected: component?.isSelected,
              id: component?.id,
            };
            delete formDataObject.headerContent;
            return headerData;
          }
          case 'Footer': {
            const footerData = {
              title: 'Footer',
              content: formDataObject.footerContent,
              isSelected: component?.isSelected,
              id: component?.id,
            };
            delete formDataObject.footerContent;
            return footerData;
          }
          case 'Text Block': {
            const textBlockData = {
              title: 'Text Block',
              content: formDataObject.textBlockContent,
              isSelected: component?.isSelected,
              id: component?.id,
            };
            delete formDataObject.textBlockContent;
            return textBlockData;
          }
          case 'Image': {
            const imageData = {
              title: 'Image',
              isSelected: component?.isSelected,
              id: component?.id,
              ...(formDataObject.image && {
                content: await fileToBase64(formDataObject.image),
              }),
            };
            delete formDataObject.image;
            return imageData;
          }
          default:
            return null;
        }
      })
    );

    try {
      if (landingId) {
        const updatedData = landingPageData.map((page) =>
          page.id === Number(landingId)
            ? { ...page, ...formDataObject, status }
            : page
        );

        setInLocalStorage('landingData', updatedData);
        dispatch(showMessage('Updated successfully!!!'));
        if (status === 'live') {
          router.push('/dashboard');
        }
      } else {
        formDataObject.id = landingPageData.length + 1;
        formDataObject.status = status;
        setInLocalStorage('landingData', [...landingPageData, formDataObject]);
        router.push(`/dashboard`);
      }
    } catch (error) {
      dispatch(showMessage(error?.message));
    } finally {
      setTimeout(() => {
        dispatch(closeMessage());
      }, 3000);
    }
  };
  const handleComponentSelect = (select) => {
    const isSelected = selectedComponents.map((each) =>
      each.title === select.title
        ? { ...each, isSelected: !each.isSelected }
        : each
    );
    setSelectedComponents(isSelected);
  };
  const getSingleComponentData = (title) => {
    const findData = mainData?.selectedComponents?.find(
      (item) => item.title === title
    )?.content;

    if (title === 'Image' && findData) {
      const file = base64ToFile(findData);
      return file;
    }
    return findData;
  };

  const getInputComponent = {
    Header: (
      <input
        type='text'
        name='headerContent'
        className='w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-primary'
        placeholder='Enter header content...'
        defaultValue={getSingleComponentData('Header')}
      />
    ),
    Footer: (
      <input
        type='text'
        name='footerContent'
        className='w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-primary'
        placeholder='Enter footer content...'
        defaultValue={getSingleComponentData('Footer')}
      />
    ),
    TextBlock: (
      <textarea
        name='textBlockContent'
        className='w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-primary'
        placeholder='Enter text block content...'
        rows={4}
        required
        defaultValue={getSingleComponentData('Text Block')}
      />
    ),
    Image: (
      <input
        type='file'
        name='image'
        accept='image/*'
        size={4096}
        className='w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-primary'
        ref={(ref) => {
          if (ref && getSingleComponentData('Image')) {
            const file = getSingleComponentData('Image');
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            ref.files = dataTransfer.files;
          }
        }}
      />
    ),
  };

  const handlePreviewClick = (e) => {
    e.preventDefault();
    handleSubmit(e, 'draft');
    router.push(`/landing-page/${landingId}`);
  };

  useEffect(() => {
    if (!landingId) return;
    setSelectedComponents(mainData?.selectedComponents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainData]);

  return (
    <div className='bg-gray-100 min-h-screen py-12'>
      <div className='max-w-4xl mx-auto px-4'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-6'>{`${
          landingId ? 'Edit' : 'Create'
        } Landing Page`}</h1>
        <div className='bg-white shadow-md p-6 rounded-lg'>
          <form
            onSubmit={(e) => handleSubmit(e, 'draft')}
            className='flex flex-col gap-y-4'
            ref={formRef}
          >
            <div>
              <label
                htmlFor='title'
                className='block text-sm font-semibold mb-2'
              >
                Title
              </label>
              <input
                type='text'
                id='title'
                name='title'
                className='w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-primary'
                required
                defaultValue={mainData?.title}
              />
            </div>
            <div>
              <label
                htmlFor='description'
                className='block text-sm font-semibold mb-2'
              >
                Description
              </label>
              <textarea
                id='description'
                name='description'
                className='w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-primary'
                rows={4}
                required
                defaultValue={mainData?.description}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='components'
                className='block text-sm font-semibold mb-2'
              >
                Predefined Components
              </label>
              <div className='flex flex-wrap gap-4'>
                {selectedComponents?.map((item) => (
                  <button
                    key={item?.title}
                    type='button'
                    onClick={() => handleComponentSelect(item)}
                    className={`px-4 py-2 rounded border border-gray-300 ${
                      item?.isSelected
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-800'
                    } hover:bg-primary hover:text-white`}
                  >
                    {item?.title}
                  </button>
                ))}
              </div>
            </div>
            {selectedComponents?.map(
              (item) =>
                item?.isSelected && (
                  <div key={item?.title} className='flex flex-col gap-y-4'>
                    <label className='block text-sm font-semibold'>
                      {item?.title}
                    </label>
                    {
                      getInputComponent[
                        item?.title === 'Text Block' ? 'TextBlock' : item?.title
                      ]
                    }
                  </div>
                )
            )}
            {landingId ? (
              <div className='flex w-full gap-x-4 justify-center'>
                <PrimaryButton type='submit' filled buttonStyle='!self-center'>
                  Save Draft
                </PrimaryButton>
                <PrimaryButton
                  type='button'
                  onClick={(e) => handleSubmit(e, 'live')}
                  filled
                  buttonStyle='!self-center'
                >
                  Publish
                </PrimaryButton>
                <Link
                  href='#'
                  onClick={handlePreviewClick}
                  className='bg-gray-300 text-gray-800 uppercase text-sm font-semibold px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400 !self-center'
                >
                  Preview
                </Link>
              </div>
            ) : (
              <PrimaryButton type='submit' filled buttonStyle='!self-center'>
                Create Landing Page
              </PrimaryButton>
            )}
            {formMessage?.status && (
              <p className='text-center text-primary'>
                {formMessage?.helperData}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLandingPage;
