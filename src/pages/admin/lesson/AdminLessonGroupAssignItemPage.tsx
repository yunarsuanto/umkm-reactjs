import { Alert, Button, Card, Checkbox, Container, Grid, Group, Select, TextInput, useMantineTheme } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebouncedCallback } from '@mantine/hooks';
import AdminLayout from '@/components/admin/AdminLayout';
import { IconExclamationCircle } from '@tabler/icons-react';
import { setImage } from '@/features/lessonItemSlice';
import { addLessonGroupAssignItemSchema, AddLessonGroupAssignItemSchema } from '@/schemas/addLessonGroupAssignItem.schema';
import { useAssignItemGroups } from '@/hooks/useAssignItemGroup';
import { useEffect, useMemo } from 'react';
import { useLessonGroups } from '@/hooks/useLessonGroups';
import { setDataPagination } from '@/features/paginationSlice';

const AdminLessonGroupAssignItemPage = () => {
  const { lesson_item_id } = useParams<{ lesson_item_id: string }>();
  const { category_lesson_id } = useParams<{ category_lesson_id: string }>();
  const { lesson_id } = useParams<{ lesson_id: string }>();
  const dispatch = useAppDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<AddLessonGroupAssignItemSchema>({
    resolver: zodResolver(addLessonGroupAssignItemSchema),
    defaultValues: {
      lesson_item_id: lesson_item_id,
    }
  });
  
  const { mutateAsync, isPending, isError, error } = useAssignItemGroups();
  const theme = useMantineTheme()
  const navigate = useNavigate()

  const limit = 20
  const pagination = useAppSelector((state) => state.pagination);
  const queryOptions = useMemo(() => ({
  enabled: pagination.page !== 0,
  }), [pagination.page]);
  const { data: dataLessonGroups, isLoading } = useLessonGroups(pagination, {lesson_id: lesson_id!}, queryOptions)

  const debouncedSubmit = useDebouncedCallback( async (data: AddLessonGroupAssignItemSchema) => {
    let payload: AddLessonGroupAssignItemSchema = {...data, lesson_item_id: lesson_item_id}
    await mutateAsync(payload)
    reset();
    dispatch(setImage(''));
  }, 500);

  const onSubmit = async (data: AddLessonGroupAssignItemSchema) => {
    await new Promise<void>((resolve) => {
      debouncedSubmit(data);
      setTimeout(resolve, 600);
    })
    navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/detail/${lesson_id}`)
  };

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
  return (
    <>
      <AdminLayout>
        <Container fluid p={50}>
          <Grid>
            <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
              <h2>Add Lesson Item</h2>
            </Grid.Col>
          </Grid>
          <Card title="Add Lesson Item" style={{width: '100%'}}>
            {isError && (
                <Alert color="red" title="Gagal Tambah Data" mb="md">{error.message}</Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid>
                <Grid.Col span={{base: 4, lg: 4, md: 4, xs: 4}} p={20}>
                  <Controller
                    name="lesson_group_id"
                    control={control}
                    rules={{
                      required: "isian ini harus diisi"
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Pilih Group"
                        placeholder="Cari Group..."
                        searchable
                        nothingFoundMessage="Tidak ditemukan"
                        data={dataLessonGroups?.data.map((data) => {
                          return { value: data.id, label: data.description }
                        }) || []}
                        error={errors.lesson_group_id?.message}
                        disabled={isLoading}
                        onChange={(val) => {
                          field.onChange(val);
                        }}
                      />
                    )}
                  />
                </Grid.Col>
              </Grid>
              <Alert variant="light" color="blue" title="Alert title" icon={<IconExclamationCircle size={20} />} mt={10}>
                harap isi semua
              </Alert>
              <Group justify="flex-end" mt="md">
                <Button  loading={isPending} color={`${theme.colors.gray[5]}`} onClick={(e) => {
                  e.preventDefault()
                  navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/detail/${lesson_id}`)
                }}>
                  Back
                </Button>
                <Button type="submit" loading={isPending} 
                disabled={!isValid}
                >
                  Add Lesson Group
                </Button>
              </Group>
            </form>
          </Card>
        </Container>
      </AdminLayout>
    </>
  );
};

export default AdminLessonGroupAssignItemPage;