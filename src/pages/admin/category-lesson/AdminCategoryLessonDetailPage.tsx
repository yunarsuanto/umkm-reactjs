import AdminLayout from '@/components/admin/AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useDetailCategoryLessons } from '@/hooks/useDetailCategoryLessons';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CardLessons from '@/components/admin/lessons/CardLessons';
import { useEffect, useMemo } from 'react';
import { setDataPagination } from '@/features/paginationSlice';
import { useLessons } from '@/hooks/useLessons';
import DeleteModalLesson from '@/components/admin/lessons/DeleteModalLesson';
import CopyModalLesson from '@/components/admin/lessons/CopyModalLesson';

const AdminCategoryLessonDetailPage = () => {
    const dispatch = useAppDispatch();
    const { openDelete, openCopy } = useAppSelector((state) => state.lesson);
    const { category_lesson_id } = useParams<{ category_lesson_id: string }>();
    const navigate = useNavigate()
    const { data: dataDetail } = useDetailCategoryLessons(category_lesson_id!, {
        enabled: category_lesson_id !== '',
    })
    const limit = 20
    const pagination = useAppSelector((state) => state.pagination);
    const queryOptions = useMemo(() => ({
    enabled: pagination.page !== 0,
    }), [pagination.page]);
    const { data: dataLessons } = useLessons(pagination, {category_lesson_id: category_lesson_id!}, queryOptions)
    
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
            <DeleteModalLesson open={openDelete} />
            <CopyModalLesson open={openCopy} />
            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">{dataDetail?.data.title}</h2>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/create`)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                            title="Create Lesson"
                        >
                            <img src={'/add.svg'} alt="add" width={30} height={30} />
                        </button>
                        <button
                            onClick={() => navigate(`/admin/category-lessons`)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                            title="Back"
                        >
                            <img src={'/back.svg'} alt="back" width={30} height={30} />
                        </button>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <div className="grid grid-cols-3 gap-6 mb-6">
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
                                    alt="Category"
                                    className="max-w-full h-auto rounded-lg p-2"
                                />
                            )}
                        </div>
                    </div>

                    {/* Lessons Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lessons</h3>
                        <hr className="mb-6 border-gray-300" />
                        <CardLessons data={dataLessons?.data ?? []} totalPages={0} category_lesson_id={category_lesson_id!} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminCategoryLessonDetailPage;