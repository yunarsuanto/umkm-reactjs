import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AdminLayout from '@/components/admin/AdminLayout';
import { IconExclamationCircle } from '@tabler/icons-react';
import { setImage } from '@/features/lessonItemSlice';
import { useUploadFile } from '@/hooks/useUploadFile';
import { addLessonGroupSchema, AddLessonGroupSchema } from '@/schemas/addLessonGroup.schema';
import { useAddLessonGroups } from '@/hooks/useAddLessonGroups';

const AdminLessonGroupCreatePage = () => {
  const { category_lesson_id } = useParams<{ category_lesson_id: string }>();
  const { lesson_id } = useParams<{ lesson_id: string }>();
  const dispatch = useAppDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<AddLessonGroupSchema>({
    resolver: zodResolver(addLessonGroupSchema),
    defaultValues: {
      group: 1,
    }
  });
  
  const { mutateAsync, isPending, isError, error } = useAddLessonGroups();
  const navigate = useNavigate()

  // const debouncedSubmit = useDebouncedCallback( async (data: AddLessonGroupSchema) => {
  //   let payload: AddLessonGroupSchema = {...data, lesson_id: lesson_id}
  //   await mutateAsync(payload)
  //   reset();
  //   dispatch(setImage(''));
  // }, 500);

  // const onSubmit = async (data: AddLessonGroupSchema) => {
  //   await new Promise<void>((resolve) => {
  //     debouncedSubmit(data);
  //     setTimeout(resolve, 600);
  //   })
  // };

  const handleSubmit2 = async (data: AddLessonGroupSchema) => {
    let payload: AddLessonGroupSchema = {...data, lesson_id: lesson_id!}
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
          <h2 className="text-2xl font-bold text-gray-900">Add Lesson Group</h2>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Group Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="group"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                        errors.group ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  )}
                />
                {errors.group && (
                  <p className="mt-1 text-sm text-red-500">{errors.group.message}</p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('description')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>
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
                {isPending ? 'Adding...' : 'Add Lesson Group'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLessonGroupCreatePage;