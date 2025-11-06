import { Modal, Button, Group, Alert, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeDeleteModal } from '../../../features/categoryLessonSlice';
import { useDebouncedCallback } from '@mantine/hooks';
import { useDeleteCategoryLessons } from '../../../hooks/useDeleteCategoryLessons';

interface DeleteModalCategoryLessonProps {
  open: boolean;
}

const DeleteModalCategoryLesson = ({ open }: DeleteModalCategoryLessonProps) => {
  const dispatch = useAppDispatch();
  const { selectedCategoryLesson } = useAppSelector((state) => state.categoryLesson);
  const { mutate, isPending, isError, error } = useDeleteCategoryLessons();

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
    debouncedSubmit(selectedCategoryLesson.id);
  };

  return (
    <Modal
      opened={open}
      onClose={handleClose}
      title="Hapus Category"
      centered
    >
      {isError && (
        <Alert color="red" title="Gagal Hapus Data" mb="md">
          {error.message}
        </Alert>
      )}

      <Text>
        Apakah kamu yakin ingin menghapus{' '}
        <strong>{selectedCategoryLesson.title}</strong>?
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

export default DeleteModalCategoryLesson;
