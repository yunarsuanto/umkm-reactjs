import { GetCategoryLessonPublicDataLessonItemResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import shuffle from "./suffle";
import { GetLessonItemDataResponse } from "@/types/admin/lesson_item/GetLessonItemTypes";


const getRandomOptions = (
  items: GetCategoryLessonPublicDataLessonItemResponse[] | GetLessonItemDataResponse[],
  correct: GetCategoryLessonPublicDataLessonItemResponse | GetLessonItemDataResponse,
  length: number
) => {
  if (!items || !correct) return [correct];

  const others = items.filter(i => i.content !== correct.content);

  // ambil kandidat wrong acak
  const wrong = shuffle(others).slice(0, length - 1);

  // gabungkan, tapi JANGAN shuffle lagi
  const result = [correct, ...wrong];

  // jika ingin correct selalu random posisinya:
  return shuffle(result);

  // kalau ingin correct selalu nomor 1:
  // return result;
};

export default getRandomOptions;