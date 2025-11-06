import { z } from 'zod';

export const addRolePermissionSchema = z.object({
  role_id: z.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    { message: 'ID harus berupa UUID yang valid' }
  ),
  permission_id: z.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    { message: 'ID harus berupa UUID yang valid' }
  ),
});

export type AddRolePermissionSchema = z.infer<typeof addRolePermissionSchema>;
