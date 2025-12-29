import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AdminLayout from '@/components/admin/AdminLayout';
import { IconExclamationCircle } from '@tabler/icons-react';
import { updateLessonItemSchema, UpdateLessonItemSchema } from '@/schemas/updateLessonItem.schema';
import { useUpdateLessonItems } from '@/hooks/useUpdateLessonItems';
import { useDetailLessonItems } from '@/hooks/useDetailLessonItems';
import { useEffect, useState } from 'react';
import { UploadFileSchema } from '@/schemas/uploadFile.schema';
import { useUploadFile, useUploadFileLottie } from '@/hooks/useUploadFile';
import { setImage, setThumbnail } from '@/features/lessonItemSlice';

const AdminLessonItemUpdatePage = () => {
  const { category_lesson_id } = useParams<{ category_lesson_id: string }>();
  const { lesson_item_id } = useParams<{ lesson_item_id: string }>();
  const { lesson_id } = useParams<{ lesson_id: string }>();
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useAppDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<UpdateLessonItemSchema>({
    resolver: zodResolver(updateLessonItemSchema),
  });

  const { image, thumbnail } = useAppSelector((state: any) => state.lessonItem)
  const { data: dataDetail } = useDetailLessonItems(lesson_item_id!, {
    enabled: lesson_item_id !== '',
  })

  const { mutateAsync:imageMutate } = useUploadFile();
  
  const { mutateAsync, isPending, isError, error } = useUpdateLessonItems();
  const navigate = useNavigate()

  // const debouncedSubmit = useDebouncedCallback( async (data: UpdateLessonItemSchema) => {
  //   let payload: UpdateLessonItemSchema = {...data, lesson_id: lesson_id}
  //   await mutateAsync(payload)
  //   reset();
  //   dispatch(setImage(''));
  //   dispatch(setThumbnail(''));
  //   navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/detail/${lesson_id}`)
  // }, 500);

  // const onSubmit = async (data: UpdateLessonItemSchema) => {
  //   await new Promise<void>((resolve) => {
  //     debouncedSubmit(data);
  //     setTimeout(resolve, 600);
  //   })
  // };

  const ChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return;
    if(file){
      const image: UploadFileSchema = {
        file: file,
      }
      const res = await imageMutate(image);
      setValue('media', res.data.path, {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
    dispatch(setImage('/video.svg'))
  };
  
  const ChangeThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return;
    if(file){
      const image: UploadFileSchema = {
        file: file,
      }
      const res = await imageMutate(image);
      setValue('thumbnail', res.data.path, {
        shouldDirty: true,
        shouldValidate: true,
      });
      dispatch(setThumbnail(import.meta.env.VITE_API_IMAGE_URL+res.data.path))
    }
  };

  useEffect(() => {
    if (!dataDetail || isInitialized) return;

    if(dataDetail && lesson_item_id !== ''){
      reset({
          id: lesson_item_id,
          lesson_id: lesson_id,
          content: dataDetail.data.content,
          order: dataDetail.data.order,
          media: dataDetail.data.media,
          thumbnail: dataDetail.data.thumbnail,
          is_done: dataDetail.data.is_done,
      })
      setIsInitialized(true);
    }
  }, [lesson_item_id, dataDetail, dispatch, reset])
  const handleSubmit2 = async (data: UpdateLessonItemSchema) => {
    let payload: UpdateLessonItemSchema = {...data, lesson_id: lesson_id!}
    await mutateAsync(payload)
    reset();
    dispatch(setImage(''));
    dispatch(setThumbnail(''));
    navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/detail/${lesson_id}`)
  };
  
  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Edit Lesson Item</h2>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="order"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                        errors.order ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  )}
                />
                {errors.order && (
                  <p className="mt-1 text-sm text-red-500">{errors.order.message}</p>
                )}
              </div>

              {/* Content Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('content')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.content ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter content"
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
                )}
              </div>
            </div>

            {/* Checkbox - Final Stage */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_done"
                {...register('is_done')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="is_done" className="ml-2 text-sm font-medium text-gray-700">
                Tahap Akhir
              </label>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <input
                type="file"
                accept="image/*, .webm, .json, .zip"
                onChange={(e) => ChangeImage(e)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
              {image !== '' && (
                <div className="mt-4">
                  <img
                    src={`${image}`}
                    alt="preview"
                    className="w-40 h-40 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail
              </label>
              <input
                type="file"
                accept="image/*, .webm, .json, .zip"
                onChange={(e) => ChangeThumbnail(e)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
              {thumbnail !== '' && (
                <div className="mt-4">
                  <img
                    src={`${thumbnail}`}
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
                {isPending ? 'Updating...' : 'Update Lesson Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLessonItemUpdatePage;