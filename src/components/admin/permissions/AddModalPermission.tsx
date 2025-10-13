import { Modal, TextInput, Button, Group, Alert } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../../app/hooks';
import { addPermissionSchema, AddPermissionSchema } from '../../../schemas/addPermission.schema';
import { useAddPermissions } from '../../../hooks/useAddPermissions';
import { closeCreateModal } from '../../../features/permission/permissionSlice';

interface AddModalPermissionProps {
  open: boolean;
}

const AddModalPermission = ({ open }: AddModalPermissionProps) => {
  const dispatch = useAppDispatch();
  const { mutate, isPending, isError, error } = useAddPermissions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddPermissionSchema>({
    resolver: zodResolver(addPermissionSchema),
  });

  const handleClose = () => {
    reset()
    dispatch(closeCreateModal());
  };

  const onSubmit = (data: AddPermissionSchema) => {
    mutate(data, {
        onSuccess: () => {
          reset();
        }
    })
  };

  return (
    <>
      <Modal opened={open} onClose={handleClose} title="Add Permission">
        {isError && (
            <Alert color="red" title="Gagal Tambah Data" mb="md">{error.message}</Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Name"
            {...register('name')}
            error={errors.name?.message}
            required
          />
          <Group justify="flex-end" mt="md">
            <Button type="submit" loading={isPending}>
              Add Permission
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default AddModalPermission;