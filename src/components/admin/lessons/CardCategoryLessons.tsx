import { Button, Card, Group, Image, Text, Grid } from "@mantine/core";
import { useAppDispatch } from "../../../app/hooks";
import { openDeleteModal, setDataCategoryLesson } from "@/features/categoryLessonSlice";
import { useNavigate } from "react-router-dom";
import { GetCategoryLessonDataResponse } from "../../../types/admin/category_lesson/GetCategoryLessonTypes";
import { GeneralCategoryLessonDataState } from "../../../types/admin/category_lesson/GeneralCategoryLessonTypes";
import { useEffect } from "react";

interface CardCategoryLessonsProps {
  data: GetCategoryLessonDataResponse[];
  totalPages: number;
}

const CardCategoryLessons = ({data}: CardCategoryLessonsProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleDelete = (data: GeneralCategoryLessonDataState) => {
    dispatch(openDeleteModal())
    dispatch(setDataCategoryLesson({id: data.id, title: data.title}))
  }

  return (
    <Grid>
      {Array.isArray(data) && data.map((row, index) => {
        return (
          <Grid.Col span={3} key={`${index}-${row.id}`} style={{textAlign: 'center'}}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={`${import.meta.env.VITE_API_IMAGE_URL}${row.media}`}
                  width={'100%'}
                  alt="Norway"
                />
              </Card.Section>
              <Group style={{width: '100%'}}>
                  <Text fw={500}>{row.title}</Text>
                  <Group>
                    <Button variant={'white'} style={{padding: 2}} onClick={() => navigate(`/admin/category-lessons/detail/${row.id}`)}>
                      <img src={'/detail.svg'} alt="add" width={30} height={30} />  
                    </Button>
                    <Button variant={'white'} style={{padding: 2}} onClick={() => navigate(`/admin/category-lessons/edit/${row.id}`)}>
                      <img src={'/edit.svg'} alt="add" width={30} height={30} />  
                    </Button>
                    <Button variant={'white'} style={{padding: 2}} onClick={() => {
                      const data:GeneralCategoryLessonDataState = {
                        id: row.id,
                        title: row.title,
                      }
                      handleDelete(data)
                    }}>
                      <img src={'/delete.svg'} alt="add" width={30} height={30} />  
                    </Button>
                  </Group>
              </Group>
              <Text size="sm" c="dimmed">
                Deskripsi : {row.description}
              </Text>
              <Text size="sm">
                Tipe : {row.category_lesson_type}
              </Text>
            </Card>
          </Grid.Col>
        )
      })}
    </Grid>
  );
}

export default CardCategoryLessons;