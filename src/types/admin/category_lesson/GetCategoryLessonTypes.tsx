import { Meta } from "../../Meta";
import { Pagination } from "../../Pagination";

export interface GetCategoryLessonRequest {
  has_parent: boolean
}

export interface GetCategoryLessonResponse {
  meta: Meta
  data: GetCategoryLessonDataResponse[]
  pagination: Pagination
}

export interface GetCategoryLessonDataResponse {
  id: string
  title: string
  description: string
  media: string
  category_lesson_id: string
}