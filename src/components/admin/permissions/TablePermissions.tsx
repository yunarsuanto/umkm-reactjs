import { Anchor, Button, Group, Table } from "@mantine/core";
import classes from '../../../index.module.css';
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useAppDispatch } from "../../../app/hooks";
import { GetPermissionDataResponse } from "../../../types/admin/permission/GetPermissionTypes";
import { openDeleteModal, openUpdateModal, setData } from "../../../features/permission/permissionSlice";
import { GeneralPermissionDataState } from "../../../types/admin/permission/GeneralPermissionTypes";
import PaginationControl from "../Pagination";

interface TablePermissionsProps {
  data: GetPermissionDataResponse[];
  totalPages: number;
}

const TablePermissions = ({data, totalPages}: TablePermissionsProps) => {
  const dispatch = useAppDispatch()
  const handleEdit = (data: GeneralPermissionDataState) => {
    dispatch(openUpdateModal())
    dispatch(setData({id: data.id, name: data.name}))
  }
  const handleDelete = (data: GeneralPermissionDataState) => {
    dispatch(openDeleteModal())
    dispatch(setData({id: data.id, name: data.name}))
  }
  const rows = data.map((row, index) => {
    return(
      <Table.Tr key={row.name} className={classes.root}>
        <Table.Td>
          {index + 1}
        </Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {row.name}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Group gap="xs">
            <Button
              variant="light"
              color="blue"
              size="xs"
              leftSection={<IconPencil size={14} />}
              onClick={() => handleEdit({id: row.id, name: row.name})}
            >
              Edit
            </Button>
            <Button
              variant="light"
              color="red"
              size="xs"
              leftSection={<IconTrash size={14} />}
              onClick={() => handleDelete({id: row.id, name: row.name})}
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
            <Table.Th>Nama</Table.Th>
            <Table.Th>Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        <Table.Tfoot>
          <Table.Tr>
            <Table.Td colSpan={3}>
              <PaginationControl total={totalPages} align="left" />
            </Table.Td>
          </Table.Tr>
        </Table.Tfoot>
      </Table>
    </Table.ScrollContainer>
  );
}

export default TablePermissions;