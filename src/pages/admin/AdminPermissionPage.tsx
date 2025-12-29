import AdminLayout from '../../components/admin/AdminLayout';
import { usePermissions } from '../../hooks/usePermissions';
import TablePermissions from '../../components/admin/permissions/TablePermissions';
import { useNavigate } from 'react-router-dom';
import AddModalPermission from '../../components/admin/permissions/AddModalPermission';
import UpdateModalPermission from '../../components/admin/permissions/UpdateModalPermission';
import DeleteModalPermission from '../../components/admin/permissions/DeleteModalPermission';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openCreateModal } from '../../features/permissionSlice';
import { setDataPagination, setPaginationSearch } from '../../features/paginationSlice';
import { setSearch } from '../../features/generalSlice';

import { useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

const AdminPermissionPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const limit = 20;
  const pagination = useAppSelector((state) => state.pagination);
  const { search } = useAppSelector((state) => state.general);
  const { openCreate, openUpdate, openDelete } = useAppSelector(
    (state) => state.permission
  );

  /* ======================
     React Query
  ====================== */
  const queryOptions = useMemo(
    () => ({ enabled: pagination.page !== 0 }),
    [pagination.page]
  );

  const { data, isLoading, isError, error } = usePermissions(
    pagination,
    queryOptions
  );

  /* ======================
     Init Pagination
  ====================== */
  useEffect(() => {
    dispatch(
      setDataPagination({
        search: '',
        page: 1,
        limit,
        prev: 0,
        next: 0,
        totalPages: 0,
        totalRecords: 0,
      })
    );
  }, [dispatch, limit]);

  /* ======================
     Update Pagination From API
  ====================== */
  useEffect(() => {
    if (data) {
      dispatch(
        setDataPagination({
          search: data.pagination.search,
          page: data.pagination.page,
          limit,
          prev: data.pagination.prev,
          next: data.pagination.next,
          totalPages: data.pagination.totalPages,
          totalRecords: data.pagination.totalRecords,
        })
      );
    }
  }, [data, dispatch, limit]);

  /* ======================
     Debounced Search (lodash)
  ====================== */
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setPaginationSearch(value));
      }, 500),
    [dispatch]
  );

  useEffect(() => {
    debouncedSetSearch(search);
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [search, debouncedSetSearch]);

  /* ======================
     Handlers
  ====================== */
  const handleOpenCreate = () => {
    dispatch(openCreateModal());
  };

  /* ======================
     Loading & Error
  ====================== */
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh] text-gray-500">
          Loading permissions...
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    if (error?.status === 401) {
      navigate('/login');
    }
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh] text-red-600">
          Gagal memuat data
        </div>
      </AdminLayout>
    );
  }

  /* ======================
     Render
  ====================== */
  return (
    <AdminLayout>
      {/* Modals */}
      <AddModalPermission />
      <UpdateModalPermission />
      <DeleteModalPermission />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Permission</h1>

        <div className="flex gap-3">
          <button
            onClick={handleOpenCreate}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded text-sm"
          >
            + Permission
          </button>

          <input
            type="text"
            placeholder="Search permission..."
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="border rounded-md px-3 py-2 text-sm w-64"
          />
        </div>
      </div>

      {/* Table */}
      <TablePermissions
        data={data?.data ?? []}
        totalPages={pagination.totalPages}
      />
    </AdminLayout>
  );
};

export default AdminPermissionPage;
