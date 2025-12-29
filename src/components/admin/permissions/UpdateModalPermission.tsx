import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useUpdatePermissions } from '../../../hooks/useUpdatePermissions';
import { updatePermissionSchema, UpdatePermissionSchema } from '../../../schemas/updatePermission.schema';
import { closeUpdateModal } from '../../../features/permissionSlice';
import { useEffect } from 'react';

const UpdateModalPermission = () => {
  const dispatch = useAppDispatch();
  const { selectedPermission, openUpdate } = useAppSelector((state) => state.permission);
  const { mutate, isPending, isError, error } = useUpdatePermissions();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdatePermissionSchema>({
    resolver: zodResolver(updatePermissionSchema),
    defaultValues: {
      id: '',
      name: ''
    }
  });

  const handleClose = () => {
    reset()
    dispatch(closeUpdateModal());
  };

  const onSubmit = (data: UpdatePermissionSchema) => {
    mutate(data, {
      onSuccess: () => {
        dispatch(closeUpdateModal());
        reset()
      },
    });
  };
  
  useEffect(() => {
    if(selectedPermission.id !== ''){
      reset({
        id: selectedPermission.id,
        name: selectedPermission.name,
      })
    }
  }, [selectedPermission, reset])

  if (!openUpdate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Update Permission</h2>
        
        {isError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="text-sm font-semibold">Error</p>
            <p className="text-sm">{(error as any)?.message || 'Failed to update permission'}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="hidden" {...register('id')} />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Permission Name *
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="e.g., users.view"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isPending ? 'Updating...' : 'Update Permission'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModalPermission;