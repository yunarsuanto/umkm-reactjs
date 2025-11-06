import { Modal, Button, Group, Alert, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeDeleteModal } from '../../../features/lessonItemSlice';
import { useDebouncedCallback } from '@mantine/hooks';
import { useDeleteLessons } from '@/hooks/useDeleteLessons';
import { useDeleteLessonItems } from '@/hooks/useDeleteLessonItems';

interface DeleteModalLessonItemProps {
  open: boolean;
}

const DeleteModalLessonItem = ({ open }: DeleteModalLessonItemProps) => {
  const dispatch = useAppDispatch();
  const { selectedLessonItem } = useAppSelector((state) => state.lessonItem);
  const { mutate, isPending, isError, error } = useDeleteLessonItems();

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
    debouncedSubmit(selectedLessonItem.id);
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
        <strong>{selectedLessonItem.content}</strong>?
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

export default DeleteModalLessonItem;
