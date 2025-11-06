import { Meta } from "../../Meta";
import { Pagination } from "../../Pagination";

export interface GetLessonRequest {
  category_lesson_id: string
}

export interface GetLessonResponse {
  meta: Meta
  data: GetLessonDataResponse[]
  pagination: Pagination
}

export interface GetLessonDataResponse {
  id: string
  title: string
  description: string
  media: string
  category_lesson_id: string
}