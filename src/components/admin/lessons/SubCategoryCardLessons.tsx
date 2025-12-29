import classes from '../../../index.module.css';
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { useAppDispatch } from "../../../app/hooks";
import PaginationControl from "../Pagination";
import { openDeleteModal, setDataCategoryLesson } from "@/features/categoryLessonSlice";
import { useNavigate } from "react-router-dom";
import { GetCategoryLessonDataResponse } from "../../../types/admin/category_lesson/GetCategoryLessonTypes";
import { GeneralCategoryLessonDataState } from "../../../types/admin/category_lesson/GeneralCategoryLessonTypes";
import { useEffect } from "react";

interface SubCategoryCardLessonsProps {
  data: GetCategoryLessonDataResponse[];
  parent_id: string;
  totalPages: number;
}

const SubCategoryCardLessons = ({data, totalPages, parent_id}: SubCategoryCardLessonsProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleDelete = (data: GeneralCategoryLessonDataState) => {
    dispatch(openDeleteModal())
    dispatch(setDataCategoryLesson({id: data.id, title: data.title}))
  }

  return (
    <>
      {data && data.map((row, index) => {
        return (
          <>
            asdasd
          </>
            // <Card shadow="sm" padding="lg" radius="md" withBorder key={`${index}-${row.id}-${row.title}`}>
            //   <Card.Section>
            //     <Image
            //       src={`${import.meta.env.VITE_API_IMAGE_URL}${row.media}`}
            //       width={'100%'}
            //       alt="Norway"
            //     />
            //   </Card.Section>
            //   <Group justify="space-between" mt="md" mb="xs">
            //       <Text fw={500}>{row.title}</Text>
            //       <Group justify="center">
            //         <Button variant={'white'} style={{padding: 2}} onClick={() => navigate(`/admin/category-lessons/detail/${parent_id}/sub-category/edit/${row.id}`)}>
            //           <img src={'/edit.svg'} alt="add" width={30} height={30} />  
            //         </Button>
            //         <Button variant={'white'} style={{padding: 2}} onClick={() => {
            //           const data:GeneralCategoryLessonDataState = {
            //             id: row.id,
            //             title: row.title,
            //           }
            //           handleDelete(row)
            //         }}>
            //           <img src={'/delete.svg'} alt="add" width={30} height={30} />  
            //         </Button>
            //       </Group>
            //   </Group>
            //   <Text size="sm" c="dimmed">
            //     {row.description}
            //   </Text>
            //   <Button color="pink" fullWidth mt="md" radius="md" onClick={() => {                
            //     navigate(`/admin/category-lessons/detail/${parent_id}/sub-category/${row.id}`)
            //   }}>
            //     Detil
            //   </Button>
            // </Card>
        )
      })}
    </>
  );
}

export default SubCategoryCardLessons;