import { Alert, Button, Card, Checkbox, Container, Grid, Group, TextInput, useMantineTheme } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebouncedCallback } from '@mantine/hooks';
import AdminLayout from '@/components/admin/AdminLayout';
import { IconExclamationCircle } from '@tabler/icons-react';
import { setImage } from '@/features/lessonItemSlice';
import { useUploadFile } from '@/hooks/useUploadFile';
import { addLessonGroupSchema, AddLessonGroupSchema } from '@/schemas/addLessonGroup.schema';
import { useAddLessonGroups } from '@/hooks/useAddLessonGroups';

const AdminLessonGroupCreatePage = () => {
  const { category_lesson_id } = useParams<{ category_lesson_id: string }>();
  const { lesson_id } = useParams<{ lesson_id: string }>();
  const dispatch = useAppDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<AddLessonGroupSchema>({
    resolver: zodResolver(addLessonGroupSchema),
    defaultValues: {
      group: 1,
    }
  });
  
  const { mutateAsync, isPending, isError, error } = useAddLessonGroups();
  const theme = useMantineTheme()
  const navigate = useNavigate()

  const debouncedSubmit = useDebouncedCallback( async (data: AddLessonGroupSchema) => {
    let payload: AddLessonGroupSchema = {...data, lesson_id: lesson_id}
    await mutateAsync(payload)
    reset();
    dispatch(setImage(''));
  }, 500);

  const onSubmit = async (data: AddLessonGroupSchema) => {
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
                    name="group"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        label="group"
                        type="number"
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        error={errors.group?.message}
                        required
                      />
                    )}
                  />
                </Grid.Col>
                <Grid.Col span={{base: 4, lg: 4, md: 4, xs: 4}} p={20}>
                  <TextInput
                    label="description"
                    {...register('description')}
                    error={errors.description?.message}
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
                  navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/detail/${lesson_id}`)
                }}>
                  Back
                </Button>
                <Button type="submit" loading={isPending}  disabled={!isValid}>
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

export default AdminLessonGroupCreatePage;