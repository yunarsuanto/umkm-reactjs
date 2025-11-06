import { Modal, Button, Group, Alert, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeDeleteModal } from '../../../features/userSlice';
import { useDeleteUsers } from '../../../hooks/useDeleteUsers';
import { useDebouncedCallback } from '@mantine/hooks';

interface DeleteModalUserProps {
  open: boolean;
}

const DeleteModalUser = ({ open }: DeleteModalUserProps) => {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector((state) => state.user);
  const { mutate, isPending, isError, error } = useDeleteUsers();

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
    debouncedSubmit(selectedUser.id);
  };

  return (
    <Modal
      opened={open}
      onClose={handleClose}
      title="Hapus User"
      centered
    >
      {isError && (
        <Alert color="red" title="Gagal Hapus Data" mb="md">
          {error.message}
        </Alert>
      )}

      <Text>
        Apakah kamu yakin ingin menghapus user{' '}
        <strong>{selectedUser.username}</strong>?
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

export default DeleteModalUser;
