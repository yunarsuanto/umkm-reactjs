import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeCreateModal } from '../../../features/userSlice';
import { useAddUsers } from '../../../hooks/useAddUsers';
import { addUserSchema, AddUserSchema } from '../../../schemas/addUser.schema';
import { IconExclamationCircle } from '@tabler/icons-react';

const AddModalUser = () => {
  const dispatch = useAppDispatch();
  const { openCreate } = useAppSelector((state) => state.user);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddUserSchema>({
    resolver: zodResolver(addUserSchema),
  });

  const password = watch('password');
  const confirm_password = watch('confirm_password');
  const { mutate, isPending, isError, error } = useAddUsers();

  const handleClose = () => {
    reset()
    dispatch(closeCreateModal());
  };

  const onSubmit = (data: AddUserSchema) => {
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
        <h2 className="text-lg font-bold mb-4">Add User</h2>

        {isError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm font-medium text-red-800">Gagal Tambah Data</p>
            <p className="text-sm text-red-700 mt-1">{error?.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              {...register('username')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              {...register('confirm_password')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirm_password && (
              <p className="text-red-600 text-sm mt-1">{errors.confirm_password.message}</p>
            )}
          </div>

          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md flex gap-2">
            <IconExclamationCircle size={20} className="text-blue-600 flex-shrink-0" />
            <p className="text-sm text-blue-700">Password dan confirm password harus sama</p>
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
              disabled={isPending || password !== confirm_password}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isPending ? 'Adding...' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModalUser;