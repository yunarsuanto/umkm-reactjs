import { Button, Card, Container, Grid, Group, Text, Divider, Image } from '@mantine/core';
import AdminLayout from '../../../components/admin/AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setDataPagination } from '@/features/paginationSlice';
import { useDetailLessons } from '@/hooks/useDetailLessons';
import { useLessonItems } from '@/hooks/useLessonItems';
import CardLessonItems from '@/components/admin/lessons/CardLessonItems';
import DeleteModalLessonItem from '@/components/admin/lessons/DeleteModalLessonItem';

const AdminLessonDetailPage = () => {
    const dispatch = useAppDispatch();
    const { category_lesson_id } = useParams<{ category_lesson_id: string }>();
    const { lesson_id } = useParams<{ lesson_id: string }>();
    const navigate = useNavigate()
    const { data: dataDetail } = useDetailLessons(lesson_id!, {
        enabled: lesson_id !== '' && typeof lesson_id !== 'undefined',
    })
    
    const limit = 20
    const pagination = useAppSelector((state) => state.pagination);
    const queryOptions = useMemo(() => ({
    enabled: pagination.page !== 0,
    }), [pagination.page]);
    const { data: dataLessonItems } = useLessonItems(pagination, {lesson_id: lesson_id!}, queryOptions)
    
    const { openDelete } = useAppSelector((state) => state.lessonItem);

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
            <DeleteModalLessonItem open={openDelete} />
            <Container fluid p={50}>
                <Grid>
                    <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
                        <Group justify={'space-between'}>
                            <h2>{dataDetail?.data.title}</h2>
                            <Group>
                                <Button variant={'white'} style={{padding: 2}} onClick={() => navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/detail/${lesson_id}/item/create`)}>
                                    <img src={'/add.svg'} alt="add" width={30} height={30} />  
                                </Button>
                                <Button variant={'white'} style={{padding: 2}} onClick={() => navigate(`/admin/category-lessons/detail/${category_lesson_id}`)}>
                                    <img src={'/back.svg'} alt="add" width={30} height={30} />  
                                </Button>
                            </Group>
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
                        <Card withBorder p="xl" radius="md">
                            <Grid>
                                <Grid.Col span={9}>
                                    <Text size="sm" c="dimmed">{dataDetail?.data.description} wadawd</Text>
                                    <Divider my="sm" />
                                </Grid.Col>
                                <Grid.Col span={3} style={{textAlign: 'center'}}>
                                    {dataDetail && dataDetail.data.media && (
                                        <Image src={`${import.meta.env.VITE_API_IMAGE_URL}${dataDetail.data.media}`} fit='contain' radius={'md'} p={5} />
                                    )}
                                </Grid.Col>
                            </Grid>
                            <Grid>
                                <CardLessonItems data={dataLessonItems?.data ?? []} totalPages={0} category_lesson_id={category_lesson_id!} lesson_id={lesson_id!} />
                                <Grid.Col span={12}>
                                    <Divider my="xl" label="Lesson Item" />
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

export default AdminLessonDetailPage;