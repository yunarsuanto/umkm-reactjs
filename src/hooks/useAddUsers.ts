import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { closeCreateModal } from '../features/userSlice';
import { AddUserResponse } from '../types/admin/user/AddUserTypes';
import { AddUserSchema } from '../schemas/addUser.schema';
import { addUser } from '../api/user.api';

export const useAddUsers = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation<AddUserResponse, ApiErrorType, AddUserSchema>({ 
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['users'], exact: false });
      dispatch(closeCreateModal());
    },
  });
};