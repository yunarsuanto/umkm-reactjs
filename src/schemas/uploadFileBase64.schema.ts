import { z } from 'zod';

export const uploadFileBase64Schema = z.object({
  file: z.string().min(4, { message: 'File tidak valid' }).regex(/^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/, { message: 'Format File tidak valid' }),
});

export type UploadFileBase64Schema = z.infer<typeof uploadFileBase64Schema>;
