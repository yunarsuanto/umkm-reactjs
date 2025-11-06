import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ApiErrorType } from '../types/ApiError';
import { DetailUserResponse } from '../types/admin/user/DetailUserTypes';
import { detailUser } from '../api/user.api';

export const useShowUser = (id: string, options?: { enabled?: boolean }) => {
  return useQuery<DetailUserResponse, ApiErrorType>({
    queryKey: ['users', id],
    queryFn: () => detailUser(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    ...options,
  });
};
