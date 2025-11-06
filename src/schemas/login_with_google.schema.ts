import { z } from 'zod';

export const loginWithGoogleSchema = z.object({
  token: z.string().min(4, { message: 'Token tidak valid' }),
  platform: z.string().min(3, { message: 'Platform minimal 3 karakter' }),
});

export type LoginWithGoogleSchema = z.infer<typeof loginWithGoogleSchema>;
