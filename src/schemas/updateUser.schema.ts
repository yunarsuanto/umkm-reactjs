import { z } from 'zod';

export const updateUserSchema = z.object({
  id: z.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    { message: 'ID harus berupa UUID yang valid' }
  ),
  username: z.string().min(6, { message: 'Name is required min 6' }),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;