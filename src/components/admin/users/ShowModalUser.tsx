import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeShowModal } from '../../../features/userSlice';
import { IconTrash } from '@tabler/icons-react';
import { useEffect, useMemo } from 'react';
import { changeSwitchToAddDetail, setSearch } from '../../../features/generalSlice';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clearPagination, setDataPagination } from '../../../features/paginationSlice';
import { useShowUser } from '../../../hooks/useShowUser';
import { useRoles } from '../../../hooks/useRoles';
import { clearDataUserRole, clearDataUserRoleDelete, setDataUserRole, setDataUserRoleDelete } from '../../../features/userRoleSlice';
import { AddUserRoleDataState } from '../../../types/admin/user_role/AddUserRoleType';
import { useAddUserRole } from '../../../hooks/useAddUserRole';
import { addUserRoleSchema, AddUserRoleSchema } from '../../../schemas/addUserRole.schema';
import { DeleteUserRoleDataState } from '../../../types/admin/user_role/DeleteUserRoleType';
import { useDeleteUserRole } from '../../../hooks/useDeleteUserRole';
import MultiSelect from '../MultiSelect';

const ShowModalUser = () => {
  const dispatch = useAppDispatch();
  const { selectedUser, openShow } = useAppSelector((state) => state.user);
  const { search } = useAppSelector((state) => state.general);
  const { data: userData, isLoading: userIsLoading } = useShowUser(selectedUser.id, {
    enabled: openShow && selectedUser.id !== '',
  });
  const limit = 20
  const pagination = useAppSelector((state) => state.pagination);
  const queryOptions = useMemo(() => ({
    enabled: pagination.page !== 0,
  }), [pagination.page]);
  const { data: roleData, isLoading: roleIsLoading } = useRoles(pagination, queryOptions)

  const { switchToAddDetail } = useAppSelector((state) => state.general)
  const { selectedUserRole, selectedUserRoleDelete } = useAppSelector((state) => state.userRole)
  const { mutateAsync, isPending } = useAddUserRole();
  const { mutate: mutateDelete, isPending: isPendingDelete } = useDeleteUserRole();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddUserRoleSchema>({
    resolver: zodResolver(addUserRoleSchema),
  });

  const handleClose = () => {
    dispatch(closeShowModal());
    dispatch(clearDataUserRole());
    dispatch(clearPagination());
    dispatch(setSearch(''));
  };

  const handleCreate = (data: AddUserRoleDataState) => {
    dispatch(setDataUserRole({ user_id: data.user_id, role_id: data.role_id }))
    dispatch(changeSwitchToAddDetail())
  }

  const onSubmit = async (data: AddUserRoleSchema) => {
    let payload: AddUserRoleSchema = { ...data, is_active: true }
    await mutateAsync(payload)
    reset();
    dispatch(clearDataUserRole());
    dispatch(changeSwitchToAddDetail())
    dispatch(clearPagination());
    dispatch(setSearch(''));
  };

  const handleDelete = (data: DeleteUserRoleDataState) => {
    dispatch(setDataUserRoleDelete({ user_id: data.user_id, role_id: data.role_id }))
  }

  useEffect(() => {
    if (selectedUserRoleDelete.role_id !== '' && selectedUserRoleDelete.user_id !== '') {
      mutateDelete(selectedUserRoleDelete, {
        onSuccess: () => {
          reset();
          dispatch(clearDataUserRoleDelete());
          dispatch(clearPagination());
          dispatch(setSearch(''));
        }
      })
    }
  }, [selectedUserRoleDelete, dispatch, reset, mutateDelete]);

  useEffect(() => {
    if (selectedUserRole?.role_id) {
      reset({
        user_id: selectedUserRole.user_id,
        role_id: selectedUserRole.role_id || '',
      });
    }
  }, [selectedUserRole, reset]);

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
        {userIsLoading ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500">Memuat Data...</p>
          </div>
        ) : switchToAddDetail ? (
          // Add Role View
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">User: {userData?.data.username}</h2>
              <button
                onClick={() => handleCreate({ user_id: userData?.data?.id!, role_id: '' })}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Kembali
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Role
                </label>
                <Controller
                  name="role_id"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <MultiSelect
                      options={roleData?.data.map((data) => ({
                        value: data.id,
                        label: data.name,
                      })) || []}
                      value={value ? [value] : []}
                      onChange={(values) => {
                        const newValue = values[0] || '';
                        onChange(newValue);
                        dispatch(
                          setDataUserRole({
                            user_id: selectedUserRole.user_id || '',
                            role_id: newValue,
                          })
                        );
                      }}
                      placeholder="Pilih role..."
                      searchPlaceholder="Cari role..."
                      disabled={roleIsLoading}
                      error={errors.role_id?.message}
                    />
                  )}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={selectedUserRole.user_id === '' || selectedUserRole.role_id === '' || isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {isPending ? 'Menambah...' : 'Tambah Role'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          // List Roles View
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">User: {userData?.data.username}</h2>
              <button
                onClick={() => handleCreate({ user_id: userData?.data?.id!, role_id: '' })}
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
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Permission</th>
                    <th className="px-4 py-3 text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {userData?.data?.roles.map((row, i) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{i + 1}</td>
                      <td className="px-4 py-3">{row.name}</td>
                      <td className="px-4 py-3">
                        {row.permissions.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {row.permissions.map((r) => (
                              <span
                                key={r.id}
                                className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                              >
                                {r.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          disabled={isPendingDelete}
                          onClick={() => handleDelete({ user_id: userData?.data?.id, role_id: row.id })}
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

export default ShowModalUser;