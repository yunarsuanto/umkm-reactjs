import { Modal, Button, Group, Card, Table, Badge, Text, Select } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeShowModal } from '../../../features/userSlice';
import { IconTrash } from '@tabler/icons-react';
import { useEffect, useMemo } from 'react';
import { changeSwitchToAddDetail, setSearch } from '../../../features/generalSlice';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clearPagination, setDataPagination, setPaginationSearch } from '../../../features/paginationSlice';
import { useShowUser } from '../../../hooks/useShowUser';
import { useRoles } from '../../../hooks/useRoles';
import { clearDataUserRole, clearDataUserRoleDelete, setDataUserRole, setDataUserRoleDelete } from '../../../features/userRoleSlice';
import { AddUserRoleDataState } from '../../../types/admin/user_role/AddUserRoleType';
import { useAddUserRole } from '../../../hooks/useAddUserRole';
import { addUserRoleSchema, AddUserRoleSchema } from '../../../schemas/addUserRole.schema';
import { DeleteUserRoleDataState } from '../../../types/admin/user_role/DeleteUserRoleType';
import { useDeleteUserRole } from '../../../hooks/useDeleteUserRole';
import { useDebouncedCallback, useDebouncedValue } from '@mantine/hooks';

interface ShowModalUserProps {
  open: boolean;
}

const ShowModalUser = ({ open }: ShowModalUserProps) => {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector((state) => state.user);
  const { search } = useAppSelector((state) => state.general);
  const [debouncedSearch] = useDebouncedValue(search, 500);
  const { data: userData, isLoading: userIsLoading } = useShowUser(selectedUser.id, {
    enabled: open && selectedUser.id !== '',
  });
  const limit = 20
    const pagination = useAppSelector((state) => state.pagination);
    const queryOptions = useMemo(() => ({
      enabled: pagination.page !== 0,
    }), [pagination.page]);
    const { data: roleData, isLoading: roleIsLoading } = useRoles(pagination, queryOptions)

  const {switchToAddDetail} = useAppSelector((state) => state.general)
  const {selectedUserRole, selectedUserRoleDelete} = useAppSelector((state) => state.userRole)
  const { mutateAsync, isPending } = useAddUserRole();
  const { mutate: mutateDelete, isPending: isPendingDelete } = useDeleteUserRole();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddUserRoleSchema>({
    resolver: zodResolver(addUserRoleSchema),
  });

  const handleClose = () => {
    dispatch(closeShowModal());
    dispatch(clearDataUserRole());
    dispatch(clearPagination());
    dispatch(setSearch(''));
  };

  const handleCreate = (data: AddUserRoleDataState) => {
    dispatch(setDataUserRole({user_id: data.user_id, role_id: data.role_id}))
    dispatch(changeSwitchToAddDetail())
  }
  
  const debouncedSubmit = useDebouncedCallback( async (data: AddUserRoleSchema) => {
    let payload: AddUserRoleSchema = {...data}
    payload = {...payload, is_active: true}
    await mutateAsync(payload)
    reset();
    dispatch(clearDataUserRole());
    dispatch(changeSwitchToAddDetail())
    dispatch(clearPagination());
    dispatch(setSearch(''));
  }, 500);

  const onSubmit = async (data: AddUserRoleSchema) => {
    await new Promise<void>((resolve) => {
      debouncedSubmit(data);
      setTimeout(resolve, 600);
    })
  };
  // const onSubmit = () => {
  //   const d:AddUserRoleSchema = {
  //     user_id: selectedUserRole.user_id,
  //     role_id: selectedUserRole.role_id,
  //     is_active: true,
  //   }
  //   mutate(selectedUserRole, {
  //       onSuccess: () => {
  //         reset();
  //         dispatch(clearDataUserRole());
  //         dispatch(changeSwitchToAddDetail())
  //         dispatch(clearPagination());
  //         dispatch(setSearch(''));
  //       }
  //   })
  // }
  
  const handleDelete = (data: DeleteUserRoleDataState) => {
    dispatch(setDataUserRoleDelete({user_id: data.user_id, role_id: data.role_id}))
  }

  useEffect(() => {
    if (selectedUserRoleDelete.role_id !== '' && selectedUserRoleDelete.user_id !== '') {
      mutateDelete(selectedUserRoleDelete, {
          onSuccess: () => {
            reset();
            dispatch(clearDataUserRoleDelete());
            dispatch(clearPagination());
            dispatch(setSearch(''));
          }
      })
    }
  }, [selectedUserRoleDelete, dispatch, reset, mutateDelete]);

  useEffect(() => {
    if (selectedUserRole?.role_id) {
      reset({
        user_id: selectedUserRole.user_id,
        role_id: selectedUserRole.role_id || '',
      });
    }
  }, [selectedUserRole, reset]);

  useEffect(() => {
    dispatch(setPaginationSearch(debouncedSearch));
  }, [debouncedSearch, pagination, dispatch])

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
      <Modal opened={open} onClose={handleClose} size={'40%'}>
        {userIsLoading ? (
          <Card>Memuat Data</Card>
        ) : (
          switchToAddDetail ? (
            <Card>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>User: {userData?.data.username}</Text>
                <Badge color="blue" onClick={() => handleCreate({user_id: userData?.data?.id!, role_id: ''})}>tambah</Badge>
              </Group>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="role_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Pilih Role"
                      placeholder="Cari Role..."
                      searchable
                      onSearchChange={(value) => {
                        dispatch(setSearch(value))
                      }}
                      nothingFoundMessage="Tidak ditemukan"
                      data={roleData?.data.map((data) => {
                        return {value: data.id, label: data.name}
                      }) || []}
                      onChange={(val) => {
                        dispatch(
                          setDataUserRole({
                            user_id: selectedUserRole.user_id || '',
                            role_id: val || '',
                          })
                        );
                      }}
                      error={errors.role_id?.message}
                      disabled={roleIsLoading}
                    />
                  )}
                />
                <Group justify="flex-end" mt="md">
                  <Button type="submit" loading={isPending} disabled={selectedUserRole.user_id === '' || selectedUserRole.role_id === '' }>
                    Add Role
                  </Button>
                </Group>
              </form>
            </Card>
          ) : (
            <Card style={{overflow: 'auto'}}>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>User: {userData?.data.username}</Text>
                <Badge color="blue" onClick={() => handleCreate({user_id: userData?.data?.id!, role_id: ''})}>tambah</Badge>
              </Group>
              <Table striped highlightOnHover withTableBorder>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>No</Table.Th>
                    <Table.Th>Role</Table.Th>
                    <Table.Th>Permission</Table.Th>
                    <Table.Th>Aksi</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {userData?.data?.roles.map((row, i) => (
                    <Table.Tr key={row.id}>
                      <Table.Td>{i + 1}</Table.Td>
                      <Table.Td>{row.name}</Table.Td>
                      <Table.Td>{row.permissions.length > 0 && (
                        <Group gap="xs" wrap="wrap">
                          {row.permissions.map((r) => (
                            <Badge
                              key={r.id}
                              color="blue"
                              variant="light"
                              radius="sm"
                            >
                              {r.name}
                            </Badge>
                          ))}
                        </Group>
                      )}</Table.Td>
                      <Table.Td>
                        <Button
                          variant="light"
                          color="red"
                          size="xs"
                          leftSection={<IconTrash size={14} />}
                          loading={isPendingDelete}
                          onClick={() => handleDelete({user_id: userData?.data?.id, role_id: row.id})}
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

export default ShowModalUser;