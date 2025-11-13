import { Alert, Button, Card, Container, Grid, Group, Select, Textarea, TextInput, useMantineTheme } from '@mantine/core';
import AdminLayout from '@/components/admin/AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconExclamationCircle } from '@tabler/icons-react';
import { generateBase64, removeBase64Prefix } from '@/constants/generateBase64';
import { useDebouncedCallback } from '@mantine/hooks';
import { addLessonSchema, AddLessonSchema } from '@/schemas/addLesson.schema';
import { useAddLessons } from '@/hooks/useAddLessons';
import { setImageBase64 } from '@/features/lessonSlice';
import { useUploadFileBase64 } from '@/hooks/useUploadFile';
import { UploadFileBase64Schema } from '@/schemas/uploadFileBase64.schema';
import { setErrorFileNull } from '@/features/generalSlice';
import lessonTypes from '@/constants/lesson_types';

const AdminLessonCreatePage = () => {
  const { category_lesson_id } = useParams<{ category_lesson_id: string }>();
  const dispatch = useAppDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<AddLessonSchema>({
    resolver: zodResolver(addLessonSchema),
    defaultValues: {
      level: 1,
    },
  });
  
  const {imageBase64} = useAppSelector((state: any) => state.lesson)
  const {errorFileNull} = useAppSelector((state: any) => state.general)
  const { mutateAsync, isPending, isError, error } = useAddLessons();
  const { mutateAsync:imageMutate } = useUploadFileBase64();
  const theme = useMantineTheme()
  const navigate = useNavigate()

  const debouncedSubmit = useDebouncedCallback( async (data: AddLessonSchema) => {
    let payload: AddLessonSchema = {...data}
    if(!imageBase64 || imageBase64 === '') {
      dispatch(setErrorFileNull('file tidak boleh kosong'))
      return
    }else{
      dispatch(setErrorFileNull(''))
    }
    if(imageBase64 && imageBase64 !== ''){
      const image: UploadFileBase64Schema = {
        file: imageBase64,
      }
      const res = await imageMutate(image);
      payload = {...payload, media: res.data.path, category_lesson_id: category_lesson_id}
    }
    await mutateAsync(payload)
    reset();
    dispatch(setImageBase64(''));
  }, 500);

  const onSubmit = async (data: AddLessonSchema) => {
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

  return (
    <>
      <AdminLayout>
        <Container fluid p={50}>
          <Grid>
            <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
              <h2>Add Lesson</h2>
            </Grid.Col>
          </Grid>
          <Card title="Add Lesson" style={{width: '100%'}}>
            {isError && (
                <Alert color="red" title="Gagal Tambah Data" mb="md">{error.message}</Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid>
                <Grid.Col span={{base: 4, lg: 4, md: 4, xs: 4}} p={20}>
                  <Select
                    label="Level"
                    placeholder="Pilih Salah Satu"
                    data={[
                      { value: '1', label: 'First' },
                      { value: '2', label: 'Second' },
                      { value: '3', label: 'Third' },
                    ]}
                    value={'1'}
                    onChange={(val) => {
                      setValue('level', val ? Number(val) : 1 )
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={{base: 4, lg: 4, md: 4, xs: 4}} p={20}>
                  <TextInput
                    label="title"
                    {...register('title')}
                    error={errors.title?.message}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{base: 4, lg: 4, md: 4, xs: 4}} p={20}>
                  <Textarea
                    label="description"
                    {...register('description')}
                    error={errors.description?.message}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{base: 4, lg: 4, md: 4, xs: 4}} p={20}>
                  <Controller
                    name="lesson_type"
                    control={control}
                    rules={{
                      required: "isian ini harus diisi"
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Pilih Tipe"
                        placeholder="Cari Tipe..."
                        searchable
                        nothingFoundMessage="Tidak ditemukan"
                        data={lessonTypes()}
                        error={errors.lesson_type?.message}
                      />
                    )}
                  />
                </Grid.Col>
                <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
                  <TextInput
                    type='file'
                    accept="image/*"
                    label="Image"
                    onChange={(e) => ChangeImage(e)}
                    error={errorFileNull}
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
                  navigate(`/admin/category-lessons/detail/${category_lesson_id}`)
                }}>
                  Back
                </Button>
                <Button type="submit" loading={isPending}  disabled={!isValid}>
                  Add Lesson
                </Button>
              </Group>
            </form>
          </Card>
        </Container>
      </AdminLayout>
    </>
  );
};

export default AdminLessonCreatePage;