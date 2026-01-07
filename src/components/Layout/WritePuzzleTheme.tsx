import { GetCategoryLessonPublicDataLessonResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import { DetailLessonDataResponse } from "@/types/admin/lesson/DetailLessonTypes";
import { useEffect, useRef, useState } from "react";
import WritePuzzleItemTheme from "./WritePuzzleItemTheme";
import { Player } from "@lottiefiles/react-lottie-player";
import { setPlayVideoKamuHebat, setProgressBar } from "@/features/generalSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import isIOS from "@/constants/isIos";

interface WritePuzzleThemeType {
    data: GetCategoryLessonPublicDataLessonResponse | DetailLessonDataResponse;
}


const WritePuzzleTheme = ({ data }: WritePuzzleThemeType) => {
    const isiOS = isIOS();
    const dispatch = useAppDispatch()
    const { progressBar } = useAppSelector((state) => state.general);
    const svgContainerRef = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState(0)

    useEffect(() => {
        setStep(1)
    }, [data.id])

    const handleSuccess = () => {
        if (!data?.items) return;
        if (step < data.items.length) {
            if (step === data.items.length - 1) {
                setTimeout(() => {
                    setStep(prev => prev + 1);
                }, 1000);
            } else {
                setStep(prev => prev + 1);
            }
        }
    };

    useEffect(() => {
        if (!data?.items) return;

        if (step === data.items.length) {
            setTimeout(() => {
                dispatch(setPlayVideoKamuHebat(true));
            }, 1000)

            setTimeout(() => {
                dispatch(setProgressBar(progressBar + 1));
                setStep(1);
            }, 3000);
        }
    }, [step, data?.items?.length]);



    return (
        <div className='flex flex-col'
            style={{
                touchAction: "none",
                overscrollBehavior: "none"
            }}
        >
            <div className={'rounded-lg bg-pink-200 p-1 flex flex-col mb-2'}>
                <span className={'text-blue-800 w-full text-center text-md'}>{data.title}</span>
                <span className={'text-orange-800 w-full text-center text-sm'}>{data.description}</span>
            </div>
            <div className={`relative w-full bg-cover bg-no-repeat h-[74dvh] p-2 rounded-lg`} style={{ backgroundImage: `url(${import.meta.env.VITE_API_IMAGE_URL}${data.media})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div
                className="absolute flex justify-center items-center w-full h-full"
                style={{
                    display: isiOS ? "none" : "flex"
                }}
                >
                {data?.items &&
                    step === data.items.length &&
                    data.items[step - 1].is_done && (
                    <Player
                        src={`${import.meta.env.VITE_API_IMAGE_URL}${data.items[step - 1].media}`}
                        autoplay
                        loop={false}
                        style={{ pointerEvents: "none", width: "70dvw" }}
                    />
                    )}
                </div>
                <div ref={svgContainerRef}
                    style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}
                />
                <div className="w-full h-full bg-white/80 rounded-lg">
                    {data?.items && data.items.length > 0 && step <= data.items.length && (
                        <>
                            <WritePuzzleItemTheme
                                key={`lesson-${data.id}-progress-${progressBar}`}
                                data={data.items[step - 1]}
                                onSuccess={handleSuccess}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WritePuzzleTheme;