import { Modal, Button, Group, Alert, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useDeletePermissions } from '../../../hooks/useDeletePermissions';
import { closeDeleteModal } from '../../../features/permission/permissionSlice';

interface DeleteModalPermissionProps {
  open: boolean;
}

const DeleteModalPermission = ({ open }: DeleteModalPermissionProps) => {
  const dispatch = useAppDispatch();
  const { selectedPermission } = useAppSelector((state) => state.general);
  const { mutate, isPending, isError, error } = useDeletePermissions();

  const handleClose = () => {
    dispatch(closeDeleteModal());
  };

  const handleDelete = () => {
    mutate({id: selectedPermission.id}, {
      onSuccess: () => {
        dispatch(closeDeleteModal());
      },
    });
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
        <Button color="red" loading={isPending} onClick={handleDelete}>
          Hapus
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteModalPermission;
