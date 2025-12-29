import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { useAppDispatch } from "../../../app/hooks";
import { openDeleteModal, openUpdateModal, setDataUser, openShowModal } from "../../../features/userSlice";
import PaginationControl from "../Pagination";
import { GeneralUserDataState } from "../../../types/admin/user/GeneralUserTypes";
import { GetUserDataResponse } from "../../../types/admin/user/GetUserTypes";

interface TableUsersProps {
  data: GetUserDataResponse[];
  totalPages: number;
}

const TableUsers = ({data, totalPages}: TableUsersProps) => {
  const dispatch = useAppDispatch()
  
  const handleShow = (data: GeneralUserDataState) => {
    dispatch(openShowModal())
    dispatch(setDataUser({id: data.id, username: data.username}))
  }
  
  const handleEdit = (data: GeneralUserDataState) => {
    dispatch(openUpdateModal())
    dispatch(setDataUser({id: data.id, username: data.username}))
  }
  
  const handleDelete = (data: GeneralUserDataState) => {
    dispatch(openDeleteModal())
    dispatch(setDataUser({id: data.id, username: data.username}))
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">No</th>
            <th className="px-4 py-3 text-left">Username</th>
            <th className="px-4 py-3 text-left">Aksi</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {data.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3 font-medium">{row.username}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleShow({id: row.id, username: row.username})}
                    className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                  >
                    <IconEye size={14} />
                    Show
                  </button>

                  <button
                    onClick={() => handleEdit({id: row.id, username: row.username})}
                    className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                  >
                    <IconPencil size={14} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete({id: row.id, username: row.username})}
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
}

export default TableUsers;