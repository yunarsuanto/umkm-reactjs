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

interface IdentificationThemeProps {
  data: GetCategoryLessonPublicDataLessonResponse;
}

const IdentificationTheme = ({ data }: IdentificationThemeProps) => {
  const dispatch = useAppDispatch()

  const total = data.items.length;
  const { progressBar } = useAppSelector((state) => state.general);
  const [currentIndex, setCurrentIndex] = useState(0)
  const prevIndexRef = useRef<number>(0);
  const [single, setSingle] = useState<GetCategoryLessonPublicDataLessonItemResponse | null>(null)

  const handleSpeak = (slideIndex: number) => {
    const r = data.items[slideIndex];
    if (!r) return;
    setTimeout(() => {
      speak(data.description.replaceAll('{content}', r.content));
    }, 4200)
  };

  const onCorrectAnswer = () => {
    setTimeout(() => {
      dispatch(setPlayVideoKamuHebat(true));
    }, 1000);

    if (total === currentIndex + 1) {
      dispatch(setProgressBar(progressBar + 1))
    };
    setCurrentIndex(currentIndex + 1)
    handleSpeak(currentIndex + 1);
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

  return (
    <div className='flex flex-col'>
      <div className={`relative w-full bg-cover bg-no-repeat h-[74dvh] p-2 rounded-lg`} style={{ backgroundImage: `url(${import.meta.env.VITE_API_IMAGE_URL}${data.media})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {single && (
          <IdentificationSlideTheme single={single} array={data.items} description={data.description} onCorrectAnswer={onCorrectAnswer} onWrongAnswer={onWrongAnswer} />
        )}
      </div>
    </div>
  );
};

export default IdentificationTheme;