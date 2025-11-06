import { Modal, Button, Group, Alert, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeDeleteModal } from '../../../features/roleSlice';
import { useDeleteRoles } from '../../../hooks/useDeleteRoles';
import { useDebouncedCallback } from '@mantine/hooks';

interface DeleteModalRoleProps {
  open: boolean;
}

const DeleteModalRole = ({ open }: DeleteModalRoleProps) => {
  const dispatch = useAppDispatch();
  const { selectedRole } = useAppSelector((state) => state.role);
  const { mutate, isPending, isError, error } = useDeleteRoles();

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
    debouncedSubmit(selectedRole.id);
  };

  return (
    <Modal
      opened={open}
      onClose={handleClose}
      title="Hapus Role"
      centered
    >
      {isError && (
        <Alert color="red" title="Gagal Hapus Data" mb="md">
          {error.message}
        </Alert>
      )}

      <Text>
        Apakah kamu yakin ingin menghapus role{' '}
        <strong>{selectedRole.name}</strong>?
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

export default DeleteModalRole;
