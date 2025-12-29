import { useAppDispatch, useAppSelector } from "@/app/hooks";
import speak from "@/constants/speak";
import { GetCategoryLessonPublicDataLessonResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import { useEffect, useRef, useState } from "react";
import ShowInfo from "./Info";
import { Player } from "@lottiefiles/react-lottie-player";
import { setLoadedImages, setLoading } from "@/features/generalSlice";

interface RecognitionThemeType {
  data: GetCategoryLessonPublicDataLessonResponse;
}

const RecognitionTheme = ({ data }: RecognitionThemeType) => {
  const isPlayed = useRef(false)
  const dispatch = useAppDispatch()
  const { loadedImages } = useAppSelector((state) => state.general)

  // Auto-play description on first user interaction (browser policy compliant)
  useEffect(() => {
    if (isPlayed.current) return;

    const handleFirstInteraction = () => {
      if (!isPlayed.current) {
        isPlayed.current = true;
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    // Listen for any user interaction
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [data.description]);

  useEffect(() => {
    if (data.items && data.items.length > 0) {
      dispatch(setLoading(true));
      dispatch(setLoadedImages(new Array(data.items.length).fill(false)));
    }
  }, [data.items]);
  useEffect(() => {
    if (loadedImages.length > 0 && loadedImages.every(Boolean)) {
      dispatch(setLoading(false));
      dispatch(setLoadedImages([]));
    }
  }, [loadedImages]);

  return (
    <div className='flex flex-col'>
      <div className={`relative w-full bg-cover bg-no-repeat h-[74dvh] p-2 rounded-lg`} style={{ backgroundImage: `url(${import.meta.env.VITE_API_IMAGE_URL}${data.media})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <ShowInfo description={data.description} />
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {data && data.items && data.items.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => speak(item.content)}
              >
                <Player
                  src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
                  autoplay={true}
                  loop={true}
                  style={{ width: '100%', flex: 1, height: 130 }}
                  onEvent={(event) => {
                    if (event === 'load') {
                      const newLoaded = [...loadedImages];
                      newLoaded[index] = true;
                      dispatch(setLoadedImages(newLoaded));
                    }
                  }}
                />
                <div className="text-center text-white">
                  <p className="font-bold" style={{ textShadow: '0px 0px 3px black' }}>
                    {item.content}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <div>
        </div>
      </div>
    </div>
  )
};

export default RecognitionTheme;