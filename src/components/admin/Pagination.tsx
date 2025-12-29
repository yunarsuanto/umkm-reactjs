import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setDataPagination } from '../../features/paginationSlice';

interface PaginationControlProps {
  total: number;
  align?: 'left' | 'center' | 'right';
}

const PaginationControl = ({ total, align = 'left' }: PaginationControlProps) => {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector((state) => state.pagination);

  const handleChange = (page: number) => {
    dispatch(
      setDataPagination({
        ...pagination,
        page,
      })
    );
  };

  if (total <= 1) return null;

  const alignment =
    align === 'center'
      ? 'items-center'
      : align === 'right'
      ? 'items-end'
      : 'items-start';

  return (
    <div className={`mt-6 flex flex-col ${alignment}`}>
      {/* Pagination buttons */}
      <div className="flex gap-1">
        {Array.from({ length: total }, (_, i) => i + 1).map((page) => {
          const isActive = page === pagination.page;

          return (
            <button
              key={page}
              onClick={() => handleChange(page)}
              className={`px-3 py-1 text-sm rounded-md border transition
                ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Info */}
      <p className="mt-2 text-sm text-gray-500">
        Halaman {pagination.page} dari {total} • Total data{' '}
        {pagination.totalRecords}
      </p>
    </div>
  );
};

export default PaginationControl;
