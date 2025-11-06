import { Modal, TextInput, Button, Group, Alert } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../../app/hooks';
import { closeCreateModal } from '../../../features/roleSlice';
import { useAddRoles } from '../../../hooks/useAddRoles';
import { addRoleSchema, AddRoleSchema } from '../../../schemas/addRole.schema';
import { useDebouncedCallback } from '@mantine/hooks';

interface AddModalRoleProps {
  open: boolean;
}

const AddModalRole = ({ open }: AddModalRoleProps) => {
  const dispatch = useAppDispatch();
  const { mutate, isPending, isError, error } = useAddRoles();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddRoleSchema>({
    resolver: zodResolver(addRoleSchema),
  });

  const handleClose = () => {
    reset()
    dispatch(closeCreateModal());
  };

  const debouncedSubmit = useDebouncedCallback((data: AddRoleSchema) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  }, 500);

  const onSubmit = (data: AddRoleSchema) => {
    debouncedSubmit(data);
  };

  return (
    <>
      <Modal opened={open} onClose={handleClose} title="Add Role">
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
              Add Role
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default AddModalRole;