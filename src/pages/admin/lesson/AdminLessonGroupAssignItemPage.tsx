import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AdminLayout from '@/components/admin/AdminLayout';
import { IconExclamationCircle } from '@tabler/icons-react';
import { setImage } from '@/features/lessonItemSlice';
import { addLessonGroupAssignItemSchema, AddLessonGroupAssignItemSchema } from '@/schemas/addLessonGroupAssignItem.schema';
import { useAssignItemGroups } from '@/hooks/useAssignItemGroup';
import { useEffect, useMemo } from 'react';
import { useLessonGroups } from '@/hooks/useLessonGroups';
import { setDataPagination } from '@/features/paginationSlice';

const AdminLessonGroupAssignItemPage = () => {
  const { lesson_item_id } = useParams<{ lesson_item_id: string }>();
  const { category_lesson_id } = useParams<{ category_lesson_id: string }>();
  const { lesson_id } = useParams<{ lesson_id: string }>();
  const dispatch = useAppDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<AddLessonGroupAssignItemSchema>({
    resolver: zodResolver(addLessonGroupAssignItemSchema),
    defaultValues: {
      lesson_item_id: lesson_item_id,
    }
  });
  
  const { mutateAsync, isPending, isError, error } = useAssignItemGroups();
  const navigate = useNavigate()

  const limit = 20
  const pagination = useAppSelector((state) => state.pagination);
  const queryOptions = useMemo(() => ({
  enabled: pagination.page !== 0,
  }), [pagination.page]);
  const { data: dataLessonGroups, isLoading } = useLessonGroups(pagination, {lesson_id: lesson_id!}, queryOptions)

  // const debouncedSubmit = useDebouncedCallback( async (data: AddLessonGroupAssignItemSchema) => {
  //   let payload: AddLessonGroupAssignItemSchema = {...data, lesson_item_id: lesson_item_id}
  //   await mutateAsync(payload)
  //   reset();
  //   dispatch(setImage(''));
  // }, 500);

  // const onSubmit = async (data: AddLessonGroupAssignItemSchema) => {
  //   await new Promise<void>((resolve) => {
  //     debouncedSubmit(data);
  //     setTimeout(resolve, 600);
  //   })
  //   navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/detail/${lesson_id}`)
  // };

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
  const handleSubmit2 = async (data: AddLessonGroupAssignItemSchema) => {
    let payload: AddLessonGroupAssignItemSchema = {...data, lesson_item_id: lesson_item_id!}
    await mutateAsync(payload)
    reset();
    dispatch(setImage(''));
    navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/detail/${lesson_id}`)
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Assign Lesson Item to Group</h2>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
          {isError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <IconExclamationCircle size={20} className="text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800">Gagal Tambah Data</h3>
                <p className="text-red-700 text-sm">{error?.message}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(handleSubmit2)} className="space-y-6">
            {/* Lesson Group Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Group <span className="text-red-500">*</span>
              </label>
              <Controller
                name="lesson_group_id"
                control={control}
                rules={{
                  required: "isian ini harus diisi"
                }}
                render={({ field }) => (
                  <select
                    {...field}
                    disabled={isLoading}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                      errors.lesson_group_id ? 'border-red-500' : 'border-gray-300'
                    } ${isLoading ? 'bg-gray-100' : ''}`}
                  >
                    <option value="">Cari Group...</option>
                    {dataLessonGroups?.data.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.description}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.lesson_group_id && (
                <p className="mt-1 text-sm text-red-500">{errors.lesson_group_id.message}</p>
              )}
            </div>

            {/* Info Alert */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
              <IconExclamationCircle size={20} className="text-blue-600 flex-shrink-0" />
              <p className="text-blue-700 text-sm">Harap isi semua field yang diperlukan</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/detail/${lesson_id}`)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!isValid || isPending}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium"
              >
                {isPending ? 'Adding...' : 'Add to Group'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLessonGroupAssignItemPage;