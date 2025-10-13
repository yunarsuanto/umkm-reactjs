import { z } from 'zod';

export const updatePermissionSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Name is required' }),
});

export type UpdatePermissionSchema = z.infer<typeof updatePermissionSchema>;