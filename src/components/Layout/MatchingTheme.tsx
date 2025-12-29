import getRandomOptions from "@/constants/random_option";
import speak from "@/constants/speak";
import { GetCategoryLessonPublicDataLessonItemResponse, GetCategoryLessonPublicDataLessonResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
// import { Carousel } from "@mantine/carousel";
import { useEffect, useRef, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { setPlayVideoKamuHebat, setPlayVideoUhSalah, setProgressBar } from "@/features/generalSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import MatchingSlideTheme from "./MatchingSlideTheme";

interface MatchingThemeProps {
  data: GetCategoryLessonPublicDataLessonResponse;
}

const MatchingTheme = ({ data }: MatchingThemeProps) => {
  const dispatch = useAppDispatch()
  const { progressBar, playVideoKamuHebat } = useAppSelector((state) => state.general);
  const [single, setSingle] = useState<GetCategoryLessonPublicDataLessonItemResponse | null>(null)
  const prevIndexRef = useRef<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false);
  const total = data.items.length;

  const handleSpeak = (slideIndex: number) => {
    const r = data.items[slideIndex];
    if (!r) return;
    setTimeout(() => {
      speak(data.description.replaceAll('{content}', r.content));
    }, 4200)
  };

  const onCorrectAnswer = () => {
    setTimeout(() => {
      setIsCorrect(true);
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
      <div className={`relative w-full bg-cover bg-no-repeat h-[74dvh] p-2 rounded-lg`} style={{ backgroundImage: `url(${import.meta.env.VITE_API_IMAGE_URL}${data.media})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {single && (
          <MatchingSlideTheme single={single} array={data.items} description={data.description} onCorrectAnswer={onCorrectAnswer} onWrongAnswer={onWrongAnswer} isCorrect={isCorrect} />
        )}
      </div>
    </div>
  );
};

export default MatchingTheme;