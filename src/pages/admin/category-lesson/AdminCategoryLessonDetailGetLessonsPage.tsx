import { Button, Card, Container, Grid, Group, Text, Divider, Image } from '@mantine/core';
import AdminLayout from '../../../components/admin/AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useDetailCategoryLessons } from '../../../hooks/useDetailCategoryLessons';
import { useLessons } from '@/hooks/useLessons';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setDataPagination } from '@/features/paginationSlice';
import CardLessons from '@/components/admin/lessons/CardLessons';
import DeleteModalLesson from '@/components/admin/lessons/DeleteModalLesson';

const AdminCategoryLessonDetailGetLessonsPage = () => {
    const dispatch = useAppDispatch();
    const { openDelete } = useAppSelector((state) => state.lesson);
    const { parent_id } = useParams<{ parent_id: string }>();
    const { child_id } = useParams<{ child_id: string }>();
    const navigate = useNavigate()
    const { data: dataDetail } = useDetailCategoryLessons(child_id!, {
        enabled: child_id !== '' && typeof child_id !== 'undefined',
    })
    
    const limit = 20
    const pagination = useAppSelector((state) => state.pagination);
    const queryOptions = useMemo(() => ({
    enabled: pagination.page !== 0,
    }), [pagination.page]);
    const { data: dataLessons } = useLessons(pagination, {category_lesson_id: child_id!}, queryOptions)
      
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
        <AdminLayout>
            <DeleteModalLesson open={openDelete} />
            <Container fluid p={50}>
                <Grid>
                    <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
                        <Group justify={'space-between'}>
                            <h2>{dataDetail?.data.title}</h2>
                            <Group>
                                <Button variant={'white'} style={{padding: 2}} onClick={() => navigate(`/admin/category-lessons/detail/${parent_id}/sub-category/${child_id}/create`)}>
                                    <img src={'/add.svg'} alt="add" width={30} height={30} />  
                                </Button>
                                <Button variant={'white'} style={{padding: 2}} onClick={() => navigate(`/admin/category-lessons/detail/${parent_id}`)}>
                                    <img src={'/back.svg'} alt="add" width={30} height={30} />  
                                </Button>
                            </Group>
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
                        <Card withBorder p="xl" radius="md">
                            <Grid>
                                <Grid.Col span={9}>
                                    <Text size="sm" c="dimmed">{dataDetail?.data.description}</Text>
                                    <Divider my="sm" />
                                </Grid.Col>
                                <Grid.Col span={3} style={{textAlign: 'center'}}>
                                    {dataDetail && dataDetail.data.media && (
                                        <Image src={`${import.meta.env.VITE_API_IMAGE_URL}${dataDetail.data.media}`} fit='contain' radius={'md'} p={5} />
                                    )}
                                </Grid.Col>
                            </Grid>
                            <Grid>
                                <CardLessons data={dataLessons?.data ?? []} totalPages={0} parent_id={parent_id!} child_id={child_id!} />
                                <Grid.Col span={12}>
                                    <Divider my="xl" label="Address | Location | NPWP | KTP" />
                                </Grid.Col>
                            </Grid>
                        </Card>
                    </Grid.Col>
                </Grid>
            </Container>
        </AdminLayout>
        </>
    );
};

export default AdminCategoryLessonDetailGetLessonsPage;