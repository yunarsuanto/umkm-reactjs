import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(4, { message: 'Username tidak valid' }),
  // email: z.string().email({ message: 'Email tidak valid' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter' }),
  platform: z.string().min(3, { message: 'Platform minimal 3 karakter' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
