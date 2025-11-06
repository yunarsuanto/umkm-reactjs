import { Alert, Button, Card, Container, Grid, Group, TextInput, useMantineTheme } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebouncedCallback } from '@mantine/hooks';
import { setImageBase64 } from '@/features/lessonSlice';
import { addLessonItemSchema, AddLessonItemSchema } from '@/schemas/addLessonItem.schema';
import { useAddLessonItems } from '@/hooks/useAddLessonItems';
import AdminLayout from '@/components/admin/AdminLayout';
import { IconExclamationCircle } from '@tabler/icons-react';

const AdminLessonItemCreatePage = () => {
  const { lesson_id } = useParams<{ lesson_id: string }>();
  const { parent_id } = useParams<{ parent_id: string }>();
  const { child_id } = useParams<{ child_id: string }>();
  const dispatch = useAppDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<AddLessonItemSchema>({
    resolver: zodResolver(addLessonItemSchema),
  });
  
  const { mutateAsync, isPending, isError, error } = useAddLessonItems();
  const theme = useMantineTheme()
  const navigate = useNavigate()

  const debouncedSubmit = useDebouncedCallback( async (data: AddLessonItemSchema) => {
    let payload: AddLessonItemSchema = {...data}
    payload = {...payload, lesson_id: lesson_id!}
    await mutateAsync(payload)
    reset();
    dispatch(setImageBase64(''));
  }, 500);

  const onSubmit = async (data: AddLessonItemSchema) => {
    await new Promise<void>((resolve) => {
      debouncedSubmit(data);
      setTimeout(resolve, 600);
    })
  };
  
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
                    name="order"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        label="Order"
                        type="number"
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        error={errors.order?.message}
                        required
                      />
                    )}
                  />
                </Grid.Col>
                <Grid.Col span={{base: 8, lg: 8, md: 8, xs: 8}} p={20}>
                  <TextInput
                    label="content"
                    {...register('content')}
                    error={errors.content?.message}
                    required
                  />
                </Grid.Col>
              </Grid>
              <Alert variant="light" color="blue" title="Alert title" icon={<IconExclamationCircle size={20} />} mt={10}>
                harap isi semua
              </Alert>
              <Group justify="flex-end" mt="md">
                <Button  loading={isPending} color={`${theme.colors.gray[5]}`} onClick={(e) => {
                  e.preventDefault()
                  navigate(`/admin/category-lessons/detail/${parent_id}/sub-category/${child_id}/detail/${lesson_id}`)
                }}>
                  Back
                </Button>
                <Button type="submit" loading={isPending}  disabled={!isValid}>
                  Add Lesson Item
                </Button>
              </Group>
            </form>
          </Card>
        </Container>
      </AdminLayout>
    </>
  );
};

export default AdminLessonItemCreatePage;