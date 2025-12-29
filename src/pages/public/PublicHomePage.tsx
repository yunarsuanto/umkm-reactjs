import PublicLayout from '@/components/public/PublicLayout';
import { useNavigate } from 'react-router-dom';
import { useDeviceMode } from '@/constants/dimension';
import { isMobile } from 'react-device-detect';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setLoadedImages, setLoading } from '@/features/generalSlice';
import { useEffect, useState, useRef } from 'react';

interface PublicHomePageProps {
  setMode: () => void
}

const PublicHomePage = ({ setMode }: PublicHomePageProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const imgRef = useRef<HTMLImageElement>(null);
  // const [loadedImages, setLoadedImages] = useState([false]);
  const { loadedImages } = useAppSelector((state) => state.general)


  useEffect(() => {
    dispatch(setLoading(true))
    dispatch(setLoadedImages([false]))
  }, [])

  useEffect(() => {
    // Check if image is already loaded (cached)
    if (imgRef.current?.complete) {
      const newLoaded = [...loadedImages];
      newLoaded[0] = true;
      dispatch(setLoadedImages(newLoaded));
    }
  }, []);

  useEffect(() => {
    if (loadedImages.length > 0 && loadedImages.every(Boolean)) {
      dispatch(setLoading(false));
      dispatch(setLoadedImages([]));
    }
  }, [loadedImages]);
  return (
    <PublicLayout setMode={setMode}>
      {isMobile ? (
        <div className='flex flex-col p-2 mt-[60px]'>
          <div className={`relative bg-[url('/bgcontent-2.jpeg')] w-full bg-cover bg-no-repeat py-5`}>
            <div className='absolute z-1 bg-white/50 inset-0' />
            <div className='relative z-2 flex flex-col items-center'>
              <h1 className="text-2xl text-sky-700">🌈 Belajar</h1>
              <img
                ref={imgRef}
                src='/no-bg-2.png'
                alt='yokila'
                width={150}
                onLoad={() => {
                  const newLoaded = [...loadedImages];
                  newLoaded[0] = true;
                  dispatch(setLoadedImages(newLoaded));
                }}
              />
              <h2 className='text-lg text-orange-600'>Jadi Petualangan Seru!</h2>
              <button type="button" className="text-white bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-4" onClick={() => navigate('/play')}>
                Mainkan
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </PublicLayout>
  );
};

export default PublicHomePage;