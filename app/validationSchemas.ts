import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z
    .string({
      invalid_type_error: 'Title must be a string',
    })
    .min(1, 'Title is required')
    .max(255),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(1, 'Description is required'),
});
