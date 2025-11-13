import { Button, Card, Group, Image, Text, Grid } from "@mantine/core";
import { useAppDispatch } from "../../../app/hooks";
import { openDeleteModal } from "@/features/lessonItemSlice";
import { useNavigate } from "react-router-dom";
import { GeneralLessonDataState } from "@/types/admin/lesson/GeneralLessonTypes";
import { GetLessonItemDataResponse } from "@/types/admin/lesson_item/GetLessonItemTypes";
import { GeneralLessonItemDataState } from "@/types/admin/lesson_item/GeneralLessonItemTypes";
import { setDataLessonItem } from "@/features/lessonItemSlice";
import speak from "@/constants/speak";

interface CardLessonItemsProps {
  data: GetLessonItemDataResponse[];
  lesson_id: string;
  category_lesson_id: string;
  totalPages: number;
}

const CardLessonItems = ({data, totalPages, category_lesson_id, lesson_id}: CardLessonItemsProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleDelete = (data: GeneralLessonItemDataState) => {
    dispatch(openDeleteModal())
    dispatch(setDataLessonItem({id: data.id, content: data.content}))
  }

  return (
    <>
      {data && data.map((row, index) => {
        return (
          <Grid.Col span={3} key={`${index}-${row.id}`}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <video 
                  src={`${import.meta.env.VITE_API_IMAGE_URL}${row.media}`}
                  autoPlay
                  muted
                  loop
                  style={{
                      width: '100%',
                      objectPosition: 'center center',
                  }}
                  onClick={() => {
                      speak(`${row.content}`)
                  }}
                />
              </Card.Section>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{row.content}</Text>
                <Group justify="center" style={{width: '100%'}}>
                  <Button variant={'white'} style={{padding: 2}} onClick={() => 
                      navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/detail/${lesson_id}/item/edit/${row.id}`)
                    }>
                      <img src={'/edit.svg'} alt="add" width={30} height={30} />  
                  </Button>
                  <Button variant={'white'} style={{padding: 2}} onClick={() => {
                    const data:GeneralLessonDataState = {
                      id: row.id,
                      title: row.content,
                    }
                    handleDelete(row)
                  }}>
                    <img src={'/delete.svg'} alt="add" width={30} height={30} />  
                  </Button>
                </Group>
              </Group>
            </Card>
          </Grid.Col>
        )
      })}
    </>
  );
}

export default CardLessonItems;