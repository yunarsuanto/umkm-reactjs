import { Modal, Button, Group, Alert, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeDeleteModal } from '../../../features/lessonSlice';
import { useDebouncedCallback } from '@mantine/hooks';
import { useDeleteLessons } from '@/hooks/useDeleteLessons';

interface DeleteModalLessonProps {
  open: boolean;
}

const DeleteModalLesson = ({ open }: DeleteModalLessonProps) => {
  const dispatch = useAppDispatch();
  const { selectedLesson } = useAppSelector((state) => state.lesson);
  const { mutate, isPending, isError, error } = useDeleteLessons();

  const handleClose = () => {
    dispatch(closeDeleteModal());
  };

  const debouncedSubmit = useDebouncedCallback((id: string) => {
      mutate({id: id}, {
        onSuccess: () => {
          dispatch(closeDeleteModal());
      },
    });
  }, 500);

  const onSubmit = () => {
    debouncedSubmit(selectedLesson.id);
  };

  return (
    <Modal
      opened={open}
      onClose={handleClose}
      title="Hapus Lesson"
      centered
    >
      {isError && (
        <Alert color="red" title="Gagal Hapus Data" mb="md">
          {error.message}
        </Alert>
      )}

      <Text>
        Apakah kamu yakin ingin menghapus{' '}
        <strong>{selectedLesson.title}</strong>?
      </Text>

      <Group justify="flex-end" mt="xl">
        <Button variant="default" onClick={handleClose}>
          Batal
        </Button>
        <Button color="red" loading={isPending} onClick={onSubmit}>
          Hapus
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteModalLesson;
