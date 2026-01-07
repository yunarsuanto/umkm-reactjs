import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ClasificationTheme from "@/components/Layout/ClasificationTheme";
import IdentificationTheme from "@/components/Layout/IdentificationTheme";
import LoopingTheme from "@/components/Layout/LoopingTheme";
import MatchingTheme from "@/components/Layout/MatchingTheme";
import PuzzleTheme from "@/components/Layout/PuzzleTheme";
import RecognitionTheme from "@/components/Layout/RecognitionTheme";
import SequenceTheme from "@/components/Layout/SequenceTheme";
import WritePuzzleTheme from "@/components/Layout/WritePuzzleTheme";
import YokilaJagonyaKamuHebat from "@/components/Layout/YokilaJagonyaKamuHebat";
import YokilaUhSalah from "@/components/Layout/YokilaUhSalah";
import UserLayout from "@/components/user/UserLayout";
import speak from "@/constants/speak";
import { setProgressBar } from "@/features/generalSlice";
import { setDataPagination } from "@/features/paginationSlice";
import { useLessonDetailForUser } from "@/hooks/useLessonDetailForUser";
import { useLessonsForUser } from "@/hooks/useLessonsForUser";
import { IconCheck } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import { useNavigate, useParams } from "react-router-dom";

const UserLessonDetailPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { type } = useParams<{ type: string }>();
    const { category_lesson_id } = useParams<{ category_lesson_id: string }>();
    const { progressBar, playVideoKamuHebat, playVideoUhSalah } = useAppSelector((state) => state.general);
    const [lessonId, setLessonId] = useState('')
    const limit = 20
    const pagination = useAppSelector((state) => state.pagination);
    const queryOptions = useMemo(() => ({
        enabled: pagination.page !== 0,
    }), [pagination.page]);

    const { data } = useLessonsForUser(pagination, { category_lesson_id: category_lesson_id || '' }, queryOptions)

    const { data: dataDetail } = useLessonDetailForUser(lessonId, { enabled: !!lessonId })

    const renderLessonTheme = () => {
        if (data && data.data && progressBar > data.data.length) {
            return (
                <div className="h-[82dvh]  flex flex-col justify-center items-center">
                    <p className="text-sky-600">Materi ini sudah Selesai</p>
                    <p className="text-pink-600">Kembali Untuk Mencoba Yang Lainnya</p>
                    <button className="flex items-center gap-1 px-3 py-1 text-lg bg-orange-100 text-orange-600 rounded mt-4" onClick={() => navigate('/user/lesson')}>Kembali</button>
                </div>
            )
        }

        if (!lessonId || !dataDetail?.data || dataDetail.data.id !== lessonId) return null;

        const lesson = dataDetail.data;

        switch (lesson.lesson_type) {
            case 'recognition':
                return <RecognitionTheme key={lessonId} data={lesson} />;

            case 'identification':
                return <IdentificationTheme key={lessonId} data={lesson} />;

            case 'matching':
                return <MatchingTheme key={lessonId} data={lesson} />;

            case 'sequence':
                return <SequenceTheme key={lessonId} data={lesson} />;

            case 'looping':
                return <LoopingTheme key={lessonId} data={lesson} />;

            case 'clasification':
                return <ClasificationTheme key={lessonId} data={lesson} />;

            case 'puzzle':
                return type === 'write'
                    ? <WritePuzzleTheme key={lessonId} data={lesson} />
                    : <PuzzleTheme key={lessonId} data={lesson} />;

            default:
                return null;
        }
    };


    useEffect(() => {
        dispatch(setDataPagination({
            search: '',
            page: 1,
            limit: limit,
            prev: 0,
            next: 0,
            totalPages: 0,
            totalRecords: 0,
        }))
    }, [dispatch, limit])

    useEffect(() => {
        if (!data || !data.data) return;
        if (progressBar > data.data.length) {
            setLessonId('');
            return;
        }
        if (progressBar > 0) {
            setLessonId(data.data[progressBar - 1].id);
        }
    }, [data, progressBar])

    useEffect(() => {
        dispatch(setProgressBar(1))
    }, [])


    useEffect(() => {
        if (data && data.data && data.data.length > 0 && dataDetail && dataDetail.data && dataDetail.data.items && dataDetail.data.items.length > 0) {
            const total = data.data.length + 1;
            if (progressBar === 1) {
                speak(dataDetail.data.description);
                return;
            }
            if (progressBar > 1 && progressBar < total) {
                const content = dataDetail.data.items[0]?.content;
                const message = dataDetail.data.description.replaceAll('{content}', content);
                speak(message);
            }
        }
    }, [dataDetail, data])

    return (
        <UserLayout>
            {playVideoKamuHebat && (
                <YokilaJagonyaKamuHebat play={playVideoKamuHebat} />
            )}
            {playVideoUhSalah && (
                <YokilaUhSalah play={playVideoUhSalah} />
            )}
            {isMobile ? (
                <div className='flex flex-col p-2 mt-[60px] h-[calc(100dvh-60px)]'>
                    {renderLessonTheme()}
                </div>
            ) : (
                <></>
            )}
            {isMobile && (
                <footer className="w-full border-t p-1 bg-white fixed bottom-0 h-[60px] flex">
                    <div className="flex flex-1">
                        {data && data.data && data.data.map((item, index) => (
                            <div key={index} className="flex-1 flex justify-center items-center">
                                <div className="w-[30px] h-[30px] border-2 rounded-full bg-sky-600 text-white flex justify-center items-center">
                                    {item.level < progressBar ? <IconCheck /> : item.level}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button disabled={progressBar > (data?.data?.length ?? 0)} onClick={(e) => dispatch(setProgressBar(progressBar + 1))}>
                        <div className="px-2">
                            <img src="/arrow-right.svg" alt="arrow-right" className="w-8 h-8" />
                        </div>
                    </button>
                </footer>
            )}
        </UserLayout>
    )
}
export default UserLessonDetailPage;