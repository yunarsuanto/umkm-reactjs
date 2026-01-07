import { Meta } from "../../Meta";
import { Pagination } from "../../Pagination";

export interface GetLessonItemRequest {
  lesson_id: string
}

export interface GetLessonItemResponse {
  meta: Meta
  data: GetLessonItemDataResponse[]
  pagination: Pagination
}

export interface GetLessonItemDataResponse {
  id: string
  content: string
  media: string
  thumbnail: string
  order: number
  is_done: boolean
  isCorrect: boolean
}