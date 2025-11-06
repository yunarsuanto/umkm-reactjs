import { Modal, TextInput, Button, Group, Alert } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeUpdateModal } from '../../../features/roleSlice';
import { useEffect } from 'react';
import { useUpdateRoles } from '../../../hooks/useUpdateRoles';
import { updateRoleSchema, UpdateRoleSchema } from '../../../schemas/updateRole.schema';
import { useDebouncedCallback } from '@mantine/hooks';

interface UpdateModalRoleProps {
  open: boolean;
}

const UpdateModalRole = ({ open }: UpdateModalRoleProps) => {
  const dispatch = useAppDispatch();
  const { selectedRole } = useAppSelector((state) => state.role);
  const { mutate, isPending, isError, error } = useUpdateRoles();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateRoleSchema>({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: {
      id: '',
      name: ''
    }
  });

  const handleClose = () => {
    reset()
    dispatch(closeUpdateModal());
  };

  const debouncedSubmit = useDebouncedCallback((data: UpdateRoleSchema) => {
    mutate(data, {
      onSuccess: () => {
        dispatch(closeUpdateModal());
        reset()
      },
    });
  }, 500);

  const onSubmit = (data: UpdateRoleSchema) => {
    debouncedSubmit(data);
  };

  useEffect(() => {
    if(selectedRole.id !== ''){
      reset({
        id: selectedRole.id,
        name: selectedRole.name,
      })
    }
  }, [selectedRole, reset])
  return (
    <>
      <Modal opened={open} onClose={handleClose} title="Update Role">
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
              Update Role
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default UpdateModalRole;