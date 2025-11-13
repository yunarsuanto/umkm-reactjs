import { z } from 'zod';

const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
  "video/webm",
  "video/mp4",
  "audio/mpeg",
];


export const uploadFileSchema = z.object({
  file: z
  .instanceof(File)
  .refine((file) => file.size > 0, { message: "File wajib diunggah" })
  .refine((file) => allowedMimeTypes.includes(file.type), {
    message: "Tipe file tidak didukung",
  })
  .refine((file) => file.size <= 10 * 1024 * 1024, {
    message: "Ukuran file maksimal 10MB",
  }),
});

export type UploadFileSchema = z.infer<typeof uploadFileSchema>;
