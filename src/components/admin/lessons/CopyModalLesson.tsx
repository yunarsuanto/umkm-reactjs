import { Modal, Button, Group, Alert, Text, Grid, TextInput } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { clearDataLesson, closeDeleteModal, setCopyModal } from '../../../features/lessonSlice';
import { useDebouncedCallback } from '@mantine/hooks';
import { useDeleteLessons } from '@/hooks/useDeleteLessons';
import { useCopyLessons } from '@/hooks/useCopyLessons';
import { copyLessonSchema, CopyLessonSchema } from '@/schemas/copyLesson.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

interface CopyModalLessonProps {
  open: boolean;
}

const CopyModalLesson = ({ open }: CopyModalLessonProps) => {
  const dispatch = useAppDispatch();
  const { selectedLesson } = useAppSelector((state) => state.lesson);
  const { mutateAsync, isPending, isError, error } = useCopyLessons();
  const {
    handleSubmit,
    formState: { errors, isValid },
    reset,
    register,
    setValue,
  } = useForm<CopyLessonSchema>({
    resolver: zodResolver(copyLessonSchema),
    defaultValues: {
      lesson_id: '',
      level_from: 0,
      level: 0,
    },
  });
  
  const handleClose = () => {
    dispatch(setCopyModal(false));
  };

  const debouncedSubmit = useDebouncedCallback( async (data: CopyLessonSchema) => {
    let payload: CopyLessonSchema = {...data}
    payload = {...payload}
    await mutateAsync(payload)
    reset();
    dispatch(clearDataLesson());
  }, 500);

  const onSubmit = async (data: CopyLessonSchema) => {
    await new Promise<void>((resolve) => {
      debouncedSubmit(data);
      setTimeout(resolve, 600);
    })
  };

  useEffect(() => {
    if (selectedLesson && selectedLesson.id !== '') {
      reset({
        lesson_id: selectedLesson.id,
        level_from: selectedLesson.level,
        level: selectedLesson.level + 1,
      });
    }
  }, [selectedLesson]);

  return (
    <Modal
      opened={open}
      onClose={handleClose}
      title="Copy Lesson"
      centered
    >
      {isError && (
        <Alert color="red" title="Gagal Hapus Data" mb="md">
          {error.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
            <TextInput
              label="level"
              type='number'
              error={errors.level?.message}
              required
              onChange={(e) => {
                setValue('level', Number(e.target.value))
              }}
            />
          </Grid.Col>
        </Grid>
        <Group justify="flex-end" mt="xl">
          <Button variant="default" onClick={handleClose}>
            Batal
          </Button>
          <Button type="submit" loading={isPending} disabled={!isValid}>
            Copy
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default CopyModalLesson;
