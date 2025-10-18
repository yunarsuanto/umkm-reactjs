import { Modal, TextInput, Button, Group, Alert } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useUpdatePermissions } from '../../../hooks/useUpdatePermissions';
import { updatePermissionSchema, UpdatePermissionSchema } from '../../../schemas/updatePermission.schema';
import { closeUpdateModal } from '../../../features/permission/permissionSlice';
import { useEffect } from 'react';

interface UpdateModalPermissionProps {
  open: boolean;
}

const UpdateModalPermission = ({ open }: UpdateModalPermissionProps) => {
  const dispatch = useAppDispatch();
  const { selectedPermission } = useAppSelector((state) => state.permission);
  const { mutate, isPending, isError, error } = useUpdatePermissions();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdatePermissionSchema>({
    resolver: zodResolver(updatePermissionSchema),
    defaultValues: {
      id: '',
      name: ''
    }
  });

  const handleClose = () => {
    reset()
    dispatch(closeUpdateModal());
  };

  const onSubmit = (data: UpdatePermissionSchema) => {
    mutate(data, {
      onSuccess: () => {
        dispatch(closeUpdateModal());
        reset()
      }
    })
  };

  useEffect(() => {
    if(selectedPermission.id !== ''){
      reset({
        id: selectedPermission.id,
        name: selectedPermission.name,
      })
    }
  }, [selectedPermission, reset])
  return (
    <>
      <Modal opened={open} onClose={handleClose} title="Update Permission">
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
              Update Permission
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default UpdateModalPermission;