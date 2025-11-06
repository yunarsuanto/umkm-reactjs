import { z } from 'zod';

export const addUserSchema = z.object({
  username: z.string().min(6, { message: 'Name is required min 6' }),
  password: z.string().min(8, { message: 'Password is required min 8' }),
  confirm_password: z.string().min(8, { message: 'Name is required min 8' }),
});

export type AddUserSchema = z.infer<typeof addUserSchema>;
