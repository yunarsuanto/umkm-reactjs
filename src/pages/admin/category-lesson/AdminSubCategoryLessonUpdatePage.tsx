import { Alert, Button, Card, Container, Grid, Group, Textarea, TextInput, useMantineTheme } from '@mantine/core';
import AdminLayout from '@/components/admin/AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setImageBase64 } from '@/features/categoryLessonSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconExclamationCircle } from '@tabler/icons-react';
import { generateBase64, removeBase64Prefix } from '@/constants/generateBase64';
import { useUploadFile } from '@/hooks/useUploadFile';
import { UploadFileSchema } from '@/schemas/uploadFile.schema';
import { useDebouncedCallback } from '@mantine/hooks';
import { useUpdateCategoryLessons } from '@/hooks/useUpdateCategoryLessons';
import { UpdateCategoryLessonSchema, updateCategoryLessonSchema } from '@/schemas/updateCategoryLesson.schema';
import { useEffect } from 'react';
import { useDetailCategoryLessons } from '@/hooks/useDetailCategoryLessons';

const AdminSubCategoryLessonUpdatePage = () => {
  const dispatch = useAppDispatch();
  const { parent_id } = useParams<{ parent_id: string }>();
  const { child_id } = useParams<{ child_id: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdateCategoryLessonSchema>({
    resolver: zodResolver(updateCategoryLessonSchema),
  });
  const {imageBase64} = useAppSelector((state: any) => state.categoryLesson)
  const { mutateAsync, isPending, isError, error } = useUpdateCategoryLessons();
  const { mutateAsync:imageMutate } = useUploadFile();
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const { data: dataDetail } = useDetailCategoryLessons(child_id!, {
    enabled: child_id !== '',
  })

  const debouncedSubmit = useDebouncedCallback( async (data: UpdateCategoryLessonSchema) => {
    let payload: UpdateCategoryLessonSchema = {...data}
    if(imageBase64 && imageBase64 !== ''){
      const image: UploadFileSchema = {
        file: imageBase64,
      }
      const res = await imageMutate(image);
      payload = {...payload, media: res.data.path, category_lesson_id: parent_id, id: child_id!}
    }
    await mutateAsync(payload)
    reset();
    dispatch(setImageBase64(''));
    await navigate(`/admin/category-lessons/detail/${parent_id}`)
  }, 500);

  const onSubmit = async (data: UpdateCategoryLessonSchema) => {
    await new Promise<void>((resolve) => {
      debouncedSubmit(data);
      setTimeout(resolve, 600);
    })
  };
  
  const ChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return;
    let result = await generateBase64(file);
    result = removeBase64Prefix(result)
    dispatch(setImageBase64(result))
  };

  useEffect(() => {
    if(dataDetail && child_id !== ''){
        reset({
            id: child_id,
            category_lesson_id: dataDetail.data.category_lesson_id,
            title: dataDetail.data.title,
            description: dataDetail.data.description,
            media: dataDetail.data.media,
        })
    }
  }, [child_id, dataDetail, dispatch, reset])

  return (
    <>
      <AdminLayout>
        <Container fluid p={50}>
          <Grid>
            <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
              <h2>Edit Sub Category Lesson</h2>
            </Grid.Col>
          </Grid>
          <Card title="Add Category Lesson" style={{width: '100%'}}>
            {isError && (
                <Alert color="red" title="Gagal Tambah Data" mb="md">{error.message}</Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid>
                <Grid.Col span={{base: 4, lg: 4, md: 4, xs: 4}} p={20}>
                  <TextInput
                    label="title"
                    {...register('title')}
                    error={errors.title?.message}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{base: 8, lg: 8, md: 8, xs: 8}} p={20}>
                  <Textarea
                    label="description"
                    {...register('description')}
                    error={errors.description?.message}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
                  <TextInput
                    type='file'
                    accept="image/*"
                    label="Image"
                    onChange={(e) => ChangeImage(e)}
                  />
                  {imageBase64 !== '' && (
                    <img
                      src={`data:image/png;base64, ${imageBase64}`}
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
                  navigate(`/admin/category-lessons/detail/${parent_id}`)
                }}>
                  Back
                </Button>
                <Button type="submit" loading={isPending} disabled={!isValid}>
                  Update Sub Category Lesson
                </Button>
              </Group>
            </form>
          </Card>
        </Container>
      </AdminLayout>
    </>
  );
};

export default AdminSubCategoryLessonUpdatePage;