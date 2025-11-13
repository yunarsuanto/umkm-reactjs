import { Anchor, Button, Card, Group, Table, Image, Text, Badge, Grid } from "@mantine/core";
import classes from '../../../index.module.css';
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { useAppDispatch } from "../../../app/hooks";
import PaginationControl from "../Pagination";
import { openDeleteModal, setCopyModal } from "@/features/lessonSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GetLessonDataResponse } from "@/types/admin/lesson/GetLessonTypes";
import { GeneralLessonDataState } from "@/types/admin/lesson/GeneralLessonTypes";
import { setDataLesson } from "@/features/lessonSlice";

interface CardLessonsProps {
  data: GetLessonDataResponse[];
  category_lesson_id: string;
  // lesson_id: string;
  totalPages: number;
}

const CardLessons = ({data, totalPages, category_lesson_id}: CardLessonsProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleDelete = (data: GeneralLessonDataState) => {
    dispatch(openDeleteModal())
    dispatch(setDataLesson({id: data.id, title: data.title, level: data.level}))
  }
  
  const handleCopy = (data: GeneralLessonDataState) => {
    dispatch(setCopyModal(true))
    dispatch(setDataLesson({id: data.id, title: data.title, level: data.level}))
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
                  <Group justify="center" style={{width: '100%'}}>
                    <Button variant={'white'} style={{padding: 2}} onClick={() => 
                      navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/detail/${row.id}`)
                    }>
                      <img src={'/detail.svg'} alt="add" width={30} height={30} />
                    </Button>
                    <Button variant={'white'} style={{padding: 2}} onClick={() => {
                      const data:GeneralLessonDataState = {
                        id: row.id,
                        title: row.title,
                        level: row.level
                      }
                      handleCopy(data)
                    }}>
                      <img src={'/copy.svg'} alt="add" width={30} height={30} />
                    </Button>
                    <Button variant={'white'} style={{padding: 2}} onClick={() => 
                      navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/edit/${row.id}`)
                    }>
                      <img src={'/edit.svg'} alt="add" width={30} height={30} />
                    </Button>
                    <Button variant={'white'} style={{padding: 2}} onClick={() => {
                      const data:GeneralLessonDataState = {
                        id: row.id,
                        title: row.title,
                        level: row.level,
                      }
                      handleDelete(data)
                    }}>
                      <img src={'/delete.svg'} alt="add" width={30} height={30} />  
                    </Button>
                  </Group>
              </Group>
              <Text size="sm" c="dimmed">
                {row.description}
              </Text>
              <Text size="sm">
                Level {row.level}, Tipe: {row.lesson_type}
              </Text>
            </Card>
          </Grid.Col>
        )
      })}
    </>
  );
}

export default CardLessons;