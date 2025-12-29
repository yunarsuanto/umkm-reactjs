import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { useAppDispatch } from "../../../app/hooks";
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {Array.isArray(data) && data.map((row, index) => (
        <div key={`${index}-${row.id}-${row.title}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          {/* Image Section */}
          <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
            <img
              src={`${import.meta.env.VITE_API_IMAGE_URL}${row.media}`}
              alt={row.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          </div>
          {/* Content Section */}
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2 line-clamp-2">{row.title}</h3>
            
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {row.description}
            </p>
            
            <p className="text-gray-500 text-xs mb-4">
              Level <span className="font-medium text-gray-700">{row.level}</span>, Tipe: <span className="font-medium text-gray-700">{row.lesson_type}</span>
            </p>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-center flex-wrap">
              <button
                onClick={() => 
                  navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/detail/${row.id}`)
                }
                className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                title="Detail"
              >
                <IconEye size={14} />
                Detail
              </button>
              
              <button
                onClick={() => {
                  const copyData: GeneralLessonDataState = {
                    id: row.id,
                    title: row.title,
                    level: row.level
                  }
                  handleCopy(copyData)
                }}
                className="flex items-center gap-1 px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded hover:bg-purple-200 transition"
                title="Copy"
              >
                📋 Copy
              </button>
              
              <button
                onClick={() => 
                  navigate(`/admin/category-lessons/detail/${category_lesson_id}/lesson/edit/${row.id}`)
                }
                className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                title="Edit"
              >
                <IconPencil size={14} />
                Edit
              </button>
              
              <button
                onClick={() => {
                  const deleteData: GeneralLessonDataState = {
                    id: row.id,
                    title: row.title,
                    level: row.level,
                  }
                  handleDelete(deleteData)
                }}
                className="flex items-center gap-1 px-3 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                title="Delete"
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

export default CardLessons;