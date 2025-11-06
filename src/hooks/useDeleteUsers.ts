import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { closeDeleteModal } from '../features/userSlice';
import { DeleteUserResponse } from '../types/admin/user/DeleteUserTypes';
import { deleteUser } from '../api/user.api';

export const useDeleteUsers = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  
  return useMutation<
    DeleteUserResponse,
    ApiErrorType,
    { id: string }
  >({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['users'], exact: false });
      dispatch(closeDeleteModal());
    },
  });
};
