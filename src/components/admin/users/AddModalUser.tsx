import { Modal, TextInput, Button, Group, Alert } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../../app/hooks';
import { closeCreateModal } from '../../../features/userSlice';
import { useAddUsers } from '../../../hooks/useAddUsers';
import { addUserSchema, AddUserSchema } from '../../../schemas/addUser.schema';
import { IconExclamationCircle } from '@tabler/icons-react';
import { useDebouncedCallback } from '@mantine/hooks';

interface AddModalUserProps {
  open: boolean;
}

const AddModalUser = ({ open }: AddModalUserProps) => {
  const dispatch = useAppDispatch();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddUserSchema>({
    resolver: zodResolver(addUserSchema),
  });

  const password = watch('password');
  const confirm_password = watch('confirm_password');
  const { mutate, isPending, isError, error } = useAddUsers();


  const handleClose = () => {
    reset()
    dispatch(closeCreateModal());
  };

  const debouncedSubmit = useDebouncedCallback((data: AddUserSchema) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  }, 500);

  const onSubmit = (data: AddUserSchema) => {
    debouncedSubmit(data);
  };

  return (
    <>
      <Modal opened={open} onClose={handleClose} title="Add User">
        {isError && (
            <Alert color="red" title="Gagal Tambah Data" mb="md">{error.message}</Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Username"
            {...register('username')}
            error={errors.username?.message}
            required
          />
          <TextInput
            label="Password"
            {...register('password')}
            error={errors.password?.message}
            required
          />
          <TextInput
            label="Confirm Password"
            {...register('confirm_password')}
            error={errors.confirm_password?.message}
            required
          />
          <Alert variant="light" color="blue" title="Alert title" icon={<IconExclamationCircle size={20} />} mt={2}>
            password dan confirm_password harus sama
          </Alert>
          <Group justify="flex-end" mt="md">
            <Button type="submit" loading={isPending} disabled={password !== confirm_password}>
              Add User
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default AddModalUser;
