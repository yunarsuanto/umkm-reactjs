import { Meta } from "../../Meta";
import { Pagination } from "../../Pagination";

export interface GetLessonGroupRequest {
  lesson_id: string
}

export interface GetLessonGroupResponse {
  meta: Meta
  data: GetLessonGroupDataResponse[]
  pagination: Pagination
}

export interface GetLessonGroupDataResponse {
  id: string
  group: number
  description: string
  lesson_id: string
  lesson_title: number
  lesson_items: GetLessonGroupLessonItemResponse[]
}

export interface GetLessonGroupLessonItemResponse {
  lesson_group_id: string
  lesson_item_id: string
  content: string
  order: number
  media: string
  is_done: boolean
}