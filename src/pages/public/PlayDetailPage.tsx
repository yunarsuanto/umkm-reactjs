import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ClasificationTheme from "@/components/Layout/ClasificationTheme";
import IdentificationTheme from "@/components/Layout/IdentificationTheme";
import LoopingTheme from "@/components/Layout/LoopingTheme";
import MatchingTheme from "@/components/Layout/MatchingTheme";
import PuzzleTheme from "@/components/Layout/PuzzleTheme";
import RecognitionTheme from "@/components/Layout/RecognitionTheme";
import RunningText from "@/components/Layout/RunningText";
import SequenceTheme from "@/components/Layout/SequenceTheme";
import YokilaJagonyaKamuHebat from "@/components/Layout/YokilaJagonyaKamuHebat";
import YokilaUhSalah from "@/components/Layout/YokilaUhSalah";
import PublicLayout from "@/components/public/PublicLayout";
import speak from "@/constants/speak";
import { setProgressBar } from "@/features/generalSlice";
import { GetCategoryLessonPublicDataResponse, GetCategoryLessonPublicDataLessonResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import { IconCheck } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface PlayPageProps {
    setMode: () => void
}

const PlayDetailPlay = ({ setMode }: PlayPageProps) => {
    const navigate = useNavigate()
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
        if (!lesson) return;
        const total = data.lessons.length + 1;

        if (progressBar === 1) {
            speak(lesson.description);
            return;
        }

        if (progressBar > 1 && progressBar < total) {
            const content = lesson.items?.[0]?.content;
            const message = lesson.description.replaceAll('{content}', content);
            speak(message);
        }
    }, [lesson?.id]);

    return (
        <PublicLayout setMode={setMode}>
            {playVideoKamuHebat && (
                <YokilaJagonyaKamuHebat play={playVideoKamuHebat} />
            )}
            {playVideoUhSalah && (
                <YokilaUhSalah play={playVideoUhSalah} />
            )}
            <div className='flex flex-col gap-2 mt-[60px] p-2 overflow-y-auto'
                style={{
                    touchAction: "none",
                    overscrollBehavior: "none"
                }}>
                {lesson ? (
                    <>
                        {lesson.lesson_type === 'recognition' && (<RecognitionTheme data={lesson} />)}
                        {lesson.lesson_type === 'identification' && (<IdentificationTheme data={lesson} />)}
                        {lesson.lesson_type === 'matching' && (<MatchingTheme data={lesson} />)}
                        {lesson.lesson_type === 'sequence' && (<SequenceTheme data={lesson} />)}
                        {lesson.lesson_type === 'looping' && (<LoopingTheme data={lesson} />)}
                        {lesson.lesson_type === 'clasification' && (<ClasificationTheme data={lesson} />)}
                        {lesson.lesson_type === 'puzzle' && (<PuzzleTheme data={lesson} />)}
                    </>
                ) : (
                    <div className="h-[82dvh]  flex flex-col justify-center items-center">
                        <p className="text-sky-600">Materi ini sudah Selesai</p>
                        <p className="text-pink-600">Kembali Untuk Mencoba Yang Lainnya</p>
                        <button className="flex items-center gap-1 px-3 py-1 text-lg bg-orange-100 text-orange-600 rounded mt-4" onClick={() => navigate('/play')}>Kembali</button>
                    </div>
                )}
            </div>
            <footer className="w-full border-t p-1 bg-white fixed bottom-0 h-[60px] flex">
                <div className="flex flex-1">
                    {data && data.lessons && data.lessons.map((item, index) => (
                        <div key={index} className="flex-1 flex justify-center items-center">
                            <div className="w-[30px] h-[30px] border-2 rounded-full bg-sky-600 text-white flex justify-center items-center">
                                {item.level < progressBar ? <IconCheck /> : item.level}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="px-4 text-sky-600"
                    onClick={() => dispatch(setProgressBar(progressBar + 1))}
                >
                    <div className="px-2">
                        <img src="/arrow-right.svg" alt="arrow-right" className="w-8 h-8" />
                    </div>
                </button>
            </footer>
        </PublicLayout>
    )
}

export default PlayDetailPlay;