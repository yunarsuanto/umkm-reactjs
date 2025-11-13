import { Button, Center, Container, Grid, Group, Loader, Text, TextInput } from '@mantine/core';
import AdminLayout from '../../../components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setDataPagination, setPaginationSearch } from '../../../features/paginationSlice';
import { useEffect, useMemo } from 'react';
import { setSearch } from '../../../features/generalSlice';
import { useDebouncedValue } from '@mantine/hooks';
import { useCategoryLessons } from '../../../hooks/useCategoryLessons';
import CardCategoryLessons from '@/components/admin/lessons/CardCategoryLessons';
import DeleteModalCategoryLesson from '@/components/admin/lessons/DeleteModalCategoryLesson';

const AdminCategoryLessonPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const limit = 20
  const pagination = useAppSelector((state) => state.pagination);
  const queryOptions = useMemo(() => ({
    enabled: pagination.page !== 0,
  }), [pagination.page]);
  const { data, isLoading, isError, error } = useCategoryLessons(pagination, {}, queryOptions)
  const { openDelete } = useAppSelector((state) => state.categoryLesson);
  const { search } = useAppSelector((state) => state.general);
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const handleOpen = () => {
    navigate('/admin/category-lessons/create')
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
    if(data?.pagination){
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
  }, [debouncedSearch, pagination, dispatch]);
  
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
      <DeleteModalCategoryLesson open={openDelete} />
      <Container fluid p={50}>
        <Grid>
          <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
            <h2>Category Lesson</h2>
          </Grid.Col>
        </Grid>
        <Grid p={10}>
          <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}}>
            <Group justify="space-between">
                <Button variant="default" onClick={handleOpen}>
                  <img src={'/add.svg'} alt="add" width={20} height={20} style={{marginRight: 10}} />
                  <Text>Category Lesson</Text>
                </Button>
                <TextInput
                  label="Name"
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) => dispatch(setSearch(ev.target.value))}
                />
            </Group>
          </Grid.Col>
          <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}}>
            <CardCategoryLessons data={data?.data ?? []} totalPages={pagination.totalPages} />
          </Grid.Col>
        </Grid>
      </Container>
    </AdminLayout>
  );
};

export default AdminCategoryLessonPage;