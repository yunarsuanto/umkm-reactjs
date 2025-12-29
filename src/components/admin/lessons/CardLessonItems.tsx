import { useAppDispatch } from "../../../app/hooks";
import { openDeleteModal } from "@/features/lessonItemSlice";
import { useNavigate } from "react-router-dom";
import { GetLessonItemDataResponse } from "@/types/admin/lesson_item/GetLessonItemTypes";
import { GeneralLessonItemDataState } from "@/types/admin/lesson_item/GeneralLessonItemTypes";
import { setDataLessonItem } from "@/features/lessonItemSlice";
import speak from "@/constants/speak";
import { useEffect, useRef } from "react";
import { Player } from '@lottiefiles/react-lottie-player'
import { IconPencil, IconTrash, IconLink } from "@tabler/icons-react";
import { setLoading } from "@/features/generalSlice";

interface CardLessonItemsProps {
  data: GetLessonItemDataResponse[];
  lesson_id: string;
  category_lesson_id: string;
  totalPages: number;
  lessonType: string;
}

const CardLessonItems = ({data, totalPages, category_lesson_id, lesson_id, lessonType}: CardLessonItemsProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const playerRefs = useRef<(Player | null)[]>([]);
  const handleDelete = (data: GeneralLessonItemDataState) => {
    dispatch(openDeleteModal())
    dispatch(setDataLessonItem({id: data.id, content: data.content}))
  }

  useEffect(() => {
    dispatch(setLoading(true))
  }, [])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {Array.isArray(data) && data.map((row, index) => (
        <div key={`${index}-${row.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          {/* Media Section */}
          <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
            {lessonType === 'puzzle' && !row.is_done ? (
              <img 
                src={`${import.meta.env.VITE_API_IMAGE_URL}${row.thumbnail}`} 
                alt={row.content}
                className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => {
                  speak(`${row.content}`)
                }}
                onLoad={() => {dispatch(setLoading(false))}}
              />
            ) : (
              <div
                className="w-full h-full"
                onMouseEnter={() => {
                  playerRefs.current[index]?.play()
                  playerRefs.current[index]?.setLoop(true)
                }}
                onMouseLeave={() => playerRefs.current[index]?.stop()}
              >
                <Player
                  ref={(el: any) => (playerRefs.current[index] = el)}
                  src={`${import.meta.env.VITE_API_IMAGE_URL}${row.media}`}
                  autoplay={false}
                  loop={true}
                  onEvent={(event) => {
                    if(event === 'load'){
                      dispatch(setLoading(false))
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-4">
            <h3 className="font-bold text-lg mb-4 line-clamp-2">{row.content}</h3>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-center flex-wrap">
              <button
                onClick={() => 
                  navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/detail/${lesson_id}/item/assign-group/${row.id}`)
                }
                className="flex items-center gap-1 px-3 py-1 text-xs bg-green-100 text-green-600 rounded hover:bg-green-200 transition"
                title="Assign Group"
              >
                <IconLink size={14} />
                Assign
              </button>

              <button
                onClick={() => 
                  navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/detail/${lesson_id}/item/edit/${row.id}`)
                }
                className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                title="Edit Lesson Item"
              >
                <IconPencil size={14} />
                Edit
              </button>

              <button
                onClick={() => {
                  handleDelete(row)
                }}
                className="flex items-center gap-1 px-3 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                title="Delete Lesson Item"
              >
                <IconTrash size={14} />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardLessonItems;