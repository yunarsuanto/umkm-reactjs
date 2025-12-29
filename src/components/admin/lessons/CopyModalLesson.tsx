import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { clearDataLesson, closeDeleteModal, setCopyModal } from '../../../features/lessonSlice';
import { useCopyLessons } from '@/hooks/useCopyLessons';
import { copyLessonSchema, CopyLessonSchema } from '@/schemas/copyLesson.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { IconExclamationCircle } from '@tabler/icons-react';

interface CopyModalLessonProps {
  open: boolean;
}

const CopyModalLesson = ({ open }: CopyModalLessonProps) => {
  const dispatch = useAppDispatch();
  const { selectedLesson } = useAppSelector((state) => state.lesson);
  const { mutateAsync, isPending, isError, error } = useCopyLessons();
  const {
    handleSubmit,
    formState: { errors, isValid },
    reset,
    register,
    setValue,
  } = useForm<CopyLessonSchema>({
    resolver: zodResolver(copyLessonSchema),
    defaultValues: {
      lesson_id: '',
      level_from: 0,
      level: 0,
    },
  });
  
  const handleClose = () => {
    dispatch(setCopyModal(false));
  };

  const onSubmit = async (data: CopyLessonSchema) => {
    let payload: CopyLessonSchema = {...data}
    await mutateAsync(payload)
    reset();
    dispatch(clearDataLesson());
    handleClose();
  };

  useEffect(() => {
    if (selectedLesson && selectedLesson.id !== '') {
      reset({
        lesson_id: selectedLesson.id,
        level_from: selectedLesson.level,
        level: selectedLesson.level + 1,
      });
    }
  }, [selectedLesson, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Copy Lesson</h2>

        {isError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <IconExclamationCircle size={20} className="text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-800">Gagal Copy Data</h3>
              <p className="text-red-700 text-sm">{error?.message}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Level Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Level <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('level', { valueAsNumber: true })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                errors.level ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={(e) => {
                setValue('level', Number(e.target.value))
              }}
            />
            {errors.level && (
              <p className="mt-1 text-sm text-red-500">{errors.level.message}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!isValid || isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium"
            >
              {isPending ? 'Copying...' : 'Copy'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CopyModalLesson;
