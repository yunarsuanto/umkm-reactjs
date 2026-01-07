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
  const { loadedImages } = useAppSelector((state) => state.general)


  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    dispatch(setLoading(true))
    dispatch(setLoadedImages([false]))

    timeoutId = setTimeout(() => {
      dispatch(setLoading(false));
    }, 4000);
  }, [])

  useEffect(() => {
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
          <div className={`relative bg-[url('/bgcontent-2.jpeg')] w-full bg-cover bg-no-repeat py-5 rounded-lg overflow-hidden`} style={{ touchAction: 'none', overscrollBehavior: 'contain' }}>
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
          <div className={`relative w-full bg-green-200 bg-no-repeat p-2 mt-2 rounded-lg`}>
            <div className="h-[45dvh] overflow-y-auto">
              <div className='pb-[20px]'>
                <h1 className='text-sky-700 p-2'>Prakata</h1>
                <img src="/bg-yokila-ceceu.jpg" alt="" style={{width: '100%'}} className='rounded-lg' />
                <p className='text-gray-600 p-2 text-justify'>
                  Ide ini berawal dari sebuah keresahan yang sangat sederhana namun membekas.<br/>
                  Saya melihat keponakan saya, yang telah berusia empat tahun, masih berada pada tahap awal belajar membaca.<br/>

                  Bukan karena ia kurang cerdas atau tidak tertarik belajar—justru sebaliknya, ia memiliki imajinasi yang kuat dan rasa ingin tahu yang besar. Namun ia belum memahami satu hal mendasar: bagaimana huruf-huruf yang terpisah dapat saling terhubung dan membentuk bunyi serta makna. Baginya, huruf b dan a masih dua hal yang berdiri sendiri, belum menjadi “ba”.<br/>

                  Dari situ saya mulai bertanya pada diri sendiri:
                  Bagaimana jika proses belajar membaca dimulai dari membantu anak memahami keterhubungan, bukan sekadar menghafal?<br/>

                  Proyek ini lahir bukan dari ambisi besar, melainkan dari rasa peduli. Keinginan untuk menemani anak memahami dunia huruf secara perlahan—melalui suara, visual, sentuhan, dan permainan—tanpa memaksa imajinasinya berhenti, justru menjadikannya bagian dari proses belajar.<br/>

                  Di dalamnya ada foto kami berdua. Bukan untuk ditonjolkan, melainkan untuk mengingatkan bahwa karya ini bisa saja lahir dari hubungan sederhana—Anda dengan anak, keluarga, atau orang terdekat. Jangan berhenti berkarya, karena cinta sering kali menjadi awal dari sesuatu yang besar.<br/>

                  Semoga apa yang dibuat di sini dapat menjadi jembatan kecil antara imajinasi anak dan pemahaman membaca, serta menjadi bukti bahwa dari perhatian sederhana, bisa lahir sesuatu yang bermakna.<br/>
                </p>
              </div>
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