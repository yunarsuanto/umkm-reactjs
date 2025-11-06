import { Anchor, Button, Card, Group, Table, Image, Text, Badge, Grid } from "@mantine/core";
import classes from '../../../index.module.css';
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { useAppDispatch } from "../../../app/hooks";
import PaginationControl from "../Pagination";
import { openDeleteModal } from "@/features/lessonSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GetLessonDataResponse } from "@/types/admin/lesson/GetLessonTypes";
import { GeneralLessonDataState } from "@/types/admin/lesson/GeneralLessonTypes";
import { setDataLesson } from "@/features/lessonSlice";

interface CardLessonsProps {
  data: GetLessonDataResponse[];
  parent_id: string;
  child_id: string;
  totalPages: number;
}

const CardLessons = ({data, totalPages, parent_id, child_id}: CardLessonsProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleDelete = (data: GeneralLessonDataState) => {
    dispatch(openDeleteModal())
    dispatch(setDataLesson({id: data.id, title: data.title}))
  }

  return (
    <>
      {data && data.map((row, index) => {
        return (
          <Grid.Col span={4} key={`${index}-${row.id}-${row.title}`}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={`${import.meta.env.VITE_API_IMAGE_URL}${row.media}`}
                  width={'100%'}
                  alt="Norway"
                />
              </Card.Section>
              <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{row.title}</Text>
                  <Group justify="center">
                    <Button variant={'white'} style={{padding: 2}} onClick={() => navigate(`/admin/category-lessons/detail/${parent_id}/sub-category/${child_id}/edit/${row.id}`)}>
                      <img src={'/edit.svg'} alt="add" width={30} height={30} />  
                    </Button>
                    <Button variant={'white'} style={{padding: 2}} onClick={() => {
                      const data:GeneralLessonDataState = {
                        id: row.id,
                        title: row.title,
                      }
                      handleDelete(row)
                    }}>
                      <img src={'/delete.svg'} alt="add" width={30} height={30} />  
                    </Button>
                  </Group>
              </Group>
              <Text size="sm" c="dimmed">
                {row.description}
              </Text>
              <Button color="pink" fullWidth mt="md" radius="md" onClick={() => {
                navigate(`/admin/category-lessons/detail/${parent_id}/sub-category/${child_id}/detail/${row.id}`)
              }}>
                Detil
              </Button>
            </Card>
          </Grid.Col>
        )
      })}
    </>
  );
}

export default CardLessons;