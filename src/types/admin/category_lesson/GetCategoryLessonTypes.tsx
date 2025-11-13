import { Meta } from "../../Meta";
import { Pagination } from "../../Pagination";

export interface GetCategoryLessonRequest {
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
  category_lesson_type: string
  media: string
  lessons: GetCategoryLessonDataLessonResponse[]
}

export interface GetCategoryLessonDataLessonResponse {
  id: string
  title: string
  description: string
  media: string
  level: number
  items: GetCategoryLessonDataLessonItemResponse[]
}

export interface GetCategoryLessonDataLessonItemResponse {
  id: string
  content: string
  media: string
  order: number
}
