import { z } from 'zod';

export const addRoleSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

export type AddRoleSchema = z.infer<typeof addRoleSchema>;
