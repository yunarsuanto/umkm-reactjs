import { useAppDispatch, useAppSelector } from "@/app/hooks";
import IdentificationTheme from "@/components/Layout/IdentificationTheme";
import MatchingTheme from "@/components/Layout/MatchingTheme";
import RecognitionTheme from "@/components/Layout/RecognitionTheme";
import SequenceTheme from "@/components/Layout/SequenceTheme";
import YokilaJagonyaKamuHebat from "@/components/Layout/YokilaJagonyaKamuHebat";
import YokilaUhSalah from "@/components/Layout/YokilaUhSalah";
import PublicLayout from "@/components/public/PublicLayout";
import speak from "@/constants/speak";
import { setProgressBar } from "@/features/generalSlice";
import { GetCategoryLessonPublicDataResponse, GetCategoryLessonPublicDataLessonResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import { IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface PlayPageProps {
    setMode: () => void
}

const PlayDetailPlay = ({ setMode }: PlayPageProps) => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const { progressBar, playVideoKamuHebat, playVideoUhSalah } = useAppSelector((state) => state.general);
    const data = location.state as GetCategoryLessonPublicDataResponse
    const [lesson, setLesson] = useState<GetCategoryLessonPublicDataLessonResponse>()

    useEffect(() => {
        dispatch(setProgressBar(1))
    }, [])

    useEffect(() => {
        if (data && data.lessons) setLesson(data.lessons.filter((e) => e.level === progressBar)[0] || null);
    }, [data, progressBar])

    useEffect(() => {
        if (location.pathname === `/play/${data.id}` && lesson && progressBar === 1) {
            speak(lesson.description)
        }
        if (location.pathname === `/play/${data.id}` && lesson && progressBar < 1) {
            speak(lesson.description.replaceAll('{content}', lesson.items[0].content))
        }
    }, [lesson, progressBar])

    return (
        <PublicLayout setMode={setMode}>
            {playVideoKamuHebat && (
                <YokilaJagonyaKamuHebat play={playVideoKamuHebat} />
            )}
            {playVideoUhSalah && (
                <YokilaUhSalah play={playVideoUhSalah} />
            )}
            <div className='flex flex-col gap-2 mt-[60px] p-2'>
                {data && (
                    <div className={'rounded-lg bg-pink-200 p-1 flex flex-col'}>
                        <span className={'text-orange-800 w-full text-center text-xl'}>{data.description}</span>
                        <span className={'text-blue-800 w-full text-center'}>{data.title}</span>
                    </div>
                )}
                {lesson ? (
                    <>
                        {lesson.lesson_type === 'recognition' && (<RecognitionTheme data={lesson} />)}
                        {lesson.lesson_type === 'identification' && (<IdentificationTheme data={lesson} />)}
                        {lesson.lesson_type === 'matching' && (<MatchingTheme data={lesson} />)}
                        {lesson.lesson_type === 'sequence' && (<SequenceTheme data={lesson} />)}
                    </>
                ) : (
                    <>belum ada materi</>
                )}
            </div>
            <footer className="w-full border-t p-1 bg-white fixed bottom-0 h-[60px]">
                {data && data.lessons && data.lessons.map((item, index) => {
                    return (
                        <div key={index} className={`float-start h-full flex items-center justify-center`} style={{
                            width: `${Math.round((100 / data.lessons.length) - 10)}%`,
                            borderLeft: `${index === 0 ? '5px' : '0px'} solid rgb(220, 220, 220)`,
                            position: 'relative',
                        }}>
                            <div className="absolute flex text-center items-center justify-center">
                                <div className="w-[30px] h-[30px] border-2 rounded-full bg-sky-600 text-white">
                                    {item.level < progressBar ? (
                                        <IconCheck />
                                    ) : (
                                        <>{item.level}</>
                                    )}
                                </div>
                            </div>
                            <div style={{
                                color: 'rgb(220, 220, 220)',
                                position: 'absolute',
                                right: 0
                            }}>
                                <svg viewBox="0 0 22 80" fill="none" preserveAspectRatio="none" className="w-3 h-full stroke-gray-500">
                                    <path d="M0 -2 L20 40 L0 82" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    )
                })}
                <div className={`float-start h-full flex items-center`}>
                    <p className="ml-2 text-sky-600" onClick={() => { dispatch(setProgressBar(progressBar + 1)) }}>
                        Lanjut
                    </p>
                </div>
            </footer>
        </PublicLayout>
    )
}

export default PlayDetailPlay;