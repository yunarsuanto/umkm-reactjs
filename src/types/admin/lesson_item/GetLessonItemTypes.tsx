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
  lesson_id: string
  content: string
  order: number
}