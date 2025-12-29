import AdminLayout from '@/components/admin/AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconExclamationCircle } from '@tabler/icons-react';
import { generateBase64, removeBase64Prefix } from '@/constants/generateBase64';
import { setImageBase64 } from '@/features/lessonSlice';
import { updateLessonSchema, UpdateLessonSchema } from '@/schemas/updateLesson.schema';
import { useUpdateLessons } from '@/hooks/useUpdateLessons';
import { useEffect } from 'react';
import { useDetailLessons } from '@/hooks/useDetailLessons';
import { useUploadFileBase64 } from '@/hooks/useUploadFile';
import { UploadFileBase64Schema } from '@/schemas/uploadFileBase64.schema';
import lessonTypes from '@/constants/lesson_types';

const AdminLessonUpdatePage = () => {
  const { lesson_id } = useParams<{ lesson_id: string }>();
  const { category_lesson_id } = useParams<{ category_lesson_id: string }>();
  const dispatch = useAppDispatch();
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<UpdateLessonSchema>({
    resolver: zodResolver(updateLessonSchema),
  });

  const level = watch('level')
  const {imageBase64} = useAppSelector((state: any) => state.lesson)
  const { mutateAsync, isPending, isError, error } = useUpdateLessons();
  const { mutateAsync:imageMutate } = useUploadFileBase64();
  const navigate = useNavigate()
  const { data: dataDetail } = useDetailLessons(lesson_id!, {
    enabled: lesson_id !== '',
  })

  // const debouncedSubmit = useDebouncedCallback( async (data: UpdateLessonSchema) => {
  //   let payload: UpdateLessonSchema = {...data}
  //   if(imageBase64 && imageBase64 !== ''){
  //     const image: UploadFileBase64Schema = {
  //       file: imageBase64,
  //     }
  //     const res = await imageMutate(image);
  //     payload = {...payload, media: res.data.path, category_lesson_id: category_lesson_id}
  //   }
  //   await mutateAsync(payload)
  //   reset();
  //   dispatch(setImageBase64(''));
  //   await navigate(`/admin/category-lessons/detail/${category_lesson_id}`)
  // }, 500);

  // const onSubmit = async (data: UpdateLessonSchema) => {
  //   await new Promise<void>((resolve) => {
  //     debouncedSubmit(data);
  //     setTimeout(resolve, 600);
  //   })
  // };
  
  const ChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return;
    let result = await generateBase64(file);
    result = removeBase64Prefix(result)
    dispatch(setImageBase64(result))
  };

  useEffect(() => {
    if(dataDetail && lesson_id !== ''){
      reset({
        id: lesson_id,
        category_lesson_id: dataDetail.data.category_lesson_id,
        lesson_type: dataDetail.data.lesson_type,
        title: dataDetail.data.title,
        description: dataDetail.data.description,
        media: dataDetail.data.media,
        level: dataDetail.data.level,
      })
    }
  }, [lesson_id, dataDetail, dispatch, reset])

  const handleSubmit2 = async (data: UpdateLessonSchema) => {
    let payload: UpdateLessonSchema = {...data}
    if(imageBase64 && imageBase64 !== ''){
      const image: UploadFileBase64Schema = {
        file: imageBase64,
      }
      const res = await imageMutate(image);
      payload = {...payload, media: res.data.path, category_lesson_id: category_lesson_id!}
    }
    await mutateAsync(payload)
    reset();
    dispatch(setImageBase64(''));
    navigate(`/admin/category-lessons/detail/${category_lesson_id}`)
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Edit Lesson</h2>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl">
          {isError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <IconExclamationCircle size={20} className="text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800">Gagal Update Data</h3>
                <p className="text-red-700 text-sm">{error?.message}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(handleSubmit2)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Level Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level <span className="text-red-500">*</span>
                </label>
                <select
                  value={level ? String(level) : ''}
                  onChange={(val) => {
                    setValue('level', val ? Number(val) : 0)
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                >
                  <option value="">Pilih Salah Satu</option>
                  <option value="1">First</option>
                  <option value="2">Second</option>
                  <option value="3">Third</option>
                  <option value="4">Fourth</option>
                  <option value="5">Fifth</option>
                  <option value="6">Sixth</option>
                  <option value="7">Seventh</option>
                  <option value="8">Eighth</option>
                  <option value="9">Ninth</option>
                  <option value="10">Tenth</option>
                </select>
              </div>

              {/* Title Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('title')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('description')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={2}
                  placeholder="Enter description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>
            </div>

            {/* Lesson Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Tipe <span className="text-red-500">*</span>
              </label>
              <Controller
                name="lesson_type"
                control={control}
                rules={{
                  required: "isian ini harus diisi"
                }}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                      errors.lesson_type ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Pilih Tipe...</option>
                    {lessonTypes().map((type: any) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.lesson_type && (
                <p className="mt-1 text-sm text-red-500">{errors.lesson_type.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => ChangeImage(e)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
              {imageBase64 !== '' && (
                <div className="mt-4">
                  <img
                    src={`data:image/png;base64, ${imageBase64}`}
                    alt="preview"
                    className="w-40 h-40 object-cover rounded-lg border border-gray-300"
                  />
                </div>
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
                onClick={() => navigate(`/admin/category-lessons/detail/${category_lesson_id}`)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!isValid || isPending}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium"
              >
                {isPending ? 'Updating...' : 'Update Lesson'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLessonUpdatePage;