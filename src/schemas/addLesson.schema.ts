import { z } from 'zod';

export const addLessonSchema = z.object({
  title: z.string().min(6, { message: 'Title is required min 6' }),
  description: z.string().min(6, { message: 'Description is required min 6' }),
  media: z.string().optional(),
  category_lesson_id: z.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    { message: 'ID harus berupa UUID yang valid' }
  ).optional().or(z.literal('')),
  level: z.number().int().min(1, { message: 'Level must be at least 1' }),
});

export type AddLessonSchema = z.infer<typeof addLessonSchema>;
