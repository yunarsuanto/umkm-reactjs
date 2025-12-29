import { z } from 'zod';

export const addCategoryLessonSchema = z.object({
  title: z.string().min(4, { message: 'Title is required min 6' }),
  description: z.string().min(6, { message: 'Description is required min 6' }),
  media: z.string().optional().or(z.literal('')),
  category_lesson_type: z.string().min(1, { message: 'Type is required' }),
  category_lesson_id: z.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    { message: 'ID harus berupa UUID yang valid' }
  ).optional().or(z.literal('')),
});

export type AddCategoryLessonSchema = z.infer<typeof addCategoryLessonSchema>;
