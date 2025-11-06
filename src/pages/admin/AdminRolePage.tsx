import { Button, Center, Container, Grid, Group, Loader, Text, TextInput } from '@mantine/core';
import AdminLayout from '../../components/admin/AdminLayout';
import { useRoles } from '../../hooks/useRoles';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openCreateModal } from '../../features/roleSlice';
import { setDataPagination, setPaginationSearch } from '../../features/paginationSlice';
import { useEffect, useMemo } from 'react';
import AddModalRole from '../../components/admin/roles/AddModalRole';
import UpdateModalRole from '../../components/admin/roles/UpdateModalRole';
import DeleteModalRole from '../../components/admin/roles/DeleteModalRole';
import TableRoles from '../../components/admin/roles/TableRoles';
import ShowModalRole from '../../components/admin/roles/ShowModalRole';
import { setSearch } from '../../features/generalSlice';
import { useDebouncedValue } from '@mantine/hooks';

const AdminRolePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const limit = 20
  const pagination = useAppSelector((state) => state.pagination);
  const queryOptions = useMemo(() => ({
    enabled: pagination.page !== 0,
  }), [pagination.page]);
  const { data, isLoading, isError, error } = useRoles(pagination, queryOptions)
  const { openShow, openCreate, openUpdate, openDelete } = useAppSelector((state) => state.role);
  const { search } = useAppSelector((state) => state.general);
  const [debouncedSearch] = useDebouncedValue(search, 500);
  
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

  useEffect(() => {
    dispatch(setPaginationSearch(debouncedSearch));
  }, [debouncedSearch, pagination, dispatch])

  if (isLoading) {
    return (
      <AdminLayout>
        <Center style={{ height: '80vh', flexDirection: 'column' }}>
          <Loader size="lg" color="blue" />
          <Text mt="md" c="dimmed">
            Memuat data izin...
          </Text>
        </Center>
      </AdminLayout>
    );
  }
  if (isError) {
    if(error.status === 401){
      navigate('/login')
    }
    return (
      <AdminLayout>
        <Center style={{ height: '80vh', flexDirection: 'column' }}>
          <Text c="red" fw={500}>
            Gagal memuat data: {error?.message || 'Terjadi kesalahan tak terduga'}
          </Text>
        </Center>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <AddModalRole open={openCreate} />
      <ShowModalRole open={openShow} />
      <UpdateModalRole open={openUpdate} />
      <DeleteModalRole open={openDelete} />
      <Container fluid p={50}>
        <Grid>
          <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
            <h2>Role</h2>
          </Grid.Col>
        </Grid>
        <Grid p={10}>
          <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}}>
            <Group justify="space-between">
                
                <Button variant="default" onClick={handleOpen}>
                  + Role
                </Button>
                <TextInput
                  label="Name"
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) => dispatch(setSearch(ev.target.value))}
                />
            </Group>
          </Grid.Col>
          <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}}>
            <TableRoles data={data?.data ?? []} totalPages={pagination.totalPages} />
          </Grid.Col>
        </Grid>
      </Container>
    </AdminLayout>
  );
};

export default AdminRolePage;