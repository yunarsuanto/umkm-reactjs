import { Meta } from "../../Meta";
import { Pagination } from "../../Pagination";

export interface GetCategoryLessonPublicRequest {
}

export interface GetCategoryLessonPublicResponse {
  meta: Meta
  data: GetCategoryLessonPublicDataResponse
  pagination: Pagination
}

export interface GetCategoryLessonPublicDataResponse {
  id: string
  title: string
  description: string
  media: string
  category_lesson_id: string
  lessons: GetCategoryLessonPublicDataLessonResponse[]
}

export interface GetCategoryLessonPublicDataLessonResponse {
  id: string
  title: string
  description: string
  media: string
  level: number
  lesson_type: string
  items: GetCategoryLessonPublicDataLessonItemResponse[]
}

export interface GetCategoryLessonPublicDataLessonItemResponse {
  id: string
  content: string
  media: string
  order: number
  isCorrect: boolean
}
