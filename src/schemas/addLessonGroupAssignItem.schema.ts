import { z } from 'zod';

export const addLessonGroupAssignItemSchema = z.object({
  lesson_item_id: z.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    { message: 'ID harus berupa UUID yang valid' }
  ).optional().or(z.literal('')),
  lesson_group_id: z.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    { message: 'ID harus berupa UUID yang valid' }
  ).optional().or(z.literal('')),
});

export type AddLessonGroupAssignItemSchema = z.infer<typeof addLessonGroupAssignItemSchema>;
