import { z } from 'zod';

export const addPermissionSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

export type AddPermissionSchema = z.infer<typeof addPermissionSchema>;
