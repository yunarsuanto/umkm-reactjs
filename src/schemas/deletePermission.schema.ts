import { z } from 'zod';

export const deletePermissionSchema = z.object({
  id: z.string(),
});

export type DeletePermissionSchema = z.infer<typeof deletePermissionSchema>;