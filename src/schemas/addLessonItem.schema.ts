import { z } from 'zod';

export const addLessonItemSchema = z.object({
  lesson_id: z.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    { message: 'ID harus berupa UUID yang valid' }
  ).optional().or(z.literal('')),
  content: z.string().min(1, { message: 'Title is required min 1' }),
  order: z.number().int().min(1, { message: 'Level must be at least 1' }),
  media: z.string().optional(),
  is_done: z.boolean().optional(),
});

export type AddLessonItemSchema = z.infer<typeof addLessonItemSchema>;
