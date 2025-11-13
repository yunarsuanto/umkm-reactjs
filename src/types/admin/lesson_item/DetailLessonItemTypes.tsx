import { Meta } from "../../Meta";
import { GetLessonItemDataResponse } from "./GetLessonItemTypes";

export interface DetailLessonItemResponse {
  meta: Meta
  data: DetailLessonItemDataResponse
}

export interface DetailLessonItemDataResponse {
  id: string
  lesson_id: string
  content: string
  order: number
  media: string
  group: number
  is_done: boolean
}