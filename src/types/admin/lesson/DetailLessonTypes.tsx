import { Meta } from "../../Meta";
import { GetLessonDataResponse } from "./GetLessonTypes";

export interface DetailLessonResponse {
  meta: Meta
  data: DetailLessonDataResponse
}

export interface DetailLessonDataResponse {
  id: string
  title: string
  description: string
  media: string
  category_lesson_id: string
  level: number
}