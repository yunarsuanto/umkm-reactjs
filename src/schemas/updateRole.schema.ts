import { z } from 'zod';

export const updateRoleSchema = z.object({
  id: z.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    { message: 'ID harus berupa UUID yang valid' }
  ),
  name: z.string().min(1, { message: 'Name is required' }),
});

export type UpdateRoleSchema = z.infer<typeof updateRoleSchema>;