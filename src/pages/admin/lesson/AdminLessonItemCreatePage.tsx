import { Alert, Button, Card, Checkbox, Container, Grid, Group, TextInput, useMantineTheme } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebouncedCallback } from '@mantine/hooks';
import { addLessonItemSchema, AddLessonItemSchema } from '@/schemas/addLessonItem.schema';
import { useAddLessonItems } from '@/hooks/useAddLessonItems';
import AdminLayout from '@/components/admin/AdminLayout';
import { IconExclamationCircle } from '@tabler/icons-react';
import { UploadFileSchema } from '@/schemas/uploadFile.schema';
import { setImage } from '@/features/lessonItemSlice';
import { useUploadFile } from '@/hooks/useUploadFile';
import { setErrorFileNull } from '@/features/generalSlice';

const AdminLessonItemCreatePage = () => {
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
  } = useForm<AddLessonItemSchema>({
    resolver: zodResolver(addLessonItemSchema),
    defaultValues: {
      order: 1,
      is_done: false,
    }
  });
  
  const { image } = useAppSelector((state) => state.lessonItem)
  const { errorFileNull } = useAppSelector((state) => state.general)
  const { mutateAsync, isPending, isError, error } = useAddLessonItems();
  const { mutateAsync:imageMutate } = useUploadFile();
  const theme = useMantineTheme()
  const navigate = useNavigate()

  const debouncedSubmit = useDebouncedCallback( async (data: AddLessonItemSchema) => {
    if (!data.media){
      dispatch(setErrorFileNull('File Tidak Boleh Kosong'))
      return
    }else{
      dispatch(setErrorFileNull(''))
    }
    let payload: AddLessonItemSchema = {...data, lesson_id: lesson_id}
    await mutateAsync(payload)
    reset();
    dispatch(setImage(''));
  }, 500);

  const onSubmit = async (data: AddLessonItemSchema) => {
    await new Promise<void>((resolve) => {
      debouncedSubmit(data);
      setTimeout(resolve, 600);
    })
  };

  const ChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return;
    if(file){
      const image: UploadFileSchema = {
        file: file,
      }
      const res = await imageMutate(image);
      setValue('media', res.data.path)
    }
    dispatch(setImage('/video.svg'))
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
                <Grid.Col span={{base: 4, lg: 4, md: 4, xs: 4}} p={20}>
                  <TextInput
                    label="content"
                    {...register('content')}
                    error={errors.content?.message}
                    required
                  />
                </Grid.Col>
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
                <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
                  <Checkbox
                    label="Tahap Akhir"
                    {...register('is_done')}
                    error={errors.group?.message}
                  />
                </Grid.Col>
                <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
                  <TextInput
                    type='file'
                    accept="image/*, .webm"
                    label="Image"
                    onChange={(e) => ChangeImage(e)}
                    error={errorFileNull}
                  />
                  {image !== '' && (
                    <img
                      src={`${image}`}
                      alt="preview"
                      style={{ width: 150, marginTop: 10, borderRadius: 8 }}
                    />
                  )}
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