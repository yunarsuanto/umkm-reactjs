import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { useAppDispatch } from '../app/hooks';
import { closeUpdateModal } from '../features/userSlice';
import { UpdateUserSchema } from '../schemas/updateUser.schema';
import { updateUser } from '../api/user.api';
import { UpdateUserResponse } from '../types/admin/user/UpdateUserTypes';

export const useUpdateUsers = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation<
    UpdateUserResponse,
    ApiErrorType,
    UpdateUserSchema & { id: string }
  >({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['users'], exact: false });
      dispatch(closeUpdateModal());
    },
  });
};
