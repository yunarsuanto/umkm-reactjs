import AdminLayout from '../../../components/admin/AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setDataPagination } from '@/features/paginationSlice';
import { useDetailLessons } from '@/hooks/useDetailLessons';
import { useLessonItems } from '@/hooks/useLessonItems';
import CardLessonItems from '@/components/admin/lessons/CardLessonItems';
import DeleteModalLessonItem from '@/components/admin/lessons/DeleteModalLessonItem';
import { useLessonGroups } from '@/hooks/useLessonGroups';
import CardLessonGroups from '@/components/admin/lessons/CardLessonGroups';

const AdminLessonDetailPage = () => {
    const dispatch = useAppDispatch();
    const { category_lesson_id } = useParams<{ category_lesson_id: string }>();
    const { lesson_id } = useParams<{ lesson_id: string }>();
    const navigate = useNavigate()
    const { data: dataDetail } = useDetailLessons(lesson_id!, {
        enabled: lesson_id !== '' && typeof lesson_id !== 'undefined',
    })
    
    const limit = 20
    const pagination = useAppSelector((state) => state.pagination);
    const queryOptions = useMemo(() => ({
    enabled: pagination.page !== 0,
    }), [pagination.page]);
    const { data: dataLessonItems } = useLessonItems(pagination, {lesson_id: lesson_id!}, queryOptions)
    
    const { data: dataLessonGroups } = useLessonGroups(pagination, {lesson_id: lesson_id!}, queryOptions)
    
    const { openDelete } = useAppSelector((state) => state.lessonItem);

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

    return (
        <AdminLayout>
            <DeleteModalLessonItem open={openDelete} />
            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">{dataDetail?.data.title}</h2>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/detail/${lesson_id}/item/create`)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                            title="Create Lesson Item"
                        >
                            <img src={'/add.svg'} alt="add" width={30} height={30} />
                        </button>
                        <button
                            onClick={() => navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/detail/${lesson_id}/group/create`)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                            title="Create Lesson Group"
                        >
                            <img src={'/add.svg'} alt="add" width={30} height={30} />
                        </button>
                        <button
                            onClick={() => navigate(`/admin/category-lessons/detail/${category_lesson_id}`)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                            title="Back"
                        >
                            <img src={'/back.svg'} alt="back" width={30} height={30} />
                        </button>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    {/* Description and Image */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        {/* Description */}
                        <div className="col-span-2">
                            <p className="text-gray-600 text-sm">{dataDetail?.data.description}</p>
                            <hr className="my-4 border-gray-300" />
                        </div>
                        {/* Image */}
                        <div className="flex items-center justify-center">
                            {dataDetail && dataDetail.data.media && (
                                <img
                                    src={`${import.meta.env.VITE_API_IMAGE_URL}${dataDetail.data.media}`}
                                    alt="Lesson"
                                    className="max-w-full h-auto rounded-lg p-2"
                                />
                            )}
                        </div>
                    </div>

                    {/* Lesson Groups Section */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Groups</h3>
                        <hr className="mb-6 border-gray-300" />
                        <CardLessonGroups data={dataLessonGroups?.data ?? []} totalPages={0} category_lesson_id={category_lesson_id!} lesson_id={lesson_id!} />
                    </div>

                    {/* Lesson Items Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Items</h3>
                        <hr className="mb-6 border-gray-300" />
                        <CardLessonItems data={dataLessonItems?.data ?? []} totalPages={0} category_lesson_id={category_lesson_id!} lesson_id={lesson_id!} lessonType={dataDetail?.data?.lesson_type!} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminLessonDetailPage;