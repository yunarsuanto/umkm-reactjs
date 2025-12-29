import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeDeleteModal } from '../../../features/lessonSlice';
import { useDeleteLessons } from '@/hooks/useDeleteLessons';
import { IconExclamationCircle } from '@tabler/icons-react';

interface DeleteModalLessonProps {
  open: boolean;
}

const DeleteModalLesson = ({ open }: DeleteModalLessonProps) => {
  const dispatch = useAppDispatch();
  const { selectedLesson } = useAppSelector((state) => state.lesson);
  const { mutate, isPending, isError, error } = useDeleteLessons();

  const handleClose = () => {
    dispatch(closeDeleteModal());
  };

  const onSubmit = () => {
    mutate({id: selectedLesson.id}, {
      onSuccess: () => {
        dispatch(closeDeleteModal());
      },
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Hapus Lesson</h2>

        {isError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <IconExclamationCircle size={20} className="text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-800">Gagal Hapus Data</h3>
              <p className="text-red-700 text-sm">{error?.message}</p>
            </div>
          </div>
        )}

        {/* Message */}
        <p className="text-gray-700 mb-6">
          Apakah kamu yakin ingin menghapus <strong>{selectedLesson.title}</strong>?
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
          >
            Batal
          </button>
          <button
            onClick={onSubmit}
            disabled={isPending}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium"
          >
            {isPending ? 'Menghapus...' : 'Hapus'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalLesson;
