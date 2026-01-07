import getRandomOptions from "@/constants/random_option";
import speak from "@/constants/speak";
import { GetCategoryLessonPublicDataLessonItemResponse, GetCategoryLessonPublicDataLessonResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
// import { Carousel } from "@mantine/carousel";
import { useEffect, useRef, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { setPlayVideoKamuHebat, setPlayVideoUhSalah, setProgressBar, setLoadedImages, setLoading, setLoadedImagesByIndex } from "@/features/generalSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import MatchingSlideTheme from "./MatchingSlideTheme";
import { Player } from "@lottiefiles/react-lottie-player";
import { DetailLessonDataResponse } from "@/types/admin/lesson/DetailLessonTypes";
import { GetLessonItemDataResponse } from "@/types/admin/lesson_item/GetLessonItemTypes";

interface MatchingThemeProps {
  data: GetCategoryLessonPublicDataLessonResponse | DetailLessonDataResponse;
}

const MatchingTheme = ({ data }: MatchingThemeProps) => {
  const dispatch = useAppDispatch()
  const { progressBar, playVideoKamuHebat, loadedImages } = useAppSelector((state) => state.general);
  const [single, setSingle] = useState<GetCategoryLessonPublicDataLessonItemResponse | GetLessonItemDataResponse | null>(null)
  const prevIndexRef = useRef<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false);
  const total = data.items.length;

  const handleSpeak = (slideIndex: number) => {
    const r = data.items[slideIndex];
    if (!r) return;
    setTimeout(() => {
      speak(data.description.replaceAll('{content}', r.content));
    }, 500)
  };

  const onCorrectAnswer = () => {
    setIsCorrect(true);
    setTimeout(() => {
      dispatch(setPlayVideoKamuHebat(true));
    }, 1000);
  }

  const onWrongAnswer = () => {
    setTimeout(() => {
      dispatch(setPlayVideoUhSalah(true));
    }, 1000);
  }

  useEffect(() => {
    const oldIndex = prevIndexRef.current;
    const newIndex = currentIndex;

    if (oldIndex !== newIndex && data.items) {
      setSingle(data.items[newIndex])
    } else {
      setSingle(data.items[oldIndex])
    }

    prevIndexRef.current = currentIndex;
  }, [currentIndex])

  useEffect(() => {
    if (!playVideoKamuHebat && isCorrect) {

      if (total === currentIndex + 1) {
        dispatch(setProgressBar(progressBar + 1));
      }
      setCurrentIndex((prev) => prev + 1);
      setIsCorrect(false);
      handleSpeak(currentIndex + 1);
    }
  }, [playVideoKamuHebat]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (data.items && data.items.length > 0) {
      dispatch(setLoading(true));
      dispatch(setLoadedImages(new Array(data.items.length).fill(false)));

      timeoutId = setTimeout(() => {
        dispatch(setLoading(false));
      }, 500);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      dispatch(setLoading(false));
      dispatch(setLoadedImages([]));
    };
  }, [data.items]);

  useEffect(() => {
    if (loadedImages.length > 0 && loadedImages.every(Boolean)) {
      dispatch(setLoading(false));
      dispatch(setLoadedImages([]));
    }
  }, [loadedImages]);

  return (
    <div className='flex flex-col'>
      <div className={'rounded-lg bg-pink-200 p-1 flex flex-col mb-2'}>
        <span className={'text-blue-800 w-full text-center text-md'}>{data.title}</span>
        <span className={'text-orange-800 w-full text-center text-sm'}>{data.description.replaceAll('{content}', single?.content!)}</span>
      </div>
      <div className={`relative w-full bg-cover bg-no-repeat h-[74dvh] p-2 rounded-lg`} style={{ backgroundImage: `url(${import.meta.env.VITE_API_IMAGE_URL}${data.media})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/50 pointer-events-none z-0" />
        {single && (
          <MatchingSlideTheme single={single} array={data.items} description={data.description} onCorrectAnswer={onCorrectAnswer} onWrongAnswer={onWrongAnswer} isCorrect={isCorrect} />
        )}

        <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
          {data.items.map((item, index) => (
            <Player
              key={index}
              src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
              autoplay={false}
              loop={false}
              onEvent={(event) => {
                if (event === 'load') {
                  dispatch(setLoadedImagesByIndex(index));
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchingTheme;