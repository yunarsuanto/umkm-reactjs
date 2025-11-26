import { z } from 'zod';

export const addLessonGroupSchema = z.object({
  lesson_id: z.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    { message: 'ID harus berupa UUID yang valid' }
  ).optional().or(z.literal('')),
  description: z.string().min(1, { message: 'Description is required min 1' }),
  group: z.number().int().min(1, { message: 'Level must be at least 1' }),
});

export type AddLessonGroupSchema = z.infer<typeof addLessonGroupSchema>;
