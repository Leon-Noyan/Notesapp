import { z } from 'zod';

export const notesInputSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(120),
  text: z.string().trim().max(2000).optional().default(''),
})
