import { z } from 'zod';

export const issueSchema = z.object({
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
export const patchIssueSchema = z.object({
  title: z
    .string({
      invalid_type_error: 'Title must be a string',
    })
    .min(1, 'Title is required')
    .max(255)
    .optional(),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(1, 'Description is required')
    .max(65535)
    .optional(),
  assignedToUserId: z.string().min(1, 'AssignedToUserUd is required').max(255).nullable().optional(),
});
