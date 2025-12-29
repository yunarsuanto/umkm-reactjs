import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeCreateModal } from '../../../features/roleSlice';
import { useAddRoles } from '../../../hooks/useAddRoles';
import { addRoleSchema, AddRoleSchema } from '../../../schemas/addRole.schema';

const AddModalRole = () => {
  const dispatch = useAppDispatch();
  const { openCreate } = useAppSelector((state) => state.role);
  const { mutate, isPending, isError, error } = useAddRoles();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddRoleSchema>({
    resolver: zodResolver(addRoleSchema),
  });

  const handleClose = () => {
    reset()
    dispatch(closeCreateModal());
  };

  const onSubmit = (data: AddRoleSchema) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        dispatch(closeCreateModal());
      },
    });
  };

  if (!openCreate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-4">Add Role</h2>

        {isError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm font-medium text-red-800">Gagal Tambah Data</p>
            <p className="text-sm text-red-700 mt-1">{error?.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              {...register('name')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isPending ? 'Adding...' : 'Add Role'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModalRole;