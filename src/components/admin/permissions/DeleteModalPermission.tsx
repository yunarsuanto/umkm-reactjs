import { Modal, Button, Group, Alert, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useDeletePermissions } from '../../../hooks/useDeletePermissions';
import { closeDeleteModal } from '../../../features/permissionSlice';
import { useDebouncedCallback } from '@mantine/hooks';

interface DeleteModalPermissionProps {
  open: boolean;
}

const DeleteModalPermission = ({ open }: DeleteModalPermissionProps) => {
  const dispatch = useAppDispatch();
  const { selectedPermission } = useAppSelector((state) => state.permission);
  const { mutate, isPending, isError, error } = useDeletePermissions();

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
    debouncedSubmit(selectedPermission.id);
  };

  return (
    <Modal
      opened={open}
      onClose={handleClose}
      title="Hapus Permission"
      centered
    >
      {isError && (
        <Alert color="red" title="Gagal Hapus Data" mb="md">
          {error.message}
        </Alert>
      )}

      <Text>
        Apakah kamu yakin ingin menghapus permission{' '}
        <strong>{selectedPermission.name}</strong>?
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

export default DeleteModalPermission;
