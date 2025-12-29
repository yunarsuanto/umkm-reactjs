import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { GetCategoryLessonPublicDataLessonItemResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import { useEffect, useRef, useState } from "react";
import ShowInfo from "./Info";
import { setLoadedImages, setLoading } from "@/features/generalSlice";
import speak from "@/constants/speak";

interface SequenceFirstThemeProps {
    array: GetCategoryLessonPublicDataLessonItemResponse[];
    description: string;
}

const SequenceFirstTheme = ({ array, description }: SequenceFirstThemeProps) => {
    const dispatch = useAppDispatch()
    const { loadedImages } = useAppSelector((state) => state.general)
    const playerRef = useRef<(HTMLElement | null)[]>([]);
    return (
        <div>
            {array && array.length > 0 && (
                <ShowInfo description={description} />
            )}
            <div className="h-[100%] grid grid-cols-2 gap-y-3 gap-x-5 ">
                {array && array.length > 0 && array.map((item, index) => {
                    return (
                        <div onClick={() => speak(item.content)}>
                            <lottie-player
                                key={index}
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
                                    height: '80%',
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