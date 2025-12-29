import { useAppDispatch } from "../../../app/hooks";
import { openDeleteModal, setDataCategoryLesson } from "@/features/categoryLessonSlice";
import { useNavigate } from "react-router-dom";
import { GetCategoryLessonDataResponse } from "../../../types/admin/category_lesson/GetCategoryLessonTypes";
import { GeneralCategoryLessonDataState } from "../../../types/admin/category_lesson/GeneralCategoryLessonTypes";
import { IconTrash, IconPencil, IconEye } from "@tabler/icons-react";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.isArray(data) && data.map((row, index) => (
        <div key={`${index}-${row.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
              Deskripsi: {row.description}
            </p>
            
            <p className="text-gray-500 text-xs mb-4">
              Tipe: <span className="font-medium text-gray-700">{row.category_lesson_type}</span>
            </p>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => navigate(`/admin/category-lessons/detail/${row.id}`)}
                className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                title="Detail"
              >
                <IconEye size={14} />
                Detail
              </button>
              
              <button
                onClick={() => navigate(`/admin/category-lessons/edit/${row.id}`)}
                className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                title="Edit"
              >
                <IconPencil size={14} />
                Edit
              </button>
              
              <button
                onClick={() => handleDelete({
                  id: row.id,
                  title: row.title,
                })}
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

export default CardCategoryLessons;