import { Button, Center, Container, Grid, Loader, Text } from '@mantine/core';
import AdminLayout from '../../components/admin/AdminLayout';
import { usePermissions } from '../../hooks/usePermissions';
import TablePermissions from '../../components/admin/permissions/TablePermissions';
import { useNavigate } from 'react-router-dom';
import AddModalPermission from '../../components/admin/permissions/AddModalPermission';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import UpdateModalPermission from '../../components/admin/permissions/UpdateModalPermission';
import { openCreateModal } from '../../features/permission/permissionSlice';
import DeleteModalPermission from '../../components/admin/permissions/DeleteModalPermission';
import { setData } from '../../features/pagination/paginationSlice';
import { useEffect, useMemo } from 'react';

const AdminPermissionPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const limit = 2
  const pagination = useAppSelector((state) => state.pagination);
  const queryOptions = useMemo(() => ({
    enabled: pagination.page !== 0,
  }), [pagination.page]);
  const { data, isLoading, isError, error } = usePermissions(pagination, queryOptions)
  const { openCreate, openUpdate, openDelete } = useAppSelector((state) => state.permission);

  const handleOpen = () => {
    dispatch(openCreateModal())
  }

  useEffect(() => {
    dispatch(setData({
      page: 1,
      limit: limit,
      prev: 0,
      next: 0,
      total_pages: 0,
      total_records: 0,
    }))
  }, [dispatch, limit])

  useEffect(() => {
    if(data){
      dispatch(setData({
        page: data.pagination.page,
        limit: limit,
        prev: data.pagination.prev,
        next: data.pagination.next,
        total_pages: data.pagination.total_pages,
        total_records: data.pagination.total_records,
      }))
    }
  }, [data, dispatch, limit])
  
  useEffect(() => {
    console.log('----- isError')
    console.log(isError)
    console.log('----- isError')
  }, [isError])

  // if (isLoading) {
  //   return (
  //     <AdminLayout>
  //       <Center style={{ height: '80vh', flexDirection: 'column' }}>
  //         <Loader size="lg" color="blue" />
  //         <Text mt="md" c="dimmed">
  //           Memuat data izin...
  //         </Text>
  //       </Center>
  //     </AdminLayout>
  //   );
  // }
  // if (isError) {
  //   if(error.status === 401){
  //     navigate('/login')
  //   }
  //   return (
  //     <AdminLayout>
  //       <Center style={{ height: '80vh', flexDirection: 'column' }}>
  //         <Text c="red" fw={500}>
  //           Gagal memuat data: {error?.message || 'Terjadi kesalahan tak terduga'}
  //         </Text>
  //       </Center>
  //     </AdminLayout>
  //   );
  // }
  return (
    <AdminLayout>
      <AddModalPermission open={openCreate} />
      <UpdateModalPermission open={openUpdate} />
      <DeleteModalPermission open={openDelete} />
      <Container fluid p={50}>
        <Grid>
          <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
            <h2>Permission</h2>
          </Grid.Col>
        </Grid>
        <Grid p={10}>
          <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}}>
            <Button variant="default" onClick={handleOpen}>
              + Permission
            </Button>
          </Grid.Col>
          <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}}>
            <TablePermissions data={data?.data ?? []} totalPages={pagination.total_pages} />
          </Grid.Col>
        </Grid>
      </Container>
    </AdminLayout>
  );
};

export default AdminPermissionPage;