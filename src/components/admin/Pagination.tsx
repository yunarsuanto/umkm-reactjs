import { Center, Group, Pagination, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setData } from '../../features/pagination/paginationSlice';

interface PaginationControlProps {
  total: number;
}

const PaginationControl = ({ total }: PaginationControlProps) => {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector((state) => state.pagination);

  const handleChange = (page: number) => {
    dispatch(setData({
      ...pagination,
      page,
    }));
  };

  if (total <= 1) return null;

  return (
    <Center mt="xl" style={{ flexDirection: 'column' }}>
      <Group>
        <Pagination
          total={total}
          value={pagination.page}
          onChange={handleChange}
          radius="md"
          size="sm"
          color="blue"
        />
      </Group>
      <Text mt="sm" c="dimmed" fz="sm">
        Halaman {pagination.page} dari {total} • Total data {pagination.total_records}
      </Text>
    </Center>
  );
};

export default PaginationControl;
