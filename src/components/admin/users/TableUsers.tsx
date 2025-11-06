import { Anchor, Button, Group, Table } from "@mantine/core";
import classes from '../../../index.module.css';
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { useAppDispatch } from "../../../app/hooks";
import { openDeleteModal, openUpdateModal, setDataUser } from "../../../features/userSlice";
import PaginationControl from "../Pagination";
import { openShowModal } from "../../../features/userSlice";
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
  const rows = data.map((row, index) => {
    return(
      <Table.Tr key={row.username} className={classes.root}>
        <Table.Td>
          {index + 1}
        </Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {row.username}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Group gap="xs">
            <Button
              variant="light"
              color="blue"
              size="xs"
              leftSection={<IconEye size={14} />}
              onClick={() => handleShow({id: row.id, username: row.username})}
            >
              Show
            </Button>
            <Button
              variant="light"
              color="blue"
              size="xs"
              leftSection={<IconPencil size={14} />}
              onClick={() => handleEdit({id: row.id, username: row.username})}
            >
              Edit
            </Button>
            <Button
              variant="light"
              color="red"
              size="xs"
              leftSection={<IconTrash size={14} />}
              onClick={() => handleDelete({id: row.id, username: row.username})}
            >
              Delete
            </Button>
          </Group>
        </Table.Td>
      </Table.Tr>
    )
  })

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>No</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        <Table.Tfoot>
          <Table.Tr>
            <Table.Td colSpan={4}>
              <PaginationControl total={totalPages} align="left" />
            </Table.Td>
          </Table.Tr>
        </Table.Tfoot>
      </Table>
    </Table.ScrollContainer>
  );
}

export default TableUsers;