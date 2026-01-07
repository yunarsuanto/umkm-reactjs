import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { GetCategoryLessonPublicDataLessonItemResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import { useEffect, useRef, useState } from "react";
import ShowInfo from "./Info";
import { setLoadedImages, setLoading } from "@/features/generalSlice";
import speak from "@/constants/speak";
import { GetLessonItemDataResponse } from "@/types/admin/lesson_item/GetLessonItemTypes";

interface SequenceFirstThemeProps {
    array: GetCategoryLessonPublicDataLessonItemResponse[] | GetLessonItemDataResponse[];
    description: string;
}

const SequenceFirstTheme = ({ array, description }: SequenceFirstThemeProps) => {
    const dispatch = useAppDispatch()
    const { loadedImages } = useAppSelector((state) => state.general)
    const playerRef = useRef<(HTMLElement | null)[]>([]);
    return (
        <div className="relative z-1">
            {array && array.length > 0 && (
                <ShowInfo description={description} />
            )}
            <div className="absolute bg-white p-[5px] rounded-tl-lg rounded-br-lg left-0 top-0 text-sky-600">Halaman 1</div>
            <div className="grid grid-cols-2 h-[72dvh] justify-center items-center">
                {array && array.length > 0 && array.map((item, index) => {
                    return (
                        <div onClick={() => speak(item.content)} key={index}>
                            <lottie-player
                                ref={(el: any) => (playerRef.current[index + 1] = el)}
                                autoplay
                                loop
                                mode="normal"
                                src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
                                onLoad={() => {
                                    const newLoaded = [...loadedImages];
                                    newLoaded[index] = true;
                                    dispatch(setLoadedImages(newLoaded));
                                }}
                                style={{
                                    pointerEvents: 'none',
                                    touchAction: 'none',
                                    height: '18dvh',
                                }}
                            />
                            <div className="text-center text-white">
                                <p className="font-bold" style={{ textShadow: '0px 0px 3px black' }}>
                                    {item.order}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SequenceFirstTheme;