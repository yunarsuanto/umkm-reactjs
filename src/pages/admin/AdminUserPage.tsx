import AdminLayout from '../../components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openCreateModal } from '../../features/userSlice';
import { setDataPagination, setPaginationSearch } from '../../features/paginationSlice';
import { useEffect, useMemo } from 'react';
import { useUsers } from '../../hooks/useUsers';
import TableUsers from '../../components/admin/users/TableUsers';
import AddModalUser from '../../components/admin/users/AddModalUser';
import ShowModalUser from '../../components/admin/users/ShowModalUser';
import UpdateModalUser from '../../components/admin/users/UpdateModalUser';
import DeleteModalUser from '../../components/admin/users/DeleteModalUser';
import { setSearch } from '../../features/generalSlice';

const AdminUserPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const limit = 20
  const pagination = useAppSelector((state) => state.pagination);
  const queryOptions = useMemo(() => ({
    enabled: pagination.page !== 0,
  }), [pagination.page]);
  const { data, isLoading, isError, error } = useUsers(pagination, queryOptions)
  const { openShow, openCreate, openUpdate, openDelete } = useAppSelector((state) => state.user);
  const { search } = useAppSelector((state) => state.general);
  // const [debouncedSearch] = useDebouncedValue(search, 500);
  
  const handleOpen = () => {
    dispatch(openCreateModal())
  }

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

  useEffect(() => {
    if(data){
      dispatch(setDataPagination({
        search: data.pagination.search,
        page: data.pagination.page,
        limit: limit,
        prev: data.pagination.prev,
        next: data.pagination.next,
        totalPages: data.pagination.totalPages,
        totalRecords: data.pagination.totalRecords,
      }))
    }
  }, [data, dispatch, limit])
  
  // useEffect(() => {
  //   dispatch(setPaginationSearch(debouncedSearch));
  // }, [debouncedSearch, pagination, dispatch])


  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh] text-gray-500">
          Loading users...
        </div>
      </AdminLayout>
    );
  }
  if (isError) {
    if(error.status === 401){
      navigate('/login')
    }
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh] text-red-600">
          Gagal memuat data
        </div>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      {/* Modals */}
      <AddModalUser />
      <ShowModalUser />
      <UpdateModalUser />
      <DeleteModalUser />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">User</h1>

        <div className="flex gap-3">
          <button
            onClick={handleOpen}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded text-sm"
          >
            + User
          </button>

          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="border rounded-md px-3 py-2 text-sm w-64"
          />
        </div>
      </div>

      {/* Table */}
      <TableUsers data={data?.data ?? []} totalPages={pagination.totalPages} />
    </AdminLayout>
  );
};

export default AdminUserPage;