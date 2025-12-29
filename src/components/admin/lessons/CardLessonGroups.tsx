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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {Array.isArray(data) && data.map((row, index) => (
        <div key={`${index}-${row.id}`} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          {/* Header Section */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
            <h3 className="font-bold text-lg text-center text-gray-900 mb-2">Group {row.group}</h3>
            <p className="text-gray-600 text-center text-sm">{row.description}</p>
          </div>

          {/* Items List Section */}
          <div className="p-4">
            {row.lesson_items && row.lesson_items.length > 0 ? (
              <ul className="space-y-2">
                {row.lesson_items.map((item, indx) => (
                  <li key={indx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <IconCircleDashed size={16} />
                    </span>
                    <span className="text-gray-700 text-sm">{item.content}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">No items in this group</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardLessonGroups;