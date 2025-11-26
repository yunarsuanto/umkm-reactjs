import { Modal, Button, Group, Card, Table, Badge, Text, Select } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeShowModal } from '../../../features/roleSlice';
import { useShowRole } from '../../../hooks/useShowRole';
import { IconTrash } from '@tabler/icons-react';
import { useEffect, useMemo } from 'react';
import { clearDataRolePermission, clearDataRolePermissionDelete, setDataRolePermission, setDataRolePermissionDelete } from '../../../features/rolePermissionSlice';
import { changeSwitchToAddDetail, setSearch } from '../../../features/generalSlice';
import { AddRolePermissionDataState } from '../../../types/admin/role_permission/AddRolePermissionType';
import { Controller, useForm } from 'react-hook-form';
import { addRolePermissionSchema, AddRolePermissionSchema } from '../../../schemas/addRolePermission.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddRolePermission, useDeleteRolePermission } from '../../../hooks/useAddRolePermission';
import { usePermissions } from '../../../hooks/usePermissions';
import { clearPagination, setDataPagination, setPaginationSearch } from '../../../features/paginationSlice';
import { useDebouncedValue } from '@mantine/hooks';

interface ShowModalRoleProps {
  open: boolean;
}

const ShowModalRole = ({ open }: ShowModalRoleProps) => {
  const dispatch = useAppDispatch();
  const { selectedRole } = useAppSelector((state) => state.role);
  const { search } = useAppSelector((state) => state.general);
  const [debouncedSearch] = useDebouncedValue(search, 500);
  const { data: roleData, isLoading: roleIsLoading } = useShowRole(selectedRole.id, {
    enabled: open && selectedRole.id !== '',
  });
  const limit = 20
  const pagination = useAppSelector((state) => state.pagination);
  const queryOptions = useMemo(() => ({
    enabled: pagination.page !== 0,
  }), [pagination.page]);
  const { data: permissionData, isLoading: permissionIsLoading } = usePermissions(pagination, queryOptions)

  const { switchToAddDetail } = useAppSelector((state) => state.general)
  const { selectedRolePermission, selectedRolePermissionDelete } = useAppSelector((state) => state.rolePermission)
  const { mutate, isPending } = useAddRolePermission();
  const { mutate: mutateDelete, isPending: inPendingDelete } = useDeleteRolePermission();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm<AddRolePermissionSchema>({
    resolver: zodResolver(addRolePermissionSchema),
  });

  const handleClose = () => {
    dispatch(closeShowModal());
    dispatch(clearDataRolePermission());
    dispatch(clearPagination());
    dispatch(setSearch(''));
  };

  const handleCreate = (data: AddRolePermissionDataState) => {
    dispatch(setDataRolePermission({ role_id: data.role_id, permission_id: data.permission_id }))
    dispatch(changeSwitchToAddDetail())
  }

  const onSubmit = () => {
    mutate(selectedRolePermission, {
      onSuccess: () => {
        reset();
        dispatch(clearDataRolePermission());
        dispatch(changeSwitchToAddDetail())
        dispatch(clearPagination());
        dispatch(setSearch(''));
      }
    })
  }

  const handleDelete = (data: AddRolePermissionDataState) => {
    dispatch(setDataRolePermissionDelete({ role_id: data.role_id, permission_id: data.permission_id }))
  }

  useEffect(() => {
    if (selectedRolePermissionDelete.role_id !== '' && selectedRolePermissionDelete.permission_id !== '') {
      mutateDelete(selectedRolePermissionDelete, {
        onSuccess: () => {
          reset();
          dispatch(clearDataRolePermissionDelete());
          dispatch(clearPagination());
          dispatch(setSearch(''));
        }
      })
    }
  }, [selectedRolePermissionDelete, dispatch, reset, mutateDelete]);

  useEffect(() => {
    if (selectedRolePermission?.role_id) {
      reset({
        role_id: selectedRolePermission.role_id,
        permission_id: selectedRolePermission.permission_id || '',
      });
    }
  }, [selectedRolePermission, reset]);

  useEffect(() => {
    dispatch(setPaginationSearch(debouncedSearch));
  }, [debouncedSearch, dispatch])

  useEffect(() => {
    dispatch(setDataPagination({
      search: '',
      page: 1,
      limit: limit,
      prev: 0,
      next: 0,
      totalPages: 0,
      totalRecords: 0,
    }))
  }, [dispatch, limit])
  return (
    <>
      <Modal opened={open} onClose={handleClose}>
        {roleIsLoading ? (
          <Card>Memuat Data</Card>
        ) : (
          switchToAddDetail ? (
            <Card>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Role: {roleData?.data.name}</Text>
                <Badge color="blue" onClick={() => handleCreate({ role_id: roleData?.data?.id!, permission_id: '' })}>tambah</Badge>
              </Group>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="permission_id"
                  control={control}
                  rules={{
                    required: "isian ini harus diisi"
                  }}
                  render={({ field: {onChange, ...field} }) => (
                    <Select
                      {...field}
                      label="Pilih Permission"
                      placeholder="Cari permission..."
                      searchable
                      onSearchChange={(value) => {
                        dispatch(setSearch(value))
                      }}
                      nothingFoundMessage="Tidak ditemukan"
                      data={permissionData?.data.map((data) => {
                        return { value: data.id, label: data.name }
                      }) || []}
                      onChange={(val) => {
                        onChange(val)
                        dispatch(
                          setDataRolePermission({
                            role_id: selectedRolePermission.role_id || '',
                            permission_id: val || '',
                          })
                        );
                      }}
                      error={errors.permission_id?.message}
                      disabled={permissionIsLoading}
                      multiple
                    />
                  )}
                />
                <Group justify="flex-end" mt="md">
                  <Button type="submit" loading={isPending} disabled={
                    !isValid
                    // selectedRolePermission.role_id === '' || selectedRolePermission.permission_id === '' 
                  }>
                    Add Role
                  </Button>
                </Group>
              </form>

            </Card>
          ) : (
            <Card>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Role: {roleData?.data.name}</Text>
                <Badge color="blue" onClick={() => handleCreate({ role_id: roleData?.data?.id!, permission_id: '' })}>tambah</Badge>
              </Group>
              <Table striped highlightOnHover withTableBorder>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>No</Table.Th>
                    <Table.Th>Permission</Table.Th>
                    <Table.Th>Aksi</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {roleData?.data?.permissions.map((row, i) => (
                    <Table.Tr key={row.id}>
                      <Table.Td>{i + 1}</Table.Td>
                      <Table.Td>{row.name}</Table.Td>
                      <Table.Td>
                        <Button
                          loading={inPendingDelete}
                          variant="light"
                          color="red"
                          size="xs"
                          leftSection={<IconTrash size={14} />}
                          onClick={() => handleDelete({ role_id: roleData?.data?.id, permission_id: row.id })}
                        >
                          Delete
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Card>
          )
        )}
      </Modal>
    </>
  );
};

export default ShowModalRole;