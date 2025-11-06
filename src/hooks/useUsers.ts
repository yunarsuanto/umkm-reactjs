import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getUser } from '../api/user.api';
import { Pagination } from '../types/Pagination';
import { ApiErrorType } from '../types/ApiError';
import { GetUserResponse } from '../types/admin/user/GetUserTypes';

export const useUsers = (pagination: Pagination, options: {enabled: boolean}) => {
  return useQuery<GetUserResponse, ApiErrorType>({
    queryKey: ['users', pagination.page, pagination.limit, pagination.search],
    queryFn: () => getUser(pagination),
    staleTime: 5 * 60 * 1000,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    ...options,
  });
};
