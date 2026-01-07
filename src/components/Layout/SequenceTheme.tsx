import getRandomOptions from "@/constants/random_option";
import speak from "@/constants/speak";
import { GetCategoryLessonPublicDataLessonItemResponse, GetCategoryLessonPublicDataLessonResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import { useEffect, useMemo, useRef, useState } from "react";
import { setLoadedImages, setLoading, setPlayVideoKamuHebat, setPlayVideoUhSalah, setProgressBar } from "@/features/generalSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useLessonGroupPublics } from "@/hooks/useLessonGroupPublics";
import { useDeviceMode } from "@/constants/dimension";
import { closestCenter, DndContext, MouseSensor, TouchSensor, useDraggable, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import arrayCheck from "@/constants/arrayCheck";
import shuffle from "@/constants/suffle";
import ShowInfo from "./Info";
import SequenceFirstTheme from "./SequenceFirstTheme";
import SequenceSecondTheme from "./SequenceSecondTheme";
import suffle from "@/constants/suffle";
import { DetailLessonDataResponse } from "@/types/admin/lesson/DetailLessonTypes";

interface SequenceThemeProps {
  data: GetCategoryLessonPublicDataLessonResponse | DetailLessonDataResponse;
}

const SequenceTheme = ({ data }: SequenceThemeProps) => {
  const dispatch = useAppDispatch()
  const { progressBar, playVideoKamuHebat, loadedImages } = useAppSelector((state) => state.general);
  const prevIndexRef = useRef<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false);
  const total = data.items.length;
  const [options, setOptions] = useState<GetCategoryLessonPublicDataLessonItemResponse[]>([])

  const onCorrectAnswer = () => {
    setIsCorrect(true);
    setTimeout(() => {
      dispatch(setPlayVideoKamuHebat(true));
    }, 1000);
  }

  const onWrongAnswer = () => {
    setTimeout(() => {
      dispatch(setPlayVideoUhSalah(true));
    }, 500);
  }

  useEffect(() => {
    if (!playVideoKamuHebat && isCorrect) {
      if (currentIndex === 1) {
        dispatch(setProgressBar(progressBar + 1));
      }
    }
  }, [playVideoKamuHebat]);

  useEffect(() => {
    if (data && data.items && data.items.length > 0) {
      setOptions(
        suffle(data.items)
      );
    }
  }, [data])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    dispatch(setLoading(true));
    dispatch(setLoadedImages(new Array(data.items.length).fill(false)));

    timeoutId = setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      dispatch(setLoading(false));
      dispatch(setLoadedImages([]));
    };
  }, []);

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
        <span className={'text-orange-800 w-full text-center text-sm'}>{data.description}</span>
      </div>
      <div className={`relative w-full bg-cover bg-no-repeat h-[74dvh] p-2 rounded-lg`} style={{ backgroundImage: `url(${import.meta.env.VITE_API_IMAGE_URL}${data.media})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/50 pointer-events-none z-0" />
        {currentIndex === 0 && (
          <div className="absolute top-[35dvh] right-3 z-50" onClick={() => setCurrentIndex(1)}>
            <img src={'/arrow-right.svg'} alt="add" width={30} height={30} className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]" />
          </div>
        )}
        {data && data.items && data.items.length > 0 && currentIndex === 0 && (
          <SequenceFirstTheme array={data.items} description={data.description} />
        )}
        {(options && options.length > 0) && (data && data.items && data.items.length > 0) && currentIndex === 1 && (
          <SequenceSecondTheme data={data.items} array={options} description={data.description} onCorrectAnswer={onCorrectAnswer} onWrongAnswer={onWrongAnswer} />
        )}
        {currentIndex === 1 && (
          <div className="absolute top-[35dvh] left-3 z-50" onClick={() => setCurrentIndex(0)}>
            <img src={'/arrow-left.svg'} alt="add" width={30} height={30} className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SequenceTheme;