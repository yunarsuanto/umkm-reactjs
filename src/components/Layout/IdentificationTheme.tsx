import getRandomOptions from "@/constants/random_option";
import speak from "@/constants/speak";
import { GetCategoryLessonPublicDataLessonItemResponse, GetCategoryLessonPublicDataLessonResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import { useEffect, useRef, useState } from "react";
import IdentificationSlideTheme from "./IdentificationSlideTheme";
import { EmblaCarouselType } from "embla-carousel";
import { setPlayVideoKamuHebat, setPlayVideoUhSalah, setProgressBar } from "@/features/generalSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useDeviceMode } from "@/constants/dimension";
import ShowInfo from "./Info";
import { DetailLessonDataResponse } from "@/types/admin/lesson/DetailLessonTypes";
import { GetLessonItemDataResponse } from "@/types/admin/lesson_item/GetLessonItemTypes";

interface IdentificationThemeProps {
  data: GetCategoryLessonPublicDataLessonResponse | DetailLessonDataResponse;
}

const IdentificationTheme = ({ data }: IdentificationThemeProps) => {
  const dispatch = useAppDispatch()

  const total = data.items.length;
  const { progressBar, playVideoKamuHebat } = useAppSelector((state) => state.general);
  const [currentIndex, setCurrentIndex] = useState(0)
  const prevIndexRef = useRef<number>(0);
  const [single, setSingle] = useState<GetCategoryLessonPublicDataLessonItemResponse | GetLessonItemDataResponse | null>(null)
  const [isCorrect, setIsCorrect] = useState(false);

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

  return (
    <div className='flex flex-col'>
      <div className={'rounded-lg bg-pink-200 p-1 flex flex-col mb-2'}>
        <span className={'text-blue-800 w-full text-center text-md'}>{data.title}</span>
        <span className={'text-orange-800 w-full text-center text-sm'}>{data.description.replaceAll('{content}', single?.content!)}</span>
      </div>
      <div className={`relative w-full bg-cover bg-no-repeat h-[74dvh] p-2 rounded-lg`} style={{ backgroundImage: `url(${import.meta.env.VITE_API_IMAGE_URL}${data.media})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/50 pointer-events-none z-0" />
        {single && (
          <IdentificationSlideTheme single={single} array={data.items} description={data.description} onCorrectAnswer={onCorrectAnswer} onWrongAnswer={onWrongAnswer} />
        )}
      </div>
    </div>
  );
};

export default IdentificationTheme;