import { Alert, Button, Card, Checkbox, Container, Grid, Group, TextInput, useMantineTheme } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebouncedCallback } from '@mantine/hooks';
import AdminLayout from '@/components/admin/AdminLayout';
import { IconExclamationCircle } from '@tabler/icons-react';
import { updateLessonItemSchema, UpdateLessonItemSchema } from '@/schemas/updateLessonItem.schema';
import { useUpdateLessonItems } from '@/hooks/useUpdateLessonItems';
import { useDetailLessonItems } from '@/hooks/useDetailLessonItems';
import { useEffect } from 'react';
import { UploadFileSchema } from '@/schemas/uploadFile.schema';
import { generateBase64, removeBase64Prefix } from '@/constants/generateBase64';
import { useUploadFile, useUploadFileBase64 } from '@/hooks/useUploadFile';
import { setImage } from '@/features/lessonItemSlice';

const AdminLessonItemUpdatePage = () => {
  const { category_lesson_id } = useParams<{ category_lesson_id: string }>();
  const { lesson_item_id } = useParams<{ lesson_item_id: string }>();
  const { lesson_id } = useParams<{ lesson_id: string }>();
  const dispatch = useAppDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<UpdateLessonItemSchema>({
    resolver: zodResolver(updateLessonItemSchema),
  });

  const {image} = useAppSelector((state: any) => state.lessonItem)
  const { data: dataDetail } = useDetailLessonItems(lesson_item_id!, {
    enabled: lesson_item_id !== '',
  })

  const { mutateAsync:imageMutate } = useUploadFile();
  
  const { mutateAsync, isPending, isError, error } = useUpdateLessonItems();
  const theme = useMantineTheme()
  const navigate = useNavigate()

  const debouncedSubmit = useDebouncedCallback( async (data: UpdateLessonItemSchema) => {
    let payload: UpdateLessonItemSchema = {...data, lesson_id: lesson_id}
    await mutateAsync(payload)
    reset();
    dispatch(setImage(''));
    navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/detail/${lesson_id}`)
  }, 500);

  const onSubmit = async (data: UpdateLessonItemSchema) => {
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

  useEffect(() => {
    if(dataDetail && lesson_item_id !== ''){
        reset({
            id: lesson_item_id,
            lesson_id: lesson_id,
            content: dataDetail.data.content,
            order: dataDetail.data.order,
            media: dataDetail.data.media,
            group: dataDetail.data.group,
            is_done: dataDetail.data.is_done,
        })
    }
  }, [lesson_item_id, dataDetail, dispatch, reset])
  
  return (
    <>
      <AdminLayout>
        <Container fluid p={50}>
          <Grid>
            <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
              <h2>Edit Lesson Item</h2>
            </Grid.Col>
          </Grid>
          <Card title="Edit Lesson Item" style={{width: '100%'}}>
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
                  Update Lesson Item
                </Button>
              </Group>
            </form>
          </Card>
        </Container>
      </AdminLayout>
    </>
  );
};

export default AdminLessonItemUpdatePage;