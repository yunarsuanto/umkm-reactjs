import { Button, Card, Container, Grid, Group, Text, Divider, Image } from '@mantine/core';
import AdminLayout from '@/components/admin/AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useDetailCategoryLessons } from '@/hooks/useDetailCategoryLessons';
import SubCategoryCardLessons from '@/components/admin/lessons/SubCategoryCardLessons';
import { GetCategoryLessonDataResponse } from '@/types/admin/category_lesson/GetCategoryLessonTypes';
import { useAppSelector } from '@/app/hooks';
import DeleteModalCategoryLesson from '@/components/admin/lessons/DeleteModalCategoryLesson';

const AdminCategoryLessonDetailPage = () => {
    const { openDelete } = useAppSelector((state) => state.categoryLesson);
    const { parent_id } = useParams<{ parent_id: string }>();
    const navigate = useNavigate()
    const { data: dataDetail } = useDetailCategoryLessons(parent_id!, {
        enabled: parent_id !== '',
    })
    
    return (
        <>
        <AdminLayout>
            <DeleteModalCategoryLesson open={openDelete} />
            <Container fluid p={50}>
                <Grid>
                    <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
                        <Group justify={'space-between'}>
                            <h2>{dataDetail?.data.title}</h2>
                            <Group>
                                <Button variant={'white'} style={{padding: 2}} onClick={() => navigate(`/admin/category-lessons/detail/${parent_id}/sub-category/create`)}>
                                    <img src={'/add.svg'} alt="add" width={30} height={30} />  
                                </Button>
                                <Button variant={'white'} style={{padding: 2}} onClick={() => navigate(`/admin/category-lessons`)}>
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
                                {(dataDetail && dataDetail.data.childs) && dataDetail.data.childs.map((childs:GetCategoryLessonDataResponse) => {
                                    return (
                                        <Grid.Col span={4} key={childs.id}>
                                            <SubCategoryCardLessons data={[childs]} totalPages={0} parent_id={parent_id!} />
                                        </Grid.Col>
                                    )
                                })}
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

export default AdminCategoryLessonDetailPage;