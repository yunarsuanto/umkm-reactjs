import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeDeleteModal } from '../../../features/userSlice';
import { useDeleteUsers } from '../../../hooks/useDeleteUsers';

const DeleteModalUser = () => {
  const dispatch = useAppDispatch();
  const { selectedUser, openDelete } = useAppSelector((state) => state.user);
  const { mutate, isPending, isError, error } = useDeleteUsers();

  const handleClose = () => {
    dispatch(closeDeleteModal());
  };

  const onSubmit = () => {
    mutate({ id: selectedUser.id }, {
      onSuccess: () => {
        dispatch(closeDeleteModal());
      },
    });
  };

  if (!openDelete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-4">Hapus User</h2>

        {isError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm font-medium text-red-800">Gagal Hapus Data</p>
            <p className="text-sm text-red-700 mt-1">{error?.message}</p>
          </div>
        )}

        <p className="text-gray-700 mb-6">
          Apakah kamu yakin ingin menghapus user{' '}
          <strong>{selectedUser.username}</strong>?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={isPending}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Batal
          </button>
          <button
            onClick={onSubmit}
            disabled={isPending}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isPending ? 'Hapus...' : 'Hapus'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalUser;

