import AdminLayout from '@/components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setImageBase64 } from '@/features/categoryLessonSlice';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconExclamationCircle } from '@tabler/icons-react';
import { generateBase64, removeBase64Prefix } from '@/constants/generateBase64';
import { addCategoryLessonSchema, AddCategoryLessonSchema } from '@/schemas/addCategoryLesson.schema';
import { useAddCategoryLessons } from '@/hooks/useAddCategoryLessons';
import { useUploadFileBase64 } from '@/hooks/useUploadFile';
import categoryLessonTypes from '@/constants/category_lesson_types';
import { setErrorFileNull } from '@/features/generalSlice';
import { UploadFileBase64Schema } from '@/schemas/uploadFileBase64.schema';

const AdminCategoryLessonCreatePage = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<AddCategoryLessonSchema>({
    resolver: zodResolver(addCategoryLessonSchema),
  });
  const {imageBase64} = useAppSelector((state: any) => state.categoryLesson)
  const {errorFileNull} = useAppSelector((state: any) => state.general)
  const { mutateAsync, isPending, isError, error } = useAddCategoryLessons();
  const { mutateAsync:imageMutate } = useUploadFileBase64();
  const navigate = useNavigate()

  // const debouncedSubmit = useDebouncedCallback( async (data: AddCategoryLessonSchema) => {
  //   let payload: AddCategoryLessonSchema = {...data}
  //   if(!imageBase64 || imageBase64 === '') {
  //     dispatch(setErrorFileNull('file tidak boleh kosong'))
  //     return
  //   }else{
  //     dispatch(setErrorFileNull(''))
  //   }
  //   if(imageBase64 && imageBase64 !== ''){
  //     const image: UploadFileBase64Schema = {
  //       file: imageBase64,
  //     }
  //     const res = await imageMutate(image);
  //     payload = {...payload, media: res.data.path}
  //   }
  //   await mutateAsync(payload)
  //   reset();
  //   dispatch(setImageBase64(''));
  // }, 500);

  // const onSubmit = async (data: AddCategoryLessonSchema) => {
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

  const handleSubmit2 = async (data: AddCategoryLessonSchema) => {
    if (!imageBase64 || imageBase64 === '') {
      dispatch(setErrorFileNull('file tidak boleh kosong'));
      return;
    } else {
      dispatch(setErrorFileNull(''));
    }
    if (imageBase64 && imageBase64 !== '') {
      const image: UploadFileBase64Schema = {
        file: imageBase64,
      };
      const res = await imageMutate(image);
      data = { ...data, media: res.data.path };
    }
    await mutateAsync(data);
    reset();
    dispatch(setImageBase64(''));
    navigate('/admin/category-lessons');
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Add Category Lesson</h2>
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

            {/* Category Lesson Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Tipe <span className="text-red-500">*</span>
              </label>
              <Controller
                name="category_lesson_type"
                control={control}
                rules={{
                  required: "isian ini harus diisi"
                }}
                render={({ field }) => (
                  <select {...field}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                      errors.category_lesson_type ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Pilih Tipe...</option>
                    {categoryLessonTypes().map((type: any) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.category_lesson_type && (
                <p className="mt-1 text-sm text-red-500">{errors.category_lesson_type.message}</p>
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
                rows={4}
                placeholder="Enter description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => ChangeImage(e)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
              {errorFileNull && (
                <p className="mt-1 text-sm text-red-500">{errorFileNull}</p>
              )}
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
                onClick={() => navigate('/admin/category-lessons')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!isValid || isPending}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium"
              >
                {isPending ? 'Adding...' : 'Add Category Lesson'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategoryLessonCreatePage;