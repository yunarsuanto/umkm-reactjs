import { z } from 'zod';

export const uploadFileSchema = z.object({
  file: z.string().min(4, { message: 'File tidak valid' }).regex(/^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/, { message: 'Format File tidak valid' }),
});

export type UploadFileSchema = z.infer<typeof uploadFileSchema>;
