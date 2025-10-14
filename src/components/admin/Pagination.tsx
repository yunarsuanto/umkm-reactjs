import { Box, Group, Pagination, Text } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setData } from '../../features/pagination/paginationSlice';

interface PaginationControlProps {
  total: number;
  align: CanvasTextAlign;
}

const PaginationControl = ({ total, align }: PaginationControlProps) => {
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
    <Box mt="xl">
      <Group justify={align}>
        <Pagination
          total={total}
          value={pagination.page}
          onChange={handleChange}
          radius="md"
          size="sm"
          color="blue"
        />
      </Group>
      <Text mt="sm" c="dimmed" fz="sm" style={{textAlign: align}}>
        Halaman {pagination.page} dari {total} • Total data {pagination.total_records}
      </Text>
    </Box>
  );
};

export default PaginationControl;
