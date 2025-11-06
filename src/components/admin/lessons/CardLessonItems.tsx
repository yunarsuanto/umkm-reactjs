import { Button, Card, Group, Image, Text, Grid } from "@mantine/core";
import { useAppDispatch } from "../../../app/hooks";
import { openDeleteModal } from "@/features/lessonItemSlice";
import { useNavigate } from "react-router-dom";
import { GeneralLessonDataState } from "@/types/admin/lesson/GeneralLessonTypes";
import { GetLessonItemDataResponse } from "@/types/admin/lesson_item/GetLessonItemTypes";
import { GeneralLessonItemDataState } from "@/types/admin/lesson_item/GeneralLessonItemTypes";
import { setDataLessonItem } from "@/features/lessonItemSlice";

interface CardLessonItemsProps {
  data: GetLessonItemDataResponse[];
  lesson_id: string;
  parent_id: string;
  child_id: string;
  totalPages: number;
}

const CardLessonItems = ({data, totalPages, parent_id, child_id, lesson_id}: CardLessonItemsProps) => {
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
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{row.content}</Text>
                <Group justify="center">
                  <Button variant={'white'} style={{padding: 2}} onClick={() => 
                      navigate(`/admin/category-lessons/detail/${parent_id}/sub-category/${child_id}/edit/${lesson_id}/lesson-item/edit/${row.id}`)
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