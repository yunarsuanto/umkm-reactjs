import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useAppDispatch } from "../../../app/hooks";
import { openDeleteModal, openUpdateModal, setDataPermission } from "../../../features/permissionSlice";
import PaginationControl from "../Pagination";

interface TablePermissionsProps {
  data: any[];
  totalPages: number;
}

const TablePermissions = ({ data, totalPages }: TablePermissionsProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">No</th>
            <th className="px-4 py-3 text-left">Nama</th>
            <th className="px-4 py-3 text-left">Aksi</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {data.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3 font-medium">{row.name}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      dispatch(openUpdateModal());
                      dispatch(setDataPermission({ id: row.id, name: row.name }));
                    }}
                    className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                  >
                    <IconPencil size={14} />
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      dispatch(openDeleteModal());
                      dispatch(setDataPermission({ id: row.id, name: row.name }));
                    }}
                    className="flex items-center gap-1 px-3 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                  >
                    <IconTrash size={14} />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4">
        <PaginationControl total={totalPages} align="left" />
      </div>
    </div>
  );
};

export default TablePermissions;
