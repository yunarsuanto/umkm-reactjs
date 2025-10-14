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

const AdminRolePage = () => {
  const { data, isLoading, isError, error } = usePermissions({
    page: 0,
    limit: 0,
    prev: 0,
    next: 0,
    total_pages: 0,
    total_records: 0,
  })
  const navigate = useNavigate()
  const { openCreate, openUpdate, openDelete } = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(openCreateModal())
  }
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
      <AddModalPermission open={openCreate} />
      <UpdateModalPermission open={openUpdate} />
      <DeleteModalPermission open={openDelete} />
      <Container fluid p={50}>
        <Grid>
          <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
            <h2>Role</h2>
          </Grid.Col>
        </Grid>
        <Grid p={10}>
          <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}}>
            <Button variant="default" onClick={handleOpen}>
              + Role
            </Button>
          </Grid.Col>
          <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}}>
            {/* <TablePermissions data={data?.data ?? []} /> */}
          </Grid.Col>
        </Grid>
      </Container>
    </AdminLayout>
  );
};

export default AdminRolePage;