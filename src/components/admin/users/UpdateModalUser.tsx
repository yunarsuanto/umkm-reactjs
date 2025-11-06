import { Modal, TextInput, Button, Group, Alert } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeUpdateModal } from '../../../features/userSlice';
import { useEffect } from 'react';
import { updateUserSchema, UpdateUserSchema } from '../../../schemas/updateUser.schema';
import { useUpdateUsers } from '../../../hooks/useUpdateUsers';
import { IconExclamationCircle } from '@tabler/icons-react';
import { useDebouncedCallback } from '@mantine/hooks';

interface UpdateModalUserProps {
  open: boolean;
}

const UpdateModalUser = ({ open }: UpdateModalUserProps) => {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector((state) => state.user);
  const { mutate, isPending, isError, error } = useUpdateUsers();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: '',
      username: '',
    }
  });

  const handleClose = () => {
    reset()
    dispatch(closeUpdateModal());
  };

  const debouncedSubmit = useDebouncedCallback((data: UpdateUserSchema) => {
    mutate(data, {
      onSuccess: () => {
        dispatch(closeUpdateModal());
        reset()
      },
    });
  }, 500);

  const onSubmit = (data: UpdateUserSchema) => {
    debouncedSubmit(data);
  };

  useEffect(() => {
    if(selectedUser.id !== ''){
      reset({
        id: selectedUser.id,
        username: selectedUser.username,
      })
    }
  }, [selectedUser, reset])
  return (
    <>
      <Modal opened={open} onClose={handleClose} title="Update User">
        {isError && (
            <Alert color="red" title="Gagal Tambah Data" mb="md">{error.message}</Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Name"
            {...register('username')}
            error={errors.username?.message}
            required
          />
          <Alert variant="light" color="blue" title="Alert title" icon={<IconExclamationCircle size={20} />} mt={2}>
            password dan confirm_password harus sama
          </Alert>
          <Group justify="flex-end" mt="md">
            <Button type="submit" loading={isPending}>
              Update User
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default UpdateModalUser;