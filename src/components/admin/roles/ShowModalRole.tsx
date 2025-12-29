import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeShowModal } from '../../../features/roleSlice';
import { useShowRole } from '../../../hooks/useShowRole';
import { IconTrash } from '@tabler/icons-react';
import { useEffect, useMemo } from 'react';
import { clearDataRolePermission, clearDataRolePermissionDelete, setDataRolePermission, setDataRolePermissionDelete } from '../../../features/rolePermissionSlice';
import { changeSwitchToAddDetail, setSearch } from '../../../features/generalSlice';
import { AddRolePermissionDataState } from '../../../types/admin/role_permission/AddRolePermissionType';
import { Controller, useForm } from 'react-hook-form';
import { addRolePermissionSchema, AddRolePermissionSchema } from '../../../schemas/addRolePermission.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddRolePermission, useDeleteRolePermission } from '../../../hooks/useAddRolePermission';
import { usePermissions } from '../../../hooks/usePermissions';
import { clearPagination, setDataPagination } from '../../../features/paginationSlice';
import MultiSelect from '../MultiSelect';

const ShowModalRole = () => {
  const dispatch = useAppDispatch();
  const { selectedRole, openShow } = useAppSelector((state) => state.role);
  const { search } = useAppSelector((state) => state.general);
  // const [debouncedSearch] = useDebouncedValue(search, 500);
  const { data: roleData, isLoading: roleIsLoading } = useShowRole(selectedRole.id, {
    enabled: openShow && selectedRole.id !== '',
  });
  const limit = 20
  const pagination = useAppSelector((state) => state.pagination);
  const queryOptions = useMemo(() => ({
    enabled: pagination.page !== 0,
  }), [pagination.page]);
  const { data: permissionData, isLoading: permissionIsLoading } = usePermissions(pagination, queryOptions)

  const { switchToAddDetail } = useAppSelector((state) => state.general)
  const { selectedRolePermission, selectedRolePermissionDelete } = useAppSelector((state) => state.rolePermission)
  const { mutate, isPending } = useAddRolePermission();
  const { mutate: mutateDelete, isPending: inPendingDelete } = useDeleteRolePermission();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm<AddRolePermissionSchema>({
    resolver: zodResolver(addRolePermissionSchema),
  });

  const handleClose = () => {
    dispatch(closeShowModal());
    dispatch(clearDataRolePermission());
    dispatch(clearPagination());
    dispatch(setSearch(''));
  };

  const handleCreate = (data: AddRolePermissionDataState) => {
    dispatch(setDataRolePermission({ role_id: data.role_id, permission_id: data.permission_id }))
    dispatch(changeSwitchToAddDetail())
  }

  const onSubmit = () => {
    mutate(selectedRolePermission, {
      onSuccess: () => {
        reset();
        dispatch(clearDataRolePermission());
        dispatch(changeSwitchToAddDetail())
        dispatch(clearPagination());
        dispatch(setSearch(''));
      }
    })
  }

  const handleDelete = (data: AddRolePermissionDataState) => {
    dispatch(setDataRolePermissionDelete({ role_id: data.role_id, permission_id: data.permission_id }))
  }

  useEffect(() => {
    if (selectedRolePermissionDelete.role_id !== '' && selectedRolePermissionDelete.permission_id !== '') {
      mutateDelete(selectedRolePermissionDelete, {
        onSuccess: () => {
          reset();
          dispatch(clearDataRolePermissionDelete());
          dispatch(clearPagination());
          dispatch(setSearch(''));
        }
      })
    }
  }, [selectedRolePermissionDelete, dispatch, reset, mutateDelete]);

  useEffect(() => {
    if (selectedRolePermission?.role_id) {
      reset({
        role_id: selectedRolePermission.role_id,
        permission_id: selectedRolePermission.permission_id || '',
      });
    }
  }, [selectedRolePermission, reset]);

  // useEffect(() => {
  //   dispatch(setPaginationSearch(debouncedSearch));
  // }, [debouncedSearch, dispatch])

  useEffect(() => {
    dispatch(setDataPagination({
      search: '',
      page: 1,
      limit: limit,
      prev: 0,
      next: 0,
      totalPages: 0,
      totalRecords: 0,
    }))
  }, [dispatch, limit])

  if (!openShow) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] p-6 overflow-y-auto">
        {roleIsLoading ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500">Memuat Data...</p>
          </div>
        ) : switchToAddDetail ? (
          // Add Permission View
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Role: {roleData?.data.name}</h2>
              <button
                onClick={() => handleCreate({ role_id: roleData?.data?.id!, permission_id: '' })}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Kembali
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Permission
                </label>
                <Controller
                  name="permission_id"
                  control={control}
                  rules={{
                    required: "isian ini harus diisi"
                  }}
                  render={({ field: { onChange, value } }) => (
                    <MultiSelect
                      options={permissionData?.data.map((data) => ({
                        value: data.id,
                        label: data.name,
                      })) || []}
                      value={value ? [value] : []}
                      onChange={(values) => {
                        const newValue = values[0] || '';
                        onChange(newValue);
                        dispatch(
                          setDataRolePermission({
                            role_id: selectedRolePermission.role_id || '',
                            permission_id: newValue,
                          })
                        );
                      }}
                      placeholder="Pilih permission..."
                      searchPlaceholder="Cari permission..."
                      disabled={permissionIsLoading}
                      error={errors.permission_id?.message}
                    />
                  )}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!isValid || isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {isPending ? 'Menambah...' : 'Tambah Permission'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          // List Permissions View
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Role: {roleData?.data.name}</h2>
              <button
                onClick={() => handleCreate({ role_id: roleData?.data?.id!, permission_id: '' })}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Tambah
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left">No</th>
                    <th className="px-4 py-3 text-left">Permission</th>
                    <th className="px-4 py-3 text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {roleData?.data?.permissions.map((row, i) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{i + 1}</td>
                      <td className="px-4 py-3">{row.name}</td>
                      <td className="px-4 py-3">
                        <button
                          disabled={inPendingDelete}
                          onClick={() => handleDelete({ role_id: roleData?.data?.id, permission_id: row.id })}
                          className="flex items-center gap-1 px-3 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <IconTrash size={14} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowModalRole;