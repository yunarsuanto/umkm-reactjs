import { Button, Card, Group, Image, Text, Grid, List, ThemeIcon } from "@mantine/core";
import { useAppDispatch } from "../../../app/hooks";
import { openDeleteModal } from "@/features/lessonItemSlice";
import { useNavigate } from "react-router-dom";
import { GeneralLessonDataState } from "@/types/admin/lesson/GeneralLessonTypes";
import { GeneralLessonItemDataState } from "@/types/admin/lesson_item/GeneralLessonItemTypes";
import { setDataLessonItem } from "@/features/lessonItemSlice";
import speak from "@/constants/speak";
import { GetLessonGroupDataResponse } from "@/types/admin/lesson_item/GetLessonGroupTypes";
import { IconCircleDashed } from "@tabler/icons-react";

interface CardLessonGroupsProps {
  data: GetLessonGroupDataResponse[];
  lesson_id: string;
  category_lesson_id: string;
  totalPages: number;
}

const CardLessonGroups = ({data, totalPages, category_lesson_id, lesson_id}: CardLessonGroupsProps) => {
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
              <Card.Section style={{padding: 5, textAlign: 'center'}}>
                <Text fw={1000}>
                  group {row.group}
                </Text>
                <Text fw={500}>
                  {row.description}
                </Text>
              </Card.Section>
              <Group justify="space-between" mt="md" mb="xs">
                <List>
                  {row.lesson_items.length > 0 && row.lesson_items.map((item, indx) => {
                    return (
                      <List.Item
                        icon={
                          <ThemeIcon color="blue" size={24} radius="xl">
                            <IconCircleDashed size={16} />
                          </ThemeIcon>
                        } key={indx}
                      >
                        {item.content}
                      </List.Item>
                    )
                  })}
                </List>
              </Group>
            </Card>
          </Grid.Col>
        )
      })}
    </>
  );
}

export default CardLessonGroups;