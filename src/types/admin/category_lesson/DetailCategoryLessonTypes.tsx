import { Meta } from "../../Meta";
import { GetCategoryLessonDataResponse } from "./GetCategoryLessonTypes";

export interface DetailCategoryLessonResponse {
  meta: Meta
  data: DetailCategoryLessonDataResponse
}

export interface DetailCategoryLessonDataResponse {
  id: string
  title: string
  description: string
  media: string
  category_lesson_id: string
  childs: GetCategoryLessonDataResponse[]
}