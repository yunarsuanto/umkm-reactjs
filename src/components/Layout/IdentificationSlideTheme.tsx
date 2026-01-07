import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useDeviceMode } from "@/constants/dimension";
import getRandomOptions from "@/constants/random_option";
import speak from "@/constants/speak";
import { setLoadedImages, setLoading, setPlayVideoKamuHebat, setPlayVideoUhSalah } from "@/features/generalSlice";
import { GetCategoryLessonPublicDataLessonItemResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import { useEffect, useState } from "react";
import ShowInfo from "./Info";
import { Player } from "@lottiefiles/react-lottie-player";
import { GetLessonItemDataResponse } from "@/types/admin/lesson_item/GetLessonItemTypes";

interface IdentificationSlideThemeProps {
  single: GetCategoryLessonPublicDataLessonItemResponse | GetLessonItemDataResponse;
  array: GetCategoryLessonPublicDataLessonItemResponse[] | GetLessonItemDataResponse[];
  description: string;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

const IdentificationSlideTheme = ({ single, array, description, onCorrectAnswer, onWrongAnswer }: IdentificationSlideThemeProps) => {
  const dispatch = useAppDispatch()
  const { loadedImages } = useAppSelector((state) => state.general)
  const [options, setOptions] = useState<GetCategoryLessonPublicDataLessonItemResponse[]>()

  const CheckItem = (first: string, second: string) => {
    if (first === second) {
      onCorrectAnswer()
    } else {
      onWrongAnswer()
    }
  }

  useEffect(() => {
    if (single) {
      setOptions(
        getRandomOptions(array, single, 4)
      )
    }
  }, [single, array])


  useEffect(() => {
    dispatch(setLoading(true))
    if (options && options.length > 0) {
      dispatch(setLoading(true));
      dispatch(setLoadedImages(new Array(options.length).fill(false)));
    }
  }, [])

  useEffect(() => {
    if (loadedImages.length > 0 && loadedImages.every(Boolean)) {
      dispatch(setLoading(false));
      dispatch(setLoadedImages([]));
    }
  }, [loadedImages]);
  return (
    <div>
      {single && (
        <ShowInfo description={description.replaceAll('{content}', single.content)} />
      )}
      <div className="grid grid-cols-2 gap-4 h-[72dvh] justify-center items-center relative z-1">
        {options && options.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                speak(item.content)
                CheckItem(single.content, item.content)
              }}
            >
              <Player
                src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
                autoplay={true}
                loop={true}
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
    </div>
  )
};

export default IdentificationSlideTheme;